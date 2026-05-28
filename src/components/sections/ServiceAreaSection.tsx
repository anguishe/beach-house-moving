'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { BUSINESS, SERVICE_AREAS } from '@/lib/content'

export function ServiceAreaSection() {
  return (
    <section id="areas" style={{ backgroundColor: '#FFFFFF', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#2A9D8F',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Where We Work
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#1B2B4B',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              marginBottom: '16px',
              lineHeight: 1.15,
            }}
          >
            Serving the Florida Panhandle
          </h2>
          <div
            style={{
              width: '40px',
              height: '2px',
              backgroundColor: '#2A9D8F',
              margin: '0 auto 20px',
            }}
          />
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#4A5568',
              fontSize: '17px',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            From 30A to Panama City — we know every road, every neighborhood.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {SERVICE_AREAS.map((area, index) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(27,43,75,0.07)',
                border: '1px solid rgba(27,43,75,0.06)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '58%',
                  backgroundColor: '#1B2B4B',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={area.image}
                  alt={`Beach House Moving serving ${area.county}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'contain', objectPosition: 'center center' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    backgroundColor: '#2A9D8F',
                    color: '#FFFFFF',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    borderRadius: '999px',
                  }}
                >
                  {area.county}
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: '#1B2B4B',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    marginBottom: '8px',
                    lineHeight: 1.2,
                  }}
                >
                  {area.county}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    color: '#4A5568',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    marginBottom: '16px',
                  }}
                >
                  {area.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {area.cities.map((city) => (
                    <span
                      key={city}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        color: '#1B2B4B',
                        fontSize: '12px',
                        fontWeight: 500,
                        backgroundColor: '#F5F0E8',
                        padding: '4px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: '#F5F0E8',
            borderRadius: '16px',
            padding: '56px 48px',
            textAlign: 'center',
            marginTop: '72px',
          }}
        >
          <h3
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#1B2B4B',
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              marginBottom: '12px',
            }}
          >
            Not sure if we serve your area?
          </h3>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#4A5568',
              fontSize: '16px',
              marginBottom: '28px',
              lineHeight: 1.6,
            }}
          >
            Give us a call — if we can get there, we will.
          </p>
          <a
            href={BUSINESS.phone.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              backgroundColor: '#1B2B4B',
              color: '#FFFFFF',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              padding: '15px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(27,43,75,0.2)',
            }}
          >
            <Phone style={{ width: '17px', height: '17px' }} strokeWidth={1.8} />
            Call {BUSINESS.phone.display}
          </a>
        </div>
      </div>
    </section>
  )
}
