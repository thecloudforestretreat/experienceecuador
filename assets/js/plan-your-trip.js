(()=>{
  const ENDPOINT="https://script.google.com/macros/s/AKfycbw3VE2lIwy5cg_XqZmVVFBsA-dkXlLcDDiIRiPi6sW_8PWnP7yVdLLbh0xiV7I9tQXkqg/exec";
  const form=document.querySelector("#tripIntake");
  const isSpanish=document.documentElement.lang==="es";
  const push=(event,extra={})=>{
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({
      event,
      page_type:document.body.dataset.pageType||"plan_your_trip",
      page_language:document.documentElement.lang,
      page_path:location.pathname,
      region:document.body.dataset.region||"ecuador",
      ...extra
    });
  };
  const capitalizeName=value=>String(value||"").trim().replace(
    /(^|[\s'’-])([a-záéíóúüñ])/giu,
    (match,separator,character)=>separator+character.toLocaleUpperCase(isSpanish?"es-EC":"en-US")
  );
  const capitalizeFirst=value=>{
    const text=String(value||"").replace(/^\s+/,"");
    return text.replace(
      /^([a-záéíóúüñ])/iu,
      character=>character.toLocaleUpperCase(isSpanish?"es-EC":"en-US")
    );
  };
  const personNameSelector='input[name="first_name"],input[name="last_name"]';
  document.querySelectorAll(personNameSelector).forEach(input=>{
    input.setAttribute("autocapitalize","words");
    input.addEventListener("blur",()=>{
      input.value=capitalizeName(input.value);
      input.dispatchEvent(new Event("input",{bubbles:true}));
    });
  });
  const groupNameInput=document.querySelector('input[name="group_name"]');
  if(groupNameInput){
    groupNameInput.setAttribute("autocapitalize","sentences");
    groupNameInput.addEventListener("blur",()=>{
      groupNameInput.value=capitalizeFirst(groupNameInput.value);
      groupNameInput.dispatchEvent(new Event("input",{bubbles:true}));
    });
  }
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
  document.querySelectorAll("[data-analytics-event]").forEach(el=>el.addEventListener("click",()=>push(
    el.dataset.analyticsEvent,
    {
      cta_label:el.dataset.analyticsLabel||el.textContent.trim(),
      cta_location:el.dataset.analyticsLocation||"",
      link_url:el.href||""
    }
  )));
  document.querySelectorAll(".pytFaq details").forEach(details=>details.addEventListener("toggle",()=>{
    if(details.open) push("faq_expand",{section_name:details.querySelector("summary")?.textContent.trim()||""});
  }));
  if(!form) return;
  let step=1;
  let started=false;
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
    for(const input of form.querySelectorAll(personNameSelector)) input.value=capitalizeName(input.value);
    if(groupNameInput) groupNameInput.value=capitalizeFirst(groupNameInput.value);
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
    if(!started){
      started=true;
      push("form_start",{form_name:"regional_trip_intake"});
    }
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
        const details=Array.isArray(result.errors)&&result.errors.length
          ?result.errors.join("; ")
          :result.message||"The form was not accepted.";
        const code=result.diagnostic_code?" ["+result.diagnostic_code+"]":"";
        throw new Error(details+code);
      }
      status.textContent=isSpanish
        ?"¡Gracias! Recibimos tu perfil y te responderemos personalmente."
        :"Thank you! We received your profile and will follow up personally.";
      push("form_submit_success",{form_name:"regional_trip_intake"});
      localStorage.removeItem(draftKey);
      form.reset();
    }catch(error){
      const detail=String(error?.message||error||"Unknown submission error");
      status.textContent=isSpanish
        ?"No se pudo enviar: "+detail+" Si necesitas ayuda, escribe a info@experienceecuador.com."
        :"We could not submit the form: "+detail+" If you need help, email info@experienceecuador.com.";
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
