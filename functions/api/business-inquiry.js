const SHEET_ID = '182aFZzuQA7Vicbh0GY5hdvicrp4caxKsYmRRfZ_BgTc';
const TYPES = ['Learn more', 'Collaborate', 'Website review'];
const PAGES = ['/explore/', '/es/explora/'];
const json = (data, status=200) => Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export const capitalizeName = value => value.trim().replace(/^\p{L}/u,c=>c.toLocaleUpperCase('en'));
export function validate(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('Invalid inquiry.');
  const out={};
  for(const [field,max] of Object.entries({first_name:100,last_name:100,email:254,inquiry_type:30,organization:200,website_url:2048,experience:200,travel_dates:200,improvement_goals:2000,message:5000,source_page:100,company_fax:200})) {
    if (payload[field] != null && typeof payload[field] !== 'string') throw new Error('Invalid field: '+field);
    out[field]=(payload[field] || '').trim();
    if(out[field].length>max || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(out[field])) throw new Error('Invalid field: '+field);
  }
  if(out.company_fax) throw new Error('Invalid inquiry.');
  if(!out.first_name || !out.last_name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email) || !TYPES.includes(out.inquiry_type) || out.message.length<10 || !PAGES.includes(out.source_page)) throw new Error('Please complete all required fields.');
  out.first_name=capitalizeName(out.first_name); out.last_name=capitalizeName(out.last_name);
  if(out.inquiry_type === 'Website review' && !out.website_url) throw new Error('Please enter your website URL.');
  if(out.website_url) {
    let url; try {url=new URL(out.website_url);} catch {throw new Error('Please enter a valid website URL starting with https://.');}
    if(!['http:','https:'].includes(url.protocol) || !url.hostname.includes('.') || url.username || url.password) throw new Error('Please enter a public website URL.');
  }
  if(out.inquiry_type === 'Learn more') {out.organization='';out.website_url='';out.improvement_goals='';}
  else {out.experience='';out.travel_dates=''; if(out.inquiry_type !== 'Website review') out.improvement_goals='';}
  return out;
}
export async function onRequest({request,env}) {
  const ready=!!(env.TURNSTILE_SECRET && env.TURNSTILE_SITE_KEY && env.BUSINESS_INQUIRY_URL && env.BUSINESS_INQUIRY_SECRET);
  if(request.method==='GET') return json({ready,sitekey:env.TURNSTILE_SITE_KEY || ''});
  if(request.method!=='POST') return json({ok:false,message:'Use POST.'},405);
  const origin=new URL(request.url).origin;
  if(request.headers.get('Origin')!==origin) return json({ok:false,message:'Invalid request origin.'},403);
  if(!ready) return json({ok:false,message:'The inquiry form is temporarily unavailable. Please use our contact page.'},503);
  if(Number(request.headers.get('Content-Length')||0)>18000) return json({ok:false,message:'Inquiry is too large.'},413);
  let payload,fields;
  try {
    const body=await request.text(); if(body.length>18000) return json({ok:false,message:'Inquiry is too large.'},413);
    payload=JSON.parse(body); fields=validate(payload);
  } catch(error) {return json({ok:false,message:error.message || 'Invalid inquiry.'},400);}
  const token=payload.turnstile_token;
  if(typeof token!=='string' || !token || token.length>2048) return json({ok:false,message:'Please complete the security verification.'},400);
  try {
    const verifyResponse=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:env.TURNSTILE_SECRET,response:token,remoteip:request.headers.get('CF-Connecting-IP')||''}),signal:AbortSignal.timeout(10000)});
    const verification=await verifyResponse.json();
    if(!verifyResponse.ok || !verification.success || verification.action!=='business_inquiry' || verification.hostname!==new URL(request.url).hostname) return json({ok:false,message:'Security verification failed. Please verify again.'},403);
    const inquiry_id=crypto.randomUUID();
    const response=await fetch(env.BUSINESS_INQUIRY_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...fields,inquiry_id,submitted_at:new Date().toISOString(),form_language:'en',status:'New',turnstile_verified:true,sheet_id:SHEET_ID,gateway_secret:env.BUSINESS_INQUIRY_SECRET}),signal:AbortSignal.timeout(20000)});
    const result=await response.json();
    if(!response.ok || result.ok!==true || result.inquiry_id!==inquiry_id) throw new Error('Save failed');
    return json({ok:true,inquiry_id});
  } catch {return json({ok:false,message:'Your inquiry could not be saved. Please try again.'},502);}
}
