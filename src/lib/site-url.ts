import { headers } from 'next/headers'
import { BUSINESS } from '@/lib/content'

const productionOrigin = new URL(BUSINESS.website)

/**
 * Resolves the site origin for metadata and absolute URLs.
 * Priority: NEXT_PUBLIC_SITE_URL → canonical apex (content) → VERCEL_URL / request host.
 * Apex is preferred over preview hosts so canonicals never resolve to *.vercel.app.
 */
export async function getSiteOrigin(): Promise<URL> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (configured) {
    return new URL(configured)
  }

  const apex = BUSINESS.website?.trim()
  if (apex) {
    return new URL(apex)
  }

  const vercelHost = process.env.VERCEL_URL?.trim()
  if (vercelHost) {
    return new URL(`https://${vercelHost}`)
  }

  const headerList = await headers()
  const host = headerList.get('x-forwarded-host') ?? headerList.get('host')
  if (host) {
    const protocol = headerList.get('x-forwarded-proto') ?? 'https'
    return new URL(`${protocol}://${host}`)
  }

  return productionOrigin
}
