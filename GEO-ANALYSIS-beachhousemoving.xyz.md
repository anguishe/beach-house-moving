# GEO Analysis — beachhousemoving.xyz
**Date:** 2026-06-04 (v3 — post SEO/GEO audits v2 commit)
**Framework:** AI Search / Generative Engine Optimization
**Google's position:** Optimizing for generative AI search is still SEO. AEO/GEO are rebranded labels for the same fundamentals applied to AI-search surfaces.

---

## GEO Readiness Score: 65/100

| Dimension | Score | Weight | Change |
|-----------|-------|--------|--------|
| Citability | 18/25 | 25% | +4 (FAQ expansions) |
| Structural Readability | 16/20 | 20% | +2 (neighborhood pages, OwnerOperator section) |
| Multi-Modal Content | 7/15 | 15% | +1 (fleet image in OwnerOperatorSection) |
| Authority & Brand Signals | 8/20 | 20% | +1 (stronger About + definition blocks) |
| Technical Accessibility | 16/20 | 20% | +1 (robots.ts explicit crawlers; llms.txt still 404) |

**Previous score:** 56/100 — **Delta: +9 pts from v2 changes**

---

## Platform Breakdown

| Platform | Score | Key Bottleneck |
|----------|-------|----------------|
| Google AI Overviews | 70/100 | Good FAQ depth now; still no `dateModified` metadata |
| Bing Copilot | 65/100 | Bing verified + IndexNow ✓, missing `dateModified` |
| Perplexity | 38/100 | No Reddit presence, no community validation |
| ChatGPT | 30/100 | No Wikipedia, no Reddit, no YouTube citations |

**Only 11% of domains are cited by both ChatGPT and Google AIO.** ChatGPT heavily sources Wikipedia (47.9%) and Reddit (11.3%) — Beach House Moving has zero presence on either, which remains the largest single gap.

---

## What Shipped in v2 (✅ Done)

| Item | Status | Notes |
|------|--------|-------|
| Explicit AI crawler rules in `robots.ts` | ✅ Live | GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended |
| `public/llms.txt` created | ✅ Committed | Returns 404 on live site — **deployment lag** |
| Military families FAQ expanded | ✅ ~160 words | Optimal citation range (134–167w) |
| Service area FAQ expanded | ✅ ~165 words | All counties/cities, long-distance offer |
| Licensing FAQ expanded | ✅ ~130 words | FDACS detail, cargo coverage mention |
| Hours FAQ expanded | ✅ ~130 words | 24/7 rationale, real-estate context |
| How-to-get-a-quote FAQ expanded | ✅ ~165 words | Optimal range with booking flow detail |
| About page definition block | ✅ Added | "Beach House Moving is a locally owned, owner-operated moving company…" |
| OwnerOperatorSection on homepage | ✅ Deployed | Strong brand differentiation content |
| Pricing page (`/pricing`) | ✅ Created | New high-citability page format |
| Neighborhood pages | ✅ Created | `/service-areas/[county]/[neighborhood]/` — density for local queries |

---

## AI Crawler Access Status

**Status: EXCELLENT**

| Crawler | Owner | Status |
|---------|-------|--------|
| GPTBot | OpenAI / ChatGPT | ✅ Explicit Allow |
| OAI-SearchBot | OpenAI | ✅ Explicit Allow |
| ChatGPT-User | OpenAI | ✅ Explicit Allow |
| ClaudeBot | Anthropic | ✅ Explicit Allow |
| anthropic-ai | Anthropic | ✅ Explicit Allow |
| PerplexityBot | Perplexity | ✅ Explicit Allow |
| Google-Extended | Google | ✅ Explicit Allow |
| CCBot | Common Crawl | ✅ Allowed (wildcard) |

All major AI search crawlers are explicitly allowed. Optional: add `{ userAgent: 'Bytespider', allow: '/' }` for ByteDance/TikTok completeness.

---

## llms.txt Status

**Status: ⚠️ COMMITTED BUT NOT DEPLOYED — returns 404 on live site**

The file exists at `public/llms.txt` in the repository and was committed in v2. However, the live site at `https://beachhousemoving.xyz/llms.txt` returns HTTP 404, indicating the deployment has not propagated or there is a Vercel routing issue blocking static file serving from `/public`.

**Action required:** Deploy to Vercel. Install the Vercel CLI (`npm i -g vercel`) and run `vercel --prod`, or push to the connected git branch to trigger auto-deploy.

**Content quality:** The committed `llms.txt` is well-structured with services, service areas, key facts, phone, license number, and hours. No changes needed to the file itself.

---

## Brand Mention Analysis

| Platform | Status | Impact on AI Citations |
|----------|--------|----------------------|
| Google Business Profile | ✅ Confirmed | High — local AI Overviews |
| Facebook | ✅ Active (`@beachhousemovingfl`) | Low for AI citations |
| Wikipedia | ❌ Not listed | Critical gap for ChatGPT (47.9% of citations) |
| Reddit | ❌ No presence | Critical gap for Perplexity (46.7%) + ChatGPT |
| YouTube | ❌ No channel | YouTube mentions correlate ~0.737 with AI citations (strongest signal, Ahrefs 2025) |
| LinkedIn | ❌ Not listed | Moderate AI citation impact |
| Yelp | ❌ Not listed | Moderate — feeds Apple Maps, Bing entity data |
| BBB | ❌ Not listed | Trust signal |
| Nextdoor | ❌ Unknown | High local trust for 30A community |
| Angi / HomeAdvisor | ❌ Not confirmed | Feeds third-party aggregators |

**Key insight (Ahrefs Dec 2025, 75,000 brands):** Brand mentions correlate 3× more strongly with AI visibility than backlinks. YouTube mentions have the highest correlation (~0.737). A short "what to expect on moving day" video would materially improve ChatGPT and Perplexity citation rates.

---

## Passage-Level Citability

**Optimal passage length for AI citation: 134–167 words.**

### Upgraded since v1 — now at optimal length

| FAQ / passage | Word count | Status |
|--------------|-----------|--------|
| Military families / Eglin AFB FAQ | ~160w | ✅ Optimal |
| Service area FAQ (all counties) | ~165w | ✅ Optimal |
| Licensing / FDACS FAQ | ~130w | ✅ Near-optimal |
| Hours / 24/7 rationale FAQ | ~130w | ✅ Near-optimal |
| How to get a quote FAQ | ~165w | ✅ Optimal |
| Walton County description | ~195w | ✅ Strong (slightly long) |
| Okaloosa County description | ~105w | ⚠️ Below optimal |
| Bay County description | ~80w | ❌ Too short |

### Still missing

**Homepage:** No definition-first paragraph in SSR HTML. `OwnerOperatorSection` establishes owner-operator identity well but does not open with the canonical "Beach House Moving is…" sentence that AI systems prefer for excerpt citation. 

**Recommended addition** in `OwnerOperatorSection.tsx` — a visually hidden or lead-in paragraph:
> "Beach House Moving is a locally owned, owner-operated moving company serving Walton, Okaloosa, and Bay Counties on Florida's Emerald Coast. Licensed under Florida FDACS Mover Registration #IM4125 and available 24/7, the same four-person team that owns the company handles every job — no subcontractors."

---

## Server-Side Rendering Check

**Status: EXCELLENT — no changes required**

- Next.js App Router, all routes are Server Components by default ✅
- FAQ accordion content uses `keepMounted={true}` — all answers present in SSR HTML ✅
- New neighborhood pages: Server Components ✅
- New pricing page: Server Component ✅
- No critical content behind client-only renders ✅

---

## Schema Status

### Current Inventory

| Schema Type | Where Used | Status |
|-------------|-----------|--------|
| `MovingCompany` | Sitewide layout | ✅ Strong |
| `WebSite` + `SearchAction` | Sitewide | ✅ Good |
| `BreadcrumbList` | All interior pages | ✅ Good |
| `FAQPage` | Home, About, service pages, county pages | ✅ Strong |
| `Service` | Each service detail page | ✅ Good |
| `MovingCompany` (county scope) | County pages | ✅ Good |
| `AggregateRating` | Reviews page | ✅ Good |
| `Review` (individual) | Reviews page | ✅ Good |
| `WebPage` + `dateModified` | ❌ Not emitted | Gap — freshness signal |
| `Organization` + `foundingDate` | ❌ Not present | Gap — entity consolidation |
| `Person` (owner) | ❌ Not present | Gap — E-E-A-T signal |

### Recommended Additions

**1. `WebPage` schema with `dateModified`** — add to `structured-data.ts`:

```ts
export function webPageSchema(url: string, datePublished: string, dateModified: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    datePublished,
    dateModified,
    isPartOf: { '@id': `${BUSINESS.website}/#website` },
    about: { '@id': `${BUSINESS.website}/#business` },
  }
}
```

Emit from each `page.tsx` with a static `datePublished` per page and a rolling `dateModified` (or use `new Date().toISOString()`).

**2. Expand `sameAs`** in `movingCompanySchema()` as new profiles are claimed:

```ts
sameAs: [
  SOCIAL_LINKS.facebook,
  SOCIAL_LINKS.google,
  // Add once claimed:
  // 'https://www.linkedin.com/company/beach-house-moving',
  // 'https://www.yelp.com/biz/beach-house-moving',
  // 'https://www.bbb.org/...',
].filter(Boolean),
```

---

## Top Remaining Actions (Ranked by ROI)

### Tier 1 — Code / Deploy (hours)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | **Deploy to Vercel** — `llms.txt` is committed and ready, just needs a production push | 5 min | Medium |
| 2 | **Add `WebPage` + `dateModified` schema** to each page | 1–2 hrs | Medium (freshness signal for AI Overviews) |
| 3 | **Expand Bay County description** to 134–167 words with local specifics | 30 min | Medium (citation depth for Bay County queries) |
| 4 | **Add definition sentence to homepage** (`OwnerOperatorSection` lead-in) | 15 min | Low–Medium |

### Tier 2 — Off-site Profiles (hours to days)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 5 | **Claim Yelp Business Profile** → update `sameAs` | 30 min | Medium (entity data feeds Bing, Apple, ChatGPT) |
| 6 | **Claim LinkedIn Company Page** → update `sameAs` | 30 min | Medium |
| 7 | **Submit to BBB** → update `sameAs` | 30 min | Trust signal |
| 8 | **Nextdoor Business listing** | 30 min | High local trust for 30A community |

### Tier 3 — Long Game (days to weeks)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 9 | **YouTube video** — "what to expect on moving day" | 2–4 hrs | High (0.737 correlation with AI citations) |
| 10 | **Reddit presence** — helpful posts in r/Pensacola, r/DestinFL, r/PanamaCityBeach | Ongoing | High (Perplexity #1 source at 46.7%) |
| 11 | **GBP weekly posts** — keep entity active in Google's knowledge graph | 30 min/week | Medium–High |

---

## Summary

Beach House Moving's GEO foundation is now materially stronger: robots.txt explicitly welcomes all AI crawlers, FAQ answers are at optimal citation length (134–167 words) across five key questions, the About page has a definition-first passage, and the new neighborhood pages add content density for hyper-local queries.

**The two remaining structural gaps are:**

1. **`llms.txt` needs to ship** — it exists in the repo but returns 404 on the live site. One `vercel --prod` push fixes this.
2. **Off-site entity signals are still zero** — no Wikipedia, Reddit, YouTube, or LinkedIn presence. These are the dominant citation sources for ChatGPT (Wikipedia 47.9%, Reddit 11.3%) and Perplexity (Reddit 46.7%). This is an off-site, ongoing effort — not a code fix.

The quickest remaining code win is the `WebPage`/`dateModified` schema, which costs 1–2 hours and directly improves freshness signals for Google AI Overviews.
