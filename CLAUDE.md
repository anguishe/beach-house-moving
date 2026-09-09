# CLAUDE.md

@AGENTS.md

> Claude Code and other AI agents should follow `AGENTS.md` for all project rules. Key locked facts: canonical domain `https://beachhousemoving.xyz` (`.com` not owned), SAB (no street address in public UI), quote-first CTA, owner-only Resend email in v1.1 (customer confirmation = v2), testimonials gated by `FLAGS.SHOW_TESTIMONIALS`.

## Conventions

- When a change alters rendered copy or links on neighborhood/county/service pages, set that record's `updatedAt` (or bump `CONTENT_REVISION` in `content.ts` for template-wide changes) in the same PR. Sitemap `lastmod` must never claim freshness that didn't happen.
- Stat sweeps include all *.md — living docs get corrected values; dated snapshots get a superseded header, never silent rewrites.

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
5. **Run `npm run audit:images` before wiring anything.** It lists empty slots,
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
   UTM string** (`src/proxy.ts` 301s the UTM-tagged homepage).
