import type { MetadataRoute } from 'next'

import { BUSINESS } from '@/lib/content'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.name,
    short_name: 'Beach House',
    description: BUSINESS.subheadline,
    start_url: '/',
    display: 'standalone',
    theme_color: '#1B2B4B',
    background_color: '#1B2B4B',
    icons: [
      {
        src: '/images/circular-logo.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
