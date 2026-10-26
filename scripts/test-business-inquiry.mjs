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
globalThis.fetch=original;
console.log('PASS: name normalization, required fields, conditional URL, size limits, honeypot, origin checks, missing/failed/wrong-host/wrong-action Turnstile, successful save and failed save.');

// Exercise the Apps Script receiver independently of Google with test doubles.
const vm=await import('node:vm');
const receiver=fs.readFileSync(new URL('../deployment/business-inquiries/Code.gs',import.meta.url),'utf8');
let storedRows=[];
const context={
  ContentService:{MimeType:{JSON:'json'},createTextOutput:text=>({text,setMimeType(){return this;}})},
  PropertiesService:{getScriptProperties:()=>({getProperty:()=> 'mock-secret'})},
  LockService:{getScriptLock:()=>({waitLock(){},hasLock:()=>true,releaseLock(){}})},
  SpreadsheetApp:{openById:id=>{assert.equal(id,'182aFZzuQA7Vicbh0GY5hdvicrp4caxKsYmRRfZ_BgTc');return {getSheetByName:name=>{assert.equal(name,'Inquiries');return {
    getRange:(...args)=>({getValue:()=> 'Inquiry ID',createTextFinder:id=>({matchEntireCell(){return this;},findNext:()=>storedRows.find(r=>r[0]===id)}),setNumberFormat(){return this;},setValues:rows=>{storedRows.push(...rows);}}),getLastRow:()=>storedRows.length+1
  };}};},flush(){}}
};
vm.createContext(context);vm.runInContext(receiver,context);
const delivery={...base,inquiry_id:crypto.randomUUID(),submitted_at:new Date().toISOString(),sheet_id:'182aFZzuQA7Vicbh0GY5hdvicrp4caxKsYmRRfZ_BgTc',turnstile_verified:true,gateway_secret:'mock-secret',message:'=IMPORTXML("https://example.com","//a")'};
const run=p=>JSON.parse(context.doPost({postData:{contents:JSON.stringify(p)}}).text);
assert.equal(run({...delivery,gateway_secret:'wrong'}).ok,false);assert.equal(storedRows.length,0);
assert.equal(run(delivery).ok,true);assert.equal(storedRows.length,1);assert.equal(storedRows[0][11].startsWith("'="),true);assert.equal(storedRows[0].length,16);
assert.equal(run(delivery).ok,true);assert.equal(storedRows.length,1);
assert.equal(run({...delivery,turnstile_verified:false}).ok,false);
console.log('PASS: receiver gateway authentication, fixed destination, formula neutralization, 16-column order, duplicate delivery protection, verification requirement.');
