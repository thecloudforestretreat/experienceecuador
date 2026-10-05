# Experience Ecuador — Codex Handoff

Updated: 2026-10-05  
Repository: `https://github.com/thecloudforestretreat/experienceecuador.git`  
Production: `https://experienceecuador.com/`  
Staging: `https://staging.experienceecuador.com/`

## Read this first

This document is the operational handoff for continuing the Experience Ecuador project in a different Codex session or on another computer. Treat the repository and the source-of-truth Google Sheet as authoritative. Do not infer pending work from older chat progress messages because the full-site upgrade and production release are now complete.

## Current state

- Branch: `main`
- Remote: `origin https://github.com/thecloudforestretreat/experienceecuador.git`
- Production release commit: `3aee789`
- Production audit record: `3a16540`
- Production form-QA record: `9d920f4`
- Full page-level upgrade: complete
- Production deployment: live
- Canonical sitemap inventory: 220 URLs
- Sitemap: updated and successfully resubmitted to Google Search Console on 2026-10-05
- Production crawl: 220/220 URLs returned HTTP 200
- Newsletter: intentionally deferred and excluded from the current release scope

Do not submit the sitemap again simply to accelerate processing. Google Search Console still displayed the earlier 201 discovered-URL count immediately after resubmission; that count should change only after Google processes the new sitemap.

## Production release verification

The structured production audit found zero failures across:

- HTTP status and sitemap redirects
- Titles and meta descriptions
- H1 presence
- Canonicals
- Document language
- English/Spanish/`x-default` hreflang
- Robots indexability
- JSON-LD presence
- Shared `assets/js/site.js` injection
- Page-cluster CSS loading

Internal authority at release:

- Minimum unique internal inlinks: 6
- Median unique internal inlinks: 11
- Maximum crawl depth: 3

Audit evidence:

- `audits/experienceecuador-production-release-crawl-2026-10-05.csv`
- `scripts/live-release-audit.mjs`
- `STAGING.md`

To rerun the reusable production audit, inspect the script first and then run it from the repository root with the repository's existing Node runtime. Do not edit production merely because of transient network errors; reproduce any result before changing code.

## Production workflow QA

Authorized production QA submissions used the label `[PRODUCTION QA TEST — DELETE]`.

Passed end to end with Gmail confirmation:

1. Contact form
2. Andes regional trip-planning intake
3. Trip Builder itinerary email
4. Partner application
5. Language-immersion inquiry

Partner application note: delivery passed, but the embedded iframe did not display its optional confirmation message. Both the internal application and applicant-confirmation emails arrived. Treat this as a front-end confirmation limitation, not a submission failure.

Newsletter decision:

- Do not implement, mount or test the newsletter now.
- It is intentionally deferred by the owner.
- The unused include currently contains a timer-based success fallback and its Apps Script endpoint returns HTTP 403 to unauthenticated requests.
- No public newsletter placement is active.
- Do not describe this deferred feature as a current production blocker.

## Analytics and attribution

- GTM container: `GTM-WJQXQR2H`
- GA4 measurement ID: `G-3EDLVGV2HD`
- GA4 stream ID: `13129495694`
- GTM Versions 7 and 8 are live.
- Tag Assistant, the GA4 collection payload and GA4 DebugView verified named Experience Ecuador events, `debug_mode`, document path and first-touch source.
- First-touch and last-touch attribution, hidden form attribution fields, outbound referral decoration and centralized WhatsApp configuration passed QA.

The shared runtime injects `assets/js/site-config.js`. WhatsApp numbers and localized prompts must remain centralized there; do not hard-code page-level WhatsApp numbers.

## Search Console and sitemap

- Live sitemap: `https://experienceecuador.com/sitemap.xml`
- Current inventory: 220 canonical URLs
- Google Search Console accepted the production sitemap submission on 2026-10-05.
- The earlier displayed discovered-page count was 201 and is expected to lag while Google reprocesses the sitemap.

Recommended monitoring sequence:

1. Around 2026-10-09 through 2026-10-12, inspect sitemap processing and Page Indexing in GSC.
2. Review `Crawled - currently not indexed`, `Discovered - currently not indexed`, duplicate/canonical exclusions and structured-data issues.
3. Request manual indexing only for a small number of high-priority new or materially changed pages that remain undiscovered. Do not mass-submit all 220 URLs.
4. Around 2026-11-05, run a full Screaming Frog recrawl and compare the result with the production release audit.
5. Compare post-release GSC impressions, clicks, CTR and average position against the supplied pre-release extract only after enough data has accumulated.

## Source of truth

Google Sheet:

`https://docs.google.com/spreadsheets/d/1VTTyiiQrEqxY2J3noM0MmIgJ9MgBITntR150S5e8KEg/edit?gid=20261004#gid=20261004`

Relevant tab: `Release Gate 2026-10-04`

The tab records:

- Production release state
- 220-URL crawl result
- GSC sitemap resubmission
- GTM/GA4 validation
- Production workflow QA
- Newsletter as intentionally deferred

Use range-precise edits and preserve the existing sheet formatting. Re-read target cells before changing them.

## Design and implementation guardrails

- Preserve the approved global CSS and assigned page-cluster CSS.
- Primary conversion actions use the approved gold: `rgb(242, 180, 65)`.
- Do not introduce new brown, purple or unrelated palette colors.
- Maintain desktop symmetry, balanced grids, tight spacing and mobile containment.
- Preserve South American Spanish, accents and bilingual parity.
- Preserve useful existing copy; improve only where evidence and search intent justify it.
- Keep direct-answer blocks, useful FAQs, schema parity, contextual internal links and analytics labels intact.
- Do not add `Product`, `Offer` or bookable-tour claims without approved operator, itinerary, pricing, availability, inclusions, exclusions and commercial facts.
- Staging must stay non-indexable. Never index `staging.experienceecuador.com`.

## Repository hygiene

At handoff time, `main` matched `origin/main` before this handoff file was added. The working tree contained unrelated untracked user assets:

- `.DS_Store`
- `assets/images/EE-Carousel-Misahuallí-1.jpg` through `EE-Carousel-Misahuallí-6.jpg`
- `assets/images/explore/choco-andino-tours.png`
- `assets/images/explore/experience-the-amazon.png`
- `assets/images/explore/mindo-bird-watching.png`
- `assets/images/explore/mindo-tours.png`
- `assets/images/explore/mindo-trail-club.png`
- `assets/images/explore/the-cloud-forest-retreat.png`

These files belong to the user. Do not delete, overwrite, add or commit them unless the user explicitly requests it.

Before any new work:

1. Run `git status --short --branch`.
2. Run `git pull --ff-only` if the checkout is clean enough to update safely.
3. Read this file and the production sections at the end of `STAGING.md`.
4. Inspect the exact pages/files in scope before editing.
5. Keep staging changes separate from production until QA and approval.

## Immediate next task

There is no sitemap submission task remaining today. The next operational task is the first post-release GSC processing/indexing review around 2026-10-09 through 2026-10-12. Until then, avoid speculative site changes and let Google crawl the production release.

## Prompt for the new Codex session

Copy and paste the following prompt into the new Codex session after opening the repository on the Mac mini:

> Continue the Experience Ecuador production-release follow-up. The repository is `https://github.com/thecloudforestretreat/experienceecuador.git`. First pull the latest `main` with a safe fast-forward-only update, then read `CODEX_HANDOFF_2026-10-05.md` completely and read the production release/form-QA sections at the end of `STAGING.md`. Preserve all unrelated untracked user files and do not commit or delete them. The full bilingual site upgrade is live, the sitemap contains 220 canonical URLs, the production crawl passed 220/220, and GSC accepted the sitemap submission on 2026-10-05. The newsletter is intentionally deferred and is not a blocker. Do not resubmit the sitemap again today and never index staging. Confirm the repository state and summarize the current release status. The next planned work is a post-release GSC sitemap/Page Indexing review around 2026-10-09 through 2026-10-12, followed by a full Screaming Frog recrawl around 2026-11-05. Do not change production unless you find a reproducible issue and receive authorization to fix it.

