# CLAUDE.md

@AGENTS.md

> Claude Code and other AI agents should follow `AGENTS.md` for all project rules. Key locked facts: canonical domain `https://beachhousemoving.xyz` (`.com` not owned), SAB (no street address in public UI), quote-first CTA, owner-only Resend email in v1.1 (customer confirmation = v2), testimonials gated by `FLAGS.SHOW_TESTIMONIALS`.

## Conventions

- When a change alters rendered copy or links on neighborhood/county/service pages, set that record's `updatedAt` (or bump `CONTENT_REVISION` in `content.ts` for template-wide changes) in the same PR. Sitemap `lastmod` must never claim freshness that didn't happen.
- Stat sweeps include all *.md — living docs get corrected values; dated snapshots get a superseded header, never silent rewrites.

## Photo privacy — check before anything else

On 2026-09-08 a job photo went to the live site and to Google Business Profile with a
customer's address plaque — "3508 Burnt Pine Lane" — legible in the frame. GBP removed the
post under its personal-information policy. Nothing in the filename or the alt text could
have caught it: the leak was in the pixels, and nobody had opened the photo at full size.

Before a photo is wired in, committed, or posted anywhere:

1. **Open every photo at full resolution and actually look at it.** Not a thumbnail and not
   a contact sheet — small type is precisely what gets missed at that size. Sweep the
   corners and the background for house numbers and address plaques, street-name signs,
   mailboxes, licence plates, delivery labels, mail and paperwork, screens, and the face of
   anyone who is not crew.
2. **Run `npm run audit:photo-pii`.** It OCRs every image and exits non-zero on anything
   shaped like an address, a plate, or a document. It is a backstop for step 1, not a
   substitute — it misses angled, low-contrast, and partly occluded text.
3. **Verify the filename against what the photo actually shows.** Names come from the owner
   and have been wrong: three files in the Sept 2026 batch had their names rotated among
   each other, so alt text on the live site described the wrong photo for a day. Never
   trust the name you were handed.
4. **Redact at the master, then rebuild every variant from that master** — web,
   `-square`, `fb-`, and the copy in `public/images/`. Regenerating a crop from an
   unredacted original silently re-publishes the leak. Feather the blur so it reads as
   depth of field rather than a censor bar, and confirm the redaction survived in each
   output file.
5. If something already live turns out to be leaking, it outranks everything else in the
   batch: redact, rebuild, push, redeploy, and only then carry on.

The same applies to GBP post copy: no phone number in the body (a known rejection trigger —
the profile and the post button already give people a way to call) and no customer detail.
`npm run gbp:kit` fails on both.

## Photo-batch convention

Owner photo batches arrive as images plus a one-line description per job, in the
owner's own words. Every batch runs the same way:

1. **Three variants per photo.** Web `1200×1600` (or longest side 1600, aspect kept)
   into `public/images/`; GBP `1200×1200` with a `-square` suffix; Facebook
   `1080×1350` with an `fb-` prefix. Strip EXIF (GPS), convert to sRGB, progressive.
   Only the web variant is committed — the square and FB crops stay in the batch
   folder for manual upload.
2. **Filenames** are `beach-house-moving-<place>-<subject>-<action>.jpg`, lowercase
   kebab, place first.
3. **Never guess a place name.** Community names end up in URLs, alt text, and
   schema — confirm the exact spelling with the owner before writing any of them.
   Never name a person the owner has not cleared.
4. **Every community named in an owner description gets a sentence.** Append it to
   that community's `confirmedWork` in `NEIGHBORHOODS` (`src/lib/content.ts`) —
   append, never replace — and bump that record's `updatedAt`. A sub-community
   (Burnt Pine, RidgeWalk, Pelican Beach Resort) goes in its parent city's page as a
   named specific, not a new route. `confirmedWork` only ever states jobs backed by
   an owner description or a job photo; it exists to be citable, and one unbackable
   claim in it costs more than the whole field is worth.
5. **Run `npm run audit:photo-pii` and eyeball every photo full-size before wiring
   anything** — see "Photo privacy" above; that gate comes first, always. Then run
   `npm run audit:images`. It lists empty slots,
   duplicate fills, wrong-shape heroes, dead `IMAGES` keys, and photos sitting on disk
   in no slot. Review every photo in the batch against that report and spend the batch
   on the gaps first — empty slots, then HIGH/MED duplicates — before adding anything
   to the gallery. Neighborhood heroes render 16:9 and need landscape; service and post
   images take portrait fine. Re-run the audit after wiring and confirm the counts moved.
6. Wire the images (`IMAGES`, `GALLERY_PHOTOS` — only the first 12 render — and the
   maps in `service-images.ts`), and update `public/llms.txt`. Anything a batch cannot
   place stays on disk and shows up as UNPLACED in the next audit — do not hand-maintain
   a list of it. Record only the gaps that need a *specific new photo* in the
   `service-images.ts` TODO block, so the next batch request can name them.
7. Produce the GBP posting kit as `docs/GBP-POSTS-<YYYY-MM>.md`: one post per photo
   with the square filename, copy, and a CTA button pointing at a **clean URL with no
   UTM string** (`src/proxy.ts` 301s the UTM-tagged homepage). Then run `npm run gbp:kit`
   (repoint it at the new month's file) to explode that markdown into a paste-ready
   `posts/` folder beside the squares — `post-NN.txt` is the body alone, `post-NN.jpg`
   its photo, `README.txt` the date/button/URL index. It exits non-zero if a post runs
   past GBP's 1500-character cap or opens with a line longer than the ~80 characters
   the feed shows before truncating, so fix the markdown and re-run rather than
   editing the generated files.

## Change control and quality gate (Travis, 2026-10-02 — applies to every session, local or cloud)

- **Cloud, scheduled, or autonomous sessions:** open a PR and stop. Never push or merge to `main`, never rebase/close PRs, and never create routines or reminders that "act on" anything. Follow-up routines must be report-only. Travis approves every merge, usually by reviewing the PR with his local Claude session.
- **Interactive sessions:** push to `main` only when Travis asks in that session.
- **Pre-merge gate (local):** `node ~/Projects/docs/tools/site-gate/site-gate.mjs https://<vercel-preview-or-live-url>`. It must add **no new errors** vs the baseline `~/Projects/docs/tools/site-gate/baseline-2026-10-02/beachhousemoving.xyz.txt` (if no baseline exists yet, the run becomes the baseline). Cloud sessions can't run it: write "site-gate not run" in the PR body.
- **The limits it enforces** (these are what audits kept finding on every site):
  - `<title>` ≤ 65 chars *including* the "| Brand" suffix (aim ≤ 60).
  - Meta description ≤ 160.
  - Titles unique.
  - Sitemap URLs return 200 (no redirects) and are self-canonical.
  - JSON-LD parses, and its `@id` references resolve.
  - Text contrast ≥ 4.5:1 (3:1 only for ≥ 24px or bold ≥ 18.66px). Check every new color/opacity pairing, especially muted grays and brand accents on dark or brand backgrounds.
- **Business-state changes** (parked/reopened, prices, phone, address, photo permissions): update schema, default metadata/OG copy, and this file in the same change.
- **Build-time meta check:** `npm run build` runs `scripts/check-meta.mjs` as the first `postbuild` step (also `npm run check:meta`). It fails the build — and so the Vercel deploy — on any prerendered page with a missing/over-65 title, a missing/over-160 description, or a duplicate title, and on any `POSTS` entry (including future-dated ones that publish via ISR) over those limits. Resource posts whose H1 is long get a shorter `metaTitle` / `metaDescription` in `src/content/posts.ts`; the H1 and dek stay as written.
- **AA-safe color pairs (tokens as of 2026-10-02; ratios measured, 4.5:1 needed for body/small text):**

  | Text token | on white | on `brand-sand` | on `brand-navy` |
  |---|---|---|---|
  | `ink` / `brand-navy` | 14.1 ✅ | 12.4 ✅ | — |
  | `ink-muted` | 7.5 ✅ | 6.6 ✅ | 1.9 ❌ |
  | `ink-light` (#5f6c7e) | 5.3 ✅ | 4.7 ✅ | 2.6 ❌ |
  | `brand-teal` (#20776d) | 5.4 ✅ | 4.7 ✅ | 2.6 ❌ |
  | `brand-teal-dark` (#1a6159) | 7.3 ✅ | 6.4 ✅ | 1.9 ❌ |
  | `brand-teal-light` (#3fa79a) | 2.9 ❌ | 2.6 ❌ | 4.8 ✅ |
  | `brand-coral` (#c54f34) | 4.6 ✅ | 4.1 ❌ (use `-dark`) | 3.0 ❌ |
  | `brand-coral-dark` (#a7432c) | 6.0 ✅ | 5.3 ✅ | 2.3 ❌ |
  | `white` / `on-dark` | — | — | 14.1 ✅ |
  | `on-dark-muted` | — | — | 9.5 ✅ |
  | `brand-gold` | 1.7 ❌ | 1.5 ❌ | 8.4 ✅ |

  Fills with white text: `bg-brand-coral` 4.6 ✅, `bg-brand-coral-dark` 6.0 ✅, `bg-brand-teal` 5.4 ✅, `bg-brand-teal-dark` 7.3 ✅. `on-dark-muted` on coral is 3.1, so large text only. Teal on navy or a dark photo overlay is always `brand-teal-light`; coral small text on sand is always `brand-coral-dark`. Opacity variants (`/80`, `/90`) lower the ratio: re-check them.
