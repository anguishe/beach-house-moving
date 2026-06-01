# TECH_STACK.md — Beach House Moving

> Every package in this project is listed here with its purpose and setup notes. Agents must check here before installing new dependencies. Do not add packages without updating this file.

---

## Core Framework

### Next.js 16 (App Router)
- **Version:** `16.x` (latest stable)
- **Why:** Best-in-class React framework. App Router enables server components, streaming, and layout nesting. Built-in image optimization, font optimization, and metadata API are critical for this project.
- **Key features used:** App Router, Server Components, Route Handlers (`/api`), `next/image`, `next/font`, Metadata API
- **Docs:** https://nextjs.org/docs

### TypeScript
- **Version:** `5.x`
- **Config:** Strict mode enabled in `tsconfig.json`
- **Why:** Type safety prevents bugs in form handling and API routes. Essential for a team/AI-assisted project.

### Tailwind CSS
- **Version:** `4.x`
- **Why:** Utility-first CSS that colocates styles with markup. Faster to build, easier for AI agents to work with, consistent design tokens.
- **Config file:** `tailwind.config.ts` — extended with brand tokens per `DESIGN_SYSTEM.md`
- **Docs:** https://tailwindcss.com/docs

---

## UI Layer

### shadcn/ui
- **Version:** Latest (component-by-component install)
- **Why:** Unstyled, accessible components built on Radix UI. We own the code, can theme anything, and it's not a locked-in component library.
- **Components installed:** Button, Card, Dialog, Form, Input, Label, Select, Textarea, Badge, Accordion, NavigationMenu, Sheet
- **Docs:** https://ui.shadcn.com

### Framer Motion
- **Package:** `framer-motion`
- **Version:** `^12.x`
- **Why:** Best-in-class React animation library. Scroll-triggered animations, smooth page transitions, stagger effects for card grids.
- **Usage:** Section reveals, card hovers, mobile menu transitions
- **Docs:** https://www.framer.com/motion/

### lucide-react
- **Package:** `lucide-react`
- **Why:** Clean, consistent icon set. The only icon library used in this project — no mixing.
- **Usage:** Service icons, trust badges, nav icons, footer, form labels

---

## Forms & Validation

### react-hook-form
- **Package:** `react-hook-form`
- **Version:** `^7.x`
- **Why:** Performant, uncontrolled form library. Minimal re-renders. Best DX with zod.
- **Usage:** Quote form, contact form

### zod
- **Package:** `zod`
- **Version:** `^3.x`
- **Why:** TypeScript-first schema validation. Used both client-side (form validation) and server-side (Route Handler input validation).
- **Usage:** All form schemas in `/src/lib/schema.ts`

### @hookform/resolvers
- **Package:** `@hookform/resolvers`
- **Why:** Bridge package connecting react-hook-form with zod schemas
- **Usage:** `zodResolver` in all forms

---

## Email

### Resend
- **Package:** `resend`
- **Version:** `^3.x`
- **Why:** Modern transactional email service with a clean API, excellent deliverability, and a generous free tier (3,000 emails/month). Far simpler than SendGrid/Mailgun for this use case.
- **Usage:** Send quote request notifications to `beachhousemoving@gmail.com` + confirmation to customer
- **Setup:** API key in `RESEND_API_KEY` env var
- **Docs:** https://resend.com/docs

---

## Analytics

### Google Analytics 4
- **Why:** Industry standard, free, integrates with Google Search Console for SEO monitoring
- **Setup:** `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var
- **Implementation:** `gtag` script in root `layout.tsx`, custom events for form submissions
- **Key events to track:**
  - `generate_lead` — quote form submitted
  - `contact` — phone number clicked
  - `page_view` — automatic

---

## Fonts (next/font)

### Playfair Display
- **Source:** Google Fonts via `next/font/google`
- **Weights:** 400, 600, 700
- **Usage:** All headings (`font-heading` class)

### Inter
- **Source:** Google Fonts via `next/font/google`
- **Weights:** 400, 500, 600
- **Usage:** All body text (`font-body` class)

**Why `next/font`:** Zero layout shift, self-hosted automatically, no external network requests at render time.

---

## Hosting & Deployment

### Vercel
- **Why:** Zero-config Next.js deployment. Edge network, automatic HTTPS, branch previews, instant rollbacks.
- **Plan:** Hobby (free) is sufficient; upgrade to Pro if traffic warrants it
- **Domain:** Connect `beachhousemoving.xyz` via Vercel dashboard → Domains
- **Environment Variables:** Set all `.env.local` vars in Vercel dashboard → Settings → Environment Variables

---

## Development Tools

### ESLint
- **Config:** `next/core-web-vitals` + TypeScript rules
- **Run:** `npm run lint`

### Prettier
- **Package:** `prettier`
- **Config:** `.prettierrc` in project root
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

---

## Package Installation Reference

```bash
# Initialize
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Core UI
npm install framer-motion lucide-react

# shadcn/ui (init first, then add components)
npx shadcn@latest init
npx shadcn@latest add button card dialog form input label select textarea badge accordion navigation-menu sheet

# Forms
npm install react-hook-form zod @hookform/resolvers

# Email
npm install resend

# Dev tools
npm install -D prettier
```

---

## What We Are NOT Using (and Why)

| Package | Why Excluded |
|---|---|
| Redux / Zustand | No global state needed; overkill for a landing page |
| Prisma / database | No dynamic data; all content is static in `/lib/content.ts` |
| Next-Auth | No auth needed on a landing page |
| Contentlayer / Sanity / CMS | Content is simple enough to manage in code; CMS adds complexity without value at launch |
| Chakra UI / MUI | Heavier than shadcn; harder to customize; conflicts with Tailwind |
| Axios | Native `fetch` is sufficient for this project |
| jQuery | Absolutely not |
