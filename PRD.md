# PRD.md — Beach House Moving Website

**Product:** Beach House Moving — Marketing Website & Lead Generation Platform  
**Version:** 1.1  
**Status:** In Development  
**Last Updated:** 2025  
**Canonical domain:** `https://beachhousemoving.xyz`

---

## Problem Statement

Beach House Moving is a new, fully licensed moving company serving the Florida Panhandle. Despite offering top-tier service, their only current web presence is a Facebook page. Potential customers searching for movers in Santa Rosa Beach, Destin, or along 30A cannot find them organically — meaning leads are lost to competitors every day.

**We need a premier, conversion-optimized website that:**
1. Establishes professional credibility immediately
2. Ranks in local Google search results
3. Converts visitors into quote requests and phone calls
4. Tells the brand story authentically as a locally owned operation

---

## Goals

| Goal | Metric | Target |
|---|---|---|
| Lead generation | Quote form submissions per month | 20+ by month 3 |
| Phone calls | Click-to-call events per month | 30+ by month 3 |
| SEO visibility | Rank top 5 for "movers Santa Rosa Beach FL" | Within 6 months |
| Performance | Google Lighthouse score | 90+ all categories |
| Trust | First impression credibility | FL Mover Reg. #IM4125 above fold |

---

## Non-Goals (v1.1)

- Online booking / payment processing (future phase)
- Customer portal or account system
- **Customer confirmation emails** — v1.1 sends owner notification only via Resend; customer confirmation + `/src/emails/` templates are v2
- Blog / content marketing (future phase)
- Live chat widget (future phase)
- Inventory management or move tracking

---

## User Stories

### Customer (Primary)
- As a homeowner preparing to move, I want to quickly understand what services Beach House Moving offers so I can decide if they're a fit.
- As a potential customer, I want to see that Beach House Moving is licensed, insured, and professional so I feel safe trusting them with my belongings.
- As a mobile user, I want to tap a phone number and call immediately so I don't have to type a number.
- As someone in Destin or Fort Walton, I want to confirm they serve my area before I fill out the quote form.
- As a skeptical consumer, I want to read real reviews before committing to a quote request (testimonials hidden until verified reviews exist).
- As a busy person, I want to fill out a quick quote form and land on a thank-you page so I know someone will follow up.

### Business Owner
- As the business owner, I want to receive an email immediately when someone submits a quote request so I can follow up quickly.
- As the business owner, I want the site to rank for local moving search terms so I get inbound leads without paid ads.
- As the business owner, I want to update my services and service areas without needing a developer.

---

## Functional Requirements

### FR-01: Homepage
- Hero section with headline, subheadline, **primary CTA ("Get a Free Quote")**, and phone number (secondary)
- Trust badges: Licensed & Insured (FL Mover Reg. #IM4125), Locally Owned, Free Estimates, Available 24/7
- Services overview (6 services with icons)
- Service area section (Walton, Okaloosa, Bay Counties + long-distance)
- Gallery strip
- Testimonials section — **only when `FLAGS.SHOW_TESTIMONIALS` is `true`** (currently hidden)
- Inline quote form
- FAQ section
- Final CTA banner

### FR-02: Navigation
- Sticky navbar with logo, nav links (Services, Service Areas, About, Contact), and "Get a Free Quote" CTA button
- Mobile: hamburger menu with slide-in drawer (shadcn Sheet component)
- Phone number visible in navbar on desktop (secondary to quote CTA)

### FR-03: Quote Form
- Fields: Full Name, Phone Number, Email, Move Type, Move Date, Moving From (City/ZIP), Moving To (City/ZIP), Additional Notes
- Client-side validation (react-hook-form + zod)
- On submit: POST to `/api/quote` → Resend owner notification email → fire `generate_lead` → redirect to `/thank-you` (noindex)
- Error handling: show field-level errors, show server error gracefully

### FR-04: Services Pages
- `/services` — overview of all 6 services
- `/services/[slug]` — individual service page for SEO
- Each service page: title, description, what's included, FAQ, CTA

### FR-05: Service Area Pages
- `/service-areas` — overview with service region map
- `/service-areas/[county]` — individual county pages for local SEO
- Content: what we offer in that area, specific cities served, CTA

### FR-06: About Page
- Business story and founding (established 2025)
- Why locally owned matters
- Values and commitment
- Team/owner photo (placeholder until assets provided)
- License/insurance badge (FL Mover Reg. #IM4125)

### FR-07: Contact Page
- Phone number (click-to-call)
- Email address
- Service area label (SAB — **no street address displayed**)
- Google Maps embed (region-centered — no exact home pin)
- Business hours (Available 24/7, seven days a week)

### FR-08: Footer
- Logo
- Navigation links
- Contact information (phone, email, service area — **no street address**)
- License/insurance statement (Florida Mover Reg. #IM4125)
- Social link (Facebook)
- Copyright

### FR-09: SEO & Metadata
- Unique `<title>` and `<meta description>` for every indexable page
- `MovingCompany` JSON-LD schema on homepage (SAB — no street address in public output)
- Open Graph tags for social sharing
- `sitemap.xml` via Next.js sitemap API at `https://beachhousemoving.xyz/sitemap.xml`
- `robots.txt`

### FR-10: Analytics
- GA4 installed via `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var
- `generate_lead` event on quote form submission (before redirect to `/thank-you`)
- `contact` event on phone number click

---

## Page Specifications

### Homepage (`/`)
**Title:** "Beach House Moving | Movers in Santa Rosa Beach, FL"  
**Meta Description:** "Locally owned & fully licensed movers serving Walton, Okaloosa & Bay Counties. Packing, loading, transportation & storage. Get your free quote today — (850) 842-1962."

### Services (`/services`)
**Title:** "Moving Services | Beach House Moving — Santa Rosa Beach, FL"  
**Meta Description:** "Full-service moving including packing, residential moving, local & long distance, storage, and delivery. Serving the Florida Panhandle."

### About (`/about`)
**Title:** "About Us | Beach House Moving — Locally Owned Florida Panhandle Movers"

### Contact (`/contact`)
**Title:** "Contact Beach House Moving | (850) 842-1962"

### Get a Quote (`/get-a-quote`)
**Title:** "Get a Free Moving Quote | Beach House Moving"

### Thank You (`/thank-you`)
**Title:** "Thank You | Beach House Moving"  
**Robots:** noindex, nofollow

---

## Design Requirements

See `DESIGN_SYSTEM.md` for full token reference.

- Mobile-first, fully responsive
- Premium coastal aesthetic: navy, coral, sand, teal
- Playfair Display headings, Inter body
- Framer Motion scroll animations
- Lighthouse 90+ on all pages
- Brand tokens in `src/app/globals.css` via Tailwind v4 `@theme`

---

## Content Requirements

See `BRAND.md` for voice & tone guidelines.

- All business info sourced from verified data (no fabrication)
- FL Mover Reg. #IM4125 appears above the fold on every page
- Phone number `(850) 842-1962` clickable everywhere
- Service area counties confirmed: Walton, Okaloosa, Bay (+ long-distance)
- Established 2025; 3-truck fleet; open 24/7
- **SAB:** street address never displayed publicly

---

## Launch Checklist

- [ ] All pages built and responsive
- [ ] Quote form working end-to-end (form → owner notification email → `/thank-you` redirect)
- [ ] GA4 installed (env-driven) and conversion events firing
- [ ] Google Search Console verified and sitemap submitted at `https://beachhousemoving.xyz/sitemap.xml`
- [ ] Custom domain `beachhousemoving.xyz` connected and SSL active on Vercel (`www` → apex)
- [ ] All images have alt text
- [ ] Lighthouse score 90+ on homepage
- [ ] `MovingCompany` JSON-LD schema validated (SAB — no street address in public output)
- [ ] `.env.example` committed, `.env.local` not committed
- [ ] Facebook page link in footer
- [ ] Phone number click-to-call working on mobile
- [ ] 404 page designed
- [ ] Testimonials remain hidden (`FLAGS.SHOW_TESTIMONIALS: false`) until verified reviews exist

---

## Future Phases (v2+)

- Customer confirmation email + React email templates (`/src/emails/`)
- Online booking calendar integration (Calendly or custom)
- Blog / moving tips content for SEO
- Google Reviews API integration (live review feed; enable `FLAGS.SHOW_TESTIMONIALS`)
- Live chat (Tidio or similar)
- Yelp / Nextdoor profile links
- Referral program landing page
