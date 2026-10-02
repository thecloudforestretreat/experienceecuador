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
