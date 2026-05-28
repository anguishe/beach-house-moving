'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { BUSINESS, NAV_LINKS } from '@/lib/content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        .bhm-nav-desktop { display: none; }
        .bhm-nav-mobile-only { display: flex; }
        .bhm-nav-md-show { display: none; }
        .bhm-nav-md-divider { display: none; }
        .bhm-sticky-mobile { display: flex; }
        @media (min-width: 768px) {
          .bhm-nav-md-show { display: flex; }
          .bhm-nav-md-divider { display: block; }
        }
        @media (min-width: 1024px) {
          .bhm-nav-desktop { display: flex; }
          .bhm-nav-mobile-only { display: none !important; }
          .bhm-sticky-mobile { display: none !important; }
        }
      `}</style>

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
          backgroundColor: scrolled ? 'rgba(27, 43, 75, 0.96)' : 'rgba(27, 43, 75, 0.15)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              textDecoration: 'none',
            }}
          >
            <Image
              src="/images/logo-light.png"
              alt="Beach House Moving"
              width={120}
              height={40}
              priority
              style={{ height: '38px', width: 'auto', display: 'block' }}
            />
          </a>

          {/* Desktop nav links */}
          <div className="bhm-nav-desktop" style={{ alignItems: 'center', gap: '36px' }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.78)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            {/* Phone number — desktop only */}
            <a
              href={BUSINESS.phone.href}
              className="bhm-nav-md-show"
              style={{
                alignItems: 'center',
                gap: '7px',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: 'rgba(255,255,255,0.90)',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.90)')}
            >
              <Phone
                style={{ width: '14px', height: '14px', color: '#2A9D8F', flexShrink: 0 }}
                strokeWidth={1.8}
              />
              {BUSINESS.phone.display}
            </a>

            {/* Thin divider — desktop only */}
            <div
              className="bhm-nav-md-divider"
              style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.15)' }}
            />

            {/* Get a Free Quote CTA — desktop only */}
            <a
              href="#quote"
              className="bhm-nav-md-show"
              style={{
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#E85D3D',
                color: '#FFFFFF',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '0.03em',
                padding: '9px 18px',
                borderRadius: '8px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 12px rgba(232,93,61,0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C94828'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(232,93,61,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#E85D3D'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(232,93,61,0.35)'
              }}
            >
              Get a Free Quote
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="bhm-nav-mobile-only"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
              aria-label="Open menu"
            >
              <Menu style={{ width: '20px', height: '20px' }} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 99,
          }}
        />
      )}

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '300px',
          backgroundColor: '#1B2B4B',
          zIndex: 100,
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
        }}
      >
        {/* Drawer header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <Image
            src="/images/logo-light.png"
            alt="Beach House Moving"
            width={110}
            height={36}
            style={{ height: '34px', width: 'auto' }}
          />
          <button
            onClick={() => setMobileOpen(false)}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#FFFFFF', display: 'flex', alignItems: 'center' }}
          >
            <X style={{ width: '18px', height: '18px' }} strokeWidth={1.8} />
          </button>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '40px' }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                color: 'rgba(255,255,255,0.80)',
                fontSize: '17px',
                fontWeight: 500,
                textDecoration: 'none',
                padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'block',
                letterSpacing: '0.01em',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Tap to call */}
        <a
          href={BUSINESS.phone.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            backgroundColor: '#2A9D8F',
            color: '#FFFFFF',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            padding: '16px',
            borderRadius: '10px',
            textDecoration: 'none',
            marginBottom: '12px',
            boxShadow: '0 4px 20px rgba(42,157,143,0.35)',
          }}
        >
          <Phone style={{ width: '18px', height: '18px' }} strokeWidth={1.8} />
          {BUSINESS.phone.display}
        </a>

        {/* Get a quote */}
        <a
          href="#quote"
          onClick={() => setMobileOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E85D3D',
            color: '#FFFFFF',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            padding: '16px',
            borderRadius: '10px',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(232,93,61,0.35)',
          }}
        >
          Get a Free Quote
        </a>

        {/* License badge */}
        <p style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          color: 'rgba(255,255,255,0.30)',
          fontSize: '11px',
          textAlign: 'center',
          marginTop: 'auto',
          paddingTop: '32px',
          lineHeight: '1.6',
        }}>
          Licensed & Insured · Santa Rosa Beach, FL
        </p>
      </div>

      {/* ── STICKY MOBILE BOTTOM CTA ── */}
      <a
        href={BUSINESS.phone.href}
        className="bhm-sticky-mobile"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          backgroundColor: '#2A9D8F',
          color: '#FFFFFF',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          paddingTop: '16px',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
          textDecoration: 'none',
        }}
      >
        <Phone style={{ width: '18px', height: '18px' }} strokeWidth={1.8} />
        Call Now — {BUSINESS.phone.display}
      </a>
    </>
  )
}
