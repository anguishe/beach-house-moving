import { headers } from 'next/headers'

function getSiteOriginFromEnv(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL)
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`)
  }
  return new URL('http://localhost:3000')
}

/** Resolve the public site origin from the request host or deployment env. */
export async function getSiteOrigin(): Promise<URL> {
  try {
    const headersList = await headers()
    const host =
      headersList.get('x-forwarded-host')?.split(',')[0]?.trim() ??
      headersList.get('host')

    if (host) {
      const protocol = host.includes('localhost') ? 'http' : 'https'
      return new URL(`${protocol}://${host}`)
    }
  } catch {
    // headers() is unavailable during static generation
  }

  return getSiteOriginFromEnv()
}
