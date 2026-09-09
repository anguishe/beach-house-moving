# Google Business Profile — September 2026 posting kit

Source batch: 7 owner photos + descriptions from Les, 2026-09-08.
Square crops (1200×1200) ready to upload: `~/Downloads/bhm-image-batch-sep08/gbp/`

## Rules for this profile

- **Use clean URLs with no UTM parameters.** `src/proxy.ts` 301s the GBP-tagged
  homepage variant onto `/`. Adding `?utm_source=google&utm_medium=organic&utm_campaign=gbp`
  to a post link just sends the click through a redirect. Paste the bare URL.
- GBP truncates a post around the first ~80 characters in the feed, and hard-caps it
  at 1500. Keep the opening line under 80 on its own paragraph — community name plus
  service — so the hook survives the cut. `npm run gbp:kit` fails you loudly if it does not.
- One photo per post. Square crops are already sized; do not re-upload the web JPGs.
- No prices in post copy — "call for a quote." (Hourly rate stays on `/pricing` only.)
- **No phone number in the post body.** The profile already shows the number and the post
  carries its own button; a number in the body is a known rejection trigger. Say
  "Tap Call on our profile" instead. `npm run gbp:kit` fails if a number gets back in.
- **No personally identifying detail in the photo** — house numbers, address plaques,
  street-name signs, licence plates, mail or paperwork. Google removes these posts under
  its personal-information policy, and it exposes a customer either way. Run
  `npm run audit:photo-pii` and review each photo full-size before it goes out.
- Never name the third crew member from the Burnt Pine job; Zack and Keith only.

## Cadence

Target is 1–2 posts a week. This batch covers **ten posts across five weeks**
(2026-09-08 → 2026-10-09), which is the full runway from these seven photos.
Post 10 is the wrap-up — after it lands, the next batch is due.

---

### Post 1 — Mon 2026-09-08
**Photo:** `beach-house-moving-miramar-beach-burnt-pine-dining-room-install-square.jpg`
**Button:** Learn more → `https://beachhousemoving.xyz/services/design-trade-installation`

> Furniture install in Burnt Pine, Miramar Beach.
>
> Zack and Keith set the dining room and walked the house for final touches.
>
> This is design trade work, not a move — no boxes, no inventory list, no homeowner. A designer's plan, a truckload of furnishings, and one right place for each piece. We uncrate, place to the plan, adjust until it's right, and take the crates and packing material with us.
>
> Receiving, delivery, and install days for designers and builders across Walton, Okaloosa, and Bay Counties. Tap Call on our profile.

---

### Post 2 — Thu 2026-09-11
**Photo:** `beach-house-moving-santa-rosa-beach-drapery-hanging-complete-square.jpg`
**Button:** Learn more → `https://beachhousemoving.xyz/services/design-trade-installation`

> Drapery day in Santa Rosa Beach — panels up for Tracery Interiors.
>
> That is Zack on the ladder, hanging for the designers.
>
> Drapery is its own kind of careful. Panels arrive folded or rolled, and every crease you put in on install day is one somebody has to steam out later. They get carried flat, kept off the floor, and hung without being dragged across anything.
>
> Working with a designer on the Emerald Coast? Tap Call on our profile.

---

### Post 3 — Mon 2026-09-15
**Photo:** `beach-house-moving-santa-rosa-beach-ridgewalk-uhaul-unload-square.jpg`
**Button:** Learn more → `https://beachhousemoving.xyz/services/loading-unloading-help`

> Unloading a customer's U-Haul at RidgeWalk, Santa Rosa Beach.
>
> You rented the truck — we brought the crew.
>
> Here's the part people don't expect: we'll drive it too. Load it, drive it, unload it — the whole job on a truck that isn't ours. Or just the unload at the far end if that's all you need. U-Haul, Penske, Budget, PODS, rental trailers.
>
> Rented the truck to save money and now you're looking at backing a 20-footer into a beach-house driveway? That's a phone call. Tap Call on our profile. Licensed and insured, FL Mover Reg. #IM4125.

---

### Post 4 — Thu 2026-09-18
**Photo:** `beach-house-moving-niceville-estate-sale-art-hanging-square.jpg`
**Button:** Learn more → `https://beachhousemoving.xyz/services/mounting-installation`

> Les hanging art in Niceville for a Lily Pads Interiors estate sale.
>
> Art over a bed is a two-person job even when the piece is light — the reach is long and there's nothing under you to stand on. Framed pieces are the easiest thing on any job to damage and the hardest to hide once you have.
>
> We supply the hanging hardware when a piece didn't come with the right kind. Estate sale staging, art hanging, and moving what sells — Niceville, Fort Walton Beach, Crestview, and the rest of Okaloosa County. Tap Call on our profile.

---

### Post 5 — Mon 2026-09-22
**Photo:** `beach-house-moving-miramar-beach-burnt-pine-box-truck-paver-driveway-square.jpg`
**Button:** Learn more → `https://beachhousemoving.xyz/service-areas/walton-county/miramar-beach`

> Where the truck parks is part of the job. Burnt Pine, Miramar Beach.
>
> On the paver drive, not the lane. In a gated community a blocked road is somebody else's complaint by lunchtime. Pavers are also why we walk heavy pieces instead of rolling them — a hand truck wheel catching a paver seam is how a joint pops and how a piece gets away from you.
>
> Movers who've worked your neighborhood before. Tap Call on our profile.

---

### Post 6 — Thu 2026-09-25
**Photo:** `beach-house-moving-santa-rosa-beach-drapery-hanging-ladder-square.jpg`
**Button:** Learn more → `https://beachhousemoving.xyz/resources/field-notes-design-trade-install-week-emerald-coast`

> The unglamorous half of a finished room.
>
> A primary bedroom with a made bed and a finished floor gives you nowhere to set a ladder that isn't on the bed or on the rug. So the ladder gets padded feet, somebody holds it, and the bed gets covered before anything goes up over it. None of that is complicated — it's just the difference between a clean job and a conversation about a mark on a duvet.
>
> Santa Rosa Beach. Tap Call on our profile.

---

### Post 7 — Mon 2026-09-29
**Photo:** `beach-house-moving-santa-rosa-beach-drapery-hanging-primary-bedroom-square.jpg`
**Button:** Learn more → `https://beachhousemoving.xyz/service-areas/walton-county/santa-rosa-beach`

> Santa Rosa Beach primary bedroom, finished.
>
> Delivery ends when the item is in the house. Installation means it's in its final position, adjusted, and the room is ready to be photographed or used — with the packing material gone. Those are two different jobs and it's worth knowing which one you're booking.
>
> Santa Rosa Beach is home base. Licensed & insured, owner-operated. Tap Call on our profile.

---

### Post 8 — Thu 2026-10-02
**Photo:** `beach-house-moving-santa-rosa-beach-drapery-hanging-ladder-square.jpg` (reuse)
**Button:** Learn more → `https://beachhousemoving.xyz/services/mounting-installation`

> New: TV mounting, art and mirror hanging, and shelving.
>
> You do not have to be moving to book it.
>
> We'll take down an old TV mount and put up a new one, and we supply the hanging hardware when a piece didn't come with the right kind. Keith is our installer and he looks at the wall in person before we commit to a mount — because a mount is only as good as what's behind the drywall, and around here that's wood stud, metal stud, block, or plaster over lath depending on the decade.
>
> Anyone who commits to a TV mount over the phone without asking what the wall is made of is guessing with your television. Tap Call on our profile.

---

### Post 9 — Mon 2026-10-06
**Photo:** `beach-house-moving-santa-rosa-beach-ridgewalk-uhaul-unload-square.jpg` (reuse)
**Button:** Learn more → `https://beachhousemoving.xyz/services/loading-unloading-help`

> Rented the truck yourself? We'll drive it.
>
> Most people call us to unload. Fewer know we'll take the whole thing — load your rental, drive it, and unload it at the other end. It comes up when somebody rents to save money and then realises they're about to reverse a 20-footer into a driveway they've never seen, or when the move-out and the closing land on the same morning.
>
> U-Haul, Penske, Budget, PODS. One thing to sort when you book instead of on move morning: who the rental agreement authorises to drive. Tell us what you rented. Tap Call on our profile.

---

### Post 10 — Thu 2026-10-09
**Photo:** `beach-house-moving-miramar-beach-burnt-pine-dining-room-install-square.jpg` (reuse)
**Button:** Learn more → `https://beachhousemoving.xyz/resources/field-notes-design-trade-install-week-emerald-coast`

> Three towns, three design firms, one week.
>
> Drapery in Santa Rosa Beach for Tracery Interiors, art in Niceville for Lily Pads Interiors, and a furniture install in Burnt Pine, Miramar Beach.
>
> We wrote up what a design trade install day actually involves — the order pieces come off the truck, what we ask for before we show up, and where our scope stops.
>
> Read it on the site, or tap Call on our profile.

---

## Profile maintenance to do alongside these posts

1. **Upload all 7 squares to the Photos tab** (separate from the posts — GBP treats
   post photos and profile photos differently). Files in
   `~/Downloads/bhm-image-batch-sep08/gbp/`.
2. **Add three services** to the profile so it matches the site:
   - *Design Trade Delivery & Installation* — "Receiving, delivery, and install days
     for interior designers and builders. Showroom and freight pickups, uncrating,
     placement to plan, art and mirror hanging, drapery panel handling, debris haul-away."
   - *U-Haul & Rental Truck Help* — "Load, drive, and unload the truck or container you
     already rented — U-Haul, Penske, Budget, PODS — or any one of those on its own.
     Yes, we will drive it. Licensed and insured."
   - *Mounting & Installation* — "TV mounting including take-down and replacement, art
     and mirror hanging with hardware supplied, and shelving. Installer looks at the
     space in person before any mount is committed to."
3. **Check the website field is the bare URL** (`https://beachhousemoving.xyz`) with no
   UTM string — that was the point of the 2026-08-31 redirect work.
