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
    /(^|[\\s'’-])([a-záéíóúüñ])/giu,
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
      await fetch(ENDPOINT,{
        method:"POST",
        mode:"no-cors",
        headers:{"Content-Type":"text/plain"},
        body:JSON.stringify(values())
      });
      status.textContent=isSpanish
        ?"¡Gracias! Recibimos tu perfil y te responderemos personalmente."
        :"Thank you! We received your profile and will follow up personally.";
      push("form_submit_success",{form_name:"regional_trip_intake"});
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
