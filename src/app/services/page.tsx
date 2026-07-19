import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Home,
  MapPin,
  Package,
  PackageCheck,
  Truck,
  Warehouse,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from '@/components/layout/PageHero'
import { PageShell } from '@/components/layout/PageShell'
import { FAQSection } from '@/components/sections/FAQSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { PAGE_META, SERVICES, SERVICES_HUB } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { SERVICE_IMAGE_MAP } from '@/lib/service-images'
import { breadcrumbSchema, faqPageSchema, servicesItemListSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

const serviceIconMap = {
  Home,
  MapPin,
  Truck,
  Package,
  Warehouse,
  PackageCheck,
} as const

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(PAGE_META.services)
}

export default async function ServicesPage() {
  const origin = await getSiteOrigin()
  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ],
    origin.origin,
  )

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbs,
          servicesItemListSchema(origin.origin),
          faqPageSchema(SERVICES_HUB.faqs, `${origin.origin}/services`),
        ]}
      />
      <PageHero
        eyebrow={SERVICES_HUB.eyebrow}
        title={SERVICES_HUB.headline}
        description={SERVICES_HUB.intro}
        image={undefined}
      />

      <div className="bg-brand-sand px-6 py-6">
        <div className="mx-auto max-w-4xl">
          <p className="font-body text-base leading-relaxed text-ink-muted">
            {SERVICES_HUB.bodyIntro}
          </p>
        </div>
      </div>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services' },
            ]}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const ServiceIcon = serviceIconMap[service.icon as keyof typeof serviceIconMap]
              const serviceImage = SERVICE_IMAGE_MAP[service.slug]

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group overflow-hidden rounded-brand-lg border border-brand-navy/6 bg-white shadow-brand transition-shadow hover:shadow-brand-hover"
                >
                  <div className="relative aspect-[16/10] bg-brand-sand">
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
                    <div className="mb-3 flex items-center gap-3">
                      {ServiceIcon && (
                        <div className="flex size-9 items-center justify-center rounded-lg bg-brand-teal/10">
                          <ServiceIcon className="size-5 text-brand-teal" strokeWidth={1.6} />
                        </div>
                      )}
                      <h2 className="font-heading text-lg font-semibold text-brand-navy">
                        {service.title}
                      </h2>
                    </div>
                    <p className="font-body text-sm leading-relaxed text-ink-muted">
                      {service.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-semibold text-brand-teal">
                      {service.linkLabel}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <FAQSection faqs={SERVICES_HUB.faqs} />
    </PageShell>
  )
}
