import assert from 'node:assert/strict';
import fs from 'node:fs';
const code=fs.readFileSync(new URL('../functions/api/business-inquiry.js',import.meta.url),'utf8');
const {validate,capitalizeName,onRequest}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const base={first_name:' élise ',last_name:'o’Neill',email:'qa@example.com',inquiry_type:'Learn more',message:'Testing the inquiry workflow.',source_page:'/explore/'};
assert.equal(capitalizeName(' juan '),'Juan');assert.equal(capitalizeName('élise'),'Élise');assert.equal(capitalizeName('McDonald'),'McDonald');
assert.equal(validate(base).last_name,'O’Neill');
for(const patch of [{first_name:''},{email:'bad'},{inquiry_type:'Other'},{message:'short'},{company_fax:'spam'},{source_page:'/other/'},{inquiry_type:'Website review'},{website_url:'javascript:alert(1)'},{first_name:'x'.repeat(101)}]) assert.throws(()=>validate({...base,...patch}));
assert.equal(validate({...base,inquiry_type:'Website review',website_url:'https://example.com'}).website_url,'https://example.com');
let saved=0;
const env={TURNSTILE_SECRET:'mock',TURNSTILE_SITE_KEY:'mock',BUSINESS_INQUIRY_URL:'https://receiver.example',BUSINESS_INQUIRY_SECRET:'mock'};
const req=(p,origin='https://experienceecuador.com')=>new Request('https://experienceecuador.com/api/business-inquiry',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(p)});
const original=globalThis.fetch;
globalThis.fetch=async(url,options)=>{if(String(url).includes('siteverify')) return Response.json({success:true,action:'business_inquiry',hostname:'experienceecuador.com'});saved++;const p=JSON.parse(options.body);assert.equal(p.first_name,'Élise');assert.equal(p.turnstile_token,undefined);return Response.json({ok:true,inquiry_id:p.inquiry_id});};
assert.equal((await onRequest({request:req(base),env})).status,400);assert.equal(saved,0);
assert.equal((await onRequest({request:req({...base,turnstile_token:'test'},'https://evil.example'),env})).status,403);assert.equal(saved,0);
assert.equal((await onRequest({request:req({...base,turnstile_token:'test'}),env})).status,200);assert.equal(saved,1);
for(const verification of [{success:false},{success:true,action:'other',hostname:'experienceecuador.com'},{success:true,action:'business_inquiry',hostname:'evil.example'}]) {globalThis.fetch=async()=>Response.json(verification);assert.equal((await onRequest({request:req({...base,turnstile_token:'test'}),env})).status,403);}
globalThis.fetch=async(url)=>String(url).includes('siteverify')?Response.json({success:true,action:'business_inquiry',hostname:'experienceecuador.com'}):Response.json({ok:false});
assert.equal((await onRequest({request:req({...base,turnstile_token:'test'}),env})).status,502);
const stableId=crypto.randomUUID(), forwardedIds=[];
globalThis.fetch=async(url,options)=>{if(String(url).includes('siteverify'))return Response.json({success:true,action:'business_inquiry',hostname:'experienceecuador.com'});const p=JSON.parse(options.body);forwardedIds.push(p.inquiry_id);return Response.json({ok:true,inquiry_id:p.inquiry_id});};
for(let i=0;i<2;i++)assert.equal((await onRequest({request:req({...base,turnstile_token:'test',submission_id:stableId}),env})).status,200);
assert.deepEqual(forwardedIds,[stableId,stableId]);
assert.equal((await onRequest({request:req({...base,turnstile_token:'test',submission_id:'invalid'}),env})).status,400);
globalThis.fetch=original;
console.log('PASS: name normalization, required fields, conditional URL, size limits, honeypot, origin checks, missing/failed/wrong-host/wrong-action Turnstile, successful save and failed save.');

// Exercise saved rows, independently retried emails, escaping and queue idempotency.
const vm=await import('node:vm');
const receiver=fs.readFileSync(new URL('../deployment/business-inquiries/Code.gs',import.meta.url),'utf8');
let rows=[['Inquiry ID']], maxColumns=16, sent=[], failRole='', quota=100, failSentWrite=false;
const range=(row,column,height=1,width=1)=>({
  getValue(){return rows[row-1]?.[column-1] || '';},
  getValues(){return Array.from({length:height},(_,r)=>Array.from({length:width},(_,c)=>rows[row-1+r]?.[column-1+c] ?? ''));},
  setValues(values){if(failSentWrite && column===17 && values[0][0]==='Sent')throw new Error('storage unavailable');for(let r=0;r<values.length;r++){rows[row-1+r] ||= [];for(let c=0;c<values[r].length;c++) rows[row-1+r][column-1+c]=values[r][c];}return this;},
  setValue(value){return this.setValues([[value]]);},setNumberFormat(){return this;},setFontWeight(){return this;},setBackground(){return this;},setWrap(){return this;}
});
const sheet={getMaxColumns:()=>maxColumns,insertColumnsAfter:(after,count)=>{maxColumns+=count;},setColumnWidths(){},getLastRow:()=>rows.length,
 getRange:(...args)=>args[0]==='A:A'?{createTextFinder:id=>({matchEntireCell(){return this;},findNext:()=>{const i=rows.findIndex(r=>r[0]===id);return i<0?null:{getRow:()=>i+1};}})}:range(...args)};
const context={console:{log(){}},ContentService:{MimeType:{JSON:'json'},createTextOutput:text=>({text,setMimeType(){return this;}})},
 PropertiesService:{getScriptProperties:()=>({getProperty:()=> 'mock-secret'})},
 LockService:{getScriptLock:()=>({waitLock(){},tryLock:()=>true,hasLock:()=>true,releaseLock(){}})},
 SpreadsheetApp:{openById:id=>{assert.equal(id,'182aFZzuQA7Vicbh0GY5hdvicrp4caxKsYmRRfZ_BgTc');return {getSheetByName:()=>sheet};},flush(){}},
 MailApp:{getRemainingDailyQuota:()=>quota,sendEmail:mail=>{if(mail.to===failRole) throw new Error('temporary failure');sent.push(mail);quota--;}},
 ScriptApp:{getProjectTriggers:()=>[],newTrigger:()=>({timeBased(){return this;},everyMinutes(){return this;},create(){}})}
};
vm.createContext(context);vm.runInContext(receiver,context);
const delivery={...base,first_name:'<script>alert(1)</script>',inquiry_id:crypto.randomUUID(),submitted_at:new Date().toISOString(),sheet_id:'182aFZzuQA7Vicbh0GY5hdvicrp4caxKsYmRRfZ_BgTc',turnstile_verified:true,gateway_secret:'mock-secret',message:'=IMPORTXML("https://example.com","//a")'};
const run=p=>JSON.parse(context.doPost({postData:{contents:JSON.stringify(p)}}).text);
assert.equal(run({...delivery,gateway_secret:'wrong'}).ok,false);assert.equal(rows.length,1);
assert.equal(run(delivery).ok,true);assert.equal(rows.length,2);assert.equal(rows[1][11].startsWith("'="),true);assert.equal(rows[1].length,22);assert.equal(rows[1][16],'Pending');assert.equal(sent.length,0);
assert.equal(run(delivery).ok,true);assert.equal(rows.length,2);
assert.equal(run({...delivery,turnstile_verified:false}).ok,false);
failRole='qa@example.com';context.sendPendingInquiryEmails();assert.equal(sent.length,1);assert.equal(rows[1][16],'Sent');assert.equal(rows[1][18],'Retry');
assert.equal(sent[0].to,'ecuadoreanexperience@gmail.com');assert.equal(sent[0].replyTo,'qa@example.com');assert.ok(sent[0].htmlBody.includes('&lt;script&gt;'));assert.ok(!sent[0].htmlBody.includes('<script>'));
failRole='';context.sendPendingInquiryEmails();assert.equal(sent.length,2);assert.equal(rows[1][18],'Sent');assert.equal(sent[1].replyTo,'ecuadoreanexperience@gmail.com');assert.ok(!sent[1].htmlBody.includes('IMPORTXML'));
for(const mail of sent){assert.equal((mail.htmlBody.match(/<img /g)||[]).length,8);assert.equal((mail.htmlBody.match(/<td colspan="2"/g)||[]).length,1);for(const brand of ['experienceecuador.com/','mindobirdwatching.com/','experiencetheamazon.com/','thecloudforestretreat.com/','chocoandinotours.com/','mindotours.com/','mindotrailclub.com/']) assert.ok(mail.htmlBody.includes('href="https://'+brand+'"'));assert.ok(mail.body.includes('The Experience Ecuador Team'));}
context.sendPendingInquiryEmails();assert.equal(sent.length,2);
const pending={...delivery,inquiry_id:crypto.randomUUID()};run(pending);quota=0;context.sendPendingInquiryEmails();assert.equal(rows[2][16],'Pending');assert.equal(sent.length,2);
quota=100;failRole='qa@example.com';for(let i=0;i<3;i++)context.sendPendingInquiryEmails();assert.equal(rows[2][16],'Sent');assert.equal(rows[2][18],'Needs attention');const sentBefore=sent.length;context.sendPendingInquiryEmails();assert.equal(sent.length,sentBefore);
failRole='';run({...delivery,inquiry_id:crypto.randomUUID()});failSentWrite=true;const beforeAmbiguous=sent.length;assert.throws(()=>context.sendPendingInquiryEmails());assert.equal(rows[3][16],'Sending');assert.equal(sent.length,beforeAmbiguous+1);failSentWrite=false;context.sendPendingInquiryEmails();assert.equal(sent.length,beforeAmbiguous+2);assert.equal(rows[3][16],'Sending');
rows[0][16]='Unrelated column';assert.equal(run({...delivery,inquiry_id:crypto.randomUUID()}).ok,false);
console.log('PASS: private receiver, safe cells, queue-only intake, per-recipient retries, no duplicate email on replay, quota deferral, retry limits, HTML escaping, guest privacy, linked logos, signature and reply routing.');

for (const route of ['explore/index.html','es/explora/index.html']) {
  const html=fs.readFileSync(new URL('../'+route,import.meta.url),'utf8');
  for(const type of ['Learn more','Collaborate','Website review']) assert.ok(html.includes('<option value="'+type+'">'),route+' is missing a selectable '+type+' option');
  assert.doesNotMatch(html,/<\/option\s+[^>]+>/i);
}
console.log('PASS: all three inquiry types have valid selectable option elements on both pages.');
