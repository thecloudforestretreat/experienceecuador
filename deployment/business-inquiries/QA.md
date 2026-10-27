# QA record — 2026-10-26

- Backend tests: passed required fields, first-letter name normalization (including accented letters), inquiry paths, URL validation, limits, same-origin protection, Turnstile failures and hostname/action mismatches, save success and save failure.
- Receiver tests: passed gateway-secret checks, fixed workbook destination, formula neutralization, column order, duplicate handling and verification requirement.
- Browser QA: desktop and 390px mobile form layout passed. English form is present on both `/explore/` and `/es/explora/`. Name inputs convert `élise` to `Élise` and `o’Neill` to `O’Neill` after blur. Conditional website-review fields show correctly.
- Cloudflare preview: build passed; both routes return HTTP 200 with unique form IDs and preserved canonical metadata. The unconfigured preview refuses submissions.
- Google Sheet: `Inquiries` and `Form fields` created; header frozen; intake filter enabled; field guide visually checked in Google Sheets. General access is Restricted (private to owner).
- Receiver deployment: owner-authorized Apps Script version 1 deployed. Google project ID: `1nbvjdKA8k_eXuVrne_5ZMZVGrMsNNREKUog7n6XOtmCjUo-fT453O5c4`.
- Cloudflare production: `BUSINESS_INQUIRY_SECRET` and `BUSINESS_INQUIRY_URL` configured; existing Turnstile variables preserved.
- Direct receiver integration: invalid secret rejected; QA inquiry `50d95e28-6fc7-4929-8653-1232c87da3ce` saved; repeated delivery returned success without creating a second row. Verified A1:P3 by copying the live Sheet selection. This test exercises the receiver independently and does not verify a real Turnstile challenge.
- Production publication: explicitly approved by the owner and completed through PR #8 (`ad0ca60d`), followed by the Turnstile loader correction in PR #9 (`626eac2d`). Cloudflare production deployment `7aba6d45` succeeded.
- Live browser-to-Turnstile-to-Sheet QA: passed. The standard implicit loader completed real Turnstile verification; the browser returned inquiry reference `f2528e75-1241-4f06-966e-24f2e7e72a1a`. The same ID appears once in `Inquiries` row 3, with normalized names `Qa` / `Livecheck`, source `/explore/`, form language `en`, correct website-review fields, and Turnstile verified `Yes`. A1:P4 was checked directly in the private Google Sheet.
- Initial explicit-loader issue: the widget hung with error 300030 during live QA; the existing contact form worked in the same browser. The new form now uses the established implicit-loading pattern. The required-token and server-side checks were retained.
- Live Spanish route: English form copy and collaboration fields verified, including optional website URL for collaboration. Both pages share the same tested submission endpoint and script.
- Evidence: local screenshots `outputs/ee-business-inquiry-live-success.png` and `outputs/ee-business-inquiry-fields-qa.png` in the task workspace. No credentials or verification tokens are in the repository.

QA rows are explicitly marked `[QA TEST — IGNORE]` and use `qa@example.com`; they are not customer leads.

## Final live verification

- Final code commit: `542137ca`; Cloudflare production deployment `292e1803` succeeded.
- Corrected malformed placeholder closing markup that prevented the `Learn more` option from being selectable. The static QA script now verifies all three valid option elements on both routes.
- Saved confirmations are preserved if a subsequent Turnstile refresh expires or fails.
- Live Spanish-route learning-more submission passed: reference `b6118cd0-c465-4c5b-a42f-d5a4f5802265`, verified in `Inquiries` row 4. Stored fields include `José`, `De La Cruz`, the test destination and travel dates, source `/es/explora/`, form language `en`, and Turnstile verified `Yes`.
- The final browser check confirms the restored learning-more path is selectable and reveals its destination/date fields. Collaboration reveals organization and optional website; website review requires the URL and reveals improvement goals.
- Three synthetic QA rows remain clearly labeled in their message or organization; no customer submission was used for testing.
- Screenshot: `outputs/ee-business-inquiry-spanish-route-success.png` in the task workspace.

## Email confirmations and regression QA — 2026-10-26

- Published email workflow in PR #10; final application commit `2a41028b`, successful production deployment `b4435c40`.
- Owner approved email and background-trigger permissions. Apps Script receiver version 3 is deployed; the one-minute email queue trigger is installed.
- Both confirmations include the established team signature, plain-text fallback and linked logos for Experience Ecuador, Mindo Bird Watching, Experience the Amazon and The Cloud Forest Retreat. All four image URLs returned HTTP 200 with PNG content.
- Live collaboration test on `/es/explora/`: `86c6c2bc-e53b-43cf-97c4-016f3a172188` (row 5).
- Live website-review test on `/explore/`: `e008a2e8-9f08-48be-808a-e85005441a96` (row 6).
- Live learning-more test on `/explore/`: `cb434231-1382-415b-941a-b3ea1ceb6a02` (row 7).
- Directly checked private Sheet range A5:V7: each inquiry was saved with verified Turnstile, normalized names, correct conditional fields and English form language. Both recipient statuses are Sent, attempt count is 1, and last-error cells are blank.
- Exact Gmail subject search returned six messages: one admin and one guest confirmation per reference, with no duplicates. Inspected received guest and admin messages: guest replies route to the owner; admin replies route to the submitting guest. The admin's private Sheet link opens the matching inquiry row. Actual received email displayed all four logos.
- All new test inquiries are marked `[QA TEST — IGNORE]` and sent only to owner-controlled plus aliases. Earlier QA rows were not retroactively emailed.
- Mobile collaboration form tested at 390px: English language, single-column names, page width equal to viewport, no horizontal overflow. Desktop and both routes passed.
- Native validation checked for malformed email and missing required website URL; irrelevant hidden fields are disabled. Accented names, apostrophes and existing mixed case are preserved correctly.
- Verification retry retains entered values. Regression after a successful submission: starting another inquiry correctly exposes verification recovery when needed, preserves the new name, and returns to Ready to send after verification.
- Automated suite passed: validation, origin checks, Turnstile failures/hostname/action, stable submission IDs, receiver authorization and duplicate handling, formula neutralization, safe HTML, guest privacy, queue-only intake, quota deferral, bounded retries, partial recipient failures and ambiguous delivery protection.
- Evidence in task workspace: `outputs/ee-inquiry-email-previews/guest-received-gmail.png` and `outputs/ee-inquiry-email-previews/mobile-collaboration-success.png`.

## Complete network signature — 2026-10-26

- Added the existing official PNG logos and site links for Chocó Andino Tours, Mindo Tours and Mindo Trail Club to both recipient templates. All three logo URLs returned HTTP 200 and image/png.
- Seven-brand signature uses four rows, two columns, with the final logo centered. Plain-text signature includes all seven site links. Automated suite passed with eight total email images (header plus seven signature logos).
- Deployed receiver version 4, preserving the endpoint, gateway configuration, permissions and queue behavior. Only the brand list and signature layout changed in the live source.
- Live form QA reference `603a5796-bcc9-4f98-bcec-c9bd2a4055b6`, marked `[QA TEST — IGNORE]`, saved in row 9. Gmail exact-reference search returned two confirmations, one admin and one guest. Inspected both signatures and verified all seven linked brands. All seven logo images loaded in the received guest email.
- Screenshot: `outputs/ee-seven-brand-signature.png` in the task workspace. Code commit `81b1ff39`.

## Approved compact signature published — 2026-10-26

- Owner approved the revised emailed preview and explicitly requested final publication.
- Experience Ecuador sits beside team details; six affiliated brands form a three-column, two-row grid. Affiliate logo boxes are 48px with equal image and caption row heights. All seven brands remain linked in HTML and plain text.
- Desktop preview visually checked. At 390px, page width equals viewport and all affiliate logos render at 48×48 without horizontal overflow. Owner accepted the visual preview.
- Automated inquiry and email suite passed; no changes to intake, authorization, recipient routing or delivery queue logic.
- Existing Apps Script receiver successfully updated to version 5 at 8:58 PM America/New_York. Deployment URL and private gateway configuration retained. Both recipient emails share the published signature function.
- Approved source pushed as `bca9dd15`. Deployment success screenshot: `outputs/ee-compact-signature-live-deployment.png`; approved layout screenshot: `outputs/ee-signature-compact.png` in task workspace.
