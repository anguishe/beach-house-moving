'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * GtmPageView — fires a page_view event to GTM dataLayer on every
 * client-side route change in the Next.js App Router.
 *
 * GTM must have a Custom Event trigger on "page_view" connected to
 * the GA4 Configuration tag (or a separate GA4 Event tag).
 *
 * Alternatively, configure a "History Change" trigger in GTM and
 * disable this component (comment out in layout.tsx) — GTM's
 * History Change trigger handles the same function natively.
 *
 * See: https://support.google.com/tagmanager/answer/7679322 (History Change)
 */
export function GtmPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the very first render — GTM fires page_view on initial load automatically
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push({
      event: 'page_view',
      page_path: url,
      page_title: document.title,
    })
  }, [pathname, searchParams])

  return null
}
