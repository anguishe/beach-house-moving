'use client'

import { useEffect, type ElementType, type RefObject } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Phone, ChevronDown, ShieldCheck, Heart, DollarSign, Clock } from 'lucide-react'
import { BUSINESS, HERO_CONTENT, LICENSE_DISPLAY, TRUST_BADGES } from '@/lib/content'
import { trackPhoneClick } from '@/lib/gtag'
import { fadeUpVariants } from '@/lib/motion'

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

  const fadeUp = (delay: number) => fadeUpVariants(prefersReducedMotion, { delay })

  return (
    <>
      <motion.div
        className="absolute bottom-0 left-0 top-0 z-20 w-1 origin-top bg-brand-teal"
        style={{ scaleY: scrollYProgress }}
      />

      <div className="relative z-20 w-full px-6 pb-24 pt-28">
        <div className="w-full max-w-xl">
          <motion.p
            {...fadeUp(0.05)}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 font-body text-xs font-semibold text-on-dark backdrop-blur-sm"
          >
            <ShieldCheck className="size-3.5 shrink-0 text-brand-teal" strokeWidth={1.8} aria-hidden />
            {LICENSE_DISPLAY.heroTrustBadge}
          </motion.p>

          <motion.p
            {...fadeUp(0.1)}
            className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.22em] text-brand-gold"
          >
            {HERO_CONTENT.eyebrow}
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="ticker-mask mb-4 max-w-lg">
            <div className="ticker-locations">
              <span className="whitespace-nowrap font-body text-xs uppercase tracking-widest text-brand-gold">
                {HERO_CONTENT.locationTicker.join(' · ')}{' ·  '}
              </span>
            </div>
          </motion.div>

          <motion.h1 {...fadeUp(0.3)} className="mb-6 font-heading text-5xl font-bold leading-tight md:text-7xl">
            <span className="sr-only">Movers in Santa Rosa Beach, FL — </span>
            <span className="block text-on-dark">Your Move,</span>
            <span className="block text-brand-gold italic">Our Mission.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.45)}
            className="mb-8 max-w-xl font-body text-lg leading-relaxed text-on-dark/90"
          >
            {BUSINESS.subheadline}
          </motion.p>

          <motion.div {...fadeUp(0.6)} className="mb-7 flex flex-row flex-wrap gap-3">
            <Link
              href="/get-a-quote"
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-brand bg-brand-coral px-8 py-4 font-body text-base font-semibold tracking-wide text-white shadow-brand transition-colors duration-200 hover:bg-brand-coral-dark hover:shadow-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Get a Free Quote
            </Link>

            <a
              href={BUSINESS.phone.href}
              onClick={() => trackPhoneClick('hero')}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-brand border-2 border-brand-teal px-8 py-4 font-body text-base font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-brand-teal/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Phone className="size-5 shrink-0 text-brand-teal" strokeWidth={1.5} aria-hidden />
              {BUSINESS.phone.display}
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.75)} className="flex flex-wrap gap-2">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge.label}
                className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-body text-xs font-medium text-on-dark backdrop-blur-sm"
              >
                ✓ {badge.label}
              </span>
            ))}
          </motion.div>

          <motion.p
            {...fadeUp(0.85)}
            className="mt-4 font-body text-xs font-medium text-brand-teal"
          >
            {BUSINESS.ownerStatement}
          </motion.p>
        </div>
      </div>

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
