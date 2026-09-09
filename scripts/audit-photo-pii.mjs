#!/usr/bin/env node
/**
 * Read the text inside our photos and flag anything that identifies a customer.
 *
 * This exists because a job photo went to the website and to Google Business
 * Profile with a customer's address plaque — "3508 BURNT PINE LANE" — legible in
 * the frame. GBP pulled the post under its personal-information policy. Filenames
 * and alt text told us nothing, because the leak was in the pixels.
 *
 * Needs tesseract:  sudo apt install -y tesseract-ocr
 * Results are cached in .photo-pii-cache.json, keyed by size+mtime.
 *
 *   node scripts/audit-photo-pii.mjs [dir ...]
 */
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, extname, basename } from 'node:path'

const DIRS = process.argv.slice(2).length ? process.argv.slice(2) : ['public/images']
const CACHE = '.photo-pii-cache.json'

try {
  execFileSync('tesseract', ['--version'], { stdio: 'ignore' })
} catch {
  console.error('tesseract is not installed — this check cannot run.\n')
  console.error('  sudo apt install -y tesseract-ocr\n')
  console.error('Until it is installed, every photo must be reviewed full-size by hand')
  console.error('before it is wired in. See the photo-privacy rule in CLAUDE.md.')
  process.exit(1)
}

// Things that identify a customer or their home.
const PATTERNS = [
  [/\b\d{2,6}\s+[A-Z][A-Za-z]{2,}\s+(LANE|LN|DRIVE|DR|STREET|ST|AVENUE|AVE|COURT|CT|BOULEVARD|BLVD|ROAD|RD|WAY|CIRCLE|CIR|TERRACE|TER|PLACE|PL|TRAIL|TRL)\b/i, 'street address'],
  [/\b(LANE|DRIVE|STREET|AVENUE|COURT|BOULEVARD|TERRACE|CIRCLE)\b/i, 'street-name word'],
  [/^\s*\d{3,6}\s*$/m, 'standalone number (house number?)'],
  [/\b[A-Z]{3}[\s-]?\d{3,4}\b/, 'licence-plate shape'],
  [/\b(INVOICE|STATEMENT|ACCOUNT NO|POLICY|ROUTING|SSN|DOB)\b/i, 'document text'],
  [/\b[\w.+-]+@[\w-]+\.[a-z]{2,}\b/i, 'email address'],
]

// Our own branding is on the trucks and the shirts — never a finding.
const OURS = [/850[\s.-]?842[\s.-]?1962/, /BEACH\s*HOUSE\s*MOVING/i, /beachhousemoving/i, /IM4125/i]

const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {}
const findings = []
let scanned = 0

for (const dir of DIRS) {
  for (const f of readdirSync(dir)) {
    if (!/\.(jpe?g|png)$/i.test(extname(f))) continue
    const path = join(dir, f)
    const st = statSync(path)
    const key = `${path}:${st.size}:${Math.round(st.mtimeMs)}`
    let text = cache[key]
    if (text === undefined) {
      try {
        // Upscale first — plaques and signs are small in frame and OCR misses them at 1x.
        text = execFileSync('sh', ['-c',
          `convert ${JSON.stringify(path)} -resize 200% -colorspace Gray -sharpen 0x1 png:- | tesseract stdin stdout 2>/dev/null`
        ], { encoding: 'utf8', maxBuffer: 8 << 20 })
      } catch { text = '' }
      cache[key] = text
    }
    scanned++

    const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 2)
    for (const line of lines) {
      if (OURS.some((re) => re.test(line))) continue
      for (const [re, label] of PATTERNS) {
        if (re.test(line)) { findings.push({ file: basename(path), label, line }); break }
      }
    }
  }
}

writeFileSync(CACHE, JSON.stringify(cache))
console.log(`scanned ${scanned} images in ${DIRS.join(', ')}`)

if (!findings.length) {
  console.log('no customer-identifying text detected')
  process.exit(0)
}
console.log(`\n${findings.length} possible leak(s) — look at each one full-size before shipping:\n`)
for (const f of findings) console.log(`  ${f.file}\n    ${f.label}: "${f.line}"`)
console.log('\nOCR guesses. Confirm by eye, then redact at the master and rebuild every variant.')
process.exit(1)
