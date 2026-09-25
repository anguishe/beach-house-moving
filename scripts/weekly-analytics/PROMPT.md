# BHM weekly analytics pull (headless, run by cron via run.sh)

You are running unattended. Nobody can answer questions. READ-ONLY on every dashboard:
never click Save, Submit, Post, Reply, Request indexing, Delete, Edit, or change any setting.
Only write files inside `docs/analytics/weekly/`. Do not commit, push, or deploy.

Today = `date +%F`. Write the report to `docs/analytics/weekly/<today>.md` and append one
row to `docs/analytics/weekly/ledger.csv` (create with header if missing):
`date,gbp_calls_month,gbp_web_clicks_month,gbp_interactions_month,gsc_clicks_7d,gsc_impr_7d,gsc_pos_7d,home_pos_28d,ga4_leads_7d,ga4_call_taps_7d,thankyou_views_7d,reviews,indexed,not_indexed,places_api`
Read the previous report in that folder (newest file before today) and compare against it.

## Browsers (both already logged in; select directly, do not ask)
- **anguisheh1** — deviceId `7b769056-f05a-4478-9949-e6f928a2bcda`: GSC + GA4.
- **anguishetv** — deviceId `c15cf3f1-8793-4310-9768-0d0dd6a54546`: Google Business Profile.
Use `select_browser`, then `tabs_context_mcp` with createIfEmpty, work in your own tab, close it
when done. If a browser isn't connected, write what you could get and say which part is missing.

## 1. GSC (anguisheh1) — property `sc-domain:beachhousemoving.xyz`
- Performance URL: `https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Abeachhousemoving.xyz&num_of_days=7&metrics=CLICKS%2CIMPRESSIONS%2CCTR%2CPOSITION`
  (also `num_of_days=28`; `&breakdown=page` for pages; `&breakdown=device`).
  Read tables with javascript_tool: `[...document.querySelectorAll('tr')].map(r=>r.innerText.replace(/\s+/g,' '))`.
  Strip `?…`, `=`, `&` from output or the tool blocks it. Set rows-per-page to 100 via the listbox for queries.
- Record: 7d + 28d totals; top 25 queries with position; homepage position; every query that moved
  ≥3 positions vs last report; queries at position 8–20 with ≥20 impressions (page-2 targets).
- Index: `https://search.google.com/search-console/index?resource_id=sc-domain%3Abeachhousemoving.xyz`
  (indexed / not indexed / reasons). Sitemaps page: status + last read.

## 2. GA4 (anguisheh1) — account a393326874, property p539699126 "Beach House Moving"
- Events, last 7 and 28 days: `https://analytics.google.com/analytics/web/#/a393326874p539699126/reports/explorer?r=top-events&params=_u..nav%3Dmaui%26_u.dateOption%3Dlast7Days%26_u.comparisonOption%3DdisabledComparison`
  (swap `last7Days` → `last28Days`). If the table text is blocked, take a screenshot and read it.
  Record: generate_lead, phone_call_click, form_start, page_view, sessions.
- Traffic acquisition (`r=lifecycle-traffic-acquisition-v2`), pages (`r=all-pages-and-screens`): /thank-you
  views = quote submits; /get-a-quote views; channel split incl. "AI Assistant".

## 3. Google Business Profile (anguishetv)
- Open `https://www.google.com/search?q=Beach+House+Moving+Santa+Rosa+Beach`, click the
  "Performance" button in the "Your business on Google" panel (coordinates vary; use find).
  The dialog is a same-origin iframe: read it with
  `[...document.querySelectorAll('iframe')].find(f=>f.src.includes('/local/business/')).contentDocument.body.innerText`
  (strip `=?&`). Click the Calls and Website clicks tabs inside it the same way.
- Record: monthly calls / website clicks / interactions table, profile views, top search terms.
- Reviews: click "Read reviews" (dialog iframe `/customers/reviews`). Record count, and flag any review
  with **no owner reply** (name, stars, text). Do NOT reply. For any new review, check whether that
  reviewer's name is in `TESTIMONIALS` in `src/lib/content.ts`; if missing, flag "add to TESTIMONIALS".

## 4. Site + API checks (Bash)
- `curl -s -o /dev/null -w '%{http_code}'` for /, /get-a-quote, /reviews, /pricing, /sitemap.xml.
- Places API: `set -a; . ./.env.local; set +a;` then
  `curl -s "https://maps.googleapis.com/maps/api/geocode/json?address=Santa+Rosa+Beach+FL&key=$GOOGLE_PLACES_API_KEY"`
  → report status only (OK = billing fixed; REQUEST_DENIED = still broken). Never print the key.
- Does `https://beachhousemoving.xyz/reviews` contain `lh3.googleusercontent` (live reviews on)?

## 5. Report format (`docs/analytics/weekly/<today>.md`)
1. **Headline** — 3 bullets: calls, quote leads, rankings, each with the change vs last week.
2. **Scoreboard table** — this week / last week / change, for every ledger column.
3. **What moved** — queries and pages up or down, new reviews, index changes.
4. **Recommendations** — max 5, ranked, each tied to a number above, each concrete (file or
   dashboard + what to change). Mark which fit the $400 "Leads you can count" step in
   `docs/AUDIT-2026-09-25.md` §4 and which are $500-step material. Include any open item from
   `docs/MANUAL-ACTIONS-2026-09-08.md` that the data shows is still blocking (e.g. Places API).
5. **Couldn't pull** — anything missing and why.
Plain English, short. No customer names in recommendations beyond the unreplied-review flag.
