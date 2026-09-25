'use client'

import { useEffect } from 'react'

import { recordFirstTouch } from '@/lib/lead-source'

/** Renders nothing; records first-touch lead source once per page load. */
export function LeadSourceTracker() {
  useEffect(() => {
    recordFirstTouch()
  }, [])
  return null
}
