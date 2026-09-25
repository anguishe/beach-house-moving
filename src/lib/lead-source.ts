'use client'

import type { LeadSource } from './schema'

/*
 * First-touch attribution without undoing the 2026-08-31 GBP UTM 301.
 * src/proxy.ts drops a `bhm_src=gbp` cookie on the redirect; the first page a
 * visitor lands on records that (or the external referrer / UTM tags) in
 * localStorage for 30 days. Forms send it along; nothing leaves the browser
 * unless the visitor submits a form.
 */

const KEY = 'bhm_first_touch'
const TTL_MS = 30 * 24 * 60 * 60 * 1000

type Stored = Omit<LeadSource, 'page'> & { at: number }

function read(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Stored
    return Date.now() - parsed.at < TTL_MS ? parsed : null
  } catch {
    return null
  }
}

/** Call once per page load. Keeps the first touch; a fresh GBP visit overrides an older direct one. */
export function recordFirstTouch(): void {
  try {
    const params = new URLSearchParams(location.search)
    const src = /(?:^|;\s*)bhm_src=([^;]+)/.exec(document.cookie)?.[1]
    const existing = read()
    if (existing && !(src && existing.src !== src)) return
    const ref = document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : ''
    const touch: Stored = {
      at: Date.now(),
      src,
      referrer: ref.slice(0, 300),
      landing: location.pathname.slice(0, 300),
      utmSource: params.get('utm_source')?.slice(0, 300) ?? undefined,
      utmCampaign: params.get('utm_campaign')?.slice(0, 300) ?? undefined,
    }
    localStorage.setItem(KEY, JSON.stringify(touch))
  } catch {
    // Storage blocked (private mode etc.) — attribution is best-effort.
  }
}

export function getLeadSource(): LeadSource {
  const stored = read()
  const page = typeof location === 'undefined' ? undefined : location.pathname
  if (!stored) return { page }
  return {
    src: stored.src,
    referrer: stored.referrer,
    landing: stored.landing,
    utmSource: stored.utmSource,
    utmCampaign: stored.utmCampaign,
    page,
  }
}
