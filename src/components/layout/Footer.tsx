'use client'

import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { BUSINESS, NAV_LINKS, SOCIAL_LINKS } from '@/lib/content'

function FacebookIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={style}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer
      id="contact-footer"
      style={{ backgroundColor: '#1B2B4B', paddingTop: '64px', paddingBottom: '40px' }}
    >
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '48px',
            marginBottom: '48px',
          }}
          className="footer-grid"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Image
              src="/images/logo-light.png"
              alt="Beach House Moving"
              width={140}
              height={46}
              style={{ height: '40px', width: 'auto', display: 'block' }}
            />
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                color: 'rgba(255,255,255,0.45)',
                fontSize: '13px',
                lineHeight: 1.7,
                maxWidth: '200px',
                margin: 0,
              }}
            >
              {BUSINESS.tagline}
            </p>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                textDecoration: 'none',
                width: 'fit-content',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              <FacebookIcon style={{ width: '15px', height: '15px' }} />
              Facebook
            </a>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Quick Links
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[...NAV_LINKS, { label: 'Get a Quote', href: '#quote' }].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '14px',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Contact Us
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href={BUSINESS.phone.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#2A9D8F')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              >
                <Phone
                  style={{ width: '15px', height: '15px', color: '#2A9D8F', flexShrink: 0 }}
                  strokeWidth={1.8}
                />
                {BUSINESS.phone.display}
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail
                  style={{ width: '15px', height: '15px', color: '#2A9D8F', flexShrink: 0 }}
                  strokeWidth={1.8}
                />
                <span
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '13px',
                  }}
                >
                  {BUSINESS.email}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin
                  style={{
                    width: '15px',
                    height: '15px',
                    color: '#2A9D8F',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                  strokeWidth={1.8}
                />
                <span
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '13px',
                    lineHeight: 1.6,
                  }}
                >
                  {BUSINESS.address.full}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock
                  style={{ width: '15px', height: '15px', color: '#2A9D8F', flexShrink: 0 }}
                  strokeWidth={1.8}
                />
                <span
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '13px',
                  }}
                >
                  {BUSINESS.hours}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            marginBottom: '28px',
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: 'rgba(255,255,255,0.25)',
              fontSize: '12px',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Beach House Moving. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: 'rgba(255,255,255,0.25)',
              fontSize: '12px',
              margin: 0,
            }}
          >
            {BUSINESS.licenseStatement}
          </p>
        </div>
      </div>
    </footer>
  )
}
