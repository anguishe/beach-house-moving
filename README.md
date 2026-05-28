# 🏖️ Beach House Moving — Landing Page

A premium, conversion-optimized marketing website for **Beach House Moving**, a locally owned and fully licensed moving & storage company serving the Florida Panhandle.

**Live Domain:** [beachhousemoving.com](https://beachhousemoving.com)  
**Business Phone:** (850) 842-1962  
**Business Email:** beachhousemoving@gmail.com  
**Address:** 110 Via Largo, Santa Rosa Beach, FL 32459  
**Service Area:** Walton County · Okaloosa County · Bay County · Local & Long Distance

---

## 🎯 Project Goal

Build a world-class landing page that:
- Wins trust immediately (licensed, insured, local, family-owned)
- Drives quote requests (primary CTA) and phone calls (secondary CTA)
- Outranks competitors in local SEO for "movers Santa Rosa Beach FL" and adjacent queries
- Loads fast, looks stunning on mobile, and converts visitors into customers

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| UI Components | shadcn/ui |
| Animations | Framer Motion |
| Forms | react-hook-form + zod |
| Icons | lucide-react |
| Analytics | Google Analytics 4 |
| Hosting | Vercel |
| Email | Resend (transactional) |

Full details → `TECH_STACK.md`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm 9+ or pnpm 8+
- Git
- A Vercel account (for deployment)

### 1. Clone / Open in Cursor

You already have the `beach-house-moving` directory open. If starting fresh:

```bash
cd beach-house-moving
```

### 2. Initialize Next.js Project

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

When prompted:
- ✅ TypeScript → Yes
- ✅ ESLint → Yes
- ✅ Tailwind CSS → Yes
- ✅ `src/` directory → Yes
- ✅ App Router → Yes
- ✅ Import alias `@/*` → Yes

### 3. Install Core Dependencies

```bash
npm install framer-motion react-hook-form zod @hookform/resolvers lucide-react resend
```

### 4. Install & Initialize shadcn/ui

```bash
npx shadcn@latest init
```

When prompted:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

Then install the components you'll use:

```bash
npx shadcn@latest add button card dialog form input label select textarea badge accordion navigation-menu sheet
```

### 5. Configure Environment Variables

Create `.env.local` in the project root:

```env
# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BUSINESS_PHONE=8508421962
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxx
RESEND_FROM_EMAIL=quotes@beachhousemoving.com
RESEND_TO_EMAIL=beachhousemoving@gmail.com

# Optional: Google Maps Embed API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza_xxxxxxxxxxxxxx
```

> ⚠️ Never commit `.env.local` — it is already in `.gitignore`.

### 6. Update Tailwind Config

Replace the `tailwind.config.ts` theme with the tokens from `DESIGN_SYSTEM.md`. A pre-built config is in `/config/tailwind.config.ts`.

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 8. Deploy to Vercel

```bash
npx vercel
```

Follow prompts to link to your Vercel project. Set all `.env.local` values as Environment Variables in the Vercel dashboard.

---

## 📁 Project Structure

```
beach-house-moving/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fonts, metadata
│   │   ├── page.tsx                # Homepage
│   │   ├── about/page.tsx          # About page
│   │   ├── services/page.tsx       # Services page
│   │   ├── contact/page.tsx        # Contact / quote page
│   │   └── api/
│   │       └── quote/route.ts      # Quote form submission handler
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   ├── ServiceAreaSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── QuoteFormSection.tsx
│   │   │   └── CTABannerSection.tsx
│   │   └── ui/                     # shadcn/ui components live here
│   ├── lib/
│   │   ├── content.ts              # All site copy, contact info, services
│   │   ├── schema.ts               # Zod validation schemas
│   │   └── utils.ts                # shadcn utils + custom helpers
│   └── styles/
│       └── globals.css             # Tailwind base + CSS variables
├── public/
│   ├── images/
│   └── favicon.ico
├── .cursorrules
├── .env.local                      # Not committed
├── .env.example                    # Committed — template
├── ARCHITECTURE.md
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
npm run type-check   # Run TypeScript compiler check
```

---

## 🔗 Key References

- Architecture decisions → `ARCHITECTURE.md`
- Brand voice & visual identity → `BRAND.md`
- Design tokens & UI rules → `DESIGN_SYSTEM.md`
- Package decisions & rationale → `TECH_STACK.md`
- Agent/AI behavior rules → `AGENTS.md` + `.cursorrules`
- Third-party integrations → `INTEGRATIONS.md`
