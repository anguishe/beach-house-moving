'use client'

import { useEffect } from 'react'

import { trackContact } from '@/lib/gtag'

/** Delegates GA4 `contact` events for every tel: link click site-wide. */
export function TelClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a[href^="tel:"]')
      if (anchor) trackContact()
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
