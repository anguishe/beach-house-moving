# Local SEO Analysis — beachhousemoving.xyz

**Date:** 2026-06-04 | **Scope:** Full codebase + live site verification | **Analyst:** Cursor (seo-local skill)

---

## Local SEO Score: 62/100

| Dimension | Weight | Score | Pct |
|-----------|--------|-------|-----|
| GBP Signals | 25% | 18/25 | 72% |
| Reviews & Reputation | 20% | 9/20 | 45% |
| Local On-Page SEO | 20% | 17/20 | 85% |
| NAP Consistency & Citations | 15% | 8/15 | 53% |
| Local Schema Markup | 10% | 7/10 | 70% |
| Local Link & Authority | 10% | 3/10 | 30% |
| **TOTAL** | 100% | **62/100** | — |

> **Context:** Beach House Moving (est. 2025) has a strong technical and on-page local foundation for a new SAB: county + neighborhood programmatic pages, correct SAB NAP handling, GBP-linked map embed, and rich `MovingCompany` schema. The main gaps are off-site (review velocity, Tier-1 citations, local authority links) and one schema/content wiring note on sitewide `aggregateRating` (`FAQPage` **is** emitted — home, service, county, neighborhood, pricing, and junk-removal pages).

---

## Business Type: Service Area Business (SAB)

- **Detected:** No street address in public UI; service-area copy throughout; `displayAddress: false` in `content.ts`.
- **Schema:** `PostalAddress` includes locality/region/ZIP only — no `streetAddress` in JSON-LD (correct for public SAB output).
- **Internal address** (`110 Via Largo`) exists for GBP/schema locality only — never rendered in components audited.

**Industry vertical:** Home Services — Moving (`MovingCompany` + `HomeAndConstructionBusiness`) — **correct subtype**

---

## Site Inventory (Indexable Local Surface)

| Layer | Count | Routes |
|-------|------:|--------|
| Services | 7 | `/services/[slug]` + dedicated `/services/junk-removal` |
| Counties | 3 | `/service-areas/walton-county`, `okaloosa-county`, `bay-county` |
| Neighborhoods | 26 | `/service-areas/[county]/[neighborhood]` (SSG via `generateStaticParams`) |
| Conversion | 3 | `/contact`, `/get-a-quote`, `/reviews` |
| Supporting | 2 | `/pricing`, `/about` |

**Sitemap:** `src/app/sitemap.ts` — static + service + county + neighborhood URLs (live `sitemap.xml` returns HTTP 200).

**AI crawlability:** `public/llms.txt` present; `robots.ts` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.

---

## 1. GBP Signals — 18/25 (72%)

### Detected (codebase)

| Signal | Status | Source |
|--------|--------|--------|
| GBP profile link | ✅ | `SOCIAL_LINKS.google` → `https://g.page/r/CXl8yvSwTlBcEAI` |
| Review CTA | ✅ | `REVIEWS_PAGE_META.googleReviewLink` (write review URL) |
| `sameAs` in schema | ✅ | Facebook + Google in `movingCompanySchema()` |
| 24/7 hours (visible) | ✅ | Footer, contact, hero trust |
| `openingHoursSpecification` | ✅ | All 7 days, 00:00–23:59 in schema |
| GBP place map embed | ✅ | `MAP_EMBED` uses Maps embed with place ID for “Beach House Moving” |
| Map on contact | ✅ | `ServiceAreaMap` on `/contact` |
| Map on service-areas hub | ✅ | `ServiceAreaMap` on `/service-areas` |
| FL Mover Reg. #IM4125 | ✅ | Hero, footer, schema `identifier` |

### Gaps

- **No live GBP review widget** — reviews are sourced from `TESTIMONIALS` in `content.ts` (static), not a Google embed.
- **GBP posts / Q&A** — not detectable on-site (Q&A deprecated on GBP Dec 2025; migrated to on-site FAQ — rendered in HTML and emitted as `FAQPage` JSON-LD).
- **GBP dashboard fields** (secondary categories, services list, appointment URL, photo count) — require GBP login or DataForSEO Tier 1.

### Recommendation (GBP dashboard — off-site)

1. Set **appointment/booking URL** → `https://beachhousemoving.xyz/get-a-quote`
2. Add **secondary categories**: Junk Removal Service, Packing Service (if offered in GBP)
3. Paste **services** matching the 7 slugs in `content.ts`
4. Post weekly (seasonal 30A / PCS / condo-move tips)

---

## 2. Reviews & Reputation — 9/20 (45%)

### Snapshot (from `content.ts`)

| Metric | Value |
|--------|-------|
| Google reviews (site) | **5** |
| Average rating | **5.0** |
| Reviews with written text | **4 of 5** |
| `FLAGS.SHOW_TESTIMONIALS` | **`true`** (homepage section live) |
| `aggregateRating` schema | Sitewide layout + `/reviews` |
| Third-party platforms | **None referenced in codebase** |

### Assessment

- **Above the 5-review maps floor**, still **below the ~10-review local pack threshold** (Sterling Sky).
- **18-day review velocity rule** cannot be verified from the repo — monitor in GBP Insights.
- **AI local sources** (ChatGPT/Bing): Yelp, BBB, TripAdvisor, Reddit — no on-site signals; claim Bing Places + Apple Business Connect + Yelp.

### Schema caution

`aggregateRating` is emitted in **root layout** `movingCompanySchema()` on every page. Google’s guidelines prefer ratings markup only where the rating is clearly visible and representative of that page. Consider limiting `aggregateRating` to `/reviews` (and optionally homepage if testimonials remain above the fold).

---

## 3. Local On-Page SEO — 17/20 (85%)

### Strengths

- **Homepage title:** `Movers in Santa Rosa Beach, FL` (`PAGE_META.home`)
- **H1 patterns:** County pages (`Movers in {County}`), neighborhoods (`Movers in {name}, FL`)
- **NAP in footer:** Name + `tel:` phone + service area label (no street) — `Footer.tsx`
- **Dedicated service pages:** 7 services with unique `metaTitle` / `metaDescription`
- **County landings:** Unique descriptions, city lists, internal links to services
- **26 neighborhood pages:** Unique intros, landmarks, conditional service grids (`LUXURY_GATED`, `CONDO_HIGHRISE`, `MILITARY` sets), AEO direct-answer block
- **Hub-and-spoke linking:** Service-areas hub → counties → neighborhoods; county cards link to neighborhood URLs
- **Click-to-call:** `TrackedPhoneLink` + navbar `tel:` with GA `contact` events

### Doorway / thin-content risk (26 neighborhood pages)

| Check | Result |
|-------|--------|
| Swap test (city name only) | **Pass** — intros reference landmarks, access patterns, military/condo/gated context |
| Unique copy per page | **Pass** — `intro` + `landmarks` differ per slug |
| Image uniqueness | **Partial** — several pages reuse `/images/move-srb.jpg`, `move-inlet-beach.jpg`, `move-pcb.jpg` |
| Count vs. skill gate | **26 pages** — below 30-page warning; monitor if expanding past 30 |

### Gaps

- **`FAQPage` JSON-LD not wired** — `faqSchema()` exists in `structured-data.ts` but is **never imported** on pages that render `FAQSection` (homepage, about, contact, services, counties). Comment in `content.ts` says FAQs are “emitted as FAQPage JSON-LD” — **implementation gap**.
- **`ARCHITECTURE.md` outdated** — documents only county routes, not 26 neighborhood URLs; still says `SHOW_TESTIMONIALS` is `false`.

---

## 4. NAP Consistency & Citations — 8/15 (53%)

### NAP audit (three sources)

| Field | Footer / HTML | JSON-LD (`movingCompanySchema`) | Notes |
|-------|---------------|----------------------------------|-------|
| Name | Beach House Moving | Beach House Moving | ✅ |
| Phone | (850) 842-1962 / `tel:+18508421962` | `+18508421962` | ✅ |
| Street | **Not shown** | **Not in `streetAddress`** | ✅ SAB |
| Locality | Service area label | `Santa Rosa Beach`, FL 32459 | ✅ centroid only |
| Website | — | `https://beachhousemoving.xyz` | ✅ |

**No discrepancies** between visible NAP and schema for public fields.

### Citations (not verifiable from repo alone)

Tier-1 presence must be confirmed in Bing Places, Apple Business Connect, Yelp, BBB, Facebook (Facebook URL in `sameAs` ✅).

**Recommended off-site actions:**

1. Claim **Bing Places** (powers ChatGPT/Copilot/Alexa)
2. Claim **Apple Business Connect**
3. Create/claim **Yelp** + **BBB** with identical NAP (name, phone, service area — no street on public listings if SAB)
4. Submit to data aggregators: Data Axle, Foursquare, Neustar/TransUnion

---

## 5. Local Schema Markup — 7/10 (70%)

### Present

| Schema | Where |
|--------|-------|
| `MovingCompany` + `HomeAndConstructionBusiness` | Root layout (sitewide) |
| `WebSite` + publisher | Root layout |
| `Service` + provider | Each `/services/[slug]` |
| County `MovingCompany` + `Service` + `branchOf` | `/service-areas/[county]` |
| Neighborhood `MovingCompany`/`LocalBusiness` + `Service` + `BreadcrumbList` | Inline in `[neighborhood]/page.tsx` |
| `AggregateRating` + `Review` | `/reviews` |
| `AboutPage`, `ContactPage`, `ItemList`, `FAQPage` helper | About, contact, services hub — **FAQ helper unused** |

### Issues

1. **`faqSchema()` unused** — missing rich-result / AI parse signal for 12+ FAQs sitewide.
2. **Sitewide `aggregateRating`** — see Reviews section.
3. **Neighborhood `geo`** — uses `BUSINESS.geo` at 3 decimal places; sitewide schema uses `toFixed(5)` — inconsistent precision.
4. **Neighborhood `Service` schema** — minimal (no `description`, `url` on service block).

### SAB schema address block (acceptable pattern)

```87:93:src/lib/structured-data.ts
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: 'US',
    },
```

---

## 6. Local Link & Authority — 3/10 (30%)

No Chamber of Commerce, BBB badge, local press, or “best of” list signals detected in `content.ts` or layout components. Expected for a 2025 launch — highest long-term lever per Whitespark 2026 AI visibility research.

---

## AI Search (Local Context Only)

- Run **`/seo geo https://beachhousemoving.xyz`** for full GEO/citability audit.
- **On-site AI readiness:** `llms.txt` ✅, AI bots allowed in `robots.ts` ✅, neighborhood AEO paragraphs ✅.
- **Off-site gap:** ChatGPT local recommendations pull from Bing index + Yelp/BBB/Reddit — citations work is critical.

---

## Top 10 Prioritized Actions

| Priority | Action | Effort |
|----------|--------|--------|
| **Critical** | Review generation: sustain **≥1 Google review every 18 days**; target **10+** total | Ongoing |
| **Critical** | Claim **Bing Places** + **Apple Business Connect**; align NAP with site | Medium |
| **High** | Wire **`faqSchema()`** on every page with `FAQSection` (+ neighborhood FAQ blocks) | Low (code) |
| **High** | Move **`aggregateRating`** off sitewide layout → `/reviews` only (unless homepage qualifies) | Low (code) |
| **High** | Create **Yelp + BBB** listings (same phone/name/service area) | Medium |
| **Medium** | GBP: appointment URL, services, 10+ photos, secondary categories | Medium |
| **Medium** | Unique **hero images** per neighborhood (reduce template reuse) | Medium |
| **Medium** | Update **`ARCHITECTURE.md`** with neighborhood routes + testimonial flag | Low |
| **Low** | Neighborhood schema: add `description`/`url` to `Service`; normalize `geo` to 5 decimals | Low (code) |
| **Low** | Chamber / local “best movers” digital PR outreach | High |

---

## Limitations Disclaimer

This audit **could not** assess:

- Real-time **local pack rankings** or geo-grid Share of Local Voice
- Live **GBP Insights** (views, calls, review velocity, photo count)
- **Domain authority** or full backlink profile
- Automated **citation audit** across directories (DataForSEO / BrightLocal)
- **Owner response rate** on Google reviews

**Tools to fill gaps:** DataForSEO `local_business_data` + `google_local_pack_serp`, BrightLocal, Whitespark, GSC.

---

*Generated from repository audit at `/home/angsec/Projects/beach-house-moving`.*
