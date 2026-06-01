import Image from 'next/image'
import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { BUSINESS, LICENSE_DISPLAY, NAV_LINKS, SOCIAL_LINKS } from '@/lib/content'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact-footer" className="bg-brand-navy pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-8">
        <div className="footer-grid mb-12 grid gap-12 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Image
              src="/images/logo-light.png"
              alt="Beach House Moving"
              width={140}
              height={46}
              loading="lazy"
              className="block h-10 w-auto"
            />
            <p className="max-w-[220px] font-body text-[13px] leading-relaxed text-white/45">
              {BUSINESS.name} — {BUSINESS.tagline}
            </p>
            <p className="font-body text-xs font-medium text-brand-teal/90">
              {LICENSE_DISPLAY.heroTrustBadge}
            </p>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 font-body text-[13px] text-white/40 transition-colors hover:text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-sm"
            >
              <FacebookIcon className="size-[15px]" />
              Facebook
            </a>
          </div>

          <div>
            <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Quick Links
            </p>
            <div className="flex flex-col gap-3">
              {[...NAV_LINKS, { label: 'Get a Quote', href: '/get-a-quote' }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-white/45 transition-colors hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-sm w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Contact Us
            </p>
            <div className="flex flex-col gap-3.5">
              <p className="font-body text-sm font-semibold text-white">{BUSINESS.name}</p>
              <a
                href={BUSINESS.phone.href}
                className="inline-flex w-fit items-center gap-2.5 font-body text-[15px] font-semibold text-white transition-colors hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-sm"
              >
                <Phone className="size-[15px] shrink-0 text-brand-teal" strokeWidth={1.8} aria-hidden />
                {BUSINESS.phone.display}
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="inline-flex w-fit items-center gap-2.5 font-body text-[13px] text-white/45 transition-colors hover:text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-sm"
              >
                <Mail className="size-[15px] shrink-0 text-brand-teal" strokeWidth={1.8} aria-hidden />
                {BUSINESS.email}
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 size-[15px] shrink-0 text-brand-teal"
                  strokeWidth={1.8}
                  aria-hidden
                />
                <span className="font-body text-[13px] leading-relaxed text-white/45">
                  {BUSINESS.serviceAreaLabel}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="size-[15px] shrink-0 text-brand-teal" strokeWidth={1.8} aria-hidden />
                <span className="font-body text-[13px] text-white/45">{BUSINESS.hours}</span>
              </div>
              <p className="font-body text-xs text-white/35">{LICENSE_DISPLAY.footerRegistration}</p>
            </div>
          </div>
        </div>

        <div className="mb-7 h-px bg-white/8" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 font-body text-xs text-white/25">
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="m-0 font-body text-xs text-white/25">{BUSINESS.licenseStatement}</p>
        </div>
      </div>
    </footer>
  )
}
