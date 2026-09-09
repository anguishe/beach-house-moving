#!/usr/bin/env node
/**
 * Turn docs/GBP-POSTS-<month>.md into a paste-ready posting folder:
 * one post-NN.txt (body only — select all, paste) beside its post-NN.jpg,
 * plus a README.txt index with dates, buttons, and destination URLs.
 *
 * The markdown stays the single source of truth. Re-run after editing it.
 *   node scripts/gbp-kit.mjs <posts.md> <image-dir>
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'

const [mdPath, imageDir] = process.argv.slice(2)
if (!mdPath || !imageDir) {
  console.error('usage: node scripts/gbp-kit.mjs <posts.md> <image-dir>')
  process.exit(1)
}

const md = readFileSync(mdPath, 'utf8')
const outDir = join(imageDir, 'posts')
mkdirSync(outDir, { recursive: true })

// Split on the post headings; everything before the first one is preamble.
const chunks = md.split(/^### Post (\d+) — (\w+ [\d-]+)\s*$/m).slice(1)
const posts = []
for (let i = 0; i < chunks.length; i += 3) {
  const [num, date, body] = [chunks[i], chunks[i + 1], chunks[i + 2]]
  const photo = body.match(/\*\*Photo:\*\*\s*`([^`]+)`/)?.[1]
  const button = body.match(/\*\*Button:\*\*\s*([^→]+)→\s*`([^`]+)`/)
  // Quoted lines are the post copy. Blank ">" lines are paragraph breaks.
  const copy = body
    .split('\n')
    .filter((l) => l.startsWith('>'))
    .map((l) => l.replace(/^>\s?/, ''))
    .join('\n')
    .trim()
  posts.push({ num: String(num).padStart(2, '0'), date, photo, copy,
    cta: button?.[1].trim(), url: button?.[2] })
}

const warnings = []
for (const p of posts) {
  // GBP hard-caps a post at 1500 chars and truncates the feed preview near 80.
  if (p.copy.length > 1500) warnings.push(`post ${p.num}: ${p.copy.length} chars — over GBP's 1500 limit`)
  const preview = p.copy.split('\n')[0]
  if (preview.length > 80) warnings.push(`post ${p.num}: first line is ${preview.length} chars, feed cuts at ~80`)
  // A phone number in the body is a known GBP rejection trigger; the profile and the
  // post button already give people a way to call.
  if (/\d{3}[-.\s]?\d{4}/.test(p.copy)) warnings.push(`post ${p.num}: phone number in the body — GBP rejects these`)

  // Body first so a select-all-copy grabs it clean; the footer below the rule is
  // what you set in the GBP composer, not what you paste.
  const footer = [
    '',
    '-'.repeat(60),
    'Everything above this line is the post body — select to here and paste.',
    '',
    `BUTTON: ${p.cta}`,
    `LINK:   ${p.url}`,
    `PHOTO:  post-${p.num}.jpg`,
    `DATE:   ${p.date}`,
  ].join('\n')
  writeFileSync(join(outDir, `post-${p.num}.txt`), p.copy + '\n' + footer + '\n')
  const src = join(imageDir, p.photo)
  if (existsSync(src)) copyFileSync(src, join(outDir, `post-${p.num}.jpg`))
  else warnings.push(`post ${p.num}: image not found — ${p.photo}`)
}

const index = [
  `Google Business Profile posting kit — ${posts.length} posts`,
  `Generated from ${mdPath.replace(dirname(mdPath) + '/', '')}. Do not edit these files; edit the markdown and re-run.`,
  '',
  'Each post is a pair: post-NN.txt is the body (select all, paste into GBP),',
  'post-NN.jpg is the photo. Set the button and URL from the table below.',
  '',
  ...posts.map((p) =>
    [`post-${p.num}  ${p.date}`,
     `  photo:  post-${p.num}.jpg  (${p.photo})`,
     `  button: ${p.cta} → ${p.url}`,
     `  length: ${p.copy.length} chars`].join('\n')
  ),
].join('\n')
writeFileSync(join(outDir, 'README.txt'), index + '\n')

console.log(`wrote ${posts.length} posts to ${outDir}`)
if (warnings.length) {
  console.error('\nwarnings:\n' + warnings.map((w) => '  ' + w).join('\n'))
  process.exit(1)
}
