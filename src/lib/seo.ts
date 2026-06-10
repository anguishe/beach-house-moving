import type { Metadata } from 'next'

import { BUSINESS, PAGE_META } from '@/lib/content'
import { getSiteOrigin } from '@/lib/site-url'

export type BuildMetadataOptions = {
  title: string
  description: string
  /** Route path, e.g. "/" or "/about" */
  path: string
}

function normalizePath(path: string): string {
  if (path === '/') return '/'
  return path.startsWith('/') ? path : `/${path}`
}

/**
 * Consistent metadata for every indexable page: title, description,
 * self-referential canonical, robots, Open Graph, and Twitter cards.
 */
export async function buildMetadata({
  title,
  description,
  path,
}: BuildMetadataOptions): Promise<Metadata> {
  const metadataBase = await getSiteOrigin()
  const canonicalPath = normalizePath(path)
  const url =
    canonicalPath === '/'
      ? `${metadataBase.origin}/`
      : new URL(canonicalPath, metadataBase).toString()
  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'en_US',
      siteName: BUSINESS.name,
      images: [
        {
          url: 'https://beachhousemoving.xyz/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${BUSINESS.name} — Licensed & Insured Movers on the Florida Panhandle`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: 'https://beachhousemoving.xyz/opengraph-image',
          alt: `${BUSINESS.name} — Licensed & Insured Movers on the Florida Panhandle`,
        },
      ],
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/images/circular-logo.png', sizes: '1024x1024', type: 'image/png' },
        { url: '/images/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  }
}

/** Metadata for pages that should not be indexed (e.g. thank-you). */
export async function buildNoIndexMetadata(
  options: BuildMetadataOptions,
): Promise<Metadata> {
  const metadata = await buildMetadata(options)
  return {
    ...metadata,
    robots: {
      index: false,
      follow: false,
    },
  }
}

/** Homepage defaults — used by root layout generateMetadata. */
export const HOME_METADATA = PAGE_META.home
