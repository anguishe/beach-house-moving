'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Phone, ChevronDown, ShieldCheck, Heart, Star } from 'lucide-react'
import { BUSINESS, TRUST_BADGES } from '@/lib/content'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollY, [0, 700], [0, prefersReducedMotion ? 0 : 180])

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
  })

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
            alt="Beach House Moving branded van at a beachfront home on the Florida Panhandle"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 100vw"
            style={{
              objectFit: 'cover',
              objectPosition: '75% center',
            }}
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

          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0.1)}
            className="font-body text-[#2A9D8F] font-semibold text-sm uppercase tracking-[0.22em] mb-4"
          >
            Walton · Okaloosa · Bay Counties
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
                Inlet Beach, FL &nbsp;·&nbsp; Miramar Beach, FL &nbsp;·&nbsp; Santa Rosa Beach, FL &nbsp;·&nbsp; PCB, FL &nbsp;·&nbsp; Niceville, FL &nbsp;·&nbsp; Destin, FL &nbsp;·&nbsp; Fort Walton Beach, FL &nbsp;·&nbsp;&nbsp;
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

      {/* ── GLASSMORPHISM BADGE — bottom right, desktop only ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5, ease: 'easeOut' }}
        className="hidden lg:flex absolute bottom-28 right-12 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-[12px] items-center gap-3.5 z-20"
      >
        <div className="w-14 h-14 rounded-[8px] overflow-hidden flex-shrink-0 relative">
          <Image
            src="/images/hero-van.jpg"
            alt="Beach House Moving branded van"
            fill
            sizes="56px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
          <p className="font-body font-semibold text-white text-sm leading-tight">Beach House Moving</p>
          <p className="font-body text-white/55 text-xs mt-0.5">Florida Panhandle&apos;s Premier Movers</p>
        </div>
      </motion.div>

      {/* ── WHY US CARD — bottom left, desktop only ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.7, duration: 0.5, ease: 'easeOut' }}
        className="hidden lg:block absolute bottom-28 left-12 bg-white/8 backdrop-blur-md border border-white/15 p-4 rounded-[12px] z-20"
      >
        {[
          { icon: ShieldCheck, color: '#2A9D8F',  label: 'Licensed & Insured' },
          { icon: Heart,       color: '#E85D3D',  label: 'Locally Owned & Operated' },
          { icon: Star,        color: '#E9C46A',  label: '5-Star Rated Service' },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 font-body text-white text-sm font-medium ${i > 0 ? 'mt-3 pt-3 border-t border-white/10' : ''}`}
          >
            <item.icon
              className="h-4 w-4 flex-shrink-0"
              style={{ color: item.color }}
              strokeWidth={1.5}
            />
            {item.label}
          </div>
        ))}
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
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-white/35" strokeWidth={1.5} />
        </motion.div>
      </div>

    </section>
  )
}
