(()=>{
  const PRODUCTION_HOSTS=new Set(["experienceecuador.com","www.experienceecuador.com"]);
  const IS_PRODUCTION=PRODUCTION_HOSTS.has(location.hostname.toLowerCase());
  const query=new URLSearchParams(location.search);
  let analyticsDebug=query.get("ee_analytics_debug")==="1";
  try{
    if(query.get("ee_analytics_debug")==="1") sessionStorage.setItem("ee_analytics_debug","1");
    if(query.get("ee_analytics_debug")==="0") sessionStorage.removeItem("ee_analytics_debug");
    analyticsDebug=analyticsDebug||sessionStorage.getItem("ee_analytics_debug")==="1";
  }catch(error){}
  const ANALYTICS_ENABLED=IS_PRODUCTION||analyticsDebug;
  window.EE_ENV=Object.freeze({
    name:IS_PRODUCTION?"production":"staging",
    isProduction:IS_PRODUCTION,
    analyticsEnabled:ANALYTICS_ENABLED
  });
  document.documentElement.dataset.eeEnvironment=window.EE_ENV.name;
  if(!IS_PRODUCTION){
    let robots=document.querySelector('meta[name="robots"]');
    if(!robots){
      robots=document.createElement("meta");
      robots.name="robots";
      document.head.appendChild(robots);
    }
    robots.content="noindex,nofollow,noarchive,nosnippet";
    const style=document.createElement("style");
    style.textContent=".eeStagingBanner{position:fixed;left:0;right:0;bottom:0;z-index:2147483647;padding:7px 12px;background:#18392b;color:#fff;font:700 12px/1.2 system-ui,sans-serif;text-align:center;letter-spacing:.04em;box-shadow:0 -2px 8px rgba(0,0,0,.2)}";
    document.head.appendChild(style);
    addEventListener("DOMContentLoaded",()=>{
      if(document.querySelector(".eeStagingBanner")) return;
      const banner=document.createElement("div");
      banner.className="eeStagingBanner";
      banner.setAttribute("role","status");
      banner.textContent="STAGING PREVIEW · "+(ANALYTICS_ENABLED?"analytics debug enabled":"analytics disabled");
      document.body.appendChild(banner);
    },{once:true});
  }
  if(!window.__eeSiteConfigLoading&&!window.EE_SITE_CONFIG){
    window.__eeSiteConfigLoading=true;
    const siteConfigScript=document.createElement("script");
    siteConfigScript.async=false;
    siteConfigScript.src="/assets/js/site-config.js?v=20261002h";
    siteConfigScript.addEventListener("load",()=>{window.__eeSiteConfigLoading=false;});
    siteConfigScript.addEventListener("error",()=>{window.__eeSiteConfigLoading=false;});
    document.head.appendChild(siteConfigScript);
  }
  if(!window.__eeHeaderLoading&&!window.__eeHeaderLoaded){
    window.__eeHeaderLoading=true;
    const headerScript=document.createElement("script");
    headerScript.async=false;
    headerScript.src="/assets/js/header.js?v=20261001j";
    headerScript.addEventListener("load",()=>{window.__eeHeaderLoading=false;});
    headerScript.addEventListener("error",()=>{window.__eeHeaderLoading=false;});
    document.head.appendChild(headerScript);
  }
  const GTM_ID="GTM-WJQXQR2H";
  if(ANALYTICS_ENABLED&&!window.__eeGtmLoaded){
    window.__eeGtmLoaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
    window.dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});
    const tagManagerScript=document.createElement("script");
    tagManagerScript.async=true;
    tagManagerScript.src="https://www.googletagmanager.com/gtm.js?id="+GTM_ID;
    document.head.appendChild(tagManagerScript);
  }
  if(!window.__eeAttributionLoading&&!window.EEAttribution){
    window.__eeAttributionLoading=true;
    const attributionScript=document.createElement("script");
    attributionScript.async=true;
    attributionScript.src="/assets/js/attribution.js?v=20260922c";
    document.head.appendChild(attributionScript);
  }
  const ENDPOINT="https://script.google.com/macros/s/AKfycbw3VE2lIwy5cg_XqZmVVFBsA-dkXlLcDDiIRiPi6sW_8PWnP7yVdLLbh0xiV7I9tQXkqg/exec";
  const form=document.querySelector("#tripIntake");
  const isSpanish=document.documentElement.lang==="es";
  const push=(event,extra={})=>{
    window.dataLayer=window.dataLayer||[];
    const payload={
      page_type:document.body.dataset.pageType||"plan_your_trip",
      page_language:document.documentElement.lang,
      page_path:location.pathname,
      region:document.body.dataset.region||"ecuador",
      ...(window.EEAttribution?.getEventParameters?.()||{}),
      ...extra
    };
    if(event.startsWith("partner_")) window.dataLayer.push({event,...payload});
    else if(typeof window.gtag==="function") window.gtag("event",event,payload);
    else window.dataLayer.push({event,...payload});
  };
  const capitalizeName=value=>String(value||"").trim().replace(
    /(^|[\s'’-])([a-záéíóúüñ])/giu,
    (match,separator,character)=>separator+character.toLocaleUpperCase(isSpanish?"es-EC":"en-US")
  );
  const nameSelector='input[name="first_name"],input[name="last_name"],input[name="group_name"]';
  document.querySelectorAll(nameSelector).forEach(input=>{
    input.setAttribute("autocapitalize","words");
    input.addEventListener("blur",()=>{
      input.value=capitalizeName(input.value);
      input.dispatchEvent(new Event("input",{bubbles:true}));
    });
  });
  document.querySelectorAll('input[type="number"]').forEach(input=>{
    input.min="0";
    input.addEventListener("input",()=>{
      if(input.value!==""&&Number(input.value)<0) input.value="0";
    });
  });
  const today=new Date();
  const todayLocal=[
    today.getFullYear(),
    String(today.getMonth()+1).padStart(2,"0"),
    String(today.getDate()).padStart(2,"0")
  ].join("-");
  const startDate=document.querySelector("#start_date");
  const endDate=document.querySelector("#end_date");
  function syncDateLimits(){
    if(startDate){
      startDate.min=todayLocal;
      if(startDate.value&&startDate.value<todayLocal) startDate.value="";
    }
    if(endDate){
      endDate.min=startDate?.value||todayLocal;
      if(endDate.value&&endDate.value<endDate.min) endDate.value="";
    }
  }
  startDate?.addEventListener("change",syncDateLimits);
  endDate?.addEventListener("change",syncDateLimits);
  syncDateLimits();
  document.querySelectorAll('.pytChoices input[data-select-all="true"]').forEach(allInput=>{
    const group=allInput.closest(".pytChoices");
    const others=[...group.querySelectorAll('input[type="checkbox"]:not([data-select-all="true"])')];
    allInput.addEventListener("change",()=>{
      others.forEach(input=>{input.checked=allInput.checked;});
      form?.dispatchEvent(new Event("input",{bubbles:true}));
    });
    others.forEach(input=>input.addEventListener("change",()=>{
      allInput.checked=others.length>0&&others.every(item=>item.checked);
    }));
  });
  document.querySelectorAll(".pytFaq details").forEach(details=>details.addEventListener("toggle",()=>{
    if(details.open) push("faq_expand",{section_name:details.querySelector("summary")?.textContent.trim()||""});
  }));
  if(!form) return;
  let step=1;
  const q=selector=>document.querySelector(selector);
  const steps=[...document.querySelectorAll(".pytStep")];
  const draftKey="ee-pyt-draft-"+document.documentElement.lang+"-"+document.body.dataset.region;
  function show(scroll=true){
    steps.forEach(item=>item.classList.toggle("is-active",Number(item.dataset.step)===step));
    q("#stepNumber").textContent=step;
    q(".pytProgress span").style.width=(step*20)+"%";
    q("#prevStep").hidden=step===1;
    q("#nextStep").hidden=step===5;
    q("#submitForm").hidden=step!==5;
    if(scroll) form.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function values(){
    for(const input of form.querySelectorAll(nameSelector)) input.value=capitalizeName(input.value);
    for(const input of form.querySelectorAll('input[type="number"]')){
      if(input.value!==""&&Number(input.value)<0) input.value="0";
    }
    const data=Object.fromEntries(new FormData(form));
    const checkboxNames=[...new Set(
      [...form.querySelectorAll('input[type="checkbox"][name]')].map(input=>input.name)
    )];
    for(const name of checkboxNames){
      data[name]=[...form.querySelectorAll('input[type="checkbox"][name="'+CSS.escape(name)+'"]:checked')]
        .map(input=>input.value)
        .join(", ");
    }
    const regional={};
    for(const [key,value] of Object.entries(data)){
      if(key.startsWith("region_")) regional[key]=value;
    }
    data.turnstile_token=data["cf-turnstile-response"]||"";
    data.region_answers_json=JSON.stringify(regional);
    data.full_submission_json=JSON.stringify(data);
    return data;
  }
  try{
    const saved=JSON.parse(localStorage.getItem(draftKey)||"null");
    if(saved){
      for(const [key,value] of Object.entries(saved)){
        const elements=form.querySelectorAll('[name="'+CSS.escape(key)+'"]');
        elements.forEach(element=>{
          if(element.type==="checkbox") element.checked=String(value).split(", ").includes(element.value);
          else if(element.name!=="cf-turnstile-response") element.value=value;
        });
      }
    }
  }catch(error){}
  syncDateLimits();
  form.addEventListener("input",()=>{
    localStorage.setItem(draftKey,JSON.stringify(values()));
  });
  q("#nextStep").onclick=()=>{
    const active=q('.pytStep[data-step="'+step+'"]');
    const invalid=[...active.querySelectorAll("[required]")].find(input=>!input.reportValidity());
    if(!invalid){
      step++;
      show();
    }
  };
  q("#prevStep").onclick=()=>{
    step--;
    show();
  };
  function submissionId(){
    if(window.crypto?.randomUUID) return window.crypto.randomUUID();
    return "pyt-"+Date.now()+"-"+Math.random().toString(36).slice(2);
  }
  function jsonpStatus(id){
    return new Promise((resolve,reject)=>{
      const callbackName="eePytStatus"+Date.now()+Math.random().toString(36).slice(2);
      const script=document.createElement("script");
      const timer=setTimeout(()=>{
        cleanup();
        reject(new Error("Confirmation timed out."));
      },10000);
      function cleanup(){
        clearTimeout(timer);
        script.remove();
        try{delete window[callbackName];}catch(error){}
      }
      window[callbackName]=result=>{
        cleanup();
        resolve(result);
      };
      script.onerror=()=>{
        cleanup();
        reject(new Error("Could not confirm the submission."));
      };
      script.src=ENDPOINT+
        "?action=status&id="+encodeURIComponent(id)+
        "&prefix="+encodeURIComponent(callbackName)+
        "&t="+Date.now();
      document.head.appendChild(script);
    });
  }
  async function waitForResult(id){
    let lastResult=null;
    for(let attempt=0;attempt<8;attempt++){
      await new Promise(resolve=>setTimeout(resolve,attempt===0?1200:900));
      lastResult=await jsonpStatus(id);
      if(lastResult?.ready) return lastResult;
    }
    throw new Error(lastResult?.message||"Submission confirmation timed out.");
  }
  form.onsubmit=async event=>{
    event.preventDefault();
    const status=q("#formStatus");
    const submit=q("#submitForm");
    const token=form.querySelector('input[name="cf-turnstile-response"]')?.value?.trim()||"";
    status.hidden=false;
    if(!token){
      status.textContent=isSpanish
        ?"Completa la verificación anti-spam antes de enviar."
        :"Please complete the anti-spam verification before submitting.";
      push("form_submit_error",{form_name:"regional_trip_intake",error_message:"Missing Turnstile token"});
      return;
    }
    status.textContent=isSpanish?"Enviando tu perfil…":"Sending your profile…";
    submit.disabled=true;
    try{
      const id=submissionId();
      const payload=values();
      window.EEAttribution?.decoratePayload?.(payload);
      payload.client_submission_id=id;
      payload.full_submission_json=JSON.stringify(payload);
      await fetch(ENDPOINT,{
        method:"POST",
        mode:"no-cors",
        headers:{"Content-Type":"text/plain"},
        body:JSON.stringify(payload)
      });
      const result=await waitForResult(id);
      if(!result.ok){
        throw new Error(result.message||result.errors?.join("; ")||"The form was not accepted.");
      }
      status.textContent=isSpanish
        ?"¡Gracias! Recibimos tu perfil y te responderemos personalmente."
        :"Thank you! We received your profile and will follow up personally.";
      push("form_submit_success",{form_name:"regional_trip_intake"});
      push("trip_builder_submit",{form_name:"regional_trip_intake"});
      localStorage.removeItem(draftKey);
      form.reset();
    }catch(error){
      status.textContent=isSpanish
        ?"No se pudo enviar. Escríbenos a info@experienceecuador.com."
        :"We could not submit the form. Please email info@experienceecuador.com.";
      push("form_submit_error",{form_name:"regional_trip_intake",error_message:String(error)});
    }finally{
      submit.disabled=false;
      try{
        if(window.turnstile) window.turnstile.reset();
      }catch(error){}
    }
  };
  show(false);
})();
