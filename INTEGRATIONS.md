# INTEGRATIONS.md — Beach House Moving

> Documents every third-party service connected to this project — setup steps, environment variables, and how each is used. Update this file whenever an integration is added or modified.

---

## Integration Overview

| Service | Purpose | Status | Env Var |
|---|---|---|---|
| Resend | Transactional email (quote notifications) | Required | `RESEND_API_KEY` |
| Google Analytics 4 | Traffic analytics, conversion tracking | Required | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Google Search Console | SEO monitoring, indexing | Setup manually | N/A (file verification) |
| Google Maps Embed | Service area map on contact page | Optional | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` |
| Vercel | Hosting, deployment, edge functions | Required | Vercel dashboard |
| Facebook Page | Social proof link in footer | No setup needed | N/A |

---

## 1. Resend (Email)

### Purpose
Send quote request notifications to the business owner and confirmation emails to customers when the quote form is submitted.

### Setup Steps
1. Go to [resend.com](https://resend.com) → Create account
2. Add and verify your sending domain (or use `onboarding@resend.dev` for testing)
3. Create an API key → copy it
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxx
   RESEND_FROM_EMAIL=quotes@beachhousemoving.xyz
   RESEND_TO_EMAIL=beachhousemoving@gmail.com
   ```
5. Add same vars to Vercel dashboard → Settings → Environment Variables

### How It's Used
- **Route:** `/src/app/api/quote/route.ts`
- **Flow:**
  1. Customer submits quote form
  2. Route Handler validates input with zod
  3. Resend sends notification email to `RESEND_TO_EMAIL` with all form data
  4. Resend sends confirmation email to customer's email address
  5. Return `200` → form shows success state

### Email Templates
Email templates are defined as React components in `/src/emails/`:
- `QuoteNotificationEmail.tsx` — notification to business owner
- `QuoteConfirmationEmail.tsx` — confirmation to customer

### Free Tier
3,000 emails/month — more than sufficient for a local moving company.

---

## 2. Google Analytics 4

### Purpose
Track visitor behavior, traffic sources, and conversion events (quote form submissions, phone clicks).

### Setup Steps
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new GA4 property for `beachhousemoving.xyz`
3. Measurement ID: `G-6H4SJSCW0G`
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-6H4SJSCW0G
   ```
5. Add same var to Vercel

### Implementation
GA4 script is loaded in `/src/app/layout.tsx`:
```typescript
// Uses next/script with strategy="afterInteractive"
// gtag.ts utility in /src/lib/gtag.ts
```

### Key Events to Track

| Event Name | Trigger | Where |
|---|---|---|
| `generate_lead` | Quote form submitted | `/src/app/api/quote/route.ts` + form success |
| `contact` | Phone number clicked | Navbar, Hero, Footer phone links |
| `page_view` | Route change | Automatic via GA4 |

### Conversion Setup
In GA4 dashboard, mark `generate_lead` as a conversion event.

---

## 3. Google Search Console

### Purpose
Monitor search performance, indexing status, and submit sitemap for faster SEO indexing.

### Setup Steps
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → `beachhousemoving.xyz`
3. Verify via HTML file method: download the `googleXXXXXXXX.html` file, place in `/public/`
4. Submit sitemap: `https://beachhousemoving.xyz/sitemap.xml`

### Sitemap
Next.js generates a sitemap automatically via `/src/app/sitemap.ts`:
```typescript
export default function sitemap() {
  return [
    { url: 'https://beachhousemoving.xyz', lastModified: new Date() },
    { url: 'https://beachhousemoving.xyz/services', lastModified: new Date() },
    { url: 'https://beachhousemoving.xyz/about', lastModified: new Date() },
    { url: 'https://beachhousemoving.xyz/contact', lastModified: new Date() },
    { url: 'https://beachhousemoving.xyz/get-a-quote', lastModified: new Date() },
    // + all service and area pages
  ];
}
```

---

## 4. Google Maps Embed

### Purpose
Show a service area map on the `/contact` and `/service-areas` pages to reinforce local credibility.

### Setup (Optional — can use free embed URL instead)
**Option A (Free — no API key):** Use the iframe embed URL from Google Maps directly
```html
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="100%"
  height="400"
  loading="lazy"
/>
```

**Option B (API key — for dynamic maps):**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Enable Maps JavaScript API
3. Create an API key, restrict to your domain
4. Add to `.env.local`: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza_xxxxxx`

**Recommendation:** Use Option A (free embed) initially. Only upgrade to Option B if interactive map features are needed.

---

## 5. Vercel (Hosting)

### Purpose
Production hosting, CI/CD, preview deployments, edge network, SSL.

### Setup Steps
1. Push project to GitHub: `git push origin main`
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Framework: Next.js (auto-detected)
4. Add all environment variables from `.env.local` in Vercel dashboard
5. Deploy

### Connect Custom Domain
1. Vercel dashboard → Project → Settings → Domains
2. Add `beachhousemoving.xyz` and `www.beachhousemoving.xyz`
3. Update DNS records at your domain registrar per Vercel's instructions
4. SSL is automatic

### Branch Deploys
- `main` branch → production (`beachhousemoving.xyz`)
- All other branches → preview URLs (safe to test)

---

## 6. Facebook Page (Social Proof)

### Purpose
Link to the business's Facebook page for social proof in the footer and potentially an embedded review widget.

### Details
- **URL:** `https://www.facebook.com/profile.php?id=61578080548022`
- **No API key needed** — just a link
- Add to `/src/lib/content.ts` under `socialLinks`
- Consider: once Facebook username is set, update to a cleaner URL

---

## Environment Variables Reference

### `.env.local` (never commit this file)
```env
# App
NEXT_PUBLIC_SITE_URL=https://beachhousemoving.xyz
NEXT_PUBLIC_BUSINESS_PHONE=8508421962

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-6H4SJSCW0G

# Email
RESEND_API_KEY=re_xxxxxxxxxxxxxx
RESEND_FROM_EMAIL=quotes@beachhousemoving.xyz
RESEND_TO_EMAIL=beachhousemoving@gmail.com

# Maps (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza_xxxxxxxxxxxxxx
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
