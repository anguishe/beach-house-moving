import type React from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  Home,
  MapPin,
  Package,
  PackageCheck,
  Phone,
  Truck,
  Warehouse,
} from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { MotionReveal } from '@/components/ui/MotionReveal'
import { BUSINESS, IMAGES, SERVICES } from '@/lib/content'

const serviceImageMap: Record<string, { src: string; alt: string }> = {
  'residential-moving': IMAGES.truckLoading,
  'local-moving': IMAGES.dolly,
  'long-distance-moving': IMAGES.fleet,
  'packing-unpacking': IMAGES.dresserPack,
  storage: IMAGES.collage,
  delivery: IMAGES.fridge,
}

const serviceIconMap: Record<string, React.ElementType> = {
  Package,
  Home,
  MapPin,
  Truck,
  Warehouse,
  PackageCheck,
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-brand-sand py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
            What We Do
          </p>
          <h2 className="mb-4 font-heading text-[clamp(2rem,4vw,2.75rem)] font-bold leading-snug text-brand-navy">
            Full-Service Moving, Start to Finish
          </h2>
          <div className="mx-auto mb-5 h-0.5 w-10 bg-brand-teal" />
          <p className="mx-auto max-w-lg font-body text-[17px] leading-relaxed text-ink-muted">
            From the first box packed to the last item placed — we handle every detail so you
            don&apos;t have to.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
          {SERVICES.map((service, index) => {
            const ServiceIcon = serviceIconMap[service.icon]
            const serviceImage = serviceImageMap[service.slug]

            return (
              <MotionReveal
                key={service.slug}
                index={index}
                className="cursor-pointer overflow-hidden rounded-[14px] border border-brand-navy/6 bg-white shadow-brand transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-brand-hover"
              >
                <div className="relative w-full pb-[62%] overflow-hidden bg-brand-sand">
                  {serviceImage && (
                    <Image
                      src={serviceImage.src}
                      alt={serviceImage.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-contain p-2"
                    />
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-2.5 flex items-center gap-3">
                    <div className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] bg-brand-teal/10">
                      {ServiceIcon && (
                        <ServiceIcon className="size-5 text-brand-teal" strokeWidth={1.6} aria-hidden />
                      )}
                    </div>
                    <h3 className="m-0 font-heading text-[1.2rem] font-semibold leading-snug text-brand-navy">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mb-4 font-body text-sm leading-relaxed text-ink-muted">
                    {service.shortDescription}
                  </p>

                  <div className="flex items-center gap-1 font-body text-[13px] font-semibold text-brand-teal">
                    Learn more
                    <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden />
                  </div>
                </div>
              </MotionReveal>
            )
          })}
        </div>

        <div className="mt-[72px] rounded-2xl bg-brand-navy px-12 py-14 text-center">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
            Ready When You Are
          </p>
          <h3 className="mb-7 font-heading text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-snug text-white">
            Call us today for a free estimate.
          </h3>
          <TrackedPhoneLink
            location="services-section"
            className="inline-flex items-center gap-2.5 rounded-brand-lg bg-brand-coral px-10 py-[18px] font-body text-[19px] font-semibold text-white no-underline shadow-brand-lg"
          >
            <Phone className="size-5" strokeWidth={1.8} aria-hidden />
            {BUSINESS.phone.display}
          </TrackedPhoneLink>
          <p className="mt-4 font-body text-xs text-white/30">
            Licensed & Insured · Available 7 Days a Week
          </p>
        </div>
      </div>
    </section>
  )
}
