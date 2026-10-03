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

### Batch 15: blog and utility completion

Completed for staging on 2026-10-02:

- Blog, About, Mission, Contact, FAQs, Privacy Policy, Terms of Service and Terms and Conditions bilingual pairs

The blog pair now uses the editorial cluster; trust and utility pages use the trust cluster; and Contact pages explicitly declare conversion intent. All sixteen pages now carry consistent language, topic and funnel metadata, with refreshed structured modification dates. The remaining sitewide overlength metadata candidates were also rewritten, and all explicit cluster stylesheet cache keys were normalized to the current release version.

This completes page-level cluster assignment for every canonical sitemap URL. The remaining release gate is a full browser and Screaming Frog crawl, not additional bulk page assignment.

### Final staging crawl: 213 canonical URLs

Completed on 2026-10-02 with Screaming Frog in List Mode against the staging hostname only:

- 213 of 213 submitted URLs crawled successfully
- 213 HTTP 200 responses and 213 HTML documents
- zero missing page titles, meta descriptions, H1 headings or canonical links
- zero titles over 60 characters or under 30 characters
- zero meta descriptions over 160 characters or under 70 characters
- all 213 canonical elements point to the corresponding production hostname
- all 213 staging responses carry `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`
- language detection is balanced across 107 English and 106 Spanish documents
- median unique inlinks is 8 and median unique outlinks is 13
- no near-duplicate groups were reported in the exported Internal crawl

The final crawl confirms the page foundation and metadata release gates. Its text-only link graph reports 83 pages with fewer than six unique source-HTML inlinks, including 14 with zero, and the bilingual Explore hubs each have only two unique source-HTML outlinks. Because the shared header and footer are injected at runtime, these figures are a conservative floor rather than the rendered-site total. JavaScript rendering is locked behind a Screaming Frog licence in the installed unlicensed edition, so rendered-link verification remains a browser QA item. The source-HTML gaps are still useful remediation targets before production release. Production remains unchanged and no indexing request has been made.

### Batch 16: recommendations authority hubs

Completed for staging on 2026-10-02:

- `/recommendations/`
- `/es/recomendados/`

This is the first post-foundation substantive page-pair upgrade. Both recommendation hubs now include an image-led discovery hero, the gold primary action style, category entry points, a transparent recommendation methodology, decision-support guidance, the existing dynamic filters and member cards, featured-profile links, regional planning pathways, bilingual FAQs, FAQ schema and final trip-planning conversion actions. Static crawlable content increased from 134 to more than 800 words in English and from 148 to more than 850 words in Spanish while preserving the existing recommendation data, filter behavior and member attribution events.

The shared recommendations cluster stylesheet was expanded for desktop and mobile symmetry, compact card composition, wrapped pills and tags, responsive grids and reduced dead space. Its cache key was advanced across every page that consumes the bundle. The next substantive content batch is the national planning authority group, beginning with the bilingual “best things to do in Ecuador” pair.

Post-deploy browser QA confirmed 15 balanced default results: 13 real listings plus two category-specific partner opportunities, replacing the previous 109-card output caused by 96 repeated placeholders. The shared Spanish recommendation and experience data was normalized for Ecuadorian Spanish accents, including “observación,” “Amazonía,” “región,” “río,” “Gastronomía” and “Relajación.” Both languages retain the injected WhatsApp configuration, and staging remains noindex with analytics disabled.

### Batch 17: national things-to-do authority pair

Completed for staging on 2026-10-02:

- `/best-things-to-do-in-ecuador/`
- `/es/mejores-cosas-que-hacer-en-ecuador/`

Both national discovery guides now answer the primary query directly, compare twelve concrete Ecuador experiences, distribute internal authority into every major regional and experience cluster, provide a four-region planning table, align route ambition with trip duration, and expand the visible FAQ and FAQ schema to six matched questions. The Spanish page uses Ecuadorian Spanish with full accents, while both pages preserve the prior regional framework, canonical and hreflang relationships, analytics attributes, trip-builder conversion path and injected site configuration.

The editorial cluster stylesheet now includes responsive authority-answer, signature-experience, comparison-table and duration components. Its cache key was advanced across all editorial-cluster pages. Browser QA also found and corrected a central cache-version mismatch: the injected `site-config.js` had been replacing newer cluster URLs with an older CSS key. The central configuration, its loader and every `site.js` consumer now share the current release keys. Local validation found one H1, no duplicate IDs, valid JSON-LD, no missing internal targets and 38 internal links on each upgraded page. The next substantive pair is the national best-places-to-visit collection.

### Batch 18: national best-places authority pair

Completed for staging on 2026-10-02:

- `/best-places-to-visit-in-ecuador/`
- `/es/mejores-lugares-para-visitar-ecuador/`

Both national destination guides now provide a direct answer to the primary query, a linked twelve-place planning shortlist, a six-row comparison of destination types, and six matched visible and structured FAQs. ItemList schema mirrors the twelve real destination pages, while the new shortlist routes authority to Quito, Galápagos, Mindo, Cotopaxi, Baños, Cuenca, Otavalo, Yasuní, Puerto López, Guayaquil, Chocó Andino and Isabela. Redundant self-links were removed, the Spanish birdwatching phrase was normalized to “Tours de avistamiento de aves en Ecuador,” and all internal links retain page-level attribution metadata.

Local validation found one H1 per page, no duplicate IDs, valid JSON-LD and executable JavaScript, no missing local link targets, twelve visible shortlist entries, a twelve-item structured list, six visible FAQs, six structured FAQs and 36/33 unique internal destinations in English/Spanish. The next substantive authority pair is the national Ecuador travel-guide pair.

### Batch 19: national Ecuador travel-guide pair

Completed for staging on 2026-10-02:

- `/ecuador-travel-guide/`
- `/es/guia-viaje-ecuador/`

Both national planning guides now open with a direct answer explaining realistic trip scope, followed by an ordered planning summary. The itinerary section was upgraded from three unlinked summary cards to a four-duration comparison table covering 5–7, 8–10, 12–14 and 15+ day routes, with attributed links into the Coast, Amazon–Galápagos and national birdwatching itinerary funnels. A new six-step booking sequence covers fixed transport, overnight bases, route connections, guided priorities, recovery time and predeparture verification through current official sources. The visible FAQ and FAQ schema now contain six matched questions, including what to reserve first, and structured modification dates were refreshed.

Local validation found one H1 per page, no duplicate IDs, valid JSON-LD and executable JavaScript, no missing local targets, full attribution on all 27 internal links, six visible and six structured FAQs, and complete bilingual component parity. The next substantive pair is the national accommodation-planning authority guide.

#### Batch 19 shared design-system correction

The post-deploy review exposed a selector collision between the shared cluster foundation and the editorial comparison-table wrapper. The base bundle had treated the wrapper as the table itself, placing its minimum width on the wrong element and applying the dark header background to body row headings. That produced low-contrast trip-duration labels and could clip wide tables at smaller breakpoints.

The shared table component now supports both legacy table-class markup and the current scroll-wrapper markup, keeps minimum width on the table, gives body row headings a transparent surface with dark brand-blue text, and preserves horizontal scrolling on narrow screens. The editorial palette was consolidated from purple and multiple one-off blues and golds to the established Experience Ecuador brand blue, dark blue, single action gold, white and shared neutral tokens. The cluster button treatment now uses the same single gold token without introducing a second gradient color. Cache keys were advanced across the central configuration, cluster imports and every site loader so the correction cannot be hidden by stale injected CSS.

### Batch 20: national accommodation-planning authority pair

Completed for staging on 2026-10-02:

- `/where-to-stay-in-ecuador/`
- `/es/donde-alojarse-ecuador/`

Both accommodation guides now open with a direct, route-first answer and four scannable planning facts. A six-row comparison table distinguishes gateway cities, Andes bases, cloud-forest lodges, Amazon lodges, Pacific Coast bases and Galápagos stays with realistic starting ranges and verification requirements. The regional discovery section is now a balanced six-card grid covering Quito, the Andes, cloud forest, Amazon, the Pacific Coast and Galápagos, eliminating the former desktop gap while directing authority into each relevant planning cluster.

The guides now connect traveler research to the recommendation directory and connect Ecuadorian businesses to the partner program with distinct attribution events. A sixth bilingual FAQ addresses nights per base, visible FAQ content matches structured FAQ coverage, and a six-item `ItemList` mirrors the regional stay strategies. The Spanish partner path was corrected to the existing `/es/aliados/` route, and the natural phrase “Tours de avistamiento de aves en Ecuador” remains normalized.

Local validation found one H1 per page, no duplicate IDs, six visible and six structured FAQs, six structured stay strategies, six regional cards, one direct-answer block, no missing local link targets and complete analytics attribution on internal links. The next substantive pair is the cloud-forest lodging authority guide.

### Batch 21: cloud-forest lodging authority pair

Completed for staging on 2026-10-02:

- `/ecuador-cloud-forest-lodges/`
- `/es/hospedaje-bosque-nublado-ecuador/`

Both guides now open with a direct answer that distinguishes Mindo access from more remote Chocó Andino immersion and identifies a realistic two-to-four-night starting range. A five-row comparison table separates Mindo town bases, Mindo reserve lodges, Chocó Andino lodges, Quito-edge nature stays and private multi-base routes, with practical verification points for transport, meals, guiding, trail access, connectivity and cancellation terms.

The pair now connects research to three real recommendation profiles—The Cloud Forest Retreat, Hacienda Verde Niebla and Mindo Glambird—without presenting inclusion as a quality ranking. Separate traveler and partner paths lead to the recommendation directory and the English or Spanish partner program with distinct attribution events. A sixth FAQ covers prebooking verification, visible and structured FAQ coverage match, and a three-item `ItemList` mirrors the featured profiles. The Spanish H1 and birdwatching language were normalized to natural Ecuadorian Spanish.

Local validation found one H1 per page, no duplicate IDs, five comparison rows, three featured-profile links, six visible and six structured FAQs, three structured profile items, one direct-answer block, no missing local targets, valid executable JavaScript and complete analytics attribution on internal links. The next substantive pair is the Amazon lodging authority guide.

#### Recommendations-cluster palette correction

The post-deploy review of Batches 20 and 21 exposed legacy brown design tokens in `cluster-recommendations.css`: `#a45b1a`, `#67370d` and `#fff5e9`, plus hard-coded brown FAQ icons and warm beige disclosure surfaces. Those values were inherited by direct-answer headings, table row labels, fact cards and recommendation components on the four newly upgraded accommodation pages.

The recommendations cluster now uses the approved Experience Ecuador brand blue (`#034ea2`), dark blue (`#0f2f62`), shared pale blue and neutral surfaces. Gold (`#f2b441`) remains reserved for primary actions and small deliberate emphasis. All brown and unapproved beige tokens were removed from the bundle. A cluster-specific cache version was introduced so the recommendations correction does not unnecessarily version the other seven cluster bundles, while the central site configuration and all 231 page loaders were advanced to guarantee that browsers receive the corrected stylesheet. The correction applies to every recommendations-cluster page, including the four Batch 20–21 pages.

### Batch 22: Amazon lodging authority pair

Completed for staging on 2026-10-02:

- `/ecuador-amazon-lodges/`
- `/es/lodges-amazonia-ecuador/`

Both guides now open with a direct answer that distinguishes fixed-access Yasuní and Cuyabeno programs from more flexible road-connected stays around Tena and Misahuallí. A five-row comparison table covers access models, realistic stay ranges and the transport, guide, meal, equipment, fee and buffer details travelers should verify before booking.

The pair now links to two published Amazon recommendation profiles and includes a separately attributed partner-acquisition path for local operators. A sixth visible and structured FAQ explains what a lodge package may include, while a two-item `ItemList` mirrors the published profiles without presenting them as a quality ranking. Missing Misahuallí image references were replaced with tracked Amazon imagery so the pages do not depend on uncommitted assets.

The Spanish page received a full language-quality pass: its H1 and metadata now use natural phrasing, false accents and misspellings were removed, Yasuní and Misahuallí were normalized in visible text, interrogative punctuation was repaired, and schema URLs were corrected to the real unaccented route. Local validation found one doctype and H1 per page, no duplicate IDs, five comparison rows, two profile links, one partner path, six visible and six structured FAQs, no missing local links or images, valid executable JavaScript and full analytics attribution. The next substantive pair is the national birdwatching-tour authority guide.

### Batch 23: national birdwatching-tour authority pair

Completed for staging on 2026-10-02:

- `/ecuador-birdwatching-tours/`
- `/es/tours-avistamiento-aves-ecuador/`

Both authority guides now open with a direct answer explaining how to organize a first Ecuador birdwatching route by elevation, habitat, dawn access and guide fit. A five-row decision table compares a Mindo introduction, a northwest cloud-forest route, a high-Andes and Mindo combination, a cloud-forest and Amazon route, and a custom specialist itinerary with realistic starting ranges and protected planning requirements.

The pair now provides a deliberate handoff from national research into the Mindo Bird Watching ecosystem through the published recommendation profile, the national birdwatching itinerary and the specialist sister site. Each path has distinct analytics attribution. A sixth visible and structured FAQ covers prebooking verification, and a four-item `ItemList` mirrors the principal research and specialist paths.

The Spanish page received an additional language-quality pass that replaces visible English birding jargon with natural avistamiento de aves, aviturismo and observadores de aves terminology, while preserving the recognized Mindo Bird Watching brand. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and six structured FAQs, four structured planning paths, no duplicate IDs, no missing local link targets, complete analytics attribution and the current injected `site-config.js` chain. The next substantive pair should be selected from the remaining high-priority inventory after the Batch 23 staging review.

### Batch 24: best-time-to-visit authority pair

Completed for staging on 2026-10-02:

- `/best-time-to-visit-ecuador/`
- `/es/mejor-epoca-para-visitar-ecuador/`

Both seasonal guides now open with a direct answer that distinguishes year-round travel from region-specific planning. A five-row comparison table covers Galápagos, the Andes, the Pacific Coast, the Amazon, and Mindo with useful seasonal patterns, traveler priorities, and the conditions that should be reconfirmed before booking. The guidance avoids promising daily weather or wildlife sightings and connects travelers to the relevant regional planning guides.

An official-source verification section now directs readers to Ecuador's Ministry of Tourism portal and explains which flights, roads, marine conditions, transfers, lodge programs, reserve access, cancellation terms, and weather-sensitive activities require current confirmation. A sixth visible and structured FAQ covers prebooking date checks, while a five-item `ItemList` mirrors the regional season paths.

The Spanish page received a language pass that normalizes alojamiento and esnórquel terminology while preserving natural Ecuadorian phrasing and correct accents. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and six structured FAQs, five structured regional paths, no duplicate IDs, no missing local link targets, valid executable JavaScript, complete analytics attribution, the approved editorial blue-and-gold cluster bundle, and the current `site-config.js` injection chain. The next recommended authority pair is the bilingual packing-list guide.

### Batch 25: packing-list authority pair

Completed for staging on 2026-10-02:

- `/ecuador-packing-list-by-region/`
- `/es/lista-equipaje-ecuador-por-region/`

Both packing guides now open with a direct answer that establishes a compact national base kit and separates it from region-specific equipment. A five-row decision table compares Galápagos, the Andes and Quito, the Pacific Coast, the Amazon, and Mindo–Chocó by core clothing, useful extras, and the baggage, access, weather, accommodation, or activity details travelers should confirm before packing.

A four-part transfer-day kit keeps documents, personal essentials, a flexible weather layer, and first-night basics visible without making unsupported medical or operational promises. A sixth visible and structured FAQ covers predeparture confirmation, while a five-item `ItemList` mirrors the regional guide paths. The Spanish page replaces imported lodging and clothing terms with natural Ecuadorian Spanish and uses the accepted spelling “esnórquel.”

Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and six structured FAQs, five structured regional paths, no missing local targets, valid executable JavaScript, complete analytics attribution on all internal links, the approved editorial blue-and-gold bundle, the corrected Montserrat/Inter header foundation, and the current `site-config.js` injection chain. The next recommended authority pair is the bilingual family-vacation planning guide.

### Batch 26: family-vacation planning authority pair

Completed for staging on 2026-10-02:

- `/ecuador-family-vacations/`
- `/es/vacaciones-familiares-ecuador/`

Both family-travel collections retain their existing image-led destination and experience content while adding a direct answer focused on realistic base count, transfer rhythm, downtime, age fit, mobility and group interests. Four planning facts summarize a useful trip-length range, a simpler first route, wildlife-led options and the family details that should shape the itinerary.

A five-row decision table now compares Quito with cloud forest, Andes with Amazon, mainland with Galápagos, a Galápagos-focused route and a private multigenerational route. Each row includes a planning range, family fit and concrete items to confirm before booking without presenting the examples as fixed packages. A sixth visible and structured FAQ covers rooms, child seats, activity restrictions, transfers, guides, meals, cancellation terms, insurance and current guidance, while a five-item `ItemList` mirrors the route pathways.

The Spanish page received an additional natural-language pass that removes imported “outdoor” and “lodge” wording, replaces awkward literal phrasing, and normalizes “Tours de avistamiento de aves en Ecuador.” Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and six structured FAQs, five structured route paths, no duplicate IDs, no missing internal targets, valid executable JavaScript, complete analytics attribution on all internal links, the approved recommendations blue-and-gold cluster, the Montserrat/Inter header foundation and the current `site-config.js` injection chain. The next recommended authority pair is the bilingual private-tour planning guide.

### Batch 27: private-tour planning authority pair

Completed for staging on 2026-10-02:

- `/ecuador-private-tours/`
- `/es/tours-privados-ecuador/`

Both private-tour collections now open with a direct answer that defines private travel without equating it automatically with luxury or an all-inclusive package. Four facts explain a useful planning range, likely traveler fit, components a private arrangement may include and the operating and commercial terms that must always be verified.

A five-row decision table compares Quito with the nearby Andes, Andes with cloud forest, Andes with Amazon, mainland with Galápagos and a custom wildlife route. Each row includes a planning range, intended fit and specific questions about driver-guide roles, reserve access, transport, meals, fees, flights, boats, baggage, specialist guides, permits and weather buffers. The page does not invent live packages, prices or availability.

A sixth visible and structured FAQ explains what a useful private-tour quote should itemize, while a five-item `ItemList` mirrors the route paths. The Spanish page received a natural-language pass that removes literal constructions such as “flujo,” “transiciones limpias,” “Andes más bosque nublado” and imported lodge terminology. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and six structured FAQs, five structured route paths, no duplicate IDs, no missing links or images, valid executable JavaScript, complete attribution on all internal links, the approved recommendations blue-and-gold cluster, the Montserrat/Inter foundation and the current `site-config.js` chain. The next recommended authority pair is the bilingual luxury-travel planning guide.

### Batch 28: luxury-travel planning authority pair

Completed for staging on 2026-10-02:

- `/ecuador-luxury-travel/`
- `/es/viajes-de-lujo-ecuador/`

Both luxury-travel collections now open with a direct answer that defines luxury through specified comfort, privacy, service, access and logistical support rather than an unsupported premium label. Four planning facts distinguish potential value from assumptions and require named properties, categories, service levels, inclusions and commercial terms to be confirmed in writing.

A five-row table compares Quito with the Andes, Andes with cloud forest, an Amazon stay, a Galápagos-focused trip and a private multi-region route. The table identifies where higher-comfort planning can add value and what travelers must confirm about rooms, vehicles, guides, meals, reserve access, shared services, equipment, vessels, flights, fees, suppliers, support and cancellation terms. No live property, vessel, price or availability claim is invented.

A sixth visible and structured FAQ explains what a luxury proposal should specify, while a five-item `ItemList` mirrors the relevant planning paths. The Spanish page received a full natural-language pass that replaces literal phrases including “ritmo curado,” “viaje firma,” “capa de fauna,” “pulido” and visible lodge terminology with natural Ecuadorian Spanish. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and six structured FAQs, five structured route paths, no duplicate IDs, no missing links or images, valid executable JavaScript, complete attribution on all internal links, the approved recommendations blue-and-gold cluster, the Montserrat/Inter foundation and the current `site-config.js` chain. The next recommended authority pair is the bilingual Amazon-versus-Galápagos comparison guide.

### Batch 29: Amazon-versus-Galápagos decision pair

Completed for staging on 2026-10-02:

- `/ecuador-amazon-vs-galapagos/`
- `/es/amazonia-vs-galapagos/`

Both comparison guides now open with a direct answer that distinguishes visible island and marine wildlife from rainforest immersion, biodiversity and guided interpretation without declaring either region universally better. A six-row decision table compares encounter style, environments, access, daily rhythm, accommodation and cost drivers, with a specific verification point for every row.

A new combination section distinguishes a compressed 10–12-day trip, a disciplined 12–14-day framework and a more comfortable 15-day-or-longer route. These are planning models rather than packages or guarantees, and the pages direct readers into the existing bilingual Amazon–Galápagos itinerary before nonrefundable services are booked.

A sixth visible and structured FAQ covers access, named accommodations or vessels, guiding, meals, equipment, fees, baggage, cancellation terms and weather buffers. A five-item `ItemList` mirrors the principal regional and itinerary guides. The Spanish page replaces imported lodging and snorkeling terms, awkward comparison labels and literal route language with natural Ecuadorian Spanish. Local validation checks one doctype and H1 per page, one direct-answer block, six comparison rows, six visible and structured FAQs, five structured planning paths, internal-link attribution, approved blue-and-gold editorial styling, Montserrat/Inter typography and the current `site-config.js` injection chain. The next recommended authority pair is the bilingual family-friendly itinerary guide.

### Batch 30: family-friendly itinerary authority pair

Completed for staging on 2026-10-02:

- `/family-friendly-ecuador-itinerary/`
- `/es/itinerario-familiar-ecuador/`

Both itinerary guides now open with a direct answer that prioritizes two or three bases, arrival recovery, altitude adjustment, one principal nature block and family-specific checks. A five-row decision table compares Quito with Mindo, the nearby Andes, Galápagos or the Amazon, plus a broader Andes–Galápagos route. Each row includes a useful planning range, family fit and concrete items to verify about transfers, rooms, mobility, activity ages, child seats, flights, vessels, baggage, guides, rest time and included services.

The existing destination cards, planning guidance and balanced 10-day example remain in place, while unsupported winner and price language has been qualified. A sixth visible and structured FAQ covers room configuration, child seats, age and height limits, intensity, altitude, mobility, transport, guides, meals, equipment, fees, baggage, cancellation terms, insurance and current guidance. A five-item `ItemList` mirrors the relevant family, Galápagos, Mindo, wildlife-comparison and lodging guides.

The former `TouristTrip` schema was removed because these pages are planning frameworks rather than verified bookable products. The Spanish page now uses natural South American Spanish, including “esnórquel,” “fauna emblemática,” “alojamientos en la selva” and “traslados bien coordinados.” Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets, complete content-link attribution, the approved blue-and-gold editorial bundle, Montserrat/Inter typography and the current `site-config.js` chain. The next recommended deep-authority pair is the bilingual Amazon travel guide.

### Batch 31: Amazon travel-guide authority pair

Completed for staging on 2026-10-02:

- `/amazon-travel-guide/`
- `/es/guia-viaje-amazonia/`

Both Amazon guides now open with a direct answer that prioritizes access pattern, habitat and nature experience, realistic wildlife expectations, guide quality, daily schedule, group size and named accommodation over a simplistic preference for remoteness. The hero copy is shorter and more useful, while the existing destination, experience, route and internal-authority sections remain intact.

A five-row decision table compares Tena, Misahuallí, Yasuní, Cuyabeno and an Amazon-plus-another-region route. Every row states the useful trip fit, expected access pattern and concrete items to confirm, including activity sites, road and river transfers, boat operators, meeting points, guide ratios, rooms, meals, equipment, connectivity, baggage, buffers and cancellation terms. Access and wildlife are presented as date-specific conditions rather than guarantees.

A sixth visible and structured FAQ covers the exact gateway, transfer sequence, named accommodation and room, private or shared services, meals, drinking water, equipment, difficulty, fees, connectivity, baggage rules, cancellation terms, emergency procedures and current access. A five-item `ItemList` mirrors the main destination and lodging paths. The Spanish page replaces imported `lodge`, `timing`, `flujo` and “pulida” language with natural Ecuadorian Spanish while retaining the existing legacy lodging URL. Local validation found one doctype and H1, one direct-answer block, five comparison rows, six visible and structured FAQs, five structured destination paths, no duplicate IDs, no missing internal targets, complete content-link attribution, the approved blue-and-gold editorial bundle, Montserrat/Inter typography and the current `site-config.js` chain. The next recommended deep-authority pair is the bilingual Andes travel guide.

### Batch 32: Andes travel-guide authority pair

Completed for staging on 2026-10-02:

- `/andes-travel-guide/`
- `/es/guia-viaje-andes/`

Both Andes guides now open with a direct answer that prioritizes elevation, arrival pace, realistic road time, current conditions and confirmed bases before travelers commit to accommodation or transfers. The shorter hero copy and planning sequence make the core answer easier to scan while preserving the existing image-led destination, experience, route and internal-authority sections.

A five-row decision table compares a Quito base, Quito with the northern highlands, Quito with Cotopaxi, the Andes with cloud forest and the Andes with a distant region. Each row explains the useful trip fit, a realistic route pattern and the details to confirm about acclimatization, drive times, road conditions, rooms, meals, guides, entrances, accessibility, private or shared transport and flight buffers.

A sixth visible and structured FAQ covers elevation and pacing, road and weather conditions, named accommodations and rooms, guide and driver roles, transport, accessibility, activity difficulty, entrances, meals, equipment, cancellation terms and flight buffers. A five-item `ItemList` mirrors the principal Andes planning paths. The Spanish page replaces imported lodging terminology and literal phrasing such as `capa`, “pulido” and “limpia” with natural Ecuadorian Spanish. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and structured FAQs, five structured regional paths, no duplicate IDs, no missing internal targets or assets, valid executable JavaScript, complete analytics attribution on internal links, the approved editorial blue-and-gold bundle, Montserrat/Inter typography and the current `site-config.js` injection chain. The next recommended deep-authority pair is the bilingual Coast travel guide.

### Batch 33: Coast travel-guide authority pair

Completed for staging on 2026-10-02:

- `/coast-travel-guide/`
- `/es/guia-viaje-costa/`

Both Coast guides now open with a direct answer that prioritizes one or two useful bases, realistic drive times, date-specific sea and wildlife conditions, and the traveler's actual beach, town, surf or nature priorities. The shorter hero copy and three-step planning sequence improve scanability while preserving the existing destination, experience, route and internal-authority sections.

A five-row decision table compares Salinas, Montañita, Puerto López, La Ruta del Sol and a coast-plus-another-region route. Every row states the useful trip fit, route pattern and concrete items to confirm, including beach access, room location, surf operators and equipment, licensed boat operators, sea conditions, seasonal wildlife, road time, pickups, baggage, meals, fees, minimum stays, flight buffers and cancellation terms. Weather, access and wildlife are presented as date-specific conditions rather than guarantees.

A sixth visible and structured FAQ covers current roads and weather, realistic transfers, named accommodations and rooms, activity access, seasonal wildlife dates, guide and boat operators, private or shared transport, meals, fees, equipment, cancellation terms and flight buffers. A five-item `ItemList` mirrors the principal coastal planning paths. The Spanish page replaces literal `flujo`, `capa`, `hub`, “pulido” and “encaje” language with natural Ecuadorian Spanish. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and structured FAQs, five structured regional paths, no duplicate IDs, no missing internal targets or assets, valid executable JavaScript, complete analytics attribution on internal links, the approved editorial blue-and-gold bundle, Montserrat/Inter typography and the current `site-config.js` injection chain. The next recommended deep-authority pair is the bilingual Galápagos travel guide.

### Batch 34: Galápagos travel-guide authority pair

Completed for staging on 2026-10-02:

- `/galapagos-travel-guide/`
- `/es/guia-viaje-galapagos/`

Both Galápagos guides now open with a direct answer that asks travelers to choose a verified land-based, cruise or combined format before selecting islands and visitor sites. The planning sequence protects flights and transfer buffers, distinguishes private from shared services, and treats wildlife, weather, sea conditions, schedules and access as date-specific rather than guaranteed.

A five-row decision table compares a one-island land base, a multi-island land route, a cruise, a land-and-cruise combination and a Galápagos-plus-mainland itinerary. Every row identifies the useful trip fit, route pattern and exact details to confirm, including named accommodations or vessels, rooms or cabins, visitor sites, licensed operators and naturalist guides, guide ratios, equipment, meals, park and transit fees, inter-island transfers, ports, baggage, flight buffers, insurance, entry procedures and cancellation terms. No vessel, visitor site, wildlife encounter, price or availability is invented.

A sixth visible and structured FAQ consolidates the booking-verification requirements, while a five-item `ItemList` mirrors the principal island and itinerary paths. The Spanish page replaces literal `capa`, `flujo`, “pulido,” “encaje,” `hub` and awkward “Tours Avistamiento Aves Ecuador” wording with natural Ecuadorian Spanish and correct accents. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid executable JavaScript, complete analytics attribution on internal links, the approved editorial blue-and-gold bundle, Montserrat/Inter typography and the current `site-config.js` injection chain. The next recommended deep-authority pair is the bilingual Mindo cloud-forest guide.

### Batch 35: Mindo cloud-forest guide authority pair

Completed for staging on 2026-10-02:

- `/mindo-cloud-forest-guide/`
- `/es/guia-bosque-nublado-mindo/`

Both Mindo guides now open with a direct answer that asks travelers to choose their main purpose—general nature, specialist birding, activities or rest—before selecting an accommodation, guide, reserve access and number of nights. The guidance explains why two or three nights can provide more flexibility than a rushed day visit while requiring road, rain, trail, wildlife and operating conditions to be checked for the actual dates.

A five-row decision table compares a Mindo day trip, a two- or three-night stay, a specialist birding stay, a wider Chocó Andino route and Mindo combined with another Ecuador region. Every row states its useful fit, route pattern and what must be confirmed, including travel time, pickup, road conditions, room, meals, guide specialty and language, reserve and feeder access, trail difficulty, transport, baggage, flight buffers, equipment, fees and cancellation terms. Wildlife, access and weather are treated as date-specific conditions rather than guarantees.

A sixth visible and structured FAQ consolidates the booking checks, while a five-item `ItemList` mirrors the main Mindo, birdwatching, Chocó Andino, activity and cloud-forest lodging paths. The Spanish page replaces imported `lodge` and `feeders` terminology and literal phrases such as `capa`, `flujo`, “pulido,” “encaje” and “más fuerte” with natural Ecuadorian Spanish and correct accents. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and six structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid executable JavaScript, complete analytics attribution on internal links, the approved editorial blue-and-gold bundle, Montserrat/Inter typography and the current `site-config.js` injection chain. The next recommended deep-authority pair is the bilingual best-things-to-do-in-Mindo guide.

### Batch 36: best-things-to-do-in-Mindo authority pair

Completed for staging on 2026-10-02:

- `/best-things-to-do-in-mindo-ecuador/`
- `/es/mejores-cosas-que-hacer-en-mindo/`

Both activity guides now open with a direct answer that organizes Mindo around the traveler's real priority: birdwatching and reserve visits, waterfalls and trails, chocolate and butterflies, or responsibly operated soft adventure. The pages recommend choosing two or three priorities instead of treating Mindo as a rushed checklist and connect readers directly to the Mindo destination guide, the specialist birdwatching guide and the Trip Builder.

A five-row decision table compares birdwatching, waterfalls and trails, butterflies and nature stops, chocolate and local food, and tubing or ziplining. Every row identifies the intended traveler, a useful planning window and what to verify about the named site or operator, road and weather conditions, guide specialty, ethics, equipment, accessibility, age or weight limits, insurance, entrances, dietary needs, inclusions and cancellation terms. Access, weather, wildlife, schedules and availability are treated as date-specific conditions rather than guarantees.

A sixth visible and structured FAQ consolidates the activity-booking checks, while a five-item `ItemList` mirrors the principal Mindo, birdwatching, Chocó Andino and planning paths. The Spanish page replaces imported `birding`, `tubing`, `canopy`, `lodge`, `snorkel`, `capa`, `encaje` and “más fuerte” phrasing with natural Ecuadorian Spanish and correct accents. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and six structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid executable JavaScript, complete analytics attribution on internal links, local image references, the approved editorial blue-and-gold bundle, Montserrat/Inter typography and the current `site-config.js` injection chain. The next recommended deep-authority pair is the bilingual Quito travel guide.

### Mindo specialist funnel enhancement

The two Mindo guide pairs now include contextual handoffs to the live Mindo Bird Watching tour and activity pages and to Chocó Andino Tours. These links appear after the traveler has enough context to choose the relevant specialist, open in a new tab and use the dedicated `sister_site_click` event with location, page type and partner attribution. Mindo Tours is intentionally withheld from the visitor path because its public site currently presents a coming-soon page and the corresponding Experience Ecuador member page is an empty placeholder; it should be added only after substantive public content is available.

### Batch 37: Quito travel-guide authority pair

Completed for staging on 2026-10-02:

- `/quito-travel-guide/`
- `/es/guia-viaje-quito/`

Both Quito guides now open with a direct answer that protects the arrival night, accounts for altitude, recommends two or three days when culture or a nearby outing matters, and requires buffers before Galápagos flights, Amazon departures or longer Andes transfers. The pages connect the decision directly to the Andes guide, Mindo guide and transportation planning before the traveler reserves hotel nights.

A five-row decision table compares a one-night arrival, two-day cultural stay, three-day city base, Quito-and-Mindo route and Quito before a fixed departure. Every row identifies the useful trip fit, a realistic route pattern and exact items to confirm, including flight times, airport and activity transfers, neighborhood, room and check-in details, altitude, mobility, guides, entrances, road conditions, operator, pickup, inclusions, baggage, return margins and contingency planning.

A sixth visible and structured FAQ consolidates the booking checks, while a five-item `ItemList` mirrors the main Andes, Mindo, transportation, lodging and Trip Builder paths. The Spanish page replaces literal planning language such as `capa`, “encaje,” “suma,” “más fuerte” and “más suave” with natural Ecuadorian Spanish. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and six structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid JSON-LD, complete analytics attribution on internal links, local image references, the approved editorial blue-and-gold bundle, Montserrat/Inter typography and the current `site-config.js` injection chain.

### Batch 38: language-immersion authority pair

Completed for staging on 2026-10-02:

- `/language-immersion-ecuador/`
- `/es/inmersion-espanol-ecuador/`

The existing English interest page now uses the approved editorial cluster bundle and opens its main content with a direct answer that defines the minimum credible learning, teaching, group, lodging, transportation and activity requirements. The former `TouristTrip` schema was removed because the pilot is not a verified bookable product. A new South American Spanish counterpart repairs the previously broken Spanish hreflang destination and provides fully localized metadata, visible content, structured data, form labels, confirmation language and analytics values rather than redirecting visitors to English.

A five-row decision table compares a Quito cultural base, Quito with Mindo, a birdwatching and nature emphasis, a food and community emphasis, and private or small-group delivery. Each row distinguishes the proposed learning rhythm from the details that still require confirmation, including teacher, methodology, level placement, group size, named rooms, transportation, guides, activity access, mobility, equipment, meals, pricing and cancellation terms. Both pages explicitly state that the concept is in an interest stage and do not invent departures, prices, availability or included services.

Six visible and structured FAQs match across both languages, while a five-item `ItemList` connects the Quito, Mindo, birdwatching, transportation and Trip Builder paths. Contextual links to live Mindo Bird Watching tour and activity pages and Chocó Andino Tours use `sister_site_click` attribution; Mindo Tours remains withheld while its public site is incomplete. The interest forms preserve referrer, UTM, user-agent and submission-time capture with English or Spanish source values. Both URLs were added to the XML sitemap with a 2026-10-02 modification date. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid JSON-LD and executable JavaScript, complete internal-link attribution, the approved blue-and-gold editorial bundle, shared bilingual hero geometry, Montserrat/Inter typography and the cache-busted `site-config.js` injection chain.

### Batch 39: Quito destination authority pair

Completed for staging on 2026-10-02:

- `/regions/andes/quito/`
- `/es/regiones/andes/quito/`

These destination pages now complement rather than duplicate the broader Quito travel guide. A direct answer explains what Quito is best for, suggests two days for many first visits and three days when a confirmed nearby outing matters, and links travelers to the deeper guide, lodging comparison and transportation planning before they reserve. The destination-level copy protects altitude pacing, realistic transfers and flight buffers without turning the page into a fixed itinerary.

A five-row decision table compares the Historic Center, food and neighborhoods, viewpoints and elevation, Quito with Mindo, and Quito with a focused Andes outing. Each option states its useful fit, a realistic visit pattern and details to confirm, including opening hours, current access, provider and meeting point, dietary needs, transport, mobility, elevation, guide specialty, reserve access, rooms, road conditions, fees, equipment and flight margins. A new cloud-forest handoff connects the internal Mindo guide with live Mindo Bird Watching tour and activity pages using `sister_site_click` attribution.

Six visible and structured FAQs now match across both languages, and a five-item `ItemList` mirrors the Quito guide, one-, two- and three-day city paths and the Mindo guide. The Spanish page replaces `hub`, `capa`, “más fuerte,” “se siente,” and literal `encaje` phrasing with natural Ecuadorian Spanish. The destination cluster variables were normalized from teal to the approved navy, blue and gold system, and a shared destination direct-answer component was added without introducing another palette. Local validation found one doctype and H1 per page, one direct-answer block, five comparison rows, six visible and structured FAQs, five structured destination paths, no duplicate IDs, no missing internal targets or assets, valid JSON-LD and executable JavaScript, complete internal-link attribution, Montserrat/Inter typography and the cache-busted `site-config.js` injection chain.

### Batch 40: Quito one-day itinerary authority pair

Completed for staging on 2026-10-02:

- `/regions/andes/quito/1-day/`
- `/es/regiones/andes/quito/1-dia/`

Both one-day pages now open their main content with a direct answer that prioritizes the Historic Center, one confirmed cultural interior and one weather-flexible viewpoint. The guidance distinguishes a full city day from an international arrival day, protects altitude adjustment and recovery, and warns against adding a distant excursion without current access, transportation and return details.

A five-row decision table compares an international arrival day, a full city day, a culture-first day, a food-and-neighborhood day and a viewpoint-flexible day. Each row states who the option serves, a realistic structure and the details to confirm, including flight and transfer status, hotel check-in, energy and altitude response, current hours and access, entrances, guide credentials, meeting point, walking and mobility needs, weather, named provider, dietary needs, inclusions, cancellation terms and safe return. No opening time, operating schedule, price, provider or availability is invented.

Six visible and structured FAQs now match across both languages, and a five-item `ItemList` connects the Quito overview, Quito travel guide, two- and three-day itineraries and transportation planning. The four-card continuation row now routes readers to Cotopaxi, Otavalo, Baños and the Mindo cloud-forest guide without leaving an incomplete desktop row. The Spanish page replaces literal `capa`, `flujo`, `encaje`, `golden hour`, “más fuerte,” “más suave,” “pago visual” and awkward one-day-Quito phrasing with natural Ecuadorian Spanish. The planning cluster gained shared answer and decision-table components using only the approved navy, blue and gold palette, with a new cache version propagated through `site-config.js` and the shared runtime. Local validation found one doctype and H1 per page, one direct-answer block, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid JSON-LD and executable JavaScript, complete analytics attribution on internal links, Montserrat/Inter typography and the injected shared runtime. The next recommended deep-authority pair is Quito in 2 Days.

### Batch 41: Quito two-day itinerary authority pair

Completed for staging on 2026-10-02:

- `/regions/andes/quito/2-days/`
- `/es/regiones/andes/quito/2-dias/`

Both two-day pages now open with a direct answer that anchors the first day in the Historic Center, one confirmed cultural interior and a weather-flexible viewpoint. The second day is presented as one deliberate choice—Mitad del Mundo, neighborhoods and food, Mindo or another verified Andes extension—rather than an unrealistic attempt to combine every option. Altitude pacing and fixed flight or transfer margins remain protected.

A five-row decision table compares the classic city-and-Equator combination, a culture-and-food route, a Quito-and-Mindo introduction, a focused Andes outing and a plan containing an arrival or departure buffer. Each row identifies its useful fit, realistic structure and details to confirm, including access, provider, transport, meeting point, guide, road and weather conditions, reserve access, elevation, activity level, equipment, meals, inclusions, baggage, return margin, cancellation terms and contingency planning. No current access, provider, schedule, price or availability is assumed.

Six visible and structured FAQs match across both languages, while a five-item `ItemList` connects the Quito overview, Quito travel guide, one- and three-day itineraries and transportation planning. The four-card continuation row links Cotopaxi, Otavalo, Baños and the Mindo cloud-forest guide without an incomplete desktop row. The Spanish page replaces literal `capa`, `flujo`, `hub`, `radio`, “más fuerte,” “pago tardío,” “más limpio,” `encaja` and awkward two-day-Quito phrasing with natural Ecuadorian Spanish. Local validation found one doctype and H1 per page, one direct-answer block, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid JSON-LD and executable JavaScript, complete analytics attribution on internal links, the approved planning bundle, Montserrat/Inter typography and the current cache-busted `site-config.js` injection chain. The next recommended deep-authority pair is Quito in 3 Days.

### Batch 42: Quito three-day itinerary authority pair

Completed for staging on 2026-10-02:

- `/regions/andes/quito/3-days/`
- `/es/regiones/andes/quito/3-dias/`

Both three-day pages now open with a direct answer that assigns the first day to Quito's historic core and a weather-flexible viewpoint, the second to the Equator area or deeper city exploration, and the third to one verified extension. Cotopaxi, Otavalo, Mindo and other routes are presented as alternatives whose road, guide, access, elevation, equipment and return conditions must be confirmed, not as guaranteed inclusions.

A five-row decision table compares a Cotopaxi route, an Otavalo route, a Mindo cloud-forest route, three days entirely within Quito and a departure-safe structure. Each row identifies its useful fit, realistic sequence and details to verify, including provider, park or reserve access, road and weather conditions, market-day relevance, named stops, guide specialty, activity level, walking, meals, equipment, inclusions, baggage, flight margin, cancellation terms and contingency planning. No operator, access, schedule, price, wildlife outcome or availability is invented.

Six visible and structured FAQs match across both languages, while a five-item `ItemList` connects the Quito overview, Quito travel guide, one- and two-day itineraries and the Mindo cloud-forest guide. The four-card continuation row links Cotopaxi, Otavalo, Baños and Mindo without an incomplete desktop row. The Spanish page replaces literal `capa`, `flujo`, `hub`, `encaja`, “más fuerte,” “más suave,” “pago visual,” “más limpio” and awkward forest-direction phrasing with natural Ecuadorian Spanish. Local validation found one doctype and H1 per page, one direct-answer block, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid JSON-LD, complete analytics attribution on internal links, the approved planning bundle, Montserrat/Inter typography and the current cache-busted `site-config.js` injection chain.

### Batch 43: national spectacled bear authority pair

Completed for staging on 2026-10-02:

- `/spectacled-bear-ecuador-guide/`
- `/es/guia-oso-de-anteojos-ecuador/`

This bilingual pair serves as a national species and trip-planning guide rather than a commercial tour page. It explains identity, habitat and distribution across Ecuador, conservation, regional differences, ethical observation and how to assess a responsible specialist. It explicitly states that sightings are never guaranteed and that Mindo or an ordinary Andes or Chocó Andino visit should not be represented as a bear tour.

The pages use `WebPage`, `Article`, `Taxon`, `FAQPage` and `BreadcrumbList` schema, six matching visible and structured FAQs, the approved editorial blue-and-gold cluster and three locally hosted reference images. Tracked pathways distinguish Experience Ecuador research, Chocó Andino conservation context and Mindo Bird Watching field expertise and private-tour conversion. Eight English and eight Spanish contextual source pages now link to the corresponding national guide, including wildlife, nature, Andes, Chocó Andino, national planning and MBW member pages. Page-specific WhatsApp prompts remain controlled by the centralized injected `site-config.js`; the shared runtime cache key was advanced after browser QA exposed an older cached configuration response.

The pair is included in `sitemap.xml` with a 2026-10-02 modification date. This brings the completed deep-authority program to 28 bilingual pairs / 56 pages. Production remains unchanged; staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment visual QA found that the unsupported `btnSecondary` class left secondary actions unstyled on the new guides and their 16 contextual inlink cards. Every Batch 43 secondary action now uses the established `btnGhost` treatment. The MBW specialist card contains separate primary guide and secondary private-experience buttons with intentional spacing, and the final recommendation CTA is also a visible secondary button. Direct HTTP verification returned 200 for the English and Spanish MBW guide, MBW private-tour and Chocó Andino regional-guide destinations. The shared runtime key was advanced again so cached configuration cannot rewrite the corrected editorial bundle to its previous version.

### Batch 44: Cotopaxi destination authority pair

Completed for staging on 2026-10-02:

- `/regions/andes/cotopaxi/`
- `/es/regiones/andes/cotopaxi/`

Both destination pages now open with a direct answer that distinguishes a focused day trip from a one-night stay and protects the route against altitude, weather, road and current-access uncertainty. The new five-row decision table compares a Quito day trip, Quito with one night, a Quito–Cotopaxi–Baños route, a photography-focused visit and a more active high-altitude day. Each option identifies its best fit, a realistic structure and the exact access, guide, transport, activity, equipment, meal, room, cancellation and timing details that still require confirmation. No current park access, weather, provider, schedule, price or availability is invented.

Six visible and structured FAQs now match across both languages. A five-item `ItemList` links the most useful onward planning paths: Quito, the Andes travel guide, Quito in three days, transportation and Baños. Contextual links connect Cotopaxi with the Quito and Andes authority clusters, lodging guidance, recommended providers and the centralized Trip Builder. The Spanish page replaces literal or unnatural uses of “limpio,” “más fuerte,” `encaja`, `capa` and `outdoor` with natural South American Spanish.

Page-specific English and Spanish WhatsApp prompts are now controlled by the injected centralized `site-config.js`, and the shared runtime cache key has advanced to `20261002k`. Local validation found one doctype and H1 per page, one direct-answer block, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid JSON-LD and JavaScript, complete analytics attribution on internal links, the approved destination cluster palette and the current injectable foundation. This brings the completed deep-authority program to 29 bilingual pairs / 58 pages. Production remains unchanged; staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment Chrome QA passed at 1440-pixel desktop and 390-pixel mobile widths in both languages. Neither page has horizontal overflow; both render the destination cluster, five decision rows and six FAQs with the approved gold primary action and blue heading colors. The centralized widget exposes the five Cotopaxi-specific prompts in each language. Staging rewrites the page robots directive to `noindex,nofollow,noarchive,nosnippet` and does not load GTM unless analytics debug mode is explicitly enabled.
