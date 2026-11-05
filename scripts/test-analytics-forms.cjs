const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('assets/js/header.js','utf8');
const pick=(start,end)=>source.slice(source.indexOf(start),source.indexOf(end,source.indexOf(start)));
const form={id:'eeTripEmailForm',getAttribute:k=>k==='data-analytics-form'?'trip_builder_email_form':null};
const context={window:{EE_ENV:{isProduction:true},EEAttribution:{getEventParameters:()=>({first_touch_source:'qa'})}},document:{querySelectorAll:()=>[form]},eeAnalyticsGetPageMeta:()=>({page_path:'/trip-builder/',page_language:'en',page_type:'trip_builder'})};
vm.createContext(context);vm.runInContext(pick('  function eeAnalyticsCleanPayload','  function eeAnalyticsGetLinkType')+pick('  function eeAnalyticsMarkFormStart','  function eeAnalyticsInitForms'),context);
assert.equal(context.eeAnalyticsMarkFormStart('trip_builder_email_form',form),true);
assert.equal(context.eeAnalyticsMarkFormStart('trip_builder_email_form'),false);
assert.equal(context.window.dataLayer.length,1);
assert.equal(context.window.dataLayer[0].page_language,'en');assert.equal(context.window.dataLayer[0].first_touch_source,'qa');
context.eeAnalyticsSend('form_submit_success',{form_name:'trip_builder_email_form'});assert.equal(context.window.dataLayer.length,2);assert.equal(context.window.dataLayer[1].page_path,'/trip-builder/');
assert.match(source,/emit: eeAnalyticsSend/);assert.match(source,/markFormStart: eeAnalyticsMarkFormStart/);
for(const path of ['trip-builder/index.html','es/planificador-de-viajes/index.html']){const html=fs.readFileSync(path,'utf8');assert.match(html,/eeAnalytics\.emit/);assert.match(html,/data-ee-planning-handoff/);for(const script of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){if(script[1].includes("application/ld+json"))JSON.parse(script[2]);else new Function(script[2]);}}
console.log('PASS: one form start across focus/submit, event context preserved, both planner scripts valid');
