import { headers } from 'next/headers'
import { BUSINESS } from '@/lib/content'

const productionOrigin = new URL(BUSINESS.website)

/**
 * Resolves the site origin for metadata and absolute URLs.
 * Prefers NEXT_PUBLIC_SITE_URL, then the incoming request host (preview deploys),
 * then VERCEL_URL, then the canonical production URL from content.
 */
export async function getSiteOrigin(): Promise<URL> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (configured) {
    return new URL(configured)
  }

  const headerList = await headers()
  const host = headerList.get('x-forwarded-host') ?? headerList.get('host')
  if (host) {
    const protocol = headerList.get('x-forwarded-proto') ?? 'https'
    return new URL(`${protocol}://${host}`)
  }

  const vercelHost = process.env.VERCEL_URL?.trim()
  if (vercelHost) {
    return new URL(`https://${vercelHost}`)
  }

  return productionOrigin
}
