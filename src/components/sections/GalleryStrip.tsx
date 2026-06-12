'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'

import { GALLERY_PHOTOS } from '@/lib/content'

export function GalleryStrip() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-brand-navy py-12 md:py-16">
      <p className="mb-8 px-4 text-center font-body text-xs font-semibold uppercase tracking-widest text-brand-teal">
        Real Moves · Real People · Real Results
      </p>

      <div className="relative">
        {prefersReducedMotion ? (
          <div
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
            aria-label="Gallery of real moves"
          >
            {GALLERY_PHOTOS.map((photo, index) => (
              <div
                key={`gallery-${index}`}
                className="group relative mx-3 h-52 w-72 shrink-0 snap-start overflow-hidden rounded-brand md:h-64 md:w-96"
              >
                <Image
                  src={photo.src}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 288px, 384px"
                  alt={photo.alt}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-navy/20 transition-colors duration-300 group-hover:bg-transparent" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden" aria-label="Gallery of real moves">
            <div className="flex w-max marquee-track">
              <div className="flex">
                {GALLERY_PHOTOS.map((photo, index) => (
                  <div
                    key={`gallery-${index}`}
                    className="group relative mx-3 h-52 w-72 shrink-0 overflow-hidden rounded-brand md:h-64 md:w-96"
                  >
                    <Image
                      src={photo.src}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 288px, 384px"
                      alt={photo.alt}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-navy/20 transition-colors duration-300 group-hover:bg-transparent" />
                  </div>
                ))}
              </div>
              <div className="flex" aria-hidden="true">
                {GALLERY_PHOTOS.map((photo, index) => (
                  <div
                    key={`gallery-dup-${index}`}
                    className="group relative mx-3 h-52 w-72 shrink-0 overflow-hidden rounded-brand md:h-64 md:w-96"
                  >
                    <Image
                      src={photo.src}
                      fill
                      unoptimized
                      loading="lazy"
                      alt=""
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-navy/20 transition-colors duration-300 group-hover:bg-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-linear-to-r from-brand-navy to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-linear-to-l from-brand-navy to-transparent" />
      </div>
    </section>
  )
}
