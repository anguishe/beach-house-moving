'use client'

import type { ReactNode } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'

import { inViewFadeUp } from '@/lib/motion'

type MotionRevealProps = {
  children: ReactNode
  index?: number
  className?: string
  style?: React.CSSProperties
}

/** Client-only scroll-reveal wrapper — keeps parent sections as server components. */
export function MotionReveal({ children, index = 0, className, style }: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div {...inViewFadeUp(prefersReducedMotion, index)} className={className} style={style}>
        {children}
      </m.div>
    </LazyMotion>
  )
}
