# Manual actions — Sept 2026 batch

Shipped and live as of 2026-09-08. Commit `70abbf5`, pushed to `main`, deployed on Vercel.

## Done automatically

- [x] 11 modified / 9 new files committed and pushed
- [x] Vercel deploy live — all four new URLs return 200
- [x] IndexNow: **200, 64 URLs** submitted to Bing + Yandex
- [x] `llms.txt`, `sitemap.xml`, and `robots.txt` live and carrying the new routes

## Google Search Console — 4 of 10 requested

The property is `sc-domain:beachhousemoving.xyz` and it lives on the **anguisheh1@gmail.com**
Chrome profile (deviceId `7b769056-f05a-4478-9949-e6f928a2bcda`), not the anguishetv one.

**Indexing requested and confirmed** — all four brand-new URLs, each returned
"Indexing requested — URL was added to a priority crawl queue":

- [x] `/services/mounting-installation`
- [x] `/services/loading-unloading-help`
- [x] `/services/design-trade-installation`
- [x] `/resources/field-notes-design-trade-install-week-emerald-coast`

All four reported "URL is unknown to Google" beforehand, which is expected for pages
minutes old.

**Sitemap resubmitted** — `https://beachhousemoving.xyz/sitemap.xml`, "Sitemap submitted
successfully", submitted date now Sep 9 2026.

### Still to do — 6 URLs

These are already-indexed pages whose content changed. They matter less than the four
above, and the refreshed `lastmod` in the sitemap will pull Google back to them anyway,
but requesting speeds it up:

5. `https://beachhousemoving.xyz/services`
6. `https://beachhousemoving.xyz/`
7. `https://beachhousemoving.xyz/service-areas/walton-county/miramar-beach`
8. `https://beachhousemoving.xyz/service-areas/walton-county/santa-rosa-beach`
9. `https://beachhousemoving.xyz/service-areas/okaloosa-county/niceville`
10. `https://beachhousemoving.xyz/service-areas/walton-county/sandestin`

A GSC tab is left open on that profile. The URL-inspection search box only reliably
accepts input from the **Overview** page — from a result page it silently swallows
typing, which is what stopped the automated run.

### Two sitemap findings

1. `https://beachhousemoving.xyz/sitemap.xml` showed **"Couldn't fetch", 0 pages**. The
   file itself is fine — it returns `HTTP 200`, `application/xml`, 11,362 bytes to a
   Googlebot user-agent, and `robots.txt` points at the right URL. The failed entry was
   submitted before the deploy finished, so the resubmit above should clear it. **Check
   the status again in a day**; if it still says "Couldn't fetch", that is a real problem
   worth chasing.
2. There is a **duplicate, stale entry** for `https://beachhousemoving.xyz/sitemap.xml/`
   — with a trailing slash — last read Jul 19 2026, 55 pages. That URL now 308-redirects
   to the canonical one. Worth deleting from GSC so the reporting is not split across two
   entries; left in place because removing it is a settings change.

## Google Business Profile — `docs/GBP-POSTS-2026-09.md`

Ten posts written, scheduled 2026-09-08 → 2026-10-09, roughly two per week. Each has
its square image filename, the post copy, and the CTA button and destination.

Alongside the posts:
1. **Upload all 7 squares to the Photos tab** — `~/Downloads/bhm-image-batch-sep08/gbp/`.
   Profile photos and post photos are counted separately by Google; do both.
2. **Add three services** so the profile matches the site (descriptions are in the doc):
   Design Trade Delivery & Installation, U-Haul & Rental Truck Help,
   Mounting & Installation.
3. **Confirm the website field is the bare URL** with no UTM string. `src/proxy.ts`
   301s the UTM-tagged homepage, so a tagged link just adds a redirect hop.

Facebook crops (1080×1350) are in `~/Downloads/bhm-image-batch-sep08/fb/` if you want
the same run on the FB page.

## Optional — Bing Webmaster Tools

`ping-indexnow.mjs` also submits to the Bing Webmaster API when `BING_API_KEY` is set.
It is not set, so that step skipped. IndexNow already covers Bing; the API adds
per-URL submission data. Add the key to Vercel env if you want it.

## Photo requests for the owners

From `npm run audit:images`, in priority order:

1. **Military PCS secondary image** — the only empty slot on the site. Any Eglin or
   Hurlburt base-area job.
2. **A TV mount, take-down-and-replace** — `/services/mounting-installation` is
   borrowing two other photos. Highest-volume consumer keyword of the three new
   services and it has no photo of its own.
3. **Landscape (16:9) shots in Freeport, Lynn Haven, and Bluewater Bay** — Freeport and
   Lynn Haven currently share one photo, Niceville and Bluewater Bay share another.

## Open decisions

- **Neighborhood hero aspect ratio.** 20 of 26 neighborhood heroes are portrait photos
  rendering into a 16:9 box, so they show as centre-cropped strips. One line on the
  neighborhood template fixes all of them. Needs a design call.
- **Drapery hardware.** Owners confirmed hardware for art, mirrors, and TV mounts.
  Drapery rods were never explicitly confirmed, so copy routes it through Keith's
  in-person look rather than claiming it. Worth a direct question.
- **Rental agreement wording.** Copy says only that authorised-driver terms get settled
  at booking. True and safe, but vague. A concrete process line would convert better.
