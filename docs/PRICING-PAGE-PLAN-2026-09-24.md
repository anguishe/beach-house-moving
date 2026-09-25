> **Superseded in part (2026-09-25):** the published rate is now **$195/hr for 2 movers + truck, plus drive time** (owner-confirmed; C1's 2-mover question is answered). Figures below that say $165 are the 9/24 snapshot. Still open: 3+ mover rates, how drive time is counted, and C2 (fuel).

# Pricing Page Plan — 2026-09-24

> Planning doc only. No site code changed. Everything marked **OWNER** needs a confirmed answer
> from Beach House Moving before it goes on the site. The rule in `AGENTS.md` still holds: never
> publish a number, a policy, or an example job the owners have not confirmed.

## 0. Where we are today (read this first)

`/pricing` already exists, is indexed in the sitemap, and **already publishes a price**:

- `src/lib/content.ts` → `PRICING.hourlyRate = 165` (USD). It renders on `/pricing` ("Billed hourly
  at $165/hr — crew and truck, fuel included") and in the "How much does a move cost?" FAQ, which
  shows on the homepage too.
- `src/lib/structured-data.ts` → `pricingOfferSchema()` emits one `Offer` with a
  `UnitPriceSpecification` (165 USD, `unitCode: HUR`). It is live. Checked with curl on 2026-09-24.
- There is an `{/* OWNER: paste confirmed hour ranges per home size here */}` slot in
  `src/app/pricing/page.tsx` that was never filled. The 2026-06-14 audit flagged this as M3 ("ranges
  get cited, 'call for quote' doesn't").

So this is **not** a new page. The job is to turn one bare rate into the most complete, citable
moving-cost page on the Emerald Coast. Keep the `/pricing` URL. It is already indexed, and a second
`/moving-costs/` page would just compete with it.

### Contradictions in the current copy. Settle these before adding anything.

| # | Where | Conflict | Why it matters |
|---|---|---|---|
| C1 | `/pricing` says **one** $165/hr rate. `service-details.ts` local-moving FAQ says "Hourly, **based on crew size and the truck the job needs**" | Is $165 for 2 movers? 3? Every crew? | A rate with no crew size can't be compared or cited. Every competitor that publishes a rate also names the crew size. |
| C2 | `/pricing` says "fuel included". `PROMPT_DECK_TOKENS.md` says "Pricing starts at 165/hr **plus fuel**" | One of them is wrong | FS 507.07(3)(c) prohibits misrepresenting price. Fix the stale doc, or fix the page. |
| C3 | `/pricing` promises "no stair fees, no mattress fees, no fuel surcharges" | True for every job? Pianos, safes, 3rd-floor walk-ups? | An absolute "never" claim has to survive the worst job of the year. |
| C4 | Long-distance: "The number you sign is the number you pay" (a binding estimate) | Is that really the policy, including for added items? Does BHM hold **USDOT/FMCSA authority** for out-of-state moves? | Florida ch. 507 covers **intrastate** moves only. Crossing a state line puts the move under 49 CFR Part 375 (see §1.9). |
| C5 | Display reads "FL Mover Reg. #IM4125" | The statute's phrasing is "Fla. Mover Reg. No." or "Fla. IM No." | Cheap to match the statute word for word. |
| C6 | "Estimates are always free — **no deposit**" | Does BHM take a booking deposit? | If a deposit is taken at booking, the page is wrong. |
| C7 | `docs/GBP-POSTS-2026-09.md` rule: "No prices in post copy" | Conflicts with the goal of publicizing pricing | This needs an owner decision (see §3). |

---

## 1. Recommended architecture

### 1.1 The hub: `/pricing` (keep the URL)

- **Title:** `Movers Cost on 30A & Emerald Coast — 2026 Rates | Beach House Moving`
- **H1:** "How Much Do Movers Cost on the Emerald Coast? Our 2026 Rates"

Suggested section order. Each section is one self-contained, quotable passage, since AI
engines lift passages rather than whole pages.

1. **Answer-first box (40–60 words, above the fold).** Crew and rate, minimum, what's included, a
   typical-range sentence, and "Rates effective {date}". Example shape. **OWNER must confirm every
   number:**
   > Beach House Moving charges **$165/hour for 2 movers and a truck** (fuel, blankets, dollies,
   > and wrapping included), with a **2-hour minimum**. A 3rd mover is **$X/hour**. Most 1-bedroom
   > local moves on 30A take **3–4 hours**, and most 3-bedroom homes take **6–8**.
2. **Rate table**, one row per crew size:

   | Crew | Truck | Hourly | Minimum | Best for |
   |---|---|---|---|---|
   | 2 movers | box truck or Sprinter | $165 | ? hrs | studio–2BR |
   | 3 movers | box truck w/ lift gate | $? | ? | 2–3BR |
   | 4 movers (all owners) | 2 trucks | $? | ? | 4BR+, gulf-front |

   Add any flat-rate lines BHM will commit to: single-item delivery, appliance delivery, TV mount,
   U-Haul load/unload only, junk removal by truck fraction.
3. **"What's included in the hourly rate" checklist**: truck, fuel, blankets, shrink-wrap, floor
   protection, basic disassembly/reassembly, gate coordination, and the basic 60¢/lb valuation
   required by law. This is the list that makes "no hidden fees" believable.
4. **"What costs extra" table.** State it honestly, even when the answer is $0: packing materials
   (per box or at cost?), packing labor, stairs above N flights, long carry, piano, safe, hot tub,
   storage per month, travel time or trip charge (does the clock start at the yard or at the
   door?), after-hours or holiday rates (BHM is 24/7, so is 2 a.m. the same price?), and full-value
   protection.
5. **Worked examples** (the biggest citation magnet; see §1.3).
6. **Typical hours by home size**: the unfilled OWNER slot. Studio/1BR, 2BR, 3BR, and 4BR+, each
   with a crew and an hour range, and one footnote about stairs, elevators, and gated 30A access.
7. **Cost-factor table.** Keep the existing `pricingFactors` and add a "+ how much" column
   (e.g. "3rd-floor walk-up: usually +30–60 min").
8. **Long-distance pricing.** Explain how it's quoted (inventory + miles, in writing), give 2–3
   real "from" examples (Santa Rosa Beach → Atlanta, → Birmingham, → Tampa), and keep the
   no-brokering line. Gated on C4.
9. **Deposits, payment, and cancellation**: deposit amount or "none", accepted payment methods
   (the statute requires at least two of three), when payment is due, and the cancellation window.
10. **Seasonal notes**: summer and PCS season (May–Aug), month-end, spring-break and 30A rental
    turnover Saturdays, snowbird arrivals (Oct–Nov) and departures (Mar–Apr). If rates stay flat
    year-round, say so. That beats competitors with seasonal pricing (Smart Moves' rates apply
    "March 1st to January 14th").
11. **"How to compare quotes" (comparison without naming anyone)**: "When another quote looks
    cheaper, check: is the truck extra? Is fuel extra? What's the minimum? Is it labor-only? Is
    there an IM number on the quote?" Then show the arithmetic (§3.4).
12. **Licensed-mover proof block**: Fla. Mover Reg. No. IM4125 with a link to FDACS lookup, cargo
    insurance, and USDOT/MC if held.
13. **"Real crew, real photos" block** (§3.1): 3–4 job photos with a caption, next to the prices.
14. **FAQ** (8–12 questions, one direct sentence first, then detail): "Is there a minimum?", "Do
    you charge travel time?", "Is my estimate binding?", "Do you charge for stairs?", "What's the
    cheapest way to move a 1-bedroom?", "Do you charge more on weekends?", "How much to move a
    piano/safe?", "How much is storage?", "Do military families get a discount?", "Do I pay for
    the drive between houses?"
15. **CTA band**: keep the existing one, and add "Get this in writing: request a quote".

### 1.2 Per-service price blocks

Build one reusable `PriceBlock` component that reads from an expanded `PRICING` object in
`content.ts` (single source of truth; the Offer schema reads the same object, so they can't
drift). Put it on each service page as a 3–5 line box with the headline rate, the minimum, what's
included, "see full pricing →" linking to `/pricing#<anchor>`, and a quote CTA.

| Service page | Block shows | OWNER |
|---|---|---|
| local-moving, residential-moving | crew/hour table, minimum | rates per crew |
| long-distance-moving | "from $X to Atlanta" examples, how it's quoted | examples + C4 |
| packing-unpacking | packing labor rate + materials (per box or kit) | materials price list |
| storage | per month / per vault | storage pricing |
| delivery | flat single-item / appliance rate | flat rates |
| junk-removal | ⅛ / ¼ / ½ / full truck "starting at" | tiers |
| military-pcs-moving | same rates + any military discount, PPM/DITY help | discount? |
| mounting-installation | flat per-TV "starting at" | rate |
| loading-unloading-help | labor-only hourly (no truck) | rate. This is the direct match for Smart Moves' labor-only $110 |
| design-trade-installation | hourly, or "quoted per scope" | leave as quote-only if preferred |

Neighborhood/county pages: add one sentence plus a link ("Moves inside Walton County are billed at
the same hourly rate. See pricing."). Bump `CONTENT_REVISION` when this ships (see the convention
in `CLAUDE.md`).

### 1.3 Worked examples (must be real jobs)

Format: **Route · home · crew · hours · total · what drove the hours.** 4–6 examples, pulled from
BHM's actual invoices (anonymized, with no street or community name the client hasn't cleared).
The `confirmedWork` rule applies: every example has to be backed by a real job.

Template:

> **2-bedroom condo, Destin → Navarre (~35 mi).** 2 movers + box truck, 5.5 hours including
> the drive, elevator on the Destin end. **Total: $___.** What moved the number: elevator
> reservation window, 1 king bed disassembly.

Suggested routes, matching the service area and search demand: 2BR Destin → Navarre; 3BR 30A
gulf-front (3rd floor, boardwalk) → Santa Rosa Beach inland; 1BR apartment within Fort Walton
Beach; PCS 3BR Niceville → storage; single appliance delivery in Miramar Beach; 4BR Panama City
Beach → Freeport. Add a "What it would cost with a truck-fee mover" line only if the arithmetic is
exact and nobody is named.

### 1.4 Cost calculator (phase 2, after rates are confirmed)

- A client-side estimator: inputs are home size, stairs/elevator (none / 1 flight / 2+ / elevator),
  packing (none / fragile only / full), and origin and destination county. Output is an **hour
  range × crew rate = cost range**, plus a "what's included" line.
- Every result carries: *"Ballpark only. Florida law requires a signed written estimate before any
  work (FS 507.05); that written estimate is your price."* This keeps it on the right side of
  507.07's misrepresentation rule.
- The CTA under the result reads "Lock this in writing". It opens `/get-a-quote` prefilled with the
  inputs (query params into form defaults).
- Push a GA4 event `estimate_calculated` (bedrooms, range) through `gtag.ts`.
- Render the page server-side with a static "Typical hours by home size" table, so crawlers and AI
  engines see the numbers without JavaScript. The calculator sits on top of that table and never
  replaces it.

### 1.5 Schema plan

Google's position: don't use `Product` for services. Use LocalBusiness/Service, which can carry a
price range (John Mueller, SEO office hours, Feb 2023). Structured data must match what's visible
on the page.

1. **Keep** the `Offer` + `UnitPriceSpecification` (HUR). Extend it:
   - one Offer per crew size (`name: "Local moving — 2 movers + truck"`),
   - the minimum via `eligibleQuantity: {"@type":"QuantitativeValue","minValue":2,"unitCode":"HUR"}`,
   - `priceValidUntil` or a visible "rates effective" date, updated when rates change,
   - `itemOffered: {"@type":"Service","@id": ".../services/local-moving#service"}` so the price
     attaches to the service entity rather than floating free.
2. On the `MovingCompany` node: add `priceRange` (e.g. `"$165–$___/hr"`) and a
   `hasOfferCatalog` → `OfferCatalog` listing each service's Offer. The flat-rate items use
   `PriceSpecification` with `minPrice` ("starting at").
3. On each service page, give the `Service` JSON-LD an `offers` pointing at the same `@id`s. No
   duplicate numbers.
4. Keep `FAQPage`. It hasn't earned a rich result for this site type since 2023, but it's harmless,
   and the Q&A text is what AI engines extract. Only include FAQs that are visible on the page.
5. **Don't** add `Product`, `AggregateOffer` on Product, or review markup on Offers.
6. After shipping, validate with the Rich Results Test and the Schema.org validator.

### 1.6 Internal links

- **Into `/pricing`:** every service page (PriceBlock), the homepage FAQ answer (already links
  nearby), the county pages, `/get-a-quote` ("see our rates first"), the footer (already present),
  and the Field Notes posts that mention a job's size.
- **Out of `/pricing`:** each row of the "what costs extra" table links to its service page;
  examples link to the matching neighborhood page (Destin, Navarre); `/reviews`; `/about`; and
  `/get-a-quote`.
- **`llms.txt`:** add a "Pricing" section with the rate table in plain text and the "rates
  effective" date.

### 1.7 Measurement

Baseline **before** shipping. Pull these on the day it deploys:

- **GSC (`sc-domain:beachhousemoving.xyz`):** Performance → Query → custom regex
  `(cost|price|pricing|how much|rate|rates|per hour|cheap|affordable|estimate)`. Record
  impressions, clicks, and average position for the site overall and for Page = `/pricing`. Repeat
  at 28 and 56 days.
- **GA4 (existing events):** `generate_lead` (quote form) and `contact`/`phone_click` with
  `phone_click_location`. The pricing CTA already sends `location="pricing-page"`. Give each new
  PriceBlock its own location value (`price-block-local-moving`, etc.) so calls can be attributed
  per service. Add `estimate_calculated` (phase 2).
- **Quote-form field:** add "Did you see our pricing page? Y/N", or a hidden referrer field in the
  Resend email, so the owner can see which leads read prices first.
- **Owner-side tally:** ask the owners to note on each call whether "the caller mentioned our
  price". That's a 30-day paper tally, and it's the only way to count phone leads that pricing
  influenced.
- **AI visibility panel, monthly:** run the same 6 prompts in Google AI Mode/Overviews, ChatGPT
  (search on), Perplexity, and Copilot: "how much do movers cost in Santa Rosa Beach", "... in
  Destin", "cost to move a 2 bedroom Destin to Navarre", "cheapest movers 30A", "movers hourly
  rate Fort Walton Beach", "how much does a local move cost Emerald Coast". Log whether BHM is
  cited and which number the engine quotes.

**Hard prerequisite for ChatGPT and Copilot:** BHM is **not indexed on Bing at all**
(`bhm-bing-not-crawled`, audited 2026-08-31, "Discovered but not crawled"). ChatGPT search and
Copilot lean heavily on Bing's index. A pricing page Bing hasn't crawled can't be cited there,
however good it is. After the pricing deploy, run IndexNow (already automated at build) and submit
`/pricing` manually in Bing Webmaster. Also revisit the Crawl Control decision with Travis, which
was left alone on purpose.

### 1.8 Why this ranks and gets cited (research basis)

- **Specific numbers beat "call for a quote".** The 2026-06 audit made the same call. In the GEO
  study (Aggarwal et al., Princeton/IIT Delhi, KDD 2024), adding statistics and concrete figures
  was among the top methods, lifting visibility in generative-engine answers by roughly 30–40%.
- **AI engines cite what already ranks.** seoClarity found 97% of AI Overviews cite at least one
  top-20 organic result, and Ahrefs found 47% of citations come from below position 5. BHM's money
  queries sit around position 19. Being cost-specific is the cheapest way to move into that pool.
- **Aggregators own the cost answer today.** moveBuddha, HireAHelper, LoadUp, and Extra Space
  publish Destin, FWB, and Pensacola averages ($87–$147/hr). A real local mover with its own
  published rates, examples, and a license number is a stronger source for that answer, and the
  page should say so plainly.
- **Freshness:** "2026 rates" in the title, and a visible "rates effective" date that gets updated.
- **Passage structure:** each H2 opens with a one-sentence answer that holds up out of context.

### 1.9 Florida and federal rules: what a published price page must or should say

Sources: FS ch. 507 (2025), fetched from flsenate.gov on 2026-09-24; FDACS "Moving Within
Florida"; and 49 CFR Part 375. This is not legal advice. **OWNER** should confirm anything
uncertain with FDACS (1-800-HELP-FLA) or counsel.

**Must:**
- **§507.03(5): every advertisement** must include "Fla. Mover Reg. No. ___" or "Fla. IM No.
  ___". The pricing page and any GBP or Facebook post with a price count as advertising. Use the
  statute's exact phrase (C5).
- **§507.05: before any service**, a written estimate and contract, signed or e-acknowledged by
  both parties and dated. It must include the mover's name, phone, and **physical business
  address**; dates; addresses; storage location; an **itemized breakdown and total of all costs**;
  and accepted payment forms. **The page is not the estimate.** Say so: "Published rates are how
  we price; your signed written estimate is your price."
- **§507.05(6): accept at least two of** (a) cash, cashier's check, or money order; (b) personal
  check; (c) credit card. Publish which ones.
- **§507.04(5):** liability can't be limited below **60¢ per pound per article**, and it must be
  disclosed in writing at signing along with any option to buy more coverage. Put this on the page
  as "Basic valuation: 60¢/lb per article (Florida minimum), included. Full-value protection:
  $___ (OWNER)."
- **§507.07(3)(c):** no misrepresenting "the price, size, nature, extent, qualities, or
  characteristics" of services. Every "never", "no hidden fees", and "included" line has to be
  literally true (C2, C3).
- **§507.06:** goods can't be withheld once the shipper pays the amount on the signed estimate or
  contract. Refusing is a third-degree felony per FDACS. This makes a fixed written quote
  enforceable, which is a trust point worth stating.

**Should:**
- **§507.04(1):** at least $10,000 per shipment in cargo liability insurance. With a 3-vehicle
  fleet, BHM can't use the ≤2-vehicle $50k bond or CD alternative, so it needs actual insurance.
  Publishing "Cargo insurance: $___ per shipment" is a trust signal. **OWNER** to confirm the
  amount and carrier.
- Motor-vehicle minimums: $50k per occurrence for vehicles under 35,000 lb.
- **Physical-address tension (flag):** §507.05(1) requires the physical business address **on the
  estimate/contract**, and §507.07(6)(c) requires it on solicitation materials **when** a mover
  advertises through a local mailing address or drop box. The site hides the address (SAB). Hiding
  it on the web page is fine, since BHM doesn't advertise a drop-box address. It **must** still
  appear on the written estimate. **OWNER:** confirm the estimate form includes it.
- **No statutory cap over the estimate in Florida.** Unlike federal interstate rules, ch. 507 sets
  no 110% ceiling. The protection is that the signed estimate is the enforceable amount. For hourly
  moves, recommend stating the policy explicitly: "Hourly moves: billed for actual time at the
  signed rate; if the job changes (items added, access different), we update the written estimate
  **before** continuing." **OWNER** to confirm that's the practice.
- **FDACS consumer guidance** tells shoppers phone and internet estimates are no substitute for an
  in-person walk-through. The page says estimates happen "usually within the same conversation".
  Add "or by video walk-through / in person for larger homes".

**If BHM crosses state lines (C4):** interstate household-goods moves need **USDOT + MC operating
authority** and fall under 49 CFR Part 375.
- §375.213 requires giving the shipper "Your Rights and Responsibilities When You Move" (Appendix
  A). A web link is the usual method.
- Non-binding estimates are subject to the **110% rule** at delivery (§375.407).
- A "binding" or "not-to-exceed" claim then has federal meaning.

**OWNER:** does BHM hold a USDOT/MC number, or are "long-distance" moves in-state only (e.g.
Pensacola → Miami)? If they're in-state only, the long-distance copy should say "anywhere in
Florida" and stop implying out-of-state. This is the biggest compliance flag in this plan.

---

## 2. Client question list for the BHM owners

Ask these in order. The ★ items gate launch.

### A. Rates
1. ★ Is $165/hr for **2 movers + 1 truck**? What are the 3-mover and 4-mover rates? (C1)
2. ★ Is fuel really included, always? (C2)
3. Does the rate change by truck: Sprinter vs box truck, or two trucks?
4. Labor-only rate (loading or unloading a customer's U-Haul, no BHM truck)?
5. Are weekend, holiday, and after-hours (10 p.m.–6 a.m.) moves the same rate? You advertise 24/7.
6. Any military, senior, or first-responder discount? (Only publish one you'll honor every time.)

### B. Minimums and time
7. ★ Minimum hours? Is it the same for every crew size?
8. ★ When does the clock start and stop: at your yard, or at the customer's door? Is drive time
   between the two homes billed? Is there a flat trip or travel fee instead?
9. Billing increments after the minimum: 15, 30, or 60 minutes?
10. Typical real hours by home size (studio/1BR, 2BR, 3BR, 4BR+), from your last 20 jobs if you
    can pull them.

### C. Fees and extras
11. ★ Stairs, elevators, long carries (gulf-front boardwalks): ever charged extra? (C3)
12. Pianos, gun safes, hot tubs, pool tables, marble tops, large TVs: flat add-on prices?
13. Disassembly and reassembly of beds, cribs, and furniture: included?
14. Shrink wrap, mattress bags, TV boxes: included, or charged?
15. Gated-community gate passes and HOA elevator deposits: who pays?

### D. Packing and materials
16. Packing labor: same hourly rate?
17. Materials: per-box price list, a flat packing kit, or at cost? Do you haul away used boxes free?
18. Full-pack "starting at" by home size?

### E. Long distance
19. ★ Do you hold **USDOT/MC** authority, or are long-distance moves Florida-only? (C4)
20. How are long-distance moves priced: by weight, cubic feet, flat per job, or hourly + mileage?
21. Two or three real examples with totals (e.g. SRB → Atlanta, → Birmingham, → Tampa)?
22. Is every long-distance quote binding, even if items are added on move day?

### F. Specialty and other services
23. Flat prices for single-item delivery, appliance delivery, TV mounting, and junk removal
    (⅛, ¼, ½, and full truck)?
24. Storage: price per month, per vault, or per room? Minimum term? Is delivery out of storage
    billed separately?
25. Design-trade installs: publish a rate, or keep them quote-only?

### G. Deposits, payment, and cancellation
26. ★ Do you take a deposit to hold a date? How much, and is it refundable? (C6)
27. ★ Accepted payment methods: cash, check, card, Zelle, Venmo? Any card surcharge? Is financing
    offered? (Chosen One advertises Wisetack up to $25k.)
28. When is payment due: at delivery, or at unload start?
29. Cancellation and reschedule policy: notice window and fee?

### H. Season and demand
30. Busiest months, days of the week, and days of the month? Do you raise rates in peak season, or
    keep them flat? (Flat year-round is itself a selling point.)
31. Which weeks are hardest to book (30A rental-turnover Saturdays, PCS summer, month-end)?

### I. Guarantees, licensing, and insurance
32. ★ Cargo insurance amount per shipment and the carrier's name. Can we publish the amount?
33. ★ Full-value protection offered? At what cost? Deductible?
34. Any written guarantee: "price in writing or the move is free", on-time arrival, damage claim
    turnaround?
35. ★ Does your written estimate form include the physical business address, the "Fla. Mover
    Registration No." sentence, the itemized breakdown, and the 60¢/lb disclosure? (Send a blank
    copy.)
36. Are all four owners background-checked? (Only if it's true and you can prove it.)

### J. Competition
37. Which companies do customers say they're comparing you against? What numbers do they quote
    back to you?
38. Have you lost jobs on price? To whom, and by how much?
39. What do you win on: speed, the owners on site, 24/7, Sprinter access on 30A?

### K. What you're comfortable publishing
40. ★ Exact rates vs "starting at": which rows can be exact, and which should be "from"?
41. ★ Can we publish 4–6 real past jobs as anonymized worked examples with totals? Which ones?
42. Can prices go in Google Business Profile posts and the GBP services list? (Current kit rule
    says no. C7.)
43. Who approves price changes, and how will you tell us when rates change?

### L. More calls and quote requests
44. Where do your jobs come from today (Google, GBP calls, Facebook, realtors, property managers,
    repeat customers, Thumbtack/Angi)? Rough percentage each.
45. Which realtors, property managers, and 30A rental companies send you work? Would any agree to
    a referral page or partner link?
46. What does your best-paying, easiest job look like? We'll write for more of those.
47. What jobs do you want fewer of?
48. Your busiest and slowest days? We can push "open dates this week" posts on the slow ones.
49. Do you ask every customer for a Google review? When, and how (text link at the tailgate)?
    Can we give you a QR card?
50. Can you shoot 5 photos on every job (truck, crew, wrapped piece, placed room, the team) with
    no addresses in frame? (See the photo-privacy gate in `CLAUDE.md`.)
51. Can you shoot one short video walk-through of what's included (blankets, wrap, dollies, lift
    gate) to sit on the pricing page?
52. How fast do you return missed calls, and does the quote form email reach a phone right away?

---

## 3. Other ideas to keep calls and quote requests coming

### 3.1 "Real crew, real photos" trust angle

Clients already compliment it, and competitors use AI and stock imagery. Make it explicit:

- A small badge or statement near the prices and in the footer: **"Every photo on this site is a
  real Beach House Moving job, shot by our crew — no stock, no AI."** Only if literally true.
  Audit `public/images/` for any stock image first, including OG images and backgrounds.
- A caption convention on job photos: "Our crew, Seacrest Beach, Aug 2026". The real place and
  month are citable and hard to fake. The photo-PII gate applies.
- An `/about` or `/pricing` line: "The people in these photos are the people who show up."
- In schema, `ImageObject` on key photos with `creator` = the business (`@id`), and
  `creditText: "Beach House Moving"`. It's a small E-E-A-T signal, and it keeps EXIF-stripped
  photos attributable.
- A GBP photo cadence: 3–5 real job photos a week, which keeps the profile fresh.

### 3.2 Google Business Profile

- **Services list with prices.** GBP lets you add a price to each service, and Google's own help
  says to add a price only when it's accurate. Enter the confirmed rates ("Local moving — 2 movers
  + truck: $165/hr"), and match the site exactly.
- **GBP posts with prices,** pending the owner decision on C7. One "What a 2-bedroom move costs"
  post a month, linking to `/pricing` (clean URL, no UTM). No phone number in the body (known
  rejection trigger), no customer detail. Add a `gbp:kit` check that the price in any post matches
  `PRICING` in `content.ts`.
- **Q&A:** seed the top 5 pricing FAQs as owner-answered questions, if that feature is still
  available on the profile.
- **Review responses:** reply to every review within 24–48 h, naming the service and area in
  natural language ("Glad the 3rd-floor Seagrove move went smoothly"). No prices, no customer
  details.
- **Review ask:** a text template with the review link (`SOCIAL_LINKS.google`), sent at the
  tailgate. A QR card in the truck.

### 3.3 Offers that pull calls without discounting the rate

- **"Open dates this week"** posts on slow days (from question 48).
- **Free "what will my move cost?" video walk-through** (5–10 min on FaceTime), then the written
  estimate. This matches FDACS's "don't trust phone-only estimates" advice and beats phone-only
  competitors.
- **Price-in-writing promise:** "Your written estimate is your price. We don't hold goods for more
  money." It's backed by §507.06, so it's a legal fact, not marketing fluff.

### 3.4 Comparison without naming anyone

Build an honest "compare two quotes" table on `/pricing` from real local pricing patterns:

| Line | "Truck-fee" quote | Beach House Moving |
|---|---|---|
| 2 movers, 3 hours | $160 × 3 = $480 | $165 × 3 = $495 |
| Truck fee | + $160 | included |
| Fuel | sometimes extra | included |
| **Total** | **$640** | **$495** |

The left column mirrors a published local pattern (Chosen One Movers FAQ: "$160/hr for 2
movers … plus a $160 truck fee"). **Don't name them**, and only ship this if BHM's 2-mover rate
and "truck and fuel included" are confirmed (C1, C2). Add a labor-only line against the
$110/hr-no-truck pattern (Smart Moves), so shoppers see what "cheaper" actually leaves out.

### 3.5 Content spokes (after the hub ships)

`/resources/` Field Notes, each opening with a real job and a real number:
- "What a 2-bedroom Destin → Navarre move actually cost"
- "Moving a 30A gulf-front rental: why stairs and boardwalks change the hours"
- "PCS move from Eglin: what we charge and what the military pays for"

Each one links to `/pricing`, and `/pricing` links back.

### 3.6 Bing and AI surfaces

Fixing Bing indexing unlocks ChatGPT and Copilot citations of the pricing page (see §1.7). It is
the same trust-gate problem as the Bing Places listing, which is stuck on a blank address. Decide
on the support ticket vs delete-and-recreate. That listing is also where Copilot pulls
local-business facts.

---

## Appendix: competitor pricing evidence (retrieved 2026-09-24)

| Company | Area | Published pricing | Source | Verified on company site? |
|---|---|---|---|---|
| Smart Moves (Emerald Coast Smart Movers) | PCB–Destin, SRB, Niceville, Freeport | $110/hr 2-man, $160/hr 3-man, **2-hr min**, labor only (no truck), rates for Mar 1–Jan 14, gun safe >300 lb $100, no pianos; no Fla. IM No. shown | [emeraldcoastsmartmovers.com](https://emeraldcoastsmartmovers.com/) | Yes |
| Chosen One Movers | FWB / Pensacola | $160/hr 2 movers, $210/hr 3, $235/hr 4, **+ $160 truck fee**; pianos from $375; cash / e-check / cards; Wisetack financing to $25k | [chosenonemovers.com/faqs](https://www.chosenonemovers.com/faqs/) | Yes |
| Bayside Moving LLC | FWB / Midway | $150/hr 2 movers, 2-hr min | [moveBuddha FWB](https://www.movebuddha.com/movers/fl/fort-walton-beach/) | No (third-party) |
| Rowe's Moving Logistics | Pensacola | $200/hr 3 movers, 2-hr min, $200 truck fee, no deposit | [Yahoo Local](https://local.yahoo.com/moving/article/best-moving-companies-pensacola-florida-140056972.html) | No. rowesmoving.com shows no prices |
| Family First Moving & Storage | Pensacola | $149–189/hr, 5-hr min | Yahoo Local (above) | No |
| Stewart Moving & Storage | Pensacola | $210/hr, 4-hr min, $75 fuel charge (per Yahoo). Its own page publishes a **cost guide by bedroom count** (1BR ~$685 … 4BR ~$2,895), the format to copy | [stewartmovingandstorage.com/pensacola](https://www.stewartmovingandstorage.com/pensacola) | Guide yes; rate no |
| Two Men and a Truck | Pensacola / Destin | $200 Mon–Thu / $215 Fri–Sat per hr (per Yahoo) | Yahoo Local; Destin page blocked fetch (403) | No |
| Emerald Coast Moving & Storage | SRB / Destin / Navarre | No rates; "free estimates"; schema priceRange "$0–$1000" | [emeraldcoastmoving.com/about-us/faq](https://emeraldcoastmoving.com/about-us/faq/) | Yes (no prices) |
| Aggregators | Destin / FWB / Navarre / Pensacola | moveBuddha Destin avg $105/hr, studio ≈ $414 (2 movers × 3 h × $147); HireAHelper labor-only FWB $87.68/hr, Navarre $86.35/hr | [moveBuddha Destin](https://www.movebuddha.com/move-costs/fl/destin/), [HireAHelper FWB](https://www.hireahelper.com/movers/fort-walton-beach_fl/), [HireAHelper Navarre](https://www.hireahelper.com/movers/navarre_fl/) | n/a |

**Read:** most local full-service movers **hide** their rates. The ones that publish (Chosen One,
Smart Moves) are cheaper-looking but add a truck fee or leave the truck out. A published,
all-inclusive, crew-specific rate with real examples and a license number would be the most
complete pricing page in the market. Third-party figures above are unverified, so recheck them
before quoting any number in copy. Per §3.4, never name competitors in copy anyway.

## Sources

- FS ch. 507: [507.03](https://www.flsenate.gov/Laws/Statutes/2025/507.03),
  [507.04](https://www.flsenate.gov/Laws/Statutes/2025/507.04),
  [507.05](https://www.flsenate.gov/Laws/Statutes/2025/507.05),
  [507.06](https://www.flsenate.gov/Laws/Statutes/2025/507.06),
  [507.07](https://www.flsenate.gov/Laws/Statutes/2025/507.07)
- [FDACS: Moving Within Florida](https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida)
- [49 CFR 375.213](https://www.law.cornell.edu/cfr/text/49/375.213),
  [49 CFR 375.407](https://www.law.cornell.edu/cfr/text/49/375.407),
  [Appendix A: Your Rights and Responsibilities](https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-375/appendix-Appendix%20A%20to%20Part%20375)
- [SEJ: Google (Mueller) on Product structured data for services](https://www.searchenginejournal.com/google-on-use-of-product-structured-data-for-a-services-business/479159/)
- [Google Search Central: structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google Business Profile Help: Manage your services](https://support.google.com/business/answer/9455399?hl=en)
- [Profound: AI platform citation patterns](https://www.tryprofound.com/blog/ai-platform-citation-patterns)
  and [Leapd summary of the Ahrefs / seoClarity AIO citation data](https://www.leapd.ai/blog/ai-visibility/how-chatgpt-google-ai-overviews-and-perplexity-source-information-in-2026)
- Aggarwal et al., "GEO: Generative Engine Optimization" (KDD 2024), [arXiv:2311.09735](https://arxiv.org/abs/2311.09735)
