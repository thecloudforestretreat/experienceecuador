// Deploy as owner, access Anyone. All intake writes require the private gateway secret.
const INQUIRY_SHEET_ID = '182aFZzuQA7Vicbh0GY5hdvicrp4caxKsYmRRfZ_BgTc';
const ADMIN_EMAIL = 'ecuadoreanexperience@gmail.com';
const MAIL_HEADERS = ['Admin email status','Admin emailed at (UTC)','Guest email status','Guest emailed at (UTC)','Email attempts','Email last error'];
const INQUIRY_KEYS = ['inquiry_id','submitted_at','first_name','last_name','email','inquiry_type','organization','website_url','experience','travel_dates','improvement_goals','message','source_page','form_language','status','turnstile_verified'];
const MAIL_BRANDS = [
  ['Experience Ecuador','https://experienceecuador.com/','https://experienceecuador.com/assets/logo-experience-ecuador-small.png'],
  ['Mindo Bird Watching','https://mindobirdwatching.com/','https://mindobirdwatching.com/assets/images/logo/mbw-logo-mark-1024.png'],
  ['Experience the Amazon','https://experiencetheamazon.com/','https://experiencetheamazon.com/assets/logo/eta_logo_trans_256.png'],
  ['The Cloud Forest Retreat','https://thecloudforestretreat.com/','https://thecloudforestretreat.com/assets/images/tcfr_logo_transparent.png']
];
function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function safeCell_(value) { const text=String(value == null?'':value); return /^[=+@\-\t\r]/.test(text)?"'"+text:text; }
function escapeHtml_(value) { return String(value == null?'':value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function ensureMailColumns_(sheet) {
  if(sheet.getMaxColumns()<22) sheet.insertColumnsAfter(sheet.getMaxColumns(),22-sheet.getMaxColumns());
  const range=sheet.getRange(1,17,1,6), current=range.getValues()[0];
  if(current.some((v,i)=>v && v!==MAIL_HEADERS[i])) throw new Error('Email column configuration mismatch');
  range.setValues([MAIL_HEADERS]).setFontWeight('bold').setBackground('#eeeeee').setWrap(true);
  sheet.setColumnWidths(17,6,180);
}
function doPost(e) {
  let lock;
  try {
    const p=JSON.parse(e.postData.contents);
    const secret=PropertiesService.getScriptProperties().getProperty('GATEWAY_SECRET');
    if(!secret || p.gateway_secret!==secret || p.sheet_id!==INQUIRY_SHEET_ID || p.turnstile_verified!==true || !/^[0-9a-f-]{36}$/i.test(p.inquiry_id)) return json_({ok:false});
    lock=LockService.getScriptLock();lock.waitLock(15000);
    const sheet=SpreadsheetApp.openById(INQUIRY_SHEET_ID).getSheetByName('Inquiries');
    if(!sheet || sheet.getRange(1,1).getValue()!=='Inquiry ID') throw new Error('Sheet configuration mismatch');
    ensureMailColumns_(sheet);
    const duplicate=sheet.getRange('A:A').createTextFinder(p.inquiry_id).matchEntireCell(true).findNext();
    if(!duplicate) {
      const row=INQUIRY_KEYS.map(key=>safeCell_(key==='form_language'?'en':key==='status'?'New':key==='turnstile_verified'?'Yes':p[key]));
      sheet.getRange(sheet.getLastRow()+1,1,1,22).setNumberFormat('@').setValues([row.concat(['Pending','','Pending','',0,''])]);
      SpreadsheetApp.flush();
    }
    return json_({ok:true,inquiry_id:p.inquiry_id});
  } catch(error) { return json_({ok:false}); }
  finally { if(lock && lock.hasLock()) lock.releaseLock(); }
}
function doGet() { return json_({ok:false,message:'Use the website inquiry form.'}); }
function signatureHtml_() {
  const logos=MAIL_BRANDS.map(brand=>'<td width="50%" valign="top" style="padding:12px 8px;text-align:center"><a href="'+brand[1]+'" style="color:#034ea2;text-decoration:none"><img src="'+brand[2]+'" alt="'+brand[0]+'" width="88" style="display:block;max-width:88px;max-height:88px;width:88px;height:auto;margin:0 auto 8px;border:0"><span style="display:block;font-size:12px;line-height:18px">'+brand[0]+'</span></a></td>');
  return '<p style="margin:28px 0 4px">Warm regards,<br><strong>The Experience Ecuador Team</strong><br><a href="https://experienceecuador.com/" style="color:#034ea2">www.ExperienceEcuador.com</a><br><a href="mailto:'+ADMIN_EMAIL+'" style="color:#034ea2">'+ADMIN_EMAIL+'</a></p><p style="font-size:12px;line-height:20px"><a href="https://instagram.com/experience.ecuador" style="color:#034ea2">Instagram</a> · <a href="https://tiktok.com/@experienceecuador" style="color:#034ea2">TikTok</a> · <a href="https://facebook.com/ExperienceEcuador/" style="color:#034ea2">Facebook</a> · <a href="https://x.com/Exp_Ecuador" style="color:#034ea2">X</a> · <a href="https://youtube.com/@experienceecuador" style="color:#034ea2">YouTube</a></p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #dce4eb;margin-top:20px"><tr>'+logos.slice(0,2).join('')+'</tr><tr>'+logos.slice(2).join('')+'</tr></table>';
}
function emailShell_(title,content) {
  return '<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta charset="utf-8"><title>'+escapeHtml_(title)+'</title></head><body style="margin:0;background:#f3f6fa;color:#143149;font:15px Arial,Helvetica,sans-serif;line-height:1.6"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fff;border:1px solid #dce4eb;border-radius:12px"><tr><td style="padding:24px"><a href="https://experienceecuador.com/"><img src="https://experienceecuador.com/assets/logo-experience-ecuador-small.png" alt="Experience Ecuador" width="64" style="display:block;width:64px;height:auto;border:0"></a><h1 style="font-size:24px;line-height:1.25;margin:20px 0;color:#073858">'+escapeHtml_(title)+'</h1>'+content+signatureHtml_()+'<p style="font-size:11px;color:#526675;border-top:1px solid #dce4eb;padding-top:16px">This email relates to an inquiry submitted through Experience Ecuador. <a href="https://experienceecuador.com/privacy-policy/" style="color:#034ea2">Privacy policy</a></p></td></tr></table></td></tr></table></body></html>';
}
function signatureText_() { return '\nWarm regards,\nThe Experience Ecuador Team\nhttps://experienceecuador.com/\n'+ADMIN_EMAIL+'\n\n'+MAIL_BRANDS.map(b=>b[0]+': '+b[1]).join('\n'); }
function buildInquiryEmail_(p,role,rowNumber) {
  const ref=String(p.inquiry_id), short=ref.slice(0,8), guest=role==='guest';
  const name=[p.first_name,p.last_name].filter(Boolean).join(' ');
  const subject=(guest?'Thank you — we received your inquiry':'New inquiry: '+p.inquiry_type+' — '+name).replace(/[\r\n]+/g,' ')+' | Experience Ecuador ['+short+']';
  let html,text;
  if(guest) {
    const topic={'Learn more':'learning more or planning a visit','Collaborate':'collaborating','Website review':'a website review'}[p.inquiry_type];
    html='<p>Hi '+escapeHtml_(p.first_name || 'there')+',</p><p>Thank you for getting in touch with Experience Ecuador. We’ve received your inquiry about <strong>'+escapeHtml_(topic)+'</strong>.</p><p>Our team will review your message and reply to this email. If you’d like to add anything, simply reply here.</p><p><strong>Your reference:</strong><br><span style="overflow-wrap:anywhere;word-break:break-word">'+escapeHtml_(ref)+'</span></p><p style="font-size:13px;color:#526675">Sending an inquiry does not create a booking or confirm a service, price, or availability.</p>';
    text='Hi '+(p.first_name || 'there')+',\n\nThank you for getting in touch with Experience Ecuador. We received your inquiry about '+topic+'.\n\nOur team will review your message and reply to this email. You can add anything by replying here.\n\nYour reference: '+ref+'\n\nSending an inquiry does not create a booking or confirm a service, price, or availability.';
  } else {
    const fields=[['Reference',ref],['Received (UTC)',p.submitted_at],['Name',name],['Email',p.email],['Inquiry type',p.inquiry_type],['Organization',p.organization],['Website',p.website_url],['Experience or destination',p.experience],['Travel dates',p.travel_dates],['Website improvement goals',p.improvement_goals],['Message',p.message],['Source page','https://experienceecuador.com'+p.source_page],['Form language','English'],['Turnstile verified','Yes']].filter(f=>f[1]);
    html='<p>A new inquiry has been saved. Reply to this email to contact the guest.</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0">'+fields.map(f=>'<tr><td style="padding:10px 0;border-bottom:1px solid #e5ebf0;overflow-wrap:anywhere;word-break:break-word"><strong>'+escapeHtml_(f[0])+'</strong><br>'+escapeHtml_(f[1]).replace(/\n/g,'<br>')+'</td></tr>').join('')+'</table><p><a href="https://docs.google.com/spreadsheets/d/'+INQUIRY_SHEET_ID+'/edit#gid=2610261&amp;range=A'+rowNumber+':V'+rowNumber+'" style="display:inline-block;padding:12px 18px;background:#f4b04f;border-radius:6px;color:#123550;font-weight:bold;text-decoration:none">View saved inquiry</a></p>';
    text='A new inquiry has been saved. Reply to this email to contact the guest.\n\n'+fields.map(f=>f[0]+': '+f[1]).join('\n\n')+'\n\nPrivate inquiry sheet: https://docs.google.com/spreadsheets/d/'+INQUIRY_SHEET_ID+'/edit#gid=2610261';
  }
  return {to:guest?p.email:ADMIN_EMAIL,subject,body:text+signatureText_(),htmlBody:emailShell_(guest?'Thank you for reaching out':'New inquiry received',html),name:'Experience Ecuador',replyTo:guest?ADMIN_EMAIL:p.email};
}
function sendPendingInquiryEmails() {
  const lock=LockService.getScriptLock(); if(!lock.tryLock(5000)) return;
  try {
    const sheet=SpreadsheetApp.openById(INQUIRY_SHEET_ID).getSheetByName('Inquiries');
    if(!sheet || sheet.getMaxColumns()<22 || sheet.getLastRow()<2) return;
    const rows=sheet.getRange(2,1,sheet.getLastRow()-1,22).getValues();
    let processed=0;
    for(let index=0;index<rows.length && processed<10;index++) {
      const row=rows[index], rowNumber=index+2;
      if(!['Pending','Retry'].includes(row[16]) && !['Pending','Retry'].includes(row[18])) continue;
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(row[4]))) {sheet.getRange(rowNumber,22).setValue('Invalid saved guest email; manual review required');continue;}
      if(MailApp.getRemainingDailyQuota()<1) break;
      const attempts=Number(row[20] || 0)+1;
      sheet.getRange(rowNumber,21).setValue(attempts);
      const p={};INQUIRY_KEYS.forEach((key,i)=>p[key]=String(row[i] == null?'':row[i]));
      const failures=[];
      for(const [role,column] of [['admin',17],['guest',19]]) {
        if(!['Pending','Retry'].includes(row[column-1]) || MailApp.getRemainingDailyQuota()<1) continue;
        sheet.getRange(rowNumber,column).setValue('Sending');SpreadsheetApp.flush();
        try {
          MailApp.sendEmail(buildInquiryEmail_(p,role,rowNumber));
        } catch(error) {
          sheet.getRange(rowNumber,column).setValue(attempts>=3?'Needs attention':'Retry');
          failures.push(role+' email send failed; '+(attempts>=3?'manual review required':'queued for retry'));
          continue;
        }
        // If this status write fails after mail acceptance, keep Sending for manual review; never auto-resend an ambiguous delivery.
        sheet.getRange(rowNumber,column,1,2).setValues([['Sent',new Date().toISOString()]]);
      }
      sheet.getRange(rowNumber,22).setValue(failures.join('; '));SpreadsheetApp.flush();processed++;
    }
  } finally {lock.releaseLock();}
}
function setupInquiryEmails() {
  const sheet=SpreadsheetApp.openById(INQUIRY_SHEET_ID).getSheetByName('Inquiries');
  if(!sheet || sheet.getRange(1,1).getValue()!=='Inquiry ID') throw new Error('Wrong inquiry sheet');
  ensureMailColumns_(sheet);
  if(!ScriptApp.getProjectTriggers().some(t=>t.getHandlerFunction()==='sendPendingInquiryEmails')) ScriptApp.newTrigger('sendPendingInquiryEmails').timeBased().everyMinutes(1).create();
  console.log('Inquiry email queue configured. Available recipient quota: '+MailApp.getRemainingDailyQuota());
}
