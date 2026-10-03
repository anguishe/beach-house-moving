# Per-post asset pipeline: Beach House Moving

Prepared 2026-09-28. This covers every asset a `/resources` post ships with: where the
template lives, what generates it, one live example, and the naming rule. Each section ends
with a copy-paste block that mirrors the live example. `<ANGLE-BRACKET>` slots are filled
from Travis's batch. Nothing here is a real post.

Standing rules for every block: no prices, rates, or dollar figures. Never write "LLC". No
street address. No customer detail and no uncleared names. No exclamation points.

## Pipeline map

| Asset | Template / spec | Generator | Live example | Naming |
|---|---|---|---|---|
| Post content | `docs/blog/POST-TEMPLATE.mdx` → `Post` type `src/content/posts.ts:4-27` | none (hand-transcribed into `POSTS`) | `src/content/posts.ts:1257` (`field-notes-design-trade-install-week-emerald-coast`), https://beachhousemoving.xyz/resources/field-notes-design-trade-install-week-emerald-coast | slug: kebab, `field-notes-<subject>-<place>` for jobs, `<topic>-<place>` for guides |
| Web image (hero + inline) | CLAUDE.md "Photo-batch convention" step 1 | **no script in repo.** Variants were made ad hoc. The recipe below matches the live files (checked with `identify`) | `public/images/beach-house-moving-miramar-beach-burnt-pine-dining-room-install.jpg` (1200×1600, sRGB, progressive, q86) | `beach-house-moving-<place>-<subject>-<action>.jpg` |
| GBP square | same | same (ad hoc) | `~/Downloads/bhm-image-batch-sep08/gbp/beach-house-moving-miramar-beach-burnt-pine-dining-room-install-square.jpg` (1200×1200) | `<web name>-square.jpg`, **not committed** |
| Facebook crop | same | same (ad hoc) | `~/Downloads/bhm-image-batch-sep08/fb/fb-beach-house-moving-miramar-beach-burnt-pine-dining-room-install.jpg` (1080×1350) | `fb-<web name>.jpg`, **not committed** |
| Photo PII gate | CLAUDE.md "Photo privacy" | `npm run audit:photo-pii [dir...]` (`scripts/audit-photo-pii.mjs`, defaults to `public/images`) | cache `.photo-pii-cache.json` | n/a. **tesseract is NOT installed on this box** (`which tesseract` is empty), so the script exits 1 until Travis runs `sudo apt install -y tesseract-ocr` |
| Image slot audit | CLAUDE.md step 5 | `npm run audit:images` (informational, never fails) | run output | n/a |
| Alt text | live `heroAlt` / `imageAlt` values | none | posts.ts `heroAlt` on the design-trade post | describes the pixels, place first; filename checked against the photo |
| OG / Twitter image | `src/lib/seo.ts:44-68` | **none per post.** No `generate:og` script in `package.json`. Every post serves the static `/images/og-hero.jpg` with `og:type=website` (verified on the live design-trade post 2026-09-28). `src/app/opengraph-image.tsx` exists at the root but is overridden by the explicit metadata | https://beachhousemoving.xyz/images/og-hero.jpg | n/a. Nothing to generate per post, so no per-post input is needed |
| JSON-LD | `src/lib/structured-data.ts:488-551` | automatic from the `Post` fields (BlogPosting, BreadcrumbList, FAQPage when `faq` isn't empty; ItemList on `/resources`) | view-source on the live post | n/a |
| Sitemap | `src/app/sitemap.ts:115-121` (posts), `:71-76` (`/resources`, manual date) | automatic for the post; **bump `/resources` lastModified by hand** | https://beachhousemoving.xyz/sitemap.xml | n/a |
| IndexNow / Bing ping | `scripts/ping-indexnow.mjs` | `postbuild`, only on Vercel production builds | Vercel build log `[IndexNow] 200 — N URLs` | reads the **live** sitemap, so a new URL goes out on the *next* prod build. Request indexing in GSC by hand |
| llms.txt | `public/llms.txt:162-176` "## Guides" | **manual** | line 176 (the design-trade post) | `- [<title>](https://beachhousemoving.xyz/resources/<slug>)` |
| GBP post | `docs/GBP-POSTS-2026-09.md` | `npm run gbp:kit` → `scripts/gbp-kit.mjs <md> <image-dir>`. **Repoint the path in `package.json`** at the new month's file and batch folder | `~/Downloads/bhm-image-batch-sep08/gbp/posts/post-01.txt` + `README.txt` | `docs/GBP-POSTS-<YYYY-MM>.md`; output `posts/post-NN.{txt,jpg}` |
| Facebook companion | **no copy template or live copy archive in the repo.** Only the 1080×1350 `fb-` crops exist | none | the crops in `~/Downloads/bhm-image-batch-sep08/fb/` | `fb-<web name>.jpg` |
| `confirmedWork` sentence | CLAUDE.md step 4 | manual, in `NEIGHBORHOODS` (`src/lib/content.ts`), plus that record's `updatedAt` | any neighborhood with a "Recent work in …" section | append, never replace |
| Batch record | `POST-COPY.md` (the 9/08 batch record: owner descriptions verbatim + corrections) | manual | `POST-COPY.md` | one record per batch |

---

## 1. Post object (paste into `POSTS` in `src/content/posts.ts`)

Keep this indentation: 4 spaces for top-level keys, 8 for block keys. `scripts/audit-images.mjs:70-74`
parses it with regexes. The last body block is the credentials line every live post ends with.

```ts
  {
    slug: '<slug>',
    title: '<title>',
    description:
      '<description>',
    datePublished: '<YYYY-MM-DD>',
    author: 'Beach House Moving',
    heroImage: '/images/beach-house-moving-<place>-<subject>-<action>.jpg',
    heroAlt:
      '<what the photo shows, place first>',
    relatedServices: [
      { label: '<Service title>', href: '/services/<service-slug>' },
      { label: '<Service title>', href: '/services/<service-slug>' },
    ],
    excerpt:
      '<excerpt>',
    body: [
      {
        body:
          '<opening paragraph that answers the target query>',
      },
      {
        heading: '<h2 phrased the way people search>',
        body:
          '<paragraph with [service](/services/<slug>) and [area](/service-areas/<county>/<town>) links>',
        image: '/images/beach-house-moving-<place>-<subject>-<action>.jpg',
        imageAlt: '<what the photo shows, place first>',
      },
      {
        body: '<owner-only fact still open>',
        isOwnerNote: true,
      },
      {
        body:
          'Licensed and insured. Fla. Mover Reg. No. IM4125. Locally owned and operated in Santa Rosa Beach, serving Walton, Okaloosa, and Bay Counties.',
      },
    ],
    faq: [
      {
        question: '<question>',
        answer: '<plain-text answer, no links>',
      },
    ],
  },
```

Strings holding an apostrophe use double quotes, as the live posts do.

## 2. Image variants (recipe matching the live files)

There's no generator script. This ImageMagick recipe reproduces the live specs (sRGB,
progressive, q86, metadata stripped). **Run it only after the photo PII gate passes on the
master**, and rebuild all three variants from the same (redacted) master. ImageMagick is at
`/usr/bin/magick`.

```bash
# MASTER = the owner's original (after any redaction); NAME = beach-house-moving-<place>-<subject>-<action>
MASTER="<path/to/original.jpg>"; NAME="<beach-house-moving-place-subject-action>"; BATCH=~/Downloads/bhm-image-batch-<mmmdd>
mkdir -p "$BATCH"/{web,gbp,fb}
# Web: longest side 1600, aspect kept (portrait comes out 1200x1600)
magick "$MASTER" -auto-orient -colorspace sRGB -resize '1600x1600>' -strip -interlace JPEG -quality 86 "$BATCH/web/$NAME.jpg"
# GBP square 1200x1200 (center crop; add -gravity north/south if the subject sits off-center)
magick "$MASTER" -auto-orient -colorspace sRGB -resize '1200x1200^' -gravity center -extent 1200x1200 -strip -interlace JPEG -quality 86 "$BATCH/gbp/$NAME-square.jpg"
# Facebook 1080x1350 (4:5)
magick "$MASTER" -auto-orient -colorspace sRGB -resize '1080x1350^' -gravity center -extent 1080x1350 -strip -interlace JPEG -quality 86 "$BATCH/fb/fb-$NAME.jpg"
# Only the web variant is committed:
cp "$BATCH/web/$NAME.jpg" public/images/
# Confirm GPS/EXIF is gone:
exiftool -gps:all -a "$BATCH"/*/*"$NAME"*.jpg
```

## 3. llms.txt line (append under `## Guides` in `public/llms.txt`)

```
- [<title>](https://beachhousemoving.xyz/resources/<slug>)
```

## 4. Sitemap `/resources` bump (`src/app/sitemap.ts:71-76`)

```ts
    {
      url: `${base}/resources`,
      lastModified: '<YYYY-MM-DD publish date>',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
```

## 5. `confirmedWork` sentence (`NEIGHBORHOODS` in `src/lib/content.ts`)

Only for a community named in an owner description or shown in a job photo. Append it and
bump that record's `updatedAt` to the publish date.

```ts
      '<One plain sentence about the confirmed job in <community>, no customer detail.>',
```

## 6. GBP post (add to `docs/GBP-POSTS-<YYYY-MM>.md`, then `npm run gbp:kit`)

This mirrors post 1 of `docs/GBP-POSTS-2026-09.md`. The first line must be 80 characters or
fewer (community + service). The total stays under 1500. No phone number in the body (use "Tap
Call on our profile"). The URL is clean, with no UTM string. The heading must match exactly
`### Post N — Ddd YYYY-MM-DD` (em dash) or `gbp-kit.mjs` won't parse it.

```markdown
### Post <N> — <Ddd YYYY-MM-DD>
**Photo:** `beach-house-moving-<place>-<subject>-<action>-square.jpg`
**Button:** Learn more → `https://beachhousemoving.xyz/resources/<slug>`

> <Service> in <community>, <city>.
>
> <One line: who on the crew did what (cleared names only).>
>
> <Two or three sentences on what the job involved and why it's done that way.>
>
> <Service line> across Walton, Okaloosa, and Bay Counties. Tap Call on our profile.
```

Then repoint the script at the new month's file (the path is hardcoded in `package.json`) and run:

```bash
npm run gbp:kit   # or: node scripts/gbp-kit.mjs docs/GBP-POSTS-<YYYY-MM>.md ~/Downloads/bhm-image-batch-<mmmdd>/gbp
```

## 7. Facebook companion (no live copy precedent. Draft only, and Travis approves the voice)

The repo has the crop spec and crops but no archived FB copy, so this block follows the GBP
structure. Meta rule (workspace CLAUDE.md): Claude doesn't post or scrape on Facebook.
Travis posts it by hand.

```text
<Hook line: community + what happened, 80 characters or fewer>

<Two or three short sentences from the job. Cleared crew names only.>

<One line pointing to the post:> https://beachhousemoving.xyz/resources/<slug>

Photo: fb-beach-house-moving-<place>-<subject>-<action>.jpg (1080x1350)
```

## 8. OG image

There's nothing to generate. No per-post OG exists, and every post shares `/images/og-hero.jpg`.
If per-post OG is wanted later, that's a code change to `buildMetadata` (pass `heroImage` and
set `type: 'article'`). It's out of scope here.
