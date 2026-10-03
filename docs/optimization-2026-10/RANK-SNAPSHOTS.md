# Rank snapshots

Signed-out Google checks for the searches in `KEYWORD-MAP.md`. Each row gives Beach House Moving's organic position (and the URL that ranks), whether BHM is in the local 3-pack on the web results, and its position in Google Maps results.

## Baseline (2026-10-03): blocked, not yet measured

The first run hit a Google captcha (`/sorry/`, "unusual traffic from your computer network") on its first page load. Per the method below it stopped right away without collecting any data. The baseline will be re-run after the block expires. Until then, the "Now (GSC)" column in `KEYWORD-MAP.md` (average positions from Search Console) is the best available reference.

| Query | Organic pos (URL) | Local pack (y/n, pos) | Maps pos | Date |
|---|---|---|---|---|
| movers santa rosa beach fl | not measured | not measured | not measured | 2026-10-03 (blocked) |
| movers 30a | not measured | not measured | not measured | 2026-10-03 (blocked) |
| movers miramar beach fl | not measured | not measured | not measured | 2026-10-03 (blocked) |
| piano movers santa rosa beach | not measured | not measured | not measured | 2026-10-03 (blocked) |
| piano movers destin | not measured | not measured | not measured | 2026-10-03 (blocked) |
| junk removal santa rosa beach | not measured | not measured | not measured | 2026-10-03 (blocked) |
| junk removal destin | not measured | not measured | not measured | 2026-10-03 (blocked) |
| movers destin fl | not measured | not measured | not measured | 2026-10-03 (blocked) |
| movers fort walton beach | not measured | not measured | not measured | 2026-10-03 (blocked) |
| movers navarre fl | not measured | not measured | not measured | 2026-10-03 (blocked) |
| movers panama city beach | not measured | not measured | not measured | 2026-10-03 (blocked) |
| eglin air force base movers | not measured | not measured | not measured | 2026-10-03 (blocked) |
| office movers destin | not measured | not measured | not measured | 2026-10-03 (blocked) |
| how much do movers cost santa rosa beach | not measured | not measured | not measured | 2026-10-03 (blocked) |
| storage santa rosa beach | not measured | not measured | not measured | 2026-10-03 (blocked) |
| same day movers destin | not measured | not measured | not measured | 2026-10-03 (blocked) |

The first 10 rows are the 8 priority targets: the piano and junk-removal targets each have two town variants. The last 6 rows are secondary targets.

## Maps baseline (2026-10-03, Places API grid)
Measured without loading google.com: see `docs/SEARCH-FINDINGS-2026-10-03.md` for the full grid. From each named town:
movers santa rosa beach fl **4** · movers miramar beach fl **5** · piano movers santa rosa beach **1** · piano movers destin
**9** · junk removal santa rosa beach **15** · every other row in the table above: not in the results returned. Organic
positions still come from the attended SERP run (after 2026-10-04 13:18). Travis's incognito read on 10/03 (near Destin):
movers santa rosa beach fl organic ~#17 (page 2), Places tab #6; moving company 30a page 1 (~#7–8); military pcs movers eglin
afb organic #2.

## Method

- A clean, **signed-out** browser: Playwright with Chrome and a fresh, empty profile on every run. Never the logged-in Chrome, which personalizes results and inflated BHM's organic positions on 9/27 (#6–7 shown vs #13–14 real).
- Google web search with `hl=en&gl=us`, pages 1–3. The position counts organic results only (ads, "People also ask" and carousels are skipped). Local pack = the "Places"/"Businesses" block on page 1.
- Maps = `google.com/maps/search/<query>`, the first ~20 results, with sponsored listings left out of the count.
- Pacing: 20–40 s random delay between page loads, at most 40 loads per run. No clicks, no form submissions, no logins. Any captcha, "unusual traffic" page or consent wall stops the run, and the captcha is never solved or worked around.
- The tool and the full raw results are kept privately, outside this repo. This file lists only BHM's own positions.

## Caveats

- **Location:** Google localizes results by IP, and the checking machine is in the Florida Panhandle. Positions show what a nearby searcher sees, not a map grid. Location is not spoofed. Maps ranking in particular shifts with the searcher's distance from BHM's hidden business location in Santa Rosa Beach.
- A single signed-out check is one sample. Google results vary by time of day and data center, so treat a move of 1–2 places as noise.
- A row marked `>N` would mean BHM wasn't in the N results checked, either because the page-load budget ran out or because it ranks beyond page 3.

## Rule (Travis, 2026-10-03)
Re-run the snapshot **after every merged BHM SEO PR, plus once a month**, and add a dated row set here. The tool lives
at `~/Projects/docs/tools/rank-snapshot/`: `node rank-snapshot.mjs` to run, `--compare` to diff against the previous
run. Signed out only. If Google shows a captcha, stop for at least 24 h and never work around it.
GSC average positions (`seo-google`) are the fallback number when the SERP check is blocked.
