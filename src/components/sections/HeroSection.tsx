'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { IMAGES } from '@/lib/content'

const HeroMotionLayer = dynamic(() => import('./HeroMotionLayer'))

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

      <HeroMotionLayer heroRef={heroRef} bgParallaxRef={bgParallaxRef} />
    </section>
  )
}
