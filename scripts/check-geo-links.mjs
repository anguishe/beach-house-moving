#!/usr/bin/env node
// Geo-link integrity check, run against a running build (`npx next start -p 3917` or a preview URL).
//   node scripts/check-geo-links.mjs <base-url> [required-path ...]
// Fails if a required path isn't 200, or if any /service-areas/ link on a geo page points
// outside the sitemap (catches cross-county "nearby" links built with the wrong county slug).
// ponytail: regex href scan over sitemap geo pages only; widen to all pages if links break elsewhere.
const [base, ...required] = process.argv.slice(2)
if (!base) { console.error('usage: check-geo-links.mjs <base-url> [required-path ...]'); process.exit(2) }
const errors = []
const sm = await (await fetch(`${base}/sitemap.xml`)).text()
const paths = new Set([...sm.matchAll(/<loc>\s*(.*?)\s*<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/'))
for (const p of required) {
  const res = await fetch(base + p, { redirect: 'manual' })
  if (res.status !== 200) errors.push(`${p}: HTTP ${res.status}`)
  if (!paths.has(p)) errors.push(`${p}: not in sitemap`)
}
for (const p of [...paths].filter((p) => p.startsWith('/service-areas'))) {
  const html = await (await fetch(base + p)).text()
  for (const [, href] of html.matchAll(/href="(\/service-areas[^"#?]*)"/g)) {
    const h = href.replace(/\/$/, '')
    if (!paths.has(h)) errors.push(`${p} links ${h}, which is not a sitemap URL`)
  }
}
console.log(errors.length ? `FAIL: ${errors.length}\n  ${[...new Set(errors)].join('\n  ')}` : `PASS: ${paths.size} sitemap URLs, ${required.length} required paths`)
process.exit(errors.length ? 1 : 0)
