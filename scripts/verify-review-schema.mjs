/*
 * Asserts the AggregateRating in the JSON-LD matches the review count/rating
 * the page actually renders — on the live Places path AND on the static
 * TESTIMONIALS fallback. Run after `next build`:
 *
 *   node scripts/verify-review-schema.mjs
 *
 * ponytail: reads the prerendered HTML off disk instead of booting a server;
 * both pages are static, so the build output is the real thing.
 */
import { readFileSync } from 'node:fs'

const PAGES = [
  {
    file: '.next/server/app/index.html',
    label: '/',
    // Carousel header: "5.0 on Google · 13 reviews". Fallback renders
    // TestimonialsSection, which prints no count — schema is checked alone.
    visible: (html) => {
      const m = html.match(/on Google · <!-- -->(\d+)<!-- --> reviews/)
      return m ? { reviewCount: Number(m[1]) } : null
    },
  },
  {
    file: '.next/server/app/reviews.html',
    label: '/reviews',
    // Hero summary: "13 Reviews · 5.0 Average" — rendered on both paths.
    visible: (html) => {
      const m = html.match(/(\d+) Reviews · ([\d.]+) Average/)
      return m ? { reviewCount: Number(m[1]), ratingValue: Number(m[2]) } : null
    },
  },
]

function aggregates(html) {
  const found = []
  for (const [, raw] of html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/gs,
  )) {
    const parsed = JSON.parse(raw)
    for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
      if (node && typeof node === 'object' && node.aggregateRating) {
        found.push(node.aggregateRating)
      }
    }
  }
  return found
}

let failed = 0
const fail = (msg) => {
  console.error(`  ✗ ${msg}`)
  failed++
}

for (const page of PAGES) {
  console.log(`== ${page.label}`)
  const html = readFileSync(new URL(`../${page.file}`, import.meta.url), 'utf8')
  const rated = aggregates(html)
  const visible = page.visible(html)

  if (rated.length === 0) {
    fail('no AggregateRating in JSON-LD')
    continue
  }

  for (const ar of rated) {
    console.log(`  schema: ${ar.reviewCount} reviews · ${ar.ratingValue} avg`)

    // An AggregateRating claiming zero reviews is invalid markup.
    if (!(ar.reviewCount > 0) || !(ar.ratingValue > 0)) {
      fail(`empty aggregate: ${JSON.stringify(ar)}`)
    }
    // Rating must be printable at the 1dp the UI shows.
    if (Number(ar.ratingValue.toFixed(1)) !== ar.ratingValue) {
      fail(`ratingValue ${ar.ratingValue} is not rounded to 1dp`)
    }
    if (visible) {
      console.log(
        `  visible: ${visible.reviewCount} reviews${visible.ratingValue ? ` · ${visible.ratingValue} avg` : ''}`,
      )
      if (ar.reviewCount !== visible.reviewCount) {
        fail(`schema reviewCount ${ar.reviewCount} ≠ visible ${visible.reviewCount}`)
      }
      if (visible.ratingValue !== undefined && ar.ratingValue !== visible.ratingValue) {
        fail(`schema ratingValue ${ar.ratingValue} ≠ visible ${visible.ratingValue}`)
      }
    } else {
      console.log('  visible: no count rendered (static fallback) — schema checked alone')
    }
  }
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`)
  process.exit(1)
}
console.log('\nall review-schema checks passed')
