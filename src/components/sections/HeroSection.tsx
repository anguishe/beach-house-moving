'use client'

import { useRef, type ElementType } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Phone, ChevronDown, ShieldCheck, Heart, DollarSign, Clock } from 'lucide-react'
import { BUSINESS, HERO_CONTENT, IMAGES, LICENSE_DISPLAY, TRUST_BADGES } from '@/lib/content'
import { trackPhoneClick } from '@/lib/gtag'
import { fadeUpVariants } from '@/lib/motion'

const trustBadgeIconMap: Record<string, ElementType> = {
  ShieldCheck,
  Heart,
  DollarSign,
  Clock,
}

const trustBadgeIconColors: Record<string, string> = {
  ShieldCheck: '#2A9D8F',
  Heart: '#E85D3D',
  DollarSign: '#E9C46A',
  Clock: '#2A9D8F',
}

const floatingTrustBadges = TRUST_BADGES.slice(0, 3)

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollY, [0, 700], [0, prefersReducedMotion ? 0 : 180])

  const fadeUp = (delay: number) => fadeUpVariants(prefersReducedMotion, { delay })

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
      }}
    >

      {/* ── BACKGROUND IMAGE ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: bgY,
        }}
      >
        <div
          className={prefersReducedMotion ? '' : 'ken-burns'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            src="/images/hero-van.jpg"
            alt={IMAGES.hero.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[75%_center]"
          />
        </div>
      </motion.div>

      {/* ── GRADIENT OVERLAY — Layer 1: left-side darkening panel ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(27,43,75,0.92) 0%, rgba(27,43,75,0.75) 45%, rgba(27,43,75,0.15) 75%, rgba(27,43,75,0.0) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── GRADIENT OVERLAY — Layer 2: top-to-bottom dark band ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(27,43,75,0.55) 0%, rgba(27,43,75,0.0) 30%, rgba(27,43,75,0.0) 60%, rgba(27,43,75,0.65) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── SCROLL PROGRESS LINE ── */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] origin-top z-20"
        style={{ scaleY: scrollYProgress, backgroundColor: '#2A9D8F' }}
      />

      {/* ── MAIN CONTENT ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          padding: '112px 24px 96px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            width: '100%',
          }}
        >

          {/* License trust badge — above the fold */}
          <motion.p
            {...fadeUp(0.05)}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 font-body text-xs font-semibold text-white/95 backdrop-blur-sm"
          >
            <ShieldCheck className="size-3.5 shrink-0 text-brand-teal" strokeWidth={1.8} aria-hidden />
            {LICENSE_DISPLAY.heroTrustBadge}
          </motion.p>

          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0.1)}
            className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.22em] text-brand-teal"
          >
            {HERO_CONTENT.eyebrow}
          </motion.p>

          {/* Location ticker */}
          <motion.div
            {...fadeUp(0.2)}
            style={{
              overflow: 'hidden',
              width: '100%',
              maxWidth: '520px',
              marginBottom: '16px',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <div className="ticker-locations">
              <span
                className="font-body text-xs uppercase tracking-[0.15em]"
                style={{ whiteSpace: 'nowrap', color: '#E9C46A' }}
              >
                {HERO_CONTENT.locationTicker.join('\u00a0·\u00a0')}{'\u00a0·\u00a0\u00a0'}
              </span>
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...fadeUp(0.3)}
            style={{
              textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 4px 32px rgba(27,43,75,0.6)',
              lineHeight: '1.05',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: '"Playfair Display", Georgia, serif',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 'clamp(2.75rem, 6vw, 5rem)',
              }}
            >
              Your Move,
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: '"Playfair Display", Georgia, serif',
                color: '#E9C46A',
                fontWeight: 700,
                fontStyle: 'italic',
                fontSize: 'clamp(2.75rem, 6vw, 5rem)',
              }}
            >
              Our Mission.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.45)}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: 'rgba(255,255,255,0.82)',
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              lineHeight: '1.7',
              maxWidth: '480px',
              marginBottom: '32px',
              textShadow: '0 1px 8px rgba(0,0,0,0.3)',
            }}
          >
            {BUSINESS.subheadline}
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            {...fadeUp(0.6)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '28px',
            }}
          >
            <a
              href={BUSINESS.phone.href}
              onClick={() => trackPhoneClick('hero')}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              style={{
                backgroundColor: '#E85D3D',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '17px',
                padding: '15px 28px',
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '9px',
                boxShadow: '0 8px 32px rgba(232,93,61,0.4)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <Phone className="h-5 w-5 flex-shrink-0 text-white" strokeWidth={1.5} />
              <span>{BUSINESS.phone.display}</span>
            </a>

            <a
              href="#quote"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              style={{
                border: '2px solid rgba(255,255,255,0.65)',
                color: '#FFFFFF',
                backgroundColor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                textDecoration: 'none',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '17px',
                padding: '15px 28px',
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Get a Free Quote
            </a>
          </motion.div>

          {/* TRUST PILLS */}
          <motion.div
            {...fadeUp(0.75)}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge.label}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.9)',
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  whiteSpace: 'nowrap',
                }}
              >
                ✓ {badge.label}
              </span>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── GLASSMORPHISM BADGE — bottom right, md+ ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.5, duration: 0.5, ease: 'easeOut' }}
        className="pointer-events-none absolute bottom-6 right-6 z-20 hidden items-center gap-3.5 rounded-brand border border-white/20 bg-white/10 p-4 backdrop-blur-md md:flex"
      >
        <div className="w-14 h-14 rounded-[8px] overflow-hidden flex-shrink-0 relative">
          <Image
            src="/images/hero-van.jpg"
            alt=""
            fill
            loading="lazy"
            sizes="56px"
            className="object-cover"
            aria-hidden
          />
        </div>
        <div>
          <p className="font-body font-semibold text-white text-sm leading-tight">{BUSINESS.name}</p>
          <p className="font-body text-white/55 text-xs mt-0.5">{HERO_CONTENT.socialProofTagline}</p>
        </div>
      </motion.div>

      {/* ── TRUST BADGES CARD — bottom left, md+ (pill strip covers mobile) ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.5, duration: 0.5, ease: 'easeOut' }}
        className="pointer-events-none absolute bottom-6 left-6 z-20 hidden rounded-brand border border-white/15 bg-white/8 p-4 backdrop-blur-md md:block"
      >
        {floatingTrustBadges.map((badge, i) => {
          const IconComponent = trustBadgeIconMap[badge.icon]
          const iconColor = trustBadgeIconColors[badge.icon] ?? '#2A9D8F'
          return (
            <div
              key={badge.label}
              className={`flex items-center gap-3 font-body text-white text-sm font-medium ${i > 0 ? 'mt-3 pt-3 border-t border-white/10' : ''}`}
            >
              {IconComponent && (
                <IconComponent
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: iconColor }}
                  strokeWidth={1.5}
                  aria-hidden
                />
              )}
              {badge.label}
            </div>
          )
        })}
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          zIndex: 3,
        }}
      >
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </p>
        <motion.div
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
          }
        >
          <ChevronDown className="w-4 h-4 text-white/35" strokeWidth={1.5} />
        </motion.div>
      </div>

    </section>
  )
}
