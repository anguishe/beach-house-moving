#!/usr/bin/env node
/**
 * Image slot audit — finds empty slots, duplicate fills, and orphaned assets.
 *
 * Run it against every incoming photo batch (`npm run audit:images`) so new
 * photos land in the slots that are actually starved instead of piling onto
 * the gallery. Informational only — never exits non-zero, never edits files.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const content = read('src/lib/content.ts')
const serviceImages = read('src/lib/service-images.ts')
const servicesSection = read('src/components/sections/ServicesSection.tsx')
const posts = read('src/content/posts.ts')

const slice = (src, startMarker, endMarker) => {
  const a = src.indexOf(startMarker)
  const b = src.indexOf(endMarker, a)
  return a === -1 ? '' : src.slice(a, b === -1 ? undefined : b)
}

// --- IMAGES: key -> src -------------------------------------------------
const imagesBlock = slice(content, 'export const IMAGES = {', '\n} as const')
// Entries are written both multi-line and single-line, so slice key-to-key
// rather than trying to match a closing brace.
const keyToSrc = new Map()
const keyToAllPaths = new Map()
const keyStarts = [...imagesBlock.matchAll(/\n {2}([A-Za-z0-9_]+): \{/g)]
keyStarts.forEach((m, i) => {
  const body = imagesBlock.slice(m.index, keyStarts[i + 1]?.index ?? imagesBlock.length)
  const src = body.match(/src: '([^']+)'/)
  if (src) keyToSrc.set(m[1], src[1])
  keyToAllPaths.set(m[1], [...body.matchAll(/'(\/images\/[^']+)'/g)].map((x) => x[1]))
})
const resolve = (key) => keyToSrc.get(key) ?? `IMAGES.${key} (unresolved)`

// --- slots --------------------------------------------------------------
/** every slot: { kind, owner, src } */
const slots = []

const galleryBlock = slice(content, 'export const GALLERY_PHOTOS = [', '\n] as const')
const galleryKeys = [...galleryBlock.matchAll(/IMAGES\.([A-Za-z0-9_]+)/g)].map((m) => m[1])
galleryKeys.forEach((k, i) => {
  slots.push({ kind: i < 12 ? 'gallery(rendered)' : 'gallery(below fold)', owner: `#${i + 1}`, src: resolve(k) })
})

const nbBlock = slice(content, 'export const NEIGHBORHOODS = [', '\n] as const satisfies')
for (const m of nbBlock.matchAll(/\n {4}slug: '([a-z0-9-]+)',[\s\S]*?\n {4}image: '([^']+)'/g)) {
  slots.push({ kind: 'neighborhood', owner: m[1], src: m[2] })
}

const serviceSlugs = [...slice(content, 'export const SERVICES = [', '\n] as const')
  .matchAll(/\n {4}slug: '([a-z0-9-]+)'/g)].map((m) => m[1])

const mapEntries = (src, marker) => {
  const block = slice(src, marker, '\n}')
  const out = new Map()
  for (const m of block.matchAll(/\n {2}'?([a-z0-9-]+)'?: IMAGES\.([A-Za-z0-9_]+)/g)) out.set(m[1], m[2])
  return out
}
const primary = mapEntries(serviceImages, 'export const SERVICE_IMAGE_MAP')
const secondary = mapEntries(serviceImages, 'export const SERVICE_SECONDARY_IMAGE_MAP')
const card = mapEntries(servicesSection, 'const serviceImageMap')
for (const [slug, k] of primary) slots.push({ kind: 'service:hero', owner: slug, src: resolve(k) })
for (const [slug, k] of secondary) slots.push({ kind: 'service:secondary', owner: slug, src: resolve(k) })
for (const [slug, k] of card) slots.push({ kind: 'service:card', owner: slug, src: resolve(k) })

for (const m of posts.matchAll(/\n {4}slug: '([a-z0-9-]+)',[\s\S]*?\n {4}heroImage: '([^']+)'/g)) {
  slots.push({ kind: 'post:hero', owner: m[1], src: m[2] })
}
for (const m of posts.matchAll(/\n {8}image: '([^']+)'/g)) {
  slots.push({ kind: 'post:inline', owner: '(body)', src: m[1] })
}

// --- report -------------------------------------------------------------
const problems = { empty: [], duplicate: [], shape: [], deadKey: [], unplaced: [] }

for (const slug of serviceSlugs) {
  if (slug === 'junk-removal') continue // bespoke page, reads primary only
  if (!primary.has(slug)) problems.empty.push(`service:hero      ${slug}`)
  if (!secondary.has(slug)) problems.empty.push(`service:secondary ${slug}`)
  if (!card.has(slug)) problems.empty.push(`service:card      ${slug}  (homepage grid renders nothing)`)
}

// duplicates across DIFFERENT owners; the gallery is allowed to repeat by design
const bySrc = new Map()
for (const s of slots) {
  if (s.kind.startsWith('gallery')) continue
  if (!bySrc.has(s.src)) bySrc.set(s.src, [])
  bySrc.get(s.src).push(s)
}
// A photo doing double duty inside ONE service (hero + card) is cosmetic.
// The same photo standing in for two different places or two different services
// is the one that actually undercuts the page — rank them apart.
for (const [src, uses] of bySrc) {
  if (uses.length < 2) continue
  const owners = new Set(uses.map((u) => u.owner))
  const geo = uses.filter((u) => u.kind === 'neighborhood')
  const line = `${src}\n      ${uses.map((u) => `${u.kind} → ${u.owner}`).join('\n      ')}`
  if (geo.length > 1) problems.duplicate.push(`[HIGH] two location pages share this\n    ${line}`)
  else if (owners.size > 1) problems.duplicate.push(`[MED]  reused across pages\n    ${line}`)
  else problems.duplicate.push(`[LOW]  same page's hero and card\n    ${line}`)
}
problems.duplicate.sort()

// Orphan detection scans the whole tree — an asset can be referenced from any
// component, from metadata, or from a manifest, not just the data layer.
const walk = (dir) => {
  const out = []
  for (const e of readdirSync(dir)) {
    const full = join(dir, e)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else if (/\.(ts|tsx|mjs|js|json|txt|webmanifest)$/.test(e)) out.push(full)
  }
  return out
}
const srcRoot = new URL('../src', import.meta.url).pathname
const publicRoot = new URL('../public', import.meta.url).pathname
const haystack = [...walk(srcRoot), ...walk(publicRoot)].map((f) => readFileSync(f, 'utf8')).join('\n')

const slotSrc = new Set(slots.map((s) => s.src))
for (const [key, src] of keyToSrc) {
  if (!new RegExp(`IMAGES\\.${key}\\b`).test(haystack)) {
    const alsoLiteral = slotSrc.has(src) ? '  (file IS used, but by literal path — wire the key or drop it)' : ''
    problems.deadKey.push(`IMAGES.${key}  ${src}${alsoLiteral}`)
  }
}
// Files carried by a live IMAGES key (logos, hero, fleet) render through
// components rather than a tracked content slot — they are placed, just not here.
// Take every path a live key mentions, not just its `src` — IMAGES.logo also
// carries `footer` and `navbar` variants that nothing else points at.
const liveKeySrc = new Set(
  [...keyToAllPaths]
    .filter(([k]) => new RegExp(`IMAGES\\.${k}\\b`).test(haystack))
    .flatMap(([, paths]) => paths),
)
const bankedBlock = serviceImages.slice(serviceImages.indexOf('// TODO: batch'))
const onDisk = readdirSync(new URL('../public/images', import.meta.url))
  .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
for (const f of onDisk) {
  const p = `/images/${f}`
  if (slotSrc.has(p) || liveKeySrc.has(p)) continue
  // Icons and social cards are wired through metadata, not a content slot.
  if (/^(apple-touch-icon|icon-|favicon|og-)/.test(f)) continue
  problems.unplaced.push(`${p}${bankedBlock.includes(f) ? '  (banked in service-images.ts)' : ''}`)
}

// --- shape check ---------------------------------------------------------
// Neighborhood heroes render into a fixed 16:9 box. A portrait photo dropped in
// there gets centre-cropped to a strip, which is how a good shot becomes a bad
// header. Read dimensions straight from the file header — no dependency needed.
const dimensions = (file) => {
  let buf
  try {
    buf = readFileSync(join(publicRoot, 'images', file))
  } catch {
    return null
  }
  if (buf[0] === 0x89 && buf[1] === 0x50) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null
  let i = 2
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i += 1; continue }
    const marker = buf[i + 1]
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) }
    }
    i += 2 + buf.readUInt16BE(i + 2)
  }
  return null
}
for (const s2 of slots.filter((x) => x.kind === 'neighborhood')) {
  const d = dimensions(s2.src.replace('/images/', ''))
  if (d && d.w / d.h < 1.3) {
    problems.shape.push(`${s2.owner}  ${s2.src}  ${d.w}x${d.h} — needs 16:9 landscape, will crop to a strip`)
  }
}

const section = (title, rows) => {
  console.log(`\n${title} — ${rows.length}`)
  if (!rows.length) console.log('  none')
  for (const r of rows) console.log(`  • ${r}`)
}
console.log(`Image slot audit — ${slots.length} slots, ${keyToSrc.size} IMAGES entries, ${onDisk.length} files on disk`)
section('EMPTY SLOTS (nothing assigned)', problems.empty)
section('DUPLICATE FILLS (same photo in two different slots)', problems.duplicate)
section('WRONG SHAPE (portrait photo in a 16:9 hero slot)', problems.shape)
section('DEAD IMAGES KEYS (registry entry nothing reads)', problems.deadKey)
section('UNPLACED PHOTOS (on disk, in no slot — this is the pool to fill from)', problems.unplaced)
console.log(
  '\nOrder of work: fill EMPTY slots, then break HIGH/MED duplicates, ' +
    'drawing from UNPLACED. Retire dead keys last.',
)
