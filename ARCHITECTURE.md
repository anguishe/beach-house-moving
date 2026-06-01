# ARCHITECTURE.md — Beach House Moving

> Technical architecture for the marketing site and lead-generation flow. Update this file when adding routes, major components, or integrations.

**Canonical domain:** `https://beachhousemoving.xyz` (apex; `www` → apex). The `.com` domain is not owned.

---

## Site Map (Routes)

| Route | Purpose | Indexable |
|---|---|---|
| `/` | Homepage — hero, trust, services, areas, gallery, quote form, FAQ, CTA | Yes |
| `/services` | Services hub — all 6 services | Yes |
| `/services/[slug]` | Individual service pages (6 slugs) | Yes |
| `/service-areas` | Service areas hub — Walton, Okaloosa, Bay Counties | Yes |
| `/service-areas/[county]` | County landing pages (3 slugs) | Yes |
| `/about` | Business story, values, license | Yes |
| `/contact` | Phone, email, service area, map embed, contact info | Yes |
| `/get-a-quote` | Dedicated quote form page | Yes |
| `/thank-you` | Post-submission confirmation (noindex) | No |
| `not-found` (`404`) | Branded 404 with helpful links | N/A |

### Service slugs (`/services/[slug]`)

`residential-moving`, `local-moving`, `long-distance-moving`, `packing-unpacking`, `storage`, `delivery`

### County slugs (`/service-areas/[county]`)

`walton-county`, `okaloosa-county`, `bay-county`

### Sitemap & robots

- **Sitemap:** `/src/app/sitemap.ts` — emits all indexable routes at `https://beachhousemoving.xyz/sitemap.xml`
- **Robots:** `/src/app/robots.ts` — apex canonical; `/thank-you` excluded from indexing

---

## Component Hierarchy

### Layout (`/src/components/layout/`)

| Component | Role |
|---|---|
| `Navbar.tsx` | Sticky nav, phone (secondary), primary CTA “Get a Free Quote” |
| `Footer.tsx` | Links, NAP (name + phone + service area — **no street address**), license, social |
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
| `TestimonialsSection.tsx` | Homepage — **gated by `FLAGS.SHOW_TESTIMONIALS` (currently `false`)** |
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

All business copy, NAP, services, areas, metadata, and flags live in **`/src/lib/content.ts`**. Components import from there — never hardcode phone, email, or addresses in JSX.

### Quote submission (v1.1)

```
User fills QuoteForm
  → client-side validation (zod via react-hook-form)
  → POST /api/quote
  → server validates with quoteFormSchema (zod)
  → Resend sends owner notification email only
       from: RESEND_FROM_EMAIL (default quotes@beachhousemoving.xyz)
       to:   RESEND_TO_EMAIL (default beachhousemoving@gmail.com)
  → 200 JSON { success: true }
  → client fires GA4 generate_lead (gtag)
  → client navigates to /thank-you (noindex)
```

**v2 / future:** Customer confirmation email + React email templates in `/src/emails/` — not built in v1.1.

### Analytics

- GA4 loaded in root `layout.tsx` when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- `generate_lead` — fired in `QuoteForm.tsx` before redirect to `/thank-you`
- `contact` — fired on phone link clicks via `trackPhoneClick()`

---

## SEO & Structured Data

Metadata for every indexable page is built via `buildMetadata()` in `/src/lib/seo.ts` (title, description, canonical, Open Graph, Twitter).

JSON-LD helpers live in `/src/lib/structured-data.ts`:

| Schema type | Where emitted | Notes |
|---|---|---|
| `MovingCompany` | Root layout (sitewide) | SAB — no `streetAddress` in public output; locality/region only via `PostalAddress` |
| `Service` | Individual service pages | Provider = MovingCompany |
| `BreadcrumbList` | Service and area detail pages | |
| `FAQPage` | Pages with `FAQSection` | One FAQ block per page — page-scoped Q&A |
| County `MovingCompany` + `Service` | `/service-areas/[county]` | Local SEO for each county |

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
