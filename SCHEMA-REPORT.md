# Schema Markup Audit — beachhousemoving.xyz
**Date:** 2026-06-04

---

## Validation Results

| Page | Schema Type(s) | Status | Issues |
|------|---------------|--------|--------|
| `/` (layout) | `MovingCompany` + `HomeAndConstructionBusiness` | ✅ Valid | Minor: rating values are strings, missing `worstRating` |
| `/` (layout) | `WebSite` | ⚠️ Warning | `SearchAction` target URL is non-functional |
| `/` (homepage) | `FAQPage` (12 Qs) via FAQSection | ⚠️ Restricted | FAQPage rich results restricted to gov/healthcare since Aug 2023 |
| `/services` | `BreadcrumbList` | ✅ Valid | — |
| `/services/[slug]` | `BreadcrumbList` + `Service` | ✅ Valid | FAQPage from FAQSection component — restricted |
| `/services/junk-removal` | `BreadcrumbList` + `Service` | ✅ Valid | FAQPage from FAQSection — restricted |
| `/about` | `BreadcrumbList` + `FAQPage` (x2) | ❌ Duplicate | FAQPage emitted twice: once in `<JsonLd>`, once via `<FAQSection>` |
| `/contact` | `BreadcrumbList` + `FAQPage` (x2) | ❌ Duplicate | Same duplicate issue as `/about` |
| `/service-areas` | `BreadcrumbList` | ✅ Valid | No page-level entity schema |
| `/service-areas/[county]` | `BreadcrumbList` + `MovingCompany` + `Service` + `FAQPage` (x2) | ❌ Duplicate | FAQPage emitted twice (page-level + FAQSection) |
| `/service-areas/[county]/[neighborhood]` | `BreadcrumbList` + `MovingCompany`+`LocalBusiness` + `Service` + `FAQPage` | ⚠️ Warning | `areaServed` uses plain strings, not typed Place objects; FAQPage restricted |
| `/get-a-quote` | `BreadcrumbList` | ✅ Valid | Missing `ContactPage`/`WebPage` entity |
| `/pricing` | `BreadcrumbList` + `FAQPage` | ⚠️ Restricted | FAQPage restricted |
| `/reviews` | `MovingCompany`+`AggregateRating` + `Review[]` | ✅ Valid | — |

---

## Issues — Critical

### 1. Duplicate FAQPage on 3 pages (Bug)
**Affected pages:** `/about`, `/contact`, `/service-areas/[county]`

These pages call `faqSchema()` and pass it to `<JsonLd>` in the page component, AND also render `<FAQSection>` which independently emits its own `FAQPage` JSON-LD block via `JsonLd`. Result: two `FAQPage` schema blocks per page.

**Root cause:** `FAQSection` in [src/components/sections/FAQSection.tsx](src/components/sections/FAQSection.tsx) emits `<JsonLd data={faqSchema(faqs)} />` internally. Pages that pass `faqSchema(...)` themselves to `<JsonLd>` before rendering `<FAQSection>` create the duplicate.

**Fix:** Remove `faqSchema()` from the page-level `<JsonLd>` data arrays on these three pages (let FAQSection own the FAQPage emission). Or strip the `<JsonLd>` from FAQSection and have every page own its own schema — but the current duplication must be resolved.

---

### 2. FAQPage Type — Restricted (No Rich Results)
**Affected pages:** All pages with `FAQSection`, `/pricing`, `/contact`, `/about`, neighborhood pages

Google restricted FAQPage rich results to government and health authority sites in **August 2023**. A moving company will never receive FAQ rich results regardless of how well the markup is written.

**Current impact:** Schema renders silently. No Google penalty, but no rich results either — pure noise in the markup.

**Recommendation:** Remove all `FAQPage` JSON-LD from the site. The FAQ content itself should stay on the page (good for AEO/AI citation). Only the structured data block is wasteful.

Files to update:
- [src/components/sections/FAQSection.tsx](src/components/sections/FAQSection.tsx) — remove `<JsonLd data={faqSchema(faqs)} />`
- [src/lib/structured-data.ts](src/lib/structured-data.ts) — optionally keep `faqSchema` for if/when it becomes useful again
- [src/app/contact/page.tsx](src/app/contact/page.tsx) — remove `faqSchema` from `<JsonLd>` data
- [src/app/about/page.tsx](src/app/about/page.tsx) — remove `faqSchema` from `<JsonLd>` data
- [src/app/service-areas/[county]/page.tsx](src/app/service-areas/[county]/page.tsx) — remove `faqSchema` from `<JsonLd>` data
- [src/app/pricing/page.tsx](src/app/pricing/page.tsx) — remove inline `faqSchema` from `<JsonLd>` data
- [src/app/service-areas/[county]/[neighborhood]/page.tsx](src/app/service-areas/[county]/[neighborhood]/page.tsx) — remove `localFaqSchema` from `<JsonLd>` data

---

## Issues — Warnings

### 3. AggregateRating values are strings, not numbers
**File:** [src/lib/content.ts](src/lib/content.ts) (line 425–428)

```ts
// Current (wrong)
ratingValue: '5',
reviewCount: '5',
bestRating: '5',
worstRating: '1',
```

Schema.org specifies `ratingValue`, `reviewCount`, `bestRating`, and `worstRating` as `Number` types. Passing them as strings may pass leniently through Google's validator but is technically invalid. **Fix:** Change to integer/float values.

### 4. Missing `worstRating` in sitewide MovingCompany schema
**File:** [src/lib/structured-data.ts](src/lib/structured-data.ts) (line 76–80)

The sitewide `movingCompanySchema` includes `aggregateRating` without `worstRating`. The `/reviews` page schema correctly includes it (line 263). They should be consistent. Google recommends including both `bestRating` and `worstRating`.

### 5. WebSite `SearchAction` targets non-functional URL
**File:** [src/lib/structured-data.ts](src/lib/structured-data.ts) (line 121–127)

```json
"potentialAction": {
  "@type": "SearchAction",
  "target": { "@type": "EntryPoint", "urlTemplate": "https://beachhousemoving.xyz/services?q={search_term_string}" }
}
```

Two problems:
- The `/services?q=` URL does not implement a real site search — submitting a sitelinks searchbox query would return the same services page regardless of input. Google will not show the sitelinks searchbox if the search is non-functional.
- The `EntryPoint` wrapper is the deprecated format. Current format uses a plain URL string for `target`.

**Recommendation:** Remove `potentialAction` from the `WebSite` schema until a real site search is implemented.

### 6. `sameAs` uses Google share URL, not canonical GBP URL
**File:** [src/lib/content.ts](src/lib/content.ts) (line 65)

```ts
google: 'https://share.google/IDGDHjZnsKihpWaCu',
```

Share URLs are redirect links, not canonical entity URLs. For `sameAs`, Google wants the stable Google Business Profile URL. Use the `maps.google.com/maps?cid=` or `g.page/r/` URL format. The correct CID-based URL is visible in the maps embed URL already in `content.ts` (line 616): `cid=0x8864ab01763c979c`... extract the `cid` from `!1s0x2c49ab7600a457f%3A0x5c504eb0f4ca7c79` (the second hex after `%3A`) or use `https://g.page/r/CXl8yvSwTlBcEAI` (already present as `googleReviewLink` base at line 430).

### 7. Neighborhood `areaServed` uses plain strings
**File:** [src/app/service-areas/[county]/[neighborhood]/page.tsx](src/app/service-areas/[county]/[neighborhood]/page.tsx) (line 138)

```ts
areaServed: [`${nb.name}, FL`, `${nb.county}, FL`],
```

Schema.org expects structured Place/City objects:
```ts
areaServed: [
  { "@type": "City", "name": nb.name, "addressRegion": "FL" },
  { "@type": "AdministrativeArea", "name": nb.county }
]
```

---

## Missing Schema Opportunities

| Page | Missing Schema | Priority | Value |
|------|---------------|----------|-------|
| `/about` | `AboutPage` WebPage + `Organization` with `foundingDate` | Medium | E-E-A-T signal |
| `/contact` | `ContactPage` WebPage type | Low | Standard practice |
| `/get-a-quote` | `ContactPage` WebPage type | Low | Standard practice |
| `/service-areas` | `ItemList` linking to county pages | Low | Crawl depth hint |
| `/services` | `ItemList` linking to service detail pages | Low | Crawl depth hint |
| All pages | `WebPage` with `@type` + `breadcrumb` | Low | Completeness |

---

## What's Working Well

- `MovingCompany` sitewide schema is comprehensive: `geo`, `openingHoursSpecification`, `identifier` (FL Mover Reg #), `areaServed` with typed County + City objects, `contactPoint`, `aggregateRating`, `sameAs`, SAB-compliant (no `streetAddress`)
- `@id` graph linking: `branchOf: { '@id': '.../#business' }` on county and neighborhood pages correctly links sub-entities to the root business node
- `BreadcrumbList` on every page is correctly structured
- `Service` schemas on all service detail pages
- `Review` individual schemas on `/reviews` are properly authored (`Person`, `Rating`, `itemReviewed`)
- Logo URL is absolute; all URLs are absolute

---

## Generated Fixes

See `generated-schema.json` for corrected schema blocks ready to drop in.
