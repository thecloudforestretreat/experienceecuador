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
    if (!received) setStatus(message, true);
  };
  async function init() {
    try {
      const response = await fetch('/api/business-inquiry', {cache:'no-store'});
      const config = await response.json();
      if (!response.ok || !config.ready || !config.sitekey) throw new Error();
      const container = document.getElementById('inquiry-turnstile');
      window.eeInquiryVerified = value => {
        token=value; submit.disabled=busy;
        if (!received) setStatus('Ready to send.');
      };
      window.eeInquiryExpired = () => invalidate('Verification expired. Please verify again.');
      window.eeInquiryError = () => invalidate('Verification could not load. Please reload this page.');
      container.classList.add('cf-turnstile');
      container.dataset.sitekey=config.sitekey;
      container.dataset.action='business_inquiry';
      container.dataset.language='en';
      container.dataset.theme='light';
      container.dataset.callback='eeInquiryVerified';
      container.dataset.expiredCallback='eeInquiryExpired';
      container.dataset.errorCallback='eeInquiryError';
      widget='#inquiry-turnstile';
      const script = document.createElement('script');
      script.src='https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async=true;
      script.defer=true;
      script.onerror=window.eeInquiryError;
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
