# GEO Analysis — beachhousemoving.xyz
**Date:** 2026-06-04  
**Framework:** AI Search / Generative Engine Optimization  
**Google's position:** Optimizing for generative AI search is still SEO. AEO/GEO are rebranded labels for the same fundamentals applied to AI-search surfaces.

---

## GEO Readiness Score: 56/100

| Dimension | Score | Weight |
|-----------|-------|--------|
| Citability | 14/25 | 25% |
| Structural Readability | 14/20 | 20% |
| Multi-Modal Content | 6/15 | 15% |
| Authority & Brand Signals | 7/20 | 20% |
| Technical Accessibility | 15/20 | 20% |

---

## Platform Breakdown

| Platform | Score | Key Bottleneck |
|----------|-------|----------------|
| Google AI Overviews | 63/100 | No definition blocks, no date metadata |
| Bing Copilot | 58/100 | Bing verified + IndexNow ✓, missing `dateModified` |
| Perplexity | 35/100 | No Reddit presence, no community validation |
| ChatGPT | 28/100 | No Wikipedia, no Reddit, no YouTube citations |

**Only 11% of domains are cited by both ChatGPT and Google AIO.** ChatGPT heavily sources Wikipedia (47.9%) and Reddit (11.3%) — Beach House Moving has zero presence on either, which is the largest single gap.

---

## AI Crawler Access Status

**robots.ts:** `userAgent: '*', allow: '/'` — wildcard rule allows everything.

| Crawler | Owner | Status |
|---------|-------|--------|
| GPTBot | OpenAI / ChatGPT | ✅ Allowed (wildcard) |
| OAI-SearchBot | OpenAI | ✅ Allowed (wildcard) |
| ChatGPT-User | OpenAI | ✅ Allowed (wildcard) |
| ClaudeBot | Anthropic | ✅ Allowed (wildcard) |
| PerplexityBot | Perplexity | ✅ Allowed (wildcard) |
| CCBot | Common Crawl | ✅ Allowed (wildcard) |
| anthropic-ai | Anthropic | ✅ Allowed (wildcard) |
| Bytespider | ByteDance | ✅ Allowed (wildcard) |

**Assessment:** All AI crawlers are currently allowed. The wildcard is functional but provides no nuance. Adding explicit named rules for key crawlers (GPTBot, ClaudeBot, PerplexityBot) is a minor improvement that signals intentionality.

**Optional:** Block `CCBot` (Common Crawl training data) if the owner does not want content used for LLM training datasets. This has no impact on search visibility.

```ts
// src/app/robots.ts — enhanced version
return {
  rules: [
    { userAgent: '*', allow: '/' },
    // Explicit AI search crawler allowlist (already allowed above, but signals intent)
    { userAgent: 'GPTBot', allow: '/' },
    { userAgent: 'OAI-SearchBot', allow: '/' },
    { userAgent: 'ClaudeBot', allow: '/' },
    { userAgent: 'PerplexityBot', allow: '/' },
  ],
  sitemap: `${origin.origin}/sitemap.xml`,
  host: origin.origin,
}
```

---

## llms.txt Status

**Status: MISSING** — No `/llms.txt` found at project root or in `/public/`.

The evidence base for llms.txt as a citation lever is weak (not used by Google, Bing, or OpenAI for ranking decisions per Mueller/Illyes). However, it is a low-effort signal of AI-readiness and some smaller AI search systems do read it. Recommended for completeness.

**Ready-to-use template** (create at `public/llms.txt`):

```
# Beach House Moving
> Locally owned, fully licensed movers serving Walton, Okaloosa, and Bay Counties on Florida's Emerald Coast. Licensed under Florida FDACS Mover Registration #IM4125. Available 24/7.

## Services
- [Residential Moving](https://beachhousemoving.xyz/services/residential-moving): Full home moves — wrap, pad, load, and set up at the new location.
- [Local Moving](https://beachhousemoving.xyz/services/local-moving): Hourly rate, no hidden fees, crew that knows the 30A corridor.
- [Long-Distance Moving](https://beachhousemoving.xyz/services/long-distance-moving): Moves out of the Panhandle, coordinated door-to-door.
- [Packing & Unpacking](https://beachhousemoving.xyz/services/packing-unpacking): Materials supplied, fragile items wrapped, boxes hauled away.
- [Storage Solutions](https://beachhousemoving.xyz/services/storage): Secure storage between closings, renovations, or rental turnovers.
- [Delivery Services](https://beachhousemoving.xyz/services/delivery): Furniture and appliance delivery, single items to full loads.
- [Junk Removal](https://beachhousemoving.xyz/services/junk-removal): Furniture, appliances, debris, renovation waste hauled and disposed responsibly.

## Service Areas
- [Walton County](https://beachhousemoving.xyz/service-areas/walton-county): 30A, Santa Rosa Beach, Miramar Beach, Freeport, DeFuniak Springs
- [Okaloosa County](https://beachhousemoving.xyz/service-areas/okaloosa-county): Destin, Fort Walton Beach, Niceville, Crestview, Eglin AFB, Hurlburt Field
- [Bay County](https://beachhousemoving.xyz/service-areas/bay-county): Panama City, Panama City Beach, Lynn Haven, Callaway, Springfield

## Key Facts
- Phone: (850) 842-1962
- Email: beachhousemoving@gmail.com
- Florida Mover Registration: #IM4125 (FDACS)
- Hours: Available 24/7, seven days a week
- Fleet: Three fully equipped trucks (box trucks + Sprinter van)
- Established: 2025
- Service model: Service-area business — crew comes to you
```

---

## Brand Mention Analysis

| Platform | Status | Impact on AI Citations |
|----------|--------|----------------------|
| Google Business Profile | ✅ Confirmed | High — local AI Overviews |
| Facebook | ✅ Active (`@beachhousemovingfl`) | Low for AI citations |
| Wikipedia | ❌ Not listed | Critical gap for ChatGPT (47.9% of citations) |
| Reddit | ❌ No presence | Critical gap for Perplexity (46.7%) + ChatGPT |
| YouTube | ❌ No channel | YouTube mentions correlate ~0.737 with AI citations (strongest signal per Ahrefs 2025) |
| LinkedIn | ❌ Not listed | Moderate AI citation impact |
| Yelp | ❌ Not listed | Moderate — feeds Apple Maps, Bing |
| BBB | ❌ Not listed | Trust signal |
| Nextdoor | ❌ Unknown | High local relevance |

**Key insight (Ahrefs Dec 2025 study, 75,000 brands):** Brand mentions correlate 3x more strongly with AI visibility than backlinks. YouTube mentions have the highest correlation (~0.737). A short YouTube video (moving tips, 30A tour, before/after move) would materially improve ChatGPT and Perplexity citation rates.

---

## Passage-Level Citability

**Optimal passage length for AI citation: 134–167 words.**

### Best Current Citation Candidates

**FAQ answers** (strongest candidates — self-contained, factual, in FAQPage JSON-LD):

> "What areas does Beach House Moving serve?" → Covers all three counties + cities + long-distance offer. **~70 words** — slightly short, could expand.

> "Do you handle beach-house and vacation-rental moves?" → Specific, local, distinctive. **~45 words** — expand to 134-167 for optimal citability.

> "Do you move military families near Eglin AFB or Hurlburt Field?" → Unique, specific, high intent. **~30 words** — the best niche differentiation on the site, currently too short for citation.

### Walton County Service Area Description (~195 words)
Slightly over the optimal range but contains highly citable local specifics (Rosemary Beach, boardwalk access, stilted driveways). Already strong — trim slightly or break into two focused blocks.

### Missing Definition Blocks

No page on the site opens with a clean "Beach House Moving is..." definition sentence. AI systems prefer content that answers "What is X?" in the first 40–60 words. 

**Recommended addition to homepage and About page:**

> "Beach House Moving is a locally owned moving company serving Walton, Okaloosa, and Bay Counties on Florida's Emerald Coast. Licensed under Florida FDACS Mover Registration #IM4125 and available 24/7, the company handles residential moves, local and long-distance moves, packing, storage, delivery, and junk removal across 30A, Destin, Fort Walton Beach, Niceville, Panama City, and Panama City Beach."

That block is 65 words — compact, packed with entity signals, and answers the core AI query in one passage.

---

## Server-Side Rendering Check

**Status: EXCELLENT** — Next.js App Router, all pages are Server Components by default.

- Layout, all page routes, service pages, county pages: Server Components ✅
- FAQ content: `"use client"` accordion with `keepMounted={true}` — all FAQ answer text is rendered into SSR HTML even for collapsed panels ✅
- No critical content behind client-only data fetches ✅
- Fonts: Google Fonts loaded via `next/font` (not render-blocking) ✅
- Analytics: GA script loaded `afterInteractive` (does not block SSR HTML) ✅

AI crawlers do not execute JavaScript. The `keepMounted` prop on the `Accordion` component is the key implementation detail here — it ensures all FAQ answers are present in the initial HTML response, not just visible after JS hydration.

---

## Schema Recommendations

### Current Schema Inventory

| Schema Type | Where Used | Status |
|-------------|-----------|--------|
| `MovingCompany` | Sitewide (`layout.tsx`) | ✅ Good |
| `WebSite` + `SearchAction` | Sitewide | ✅ Good |
| `BreadcrumbList` | All interior pages | ✅ Good |
| `FAQPage` | Home, About, all service pages, county pages | ✅ Strong |
| `Service` | Each service detail page | ✅ Good |
| `MovingCompany` (county scope) | Each county page | ✅ Good |
| `AggregateRating` | Reviews page | ✅ Good |
| `Review` (individual) | Reviews page | ✅ Good |
| `Organization` | ❌ Not present | Gap |
| `WebPage` / `Article` | ❌ Not present | Gap |
| `Person` | ❌ Not present | Gap |

### Recommended Additions

**1. Expand `sameAs` in MovingCompany schema** (in `structured-data.ts`)

The current `sameAs` only references Facebook and Google. Once additional profiles are claimed, add them:

```ts
sameAs: [
  SOCIAL_LINKS.facebook,
  SOCIAL_LINKS.google,
  // Add when claimed:
  // 'https://www.linkedin.com/company/beach-house-moving',
  // 'https://www.yelp.com/biz/beach-house-moving',
  // 'https://www.bbb.org/...',
  // 'https://nextdoor.com/...',
].filter(Boolean),
```

**2. Add `datePublished` / `dateModified` to WebPage schema**

No page currently emits freshness metadata. AI systems use recency as a trust signal.

```ts
// Add to buildMetadata() in seo.ts
openGraph: {
  // ...existing
  modifiedTime: new Date().toISOString(), // or a static date per page
}
```

Or emit a `WebPage` JSON-LD with:
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "datePublished": "2025-01-01",
  "dateModified": "2026-06-04"
}
```

**3. Add `Organization` schema** for entity consolidation:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Beach House Moving",
  "url": "https://beachhousemoving.xyz",
  "foundingDate": "2025",
  "areaServed": "Florida Panhandle",
  "sameAs": ["...all profiles..."]
}
```

---

## Content Reformatting Suggestions

### Priority 1 — Expand Military Families FAQ Answer

**Current (30 words — too short for citation):**
> "Yes. We move a lot of military families around Okaloosa County and work around PCS timelines and short-notice report dates."

**Recommended (~150 words — optimal citability range):**
> "Yes. Beach House Moving works with military families near Eglin Air Force Base and Hurlburt Field in Okaloosa County regularly. Military PCS moves have unique constraints — report dates that come with two weeks' notice, strict move-out inspections, and sometimes a gap between leaving BAH housing and getting into the next place. We work around those timelines, including short-notice availability and flexible scheduling for the days leading up to a report date. We cover Niceville, Fort Walton Beach, Shalimar, and the surrounding areas near both bases. If you're PCS-ing out of the area to another duty station, we also handle long-distance moves. Call (850) 842-1962 to get a quote once your orders are confirmed — the sooner you lock in a date, the better your options."

### Priority 2 — Add Definition Block to About Page

Add as the first `<p>` inside "Our Story" section, before the existing story paragraphs:

> "Beach House Moving is a locally owned moving company serving the Florida Panhandle, licensed under Florida FDACS Mover Registration #IM4125. Founded in 2025, the company operates a three-truck fleet — box trucks and a Sprinter van — to handle moves of every size across Walton, Okaloosa, and Bay Counties. Services include residential moving, local and long-distance moving, packing and unpacking, storage, furniture delivery, and junk removal."

### Priority 3 — Service Area Local Knowledge Blocks

The Walton County description is already strong at ~195 words. Okaloosa (~80 words) and Bay County (~80 words) are below optimal. Both need expansion to 134–167 words with more specific local details that only an operator with real experience would know.

**Okaloosa expansion template:**
> "In Okaloosa County, Beach House Moving covers Destin, Fort Walton Beach, Niceville, Crestview, Shalimar, and the communities near Eglin Air Force Base and Hurlburt Field. We move a lot of military families on PCS orders — short-notice moves are normal for us. Destin condos on Holiday Isle or along the harbor often have underground parking and freight-elevator requirements we've already navigated. Ranch houses in Niceville are straightforward but stair carries are common. Crestview is inland and more residential — full household moves with standard access. Whatever the property type, we bring the dollies, ramps, furniture blankets, and the crew to handle it on the first visit."

### Priority 4 — Add a Moving Cost Guide Page

A dedicated `/moving-cost-guide` or `/how-much-does-moving-cost` page with:
- "How much does a local move cost in Florida?" (question-form H2)
- Hourly rate context (without specific dollar figures if not wanted)
- Factors that affect cost (volume, floors, distance, specialty items)
- FAQ section

This page type consistently appears in Google AI Overviews for moving queries and is a high-citability format.

---

## Top 5 Highest-Impact Changes

### 1. Create `/public/llms.txt` — Effort: 15 minutes
The template above is ready to use. Signals AI openness, aids structured content discovery by smaller AI systems.

### 2. Expand FAQ Answers to 134–167 Words for Key Questions — Effort: 1–2 hours
The military families, beach-house, and service-area FAQ answers are the site's most distinctive content. Expanding them to optimal citation length in `content.ts` requires no code changes — just copy edits to the `FAQS` array. These are the passages most likely to be cited by AI Overviews for "movers near Eglin AFB" and "30A moving company" queries.

### 3. Add a Definition Block to Homepage and About Page — Effort: 30 minutes
Add the 65-word definition passage (see Passage-Level Citability section) to `ABOUT_CONTENT.intro` in `content.ts` and render it as the first paragraph of the About page and as an `aria-label`-accessible business description on the homepage. No new components needed.

### 4. Add `dateModified` to WebPage JSON-LD — Effort: 1 hour
Create a `webPageSchema()` function in `structured-data.ts` and emit it from `buildMetadata()` or as a `<JsonLd>` in each page. Static dates per page are fine; freshness signals matter more than precision.

### 5. Claim LinkedIn and Yelp Business Profiles → Update `sameAs` — Effort: 2 hours
LinkedIn and Yelp feed into entity databases that ChatGPT, Perplexity, and Bing Copilot pull from. Once claimed, add URLs to `SOCIAL_LINKS` in `content.ts` and to the `sameAs` array in `movingCompanySchema()`. Zero code complexity once the profiles exist.

---

## Medium-Effort Wins (1–4 hours each)

- **Reddit:** Post helpful moving tips in r/Pensacola, r/DestinFL, r/PanamaCityBeach — organic brand mentions, not promotional. Reddit is Perplexity's #1 citation source (46.7%).
- **Moving cost guide page:** Creates a high-citability, FAQ-dense page targeting "how much does moving cost in [county]" queries. Directly serves Google AI Overviews.
- **Okaloosa + Bay County description expansion:** Bring both to 134–167 words with specific local details. Edit only `content.ts`.
- **Explicit AI crawler rules in `robots.ts`:** Minor but signals intentionality. Template provided above.

## High-Impact (Long Game)

- **YouTube video:** Even a 2-minute "what to expect on moving day with Beach House Moving" video creates the single highest-correlation AI citation signal (YouTube ~0.737, Ahrefs 2025). Link back to site in description.
- **Google Business Profile posts:** Weekly GBP posts keep the entity "active" in Google's knowledge graph. AI Overviews pull from GBP for local queries.
- **Nextdoor business listing:** High local trust signal for the 30A/Santa Rosa Beach community specifically.

---

## Summary

Beach House Moving's technical foundation is strong for AI search: SSR by default, FAQPage schema properly deployed, FAQ accordion content in SSR HTML (`keepMounted`), explicit GBP + Facebook entity links, and correct robots configuration. The site is well-indexed by all major AI crawlers.

The two structural gaps are (1) **content depth** — key FAQ answers and county descriptions are below optimal citation length, and the site lacks definition-first passages that AI systems excerpt — and (2) **off-site entity signals** — no Wikipedia, Reddit, YouTube, or LinkedIn presence, which are the dominant sources for ChatGPT and Perplexity citations.

**Immediate actions with the most ROI:** expand 3–4 FAQ answers in `content.ts`, add `llms.txt`, and add the definition block to About/homepage. All are copy edits requiring no new components or schema work.
