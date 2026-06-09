# INTEGRATIONS.md — Beach House Moving

> Documents every third-party service connected to this project — setup steps, environment variables, and how each is used. Update this file whenever an integration is added or modified.

**Canonical domain:** `https://beachhousemoving.xyz`

---

## Integration Overview

| Service | Purpose | Status | Env Var |
|---|---|---|---|
| Resend | Owner notification email (quote submissions) | Required | `RESEND_API_KEY` |
| Google Analytics 4 | Traffic analytics, conversion tracking | Live (env-driven) | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Google Search Console | SEO monitoring, indexing | Setup manually | N/A (file verification) |
| Google Maps Embed | Service area map on contact page | Optional | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (or free iframe) |
| Google Places API | Live Google reviews (homepage carousel + /reviews) | Optional | `GOOGLE_PLACES_API_KEY`, `NEXT_PUBLIC_GOOGLE_PLACE_ID` |
| Google Business Profile | Local SEO / NAP consistency | Verified (service-area business) | N/A — link in `SOCIAL_LINKS.google` |
| Vercel | Hosting, deployment | Required | Vercel dashboard |
| Facebook Page | Social proof link in footer | Active | N/A |

---

## 1. Resend (Email)

### Purpose (v1.1)
Send **owner notification emails only** when the quote form is submitted. The business owner receives the lead details at `RESEND_TO_EMAIL` (default: `beachhousemoving@gmail.com`).

### Setup Steps
1. Go to [resend.com](https://resend.com) → Create account
2. Add and verify sending domain `beachhousemoving.xyz`
3. Create an API key → copy it
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxx
   RESEND_FROM_EMAIL=quotes@beachhousemoving.xyz
   RESEND_TO_EMAIL=beachhousemoving@gmail.com
   ```
5. Add same vars to Vercel dashboard → Settings → Environment Variables

### How It's Used (v1.1)
- **Route:** `/src/app/api/quote/route.ts`
- **Flow:**
  1. Customer submits quote form
  2. Route Handler validates input with zod
  3. Resend sends notification email to `RESEND_TO_EMAIL` with all form data
  4. Return `200` → client fires `generate_lead` → redirect to `/thank-you`

### v2 / future
- Customer confirmation email to the submitter's address
- React email templates in `/src/emails/` (e.g. `QuoteNotificationEmail.tsx`, `QuoteConfirmationEmail.tsx`)
- **Not built in v1.1** — do not document or implement customer confirmation until v2

### Free Tier
3,000 emails/month — more than sufficient for a local moving company.

---

## 2. Google Analytics 4 (via GTM)

### Purpose
Track visitor behavior, traffic sources, and conversion events (quote form submissions, phone clicks).

GA4 is managed inside Google Tag Manager (GTM-WNFSB7NT), not loaded directly.
The site loads GTM via next/script (afterInteractive) in layout.tsx.
GTM's GA4 Configuration tag (Measurement ID: G-6H4SJSCW0G) handles page_view on initial load.

### SPA page navigation tracking
- GtmPageView component (src/components/analytics/GtmPageView.tsx) fires a page_view
  dataLayer event on every Next.js client-side route change.
- OR configure a History Change trigger in GTM — either approach works. Do not use both.

### Events fired from site code (src/lib/gtag.ts)
- generate_lead: quote form success — via dataLayer.push + window.gtag fallback
- contact: phone link click — via dataLayer.push + window.gtag fallback
- phone_click: paired with contact, includes location parameter
- page_view: SPA navigations via GtmPageView component

### GTM must have
- GA4 Configuration tag → All Pages trigger
- Custom Event trigger on "generate_lead" → GA4 Event tag
- Custom Event trigger on "page_view" → GA4 Configuration tag (for SPA views)
- History Change trigger (alternative to GtmPageView component — use one or the other)

### Conversion Setup
In GA4 dashboard, mark `generate_lead` as a conversion event.

---

## 3. Google Search Console

### Purpose
Monitor search performance, indexing status, and submit sitemap for faster SEO indexing.

### Setup Steps
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → `https://beachhousemoving.xyz`
3. Verify via HTML file method: download the `googleXXXXXXXX.html` file, place in `/public/`
4. Submit sitemap: `https://beachhousemoving.xyz/sitemap.xml`

### Sitemap
Next.js generates a sitemap automatically via `/src/app/sitemap.ts` — includes homepage, services (hub + 6 slugs), service areas (hub + 3 counties), about, contact, and get-a-quote. `/thank-you` is excluded (noindex).

---

## 4. Google Maps Embed

### Purpose
Show a **region-centered** service area map on the `/contact` and `/service-areas` pages — reinforces local credibility without pinning an exact home address (SAB).

### Setup (Optional — can use free embed URL instead)
**Option A (Free — no API key):** Use the iframe embed URL from Google Maps directly, centered on the service region (Emerald Coast / Panhandle), not a residential street address.

**Option B (API key — for dynamic maps):**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Enable Maps JavaScript API
3. Create an API key, restrict to `beachhousemoving.xyz`
4. Add to `.env.local`: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza_xxxxxx`

**Recommendation:** Use Option A (free embed) initially. Map must be region-centered — no exact home pin.

---

## 5. Google Business Profile (GBP)

### Purpose
Local SEO presence as a verified **service-area business**. NAP on the site must match GBP (name, phone, service area — no public street address).

### Status
GBP is verified as a service-area business.

### Action items
1. Confirm site NAP matches GBP listing (import from `content.ts`)
2. Add verified GBP profile URL to `SOCIAL_LINKS.google` in `/src/lib/content.ts`
   - **TODO:** Paste verified GBP profile URL here once confirmed — do not invent a URL

---


## 6. Google Places API (Live Reviews)

### Purpose
Fetch live Google Business Profile reviews at build time for the homepage carousel and `/reviews` page. Refreshes via ISR (`revalidate: 86400` — once per 24 hours max).

### Setup Steps
1. Enable **Places API** in [Google Cloud Console](https://console.cloud.google.com/)
2. Create an API key restricted to Places API (server-side only — no HTTP referrer restriction needed if key is never exposed to the client)
3. Copy your Google Business Profile **Place ID** (from GBP or Places API)
4. Add to `.env.local`:
   ```
   GOOGLE_PLACES_API_KEY=
   NEXT_PUBLIC_GOOGLE_PLACE_ID=
   ```
5. Add same vars to Vercel Environment Variables

### How It's Used
- **`/src/lib/google-reviews.ts`** — server-only fetch; returns `[]` gracefully if key is missing
- **Homepage** — `GoogleReviewsCarousel` (falls back to static `TestimonialsSection` if no reviews)
- **`/reviews`** — `GoogleReviewsGrid` with live rating summary from `fetchPlaceSummary()`

### Security
- `GOOGLE_PLACES_API_KEY` has **no** `NEXT_PUBLIC_` prefix — never exposed to the browser
- Do not fetch reviews on the client

---

## 7. Vercel (Hosting)

### Purpose
Production hosting, CI/CD, preview deployments, SSL.

### Setup Steps
1. Push project to GitHub: `git push origin main`
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Framework: Next.js (auto-detected)
4. Add all environment variables from `.env.local` in Vercel dashboard
5. Deploy

### Connect Custom Domain
1. Vercel dashboard → Project → Settings → Domains
2. Add `beachhousemoving.xyz` (apex) and `www.beachhousemoving.xyz` (redirect to apex)
3. Update DNS records at your domain registrar per Vercel's instructions
4. SSL is automatic

### Branch Deploys
- `main` branch → production (`https://beachhousemoving.xyz`)
- All other branches → preview URLs (safe to test)

---

## 8. Facebook Page (Social Proof)

### Purpose
Link to the business's Facebook page for social proof in the footer.

### Details
- **URL:** `https://www.facebook.com/beachhousemovingfl/`
- **Handle:** `@beachhousemovingfl`
- **No API key needed** — just a link
- Defined in `/src/lib/content.ts` under `SOCIAL_LINKS.facebook` and `SOCIAL_LINKS.facebookHandle`

---

## Environment Variables Reference

### `.env.local` (never commit this file)
```env
# App
NEXT_PUBLIC_SITE_URL=https://beachhousemoving.xyz
NEXT_PUBLIC_BUSINESS_PHONE=8508421962

# Analytics (set your GA4 Measurement ID — not hardcoded in repo)
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Email
RESEND_API_KEY=
RESEND_FROM_EMAIL=quotes@beachhousemoving.xyz
RESEND_TO_EMAIL=beachhousemoving@gmail.com

# Maps (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Google Places — live reviews (server-side key only)
GOOGLE_PLACES_API_KEY=
NEXT_PUBLIC_GOOGLE_PLACE_ID=
```

### `.env.example` (commit this — no real values)
```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_BUSINESS_PHONE=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_TO_EMAIL=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```
