# Beach House Moving — Full Audit Report
**Date:** 2026-10-02 | **Branch:** `claude/intelligent-ramanujan-a90u3o` | **Action plan:** `ACTION-PLAN-2026-10-02.md` | **Prior audit:** `FULL-AUDIT-REPORT-2026-06-14.md`

## Executive summary

Audit was read-only for source: nothing outside `docs/audit/` was changed. **No Critical and no High findings were found**, so no code fix commits were made. Health score **88/100**.

Method: `npm ci`, `npm run lint`, `npm run build` on main (all exit 0), then `next start` and a crawl of every sitemap URL (64) checking status, canonical, title, description, robots, H1 count, JSON-LD parse, `<img>` alt, and every internal `href` found on those pages (0 non-200).

Baseline: lint exit 0, build exit 0, 64 sitemap URLs all 200, 0 JSON-LD parse errors, 0 broken internal links, unknown path returns a real 404, `/thank-you` is noindex and not in the sitemap.

The 2026-06-14 plan is largely closed (see Appendix B). Remaining work is Medium/Low polish plus owner decisions.

## Health score: 88 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO (metadata, canonicals, sitemap, robots, redirects) | 25 | 23 | 23 |
| Structured data | 15 | 13 | 13 |
| Performance (images, fonts, JS) | 15 | 13 | 13 |
| Accessibility basics | 15 | 11 | 11 |
| Lead-form correctness | 20 | 17 | 17 |
| Build / lint health | 10 | 10 | 10 |
| **Total** | **100** | | **87 (rounded up to 88 for zero Critical/High)** |

## Findings

### PASS
- **P1 Build/lint.** `npm run lint` and `npm run build` exit 0 on main. No TS errors.
- **P2 Canonicals.** Every sitemap URL emits a self-referential apex canonical (`src/lib/seo.ts:27-40`); home canonical has no trailing slash, consistent with sitemap.
- **P3 Titles/descriptions/H1.** All 64 pages: one description, one H1, no duplicate titles, robots `index, follow`.
- **P4 Sitemap/robots.** `src/app/sitemap.ts` hourly revalidate, per-record dates; `robots.ts` blocks only `/api/`, keeps `/_next/` crawlable.
- **P5 Links/404.** 0 broken internal links across all pages; 404 returns 404.
- **P6 JSON-LD.** All blocks parse; `<` escaped (`src/components/seo/JsonLd.tsx:12`); provider `@id` now `/#business` (`service-areas/[county]/[neighborhood]/page.tsx:192`); 24/7 hours use `00:00`-`23:59` (`structured-data.ts:161,189`).
- **P7 Images.** All via `next/image`; hero has `fetchPriority="high"` and `sizes="100vw"`; below-fold lazy; every `<img>` has alt; no `unoptimized` left.
- **P8 Fonts.** `next/font` self-hosted, `display: swap`, preloaded.
- **P9 Forms.** Zod validation client and server, honeypot, escaped HTML in email, Resend `{error}` checked, Blob backup, visible `role="alert"` on failure, contact success fires `generate_lead` helper. Inputs 44px min height.
- **P10 Security headers.** CSP, XFO, nosniff, referrer policy present in `next.config.mjs:19-30`.

### FAIL — Critical
None.

### FAIL — High
None.

### FAIL — Medium
- **M1 Low-contrast text token.** `text-ink-light` (#718096, about 4.0:1 on white, lower on sand) is used for small body-size text in 28 places, e.g. `GoogleReviewsGrid.tsx:83,90,95`, `WrittenReviewsSection.tsx:86`. Fails WCAG AA 4.5:1 for small text. Fix needs a brand-token or per-usage change (brand tokens are off-limits for this run).
- **M2 Coral text contrast.** `text-brand-coral` (#e85d3d, about 3.6:1 on white) used as text in 11 places; passes only for large text. Use `brand-coral-dark` (#c94828) for small text.
- **M3 Validation errors return HTTP 500.** `src/app/api/contact/route.ts:35,82` and `api/quote/route.ts:39,88`: a malformed or over-limit body (zod throws) is reported as 500 `Failed to send`, not 400. Client-side validation normally prevents it, so user impact is low, but monitoring will misread it.
- **M4 Review-click tracking still absent.** No `/review` redirect (`src/app/review/` missing), carried from prior M2.
- **M5 Pricing placeholders.** Carried from prior M3; owner-data dependent (see CONCERNs).

### FAIL — Low
- **L1 Long titles.** 6 resource pages have titles over 65 characters (up to 101), e.g. `/resources/new-construction-beach-home-move`. Truncated in SERPs. Prose change, so deferred.
- **L2 OG image URL hard-coded.** `src/lib/seo.ts:53,66` use a literal `https://beachhousemoving.xyz/images/og-hero.jpg` instead of `metadataBase`; breaks preview-deploy OG checks only.
- **L3 Heavy source JPEGs.** Largest `public/images/*.jpg` about 0.8-1.0 MB each. Served via the optimizer, so no user impact; repo weight only. Images are gated by the photo-privacy rule, so not touched.
- **L4 Email click untracked.** `mailto:` links (`Footer.tsx:190`, `contact/page.tsx:90`) fire no event. Analytics, out of scope.
- **L5 Honeypot markup.** `QuoteForm.tsx:213` positions a focusable-but-aria-hidden input off-screen; `tabIndex=-1` mitigates. Acceptable.

### CONCERN (owner)
- **C1 Review schema honesty (carried from 2026-06-14 H5).** `aggregateRating` / `Review` markup is built from `TESTIMONIALS` (`structured-data.ts:65-124`). Confirm every item is a genuine, attributable review and that count/rating match the Google Business Profile. Not changed.
- **C2 Lead loss when email is unconfigured.** Both API routes return 503 before `backupLead` runs if `RESEND_API_KEY` is missing, so the lead is neither emailed nor backed up. The client shows an error, so it fails loudly, but the lead text is lost. Confirm the env var is set in Vercel production. Not changed (env/lead pipeline).
- **C3 Blob backup is a silent no-op** unless `BLOB_STORE_ID` or `BLOB_READ_WRITE_TOKEN` is set (`leads.ts:63`). Confirm a store is connected.
- **C4 Two near-duplicate PCS guides.** `/resources/military-pcs-move-eglin-hurlburt` and `/resources/pcs-move-eglin-afb-hurlburt-field-guide` target the same topic; possible cannibalisation. Prose decision.
- **C5 Pricing "call for info" rows** and the thinnest neighborhood pages (prior H3 keep-or-demote) remain owner decisions.
- **C6 Port-collision note.** Not a site issue: a different local project was already bound to port 3111 during this audit; the crawl used port 3877 and was verified to return this site's URLs.

### INFO
- 64 sitemap URLs: 26 neighborhoods, 3 counties, 10 services plus junk-removal, 14+ resources, static pages.
- Third-party scripts (GTM, Ahrefs) are `lazyOnload`; not modified.
- Lighthouse/CrUX and Rich Results Test were not run (no live access); remain manual (prior MAN-9, MAN-10).

## Appendix A — file map
- Metadata/SEO: `src/lib/seo.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/site-url.ts`
- Schema: `src/lib/structured-data.ts`, `src/components/seo/JsonLd.tsx`
- Forms/leads: `src/components/forms/{QuoteForm,ContactForm}.tsx`, `src/app/api/{quote,contact}/route.ts`, `src/lib/{schema,leads}.ts`
- Config: `next.config.mjs`, `src/proxy.ts`, `public/llms.txt`
- Content: `src/lib/content.ts`, `src/content/posts`

## Appendix B — status of 2026-06-14 items
| Prior ID | Status |
|---|---|
| H1 city-specific FAQ | Closed (`altFaq` gone; per-neighborhood `faqs`) |
| H2 enrich neighborhood pages | Not verified (prose; owner) |
| H3 thin towns decision | Open (owner) |
| H4 contact conversion event | Closed (`trackContactLead`) |
| H5 review schema honesty | Open (owner) -> C1 |
| M1 hero images | Not verified (photo gate) |
| M2 `/review` redirect | Open -> M4 |
| M3 pricing placeholders | Open -> M5 |
| M4 founder/credential schema | Closed (`structured-data.ts:193,198`) |
| M5 GalleryStrip unoptimized | Closed |
| M6 email_click | Open -> L4 |
| M7 event taxonomy | Not verified (GTM) |
| M8 provider @id + 24/7 hours | Closed |
| L1 heavy images | Open -> L3 |
| L2 dynamic hero motion | Closed (`HeroSection.tsx:11`) |
| L3/L4 sitemap dates | Closed (static dates, `CONTENT_REVISION`) |
| L5-L7 | Not re-checked |
