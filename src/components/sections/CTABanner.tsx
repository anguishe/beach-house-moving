'use client'

import { Phone } from 'lucide-react'

export function CTABanner() {
  return (
    <section style={{ backgroundColor: '#E85D3D', padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(255,255,255,0.65)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px' }}>
          Don&apos;t Stress the Move
        </p>

        <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', marginBottom: '16px', lineHeight: 1.1 }}>
          Ready to get moving?
        </h2>

        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(255,255,255,0.75)', fontSize: '17px', marginBottom: '48px', lineHeight: 1.6 }}>
          Call us today for a free, no-obligation estimate. Available 7 days a week.
        </p>

        <a
          href="tel:+18508421962"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: '#FFFFFF',
            color: '#E85D3D',
            textDecoration: 'none',
            padding: '22px 44px',
            borderRadius: '14px',
            boxShadow: '0 20px 60px rgba(27,43,75,0.2)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 28px 80px rgba(27,43,75,0.28)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(27,43,75,0.2)' }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#E85D3D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Phone style={{ width: '22px', height: '22px', color: '#FFFFFF' }} strokeWidth={1.8} />
          </div>
          <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1 }}>
            (850) 842-1962
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
          <span style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>or</span>
          <a href="#quote" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Fill out a quote form →
          </a>
        </div>

      </div>
    </section>
  )
}
