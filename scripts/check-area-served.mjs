#!/usr/bin/env node
// Checks the homepage MovingCompany JSON-LD areaServed covers the core Walton/30A market.
// Usage: node scripts/check-area-served.mjs [base-url]   (default: http://localhost:3000)
const base = process.argv[2] ?? 'http://localhost:3000'
const REQUIRED = ['30A', 'Santa Rosa Beach', 'Seaside', 'Rosemary Beach', 'Inlet Beach', 'Freeport', 'Sandestin']
const html = await (await fetch(`${base}/`)).text()
const names = new Set()
const walk = (n) => {
  if (Array.isArray(n)) return n.forEach(walk)
  if (!n || typeof n !== 'object') return
  if (n.areaServed) for (const a of [].concat(n.areaServed)) names.add(typeof a === 'string' ? a : a.name)
  Object.values(n).forEach(walk)
}
for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) walk(JSON.parse(json))
const missing = REQUIRED.filter((r) => !names.has(r))
if (missing.length) {
  console.error(`FAIL: areaServed missing ${missing.join(', ')}`)
  process.exit(1)
}
console.log(`PASS: areaServed has ${names.size} entries incl. ${REQUIRED.join(', ')}`)
