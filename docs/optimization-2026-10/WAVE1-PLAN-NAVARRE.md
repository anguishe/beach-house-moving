# Wave 1 / PR 1: Navarre Service-Area Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a Navarre service-area page (`/service-areas/santa-rosa-county/navarre`) that ranks for "movers navarre fl"
(Keyword Planner: 100–1K/mo, top bid $48.62). It must be linked from pages Google already indexes, and it must not
claim that BHM covers all of Santa Rosa County.

**Architecture:** The geo pages are fully data-driven. `SERVICE_AREAS` and `NEIGHBORHOODS` in `src/lib/content.ts` feed
the `[county]` and `[county]/[neighborhood]` routes, the sitemap, the footer and the homepage cards. Adding one
`SERVICE_AREAS` record (Santa Rosa County, scoped to Navarre) and one `NEIGHBORHOODS` record creates both pages. A small
optional `nearbySlugs` field lets Navarre cross-link to Okaloosa neighbors, because it has no same-county siblings.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4. Static data in `src/lib/content.ts`. No new
packages.

**Spec:** `docs/optimization-2026-10/DESIGN.md` (Wave 1 table, "Navarre page" row). Facts: `docs/optimization-2026-10/README.md`.

## Global Constraints
- Claims about BHM only from README "Owner-confirmed service facts". Navarre: "In BHM's radius. Les wants to rank there."
  Same-day: "offered across all services when they have availability. Never promise it." Rain: "work in the rain, but not if it risks any items; confirm with the customer."
- **Do not claim all of Santa Rosa County.** Gulf Breeze, Pace and Milton are unconfirmed, so don't name them as served.
  The county record says "Navarre and Navarre Beach".
- Third-party facts about Navarre need a source URL with an as-of date, recorded in the PR body. Anything unsourced gets cut.
- `<title>` ≤ 65 chars including the brand suffix (aim ≤ 60). Meta description ≤ 160. Titles must be unique. Enforced by `npm run build` → `scripts/check-meta.mjs`.
- No prices beyond the published rate line (`RATE_LINE`: "$195/hr for 2 movers, plus drive time").
- Phone in copy: `(850) 842-1962`. No street address anywhere.
- Text contrast ≥ 4.5:1 (site-gate). Use only existing components and tokens; no new colors.
- When a neighborhood's rendered copy or links change, set its `updatedAt` to the ship date (CLAUDE.md convention).
- Every PR runs site-gate on the Vercel preview with 0 new errors vs `~/Projects/docs/tools/site-gate/baseline-2026-10-02/beachhousemoving.xyz.txt`, and Travis merges.

## Review Focus
1. **Empty "Nearby areas" on Navarre:** it's the only neighborhood in its county. Expect links to Fort Walton Beach and Destin anyway (Task 1 `nearbySlugs`, verified in Task 4).
2. **4-card homepage grid on a 390px phone:** the new county card must not overflow or orphan awkwardly. Expect a clean single column (site-gate mobile pass plus a phone screenshot in Task 4).
3. **Over-claiming the county:** the `/service-areas/santa-rosa-county` hub must read as "Navarre and Navarre Beach", not the whole county (copy review in Task 4).
4. **Duplicate or long titles:** the new county and Navarre titles must pass check-meta (build in Task 4).
5. **Schema drift:** `areaServed` in JSON-LD lists Navarre and Navarre Beach as cities, not "Santa Rosa County" as an AdministrativeArea (grep in Task 4).

---

### Task 1: Data: Santa Rosa County (Navarre-scoped) and the Navarre neighborhood, plus nearby cross-links

**Files:**
- Modify: `src/lib/content.ts`: `SERVICE_AREAS` (append a 4th record after Bay County, around line 216), `Neighborhood` type (around line 1519, add `nearbySlugs`), `NEIGHBORHOODS` (append Navarre; also add `nearbySlugs: ['navarre']` and a bumped `updatedAt` to the `fort-walton-beach` record, around line 2036)
- Modify: `src/app/service-areas/[county]/[neighborhood]/page.tsx:143-145` (`nearbyAreas`)

**Interfaces:**
- Produces: `NEIGHBORHOODS` entry `{ slug: 'navarre', county: 'Santa Rosa County' }`; `SERVICE_AREAS` entry `{ slug: 'santa-rosa-county', county: 'Santa Rosa County' }`; optional `Neighborhood.nearbySlugs?: readonly string[]`.

- [ ] **Step 1: Verify the Navarre facts and record the sources**

Before writing any copy, confirm each fact below with a source (official county, state or chamber page preferred) and note
the URL and date for the PR body. Drop any fact you can't source.
- Navarre is an unincorporated community in Santa Rosa County, on US-98 between Gulf Breeze and Mary Esther.
- Navarre Beach is on Santa Rosa Island across Santa Rosa Sound, reached by the Navarre Beach Bridge.
- The Navarre Beach Fishing Pier is about 1,545 ft long, commonly cited as Florida's longest Gulf pier.
- Hurlburt Field sits a short drive east on US-98.
- Holley by the Sea is a large Navarre neighborhood north of US-98.

- [ ] **Step 2: Add `nearbySlugs` to the type and the page**

In the `Neighborhood` type, after `localFaqs`:
```ts
  /** Cross-county neighbors to link under "Nearby areas" (used when a county has few or no siblings). */
  nearbySlugs?: readonly string[]
```
In `src/app/service-areas/[county]/[neighborhood]/page.tsx`, replace the `nearbyAreas` block with:
```ts
  const nearbyAreas = [
    ...NEIGHBORHOODS.filter((n) => n.county === nb.county && n.slug !== nb.slug),
    ...(nb.nearbySlugs ?? [])
      .map((slug) => NEIGHBORHOODS.find((n) => n.slug === slug))
      .filter((n): n is (typeof NEIGHBORHOODS)[number] => n !== undefined && n.county !== nb.county),
  ]
```
Then fix the nearby-link href (around line 382). It currently uses the **current page's** county
(`/service-areas/${area.slug}/${sibling.slug}`), which would 404 for a cross-county neighbor. Replace it with:
```tsx
                    href={`/service-areas/${SERVICE_AREAS.find((a) => a.county === sibling.county)?.slug ?? area.slug}/${sibling.slug}`}
```
(`SERVICE_AREAS` is already imported in this file. Confirm with `grep -n "SERVICE_AREAS" "src/app/service-areas/[county]/[neighborhood]/page.tsx"`.)

- [ ] **Step 3: Append the Santa Rosa County record to `SERVICE_AREAS`**

```ts
  {
    county: 'Santa Rosa County',
    slug: 'santa-rosa-county',
    updatedAt: '<ship date YYYY-MM-DD>',
    featuredNeighborhoodSlugs: ['navarre'] as readonly string[],
    cities: ['Navarre', 'Navarre Beach'],
    image: '/images/beach-house-moving-fleet-truck-van.jpg',
    description:
      'In Santa Rosa County we serve Navarre and Navarre Beach, the stretch of US-98 just west of Hurlburt Field and Mary Esther. It is a natural extension of our Okaloosa runs: military families moving near Hurlburt, beach homes and condos on Navarre Beach, and family neighborhoods north of the highway. Same owner-operated crew, same care, and the drive time is quoted up front so the number holds.',
    whatWeMoveIntro:
      'Navarre homes, Navarre Beach condos, and Hurlburt-area PCS moves, quoted with the drive time included up front.',
    metaTitle: 'Navarre FL Movers — Santa Rosa County | Beach House Moving',
    metaDescription:
      'Licensed, owner-operated movers serving Navarre and Navarre Beach in Santa Rosa County. Home, condo and PCS moves. Free quote — (850) 842-1962.',
    faqs: [
      {
        q: 'Which parts of Santa Rosa County do you serve?',
        a: 'Navarre and Navarre Beach. Moving somewhere else in Santa Rosa County? Call (850) 842-1962 and ask. If we can get there, we will.',
      },
      {
        q: 'Do you charge drive time to Navarre?',
        a: 'Our published rate is $195/hr for 2 movers, plus drive time. Navarre is west of our usual Okaloosa runs, so we tell you the drive time up front when we quote.',
      },
    ],
  },
```
`ServiceArea` already allows `updatedAt`. If TypeScript complains about the literal union on `as const`, add
`updatedAt` the same way the other records do (none do yet), or drop it and rely on `CONTENT_REVISION`, then note that
in the PR.

- [ ] **Step 4: Append the Navarre record to `NEIGHBORHOODS`** (copy uses only facts verified in Step 1)

```ts
  {
    slug: 'navarre',
    updatedAt: '<ship date YYYY-MM-DD>',
    name: 'Navarre',
    county: 'Santa Rosa County',
    image: '/images/beach-house-moving-luxury-home-fleet-truck-and-van.jpg',
    intro:
      'Navarre runs along US-98 between Gulf Breeze and Mary Esther, with Navarre Beach across the sound on Santa Rosa Island. Hurlburt families, beach condos, and established neighborhoods north of the highway make up most of the work, and we bring the same owner-operated crew we run everywhere else.',
    landmarks: ['Navarre Beach', 'Navarre Beach Fishing Pier', 'Navarre Beach Bridge', 'US-98', 'Holley by the Sea', 'Hurlburt Field'],
    metaTitle: 'Movers in Navarre, FL | Beach House Moving',
    metaDescription:
      'Owner-operated, licensed movers for Navarre and Navarre Beach: home, condo and Hurlburt PCS moves. Free quote — (850) 842-1962.',
    localBody: `Navarre is two different moves depending on which side of the sound you are on. North of US-98, neighborhoods like Holley by the Sea are family streets with real driveways, where the work is straightforward and the planning is about timing. Across the Navarre Beach Bridge on Santa Rosa Island, it is beach work: elevated homes with exterior stairs, condos with elevator and loading rules, and summer traffic on the bridge that sets the clock. A lot of Navarre moves are tied to Hurlburt Field just east on US-98, so PCS report dates and short-notice orders are normal and we plan around them. Navarre sits west of our usual Okaloosa runs, so we quote the drive time honestly up front rather than surprising you at the end. Same-day help is sometimes possible when a crew is free, so it is always worth a call. We will work in the rain when it is safe for your things, and we check with you first when it is not.`,
    localFaqs: [
      {
        question: 'Do you move to and from Navarre Beach?',
        answer: 'Yes. Navarre Beach homes and condos are regular work: exterior stairs, elevator reservations and bridge traffic are all part of the plan before move day.',
      },
      {
        question: 'Can you handle a Hurlburt Field PCS move to Navarre?',
        answer: 'Yes. Navarre is one of the most common off-base choices near Hurlburt, and we build the move around your report date, including PPM paperwork with itemized invoices.',
      },
      {
        question: 'Do you offer same-day moves in Navarre?',
        answer: 'When a crew is available, yes. We offer same-day service across all of our services, but it depends on the schedule, so call (850) 842-1962 as early as you can.',
      },
      {
        question: 'Is Navarre outside your service area?',
        answer: 'No. Navarre is in our radius. It is west of our Okaloosa runs, so we include the drive time in your quote up front.',
      },
    ],
    nearbySlugs: ['fort-walton-beach', 'destin'],
  },
```
On the `fort-walton-beach` record, add `nearbySlugs: ['navarre'],` and set `updatedAt` to the ship date.

- [ ] **Step 5: Type-check**

Run: `npm run type-check`
Expected: exit 0, no output.

- [ ] **Step 6: Commit**

```bash
git add src/lib/content.ts "src/app/service-areas/[county]/[neighborhood]/page.tsx"
git commit -m "feat(areas): Navarre page + Navarre-scoped Santa Rosa County hub; cross-county nearby links"
```

### Task 2: Sitewide surfacing: schema, homepage, footer, hub copy, FAQs, llms.txt

**Files:**
- Modify: `src/lib/structured-data.ts:24-33` (`SCHEMA_CITIES`) and `:35-39` (`SCHEMA_SERVICE_AREA_HUB`)
- Modify: `src/components/sections/ServiceAreaSection.tsx:9` (`KEY_NEIGHBORHOOD_SLUGS`) and the paragraph listing towns
- Modify: `src/components/layout/Footer.tsx:31` (deep-link slug list)
- Modify: `src/lib/content.ts`: `SERVICE_AREAS_HUB.bodyIntro` ("Three counties…") and the two "What areas/counties does Beach House Moving serve?" FAQ answers (around lines 435 and 1290)
- Modify: `public/llms.txt`: Business Summary service-area line (line 12), the `## Service Areas` section, the Contact service-area line (96) and `## Service Area Pages`
- Modify: `ARCHITECTURE.md`: add the two new routes under service areas

**Interfaces:**
- Consumes: slugs `navarre`, `santa-rosa-county` from Task 1.

- [ ] **Step 1: Schema.** Append `'Navarre', 'Navarre Beach'` to `SCHEMA_CITIES`, and
`{ county: 'Santa Rosa County', slug: 'santa-rosa-county' }` to `SCHEMA_SERVICE_AREA_HUB`. Do NOT add
"Santa Rosa County" to `SCHEMA_COUNTIES`, because BHM serves Navarre, not the whole county.
- [ ] **Step 2: Homepage.** Set `KEY_NEIGHBORHOOD_SLUGS` to
`['santa-rosa-beach', 'miramar-beach', 'sandestin', 'freeport', 'destin', 'fort-walton-beach', 'navarre']`. In the paragraph,
change "…Fort Walton Beach, Niceville, Crestview, Panama City and Panama City Beach." to
"…Fort Walton Beach, Niceville, Crestview, Navarre, Panama City and Panama City Beach."
- [ ] **Step 3: Footer.** Add `'navarre'` to the slug array, after `'fort-walton-beach'`.
- [ ] **Step 4: Hub and FAQ copy.** In `SERVICE_AREAS_HUB.bodyIntro`, replace "Three counties, one crew." with "Three counties plus Navarre, one crew." and add "and west along US-98 to Navarre and Navarre Beach" after the Okaloosa clause. In both "serve" FAQ answers, insert before "We also handle long-distance": "West of Okaloosa we serve Navarre and Navarre Beach in Santa Rosa County."
- [ ] **Step 5: llms.txt.** Business Summary: "Service area: Walton, Okaloosa, and Bay Counties, Florida, plus Navarre and Navarre Beach (Santa Rosa County), and long-distance moves beyond the Panhandle." Add a `**Santa Rosa County, FL (Navarre only)**` line under `## Service Areas`, plus `- Navarre: https://beachhousemoving.xyz/service-areas/santa-rosa-county/navarre` under `## Service Area Pages`, and update the Contact service-area line the same way.
- [ ] **Step 6: Lint and type-check.** Run `npm run lint && npm run type-check`. Expected: exit 0.
- [ ] **Step 7: Commit**
```bash
git add src/lib/structured-data.ts src/components/sections/ServiceAreaSection.tsx src/components/layout/Footer.tsx src/lib/content.ts public/llms.txt ARCHITECTURE.md
git commit -m "feat(areas): surface Navarre in schema, homepage, footer, hub copy, FAQs and llms.txt"
```

### Task 3: Links from indexed content (the indexing lever)

**Files:**
- Modify: `src/content/posts.ts`: `pcs-move-eglin-afb-hurlburt-field-guide` (indexed; 204 impressions), the paragraph containing "Navarre in Santa Rosa County is technically off-post"

- [ ] **Step 1:** Change the first "Navarre" in that sentence to `[Navarre](/service-areas/santa-rosa-county/navarre)`, and set the post's `dateModified` to the ship date.
- [ ] **Step 2:** Run `grep -c "service-areas/santa-rosa-county/navarre" src/content/posts.ts`. Expected: `1`.
- [ ] **Step 3: Commit**
```bash
git add src/content/posts.ts
git commit -m "seo: link Navarre page from the indexed PCS field guide"
```
(Fort Walton Beach, which is indexed, links Navarre through `nearbySlugs` from Task 1. The homepage and footer link it from Task 2.)

### Task 4: Verify, PR, gate

- [ ] **Step 1: Build.** Run `npm run build`. Expected: `[check-meta] PASS — 65 pages`, with no title or description over its limit and no duplicates. 65 is 63 plus the 2 new pages; if the count differs, find out why.
- [ ] **Step 2: Local smoke.** Run `npx next start -p 3917`, then:
  - `curl -s -o /dev/null -w "%{http_code}" localhost:3917/service-areas/santa-rosa-county/navarre`, expecting `200`. Run the same for `/service-areas/santa-rosa-county`.
  - `curl -s localhost:3917/service-areas/santa-rosa-county/navarre | grep -o 'href="/service-areas/okaloosa-county/fort-walton-beach"' | head -1`, expecting a match (Review Focus 1).
  - `curl -s localhost:3917/service-areas/okaloosa-county/fort-walton-beach | grep -c 'santa-rosa-county/navarre'`, expecting ≥ 1.
  - `curl -s localhost:3917/ | grep -c 'santa-rosa-county/navarre'`, expecting ≥ 2 (popular chip and footer).
  - `curl -s localhost:3917/sitemap.xml | grep -c navarre`, expecting `2` (the county hub, which contains "santa-rosa-county", and Navarre; check that both URLs are listed).
  - `curl -s localhost:3917/ | grep -o '"name":"Santa Rosa County"' | head -1`, expecting **no** match in areaServed as an AdministrativeArea (Review Focus 5). `"Navarre"` must appear.
  Then stop the server.
- [ ] **Step 3: Copy review (Review Focus 3).** Read the county hub and the Navarre page aloud. No sentence may imply Gulf Breeze, Pace, Milton or "all of Santa Rosa County". Every BHM claim must trace to README facts.
- [ ] **Step 4: PR.** Push the branch `seo/navarre-page` and open a PR. The body lists the sourced Navarre facts with URLs and dates, and the checks above.
- [ ] **Step 5: Gate on the preview** (the preview is protected, so use the OIDC header):
```bash
cd ~/Projects/beach-house-moving && vc env run -- sh -c 'GATE_HEADERS="{\"x-vercel-trusted-oidc-idp-token\":\"$VERCEL_OIDC_TOKEN\"}" node ~/Projects/docs/tools/site-gate/site-gate.mjs "$1" --pages 10' sh <preview-url>
```
Expected: `PASS`, 0 new errors vs the baseline. Then take a 390px-wide screenshot of `/` and `/service-areas`, using Playwright signed out with the same header, to check the 4-card grid (Review Focus 2).
- [ ] **Step 6: Hand to Travis to merge.** After the merge, confirm on production that both URLs return 200, then add both to `~/Projects/docs/GSC-INDEXING-QUEUE.md` at the top of the next day's block. The production build's IndexNow ping fires automatically.

## Follow-ups (not in this PR)
- **GBP:** a Navarre post linking the page goes in the next posting kit, once a Navarre job photo exists.
- **Photos:** request a Navarre or Navarre Beach job photo in the next batch (add it to the `service-images.ts` TODO).
- **Les:** confirm whether Gulf Breeze, Pace or Milton are in the radius before naming them anywhere.
