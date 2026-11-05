const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
(async()=>{
 const source=fs.readFileSync('assets/js/header.js','utf8');
 const a=source.indexOf('  function eeAnalyticsMarkFormStart'),b=source.indexOf('  function eeAnalyticsInitForms',a);
 for(const file of ['contact/index.html','es/contacto/index.html']){
  const html=fs.readFileSync(file,'utf8'),form={id:'eeContactForm',getAttribute:()=> 'ee_contact_form'},events=[];
  const ctx={document:{getElementById:()=>form,querySelectorAll:()=>[form]},window:{},eeAnalyticsGetPageMeta:()=>({}),eeAnalyticsSend:(e)=>{events.push(e);return true;},safeAnalyticsEmit:e=>events.push(e)};
  vm.createContext(ctx);vm.runInContext(source.slice(a,b),ctx);ctx.window.eeAnalytics={markFormStart:ctx.eeAnalyticsMarkFormStart};
  const start=html.indexOf('      function markContactFormStarted'),end=html.indexOf('      function trackContactFormResult',start);vm.runInContext(html.slice(start,end),ctx);
  ctx.eeAnalyticsMarkFormStart('ee_contact_form',form);ctx.markContactFormStarted();assert.deepEqual(events,['form_start']);
  for(const script of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){if(script[1].includes('application/ld+json'))JSON.parse(script[2]);else new Function(script[2]);}
 }
 const {onRequestPost}=await import('data:text/javascript;base64,'+Buffer.from(fs.readFileSync('functions/api/contact-submit.js','utf8')).toString('base64'));
 const realFetch=global.fetch;let forwarded;
 global.fetch=async(url,opts)=>url.includes('siteverify')?new Response(JSON.stringify({success:true})): (forwarded=JSON.parse(opts.body),new Response(JSON.stringify({ok:true})));
 try{
  const env={TURNSTILE_SECRET:'test-only',GAS_CONTACT_URL:'https://example.test/receiver'};
  for(const language of ['en','es']){
   const payload={first_name:'AIOS',last_name:'QA',email:'qa@example.test',language,turnstile_token:'test-only',current_page:'https://experienceecuador.com/'+(language==='es'?'es/contacto/':'contact/'),first_touch_source:'qa',notes:'QA local test'};
   const res=await onRequestPost({env,request:new Request('https://example.test/api/contact-submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})});
   assert.equal((await res.json()).ok,true);assert.equal(forwarded.language,language);assert.equal(forwarded.current_page,payload.current_page);assert.equal(forwarded.first_touch_source,'qa');assert.equal(forwarded.turnstile_token,undefined);
  }
  const res=await onRequestPost({env,request:new Request('https://example.test/api/contact-submit',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})});assert.equal(res.status,400);
 }finally{global.fetch=realFetch;}
 for(const [file,lang] of [['trip-builder/index.html','en'],['es/planificador-de-viajes/index.html','es']]){
  const text=fs.readFileSync(file,'utf8');assert.ok(text.includes('language: "'+lang+'"'));assert.ok(text.includes('window.EEAttribution.decoratePayload(payload)'));assert.ok(!text.includes('access is likely not set to Anyone'));
 }
 console.log('PASS: bilingual contact starts once; missing verification rejected; server forwards language, origin and attribution; itinerary language and attribution included. No live messages sent.');
})().catch(e=>{console.error(e);process.exit(1)});
