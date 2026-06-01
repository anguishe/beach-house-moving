# 🏖️ Beach House Moving — Marketing Website

A premium, conversion-optimized marketing website for **Beach House Moving**, a locally owned and fully licensed moving & storage company serving the Florida Panhandle.

**Live Domain:** [beachhousemoving.xyz](https://beachhousemoving.xyz)  
**Business Phone:** (850) 842-1962  
**Business Email:** beachhousemoving@gmail.com  
**Service Area:** Walton County · Okaloosa County · Bay County · Local & Long Distance  
**Address:** Not displayed (Service-Area Business — SAB)

---

## 🎯 Project Goal

Build a multi-page marketing site that:
- Wins trust immediately (licensed #IM4125, insured, local, 24/7)
- Drives quote requests (primary CTA: "Get a Free Quote") and phone calls (secondary CTA)
- Outranks competitors in local SEO for "movers Santa Rosa Beach FL" and adjacent queries
- Loads fast, looks stunning on mobile, and converts visitors into customers

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` in `globals.css`) |
| UI Components | shadcn/ui (base-nova / `@base-ui/react`) |
| Animations | Framer Motion 12 |
| Forms | react-hook-form + zod 4 |
| Icons | lucide-react |
| Analytics | Google Analytics 4 (env-driven) |
| Hosting | Vercel |
| Email | Resend (owner notification only in v1.1) |
| Runtime | Node.js 20+ |

Full details → `TECH_STACK.md`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or later
- npm 9+ or pnpm 8+
- Git
- A Vercel account (for deployment)

### 1. Clone / Open in Cursor

```bash
cd beach-house-moving
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the committed template and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site origin (`https://beachhousemoving.xyz`; use `http://localhost:3000` locally) |
| `NEXT_PUBLIC_BUSINESS_PHONE` | Yes | Raw phone digits for click-to-call analytics (e.g. `8508421962`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes | Google Analytics 4 measurement ID (from GA4 property) |
| `RESEND_API_KEY` | Yes | Resend API key for quote form emails |
| `RESEND_FROM_EMAIL` | Yes | Verified Resend sender (e.g. `quotes@beachhousemoving.xyz`) |
| `RESEND_TO_EMAIL` | Yes | Inbox for quote notifications (e.g. `beachhousemoving@gmail.com`) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | No | Google Maps embed (free iframe embed works without this) |

Example `.env.local` for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BUSINESS_PHONE=8508421962
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxxxx
RESEND_FROM_EMAIL=quotes@beachhousemoving.xyz
RESEND_TO_EMAIL=beachhousemoving@gmail.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

> ⚠️ Never commit `.env.local` — it is gitignored. Commit only `.env.example` (no secrets).

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Deploy to Vercel

Push to GitHub and import in Vercel, or use the Vercel CLI. Set all `.env.local` values as Environment Variables in the Vercel dashboard.

---

## 📁 Project Structure

```
beach-house-moving/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fonts, GA4, MovingCompany JSON-LD
│   │   ├── globals.css             # Tailwind v4 @theme design tokens
│   │   ├── page.tsx                # Homepage
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── get-a-quote/page.tsx
│   │   ├── thank-you/page.tsx      # Post-submission (noindex)
│   │   ├── services/page.tsx
│   │   ├── services/[slug]/page.tsx
│   │   ├── service-areas/page.tsx
│   │   ├── service-areas/[county]/page.tsx
│   │   ├── not-found.tsx           # Branded 404
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── api/
│   │       └── quote/route.ts      # Quote form → Resend owner email
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PageShell.tsx
│   │   │   └── SkipToContent.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── ServiceAreaSection.tsx
│   │   │   ├── GalleryStrip.tsx
│   │   │   ├── TestimonialsSection.tsx  # Gated by FLAGS.SHOW_TESTIMONIALS
│   │   │   ├── QuoteFormSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── CTABanner.tsx
│   │   │   └── ServiceCTA.tsx
│   │   ├── forms/
│   │   │   └── QuoteForm.tsx
│   │   ├── seo/
│   │   │   └── JsonLd.tsx
│   │   └── ui/                     # shadcn/ui components
│   └── lib/
│       ├── content.ts              # All site copy, NAP, services, flags
│       ├── schema.ts               # Zod validation schemas
│       ├── seo.ts                  # Metadata builders
│       ├── structured-data.ts      # JSON-LD builders
│       ├── gtag.ts                 # GA4 event helpers
│       └── utils.ts
├── public/
│   └── images/
├── ARCHITECTURE.md
├── PRD.md
├── BRAND.md
├── DESIGN_SYSTEM.md
├── TECH_STACK.md
├── AGENTS.md
├── INTEGRATIONS.md
├── README.md
└── package.json
```

---

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server locally
npm run lint         # Run ESLint
```

---

## 🔗 Key References

- Architecture decisions → `ARCHITECTURE.md`
- Brand voice & visual identity → `BRAND.md`
- Design tokens & UI rules → `DESIGN_SYSTEM.md`
- Package decisions & rationale → `TECH_STACK.md`
- Agent/AI behavior rules → `AGENTS.md` + `.cursorrules`
- Third-party integrations → `INTEGRATIONS.md`
