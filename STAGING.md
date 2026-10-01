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
