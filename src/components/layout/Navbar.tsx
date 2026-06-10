'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone, X } from 'lucide-react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import { BrandLogo } from '@/components/layout/BrandLogo'
import { cn } from '@/lib/utils'
import { BUSINESS, LICENSE_DISPLAY, NAV_LINKS } from '@/lib/content'
import { trackPhoneClick } from '@/lib/gtag'
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
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-brand-navy text-on-dark"
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-8 px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
          >
            <BrandLogo size="nav" priority />
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
              onClick={() => trackPhoneClick('navbar')}
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

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          id="mobile-nav-drawer"
          side="right"
          showCloseButton={false}
          className="z-100 flex w-[300px] max-w-[300px] flex-col overflow-y-auto border-0 bg-brand-navy px-7 py-8 text-white sm:max-w-[300px] lg:hidden"
        >
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>

          <div className="mb-10 flex items-center justify-between">
            <BrandLogo size="drawer" alt="" aria-hidden />
            <SheetClose
              className="flex items-center rounded-md bg-white/10 p-1.5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              aria-label="Close menu"
            >
              <X className="size-[18px]" strokeWidth={1.8} aria-hidden />
            </SheetClose>
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
            onClick={() => trackPhoneClick('navbar-mobile')}
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

          <p className="mt-auto pt-8 text-center font-body text-[11px] leading-relaxed text-on-dark-muted">
            {LICENSE_DISPLAY.heroTrustBadge}
          </p>
        </SheetContent>
      </Sheet>

      <a
        href={BUSINESS.phone.href}
        onClick={() => trackPhoneClick('mobile-call-bar')}
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
