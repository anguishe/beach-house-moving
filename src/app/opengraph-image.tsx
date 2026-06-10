import { createOgImageResponse } from '@/lib/og-image'

export const runtime = 'edge'
export const alt = 'Beach House Moving — Movers on the Emerald Coast'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return createOgImageResponse({ width: 1200, height: 630, layout: 'landscape' })
}
