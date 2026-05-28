'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { BUSINESS, SERVICE_AREAS } from '@/lib/content'

export function ServiceAreaSection() {
  return (
    <section id="areas" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center md:mb-16">
          <p
            className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-[#2A9D8F]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Where We Work
          </p>
          <h2
            className="font-heading text-3xl font-bold text-brand-navy md:text-4xl"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#1B2B4B',
              fontWeight: 700,
            }}
          >
            Serving the Florida Panhandle
          </h2>
          <div className="mx-auto my-4 h-[2px] w-10 rounded-full bg-[#2A9D8F]" />
          <p className="mx-auto max-w-2xl font-body text-lg text-ink-muted">
            From 30A to Panama City, from Fort Walton to Crestview — we know every road, every
            neighborhood.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICE_AREAS.map((area, index) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group overflow-hidden rounded-brand shadow-brand transition-all duration-300 hover:shadow-brand-hover">
                <div
                  className="relative overflow-hidden bg-[#1B2B4B]"
                  style={{ aspectRatio: '16/9' }}
                >
                  <Image
                    src={area.image}
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'center center', padding: '4px' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    alt={`Beach House Moving serving ${area.county}`}
                    className="transition-transform duration-500 group-hover:scale-103"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-brand-teal px-3 py-1.5 font-body text-xs font-semibold text-white">
                    {area.county}
                  </span>
                </div>

                <div className="bg-white p-6">
                  <h3
                    className="mb-2 font-heading text-xl font-bold text-brand-navy"
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: '#1B2B4B',
                      fontWeight: 700,
                    }}
                  >
                    {area.county}
                  </h3>
                  <p
                    className="mb-4 font-body text-sm leading-relaxed text-ink-muted"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#4A5568' }}
                  >
                    {area.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {area.cities.map((city) => (
                      <span
                        key={city}
                        className="rounded-full bg-brand-sand px-2.5 py-1 font-body text-xs font-medium text-brand-navy"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          className="mt-14 rounded-brand bg-brand-sand p-8 text-center md:p-12"
          style={{ backgroundColor: '#F5F0E8', borderRadius: '12px', padding: '48px', textAlign: 'center', marginTop: '56px' }}
        >
          <h3
            className="mb-3 font-heading text-2xl font-bold text-brand-navy md:text-3xl"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Not sure if we serve your area?
          </h3>
          <p className="mb-6 font-body text-base text-ink-muted">
            Give us a call — if we can get there, we will.
          </p>
          <a
            href={BUSINESS.phone.href}
            className="inline-flex items-center gap-2.5 rounded-[12px] bg-[#1B2B4B] px-8 py-4 font-body font-semibold text-white transition-all duration-300 hover:bg-[#2A9D8F] hover:shadow-[0_8px_32px_rgba(42,157,143,0.3)]"
            style={{ backgroundColor: '#1B2B4B', color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, padding: '16px 32px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Phone className="h-4 w-4 text-white" strokeWidth={1.5} />
            Call {BUSINESS.phone.display}
          </a>
        </div>
      </div>
    </section>
  )
}
