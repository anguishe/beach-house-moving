# Beach House Moving — SEO / Entity Action Plan

**Generated:** 2026-06-14 | **Full report:** `FULL-AUDIT-REPORT-2026-06-14.md` | **Health Score: 71/100**

Findings from the report, re-sorted into a sequenced, ID'd fix queue. Each item is surgical (Karpathy rules: minimum viable change, no drive-by refactors). IDs cross-reference the report's dimensions. **This plan is a fix queue only — nothing here was applied; the audit pass changed no source.**

---

## CRITICAL — Fix Immediately

_None that break the build or deindex the site._ The robots/sitemap/canonical plumbing is sound and no money page is noindexed. The highest-severity items below are HIGH (measurable ranking/conversion loss), not Critical. Start at H1.

---

## HIGH — Fix This Week

### H1 · Make the neighborhood "alt FAQ" city-specific (kills 26-URL verbatim FAQPage duplication)
**File:** `src/app/service-areas/[county]/[neighborhood]/page.tsx:99,110-116` + add a field to `NEIGHBORHOODS` in `content.ts`.
**Impact:** Removes the single largest duplicate-content/duplicate-schema signal (Dim 1, 3, 4). Converts 26 near-identical FAQ blocks into 26 unique ones — directly addresses the "Crawled — not indexed" risk.
**Fix:** Add a `faqs?: {q,a}[]` (1–2 city-specific Q&As) per neighborhood, then:
```ts
// before
const altFaq = nbIndex % 2 === 0 ? FAQS[1] : FAQS[13]
const neighborhoodFaqs = [
  { q: `Does Beach House Moving serve ${nb.name}?`, a: `Yes — …` },
  altFaq,
] as const
// after
const neighborhoodFaqs = [
  { q: `Does Beach House Moving serve ${nb.name}?`, a: `Yes — …` },
  ...(nb.faqs ?? []),   // city-specific access/timing/landmark Q&As
] as const
```
Keep the license/insurance fact as a plain visible `TrustStrip` line, not FAQPage schema replicated ×13.

### H2 · Enrich the top ~12 neighborhood pages to 300–500+ genuinely-local words
**File:** `src/lib/content.ts` (`NEIGHBORHOODS` `introExtended`).
**Impact:** Turns a thin-page liability into rankable local pages (Dim 3). Priority order from the report's enrichment queue: Destin, Santa Rosa Beach, 30A, Miramar Beach, Rosemary Beach, Seaside, Panama City Beach, Niceville, Fort Walton Beach, Inlet Beach, Freeport, Crestview.
**Fix:** Extend each with 2–3 `introExtended` paragraphs of town-only material (named streets, HOAs, access quirks, timing) — the 6 existing `introExtended` towns (Destin 188w, Lynn Haven 140w, Dune Allen 136w) are the quality bar. Pattern already supported by the template (`page.tsx:228-236`).

### H3 · Decide keep-enrich vs demote for the thinnest towns (owner decision)
**File:** `src/lib/content.ts` + `[county]/page.tsx` (listing section).
**Impact:** Stops the lowest-value sub-50-word doorway pages from diluting crawl budget (Dim 3).
**Fix:** For WaterSound (34w), Seagrove (35w), Sandestin (41w), WaterColor (43w) — either enrich to 300+ words **or** demote to a rich anchor-linked listing inside the Walton county page and drop the standalone route from `generateStaticParams`/sitemap. **Do not delete unilaterally — confirm with owner.**

### H4 · Fire a conversion event on ContactForm success
**File:** `src/components/forms/ContactForm.tsx:32-35`.
**Impact:** `/contact` submissions are currently invisible in GA4 (Dim 5). Silent conversions = unmeasurable channel.
**Fix:**
```ts
// in onSubmit, after res.ok:
if (res.ok) {
  trackContactLead()          // new helper in gtag.ts, pushes 'generate_lead' (or 'form_submit')
  setStatus('success'); form.reset(); return
}
```
Add `trackContactLead()` to `gtag.ts` mirroring `trackQuoteLead`, with `event_category: 'contact_form'`.

### H5 · Resolve the review-schema honesty risk (owner decision)
**File:** `src/lib/structured-data.ts:266-405` (`reviewsWithTextSchema`, `reviewsAggregateRatingSchema`), `src/app/reviews/page.tsx:53,71`, `src/app/page.tsx:38`.
**Impact:** Marking up Google-sourced reviews as first-party `Review`/`aggregateRating` risks rich-result suppression or manual action (Dim 2, 9).
**Fix (choose one):** (a) **Remove** `reviewsWithTextSchema` Review items + drop `includeRating` on home until the live Google Places path is enabled (it returns first-party-eligible data once `NEXT_PUBLIC_GOOGLE_PLACE_ID` is set — see M-tier/Manual); **or** (b) collect first-party reviews (your own form) and mark up only those. Keep visible Google quotes as social proof without `Review` schema.

---

## MEDIUM — Fix Within a Month

### M1 · Fix wrong/shared hero images on neighborhood pages
**File:** `src/lib/content.ts` (`NEIGHBORHOODS[].image`).
**Impact:** Visual de-duplication + correct alt text (Dim 3, 8). Confirmed live: Grayton & Blue Mountain load the Santa Rosa Beach photo.
**Fix:** Re-shoot or reassign so Grayton/Blue Mountain/Dune Allen/Seagrove leave `move-srb.jpg`; give the 7 east-30A towns distinct images; replace generic `truck-*`/`fleet-*` on Sandestin/Destin/Freeport/DeFuniak/Crestview/Fort Walton/Shalimar. Until new photos exist, at minimum diversify so no two adjacent towns share one.

### M2 · Add a tracked `/review` redirect + `review_intent` event
**File:** new `src/app/review/route.ts`; update `reviews/page.tsx:158`, `Footer.tsx:69`.
**Impact:** Makes review-acquisition clicks countable (Dim 5, 9).
**Fix:**
```ts
// src/app/review/route.ts
import { NextResponse } from 'next/server'
import { REVIEWS_PAGE_META } from '@/lib/content'
export function GET() { return NextResponse.redirect(REVIEWS_PAGE_META.googleReviewLink, 302) }
```
Point CTAs at `/review`; fire `review_intent` onClick before navigation.

### M3 · Replace pricing "Call for info" placeholders with honest ranges
**File:** `src/app/pricing/page.tsx:56-77,140`.
**Impact:** AEO citability + removes the prose/table promise mismatch (Dim 4, 10).
**Fix:** Fill `typicalMoveRows[].time` with owner-confirmed hour ranges (e.g. "Studio/1BR ~3–5 hrs"), or remove the table and keep the honest "billed hourly" narrative. Resolve the `TODO` at line 140.

### M4 · Add owner `Person` / `founder` + `hasCredential` to schema
**File:** `src/lib/structured-data.ts:77-143` (`movingCompanySchema`), `290-316` (`aboutPageSchema`).
**Impact:** E-E-A-T entity payload (Dim 2, 6).
**Fix:** Add `founder: { '@type':'Person', name:'Joshua B McGrew', url:`${base}/about` }` to the MovingCompany node; add `hasCredential: { '@type':'EducationalOccupationalCredential', credentialCategory:'license', name:'FL Mover Registration #IM4125', recognizedBy:{'@type':'GovernmentOrganization', name:'Florida Dept. of Agriculture & Consumer Services'} }`; add a `Person` entity (or `mainEntity` `employee`/`founder`) on `aboutPageSchema`.

### M5 · GalleryStrip — stop shipping unoptimized full-res duplicates
**File:** `src/components/sections/GalleryStrip.tsx:67-73`.
**Impact:** ~3MB of avoidable homepage image payload (Dim 8).
**Fix:** Remove `unoptimized` on the aria-hidden duplicate track and add the same `sizes="(max-width: 768px) 288px, 384px"` as the primary track.

### M6 · Track email clicks (`email_click`)
**File:** `src/components/layout/Footer.tsx:109-115` (+ any other `mailto:`).
**Impact:** Closes the email channel measurement gap (Dim 5).
**Fix:** Wrap mailto in a small client handler firing `trackEvent('email_click','email','footer')`.

### M7 · Reconcile event taxonomy with the documented canonical set
**File:** `src/lib/gtag.ts` + GTM container config.
**Impact:** Consistent, debuggable analytics (Dim 5).
**Fix:** Either adopt `form_submit`/`quote_start`/`email_click`/`review_intent` in code, or update the project's 09 standard to the GA4-recommended `generate_lead`/`contact` the code actually uses — and ensure GTM triggers match exactly one of them. Add `quote_start` on first quote-form field focus.

### M8 · Fix dangling `serviceSchema.provider` @id + 24/7 hours representation
**File:** `src/app/service-areas/[county]/[neighborhood]/page.tsx:159`; `src/lib/structured-data.ts:96-103`.
**Impact:** Valid schema graph (Dim 2).
**Fix:** Change provider `@id` to `${base}/#business`. Change 24/7 hours to `opens:'00:00', closes:'23:59'` (or add `dayOfWeek` with a clear all-week open).

---

## LOW — Backlog

### L1 · Pre-shrink heavy source images
`public/images/circular-logo.png` (728KB), `crew-gym-equipment-liftgate.jpg` (699KB), `loaded-liftgate-coastal-home.jpg` (609KB), `liftgate-blankets-coastal-home.jpg` (597KB). Compress/resize at source (Dim 8).

### L2 · Dynamically import the hero motion layer
`src/components/sections/HeroSection.tsx:6` — `dynamic()` the framer-motion parallax/ken-burns so it leaves the homepage first-load bundle. Reduced-motion already respected (Dim 8).

### L3 · Stabilize neighborhood sitemap signals
`src/app/sitemap.ts:89-97` — `changeFrequency:'weekly'` vs stale `lastModified:'2026-05-01'`; set per-route real content-change dates and stop touching all 26 at once (Dim 1).

### L4 · Move `/privacy-policy` off `BUILD_DATE`
`src/app/sitemap.ts:69` — use a real static date so it stops re-stamping every build (Dim 1).

### L5 · Normalize numeral-vs-word counts
`src/lib/content.ts` — pick "four owners" / "three-truck" (or numerals) consistently (Dim 6).

### L6 · Add a quote action to the sticky mobile bar
`src/components/layout/Navbar.tsx:167-178` — split call/quote to capture form-preferring mobile users (Dim 7).

### L7 · Document or route the Ahrefs analytics tag
`src/app/layout.tsx:52-56` — add to INTEGRATIONS.md or fold into GTM so "GTM is the only analytics" holds (Dim 5).

---

## MANUAL / OFF-REPO TASKS (human, not code)

| ID | Task | Standard to hit | Why it's manual |
|---|---|---|---|
| MAN-1 | **GSC indexation recovery** — submit the cleaned neighborhood URLs after H1–H3; watch "Crawled-not-indexed"/"Duplicate" in Pages report; request indexing on enriched towns | All 53 URLs indexed; 0 "duplicate without canonical" | Requires Search Console access |
| MAN-2 | **Verify GTM/GA4 actually fire** + mark Key Events | `generate_lead`, `contact`/`phone_click` flowing; conversions marked in GA4 | Live tag firing isn't code-verifiable |
| MAN-3 | **Enable live Google reviews** — set `NEXT_PUBLIC_GOOGLE_PLACE_ID` in Vercel (key already set per `google-reviews.ts:17`); redeploy | Live rating/count replaces hardcoded 9; resolves H5(a) | Needs GBP Place ID + Vercel env |
| MAN-4 | **Confirm real GBP review count/value** vs schema's 9/5.0 | Schema matches GBP exactly | GBP data not in repo |
| MAN-5 | **Bing Webmaster + IndexNow** — confirm Bing WMT verified (`BingSiteAuth.xml` present); confirm IndexNow ping succeeds post-deploy | Bing indexing live (feeds Copilot/ChatGPT) | External console |
| MAN-6 | **Claim Bing Places + Apple Business Connect; add to OpenStreetMap** | NAP parity across Google/Bing/Apple/OSM | Per session memory: Bing/Apple unclaimed, OSM not listed — real AI-dataset gap |
| MAN-7 | **Citation NAP consistency audit** (directories) | (850) 842-1962 + SAB (no street) identical everywhere | Off-site directories |
| MAN-8 | **Review velocity / QR-SMS system** | Steady first-party + Google review flow via `/review` (after M2) | Operational |
| MAN-9 | **Live Lighthouse + CrUX** on home + a service + a neighborhood | LCP < 2.5s, INP < 200ms, CLS < 0.1 | Needs live run; Dim 8 is code-review only |
| MAN-10 | **Rich Results Test** on home/service/county/neighborhood/reviews + confirm www→apex & http→https 308 | Valid MovingCompany/Service/FAQPage/Breadcrumb; single canonical host | WebFetch can't read live `<head>`/JSON-LD |
| MAN-11 | **Verify canonical tags render** in live `<head>` (view-source) | Self-referential apex canonical on all pages | Head-tag not readable via fetch |

---

## DPOS Growth Bands

**Quick Wins (0–30 days)** — H1 (city-specific FAQ), H4 (contact tracking), H5 (review schema decision), M2 (`/review` redirect), M3 (pricing ranges), M5 (gallery unoptimized), M1 (worst hero images), MAN-2, MAN-3, MAN-10.
**Foundation (30–90 days)** — H2 (enrich top-12 towns), H3 (demote/merge thinnest), M4 (Person/credential schema), M6/M7 (email + taxonomy), M8 (schema fixes), L1–L4, MAN-1 (GSC recovery), MAN-5/MAN-9.
**Authority (90–180 days)** — finish neighborhood enrichment to 500+, build out `/resources` cluster + internal links, MAN-6 (Bing/Apple/OSM), MAN-7 (citations), MAN-8 (review velocity), offer architecture (Dim 7 CONCERN).
**Scale (180 days+)** — expand into adjacent towns only after the existing 26 are non-thin; programmatic guardrails (min-word gate before a neighborhood ships); designed launch/risk-reversal offer A/B.

---

## Estimated Impact by Priority

| Group | Effort | Impact |
|---|---|---|
| H1, H4, H5 | ~3–4 hrs | Removes top duplicate-schema + honesty risks; restores contact-form measurement. Biggest indexation + analytics unlock. |
| H2, H3 | ~8–12 hrs | Converts 26 thin pages into ~12–15 rankable local pages; resolves the core crawl-budget drag. |
| M1–M8 | ~6–8 hrs | Visual de-dup, review tracking, citable pricing, richer schema, lighter homepage. |
| L1–L7 | ~3–4 hrs | Perf + consistency polish. |
| MANUAL | ongoing | GSC recovery, GBP/Bing/Apple/citations, live CWV — the off-repo half of ranking. |

---

## Post-Fix Checklist

1. `npm run type-check` — zero errors.
2. `npm run lint` — zero errors.
3. `npm run build` — succeeds; spot-check `next build` output for first-load JS (Dim 8 budget).
4. Confirm each neighborhood page now has a **unique** second FAQ (no `FAQS[1]`/`FAQS[13]` in FAQPage schema) — view-source a sample.
5. Deploy → `postbuild` IndexNow ping fires (`scripts/ping-indexnow.mjs`).
6. **GSC:** resubmit `/sitemap.xml`; request indexing on enriched towns; monitor Pages report for "Crawled-not-indexed" / "Duplicate" clearing (MAN-1).
7. **Rich Results Test** on home/service/county/neighborhood/reviews — valid MovingCompany/Service/FAQPage/Breadcrumb, no Google-sourced Review markup (MAN-10).
8. **Validators:** Schema.org validator; OG debugger; `curl -I https://www.beachhousemoving.xyz` → 308 → apex (MAN-10).
9. **GA4 real-time:** submit the contact form + click a `/review` link → confirm `generate_lead` and `review_intent` fire (MAN-2).
10. Live **Lighthouse/CrUX** on the 3 sampled pages (MAN-9).

---

*Source of findings: `FULL-AUDIT-REPORT-2026-06-14.md` (same folder).*
