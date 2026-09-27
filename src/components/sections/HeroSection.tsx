'use client'

import { useRef, type CSSProperties } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, ShieldCheck } from 'lucide-react'
import { BUSINESS, HERO_CONTENT, IMAGES, LICENSE_DISPLAY, TRUST_BADGES } from '@/lib/content'
import { trackPhoneClick } from '@/lib/gtag'

const HeroMotionLayer = dynamic(() => import('./HeroMotionLayer'))

// CSS-driven stagger (see .hero-fade-up in globals.css). The hero copy is the
// page's LCP element, so it must render server-side and animate without JS.
const fadeDelay = (seconds: number) => ({ '--fade-delay': `${seconds}s` }) as CSSProperties

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const bgParallaxRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={heroRef} className="relative flex min-h-screen w-full items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* ken-burns CSS handles prefers-reduced-motion via @media in globals.css */}
        <div ref={bgParallaxRef} className="absolute inset-0 size-full ken-burns">
          <Image
            src="/images/hero-van.jpg"
            alt={IMAGES.hero.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-brand-navy/92 via-brand-navy/75 via-45% to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-brand-navy/55 from-0% via-transparent via-30% to-brand-navy/65 to-100%" />

      <div className="relative z-20 w-full px-6 pb-24 pt-28">
        <div className="w-full max-w-xl">
          <p
            style={fadeDelay(0.05)}
            className="hero-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 font-body text-xs font-semibold text-on-dark backdrop-blur-sm"
          >
            <ShieldCheck className="size-3.5 shrink-0 text-brand-teal" strokeWidth={1.8} aria-hidden />
            {LICENSE_DISPLAY.heroTrustBadge}
          </p>

          <p
            style={fadeDelay(0.1)}
            className="hero-fade-up mb-4 font-body text-sm font-semibold uppercase tracking-[0.22em] text-brand-gold"
          >
            {HERO_CONTENT.eyebrow}
          </p>

          <div style={fadeDelay(0.2)} className="hero-fade-up ticker-mask mb-4 max-w-lg">
            <div className="ticker-locations">
              <span className="whitespace-nowrap font-body text-xs uppercase tracking-widest text-brand-gold">
                {HERO_CONTENT.locationTicker.join(' · ')}{' ·  '}
              </span>
            </div>
          </div>

          <h1
            style={fadeDelay(0.3)}
            className="hero-slide-up mb-6 font-heading text-5xl font-bold leading-tight md:text-7xl"
          >
            <span className="sr-only">Movers in Santa Rosa Beach, FL — </span>
            <span className="block text-on-dark">Your Move,</span>
            <span className="block text-brand-gold italic">Our Mission.</span>
          </h1>

          <p
            style={fadeDelay(0.45)}
            className="hero-fade-up mb-8 max-w-xl font-body text-lg leading-relaxed text-on-dark/90"
          >
            {BUSINESS.subheadline}
          </p>

          <div style={fadeDelay(0.6)} className="hero-fade-up mb-7 flex flex-row flex-wrap gap-3">
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
          </div>

          <div style={fadeDelay(0.75)} className="hero-fade-up flex flex-wrap gap-2">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge.label}
                className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-body text-xs font-medium text-on-dark backdrop-blur-sm"
              >
                ✓ {badge.label}
              </span>
            ))}
          </div>

          <p
            style={fadeDelay(0.85)}
            className="hero-fade-up mt-4 font-body text-xs font-medium text-brand-teal"
          >
            {BUSINESS.ownerStatement}
          </p>
        </div>
      </div>

      <HeroMotionLayer heroRef={heroRef} bgParallaxRef={bgParallaxRef} />
    </section>
  )
}
