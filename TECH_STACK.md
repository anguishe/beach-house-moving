# TECH_STACK.md — Beach House Moving

> Every package in this project is listed here with its purpose and setup notes. Agents must check here before installing new dependencies. Do not add packages without updating this file.

**Runtime:** Node.js 20+  
**Canonical domain:** `https://beachhousemoving.xyz`

---

## Core Framework

### Next.js 16 (App Router)
- **Version:** `16.2.6`
- **Why:** Best-in-class React framework. App Router enables server components, streaming, and layout nesting. Built-in image optimization, font optimization, and metadata API are critical for this project.
- **Key features used:** App Router, Server Components, Route Handlers (`/api`), `next/image`, `next/font`, Metadata API, `sitemap.ts`, `robots.ts`
- **Docs:** https://nextjs.org/docs

### React
- **Version:** `19.2.4` (`react`, `react-dom`)
- **Why:** Latest React with App Router compatibility.

### TypeScript
- **Version:** `^5`
- **Config:** Strict mode enabled in `tsconfig.json`
- **Why:** Type safety prevents bugs in form handling and API routes. Essential for a team/AI-assisted project.

### Tailwind CSS v4 (CSS-first)
- **Version:** `^4` (via `tailwindcss` + `@tailwindcss/postcss`)
- **Why:** Utility-first CSS with design tokens colocated in CSS via `@theme`.
- **Config:** Brand tokens live in `src/app/globals.css` (`@theme` block). `tailwind.config.ts` is neutralized — **do not** add v3 `theme.extend`.
- **Docs:** https://tailwindcss.com/docs

---

## UI Layer

### shadcn/ui (base-nova)
- **Version:** `shadcn@^4.8.2` with `@base-ui/react@^1.5.0`
- **Why:** Accessible, composable components we own and can theme. base-nova variant uses `@base-ui/react` primitives.
- **Components installed:** Button, Card, Dialog, Form, Input, Label, Select, Textarea, Badge, Accordion, NavigationMenu, Sheet
- **Docs:** https://ui.shadcn.com

### Framer Motion
- **Package:** `framer-motion`
- **Version:** `^12.40.0`
- **Why:** Best-in-class React animation library. Scroll-triggered animations, smooth page transitions, stagger effects for card grids.
- **Usage:** Section reveals, card hovers, mobile menu transitions
- **Docs:** https://www.framer.com/motion/

### lucide-react
- **Package:** `lucide-react`
- **Version:** `^1.16.0`
- **Why:** Clean, consistent icon set. The only icon library used in this project — no mixing.
- **Usage:** Service icons, trust badges, nav icons, footer, form labels

### Supporting UI utilities
- `class-variance-authority`, `clsx`, `tailwind-merge` — component variant and class merging
- `tailwindcss-animate`, `tw-animate-css` — animation utilities

---

## Forms & Validation

### react-hook-form
- **Package:** `react-hook-form`
- **Version:** `^7.76.1`
- **Why:** Performant, uncontrolled form library. Minimal re-renders. Best DX with zod.
- **Usage:** Quote form

### zod
- **Package:** `zod`
- **Version:** `^4.4.3`
- **Why:** TypeScript-first schema validation. Used both client-side (form validation) and server-side (Route Handler input validation).
- **Usage:** All form schemas in `/src/lib/schema.ts`

### @hookform/resolvers
- **Package:** `@hookform/resolvers`
- **Version:** `^5.4.0`
- **Why:** Bridge package connecting react-hook-form with zod schemas
- **Usage:** `zodResolver` in all forms

---

## Email

### Resend
- **Package:** `resend`
- **Version:** `^6.12.4`
- **Why:** Modern transactional email service with a clean API, excellent deliverability, and a generous free tier (3,000 emails/month).
- **v1.1 usage:** Owner notification email only when a quote form is submitted (`/api/quote`)
- **Sending domain:** `quotes@beachhousemoving.xyz` (via `RESEND_FROM_EMAIL` or `EMAIL.quotesFrom` fallback)
- **Setup:** API key in `RESEND_API_KEY` env var
- **Docs:** https://resend.com/docs

#### v2 / future
- Customer confirmation email on quote submission
- React email templates in `/src/emails/` (not built in v1.1)

---

## Analytics

### Google Analytics 4
- **Why:** Industry standard, free, integrates with Google Search Console for SEO monitoring
- **Setup:** `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var (set in Vercel — not hardcoded in source)
- **Implementation:** `gtag` script in root `layout.tsx` when env var is present; helpers in `/src/lib/gtag.ts`
- **Key events to track:**
  - `generate_lead` — quote form submitted (fired in `QuoteForm.tsx` before redirect to `/thank-you`)
  - `contact` — phone number clicked
  - `page_view` — automatic

---

## Fonts (next/font)

### Playfair Display
- **Source:** Google Fonts via `next/font/google`
- **Weights:** 400, 600, 700
- **CSS variable:** `--font-playfair` → `@theme` `--font-heading` → `font-heading`

### Inter
- **Source:** Google Fonts via `next/font/google`
- **Weights:** 400, 500, 600
- **CSS variable:** `--font-inter` → `@theme` `--font-body` → `font-body`

**Why `next/font`:** Zero layout shift, self-hosted automatically, no external network requests at render time.

---

## Hosting & Deployment

### Vercel
- **Why:** Zero-config Next.js deployment. Edge network, automatic HTTPS, branch previews, instant rollbacks.
- **Plan:** Hobby (free) is sufficient; upgrade to Pro if traffic warrants it
- **Domain:** Connect `beachhousemoving.xyz` via Vercel dashboard → Domains (`www` redirects to apex)
- **Environment Variables:** Set all `.env.local` vars in Vercel dashboard → Settings → Environment Variables

---

## Development Tools

### ESLint
- **Package:** `eslint`, `eslint-config-next`
- **Version:** `eslint@^9`, `eslint-config-next@16.2.6`
- **Run:** `npm run lint`

---

## Installed Versions (from package.json)

| Package | Version |
|---|---|
| next | 16.2.6 |
| react / react-dom | 19.2.4 |
| tailwindcss | ^4 |
| @tailwindcss/postcss | ^4 |
| framer-motion | ^12.40.0 |
| react-hook-form | ^7.76.1 |
| zod | ^4.4.3 |
| resend | ^6.12.4 |
| lucide-react | ^1.16.0 |
| shadcn | ^4.8.2 |
| @base-ui/react | ^1.5.0 |
| typescript | ^5 |
| @types/node | ^20 |

---

## What We Are NOT Using (and Why)

| Package | Why Excluded |
|---|---|
| Redux / Zustand | No global state needed; overkill for a marketing site |
| Prisma / database | No dynamic data; all content is static in `/lib/content.ts` |
| Next-Auth | No auth needed |
| Contentlayer / Sanity / CMS | Content is simple enough to manage in code; CMS adds complexity without value at launch |
| Chakra UI / MUI | Heavier than shadcn; harder to customize; conflicts with Tailwind |
| Axios | Native `fetch` is sufficient |
| jQuery | Absolutely not |
