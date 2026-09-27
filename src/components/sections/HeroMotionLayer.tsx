'use client'

import { useEffect, type ElementType, type RefObject } from 'react'
import Image from 'next/image'
import { motion, useMotionValueEvent, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ChevronDown, ShieldCheck, Heart, DollarSign, Clock } from 'lucide-react'
import { BUSINESS, HERO_CONTENT, TRUST_BADGES } from '@/lib/content'

const trustBadgeIconMap: Record<string, ElementType> = {
  ShieldCheck,
  Heart,
  DollarSign,
  Clock,
}

const trustBadgeIconClass: Record<string, string> = {
  ShieldCheck: 'text-brand-teal',
  Heart: 'text-brand-coral',
  DollarSign: 'text-brand-gold',
  Clock: 'text-brand-teal',
}

const floatingTrustBadges = TRUST_BADGES.slice(0, 3)

type Props = {
  heroRef: RefObject<HTMLElement | null>
  bgParallaxRef: RefObject<HTMLDivElement | null>
}

// The hero copy itself lives (server-rendered) in HeroSection; this layer only
// adds the JS-dependent decoration: parallax, scroll progress, floating cards.
export default function HeroMotionLayer({ heroRef, bgParallaxRef }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollY, [0, 700], [0, prefersReducedMotion ? 0 : 180])

  useMotionValueEvent(bgY, 'change', (latest) => {
    const layer = bgParallaxRef.current
    if (!layer) return
    layer.style.transform = latest === 0 ? 'none' : `translate3d(0, ${latest}px, 0)`
  })

  useEffect(() => {
    const layer = bgParallaxRef.current
    if (!layer) return
    const latest = bgY.get()
    layer.style.transform = latest === 0 ? 'none' : `translate3d(0, ${latest}px, 0)`
  }, [bgY, bgParallaxRef])

  return (
    <>
      <motion.div
        className="absolute bottom-0 left-0 top-0 z-20 w-1 origin-top bg-brand-teal"
        style={{ scaleY: scrollYProgress }}
      />

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.5, duration: 0.5, ease: 'easeOut' }}
        className="pointer-events-none absolute bottom-6 right-6 z-20 hidden items-center gap-3.5 rounded-brand border border-white/20 bg-white/10 p-4 backdrop-blur-md md:flex"
      >
        <div className="relative size-14 shrink-0 overflow-hidden rounded-brand">
          <Image
            src="/images/circular-logo.png"
            alt="Beach House Moving logo"
            fill
            loading="lazy"
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-body text-sm font-semibold leading-tight text-on-dark">{BUSINESS.name}</p>
          <p className="mt-0.5 font-body text-xs text-on-dark-muted">{HERO_CONTENT.socialProofTagline}</p>
        </div>
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.5, duration: 0.5, ease: 'easeOut' }}
        className="pointer-events-none absolute bottom-6 left-6 z-20 hidden rounded-brand border border-white/15 bg-white/8 p-4 backdrop-blur-md md:block"
      >
        {floatingTrustBadges.map((badge, i) => {
          const IconComponent = trustBadgeIconMap[badge.icon]
          const iconClass = trustBadgeIconClass[badge.icon] ?? 'text-brand-teal'
          return (
            <div
              key={badge.label}
              className={`flex items-center gap-3 font-body text-sm font-medium text-on-dark ${i > 0 ? 'mt-3 border-t border-white/10 pt-3' : ''}`}
            >
              {IconComponent && (
                <IconComponent className={`size-4 shrink-0 ${iconClass}`} strokeWidth={1.5} aria-hidden />
              )}
              {badge.label}
            </div>
          )
        })}
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1">
        <p className="font-body text-xs uppercase tracking-widest text-on-dark-muted">Scroll</p>
        <motion.div
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
          }
        >
          <ChevronDown className="size-4 text-on-dark-muted" strokeWidth={1.5} aria-hidden />
        </motion.div>
      </div>
    </>
  )
}
