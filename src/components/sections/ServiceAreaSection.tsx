import Image from 'next/image'
import { Phone } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { MotionReveal } from '@/components/ui/MotionReveal'
import { BUSINESS, SERVICE_AREAS } from '@/lib/content'

export function ServiceAreaSection() {
  return (
    <section id="areas" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
            Where We Work
          </p>
          <h2 className="mb-4 font-heading text-[clamp(2rem,4vw,2.75rem)] font-bold leading-snug text-brand-navy">
            Serving the Florida Panhandle
          </h2>
          <div className="mx-auto mb-5 h-0.5 w-10 bg-brand-teal" />
          <p className="mx-auto max-w-xl font-body text-[17px] leading-relaxed text-ink-muted">
            From 30A to Panama City — we know every road, every neighborhood.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6">
          {SERVICE_AREAS.map((area, index) => (
            <MotionReveal
              key={area.slug}
              index={index}
              className="overflow-hidden rounded-[14px] border border-brand-navy/6 bg-white shadow-brand"
            >
              <div className="relative w-full overflow-hidden bg-brand-navy pb-[58%]">
                <Image
                  src={area.image}
                  alt={`Beach House Moving serving ${area.county}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-contain object-center"
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-brand-teal px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-wide text-white">
                  {area.county}
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 font-heading text-[1.3rem] font-bold leading-snug text-brand-navy">
                  {area.county}
                </h3>
                <p className="mb-4 font-body text-sm leading-relaxed text-ink-muted">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {area.cities.map((city) => (
                    <span
                      key={city}
                      className="rounded-full bg-brand-sand px-2.5 py-1 font-body text-xs font-medium text-brand-navy"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>

        <div className="mt-[72px] rounded-2xl bg-brand-sand px-12 py-14 text-center">
          <h3 className="mb-3 font-heading text-[clamp(1.5rem,3vw,2rem)] font-bold text-brand-navy">
            Not sure if we serve your area?
          </h3>
          <p className="mb-7 font-body text-base leading-relaxed text-ink-muted">
            Give us a call — if we can get there, we will.
          </p>
          <TrackedPhoneLink
            location="service-area-section"
            className="inline-flex items-center gap-2 rounded-brand-lg bg-brand-navy px-8 py-4 font-body text-base font-semibold text-white no-underline shadow-brand"
          >
            <Phone className="size-[17px]" strokeWidth={1.8} aria-hidden />
            Call {BUSINESS.phone.display}
          </TrackedPhoneLink>
        </div>
      </div>
    </section>
  )
}
