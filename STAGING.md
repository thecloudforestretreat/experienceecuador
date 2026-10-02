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

### Batch 2: regional hubs

Completed on staging on 2026-10-01:

- `/regions/andes/` ↔ `/es/regiones/andes/`
- `/regions/amazon/` ↔ `/es/regiones/amazonia/`
- `/regions/coast/` ↔ `/es/regiones/costa/`
- `/regions/galapagos/` ↔ `/es/regiones/galapagos/`

The eight regional hubs now use the destinations cluster, declare a normalized `region_hub` page type and carry explicit region, topic, language and consideration-stage metadata. Overlong Spanish search titles and descriptions were rewritten for clarity and natural Ecuadorian Spanish, including correction of the incorrect `volcánes` spelling. Social metadata and structured-data descriptions were kept aligned with the visible search metadata.

Next build batch: destination children, beginning with the highest-authority Andes pair set, then Amazon, Coast and Galápagos. Apply page-specific review rather than undifferentiated bulk copy changes.

### Batch 3: Andes destinations

Completed on staging on 2026-10-02:

- Baños, Chocó Andino, Cotacachi, Cotopaxi, Cuenca, Mindo, Otavalo, Papallacta, Quito and Zuleta bilingual destination pairs
- Quito one-day, two-day and three-day bilingual itinerary pairs

The twenty destination pages now use the destinations cluster and declare their Andes region and consideration-stage role. The six duration-based Quito pages use the planning cluster and the normalized `itinerary_guide` page type. Overlong English and Spanish titles were shortened without removing destination intent, long Quito descriptions were rewritten to direct planning answers, South American Spanish capitalization and accent usage were normalized, and modification dates were refreshed.

Next build batch: Amazon destination children for Tena, Misahuallí, Cuyabeno and Yasuní, followed by Coast and Galápagos destination children.

### Batch 4: Amazon destinations

Completed for staging on 2026-10-02:

- Tena, Misahuallí, Cuyabeno Wildlife Reserve and Yasuní National Park bilingual destination pairs

These eight pages now use the destinations cluster and consistently declare their Amazon region, language and consideration-stage role. Search, social and structured-data metadata were aligned around destination-specific planning intent; English titles and descriptions were tightened; Spanish titles and descriptions use natural South American Spanish; and modification dates were refreshed. Existing FAQs, visible planning content, bilingual relationships and internal routes were preserved.

Next build batch: Coast destination children, followed by Galápagos destination children.

### Batch 5: Coast destinations

Completed for staging on 2026-10-02:

- Guayaquil, Salinas, Montañita, Puerto López and La Ruta del Sol bilingual destination pairs

These ten pages now use the destinations cluster and consistently declare their Coast region, language and consideration-stage role. Generic metadata was replaced with destination-specific search intent across search, social and structured-data descriptions. Spanish titles were shortened and normalized, modification dates were refreshed, and duplicate document declarations on the Puerto López pair were removed. Existing visible content, FAQs, bilingual relationships and internal planning routes were preserved.

Next build batch: Galápagos destination children.

### Batch 6: Galápagos destinations

Completed for staging on 2026-10-02:

- Santa Cruz, San Cristóbal, Isabela and Floreana bilingual island pairs

These eight pages now use the destinations cluster and consistently declare their Galápagos region, language and consideration-stage role. Search, social and structured-data metadata now answers island-specific planning intent for bases, wildlife, beaches, transfers and realistic stay length. Spanish titles and descriptions were shortened into natural regional phrasing, modification dates were refreshed, and the existing FAQs, bilingual relationships and internal planning pathways were preserved.

Next build batch: experience and activity clusters, followed by planning and commercial-intent pages.

### Batch 7: core experience categories

Completed for staging on 2026-10-02:

- Adventure, nature, wildlife and birding, relaxation, culinary and culture bilingual category pairs

These twelve pages now use the experiences cluster and consistently declare their category, language and consideration-stage role. Long and generic titles were replaced with focused search language, especially across the Spanish pages; descriptions now give direct route-planning answers; and search, social and structured-data wording remains aligned. Existing detailed copy, FAQs, regional pathways and bilingual relationships were preserved.

Next build batch: experience children for birdwatching, Baños adventure and culinary must-eats, then editorial guides and commercial collections.

### Batch 8: experience children

Completed for staging on 2026-10-02:

- Mindo birdwatching, Quito birdwatching, Baños adventure and Ecuadorian must-eat foods bilingual pairs

These eight pages now use the experiences cluster and declare their specific experience, destination or topic plus language and consideration-stage role. Metadata now uses natural search phrases—including “avistamiento de aves” rather than the weaker abbreviated wording—and provides direct planning answers. The Mindo pair explicitly supports the specialist birdwatching funnel while preserving existing content, FAQs and internal routes.

Next build batch: editorial guides and high-intent commercial collections.

### Batch 9: national and regional editorial guides

Completed for staging on 2026-10-02:

- Best things to do in Ecuador, best places to visit in Ecuador, Andes, Amazon, Coast and Galápagos travel guides, and Ecuador UNESCO World Heritage bilingual pairs

These fourteen pages now use the editorial cluster and declare their topic, language, awareness-stage role and region where applicable. Long Spanish titles and descriptions were tightened into natural search language, modification dates were refreshed, and search, social and structured-data wording remains aligned. Existing long-form guidance, FAQs, answer sections, internal routes and bilingual relationships were preserved.

Next build batch: seasonal, packing, Quito, Mindo, family and spotlight editorial guides.

### Batch 10: planning and destination editorial guides

Completed for staging on 2026-10-02:

- Seasonal spotlights, family-friendly Ecuador itinerary, Quito travel guide, regional packing list, best time to visit Ecuador, best things to do in Mindo and Mindo cloud-forest guide bilingual pairs

These fourteen pages now use the editorial cluster and declare their topic, language, funnel stage and destination where applicable. Overlong titles were tightened, the Spanish Mindo cloud-forest metadata was rewritten into natural planning language, modification dates were refreshed, and existing detailed answers, FAQs, bilingual relationships and internal routes were preserved.

Next build batch: high-intent accommodation, tour and travel-style collections.

### Batch 11: commercial-intent collections

Completed for staging on 2026-10-02:

- Where to stay in Ecuador, Amazon lodges, birdwatching tours, cloud-forest lodging, family vacations, luxury travel and private tours bilingual pairs

These fourteen pages now use the recommendations cluster and declare their commercial topic, language, consideration-stage role and region where applicable. Titles and descriptions were tightened around high-intent search language, modification dates were refreshed, and the Spanish birdwatching page now consistently uses the natural phrase “Tours de avistamiento de aves en Ecuador” in both metadata and its visible H1. Existing comparison content, FAQs, recommendation routes, bilingual relationships and conversion paths were preserved.

Next build batch: regional trip-intake and trip-builder conversion pages.

### Batch 12: trip-builder and regional conversion pages

Completed for staging on 2026-10-02:

- Main Ecuador trip builder plus Andes, Amazon, Coast and Galápagos regional planning-intake bilingual pairs

These ten pages now explicitly load the planning cluster and consistently declare their language, planning topic, conversion-stage role and region where applicable. Long regional titles were tightened without weakening high-intent search language, trip-builder modification dates were refreshed, and the existing form fields, lead-capture flow, analytics attributes, bilingual relationships and planning content were preserved.

Next build batch: recommendation member pages and partner acquisition pages.

### Batch 13: recommendation member profiles

Completed for staging on 2026-10-02:

- Nine bilingual recommendation-member pairs covering Las Nubes, Hacienda Verde Niebla, The Cloud Forest Retreat, Mindo Bird Watching, Mindo Glambird, Roca Mía, Mindo Eco Chalet, Mindo Eco Suite and Mindo Glamping Yurt

These eighteen pages now explicitly load the recommendations cluster and declare their language, member identity, category, location, region and conversion-stage role. Overlong member titles and descriptions were tightened while preserving branded intent, modification dates were refreshed where structured dates existed, and the existing member details, referral links, analytics attributes, bilingual relationships and conversion paths were preserved.

Next build batch: partner acquisition, Explore affiliate hubs, reviews and comparison pages.

### Batch 14: monetization, trust and comparison pages

Completed for staging on 2026-10-02:

- Partner overview and application, Explore affiliate network, traveler reviews, and Amazon-versus-Galápagos bilingual pairs

The partner pages now use the recommendations cluster, application pages declare conversion intent, Explore pages use the discovery cluster, reviews use the trust cluster, and comparison pages use the editorial cluster. Each page now carries explicit language, topic and funnel metadata for attribution. Long Spanish partner and review descriptions were tightened, structured modification dates were refreshed where present, and existing pricing-plan messaging, forms, affiliate links, review interactions, internal routes and bilingual relationships were preserved.

Next build batch: remaining utility and blog-hub pages, followed by the final full-site audit and Screaming Frog crawl.
