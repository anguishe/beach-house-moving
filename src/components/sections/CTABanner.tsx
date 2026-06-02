import { Phone } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { BUSINESS } from '@/lib/content'

export function CTABanner() {
  return (
    <section className="bg-brand-coral px-6 py-20 text-center">
      <div className="mx-auto max-w-[800px]">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.22em] text-white">
          Don&apos;t Stress the Move
        </p>

        <h2 className="mb-4 font-heading text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight text-white">
          Ready to get moving?
        </h2>

        <p className="mb-12 font-body text-[17px] leading-relaxed text-white/75">
          Call for a free estimate. A real person picks up, day or night.
        </p>

        <TrackedPhoneLink
          location="cta-banner"
          className="inline-flex items-center gap-4 rounded-[14px] bg-white px-11 py-[22px] text-brand-navy shadow-brand-lg transition-[transform,box-shadow] duration-200 ease-out hover:scale-[1.02] hover:shadow-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-coral">
            <Phone className="size-[22px] text-white" strokeWidth={1.8} aria-hidden />
          </span>
          <span className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-none">
            {BUSINESS.phone.display}
          </span>
        </TrackedPhoneLink>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="font-body text-[13px] text-white/90">or</span>
          <a
            href="#quote"
            className="font-body text-[13px] text-white/90 underline underline-offset-[3px]"
          >
            Fill out a quote form →
          </a>
        </div>
      </div>
    </section>
  )
}
