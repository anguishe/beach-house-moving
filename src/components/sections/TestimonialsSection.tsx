'use client'

import { motion } from 'framer-motion'
import { Phone, Star } from 'lucide-react'
import { BUSINESS, FLAGS, TESTIMONIALS_PLACEHOLDER } from '@/lib/content'
import { trackPhoneClick } from '@/lib/gtag'

type TestimonialItem = {
  name: string
  text: string
  location: string
  source: string
}

export function TestimonialsSection() {
  if (!FLAGS.SHOW_TESTIMONIALS) {
    return null
  }

  const testimonials = TESTIMONIALS_PLACEHOLDER as readonly TestimonialItem[]

  return (
    <section id="about" style={{ backgroundColor: '#F5F0E8', padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
            What Our Customers Say
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
            The Panhandle Trusts Beach House Moving
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
              fontSize: '16px',
              lineHeight: 1.7,
            }}
          >
            Real reviews from real neighbors.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '56px',
          }}
        >
          <div style={{ display: 'flex', gap: '3px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                style={{ width: '20px', height: '20px', color: '#E9C46A', fill: '#E9C46A' }}
                strokeWidth={0}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#1B2B4B',
              fontWeight: 700,
              fontSize: '1.25rem',
            }}
          >
            5.0
          </span>
          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#718096',
              fontSize: '14px',
            }}
          >
            on Google
          </span>
        </div>

        {/* TODO: Replace TESTIMONIALS_PLACEHOLDER with verified Google/Facebook reviews before launch */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={`${t.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '28px',
                boxShadow: '0 4px 24px rgba(27,43,75,0.07)',
                border: '1px solid rgba(27,43,75,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', gap: '3px' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    style={{ width: '16px', height: '16px', color: '#E9C46A', fill: '#E9C46A' }}
                    strokeWidth={0}
                  />
                ))}
              </div>

              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#4A5568',
                  fontSize: '15px',
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  flex: 1,
                  margin: 0,
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(27,43,75,0.07)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#2A9D8F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '15px',
                    }}
                  >
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: '#1B2B4B',
                      fontWeight: 600,
                      fontSize: '14px',
                      margin: 0,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: '#718096',
                      fontSize: '12px',
                      margin: 0,
                    }}
                  >
                    {t.location}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    color: '#718096',
                    fontSize: '11px',
                    border: '1px solid rgba(27,43,75,0.12)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    flexShrink: 0,
                  }}
                >
                  {t.source}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#4A5568',
              fontSize: '16px',
              marginBottom: '20px',
            }}
          >
            Join your neighbors across the Florida Panhandle.
          </p>
          <a
            href={BUSINESS.phone.href}
            onClick={() => trackPhoneClick('testimonials-section')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#E85D3D',
              color: '#FFFFFF',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              padding: '15px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(232,93,61,0.3)',
            }}
          >
            <Phone style={{ width: '17px', height: '17px' }} strokeWidth={1.8} />
            Call for Your Free Quote
          </a>
        </div>
      </div>
    </section>
  )
}
