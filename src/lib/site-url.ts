export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://beachhousemoving.xyz'

/**
 * Resolves the site origin for metadata and absolute URLs.
 * Uses NEXT_PUBLIC_SITE_URL with production apex fallback.
 */
export async function getSiteOrigin(): Promise<URL> {
  return new URL(siteUrl)
}
