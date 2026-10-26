# QA record — 2026-10-26

- Backend tests: passed required fields, first-letter name normalization (including accented letters), inquiry paths, URL validation, limits, same-origin protection, Turnstile failures and hostname/action mismatches, save success and save failure.
- Receiver tests: passed gateway-secret checks, fixed workbook destination, formula neutralization, column order, duplicate handling and verification requirement.
- Browser QA: desktop and 390px mobile form layout passed. English form is present on both `/explore/` and `/es/explora/`. Name inputs convert `élise` to `Élise` and `o’Neill` to `O’Neill` after blur. Conditional website-review fields show correctly.
- Cloudflare preview: build passed; both routes return HTTP 200 with unique form IDs and preserved canonical metadata. The unconfigured preview refuses submissions.
- Google Sheet: `Inquiries` and `Form fields` created; header frozen; intake filter enabled; field guide visually checked in Google Sheets. General access is Restricted (private to owner).
- Receiver deployment: owner-authorized Apps Script version 1 deployed. Google project ID: `1nbvjdKA8k_eXuVrne_5ZMZVGrMsNNREKUog7n6XOtmCjUo-fT453O5c4`.
- Cloudflare production: `BUSINESS_INQUIRY_SECRET` and `BUSINESS_INQUIRY_URL` configured; existing Turnstile variables preserved.
- Direct receiver integration: invalid secret rejected; QA inquiry `50d95e28-6fc7-4929-8653-1232c87da3ce` saved; repeated delivery returned success without creating a second row. Verified A1:P3 by copying the live Sheet selection. This test exercises the receiver independently and does not verify a real Turnstile challenge.
- Production publication: pending explicit owner approval after automatic approval review rejected the merge as outside the prior receiver-deployment approval.
- Live browser-to-Turnstile-to-Sheet QA: pending publication.

QA rows are explicitly marked `[QA TEST — IGNORE]` and use `qa@example.com`; they are not customer leads.
