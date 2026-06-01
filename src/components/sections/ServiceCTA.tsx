import Link from 'next/link'
import { Phone } from 'lucide-react'

import { BUSINESS } from '@/lib/content'

type ServiceCTAProps = {
  serviceTitle: string
}

export function ServiceCTA({ serviceTitle }: ServiceCTAProps) {
  return (
    <section className="bg-brand-navy px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
          Ready When You Are
        </p>
        <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
          Get a free quote for {serviceTitle.toLowerCase()}
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-body text-base text-white/70">
          Licensed, insured, and available seven days a week. Call now or request a quote online.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/get-a-quote"
            className="inline-flex h-11 items-center justify-center rounded-brand bg-brand-coral px-8 font-body text-base font-semibold text-white hover:bg-brand-coral-dark"
          >
            Get a Free Quote
          </Link>
          <a
            href={BUSINESS.phone.href}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-brand border border-white/30 px-8 font-body text-base font-semibold text-white hover:bg-white/10"
          >
            <Phone className="size-4" aria-hidden />
            Call {BUSINESS.phone.display}
          </a>
        </div>
      </div>
    </section>
  )
}
