# Explore business inquiries

English form on `/explore/` and `/es/explora/`. Existing page languages and SEO relationships are preserved. The form itself declares `lang="en"`.

## Receiver

Workbook: `182aFZzuQA7Vicbh0GY5hdvicrp4caxKsYmRRfZ_BgTc`, `Inquiries` tab, A:P. The `Form fields` tab documents every user-facing and automatic field. Workbook general access must remain Restricted.

Deploy the bound Apps Script `Code.gs` as the workbook owner. Set a long random `GATEWAY_SECRET` in Script Properties. The web app accepts unauthenticated HTTP requests, but all writes require this private secret and the fixed workbook ID. It exposes no inquiry reads. The deployed initial project uses the same private secret embedded in its private source rather than Script Properties; never copy that deployed source into Git.

Cloudflare Pages production variables:

- Existing `TURNSTILE_SECRET` and `TURNSTILE_SITE_KEY` (reused).
- `BUSINESS_INQUIRY_URL`: Apps Script `/exec` deployment URL.
- `BUSINESS_INQUIRY_SECRET`: matching gateway secret.

The browser posts only to `/api/business-inquiry`. The function validates required fields, bounds, inquiry type, website URL, same-origin request, Turnstile success, hostname and `business_inquiry` action. It forwards an allowlisted payload without the Turnstile token. The receiver locks writes, deduplicates inquiry IDs, neutralizes spreadsheet formulas, and confirms a flushed row before returning success. No inquiry content is logged or sent to analytics.

## Verification

Run `node scripts/test-business-inquiry.mjs` for isolated function tests with mocked external services. These tests never submit inquiries to Google.

Live QA must additionally confirm: desktop/mobile rendering, both routes, three conditional paths, automatic first-letter capitalization, actual Turnstile verification, a marked QA inquiry visible in the private Sheet, and a visible success reference matching that row. Passing mock tests is not live end-to-end verification.

## Editorial record

Added two English hero actions and a short inquiry introduction. Form fields and confirmation are English as explicitly requested, including on the Spanish page. No response-time, pricing, availability, ranking or website-review outcome is promised. No travel claims or existing bilingual metadata changed.

## Confirmation emails

The owner authorized MailApp send-email access and a one-minute Apps Script trigger. Run `setupInquiryEmails()` once. It adds Q:V tracking columns and idempotently installs `sendPendingInquiryEmails`. Intake only saves and queues; the worker sends the admin notice to `ecuadoreanexperience@gmail.com` and the thank-you to the saved guest email. Existing rows without Pending/Retry status are not mailed retroactively.

Each recipient has its own status and UTC acceptance timestamp. A transient send failure retries up to three processing attempts; an exhausted daily quota leaves mail pending. `Needs attention` requires manual review. `Sending` means a send was reserved; if execution fails after email acceptance but before status persistence, automatic processing does not resend that ambiguous delivery. `Sent` records MailApp acceptance; QA separately verifies inbox arrival.

Both plain text and escaped HTML bodies contain the established Team signature. Seven PNG logos link to Experience Ecuador and all six affiliated brand websites, arranged in two columns with the final logo centered. Admin Reply-To is the guest; guest Reply-To is the admin. Guest receipts include the inquiry type and reference, without echoing the submitted message or exposing the private Sheet.

The browser keeps a submission reference for unchanged retries, and the backend forwards it to the deduplicating receiver. Editing the inquiry creates a new reference. Verification retry keeps entered fields, and slow/unsupported verification produces an actionable message. No client or server path accepts unverified submissions.
