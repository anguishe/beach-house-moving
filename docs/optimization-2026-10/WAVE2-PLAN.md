# Wave 2: Trust Assets and Guides Implementation Plan (7 PRs)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. **Each `## PR 2.x` section is one PR.** Ship them in the order below; each starts from a fresh `origin/main`.

**Goal:** Publish the Wave 2 trust assets from DESIGN.md: a statute-cited "Is my Florida mover legit?" guide, a same-day /
short-notice page, a rain and hurricane-season guide, a PPM/DITY expansion of the indexed PCS field guide, a 30A /
Sandestin no-work-day calendar, a "How we keep hourly honest" section on `/pricing`, and a Santa Rosa Beach, **Florida**
refresh of the cost guide. Every new URL is linked from at least 2 pages Google already indexes, and every claim about
Beach House Moving (BHM) traces to README "Owner-confirmed service facts" or to copy that is already live.

**Architecture:** Resource posts are static data in `POSTS` (`src/content/posts.ts`) rendered by
`src/app/resources/[slug]/page.tsx` (BlogPosting + FAQPage + breadcrumb JSON-LD come from the template). PR 2.1 adds four
opt-in fields to that template (`leadCta`, `sources`, block `items`, block `table`) so the guides can show a first-screen
call/quote row, cited sources with as-of dates, checklists and tables, without changing any existing post. The same-day
page is a new `SERVICES` record on the existing `/services/[slug]` template. The pricing section is new copy in
`content.ts` rendered on `/pricing`. PR 2.1 also adds `scripts/check-page.mjs`, the per-page RED/GREEN gate every later PR
uses (same style as `scripts/check-geo-links.mjs`).

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4. Static data. No new packages.

**Spec:** `docs/optimization-2026-10/DESIGN.md` ("Wave 2: trust assets and guides"). Facts: `docs/optimization-2026-10/README.md`
("Owner-confirmed service facts"). Targets: `docs/optimization-2026-10/KEYWORD-MAP.md`. Research (private, outside this
public repo; cited below as `research/<file>:<line>`): `~/Projects/docs/bhm-optimization-2026-10/research/` —
`linkable-assets.md` (LA), `question-bank.md` (QB), `competitors-and-pain-points.md` (CP), `keyword-planner-2026-10-02.md` (KP).

## PR map (merge in this order)

| PR | Branch | What | New URL | Target query (KP volume, top bid) | Depends on |
|---|---|---|---|---|---|
| 2.1 | `seo/w2-1-legit-mover` | Post template blocks + `check-page.mjs` + "Is my Florida mover legit?" | `/resources/is-my-florida-mover-legit` | moving scams 100–1K ($9.90); are movers insured 10–100; florida mover license lookup — (KP:73,79,80); AC-L "how to find a licensed mover in florida destin" (QB:289) | — |
| 2.2 | `seo/w2-2-cost-guide-florida` | Cost guide refresh: "Santa Rosa Beach, Florida" | — (edit) | how much do movers cost 10K–100K ($11.88) (KP:60); movers santa rosa beach 100–1K ($39.65) (KP:11); BHM ~#8 on the local cost SERP (QB:35, QB:300) | 2.1 |
| 2.3 | `seo/w2-3-same-day` | Same-day / short-notice service page | `/services/same-day-moving` | same day movers 1K–10K ($30.29); last minute movers 1K–10K ($25.00); short notice movers 100–1K ($39.80) (KP:35,36,50) | 2.1 (check script) |
| 2.4 | `seo/w2-4-hourly-honest` | "How we keep hourly honest" on `/pricing` | — (section `#hourly-honest`) | supports the cost cluster; answers pain point "bill above the quote / clock-milking" (CP:91, CP:220–226) | 2.1, 2.2 |
| 2.5 | `seo/w2-5-no-work-days` | 30A & Sandestin no-work-day calendar | `/resources/30a-sandestin-no-work-days-calendar` | no reportable volume (condo move rules — KP:80); AC "movers destin memorial day", "movers santa rosa beach in december" (QB:283). A linkable, citable asset. **Ship before Nov 7, 2026** so the remaining 2026 dates are still ahead | 2.1 |
| 2.6 | `seo/w2-6-rain-hurricane` | Rain and hurricane-season guide | `/resources/moving-in-rain-hurricane-season-emerald-coast` | moving in the rain 100–1K (KP:74); AC-L "hurricane season moving to destin fl", "movers… under evacuation" (QB:278) | 2.1 |
| 2.7 | `seo/w2-7-pcs-ppm` | PPM/DITY expansion of the PCS field guide | — (edit) | ppm move / dity move 100–1K ($18.00 / $8.15); pcs move checklist 100–1K (KP:70–71); AC "ppm move eglin afb" (QB:131); GSC "eglin air force base movers" 40 impr, pos 14.5 (QB:52) | 2.1 |
| 2.8 | `seo/w2-8-damage-claims` | Coverage, damage and claims page (**unblocked 10/03**) | `/coverage-and-claims` | are movers insured 10–100; certificate of insurance for movers 100–1K ($20.77) (KP); top competitor complaint themes (CP:89–90, CP:213–218) | 2.1 (check script) |
| 2.9 | `seo/w2-9-storage-revamp` | Storage revamp on `/services/storage` (**unblocked 10/03**) | — (edit) | storage santa rosa beach / storage units srb 100–1K ($25.00) (KP); GSC "storage santa rosa beach" pos ~1, 0 clicks (intent mismatch) | 2.1 (check script) |
| 2.10 | `seo/w2-10-meet-the-crew` | Meet the crew (first names + photos) on `/about` | — (section) | E-E-A-T / trust; "owners are the movers" proof | names + photos from Travis |

**Revised merge order (2026-10-03):** 2.1 → 2.5 (deadline Nov 7) → 2.4 → 2.9 → 2.8 → 2.2 → 2.7 → 2.3 → 2.6 → 2.10. See
"Revision 2026-10-03" below for why.

## Revision 2026-10-03 (Les's answers + search findings). This section wins over anything older below.
- **Facts:** Les answered the damage, claims, storage, crew and pricing questions (README "Les answers", 2026-10-03). Every
  line in "Lines held out of shipped PRs" except storm rescheduling, billing increment, deposits and full-value pricing is
  now shippable. Apply them in the PR that owns each page (table in "Formerly blocked items").
- **Order:** most priority town pages are *Discovered – not indexed* (URL Inspection API 10/03), so new URLs index slowly.
  Edits to pages Google already has (`/pricing` 2.4, storage 2.9, cost guide 2.2, PCS guide 2.7) go ahead of new URLs.
  2.1 stays first because it ships the template blocks and `check-page.mjs` every later PR uses. 2.5 keeps its Nov 7 deadline.
- **Interstate:** FMCSA SAFER showed BHM's USDOT and operating authority OUT-OF-SERVICE on 2026-10-03 (Travis: known, being
  fixed). Keep existing interstate copy. **Never print the USDOT or MC number, and never invite a federal lookup of BHM**,
  until SAFER shows ACTIVE. Re-check SAFER before PR 2.1 and 2.8.
- **Estimates:** BHM's estimate and contract are signed on site on move day, before any work starts. PR 2.1's "get it in
  writing before any work" guidance matches that; don't say "before move day".
- **Already done:** follow-up F1 (statutory "Fla. Mover Reg. No." sweep) shipped in PR #8. Live minimum claims that
  contradicted Les (storage "no rigid minimum"; delivery and loading help "no minimum") were fixed 2026-10-03, and the
  homepage schema `areaServed` now lists 30A and the Walton beach communities.
- **Off-site work matters more than any page in this wave** (`docs/SEARCH-FINDINGS-2026-10-03.md`): reviews (14 vs 41–520),
  Bing Places publishing (BHM is missing from Bing's local pack, which also feeds ChatGPT), and indexing requests. These sit
  in Wave 3 and the GSC queue, and run in parallel with these PRs.

## Global Constraints
- **Worktree per PR.** Another session works in the main checkout. Start every PR with
  `git -C ~/Projects/beach-house-moving fetch origin && git -C ~/Projects/beach-house-moving worktree add ../bhm-<branch-tail> -b <branch> origin/main`, then `npm ci` there. Never commit from the main checkout.
- **Wave 1 runs in parallel.** `SERVICES`, `SERVICE_INCLUDES`, `SERVICE_FAQ_INDICES`, `SERVICE_DETAILS`, `SERVICE_RELATED`,
  `service-images.ts`, `posts.ts`, `public/llms.txt` and `ARCHITECTURE.md` are shared. Rebase on `origin/main` right before
  opening each PR and resolve conflicts by keeping both sides.
- **Claims about BHM come only from README "Owner-confirmed service facts"**, quoted here:
  Same-day: "offered across all services when they have availability. Never promise it."
  Rain: "They work in the rain, but not if it risks any items. They confirm with the customer first."
  Interstate: "Licensed and certified for interstate moves." Never print the USDOT/MC number (see Revision 2026-10-03).
  Gulf Breeze, Pace, Milton: "Served when they have availability." Plus the published rate (`RATE_LINE`).
  **Copy that is already live on the site may be reused, not extended** (e.g. "drive time is billed on top — we tell you
  both before the job starts", "a real person answers the phone, day or night", "the owners are the movers"). Since 2026-10-03 the
  README "Les answers" table also counts (coverage, claims, storage terms, same-day pricing, the 2-hour minimum, drive time,
  weight tickets, not-to-exceed, move-day signing). Still nothing about weather rescheduling, billing increments, deposits,
  full-value-protection pricing or per-category storage prices.
- **Third-party facts** come only from `research/linkable-assets.md` and each carries its source URL. Before opening the PR,
  re-open every source URL the PR cites, confirm the fact still reads the same, and record URL + check date in the PR body and
  in the post's `sources[].asOf`. Drop any fact that changed, 404s, or can't be confirmed. Never cite the Army.mil 24/7 PPA
  line (LA:176, year unconfirmed). Guides are "general information, not legal advice".
- **`src/content/posts.ts` must stay import-free** (`scripts/check-meta.mjs` loads it with Node type stripping). In posts, write
  the rate literally as RATE_LINE's current text, **`$195/hr for 2 movers and a truck, plus drive time`**, and never show the
  rate without "plus drive time" (ch. 507 note on `PRICING` in `content.ts`). Pages and `content.ts` use `RATE_LINE`.
- `<title>` ≤ 65 chars including any brand suffix (aim ≤ 60); meta description ≤ 160; titles unique. Posts have no title
  template, so `metaTitle ?? title` is the whole `<title>`. Enforced by `npm run build` → `scripts/check-meta.mjs` and by
  `scripts/check-page.mjs`. Character counts below were measured with `String.length`.
- No prices beyond the published rate. Phone in copy `(850) 842-1962`. **No street address anywhere, including inside
  screenshots.** No named competitors. Name a partner only where an existing post already does.
- Text contrast ≥ 4.5:1 using only the AA-safe pairs in CLAUDE.md. New UI in this plan uses: white on `bg-brand-coral` (4.6),
  `brand-navy` on white/sand (14.1/12.4), `brand-teal-dark` on white (7.3), `ink-muted` on white (7.5). No new colors.
- **Dates.** New post: `datePublished` = the day the PR is opened (it must be ≤ the build date or the preview 404s); the
  reviewing session sets it to the merge date in a one-line commit at merge. Edited post: `dateModified` = ship date when a
  sentence or section changes (an anchor-only href change does not count). Edited service: `updatedAt` = ship date.
  `/pricing` and `/resources` have **manual** `lastModified` dates in `src/app/sitemap.ts`: bump `/pricing` when its copy
  changes (PR 2.1, 2.4) and `/resources` whenever a new post adds a card (PR 2.1, 2.5, 2.6). Bump `CONTENT_REVISION` only for
  template-wide rendered changes (homepage FAQ or services grid, all service heroes).
- Images: existing, already-published photos only, with their existing `IMAGES` alt text copied literally (posts can't import
  `IMAGES`). Open each at full size before reuse (CLAUDE.md photo privacy). The one new image (PR 2.1 FDACS screenshot) goes
  through `npm run audit:photo-pii` and a full-size look.
- New routes → `ARCHITECTURE.md` and `public/llms.txt` in the same PR. No new packages.
- Every PR: `npm run type-check` and `npm run lint` exit 0, `npm run build` prints `[check-meta] PASS`, `check-page.mjs`
  PASS for every page the PR touches, then site-gate on the Vercel preview with **0 new errors** vs
  `~/Projects/docs/tools/site-gate/baseline-2026-10-02/beachhousemoving.xyz.txt`. Travis merges. A cloud session writes
  "site-gate not run" in the PR body and stops at the PR.

### Standard verify-and-ship steps (referenced as S1–S7 in every PR)
- **S0 (once per PR, before any edit):** on the fresh worktree run `npm run build` and note the baseline line
  `[check-meta] PASS — N pages, M posts`. Later "N+1" means one more than this number.
- **S1:** `npm run type-check && npm run lint` → exit 0.
- **S2:** `npm run build` → `[check-meta] PASS — <expected> pages, <expected> posts: titles ≤ 65, descriptions ≤ 160, no duplicate titles.`
- **S3:** `npx next start -p 3917` in a second shell, run the PR's check commands, then stop the server.
- **S4:** Street-address guard, on every page the PR touches:
  `ADDR="$(grep -o "street: '[^']*'" src/lib/content.ts | cut -d"'" -f2)"; for p in <paths>; do curl -s "localhost:3917$p" | grep -ci "$ADDR"; done` → every line `0`.
- **S5:** Push the branch, open the PR. Body: target query + KP row; every third-party fact with URL and check date; the
  Les-blocked lines left out; the check outputs; "site-gate: <result>".
- **S6:** Site-gate on the preview (protected, so use the OIDC header):
  ```bash
  cd ~/Projects/beach-house-moving && vc env run -- sh -c 'GATE_HEADERS="{\"x-vercel-trusted-oidc-idp-token\":\"$VERCEL_OIDC_TOKEN\"}" node ~/Projects/docs/tools/site-gate/site-gate.mjs "$1" --pages 10' sh <preview-url>
  ```
  Expected: `PASS`, 0 new errors vs the baseline. Take a 390px-wide signed-out Playwright screenshot of each new or changed
  page (same header) and look at the first screen. (`check-page.mjs` sends no auth header, so it runs against the local build
  in S3 and against `https://beachhousemoving.xyz` after merge in S7.)
- **S7:** Hand to Travis to merge. After merge: re-run the PR's `check-page.mjs` commands with base `https://beachhousemoving.xyz`
  (expect `PASS`), confirm production returns 200 for each new URL, add each new URL to the top
  of the next day's block in `~/Projects/docs/GSC-INDEXING-QUEUE.md` (report-only; Travis approves the block), and log the
  PR in `docs/optimization-2026-10/README.md`. IndexNow fires from the production build automatically.

## Review Focus (wave-wide)
1. **Over-claiming.** Every sentence about BHM traces to a README fact or to copy already live. Watch for: promising same-day,
   any weather reschedule or cancellation terms, any damage/valuation/claims promise, any storage term, "we provide weight
   tickets", any USDOT/MC number, a minimum charge, or how drive time is counted.
2. **Legal accuracy.** The 110% rule is stated as federal and interstate-only; Florida has no percentage cap but requires a
   signed amendment; there is no deposit cap (red-flag framing only); ch. 507 excludes government-booked shipments.
3. **Sourcing.** Every third-party fact on a page appears in that page's Sources list with an as-of date, and the PR body
   lists the re-check date.
4. **Indexing lever.** Each new URL has ≥ 2 inbound links from indexed pages, verified with `--linked-from` (indexed set:
   URL Inspection API run of 2026-10-02, `~/Projects/docs/indexing-audit-2026-10-02/inspect-2026-10-02.json`; e.g. `/pricing`, `/about`, the cost guide, the PCS field guide, the condo guide,
   the checklist, the 30A guide, `/services/military-pcs-moving`, `/services/loading-unloading-help`, `/service-areas/okaloosa-county/fort-walton-beach`).
5. **First screen on a phone.** New pages show a call button and a quote link in the first 390×844 screen (post `leadCta`,
   service hero actions), on top of the existing mobile sticky call bar.

---

## PR 2.1: Post template blocks + "Is my Florida mover legit?"

**Target:** trust/verification cluster. KP gives no reportable volume for the core phrasing ("florida mover license lookup",
"binding vs non binding estimate" are "—", KP:80); the nearest measured terms are "moving scams" 100–1K ($9.90, KP:73) and
"are movers insured" 10–100 (KP:79). Autocomplete has the local phrasing "how to find a licensed mover in florida destin",
"are movers licensed in florida" (QB:289). This is the best citation asset in the research (LA:9, LA:242): statute-only
facts, no local competitor has it, and IM4125 is the worked example.

| Field | Value | Chars |
|---|---|---|
| slug | `is-my-florida-mover-legit` | |
| `title` (H1) | Is My Florida Mover Legit? How to Check a License, Insurance and Estimate | 73 |
| `metaTitle` | Is My Florida Mover Legit? How to Verify a Moving Company | 57 |
| `description` (dek) | Florida movers must register with FDACS, carry insurance and give you a signed written estimate. How to check any mover in five minutes, using ours as the example. | 163 |
| `metaDescription` | How to check a Florida mover: FDACS registration, required insurance, signed written estimates, the 110% rule (interstate only) and red flags. Ch. 507, cited. | 158 |

**Links in (indexed):** `/pricing` ("verify it yourself" sentence), `/resources/what-movers-cost-santa-rosa-beach-30a`
(closing block). Later: PCS field guide (PR 2.7), `/pricing#hourly-honest` section (PR 2.4).
**Links out:** `/pricing`, `/resources/pcs-move-eglin-afb-hurlburt-field-guide`, `/get-a-quote` (lead CTA), related services
(`/pricing` is not a service; use Long-Distance Moving and Military PCS Moving).
**Schema:** BlogPosting (+ new `citation` array from `sources`), FAQPage (8 Q&As, mirrors the visible FAQ), BreadcrumbList.

### Task 1: `scripts/check-page.mjs` (the RED/GREEN gate for this wave)

**Files:**
- Create: `scripts/check-page.mjs`

- [ ] **Step 1: Write the script**
```js
#!/usr/bin/env node
// Page gate for content PRs, run against a running build (`npx next start -p 3917`) or a preview URL.
//   node scripts/check-page.mjs <base-url> <path> [--text "copy"]... [--no-text "copy"]... [--linked-from /path]...
// Fails unless <path> returns 200 with no redirect, is in the sitemap and self-canonical, has a title <= 65 and a
// description <= 160, every JSON-LD block parses, every FAQPage question is visible on the page, each --text is
// visible, no --no-text is visible, and each --linked-from page links to <path> (an #anchor is allowed).
const argv = process.argv.slice(2)
const [base, path] = argv
if (!base || !path?.startsWith('/')) {
  console.error('usage: check-page.mjs <base-url> <path> [--text s]... [--no-text s]... [--linked-from /p]...')
  process.exit(2)
}
const opts = (flag) => argv.flatMap((a, i) => (a === flag ? [argv[i + 1]] : []))
const decode = (s) =>
  s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
const errors = []

const res = await fetch(base + path, { redirect: 'manual' })
if (res.status !== 200) errors.push(`${path}: HTTP ${res.status}`)
const html = await res.text()
const visible = decode(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ')

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text()
const locs = [...sitemap.matchAll(/<loc>\s*(.*?)\s*<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/')
if (!locs.includes(path)) errors.push(`${path}: not in sitemap`)

const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
if (!canonical || (new URL(canonical).pathname.replace(/\/$/, '') || '/') !== path) errors.push(`canonical is ${canonical}`)

const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '').trim()
const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '').trim()
if (!title || title.length > 65) errors.push(`title ${title.length} chars: "${title}"`)
if (!desc || desc.length > 160) errors.push(`description ${desc.length} chars: "${desc}"`)

const nodes = []
for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
  try {
    const parsed = JSON.parse(json)
    nodes.push(...(Array.isArray(parsed) ? parsed : [parsed]))
  } catch {
    errors.push('a JSON-LD block does not parse')
  }
}
for (const faq of nodes.filter((n) => n['@type'] === 'FAQPage')) {
  for (const q of faq.mainEntity ?? []) {
    if (!visible.includes(q.name)) errors.push(`FAQPage question not visible: "${q.name}"`)
  }
}
for (const t of opts('--text')) if (!visible.includes(t)) errors.push(`missing text: "${t}"`)
for (const t of opts('--no-text')) if (visible.includes(t)) errors.push(`forbidden text present: "${t}"`)
const esc = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
for (const from of opts('--linked-from')) {
  const page = await (await fetch(base + from)).text()
  if (!new RegExp(`href="${esc}(#[^"]*)?"`).test(page)) errors.push(`${from} does not link to ${path}`)
}
console.log(
  errors.length
    ? `FAIL: ${errors.length}\n  ${errors.join('\n  ')}`
    : `PASS: ${path} (title ${title.length}, description ${desc.length}, ${nodes.length} JSON-LD nodes)`,
)
process.exit(errors.length ? 1 : 0)
```
- [ ] **Step 2: Prove it on a page that exists.** Build (S0), `npx next start -p 3917`, then
  `node scripts/check-page.mjs http://localhost:3917 /pricing --text "What Does a Move Cost"` → `PASS: /pricing (…)`.
  And the RED for this PR: `node scripts/check-page.mjs http://localhost:3917 /resources/is-my-florida-mover-legit` →
  `FAIL: …HTTP 404…`.
- [ ] **Step 3: Commit**
```bash
git add scripts/check-page.mjs
git commit -m "chore(scripts): check-page.mjs page gate (status, sitemap, canonical, meta, JSON-LD, FAQ mirror, links)"
```

### Task 2: Opt-in post template blocks (lead CTA, lists, tables, sources)

**Files:**
- Modify: `src/content/posts.ts` (`PostBlock` and `Post` types, top of file)
- Modify: `src/app/resources/[slug]/page.tsx` (header, block loop, after related services)
- Modify: `src/lib/structured-data.ts` (`blogPostingSchema`, around line 491)
- Modify: `ARCHITECTURE.md` (one line under the `/resources/[slug]` row: the four optional fields)

**Interfaces:**
- Produces: `PostBlock.items?: string[]`, `PostBlock.table?: { caption: string; columns: string[]; rows: string[][] }`,
  `Post.leadCta?: boolean`, `Post.sources?: { label: string; url: string; asOf: string }[]`. Used by PR 2.2, 2.5, 2.6, 2.7.

- [ ] **Step 1: Types** (in `posts.ts`, no imports added)
```ts
export type PostBlock = {
  heading?: string
  body?: string
  paragraph?: string
  subheading?: string
  isOwnerNote?: boolean
  image?: string
  imageAlt?: string
  /** Bulleted list under the paragraph. Internal [label](/path) links allowed. */
  items?: string[]
  /** Simple data table. Plain-text cells. */
  table?: { caption: string; columns: string[]; rows: string[][] }
}
```
In `Post`, after `faq`:
```ts
  /** Show the call + quote buttons under the dek, in the first screen. */
  leadCta?: boolean
  /** Third-party sources rendered as a "Sources" list. Required on any post that cites law, agencies or posted rules. */
  sources?: { label: string; url: string; asOf: string }[]
```
- [ ] **Step 2: Render.** In `src/app/resources/[slug]/page.tsx` add imports
`import { Phone } from 'lucide-react'`, `import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'`,
`import { BUSINESS } from '@/lib/content'`. After the dek `<p>` inside `<header>`:
```tsx
            {post.leadCta ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <TrackedPhoneLink
                  location={`post-${post.slug}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-brand bg-brand-coral px-6 font-body text-base font-semibold text-white hover:bg-brand-coral-dark"
                >
                  <Phone className="size-4" aria-hidden />
                  Call {BUSINESS.phone.display}
                </TrackedPhoneLink>
                <Link
                  href="/get-a-quote"
                  className="inline-flex h-11 items-center justify-center rounded-brand border-2 border-brand-navy px-6 font-body text-base font-semibold text-brand-navy hover:bg-brand-navy/5"
                >
                  Get a Free Quote
                </Link>
              </div>
            ) : null}
```
In the block loop, replace the unconditional `<p …>{renderBody(text)}</p>` with:
```tsx
                  {text ? (
                    <p className="font-body text-base leading-relaxed text-ink-muted">{renderBody(text)}</p>
                  ) : null}
                  {block.items ? (
                    <ul className="mt-4 list-disc space-y-2 pl-6 font-body text-base leading-relaxed text-ink-muted">
                      {block.items.map((item) => (
                        <li key={item}>{renderBody(item)}</li>
                      ))}
                    </ul>
                  ) : null}
                  {block.table ? (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full border-collapse text-left font-body text-sm text-ink-muted">
                        <caption className="mb-2 text-left font-semibold text-brand-navy">{block.table.caption}</caption>
                        <thead>
                          <tr>
                            {block.table.columns.map((col) => (
                              <th key={col} scope="col" className="border-b border-brand-navy/20 px-3 py-2 font-semibold text-brand-navy">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.table.rows.map((row) => (
                            <tr key={row.join('|')} className="border-b border-brand-navy/10">
                              {row.map((cell, i) => (
                                <td key={`${i}-${cell}`} className="px-3 py-2 align-top">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
```
Update the block `key` to `` `${block.heading ?? block.table?.caption ?? 'p'}-${text.slice(0, 32)}` `` so table-only blocks
stay unique. After the related-services block:
```tsx
          {post.sources && post.sources.length > 0 ? (
            <section aria-labelledby="sources-heading" className="mt-12 border-t border-brand-navy/10 pt-8">
              <h2 id="sources-heading" className="font-heading text-lg font-semibold text-brand-navy">
                Sources
              </h2>
              <ul className="mt-3 space-y-2 font-body text-sm text-ink-muted">
                {post.sources.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-teal-dark underline underline-offset-4"
                    >
                      {s.label}
                    </a>{' '}
                    (checked {formatDate(s.asOf)})
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
```
- [ ] **Step 3: Schema.** In `blogPostingSchema`, add `sources?: { url: string }[]` to the `post` parameter type and, after
`dateModified`, `...(post.sources?.length ? { citation: post.sources.map((s) => s.url) } : {}),`.
- [ ] **Step 4: Prove existing posts are untouched.** Before Step 2 (on the S0 build) save
  `curl -s localhost:3917/resources/moving-to-30a-neighborhood-guide | grep -o 'href="/get-a-quote"' | wc -l` as `Q0`. After
  rebuilding, the same command must still print `Q0`, and `grep -c 'id="sources-heading"'` on that page prints `0`.
- [ ] **Step 5:** S1. Expected exit 0.
- [ ] **Step 6: Commit**
```bash
git add src/content/posts.ts "src/app/resources/[slug]/page.tsx" src/lib/structured-data.ts ARCHITECTURE.md
git commit -m "feat(resources): opt-in post blocks: lead CTA, lists, tables, cited sources (+ BlogPosting citation)"
```

### Task 3: Verify the facts and the FDACS listing

- [ ] **Step 1: Re-check sources.** Re-open every URL in the Sources list of Task 4 and confirm facts B1.1–B5.6
  (LA:89–145): registration duty §507.03, exemption §507.02, ad/truck/estimate wording, $300/yr and $5,000 fines, the FDACS
  search URL and the "search both databases" note, both phone lines, §507.04 insurance and 60¢/lb, §§507.05–.06 estimate,
  contract, payment and withholding rules, §507.11 amendments and the third-degree felony, §507.07(6)/(10)/(11), §507.056,
  §507.08–.10, 5J-15, eCFR 375.401/.403/.405/.407/.213, SAFER, NCCDB, the AG PDF, the DoD PPM fact sheet.
- [ ] **Step 2: "Background-checked."** Search the ch. 507 text for "background". `/pricing` says a licensed mover is
  "background-checked" and the military FAQ in `service-details.ts` says "background checks". If ch. 507 has no
  background-check requirement (research shows only the felony-conviction **disclosure**, §507.07(10), LA:123), cut the word
  from both places in Task 5 Step 2. If it does, keep both and cite the subsection in the PR body.
- [ ] **Step 3: FDACS lookup (signed-out browser, read-only search).** On `https://consumercompliance.fdacs.gov/Business-Search/`
  search license type "Intrastate Movers" for `IM4125`; if nothing returns, search the legacy database (LA:95, LA:256).
  - If it shows Beach House Moving LLC as registered and current: take a screenshot **cropped to 16:9 (1600×900)** around the
    name, number, license type and status. **Crop out or redact any street address** (SAB rule). Save as
    `public/images/beach-house-moving-fdacs-registration-im4125.png`, open it at full size, run `npm run audit:photo-pii`
    (exit 0), and note the check date.
  - If it doesn't show, shows lapsed, or shows a different name: **stop and tell Travis** (business-state issue). Ship the post
    without the screenshot and without the "the listing shows" sentence.

### Task 4: The post

**Files:**
- Modify: `src/content/posts.ts` (append as the last element of `POSTS`, just before the `]` that closes the array)

Facts by section (all LA): checklist B1.5–B1.7, B3.1, B5.1–B5.2; registration B1.1–B1.4, B1.8; insurance B2.1–B2.5;
estimate/contract B3.1–B3.4; table B3.4, B5.1–B5.6; red flags B3.7, B3.8, B3.11, C1.8; hostage goods B3.5–B3.6; other rules
B3.9–B3.10; complaints B4.1–B4.3, B5.2. Structure follows LA:149–164.

- [ ] **Step 1: Append the record**
```ts
  {
    slug: 'is-my-florida-mover-legit',
    title: 'Is My Florida Mover Legit? How to Check a License, Insurance and Estimate',
    metaTitle: 'Is My Florida Mover Legit? How to Verify a Moving Company',
    description:
      'Florida movers must register with FDACS, carry insurance and give you a signed written estimate. How to check any mover in five minutes, using ours as the example.',
    metaDescription:
      'How to check a Florida mover: FDACS registration, required insurance, signed written estimates, the 110% rule (interstate only) and red flags. Ch. 507, cited.',
    datePublished: '<PR-open date YYYY-MM-DD>',
    author: 'Beach House Moving',
    heroImage: '/images/beach-house-moving-fleet-truck-van.jpg',
    heroAlt:
      'Beach House Moving fleet — box truck with lift gate and Sprinter van — parked at a luxury Emerald Coast property',
    leadCta: true,
    relatedServices: [
      { label: 'Long-Distance Moving', href: '/services/long-distance-moving' },
      { label: 'Military PCS Moving', href: '/services/military-pcs-moving' },
    ],
    excerpt:
      'How to check any Florida mover: FDACS registration, required insurance, a signed written estimate, and the red flags. Statute-cited, with our own registration as the example.',
    body: [
      {
        body:
          'Every mover that moves household goods within Florida has to register with the Florida Department of Agriculture and Consumer Services (FDACS), carry insurance, and put its price in a signed written estimate and contract before it touches a box. That is chapter 507 of the Florida Statutes. This guide shows how to check any mover against it in about five minutes, using our own registration, Fla. Mover Reg. No. IM4125, as the worked example. It is general information, not legal advice.',
      },
      {
        heading: 'The five-minute check',
        body: 'Run these five checks on any mover before you sign anything.',
        items: [
          'Find the number. Florida requires every mover ad to show "Fla. Mover Reg. No." or "Fla. IM No." with the number, the driver-side door of every truck to show it in letters at least 1.5 inches tall, and every estimate and contract to state that the firm is registered with the State of Florida as a mover.',
          'Look it up. Search the FDACS Business/License Search by business name or registration number, license type "Intrastate Movers" (or "Moving Broker"). FDACS is moving to a new system, so if a mover does not show up, search the legacy database too.',
          'Or call FDACS at 1-800-HELP-FLA (1-800-435-7352). En español: 1-800-FL-AYUDA (1-800-352-9832).',
          'Get it in writing. Before any work, a registered mover has to give you a written estimate and a written contract, signed and dated by you and the mover.',
          'Leaving Florida? An interstate move falls under federal rules. Look the mover up on FMCSA\'s SAFER Company Snapshot by its USDOT or MC number.',
        ],
      },
      {
        heading: 'Who has to register in Florida',
        body:
          'Anyone who operates as, or advertises as, a mover or moving broker for a move that starts and ends in Florida has to register with FDACS first (§507.03), whatever local licenses they also hold. Registration is renewed every two years at $300 a year, and it cannot be sold or transferred to another company. Operating without it can bring a cease-and-desist order and fines up to $5,000. Chapter 507 does not cover shipments the federal, state or a local government contracts for, so a government-arranged military household-goods shipment is not an FDACS matter, while a PPM where you hire the mover yourself is a private contract. More on that in our [PCS guide for Eglin and Hurlburt](/resources/pcs-move-eglin-afb-hurlburt-field-guide).',
      },
      {
        heading: 'Check us: Fla. Mover Reg. No. IM4125',
        body:
          'Here is the same check run on us. On the FDACS Business/License Search, choose license type "Intrastate Movers" and search IM4125 or "Beach House Moving". <TASK 3 RESULT: if the screenshot exists, add: "On <check date, Month D, YYYY>, the listing showed Beach House Moving LLC as a registered intrastate mover." Otherwise delete this placeholder.> If you would rather call, give 1-800-HELP-FLA the same number.',
        // Only if Task 3 produced the screenshot:
        image: '/images/beach-house-moving-fdacs-registration-im4125.png',
        imageAlt: 'FDACS Business/License Search result showing Beach House Moving LLC, registration IM4125, license type Intrastate Movers',
      },
      {
        heading: 'What insurance a Florida mover has to carry',
        body:
          'Florida sets floors (§507.04). A mover must carry cargo liability insurance of at least $10,000 per shipment for loss or damage it causes. A mover running two or fewer vehicles may post a $50,000 performance bond or a $50,000 certificate of deposit in a Florida bank instead, and moving brokers must keep one. Truck liability minimums run from $50,000 per occurrence for trucks under 35,000 lb to $300,000 for trucks of 44,000 lb and up. The insurer must be licensed in Florida and must name FDACS as certificate holder, so FDACS hears about a lapse and can suspend the registration.',
      },
      {
        subheading: 'The 60-cents-a-pound rule',
        body:
          'Florida\'s minimum valuation for your goods is 60 cents per pound per article, and any contract term that limits the mover\'s liability below that is void. A mover that limits its liability must tell you the valuation rate in writing when you sign the estimate and contract, before any work, and must tell you that you can buy valuation coverage if it offers it. Ask every mover you compare what its valuation options are, and get the answer in writing.',
      },
      {
        heading: 'Estimates, contracts and how you can pay',
        body:
          'Before any work, the estimate and contract must list the mover\'s name, phone and physical address; the date prepared and the proposed move dates; your name and both addresses; where your goods will be held, including during a fee dispute; an itemized breakdown and total of every cost and service, including any broker fee; and the payment methods accepted (§507.05). The mover has to accept at least two of three payment types: cash, cashier\'s check, money order or traveler\'s check; personal check; or credit card.',
      },
      {
        subheading: 'Can a Florida mover charge more than the estimate?',
        body:
          'Chapter 507 sets no percentage cap on overruns for moves within Florida. Its protection is paperwork: any price change has to be written into an amendment to the contract that you sign (§507.11). The well-known 110% rule is a federal rule for interstate moves. For a move that starts and ends in Florida, the signed amendment is what protects you.',
      },
      {
        heading: 'Moving within Florida vs. leaving the state',
        table: {
          caption: 'Who regulates your move',
          columns: ['', 'Within Florida (intrastate)', 'Leaving Florida (interstate)'],
          rows: [
            ['Regulator', 'FDACS, Florida Statutes chapter 507', 'FMCSA, 49 CFR Part 375'],
            ['Look the mover up', 'FDACS Business/License Search, or 1-800-HELP-FLA', 'FMCSA SAFER Company Snapshot'],
            ['Number to look for', '"Fla. Mover Reg. No." or "Fla. IM No."', 'USDOT or MC number'],
            ['Estimate', 'Signed written estimate and contract before any work', 'Written estimate after a physical survey (unless you waive it in writing), marked binding or non-binding'],
            ['Price above the estimate', 'No percentage cap; any change needs an amendment you sign', 'Non-binding estimate, collect on delivery: the mover must deliver when you pay up to 110% of the estimate, plus services you added'],
            ['Paperwork you should get', 'Estimate and contract stating the Florida registration', '"Your Rights and Responsibilities When You Move" and "Ready to Move?"'],
            ['Complaints', 'FDACS, 1-800-HELP-FLA', 'FMCSA National Consumer Complaint Database'],
          ],
        },
      },
      {
        heading: 'Red flags',
        body: 'Any one of these is a reason to slow down and check harder.',
        items: [
          'A large deposit, or a demand for cash or a wire transfer up front. Florida law sets no cap on deposits, but the Florida Attorney General lists a large up-front deposit or cash payment as a red flag, and the Department of Defense warns military families about cash or electronic bank deposits as a down payment.',
          'A quote far below everyone else\'s, given without a real look at what you are moving.',
          'A call from a broker instead of the company that will do the move. In Florida a broker cannot hand you an estimate the registered mover did not prepare and sign, and cannot use an unregistered mover.',
          'No registration number on the ad, the truck or the paperwork.',
          'A contract clause asking you to waive your chapter 507 rights. Those clauses are void.',
          'A company name, logo or phone number that changes between the website, the email and the truck.',
        ],
      },
      {
        heading: 'If a mover holds your things for more money',
        body:
          'Once you have paid the amount in your signed estimate or contract, plus any amendments you signed, the mover has to deliver and place your goods (§507.06). A mover may never withhold prescription medicine or goods for children, such as furniture, clothing and toys, under any circumstances. If a mover refuses a law-enforcement officer\'s order to release your goods after the officer finds you paid the agreed amount, or the mover cannot produce a signed estimate or contract, that is a third-degree felony (§507.11). Call local law enforcement, then FDACS at 1-800-HELP-FLA.',
      },
      {
        heading: 'Two more rules most people never hear about',
        items: [
          'A mover must tell you in writing, before the move, if anyone with access to your home, including whoever gives the estimate, has a conviction for one of the felonies listed in Florida law (§507.07(10)).',
          'A mover cannot put your goods in a third party\'s self-storage unit unless the unit is in your name and you contract with the facility directly (§507.07(11)).',
        ],
      },
      {
        heading: 'Where to complain',
        body:
          'FDACS takes complaints at 1-800-HELP-FLA or online, and the Florida Attorney General\'s fraud line is 1-866-9-NO-SCAM (1-866-966-7226). Chapter 507 violations also count as deceptive and unfair trade practices under Florida law (§507.08). FDACS can fine a mover up to $5,000 per violation, order it to stop operating, suspend or revoke its registration, and order restitution to customers. For an interstate move, use FMCSA\'s National Consumer Complaint Database. When you are comparing quotes, our [pricing page](/pricing) shows how ours is built.',
      },
    ],
    faq: [
      {
        question: 'How do I check if a mover is licensed in Florida?',
        answer:
          'Search the FDACS Business/License Search for the company name or its registration number (license type "Intrastate Movers"), or call 1-800-HELP-FLA. If the mover does not appear, search the legacy database too; FDACS is moving to a new system.',
      },
      {
        question: 'What does "Fla. IM No." mean on a moving truck?',
        answer:
          "It is the mover's Florida registration number. Florida requires it on every ad, on the driver-side door of every truck in letters at least 1.5 inches tall, and on every estimate and contract. Ours is Fla. Mover Reg. No. IM4125.",
      },
      {
        question: 'What insurance does a Florida mover need?',
        answer:
          'Cargo liability insurance of at least $10,000 per shipment (movers with two or fewer vehicles may post a $50,000 bond or certificate of deposit instead), plus truck liability of $50,000 to $300,000 per occurrence depending on truck weight. Minimum valuation for your goods is 60 cents per pound per article.',
      },
      {
        question: 'Can a Florida mover charge more than the estimate?',
        answer:
          'Only through a written amendment to the contract that you sign. Chapter 507 sets no percentage cap for moves within Florida; the 110% rule is federal and applies to interstate moves.',
      },
      {
        question: 'Do I need to check a USDOT number for a move from Destin to Atlanta?',
        answer:
          "Yes. A move that crosses a state line is interstate, so the mover must be registered with FMCSA. Look up its USDOT or MC number on FMCSA's SAFER Company Snapshot.",
      },
      {
        question: 'Can a mover hold my stuff until I pay more?',
        answer:
          "Not once you have paid the amount in your signed estimate or contract plus any amendments you signed. Refusing a law-enforcement order to release your goods is a third-degree felony in Florida, and prescription medicine and children's things can never be withheld.",
      },
      {
        question: 'How much deposit should a mover ask for?',
        answer:
          'Florida law does not set a limit. The Florida Attorney General flags a large up-front deposit or a demand for cash as a red flag, so ask why before you pay one.',
      },
      {
        question: "What's the difference between a moving broker and a mover?",
        answer:
          "A mover does the move with its own crew and trucks. A broker arranges the move and hands it to a mover. In Florida both must register with FDACS, a broker must keep a $50,000 bond or certificate of deposit, and a broker cannot give you an estimate the registered mover did not prepare and sign.",
      },
    ],
    sources: [
      { label: 'Florida Statutes chapter 507, Household Moving Services (2026)', url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0507/0507.html&StatuteYear=2026', asOf: '<check date>' },
      { label: 'FDACS: Moving Companies', url: 'https://www.fdacs.gov/Business-Services/Moving-Companies', asOf: '<check date>' },
      { label: 'FDACS Business/License Search', url: 'https://consumercompliance.fdacs.gov/Business-Search/', asOf: '<check date>' },
      { label: 'Florida Attorney General, "Scams at a Glance: On the Move" (PDF)', url: 'https://www.myfloridalegal.com/sites/default/files/2024-06/movers_scams_at_a_glance.pdf', asOf: '<check date>' },
      { label: 'Military OneSource, PPM and Rogue Operators fact sheet, March 2026 (PDF)', url: 'https://download.militaryonesource.mil/12038/MOS/Factsheets/PPM%20and%20Rogue%20Operators_Fact%20Sheet.pdf', asOf: '<check date>' },
      { label: 'Fla. Admin. Code ch. 5J-15 (mover registration and penalties)', url: 'https://www.flrules.org/gateway/ChapterHome.asp?Chapter=5J-15', asOf: '<check date>' },
      { label: 'Florida Statutes §570.971 (administrative fines)', url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0570/Sections/0570.971.html', asOf: '<check date>' },
      { label: '49 CFR 375.401 (interstate estimates)', url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-375/subpart-D/section-375.401', asOf: '<check date>' },
      { label: '49 CFR 375.407 (the 110% rule)', url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-375/subpart-D/section-375.407', asOf: '<check date>' },
      { label: 'FMCSA SAFER Company Snapshot', url: 'https://safer.fmcsa.dot.gov/CompanySnapshot.aspx', asOf: '<check date>' },
      { label: 'FMCSA National Consumer Complaint Database', url: 'https://nccdb.fmcsa.dot.gov/', asOf: '<check date>' },
    ],
  },
```
(If Task 3 produced no screenshot, delete the `image`/`imageAlt` lines and the placeholder sentence. Replace every
`<check date>` with the Task 3 Step 1 date, `YYYY-MM-DD`. Add a 375.213 eCFR source only if you confirm its URL.)
- [ ] **Step 2: Type-check.** `npm run type-check` → exit 0.
- [ ] **Step 3: Commit**
```bash
git add src/content/posts.ts public/images/beach-house-moving-fdacs-registration-im4125.png  # omit the image if none
git commit -m "feat(resources): 'Is my Florida mover legit?' guide (ch. 507 checklist, IM4125 worked example)"
```

### Task 5: Inbound links, cleanup, llms.txt

**Files:**
- Modify: `src/app/pricing/page.tsx` ("Why the Cheapest Quote Usually Costs More" paragraph)
- Modify: `src/lib/service-details.ts` (`military-pcs-moving` FAQ "Are you licensed for this?", only if Task 3 Step 2 says cut)
- Modify: `src/lib/content.ts` (`military-pcs-moving` `updatedAt`, only if that FAQ changed)
- Modify: `src/content/posts.ts` (`what-movers-cost-santa-rosa-beach-30a` closing block + `dateModified`)
- Modify: `src/app/sitemap.ts` (`/pricing` and `/resources` `lastModified` → ship date)
- Modify: `public/llms.txt` (`## Guides`), `ARCHITECTURE.md` (post count)

- [ ] **Step 1: `/pricing` link.** Replace "you can verify it yourself on the FDACS website." with
```tsx
              you can{' '}
              <Link href="/resources/is-my-florida-mover-legit" className="font-semibold text-brand-teal underline-offset-2 hover:underline">
                verify it yourself with FDACS
              </Link>
              .
```
- [ ] **Step 2: "Background-checked"** (only if Task 3 Step 2 found no requirement): on `/pricing` change "registered with
  FDACS, background-checked, and required to carry real insurance" to "registered with FDACS and required to carry real
  insurance"; in the military FAQ change "background checks, verified insurance, Florida Statute 507 compliance" to "verified
  insurance and Florida Statute 507 compliance", and set `military-pcs-moving` `updatedAt` to the ship date.
- [ ] **Step 3: Cost guide closing block** becomes
`'Licensed and insured. FL Mover Reg. #IM4125 ([how to check a Florida mover](/resources/is-my-florida-mover-legit)). Locally owned and operated in Santa Rosa Beach, serving Walton, Okaloosa, and Bay Counties.'`
and its `dateModified` the ship date. (PR 2.2 rewrites the rest of this post.)
- [ ] **Step 4: llms.txt.** Under `## Guides` add
`- [Is My Florida Mover Legit? How to Check a License, Insurance and Estimate](https://beachhousemoving.xyz/resources/is-my-florida-mover-legit)`.
In `ARCHITECTURE.md` raise the post count in the route tree and in "Resource post slugs" by 1.
- [ ] **Step 5: Commit**
```bash
git add src/app/pricing/page.tsx src/lib/service-details.ts src/lib/content.ts src/content/posts.ts src/app/sitemap.ts public/llms.txt ARCHITECTURE.md
git commit -m "seo: link the Florida mover guide from /pricing and the cost guide; llms.txt"
```

### Task 6: Verify, PR, gate
- [ ] S1. S2 → `[check-meta] PASS — N+1 pages, M+1 posts`.
- [ ] S3 checks:
  - `node scripts/check-page.mjs http://localhost:3917 /resources/is-my-florida-mover-legit --text "Fla. Mover Reg. No. IM4125" --text "60 cents per pound per article" --text "1-800-HELP-FLA" --text "110% rule is a federal rule for interstate moves" --text "Sources" --no-text "USDOT number is" --no-text "TASK 3" --linked-from /pricing --linked-from /resources/what-movers-cost-santa-rosa-beach-30a` → `PASS`.
  - `curl -s localhost:3917/resources/is-my-florida-mover-legit | grep -o 'rel="noopener noreferrer"' | wc -l` → `11` (or the number of sources you kept).
  - `curl -s localhost:3917/resources/is-my-florida-mover-legit | grep -o '"citation":\[' | head -1` → `"citation":[`.
  - `curl -s localhost:3917/resources/is-my-florida-mover-legit | grep -o 'href="/get-a-quote"' | wc -l` → exactly 1 more than `Q0` (the lead CTA).
  - Task 2 Step 4 (existing posts unchanged) → still `Q0` and `0`.
  - `node scripts/check-page.mjs http://localhost:3917 /pricing --text "verify it yourself with FDACS"` → `PASS`.
- [ ] S4 for `/resources/is-my-florida-mover-legit /pricing /resources/what-movers-cost-santa-rosa-beach-30a` → `0 0 0`.
- [ ] S5–S7. PR title: "Wave 2 / PR 2.1: Florida mover verification guide + post template blocks".

### Review Focus (PR 2.1)
1. **No BHM insurance, valuation or claims promise.** The post states Florida law only; damage/claims is blocked on Les (Blocked B1).
2. **No federal number for BHM.** Interstate rows are generic; nothing invites a lookup of a BHM USDOT/MC (none on file).
3. **Screenshot privacy.** No street address in the FDACS crop; audit:photo-pii exit 0; 16:9 so `object-cover` doesn't cut the result row.
4. **110% and deposits** framed exactly as LA B3.4 and B3.7.
5. **Existing posts render identically** (Task 2 Step 4), and the new table/list markup has no horizontal page scroll at 390px (the table scrolls inside its own box).

---

## PR 2.2: Cost guide refresh: Santa Rosa Beach, **Florida**

**Problem:** the cost SERP for "how much do movers cost santa rosa beach fl" mixes in Santa Rosa, **California** cost pages,
and BHM's guide sits around #8 there (QB:35, QB:300; KEYWORD-MAP secondary targets). The fix (DESIGN Wave 2 last row) is
explicit "Santa Rosa Beach, Florida" wording in the H1, dek, meta, first paragraph and one FAQ. The current meta description
also shows the rate without "plus drive time" (ch. 507 note on `PRICING`), which this PR fixes.

| Field | Value | Chars |
|---|---|---|
| `title` (H1 + `<title>`) | What Movers Cost in Santa Rosa Beach, Florida & 30A (2026) | 58 |
| `metaTitle` | remove (title fits) | |
| `description` (dek) + `excerpt` | What movers cost in Santa Rosa Beach, Florida (Walton County, on 30A): our published rate, typical hours by home size and what changes the price. | 145 |
| `metaDescription` | Movers in Santa Rosa Beach, Florida (not Santa Rosa, CA): $195/hr for 2 movers and a truck plus drive time, typical hours by home size, what changes the price. | 159 |

**Links in:** already indexed (no new URL). **Links out (new):** `/resources/is-my-florida-mover-legit` (from PR 2.1),
`/service-areas/santa-rosa-county/navarre`. **Schema:** unchanged types; FAQPage gains one question.

### Task 1: Copy edits
**Files:** Modify `src/content/posts.ts` (`what-movers-cost-santa-rosa-beach-30a`, around line 37)

- [ ] **Step 1 (RED):** S0 build, start, then
  `node scripts/check-page.mjs http://localhost:3917 /resources/what-movers-cost-santa-rosa-beach-30a --text "Santa Rosa Beach, Florida" --text "not Santa Rosa, California" --text "plus drive time"` → `FAIL` (missing text).
- [ ] **Step 2: Fields.** Set `title`, `description`, `excerpt`, `metaDescription` to the table values; delete nothing else; add
  `leadCta: true`; set `dateModified` to the ship date.
- [ ] **Step 3: First paragraph.** Prepend to `body[0].body`:
  "This guide is about Santa Rosa Beach, Florida: the Walton County beach town on Scenic Highway 30A. It is not in Santa Rosa County (that is [Navarre](/service-areas/santa-rosa-county/navarre), Gulf Breeze, Pace and Milton, where we also take moves when a crew is available), and it is not Santa Rosa, California. "
- [ ] **Step 4: FAQ.** In "Do you charge more on 30A than elsewhere?" change "across Walton, Okaloosa, and Bay Counties" to
  "across Walton, Okaloosa, Bay and Santa Rosa Counties". Append a new FAQ:
```ts
      {
        question: 'Is this Santa Rosa Beach, Florida or Santa Rosa, California?',
        answer:
          'Santa Rosa Beach, Florida. Everything on this page, including the rate, is for moves on the Florida Emerald Coast: Santa Rosa Beach and 30A in Walton County, plus Destin, Fort Walton Beach, Panama City Beach, Navarre and nearby towns. We do not operate in California.',
      },
```
- [ ] **Step 5: Closing block.** "Locally owned and operated in Santa Rosa Beach, serving Walton, Okaloosa, and Bay Counties."
  → "Locally owned and operated in Santa Rosa Beach, Florida, serving Walton, Okaloosa and Bay Counties and Navarre." (keep the PR 2.1 link).
- [ ] **Step 6:** In `public/llms.txt` `## Guides`, update the cost guide's link text to the new title. S1.
- [ ] **Step 7: Commit**
```bash
git add src/content/posts.ts public/llms.txt
git commit -m "seo(cost-guide): say Santa Rosa Beach, Florida (not CA); drive-time disclosure in meta; lead CTA"
```

### Task 2: Verify, PR, gate
- [ ] S1. S2 → `[check-meta] PASS — N pages, M posts` (no new pages).
- [ ] S3: `node scripts/check-page.mjs http://localhost:3917 /resources/what-movers-cost-santa-rosa-beach-30a --text "Santa Rosa Beach, Florida" --text "not Santa Rosa, California" --text "Is this Santa Rosa Beach, Florida or Santa Rosa, California?" --text "plus drive time"` → `PASS`.
- [ ] `curl -s localhost:3917/resources/what-movers-cost-santa-rosa-beach-30a | grep -o '<meta name="description" content="[^"]*"'` contains `plus drive time`.
- [ ] S4 → `0`. S5–S7. After merge, add the URL to the GSC queue as a **re-request** (it is indexed; changed H1).

### Review Focus (PR 2.2)
1. **Every rate mention carries "plus drive time"**, including the meta description.
2. **Gulf Breeze, Pace, Milton** only with the availability qualifier (README 2026-10-03), never as "all of Santa Rosa County".
3. **Ranking risk:** the H1 keeps "What Movers Cost in Santa Rosa Beach" as its prefix, so the matching query terms don't move.

---

## PR 2.3: Same-day and short-notice moving page

**Target:** same day movers 1K–10K ($30.29), last minute movers 1K–10K ($25.00), short notice movers 100–1K ($39.80)
(KP:35, 36, 50; KEYWORD-MAP "short notice / same day / last minute movers"). Searchers' pain: tight timelines and rescues
after another mover cancelled (CP:92–93, CP:227). **Ruling:** a service page, not a post, because the intent is commercial
and the bids are $25–40; "few strong pages" holds because it answers its own cluster.

| Field | Value | Chars |
|---|---|---|
| slug | `same-day-moving` → `/services/same-day-moving` | |
| `metaTitle` | Same-Day & Short-Notice Movers on 30A & Destin \| BHM | 52 |
| `metaDescription` | Need movers today or this week? When a crew is free we take same-day jobs across all our services, from 30A to Destin and Fort Walton Beach. (850) 842-1962. | 156 |
| `heroTitle` (H1) | Same-Day & Short-Notice Movers on the Emerald Coast | 51 |
| `shortDescription` | When a crew is free, same-day help across every service we offer. | 65 |

**Links in (indexed):** homepage services grid (automatic), `/services/military-pcs-moving` (section body),
`/services/loading-unloading-help` (related services + section body), the cost guide (body). Also `/services` (automatic).
**Links out:** local moving, delivery, loading help, junk removal, military PCS; later the rain guide (PR 2.6).
**Schema:** Service + WebPage + FAQPage + BreadcrumbList (template). Fix the template's hardcoded WebPage `dateModified`
(`'2026-06-11'` would predate this page) to `service.updatedAt ?? '2026-06-11'`.

### Task 1: First-screen CTAs on the service template (only if Wave 1 hasn't shipped them)
- [ ] **Step 1:** `grep -n "get-a-quote" src/components/layout/PageHero.tsx`, and check `src/app/services/[slug]/page.tsx`
  for a hero call/quote row. If either exists, Wave 1 already did this: skip Step 2 (Step 3 still applies).
- [ ] **Step 2:** Add an optional `actions?: React.ReactNode` prop to `PageHero` and render
  `{actions ? <div className="mt-6 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}` right after the description `<p>`.
  In `src/app/services/[slug]/page.tsx` pass:
```tsx
        actions={
          <>
            <TrackedPhoneLink
              location={`service-hero-${service.slug}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-brand bg-brand-coral px-6 font-body text-base font-semibold text-white hover:bg-brand-coral-dark"
            >
              <Phone className="size-4" aria-hidden />
              Call {BUSINESS.phone.display}
            </TrackedPhoneLink>
            <Link
              href="/get-a-quote"
              className="inline-flex h-11 items-center justify-center rounded-brand border-2 border-brand-navy px-6 font-body text-base font-semibold text-brand-navy hover:bg-white"
            >
              Get a Free Quote
            </Link>
          </>
        }
```
  (imports: `Phone` from `lucide-react`, `TrackedPhoneLink`, `BUSINESS`). Hero background is `brand-sand`: navy on sand 12.4,
  white on coral 4.6. This changes every service page, so bump `CONTENT_REVISION` to the ship date.
- [ ] **Step 3:** Also change the WebPage line to `webPageSchema(canonicalUrl, service.metaTitle, service.updatedAt ?? '2026-06-11', service.metaDescription)`.
- [ ] **Step 4: Commit**
```bash
git add src/components/layout/PageHero.tsx "src/app/services/[slug]/page.tsx" src/lib/content.ts
git commit -m "feat(services): call + quote buttons in the service hero; WebPage dateModified from updatedAt"
```

### Task 2: Data: the service record
**Files:**
- Modify: `src/lib/content.ts`: `SERVICES` (append after `loading-unloading-help`), `SERVICE_INCLUDES`, `SERVICE_FAQ_INDICES`,
  `FAQS[12]` ("What are your hours?"), `CONTENT_REVISION`
- Modify: `src/lib/service-details.ts`: `SERVICE_DETAILS`, `SERVICE_RELATED`
- Modify: `src/lib/service-images.ts`: `SERVICE_IMAGE_MAP`

- [ ] **Step 1 (RED):** S0 build, start, `node scripts/check-page.mjs http://localhost:3917 /services/same-day-moving` → `FAIL … HTTP 404`.
- [ ] **Step 2: `SERVICES` record**
```ts
  {
    slug: 'same-day-moving',
    updatedAt: '<ship date YYYY-MM-DD>',
    title: 'Same-Day & Short-Notice Moving',
    linkLabel: 'Same-Day & Short-Notice Moves',
    shortDescription: 'When a crew is free, same-day help across every service we offer.',
    icon: 'Truck',
    featured: false,
    metaTitle: 'Same-Day & Short-Notice Movers on 30A & Destin | BHM',
    metaDescription:
      'Need movers today or this week? When a crew is free we take same-day jobs across all our services, from 30A to Destin and Fort Walton Beach. (850) 842-1962.',
  },
```
- [ ] **Step 3: Includes and FAQ indices**
```ts
  'same-day-moving': [
    'Same-day service across all our services when a crew is free',
    `A real person answers ${BUSINESS.phone.display}, day or night`,
    'A straight answer on the call: today, or the earliest slot we have',
    'Moves, deliveries, rental-truck loading and junk runs',
    `Owner-operated crew, licensed (FL Mover Reg. #${BUSINESS.registration.number}) and insured`,
    'Rain-day decisions made with you, not for you',
  ],
```
`SERVICE_FAQ_INDICES['same-day-moving'] = [5, 12, 13]` (required by the type; the page uses its own `faqs`).
- [ ] **Step 4: Details** (`SERVICE_DETAILS`; `fullDescription` is also the hero dek and the Service schema description, so no links in it)
```ts
  'same-day-moving': {
    fullDescription:
      "Need movers today or this week? When a crew is free, we take same-day jobs across every service we offer: moves, deliveries, rental-truck loading and junk runs, from 30A to Destin and Fort Walton Beach. It depends on the schedule, so call (850) 842-1962 as early as you can and we'll tell you straight whether we can make it.",
    heroTitle: 'Same-Day & Short-Notice Movers on the Emerald Coast',
    sections: [
      {
        heading: 'How to get a same-day move',
        body: [
          "Call, don't fill out a form. The quote form is right for moves a week or more out, but a same-day slot gets decided on the phone. A real person answers (850) 842-1962 day or night, and the first question is simple: is a crew free today?",
          'Have four things ready: both addresses, roughly how much is moving (a few items, a room or a whole home), stairs or an elevator at either end, and any building or HOA rules such as a certificate of insurance. Those decide whether a free crew can finish the job today.',
        ],
      },
      {
        heading: 'What we can do on short notice',
        body: [
          'Same-day service covers all of our services when we have availability: [local moves](/services/local-moving), [deliveries](/services/delivery), [U-Haul and rental-truck loading](/services/loading-unloading-help), [junk removal](/services/junk-removal) and the rest.',
          'Short notice this week is the more common call: a PCS report date near Eglin or Hurlburt ([military moves](/services/military-pcs-moving)), a closing that moved up, a lease that ended early, or another mover who cancelled on you.',
        ],
      },
      {
        heading: 'Why we never promise a same-day slot',
        body: [
          "Because a promise we can't keep is worse than an honest no. Same-day depends on whether a crew is free, and the owners are the crew. If today doesn't work, we'll say so on the call and give you the earliest time we can.",
        ],
      },
      {
        heading: 'Rain on move day',
        body: [
          'We work in the rain unless it would put your things at risk, and we check with you before anything is decided.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you offer same-day moves?',
        a: 'When a crew is available, yes. We offer same-day service across all of our services, but it depends on the schedule, so call (850) 842-1962 as early in the day as you can.',
      },
      {
        q: 'How late can I call for a same-day move?',
        a: "Any time. We answer 24/7. The earlier you call, the better the odds a crew is free, and we'll tell you on the call whether today works.",
      },
      {
        q: 'My mover cancelled. Can you help?',
        a: "Call us. If a crew is free, we'll take the job, and if today is full we'll give you the earliest slot we have.",
      },
      {
        q: 'Is same-day available for deliveries, loading help and junk removal too?',
        a: 'Yes, across all of our services, whenever a crew is free.',
      },
      {
        q: 'Do you move in the rain?',
        a: "Yes, unless it would put your things at risk. If the weather turns, we talk it through with you before deciding anything.",
      },
      {
        q: 'Do you do short-notice PCS moves?',
        a: 'Yes. Report dates near Eglin AFB and Hurlburt Field often come with short notice, and we build the move around yours. Call as soon as you have a date.',
      },
    ],
  },
```
`SERVICE_RELATED`: add `'same-day-moving': ['local-moving', 'loading-unloading-help']`, and append `'same-day-moving'` to the
`local-moving` and `loading-unloading-help` arrays.
- [ ] **Step 5: Image.** `SERVICE_IMAGE_MAP['same-day-moving'] = IMAGES.apartmentFleetTruckVanStaging`. Open
  `/images/beach-house-moving-apartment-move-fleet-truck-van-staging.jpg` at full size first (PII sweep, alt still matches).
- [ ] **Step 6: Soften the one promise.** In `FAQS` "What are your hours?" change "If you need to move on a Sunday evening
  before a Monday closing, we can make that happen." to "If you need to move on a Sunday evening before a Monday closing,
  call; when a crew is free, we'll make it work." This FAQ renders on the homepage, so set `CONTENT_REVISION` to the ship
  date (the services grid also changes).
- [ ] **Step 7:** S1 (TypeScript forces the `SERVICE_INCLUDES` and `SERVICE_FAQ_INDICES` entries; fix any error it reports).
- [ ] **Step 8: Commit**
```bash
git add src/lib/content.ts src/lib/service-details.ts src/lib/service-images.ts
git commit -m "feat(services): same-day and short-notice moving page (never promised; across all services when a crew is free)"
```

### Task 3: Links from indexed pages, llms.txt, architecture
**Files:** `src/lib/service-details.ts` (`military-pcs-moving` section "Built around your report date"; `loading-unloading-help`
first section), `src/lib/content.ts` (`updatedAt` on `military-pcs-moving`, `local-moving`, `loading-unloading-help`),
`src/content/posts.ts` (cost guide "What actually changes the price" block + `dateModified`), `public/llms.txt`, `ARCHITECTURE.md`

- [ ] **Step 1:** Military: "Short-notice orders are normal here:" → "[Short-notice orders](/services/same-day-moving) are normal here:".
  Loading help: append to its first section's first paragraph " Need the help today? See [same-day and short-notice moves](/services/same-day-moving)."
  Set the three `updatedAt` values to the ship date.
- [ ] **Step 2:** Cost guide: after "booking two to three weeks out beats calling the week of." add
  " If it is already the week of, see [same-day and short-notice moves](/services/same-day-moving)." Set `dateModified`.
- [ ] **Step 3:** llms.txt `## Services`: add "**Same-Day & Short-Notice Moving** — Same-day service across all services when
  a crew is available (never guaranteed); call (850) 842-1962, answered 24/7." ARCHITECTURE.md: add
  `/services/same-day-moving` to the route tree and the service slug list ("the other eleven come from `/services/[slug]`").
- [ ] **Step 4: Commit**
```bash
git add src/lib/service-details.ts src/lib/content.ts src/content/posts.ts public/llms.txt ARCHITECTURE.md
git commit -m "seo: link the same-day page from the PCS, loading-help and cost pages; llms.txt + architecture"
```

### Task 4: Verify, PR, gate
- [ ] S1. S2 → `[check-meta] PASS — N+1 pages, M posts`.
- [ ] S3:
  - `node scripts/check-page.mjs http://localhost:3917 /services/same-day-moving --text "When a crew is available, yes." --text "Why we never promise a same-day slot" --no-text "guaranteed same-day" --no-text "we can make that happen" --linked-from / --linked-from /services/military-pcs-moving --linked-from /services/loading-unloading-help --linked-from /resources/what-movers-cost-santa-rosa-beach-30a` → `PASS`.
  - `curl -s localhost:3917/ | grep -c "we can make that happen"` → `0`.
  - `curl -s localhost:3917/services/same-day-moving | grep -o '"dateModified":"[^"]*"' | head -1` → the ship date.
  - `curl -s localhost:3917/services/same-day-moving | grep -o 'href="/get-a-quote"' | wc -l` → ≥ 2 (hero + CTA band).
- [ ] S4 for `/services/same-day-moving / /services/military-pcs-moving` → `0 0 0`.
- [ ] S5–S7. Phone screenshot: the call and quote buttons sit in the first screen at 390px.

### Review Focus (PR 2.3)
1. **Never a promise.** Every same-day sentence has the availability condition; the homepage hours FAQ no longer promises.
2. **No price talk.** Whether same-day costs more is unconfirmed (Les), so the page says nothing about price.
3. **Template blast radius** (if Task 1 ran): every service hero gains two buttons; check two other service pages at 390px.
4. **Homepage grid** gains a 12th card: no orphan or overflow at 390px and 1280px.

---

## PR 2.4: "How we keep hourly honest" on `/pricing`

**Why:** the top fear behind "fair price" reviews is a bill above the quote and clock-milking (CP:91, CP:220–226). DESIGN:
"Published rate, what the clock covers, drive time. Confirmed rate only." **Ruling:** "what the clock covers" is limited to
what is already published (2 movers and a truck; drive time billed on top and stated before the job; scope shows up as
hours, not fees). How drive time is counted, minimums, billing increments, deposits, a not-to-exceed option, a no-idle rule
and time check-ins are **open owner questions** (`PRICING` comment in `content.ts`; competitor-suggested extras) and stay
out until Les answers. No new URL; `/pricing` is indexed.

### Task 1: Copy in `content.ts`, render on `/pricing`
**Files:** Modify `src/lib/content.ts` (new `PRICING_HOURLY_HONEST` after `CALL_FOR_QUOTE`), `src/app/pricing/page.tsx`
(new section between "How Our Pricing Works" and "What Affects the Cost of Your Move"), `src/app/sitemap.ts` (`/pricing`
`lastModified` → ship date)

- [ ] **Step 1 (RED):** `curl -s localhost:3917/pricing | grep -c 'id="hourly-honest"'` → `0`.
- [ ] **Step 2: Copy**
```ts
/** /pricing "How we keep hourly honest": published, owner-confirmed claims only (WAVE2-PLAN PR 2.4). */
export const PRICING_HOURLY_HONEST = {
  id: 'hourly-honest',
  heading: 'How We Keep Hourly Honest',
  intro: `Hourly billing only works if you can check the math. Ours starts at ${RATE_LINE}, published here and said out loud on every quote call, so you can do the arithmetic before anyone lifts a box.`,
  points: [
    { label: 'One published rate', detail: `${RATE_LINE}. The rate is the same in every county we serve; it doesn't change by zip code.` },
    { label: 'Drive time, stated up front', detail: 'Drive time is billed on top of the hourly rate, and we tell you both before the job starts.' },
    { label: 'Hours, not fees', detail: 'What makes a move bigger (packing, stairs, specialty items, long carries) shows up as hours on the clock, not as surprise line items.' },
    { label: 'Watch the clock yourself', detail: 'A published rate means you can time the job and check the invoice against it. The owners who quote the work are the ones doing it.' },
    { label: 'What Florida law adds', detail: 'A registered Florida mover has to give you a signed written estimate and contract before any work, and any price change has to be a written amendment you sign (Fla. Stat. §507.05, §507.11). Here is [how to check any Florida mover](/resources/is-my-florida-mover-legit).' },
  ],
} as const
```
- [ ] **Step 3: Render** (reuse the existing row style; `renderBody` for the one internal link)
```tsx
          <div id={PRICING_HOURLY_HONEST.id} className="mt-14 scroll-mt-28">
            <h2 className="font-heading text-2xl font-bold text-brand-navy">{PRICING_HOURLY_HONEST.heading}</h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-muted">{PRICING_HOURLY_HONEST.intro}</p>
            <div className="mt-6 divide-y divide-brand-navy/8 overflow-hidden rounded-brand-lg border border-brand-navy/8 bg-white shadow-brand">
              {PRICING_HOURLY_HONEST.points.map(({ label, detail }) => (
                <div key={label} className="grid gap-1 px-6 py-5 sm:grid-cols-[220px_1fr] sm:gap-4">
                  <p className="font-body text-sm font-semibold text-brand-navy">{label}</p>
                  <p className="font-body text-sm leading-relaxed text-ink-muted">{renderBody(detail)}</p>
                </div>
              ))}
            </div>
          </div>
```
(imports: `PRICING_HOURLY_HONEST` from `@/lib/content`, `renderBody` from `@/lib/render-body`).
- [ ] **Step 4: Links in.** Cost guide: in the "Why hourly beats a lowball flat quote" block, after "never wonder what the
  number on the invoice will be." add " Here is [how we keep hourly honest](/pricing#hourly-honest)." and set `dateModified`.
  Florida mover guide: in "Where to complain", change `[pricing page](/pricing)` to `[pricing page](/pricing#hourly-honest)`
  (anchor-only, no `dateModified` bump).
- [ ] **Step 5:** S1. **Commit**
```bash
git add src/lib/content.ts src/app/pricing/page.tsx src/app/sitemap.ts src/content/posts.ts
git commit -m "feat(pricing): 'How we keep hourly honest' section (published rate, drive time, hours not fees)"
```

### Task 2: Verify, PR, gate
- [ ] S1. S2 → `[check-meta] PASS — N pages, M posts`.
- [ ] S3:
  - `node scripts/check-page.mjs http://localhost:3917 /pricing --text "How We Keep Hourly Honest" --text "plus drive time" --text "we tell you both before the job starts" --no-text "not-to-exceed" --no-text "minimum charge" --no-text "no-idle"` → `PASS`.
  - `curl -s localhost:3917/pricing | grep -c 'id="hourly-honest"'` → `1`.
  - `curl -s localhost:3917/resources/what-movers-cost-santa-rosa-beach-30a | grep -c 'href="/pricing#hourly-honest"'` → `1`.
  - `curl -s localhost:3917/sitemap.xml | grep -A1 '/pricing<' | grep -o '<lastmod>[^<]*'` → the ship date.
- [ ] S4 → `0`. S5–S7.

### Review Focus (PR 2.4)
1. **Only published claims.** Nothing about how drive time is counted, minimums, increments, deposits or guarantees.
2. **Contradictions not deepened:** the section doesn't repeat "fuel included" or "what we quote is what you pay" (open owner
   items C2/C3 in `docs/PRICING-PAGE-PLAN-2026-09-24.md`).
3. **Anchor offset:** `/pricing#hourly-honest` lands below the fixed navbar on a phone.

---

## PR 2.5: 30A & Sandestin no-work-day calendar

**Target:** no reportable KP volume ("condo move rules" —, KP:80); AC "movers destin memorial day", "movers santa rosa
beach in december" (QB:283). The asset is the link/citation magnet LA ranks #2 (LA:243, LA:56–77): dated, sourced, refreshed
yearly. **Framing (ruling):** sources are contractor/construction work rules and most never name moving (LA:18, LA:32, LA:35),
so the page says "No-Work Days", not "no-move days", and every section repeats "as posted publicly; confirm with management".

| Field | Value | Chars |
|---|---|---|
| slug | `30a-sandestin-no-work-days-calendar` (year-free, so the URL survives yearly refreshes) | |
| `title` (H1 + `<title>`) | 30A & Sandestin No-Work Days 2026–27: Plan Your Move Around Them | 64 |
| `description` (dek + meta) | Rosemary Beach's 21 posted no-work days, plus the Sunday and holiday rules Seaside, WaterColor, Sandestin and Kelly Plantation publish, as posted publicly. | 155 |

**Facts (LA, all as-of 2026-10-02, re-check):** Rosemary Beach hours and 21 dates (LA:35); Seaside (LA:36); WaterColor
(LA:37); Sandestin (LA:32); Kelly Plantation, Destin (LA:30); no public rules for Alys Beach, WaterSound Beach, Watersound
West Beach (LA:46); questions to ask (LA:72); refresh cadence (LA:75).
**Links in (indexed):** the checklist (`moving-checklist-30a-destin-florida`, "Seasonal Timing on 30A"), the condo guide
(`how-to-move-a-beach-condo-emerald-coast`, "HOA Rules Are Not Suggestions"), the 30A guide (`moving-to-30a-neighborhood-guide`,
"Rosemary Beach & Alys Beach"). **Links out:** Rosemary Beach, Seaside, WaterColor, Sandestin and 30A area pages; the condo guide.
**Schema:** BlogPosting + FAQPage + BreadcrumbList.

### Task 1: The post
**Files:** Modify `src/content/posts.ts` (append to `POSTS`)

- [ ] **Step 1: Re-check every source** (Sources list below). Copy the Rosemary occasion labels exactly from the PDF. If
  any community's rule changed, use the new text and date; if a source is gone, drop that section.
- [ ] **Step 2 (RED):** `node scripts/check-page.mjs http://localhost:3917 /resources/30a-sandestin-no-work-days-calendar` → `FAIL … HTTP 404`.
- [ ] **Step 3: Append**
```ts
  {
    slug: '30a-sandestin-no-work-days-calendar',
    title: '30A & Sandestin No-Work Days 2026–27: Plan Your Move Around Them',
    description:
      "Rosemary Beach's 21 posted no-work days, plus the Sunday and holiday rules Seaside, WaterColor, Sandestin and Kelly Plantation publish, as posted publicly.",
    datePublished: '<PR-open date YYYY-MM-DD>',
    author: 'Beach House Moving',
    heroImage: '/images/beach-house-moving-30a-gulf-front-crew.jpg',
    heroAlt: 'Beach House Moving crew member on a Gulf-front deck on 30A',
    leadCta: true,
    relatedServices: [
      { label: 'Local Moving', href: '/services/local-moving' },
      { label: 'Residential Moving', href: '/services/residential-moving' },
    ],
    excerpt:
      'Which days 30A communities and Sandestin bar contractor work, as posted publicly: Rosemary Beach\'s 21 dated 2026 no-work days plus Sunday and holiday rules. Confirm with your HOA.',
    body: [
      {
        body:
          "Most 30A communities and Sandestin publish rules for contractor and construction work, not for moves. Where those rules exist, the pattern is the same: no work on Sundays or major holidays, and weekday hours that start around 7 a.m. Rosemary Beach goes further and publishes 21 specific no-work days for 2026. Most of these documents don't name moving, so treat this page as a planning list and confirm your date with your HOA or management office before you book. Everything below is as posted publicly; each source and the date we last checked it is listed at the end.",
      },
      {
        heading: 'Rosemary Beach: 21 posted no-work days for 2026',
        body:
          'Rosemary Beach posts a yearly list of no-work days. Regular work hours are Monday through Friday, 7 a.m. to 6 p.m., and Saturday, 8:30 a.m. to 5:30 p.m.; Sunday work needs written permission from the Town Manager. The list doesn\'t define "work", so ask whether it covers your move. See also our [Rosemary Beach moving notes](/service-areas/walton-county/rosemary-beach).',
        table: {
          caption: 'Rosemary Beach 2026 no-work days (as posted)',
          columns: ['Date', 'As posted'],
          rows: [
            ['Thu, Jan 1, 2026', '<label from PDF>'],
            ['Fri, Apr 3 – Sat, Apr 4', 'Easter'],
            ['Sat, May 23 and Mon, May 25', 'Memorial Day'],
            ['Fri, Jul 3 – Sat, Jul 4', '<label from PDF>'],
            ['Sat, Sep 5 and Mon, Sep 7', 'Labor Day'],
            ['Fri, Oct 9 – Sat, Oct 10', 'Owners Weekend'],
            ['Sat, Nov 7', 'Rosemary Beach Uncorked'],
            ['Thu, Nov 26 – Sat, Nov 28', 'Thanksgiving'],
            ['Thu, Dec 24 – Sat, Dec 26', '<label from PDF>'],
            ['Thu, Dec 31', '<label from PDF>'],
            ['Fri, Jan 1 – Sat, Jan 2, 2027', '<label from PDF>'],
          ],
        },
      },
      {
        heading: 'Seaside',
        body:
          "Seaside's jobsite rules (updated September 27, 2023) allow exterior work 7 a.m. to 6 p.m., Monday through Saturday; contractors may arrive at 7 but must stay quiet until 8. Seaside counts material suppliers and delivery vehicles as contractors. Streets can't be blocked except for short-term loading and unloading, and a street closure needs Town Manager approval three days ahead. No exterior work on Sundays; New Year's Eve and Day; Memorial Day and the Saturday before; Independence Day (the rules add a weekend provision, so read it for your date); Labor Day and the Saturday before; Thanksgiving and the day after; and Christmas Eve, Christmas Day and the day after. More in our [Seaside notes](/service-areas/walton-county/seaside).",
      },
      {
        heading: 'WaterColor',
        body:
          "WaterColor's posted hours for construction and maintenance are 7 a.m. to 5 p.m., every day except Sundays and holidays (the FAQ doesn't list which holidays, so ask). No parking on the street, on pine straw, or on sidewalks and paths. More in our [WaterColor notes](/service-areas/walton-county/watercolor).",
      },
      {
        heading: 'Sandestin',
        body:
          "The Sandestin Owners Association's posted contractor rules are construction rules; they don't mention moving. Construction hours: March through October, Monday to Friday, 7 a.m. to 6 p.m.; November through February, Monday to Friday, 7 a.m. to 5 p.m.; Saturdays 7 a.m. to 5 p.m. all year. No work on Sundays or on New Year's Eve, New Year's Day, Memorial Day, July 4th, Labor Day, Thanksgiving, Christmas Eve or Christmas Day. Construction traffic uses the East or South Gate, and the general rules (revised August 21, 2025) don't let cargo trucks remain outside designated areas. Individual towers and neighborhoods inside Sandestin can add their own rules. More in our [Sandestin notes](/service-areas/walton-county/sandestin).",
      },
      {
        heading: 'Kelly Plantation (Destin)',
        body:
          "Kelly Plantation's gate rules give contractors access from 7 a.m. to 6 p.m. March through October and 7 a.m. to 5 p.m. November through February, with no Sunday access. The gate is closed to contractors on New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving and Christmas. Temporary passes of up to five days are free; regular contractors register with management.",
      },
      {
        heading: 'Holidays at a glance',
        table: {
          caption: 'Posted no-work holidays by community (WaterColor lists "holidays" without naming them)',
          columns: ['Holiday', 'Rosemary Beach', 'Seaside', 'Sandestin', 'Kelly Plantation'],
          rows: [
            ["New Year's Eve", 'No work (Dec 31)', 'No work', 'No work', 'Not listed'],
            ["New Year's Day", 'No work', 'No work', 'No work', 'No work'],
            ['Memorial Day', 'No work (and Sat, May 23)', 'No work (and the Saturday before)', 'No work', 'No work'],
            ['Independence Day', 'No work (Jul 3–4)', 'No work (weekend provision)', 'No work', 'No work'],
            ['Labor Day', 'No work (and Sat, Sep 5)', 'No work (and the Saturday before)', 'No work', 'No work'],
            ['Thanksgiving', 'No work (Nov 26–28)', 'No work (and the day after)', 'No work', 'No work'],
            ['Christmas Eve', 'No work', 'No work', 'No work', 'Not listed'],
            ['Christmas Day', 'No work', 'No work', 'No work', 'No work'],
            ['Day after Christmas', 'No work', 'No work', 'Not listed', 'Not listed'],
          ],
        },
      },
      {
        heading: "Communities that don't post rules publicly",
        body:
          "We couldn't find public work or move rules for Alys Beach, WaterSound Beach or Watersound West Beach (which posts only rules for renters). That doesn't mean there are none. Call the management office and ask the questions below. Moving into a tower instead? See [how to move into a beach condo](/resources/how-to-move-a-beach-condo-emerald-coast).",
      },
      {
        heading: 'Seven questions to ask your HOA or management office',
        items: [
          'Does the no-work calendar or the contractor-hours rule cover a household move?',
          'What hours can a moving truck load and unload on weekdays and on Saturday?',
          'Do you need a certificate of insurance from the mover, and with what wording or limits?',
          'Is there a deposit or fee for a move?',
          'Where can the truck park or stage, and for how long?',
          'Does the mover need a gate or vendor pass, and how far ahead?',
          'Is there an elevator to reserve or pad?',
        ],
      },
      {
        body:
          'When you call (850) 842-1962 to book, tell us the community name, and check the date against this page and your HOA before you lock it in. More on moving along the coast road in our [30A area guide](/service-areas/walton-county/30a).',
      },
      {
        isOwnerNote: true,
        body:
          "REFRESH YEARLY. Rosemary Beach posts the next year's list around August (upload path /wp-content/uploads/<year>/08/). Re-check every source in January and again before Memorial Day; update the tables, the years in the title, sources[].asOf and dateModified. If the 2027 Rosemary list isn't posted by Jan 31, 2027, drop '–27' from the title instead of guessing.",
      },
    ],
    faq: [
      {
        question: 'Can I move on a Sunday in Rosemary Beach?',
        answer:
          "Not without written permission. Rosemary Beach's posted work hours exclude Sundays unless the Town Manager approves in writing, so ask well ahead.",
      },
      {
        question: 'What days are no-work days in Rosemary Beach in 2026?',
        answer:
          '21 posted dates: Jan 1; Apr 3–4; May 23 and 25; Jul 3–4; Sep 5 and 7; Oct 9–10; Nov 7; Nov 26–28; Dec 24–26; Dec 31; and Jan 1–2, 2027. Confirm whether they cover your move.',
      },
      {
        question: 'Does Sandestin allow moves on holidays?',
        answer:
          "Sandestin's posted construction rules bar work on Sundays and on New Year's Eve and Day, Memorial Day, July 4th, Labor Day, Thanksgiving, Christmas Eve and Christmas Day. They don't mention moving, so confirm with the Sandestin Owners Association and your building.",
      },
      {
        question: 'Does Seaside count moving trucks as contractors?',
        answer:
          "Seaside's jobsite rules count material suppliers and delivery vehicles as contractors, and streets can be blocked only for short-term loading and unloading. Confirm with the Seaside Town Council office how that applies to a household move.",
      },
      {
        question: 'Where can I find move rules for Alys Beach or WaterSound?',
        answer:
          "We couldn't find them posted publicly. Call the management office and ask about hours, holidays, insurance and truck parking before you book.",
      },
    ],
    sources: [
      { label: 'Rosemary Beach, 2026 No Workdays (PDF)', url: 'https://www.rosemarybeachfl.org/wp-content/uploads/2026/08/2026-Rosemary-Beach-No-Workdays.pdf', asOf: '<check date>' },
      { label: 'Seaside Town Council, Jobsite Rules, updated 9/27/23 (PDF)', url: 'https://www.seasidetowncouncil.com/uploads/policies/1695827741-JOBSITE-RULES-9.27.23.pdf', asOf: '<check date>' },
      { label: 'WaterColor Community Association FAQ', url: 'https://www.mywatercolorcommunity.com/faq', asOf: '<check date>' },
      { label: 'Sandestin Owners Association, contractor rules summary', url: 'https://www.sandestinowners.com/download/14/arb/1611/summarycontractorrules-eff-1-1-18', asOf: '<check date>' },
      { label: 'Sandestin Owners Association, General Rules Rev. 9 (8/21/25)', url: 'https://www.sandestinowners.com/download/12/security/5703/general-rules-rev9-8-21-2025', asOf: '<check date>' },
      { label: 'Kelly Plantation, Gate Entrance', url: 'https://www.kellyplantation.com/about/gate-entrance/', asOf: '<check date>' },
    ],
  },
```
- [ ] **Step 4:** S1. **Commit**
```bash
git add src/content/posts.ts
git commit -m "feat(resources): 30A & Sandestin no-work-day calendar (as posted publicly, sourced, yearly refresh)"
```

### Task 2: Inbound links, sitemap, llms.txt
**Files:** `src/content/posts.ts` (three indexed posts + their `dateModified`), `src/app/sitemap.ts` (`/resources`), `public/llms.txt`, `ARCHITECTURE.md`
- [ ] Checklist, "Seasonal Timing on 30A": after "can block our staging routes with little notice." add " Some communities also
  publish dates when no work is allowed at all; see our [30A and Sandestin no-work-day calendar](/resources/30a-sandestin-no-work-days-calendar)."
- [ ] Condo guide, "HOA Rules Are Not Suggestions": append " For 30A towns and Sandestin, our [no-work-day calendar](/resources/30a-sandestin-no-work-days-calendar) lists the posted Sunday and holiday rules."
- [ ] 30A guide, "Rosemary Beach & Alys Beach" first paragraph: append " Rosemary Beach also posts dated no-work days every year; see the [2026–27 calendar](/resources/30a-sandestin-no-work-days-calendar)."
- [ ] Set those three `dateModified`, the `/resources` sitemap date, the llms.txt `## Guides` line and the ARCHITECTURE.md post count. S1. **Commit**
```bash
git add src/content/posts.ts src/app/sitemap.ts public/llms.txt ARCHITECTURE.md
git commit -m "seo: link the no-work-day calendar from the checklist, condo and 30A guides"
```

### Task 3: Verify, PR, gate
- [ ] S1. S2 → `[check-meta] PASS — N+1 pages, M+1 posts`.
- [ ] S3: `node scripts/check-page.mjs http://localhost:3917 /resources/30a-sandestin-no-work-days-calendar --text "as posted publicly" --text "Rosemary Beach 2026 no-work days" --text "Owners Weekend" --text "confirm your date with your HOA" --no-text "no-move day" --no-text "<label from PDF>" --linked-from /resources/moving-checklist-30a-destin-florida --linked-from /resources/how-to-move-a-beach-condo-emerald-coast --linked-from /resources/moving-to-30a-neighborhood-guide` → `PASS`.
- [ ] `curl -s localhost:3917/resources/30a-sandestin-no-work-days-calendar | grep -c "REFRESH YEARLY"` → `0` (owner note hidden).
- [ ] S4 → `0`. S5–S7. Phone screenshot: the 5-column holiday table scrolls inside its box, not the page.

### Review Focus (PR 2.5)
1. **"Work" ≠ "move".** No sentence says a community bans moving trucks; every section points to management.
2. **Dates and labels** match the Rosemary PDF exactly (21 dates; weekdays above were computed for 2026 and Jan 2027).
3. **Kelly Plantation is Destin**, labeled as such, not 30A.
4. **Refresh path** exists (owner note + follow-up reminder) so the page doesn't go stale after Jan 2, 2027.

---

## PR 2.6: Moving in the rain and during hurricane season

**Target:** moving in the rain 100–1K (KP:74); AC-L "hurricane season moving to destin fl", "movers destin evacuation",
"movers santa rosa beach under evacuation / hurricane watch" (QB:278). Weather is a top complaint theme, and a mover cancelling
for drizzle is a recurring 1-star story (CP:94, CP:228). BHM's rain policy is confirmed; its **storm reschedule terms are
not** (Les Q3, second half), so the guide states only that weather calls are made with the customer.

| Field | Value | Chars |
|---|---|---|
| slug | `moving-in-rain-hurricane-season-emerald-coast` | |
| `title` (H1) | Moving in the Rain and During Hurricane Season on the Emerald Coast | 67 |
| `metaTitle` | Moving in Rain & Hurricane Season on the Emerald Coast | 54 |
| `description` (dek) | Do movers work in the rain, and what happens when a storm is named? Our rain policy, plus the hurricane dates, zones and insurance timing that matter. | 150 |
| `metaDescription` | Do movers work in the rain? Our rain policy, plus Emerald Coast hurricane-season dates, evacuation zones and insurance timing to plan a move around. | 148 |

**Facts:** rain (README); C2.1–C2.5 (LA:193–197); off-season months C4.2 (LA:217). No Bay or Santa Rosa County zone facts
were sourced, so those get a generic "check your county" line. **Links in (indexed):** checklist ("Seasonal Timing on 30A"),
cost guide ("What actually changes the price"), plus the same-day page (PR 2.3). **Links out:** same-day page,
`/resources/is-my-florida-mover-legit` (price-gouging/complaints). **Schema:** BlogPosting + FAQPage + BreadcrumbList.

### Task 1: The post
**Files:** Modify `src/content/posts.ts` (append to `POSTS`)
- [ ] **Step 1:** Re-check the four sources. **Step 2 (RED):** `check-page.mjs … /resources/moving-in-rain-hurricane-season-emerald-coast` → `FAIL … 404`.
- [ ] **Step 3: Append**
```ts
  {
    slug: 'moving-in-rain-hurricane-season-emerald-coast',
    title: 'Moving in the Rain and During Hurricane Season on the Emerald Coast',
    metaTitle: 'Moving in Rain & Hurricane Season on the Emerald Coast',
    description:
      'Do movers work in the rain, and what happens when a storm is named? Our rain policy, plus the hurricane dates, zones and insurance timing that matter.',
    metaDescription:
      'Do movers work in the rain? Our rain policy, plus Emerald Coast hurricane-season dates, evacuation zones and insurance timing to plan a move around.',
    datePublished: '<PR-open date YYYY-MM-DD>',
    author: 'Beach House Moving',
    heroImage: '/images/beach-house-moving-lift-gate-furniture-padded.jpg',
    heroAlt:
      'Padded and shrink-wrapped furniture staged on a box-truck lift gate during a Beach House Moving job on the Emerald Coast',
    leadCta: true,
    relatedServices: [
      { label: 'Same-Day & Short-Notice Moving', href: '/services/same-day-moving' },
      { label: 'Local Moving', href: '/services/local-moving' },
    ],
    excerpt:
      'Our rain policy in one line, and the official hurricane-season dates, evacuation zones, insurance timing and price-gouging rules to plan an Emerald Coast move around.',
    body: [
      {
        body:
          "Rain and storms are part of moving on the Emerald Coast. Here is our rain policy, and the official dates, zones and rules to plan around in hurricane season. It is general information; for your own safety decisions, follow your county's emergency management.",
      },
      {
        heading: 'Do movers move in the rain? We do, unless it risks your things',
        body:
          "We work in the rain. What we won't do is carry your things through weather that puts them at risk, and when it's close, we call you and decide together before anyone starts. A passing summer shower is a different day from a band of tropical rain, and you know which of your pieces can't take a drop.",
        items: [
          'Put old towels or mats inside every door the crew will use.',
          'Pack documents, photos and electronics in plastic bins, or bag the boxes.',
          'Keep packed boxes off garage floors and porches that take water.',
          'Clear a dry staging spot near the door at both ends.',
        ],
      },
      {
        heading: 'Hurricane season: the dates',
        body:
          'The Atlantic hurricane season runs June 1 to November 30. The climatological peak is September 10, and most activity falls between mid-August and mid-October (National Hurricane Center). If you can choose your date, November through February are the quietest months here: after the season and before the spring rental rush.',
      },
      {
        heading: 'Know your evacuation zone before you sign a lease or close',
        body:
          "Evacuation zones are about storm surge, not wind or storm category. Walton County has five zones, A through E, and sends alerts through AlertWalton. Okaloosa County's emergency managers note that zones can change from year to year; its alerts come through AlertOkaloosa, or text OKALOOSAFL to 888777. Moving to Bay or Santa Rosa County? Check that county's emergency management site. Look up the zone for your new address before move day, and sign up for alerts the day you get keys.",
      },
      {
        heading: 'Insurance timing for a new home',
        body:
          "Flood insurance is a separate policy, and a new National Flood Insurance Program policy typically takes up to 30 days to take effect, so buy it well before a storm is named. Okaloosa County's hurricane guide tells homeowners to confirm coverage before the season starts June 1, to photograph or video the home's contents for claims, and reminds renters that they need renter's insurance for their belongings.",
      },
      {
        heading: 'If a storm is forecast near your move date',
        body:
          "Follow official evacuation orders first; no move is worth loading a truck into one. If a storm is forecast near your date, call us and we'll talk through the timing with you before anything is decided. Keep important documents waterproofed, with digital copies, and pack them yourself so they ride with you. If it's a scramble, see [same-day and short-notice moves](/services/same-day-moving).",
      },
      {
        heading: 'Price-gouging rules during a declared emergency',
        body:
          "During a declared state of emergency, Florida bans unconscionable prices for essential commodities, including services needed because of the emergency and self-storage. The yardstick is the average price in the 30 days before the declaration (Fla. Stat. §501.160). Report gouging to the Florida Attorney General at 1-866-9-NO-SCAM. For checking a mover any time of year, see [how to check a Florida mover](/resources/is-my-florida-mover-legit).",
      },
    ],
    faq: [
      {
        question: 'Do movers move in the rain?',
        answer: "We do, unless the weather would put your things at risk. When it's close, we call you and decide together before anyone starts.",
      },
      {
        question: 'Will you cancel my move for light rain?',
        answer: 'Not just for rain. We only hold off when the weather would put your things at risk, and we confirm with you first.',
      },
      {
        question: 'Is it safe to move in September in Destin?',
        answer: 'Plenty of people do, but September 10 is the statistical peak of hurricane season. If your dates are flexible, keep a backup date and watch the forecast the week before.',
      },
      {
        question: 'What happens to my move if a hurricane is coming?',
        answer: "Follow official evacuation orders first. Call us as soon as a storm is forecast near your date and we'll work out the timing with you.",
      },
      {
        question: 'Can movers or storage companies raise prices during a hurricane emergency?',
        answer: "Not to unconscionable levels. During a declared state of emergency, Florida's price-gouging law covers services needed because of the emergency and self-storage, measured against the average price in the 30 days before the declaration.",
      },
      {
        question: 'How long does flood insurance take to start?',
        answer: 'A new National Flood Insurance Program policy typically takes up to 30 days to take effect, so buy it well before hurricane season, not when a storm is named.',
      },
    ],
    sources: [
      { label: 'National Hurricane Center, Tropical Cyclone Climatology', url: 'https://www.nhc.noaa.gov/climo/', asOf: '<check date>' },
      { label: 'Walton County All-Hazards Guide (PDF)', url: 'https://www.mywaltonfl.gov/DocumentCenter/View/42312/Walton-County-All-Hazards-Guide', asOf: '<check date>' },
      { label: 'Okaloosa County Hurricane Guide 2025 (PDF)', url: 'https://myokaloosa.gov/sites/default/files/Users/piouser/ForWEBHurricanGuide2025.pdf', asOf: '<check date>' },
      { label: 'Florida Statutes §501.160 (price gouging)', url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0501/Sections/0501.160.html', asOf: '<check date>' },
    ],
  },
```
(If Okaloosa has published a 2026 guide by the check date, cite that instead and re-confirm the facts.)
- [ ] **Step 4:** S1. **Commit** `git add src/content/posts.ts && git commit -m "feat(resources): rain and hurricane-season moving guide (rain policy + NHC/county/§501.160 facts)"`

### Task 2: Inbound links
**Files:** `src/content/posts.ts` (checklist + cost guide + their `dateModified`), `src/lib/service-details.ts`
(`same-day-moving` "Rain on move day" section) + `src/lib/content.ts` (`same-day-moving` `updatedAt`), `src/app/sitemap.ts`
(`/resources`), `public/llms.txt`, `ARCHITECTURE.md`
- [ ] Checklist, "Seasonal Timing on 30A": append " Moving between June and November? Read [moving in rain and hurricane season](/resources/moving-in-rain-hurricane-season-emerald-coast) first."
- [ ] Cost guide, "What actually changes the price": after "booking two to three weeks out beats calling the week of." (and the PR 2.3 sentence) add " Storm season has its own planning; see [moving in rain and hurricane season](/resources/moving-in-rain-hurricane-season-emerald-coast)."
- [ ] Same-day page "Rain on move day": append " More in our [rain and hurricane-season guide](/resources/moving-in-rain-hurricane-season-emerald-coast)." and bump its `updatedAt`.
- [ ] Dates, llms.txt `## Guides`, ARCHITECTURE.md count. S1. **Commit** `git commit -am "seo: link the rain and hurricane guide from the checklist, cost guide and same-day page"`

### Task 3: Verify, PR, gate
- [ ] S1. S2 → `[check-meta] PASS — N+1 pages, M+1 posts`.
- [ ] S3: `node scripts/check-page.mjs http://localhost:3917 /resources/moving-in-rain-hurricane-season-emerald-coast --text "We work in the rain" --text "September 10" --text "30 days" --no-text "reschedule fee" --no-text "no charge to reschedule" --no-text "we store" --linked-from /resources/moving-checklist-30a-destin-florida --linked-from /resources/what-movers-cost-santa-rosa-beach-30a --linked-from /services/same-day-moving` → `PASS`.
- [ ] S4 → `0`. S5–S7.

### Review Focus (PR 2.6)
1. **No storm policy invented:** no reschedule fee/free-reschedule language, no promise to move before or after a storm, no BHM storm storage (storage paused).
2. **Zone facts** only for Walton and Okaloosa (sourced); nothing for Bay/Santa Rosa beyond "check your county".
3. **Safety tone:** official evacuation orders come first in both the body and the FAQ.

---

## PR 2.7: PPM/DITY expansion of the PCS field guide

**Target:** ppm move / dity move 100–1K ($18.00 / $8.15), pcs move checklist 100–1K (KP:70–71); AC "what is a ppm move",
"ppm move eglin afb" (QB:130–131); TMO queries with 12 impressions and no answer (QB:56, QB:84); partial-PPM labor help
(QB:311). **Ruling:** expand `pcs-move-eglin-afb-hurlburt-field-guide` (indexed; the older duplicate already 301s to it,
`next.config.mjs`) instead of a new page. Keep the title and H1 (it ranks for "eglin air force base movers"); change only the
meta description. Correct the existing PPM paragraph: it says the government "reimburses a percentage", but a Member-Elected
PPM pays **100% of the Government Constructed Cost** (LA:177). The research's hook, "a PPM-friendly mover provides certified
weight tickets" (LA:179, LA:244), is **not owner-confirmed**, so the guide states the DoD rule and tells readers to ask.

| Field | Value | Chars |
|---|---|---|
| `title` / `metaTitle` | unchanged ("PCS to Eglin AFB or Hurlburt Field: A Local Mover's Guide", 57) | |
| `metaDescription` | PCS to Eglin AFB or Hurlburt Field: a local mover's guide to PPM/DITY moves, weight tickets, TMO contacts, neighborhoods and on-base vs off-base housing. | 153 |

**Facts:** C1.1–C1.8, C1.11–C1.12 (LA:174–185); §507.02 (LA:91). **Links out (new):** `/resources/is-my-florida-mover-legit`.
**Links in (new, indexed):** `/services/military-pcs-moving` "PPM / DITY support" section. **Schema:** FAQPage grows by 4.

### Task 1: Edits
**Files:** Modify `src/content/posts.ts` (`pcs-move-eglin-afb-hurlburt-field-guide`, around line 421)
- [ ] **Step 1:** Re-check the DoD PPM fact sheet, both Military OneSource HHG pages and the 7-day window fact sheet; copy TMO
  phones, hours and building numbers exactly as listed on the check date. **Step 2 (RED):**
  `node scripts/check-page.mjs http://localhost:3917 /resources/pcs-move-eglin-afb-hurlburt-field-guide --text "Government Constructed Cost" --text "850-882-8331"` → `FAIL`.
- [ ] **Step 3: Replace the first "The PPM/DITY Move Option" paragraph** with:
  "Some service members choose a Personally Procured Move (PPM, still often called a DITY): you move yourself, or hire and manage your own moving company. In a Member-Elected PPM the government pays 100% of its Government Constructed Cost (GCC), what it would have paid to move you, and you keep whatever you don't spend, minus taxes. The final payment uses the actual weight on your weight tickets, capped at your weight allowance. An Actual Cost Reimbursement PPM is different: it applies only when a government-provided mover isn't available, needs written approval from your Transportation Office first, and pays your documented actual costs. You hire local movers, we load and transport your goods, and you submit documentation to your Transportation Management Office for reimbursement. We handle PPM moves regularly and provide invoices formatted to meet military documentation requirements: itemized labor, mileage where applicable, and dates that align with your orders."
  (The last two sentences are the existing copy, kept.)
- [ ] **Step 4: Insert after the "Call your TMO…" paragraph** (in this order):
```ts
      {
        subheading: 'Weight tickets decide your PPM payment',
        paragraph:
          "For each PPM trip you need an empty and a full weight ticket from a certified scale. The DoD's PPM fact sheet is direct about it: if you hire a commercial moving company, make sure they also provide weight tickets. Keep every receipt. Before you book any mover for a PPM, ask how the empty and full weigh-ins will happen, and get the answer before move day.",
      },
      {
        heading: 'Hiring a Civilian Mover for a PPM: The Protections That Apply',
        paragraph:
          "A government-arranged household-goods shipment is outside Florida's moving law, but when you hire a mover yourself for a PPM that starts and ends in Florida, it's a private contract and chapter 507 applies: FDACS registration, a signed written estimate and contract, insurance and the 60-cents-a-pound minimum valuation. If your PPM leaves Florida, the mover falls under federal rules instead; check its USDOT number. The DoD warns about rogue operators: low-ball quotes, a broker calling instead of the mover, a demand for cash or an electronic bank deposit as a down payment, and a company name that doesn't match from one place to the next. Our [Florida mover checklist](/resources/is-my-florida-mover-legit) shows how to check any mover in five minutes.",
      },
      {
        subheading: 'Storage and Pickup Windows',
        paragraph:
          "If you need temporary storage as part of a PPM, the DoD allows up to 90 days for service members (60 days for civilian employees), capped at the GCC, and you'll need the storage contract and receipts. If part of your move is a government shipment, the government mover must pick up within a 7-day window ending on the latest pickup date you request; weekend and holiday pickups need your approval. Plan about one packing day per 4,000 pounds.",
      },
      {
        heading: 'Eglin and Hurlburt TMO Contacts',
        paragraph:
          'As listed by Military OneSource on <check date, Month D, YYYY>: Eglin AFB TMO, 310 Van Matre Ave, Bldg 210, Rm 169, 850-882-8331 (DSN 312-872-8331), Monday through Friday, 8 a.m. to 3 p.m. Hurlburt Field TMO, Bldg 90210, 212 Lukasik Ave, 850-884-6051 (DSN 312-579-6051), Monday through Thursday 9 to 3 and Friday 9 to 2, closed weekends, holidays, family days and wing training days. The DoD Personal Property Activity call center is 833-MIL-MOVE (833-645-6683), Monday through Friday, 8 a.m. to 5 p.m. Central. Hours change, so check the official pages in the sources below before you go.',
      },
```
- [ ] **Step 5: Utilities sentence.** The "Getting the Rest Set Up" block says "Gulf Power and Florida Power and Light both serve
  parts of the county". Check FPL's current Northwest Florida service-area page; if Gulf Power no longer operates as a
  separate utility, change it to the sourced current name and add that source. If you can't source it, leave it and list it
  in Follow-ups.
- [ ] **Step 6: FAQ** (append after the existing five)
```ts
      {
        question: 'Can I hire a civilian mover for a PPM?',
        answer:
          'Yes. A PPM means you move yourself or hire and manage your own moving company. The DoD says to make sure a commercial mover provides weight tickets and to keep every receipt. Check with your TMO first.',
      },
      {
        question: 'Does a PPM pay 100% of what the government would have spent?',
        answer:
          "In a Member-Elected PPM, yes: 100% of the Government Constructed Cost, based on the actual weight on your weight tickets and capped at your weight allowance. You keep what you don't spend, minus taxes.",
      },
      {
        question: 'What is the Eglin AFB TMO phone number?',
        answer:
          'Military OneSource lists the Eglin TMO at 850-882-8331 (DSN 312-872-8331) and the Hurlburt Field TMO at 850-884-6051 (DSN 312-579-6051). Hours change, so check the official page before you go.',
      },
      {
        question: 'Do Florida moving laws protect me on a PPM?',
        answer:
          'If you hire the mover yourself for a move within Florida, yes: chapter 507 applies to that private contract. Government-arranged shipments are outside it, and a PPM that leaves Florida falls under federal rules.',
      },
```
- [ ] **Step 7: Fields.** `metaDescription` per the table, `leadCta: true`, `dateModified` = ship date, and
```ts
    sources: [
      { label: 'Military OneSource, PPM and Rogue Operators fact sheet, March 2026 (PDF)', url: 'https://download.militaryonesource.mil/12038/MOS/Factsheets/PPM%20and%20Rogue%20Operators_Fact%20Sheet.pdf', asOf: '<check date>' },
      { label: 'Military OneSource, Eglin AFB household goods', url: 'https://installations.militaryonesource.mil/military-installation/eglin-afb/moving/household-goods', asOf: '<check date>' },
      { label: 'Military OneSource, Hurlburt Field household goods', url: 'https://installations.militaryonesource.mil/military-installation/hurlburt-field/moving/household-goods', asOf: '<check date>' },
      { label: 'Military OneSource, 7-Day Spread Window fact sheet, March 2026 (PDF)', url: 'https://download.militaryonesource.mil/12038/MOS/Factsheets/FactSheet-7Day-SpreadWindow.pdf', asOf: '<check date>' },
      { label: 'Florida Statutes chapter 507 (§507.02 scope)', url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0507/0507.html&StatuteYear=2026', asOf: '<check date>' },
    ],
```
- [ ] **Step 8:** S1. **Commit** `git add src/content/posts.ts && git commit -m "feat(pcs-guide): PPM/DITY rules (100% GCC, weight tickets, ch. 507 for PPM-hired movers), TMO contacts"`

### Task 2: Inbound link from the PCS service page
**Files:** `src/lib/service-details.ts` (`military-pcs-moving` "PPM / DITY support that survives the paperwork"),
`src/lib/content.ts` (`military-pcs-moving` `updatedAt`)
- [ ] Append to that section's paragraph: " Our [PCS guide](/resources/pcs-move-eglin-afb-hurlburt-field-guide) covers how PPM pay, weight tickets and TMO contacts work." Set `updatedAt`. S1.
  **Commit** `git commit -am "seo: link the PCS guide's PPM section from the military service page"`

### Task 3: Verify, PR, gate
- [ ] S1. S2 → `[check-meta] PASS — N pages, M posts`.
- [ ] S3: `node scripts/check-page.mjs http://localhost:3917 /resources/pcs-move-eglin-afb-hurlburt-field-guide --text "Government Constructed Cost" --text "850-882-8331" --text "Weight tickets decide your PPM payment" --no-text "reimburses a percentage" --no-text "we provide weight tickets" --no-text "24/7 during peak season" --linked-from /services/military-pcs-moving` → `PASS`.
- [ ] `node scripts/check-page.mjs http://localhost:3917 /resources/is-my-florida-mover-legit --linked-from /resources/pcs-move-eglin-afb-hurlburt-field-guide` → `PASS`.
- [ ] S4 → `0` (TMO addresses are government buildings; the guard checks BHM's address only). S5–S7. After merge, re-request indexing for the guide.

### Review Focus (PR 2.7)
1. **Weight tickets:** DoD rule plus "on request, we provide certified empty and full weight tickets" (Les, 2026-10-03).
2. **Ranking safety:** title and H1 unchanged; the PCS duplicate's 301 still resolves (`curl -sI localhost:3917/resources/military-pcs-move-eglin-hurlburt | head -1` → `308`/`301`).
3. **TMO data freshness:** the "as listed on <date>" sentence and both sources are present.

---

## Formerly blocked items (unblocked 2026-10-03)

Where each newly confirmed fact goes (README "Les answers"):

| Fact | Ships in | Exact claim allowed |
|---|---|---|
| Certified empty/full weight tickets for PPMs | 2.7 | "On request, we provide certified empty and full weight tickets." Replace the PR 2.7 `--no-text "we provide weight tickets"` check with `--text "certified empty and full weight tickets"`. |
| Same-day pricing | 2.3 | "Same-day jobs cost the same as any other day: no markup." Keep "when a crew is free"; still never promise same-day. |
| 2-hour minimum, drive time from the warehouse and back, not-to-exceed on request | 2.4 | Add to `PRICING_HOURLY_HONEST`: "Every job has a 2-hour minimum, whatever the crew size." "Drive time runs from our warehouse to your job and back, at your crew's hourly rate." "Want a ceiling? Ask for a not-to-exceed price." |
| Estimate and contract signed on site before work | 2.1, 2.4 | "You sign the estimate and contract on site, before we start." |
| Coverage, exclusions, reporting, repair/replace, condition photos | 2.8 | As in README, verbatim figures: $750,000 general liability; $375,000 cargo; $100,000 per move; $10,000 per item; full value protection optional at an added cost ("ask at quote"). |
| Storage terms | 2.9 | Climate controlled; visits allowed; inventory list; insured; 1-month minimum; billed per item (first charge = receiving + month one, then 50% monthly); optional $10/item pre-assembly. No per-category prices. |
| Storm reschedule / cancellation terms | still held | Les Q3 second half was never answered. Only "we decide with you" ships (PR 2.6). |
| Billing increment, deposit, full-value price | still held | Not answered. |

## PR 2.8: Coverage, damage and claims page
**Why:** damage and surprise-bill complaints are the top two competitor review themes (CP:89–90, CP:213–218). Nobody local
publishes their limits; BHM now can. **URL:** `/coverage-and-claims` (a static page like `/pricing`, so it can carry a table
and FAQPage schema). **Files:** `src/app/coverage-and-claims/page.tsx` (copy the `/pricing` page structure),
`src/lib/content.ts` (new `COVERAGE_PAGE` object: hero, limits table, "not covered" list, "if something gets damaged" steps,
FAQ), `src/app/sitemap.ts`, footer and `/pricing` links, `ARCHITECTURE.md`, `public/llms.txt`.
**Copy facts:** only the README "Les answers" coverage, exclusions, reporting (crew right away or within 14 days, the lead or
main office, photos from several angles), repair first then replace, condition photos. Publish only the customer-facing steps. Explain the Florida minimum (60¢ per lb per article, §507.04) only as context, citing LA.
**Meta:** title "Moving Insurance, Coverage & Claims | Beach House Moving" (56); description ≤ 160 naming the $100,000 per-move
limit and the 14-day window. **Links in:** `/pricing` (new "Coverage" line), each service page's FAQ "Are you insured?" where
one exists, the legit guide (2.1). **Checks:** `check-page.mjs /coverage-and-claims --text "100,000" --text "14 days" --text
"owner-packed" --no-text "USDOT"`, S1–S7. **Review Focus:** exact figures match README; no promise of payout timing; no
"we cover everything".

## PR 2.9: Storage revamp on `/services/storage`
**Why:** "storage santa rosa beach" shows BHM at about #1 with 0 clicks: searchers expect a self-storage unit. The page must
say plainly that BHM picks up, stores in its own climate-controlled warehouse, and delivers. **Files:**
`src/lib/service-details.ts` (`storage` sections and FAQs), `src/lib/content.ts` (`storage` shortDescription, metaDescription,
`updatedAt`). **Copy facts:** storage row of the table above. Add the §507.07(11) note (a mover can't put goods in a
third-party unit unless it's in the customer's name; LA:124), and re-open that source before shipping. Rewrite GBP-POSTS-2026-09 post 10 from the same facts.
**Checks:** `check-page.mjs /services/storage --text "climate-controlled" --text "inventory list" --text "one month"
--no-text "no rigid minimum"`; title unchanged (it ranks). S1–S7.

## PR 2.10: Meet the crew (on `/about`)
**Blocked on inputs, not facts:** Travis sends the first names to show and one photo per person. Each photo goes through the
CLAUDE.md photo-privacy gate (full-size look + `npm run audit:photo-pii`). Section "The Crew" on `/about`: first name, role,
one confirmed line each (owner-supplied only). `Person` schema for owners only if Travis approves. No last names.

## Spec conflicts and rulings
1. **Navarre plan vs README:** WAVE1-PLAN-NAVARRE said "don't name Gulf Breeze, Pace, Milton"; README (2026-10-03) confirms them
   "when they have availability". README wins; they appear only with that qualifier (PR 2.2).
2. **Same-day: "section or page" (DESIGN):** ruled a service page (`/services/same-day-moving`) for commercial intent ($25–40 bids).
3. **First-screen CTA (DESIGN principle 4) vs templates:** posts had none and service heroes had none. PR 2.1 adds opt-in
   `leadCta`; PR 2.3 adds hero buttons only if Wave 1 hasn't.
4. **"What the clock covers" (DESIGN) vs open owner questions:** the hourly section uses only already-published claims; the rest is held.
5. **Existing promises vs "never promise same-day":** the homepage hours FAQ ("we can make that happen") is softened in PR 2.3.
   "Background-checked" (`/pricing`, military FAQ) is verified against ch. 507 in PR 2.1 and cut if unsupported.
6. **Statutory wording:** the legit guide explains "Fla. Mover Reg. No." / "Fla. IM No.", while the site shows "FL Mover Reg. #IM4125"
   in about 38 places. Not swept in Wave 2 (sitewide, `CONTENT_REVISION`-wide); recommended as follow-up F1, ideally merged before PR 2.1.
7. **Interstate confirmed, USDOT not printable:** the guide treats interstate generically and never invites a BHM federal lookup
   (SAFER shows OUT-OF-SERVICE as of 2026-10-03; Travis: being fixed). Revisit once SAFER shows ACTIVE.
8. **PCS guide accuracy:** "reimburses a percentage" contradicts DoD (100% GCC); corrected in PR 2.7.
9. **"No-move days" (DESIGN) vs sources:** they are work rules; titled "No-Work Days" with a confirm-with-management caveat.
10. **Hurricane "reschedule policy" (research suggestion):** not confirmed; only "we decide with you" ships.
11. **External links:** `renderBody` renders internal links only (by design), so sources go in the new `sources` list, not inline.
12. **`posts.ts` import-free:** rate written literally; the cost guide's old meta description (rate without drive time) fixed in PR 2.2.

## Follow-ups (not in these PRs)
- ~~**F1:** statutory-wording sweep~~ **Done** in PR #8 (2026-10-03).
- **F2:** `/pricing` "fuel included" and "what we quote is what you pay" (PRICING-PAGE-PLAN C2/C3): Q12 is answered for the
  minimum and drive time but not fuel; ask Les "is fuel included in the hourly rate?" before shipping either line.
- **F3:** yearly calendar refresh: a report-only reminder for Jan 15 and Aug 31 each year (Travis approves; no acting routine).
- **GBP (posting kit, no UTM, no phone in body):** one post per new URL: the legit guide, the same-day page (also add
  "Same-day moving" as a GBP custom service, ≤300 chars, availability-qualified), the calendar (time it before Nov 7), the rain
  and hurricane guide.
- **KEYWORD-MAP.md:** point "short notice / same day / last minute movers" at `/services/same-day-moving`; add the rank-snapshot row
  "same day movers destin" (already listed) to the monthly check once the page is indexed.
- **Photos:** request a rainy-day load photo and a 30A community staging photo in the next batch (`service-images.ts` TODO).
