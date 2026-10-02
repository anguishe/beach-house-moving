// Build-time meta gate — runs as the first step of `npm run postbuild`, so a bad title
// fails `npm run build` locally AND the Vercel deploy. Dependency-free.
//
// Checks every prerendered page in .next/server/app/**/*.html:
//   - <title> present, ≤ 65 chars (CLAUDE.md "Change control and quality gate")
//   - meta description present, ≤ 160 chars
//   - titles unique across pages
// Plus every entry in POSTS (src/content/posts.ts), including future-dated posts that
// publish later via ISR and so are never prerendered at build time.
//
// The same limits are enforced against a live/preview URL by
// ~/Projects/docs/tools/site-gate/site-gate.mjs; this is the in-repo backstop.
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const TITLE_MAX = 65
const DESC_MAX = 160
const appDir = join(process.cwd(), '.next', 'server', 'app')
const errors = []

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
const first = (html, re) => {
  const m = html.match(re)
  return m ? decode(m[1]) : null
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : d.name.endsWith('.html') ? [join(dir, d.name)] : [],
  )
}

if (!existsSync(appDir)) {
  console.error(`[check-meta] ${appDir} not found — run after \`next build\`.`)
  process.exit(1)
}

// Framework error shells (404/500) aren't indexable pages.
const SKIP = new Set(['_not-found', '_global-error', '404', '500'])
const titles = new Map()
let pages = 0

for (const file of walk(appDir)) {
  const route = '/' + relative(appDir, file).split(sep).join('/').replace(/\.html$/, '').replace(/^index$/, '')
  if (SKIP.has(route.slice(1))) continue
  const html = readFileSync(file, 'utf8')
  // Ignore anything robots-noindexed (e.g. /thank-you): it never reaches a SERP.
  const robots = first(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i) || ''
  if (/noindex/i.test(robots)) continue
  pages++
  const title = first(html, /<title[^>]*>([^<]*)<\/title>/i)
  const desc = first(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i)
  if (!title) errors.push(`${route}: missing <title>`)
  else {
    if (title.length > TITLE_MAX) errors.push(`${route}: title ${title.length} chars (>${TITLE_MAX}): "${title}"`)
    titles.set(title, [...(titles.get(title) || []), route])
  }
  if (!desc) errors.push(`${route}: missing meta description`)
  else if (desc.length > DESC_MAX) errors.push(`${route}: description ${desc.length} chars (>${DESC_MAX}): "${desc}"`)
}
for (const [title, routes] of titles) {
  if (routes.length > 1) errors.push(`duplicate title on ${routes.join(', ')}: "${title}"`)
}

// Source check for scheduled posts. posts.ts has no imports, so Node's built-in type
// stripping (Node ≥ 22.18) can load it directly; on older Node this part is skipped.
let postsChecked = 0
try {
  const { POSTS } = await import(new URL('../src/content/posts.ts', import.meta.url).href)
  for (const p of POSTS) {
    postsChecked++
    const t = p.metaTitle ?? p.title
    const d = p.metaDescription ?? p.description
    if (t.length > TITLE_MAX) errors.push(`posts.ts ${p.slug}: title ${t.length} chars (>${TITLE_MAX}) — add a shorter metaTitle`)
    if (d.length > DESC_MAX) errors.push(`posts.ts ${p.slug}: description ${d.length} chars (>${DESC_MAX}) — add a shorter metaDescription`)
  }
} catch (e) {
  console.warn(`[check-meta] skipped POSTS source check (${String(e.message || e).slice(0, 80)})`)
}

if (pages === 0) errors.push('no prerendered HTML pages found under .next/server/app')

if (errors.length) {
  console.error(`[check-meta] FAIL — ${errors.length} problem(s) across ${pages} pages:`)
  for (const e of errors) console.error('  ' + e)
  console.error(`[check-meta] Limits: title ≤ ${TITLE_MAX} (incl. brand suffix), description ≤ ${DESC_MAX}, titles unique.`)
  process.exit(1)
}
console.log(`[check-meta] PASS — ${pages} pages, ${postsChecked} posts: titles ≤ ${TITLE_MAX}, descriptions ≤ ${DESC_MAX}, no duplicate titles.`)
