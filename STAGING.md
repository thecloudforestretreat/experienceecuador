# Experience Ecuador staging

This branch is the pre-production integration environment for the site-wide update.

## Design review

- Page cluster comparison and mockups: `/design-system/page-clusters/`

## Staged specialist route pairs

- `/tours/ecuador-choco-biodiversity/` ↔ `/es/tours/biodiversidad-choco-ecuador/`
- `/tours/ecuador-photo-tour/` ↔ `/es/tours/tour-fotografia-ecuador/`
- `/tours/ecuador-birds-mammals/` ↔ `/es/tours/aves-mamiferos-ecuador/`
- `/tours/ecuador-enigmatic-reptiles-amphibians/` ↔ `/es/tours/reptiles-anfibios-ecuador/`
- `/tours/ecuador-southern-endemic-birds/` ↔ `/es/tours/aves-endemicas-sur-ecuador/`
- `/tours/ecuador-the-andes-and-amazon-exotic/` ↔ `/es/tours/andes-amazonia-exotica-ecuador/`
- `/tours/ecuador-wild-andes-bears-birds-explorer/` ↔ `/es/tours/andes-salvajes-osos-aves-ecuador/`
- `/tours/galapagos-islands-wildlife-nature/` ↔ `/es/tours/galapagos-fauna-naturaleza/`
- `/tours/galapagos-wildlife-bird-photography/` ↔ `/es/tours/galapagos-fotografia-fauna-aves/`

Progress: 9 of 9 specialist route pairs are staged (18 bilingual pages); the planned specialist-route build is complete.

These eighteen URLs are planning and interest pages, not bookable package pages. Keep their current Article, BreadcrumbList and FAQPage schema until the operator of record, permissions and access, exact itinerary, guide capacity, transport, lodging, meals, pricing, inclusions and exclusions, cancellation terms, activity and accessibility details, emergency procedures, and live availability are approved. Do not add Product, Offer or TouristTrip schema before those facts are visible and verified.

## Staged trip-planning pairs

- `/plan-your-trip/` ↔ `/es/planifica-tu-viaje/`
- `/plan-your-trip/amazon/` ↔ `/es/planifica-tu-viaje/amazonia/`
- `/plan-your-trip/andes/` ↔ `/es/planifica-tu-viaje/andes/`
- `/plan-your-trip/coast/` ↔ `/es/planifica-tu-viaje/costa/`
- `/plan-your-trip/galapagos/` ↔ `/es/planifica-tu-viaje/galapagos/`

Progress: 5 of 5 trip-planning pairs are staged (10 bilingual pages); the planned trip-planning build is complete.

The staged pages use the planning cluster, the shared injectable runtime and centralized `site-config.js`. The regional forms retain the connected intake endpoint, Turnstile protection, first- and last-touch attribution payloads, draft persistence, five-step validation and explicit success/error analytics. The hub does not load form-only Turnstile or intake JavaScript. All ten canonical URLs are present in `sitemap.xml`.

## Shared runtime foundation

- Every staged page loads `assets/js/site.js`, which injects `assets/js/site-config.js` before initializing the site runtime.
- `assets/js/header.js` provides a second guarded `site-config.js` injection path for pages that load the shared header directly.
- The WhatsApp widget reads its phone number, localized message and page context from `assets/js/site-config.js`; do not hard-code page-level WhatsApp numbers.

## Safety controls

- Cloudflare serves `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` from `_headers`.
- `assets/js/site.js` adds a matching robots meta directive on non-production hosts.
- GTM and GA4 are disabled on non-production hosts by default.
- Append `?ee_analytics_debug=1` once per browser session to enable analytics for GTM Preview and GA4 DebugView.
- Append `?ee_analytics_debug=0` to disable analytics again.
- A fixed staging banner identifies the environment and its analytics state.

## Promotion checklist

Before merging the release to `main`:

1. Complete desktop and mobile QA for every page cluster in English and Spanish.
2. Validate canonicals, hreflang, schema, internal links, redirects, forms and WhatsApp.
3. Run GTM Preview and GA4 DebugView with analytics debug enabled.
4. Remove `_headers` from the production release so the live site remains indexable.
5. Confirm `robots.txt` and the canonical sitemap are production-ready.
6. After all staging build work is complete, rerun the full Screaming Frog crawl and resolve the release-blocking findings before any page is promoted, indexed or submitted for reindexing.

## Screaming Frog release-gate snapshot

Staging sitemap-list crawl completed on 2026-10-01 with Screaming Frog SEO Spider 24.3 against 211 staging URLs.

- 202 URLs returned `200`.
- 2 URLs returned `301` and 7 returned `308`; sitemap redirect targets must be normalized before release.
- All four new Galápagos route URLs returned `200`, contained exactly one H1, contained 560–686 words, exposed 9 unique internal outlinks, and carried the staging `noindex, nofollow, noarchive, nosnippet` directive.
- No `200` HTML page was missing a meta description.
- 15 `200` HTML pages contained fewer than 300 words; review intent before expanding them.
- `/transportation/` and `/es/transporte/` had zero unique internal outlinks and remain release-blocking internal-authority work.
- Legacy metadata still includes 68 titles longer than 60 characters, 3 titles shorter than 30 characters, and 56 descriptions longer than 160 characters. Treat these as prioritization flags rather than automatic rewrites; preserve search intent and improve the highest-value pages first.

### Focused remediation recrawl

Commit `d66b4ed` was deployed only to `experienceecuador-staging` and checked on `staging.experienceecuador.com` on 2026-10-01. Screaming Frog SEO Spider 24.3 then recrawled the eleven affected canonical targets.

- All eleven URLs returned a direct `200`; none redirected.
- Every checked URL contained exactly one H1 and the staging `noindex, nofollow, noarchive, nosnippet` directive.
- `/transportation/` increased from 177 to 494 crawl-visible words and from 0 to 10 unique internal outlinks.
- `/es/transporte/` increased from 180 to 573 crawl-visible words and from 0 to 10 unique internal outlinks.
- The sitemap no longer contains `/home/`, `/es/inicio/`, or the seven non-canonical no-trailing-slash variants recorded above.
- The transportation pair now includes reciprocal hreflang, WebPage/BreadcrumbList/FAQPage JSON-LD, the planning cluster CSS, crawlable language navigation, contextual related links, tracked CTAs, and the current shared runtime that injects `site-config.js`.

The redirecting-sitemap and zero-outlink transportation blockers are resolved. Production remains unchanged and indexing remains prohibited until the remaining site-wide QA, prioritized metadata work, analytics validation, and final full sitemap crawl are complete.

### Repository-wide pre-crawl hardening

The 213 canonical sitemap targets were audited against the staging repository on 2026-10-01 before the final Screaming Frog crawl.

- Every sitemap URL maps to a local page and declares its matching canonical.
- Every audited page contains exactly one H1, a meta description, parseable JSON-LD, unique element IDs, reciprocal English/Spanish hreflang, at least six unique internal outlinks, and no missing internal link target.
- All HTML entry points now request the current shared `site.js?v=20261001k`; the two direct header loaders request `header.js?v=20261001j`. This ensures the current GTM guard, attribution runtime, cluster injection and centralized WhatsApp configuration are not held behind an obsolete browser cache key.
- The misspelled Spanish birdwatching paths `/es/experiencias/avisamiento/mindo/` and `/es/experiencias/avisamiento/quito/` now redirect to canonical `/avistamiento/` paths, and the canonical directories and sitemap entries use the corrected spelling.
- Invalid JSON-LD on both blog hubs was repaired. The duplicate `/faq/` URL now redirects to `/faqs/` and was removed from the sitemap.
- The reviews pair now has reciprocal hreflang, index directives, improved titles, corrected Spanish accents and a valid Spanish trip-planner link.
- Twenty-two crawl-visible links to missing or legacy targets were corrected to direct canonical destinations.

The remaining 72 titles over 60 characters and 56 descriptions over 160 characters are editorial prioritization candidates, not structural failures. Review them against GSC query intent and CTR before shortening them in bulk.

## Full-site upgrade program

The full-site program is tracked separately from shared-runtime coverage. Loading the current header, footer, analytics runtime or cache key does not count as a page-level SEO/AEO/GEO upgrade.

### Batch 1: authority hubs

Completed on staging on 2026-10-01:

- `/` ↔ `/es/`
- `/ecuador-travel-guide/` ↔ `/es/guia-viaje-ecuador/`
- `/regions/` ↔ `/es/regiones/`
- `/experiences/` ↔ `/es/experiencias/`
- `/plan-your-trip/` ↔ `/es/planifica-tu-viaje/`
- `/recommendations/` ↔ `/es/recomendados/`

These twelve hub pages now declare their page cluster, topic cluster, language and funnel stage consistently. Their correct cluster bundle is loaded explicitly, primary actions use the shared gold conversion treatment, and stale structured-data modification dates were refreshed where applicable. Existing useful copy, FAQ content, internal pathways and bilingual parity were preserved.

Next build batch: the four regional hub pairs for Andes, Amazon, Coast and Galápagos. After those hubs pass QA, continue through their destination children rather than applying undifferentiated bulk rewrites.
