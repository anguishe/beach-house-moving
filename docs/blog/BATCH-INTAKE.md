# Blog batch intake: Beach House Moving

Prepared 2026-09-28. Use this for each batch of posts Travis hands over. Topics come from
Travis and the owner. This file does not propose posts to write. Section 5 lists coverage
gaps only so a new batch can be checked for overlap.

Drafting format: `docs/blog/POST-TEMPLATE.mdx`. Per-asset copy-paste blocks: `docs/blog/ASSET-TEMPLATES.md`. Posts are **not** MDX on this site. They are
TypeScript objects in `src/content/posts.ts`, and the template is a drafting form that gets
transcribed into that file.

---

## 1. What Travis's batch needs, per post

| # | Item | Required | Notes |
|---|---|---|---|
| 1 | **Topic / working title** | yes | In Travis's or the owner's words |
| 2 | **Target query** | yes | The one search it should answer, e.g. "freestanding tub delivery 30A" |
| 3 | **City / community** | yes | Exact spelling confirmed by the owner. Never guess a place name (it ends up in URLs, alt text, and schema) |
| 4 | **Service it supports** | yes | One of the 11 `/services/<slug>` pages (list in section 5) |
| 5 | **Source job or owner description** | yes | A one-line description of the real job. Field notes need a real job. No invented incidents |
| 6 | **Publish date** | yes | See section 2. A future date is **not** held back automatically |
| 7 | **Photos** | strongly preferred | Originals, not screenshots. The hero crops to 21:9 / 3:1 on the post and 16:9 on the card, and inline photos crop to 16:9. Portrait works (live heroes are 1200×1600) if the subject is centered |
| 8 | **What each photo shows** | yes, if photos | Checked against the pixels. Owner filenames have been wrong before |
| 9 | **People in frame cleared?** | yes, if photos | Crew only, unless the owner cleared the person. Name no one who isn't cleared |
| 10 | **Customer / business names** | if any | Written permission from the owner (e.g. "30A Wine Storage" was named with permission) |
| 11 | **FAQ questions** | optional | 2 to 8 real questions customers ask. They become FAQPage schema |
| 12 | **Related posts / services to link** | optional | Claude fills this in from the inventory if it's blank |
| 13 | **Owner-only facts still open** | if any | These go in an `isOwnerNote` block, which isn't rendered |

### Hard rules for every post

- **No prices, rates, or dollar figures.** The rate appears only in `PRICING` / `RATE_LINE`
  (`src/lib/content.ts`) and in the existing cost post. Travis said on 9/25 not to spread it
  further. Also no invented stats, move counts, or years in business (BRAND.md rule 5).
- **Never write "LLC".** The LLC is admin-dissolved as of 9/25/2026. Use "Beach House Moving".
  (`BUSINESS.legalName` at `src/lib/content.ts:22` still says LLC. It isn't rendered anywhere
  today, so keep it out of posts and schema.)
- **Photo PII gate first** (CLAUDE.md "Photo privacy"). Open every photo at full size, sweep it
  for house numbers, plaques, street signs, plates, labels, paperwork, screens, and
  non-crew faces. Run `npm run audit:photo-pii`, check the filename against the pixels, and
  redact at the master before building variants.
- **No street address** (SAB). Use the phone number only in the `(850) 842-1962` format.
- **Voice** (BRAND.md): no exclamation points, paragraphs of 3 sentences or fewer, "you/your",
  name the county or city, no clichés like "treat your belongings like our own".

---

## 2. How a post gets added, and how "scheduling" actually works

**Content location:** `src/content/posts.ts`. The `PostBlock` type is at lines 4-12, the `Post`
type at lines 14-27, and the `POSTS` array starts at line 29. There's no CMS and no MDX (the
header comment is at line 2).

### Post fields (`src/content/posts.ts:14-27`)

| Field | Required | Used by |
|---|---|---|
| `slug` | yes | URL `/resources/<slug>`, static params, sitemap, schema `@id` |
| `title` | yes | `<h1>`, `<title>`, og:title, BlogPosting headline, ItemList, footer label |
| `description` | yes | meta description, og:description, **and** the lead paragraph under the `<h1>` |
| `datePublished` | yes | Displayed date, `/resources` sort order, sitemap fallback, BlogPosting |
| `dateModified` | no | Sitemap lastmod (preferred), BlogPosting dateModified |
| `author` | yes | **Not rendered.** The byline is hardcoded (`src/app/resources/[slug]/page.tsx:15`, `src/lib/structured-data.ts:512-516`, "Joshua B McGrew") |
| `heroImage` | yes | Post hero, card image, BlogPosting image, `audit:images` slot |
| `heroAlt` | no | Hero alt text (falls back to title). The card image uses `alt=""` |
| `excerpt` | yes | `/resources` card blurb only |
| `body` | yes | `PostBlock[]` |
| `relatedServices` | no | "Related services:" link row |
| `faq` | yes (can be `[]`) | FAQ section + FAQPage JSON-LD when non-empty (`[slug]/page.tsx:71-78`) |

`PostBlock` fields are all optional: `heading` (h2), `subheading` (h3), `body` or `paragraph`
(the text; `paragraph` is a legacy alias), `image` + `imageAlt` (16:9 below the text), and
`isOwnerNote` (filtered out at `[slug]/page.tsx:58`, never rendered).

Body text supports **only** internal links `[label](/path)` (`src/lib/render-body.tsx:11`).
External links, bold, and lists print literally. FAQ answers don't get link rendering at all.

### Future dates are NOT gated

- `generateStaticParams` builds every entry in `POSTS` (`src/app/resources/[slug]/page.tsx:25-27`).
- `/resources` sorts by `datePublished` with no date filter (`src/app/resources/page.tsx:38`), so a
  future-dated post goes live on deploy **and sorts to the top** with a future date showing.
- The sitemap emits it with a future `lastmod` (`src/app/sitemap.ts:115-121`), and BlogPosting
  gets a future `datePublished` (`src/lib/structured-data.ts:509-510`).
- **So, to schedule a post:** hold it off `main` (a branch or local draft) and merge it on the
  publish date, with `datePublished` = that day. Any push to `main` auto-deploys on Vercel.
  (A date gate such as `POSTS.filter(p => p.datePublished <= today)` would need an ISR
  revalidate or a daily rebuild to actually release posts. That's a code change, so it isn't
  done here.)

### What picks up a new post automatically vs. by hand

| Surface | Automatic? | Where |
|---|---|---|
| Post page `/resources/<slug>` | yes | `src/app/resources/[slug]/page.tsx` |
| `/resources` index card + ItemList schema | yes | `src/app/resources/page.tsx:38-39`, `structured-data.ts:533-551` |
| BlogPosting + BreadcrumbList + FAQPage JSON-LD | yes | `[slug]/page.tsx:59-78`, `structured-data.ts:488-531` |
| Sitemap entry for the post | yes | `src/app/sitemap.ts:115-121` |
| Sitemap `lastmod` of `/resources` itself | **manual** | `src/app/sitemap.ts:71-76` (currently `2026-08-28`, so bump it) |
| `public/llms.txt` "## Guides" list | **manual** | `public/llms.txt:162-176`. Add a line per post |
| Footer guide links | manual, only 3 hand-picked slugs | `src/components/layout/Footer.tsx:40-47` |
| OG / Twitter image | **no per-post image** | `src/lib/seo.ts:44-68`: every post shares `/images/og-hero.jpg` with `og:type=website`. `heroImage` is not used for OG |
| Inbound links from service or area pages | **none exist** | Posts are reached only via `/resources`, the footer, and other posts. Link new posts from related posts |
| `npm run audit:images` | yes | Regex-parses posts.ts (`scripts/audit-images.mjs:70-74`). Keeps 4-space/8-space indentation |
| IndexNow / Bing ping | lags one deploy | `scripts/ping-indexnow.mjs:56-61` fetches the **live** sitemap during postbuild, before the new deploy is serving, so new URLs go out on the *next* production build. Request indexing in GSC by hand for important posts |

---

## 3a. After the batch drops in: run order

The copy-paste blocks for each step are in `docs/blog/ASSET-TEMPLATES.md`.

1. **Stage the originals** in `~/Downloads/bhm-image-batch-<mmmdd>/` along with Travis's
   descriptions. Record the owner descriptions verbatim in a batch record (the `POST-COPY.md`
   pattern).
2. **Confirm place names and people** with the owner. Nothing gets named until then.
3. **PII gate, part 1:** open every original at full size and sweep it. Redact at the master.
4. **PII gate, part 2:** `npm run audit:photo-pii -- ~/Downloads/bhm-image-batch-<mmmdd>`
   (needs `tesseract-ocr`, which isn't installed yet: `sudo apt install -y tesseract-ocr`, run by Travis).
5. **Check the filename against the pixels**, then name each file `beach-house-moving-<place>-<subject>-<action>`.
6. **Build the variants** (web / `-square` / `fb-`) from the redacted master with the
   ASSET-TEMPLATES §2 recipe. Copy only the web variant into `public/images/`.
7. `npm run audit:photo-pii` (now over `public/images`) and `npm run audit:images`. Spend photos on the gaps first.
8. **Draft each post** in `POST-TEMPLATE.mdx` format, then transcribe it into `src/content/posts.ts`.
9. **Add links**: `public/llms.txt` Guides line, the `/resources` lastModified in `sitemap.ts`,
   `confirmedWork` + `updatedAt` for each named community, and a link from 1-2 related existing posts.
10. **GBP kit:** add the posts to `docs/GBP-POSTS-<YYYY-MM>.md`, repoint `gbp:kit` in
    `package.json`, then run `npm run gbp:kit`.
11. **FB companion drafts** (ASSET-TEMPLATES §7). Travis posts them.
12. `npm run type-check && npm run lint && npm run build` (the build is local, so IndexNow skips itself).
13. **Merge to `main` on each post's publish date.** Vercel auto-deploys. There's no date gate.
14. **After deploy:** check the live URL returns 200, request indexing in GSC, and let the next
    prod build carry the IndexNow ping.

## 3b. Per-post pre-merge checklist

- [ ] Topic checked against the inventory (section 4) and the gap list (section 5). No cannibalizing
      an existing post's target query
- [ ] Slug unique, kebab-case, place + subject
- [ ] Photos: full-size eyeball done, `npm run audit:photo-pii` clean, filename matches the pixels,
      web variant in `public/images/`, EXIF stripped
- [ ] Hero subject survives a 21:9 center crop. Alt text describes the photo, place first
- [ ] No prices or dollar figures, no "LLC", no street address, no uncleared names
- [ ] 2+ internal links in the body: one service page, one area page, and one related post where it fits
- [ ] Any community named in the post has a `confirmedWork` sentence appended in `NEIGHBORHOODS`
      (`src/lib/content.ts`) with that record's `updatedAt` bumped (CLAUDE.md photo-batch step 4)
- [ ] `public/llms.txt` Guides line added
- [ ] `/resources` `lastModified` bumped in `src/app/sitemap.ts`
- [ ] `npm run audit:images && npm run type-check && npm run lint` pass
- [ ] Merged to `main` **on** the publish date, not before
- [ ] After deploy: GSC URL inspection → request indexing

---

## 4. Inventory (14 posts live, as of 2026-09-28)

Word counts cover rendered body text (headings + paragraphs, links counted as their labels),
not the FAQ. "Target query" is inferred from the slug, title, and H2s. None is declared in code.

| # | Slug | Title | Published (modified) | Words / FAQ | Inferred target query | In-body internal links |
|---|---|---|---|---|---|---|
| 1 | `what-movers-cost-santa-rosa-beach-30a` | What Movers Cost in Santa Rosa Beach & 30A (2026) | 2026-07-19 (09-25) | 615 / 3 | movers cost Santa Rosa Beach / 30A | /pricing, /contact |
| 2 | `moving-and-storage-santa-rosa-beach` | Moving & Storage in Santa Rosa Beach: How It Works Between Homes | 2026-07-19 | 483 / 3 | moving and storage Santa Rosa Beach | /services/storage, /services/residential-moving, /resources/pcs-move-eglin-afb-hurlburt-field-guide, /resources |
| 3 | `moving-to-30a-neighborhood-guide` | Moving to 30A: A Local Mover's Neighborhood-by-Neighborhood Guide | 2026-06-02 | 463 / 2 | moving to 30A neighborhoods | **none** |
| 4 | `military-pcs-move-eglin-hurlburt` | On-Base or Off-Base at Eglin & Hurlburt: How Your Housing Choice Changes Move Day | 2026-06-02 (06-12) | 405 / 2 | Eglin on-base vs off-base move | **none** |
| 5 | `new-construction-beach-home-move` | Moving Into a New Beach-House Build on the Emerald Coast: How to Protect Floors, Stairs, and Finishes | 2026-06-02 | 451 / 2 | moving into new construction home | **none** |
| 6 | `moving-checklist-30a-destin-florida` | The Honest Moving Checklist for 30A and Destin | 2026-05-15 (09-08) | 1222 / 3 | moving checklist 30A / Destin | /services/mounting-installation |
| 7 | `pcs-move-eglin-afb-hurlburt-field-guide` | PCS to Eglin AFB or Hurlburt Field: A Ground-Level Guide From Your Local Movers | 2026-04-22 (09-08) | 1263 / 4 | PCS move Eglin AFB / Hurlburt | /services/loading-unloading-help |
| 8 | `how-to-move-a-beach-condo-emerald-coast` | How to Move Into (or Out of) a Beach Condo on the Emerald Coast | 2026-03-18 | 1223 / 3 | moving into a beach condo (freight elevator, HOA) | **none** |
| 9 | `field-notes-inlet-beach-pack-day` | Pack Day in Inlet Beach, FL: A Full Kitchen | 2026-07-27 | 775 / 6 | packing services Inlet Beach | inlet-beach area, /services/packing-unpacking, install-day post |
| 10 | `field-notes-30a-install-day-design-dwell` | Install Day on 30A: Furnishing a New Build | 2026-07-28 | 762 / 5 | furniture install / white-glove delivery 30A | 30a + santa-rosa-beach areas, pack-day post, /services/delivery, /services/residential-moving |
| 11 | `field-notes-30a-wine-storage-delivery` | Delivery Day at 30A Wine Storage: Glassware Into a Brand-New Facility | 2026-08-18 | 506 / 5 | commercial delivery 30A | 30a + santa-rosa-beach areas, /services/delivery |
| 12 | `field-notes-appliance-delivery-destin-pelican-beach` | Appliance Delivery in Destin: A Fridge to a Sixth-Floor Pelican Beach Condo | 2026-08-18 | 510 / 5 | appliance delivery Destin condo | destin + santa-rosa-beach areas, /services/delivery, /services/junk-removal |
| 13 | `field-notes-freestanding-tub-delivery-seacrest-beach` | Freestanding Tub Delivery in Seacrest Beach: What Fits, What It Weighs, and Who Sets It in Place | 2026-08-28 | 1696 / 8 | freestanding tub delivery / weight | /services/delivery, /pricing, 30a + seacrest-beach areas, 3 posts |
| 14 | `field-notes-design-trade-install-week-emerald-coast` | Design Trade Installs: Drapes in Santa Rosa Beach, Art in Niceville, a Dining Room in Burnt Pine | 2026-09-08 (09-09) | 1267 / 9 | design trade installation Emerald Coast | /services/design-trade-installation, /services/mounting-installation, 3 posts, /contact |

Observations:
- Posts 3, 4, 5, and 8 have **zero in-body internal links**. That's a quick fix when a batch lands.
- Posts 4 and 7 both target Eglin/Hurlburt PCS moves, so a new PCS post would be a third. Check hard.
- Last post was 2026-09-08. Six are "field notes" (real jobs) and eight are guides.
- The cost post (1) is the only one that carries the published rate. Keep it that way.

---

## 5. Coverage and gaps (SUGGESTIONS ONLY, for overlap checks)

These aren't assignments. They exist so each post in Travis's batch can be tagged "new",
"overlaps #N", or "fills gap".

### By service (11 service pages, from `SERVICES` in `src/lib/content.ts:228-349`)

| Service | Dedicated post? | Covered by |
|---|---|---|
| residential-moving | partial | 5, 10 |
| local-moving | yes | 1, 6 |
| long-distance-moving | **no** | related link only (4, 7) |
| packing-unpacking | yes | 9 |
| storage | yes | 2 |
| delivery | yes (heavy) | 10, 11, 12, 13 |
| junk-removal | **no** | link only (12) |
| military-pcs-moving | yes (x2) | 4, 7 |
| design-trade-installation | yes | 14 |
| mounting-installation | **no** | mentioned in 6, 14 |
| loading-unloading-help | **no** | link only (7) |

### By area (27 neighborhood pages)

- **Covered in a post:** Santa Rosa Beach, 30A (Seaside, WaterColor, Rosemary, Alys, Inlet,
  Grayton), Seacrest Beach, Destin (Pelican Beach), Miramar Beach (Burnt Pine), Niceville,
  Panama City Beach (condo post section), Eglin/Hurlburt area.
- **No post naming them:** Fort Walton Beach, Crestview, Shalimar, Bluewater Bay, Freeport,
  DeFuniak Springs, Sandestin, Dune Allen, Seagrove Beach, Blue Mountain Beach, WaterSound,
  Panama City, Lynn Haven. Bay County outside PCB is thin, and so is inland Walton/Okaloosa.

### Seasonal (none covered as a standalone post)

- Hurricane season (Jun–Nov): moving or storing around storm windows. Timely now.
- Snowbird / off-season arrivals (Oct–Mar). Post 6 says off-season moves are easier but
  doesn't target the query.
- Vacation-rental turnover and furnishing (the rental-owner angle shows up in 10 and 12).
- Holiday-season moves (Nov–Dec).
- PCS peak (May–Aug) is already covered in 7.

### Service × city combinations with no post (examples, not a to-do list)

Long-distance moving *to* the Emerald Coast, junk removal on 30A or in Destin, TV/mirror
mounting in a Destin or Miramar condo, loading/unloading help for a PODS/U-Haul in Crestview
or Fort Walton Beach, and packing in Destin or PCB. Every one of these would need a real job or
an owner description behind it before it becomes a post.
