# Local SEO Analysis — beachhousemoving.xyz
**Date:** 2026-06-03 | **Analyst:** Claude Code (seo-local skill)

---

## Local SEO Score: 52/100

| Dimension | Weight | Score | Pct |
|-----------|--------|-------|-----|
| GBP Signals | 25% | 15/25 | 60% |
| Reviews & Reputation | 20% | 7/20 | 35% |
| Local On-Page SEO | 20% | 14/20 | 70% |
| NAP Consistency & Citations | 15% | 7/15 | 47% |
| Local Schema Markup | 10% | 6/10 | 60% |
| Local Link & Authority | 10% | 3/10 | 30% |
| **TOTAL** | 100% | **52/100** | — |

> Context: Beach House Moving launched in 2025. The score reflects a well-built technical foundation with the predictable gaps of a very new local business (thin review count, minimal citation footprint, no established local authority links). The on-page and schema work is above average for a new business; the biggest levers are reviews, citations, and two schema fixes.

---

## Business Type: Service Area Business (SAB)

No street address in public UI. Serves Walton, Okaloosa, and Bay Counties from a Santa Rosa Beach base. All local SEO decisions correctly account for SAB status (no map pin, no address in schema `streetAddress`, coordinate centroid in `geo`).

**Industry Vertical:** Home Services — Moving Company (`MovingCompany` schema subtype — correct)

---

## 1. GBP Signals — 15/25 (60%)

### Detected
- GBP review share link present in `SOCIAL_LINKS.google` and schema `sameAs` ✓
- Facebook business page in `sameAs` ✓
- Business hours (24/7) visible across multiple pages ✓
- Phone and license number in footer and hero ✓
- `openingHoursSpecification` in schema covers all 7 days ✓

### Gaps

**Map embed has no business pin.** The service-areas page uses a coordinate-based embed:
```
https://maps.google.com/maps?q=30.396,-86.2288&z=9
```
This renders a region map with no business pin and no place ID. Google cannot associate this embed with a GBP listing. Switching to a `place_id`-based embed ties the embed to the verified listing and reinforces GBP signals.

**Contact page has no map.** The contact page is one of the highest-intent pages on the site (it's where users go to call or message). It has no map embed at all — a significant missed signal for SABs that want to indicate their operational center.

**No GBP review widget.** Reviews are served from hardcoded `content.ts` data rather than a live GBP review widget. This means Google sees no dynamic review feed and no live connection to the GBP listing from the website.

**GBP posts not detectable.** No signals of active GBP posting found on-page.

**Sterling Sky GBP link strategy:** The `sameAs` links to the Google review share URL (`share.google/...`) rather than the homepage. This is correct per the Sterling Sky Diversity Update (linking the primary GBP link to the strongest website page risks suppressing organic rankings).

---

## 2. Reviews & Reputation — 7/20 (35%)

### Snapshot
| Metric | Status |
|--------|--------|
| Google review count | 3 |
| Average star rating | 5.0 ⭐ |
| Reviews with text | 2 of 3 |
| Third-party platforms | None detected |
| Owner responses | Not detectable from website |
| Review CTA on site | Yes (`/reviews` page) |
| AggregateRating schema | Yes (`/reviews` page only) |

### Critical Issue — Review Velocity

3 reviews is critically below the 10-review threshold that correlates with local pack entry (Sterling Sky). The 5.0 average is excellent but volume is the problem.

The **18-day rule** (Sterling Sky): if no new Google review arrives within 18 days, local pack rankings can cliff. With only 3 reviews total and a new business, this is the highest-risk metric on the board.

### No Third-Party Platform Presence

Google AI Overviews (showing on ~68% of local searches) and ChatGPT do NOT pull directly from GBP — they source from Bing index, Yelp, TripAdvisor, BBB, and Reddit. Without listings on these platforms, Beach House Moving is invisible to AI-generated local recommendations.

### AggregateRating placement

The `aggregateRating` schema block exists only on `/reviews`. The sitewide `MovingCompany` schema in the root layout does not include it. Google rewards businesses that surface their rating everywhere, not just on a dedicated page.

---

## 3. Local On-Page SEO — 14/20 (70%)

### Strengths
- **7 dedicated service pages** (Whitespark #1 local organic factor) ✓
- **3 county landing pages** with genuinely unique, non-swappable content ✓
- Localized title tags on all pages (`Santa Rosa Beach, FL`, county names) ✓
- Click-to-call `tel:` links throughout ✓
- Quote form above the fold ✓
- Internal hub-and-spoke structure (homepage → services hub → individual service pages; homepage → service-areas hub → county pages) ✓
- FAQPage on homepage, service pages, and county pages ✓

### Doorway Page Risk: LOW

County pages pass the swap test — Walton County content includes specific references to 30A boardwalk access, gated community protocols, stilted driveways, and Sprinter van substitution. Okaloosa content references PCS timelines, Eglin AFB, Hurlburt Field. Bay County covers elevated PCB homes and liftgate requirements. These details are not swappable.

### Gap: Homepage H1 is not locally optimized

```
Current H1: "Your Move, Our Mission."
```

The homepage H1 has no geographic or service keyword. While the title tag (`Movers in Santa Rosa Beach, FL`) and hero eyebrow copy (`Walton · Okaloosa · Bay Counties`) carry some local signal, the H1 is the single most prominent on-page ranking element. A localized H1 is a quick win.

**Suggested fix:**
```
"Movers in Santa Rosa Beach, FL"
```
or retain brand voice with:
```
"Emerald Coast Movers — Your Move, Our Mission"
```

### Gap: Contact page has no map

The contact page (`/contact`) has no Google Map embed. For a SAB this should be a service-area map (region centered, no pin), not a pin at a street address. The map embed from content.ts (`MAP_EMBED.src`) already exists in the codebase but is only used on the service-areas hub — it should also appear on `/contact`.

---

## 4. NAP Consistency & Citations — 7/15 (47%)

### NAP Audit

| Source | Name | Address | Phone |
|--------|------|---------|-------|
| Page HTML (footer/hero) | Beach House Moving ✓ | SAB — not shown ✓ | (850) 842-1962 ✓ |
| JSON-LD schema | Beach House Moving ✓ | Santa Rosa Beach, FL (locality only) ✓ | +18508421962 ✓ |
| GBP (inferred from social link) | Beach House Moving ✓ | — | — |

**No NAP discrepancies detected** across page and schema. Phone formats are consistent (display: `(850) 842-1962`, schema: `+18508421962`).

### Email — Inconsistency Risk

The business email is `beachhousemoving@gmail.com`. Citations on Yelp, BBB, HomeAdvisor, etc. will pick this up. If and when a branded email (`info@beachhousemoving.xyz`) is adopted, it creates a NAP-variant citation problem. **Either commit to the Gmail address long-term or migrate before building citations.**

### Citation Gaps

| Platform | Status | Priority |
|----------|--------|----------|
| Google Business Profile | Present (inferred) | ✓ |
| Facebook | Present | ✓ |
| Bing Places | Not detected | 🔴 Critical — powers ChatGPT, Copilot, Alexa |
| Apple Business Connect | Not detected | 🔴 High — usage doubled to 27% (BrightLocal 2026) |
| Yelp | Not detected | 🔴 High — ChatGPT sources from Yelp |
| BBB | Not detected | High — Google uses BBB for business verification |
| HomeAdvisor / Angi | Not detected | Medium |
| Thumbtack | Not detected | Medium |
| Data Axle | Not detected | Medium — downstream aggregator |
| Foursquare | Not detected | Medium — downstream aggregator |
| Neustar/TransUnion | Not detected | Medium — downstream aggregator |

---

## 5. Local Schema Markup — 6/10 (60%)

### Present and Correct
- `MovingCompany` sitewide (correct LocalBusiness subtype) ✓
- `areaServed` — counties (AdministrativeArea) + cities (City) ✓ (SAB-appropriate)
- `openingHoursSpecification` 7 days, 00:00–23:59 ✓
- `telephone` (E.164 format) ✓
- `email` ✓
- `sameAs` (Facebook + Google) ✓
- `identifier` for FDACS license (PropertyValue) ✓
- `FAQPage` on homepage and service pages ✓
- `BreadcrumbList` on service and county pages ✓
- `AggregateRating` + individual `Review` on `/reviews` ✓
- County-scoped `MovingCompany` + `Service` on county pages ✓
- `Service` schema on individual service pages ✓
- `junkRemovalServiceSchema` with `areaServed` array ✓

### Gaps

**1. Geo coordinates — insufficient precision**

```ts
// current (3-4 decimal places)
geo: { lat: 30.396, lng: -86.2288 }
```

Confirmed best practice is 5+ decimal places. Fix:
```ts
geo: { lat: 30.39600, lng: -86.22880 }
```
Or better, use a precise pin coordinate from Google Maps: `30.39612, -86.22881`.

**2. No `@id` on sitewide MovingCompany schema**

Without `@id`, the schema cannot participate in linked data graphs. Google uses `@id` to de-duplicate and connect entity signals across pages. Fix:

```json
"@id": "https://beachhousemoving.xyz/#business"
```

**3. No `aggregateRating` in sitewide MovingCompany schema**

`aggregateRating` exists only on `/reviews`. Adding it to the root layout schema makes the rating available on every page Google crawls. With only 3 reviews, this is a double-edged sword — it helps if/when the count grows, but 3 reviews should still be surfaced.

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "3",
  "bestRating": "5"
}
```

**4. No `priceRange`**

Recommended property in LocalBusiness schema. Under 100 characters, does not require exact pricing:

```json
"priceRange": "$$"
```

**5. County pages lack `@id` and `branchOf`**

Each county page emits a `MovingCompany` schema but without an `@id`, so they cannot be linked back to the root entity. Best practice for multi-location SABs:

```json
// County page MovingCompany
"@id": "https://beachhousemoving.xyz/service-areas/walton-county#business",
"branchOf": {
  "@id": "https://beachhousemoving.xyz/#business"
}
```

**6. `PostalAddress` missing `postalCode`**

The current `address` in schema omits `postalCode`. While SABs suppress `streetAddress`, the postal code is safe to include and improves geo-signal specificity:

```json
"address": {
  "@type": "PostalAddress",
  "addressLocality": "Santa Rosa Beach",
  "addressRegion": "FL",
  "postalCode": "32459",
  "addressCountry": "US"
}
```

---

## 6. Local Link & Authority Signals — 3/10 (30%)

### Detected
- FDACS registration (official state government record) ✓
- Facebook business page ✓
- Google Business Profile (inferred) ✓

### Gaps
- No Chamber of Commerce membership (Walton Area CoC, Destin Area CoC)
- No BBB accreditation
- No local press or news mentions
- No "best of" list placement (Whitespark #1 AI visibility factor)
- No HomeAdvisor, Angi, or Thumbtack profile
- No community sponsorship or event signals

**Note:** This is expected for a business that launched in 2025. Link building has a long runway and should be approached systematically.

---

## AI Search Visibility

Beach House Moving is not currently optimized for ChatGPT/Perplexity local recommendations:

- **Bing Places not claimed** — ChatGPT sources local data from Bing index. Without a Bing Places listing, the business is invisible to AI-generated local recommendations from ChatGPT, Copilot, and Alexa.
- **No Yelp listing** — ChatGPT also sources from Yelp. Moving company searches on ChatGPT will surface Yelp-listed competitors.
- **No BBB listing** — Google AI Overviews uses BBB for business verification signals.
- **3 reviews** — AI systems weight review volume heavily. More reviews = more citability.

Run `/seo geo https://beachhousemoving.xyz` for a full AI search visibility audit including llms.txt, passage-level citability, and brand mention scoring.

---

## Top 10 Prioritized Actions

### Critical

**1. Launch a review generation campaign immediately**
- Target: 10 Google reviews as fast as possible (local pack entry threshold)
- Maintain 18-day maximum cadence (no gap longer than 18 days without a new review)
- The `/reviews` page already has the Google review link — use it in post-service SMS/email follow-ups
- Do NOT pre-screen customers before asking for reviews (FTC/Google policy violation)
- Also request reviews on Yelp and Facebook to build multi-platform presence

**2. Claim Bing Places for Business**
- URL: bing.com/places
- This is the single highest-leverage citation fix — Bing Places powers ChatGPT, Microsoft Copilot, and Alexa
- SABs can claim without a street address (service area only)

### High

**3. Claim Apple Business Connect**
- URL: businessconnect.apple.com
- Usage doubled to 27% in 2026 (BrightLocal). Free, ~20 minutes to set up.
- SAB-compatible (service area without address)

**4. Fix schema: add `@id`, `aggregateRating`, `priceRange`, and `postalCode`**

In `src/lib/structured-data.ts`, update `movingCompanySchema()`:

```ts
return {
  '@context': 'https://schema.org',
  '@type': 'MovingCompany',
  '@id': `${base}/#business`,           // ADD
  name: BUSINESS.name,
  // ... existing fields ...
  priceRange: '$$',                      // ADD
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.zip,    // ADD
    addressCountry: 'US',
  },
  aggregateRating: {                     // ADD (update reviewCount as reviews grow)
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '3',
    bestRating: '5',
  },
}
```

**5. Fix geo coordinates to 5+ decimal places**

```ts
// In content.ts
geo: { lat: 30.39600, lng: -86.22880 },
```

Or obtain precise coordinates: open Google Maps, find the approximate base location, right-click → "What's here?" to get 5+ decimal precision.

**6. Update homepage H1 to include local keyword**

In `HeroSection.tsx` (or whichever component renders the H1), replace:
```
"Your Move, Our Mission."
```
with a locally-anchored H1 while preserving brand voice (see gap section above for options).

### Medium

**7. Add map embed to contact page**

The `MAP_EMBED` object already exists in `content.ts`. Add it to `src/app/contact/page.tsx`. Use `loading="lazy"` to avoid performance impact.

**8. Get a Google Maps place ID and update the map embed**

Replace the coordinate-based embed URL with a place ID URL:
```
https://maps.google.com/maps?cid=PLACE_CID&output=embed
```
A place ID embed shows the GBP listing card, reviews, and business name in the embedded map — a direct GBP signal reinforcement.

**9. Add `@id` and `branchOf` to county page schemas**

Update `countyAreaSchema()` in `structured-data.ts` to add `@id` and `branchOf` on each county's `MovingCompany` entity (see schema gap section for the template).

**10. Submit to the three data aggregators**

- Data Axle (infogroup.com)
- Foursquare (business.foursquare.com)
- Neustar/TransUnion (localeze.com)

These push NAP data to hundreds of downstream directories automatically. Lock in the `beachhousemoving@gmail.com` email before submitting (consistency matters more than which address you use).

---

## Limitations

This analysis assessed **what is directly observable from the website HTML, schema code, and public fetch**. The following could NOT be assessed:

| What's Missing | Tool That Fills the Gap |
|----------------|------------------------|
| Real-time local pack position (map pack rank) | DataForSEO Local Pack API, BrightLocal |
| Geo-grid rank tracking (rank by proximity) | DataForSEO Geo-Grid, Local Falcon |
| Domain Authority / backlink profile | Ahrefs, Moz, `/seo-backlinks` skill |
| Actual GBP Insights (clicks, calls, direction requests) | Google Business Profile dashboard |
| Live citation audit across 100+ directories | BrightLocal, Whitespark Citations |
| Competitor local pack comparison | DataForSEO `/seo-maps` skill |
| Review velocity history | GBP dashboard |
| AI Overview appearance rate | BrightLocal, Profound |

---

*Generated by seo-local skill · Claude Code · beachhousemoving.xyz · 2026-06-03*
