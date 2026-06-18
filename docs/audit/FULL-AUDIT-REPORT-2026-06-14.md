# Beach House Moving — Full Entity / SEO Audit Report

**Date:** 2026-06-14
**Auditor:** Claude Code (claude-opus-4-8) — DPOS senior audit team, read-only pass
**Scope:** Whole repo + live site `https://beachhousemoving.xyz`. 53 indexable URLs: home, /services + 8 service pages, /service-areas hub + 3 county pages + 26 neighborhood pages (17 Walton / 6 Okaloosa / 3 Bay), /about, /reviews, /contact, /get-a-quote, /pricing, /resources hub + 6 posts, /privacy-policy. (+ /thank-you noindex.)
**Health Score: 71/100**

> **Read-only confirmation:** No source files were edited, created, renamed, or git-touched. The only files created are this report and the companion `ACTION-PLAN-2026-06-14.md`. Pre-existing root-level `FULL-AUDIT-REPORT.md` / `ACTION-PLAN.md` (dated 2026-06-11) were left untouched — this is a fresh, independent pass written to `/docs/audit/`.

---

## Assumptions Surfaced (verified against code, not guessed)

The audit prompt assumed a structure that differs from the actual repo. Each was reconciled by reading the file:

| Prompt assumption | Reality (verified) |
|---|---|
| `src/config/site.ts` is the NAP source of truth | **No such file.** Source of truth is `src/lib/content.ts` (`BUSINESS`, `SERVICE_AREAS`, `NEIGHBORHOODS`, `FAQS`, …). |
| Schema in `src/lib/schema.ts` | `src/lib/schema.ts` is the **Zod form** schema. JSON-LD lives in `src/lib/structured-data.ts`. |
| Area data in `src/data/areas.ts` | No `src/data/`. Counties + neighborhoods are in `src/lib/content.ts` (`SERVICE_AREAS`, `NEIGHBORHOODS`). |
| `/thanks` is the post-form route | Route is **`/thank-you`** (`src/app/thank-you/page.tsx`). |
| Sitemap stamps `new Date()` (churn) | Sitemap uses **hardcoded date strings** — the build-time-churn hypothesis is **disproven** (see Churn Diagnosis). |
| 26 neighborhood pages | Confirmed: `NEIGHBORHOODS` has 26 entries, split 17/6/3. |

Live `<head>` verification caveat: the WebFetch tool strips `<head>`, so live `<title>`, `<link rel=canonical>`, and JSON-LD `<script>` tags could not be read from the rendered HTML. Those items are scored **from code** (the `buildMetadata`/`JsonLd` helpers that emit them) and flagged **"needs manual verification (view-source / Rich Results Test)."**

---

## Executive Summary

This is a **technically well-built** Next.js 16 site with disciplined conventions: a single content source of truth, central `buildMetadata`, correct robots/sitemap plumbing, SAB-safe NAP, a present-and-good `llms.txt`, IndexNow + Bing parity, and genuinely strong long-form service and resource content. The plumbing that usually breaks inherited sites is sound here. What drags the score is a **cluster of 26 thin, template-dominated neighborhood pages** (avg **66 unique words** each, none near the 500-word standard) carrying **verbatim duplicate FAQ answers in FAQPage schema across 13 URLs each**, plus **conversion-tracking gaps** (the contact form fires no event; no `/review` redirect; taxonomy diverges from the documented set) and a **review-schema honesty risk** (Google-sourced testimonials marked up as first-party `Review` + a hardcoded `aggregateRating` of 9).

**Top 5 critical issues**
1. **26 thin neighborhood pages** (avg 66 unique words; chrome-dominated) — the real indexation liability: a duplicate-without-canonical / crawled-not-indexed cluster. `src/lib/content.ts:1032-1320` + template `src/app/service-areas/[county]/[neighborhood]/page.tsx`.
2. **Verbatim FAQ answers emitted as FAQPage schema across 13 neighborhood URLs each** — `FAQS[1]` (license) on even-index pages, `FAQS[13]` (quote) on odd-index pages. `[neighborhood]/page.tsx:99,110-116,181`.
3. **Reviews schema honesty** — Google-sourced `TESTIMONIALS` (`source: 'Google'`) marked up as first-party `Review` + `aggregateRating` hardcoded to `reviewCount: 9` (won't update; 7 Review items / 8 displayed / 9 claimed don't agree). `structured-data.ts:266-405`, `content.ts:581-588`.
4. **Contact form conversions are untracked** — `ContactForm` fires no `dataLayer` event on success; only the quote form does. `src/components/forms/ContactForm.tsx:32-35`.
5. **Hero-image mismatches across the 30A cluster** — Grayton/Blue Mountain/Dune Allen/Seagrove all load `move-srb.jpg` (Santa Rosa Beach photo, confirmed live); 6 east-30A towns share `move-inlet-beach.jpg`. `content.ts:1054-1320`.

**Top 5 quick wins (< 30 min each)**
1. Make the neighborhood "alt FAQ" **city-specific** instead of `FAQS[1]`/`FAQS[13]` — kills the 26-page verbatim-schema duplication. `[neighborhood]/page.tsx:99`.
2. Add a tracked **`/review` redirect route** (302 → g.page review URL) and fire `review_intent` — currently uncountable. New `src/app/review/route.ts`.
3. Fire a conversion event on **ContactForm** success (mirror `trackQuoteLead`). `ContactForm.tsx:32`.
4. Swap the **wrong hero images** (Grayton/Blue Mountain/Dune Allen/Seagrove off `move-srb.jpg`). `content.ts`.
5. Replace the **pricing "Call for info"** placeholders with honest hour ranges (or remove the TODO table). `src/app/pricing/page.tsx:56-77,140`.

---

## Scoring Breakdown

| # | Category | Score | Weight | Weighted |
|---|---|---|---|---|
| 1 | Indexation & Crawlability | 72/100 | 20% | 14.4 |
| 2 | Technical SEO & Schema | 78/100 | 15% | 11.7 |
| 3 | Service-Area Page Uniqueness & Depth | 52/100 | 15% | 7.8 |
| 4 | Content Quality & AEO | 75/100 | 10% | 7.5 |
| 5 | Conversion Tracking & Analytics | 62/100 | 10% | 6.2 |
| 6 | Entity / NAP / GEO Consistency | 88/100 | 8% | 7.0 |
| 7 | Conversion Paths / CRO | 80/100 | 7% | 5.6 |
| 8 | Performance & Core Web Vitals | 70/100 | 7% | 4.9 |
| 9 | Local Stack (GBP / reviews / citations) | 70/100 | 5% | 3.5 |
| 10 | AI Search Visibility | 85/100 | 3% | 2.55 |
| | **TOTAL** | | | **71.2/100** |

> **Estimate-only / code-review-based scores:** #8 Performance (no live Lighthouse run — code-review only), #9 Local Stack (GBP/citations/review velocity are not code-verifiable — only the on-site display + schema are). #5 is partly manual: whether GTM/GA4 actually fire is not code-verifiable. All such items are routed to the MANUAL section of the Action Plan.

---

## Dimension 1 — Indexation & Crawlability (20%) — 72/100

### robots
**PASS** — `src/app/robots.ts`. `User-agent: *` allows `/`, disallows `/api/`, `/thank-you`, `/_next/`. AI crawlers explicitly allowed (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Bytespider, Applebot). `Host` + `Sitemap` emitted. Verified live at `/robots.txt` — matches byte-for-byte.
**NOTE** — CCBot (Common Crawl) is not in the explicit list, but the `*` rule already allows it; allow-all is correct for a local SAB. **INFO** — the per-bot rules carry no `disallow`, so those bots may technically reach `/api/` and `/thank-you`; negligible.

### Per-page robots / noindex sweep
**PASS** — grep of all routes: the only `index: false` are `buildNoIndexMetadata` (used by `/thank-you`, `src/lib/seo.ts:84-95`) and `not-found.tsx:11` (`index:false, follow:true`). **No money page is noindexed.** Home and all 29 service-area pages route through `buildMetadata` → `robots: { index: true, follow: true }` (`seo.ts:40-43`).

### sitemap completeness & churn
**PASS** — `src/app/sitemap.ts` emits every indexable route (10 static + 8 service + 3 county + 26 neighborhood + 6 posts = 53) and **excludes `/thank-you`**. Live `/sitemap.xml` reconciles with the route tree — **no orphans, no extras.**
**GOOD / PASS (churn hypothesis disproven)** — `lastModified` values are **hardcoded date strings** (`'2026-06-04'`, `'2026-06-09'`, `'2026-05-01'`…), *not* `new Date()`. The feared "every URL looks freshly modified on every deploy" churn does **not** occur from the sitemap. (`sitemap.ts:14-104`.)
**FAIL (Low)** — one exception: `/privacy-policy` uses `lastModified: BUILD_DATE` where `BUILD_DATE = new Date().toISOString()...` (`structured-data.ts:12`, `sitemap.ts:69`). That single low-priority URL re-stamps every build (live shows `2026-06-12`). Cosmetic.
**FAIL (Low)** — neighborhood rows set `changeFrequency: 'weekly'` but `lastModified: '2026-05-01'` (6 weeks stale as of audit). Mixed signal; harmless but inconsistent.

### Canonicalisation
**PASS (code)** — `buildMetadata` sets a self-referential absolute canonical: apex, https, no trailing slash (home → `https://beachhousemoving.xyz/`). `metadataBase` set; OG/Twitter absolute. `seo.ts:28-39`. **Needs manual verification** that the live `<head>` renders it (WebFetch can't read head).

### Duplicate-serving (www→apex, http→https)
**NEEDS MANUAL VERIFICATION** — no redirect block in `next.config.mjs`; www→apex and http→https are expected to be handled at the Vercel domain layer, not in code. Verify with `curl -I https://www.beachhousemoving.xyz`.

### Thin / near-duplicate indexation risk
**FAIL (High)** — the 26 neighborhood pages average **66 unique body words** (intro + introExtended only, shared chrome stripped). Distribution (measured from `content.ts`):

- **20 pages ≤ 56 words** (intro-only): WaterSound 34, Seagrove 35, Crestview 40, Sandestin 41, Seaside 42, Miramar Beach 42, DeFuniak Springs 42, Blue Mountain Beach 43, WaterColor 43, Inlet Beach 43, Grayton Beach 44, Panama City 44, Panama City Beach 45, Freeport 46, Niceville 46, Alys Beach 49, Rosemary Beach 49, 30A 51, Santa Rosa Beach 55, Fort Walton Beach 56.
- **6 pages 113–188 words** (have `introExtended`): Shalimar 113, Bluewater Bay 122, Seacrest Beach 124, Dune Allen 136, Lynn Haven 140, Destin 188.

None approach the 500-word standard. Each page wraps that small unique core in identical chrome: a name-swapped direct-answer paragraph (`[neighborhood]/page.tsx:188-194`), a templated `ownerClosing` (one of 4 variants), a services grid, four shared trust badges, and two FAQs (one templated, one verbatim-shared). This is a textbook **crawled-not-indexed / duplicate-without-user-selected-canonical** cluster. Connects to Dimension 3.

### Churn Diagnosis
See dedicated section below.

---

## Dimension 2 — Technical SEO & Schema (15%) — 78/100

### Metadata system
**PASS** — every route exports metadata via central `buildMetadata` (`seo.ts`). Home via `layout.tsx:30-32`; service/county/neighborhood via their `generateMetadata`. Titles/descriptions are per-page and unique (from `content.ts` `metaTitle`/`metaDescription`). Phone present in local descriptions. No hand-rolled `<meta>` found.
**NOTE** — a file-based `src/app/opengraph-image.tsx` exists *and* `buildMetadata` sets an explicit absolute `openGraph.images` (`og-hero.jpg`). Because metadata images win, the dynamic OG route is largely redundant for pages using `buildMetadata`. Harmless; verify no conflicting OG on the social debugger (manual).

### Headings
**PASS** — one `<h1>` per page (verified across home, service, county, neighborhood, about, pricing, reviews). H1→H2→H3 intact; neighborhood/service/county sections use H2, cards H3. Hero `sr-only` H1 prefix on home is valid.

### Schema (src/lib/structured-data.ts, fed from content.ts)
**PASS** — Home emits `MovingCompany` + `HomeAndConstructionBusiness` (correct specific subtype, not generic `LocalBusiness`) with `@id #business`, `foundingDate: '2025'`, `areaServed` (counties + cities), `geo`, `identifier` (FDACS #IM4125 as PropertyValue), SAB-safe `address` (locality/region/zip, **no street**), `sameAs` (Facebook/Google/BBB), `contactPoint`; plus `WebSite` (`@id #website`). Service pages: `Service` + `BreadcrumbList` + `FAQPage` (`services/[slug]/page.tsx:79-86`). County pages: `MovingCompany` stub + `Service` (areaServed = county) + `BreadcrumbList` + `FAQPage` (`[county]/page.tsx:77-84`). All literals trace back to `content.ts` — no inline NAP.

**FAIL (Medium)** — **`founder` Person and `hasCredential` are missing** from the `MovingCompany` node. The FDACS registration is expressed as `identifier`/PropertyValue (`structured-data.ts:115-119`) rather than `hasCredential`, and there is no `founder`/owner `Person`. The named owner "Joshua B McGrew" exists in visible About copy (`content.ts:834`) and in `blogPostingSchema` author, but **not** as a schema entity on `/about` — `aboutPageSchema` (`structured-data.ts:290-316`) has `mainEntity: MovingCompany` only, **no `Person`**. E-E-A-T entity payload is weaker than the standard expects.

**CONCERN (High) — review-schema honesty.** `reviewsWithTextSchema()` (`structured-data.ts:384-405`) emits `Review` items built from `TESTIMONIALS`, which are labeled `source: 'Google'` and described in copy as "verified Google review" (`content.ts:509-574`, `617`). Marking up reviews collected on a third-party platform as first-party `Review` on your own pages is contrary to Google's review-snippet guidelines and risks suppression/manual action. Rendered on `/reviews` (`reviews/page.tsx:53,71`) whenever the live Places API is unavailable — which is **always**, because `NEXT_PUBLIC_GOOGLE_PLACE_ID` is unset (`google-reviews.ts:4`). Needs an owner decision (see Action Plan H-tier).

**CONCERN (Medium) — aggregateRating count.** `aggregateRating` is hardcoded `ratingValue: 5, reviewCount: 9` (`content.ts:581-588`). It's emitted on the **home page** (`movingCompanySchema(origin, true)`, `page.tsx:38`) and **/reviews** (`reviewsAggregateRatingSchema`). But `reviewsWithTextSchema()` yields only **7** Review items (testimonials with text), the page **displays 8**, and the count **claims 9** — three different numbers. The value is static and won't track GBP. If real GBP ≠ 9, the markup is inaccurate; either way it's manual to maintain. Verify the live GBP count and wire it (see Action Plan).

**FAIL (Low)** — neighborhood `serviceSchema.provider` references `{'@id': \`${pageUrl}#business\`}` (`[neighborhood]/page.tsx:159`) but the business node's `@id` is `${base}/#business`. The provider points at a **dangling @id** that is never defined. Should reference `${base}/#business`.

**FAIL (Low)** — 24/7 hours are modeled as `opens: '00:00', closes: '00:00'` (`structured-data.ts:96-103`, `[neighborhood]/page.tsx:144-151`). `opens == closes` is an ambiguous "always open" representation; the unambiguous form is `dayOfWeek: [...]; opens: '00:00'; closes: '23:59'` or `"opens":"00:00","closes":"24:00"`.

**INFO** — Rich Results Test validation is a manual post-step (WebFetch can't read the JSON-LD live).

---

## Dimension 3 — Service-Area Page Uniqueness & Depth (15%) — 52/100

Forensic pass over `content.ts` (`SERVICE_AREAS` ×3, `NEIGHBORHOODS` ×26) + live renders of two adjacent Walton pages.

### Area-native anchors
**GOOD** — every neighborhood carries a **genuinely town-specific** anchor set in `landmarks[]` and woven into `intro`. Examples that pass the "true only here" bar: Grayton Beach → *sandy unpaved streets / Western Lake / Red Bar / Hotz Avenue*; Dune Allen → *Oyster Lake / Allen Loop Road / coastal dune lakes*; Alys Beach → *Caliza Pool / white courtyard homes / Fonville Press*; Rosemary Beach → *cobblestone footpaths / Barrett Square / carriage homes*; DeFuniak Springs → *round natural lake / Chautauqua district*. This is the hardest part to fake and it is present and correct. The anchors are not generic.

### Depth vs the 500-word standard
**FAIL (High)** — as quantified in Dimension 1, **all 26 pages fail**: avg 66 unique words, best (Destin) 188. The unique core is real and local, but it is buried in shared chrome and is 3–10× too short.

### Hero-image correctness
**FAIL (Medium)** — limited photo library (only 5 town-specific photos: `move-srb`, `move-inlet-beach`, `move-miramar-beach`, `move-niceville`, `move-pcb`) is spread across 26 towns, producing real mismatches:
- **Wrong town (Santa Rosa Beach photo `move-srb.jpg`):** Grayton Beach (confirmed live), Blue Mountain Beach (confirmed live), Dune Allen, Seagrove Beach.
- **Inlet Beach photo `move-inlet-beach.jpg` reused on:** 30A, Seaside, WaterColor, WaterSound, Seacrest, Alys Beach, Rosemary Beach (7 east-30A towns).
- **Generic fleet/truck photos (no town):** Sandestin & Destin (`fleet-box-truck`), Freeport/DeFuniak/Crestview (`truck-loaded`), Fort Walton/Shalimar (`truck-dolly`).
- **Acceptable (same locale):** Bluewater Bay → `move-niceville` (it *is* in Niceville); Lynn Haven/Panama City → `move-pcb` (same county).
- **Correct:** Santa Rosa Beach, Inlet Beach, Miramar Beach, Niceville, Panama City Beach.

The alt text is templated `Beach House Moving serving {name}, FL` (`[neighborhood]/page.tsx:220`), so a wrong photo is also a wrong-but-confident alt.

### Pairwise similarity (the duplicate exposure)
**FAIL (Medium)** — the **intros differ** per town (good), so duplication is not in the unique core. It is in the **shared chrome rendered verbatim on all 26**:
1. Direct-answer paragraph: *"Yes — Beach House Moving serves {name}, FL. We are a locally owned, owner-operated moving company offering residential moving, packing, and delivery in {name}…"* (`[neighborhood]/page.tsx:188-194`) — identical but name-swapped on every page.
2. `ownerClosing` — one of 4 fixed strings (`page.tsx:63-74`).
3. FAQ #1 — *"Does Beach House Moving serve {name}?"* identical answer body, name-swapped (×26).
4. FAQ #2 — **verbatim** `FAQS[1]` (13 pages) or `FAQS[13]` (13 pages). See FAQ Dedupe Table.

### Internal linking
**PASS** — hub (`/service-areas`) → county → neighborhood is wired both directions: county pages list their neighborhoods (`[county]/page.tsx:149-180`); neighborhood pages link back via breadcrumb + 4 contextual service links (`getServiceSlugs`, intent-bucketed by luxury/condo/military). No orphans.

### County pages
**PASS (borderline)** — the 3 county pages are materially richer: ~80–150-word unique `description` + unique `whatWeMoveIntro` + **4 genuinely city-specific FAQs each** (`content.ts:109-189`). Still short of 500 unique words on the description alone, but the unique FAQs + city lists carry them. Acceptable; enrich opportunistically.

### Threshold-rule call (keep-and-enrich vs demote)
**CONCERN (owner decision required)** — per the 03 standard, a cluster of 26 sub-100-word pages is itself an indexation drag. Two defensible paths, recommended **per tier** (do not decide unilaterally):
- **Enrich-in-place (recommended for the ~12 highest-value towns):** Destin, Santa Rosa Beach, 30A, Miramar Beach, Rosemary Beach, Seaside, Inlet Beach, Panama City Beach, Niceville, Fort Walton Beach, Freeport, Crestview — these have search volume and real local material to reach 300–500+ words.
- **Demote-to-listing (consider for the thinnest, lowest-volume):** WaterSound (34w), Seagrove (35w), Sandestin (41w), WaterColor (43w), Bluewater Bay — fold into a richer county-page section with an anchor link rather than maintaining standalone sub-50-word doorway pages, *unless* they get enriched. See ranked enrichment queue.

### Ranked enrichment queue (search value × current thinness)
1. **Destin** (188w but top volume; condo/gated/PCS depth available) — push to 500+.
2. **Santa Rosa Beach** (55w, anchor town for the whole site).
3. **30A** (51w, head term).
4. **Miramar Beach** (42w, condos + Sandestin).
5. **Rosemary Beach** (49w, luxury, high intent).
6. **Seaside** (42w, iconic, parking story).
7. **Panama City Beach** (45w, high-rise volume).
8. **Niceville / Fort Walton Beach** (46w/56w, military volume).
9. **Inlet Beach** (43w, 30Avenue growth).
10. **Freeport / Crestview / DeFuniak** (inland growth).
11. Remaining thin Walton 30A towns — enrich or demote per the rule above.

---

## Dimension 4 — Content Quality & AEO (10%) — 75/100

### Duplicate-FAQ forensics
See the FAQ Dedupe Table. Headline: **service pages are clean** (each uses its own unique `SERVICE_DETAILS[slug].faqs`, `service-details.ts:48-389`), **county pages are clean** (unique per-county FAQs). The duplication is concentrated on **neighborhood FAQPage schema** — `FAQS[1]` verbatim on 13 URLs, `FAQS[13]` verbatim on 13 URLs (`[neighborhood]/page.tsx:99`). The homepage renders 15 FAQs **with no FAQPage schema** (deliberately removed — matches recent commits), so the home FAQ is duplicate *visible* content but not schema. The fix is to make the schema'd neighborhood FAQ page-unique.

### Answer-first test (AEO snippet)
**PASS** — sampled home FAQs, 3 service pages, 3 area pages. Most H2-question answers lead with a standalone answer ("Yes — …", "Local moves are billed by the hour…"). Neighborhood pages open with an explicit direct-answer paragraph. Good extraction surface.

### Service pages: What→Who→How→Cost→Why
**GOOD** — `service-details.ts` follows the arc with real operator detail and honest cost framing (hourly + fuel included for local; fixed written quote for long-distance; "no brokering" trust angle). First-person operator experience is present and specific ("we had a standard box truck staged for a Grayton Beach job and spent twenty minutes deciding the safest entry angle"). Strong E-E-A-T/GEO payload.

### Pricing & Resources
**FAIL (Medium) — pricing placeholder.** `/pricing` is otherwise substantive (factors, "what you'll never pay for", "why cheapest costs more" with #IM4125, how-to-estimate), but the "typical move" table shows **"Call for info"** in every time cell (`pricing/page.tsx:56-77`) directly after prose promising *"here's the realistic range we see"* — a copy/promise mismatch and a citability miss (the prompt's own standard: ranges get cited, "call for quote" doesn't). A `TODO` at `pricing/page.tsx:140` confirms it's a placeholder awaiting owner-confirmed ranges.
**GOOD — resources.** `/resources` hub + **6 substantive local guides** (`content/posts.ts`) with `isOwnerNote` E-E-A-T blocks, `BlogPosting` schema, author Person. Not thin placeholders.

---

## Dimension 5 — Conversion Tracking & Analytics (10%) — 62/100

### GTM / analytics load
**PASS (with concern)** — single GTM container `GTM-WNFSB7NT` loaded once `afterInteractive` via `next/script` in `layout.tsx:45-51`, with `<noscript>` iframe (`layout.tsx:62-70`). No hardcoded GA4 (managed in GTM; ID `G-6H4SJSCW0G` referenced only in a comment, `gtag.ts:3`).
**CONCERN (Medium)** — it is **not** the only analytics script: an **Ahrefs Web Analytics** tag also loads (`layout.tsx:52-56`, `+ preconnect line 43`). Defensible, but contradicts the "GTM is the only analytics" standard and adds a second vendor/cookie surface — document it in INTEGRATIONS or route through GTM.

### Form → API → /thank-you → dataLayer chain
**PASS (quote path)** — `QuoteForm.onSubmit` → `POST /api/quote` → on `res.ok` fires `trackQuoteLead()` (`generate_lead`) **then** `router.push('/thank-you')` (`QuoteForm.tsx:43-50`). Conversion fires client-side **before** redirect, so it is countable. Failure path sets `error` and surfaces a tracked call-us fallback — no silent death.
**INFO** — contrary to the prompt's assumption, **`/thank-you` pushes nothing** to `dataLayer` (`thank-you/page.tsx` is a static confirmation). The conversion is the form's `generate_lead`, not a `/thank-you` `form_submit`. Functionally fine, but diverges from the documented design.
**FAIL (High)** — **`ContactForm` fires no event on success** (`ContactForm.tsx:32-35` just sets `status:'success'`). Every `/contact` submission is invisible in GA4. Mirror the quote-form tracking.

### tel: / mailto:
**PASS (phone)** — `TrackedPhoneLink` wraps tel links and fires `trackPhoneClick(location)` everywhere (navbar, mobile bar, hero, footer, county, neighborhood, thank-you, form fallbacks). E.164 `+18508421962` consistent.
**FAIL (Medium — email)** — the footer `mailto:` (`Footer.tsx:109-115`) and the API-side contact links are **not** tracked; there is no `email_click` event anywhere.

### Event taxonomy vs the canonical 09 set
**CONCERN (Medium)** — code fires `generate_lead`, `contact`, `phone_click`, `page_view` (`gtag.ts`, `GtmPageView.tsx`). The documented canonical set is `phone_click, form_submit, booking_click, email_click, quote_start, review_intent`. Overlap is only `phone_click`. The code uses GA4 *recommended* events (`generate_lead`/`contact`) — a legitimate choice — but it does **not** match the project's stated taxonomy. Pick one and make GTM triggers + the standard agree. Missing entirely: `form_submit` (contact), `email_click`, `quote_start`, `review_intent`.

### review_intent / /review redirect
**FAIL (Medium)** — there is **no `/review` redirect route** (confirmed: no `src/app/review/*`). The `/reviews` CTA (`reviews/page.tsx:158`) and footer (`Footer.tsx:69`) link the **raw** `g.page/r/CXl8yvSwTlBcEAI/review` URL with `target=_blank` and **no onClick tracking** — review clicks are uncountable. Add a 302 redirect route + `review_intent`.

### GA4 Key Events / live firing
**NEEDS MANUAL VERIFICATION** — whether GTM/GA4 actually fire and which events are marked Key Events in GA4 is not code-verifiable. Routed to MANUAL section.

---

## Dimension 6 — Entity / NAP / GEO Consistency (8%) — 88/100

**PASS** — all NAP derives from `content.ts` `BUSINESS`. Grep found **no hardcoded phone/address/name bypassing it** (Navbar, Footer, forms, API, schema all import `BUSINESS`). Phone is `(850) 842-1962` / `tel:+18508421962` / `+18508421962` char-for-char everywhere.
**PASS (SAB)** — `address.displayAddress: false` (`content.ts:39`); no template prints `address.street`. Public surfaces show only `serviceAreaLabel`. Schema `address` emits locality/region/zip + country, **no `streetAddress`** (`structured-data.ts:120-126`) — SAB-safe.
**PASS** — canonical facts consistent in **value**: founded 2025, 4 owners, FDACS #IM4125, Walton/Okaloosa/Bay. Used across home subheadline, About, schema, reviews copy.
**FAIL (Low)** — **stylistic** drift in the count rendering: "4-person" (`content.ts:23,56`), "four-person" (`601,804`), "four owners" (`824`), "4 owners"; fleet as "3-vehicle"/"three-vehicle"/"3-truck"/"three-truck". Same numbers, inconsistent numeral-vs-word style. Pick one convention.
**PASS / CONCERN — sameAs.** Facebook (`beachhousemovingfl`), Google (`g.page`), BBB present and emitted; Yelp intentionally empty and filtered out (`content.ts:72`, `structured-data.ts:127-129`). Live-profile validity (and missing platforms per memory: Bing/Apple unclaimed, OSM not listed) is a **manual** local-stack item.

---

## Dimension 7 — Conversion Paths / CRO (7%) — 80/100

**PASS** — sticky mobile call bar (`Navbar.tsx:167-178`): `fixed inset-x-0 bottom-0 z-50`, `lg:hidden`, **safe-area padded** (`pb-[calc(1rem+env(safe-area-inset-bottom))]`), tracked (`mobile-call-bar`). `PageShell`/home `main` reserve `pb-[64px]` so it never overlaps content. **NOTE** — it is **call-only**; consider a split call/quote bar to capture form-preferring users.
**PASS** — one conversion action within a viewport on every template (hero dual CTA; CTA bands on service/county/neighborhood/pricing/about; quote form section on home).
**PASS** — quote form is field-minimal (name, phone, email, type, date, from/to, notes, SMS consent), labels above fields, `type="tel"`/`type="email"`, outcome button "Request My Free Quote" (not "Submit"), friction-reducer copy ("a real person answers"), dedicated `/thank-you`. **NOTE** — phone input has no `inputMode="tel"` (uses `type="tel"`, acceptable).
**PASS** — trust signals layered: hero credential strip + badges (`HeroSection.tsx`), trust strip on inner pages (`TrustStrip`), footer NAP + license + BBB. Real photos throughout (no stock/AI imagery detected).
**PASS (no anti-patterns)** — no autoplay video, no carousel-in-hero, no chat widget, no popups. Hero uses ken-burns + parallax + scroll-progress bar — decorative, and all gated behind `useReducedMotion()`.
**CONCERN (offer architecture)** — as the prompt predicted: strong differentiators ("the owners are the movers", 24/7, free estimates) but **no designed offer** — no founding-customer hook, scarcity, or risk-reversal/speed promise. Recommend an offer (e.g. "Owner on every job — or we make it right", a same-week guarantee, or a launch offer). Owner decision.

---

## Dimension 8 — Performance & Core Web Vitals (7%) — 70/100 *(code-review based — no live Lighthouse run)*

**PASS** — `next/image` everywhere (only raw `<img>` is in `opengraph-image.tsx`, which is `next/og` satori context and **requires** it — not a violation). Hero uses `priority` + `fetchPriority="high"` + `sizes="100vw"` (`HeroSection.tsx:59-67`); inner heroes `priority`; the rest `loading="lazy"` with `sizes`. `next.config.mjs` enables `image/webp`+`image/avif` and 30-day `minimumCacheTTL`.
**PASS** — `next/font` with exactly 2 families (Playfair_Display, Inter), `display: 'swap'`, `adjustFontFallback`. No render-blocking third party except GTM (+ Ahrefs, both `afterInteractive`).
**FAIL (Medium) — GalleryStrip duplicate track ships full-res unoptimized images.** The marquee's aria-hidden second copy renders each of the 12 `GALLERY_PHOTOS` with **`unoptimized`** and **no `sizes`** (`GalleryStrip.tsx:67-73`), i.e. the raw `/images/*.jpg` originals (several 250–700KB) — confirming the prompt's suspicion of "full-size images duplicated alongside `_next/image` versions." ~3MB of extra image payload on the homepage (lazy/below-fold, but real bandwidth + cache cost). The first track is correctly optimized. Fix: drop `unoptimized`, add `sizes`.
**FAIL (Medium) — source images not pre-shrunk.** `liftgate-blankets-coastal-home.jpg` 597KB, `loaded-liftgate-coastal-home.jpg` 609KB, `crew-gym-equipment-liftgate.jpg` 699KB, `circular-logo.png` 728KB, several 300KB+. next/image resizes on delivery, but the logo PNG and the gallery originals (above) are heavy at source.
**NOTE — animation tier in shared client JS.** `framer-motion` is **statically** imported in `HeroSection`, `GalleryStrip`, and `MotionReveal` — it lands in the homepage client bundle rather than a dynamic chunk. Reduced-motion is respected. Consider `dynamic()` for the hero's motion layer to trim first-load JS. Exact kB needs a `next build` run (not available in this read-only pass).
**CONCERN (CLS)** — the Google Map embed (`MAP_EMBED`, rendered on `/service-areas` via `ServiceAreaMap`) — confirm it has explicit width/height/aspect to avoid layout shift (not fully traced this pass).
**INFO** — first-load JS budget vs ~150 kB target = **needs a build run** to confirm.

---

## Dimension 9 — Local Stack (5%) — 70/100 *(code-inferable parts only; rest manual)*

**PASS (display + schema)** — `/reviews` shows first-party display (`ReviewsGrid`/`WrittenReviewsSection`) + aggregateRating; home proof block shows count + 5 stars + quotes. Footer links Facebook + Google profile + BBB (correct hrefs, `rel` set appropriately).
**CONCERN** — the review *schema* honesty issue (Dim 2) and the static count apply here too.
**FAIL (Medium)** — no `/review` acquisition redirect (Dim 5); QR/SMS review system is an operational item — **manual**.
**MANUAL (not code-verifiable)** — GBP optimization, citation NAP consistency across directories, review velocity, Bing/Apple/OSM presence. Per session memory: **GBP confirmed; Bing & Apple unclaimed; OSM not listed** — a real gap for AI/maps datasets. Listed as manual action items with the 03 standard to hit; **not scored as confirmed.**

---

## Dimension 10 — AI Search Visibility (3%) — 85/100

**PASS / GOOD** — `/public/llms.txt` present and well-structured (verified live): sections *Business Summary, Services, Service Areas, What Makes Beach House Moving Different, Frequently Asked Questions, Contact, Links* with **21 URLs** and NAP. A strong, cheap AI-citation artifact.
**PASS** — robots permissive to all major AI crawlers (Dim 1).
**PASS — Bing parity.** IndexNow key file `public/11781a711fe74e7d385896e222cbd2ad.txt` + `postbuild` ping (`package.json` → `scripts/ping-indexnow.mjs`) + `public/BingSiteAuth.xml` + Yandex verification file. Bing (the ChatGPT/Copilot index) is wired.
**PASS (citability)** — money pages render answer-first sentences, first-party facts (#IM4125, 24/7, counties), entity-anchored copy, in clean SSR semantic HTML (App Router server components) — extractable without client JS. Sampled home + 2 service + 2 area pages.
**NOTE** — weak spot is the pricing "Call for info" placeholder (no citable numbers) and the static aggregateRating. Whether Bing Webmaster is actually configured = **manual**.

---

## Service-Area Uniqueness Matrix (29 rows: 3 county + 26 neighborhood)

Unique words = `intro` (+ `introExtended`/`description`) only; shared chrome excluded. "Anchor native?" = at least one landmark true only here. Verdict vs 500-word standard.

| Page | Unique words | Area-native specifics | Shared/boilerplate blocks | #FAQs | FAQs city-specific? | Hero image | Verdict |
|---|---|---|---|---|---|---|---|
| **Walton County** (hub) | ~145 + 4 FAQ | gated 30A gate-holds, boardwalk-only, stilted driveways | TrustStrip, services grid, CTA | 4 | **Yes** | move-inlet-beach | PASS (borderline) |
| **Okaloosa County** | ~95 + 4 FAQ | Eglin/Hurlburt PCS, Destin condo elevators | same | 4 | **Yes** | move-niceville | PASS (borderline) |
| **Bay County** | ~150 + 4 FAQ | PCB towers, Front Beach Rd, Hurricane Michael rebuild | same | 4 | **Yes** | move-pcb | PASS (borderline) |
| Santa Rosa Beach | 55 | north-of-98, Gulf Place, Pt Washington | direct-answer ¶, ownerClosing, badges | 2 | No (templated + FAQS[1]) | move-srb ✓ | FAIL |
| 30A | 51 | Seaside/WaterColor/Rosemary/Alys span | same | 2 | No (+FAQS[13]) | move-inlet-beach | FAIL |
| Grayton Beach | 44 | sandy streets, Western Lake, Red Bar, Hotz Ave | same | 2 | No (+FAQS[1]) | **move-srb ✗ (wrong)** | FAIL |
| Blue Mountain Beach | 43 | highest dune in FL, Creamery, Redfish Lake | same | 2 | No (+FAQS[13]) | **move-srb ✗** | FAIL |
| Seaside | 42 | New Urbanist, Central Square, Ruskin Place | same | 2 | No (+FAQS[1]) | move-inlet-beach ✗ | FAIL |
| WaterColor | 43 | WaterColor Inn, Cerulean Park, Boathouse | same | 2 | No (+FAQS[13]) | move-inlet-beach ✗ | FAIL |
| WaterSound | 34 | Beach Club, Origins, Camp Creek, Lake Powell | same | 2 | No (+FAQS[1]) | move-inlet-beach ✗ | FAIL (thinnest) |
| Seacrest Beach | 124 | lagoon pool, golf-cart paths, Alys/Rosemary rules | same | 2 | No (+FAQS[13]) | move-inlet-beach ✗ | FAIL |
| Alys Beach | 49 | Caliza Pool, white courtyard homes, Fonville Press | same | 2 | No (+FAQS[1]) | move-inlet-beach ✗ | FAIL |
| Rosemary Beach | 49 | cobblestone, Barrett Square, carriage homes | same | 2 | No (+FAQS[13]) | move-inlet-beach ✗ | FAIL |
| Inlet Beach | 43 | 30Avenue, Camp Helen, Lake Powell | same | 2 | No (+FAQS[1]) | move-inlet-beach ✓ | FAIL |
| Dune Allen | 136 | Oyster/Stallworth Lake, Allen Loop Rd, Ed Walline | same | 2 | No (+FAQS[13]) | **move-srb ✗** | FAIL |
| Seagrove Beach | 35 | Seagrove Plaza, Eastern Lake, canopy streets | same | 2 | No (+FAQS[1]) | **move-srb ✗** | FAIL |
| Miramar Beach | 42 | Sandestin, Silver Sands, Scenic Gulf Dr, Baytowne | same | 2 | No (+FAQS[13]) | move-miramar-beach ✓ | FAIL |
| Sandestin | 41 | Baytowne Wharf, Burnt Pine, guard gate | same | 2 | No (+FAQS[1]) | fleet-box-truck (generic) | FAIL |
| Freeport | 46 | Choctawhatchee Bay, Hammock Bay, Hwy 20 | same | 2 | No (+FAQS[13]) | truck-loaded (generic) | FAIL |
| DeFuniak Springs | 42 | round lake, Chautauqua, I-10, historic downtown | same | 2 | No (+FAQS[1]) | truck-loaded (generic) | FAIL |
| Destin | 188 | Harbor/Holiday Isle, Kelly Plantation, Marler Bridge | same | 2 | No (+FAQS[13]) | fleet-box-truck (generic) | FAIL (best depth) |
| Fort Walton Beach | 56 | Eglin/Hurlburt, Okaloosa Island, Brooks Bridge | same | 2 | No (+FAQS[1]) | truck-dolly (generic) | FAIL |
| Niceville | 46 | Bluewater Bay, Boggy Bayou, Rocky Bayou, NWFSC | same | 2 | No (+FAQS[13]) | move-niceville ✓ | FAIL |
| Crestview | 40 | "Hub City", I-10/Hwy 85 crossroads | same | 2 | No (+FAQS[1]) | truck-loaded (generic) | FAIL |
| Shalimar | 113 | Garnier/Poquito Bayou, mid-century, Eglin gates | same | 2 | No (+FAQS[13]) | truck-dolly (generic) | FAIL |
| Bluewater Bay | 122 | Marina, parkway streets, golf, Eglin roots | same | 2 | No (+FAQS[1]) | move-niceville (same locale) | FAIL |
| Panama City | 44 | St. Andrews, the Marina, rebuilt downtown | same | 2 | No (+FAQS[13]) | move-pcb (same county) | FAIL |
| Panama City Beach | 45 | Pier Park, Front Beach Rd, condo towers, Camp Helen | same | 2 | No (+FAQS[1]) | move-pcb ✓ | FAIL |
| Lynn Haven | 140 | North Bay, Sheffield Park, Hwy 77, Cedar Grove | same | 2 | No (+FAQS[13]) | move-pcb (same county) | FAIL |

**Takeaway:** anchors are genuine on all 26 (the hard part is done); depth and per-page FAQ uniqueness are the failures. Counties are the only PASS tier.

---

## FAQ Dedupe Table

Inventory of where each schema'd / rendered FAQ answer appears. "Identical?" = byte-identical answer text across the listed URLs.

| Question (abbrev.) | Answer (first ~12 words) | Appears on | In FAQPage schema? | Identical answer? |
|---|---|---|---|---|
| Is Beach House Moving licensed & insured? (`FAQS[1]`) | "Yes. Beach House Moving is fully licensed and insured in the State…" | Home (visible) + **13 neighborhood pages** (even index: SRB, Grayton, Seaside, WaterSound, Alys, Inlet, Seagrove, Sandestin, DeFuniak, Fort Walton, Crestview, Bluewater Bay, Panama City Beach) | **Yes, on 13 neighborhood URLs** | **Yes — verbatim** |
| How do I get a quote? (`FAQS[13]`) | "Call (850) 842-1962 or fill out the quote form on this site…" | Home (visible) + **13 neighborhood pages** (odd index: 30A, Blue Mountain, WaterColor, Seacrest, Rosemary, Dune Allen, Miramar, Freeport, Destin, Niceville, Shalimar, Panama City, Lynn Haven) | **Yes, on 13 neighborhood URLs** | **Yes — verbatim** |
| Does Beach House Moving serve {name}? | "Yes — Beach House Moving serves {name} and surrounding {county}…" | All **26 neighborhood pages** | **Yes (×26)** | Near-identical (name/county/reg swapped) |
| What areas do you serve? (`FAQS[0]`) | "Beach House Moving serves Walton, Okaloosa, and Bay Counties…" | Home (visible only) | No | n/a |
| How much does a move cost? (`FAQS[2]`) | "Local moves are billed by the hour with no hidden fees…" | Home (visible) + /pricing (visible) | No (pricing has breadcrumb only) | Yes (visible dup, not schema) |
| Do you charge for estimates? (`FAQS[14]`) | "No. Estimates are always free — no deposit…" | Home + /pricing (visible) | No | Yes (visible dup) |
| Service-page FAQs (×6 per service) | unique per service | each `/services/[slug]` | Yes | **No — all unique** ✓ |
| County FAQs (×4 per county) | unique per county | each `/service-areas/[county]` | Yes | **No — all unique** ✓ |

**Blast radius:** the schema-level duplication is entirely the two shared `FAQS` answers replicated across 13 neighborhood URLs each (26 total verbatim emissions). Service & county FAQs are clean. **Fix:** replace the neighborhood "alt FAQ" with a city-specific Q&A (access/timing/landmark-anchored) so each FAQPage is unique; keep the license/insurance fact as a plain visible trust-strip line, not schema'd ×13.

---

## URL Inventory + Indexation Table

Reconciled from the route tree (`src/app/**` + `generateStaticParams`) and live `/sitemap.xml`. **No route is in the tree but missing from the sitemap, and none is in the sitemap but missing from the tree.**

| Route | Source | In sitemap? | Indexable? |
|---|---|---|---|
| `/` | `app/page.tsx` | Y (2026-06-04) | index ✓ |
| `/services` | `app/services/page.tsx` | Y | index ✓ |
| `/services/[slug]` ×7 (excl. junk-removal) | `[slug]/page.tsx` + params | Y | index ✓ |
| `/services/junk-removal` | dedicated `junk-removal/page.tsx` | Y | index ✓ |
| `/service-areas` | `service-areas/page.tsx` | Y | index ✓ |
| `/service-areas/[county]` ×3 | `[county]/page.tsx` + params | Y | index ✓ |
| `/service-areas/[county]/[neighborhood]` ×26 | `[neighborhood]/page.tsx` + params | Y (2026-05-01) | index ✓ |
| `/about` | `about/page.tsx` | Y | index ✓ |
| `/reviews` | `reviews/page.tsx` | Y | index ✓ |
| `/contact` | `contact/page.tsx` | Y | index ✓ |
| `/get-a-quote` | `get-a-quote/page.tsx` | Y | index ✓ |
| `/pricing` | `pricing/page.tsx` | Y | index ✓ |
| `/resources` | `resources/page.tsx` | Y | index ✓ |
| `/resources/[slug]` ×6 | `[slug]/page.tsx` + `POSTS` | Y | index ✓ |
| `/privacy-policy` | `privacy-policy/page.tsx` | Y (BUILD_DATE) | index ✓ |
| `/thank-you` | `thank-you/page.tsx` | **N (correct)** | **noindex ✓** |
| `/not-found` (404) | `not-found.tsx` | N | noindex ✓ |
| `/api/contact`, `/api/quote` | route handlers | N | disallowed ✓ |
| `/opengraph-image`, `/manifest`, `/robots`, `/sitemap` | metadata routes | N (self) | n/a |

**Total indexable URLs in sitemap: 53.** Clean reconciliation; the only nuance is `/services/junk-removal` is served by a dedicated page (excluded from `[slug]` params) yet correctly present in the sitemap.

---

## Churn Diagnosis (plain English: why indexing is slow, and what stops it)

**It is not sitemap churn.** The most common inherited-site killer — `lastModified: new Date()` re-stamping every URL on every deploy — **does not happen here.** The sitemap uses stable hardcoded dates (`sitemap.ts:14-104`); only `/privacy-policy` re-stamps (one trivial URL). So Google is not being told "the whole site changed" on every build.

**The real reason indexing is slow is the thin/duplicate neighborhood cluster.** 26 pages average **66 unique words**, wrapped in identical chrome, and **26 of them emit FAQPage schema containing one of just two verbatim answers** (`FAQS[1]` or `FAQS[13]`) plus a name-swapped direct-answer paragraph and a name-swapped "Does … serve {name}?" Q&A. To Googlebot this looks like a doorway-page cluster: high template-to-unique-content ratio, near-duplicate bodies, and duplicated structured data. The predictable outcomes are **"Crawled — currently not indexed"** and **"Duplicate, Google chose a different canonical"** on the thinnest towns, and slow settling for the rest because crawl budget is spread thin across low-value near-duplicates. The recent heavy edit cadence (frequent commits) compounds the *perception* of instability even though the sitemap dates are stable, because content keeps shifting under those URLs.

**What stops it:** (1) make each neighborhood FAQ **page-unique** (remove the shared `FAQS[1]`/`FAQS[13]` schema emission); (2) **enrich the top ~12 towns to 300–500+ genuinely-local words** and **demote/merge the thinnest sub-50-word towns** into county-page listings; (3) replace the name-swapped boilerplate paragraph with town-specific copy; (4) fix the wrong hero images so each page is also visually distinct; (5) let the sitemap dates settle (stop touching all 26 at once). Do these and the cluster converts from a crawl-budget liability into 12–15 genuinely rankable local pages.

---

## Appendix: File Reference Map

| Issue | File | ~Line |
|---|---|---|
| Thin neighborhood data (avg 66 words) | `src/lib/content.ts` (`NEIGHBORHOODS`) | 1032–1320 |
| Verbatim shared FAQ on 26 pages (FAQPage schema) | `src/app/service-areas/[county]/[neighborhood]/page.tsx` | 99, 110–116, 181 |
| Name-swapped boilerplate direct-answer ¶ | same | 188–194 |
| Dangling `serviceSchema.provider` @id | same | 159 |
| Wrong hero images (move-srb on Grayton/BMB/Dune Allen/Seagrove) | `src/lib/content.ts` | 1058,1068,1152,1166 |
| Review schema from Google-sourced testimonials | `src/lib/structured-data.ts` (`reviewsWithTextSchema`) | 384–405 |
| Hardcoded aggregateRating 9 / 5.0 | `src/lib/content.ts` (`REVIEWS_PAGE_META`) | 581–588 |
| Missing founder Person / hasCredential | `src/lib/structured-data.ts` (`movingCompanySchema`, `aboutPageSchema`) | 77–143, 290–316 |
| ContactForm fires no conversion event | `src/components/forms/ContactForm.tsx` | 32–35 |
| No `/review` redirect; raw g.page link untracked | `src/app/reviews/page.tsx`, `src/components/layout/Footer.tsx` | 158 / 69 |
| Email mailto untracked (no email_click) | `src/components/layout/Footer.tsx` | 109–115 |
| Event taxonomy diverges from canonical set | `src/lib/gtag.ts` | 33–63 |
| Second analytics vendor (Ahrefs) | `src/app/layout.tsx` | 52–56 |
| GalleryStrip duplicate track ships unoptimized full-res | `src/components/sections/GalleryStrip.tsx` | 67–73 |
| Heavy source images (600–728KB) | `public/images/*` | — |
| framer-motion static import (homepage JS) | `src/components/sections/HeroSection.tsx` | 6 |
| Pricing "Call for info" placeholder + TODO | `src/app/pricing/page.tsx` | 56–77, 140 |
| 24/7 opens==closes ambiguity | `src/lib/structured-data.ts` | 96–103 |
| privacy-policy lastmod = BUILD_DATE | `src/app/sitemap.ts` / `structured-data.ts` | 69 / 12 |
| Numeral-vs-word count style drift | `src/lib/content.ts` | 23,56,601,804,824 |

---

*Companion fix queue: `ACTION-PLAN-2026-06-14.md`.*
