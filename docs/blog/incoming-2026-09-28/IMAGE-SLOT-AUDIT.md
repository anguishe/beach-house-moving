# Image slot audit + placement plan — batch 2026-09-28 (Regatta Bay → Grand Harbor, Destin)

Prepared 2026-09-28. **Read-only. No code was edited.** Sources: `npm run audit:images` (137 tracked
slots) plus a hand-traced pass over slots the script does not track: homepage hero, owner-operator and
quote-form photos, About, Reviews, the three county pages, and OG. That makes **149 slots**. The photos
proposed here are the corrected-name variants in `optimized/web/`. See INTAKE.md for the filename
mix-up and the four confirmations Travis needs to give first.

## Baseline (audit:images, 2026-09-28)

| Metric | Now | After the recommended swaps (1–5) |
|---|---|---|
| Empty slots | **1** (`service:secondary military-pcs-moving`) | **0** |
| Duplicate groups (HIGH / MED / LOW) | 16 (2 / 12 / 2) | 15 (2 / 11 / 2) |
| Wrong-shape neighborhood heroes (portrait in 16:9) | 20 | 19 (Destin fixed) |
| Unplaced files | 3 | 3 (+ unused new variants, see below) |
| Destin-specific photos on the Destin page | 0 (the hero is a generic stairwell mattress carry) | 1 (a Regatta Bay truck; Regatta Bay is already named in the Destin copy) |

Duplicates the script **does not count** (they come from hand-traced slots): `move-niceville.jpg` sits on 4 surfaces
(Niceville, Bluewater Bay, Okaloosa County, the PCS field-guide hero). `move-inlet-beach.jpg` is on 3 (Walton County, the
30A guide hero, and homepage quote photo #1). `fleet-all-trucks.jpg` is on 2 (homepage owner-operator, Reviews).
`crew-team-furniture-move.jpg` is on 4 if you count the About page and gallery #11.

## Recommended swaps (before → after)

Priority follows CLAUDE.md step 5: empty slot first, then duplicates. This batch can't fix the HIGH duplicates.
Those are Niceville/Bluewater Bay and Freeport/Lynn Haven, and putting a Destin photo on those pages would be a
place mismatch.

| # | Slot (file:where) | Before | After | Why it wins |
|---|---|---|---|---|
| 1 | `service:secondary` **military-pcs-moving** (`SERVICE_SECONDARY_IMAGE_MAP`, `src/lib/service-images.ts`) | **EMPTY** (the only empty slot on the site) | `beach-house-moving-destin-regatta-bay-box-truck-loaded-interior.jpg` | Fills the one blank slot. A PCS move is a full household load (bins, boxes, padded case goods, strapped to E-track), and this is the only photo on the site that shows a truck packed that way. Portrait works in service slots. |
| 2 | `neighborhood` **destin** hero (`NEIGHBORHOODS` destin `image`, `src/lib/content.ts` ~L1993) | `beach-house-moving-mattress-stairwell-move.jpg` (1650×2200 portrait, **WRONG SHAPE**, generic, not Destin) | `beach-house-moving-destin-regatta-bay-box-truck-paver-driveway-landscape.jpg` (**1600×900**) | This is the money city's page. The new photo is a real Destin job and landscape, so the 16:9 hero stops cropping to a strip. The page copy already says "gated communities — Kelly Plantation, **Regatta Bay**, Destiny … the HOA has opinions about where a truck parks." The photo shows exactly that. |
| 3 | `service:hero` **local-moving** (`SERVICE_IMAGE_MAP`) | `loaded-liftgate-coastal-home.jpg` (900×1200 legacy, used ×3: local-moving hero + card + checklist-post hero) | `beach-house-moving-destin-regatta-bay-front-door-hand-truck-entry.jpg` | A Destin-to-Destin move is the literal definition of local moving. It takes the old photo from 3 uses to 2 and shows a higher-res, branded crew shirt at a real entry. |
| 4 | `service:secondary` **residential-moving** | `mover-carry-estate.jpg` (900×1200 legacy, shared with the **panama-city** hero, MED duplicate) | `beach-house-moving-destin-regatta-bay-armchair-doorway-carry.jpg` | Clears a MED duplicate. It's a two-person furniture carry through an interior door, the core residential-move image, with both branded shirts visible. The source is soft (see INTAKE), and a secondary slot renders smaller than a hero, so that's the right place for it. |
| 5 | `gallery` **#11** (rendered; `GALLERY_PHOTOS`, `src/lib/content.ts`) | `crew-team-furniture-move.jpg` (also the PCS hero + card and About #2) | `beach-house-moving-destin-regatta-bay-box-truck-paver-driveway.jpg` (1200×1600) | The gallery's first 12 have no Destin job, and #11 is the most over-used generic photo on the site. The gallery is allowed to repeat, so this is a freshness and coverage win rather than a dedupe. |

### Optional (Travis's call)

| # | Slot | Before | After | Trade-off |
|---|---|---|---|---|
| 6 | `post:hero` **moving-checklist-30a-destin-florida** | `loaded-liftgate-coastal-home.jpg` | `beach-house-moving-destin-regatta-bay-box-truck-paver-driveway.jpg` | With #3, this retires the liftgate photo from 3 uses to 1 (local-moving card only), and the post's "Parking and Access" section is about this exact scene. The catch is that it's the same shot as the Destin hero and gallery #11, only a different crop, so a visitor may notice. |
| 7 | `service:card` **local-moving** (`serviceImageMap`, `ServicesSection.tsx`) | `loaded-liftgate-coastal-home.jpg` | `beach-house-moving-destin-regatta-bay-front-door-hand-truck-entry.jpg` | Makes the hero and card match (LOW). Only do it if #6 isn't done, or the liftgate photo becomes unplaced (harmless). |
| 8 | `county` **okaloosa-county** hero | `move-niceville.jpg` (×4 surfaces) | the driveway landscape | Destin *is* Okaloosa County, but this collides with #2. Better done when a second landscape Okaloosa photo exists. |

### Not recommended for this batch
- **HIGH duplicates** (`move-niceville.jpg` Niceville/Bluewater Bay, `truck-loaded.jpg` Freeport/Lynn Haven): need
  place-true photos from those towns. Never a Destin photo.
- **junk-removal card** (`truck-loaded.jpg`): the loaded-interior photo shows a household load, not a haul-away.
  It would mislabel the service.
- **Delivery / design-trade / mounting**: off-topic for this job.
- **New post `heroImage`**: if a Regatta Bay field-notes post gets written, the driveway portrait is the hero
  (it survives the 21:9 center crop, since the truck sits mid-frame) and the other three work as inline images. That needs a
  target query and an angle from Travis (BATCH-INTAKE §1), and none has been given.

### Wiring notes for whoever applies this
- Add `IMAGES` keys (with alt text written from the pixels, place first) and reference them from the maps. The
  neighborhood `image` takes a literal path. Suggested alt text:
  - driveway: "Beach House Moving box truck parked on a paver driveway at a Regatta Bay home in Destin, FL"
  - loaded interior: "Inside a Beach House Moving truck: bins and boxes stacked on a padded wood chest, strapped to the wall rails"
  - front door: "Beach House Moving crew member heading through open double front doors with a hand truck, Regatta Bay, Destin"
  - armchair: "Two Beach House Moving movers angling a tufted armchair through an interior doorway in Destin"
- Bump Destin `updatedAt` and append the `confirmedWork` sentence in the same change (CLAUDE.md step 4).
  Swapping the hero changes rendered output.
- Re-run `npm run audit:images` after wiring. The expected result is empty 1→0 and wrong-shape 20→19. MED duplicates drop by 1 (by 2 with #6).

---

## Full slot inventory (149 slots)

"Uses" counts non-gallery surfaces that show the same file. Flags come from a script and were then read by hand:
`WRONG SHAPE` = portrait photo in a 16:9 neighborhood hero. `DUP xN` = the same file on N surfaces. `legacy generic` =
a pre-convention filename with no place or subject (usually lower-res and not place-true). "town photo on a
county or sibling page" = a town-named file standing in for a different area. Rows marked `ok` are unique,
correctly shaped, and on-topic. No slot is a placeholder or a missing file (every path resolved on disk).
The one blank slot is `service:secondary military-pcs-moving`, which is absent from the map and so has no row.

| # | Slot | Owner | Current image | Size | Uses (non-gallery) | Flags |
|---|---|---|---|---|---|---|
| 1 | gallery(rendered) | #1 | `beach-house-moving-seacrest-beach-outdoor-furniture-delivery.jpg` | 1200x1600 | 0 | ok |
| 2 | gallery(rendered) | #2 | `beach-house-moving-miramar-beach-burnt-pine-dining-room-install.jpg` | 1200x1600 | 3 | ok |
| 3 | gallery(rendered) | #3 | `beach-house-moving-seacrest-beach-freestanding-tub-set-in-place.jpg` | 1200x1600 | 1 | ok |
| 4 | gallery(rendered) | #4 | `beach-house-moving-santa-rosa-beach-drapery-hanging-complete.jpg` | 1200x1600 | 1 | ok |
| 5 | gallery(rendered) | #5 | `beach-house-moving-grayton-beach-furniture-delivery.jpg` | 1200x1600 | 0 | ok |
| 6 | gallery(rendered) | #6 | `beach-house-moving-residential-move-loading-box-truck.jpg` | 1200x1600 | 0 | ok |
| 7 | gallery(rendered) | #7 | `beach-house-moving-niceville-estate-sale-art-hanging.jpg` | 1200x1169 | 3 | ok |
| 8 | gallery(rendered) | #8 | `beach-house-moving-estate-sale-prep-hand-truck.jpg` | 1200x1600 | 0 | ok |
| 9 | gallery(rendered) | #9 | `beach-house-moving-apartment-move-fleet-truck-van-staging.jpg` | 1200x1600 | 0 | ok |
| 10 | gallery(rendered) | #10 | `crew-branded-antique-move.jpg` | 1350x1800 | 1 | legacy generic |
| 11 | gallery(rendered) | #11 | `crew-team-furniture-move.jpg` | 1350x1800 | 3 | legacy generic |
| 12 | gallery(rendered) | #12 | `beach-house-moving-great-room-staged-furniture.jpg` | 1536x2048 | 2 | ok |
| 13 | gallery(below fold) | #13 | `beach-house-moving-santa-rosa-beach-apartment-ramp-unload.jpg` | 1200x1600 | 1 | ok |
| 14 | gallery(below fold) | #14 | `beach-house-moving-luxury-beach-home-move.jpg` | 1650x2200 | 1 | ok |
| 15 | gallery(below fold) | #15 | `beach-house-moving-dresser-placement-bedroom.jpg` | 1650x2200 | 1 | ok |
| 16 | gallery(below fold) | #16 | `beach-house-moving-furniture-placement-den.jpg` | 1536x2048 | 0 | ok |
| 17 | gallery(below fold) | #17 | `beach-house-moving-art-installation.jpg` | 1650x2200 | 1 | ok |
| 18 | gallery(below fold) | #18 | `beach-house-moving-fine-art-handling.jpg` | 1650x2200 | 1 | ok |
| 19 | gallery(below fold) | #19 | `beach-house-moving-new-construction-rug-delivery.jpg` | 1536x2048 | 1 | ok |
| 20 | gallery(below fold) | #20 | `beach-house-moving-rug-carry-staircase.jpg` | 1536x2048 | 0 | ok |
| 21 | gallery(below fold) | #21 | `beach-house-moving-golf-cart-transport.jpg` | 891x1608 | 1 | ok |
| 22 | gallery(below fold) | #22 | `beach-house-moving-beach-home-balcony-view.jpg` | 2048x1536 | 1 | ok |
| 23 | gallery(below fold) | #23 | `beach-house-moving-luxury-primary-bedroom-white-glove-move-in.jpg` | 1650x2200 | 0 | ok |
| 24 | gallery(below fold) | #24 | `beach-house-moving-staged-guest-bedroom-designer-move-in.jpg` | 1650x2200 | 0 | ok |
| 25 | gallery(below fold) | #25 | `beach-house-moving-area-rug-delivery-installation-wet-bar.jpg` | 1650x2200 | 0 | ok |
| 26 | gallery(below fold) | #26 | `beach-house-moving-bed-frame-assembly-service-primary-bedroom.jpg` | 1650x2200 | 0 | ok |
| 27 | gallery(below fold) | #27 | `beach-house-moving-rug-and-credenza-placement-new-construction.jpg` | 1650x2200 | 0 | ok |
| 28 | gallery(below fold) | #28 | `beach-house-moving-designer-rug-installation-new-construction-entry.jpg` | 1650x2200 | 0 | ok |
| 29 | gallery(below fold) | #29 | `beach-house-moving-area-rug-pad-and-delivery-luxury-home.jpg` | 1650x2200 | 0 | ok |
| 30 | gallery(below fold) | #30 | `beach-house-moving-living-room-furniture-setup-luxury-home.jpg` | 1650x2200 | 0 | ok |
| 31 | gallery(below fold) | #31 | `beach-house-moving-local-move-dresser-unload.jpg` | 1200x1600 | 0 | ok |
| 32 | gallery(below fold) | #32 | `beach-house-moving-luxury-foyer-mattress-move.jpg` | 1200x1600 | 0 | ok |
| 33 | gallery(below fold) | #33 | `beach-house-moving-shrink-wrapped-sofa-protection.jpg` | 1200x1600 | 0 | ok |
| 34 | gallery(below fold) | #34 | `beach-house-moving-luxury-home-fleet-truck-and-van.jpg` | 1600x1200 | 0 | ok |
| 35 | gallery(below fold) | #35 | `beach-house-moving-branded-crew-box-spring-stairs.jpg` | 1200x1600 | 0 | ok |
| 36 | gallery(below fold) | #36 | `beach-house-moving-curved-staircase-mattress-carry.jpg` | 1200x1600 | 0 | ok |
| 37 | gallery(below fold) | #37 | `beach-house-moving-crew-box-carry-neighborhood.jpg` | 1200x1600 | 0 | ok |
| 38 | gallery(below fold) | #38 | `beach-house-moving-new-construction-chair-delivery.jpg` | 1200x1600 | 0 | ok |
| 39 | gallery(below fold) | #39 | `beach-house-moving-grayton-beach-luxury-staircase-mirror-carry.jpg` | 1200x1600 | 0 | ok |
| 40 | gallery(below fold) | #40 | `crew-home-gym-assembly.jpg` | 1350x1800 | 0 | legacy generic |
| 41 | gallery(below fold) | #41 | `beach-house-moving-crew-specialty-item-carry-30a.jpg` | 1200x1600 | 0 | ok |
| 42 | gallery(below fold) | #42 | `beach-house-moving-new-construction-box-truck-unload-crew.jpg` | 1200x1600 | 1 | ok |
| 43 | gallery(below fold) | #43 | `beach-house-moving-new-construction-crate-uncrating-driveway.jpg` | 1200x1600 | 1 | ok |
| 44 | gallery(below fold) | #44 | `beach-house-moving-new-construction-king-headboard-two-man-carry.jpg` | 1200x1600 | 1 | ok |
| 45 | gallery(below fold) | #45 | `beach-house-moving-miramar-beach-burnt-pine-box-truck-paver-driveway.jpg` | 1200x1600 | 1 | ok |
| 46 | gallery(below fold) | #46 | `beach-house-moving-santa-rosa-beach-drapery-hanging-ladder.jpg` | 1200x1600 | 2 | ok |
| 47 | gallery(below fold) | #47 | `beach-house-moving-santa-rosa-beach-drapery-hanging-primary-bedroom.jpg` | 1200x1600 | 0 | ok |
| 48 | gallery(below fold) | #48 | `beach-house-moving-santa-rosa-beach-ridgewalk-uhaul-unload.jpg` | 1200x1600 | 2 | ok |
| 49 | neighborhood | santa-rosa-beach | `move-srb.jpg` | 1600x900 | 2 | DUP x2; legacy generic |
| 50 | neighborhood | 30a | `beach-house-moving-beach-home-balcony-view.jpg` | 2048x1536 | 1 | ok |
| 51 | neighborhood | grayton-beach | `beach-house-moving-grayton-beach-gulf-front-new-construction-box-truck.jpg` | 1200x1600 | 1 | WRONG SHAPE (portrait in 16:9) |
| 52 | neighborhood | blue-mountain-beach | `mover-carry-wrapped-estate.jpg` | 900x1200 | 3 | WRONG SHAPE (portrait in 16:9); DUP x3; legacy generic |
| 53 | neighborhood | seaside | `clean-entry.jpg` | 728x980 | 1 | WRONG SHAPE (portrait in 16:9); legacy generic |
| 54 | neighborhood | watercolor | `beach-house-moving-great-room-staged-furniture.jpg` | 1536x2048 | 2 | WRONG SHAPE (portrait in 16:9); DUP x2 |
| 55 | neighborhood | watersound | `beach-house-moving-fine-art-handling.jpg` | 1650x2200 | 1 | WRONG SHAPE (portrait in 16:9) |
| 56 | neighborhood | seacrest-beach | `beach-house-moving-golf-cart-transport.jpg` | 891x1608 | 1 | WRONG SHAPE (portrait in 16:9) |
| 57 | neighborhood | alys-beach | `beach-house-moving-art-installation.jpg` | 1650x2200 | 1 | WRONG SHAPE (portrait in 16:9) |
| 58 | neighborhood | rosemary-beach | `beach-house-moving-lift-gate-furniture-padded.jpg` | 1650x2200 | 1 | WRONG SHAPE (portrait in 16:9) |
| 59 | neighborhood | inlet-beach | `beach-house-moving-fleet-truck-van.jpg` | 2200x1650 | 1 | ok |
| 60 | neighborhood | dune-allen | `collage-moves.jpg` | 1120x1092 | 1 | legacy generic |
| 61 | neighborhood | seagrove-beach | `team-packing.jpg` | 840x1428 | 1 | WRONG SHAPE (portrait in 16:9); legacy generic |
| 62 | neighborhood | miramar-beach | `move-miramar-beach.jpg` | 1600x900 | 1 | legacy generic |
| 63 | neighborhood | sandestin | `beach-house-moving-condo-stair-carry.jpg` | 1650x2200 | 1 | WRONG SHAPE (portrait in 16:9) |
| 64 | neighborhood | freeport | `truck-loaded.jpg` | 952x1288 | 3 | WRONG SHAPE (portrait in 16:9); DUP x3; legacy generic |
| 65 | neighborhood | defuniak-springs | `beach-house-moving-loaded-box-truck.jpg` | 1650x2200 | 1 | WRONG SHAPE (portrait in 16:9) |
| 66 | neighborhood | destin | `beach-house-moving-mattress-stairwell-move.jpg` | 1650x2200 | 1 | WRONG SHAPE (portrait in 16:9) |
| 67 | neighborhood | fort-walton-beach | `truck-dolly.jpg` | 952x1288 | 2 | WRONG SHAPE (portrait in 16:9); DUP x2; legacy generic |
| 68 | neighborhood | niceville | `move-niceville.jpg` | 1600x900 | 4 | DUP x4; legacy generic |
| 69 | neighborhood | crestview | `fleet-box-truck.jpg` | 952x1288 | 2 | WRONG SHAPE (portrait in 16:9); DUP x2; legacy generic |
| 70 | neighborhood | shalimar | `team-stairs.jpg` | 952x1288 | 2 | WRONG SHAPE (portrait in 16:9); DUP x2; legacy generic |
| 71 | neighborhood | bluewater-bay | `move-niceville.jpg` | 1600x900 | 4 | DUP x4; town photo (niceville) on a county or sibling page; legacy generic |
| 72 | neighborhood | panama-city | `mover-carry-estate.jpg` | 900x1200 | 2 | WRONG SHAPE (portrait in 16:9); DUP x2; legacy generic |
| 73 | neighborhood | panama-city-beach | `beach-house-moving-rug-placement-condo.jpg` | 1650x2200 | 1 | WRONG SHAPE (portrait in 16:9) |
| 74 | neighborhood | lynn-haven | `truck-loaded.jpg` | 952x1288 | 3 | WRONG SHAPE (portrait in 16:9); DUP x3; legacy generic |
| 75 | service:hero | residential-moving | `beach-house-moving-luxury-beach-home-move.jpg` | 1650x2200 | 1 | ok |
| 76 | service:hero | local-moving | `loaded-liftgate-coastal-home.jpg` | 900x1200 | 3 | DUP x3 |
| 77 | service:hero | long-distance-moving | `mover-carry-wrapped-estate.jpg` | 900x1200 | 3 | DUP x3; legacy generic |
| 78 | service:hero | packing-unpacking | `beach-house-moving-inlet-beach-kitchen-pack-crew.jpg` | 1200x1600 | 1 | ok |
| 79 | service:hero | storage | `mover-storage-corridor.jpg` | 1350x1800 | 3 | DUP x3; legacy generic |
| 80 | service:hero | delivery | `crew-gym-equipment-liftgate.jpg` | 900x1200 | 1 | legacy generic |
| 81 | service:hero | junk-removal | `team-washer-dryer.jpg` | 952x1288 | 1 | legacy generic |
| 82 | service:hero | military-pcs-moving | `crew-team-furniture-move.jpg` | 1350x1800 | 3 | DUP x3; legacy generic |
| 83 | service:hero | design-trade-installation | `beach-house-moving-miramar-beach-burnt-pine-dining-room-install.jpg` | 1200x1600 | 3 | DUP x3 |
| 84 | service:hero | mounting-installation | `beach-house-moving-niceville-estate-sale-art-hanging.jpg` | 1200x1169 | 3 | DUP x3 |
| 85 | service:hero | loading-unloading-help | `beach-house-moving-santa-rosa-beach-ridgewalk-uhaul-unload.jpg` | 1200x1600 | 2 | DUP x2 |
| 86 | service:secondary | residential-moving | `mover-carry-estate.jpg` | 900x1200 | 2 | DUP x2; legacy generic |
| 87 | service:secondary | local-moving | `beach-house-moving-branded-crew-furniture-placement-luxury-home.jpg` | 1650x2200 | 1 | ok |
| 88 | service:secondary | long-distance-moving | `beach-house-moving-great-room-rug-placement.jpg` | 1536x2048 | 1 | ok |
| 89 | service:secondary | packing-unpacking | `beach-house-moving-inlet-beach-kitchen-dish-pack-paper.jpg` | 1200x1600 | 2 | DUP x2 |
| 90 | service:secondary | delivery | `beach-house-moving-antique-slot-machine-specialty-move-santa-rosa-beach.jpg` | 1200x1600 | 1 | ok |
| 91 | service:secondary | storage | `beach-house-moving-appliance-staging-box-truck-warehouse.jpg` | 1200x1600 | 1 | ok |
| 92 | service:secondary | junk-removal | `beach-house-moving-pelican-beach-resort-fridge-hand-truck.jpg` | 1200x1600 | 2 | DUP x2 |
| 93 | service:secondary | design-trade-installation | `beach-house-moving-santa-rosa-beach-drapery-hanging-complete.jpg` | 1200x1600 | 1 | ok |
| 94 | service:secondary | mounting-installation | `beach-house-moving-santa-rosa-beach-drapery-hanging-ladder.jpg` | 1200x1600 | 2 | DUP x2 |
| 95 | service:secondary | loading-unloading-help | `beach-house-moving-santa-rosa-beach-apartment-ramp-unload.jpg` | 1200x1600 | 1 | ok |
| 96 | service:card | residential-moving | `beach-house-moving-dresser-placement-bedroom.jpg` | 1650x2200 | 1 | ok |
| 97 | service:card | local-moving | `loaded-liftgate-coastal-home.jpg` | 900x1200 | 3 | DUP x3 |
| 98 | service:card | long-distance-moving | `mover-carry-wrapped-estate.jpg` | 900x1200 | 3 | DUP x3; legacy generic |
| 99 | service:card | packing-unpacking | `beach-house-moving-new-construction-rug-delivery.jpg` | 1536x2048 | 1 | ok |
| 100 | service:card | storage | `mover-storage-corridor.jpg` | 1350x1800 | 3 | DUP x3; legacy generic |
| 101 | service:card | delivery | `team-fridge.jpg` | 952x1288 | 1 | legacy generic |
| 102 | service:card | junk-removal | `truck-loaded.jpg` | 952x1288 | 3 | DUP x3; legacy generic |
| 103 | service:card | military-pcs-moving | `crew-team-furniture-move.jpg` | 1350x1800 | 3 | DUP x3; legacy generic |
| 104 | service:card | design-trade-installation | `beach-house-moving-miramar-beach-burnt-pine-dining-room-install.jpg` | 1200x1600 | 3 | DUP x3 |
| 105 | service:card | mounting-installation | `beach-house-moving-niceville-estate-sale-art-hanging.jpg` | 1200x1169 | 3 | DUP x3 |
| 106 | service:card | loading-unloading-help | `beach-house-moving-santa-rosa-beach-ridgewalk-uhaul-unload.jpg` | 1200x1600 | 2 | DUP x2 |
| 107 | post:hero | what-movers-cost-santa-rosa-beach-30a | `move-srb.jpg` | 1600x900 | 2 | DUP x2; legacy generic |
| 108 | post:hero | moving-and-storage-santa-rosa-beach | `mover-storage-corridor.jpg` | 1350x1800 | 3 | DUP x3; legacy generic |
| 109 | post:hero | moving-to-30a-neighborhood-guide | `move-inlet-beach.jpg` | 1600x900 | 3 | DUP x3; legacy generic |
| 110 | post:hero | military-pcs-move-eglin-hurlburt | `truck-dolly.jpg` | 952x1288 | 2 | DUP x2; legacy generic |
| 111 | post:hero | new-construction-beach-home-move | `beach-house-moving-great-room-staged-furniture.jpg` | 1536x2048 | 2 | DUP x2 |
| 112 | post:hero | moving-checklist-30a-destin-florida | `loaded-liftgate-coastal-home.jpg` | 900x1200 | 3 | DUP x3 |
| 113 | post:hero | pcs-move-eglin-afb-hurlburt-field-guide | `move-niceville.jpg` | 1600x900 | 4 | DUP x4; legacy generic |
| 114 | post:hero | how-to-move-a-beach-condo-emerald-coast | `move-pcb.jpg` | 1600x900 | 2 | DUP x2; legacy generic |
| 115 | post:hero | field-notes-inlet-beach-pack-day | `beach-house-moving-inlet-beach-kitchen-dish-pack-paper.jpg` | 1200x1600 | 2 | DUP x2 |
| 116 | post:hero | field-notes-30a-install-day-design-dwell | `beach-house-moving-new-construction-box-truck-unload-crew.jpg` | 1200x1600 | 1 | ok |
| 117 | post:hero | field-notes-30a-wine-storage-delivery | `beach-house-moving-30a-wine-storage-cart-delivery-crew.jpg` | 1200x1600 | 1 | ok |
| 118 | post:hero | field-notes-appliance-delivery-destin-pelican-beach | `beach-house-moving-pelican-beach-resort-fridge-hand-truck.jpg` | 1200x1600 | 2 | DUP x2 |
| 119 | post:hero | field-notes-freestanding-tub-delivery-seacrest-beach | `beach-house-moving-seacrest-beach-freestanding-tub-set-in-place.jpg` | 1200x1600 | 1 | ok |
| 120 | post:hero | field-notes-design-trade-install-week-emerald-coast | `beach-house-moving-miramar-beach-burnt-pine-dining-room-install.jpg` | 1200x1600 | 3 | DUP x3 |
| 121 | post:inline | field-notes-inlet-beach-pack-day | `beach-house-moving-inlet-beach-living-room-pack-staging.jpg` | 1600x1200 | 1 | ok |
| 122 | post:inline | field-notes-inlet-beach-pack-day | `beach-house-moving-inlet-beach-chaise-shrink-wrapped-upright.jpg` | 1200x1600 | 1 | ok |
| 123 | post:inline | field-notes-inlet-beach-pack-day | `beach-house-moving-inlet-beach-antique-drum-table-blanket-staged.jpg` | 1200x1600 | 1 | ok |
| 124 | post:inline | field-notes-inlet-beach-pack-day | `beach-house-moving-inlet-beach-antique-drum-table-pad-wrapped.jpg` | 1200x1600 | 1 | ok |
| 125 | post:inline | field-notes-30a-install-day-design-dwell | `beach-house-moving-new-construction-crate-uncrating-driveway.jpg` | 1200x1600 | 1 | ok |
| 126 | post:inline | field-notes-30a-install-day-design-dwell | `beach-house-moving-new-construction-headboard-lift-paver-drive.jpg` | 1200x1600 | 1 | ok |
| 127 | post:inline | field-notes-30a-install-day-design-dwell | `beach-house-moving-new-construction-king-headboard-two-man-carry.jpg` | 1200x1600 | 1 | ok |
| 128 | post:inline | field-notes-30a-install-day-design-dwell | `beach-house-moving-new-construction-interior-delivery-front-door.jpg` | 1200x1600 | 1 | ok |
| 129 | post:inline | field-notes-30a-wine-storage-delivery | `beach-house-moving-30a-wine-storage-lockers-pallet-jack.jpg` | 1200x1600 | 1 | ok |
| 130 | post:inline | field-notes-30a-wine-storage-delivery | `beach-house-moving-30a-wine-storage-glassware-crate-delivery.jpg` | 1200x1600 | 1 | ok |
| 131 | post:inline | field-notes-appliance-delivery-destin-pelican-beach | `beach-house-moving-destin-condo-fridge-elevator-carry.jpg` | 1200x1600 | 1 | ok |
| 132 | post:inline | field-notes-appliance-delivery-destin-pelican-beach | `beach-house-moving-destin-condo-fridge-swap-kitchen.jpg` | 1200x1600 | 1 | ok |
| 133 | post:inline | field-notes-appliance-delivery-destin-pelican-beach | `beach-house-moving-destin-condo-fridge-install-complete.jpg` | 1200x1600 | 1 | ok |
| 134 | post:inline | field-notes-freestanding-tub-delivery-seacrest-beach | `beach-house-moving-seacrest-beach-freestanding-tub-doorway-clearance.jpg` | 1200x1600 | 1 | ok |
| 135 | post:inline | field-notes-design-trade-install-week-emerald-coast | `beach-house-moving-miramar-beach-burnt-pine-box-truck-paver-driveway.jpg` | 1200x1600 | 1 | ok |
| 136 | post:inline | field-notes-design-trade-install-week-emerald-coast | `beach-house-moving-santa-rosa-beach-drapery-hanging-ladder.jpg` | 1200x1600 | 2 | DUP x2 |
| 137 | post:inline | field-notes-design-trade-install-week-emerald-coast | `beach-house-moving-niceville-estate-sale-art-hanging.jpg` | 1200x1169 | 3 | DUP x3 |
| 138 | home:hero | homepage | `hero-van.jpg` | 1092x1120 | 1 | legacy generic |
| 139 | home:owner-operator | homepage | `fleet-all-trucks.jpg` | 952x1288 | 2 | DUP x2; legacy generic |
| 140 | home:quote-photos | homepage #1 | `move-inlet-beach.jpg` | 1600x900 | 3 | DUP x3; legacy generic |
| 141 | home:quote-photos | homepage #2 | `fleet-box-truck.jpg` | 952x1288 | 2 | DUP x2; legacy generic |
| 142 | home:quote-photos | homepage #3 | `team-stairs.jpg` | 952x1288 | 2 | DUP x2; legacy generic |
| 143 | about | about #1 | `crew-branded-antique-move.jpg` | 1350x1800 | 1 | legacy generic |
| 144 | about | about #2 | `crew-team-furniture-move.jpg` | 1350x1800 | 3 | DUP x3; legacy generic |
| 145 | reviews | reviews | `fleet-all-trucks.jpg` | 952x1288 | 2 | DUP x2; legacy generic |
| 146 | county | walton-county | `move-inlet-beach.jpg` | 1600x900 | 3 | DUP x3; town photo (inlet-beach) on a county or sibling page; legacy generic |
| 147 | county | okaloosa-county | `move-niceville.jpg` | 1600x900 | 4 | DUP x4; town photo (niceville) on a county or sibling page; legacy generic |
| 148 | county | bay-county | `move-pcb.jpg` | 1600x900 | 2 | DUP x2; town photo (pcb) on a county or sibling page; legacy generic |
| 149 | og | site-wide | `og-hero.jpg` | 1200x630 | 1 | ok |
