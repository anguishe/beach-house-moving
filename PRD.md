# PRD.md — Beach House Moving Website

**Product:** Beach House Moving — Marketing Website & Lead Generation Platform  
**Version:** 1.0  
**Status:** In Development  
**Last Updated:** 2025

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
| Trust | First impression credibility | "Licensed & Insured" above fold |

---

## Non-Goals (v1.0)

- Online booking / payment processing (future phase)
- Customer portal or account system
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
- As a skeptical consumer, I want to read real reviews before committing to a quote request.
- As a busy person, I want to fill out a quick quote form and receive a confirmation so I know someone will follow up.

### Business Owner
- As the business owner, I want to receive an email immediately when someone submits a quote request so I can follow up quickly.
- As the business owner, I want the site to rank for local moving search terms so I get inbound leads without paid ads.
- As the business owner, I want to update my services and service areas without needing a developer.

---

## Functional Requirements

### FR-01: Homepage
- Hero section with headline, subheadline, primary CTA ("Get a Free Quote"), and phone number
- Trust badges: Licensed & Insured, Locally Owned, Free Estimates, Always Available
- Services overview (6 services with icons)
- Service area section (Walton, Okaloosa, Bay Counties)
- Testimonials / social proof section
- Inline quote form
- Final CTA banner

### FR-02: Navigation
- Sticky navbar with logo, nav links (Services, About, Service Areas, Contact), and "Get a Quote" CTA button
- Mobile: hamburger menu with slide-in drawer (shadcn Sheet component)
- Phone number visible in navbar on desktop

### FR-03: Quote Form
- Fields: Full Name, Phone Number, Email, Move Type (Residential/Commercial/Storage/Delivery), Move Date, Moving From (City/ZIP), Moving To (City/ZIP), Additional Notes
- Client-side validation (react-hook-form + zod)
- On submit: POST to `/api/quote`, send email via Resend, show success message, fire GA4 event
- Error handling: show field-level errors, show server error gracefully

### FR-04: Services Pages
- `/services` — overview of all 6 services
- `/services/[slug]` — individual service page for SEO
- Each service page: title, description, what's included, CTA

### FR-05: Service Area Pages
- `/service-areas` — overview with county map
- `/service-areas/[area]` — individual county/city pages for local SEO
- Content: what we offer in that area, specific cities served, CTA

### FR-06: About Page
- Business story and founding
- Why locally owned matters
- Values and commitment
- Team/owner photo (placeholder until assets provided)
- License/insurance badge

### FR-07: Contact Page
- Phone number (click-to-call)
- Email address
- Address
- Google Maps embed (service area)
- Contact form (simpler than quote form)
- Business hours

### FR-08: Footer
- Logo
- Navigation links
- Contact information (phone, email, address)
- License/insurance statement
- Social link (Facebook)
- Copyright

### FR-09: SEO & Metadata
- Unique `<title>` and `<meta description>` for every page
- LocalBusiness JSON-LD schema on homepage
- Open Graph tags for social sharing
- `sitemap.xml` via Next.js sitemap API
- `robots.txt`

### FR-10: Analytics
- GA4 installed
- `generate_lead` event on quote form submission
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

---

## Design Requirements

See `DESIGN_SYSTEM.md` for full token reference.

- Mobile-first, fully responsive
- Premium coastal aesthetic: navy, coral, sand, teal
- Playfair Display headings, Inter body
- Framer Motion scroll animations
- Lighthouse 90+ on all pages

---

## Content Requirements

See `BRAND.md` for voice & tone guidelines.

- All business info sourced from verified data (no fabrication)
- "Licensed & Insured" appears on every page
- Phone number `(850) 842-1962` clickable everywhere
- Service area counties confirmed: Walton, Okaloosa, Bay

---

## Launch Checklist

- [ ] All pages built and responsive
- [ ] Quote form working end-to-end (form → email → confirmation)
- [ ] GA4 installed and conversion events firing
- [ ] Google Search Console verified and sitemap submitted
- [ ] Custom domain connected and SSL active on Vercel
- [ ] All images have alt text
- [ ] Lighthouse score 90+ on homepage
- [ ] LocalBusiness JSON-LD schema validated
- [ ] `.env.example` committed, `.env.local` not committed
- [ ] Facebook page link in footer
- [ ] Phone number click-to-call working on mobile
- [ ] 404 page designed

---

## Future Phases (v2+)

- Online booking calendar integration (Calendly or custom)
- Blog / moving tips content for SEO
- Google Reviews API integration (live review feed)
- Live chat (Tidio or similar)
- Yelp / Nextdoor profile links
- Referral program landing page
