# Search findings audit (2026-10-03)

Source: Travis's signed-out (incognito) searches near Destin on 2026-10-03 at about 3:30 PM CDT (F1–F9), checked against the
code, the live site, Search Console (API), the URL Inspection API and a Places API Maps grid (below). Competitor names and raw
results are kept privately, outside this public repo. **Re-check date: 2026-10-17.**

## Findings → status → owner

| ID | What showed | Verified status | Owner |
|---|---|---|---|
| F1 | `movers santa rosa beach fl`, Google organic: BHM on **page 2 (~#17)** for a Destin-area searcher | **Real, and location-dependent.** GSC's 28-day average for the same query is #3.6, because it blends every searcher and BHM ranks higher close to Santa Rosa Beach. For Destin-area searchers the homepage is not on page 1 yet. The attended rank-snapshot baseline (10/04) records the checking machine's location. | Code (Wave 2/3 below) + time |
| F2 | Same query, Places tab: BHM #6 of 6, "Open 24 hours", Website button only, no pin | Expected for a service-area business with a hidden address (no Directions, no pin). The gap is reviews (14 vs 41–520 for the others). | Travis/Les (reviews) |
| F3 | AI Mode, "best moving companies in Santa Rosa Beach": BHM #1 in the "nearby cities" section | Google files BHM as "just outside" SRB because of the hidden address. The site schema already sets `addressLocality: Santa Rosa Beach`. **Fixed 10/03:** `areaServed` now also lists 30A and the Walton beach communities (`scripts/check-area-served.mjs`). | Code (done) + time |
| F3b | AI Mode paraphrased "double the speed of traditional crews" | Traced to a real customer review (twice as fast as their last mover). Fine to quote with attribution; never turn it into a BHM claim. | none |
| F4 | `moving company 30a`, organic: BHM page 1, lower half | Holding. Local Facebook-group threads also rank for this query (an off-site, owner-only decision; never scrape or republish Facebook content). | Travis/Les (optional) |
| F5 | `military pcs movers eglin afb` (localized Eglin AFB): BHM organic #2 behind a .mil page | Holding. Snippet still shows the old "Licensed #IM4125" text; the live page has "Fla. Mover Reg. No. IM4125". Recrawl requested in the 10/04 GSC block. Title keeps "\| BHM" (it ranks #2; not worth the risk). | Time |
| F6 | Bing, `movers santa rosa beach fl`: organic #4, **absent from Bing's local pack** | Bing Places listing is not live (awaiting publish since 9/27). Likeliest cause of F8. | **Travis** (Bing Places support chat, Mon–Fri) |
| F7 | Bing, `movers near santa rosa beach fl`: only ads captured | Not measured. Re-capture with F6 after Bing Places publishes. | Travis |
| F8 | ChatGPT (logged out), "best movers Santa Rosa Beach": BHM not named | ChatGPT search leans on Bing's business data, so this depends on F6. Re-test about 2 weeks after Bing Places publishes. | Time, after F6 |
| F9 | Google Maps, `movers near Santa Rosa Beach FL`: BHM not found | Matches the Maps grid below: BHM's Maps visibility is strong only within a few miles of Santa Rosa Beach. | Reviews + time |

Stale titles and descriptions (handoff item A): the live HTML matches `main` (title "Santa Rosa Beach Movers, 30A & Storage |
Beach House Moving"; PCS description with the statutory wording). Search engines show older text until they recrawl. IndexNow
fires on every production build; the homepage and PCS recrawl requests are first in the 10/04 GSC block.

## Indexing (URL Inspection API, 2026-10-03)
Discovered but never crawled: the Walton County hub, Santa Rosa Beach, 30A, Miramar Beach, Destin, junk removal. Unknown to
Google: Navarre, piano moving. Internal links are not the cause (homepage, footer and indexed guides link all of them).
Requests: SRB, 30A, Miramar and junk removal on 10/02; the Walton hub on 10/03 (then the account-wide daily quota ran out).
The rest are queued for 10/04 in `~/Projects/docs/GSC-INDEXING-QUEUE.md`.

## Maps grid baseline (Places API Text Search, 2026-10-03)
BHM's position in the top 20, searched with a 5 km bias at each town. A proxy for the Maps list, not identical to it.
Tool: `~/Projects/docs/tools/rank-snapshot/places_grid.py` (must send `includePureServiceAreaBusinesses: true`, or
service-area businesses like BHM never appear).

| Search | SRB | Seaside/30A | Miramar | Destin | FWB | Navarre | Freeport | PCB |
|---|---|---|---|---|---|---|---|---|
| movers | 5 | >20 | 7 | >20 | >20 | >20 | >20 | >20 |
| moving company | 4 | 8 | 9 | >20 | >20 | >20 | 8 | >20 |
| piano movers | **1** | **1** | 4 | 3 | 11 | >20 | **1** | not in 5 |
| junk removal | >20 | >20 | >20 | >20 | >20 | >20 | >20 | >20 |

Town searches from that town: movers santa rosa beach fl **4**; movers miramar beach fl **5**; piano movers santa rosa
beach **1**; piano movers destin 9; junk removal santa rosa beach 15; movers 30a, destin fl, fort walton beach, navarre fl,
panama city beach, eglin air force base movers, office movers destin, storage santa rosa beach, same day movers destin and
home organizer santa rosa beach: not in the results returned.

Read: piano moving already wins Maps around SRB/30A. General "movers" visibility drops off a few miles from SRB. Junk
removal is invisible everywhere even though the leaders there have few reviews, so that's relevance, not prominence: the
GBP category was only added 10/02. Re-check on 10/17.
