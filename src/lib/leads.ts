import { put } from '@vercel/blob'

import type { LeadSource } from './schema'

/*
 * Shared helpers for the quote + contact routes:
 * - escapeHtml: every visitor-supplied value goes through this before it
 *   touches the owner's email HTML (was interpolated raw before 2026-09-25).
 * - describeSource: turns the first-touch data the form sends into one
 *   plain-English channel line for the owner.
 * - backupLead: writes each lead to a private Vercel Blob store so a Resend
 *   failure never loses it. No-op until a Blob store is connected to the
 *   project (BLOB_STORE_ID via OIDC, or BLOB_READ_WRITE_TOKEN).
 */

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function escapeHtml(value: string | null | undefined): string {
  return (value ?? '').replace(/[&<>"']/g, (c) => HTML_ESCAPES[c])
}

/** Digits and a leading + only — safe inside a tel: href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

function hostOf(url: string | undefined): string {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/** Best-guess channel for the owner. Order matters: explicit tags beat referrer. */
export function describeSource(source: LeadSource | undefined): string {
  if (!source) return 'Unknown'
  if (source.src === 'gbp') return 'Google Business Profile (Maps / Search listing)'
  if (source.utmSource) {
    return `Campaign: ${source.utmSource}${source.utmCampaign ? ` / ${source.utmCampaign}` : ''}`
  }
  const host = hostOf(source.referrer)
  if (!host || host === 'beachhousemoving.xyz') return 'Direct (typed the address, bookmark, or app link)'
  if (/google\./.test(host)) return 'Google Search'
  if (/bing\.|duckduckgo\.|yahoo\./.test(host)) return `Search (${host})`
  if (/chatgpt\.|openai\.|perplexity\.|copilot\.|gemini\.|claude\./.test(host)) return `AI assistant (${host})`
  if (/facebook\.|fb\.|instagram\./.test(host)) return 'Facebook / Instagram'
  if (/yelp\./.test(host)) return 'Yelp'
  return `Website link (${host})`
}

/** Email table rows for the "where this lead came from" block. */
export function sourceRows(source: LeadSource | undefined, heardAbout?: string): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding: 6px 0; color: #718096; font-size: 13px; width: 140px;">${label}</td><td style="padding: 6px 0;">${escapeHtml(value)}</td></tr>`
  return [
    row('Channel', describeSource(source)),
    heardAbout ? row('They said', heardAbout) : '',
    source?.landing ? row('First page seen', source.landing) : '',
    source?.page ? row('Submitted on', source.page) : '',
  ].join('')
}

export async function backupLead(kind: 'quote' | 'contact', data: Record<string, unknown>): Promise<void> {
  if (!process.env.BLOB_STORE_ID && !process.env.BLOB_READ_WRITE_TOKEN) return
  try {
    const at = new Date().toISOString()
    await put(`leads/${at.slice(0, 7)}/${at}-${kind}.json`, JSON.stringify({ kind, at, ...data }), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: true,
    })
  } catch (error) {
    // Never block the email on the backup; log the failure type only (no PII).
    console.error('[leads] backup failed:', error instanceof Error ? error.name : 'UnknownError')
  }
}
