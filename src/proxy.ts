import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * 301 the GBP-tagged homepage onto the clean URL.
 * Google indexed /?utm_source=google&utm_medium=organic&utm_campaign=gbp as a
 * separate page (2,064 impressions in GSC vs 1,236 for the clean homepage),
 * splitting homepage equity. GBP Insights still counts the website clicks;
 * GA4 sessions fall back to google/organic — accepted trade-off (2026-08-31).
 * Since 2026-09-25 a `bhm_src=gbp` cookie carries the source into quote emails.
 */
export function proxy(request: NextRequest) {
  const { nextUrl } = request
  if (
    nextUrl.pathname === '/' &&
    nextUrl.searchParams.get('utm_source') === 'google' &&
    nextUrl.searchParams.get('utm_campaign') === 'gbp'
  ) {
    const clean = nextUrl.clone()
    clean.searchParams.delete('utm_source')
    clean.searchParams.delete('utm_medium')
    clean.searchParams.delete('utm_campaign')
    const res = NextResponse.redirect(clean, 301)
    // First-party flag so quote emails can still say "came from GBP" (see src/lib/lead-source.ts).
    res.cookies.set('bhm_src', 'gbp', { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' })
    return res
  }
  return NextResponse.next()
}

export const config = { matcher: '/' }
