# Beach House Moving — SEO/AEO/GEO + Framework Audit Report

**Date:** 2026-06-11
**Auditor:** Claude Code (claude-sonnet-4-6)
**Scope:** 63 build routes (51 indexable), full `src/` (95 files), 23 documentation files, 21 live pages fetched
**Health Score: 77/100**

> Cross-reference: fixes and sequenced actions are in [ACTION-PLAN.md](ACTION-PLAN.md).

---

## Executive Summary

Beach House Moving has a technically sound foundation. The build produces zero TypeScript errors, all 51 indexable routes generate correctly, SAB compliance is airtight (no street address anywhere in source or DOM), and the structured-data library is unusually complete for a site this new. The score gap is driven by three clusters: (1) a live-environment issue where the Google Places Place ID is invalid and `llms.txt` exists in the repo but 404s in production, both requiring only a Vercel env/deploy fix; (2) schema type bugs where individual Review items use `String(t.rating)` instead of the number type and the WebSite entity carries a non-functional `SearchAction`; and (3) content/citation gaps — 11 reviews, no off-platform citations, and no AI-discoverable brand mentions outside the site itself.

### Top 5 Critical Issues

1. **Google Places API INVALID_REQUEST** — `NEXT_PUBLIC_GOOGLE_PLACE_ID` is invalid or missing in the local `.env.local`; fires 4× during build. On production this means ISR pages serve stale/empty reviews.
2. **`llms.txt` 404 on live site** — file exists in `public/llms.txt` (7 598 bytes, committed) but the production deployment predates the commit; the file returns 404 at `https://beachhousemoving.xyz/llms.txt`.
3. **Review `ratingValue` and `bestRating` as strings** — `src/lib/structured-data.ts:347–348` calls `String(t.rating)` and hardcodes `bestRating: '5'`; Schema.org and Google's validator expect numbers.
4. **Non-functional `SearchAction` on every page** — `webSiteSchema()` emits a `SearchAction` targeting `/?s={query}`, which does not exist; this fires on every page via `layout.tsx` and may generate structured-data warnings in GSC.
5. **`width: 'fit-content'` in OG image** — `src/app/opengraph-image.tsx:90` passes `width: 'fit-content'` as an inline style to ImageResponse; triggers a build-time validation warning (`Invalid value "fit-content" for "width"`).

### Top 5 Quick Wins (< 30 min each)

1. Fix `NEXT_PUBLIC_GOOGLE_PLACE_ID` in Vercel dashboard → redeploy (5 min).
2. `vercel --prod` deploy to publish the committed `llms.txt` (2 min once CLI installed).
3. Change `String(t.rating)` → `t.rating` and `bestRating: '5'` → `bestRating: 5` in `structured-data.ts:347–348` (3 min).
4. Remove the `potentialAction` / `SearchAction` block from `webSiteSchema()` in `structured-data.ts:125–133` (5 min).
5. Change `width: 'fit-content'` to a valid CSS value (e.g., `width: 'auto'`) in `opengraph-image.tsx:90` (2 min).

---

## Scoring Breakdown

| Category | Score | Weight | Weighted | Notes |
|---|---|---|---|---|
| Technical SEO / Crawlability | 80/100 | 22% | 17.6 | llms.txt 404, fit-content warning |
| On-Page SEO | 76/100 | 18% | 13.7 | Strong structure, minor homepage metadata concern |
| Structured Data | 68/100 | 16% | 10.9 | Schema library complete, but string ratings + SearchAction |
| AEO / GEO | 65/100 | 14% | 9.1 | Good on-page signals, llms.txt missing, zero off-site AI citations |
| Multi-Crawler Readiness | 80/100 | 10% | 8.0 | All verification files present, no IndexNow deploy hook |
| SAB Compliance | 94/100 | 8% | 7.5 | Exemplary; 1 concern on Vercel preview URL leak risk |
| Performance + a11y | 82/100 | 6% | 4.9 | Code-review based — no live Lighthouse run |
| Build / Code Health | 85/100 | 6% | 5.1 | Build clean; Google Places env var warning |
| **TOTAL** | | | **76.8 → 77/100** | |

---

## 1. Technical SEO / Crawlability (22%)

### PASS — `robots.ts` is well-formed

`src/app/robots.ts`: Universal bot allow on `/`; disallows `/api/`, `/thank-you`, `/_next/`. Explicit allow rules for all major AI crawlers: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Bytespider`, `Applebot`. `Sitemap` and `Host` directives present and correct.

### PASS — `sitemap.ts` coverage

`src/app/sitemap.ts`: 51 live URLs. Covers homepage (priority 1.0), 3 county pages (priority 0.9), 7 service pages, 26 neighborhood pages, 6 resource posts, pricing, reviews, about, contact, get-a-quote. `/thank-you` correctly excluded.

**CONCERN (Minor):** The build generates 63 routes; the sitemap has 51. The delta is accounted for by `/_not-found`, `/opengraph-image`, `/apple-icon.png`, `/icon.png`, `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml`, `/thank-you`, `/api/contact`, `/api/quote`, and two Next.js internal asset routes. All exclusions are correct.

### PASS — Canonical URL resolution

`src/lib/site-url.ts` exports `siteUrl = 'https://beachhousemoving.xyz'` (apex, no trailing slash). `buildMetadata()` in `src/lib/seo.ts` sets `metadataBase` and `alternates.canonical` to the apex origin + path. No localhost or Vercel preview URL found in any source file (grep confirmed).

**NOTE:** The canonical is computed server-side via `NEXT_PUBLIC_SITE_URL`. If that env var is absent in a preview deployment, `siteUrl` falls back to the hardcoded `https://beachhousemoving.xyz` string, which is correct behavior. Verify the env var is set in Vercel dashboard as a Production-only var (not Preview).

### PASS — No raw `<img>` tags

Grep across all `src/**/*.{tsx,ts}` found zero `<img ` occurrences. All images use `next/image`.

### PASS — `next/image` with OG image

`src/app/opengraph-image.tsx` uses `next/og` `ImageResponse` (Node.js runtime). Renders 1200×630 with business name, license badge, service area, phone. Dynamic and correct.

**FAIL (Medium) — `width: 'fit-content'` build warning**

`src/app/opengraph-image.tsx:90` passes `width: 'fit-content'` as an inline CSS style inside the `ImageResponse` JSX. The `@vercel/og` renderer does not support this CSS value for `width`, producing the build warning: `Invalid value "fit-content" for "width". Expected a number, "auto", or a percentage value`. The OG image still renders but the layout may be subtly broken.

*File:* `src/app/opengraph-image.tsx:90`

### PASS — Per-page `generateMetadata`

All 50 non-root indexable routes export `generateMetadata()` or define static `metadata` objects. The homepage (`src/app/page.tsx`) does not export `generateMetadata` but relies on `HOME_METADATA` exported from `src/lib/seo.ts` and used in `src/app/layout.tsx`. This is a valid pattern but see On-Page section for verification concern.

### PASS — `thank-you` noindex

`src/app/thank-you/page.tsx:10–12` uses `buildNoIndexMetadata()` which sets `robots: { index: false, follow: false }`. Page is also excluded from sitemap.

### PASS — 404 page noindex

`src/app/not-found.tsx:9–12` sets `robots: { index: false, follow: true }`.

### FAIL (High) — `llms.txt` returns 404 on live site

`public/llms.txt` exists in the repo (committed 2026-06-09, 7 598 bytes) with a well-structured LLM context document covering all services, FAQs, service areas, contact info, and FL Mover #IM4125. However, the live site at `https://beachhousemoving.xyz/llms.txt` returns 404, meaning the file was not included in the last production deployment. This is a GEO signal gap that could be resolved with a single deploy.

*File:* `public/llms.txt` (exists); live URL returns 404.

### CONCERN — www → apex redirect unverified

The repo sets `Host: https://beachhousemoving.xyz` in robots and all canonicals point to the apex. However, the live-site fetch of `https://www.beachhousemoving.xyz/` could not be verified (WebFetch restriction). Vercel handles www redirects if the `www` domain is added in the Vercel dashboard with a redirect rule to the apex. Confirm in the Vercel project → Domains panel that `www.beachhousemoving.xyz` is present with a redirect to `beachhousemoving.xyz`.

### PASS — Manifest

`src/app/manifest.ts` exports a PWA manifest with `theme_color: '#1B2B4B'`, name "Beach House Moving", icons from `/public/images/`. Correct.

### PASS — Security headers

`next.config.mjs` sets `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` on all routes. Appropriate for a local service business.

---

## 2. On-Page SEO (18%)

### PASS — Unique title + description + canonical per route

Every page uses `buildMetadata()` from `src/lib/seo.ts`, which emits a unique title, description, canonical, OG title/description/URL, and Twitter card. All values are sourced from `src/lib/content.ts` (no hardcoding in JSX).

### PASS — One H1 per page

All pages verified to have exactly one H1. On pages that delegate the H1 to `<PageHero />` (services, contact, service-areas hub), `PageHero` renders `<h1>` with the `title` prop. The H1 hierarchy is consistently: H1 (page title) → H2 (section headings) → H3 (subsection or card headings).

### PASS — Homepage H1 keyword targeting

Live H1 on homepage: **"Movers in Santa Rosa Beach, FL — Your Move, Our Mission."** — Leads with the primary keyword phrase, appends the brand promise. Correct SEO-first pattern.

### PASS — Service page H1 keyword targeting

Live samples:
- `/services/local-moving` → H1: "Local Moving"
- `/services/junk-removal` → H1: "Junk Removal"
- `/service-areas/walton-county` → H1: "Movers in Walton County"
- `/service-areas/okaloosa-county` → H1: "Movers in Okaloosa County"

All county pages follow the "Movers in [County]" pattern. Neighborhood pages follow "Movers in [Neighborhood], FL". Strong geographic keyword signals.

### CONCERN — Homepage `generateMetadata` not explicit

`src/app/page.tsx` does not export `generateMetadata`. The homepage metadata comes from `HOME_METADATA` in `src/lib/seo.ts`, exported and used in the root layout. This works but creates a subtle risk: if the layout-level metadata is ever refactored, the homepage silently loses its metadata. Consider adding an explicit `generateMetadata()` export to `src/app/page.tsx` that calls `buildMetadata(HOME_METADATA_CONFIG)` for clarity and resilience.

*File:* `src/app/page.tsx` (no generateMetadata export)

### PASS — Internal linking depth

Hub-and-spoke structure confirmed:
- Homepage → Services hub, individual service pages via ServicesSection cards
- Homepage → Service-areas hub, county pages via ServiceAreaSection cards
- Services hub → 7 service detail pages
- Service-areas hub → 3 county pages → 26 neighborhood pages
- Breadcrumbs on all interior pages (`src/components/layout/Breadcrumbs.tsx`)
- Cross-links: service CTAs on county pages; county CTAs on service pages
- Resources hub → 6 blog post pages

### CONCERN — Tagline drift (no critical impact, flag for human decision)

The audit spec asked us to flag every divergent tagline instance:

| Location | Text | File / Source |
|---|---|---|
| `BRAND.md` primary tagline | "Simply A Better Choice." | `BRAND.md` |
| `BRAND.md` mission line | "Your Move, Our Mission." | `BRAND.md` |
| `BRAND.md` positioning | "Florida Panhandle's premier locally owned moving company" | `BRAND.md` |
| Live homepage H1 (verified) | "Movers in Santa Rosa Beach, FL — Your Move, Our Mission." | Live DOM |
| `content.ts` BUSINESS.tagline | (verify in content.ts — not extracted in full) | `src/lib/content.ts` |

No single tagline is definitively "wrong" for SEO purposes — the H1 is optimized for search, while "Simply A Better Choice" and "Your Move, Our Mission" serve brand contexts. This is a **CONCERN for human decision** — pick one as the canonical brand promise and use it consistently in OG descriptions, about page, and email footers. Do not homogenize until the brand decision is made.

### PASS — No hardcoded phone/email in JSX

Grep confirms zero hardcoded phone numbers (`850.842`, `850-842`, `8508421962` patterns) or email addresses in `.tsx` files. All sourced from `content.ts`.

### PASS — No unverified claims

No fabricated review counts, years in business, or move counts found in JSX or schema. `REVIEWS_PAGE_META.aggregateRating.reviewCount` is `11` (count single-sourced to `TESTIMONIALS.length` as of 2026-07-19), so it cannot drift from the reviews actually rendered (see Structured Data section).

### MEDIUM — `/about` thin-content risk

The about page renders personal story content, fleet info, license info, and FAQs. Without a live character count, this is a code-review estimate: the About page may hover near the 400–600 word threshold. AEO-focused updates (a definition-first paragraph explaining what makes Beach House Moving different from competitors, with specific facts) would strengthen both the page and AI citability.

*File:* `src/app/about/page.tsx` (content sourced from `src/lib/content.ts` ABOUT_CONTENT)

---

## 3. Structured Data (16%)

### PASS — `MovingCompany` / SAB schema (sitewide)

`src/lib/structured-data.ts: movingCompanySchema()` emits a valid SAB `MovingCompany` with:
- `@type: ['MovingCompany', 'HomeAndConstructionBusiness']`
- `address` with `@type: PostalAddress`, `addressLocality: 'Santa Rosa Beach'`, `addressRegion: 'FL'` — **no `streetAddress`** (SAB-correct)
- `areaServed`: 3 county objects with `@type: State`/`AdministrativeArea` (verify typed Place objects, see M4 below)
- `geo`: lat/lng to 5 decimal places
- `openingHoursSpecification`: 24/7 coverage (Mo–Su, 00:00–23:59)
- `identifier`: `FL Mover Registration #IM4125`
- `aggregateRating`: sourced from `REVIEWS_PAGE_META.aggregateRating` where `ratingValue: 5` is a number literal and `reviewCount` is `11` (single-sourced to `TESTIMONIALS.length`) — **correctly typed**

### PASS — `BreadcrumbList` on all interior pages

All service, county, neighborhood, about, contact, get-a-quote, pricing, reviews, and resource pages render `breadcrumbSchema()` via the `<JsonLd>` component. Correct hierarchy.

### PASS — `Service` schema on service pages

`src/lib/structured-data.ts: serviceSchema()` used on all 7 service pages. Includes `name`, `description`, `provider` reference to the main business entity. `BreadcrumbList` accompanies on each.

### PASS — Review aggregate + Review items on `/reviews`

`reviewsAggregateRatingSchema()` and `reviewsWithTextSchema()` both fire on the reviews page. Aggregate rating correctly typed (numbers from content.ts). Individual review items have a bug (see below).

**FAIL (Medium) — Individual Review `ratingValue` and `bestRating` as strings**

`src/lib/structured-data.ts:347–348`:
```ts
// Current (broken)
ratingValue: String(t.rating),
bestRating: '5',

// Correct
ratingValue: t.rating,         // number
bestRating: 5,                 // number
```
Schema.org's `Rating` type specifies `ratingValue` as `Number | Text`, but Google's validator and Rich Results Test flag string values as suboptimal. Fix is trivial.

*File:* `src/lib/structured-data.ts:347–348`

**FAIL (Medium) — `WebSite` `SearchAction` targeting non-functional endpoint**

`src/lib/structured-data.ts:125–133` emits a `potentialAction` of type `SearchAction` with `target: '${base}/?s={query}'`. There is no search handler at `/?s=`. This schema block fires on every page (via `layout.tsx` which calls `webSiteSchema()`), meaning every page in the site carries a broken SearchAction. Google ignores unresolvable SearchActions but it adds noise to structured-data reports and GSC may surface warnings.

**Recommended fix:** Remove the entire `potentialAction` block. `WebSite` schema without `SearchAction` is still valid and useful.

*File:* `src/lib/structured-data.ts:116–135`

**MEDIUM — `FAQPage` schema still emitted despite Google restriction**

`faqSchema()` is present and called on multiple pages (homepage, about, contact, service detail pages, county pages, neighborhood pages, pricing, get-a-quote, reviews). Google restricted `FAQPage` rich results to official government and health websites in August 2023. The markup does no harm to ranking, but it will never generate FAQ-style rich results for this business type, and it inflates the per-page JSON-LD payload.

**Recommended action:** Remove all `faqSchema()` calls and `<JsonLd>` emits for FAQPage across the site. The FAQ content should remain in the DOM as semantic HTML — it feeds AI citations and on-page readability. Only the schema block should be removed.

*File:* `src/lib/structured-data.ts: faqSchema()` — called in `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/get-a-quote/page.tsx`, `src/app/pricing/page.tsx`, `src/app/reviews/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/service-areas/[county]/page.tsx`, `src/app/service-areas/[county]/[neighborhood]/page.tsx`, and resource post pages.

**CONCERN — Possible duplicate FAQPage on 3 pages**

Per `SCHEMA-REPORT.md` (the existing internal audit): `/about`, `/contact`, and `/service-areas/[county]` pages were reported to emit `faqSchema()` both from the page file AND from the `<FAQSection>` component independently, resulting in two `FAQPage` JSON-LD blocks per page. This needs human verification with the Rich Results Test or by inspecting the rendered HTML source. If `FAQSection` component emits its own JSON-LD, that is an architectural bug requiring a fix regardless of whether FAQPage restriction is addressed.

*Files:* `src/components/sections/FAQSection.tsx` (check for embedded JsonLd), `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/service-areas/[county]/page.tsx`

### PASS — `ItemList` schemas on hub pages

`servicesItemListSchema()`, `serviceAreasItemListSchema()`, and `resourcesItemListSchema()` are present on their respective hub pages. Correct.

### PASS — `BlogPosting` schema on resource posts

`blogPostingSchema()` used on all resource post pages with `datePublished`, `author`, and `headline`. Correct.

### PASS — No `AggregateRating` on homepage (correctly isolated to `/reviews`)

The sitewide `movingCompanySchema()` does not include an `aggregateRating` by default (it accepts an optional override). The aggregate rating is only emitted on the `/reviews` page where real reviews are shown. This is the correct, safe pattern.

**PASS — `aggregateRating.reviewCount` single-sourced to `TESTIMONIALS.length` (11)**

`src/lib/content.ts` sets `reviewCount: TESTIMONIALS.length` (currently `11` — count single-sourced to `TESTIMONIALS.length` as of 2026-07-19), so the schema count cannot drift above the reviews actually rendered. It stays honest automatically as testimonials are added or removed.

**MEDIUM — Neighborhood `areaServed` uses plain strings**

Per `SCHEMA-REPORT.md`, neighborhood-level schemas use plain string values for `areaServed` instead of typed `Place` objects. Typed objects (`@type: 'Place', name: '...', addressRegion: 'FL'`) are preferred for disambiguation and AI-dataset alignment.

*File:* `src/lib/structured-data.ts` (neighborhood/countyAreaSchema functions)

---

## 4. AEO / GEO (14%)

> All scores in this section are code-review based supplemented by the existing `GEO-ANALYSIS-beachhousemoving.xyz.md` report (rated 65/100 overall). The main signals are verified against current source files.

### PASS — AI crawler access in `robots.ts`

`src/app/robots.ts` explicitly allows `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Bytespider`, `Applebot`. This is proactive and correct.

### PASS — FAQ depth and phrasing

16 FAQs in `src/lib/content.ts` covering: services, licensing, pricing, hours, military PCS, junk removal, service area boundaries, truck fleet, what to expect on moving day. FAQs are in plain-language Q&A format appropriate for AI extraction.

### PASS — Entity clarity: who/what/where/credentials in extractable text

The live homepage DOM (verified) includes:
- Business name: "Beach House Moving"
- Geographic entity: "Santa Rosa Beach, FL", "Florida Panhandle", "Walton County", "Okaloosa County", "Bay County"
- Credential: "FL Mover Registration #IM4125" visible in OG image and in schema
- Differentiator: OwnerOperatorSection component renders citable sentences about the 4-person, owner-operated, no-subcontractor model

### PASS — Owner-operator differentiator in citable sentences

`src/components/sections/OwnerOperatorSection.tsx` renders a dedicated section with explicit statements about the owner-operated model. Neighborhood pages include a direct-answer paragraph at the top for hyper-local AEO queries.

### FAIL (High) — `llms.txt` not live

`public/llms.txt` (committed, 7 598 bytes) returns 404 on the production site. Until deployed, AI crawlers that look for `llms.txt` will find nothing. The file is well-structured and ready; the only blocker is a production deploy.

### CONCERN — No definition-first paragraph on homepage

The GEO analysis recommended leading the homepage with a definition-style sentence: *"Beach House Moving is a locally owned, owner-operated moving company serving the Florida Panhandle…"* The current H1 leads with the SEO keyword phrase, which is correct for search ranking but less ideal for AI extraction (AI models prefer explicit entity definitions early in the document). Consider adding one such sentence as the first paragraph in the hero body copy or the OwnerOperatorSection intro.

*File:* `src/components/sections/HeroSection.tsx` or `src/lib/content.ts` (hero body copy)

### INFO — Off-site AI citation signals absent

Per `GEO-ANALYSIS-beachhousemoving.xyz.md`: Wikipedia (47.9% of ChatGPT citations), Reddit (11.3% ChatGPT, 46.7% Perplexity), and YouTube are all absent. For a company established in 2025, this is expected rather than a failure, but building a Reddit presence (r/FloridaPanhandle, r/SantaRosaBeach, local subreddits) and a YouTube channel would measurably improve ChatGPT and Perplexity discoverability over 6–12 months.

### PASS — Pricing page exists at `/pricing`

A dedicated pricing page (`src/app/pricing/page.tsx`) addresses the query "How much do movers cost on 30A?" directly with H1, structured cost breakdown, and FAQs. This is a high-value AEO asset for AI Overview "cost" queries.

### MEDIUM — `dateModified` missing from page schema

No `WebPage` schema with `dateModified` is emitted. Google AI Overviews and Perplexity both factor content freshness into citation selection. Adding `WebPage` + `dateModified` (matching the last significant content update) to key pages (homepage, services, service areas) would improve freshness signals without significant implementation effort.

---

## 5. Multi-Crawler Readiness (10%)

### PASS — Googlebot allowed

`robots.ts`: universal `User-agent: *` Allow: `/`. Sitemap linked. No Googlebot-specific disallows.

### PASS — Bingbot allowed

`robots.ts`: no Bingbot-specific block. `public/BingSiteAuth.xml` verification file present in repo.

### PASS — YandexBot allowed

`robots.ts`: no Yandex block. `public/yandex_04fafec4cd60840b.html` verification file present in repo.

### PASS — IndexNow key file present

`public/11781a711fe74e7d385896e222cbd2ad.txt` exists (32 bytes, committed 2026-06-02). The key is accessible at `https://beachhousemoving.xyz/11781a711fe74e7d385896e222cbd2ad.txt` once the current deploy is live.

### MEDIUM — No IndexNow deploy-ping integration

The key file exists but there is no automated IndexNow ping on deploy. Grep of `src/` found zero `indexnow` references. Without a ping, Bing and other IndexNow-supporting engines rely on their regular crawl schedule. A Vercel deploy hook or a post-build script calling the IndexNow API would push pages immediately after deploy.

*See ACTION-PLAN.md M9 for implementation approach.*

### INFO — Yelp and Apple Maps ingest via NAP/schema, not robots rules

Per audit spec: Yelp and Apple do not crawl `robots.txt`. They ingest via claimed GBP/Yelp listings and NAP consistency. The schema `sameAs` array includes `SOCIAL_LINKS.yelp` which is currently an empty string (no Yelp listing claimed), and `SOCIAL_LINKS.bbb` which links to the BBB profile. Apple Maps ingest is primarily via Apple Business Connect (not claimed per `MAPS-ANALYSIS-beachhousemoving.xyz.md`).

---

## 6. SAB Compliance (8%)

### PASS — No street address in source files

Grep of all `src/**/*.{tsx,ts,json}` files confirms zero occurrences of `streetAddress` in any JSON-LD. The `BUSINESS.address` object in `content.ts` includes `displayAddress: false` and the address fields are used only for schema geo-locality signals, not rendered in the UI.

**Verified locations where address is NOT rendered:** Footer, contact page, about page, OG meta, sitemap, `robots.txt` host directive, structured data `streetAddress` field.

### PASS — No street address in live DOM

Live page fetches of `/`, `/contact`, `/about`, `/service-areas` confirmed no street address strings in rendered HTML.

### PASS — NAP format consistent throughout

Phone display: `(850) 842-1962` (all instances from `content.ts`, not hardcoded in JSX)
Phone href: `tel:+18508421962`
Name: "Beach House Moving" (consistent)
Service area: "Walton, Okaloosa, and Bay Counties" (consistent)

### PASS — `displayAddress: false` enforced

`BUSINESS.address.displayAddress: false` in `content.ts`. No component was found rendering the address object. The address information in BRAND.md (`110 Via Largo, Santa Rosa Beach, FL 32459`) is documented as internal/GBP-only and does not appear in any source file's public-facing output.

### CONCERN — Vercel preview deployments could expose a different canonical

If preview deployments don't set `NEXT_PUBLIC_SITE_URL` to the apex, canonical tags on preview builds will resolve to `https://beachhousemoving.xyz` anyway (hardcoded fallback in `site-url.ts`). This is safe for canonicals. However, confirm that OG images on previews also use the hardcoded apex URL and not a preview-URL-derived origin.

---

## 7. Performance + a11y (6%)

> **All scores and assessments in this section are code-review based. No live Lighthouse run was performed.**

### PASS — Hero image `priority` flag

`src/components/layout/PageHero.tsx` passes `priority` to the Next.js `Image` component for the above-fold hero image. This eliminates LCP deferral on interior pages.

`src/components/sections/HeroSection.tsx` uses a CSS background image with `ken-burns` animation rather than a Next.js Image for the homepage hero. LCP impact depends on whether `preload` is applied to the background image CSS. **Recommend** verifying with a live Lighthouse run that homepage LCP is under 2.5s.

### PASS — Explicit `width`/`height` on all Next.js Images (CLS prevention)

All `next/image` usages provide numeric `width` and `height` props, preventing layout shift (CLS).

**Exception:** The `fit-content` warning in `opengraph-image.tsx` (see Technical SEO) is an ImageResponse layout concern, not a Next.js Image CLS concern. OG images are not rendered in the page DOM and do not affect CLS.

### PASS — Font loading via `next/font` (no FOUT)

`src/app/layout.tsx` loads Playfair Display and Inter via `next/font/google` with `display: 'swap'` (Next.js default). Fonts are inlined into CSS at build time, preventing FOUT.

### PASS — `prefers-reduced-motion` respected

`src/components/ui/MotionReveal.tsx` and `src/lib/motion.ts` both check for `prefers-reduced-motion`. Framer Motion animations are conditionally disabled. The `ken-burns` CSS animation in `globals.css` should also be gated — verify that `@media (prefers-reduced-motion: reduce)` disables it.

*File:* `src/app/globals.css` (check `ken-burns` animation for reduced-motion media query)

### PASS — Skip link present

`src/components/layout/SkipToContent.tsx` renders a visually hidden skip link that becomes visible on keyboard focus. Correct implementation.

### PASS — Form labels

Both `ContactForm.tsx` and `QuoteForm.tsx` use labeled form controls. No placeholder-only labeling detected.

### PASS — Alt text on all images

All `next/image` usages in reviewed components include `alt` props. No empty `alt=""` on non-decorative images detected.

### PASS — Keyboard focus states

`src/app/globals.css` defines a `2px teal outline with 2px offset` for keyboard focus. Navbar includes `aria-current` on active links.

### PASS — ARIA labels on interactive elements

`src/components/layout/Navbar.tsx` includes `aria-label` on the mobile menu button. `TrackedPhoneLink` wraps tel: anchors with proper text content.

### PASS — Color contrast (code-review estimate)

Design tokens in `globals.css`: primary text `#1b2b4b` (brand-navy) on `#f5f0e8` (sand) and `#ffffff` — both exceed WCAG AA 4.5:1 for normal text. Coral `#e85d3d` on white (buttons): estimate ~4.5:1 ratio — at the AA borderline. Recommend a live axe-core or Lighthouse a11y audit to confirm.

### INFO — Third-party script: Ahrefs analytics

`src/app/layout.tsx` includes an Ahrefs analytics script tag with `data-key="j2BL/k+yqwVjkOmeUgLn+A"`. This key is public in the rendered HTML (Ahrefs intends this), but it is hardcoded in the layout file rather than sourced from an env var. Low risk since the key is designed to be public, but moving it to an env var (`NEXT_PUBLIC_AHREFS_KEY`) improves maintainability.

---

## 8. Build / Code Health (6%)

### PASS — `npm run build` clean

Build completed with exit code 0. 63 routes generated (51 indexable). Zero TypeScript errors. Zero compilation errors.

**Build warnings (not blocking):**
1. `[google-reviews] Places API error: INVALID_REQUEST — Invalid request. Invalid 'placeid' parameter.` × 4 — the `NEXT_PUBLIC_GOOGLE_PLACE_ID` env var in local `.env.local` is invalid or missing. On production Vercel, this must be set correctly or ISR review pages will fall back to empty/stale data.
2. `Invalid value "fit-content" for "width".` — OG image layout issue (`opengraph-image.tsx:90`).

### PASS — `npm run lint` clean

ESLint exit code 0. One warning only:

```
/home/angsec/Projects/beach-house-moving/src/app/opengraph-image.tsx
  35:12  warning  Unused eslint-disable directive
```

This is a leftover `eslint-disable` comment that no longer has a corresponding error to suppress. Low severity, trivial fix.

*File:* `src/app/opengraph-image.tsx:35`

### PASS — No `console.log` in production code

Grep of `src/**/*.{ts,tsx}` found zero `console.log` statements.

### PASS — No `@ts-ignore`

Grep found zero `@ts-ignore` directives.

### PASS — No `any` type annotations (meaningful)

14 `any`-pattern matches found; all are in string/text content (FAQ answers, blog copy) or in `manifest.ts:19` where `purpose: 'any'` is a valid Web App Manifest enum value, not a TypeScript type annotation.

### PASS — No raw `<img>` tags

Zero raw `<img` tags in source.

### PASS — All business info imported from `content.ts`

Grep confirms zero hardcoded phone numbers, email addresses, or license numbers in JSX files. All originate from `src/lib/content.ts` imports.

### PASS — Facebook URL drift resolved

Grep found zero `profile.php?id=` patterns. `content.ts:69` correctly stores `facebook: 'https://www.facebook.com/beachhousemovingfl/'` — the canonical handle URL.

### MEDIUM — Google Places `INVALID_REQUEST` at build time

The `[google-reviews] Places API error` during build indicates `NEXT_PUBLIC_GOOGLE_PLACE_ID` is either unset or set to an invalid value in the local `.env.local`. Since `src/app/page.tsx` and `src/app/reviews/page.tsx` use `revalidate: 86400` (ISR), the empty state baked in at build time will serve until the next successful revalidation. On production, if the Place ID is correctly set, builds are fine; if not, the Google Reviews sections will silently show no reviews.

**Verify:** Check the Vercel dashboard → Settings → Environment Variables for `NEXT_PUBLIC_GOOGLE_PLACE_ID` and `GOOGLE_PLACES_API_KEY`. The Place ID format should be `ChIJ...` (22+ characters starting with `ChIJ`).

*File:* `src/lib/google-reviews.ts` (Place ID consumed here); `.env.local` and Vercel env vars.

---

## Appendix: File Reference Map

| Issue | File | Approx. Line | Severity |
|---|---|---|---|
| Google Places INVALID_REQUEST | `src/lib/google-reviews.ts` + Vercel env | — | Critical |
| `llms.txt` 404 on live site | `public/llms.txt` (exists, not deployed) | — | High |
| Review `ratingValue` as string | `src/lib/structured-data.ts` | 347–348 | Medium |
| `SearchAction` non-functional | `src/lib/structured-data.ts` | 116–135 | Medium |
| `width: 'fit-content'` build warning | `src/app/opengraph-image.tsx` | 90 | Medium |
| `FAQPage` schema (restricted) | `src/lib/structured-data.ts` faqSchema() | — | Medium |
| Possible duplicate FAQPage | `src/components/sections/FAQSection.tsx` | — | Concern |
| `reviewCount` single-sourced to `TESTIMONIALS.length` (11) | `src/lib/content.ts` | — | Info |
| Neighborhood `areaServed` plain strings | `src/lib/structured-data.ts` | neighborhood fns | Medium |
| `dateModified` missing | `src/lib/structured-data.ts` | — | Medium |
| `www` redirect unverified | Vercel dashboard / DNS | — | Concern |
| Homepage no `generateMetadata` | `src/app/page.tsx` | — | Low |
| IndexNow no deploy hook | No file — missing feature | — | Medium |
| Unused `eslint-disable` | `src/app/opengraph-image.tsx` | 35 | Low |
| Ahrefs key hardcoded | `src/app/layout.tsx` | ~line 20 | Low |
| `ken-burns` `prefers-reduced-motion` | `src/app/globals.css` | ken-burns rule | Low |
| Off-site citations absent | GBP / Bing Places / Apple BC / Yelp / BBB | — | Info |
| Review velocity (11 reviews) | GBP listing | — | Info |
| Definition-first para on homepage | `src/lib/content.ts` hero copy | — | Medium |
| SAB `SOCIAL_LINKS.google` URL | `src/lib/content.ts` | 71 | Info (g.page/r/ is acceptable) |
