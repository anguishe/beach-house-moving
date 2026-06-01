'use client'

import type { ComponentPropsWithoutRef } from 'react'

import { BUSINESS } from '@/lib/content'
import { trackPhoneClick } from '@/lib/gtag'

type TrackedPhoneLinkProps = ComponentPropsWithoutRef<'a'> & {
  location: string
}

/** Client wrapper for tel links in server components — fires GA4 contact events by location. */
export function TrackedPhoneLink({
  location,
  href = BUSINESS.phone.href,
  onClick,
  ...props
}: TrackedPhoneLinkProps) {
  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        trackPhoneClick(location)
        onClick?.(event)
      }}
    />
  )
}
