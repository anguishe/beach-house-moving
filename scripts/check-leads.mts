// Self-check for src/lib/leads.ts (escaping + channel naming). Run: node scripts/check-leads.mts
import assert from 'node:assert/strict'
import { describeSource, escapeHtml, telHref } from '../src/lib/leads.ts'

assert.equal(escapeHtml('<img src=x onerror="a">&\''), '&lt;img src=x onerror=&quot;a&quot;&gt;&amp;&#39;')
assert.equal(escapeHtml(undefined), '')
assert.equal(telHref('(850) 842-1962"><script>'), 'tel:8508421962')
assert.match(describeSource({ src: 'gbp', referrer: 'https://www.google.com/' }), /Business Profile/)
assert.equal(describeSource({ referrer: 'https://www.google.com/' }), 'Google Search')
assert.match(describeSource({ referrer: 'https://chatgpt.com/' }), /AI assistant/)
assert.match(describeSource({ referrer: '' }), /^Direct/)
assert.match(describeSource({ utmSource: 'facebook', utmCampaign: 'fall' }), /Campaign: facebook \/ fall/)
assert.equal(describeSource(undefined), 'Unknown')
console.log('check-leads: ok')
