// Deploy as owner, access Anyone. Requests still require the private gateway secret.
// Set GATEWAY_SECRET in Script Properties before deployment. Never commit its value.
const INQUIRY_SHEET_ID = '182aFZzuQA7Vicbh0GY5hdvicrp4caxKsYmRRfZ_BgTc';
function doPost(e) {
  const reply = value => ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  const safe = value => {
    const text = String(value == null ? '' : value);
    return /^[=+@\-\t\r]/.test(text) ? "'" + text : text;
  };
  let lock;
  try {
    const p = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty('GATEWAY_SECRET');
    if (!secret || p.gateway_secret !== secret || p.sheet_id !== INQUIRY_SHEET_ID || p.turnstile_verified !== true || !/^[0-9a-f-]{36}$/i.test(p.inquiry_id)) return reply({ok:false});
    lock = LockService.getScriptLock();
    lock.waitLock(15000);
    const sheet = SpreadsheetApp.openById(INQUIRY_SHEET_ID).getSheetByName('Inquiries');
    if (!sheet || sheet.getRange(1,1).getValue() !== 'Inquiry ID') throw new Error('Sheet configuration mismatch');
    const duplicate = sheet.getRange('A:A').createTextFinder(p.inquiry_id).matchEntireCell(true).findNext();
    if (!duplicate) {
      const row = [p.inquiry_id,p.submitted_at,p.first_name,p.last_name,p.email,p.inquiry_type,p.organization,p.website_url,p.experience,p.travel_dates,p.improvement_goals,p.message,p.source_page,'en','New','Yes'].map(safe);
      sheet.getRange(sheet.getLastRow()+1,1,1,row.length).setNumberFormat('@').setValues([row]);
      SpreadsheetApp.flush();
    }
    return reply({ok:true,inquiry_id:p.inquiry_id});
  } catch (error) { return reply({ok:false}); }
  finally { if(lock && lock.hasLock()) lock.releaseLock(); }
}
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ok:false,message:'Use the website inquiry form.'})).setMimeType(ContentService.MimeType.JSON);
}
