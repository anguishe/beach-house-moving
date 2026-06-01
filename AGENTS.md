# AGENTS.md — Beach House Moving

> This file defines the rules, roles, and responsibilities for all AI agents (Cursor, Claude, etc.) working in this codebase. Read this before touching any code.

---

## Agent Roles

### 🏗️ Architect Agent
**When active:** Planning new features, restructuring the project, making package decisions
**Responsibilities:**
- Update `ARCHITECTURE.md` when adding pages, routes, or major components
- Update `TECH_STACK.md` when adding or removing packages
- Never implement without a clear plan documented in the relevant `.md` file first

### 🎨 UI/Design Agent
**When active:** Building or modifying any visual component or section
**Responsibilities:**
- Follow `DESIGN_SYSTEM.md` without exception
- Follow `BRAND.md` for all copy and visual decisions
- All components must be responsive (mobile-first)
- Brand tokens live in `src/app/globals.css` via Tailwind v4 `@theme` — check `DESIGN_SYSTEM.md` before using any color, font, or spacing value

### 💻 Dev Agent
**When active:** Writing code, fixing bugs, implementing features
**Responsibilities:**
- Follow `.cursorrules` for all code style decisions
- Follow `ARCHITECTURE.md` for file placement
- Write TypeScript strict — no `any`
- Always write the loading and error state, not just the happy path
- Never hardcode business contact info — import from `/src/lib/content.ts`

### 📝 Content Agent
**When active:** Writing or editing any text on the site
**Responsibilities:**
- Follow `BRAND.md` voice & tone guidelines without exception
- All copy goes into `/src/lib/content.ts` — not hardcoded in JSX
- SEO-aware: target keywords in `ARCHITECTURE.md` should appear naturally in headings and body
- Do not fabricate reviews, awards, or statistics that aren't confirmed

### 🔌 Integration Agent
**When active:** Setting up or modifying third-party services (email, analytics, maps)
**Responsibilities:**
- Follow `INTEGRATIONS.md` for all service setup
- Never commit API keys — all secrets go in `.env.local` and Vercel env vars
- Update `INTEGRATIONS.md` when adding or modifying any integration

---

## Universal Agent Rules (All Agents)

### Before Starting Any Task
1. Read `.cursorrules`
2. Read the relevant `.md` file for the domain (design → `DESIGN_SYSTEM.md`, content → `BRAND.md`, etc.)
3. Understand the task fully before writing any code

### While Working
- Work in small, focused commits — one logical change at a time
- Never delete code without understanding what it does
- If something is unclear, add a `// TODO: clarify` comment and note it — don't guess
- Preserve all existing functionality when making changes

### Code Quality Non-Negotiables
- No `console.log` left in production code
- No unused imports
- No commented-out blocks of old code
- TypeScript errors must be resolved — never use `@ts-ignore` without a comment explaining why
- All async operations have loading states and error handling

### File Creation Rules
- New components → `/src/components/sections/` or `/src/components/ui/`
- New pages → `/src/app/[route]/page.tsx`
- New utilities → `/src/lib/`
- New API routes → `/src/app/api/[route]/route.ts`
- New types → define inline or in `/src/types/index.ts`

### Copy & Content Rules
- All text content lives in `/src/lib/content.ts`
- **SAB:** No street address anywhere in public UI. The address in `content.ts` exists for schema locality / GBP consistency only (`displayAddress: false`).
- Phone number format in display: `(850) 842-1962`
- Phone number in `href`: `tel:+18508421962`
- Email: `beachhousemoving@gmail.com`
- Canonical website: `https://beachhousemoving.xyz` — never reference `beachhousemoving.com` (not owned)
- Never render testimonials while `FLAGS.SHOW_TESTIMONIALS` is `false`
- Never fabricate testimonials, review counts, years in business, or move counts

### What Agents Must NEVER Do
- ❌ Commit `.env.local` or any file containing API keys
- ❌ Add new npm packages without updating `TECH_STACK.md`
- ❌ Add new pages without updating `ARCHITECTURE.md`
- ❌ Modify design tokens without updating `DESIGN_SYSTEM.md`
- ❌ Override brand voice guidelines from `BRAND.md`
- ❌ Use `<img>` instead of `next/image`
- ❌ Write inline styles (use Tailwind classes)
- ❌ Skip mobile responsiveness
- ❌ Skip accessibility (ARIA, semantic HTML, keyboard nav)
- ❌ Write copy that makes unverified claims about the business

---

## How to Handle Ambiguity

If an agent encounters a requirement that isn't covered by these docs:

1. Default to the principle that best serves the **customer's trust and conversion**
2. Follow established patterns already in the codebase
3. Flag the ambiguity with a `// TODO: decision needed —` comment
4. Do not make architectural or brand decisions unilaterally — surface them

---

## Task Checklist Template

Before marking any task complete, verify:

- [ ] Code runs without TypeScript errors (`npm run type-check`)
- [ ] Code passes lint (`npm run lint`)
- [ ] Component is responsive on mobile, tablet, desktop
- [ ] All text content is sourced from `/src/lib/content.ts`
- [ ] No hardcoded phone numbers, emails, or street addresses in JSX
- [ ] All images use `next/image` with alt text
- [ ] Loading and error states exist for async operations
- [ ] Relevant `.md` files updated if architecture/design/integrations changed
- [ ] No `console.log` in production code
- [ ] No unused imports or variables
