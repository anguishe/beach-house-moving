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
