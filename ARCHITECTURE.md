# ARCHITECTURE.md — Beach House Moving

> Technical architecture for the marketing site and lead-generation flow. Update this file when adding routes, major components, or integrations.

**Canonical domain:** `https://beachhousemoving.xyz` (apex; `www` → apex). The `.com` domain is not owned.

---

## Site Map (Routes)

### Route tree (indexable)

```
/
├── /services
│   ├── /services/residential-moving
│   ├── /services/local-moving
│   ├── /services/long-distance-moving
│   ├── /services/packing-unpacking
│   ├── /services/storage
│   ├── /services/delivery
│   └── /services/junk-removal
├── /service-areas
│   ├── /service-areas/[county]  (walton-county, okaloosa-county, bay-county)
│   └── /service-areas/[county]/[neighborhood]  (26 neighborhood pages)
├── /resources
│   └── /resources/[slug]  (3 blog posts from src/content/posts.ts)
├── /about
├── /contact
├── /get-a-quote
├── /pricing
└── /reviews   ← live Google reviews + static written reviews + AggregateRating schema
```

| Route | Purpose | Indexable |
|---|---|---|
| `/` | Homepage — hero, trust, services, areas, gallery, live Google reviews carousel (or static testimonials fallback), quote form, FAQ, CTA | Yes |
| `/services` | Services hub — all 7 services | Yes |
| `/services/[slug]` | Individual service pages (6 slugs via dynamic route) | Yes |
| `/services/junk-removal` | Dedicated junk removal page (custom sections + JSON-LD) | Yes |
| `/reviews` | Social proof hub — live Google reviews grid, SEO content, written testimonials, AggregateRating JSON-LD, Google review funnel | Yes |
| `/pricing` | Moving cost guidance — factors, how-to-get-a-quote, FAQ | Yes |
| `/resources` | Blog/resources hub — article cards linking to posts | Yes |
| `/resources/[slug]` | Individual blog posts (BlogPosting + FAQPage JSON-LD) | Yes |
| `/service-areas` | Service areas hub — Walton, Okaloosa, Bay Counties | Yes |
| `/service-areas/[county]` | County landing pages (3 slugs) | Yes |
| `/service-areas/[county]/[neighborhood]` | Neighborhood landing pages (26 slugs) | Yes |
| `/about` | Business story, values, license | Yes |
| `/contact` | Phone, email, service area, map embed, contact info | Yes |
| `/get-a-quote` | Dedicated quote form page | Yes |
| `/thank-you` | Post-submission confirmation (noindex) | No |
| `not-found` (`404`) | Branded 404 with helpful links | N/A |

### Service slugs (`/services/[slug]`)

`residential-moving`, `local-moving`, `long-distance-moving`, `packing-unpacking`, `storage`, `delivery`, `junk-removal`

### County slugs (`/service-areas/[county]`)

`walton-county`, `okaloosa-county`, `bay-county`

### Neighborhood slugs (`/service-areas/[county]/[neighborhood]`)

26 programmatic pages across Walton (16), Okaloosa (7), and Bay (3) counties — see `NEIGHBORHOODS` in `content.ts`.

### Resource post slugs (`/resources/[slug]`)

`moving-to-30a-neighborhood-guide`, `military-pcs-move-eglin-hurlburt`, `new-construction-beach-home-move`

### Sitemap & robots

- **Sitemap:** `/src/app/sitemap.ts` — emits all indexable routes at `https://beachhousemoving.xyz/sitemap.xml`
- **Robots:** `/src/app/robots.ts` — apex canonical; AI crawler allow rules; `/thank-you` excluded from indexing

---

## Component Hierarchy

### Layout (`/src/components/layout/`)

| Component | Role |
|---|---|
| `Navbar.tsx` | Sticky nav, phone (secondary), primary CTA “Get a Free Quote” |
| `Footer.tsx` | Links (incl. Resources), NAP (name + phone + service area — **no street address**), license, social |
| `PageShell.tsx` | Shared page wrapper for inner pages |
| `SkipToContent.tsx` | Accessibility skip link |

### Sections (`/src/components/sections/`)

| Component | Used on |
|---|---|
| `HeroSection.tsx` | Homepage — headline, license badge (#IM4125), primary quote CTA, phone secondary |
| `TrustSection.tsx` | Homepage — trust badges (Licensed, Locally Owned, Free Estimates, 24/7) |
| `ServicesSection.tsx` | Homepage, services hub |
| `ServiceAreaSection.tsx` | Homepage, service-areas hub |
| `GalleryStrip.tsx` | Homepage — photo strip |
| `GoogleReviewsCarousel.tsx` | Homepage — live Google reviews (ISR); renders null if API unavailable |
| `TestimonialsSection.tsx` | Homepage fallback when Google Places API returns no reviews — **gated by `FLAGS.SHOW_TESTIMONIALS` (currently `true`)** |
| `GoogleReviewsGrid.tsx` | `/reviews` — live Google reviews grid |
| `WrittenReviewsSection.tsx` | `/reviews` — static written testimonials for SEO depth |
| `ReviewsGrid.tsx` | Legacy static grid (superseded on `/reviews` by `GoogleReviewsGrid`) |
| `QuoteFormSection.tsx` | Homepage, `/get-a-quote` |
| `FAQSection.tsx` | Homepage, about, contact, service pages — one FAQ block per page |
| `CTABanner.tsx` | Homepage, inner pages — final conversion banner |
| `ServiceCTA.tsx` | Service / area detail pages |

### Forms (`/src/components/forms/`)

| Component | Role |
|---|---|
| `QuoteForm.tsx` | Quote capture — react-hook-form + zod, POST `/api/quote` |

### SEO (`/src/components/seo/`)

| Component | Role |
|---|---|
| `JsonLd.tsx` | Renders JSON-LD script tags |

### UI (`/src/components/ui/`)

shadcn/ui (base-nova) primitives — Button, Form, Input, Select, Sheet, etc.

---

## Data Flow

### Content source

All business copy, NAP, services, areas, metadata, and flags live in **`/src/lib/content.ts`**. Blog posts live in **`/src/content/posts.ts`**. Components import from there — never hardcode phone, email, or addresses in JSX.

### Google Reviews (ISR)

```
Build / revalidate (86400s)
  → fetchGoogleReviews() + fetchPlaceSummary() in google-reviews.ts
  → Places API (server-only GOOGLE_PLACES_API_KEY)
  → Homepage: GoogleReviewsCarousel OR TestimonialsSection fallback
  → /reviews: GoogleReviewsGrid + live rating summary in hero/schema
```

### Quote submission (v1.1)

```
User fills QuoteForm
  → client-side validation (zod via react-hook-form)
  → POST /api/quote
  → server validates with quoteFormSchema (zod)
  → Resend sends owner notification email only
  → 200 JSON { success: true }
  → client fires GA4 generate_lead (gtag) + GTM dataLayer
  → client navigates to /thank-you (noindex)
```

**v2 / future:** Customer confirmation email + React email templates in `/src/emails/` — not built in v1.1.

### Analytics

- GTM loaded in root `layout.tsx` (`strategy="afterInteractive"`)
- GA4 also loaded directly when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set — **owner must confirm no double-counting if GA4 is also configured inside GTM**
- `generate_lead` — fired in `QuoteForm.tsx` before redirect to `/thank-you`
- `contact` + `phone_click` dataLayer event — fired on phone link clicks via `trackPhoneClick()`

---

## SEO & Structured Data

Metadata for every indexable page is built via `buildMetadata()` in `/src/lib/seo.ts` (title, description, canonical, Open Graph, Twitter).

JSON-LD helpers live in `/src/lib/structured-data.ts`:

| Schema type | Where emitted | Notes |
|---|---|---|
| `MovingCompany` | Root layout (sitewide, **no** aggregateRating) | SAB — no `streetAddress` in public output |
| `MovingCompany` + `aggregateRating` | Homepage only (`includeRating: true`) | Rating visible on homepage carousel |
| `WebSite` | Root layout | |
| `Service` | Individual service pages | Provider = MovingCompany |
| `BreadcrumbList` | Service, area, resource detail pages | |
| `FAQPage` | Pages with `FAQSection` or post FAQ blocks | Page-scoped Q&A |
| County `MovingCompany` + `Service` | `/service-areas/[county]` | Local SEO for each county |
| Neighborhood `MovingCompany` | `/service-areas/[county]/[neighborhood]` | Geo coords at 5 decimal places |
| `AggregateRating` + `Review` | `/reviews` | Live count from Places API when available; falls back to `REVIEWS_PAGE_META` |
| `BlogPosting` + `FAQPage` | `/resources/[slug]` | Article schema per post |
| `ItemList` | `/resources` hub | All posts listed |

**Service-Area Business rule:** The street address in `content.ts` exists for schema locality/GBP consistency only (`displayAddress: false`). It is never rendered in public UI or exposed as `streetAddress` in JSON-LD.

---

## File Placement Conventions

| What | Where |
|---|---|
| Pages | `/src/app/[route]/page.tsx` |
| API routes | `/src/app/api/[route]/route.ts` |
| Section components | `/src/components/sections/` |
| Layout components | `/src/components/layout/` |
| UI primitives | `/src/components/ui/` |
| Content & config | `/src/lib/content.ts` |
| Blog posts | `/src/content/posts.ts` |
| Google reviews fetch | `/src/lib/google-reviews.ts` |
| Validation schemas | `/src/lib/schema.ts` |
| SEO helpers | `/src/lib/seo.ts` |
| JSON-LD builders | `/src/lib/structured-data.ts` |
| Design tokens | `/src/app/globals.css` (`@theme`) |

---

## Environment & Runtime

- **Node.js:** 20+ (see `TECH_STACK.md`)
- **Hosting:** Vercel
- **Secrets:** `.env.local` locally; Vercel Environment Variables in production
- See `INTEGRATIONS.md` for the full env var reference
