# Batch record — 2026-09-08 (design trade + labor-only)

Source: 7 photos + 4 job descriptions from Les via Messenger, 2026-09-08.
Shipped in this batch:

- **New post** `field-notes-design-trade-install-week-emerald-coast` (`src/content/posts.ts`)
- **New service** `/services/design-trade-installation`
- **New service** `/services/loading-unloading-help`
- **New field** `Neighborhood.confirmedWork` + "Recent work in {name}" section, populated
  for the 10 communities with owner-confirmed jobs behind them
- 7 images wired (`content.ts` IMAGES + GALLERY_PHOTOS + both new service pages)
- `public/llms.txt`, `docs/GBP-POSTS-2026-09.md`

## Owner descriptions, verbatim

1. "Hanging art at Lily pads interiors estate sale in Niceville"
2. "Furniture install in Miramar beach fl, Burnt Pines. Zack Keith and Derek finishing up the final touches"
3. "Zach hanging drapes in Santa Rosa beach fl, for our designers over at Tracery interiors"
4. "Zack and I unloading a U-Haul today @ Ridge Walk in SRB, Fl"

Corrections applied, per owner confirmation 2026-09-08:
- "Burnt Pines" → **Burnt Pine**, the gated golf community inside Sandestin, Miramar Beach
- "Ridge Walk" → **RidgeWalk**, Point Washington side, north of US-98, Santa Rosa Beach
- "Zach" → **Zack** (repo spelling)
- **Third crew member on the Burnt Pine job is not named** anywhere in copy
- Lily Pads → **Lily Pads Interiors**, Niceville — already a named reviewer on `/reviews`

---

## RESOLVED 2026-09-08 — hardware / mounting scope

Owner confirmation (Les, Messenger, 8:03 PM):

> "Yes, the art, mirrors, we provide the hardware if needed. we will take down and
> replace TV mounts. Our installer Keith will need to take a look in person first.
> He has the final say on what we can safely mount or build once he sees the actual space."

Shipped from that:

- **New service** `/services/mounting-installation` — TV mounts (take down + replace),
  art and mirror hanging with hardware supplied, shelving. Standalone bookable, not
  move-only.
- **Keith named as the installer** with final say after an in-person look — used as the
  honest qualifier everywhere a mount is mentioned, not buried.
- Design trade page, field note, and `llms.txt` updated: hanging hardware supplied for
  art and mirrors; TV mounts in scope.
- **Drapery hardware is still not explicitly confirmed** and is not claimed anywhere.
  Copy routes it through the same line Les gave: if hardware needs to go up, Keith
  looks at the wall first and has the final say. That is accurate today and needs no
  rewrite if the answer turns out to be yes.
- Electrical and plumbing stay out of scope everywhere — licensed trades in Florida,
  outside the mover registration.

## Still open

- ~~TODO — will they drive a customer-rented vehicle?~~ **RESOLVED 2026-09-08: yes.**
  Owners confirmed they will unload a customer's full U-Haul, or load it, drive it, and
  unload it — any part of the job on a truck that is not ours. The earlier "we do not
  drive your rental" copy was written on the opposite answer and has been fully reversed:
  service title, meta, includes, page section, three FAQs, a new site-wide FAQ, `llms.txt`,
  and the GBP kit. The `TODO` comment in `src/lib/service-details.ts` is gone.
  Open sub-question for the owners: what they want to say about the rental agreement's
  authorised-driver terms. Current copy says only that it gets settled at booking, which
  is true and safe but vague — a concrete process line would convert better.
- **Drapery hardware** — see RESOLVED above. Worth asking Les directly so the drapery
  copy can be as concrete as the TV-mount copy is.
## Photo requests for the next batch

`npm run audit:images` is the live report — run it before wiring any batch. These are
the gaps it flags that only a new photo can close, in priority order:

1. **Military PCS secondary image** — the only empty slot on the site. A shot from an
   Eglin or Hurlburt base-area job.
2. **TV mount, take-down-and-replace** — `/services/mounting-installation` is borrowing
   the Niceville art shot and the drapery ladder shot. Highest-volume consumer keyword
   of the three new services and it has no photo of its own.
3. **Landscape (16:9) neighborhood heroes for Freeport, Lynn Haven, and Bluewater Bay.**
   Freeport and Lynn Haven currently share one photo; Niceville and Bluewater Bay share
   another. Two location pages showing the same photo is the worst version of this
   problem — it reads as stock.

### Open decision, not a photo problem

20 of 26 neighborhood heroes are portrait photos rendering into a 16:9 box on the
neighborhood template, so they show as centre-cropped strips. Re-shooting 20 communities
is not realistic. Changing the hero aspect ratio on that one template fixes all of them
in a single edit. That is a design call — flagged, not acted on.
- `military-pcs-moving` still has no purpose-shot for its secondary image slot (`MISSING-KEY`
  in `service-images.ts`) — worth asking Les for one on the next base-area job.
