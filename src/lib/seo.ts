import type { Metadata } from 'next'

import { BUSINESS } from '@/lib/content'
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

function ogImageUrl(origin: URL): string {
  return new URL('/opengraph-image', origin).toString()
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
  const ogImage = ogImageUrl(metadataBase)

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
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${BUSINESS.name} — Licensed movers serving Walton, Okaloosa & Bay Counties`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [{ url: '/favicon.ico' }],
      apple: [{ url: '/images/logo-dark.png', sizes: '180x180', type: 'image/png' }],
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
export const HOME_METADATA = {
  title: 'Beach House Moving | Movers in Santa Rosa Beach, FL',
  description:
    'Locally owned & fully licensed movers serving Walton, Okaloosa & Bay Counties. Packing, loading, transportation & storage. Get your free quote — (850) 842-1962.',
  path: '/',
} as const
