(() => {
  const form = document.getElementById('businessInquiryForm');
  if (!form) return;
  const status = document.getElementById('inquiry-status');
  const submit = form.querySelector('button[type="submit"]');
  const type = form.elements.inquiry_type;
  let widget;
  let token = '';
  let busy = false;
  let received = false;
  const setStatus = (message, error = false) => {
    status.textContent = message;
    status.dataset.error = String(error);
  };
  const capitalize = value => value.trim().replace(/^\p{L}/u, c => c.toLocaleUpperCase('en'));
  ['first_name', 'last_name'].forEach(name => {
    form.elements[name].addEventListener('blur', event => { event.target.value = capitalize(event.target.value); });
  });
  const updateFields = () => {
    form.querySelectorAll('[data-inquiry-types]').forEach(group => {
      const active = group.dataset.inquiryTypes.split(',').includes(type.value);
      group.hidden = !active;
      group.disabled = !active;
    });
    form.elements.website_url.required = type.value === 'Website review';
    document.getElementById('website-required').textContent = type.value === 'Website review' ? '*' : '(optional)';
  };
  type.addEventListener('change', updateFields);
  updateFields();
  const invalidate = message => {
    token = '';
    submit.disabled = true;
    setStatus(message, true);
  };
  async function init() {
    try {
      const response = await fetch('/api/business-inquiry', {cache:'no-store'});
      const config = await response.json();
      if (!response.ok || !config.ready || !config.sitekey) throw new Error();
      window.eeInquiryTurnstileReady = () => {
        widget = window.turnstile.render('#inquiry-turnstile', {
          sitekey:config.sitekey, action:'business_inquiry', language:'en', theme:'light',
          callback: value => {token=value; submit.disabled=busy; if (!received) setStatus('Ready to send.');},
          'expired-callback': () => invalidate('Verification expired. Please verify again.'),
          'error-callback': () => invalidate('Verification could not load. Please retry or reload this page.')
        });
      };
      const script = document.createElement('script');
      script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?onload=eeInquiryTurnstileReady&render=explicit';
      script.async=true;
      script.onerror=()=>invalidate('Verification could not load. Please reload this page.');
      document.head.appendChild(script);
    } catch { invalidate('The inquiry form is temporarily unavailable. Please use our contact page.'); }
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;
    received=false;
    ['first_name','last_name'].forEach(name => {form.elements[name].value=capitalize(form.elements[name].value);});
    if (!form.reportValidity()) return;
    if (!token) {invalidate('Please complete the security verification.'); return;}
    busy=true; submit.disabled=true; setStatus('Sending your inquiry…');
    const payload=Object.fromEntries(new FormData(form));
    payload.turnstile_token=token;
    payload.source_page=location.pathname;
    try {
      const response=await fetch('/api/business-inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const result=await response.json();
      if (!response.ok || result.ok !== true) throw new Error(result.message || 'Your inquiry could not be saved. Please try again.');
      received=true; form.reset(); updateFields();
      setStatus('Thank you. Your inquiry has been received. Reference: '+result.inquiry_id);
      window.dataLayer?.push({event:'business_inquiry_success',inquiry_type:payload.inquiry_type,form_language:'en'});
    } catch(error) {setStatus(error.message || 'Your inquiry could not be saved. Please try again.',true);}
    finally {
      busy=false; token=''; submit.disabled=true;
      if (window.turnstile && widget !== undefined) window.turnstile.reset(widget);
    }
  });
  init();
})();
