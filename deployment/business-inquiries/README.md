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
