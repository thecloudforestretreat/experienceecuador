/* Public route preferences only; no customer data is placed in URLs or analytics. */
(async()=>{
  'use strict';
  const planner=document.querySelector('[data-ruta-planner]');
  const form=document.querySelector('#tripIntake');
  const query=new URLSearchParams(location.search);
  const isContext=Boolean(form&&document.body.dataset.region==='coast'&&query.get('route')==='ruta-del-sol'&&['3','5','7'].includes(query.get('days')));
  if(!planner&&!isContext)return;
  const lang=document.documentElement.lang==='es'?'es':'en';
  const es=lang==='es';
  const track=(event,days)=>{
    if(!window.EE_ENV?.analyticsEnabled&&!['experienceecuador.com','www.experienceecuador.com'].includes(location.hostname))return;
    window.dataLayer=window.dataLayer||[];
    // Reuse the site's existing click-event contract; no GTM permission changes are needed.
    window.dataLayer.push({event:'hub_section_cta_click',cta_label:event,cta_location:'ruta_route_planner',page_type:document.body.dataset.pageType||'region_destination_page',page_path:location.pathname,route_id:'ruta-del-sol',route_days:Number(days),page_language:lang,region:'coast'});
  };
  let config;
  try{
    const response=await fetch('/assets/data/ruta-del-sol.json',{cache:'no-cache'});
    if(!response.ok)throw Error('Route data unavailable');
    config=await response.json();
    if(!config.plans||!['3','5','7'].every(d=>config.plans[d]))throw Error('Invalid route data');
  }catch{
    const button=document.querySelector('#ruta-load-map');
    if(button){button.disabled=true;button.textContent=es?'Usa el enlace de Google Maps de abajo':'Use the Google Maps link below';}
    if(isContext){const banner=document.querySelector('#ruta-context');banner.hidden=false;document.querySelector('#ruta-context-status').textContent=es?'Escribe Ruta del Sol y la duración que prefieres en las notas de Costa.':'Please write Ruta del Sol and your preferred duration in the Coast notes.';}
    return;
  }
  if(planner){
    let selected=['3','5','7'].includes(query.get('days'))?query.get('days'):'5',mapLoaded=false;
    const frame=document.querySelector('#ruta-map-frame');
    const renderMap=()=>{
      const embed=config.plans[selected].embed;
      const src=(es?embed.replaceAll('!1sen!2sus','!1ses!2sus'):embed)+'&hl='+lang;
      let iframe=frame.querySelector('iframe');
      if(iframe&&iframe.getAttribute('src')===src)return;
      if(!iframe){iframe=document.createElement('iframe');iframe.title=es?'Ruta del Sol: recorrido en Google Maps':'Ruta del Sol route in Google Maps';iframe.loading='lazy';iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.allowFullscreen=true;frame.replaceChildren(iframe);}
      iframe.src=src;
    };
    const render=()=>{
      const p=config.plans[selected];
      document.querySelector('#ruta-plan-title').textContent=p.title[lang];
      document.querySelector('#ruta-plan-nights').textContent=p.nights[lang];
      const list=document.querySelector('#ruta-plan-steps');list.replaceChildren();
      for(const [day,description] of p.steps[lang]){const li=document.createElement('li'),strong=document.createElement('strong'),text=document.createElement('p');strong.textContent=day;text.textContent=description;li.append(strong,text);list.append(li);}
      const stops=document.querySelector('#ruta-stops');stops.replaceChildren();
      p.stops.forEach((name,i)=>{const li=document.createElement('li'),number=document.createElement('span'),label=document.createElement('span');number.className='rutaStopNumber';number.textContent=String(i+1);label.textContent=name;li.append(number,label);stops.append(li);});
      document.querySelector('#ruta-directions').href=p.directions+'&hl='+lang;
      const profile=es?'/es/planifica-tu-viaje/costa/':'/plan-your-trip/coast/';
      document.querySelector('#ruta-inquiry').href=profile+'?route=ruta-del-sol&days='+selected+'#ruta-context';
      if(mapLoaded)renderMap();
    };
    planner.querySelector('.rutaControls').hidden=false;
    planner.querySelectorAll('input[name="ruta_days"]').forEach(input=>{input.checked=input.value===selected;});
    planner.querySelectorAll('input[name="ruta_days"]').forEach(input=>input.addEventListener('change',()=>{if(!input.checked||!config.plans[input.value])return;selected=input.value;render();const url=new URL(location.href);url.searchParams.set('days',selected);history.replaceState(null,'',url);track('route_plan_select',selected);}));
    document.querySelector('#ruta-load-map').addEventListener('click',()=>{mapLoaded=true;renderMap();track('route_map_load',selected);});
    document.querySelector('#ruta-inquiry').addEventListener('click',()=>track('route_inquiry_click',selected));
    document.querySelector('#ruta-directions').addEventListener('click',()=>track('route_directions_click',selected));
    render();
  }
  if(isContext){
    const days=query.get('days'),p=config.plans[days],banner=document.querySelector('#ruta-context'),notes=form.elements.region_coast_notes,regionDays=form.elements.region_days;
    if(!notes||!regionDays)return;
    banner.hidden=false;
    document.querySelector('#ruta-context-summary').textContent=p.title[lang]+' · '+p.nights[lang];
    const marker=/\n?\[Ruta del Sol\][\s\S]*?\[\/Ruta del Sol\]\n?/g;
    const sync=()=>{
      const original=notes.value.replace(marker,'').trim();
      const arrival=form.elements.region_arrival_city?.value.trim();
      const transport=form.elements.region_transport_preference;
      const transportLabel=transport?.value?transport.options[transport.selectedIndex].textContent:'';
      const lines=['[Ruta del Sol]',p.title[lang],p.nights[lang],p.stops.join(' → ')];
      if(arrival)lines.push((es?'Ciudad de llegada: ':'Arrival city: ')+arrival);
      if(transportLabel)lines.push((es?'Transporte: ':'Transport: ')+transportLabel);
      lines.push(es?'Ejemplo para revisar; no es un itinerario confirmado.':'Example for review; not a confirmed itinerary.','[/Ruta del Sol]');
      notes.value=(original?original+'\n\n':'')+lines.join('\n');
    };
    sync();
    if(!regionDays.value)regionDays.value=days;
    const mismatch=String(regionDays.value)!==days;
    document.querySelector('#ruta-context-status').textContent=(es?'La ruta se añadió a tus notas de Costa. Revisa los detalles antes de enviar.':'The route has been added to your Coast notes. Review the details before sending.')+(mismatch?(es?' Conservamos la duración de tu borrador; puedes ajustarla abajo.':' Your saved trip duration has been kept; you can adjust it below.'):'');
    // This existing field is part of the serialized regional answers and owner-readable notes.
    for(const name of ['region_arrival_city','region_transport_preference'])form.elements[name]?.addEventListener('input',sync);
    form.addEventListener('submit',sync,true);
  }
})();
