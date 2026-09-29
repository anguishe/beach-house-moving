# Resources drafts — batch 2026-09-28

> **DATED TODO (added 2026-09-28).** Both posts are now in `POSTS` (`src/content/posts.ts`) and
> date-gated: `getPublishedPosts()` hides anything with a future `datePublished` (America/Chicago)
> from `/resources`, `/resources/[slug]` (404 until the date), the sitemap, and the JSON-LD lists,
> and those routes revalidate hourly, so each post appears on its date with no deploy.
> `public/llms.txt` is a static file and can't be date-gated, so on each date do these by hand:
>
> - [ ] **Tue 2026-10-06** — add under `## Guides` in `public/llms.txt`:
>   `- [A Destin-to-Destin Move: Regatta Bay to Grand Harbor](https://beachhousemoving.xyz/resources/field-notes-regatta-bay-to-grand-harbor-destin-move)`;
>   set the `/resources` entry in `src/app/sitemap.ts` to `lastModified: '2026-10-06'`; push; request indexing in GSC.
> - [ ] **Tue 2026-10-13** — add under `## Guides` in `public/llms.txt`:
>   `- [Moving a Riding Mower: A Garage Load in Hammock Bay, Freeport](https://beachhousemoving.xyz/resources/field-notes-riding-mower-garage-move-hammock-bay-freeport)`;
>   set the `/resources` entry in `src/app/sitemap.ts` to `lastModified: '2026-10-13'`; add the Freeport
>   `confirmedWork` sentence (hand edit 5 below) and bump its `updatedAt`; push; request indexing in GSC.
>
> - [ ] **Tue 2026-10-20** — add under `## Guides` in `public/llms.txt`:
>   `- [Pre-Load Day: A Design Install in Santa Rosa Beach](https://beachhousemoving.xyz/resources/field-notes-pre-load-design-install-santa-rosa-beach)`;
>   set `/resources` `lastModified: '2026-10-20'` in `src/app/sitemap.ts`; append to Santa Rosa Beach
>   `confirmedWork` (`src/lib/content.ts`): "A design install that started the day before, with the
>   pieces pre-loaded onto our trucks at storage and unloaded at a two-story home the next morning."
>   and bump its `updatedAt`; push; request indexing in GSC.
> - [ ] **Tue 2026-10-27** — add under `## Guides` in `public/llms.txt`:
>   `- [A Washer and Dryer Install in Santa Rosa Beach](https://beachhousemoving.xyz/resources/field-notes-washer-dryer-install-santa-rosa-beach)`;
>   set `/resources` `lastModified: '2026-10-27'`; append to Santa Rosa Beach `confirmedWork`:
>   "A front-load washer and dryer set into a laundry room under the counter." and bump `updatedAt`;
>   push; request indexing in GSC.
>
> Wired 2026-09-29 (Travis approved both drafts): objects pasted into `POSTS`, 6 web photos copied to
> `public/images/` after the full-size eyeball pass + `audit:photo-pii` (40 images, nothing found).
> Owner-note questions (back-to-back days, whose storage, the top-load units on the driveway) stay in
> the non-rendering `isOwnerNote` blocks; the copy claims none of them.
>
> Done already (2026-09-28): photos copied to `public/images/`, both objects pasted into `POSTS`,
> the Destin `confirmedWork` sentence + `updatedAt`. The mower hero is the owner's original
> (`…-riding-mower-lift-gate-load.jpg`, inline `…-lift-gate-raised.jpg`), not the golf-cart fallback.

Prepared 2026-09-28. **Nothing here is live.** `posts.ts` has no date gate: whatever is in
`POSTS` at deploy time is published. So each draft stays in this folder until its publish
date. On that date, paste the object into `POSTS` in `src/content/posts.ts`, make the hand
edits listed for it, and merge to `main`. Vercel deploys on merge.

| # | Draft file | Proposed publish | Status |
|---|---|---|---|
| 1 | `field-notes-regatta-bay-to-grand-harbor-destin-move.ts.txt` | **Tue 2026-10-06** | Photos built and PII-reviewed by eye. Blocked on the INTAKE.md confirmations, the Grand Harbor question below, and `audit:photo-pii` (tesseract) |
| 2 | `field-notes-riding-mower-garage-move-hammock-bay-freeport.ts.txt` | **Tue 2026-10-13** | Blocked on **original mower photos from the owner** (hero). If none arrive, use the fallback below |
| 3 | `field-notes-pre-load-design-install-santa-rosa-beach.ts.txt` | **Tue 2026-10-20** | In `POSTS`, date-gated (9/29) |
| 4 | `field-notes-washer-dryer-install-santa-rosa-beach.ts.txt` | **Tue 2026-10-27** | In `POSTS`, date-gated (9/29) |

The cadence is weekly on Tuesdays, which keeps posts off the GBP Mon/Thu slots. If approval
slips, move both dates by the same number of weeks and set `datePublished` to the merge
day. Post 2 links to post 1, so post 1 has to go live first.

Both files are TS objects with the live indentation (4 spaces for top-level keys, 8 for block
keys). They type-check against the `Post` type: I copied the type plus both objects into a
scratch file and `tsc --strict` passed. `posts.ts` was not touched.

Rules applied to both drafts: no prices or figures, no "LLC", no customer names, no streets,
and no crew names (none are cleared for these jobs). They carry the standard credentials line.
The byline is untouched (`author: 'Beach House Moving'`, and the page hardcodes the rendered
byline). Body links are internal only. Each draft ends with an `isOwnerNote` block, which
the page filters out, listing what the owner has to confirm. **Delete the owner-note block
once it's resolved, or leave it in. It doesn't render either way.**

---

## Overlap check (against the 14 live posts)

| Draft | Nearest live posts | Why it isn't cannibalizing |
|---|---|---|
| 1 Destin-to-Destin | #6 checklist (30A/Destin logistics, COI), #8 beach condo, #12 Pelican Beach appliance | #6 is a pre-move checklist and #8 covers condo towers. Neither targets a *local move within Destin* or a gated-to-gated move. #12 is a single-item delivery. Post 1 links to #6 and #8 instead of repeating them |
| 2 Riding mower / garage | none | No live post covers mowers, outdoor power equipment, garages, or Freeport. BATCH-INTAKE §5 lists Freeport as "no post naming them" |

**Not drafted: the beach move over a dune walkover (June FB featured post).** The existing
posts don't cover it. The Inlet Beach `confirmedWork` already says "carried oversized pieces
down the beach access boardwalk to the sand". But we don't have the place, what was moved
(the round table could be an event setup rather than a move), or any owner photos, and I
won't write it from a Facebook screenshot. Questions for the owner are at the bottom.

---

## Post 1 — Destin-to-Destin: Regatta Bay to Grand Harbor

- **Slug:** `field-notes-regatta-bay-to-grand-harbor-destin-move`
- **Target query:** local movers Destin FL / moving within Destin. **Secondary:** gated community movers Destin, Regatta Bay movers, moving to Grand Harbor Destin
- **Services linked:** local-moving (body + related), residential-moving (related), Destin area page (body + related), /contact
- **Posts linked:** moving-checklist-30a-destin-florida, how-to-move-a-beach-condo-emerald-coast, field-notes-design-trade-install-week-emerald-coast
- **Length:** ~915 body words, 6 FAQs (field-notes range is 506–1696)
- **Photos (all from `docs/blog/incoming-2026-09-28/optimized/web/`, corrected names):**
  - hero: `beach-house-moving-destin-regatta-bay-box-truck-paver-driveway.jpg`. The truck sits mid-frame, so it survives the 21:9 crop
  - inline: `…-front-door-hand-truck-entry.jpg`, `…-armchair-doorway-carry.jpg`, `…-box-truck-loaded-interior.jpg` (the redacted master)
  - `regatta-bay-02-…` is the Messenger screenshot. **Never publish it.**

### ⚠ Grand Harbor: which one?
Public listings show **two** places called Grand Harbor near Destin:
- **Grand Harbor, Destin**: a gated harborfront condo tower on Harbor Blvd (a small number of units, garage parking, no short-term rentals). Sources: [browsedestin.com](https://www.browsedestin.com/grand-harbor-condos-for-sale.php), [emeraldcoastcondomap.com](https://emeraldcoastcondomap.com/condos/destin/grand-harbor-destin), [destinrealestatesales.com](https://www.destinrealestatesales.com/grand-harbor.php)
- **Grand Harbor townhomes in Sandestin** (Miramar Beach, Walton County, often given a "Destin" mailing address). Source: [neighborhoodfinder.app](https://neighborhoodfinder.app/sandestin/grand-harbor)

The draft only says "Grand Harbor" and "gated". It makes no claim about building type,
elevator, or county, so it holds either way. The owner wrote "Grand harbor, Destin fl". If
it's the **Sandestin** one, change the Destin-to-Destin framing (title, description, the
opening block) to Destin to Sandestin, add a Sandestin area link, and put the confirmedWork
line in `sandestin` instead of `destin`. If it's the **Destin tower**, one sentence about the
arrival side (garage or elevator) would help. I'd only write it once the owner says how the
unload actually went.

### Community rules: phrased generally, on purpose
I found no public, citable move-day rules for Regatta Bay, Grand Harbor, or Hammock Bay. The
HOA documents are gated behind owner portals. A buyer's guide notes that Regatta Bay
restrictions "may vary by phase, lot, or parcel" ([mariebabin.com](https://mariebabin.com/blog/buying-a-home-in-regatta-bay-destin);
HOA docs via [pmainfo.com/regatta-bay](https://www.pmainfo.com/regatta-bay)). So the copy
says "generally want to know who is coming" and "we ask". It doesn't state any community's
rule. The "gated" description of Regatta Bay matches what the live Destin page already says.

### Hand edits at publish (Tue 2026-10-06)
1. Copy the four web variants into `public/images/`, but only after `npm run audit:photo-pii` passes on them (INTAKE.md). Run `npm run audit:images`.
2. Paste the object into `POSTS`.
3. `public/llms.txt` under `## Guides`:
   ```
   - [A Destin-to-Destin Move: Regatta Bay to Grand Harbor](https://beachhousemoving.xyz/resources/field-notes-regatta-bay-to-grand-harbor-destin-move)
   ```
4. `src/app/sitemap.ts`, `/resources` entry: `lastModified: '2026-10-06'`.
5. `confirmedWork` on **destin** (`src/lib/content.ts`, it's a single string, so append a sentence) and bump `updatedAt: '2026-10-06'`:
   ```
    We also moved a household across Destin from Regatta Bay to Grand Harbor, gated community to gated community, with the box truck staged on the paver driveway rather than the lane.
   ```
   (If Grand Harbor turns out to be the Sandestin one, put this in `sandestin` instead and reword it.)
6. Optional: link to the new post from #6 (checklist, "Parking and Access" section). That's a copy change to a live post, so set its `dateModified`.
7. `npm run audit:images && npm run type-check && npm run lint`, merge, then request indexing in GSC.

### GBP companion
**Don't add a new post. Repoint an existing one.** GBP Post 11 (Mon 2026-10-13, `docs/GBP-POSTS-2026-09.md`)
is already the Regatta Bay → Grand Harbor post. Change its button to the article:
```
**Button:** Learn more → `https://beachhousemoving.xyz/resources/field-notes-regatta-bay-to-grand-harbor-destin-move`
```
Posts 12–14 keep their current buttons. The article is live a week before Post 11 goes out.

### Facebook companion (draft. Travis posts it and approves the voice. ASSET-TEMPLATES §7 is still pending approval)
```text
Regatta Bay to Grand Harbor. A short drive across Destin, and still a full move.

Two gated communities, two sets of HOA rules, and every piece still wrapped, carried, loaded, and strapped. The truck went on the paver driveway, not the street, and the front entry got set up before anything was lifted.

We wrote up how we plan a move inside Destin: https://beachhousemoving.xyz/resources/field-notes-regatta-bay-to-grand-harbor-destin-move

Photo: fb-beach-house-moving-destin-regatta-bay-box-truck-paver-driveway.jpg (1080x1350)
```

---

## Post 2 — Riding mower / garage load, Hammock Bay, Freeport

- **Slug:** `field-notes-riding-mower-garage-move-hammock-bay-freeport`
- **Target query:** movers that move riding lawn mowers / how to move a riding mower. **Secondary:** moving a zero-turn mower, movers Freeport FL, Hammock Bay movers, moving a garage
- **Demand check (light):** the national "move a riding mower" query is contested by Two Men and a Truck, MoveBuddha, HireAHelper, and Movers.com guides, which shows it's an established query. None of them is local, and no Walton County mover ranks with a real job. I had no volume tool in this session, so demand is inferred from the SERP shape.
- **Services linked:** Freeport area page (body + related), junk-removal, loading-unloading-help, residential-moving + delivery (related), /contact
- **Posts linked:** moving-checklist-30a-destin-florida, the new Post 1 (so Post 1 must be live first)
- **Length:** ~880 body words, 6 FAQs
- **Source:** Beach House Moving's own Facebook post (~2026-09-27, "at Hammock Bay, Freeport"), which shows the crew loading a red riding mower onto the box truck lift gate at a garage. **The FB images are not used.** The Dailey Group comment isn't quoted or named.
- **Safety content** is general practice, consistent with public guides ([twomenandatruck.com](https://twomenandatruck.com/how-to/transport-a-riding-lawnmower), [movebuddha.com](https://www.movebuddha.com/blog/moving-a-lawn-mower/): run the fuel low or empty, clean it, center of gravity is at the rear, strap it, set the brake). The draft says to use the lift gate and not ride it up a ramp. That's what the job photo shows, and the owner should confirm it's standard.

### Photos: TO REQUEST FROM OWNER
- **Hero (needed):** the original mower-on-lift-gate photos from this job. Save the web variant as
  `public/images/beach-house-moving-freeport-hammock-bay-riding-mower-lift-gate-load.jpg`,
  plus `-square` and `fb-` crops per ASSET-TEMPLATES §2. Full PII gate first: the frame shows a
  home and garage, so check for a house number, plate, or mailbox.
- **Inline (already live):** `beach-house-moving-golf-cart-transport.jpg`, the existing gallery/Seacrest photo of a golf cart on a lift gate. It's used honestly as "we load golf carts the same way".
- **Fallback if no mower originals arrive:** make the golf cart photo the hero (`heroImage` + `heroAlt` = the inline alt), and remove the inline image from that block. The body copy can stay as written. Don't publish with the hero path pointing at a file that doesn't exist, because the build won't catch it.

### Hand edits at publish (Tue 2026-10-13)
1. Mower photo variants built from the owner's originals, `audit:photo-pii` clean, web variant in `public/images/`, `audit:images` run.
2. Paste the object into `POSTS`.
3. `public/llms.txt` under `## Guides`:
   ```
   - [Moving a Riding Mower: A Garage Load in Hammock Bay, Freeport](https://beachhousemoving.xyz/resources/field-notes-riding-mower-garage-move-hammock-bay-freeport)
   ```
4. `src/app/sitemap.ts`, `/resources` entry: `lastModified: '2026-10-13'`.
5. `confirmedWork` on **freeport** (the field doesn't exist on that record yet, so add it) and bump `updatedAt: '2026-10-13'`:
   ```ts
    confirmedWork: `In Hammock Bay we loaded a garage, including a riding mower rolled onto the box truck lift gate, braked, and strapped for the ride.`,
   ```
   This is backed by the company's own job photo. If the owner says it was a full household move, say so here as well.
6. `npm run audit:images && npm run type-check && npm run lint`, merge, then request indexing in GSC.

### GBP companion (new. Add to `docs/GBP-POSTS-2026-10.md` or append after Post 14)
```markdown
### Post 15 — Mon 2026-10-27
**Status:** NEW — pending approval
**Photo:** `beach-house-moving-freeport-hammock-bay-riding-mower-lift-gate-load-square.jpg`
**Button:** Learn more → `https://beachhousemoving.xyz/resources/field-notes-riding-mower-garage-move-hammock-bay-freeport`

> Riding mower on the lift gate. Hammock Bay, Freeport.
>
> A riding mower is heavy, hard, and top-heavy, and most of its weight sits over the back wheels. So it doesn't get driven up a ramp. It rolls onto the lift gate at ground level, goes up level, and gets braked, blocked, and strapped to the truck wall like any heavy piece.
>
> Moving a garage? Run the mower's fuel low, clean off the deck, and tell us about it when you book.
>
> Moves across Freeport and Walton County. Tap Call on our profile.
```
The first line is under 80 characters. There's no phone number and the URL is clean. This needs the
mower square to exist. Without it, hold the post; don't swap in the golf cart square, since the
copy is about a mower. Mon 10/27 is the next Mon/Thu slot after Post 14 (Thu 10/23).

### Facebook companion (draft. Travis posts it and approves the voice)
```text
Moving a riding mower? Don't drive it up a ramp.

In Hammock Bay the mower rolled onto the lift gate at the garage, went up level, and got braked and strapped like any heavy piece of furniture. We also wrote up what to sort in the rest of the garage before move day, and how we handle fuel, propane, and garage chemicals.

https://beachhousemoving.xyz/resources/field-notes-riding-mower-garage-move-hammock-bay-freeport

Photo: fb-beach-house-moving-freeport-hammock-bay-riding-mower-lift-gate-load.jpg (1080x1350), built from the owner's original, NOT the photo already on the Page
```
(The FB Page already has these mower photos from 9/27. A text-forward companion that links
the article is fine too. Travis's call.)

---

## Questions for Travis / the owner

1. **Grand Harbor:** the Destin harborfront tower on Harbor Blvd, or Grand Harbor in Sandestin? And the spelling is "Harbor"? (This decides the Post 1 framing and which `confirmedWork` gets the sentence.)
2. The INTAKE.md confirmations still stand: the filename mapping, that all photos are from the Regatta Bay (origin) house, and that the crew member in the loaded-truck photo is crew and OK to show.
3. **Mower originals:** can the owner send the full-size mower-loading photos from Hammock Bay? Was the mower part of a full move or a single pickup, and where did it go?
4. Crew policy on fuel, propane, and garage chemicals: does the "should not ride on a moving truck" list match what they actually do?
5. **Beach move (June FB featured post):** where was it, what was moved (a household move or an event setup), and are there original photos? If it's the Inlet Beach boardwalk job already in `confirmedWork`, that's a third post: "moving furniture over a dune walkover / beach access, no elevator".
6. OK to repoint GBP Post 11's button to the new article?
