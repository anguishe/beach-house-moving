# Beach House Moving — Action Plan

**Generated:** 2026-06-11 | **Full report:** [FULL-AUDIT-REPORT.md](FULL-AUDIT-REPORT.md)
**Health Score:** 77/100 → target 88/100 after all HIGH items resolved

---

## CRITICAL — Fix Immediately

### C1 — Fix Google Places Place ID (broken review fetching)

**File:** Vercel dashboard → Settings → Environment Variables + `src/lib/google-reviews.ts`
**Impact:** Without a valid Place ID, `google-reviews.ts` throws `INVALID_REQUEST` 4× during every build. The homepage and `/reviews` page ISR baking falls back to an empty reviews array, meaning live visitors see no Google reviews. This is the most immediately visible site defect.
**Fix:**
1. Log in to Google Cloud Console → Places API → find your Place ID for "Beach House Moving". The format is `ChIJ...` (22+ chars). You can also retrieve it from the GBP dashboard or by searching `https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder`.
2. In Vercel dashboard: Settings → Environment Variables → set `NEXT_PUBLIC_GOOGLE_PLACE_ID` = `ChIJ...` for **Production** environment.
3. Also verify `GOOGLE_PLACES_API_KEY` is set (server-only, no `NEXT_PUBLIC_` prefix required since it's used server-side).
4. Trigger a new Vercel deployment.

---

## HIGH — Fix This Week

### H1 — Deploy `llms.txt` to production

**File:** `public/llms.txt` (committed, 7 598 bytes)
**Impact:** This file is the primary AI-crawler context document. ChatGPT, Perplexity, ClaudeBot, and Googlebot all check for `llms.txt`. It is fully written and committed but returns 404 because the production deployment predates the last commit. Every day without it is a missed GEO signal.
**Fix:** Run `vercel --prod` from the repo root (or push to `main` if auto-deploy is wired). No code changes needed — the file is already in `public/`.

---

### H2 — Fix `ratingValue` and `bestRating` string types in Review schema

**File:** `src/lib/structured-data.ts:347–348`
**Impact:** Individual Review items in `reviewsWithTextSchema()` pass string values to Schema.org fields that expect numbers. Google's Rich Results Test flags this, reducing schema quality for the `/reviews` page.

Before:
```ts
reviewRating: {
  '@type': 'Rating',
  ratingValue: String(t.rating),   // line 347
  bestRating: '5',                  // line 348
},
```

After:
```ts
reviewRating: {
  '@type': 'Rating',
  ratingValue: t.rating,            // number
  bestRating: 5,                    // number
},
```

*Also verify `worstRating: 1` (number) is present in this block.*

---

### H3 — Remove non-functional `SearchAction` from `webSiteSchema`

**File:** `src/lib/structured-data.ts:116–135`
**Impact:** Every page on the site emits a `WebSite` schema (via `layout.tsx`) with a `SearchAction` targeting `/?s={query}`. This endpoint does not exist; navigating to `/?s=anything` returns the homepage with no search results. GSC may surface a structured-data warning. Google ignores broken SearchActions but they pollute the schema report.

Before (lines 124–131):
```ts
potentialAction: {
  '@type': 'SearchAction',
  target: `${base}/?s={query}`,
  'query-input': 'required name=query',
},
```

After — remove the entire `potentialAction` block:
```ts
export function webSiteSchema(origin: string) {
  const base = origin.replace(/\/$/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BUSINESS.name,
    url: base,
  }
}
```

---

### H4 — Fix `width: 'fit-content'` in OG image component

**File:** `src/app/opengraph-image.tsx:90`
**Impact:** The `@vercel/og` ImageResponse renderer does not support the CSS value `fit-content` for the `width` property. This causes a build-time warning and may cause the right panel of the OG image to render incorrectly (width falls back to 0 or auto). This affects the OG image shown in all link previews (Slack, Twitter/X, Facebook, iMessage, Discord).

Before:
```ts
width: 'fit-content',
```

After (choose one based on desired layout):
```ts
width: 'auto',
// or a fixed pixel value:
width: '45%',
```

*Also fix the unused `eslint-disable` comment on line 35 of the same file (remove it).*

---

### H5 — Verify (and resolve) duplicate FAQPage JSON-LD

**File:** `src/components/sections/FAQSection.tsx` + `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/service-areas/[county]/page.tsx`
**Impact:** Per `SCHEMA-REPORT.md`, these three pages may emit two `FAQPage` JSON-LD blocks: once from the page file calling `faqSchema()` and once from `<FAQSection>` if it independently emits JSON-LD. Duplicate schema of the same type on one page is invalid.
**Fix:**
1. Open `src/components/sections/FAQSection.tsx` and check for any `<script type="application/ld+json">` output or `<JsonLd>` component usage.
2. If `FAQSection` emits JSON-LD: remove it from the component (keep the HTML only); let pages control their own structured data.
3. If `FAQSection` does not emit JSON-LD: this issue was resolved in a prior commit and can be closed.

*See also M1 below — consider removing all FAQPage schema while you are in this file.*

---

## MEDIUM — Fix Within a Month

### M1 — Remove all `FAQPage` JSON-LD blocks

**File:** `src/lib/structured-data.ts` (`faqSchema()` function) + all page files that call it
**Impact:** Google restricted `FAQPage` rich results to government and health sites in August 2023. For a moving company this schema will never generate rich results. It adds ~2–4 KB of JSON per page unnecessarily.
**Fix:** Delete the `faqSchema()` function from `structured-data.ts`. Then remove all `faqSchema(...)` calls and `<JsonLd schema={faqSchema(...)} />` usages from all page files. The FAQ HTML content on each page should remain — it feeds AI citations. Only the JSON-LD emission should be removed.

Pages to update: `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/get-a-quote/page.tsx`, `src/app/pricing/page.tsx`, `src/app/reviews/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/service-areas/[county]/page.tsx`, `src/app/service-areas/[county]/[neighborhood]/page.tsx`, `src/app/resources/[slug]/page.tsx`.

---

### M2 — Keep `reviewCount` in `content.ts` in sync with actual Google reviews

**File:** `src/lib/content.ts:524`
**Impact:** `reviewCount: 8` is a manually maintained number. If it drifts above the actual count, the `aggregateRating` schema on `/reviews` constitutes fabricated data — a Critical violation. Establish a team habit: every time a new Google review is acknowledged, update `reviewCount` in `content.ts` and redeploy.
**Fix (short-term):** Verify the current value of 8 against the live GBP listing. Correct if needed.
**Fix (long-term):** Dynamically pull `userRatingsTotal` from the Google Places API response in `google-reviews.ts` and pass it into the schema via ISR rather than hardcoding.

---

### M3 — Verify `www` → apex redirect in Vercel dashboard

**Impact:** If `www.beachhousemoving.xyz` doesn't redirect to `beachhousemoving.xyz`, any links from social media or directories using the `www` prefix create a split-authority problem (two versions of the site, neither with a canonical redirect).
**Fix:**
1. Log in to Vercel → Project → Domains.
2. Confirm `www.beachhousemoving.xyz` is listed with a "Redirect" configuration pointing to `beachhousemoving.xyz` (permanent 308 or 301).
3. Test with `curl -I https://www.beachhousemoving.xyz/` — expect `301` or `308` to `https://beachhousemoving.xyz/`.

---

### M4 — Type neighborhood `areaServed` as `Place` objects

**File:** `src/lib/structured-data.ts` (neighborhood and county schema functions)
**Impact:** Plain-string `areaServed` values are less semantically rich than typed `Place` objects. Typed objects enable better Google Knowledge Graph disambiguation and improve Bing/Apple Maps entity alignment.

Before:
```ts
areaServed: ['Walton County', 'Okaloosa County', 'Bay County'],
```

After:
```ts
areaServed: [
  { '@type': 'AdministrativeArea', name: 'Walton County', addressRegion: 'FL' },
  { '@type': 'AdministrativeArea', name: 'Okaloosa County', addressRegion: 'FL' },
  { '@type': 'AdministrativeArea', name: 'Bay County', addressRegion: 'FL' },
],
```

---

### M5 — Add `WebPage` + `dateModified` schema to key pages

**File:** `src/lib/structured-data.ts` (add new helper) + `src/app/page.tsx`, service pages, county pages
**Impact:** Google AI Overviews and Perplexity weight content freshness via `dateModified`. Adding a `WebPage` schema with `dateModified` matching the last meaningful content update improves ranking in AI-generated summaries for time-sensitive queries ("best movers near me 2025").

```ts
export function webPageSchema(
  url: string,
  name: string,
  dateModified: string,   // ISO 8601: '2026-06-11'
  description: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name,
    dateModified,
    description,
    isPartOf: { '@type': 'WebSite', url: siteUrl },
  }
}
```

---

### M6 — Wire IndexNow deploy ping

**File:** New — `scripts/ping-indexnow.mjs` (or Vercel deploy hook)
**Impact:** Without an IndexNow ping, Bing (and Yandex) rely on their crawl schedule — days to weeks. With a ping, pages are submitted to Bing's index within minutes of each deployment.
**Fix:** Add a post-build script that calls the IndexNow API with the key `11781a711fe74e7d385896e222cbd2ad` and a list of updated URLs. The simplest integration is a Vercel deploy hook (Settings → Hooks → Add Deploy Hook) that calls the IndexNow endpoint:

```
https://api.indexnow.org/indexnow?url=https://beachhousemoving.xyz/sitemap.xml&key=11781a711fe74e7d385896e222cbd2ad
```

Or add to `package.json` `"postbuild"` script:
```json
"postbuild": "node scripts/ping-indexnow.mjs"
```

---

### M7 — Add definition-first paragraph to homepage for AEO

**File:** `src/lib/content.ts` (hero body copy) → rendered by `src/components/sections/HeroSection.tsx`
**Impact:** AI models (ChatGPT, Perplexity, Google AI Overviews) extract entity definitions from early-page content. Adding one sentence like: *"Beach House Moving is a locally owned, owner-operated moving company serving the Florida Panhandle — Walton, Okaloosa, and Bay Counties — with a licensed 3-truck fleet and no subcontractors."* as the first visible paragraph after the H1 gives AI crawlers an explicit citable definition.

---

### M8 — Add `NEXT_PUBLIC_AHREFS_KEY` env var for Ahrefs analytics

**File:** `src/app/layout.tsx` (~line 20)
**Impact:** The Ahrefs analytics script key `j2BL/k+yqwVjkOmeUgLn+A` is hardcoded. While Ahrefs keys are designed to be public, sourcing it from an env var improves maintainability and allows disabling analytics in CI/test environments.
```tsx
// Before
<script src="..." data-key="j2BL/k+yqwVjkOmeUgLn+A" ... />

// After
<script src="..." data-key={process.env.NEXT_PUBLIC_AHREFS_KEY} ... />
```
Add `NEXT_PUBLIC_AHREFS_KEY=j2BL/k+yqwVjkOmeUgLn+A` to `.env.local` and Vercel env vars.

---

### M9 — Verify `prefers-reduced-motion` covers `ken-burns` animation

**File:** `src/app/globals.css` (ken-burns keyframe)
**Impact:** The Ken Burns background animation on the homepage hero is a continuous looping animation. If `@media (prefers-reduced-motion: reduce)` does not disable it, users with vestibular disorders will experience unwanted motion — an accessibility failure (WCAG 2.3.3 AAA, 2.1 guideline).
**Fix:** Verify that the `globals.css` contains:
```css
@media (prefers-reduced-motion: reduce) {
  .hero-bg,
  [class*="ken-burns"] {
    animation: none;
  }
}
```
If not present, add it.

---

## LOW — Backlog

### L1 — Claim off-site citations: Bing Places, Apple Business Connect, Yelp, BBB

**Impact:** These platforms feed Apple Maps/Siri, Yelp search, and local citation scoring. None are confirmed claimed. Each claimed and consistent listing improves local pack ranking and AI dataset citations.
**Priority order:** (1) Apple Business Connect — feeds Siri and Apple Maps, growing fast; (2) Bing Places — directly boosts Bing/Copilot ranking; (3) Yelp — high-traffic local directory; (4) BBB — already linked in schema `sameAs`, claiming and verifying it closes the loop.

---

### L2 — Review velocity strategy

**Impact:** 8 Google reviews is below the ~15-review threshold for consistent local pack appearance. Establish a post-move text/email sequence requesting a Google review. Target: 1 new review every 10–14 days.
**Note:** Never incentivize reviews directly — violates Google policy. Ask naturally ("If you had a good experience, a Google review helps other families find us").

---

### L3 — Off-site AI citation building: Reddit + YouTube

**Impact:** Perplexity cites Reddit heavily (46.7% of local query citations); ChatGPT cites Reddit at 11.3% and YouTube. A few genuine posts in `r/FloridaPanhandle`, `r/SantaRosaBeach`, or `r/30A` (moving advice, not self-promotion) and one YouTube short ("What to expect on moving day on 30A") would measurably improve ChatGPT/Perplexity discoverability over 6 months.

---

### L4 — Remove unused `eslint-disable` in `opengraph-image.tsx`

**File:** `src/app/opengraph-image.tsx:35`
**Fix:** Delete the `// eslint-disable-next-line @next/next/no-img-element` comment on line 35 (no `<img>` element follows it).

---

### L5 — Explicit `generateMetadata` on homepage

**File:** `src/app/page.tsx`
**Impact:** Low — the current approach works. Adding an explicit export makes the page self-documenting.
```ts
export async function generateMetadata(): Promise<Metadata> {
  return HOME_METADATA
}
```

---

### L6 — GBP appointment URL

**Impact:** Dashboard-only action. In the Google Business Profile dashboard, set the "Appointment URL" to `https://beachhousemoving.xyz/get-a-quote`. This adds a direct booking CTA to the GBP panel in local search results.

---

### L7 — Neighborhood Service schema: add `description` and `url`

**File:** `src/lib/structured-data.ts` (neighborhood Service schema)
**Impact:** Per `MAPS-ANALYSIS-beachhousemoving.xyz.md`, neighborhood-level Service schema is missing `description` and `url` fields. These improve schema completeness and entity association.

---

## Estimated Impact by Priority

| Group | Effort | Primary Impact |
|---|---|---|
| C1 (Google Places ID) | 5 min | Google Reviews restored on site |
| H1 (llms.txt deploy) | 2 min | AI crawlers gain full context doc |
| H2 (ratingValue types) | 5 min | Schema validation clean, Rich Results improvement |
| H3 (SearchAction) | 5 min | Cleaner GSC structured-data report |
| H4 (fit-content) | 5 min | OG image renders correctly in social shares |
| H5 (duplicate FAQPage) | 30 min | Schema deduplication |
| M1–M3 | 2–4 hrs | Schema quality, www authority consolidation |
| M4–M7 | 4–8 hrs | AEO/GEO improvements, IndexNow, a11y |
| L1–L7 | Ongoing | Local pack, AI citation, UX polish |

---

## Post-Fix Checklist

After completing CRITICAL and HIGH items, run through in order:

- [ ] `npm run build` clean (0 errors, 0 `INVALID_REQUEST` warnings)
- [ ] `npm run lint` clean (0 errors, 0 warnings)
- [ ] `npm run type-check` clean
- [ ] Deploy to Vercel production
- [ ] Verify `https://beachhousemoving.xyz/llms.txt` returns 200 and full content
- [ ] Verify `https://beachhousemoving.xyz/robots.txt` correct (no regressions)
- [ ] Verify `https://beachhousemoving.xyz/sitemap.xml` loads all 51+ URLs
- [ ] Test OG image: paste `https://beachhousemoving.xyz/` into [opengraph.xyz](https://www.opengraph.xyz/) — confirm split-panel image renders correctly
- [ ] Google Rich Results Test on `/reviews` — confirm `AggregateRating` + `Review` items valid with numeric types
- [ ] Google Rich Results Test on `/` — confirm `MovingCompany` valid; `WebSite` present; no `FAQPage` (after M1)
- [ ] Schema.org validator on homepage JSON-LD — confirm no errors
- [ ] Google Search Console → URL Inspection → `https://beachhousemoving.xyz/` → Request Indexing
- [ ] GSC + Bing Webmaster: submit sitemap `https://beachhousemoving.xyz/sitemap.xml`
- [ ] Bing Webmaster Tools: confirm `BingSiteAuth.xml` verification accepted
- [ ] Yandex Webmaster: confirm `yandex_04fafec4cd60840b.html` verification accepted
- [ ] Ping IndexNow: `curl "https://api.indexnow.org/indexnow?url=https://beachhousemoving.xyz&key=11781a711fe74e7d385896e222cbd2ad"`
- [ ] Verify `www.beachhousemoving.xyz` redirects to apex with 301/308
- [ ] Run live Lighthouse on `/` (target: Performance 90+, Accessibility 95+)
- [ ] Update `REVIEWS_PAGE_META.aggregateRating.reviewCount` in `content.ts` to match current actual Google review count
