# Manual actions — Sept 2026 batch

Shipped and live as of 2026-09-08. Commit `70abbf5`, pushed to `main`, deployed on Vercel.

## Done automatically

- [x] 11 modified / 9 new files committed and pushed
- [x] Vercel deploy live — all four new URLs return 200
- [x] IndexNow: **200, 64 URLs** submitted to Bing + Yandex
- [x] `llms.txt`, `sitemap.xml`, and `robots.txt` live and carrying the new routes

## BLOCKED — Google Search Console

Could not reach the property. Browser 4 is signed into three Google accounts and
**none of them has `beachhousemoving.xyz`**:

| authuser | Account | Result |
|---|---|---|
| 0 | anguishetv@gmail.com (Travis Abadie) | "You don't have access to this property"; no properties at all |
| 1 | (second account) | No properties — onboarding screen |
| 2 | (third account, "V") | No properties — onboarding screen |

A GSC tab is left open on Browser 4 ready to go. Sign in with whichever account owns
the property, then request indexing in this order. **The daily quota is roughly 10–12
URL submissions, so this list is exactly one day's worth and is ordered so the most
valuable URLs go first if the quota cuts you off.**

1. `https://beachhousemoving.xyz/services/mounting-installation`
2. `https://beachhousemoving.xyz/services/loading-unloading-help`
3. `https://beachhousemoving.xyz/services/design-trade-installation`
4. `https://beachhousemoving.xyz/resources/field-notes-design-trade-install-week-emerald-coast`
5. `https://beachhousemoving.xyz/services`
6. `https://beachhousemoving.xyz/`
7. `https://beachhousemoving.xyz/service-areas/walton-county/miramar-beach`
8. `https://beachhousemoving.xyz/service-areas/walton-county/santa-rosa-beach`
9. `https://beachhousemoving.xyz/service-areas/okaloosa-county/niceville`
10. `https://beachhousemoving.xyz/service-areas/walton-county/sandestin`

1–4 are brand new and not in the index at all — they matter most. 5–6 changed
structurally. 7–10 gained the new "Recent work in {name}" section.

Also worth doing while you are in there: **resubmit the sitemap** (Sitemaps →
`sitemap.xml` → Submit) so Google re-reads the 45 refreshed `lastmod` dates.

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
