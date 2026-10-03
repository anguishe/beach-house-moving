# BHM optimization: design (approved 2026-10-02, Approach A)

Approved by Travis in session on 2026-10-02. Facts this spec relies on are in [README.md](README.md) ("Owner-confirmed
service facts"). The research behind it is kept outside this public repo, in
`~/Projects/docs/bhm-optimization-2026-10/research/` (GSC, GA4, Keyword Planner, competitor reviews, autocomplete,
linkable-asset fact base, observed GBP state).

## Problem
- Google holds back the site: 31 of 64 URLs are "Discovered – currently not indexed", and service and area pages average
  about 1 landing per 90 days with 0 leads.
- The map pack already works: BHM is #1 for Santa Rosa Beach terms, which carry 52% of impressions. But the GBP uses
  3 of 10 categories and only Google's 6 preset services, and has a generic description.
- BHM offers 8 services that exist nowhere online (site or GBP). It also ranks in the map pack for piano, storage and
  home-organizer searches with no page to land on.
- Searchers' top fears (damage and claims, bills above the quote, no-shows, rain and hurricanes, short notice) go
  unanswered by every local competitor.

## Principles
1. **Few strong pages, not many thin ones.** No service × town matrix pages. Each new URL must answer a real query
   cluster and is linked from at least 2 pages Google already indexes.
2. **GBP first.** It doesn't depend on page indexing, and it drives most impressions and leads.
3. **Owner-confirmed facts only.** Claims about BHM come from README.md or Les's answers. Third-party facts (statutes,
   county rules, DoD) need a source URL and an as-of date. No prices beyond the published rate.
4. **Mobile-first conversion.** Phones convert about 6× desktop. The call button and quote CTA sit in the first
   screen of every new page.
5. **Every PR passes site-gate** (preview, 0 new errors) and `check:meta`, under the change-control rules in CLAUDE.md.

## Wave 0: GBP overhaul (no code)
Claude drafts an exact edit list in the GBP doc for Travis to approve; Travis or Claude applies it in the anguishetv
Chrome only after approval.
- **Categories:** keep "Moving service" as primary. Add from Google's own category list (verify exact names in the
  picker) whatever fits confirmed services, e.g. junk removal service, furniture delivery, professional organizer,
  storage. Max 10.
- **Services:** one custom service per confirmed service (19 total: the existing 11 plus the 8 new ones), each with a
  ≤300-character description. Add no prices except the published hourly rate, and only if Travis approves.
- **Description:** rewrite in first person, ≤750 characters: who we are, the towns, #IM4125, owner-operated, and what
  sets BHM apart. No phone number or URL in the text.
- **Service area (20 max):** remove the duplicate "Miramar" entry. Keep Navarre if Les confirms (Q4). Review the low-value
  entries against Keyword Planner town volumes.
- **Posts:** one post per new service as its page ships, linking to that clean URL (no UTM).
- Also: check whether Bing Places and Apple Business Connect profiles exist (listing hygiene; Travis acts).

## Wave 1: service pages
New service pages use the existing `/services/[slug]` template (`SERVICES` in content.ts plus `service-details.ts`).

| Page | Status | Target cluster (Keyword Planner, US) | Notes |
|---|---|---|---|
| `/services/piano-moving` | new | piano movers near me 10K–100K; cost to move a piano 1K–10K; how to move a piano 1K–10K | All pianos, stairs fine, own a piano board (confirmed). GSC already ranks around position 2. |
| `/services/heavy-item-moving` | new hub | gun safe movers / hot tub removal / pool table movers near me 1K–10K each; home gym, peloton, treadmill | One page with a section per item, plus "how to move a ___" FAQ. No weight limits (not confirmed). |
| `/services/office-commercial-moving` | new | office movers near me 1K–10K ($63 bid); office move checklist | "No move too small or too big"; after-hours and weekend at a markup (confirmed; no markup figure). |
| `/services/estate-cleanouts` | new | estate cleanout near me; furniture donation pickup 10K–100K; mattress and appliance disposal | Whole or partial; donations wherever the customer prefers. County bulk-waste facts cited (research). |
| `/services/senior-downsizing-moves` | new | senior move manager 1K–10K; downsizing for seniors | Close coordination with families, no job too small. Links to organizing and estate cleanouts. |
| `/services/vacation-rental-installs` | new, partner page | (no search volume, so it's for referrals) | For owners, property managers and designers; "handles it all". Links the indexed design-trade field note. Walton STR count (sourced) as context. |
| `/services/mounting-installation` | expand | furniture assembly near me 1K–10K | Add a furniture assembly section. No new URL. |
| `/services/loading-unloading-help` | retarget | labor only movers 1K–10K; moving labor; u haul loading help | Title and H1 lead with "Moving labor / labor-only movers". |
| `/services/packing-unpacking` | expand | unpacking service; home organizer near me 1K–10K | Add a home-organizing section ("owners quote it; starts at the listed moving rate"). |
| Navarre page | new, **unblocked (Les: in radius, rank there)** | movers navarre fl 100–1K ($48.62 bid) | Navarre is in Santa Rosa County, so it needs a new county in `SERVICE_AREAS` (a 4th homepage card). Architecture change: update ARCHITECTURE.md. |

Every Wave 1 page:
- H1 and title lead with the search phrase; title ≤ 60 characters including the brand.
- First screen: one-line answer, call button, quote CTA, and a trust line (licensed #IM4125, owner-operated, review
  stars only if live).
- Sections answer the autocomplete and Keyword Planner questions for that cluster. A FAQ block with FAQPage schema
  mirrors the visible FAQ exactly.
- Links: from the homepage services grid, `/services`, and at least 2 indexed posts or pages. Out to related services
  and the relevant town pages.
- Images: real job photos only, passed through the photo-PII gate. If no photo fits, use an existing generic photo, and
  add the gap to the `service-images.ts` TODO for the next batch.
- Update `public/llms.txt`, ARCHITECTURE.md (new routes) and the sitemap (automatic). Add each URL to the GSC indexing
  queue and IndexNow.

## Wave 2: trust assets and guides
| Asset | Type | Basis |
|---|---|---|
| "Is my Florida mover legit?" | resource post | Fla. Stat. ch. 507 (§507.03, .04, .05, .06, .11), the FDACS lookup, the federal 110% rule (interstate only). Show IM4125 in the lookup. |
| Damage and claims promise | section on `/pricing`, `/about` or its own page | **Blocked on Les Q2.** Answers the #1 competitor complaint. |
| "How we keep hourly honest" | section on `/pricing` | Published rate, what the clock covers, drive time. Confirmed rate only. |
| Short-notice and same-day moves | section or page | Confirmed: same-day across all services when available. Bids $30–40. Site already says available 24/7. |
| Rain and hurricane-season policy | guide | Confirmed: they work in rain unless it risks items, and confirm with the customer. Hurricane facts are sourced (NHC dates, Walton zones). |
| PPM/DITY with a civilian mover | expand the PCS field guide | DoD PPM fact sheet (Mar 2026), weight tickets, TMO contacts. ppm/dity move 100–1K. |
| 30A / Sandestin no-move-days calendar | resource post | Rosemary Beach's 21 posted dates plus HOA hour rules, "as posted publicly; confirm with management". Refreshed yearly. |
| Movers-cost guide refresh | edit existing post | how much do movers cost 10K–100K. Fix the Santa Rosa, CA confusion with explicit "Santa Rosa Beach, Florida" wording. |

## Wave 3: measurement and reviews
- Weekly analytics pull: install the existing script as a report-only user timer (no actions).
- Exclude the quote-page bot traffic (about 25/month: direct, desktop, no city) in GA4 reporting.
- Restore GBP attribution: the GBP button URL stays clean, and the site's lead-source field records GBP clicks
  without a UTM (check `lead-source.ts`).
- Mark `generate_lead` and `phone_call_click` as key events from day one. Fill the lead-form dimensions.
- Review velocity: a post-job review-request routine (link plus a ready-to-text message for Les). The target is a steady
  weekly cadence, never incentives.

### Wave 3 additions (2026-10-03, from the search findings and the free tool setup)
- **GA4 Data API is live** for property 539699126 (service account has Viewer; `~/.claude/skills/seo/scripts/ga4_report.py`).
  Baseline numbers live in the private notes (`~/Projects/docs/bhm-optimization-2026-10/`); pull them fresh each month.
- **Maps grid:** `~/Projects/docs/tools/rank-snapshot/places_grid.py` (Places API, 48 searches, under the 100/day cap, no
  captcha risk). Run it monthly next to the attended SERP snapshot.
- **Bing Places publish** (Travis, support chat Mon–Fri): BHM is missing from Bing's local pack, and ChatGPT search leans
  on Bing. Re-test ChatGPT about 2 weeks after it publishes.
- **Reviews are the Maps lever:** 14 reviews vs 41–520 for the pack. A post-job ask routine for Les (a link plus a
  ready-to-text message), never incentives and never scripted review content.
- **Weekly analytics timer** (`scripts/weekly-analytics/run.sh`) is not installed yet. Report-only; needs Travis's OK.

## Out of scope / paused
- ~~Storage revamp: paused~~ Unblocked 2026-10-03 → Wave 2 PR 2.9.
- Paid ads of any kind (Google Ads account 580-086-2043 is for Keyword Planner only).
- Service × town matrix pages.

## Open questions (Les)
Answered 2026-10-03 (README "Les answers"): same-day, damage and claims, coverage, storage, crew page, PPM tickets, same-day
pricing, minimums and drive time, not-to-exceed, estimate signing. Still open: storm rescheduling and cancellation terms,
billing increment, deposits, full-value-protection pricing, per-category storage prices, whether fuel is in the hourly rate,
and the FMCSA reinstatement date (interstate).

## Success criteria
- Wave 0: GBP shows ≥ 8 categories, 19 described services and the new description. Track impressions and calls in GBP
  Performance from that date.
- Wave 1: every new URL is indexed within 30 days (GSC URL Inspection), and each gets its first organic impressions on
  its target cluster.
- 90 days: organic leads plus phone taps from non-home landing pages > 0 (baseline 0), and more reviews than the
  2026-10-02 count (14).
- Every PR: site-gate 0 new errors, check-meta PASS, type-check and lint clean.
