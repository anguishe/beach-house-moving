# Beach House Moving — Action Plan
**Date:** 2026-10-02 | **Full report:** `FULL-AUDIT-REPORT-2026-10-02.md` | **Health score:** 88/100

## Critical
None. Build, lint, indexability and routing are healthy.

## High
None. No code fixes were required, so this run produced no `fix(H*)` commits. (Status for the finish line: no Critical/High IDs exist, so none are FIXED or BLOCKED.)

## Medium (later session)
- **M1 Contrast of `ink-light` text.** Files: 28 uses of `text-ink-light` (e.g. `src/components/sections/GoogleReviewsGrid.tsx:83,90,95`, `WrittenReviewsSection.tsx:86`). Fix: swap to `text-ink-muted` (#4a5568, passes AA) for text under 18px, or darken the token with owner sign-off (brand tokens are locked).
- **M2 Coral small text.** 11 uses of `text-brand-coral`. Fix: use `text-brand-coral-dark` for text below 18px/bold 14px.
- **M3 Validation returns 500.** `src/app/api/contact/route.ts` and `src/app/api/quote/route.ts`: catch `ZodError` and return `NextResponse.json({ error: 'Invalid submission' }, { status: 400 })`; keep 500 for send failures. Do not log the body.
- **M4 `/review` redirect + tracking.** New `src/app/review/route.ts` that 302s to `REVIEWS_PAGE_META.googleReviewLink`; point the CTAs at `/review` (`reviews/page.tsx`, `Footer.tsx`).
- **M5 Pricing placeholders.** `src/app/pricing/page.tsx`: fill only with owner-confirmed ranges or drop the table.

## Low
- **L1 Titles over 65 chars** on 6 `/resources/*` pages; shorten via post metadata (needs owner approval, prose).
- **L2 OG image URL.** `src/lib/seo.ts:53,66`: use `new URL('/images/og-hero.jpg', metadataBase).toString()`.
- **L3 Source JPEG weight.** Re-encode only after a human photo-privacy review (CLAUDE.md gate).
- **L4 `email_click` event.** Footer and contact `mailto:` links (analytics change, owner/GTM first).

## Owner decisions (CONCERNs)
1. Review schema vs real GBP reviews (C1).
2. Confirm `RESEND_API_KEY` and a Blob store are set in production (C2, C3).
3. Merge or differentiate the two PCS guides (C4).
4. Pricing rows and thin-neighborhood keep-or-demote (C5).

## Post-fix checklist
`npm run lint && npm run build`; spot-check `/robots.txt`, `/sitemap.xml`; bump `updatedAt`/`CONTENT_REVISION` if rendered copy on neighborhood/service pages changes.
