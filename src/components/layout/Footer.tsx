import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BUSINESS, NAV_LINKS, SOCIAL_LINKS } from '@/lib/content'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-brand-navy pb-8 pt-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Image
              src="/images/logo-light.png"
              width={160}
              height={52}
              alt={`${BUSINESS.name} logo`}
              className="h-11 w-auto"
            />
            <p className="max-w-[200px] font-body text-sm leading-relaxed text-white/45">
              {BUSINESS.tagline}
            </p>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 font-body text-sm text-white/40 transition-colors hover:text-white/70"
            >
              <FacebookIcon className="h-4 w-4" />
              Facebook
            </a>
          </div>

          <div>
            <p className="mb-5 font-body text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/45 transition-colors hover:text-white/80"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#quote"
                  className="font-body text-sm text-white/45 transition-colors hover:text-white/80"
                >
                  Get a Quote
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-5 font-body text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={BUSINESS.phone.href}
                  className="group flex items-center gap-2.5 font-body text-base font-semibold text-white transition-colors duration-200 hover:text-[#2A9D8F]"
                >
                  <Phone
                    className="h-4 w-4 text-[#2A9D8F] transition-transform group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  {BUSINESS.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-3 font-body text-sm text-white/45">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#2A9D8F]" strokeWidth={1.5} />
                {BUSINESS.email}
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-white/45">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2A9D8F]" strokeWidth={1.5} />
                {BUSINESS.address.full}
              </li>
              <li className="font-body text-xs text-white/40">{BUSINESS.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mb-6 h-px bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-body text-xs text-white/25">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="text-center font-body text-xs text-white/25">
            {BUSINESS.licenseStatement}
          </p>
        </div>
      </div>
    </footer>
  )
}
