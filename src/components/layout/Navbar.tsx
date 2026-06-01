'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BUSINESS, IMAGES, LICENSE_DISPLAY, NAV_LINKS } from '@/lib/content'
import { isNavLinkActive } from '@/lib/nav'

const navLinkClass = (active: boolean) =>
  cn(
    'font-body text-sm font-medium tracking-wide whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy rounded-sm',
    active ? 'text-white' : 'text-white/78 hover:text-white',
  )

const drawerLinkClass = (active: boolean) =>
  cn(
    'block border-b border-white/8 py-3.5 font-body text-[17px] font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal',
    active ? 'text-white' : 'text-white/80 hover:text-white',
  )

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    if (mobileOpen) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <>
      <nav
        aria-label="Primary"
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300',
          scrolled
            ? 'border-b border-white/8 bg-brand-navy/96 backdrop-blur-md'
            : 'border-b border-transparent bg-brand-navy/15',
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-8 px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
          >
            <Image
              src="/images/logo-light.png"
              alt={IMAGES.logo.alt}
              width={120}
              height={40}
              priority
              className="block h-[38px] w-auto"
            />
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isNavLinkActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    navLinkClass(active),
                    active && 'border-b-2 border-brand-teal pb-0.5',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <a
              href={BUSINESS.phone.href}
              className={cn(
                'hidden items-center gap-1.5 font-body text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-white md:inline-flex',
                'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy',
              )}
            >
              <Phone className="size-3.5 shrink-0 text-brand-teal" strokeWidth={1.8} aria-hidden />
              {BUSINESS.phone.display}
            </a>

            <span className="hidden h-5 w-px bg-white/15 md:block" aria-hidden />

            <Link
              href="/get-a-quote"
              className={cn(
                'hidden items-center rounded-lg bg-brand-coral px-4 py-2 font-body text-[13px] font-semibold tracking-wide text-white shadow-[0_2px_12px_rgba(232,93,61,0.35)] transition-colors hover:bg-brand-coral-dark md:inline-flex',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy',
              )}
            >
              Get a Quote
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 p-2 text-white lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <Menu className="size-5" strokeWidth={1.8} aria-hidden />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[99] bg-black/50 lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed inset-y-0 right-0 z-[100] flex w-[300px] flex-col overflow-y-auto bg-brand-navy px-7 py-8 transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="mb-10 flex items-center justify-between">
          <Image
            src="/images/logo-light.png"
            alt=""
            width={110}
            height={36}
            loading="lazy"
            className="h-[34px] w-auto"
            aria-hidden
          />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex items-center rounded-md bg-white/10 p-1.5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
            aria-label="Close menu"
          >
            <X className="size-[18px]" strokeWidth={1.8} aria-hidden />
          </button>
        </div>

        <div className="mb-10 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const active = isNavLinkActive(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={drawerLinkClass(active)}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <a
          href={BUSINESS.phone.href}
          className="mb-3 flex items-center justify-center gap-2.5 rounded-[10px] bg-brand-teal px-4 py-4 font-body text-base font-semibold text-white shadow-[0_4px_20px_rgba(42,157,143,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
        >
          <Phone className="size-[18px]" strokeWidth={1.8} aria-hidden />
          {BUSINESS.phone.display}
        </a>

        <Link
          href="/get-a-quote"
          onClick={() => setMobileOpen(false)}
          className="flex items-center justify-center rounded-[10px] bg-brand-coral px-4 py-4 font-body text-base font-semibold text-white shadow-[0_4px_20px_rgba(232,93,61,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
        >
          Get a Quote
        </Link>

        <p className="mt-auto pt-8 text-center font-body text-[11px] leading-relaxed text-white/30">
          {LICENSE_DISPLAY.heroTrustBadge}
        </p>
      </div>

      <a
        href={BUSINESS.phone.href}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2.5 bg-brand-teal px-4 py-4 font-body text-base font-semibold text-white lg:hidden',
          'pb-[calc(1rem+env(safe-area-inset-bottom))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset',
        )}
        aria-label={`Call ${BUSINESS.phone.display}`}
      >
        <Phone className="size-[18px]" strokeWidth={1.8} aria-hidden />
        {LICENSE_DISPLAY.mobileCallBar}
      </a>
    </>
  )
}
