# Maps Intelligence Analysis — beachhousemoving.xyz
> Historical snapshot. Review-count figures below are superseded — canonical count is TESTIMONIALS.length (11 as of 2026-07-19).

**Date:** 2026-06-04 | **Scope:** Full codebase + live HTTP checks | **Analyst:** Cursor (seo-maps skill, Tier 0)

---

## Maps Health Score: 61/100

| Dimension | Score | Max | Notes |
|-----------|------:|----:|-------|
| GBP Completeness (inferred) | 19 | 25 | Strong web signals; dashboard fields unverified |
| Schema Quality | 17 | 20 | Rich sitewide + county; neighborhood/geo gaps |
| Cross-Platform Presence | 8 | 20 | Google + Facebook confirmed; Bing/Apple/Yelp/BBB unknown |
| Review Signal | 10 | 15 | 5 reviews @ 5.0; velocity unverified |
| OSM / Alternative Presence | 0 | 10 | Not verified in repo |
| Sitemap & Crawlability | 7 | 10 | 40+ URLs; static `lastModified` |

---

## Capability Tier: **Tier 0 (Free / Codebase)**

DataForSEO MCP was **not used** (subagent unavailable). Analysis combines:

- Full read of `src/lib/content.ts`, `structured-data.ts`, map components, service-area routes
- `npm run build` route manifest (26 neighborhood SSG paths confirmed)
- Live checks: `sitemap.xml`, homepage, `/service-areas/walton-county/seaside` → HTTP 200

Install DataForSEO extension for Tier 1: live GBP fields, geo-grid ranks, citation NAP scan.

---

## 1. GBP Profile Audit (Inferred)

| # | Field | Status | Evidence |
|---|-------|--------|----------|
| 1 | Business Name | ✅ | `BUSINESS.name` consistent sitewide |
| 2 | Phone | ✅ | E.164 in schema; display format in UI |
| 3 | Website | ✅ | `https://beachhousemoving.xyz` |
| 4 | Primary Category | ✅ Inferred | Moving Company |
| 5 | Secondary Categories | ❓ | Recommend Junk Removal, Packing |
| 6 | Business Hours | ✅ | 24/7 in UI + schema |
| 7 | GBP Description | ❓ | Suggested copy below |
| 8 | Service Area (SAB) | ✅ | 3 counties + 26 named communities in `llms.txt` |
| 9 | Photos ≥ 10 | ❓ | `/public/images/` has fleet/move assets |
| 10 | Cover / Logo | ❓ | `logo-light.png`, `logo-dark.png` on site |
| 11 | Map embed ↔ listing | ✅ | `MAP_EMBED` references place `0x2c49ab7600a457f` / Beach House Moving |
| 12 | GBP Posts (30d) | ❓ | Not detectable |
| 13 | Q&A | N/A | Deprecated; use site FAQ + `faqSchema` (not yet wired) |
| 14 | Reviews ≥ 5 | ✅ | `reviewCount: 5`, rating 5.0 |
| 15 | Owner Responses | ❓ | Check GBP dashboard |
| 16 | Services in GBP | ❓ | Mirror 7 `SERVICES` slugs |
| 17 | Booking URL | ⚠️ | Site has `/get-a-quote` — confirm linked in GBP |
| 18 | License in GBP | ⚠️ | **IM4125** on site — add to GBP description |
| 19 | Social profiles | ✅ | Facebook + Google `sameAs` |
| 20 | Founded | ✅ | `2025` in about schema/copy |

**Inferred GBP completeness: ~76%** of verifiable web-linked fields.

### Suggested GBP description (≤750 chars)

> Beach House Moving is a locally owned, licensed and insured moving company serving Walton, Okaloosa, and Bay Counties on Florida's Emerald Coast. Owner-operated 4-person crew on every job. Residential, local, long-distance, packing, storage, delivery, and junk removal. FL Mover Reg. #IM4125. Available 24/7. Free estimates: (850) 842-1962 · beachhousemoving.xyz

---

## 2. Review Intelligence

| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| Total reviews (site) | 5 | ≥10 local pack | ⚠️ Below pack threshold |
| Average rating | 5.0 | ≥4.5 consumer trust | ✅ |
| Written reviews | 4/5 | — | ✅ |
| Schema `aggregateRating` | Sitewide + `/reviews` | Page-specific preferred | ⚠️ |
| Review link | `g.page/.../review` | — | ✅ |
| Velocity | Unknown | New review ≤18 days | ❓ Monitor in GBP |

**Testimonials on homepage:** `FLAGS.SHOW_TESTIMONIALS: true` — social proof visible above fold on `/`.

---

## 3. Schema & Maps Parsing

### Sitewide (`movingCompanySchema`)

- **Types:** `MovingCompany`, `HomeAndConstructionBusiness` ✅
- **`areaServed`:** 3 `AdministrativeArea` + 20+ `City` entities ✅
- **`geo`:** 5 decimal places via `toFixed(5)` ✅
- **`sameAs`:** Facebook + Google g.page ✅
- **`aggregateRating`:** Present sitewide ⚠️ (see local SEO report)
- **SAB address:** Locality/region/ZIP only — no `streetAddress` ✅

### County pages (`countyAreaSchema`)

- Per-county `@id`, `branchOf` → `/#business` ✅
- Scoped `areaServed` per county ✅

### Neighborhood pages (inline schema)

| Property | Status |
|----------|--------|
| `branchOf` | ✅ |
| `areaServed` City + AdministrativeArea | ✅ |
| `geo` | ⚠️ 3-decimal lat/lng (should match 5-decimal sitewide) |
| `BreadcrumbList` | ✅ 4-level |
| `Service.description` | ❌ Missing |
| `FAQPage` | ❌ Not emitted despite on-page FAQs |

---

## 4. Map Embed Analysis

```614:618:src/lib/content.ts
export const MAP_EMBED = {
  src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1535152.0556600732!2d-87.45865950746075!3d29.580061863225904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c49ab7600a457f%3A0x5c504eb0f4ca7c79!2sBeach%20House%20Moving!5e0!3m2!1sen!2sus!4v1780542136877!5m2!1sen!2sus',
  title: 'Beach House Moving service area map — Walton, Okaloosa & Bay Counties, Florida',
} as const
```

| Check | Result |
|-------|--------|
| Place name in embed URL | ✅ `Beach%20House%20Moving` |
| Place ID fragment | ✅ `0x2c49ab7600a457f` |
| Lazy loading | ✅ `loading="lazy"` on iframe |
| Used on contact | ✅ |
| Used on service-areas hub | ✅ |
| SAB street pin suppressed in UI | ✅ (embed shows business listing, not mailed street in copy) |

**Improvement:** Consider a **service-area polygon** or multi-pin embed only if GBP supports it for SAB; current single-place embed is appropriate for a verified listing.

---

## 5. Cross-Platform NAP Matrix

| Platform | On-site signal | Action |
|----------|----------------|--------|
| Google Business Profile | ✅ g.page + embed + review link | Optimize dashboard (services, booking URL, photos) |
| Facebook | ✅ `facebook.com/beachhousemovingfl` | Keep NAP consistent |
| Bing Places | ⚠️ `BingSiteAuth.xml` only | **Claim & verify** — critical for ChatGPT |
| Apple Business Connect | ❓ | **Claim** (27% usage growth, BrightLocal 2026) |
| Yelp | ❓ | Create listing — AI local source |
| BBB | ❓ | Create listing — verification + AI source |
| OpenStreetMap | ❓ Not in repo | Optional Nominatim check |

**Public NAP rule maintained:** Name + Phone + Service Area only in UI.

---

## 6. Geo-Grid & Competitor Intelligence

**Not available at Tier 0.** Requires DataForSEO `google_local_pack_serp` or manual grid tool.

**Competitor set to track (suggested):** other “movers” / “moving company” results for:

- `movers santa rosa beach fl`
- `movers 30a fl`
- `movers destin fl`
- `movers panama city beach fl`

---

## 7. Programmatic Location Pages (26 neighborhoods)

Build output confirms SSG paths, e.g.:

- `/service-areas/walton-county/seaside`
- `/service-areas/walton-county/30a`
- `/service-areas/okaloosa-county/destin`
- `/service-areas/bay-county/panama-city-beach`
- … +22 more

| Quality gate | Assessment |
|--------------|------------|
| Unique intros | ✅ Per `NEIGHBORHOODS[].intro` |
| Local landmarks | ✅ Per page |
| Conditional services | ✅ Luxury/condo/military routing |
| Image deduplication | ⚠️ Several shared assets |
| Crawl discovery | ✅ Hub index + county cards + sitemap |

**Risk level:** Low–medium (26 pages, strong differentiation; watch image/template sameness).

---

## 8. Technical Maps / Crawl Signals

| Item | Status |
|------|--------|
| `sitemap.xml` | ✅ HTTP 200 |
| `robots.txt` + `host` | ✅ Apex canonical |
| IndexNow key file | ✅ `public/11781a711fe74e7d385896e222cbd2ad.txt` |
| `llms.txt` | ✅ Service area + communities listed |
| `manifest.webmanifest` | ✅ Built |
| Static `lastModified` in sitemap | ⚠️ All `2026-06-04` — weak change signal |

---

## Top 10 Maps Priorities

| # | Priority | Action |
|---|----------|--------|
| 1 | **Critical** | GBP: link **appointment URL** → `/get-a-quote` |
| 2 | **Critical** | Bing Places + Apple Business Connect claim (NAP match) |
| 3 | **High** | Review cadence: 18-day minimum new Google review |
| 4 | **High** | GBP secondary categories + populated **Services** list |
| 5 | **High** | Upload **10+ GBP photos** from `/public/images/` fleet/move set |
| 6 | **Medium** | Yelp + BBB listings (AI citation sources) |
| 7 | **Medium** | Fix neighborhood `geo` to 5-decimal; enrich `Service` JSON-LD |
| 8 | **Medium** | Emit `FAQPage` schema on FAQ-bearing pages |
| 9 | **Low** | Tier 1 geo-grid baseline (Destin, 30A, PCB keywords) |
| 10 | **Low** | OSM/Nominatim presence check for NAP |

---

## Limitations Disclaimer

Cannot verify without paid/live APIs:

- Exact GBP category set, photo count, post frequency
- Share of Local Voice / geo-grid ranks
- Review velocity chart
- Competitor radius mapping
- Automated multi-directory NAP diff

**Unlock:** DataForSEO MCP (`local_business_data`, `business_listings`, `google_local_pack_serp`).

---

*Paired report: `LOCAL-SEO-ANALYSIS-beachhousemoving.xyz.md` · Codebase: `/home/angsec/Projects/beach-house-moving`*
