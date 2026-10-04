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

The national guides now cite Ecuador's official Andean Bear Conservation Action Plan before the international references and show a bilingual editorial review date. Their `Article` schema includes organization-level authorship plus matching `datePublished` and `dateModified` values, improving source transparency without inventing an individual reviewer.

### Batch 44: Cotopaxi destination authority pair

Completed for staging on 2026-10-02:

- `/regions/andes/cotopaxi/`
- `/es/regiones/andes/cotopaxi/`

Both destination pages now open with a direct answer that distinguishes a focused day trip from a one-night stay and protects the route against altitude, weather, road and current-access uncertainty. The new five-row decision table compares a Quito day trip, Quito with one night, a Quito–Cotopaxi–Baños route, a photography-focused visit and a more active high-altitude day. Each option identifies its best fit, a realistic structure and the exact access, guide, transport, activity, equipment, meal, room, cancellation and timing details that still require confirmation. No current park access, weather, provider, schedule, price or availability is invented.

Six visible and structured FAQs now match across both languages. A five-item `ItemList` links the most useful onward planning paths: Quito, the Andes travel guide, Quito in three days, transportation and Baños. Contextual links connect Cotopaxi with the Quito and Andes authority clusters, lodging guidance, recommended providers and the centralized Trip Builder. The Spanish page replaces literal or unnatural uses of “limpio,” “más fuerte,” `encaja`, `capa` and `outdoor` with natural South American Spanish.

Page-specific English and Spanish WhatsApp prompts are now controlled by the injected centralized `site-config.js`, and the shared runtime cache key has advanced to `20261002k`. Local validation found one doctype and H1 per page, one direct-answer block, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid JSON-LD and JavaScript, complete analytics attribution on internal links, the approved destination cluster palette and the current injectable foundation. This brings the completed deep-authority program to 29 bilingual pairs / 58 pages. Production remains unchanged; staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment Chrome QA passed at 1440-pixel desktop and 390-pixel mobile widths in both languages. Neither page has horizontal overflow; both render the destination cluster, five decision rows and six FAQs with the approved gold primary action and blue heading colors. The centralized widget exposes the five Cotopaxi-specific prompts in each language. Staging rewrites the page robots directive to `noindex,nofollow,noarchive,nosnippet` and does not load GTM unless analytics debug mode is explicitly enabled.

### Batch 45: Baños destination authority pair

Completed for staging on 2026-10-02:

- `/regions/andes/banos/`
- `/es/regiones/andes/banos/`

Both destination pages now open with a direct answer that recommends two or three nights, a dedicated waterfall day and one additional adventure, viewpoint or hot-springs priority. The answer requires travelers to confirm the operating provider, guide, current route, pickup, transportation, equipment, activity requirements, inclusions and cancellation terms before booking. It connects directly to transportation planning and the upgraded Cotopaxi destination pair.

A five-row decision table compares a two-night first stay, a balanced three-night stay, scenery without extreme sports, an adventure-priority stay and a Cotopaxi–Baños route. Each row identifies its best fit, a realistic structure and the provider, access, guide, activity, equipment, insurance, mobility, thermal-bath, room, luggage, road, timing and cancellation details that still require confirmation. No operator, route condition, access, price, schedule or availability is invented.

Six visible and structured FAQs now match across both languages, and a five-item `ItemList` connects adventure, nature, Cotopaxi, transportation and Trip Builder paths. Nine English and nine Spanish contextual source pages link into the pair, excluding each destination page itself. The Spanish page replaces literal uses of `flujo`, `capa`, `encaja`, `checklist`, `outdoor`, “más fuerte,” and “se sienta” with natural South American Spanish.

Page-specific English and Spanish WhatsApp prompts are controlled by the centralized injected `site-config.js`; the shared runtime cache key has advanced to `20261002l`. Local validation found one doctype and H1 per page, one direct-answer block, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid JSON-LD and JavaScript, complete analytics attribution on internal links and the approved destination cluster palette. This brings the completed deep-authority program to 30 bilingual pairs / 60 pages. Production remains unchanged and staging stays non-indexable until final QA and the full Screaming Frog crawl are complete.

Post-deployment Chrome QA passed at 1440-pixel desktop and 390-pixel mobile widths in both languages. Neither page has horizontal overflow or incomplete card rows; both render the approved gold primary actions and blue headings, five decision rows and six FAQs. The centralized widget exposes the five Baños-specific prompts in each language. Staging rewrites robots to `noindex,nofollow,noarchive,nosnippet` and does not load GTM unless analytics debug mode is explicitly enabled.

### Batch 46: Papallacta destination authority pair

Completed for staging on 2026-10-02:

- `/regions/andes/papallacta/`
- `/es/regiones/andes/papallacta/`

Both destination pages now open with a direct answer that recommends either a focused day trip or one restorative night. Travelers are told to confirm the named thermal facility, current day-use or overnight access, reservations, pools and spa services included, room, meals, transportation, cancellation terms, altitude considerations and operator health guidance. No current access, facility, schedule, price, package or availability is invented.

A five-row decision table compares a Quito day trip, one-night recovery stay, thermal-only visit, thermal pools with light nature and an onward Andes road segment. Each option identifies its best fit, a realistic structure and the exact access, reservation, room, meal, transport, luggage, trail, weather, equipment, timing and cancellation details that still require confirmation.

Six visible and structured FAQs match exactly across both languages. A five-item `ItemList` connects Quito, relaxation, nature, transportation and Trip Builder planning paths. Eight unique English and eight unique Spanish contextual source pages now link into the pair, excluding each Papallacta destination page itself. The Spanish page replaces literal or unnatural uses of `relax`, `reset`, `outdoor`, `capa`, “más fuerte,” “más limpia” and “se sienta” with natural South American Spanish.

Page-specific English and Spanish WhatsApp prompts are controlled by the centralized injected `site-config.js`; the shared runtime cache key has advanced to `20261002m`. Local validation found one doctype and H1 per page, one authority-answer block, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid JSON-LD, JavaScript and XML, complete analytics attribution on internal links and the approved destination cluster palette. This brings the completed deep-authority program to 31 bilingual pairs / 62 pages out of 217 submitted sitemap URLs, leaving 155 sitemap pages for page-level upgrades. Production remains unchanged and staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment Chrome QA passed at 1440-pixel desktop and 390-pixel mobile widths in both languages. Neither page has horizontal overflow or incomplete content rows; both render the authority answer, five decision rows and six FAQs with the approved gold primary actions and navy/blue destination headings. The centralized widget exposes the five Papallacta-specific prompts in each language. Staging rewrites robots to `noindex,nofollow,noarchive,nosnippet` and does not load GTM unless analytics debug mode is explicitly enabled.

### Batch 47: northern and southern Andes destination authority set

Completed for staging on 2026-10-02:

- `/regions/andes/otavalo/` and `/es/regiones/andes/otavalo/`
- `/regions/andes/cuenca/` and `/es/regiones/andes/cuenca/`
- `/regions/andes/choco-andino/` and `/es/regiones/andes/choco-andino/`

Each bilingual pair now opens with a destination-specific direct answer and a five-row decision table. Otavalo distinguishes a focused market-and-culture day from a one-night northern Andes route; Cuenca protects two or three nights for its walkable cultural core before adding a verified excursion; Chocó Andino recommends one cloud-forest base and explicitly treats wildlife activity, weather, roads and sightings as current conditions rather than guarantees. All pages identify the exact guide, access, transport, room, meal, mobility, equipment, etiquette, timing and cancellation details that still require confirmation without inventing operators, schedules, prices or availability.

Six visible and structured FAQs match on every page, and every pair has a five-item structured planning list. Existing authority already supplies at least eight unique same-language inlink sources to each destination; two additional contextual source links were added for Cuenca to bring it to that threshold. Spanish copy was normalized away from imported or literal uses of `reset`, `outdoor`, `capa`, `encaja`, “más fuerte,” “más limpia” and “se sienta.”

The centralized injected `site-config.js` now supplies five destination-specific WhatsApp prompts in each language, and the shared runtime cache key has advanced to `20261002n`. This batch brings the completed deep-authority program to 34 bilingual pairs / 68 pages out of 217 submitted sitemap URLs, leaving 149 sitemap pages for page-level upgrades. Production remains unchanged and staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment Chrome QA passed across all six pages at 1440-pixel desktop and 390-pixel mobile widths. Every render has no horizontal overflow, one authority answer, five complete decision rows, six FAQs, the approved gold primary actions and destination cluster styling. All six localized WhatsApp menus expose five page-specific prompts. Staging applies `noindex,nofollow,noarchive,nosnippet` and does not load GTM unless analytics debug mode is explicitly enabled.

### Batch 48: Cotacachi, Zuleta and Tena destination authority set

Completed for staging on 2026-10-02:

- `/regions/andes/cotacachi/` and `/es/regiones/andes/cotacachi/`
- `/regions/andes/zuleta/` and `/es/regiones/andes/zuleta/`
- `/regions/amazon/tena/` and `/es/regiones/amazonia/tena/`

Each pair now has a destination-specific direct answer, five-row decision table, six matching visible and structured FAQs and five structured planning paths. Cotacachi separates Cuicocha viewpoints, active lake options, artisan context and Otavalo combinations; Zuleta makes host permission, workshops, private land and community access explicit; Tena requires current confirmation for river level, provider, safety, equipment, wildlife, weather, lodge and road or boat transfers. No access, host, operator, activity condition, wildlife outcome, price or availability is invented.

Contextual discovery links raise Cotacachi and Zuleta to eight unique same-language inbound source pages; Tena already exceeds that threshold. The Spanish pages replace imported or literal `outdoor`, `rainforest`, `lodge`, `capa`, `encaja`, “más fuerte,” “más limpia” and “se sienta” language where it affects visitor-facing planning copy. The centralized injected configuration supplies five localized WhatsApp prompts for every page and advances the shared runtime cache key to `20261002o`.

This batch brings the completed deep-authority program to 37 bilingual pairs / 74 pages out of 217 submitted sitemap URLs, leaving 143 sitemap pages for page-level upgrades. Production remains unchanged and staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment Chrome QA passed across all six Batch 48 pages at 1440-pixel desktop and 390-pixel mobile widths. Every render has no horizontal overflow, one authority answer, five decision rows, six FAQs, the approved gold primary actions and destination cluster styling. The localized WhatsApp menus expose five correct page-specific prompts. Staging applies `noindex,nofollow,noarchive,nosnippet` and keeps GTM disabled unless analytics debug mode is explicitly enabled.

### Batch 49: Misahuallí, Cuyabeno and Yasuní Amazon destination authority set

Completed for staging on 2026-10-02:

- `/regions/amazon/misahualli/` and `/es/regiones/amazonia/misahualli/`
- `/regions/amazon/cuyabeno-wildlife-reserve/` and `/es/regiones/amazonia/cuyabeno-reserva-faunistica/`
- `/regions/amazon/yasuni-national-park/` and `/es/regiones/amazonia/parque-nacional-yasuni/`

Each bilingual pair now opens with a destination-specific direct answer, a five-row decision table, six matching visible and structured FAQs and five structured onward-planning paths. Misahuallí is positioned as a one-to-three-day river-town introduction with responsible community and wildlife practices; Cuyabeno protects three to five days and requires the accommodation and complete land-and-canoe transfer to be selected together; Yasuní protects four to seven days and requires an authorized accommodation and the complete remote transfer system to be confirmed first. No animal encounter, water level, weather, access, schedule, operator, price or availability is represented as guaranteed.

The Spanish copy was corrected where imported phrasing weakened clarity. In particular, a legacy Yasuní passage that incorrectly described the park like an easy-access Tena-area gateway was replaced with accurate remote, biodiversity-led planning guidance. High-visibility `rainforest` and `lodge` wording was also normalized to natural South American Spanish in titles, descriptions, hero copy and primary planning sections.

All six destinations already have at least eight unique same-language inbound source pages. The Spanish Cuyabeno URL, which was missing from the submitted sitemap even though the page exists and has a valid English counterpart, has been added with the current modification date. The other five sitemap entries now carry the same date. Page-specific English and Spanish WhatsApp prompts are controlled by the centralized injected `site-config.js`, and the shared runtime cache key has advanced to `20261002p`.

Local validation found one doctype and H1 per page, one authority-answer block, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing internal targets or assets, valid JSON-LD, JavaScript and XML, and the approved destination cluster stylesheet. Restoring the omitted Spanish Cuyabeno counterpart raises the canonical sitemap inventory from 217 to 218 URLs. This batch brings the completed deep-authority program to 40 bilingual pairs / 80 pages, leaving 138 sitemap pages for page-level upgrades (36.7% complete). Production remains unchanged and staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment browser QA passed across all six Batch 49 pages at 1440 × 1000 desktop and 390 × 844 mobile viewports. Every render has no horizontal overflow, one authority answer, five complete decision rows, six FAQs, five localized WhatsApp options, the approved destination cluster and the approved gold `rgb(242, 180, 65)` primary action. The shared runtime is served as `site.js?v=20261002p`; staging applies `noindex,nofollow,noarchive,nosnippet` and does not load GTM unless analytics debug mode is explicitly enabled. A visual desktop review of the corrected Spanish Yasuní page confirmed balanced hero and authority-section alignment without empty grid slots or off-palette controls.

### Batch 50: experiences hub, nature and wildlife authority set

Completed for staging on 2026-10-02:

- `/experiences/` and `/es/experiencias/`
- `/experiences/nature/` and `/es/experiencias/naturaleza/`
- `/experiences/wildlife-birding/` and `/es/experiencias/vida-silvestre-y-aves/`

Each bilingual pair now opens with a direct planning answer, a five-row decision table, six matching visible and structured FAQs, and five structured onward-planning paths. The hub directs travelers to choose one lead experience and one complementary priority before selecting regions. The nature pair organizes decisions around ecosystem, time and realistic transfer limits. The wildlife pair protects habitat selection, dawn and late-afternoon observation time, ethical expectations and qualified specialist guidance while explicitly refusing to guarantee sightings.

The wildlife pages now create stronger research paths into Mindo birdwatching, the national birdwatching itinerary, the national spectacled-bear guide, the Amazon guide and the Mindo Bird Watching specialist profile. Existing inbound authority already exceeds the eight-source threshold: the hub pair has nine and ten unique same-language source pages, nature has 43 and 37, and wildlife has 35 and 32.

The Experiences cluster source no longer contains its inherited brown `#9b5f15`, dark-brown `#68400f` or beige `#fff7e9` tokens. It now uses the approved Experience Ecuador blue, navy and pale-blue surfaces; gold remains reserved for primary actions and deliberate emphasis. All 22 pages that use this cluster were advanced to `cluster-experiences.css?v=20261002b`, preventing cached pages from retaining the old palette. The centralized configuration supplies five localized WhatsApp prompts for every upgraded page and advances the shared runtime cache key to `20261002q`.

Local validation found one H1 and authority answer per page, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing local targets, valid JSON-LD, JavaScript and sitemap XML, and natural South American Spanish in the upgraded high-visibility sections. This batch brings the completed deep-authority program to 43 bilingual pairs / 86 pages out of 218 canonical sitemap URLs, leaving 132 pages for page-level upgrades (39.4% complete). Production remains unchanged and staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment browser QA passed across all six Batch 50 pages at 1440 × 1000 desktop and 390 × 844 mobile viewports. Every render has no horizontal overflow, one authority answer, five complete decision rows, six FAQs and five localized WhatsApp options. The browser confirmed `cluster-experiences.css?v=20261002b`, blue `#034ea2`, navy `#0f2f62`, gold `rgb(242, 180, 65)`, runtime `site.js?v=20261002q`, staging `noindex,nofollow,noarchive,nosnippet` and no GTM load. Visual review of the Spanish wildlife page confirmed balanced hero and authority layouts with no empty grid slots or off-palette brown surfaces.

### Batch 51: adventure, relaxation and culture authority set

Completed for staging on 2026-10-02:

- `/experiences/adventure/` and `/es/experiencias/aventura/`
- `/experiences/relaxation/` and `/es/experiencias/relajacion/`
- `/experiences/culture/` and `/es/experiencias/cultura/`

Each bilingual pair now opens with a direct planning answer and a five-row decision table, followed by six matching visible and structured FAQs and five structured onward-planning paths. Adventure prioritizes qualified operators, safety systems, realistic difficulty, weather and recovery. Relaxation protects a two- or three-night restorative base while requiring named rooms, facilities and services rather than unsupported wellness claims. Culture prioritizes real schedules, local guides or hosts, community permission, etiquette, accessibility and photography consent.

Existing contextual authority already exceeds the eight-source threshold: Adventure has 32 English and 26 Spanish unique inbound source pages, Relaxation has 38 and 31, and Culture has 25 in each language. The Spanish pages received an additional language-quality pass that removes visible `reset`, `slow travel`, `lodges`, `sightseeing`, `timing`, and repeated literal `capa`, `encaja` and “más fuerte” phrasing from high-visibility sections.

The six pages retain the approved Experiences cluster `20261002b`. The centralized injected configuration now supplies five page-specific WhatsApp prompts in each language and advances the shared runtime cache key to `20261002r`. Local validation found one H1 and authority answer per page, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing local targets, valid JSON-LD, JavaScript and sitemap XML. This batch brings the completed deep-authority program to 46 bilingual pairs / 92 pages out of 218 canonical sitemap URLs, leaving 126 pages for page-level upgrades (42.2% complete). Production remains unchanged and staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment browser QA passed across all six Batch 51 pages at 1440 × 1000 desktop and 390 × 844 mobile viewports. Every render has no page-level horizontal overflow, one authority answer, five complete decision rows, six visible FAQs, one canonical six-question `FAQPage`, five structured planning paths and five localized WhatsApp options with valid `wa.me` targets. Responsive tables scroll within their own containers on mobile. The browser confirmed `cluster-experiences.css?v=20261002b`, blue `#034ea2`, navy `#0f2f62`, gold `#f2b441`, runtime `site.js?v=20261002r`, staging `noindex,nofollow,noarchive,nosnippet` and no GTM load outside analytics debug mode.

### Batch 52: culinary, must-eat foods and Baños adventure authority set

Completed for staging on 2026-10-03:

- `/experiences/culinary/` and `/es/experiencias/gastronomia/`
- `/experiences/culinary/must-eats/` and `/es/experiencias/gastronomia/imperdibles/`
- `/experiences/adventure/banos/` and `/es/experiencias/aventura/banos/`

Each bilingual pair now opens with a direct planning answer, a five-row decision table, six matching visible and structured FAQs and five structured onward-planning paths. The culinary guide asks travelers to choose a regional food scene first and verify hosts, schedules, dietary requirements, allergens, hygiene, sourcing and inclusions. The must-eat guide relates dishes to the regions where they have context and makes seasonality, preparation, sourcing and menu availability explicit. The Baños adventure guide protects one anchor activity per day, qualified operators, safety systems, weather flexibility, pickup and recovery time without representing any activity or access as guaranteed.

The culinary parent already has 17 English and 16 Spanish same-language inbound sources. New contextual research callouts raise the must-eat guide and the Baños adventure guide to eight unique same-language inbound source pages each. These links come from national, regional and experience pages where the recommendation is useful, and carry internal-link analytics labels and locations.

The Spanish pages received a language-quality pass that removes imported or literal `snacks`, `mood`, `capa`, “más fuerte,” “forma de ruta” and repeated “se sienta” phrasing from visible planning copy. The centralized injected configuration now supplies five page-specific WhatsApp prompts in each language and advances the shared runtime key to `20261003s`. The shared cluster foundation advances to `cluster-base.css?v=20261003f`; the approved Experiences palette remains blue `#034ea2`, navy `#0f2f62` and gold `#f2b441`.

Local validation found one H1 and authority answer per target page, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing local targets, valid JSON-LD, JavaScript and sitemap XML across all 30 modified pages. Sitemap modification dates were updated for every changed canonical URL. This batch brings the completed deep-authority program to 49 bilingual pairs / 98 pages out of 218 canonical sitemap URLs, leaving 120 pages for page-level upgrades (45.0% complete). Production remains unchanged and staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment browser QA passed across all six Batch 52 targets at 1440 × 1000 desktop and 390 × 844 mobile viewports. Every target has no page-level horizontal overflow, one authority answer, five complete decision rows, six visible FAQs, one canonical six-question `FAQPage`, five structured planning paths and five localized WhatsApp actions with valid `wa.me` targets. Responsive decision tables scroll inside their own containers on mobile. Representative English and Spanish source pages also render the new contextual inlink component without overflow. The browser confirmed Experience blue `#034ea2`, navy `#0f2f62`, gold `#f2b441`, runtime `site.js?v=20261003s`, staging `noindex,nofollow,noarchive,nosnippet` and no GTM load outside analytics debug mode.

### Batch 53: Mindo and Quito birdwatching funnel set

Completed for staging on 2026-10-03:

- `/experiences/birdwatching/mindo/` and `/es/experiencias/avistamiento/mindo/`
- `/experiences/birdwatching/quito/` and `/es/experiencias/avistamiento/quito/`
- `/regions/andes/mindo/` and `/es/regiones/andes/mindo/`

Each bilingual pair now opens with a specific direct planning answer, a five-row decision table, six matching visible and structured FAQs and five structured onward-planning paths. The Mindo birdwatching pair protects at least two dawns, compares habitat and elevation choices and explains why no ethical guide can guarantee wild sightings. The Quito pair treats the capital as a high-Andes gateway, accounts for altitude and verified access and connects contrasting cloud-forest routes without presenting them as interchangeable. The Mindo destination pair recommends two or three nights for most first visits, one lead priority per day and weather flexibility while requiring named lodging, current access, transfers and inclusions to be confirmed.

Contextual links now give each focused birdwatching page eight unique same-language inbound source pages. These paths connect the national wildlife hub, national birdwatching itinerary, Quito and Mindo destination guides, cloud-forest lodging research, specialist member profile and relevant tour discovery pages. The Mindo destination pair already has 38 English and 36 Spanish inbound sources. The Spanish pages received a language-quality pass that removes residual imported English and literal planning language from high-visibility copy.

The centralized injected `site-config.js` supplies five localized WhatsApp prompts for all six targets, and the shared runtime cache key advances to `20261003t`. Supporting pages were advanced to their current approved cluster cache keys, including Recommendations `20261003g`; the palette remains Experience Ecuador blue `#034ea2`, navy `#0f2f62`, pale blue and action gold `#f2b441`, with no new color family introduced.

Local validation found one H1 and authority answer per target page, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, valid JSON-LD, JavaScript and sitemap XML. Sitemap modification dates were updated for every changed canonical entry. This batch brings the completed deep-authority program to 52 bilingual pairs / 104 pages out of 218 canonical sitemap URLs, leaving 114 pages for page-level upgrades (47.7% complete). Production remains unchanged and staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment browser QA passed across all six Batch 53 targets at 1280-pixel desktop and 390 × 844 mobile widths. Every target has no page-level horizontal overflow, one authority answer, five decision rows, six visible FAQs, one six-question `FAQPage`, five structured planning paths and five correct localized WhatsApp choices. The browser confirmed Experience blue/navy headings, gold `rgb(242, 180, 65)` primary actions, Experiences `20261003c`, Destinations `20261003d`, runtime `site.js?v=20261003t`, staging `noindex,nofollow,noarchive,nosnippet` and no GTM load outside analytics debug mode. Visual review of the Spanish Mindo destination confirmed clean mobile wrapping, balanced hero actions and no off-palette controls.

### Batch 54: Galápagos hub, Santa Cruz and San Cristóbal authority set

Completed for staging on 2026-10-03:

- `/regions/galapagos/` and `/es/regiones/galapagos/`
- `/regions/galapagos/santa-cruz-island/` and `/es/regiones/galapagos/santa-cruz-island/`
- `/regions/galapagos/san-cristobal-island/` and `/es/regiones/galapagos/san-cristobal-island/`

The regional hub now tells travelers to choose a cruise or land-based structure first, protect the fixed flight and inter-island transport chain and select island bases before adding excursions. Santa Cruz protects three to five nights, the multi-stage Baltra transfer and one or two priority licensed excursions. San Cristóbal protects a flexible major marine day, licensed access, swimming and safety requirements and recovery time. Every page states that weather, ocean conditions, access and wildlife activity require current confirmation and cannot be guaranteed.

Each page now has a destination-specific direct answer, five-row comparison table, six matching visible and structured FAQs and five structured planning paths. Existing contextual authority provides 23 English and Spanish sources to the Galápagos hub and nine per language to Santa Cruz. A new contextual planning link raises San Cristóbal to eight unique same-language inbound sources.

The Spanish pages received a South American Spanish quality pass that removes imported `hub`, `tour`, `checklist`, `capa`, “más fuerte,” “más limpia,” `fluido` and repeated “se sienta” wording from visible planning copy without altering URL slugs. The centralized injected configuration supplies five localized WhatsApp prompts for all six targets and advances the shared runtime key to `20261003v`; the header loader advances to `20261003k` so the new page-specific configuration cannot be preempted by an older cached loader. The approved Destinations cluster remains `20261003d` with blue, navy, pale-blue and gold styling only.

Local validation found one H1 and authority answer per target, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing local pages or assets and valid JSON-LD, JavaScript and sitemap XML. Sitemap modification dates were updated for all changed canonical URLs. This batch brings the completed deep-authority program to 55 bilingual pairs / 110 pages out of 218 canonical sitemap URLs, leaving 108 pages for page-level upgrades (50.5% complete). Production remains unchanged and staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment browser QA passed across all six Batch 54 targets at 1280-pixel desktop and 390 × 844 mobile widths. Every target has no page-level horizontal overflow, one authority answer, five decision rows, six visible FAQs, one six-question `FAQPage`, five structured planning paths and a loaded destination hero. Desktop runtime checks confirmed five correct page-specific WhatsApp choices per page, config `20261003v`, header loader `20261003k`, runtime `site.js?v=20261003v`, staging `noindex,nofollow,noarchive,nosnippet` and no GTM load outside analytics debug mode. The browser confirmed navy headings, gold `rgb(242, 180, 65)` primary actions and Destinations `20261003d`. Visual mobile review of Spanish San Cristóbal confirmed clean hero wrapping, balanced buttons and tags and no off-palette controls or dead grid space.

### Batch 55: Isabela, Floreana and Coast regional authority set

Completed for staging on 2026-10-03:

- `/regions/galapagos/isabela-island/` and `/es/regiones/galapagos/isabela-island/`
- `/regions/galapagos/floreana-island/` and `/es/regiones/galapagos/floreana-island/`
- `/regions/coast/` and `/es/regiones/costa/`

Isabela now protects three to five nights, Puerto Villamil as the practical base, a major volcanic-landscape day, a marine or coastal day and light arrival and departure days. Floreana is explicitly separated into a licensed day visit or a confirmed overnight stay, with transport, access, guides, hosts and contingency time treated as operating requirements rather than assumptions. The Coast hub now requires one gateway, one primary base and one seasonal priority before adding stops, with Guayaquil, Puerto López, the Ruta del Sol, Montañita and family or food routes compared as distinct planning structures.

Every page now has one destination-specific direct answer, a five-row comparison table, six matching visible and structured FAQs and five structured planning paths. Isabela already has eight English and nine Spanish same-language inbound sources. Three contextual source links per language raise Floreana from five to eight. The Coast hub retains 24 inbound sources in each language.

The Spanish pages received an additional quality pass that removes inherited literal `capa`, `hub`, `checklist`, “más fuerte,” “calmada” and “más limpia” language from the upgraded pages without changing URL slugs. No page invents access, transport schedules, licensed operators, accommodations, prices, wildlife sightings or availability. The centralized injected configuration supplies five localized WhatsApp prompts for all six targets. Runtime and config advance together to `20261003w`, while the header loader advances to `20261003l`, preventing a cached header from loading a previous page configuration. The approved Destinations cluster remains `20261003d`.

Local validation found one H1 and one authority-answer section per target, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing local pages or assets and valid JSON-LD, JavaScript and sitemap XML. Sitemap modification dates were updated for all 12 changed canonical pages. This batch brings the completed deep-authority program to 58 bilingual pairs / 116 pages out of 218 canonical sitemap URLs, leaving 102 pages for page-level upgrades (53.2% complete). Production remains unchanged and staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment browser QA passed across all six Batch 55 targets at 1280-pixel desktop and 390 × 844 mobile widths. Every page has no page-level horizontal overflow, one authority answer, five complete decision rows, six visible FAQs, one six-question `FAQPage`, five structured planning paths and a loaded destination hero. Runtime checks confirmed five correct page-specific WhatsApp choices per page, config `20261003w`, header loader `20261003l`, runtime `site.js?v=20261003w`, staging `noindex,nofollow,noarchive,nosnippet` and no GTM load outside analytics debug mode. The browser confirmed navy `rgb(15, 47, 98)` headings, gold `rgb(242, 180, 65)` primary actions and Destinations `20261003d`; all hero actions fit within the 390-pixel viewport.

### Batch 56: Guayaquil, Puerto López and Montañita destination authority set

Completed for staging on 2026-10-03:

- `/regions/coast/guayaquil/` and `/es/regiones/costa/guayaquil/`
- `/regions/coast/puerto-lopez/` and `/es/regiones/costa/puerto-lopez/`
- `/regions/coast/montanita/` and `/es/regiones/costa/montanita/`

This batch was reconciled directly with the enriched sitemap and the latest staging crawl. It preserves each URL's destination-planning intent, primary entity, bilingual pairing and concise live metadata while adding the missing AEO and GEO authority layers. The source of truth identifies these as Coast destination authority pages targeting “things to do” and “where to stay” patterns, FAQ snippets, local planning context and internal conversion. It also records an early average-position signal of 10.33 for Spanish Guayaquil and 10.0 for English Puerto López, so the upgrade strengthens those pages without changing their URL or primary intent.

Guayaquil now distinguishes a protected transit night, a two-night city stay, a waterfront and food visit, a lower-friction family or accessible plan and a Coast or Galápagos gateway sequence. Puerto López protects two or three nights, a verified marine day, weather flexibility, responsible seasonal whale observation and licensed access without promising wildlife. Montañita separates beginner and experienced surf needs, beach and social priorities, quieter lodging choices and a Puerto López combination while requiring the exact property, nighttime environment, qualified surf provider, equipment and current conditions to be confirmed.

Every page has one concise direct answer, a five-row decision table, six matching visible and structured FAQs, a five-item structured planning list and `TouristDestination` entity markup alongside its collection-page role. Existing contextual authority already supplies nine inbound sources to each Guayaquil page, eleven to each Puerto López page and eight to each Montañita page. Metadata remains within practical search-result lengths: titles are 45–53 characters and descriptions are 111–134 characters.

The Spanish pages received a South American Spanish pass that removes inherited literal `capa`, “más fuerte,” “más limpia,” “se sienta,” “calmada” and related imported planning language from the target pages. The centralized injected configuration supplies five localized WhatsApp prompts for all six targets. Runtime and config advance together to `20261003x`, while the header loader advances to `20261003m`; the approved Destinations cluster remains `20261003d`.

Local validation found one H1 and one authority answer per page, five decision rows, six visible and structured FAQs, five structured planning paths, no duplicate IDs, no missing local pages or assets and valid JSON-LD, JavaScript and sitemap XML. Sitemap modification dates were updated for all six canonicals. This batch brings the completed deep-authority program to 61 bilingual pairs / 122 pages out of 218 canonical sitemap URLs, leaving 96 pages for page-level upgrades (56.0% complete). Production remains unchanged and staging stays non-indexable until final browser QA and the full Screaming Frog crawl are complete.

Post-deployment browser QA passed across all six Batch 56 targets at 1280-pixel desktop and 390 × 844 mobile widths. Every page has no page-level horizontal overflow, one authority answer, five complete decision rows, six visible FAQs, one six-question `FAQPage`, five structured planning paths, `TouristDestination` entity markup and a loaded destination hero. Runtime checks confirmed five correct page-specific WhatsApp choices per page, config `20261003x`, header loader `20261003m`, runtime `site.js?v=20261003x`, staging `noindex,nofollow,noarchive,nosnippet` and no GTM load outside analytics debug mode. The browser confirmed navy `rgb(15, 47, 98)` headings, gold `rgb(242, 180, 65)` primary actions and Destinations `20261003d`; all hero actions fit within the 390-pixel viewport.

### Batch 57: La Ruta del Sol, Salinas and Amazon regional authority set

Completed for staging on 2026-10-03:

- `/regions/coast/la-ruta-del-sol/` and `/es/regiones/costa/la-ruta-del-sol/`
- `/regions/coast/salinas/` and `/es/regiones/costa/salinas/`
- `/regions/amazon/` and `/es/regiones/amazonia/`

This batch was selected from the enriched sitemap and crawl evidence. La Ruta del Sol was the remaining Coast destination with only three unique inbound sources per language in the source workbook. Contextual links from the Coast itinerary and the Guayaquil, Puerto López, Montañita and Salinas planning pages now bring it to eight current same-language source pages. Salinas has the strongest current opportunity in this set: the uploaded GSC extract records two English impressions at average position 10.0 and six Spanish impressions at average position 15.5. The Amazon regional hub anchors 26 current same-language inbound source pages in each language and now provides an entity-rich answer layer before travelers choose Tena, Misahuallí, Cuyabeno or Yasuní.

La Ruta del Sol now recommends one or two overnight bases instead of daily hotel changes and distinguishes focused three-day, balanced five-day, slower seven-day, surf and nature-and-food routes. Salinas separates a two-night beach reset, three-night peninsula stay, family or accessible plan, waterfront and food stay and Guayaquil combination. The Amazon hub now makes the access system the first decision, distinguishes flexible road gateways from reserve-based transfer chains and prevents unsupported promises about wildlife, river conditions, access or lodge operations.

Every page has one direct answer, a five-row decision table, six matching visible and structured FAQs, five structured planning paths and `TouristDestination` markup alongside its collection-page role. Metadata remains within practical lengths: titles are 43–51 characters and descriptions are 110–144 characters. The Amazon pair's 52 previously empty analytics labels were replaced with destination- or action-specific attribution labels. The Spanish pages received a South American Spanish pass that removes inherited literal `capa`, `hub`, “más fuerte,” “más limpia,” “se sienta” and “calmado” phrasing from the target pages.

The centralized injected configuration supplies five localized WhatsApp prompts for all six targets. Runtime and config advance together to `20261003y`, the header loader advances to `20261003n`, and the approved Destinations cluster remains `20261003d`. Local validation found one H1 and one authority-answer section per target, five decision rows, six visible and structured FAQs, five structured planning paths, no empty analytics labels, no duplicate IDs, no missing local pages or assets and valid JSON-LD, JavaScript and sitemap XML. Sitemap dates were updated for the six target canonicals and the three newly edited contextual source pages. This batch brings the completed deep-authority program to 64 bilingual pairs / 128 pages out of 218 canonical sitemap URLs, leaving 90 pages for page-level upgrades (58.7% complete). Production remains unchanged and staging stays non-indexable until post-deployment browser QA and the final Screaming Frog crawl are complete.

Post-deployment browser QA passed across all six Batch 57 targets at 1280-pixel desktop and 390 × 844 mobile widths. Every page has no page-level horizontal overflow, one authority answer, five complete decision rows, six visible FAQs, one six-question `FAQPage`, five structured planning paths, `TouristDestination` markup and a loaded hero. Runtime checks confirmed five correct page-specific WhatsApp choices per page, config and runtime `20261003y`, staging `noindex,nofollow,noarchive,nosnippet` and no GTM load outside analytics debug mode. The browser confirmed navy `rgb(15, 47, 98)` headings, gold `rgb(242, 180, 65)` primary actions and Destinations `20261003d`; all hero actions fit within the 390-pixel viewport. The immutable deployment and custom staging domain both serve the new runtime and page-specific configuration.

### Batch 58: homepage, Regions index and Contact conversion set

Completed for staging on 2026-10-03:

- `/` and `/es/`
- `/regions/` and `/es/regiones/`
- `/contact/` and `/es/contacto/`

This batch was selected from the enriched sitemap by strategic priority and current search opportunity. The homepages carry the highest remaining source-of-truth score and already average about position five in the supplied GSC extract. The Regions pair averages positions 14.41 in English and 11.45 in Spanish and connects every regional destination cluster. Contact is the site's primary traveler, business, partnership and media conversion endpoint.

The homepages now explain how to use Experience Ecuador as a research, comparison, itinerary and recommendation platform before requesting personalized support. The Regions pair preserves its substantial existing editorial content while extending the decision layer to four regions plus multi-region planning, with explicit differences in access, pace and wildlife context. Contact now routes five distinct request types, tells users which facts to include and states clearly that a form submission does not confirm price, availability or a booking.

Every page has one authority answer, a five-row decision table, six matching visible and structured FAQs and a five-item structured planning or contact list. The homepages and Regions pages strengthen same-language paths into the trip builder, experiences, recommendations and Contact. Contact retains the existing form and privacy paths while adding traveler, local-business, partnership and media guidance without inventing service levels or response-time promises. Previously empty analytics labels on the Regions and Contact targets were replaced, and five localized WhatsApp choices are supplied centrally for all six URLs.

The Spanish pages received a South American Spanish quality pass that removes literal or imported `hub`, `capa`, `eco-lodges`, “se sienta,” “más fuerte” and “absorber los traslados” language from high-visibility copy. No cluster colors were added or changed: these pages continue to use the approved shared Hubs and Trust bundles, and gold remains the primary-action color. Runtime and configuration advance together to `20261003z`; the header loader advances to `20261003o`.

Local validation found one H1 and one authority-answer section per target, five complete decision rows, six visible and structured FAQs, five structured list items, no empty analytics labels, valid JSON-LD, JavaScript and sitemap XML, and updated sitemap dates for all six canonicals. This batch brings the completed deep-authority program to 67 bilingual pairs / 134 pages out of 218 canonical sitemap URLs, leaving 84 pages for page-level upgrades (61.5% complete). Production remains unchanged and staging stays non-indexable until post-deployment browser QA and the final Screaming Frog crawl are complete.

Post-deployment browser QA passed across all six Batch 58 pages on the immutable deployment and the custom staging domain. Desktop checks at 1280 pixels confirmed no horizontal overflow, one authority answer, five decision rows, six visible FAQs, five structured list items, correct page-specific WhatsApp choices, valid `wa.me` targets, navy or approved cluster headings and gold `rgb(242, 180, 65)` primary actions. Sequential checks at 390 × 844 confirmed no page-level overflow, responsive cards and actions and decision tables contained within their own horizontal scroll regions. Runtime and configuration are `20261003z`, the header loader is `20261003o`, staging remains `noindex,nofollow,noarchive,nosnippet`, and GTM does not load outside analytics debug mode. The final immutable deployment is `https://bd8ce65e.experienceecuador-staging.pages.dev`; the custom domain serves the same final Spanish copy and runtime.

#### Batch 58 CSS-governance correction

The six Batch 58 pages were subsequently reconciled with the approved stylesheet architecture. Both homepages now use `site.css` plus `cluster-discovery.css`; the Regions pair uses `site.css` plus `cluster-hubs.css`; and the Contact pair uses `site.css` plus `cluster-trust.css`. The duplicate inline homepage design systems and duplicate Contact language-switch styles were removed. Homepage-only grid and hero rules now live in the Discovery cluster bundle.

Discovery, Hubs and Trust are locked to Experience Ecuador blue `#034ea2`, navy `#0f2f62`, pale blue `#edf5ff` and the shared gold primary action `#f2b441`. The former teal Hubs variables and slate Trust variables were removed. All three cluster versions are now explicit in `site-config.js`, eliminating the runtime fallback that had been rewriting their URLs to an older bundle. The corrected runtime/config key is `20261003aa` and the cluster key is `20261003b58`. This is a styling-governance correction to the same six pages and does not change the completed-page count.

Post-correction browser QA passed on the immutable staging deployment `https://23d06510.experienceecuador-staging.pages.dev` and the custom staging domain. All six pages loaded the assigned `20261003b58` cluster bundle, had zero authored inline style blocks and zero desktop page overflow. Browser-computed colors confirmed navy or blue headings and gold `rgb(242, 180, 65)` primary actions. Each target retained one authority answer, five decision rows and five localized WhatsApp actions. Staging remained `noindex,nofollow,noarchive,nosnippet`, and GTM did not load outside analytics debug mode.

### Batch 59: UNESCO, Andes hub and About authority set

Completed for staging on 2026-10-03:

- `/ecuador-unesco-world-heritage-sites/` and `/es/patrimonio-mundial-ecuador/`
- `/regions/andes/` and `/es/regiones/andes/`
- `/about/` and `/es/sobre-nosotros/`

This batch was selected from the enriched sitemap by search opportunity, authority role and trust coverage. The UNESCO guide has the strongest remaining GSC opportunity: the supplied 16-month extract records four English clicks from 954 impressions at average position 7.03 and 96 Spanish impressions at position 8.12. The Andes hub records 694 English impressions and 24 Spanish impressions and anchors 36 and 34 current same-language inbound sources. The About pair had only one recorded inbound source per language and remained thin despite its sitewide trust role.

The UNESCO pair now begins with the current official distinction between Ecuador's five inscribed World Heritage properties and the separate Tentative List. It identifies three cultural and two natural properties without presenting tentative candidates as already inscribed. A five-row decision matrix distinguishes the planning structure for Quito, Cuenca, Galápagos, Sangay and Qhapaq Ñan. The six-question answer layer explains category, route fit, access and nomination status. The facts were reconciled against the UNESCO World Heritage Centre's current Ecuador state-party record.

The Andes pair now answers the route question before the long regional guide: choose one lead highland base, protect a lighter altitude-adjustment day and add one focused northern, volcano, cloud-forest or southern circuit. Its five-row decision matrix and six-question FAQ cover base selection, altitude, multi-region combinations, conditions and guide requirements without promising access or weather. The About pair now explains the platform's research, planning, recommendation and local-business roles while separating a referral from a confirmed booking, price or availability.

Every page has one direct answer, five decision rows, six matching visible and structured FAQs and one five-item `ItemList`. The About pair now has eight unique same-language contextual inbound sources. The UNESCO pair has nine per language. The Andes hub retains more than 30 inbound sources per language and adds reciprocal authority with the UNESCO guide. All contextual links carry descriptive analytics labels.

The centralized injected configuration supplies five localized WhatsApp prompts for all six targets. Runtime and configuration advance together to `20261003ab`, and the header loader advances to `20261003p`. The targets use only the approved stylesheet architecture: About uses Global plus Trust `20261003b58`, Andes uses Global plus Destinations `20261003d`, and UNESCO uses Global plus Editorial `20261003j`. No page-authored inline styles or new color family were introduced.

Local validation found one H1 and one authority answer per target, five decision rows, six visible and structured FAQs, five structured planning paths, no empty analytics labels and valid JSON-LD, JavaScript and sitemap XML. Sitemap dates were updated for the six targets and the contextual source pages changed in this batch. This brings the completed deep-authority program to 70 bilingual pairs / 140 pages out of 218 canonical sitemap URLs, leaving 78 pages for page-level upgrades (64.2% complete). Production remains unchanged and staging stays non-indexable until post-deployment browser QA and the final Screaming Frog crawl are complete.

Post-deployment browser QA passed across all six Batch 59 pages on the custom staging domain at 1440 × 1000 desktop and 390 × 844 mobile widths. Every page has one H1, one authority answer, five complete decision rows, one `FAQPage`, one five-item `ItemList`, five valid page-specific WhatsApp actions, no broken images and no page-level horizontal overflow. Browser-computed primary actions remain the approved gold `rgb(242, 180, 65)`; About, Andes and UNESCO load their assigned Trust, Destinations and Editorial cluster bundles without page-authored inline CSS or a new color family. Staging remains `noindex,nofollow,noarchive,nosnippet`, and GTM does not load outside analytics debug mode. The final About positioning is current-tense in both languages. The immutable content deployment is `https://879e046b.experienceecuador-staging.pages.dev` from commit `a94b131`.

#### Batch 59 editorial spacing correction

Visual QA identified that an Editorial authority-answer component without a real sidebar was still inheriting the two-column sidebar grid, leaving unused space and narrowing the question. The shared Editorial cluster now uses a balanced single-column answer layout unless an actual `aside` is present; genuine sidebar variants retain their two-column structure. The correction was applied centrally to all 14 Editorial-cluster consumers without adding a color or page-level override. The Editorial key is `20261003j59`, and refreshed consumers use runtime/config `20261003ac` with header loader `20261003q`. Both UNESCO languages passed a second browser check at 1440 × 1000 and 390 × 844 with the corrected 307–351 pixel desktop answer cards, no overflow, no broken images, five valid WhatsApp actions and approved gold primary actions. The immutable corrected deployment is `https://686e223e.experienceecuador-staging.pages.dev` from commit `5158864`; the custom staging domain serves the same correction.

#### Batch 59 destination spacing correction

A follow-up screenshot review found the same empty-column behavior on the Andes hub pair, this time inherited from the shared Destinations cluster. A complete authority-answer audit across Global and all eight clusters confirmed that Destinations was the only remaining generic sidebar grid requiring the structural guard. All 54 Destination pages use only Global plus `cluster-destinations.css`, with no authored inline styles or extra page-specific stylesheets. The shared component now becomes single-column only when no direct `aside` exists; the 52 pages with a real destination sidebar retain their intended grid.

The Destination key advances to `20261003d59`; its consumers use runtime/config `20261003ad` and header loader `20261003r`. Browser QA at 1440 × 1000 confirmed compact 308- and 381-pixel answer cards on the English and Spanish Andes hubs, while both Cotopaxi pages retained their 683/293-pixel two-column grids. All four desktop pages had no overflow, no broken images, five valid WhatsApp actions and approved gold primary actions. Both Andes pages also passed at 390 × 844 with no overflow. The immutable corrected deployment is `https://bbda9457.experienceecuador-staging.pages.dev` from commit `072cc99`; the custom staging domain serves the same correction.

#### Batch 59 UNESCO Editorial normalization

A second visual audit confirmed that the UNESCO pair still mixed modern Editorial authority components with legacy Global sections and lacked the approved Google-font dependency. The pair now uses a dedicated heritage variant inside the shared Editorial bundle: a shorter bilingual H1, consistent 1064-pixel rendered section widths, unified navy 800-weight headings, 18-pixel card geometry, pale-blue CTA treatment, gold primary actions and responsive single-column mobile grids. Hero and card artwork now use semantic Editorial classes, and both HTML pages contain zero inline `style` attributes and no additional page stylesheet.

All 38 Editorial consumers advance to cluster `20261003j60` and runtime/config `20261003ae` with header loader `20261003s`. Browser QA confirms that Montserrat 800 and Inter 400 are actually loaded on both UNESCO languages, not merely declared as fallbacks. Both pages retain one H1, one authority answer, five decision rows, six matching visible and structured FAQs, one five-item `ItemList`, five localized WhatsApp actions, zero page overflow, staging `noindex,nofollow,noarchive,nosnippet` and no GTM outside analytics debug mode. The final immutable deployment is `https://fc9119c2.experienceecuador-staging.pages.dev` from commit `8ffb9d4`; the custom staging domain serves the same correction.

### Batch 60: Mission, Blog and Trip Builder platform foundation set

Completed for staging on 2026-10-03:

- `/mission/` and `/es/mision/`
- `/blog/` and `/es/blog/`
- `/trip-builder/` and `/es/planificador-de-viajes/`

This batch addresses three platform-wide roles identified in the enriched sitemap. Mission was a thin trust page with only one recorded inbound source per language. Blog was a well-linked content directory but had generic analytics labels, only four visible FAQs and page-authored image styles. Trip Builder was already one of the strongest conversion pages—with 60 English and 71 Spanish unique inbound sources in the source workbook—but still carried roughly 890 lines of duplicated page-local CSS and only three visible and structured FAQs.

Mission now explains the traveler-research role, the free/monthly/annual local-business visibility model, transparent recommendations, responsible travel standards and measurable attribution without presenting the platform as a confirmed booking provider. Blog now begins with a research answer and a five-path guide-selection matrix. Trip Builder retains its complete interactive logic while adding a direct planning answer, a five-row route-duration matrix and explicit confirmation boundaries.

Every page has one H1, one direct-answer component, five decision rows, six matching visible and structured FAQs and at least one five-item `ItemList`. Mission and Blog each receive contextual links from eight same-language source pages, raising both to at least eight unique editorial inlink sources. Generic or empty analytics labels were removed from all six targets. The centralized `site-config.js` supplies five localized WhatsApp actions for each URL.

No new color family or page stylesheet was introduced. Mission uses Global plus Trust `20261003b60`; Blog uses Global plus Editorial `20261003j61`; and Trip Builder uses Global plus Planning `20261003p60`. The duplicated Trip Builder design system now lives in one bilingual, page-scoped Planning-cluster variant. All six HTML files contain zero authored inline style blocks and zero `style` attributes. Runtime/config advance together to `20261003af`, while the header loader advances to `20261003t`.

Local validation confirms valid JSON-LD, JavaScript, CSS and sitemap XML; one authority answer, five complete decision rows, six visible FAQs, six structured questions and at least five structured list items per page; no duplicate IDs; no missing local links or assets; and no empty analytics labels. Sitemap modification dates are current for all six canonicals. This batch brings the completed deep-authority program to 73 bilingual pairs / 146 pages out of 218 canonical sitemap URLs, leaving 72 pages for page-level upgrades (67.0% complete). Production remains unchanged and staging stays non-indexable until browser QA and the final Screaming Frog crawl are complete.

Post-deployment browser QA passed on the custom staging domain at 1280-pixel desktop and 390 × 844 mobile widths. All six pages have zero page-level overflow, one authority answer, five decision rows, six visible FAQs, five localized WhatsApp actions, the assigned cluster version, approved gold `rgb(242, 180, 65)` primary actions, staging `noindex,nofollow,noarchive,nosnippet` and no GTM load outside analytics debug mode. Both Trip Builders generated a five-day itinerary after selecting a region and experience, confirming the CSS extraction did not break the interactive workflow. The Mission image endpoint returns HTTP 200; the English lazy image remains intentionally unloaded while it is outside the initial browser viewport. The immutable deployment is `https://e2b9a055.experienceecuador-staging.pages.dev` from commit `6b315c6`; the custom staging domain serves the same release.

### Batch 61: FAQs, Reviews and Partners trust foundation set

Completed for staging on 2026-10-03:

- `/faqs/` and `/es/preguntas-frecuentes/`
- `/reviews/` and `/es/resenas/`
- `/partners/` and `/es/aliados/`

This batch addresses the remaining trust and commercial-discovery foundation identified in the enriched sitemap. The FAQ pair had six English and four Spanish unique inbound sources in the supplied crawl. Partners had only three English inbound sources and the Spanish page was sitemap-only. Both Reviews pages were sitemap-only and had no direct contextual inlinks in the repository. Reviews also depended on a missing `reviews-data.js` asset and carried more than 600 lines of duplicated inline styling per language.

The FAQ pair now routes traveler questions into regions, experiences, recommendations, the Trip Builder and Contact while distinguishing research from a confirmed booking. Reviews now states clearly that no aggregate rating or testimonial will be published until its source can be verified, keeps provider ratings separate from feedback about Experience Ecuador and creates a responsible correction path. Partners now explains free, monthly and annual participation without inventing prices, placement guarantees, publication time or commercial results. It separates directory presence, enhanced visibility, editorial collaboration and separately scoped campaigns.

Every target has one H1, one direct answer, five decision rows, six matching visible and structured FAQs and one five-item `ItemList`. Eight high-authority same-language source pages now link contextually to all three trust routes: the homepage, About, Mission, Contact, Recommendations, Trip Builder, Ecuador Travel Guide and Blog. Current repository inlinks are therefore at least eight for Reviews, eleven for FAQs and thirteen for Partners in each language. All new links use descriptive attribution labels.

The six pages use only Global plus their assigned cluster. FAQs and Reviews use Trust `20261003b61a`; Partners uses Recommendations `20261003r61a`. Shared source pages use a reusable Global trust gateway rather than page-local styling. Primary actions remain approved gold `#f2b441`; secondary actions remain white with blue outlines. No authored inline style blocks, inline style attributes or new color family were introduced. Runtime and the centralized WhatsApp configuration advance to `20261003ag`, with five localized prompts for each target.

Local validation confirms valid JSON-LD, JavaScript and sitemap XML; one authority answer, five complete decision rows, six visible FAQs, six structured questions and five structured list items per page; no missing target images or internal links; no empty analytics labels; and current sitemap dates for all six canonicals. Headless browser QA at 1280-pixel desktop and 390 × 844 mobile widths confirms zero page-level overflow, approved gold `rgb(242, 180, 65)` primary actions, loaded centralized configuration, no browser errors and no GTM load in staging. Production remains unchanged. This batch brings the completed deep-authority program to 76 bilingual pairs / 152 pages out of 218 canonical sitemap URLs, leaving 66 pages for page-level upgrades (69.7% complete).

#### Batch 61 mobile grid correction

The first deployed mobile assertion exposed a clipped-content condition that a simple document-overflow check did not reveal: the decision table's 820-pixel intrinsic width expanded the parent grid track while the page clipped the result. The Trust and Recommendations foundation mains now use an explicit `minmax(0,1fr)` track and their sections have `min-width:0`, keeping the table horizontally scrollable without widening the hero or CTA sections. At 390 pixels, every target now renders a 362-pixel hero, 320-pixel full-width CTA buttons inside the viewport and a contained scroll region for the decision table. The correction is captured by Trust `20261003b61a` and Recommendations `20261003r61a`.

Post-correction browser QA passed on all six pages at 1280 × 900 desktop and 390 × 844 mobile widths on the custom staging domain. Every page returns HTTP 200 with `noindex,nofollow,noarchive,nosnippet`, has no page-level overflow, keeps all CTA buttons inside the viewport, contains the decision-table scroll region, loads five localized WhatsApp actions and the approved gold primary color, loads all main images and produces no browser errors. GTM remains disabled on staging. The final immutable deployment is `https://7fbd2b4c.experienceecuador-staging.pages.dev` from content commit `aa46ef9`; the custom staging domain serves the same corrected release.

### Batch 62: Partner application and consolidated legal foundation

Completed for staging on 2026-10-03:

- `/partners/join/` and `/es/aliados/unirse/`
- `/privacy-policy/` and `/es/politica-de-privacidad/`
- `/terms/` and `/es/terminos/`

The partner application retains its existing form workflow, dynamic location and experience choices, image-upload path, Turnstile integration and configured submission endpoint. The surrounding page now explains application readiness, review criteria, free/monthly/annual participation, media permissions and disclosure without promising placement, timing, traffic, leads or a fixed trial. The unsupported three-month trial statement was removed.

Privacy now explains forms, analytics, first- and recent-touch attribution, referral clicks, providers, retention and visitor choices in a direct-answer structure. Terms preserves and consolidates the existing policy substance around travel information, independent providers, bookings, acceptable use, intellectual property, availability and liability. No new legal-compliance claim was added. The duplicate `/terms-of-service/` and `/es/terminos-de-servicio/` sitemap entries were retired and permanently redirect to `/terms/` and `/es/terminos/` so each language has one authoritative terms URL.

Every target has one H1, one direct answer, five decision rows, six matching visible and structured FAQs and a five-item `ItemList`. The existing trust gateway on the homepage, About, Mission, Contact, Recommendations, Trip Builder, Ecuador Travel Guide and Blog now includes the application, privacy and terms routes in both languages, providing at least eight same-language contextual inlinks to each target. Primary actions remain approved gold and secondary actions remain white with blue outlines.

The pages use only Global plus their assigned cluster. Partner application uses Recommendations `20261003r62`; Privacy and Terms use Trust `20261003b62`. Runtime and centralized configuration advance together to `20261003ah`, with five localized WhatsApp prompts for each target. The sitemap now contains 216 canonical URLs after retiring the duplicate bilingual terms pair. This batch brings the completed deep-authority program to 79 bilingual pairs / 158 pages, leaving 58 canonical pages for page-level upgrades (73.1% complete). Production remains unchanged and staging stays non-indexable pending final browser QA and the full Screaming Frog crawl.

Post-deployment browser QA passed for all six targets on the custom staging domain at 1280 × 900 desktop and 390 × 844 mobile widths. Every page returns HTTP 200 with `noindex,nofollow,noarchive,nosnippet`, has one H1 and direct answer, five decision rows, six visible FAQs, five page-specific WhatsApp actions, loaded images, approved gold `rgb(242, 180, 65)` primary actions, contained decision tables, CTA buttons within the viewport and no browser errors or page-level overflow. Both partner forms initialize with five business-category options and retain the configured workflow. The former English and Spanish Terms of Service URLs return HTTP 301 to the consolidated canonical terms pages. The immutable deployment is `https://e3b5d417.experienceecuador-staging.pages.dev` from content commit `c18b8b1`; the custom staging domain serves the same release.

### Batch 63: Explore network, Spotlights and Transportation utility set

Completed for staging on 2026-10-03:

- `/explore/` and `/es/explora/`
- `/spotlights/` and `/es/destacados/`
- `/transportation/` and `/es/transporte/`

This batch upgrades the remaining discovery and planning utilities without replacing the functions that make them useful. Explore retains all six affiliate destinations and now explains when a traveler should remain on Experience Ecuador versus move into a specialist funnel. Spotlights retains its three-slide seasonal carousel while adding explicit verification boundaries for dates, access, weather, prices and operating conditions. Transportation retains the interactive estimator and clearly separates a planning duration from a confirmed operator quote.

Every target has one H1, one direct answer, five decision rows, six matching visible and structured FAQs and at least one five-item `ItemList`. Explore also carries a gold Trip Builder action and white secondary regions action. Eight high-authority same-language source pages—the homepage, About, Mission, Contact, Recommendations, Trip Builder, Ecuador Travel Guide and Blog—now link contextually to all three routes, providing at least eight same-language inlink sources per target with descriptive attribution labels.

The pages use only Global plus their assigned shared cluster: Explore uses Discovery `20261003d63`, Spotlights uses Editorial `20261003j63`, and Transportation uses Planning `20261003p63`. The former Explore page stylesheet and the duplicated bilingual Spotlights and Transportation inline style systems have been migrated into page-scoped variants inside those bundles. There are no authored inline style blocks or style attributes on the six pages. Primary actions use approved gold, secondary actions use white and blue, and Transportation status states now use only the approved navy, blue and gold family.

Runtime and centralized configuration advance together to `20261003ai`, with five localized WhatsApp prompts configured for every target route. Local browser QA at 1280 × 900 desktop and 390 × 844 mobile confirms one answer, five decision rows, six FAQs, the assigned cluster, approved gold primary actions, no broken images, no page-level overflow and no JavaScript errors. The six affiliate cards render evenly; both carousels advance; and both estimators populate seven locations and return the expected two-hour airport-to-Mindo planning result. Sitemap dates are current for the six targets and the sixteen contextual source pages.

This batch brings the completed deep-authority program to 82 bilingual pairs / 164 pages out of 216 canonical sitemap URLs, leaving 52 pages for page-level upgrades (75.9% complete). Production remains unchanged and staging stays non-indexable until post-deployment browser QA and the final Screaming Frog crawl are complete.

Post-deployment browser QA passed on all six pages at 1280 × 900 desktop and 390 × 844 mobile widths. Every route returns HTTP 200 with `noindex,nofollow,noarchive,nosnippet`, one H1, one direct answer, five decision rows, six visible FAQs, five route-specific WhatsApp actions, approved gold `rgb(242, 180, 65)` primary actions, no broken images, no page-level overflow and no browser errors. GTM remains disabled outside analytics debug mode. Both carousels advance and both transportation estimators populate seven locations and return the expected two-hour airport-to-Mindo planning result. The immutable deployment is `https://f1975c3a.experienceecuador-staging.pages.dev` from content commit `1cbbeb4`; the custom staging domain serves the same release.

### Batch 64: flagship Mindo and Chocó Andino recommendation profiles

Completed for staging on 2026-10-04:

- `/recommendations/members/andes/mindo/mindo-bird-watching/` and `/es/recomendados/miembros/andes/mindo/mindo-bird-watching/`
- `/recommendations/members/andes/choco-andino/the-cloud-forest-retreat/` and `/es/recomendados/miembros/andes/choco-andino/the-cloud-forest-retreat/`
- `/recommendations/members/andes/mindo/roca-mia/` and `/es/recomendados/miembros/andes/mindo/roca-mia/`

This batch upgrades two Tier 1 specialist funnels and the remaining member profile with the strongest supplied GSC opportunity. Mindo Bird Watching and The Cloud Forest Retreat connect national research to qualified cloud-forest expertise and accommodation planning. Roca Mía records 34 English and 31 Spanish impressions in the supplied 16-month export, with average positions 3.74 and 4.94, so the existing URL and intent were preserved while its answer and conversion layers were strengthened.

Every page now has one direct answer, a five-row decision table, six matching visible and structured FAQs and a five-item `ItemList`. The decision content distinguishes verified profile context from details that only the responsible specialist or property can confirm, including the assigned guide or accommodation, access, current conditions, inclusions, price, availability, payment and cancellation. Wildlife sightings are explicitly not guaranteed. Unverified `Offer` availability markup was removed from the Mindo Bird Watching and Cloud Forest Retreat profiles.

The former member-only stylesheet is now migrated into a page-scoped Recommendations variant. All six pages use only Global plus Recommendations `20261004r64`, with approved navy and blue surfaces, gold `#f2b441` primary actions and white-blue secondary actions. There are no authored inline styles or legacy member stylesheet links. Existing carousels, maps, contact paths and referral attribution are retained.

Eight high-authority same-language gateway pages now link contextually to all three profiles: the homepage, About, Mission, Contact, Recommendations, Trip Builder, Ecuador Travel Guide and Blog. Repository-wide counts are at least 13 inbound sources for each Mindo Bird Watching language page, 12 for each Cloud Forest Retreat page and eight for each Roca Mía page. Every new link carries a descriptive analytics label.

The centralized injected configuration supplies five localized WhatsApp prompts for all six routes. Config and Recommendations advance to `20261004r64`; `site.js` and `header.js` load the configuration with key `20261004aj`. Sitemap dates are current for the six profiles and all sixteen contextual source pages.

Local validation confirms one H1, one direct answer, five decision rows, six visible and structured FAQs, at least five structured list items, valid JSON-LD, valid JavaScript and CSS, 216 canonical sitemap URLs, no empty analytics labels, no broken images, no page-level overflow and no browser errors. Desktop and mobile browser checks at 1280 × 900 and 390 × 844 confirm five route-specific WhatsApp actions, working carousels, the assigned Recommendations cluster and approved gold primary actions. This batch brings the completed deep-authority program to 85 bilingual pairs / 170 pages out of 216 canonical sitemap URLs, leaving 46 pages for page-level upgrades (78.7% complete). Production remains unchanged and staging stays non-indexable until the final Screaming Frog crawl and release approval.
