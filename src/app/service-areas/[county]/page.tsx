import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from '@/components/layout/PageHero'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { BUSINESS, SERVICE_AREAS, SERVICES } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema, countyAreaSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

const serviceIconMap = {
  Home,
  MapPin,
  Truck,
  Package,
  Warehouse,
  PackageCheck,
} as const

type PageProps = {
  params: Promise<{ county: string }>
}

export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ county: area.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { county } = await params
  const area = SERVICE_AREAS.find((a) => a.slug === county)
  if (!area) return {}

  return buildMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/service-areas/${area.slug}`,
  })
}

export default async function CountyPage({ params }: PageProps) {
  const { county } = await params
  const area = SERVICE_AREAS.find((a) => a.slug === county)
  if (!area) notFound()

  const origin = await getSiteOrigin()
  const cityList = area.cities.join(', ')

  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Service Areas', path: '/service-areas' },
      { name: area.county, path: `/service-areas/${area.slug}` },
    ],
    origin.origin,
  )

  return (
    <PageShell>
      <JsonLd data={[breadcrumbs, ...countyAreaSchema(area, origin.origin)]} />

      <PageHero
        title={`Movers in ${area.county}`}
        description={area.description}
        image={{ src: area.image, alt: `Beach House Moving serving ${area.county}` }}
        priority
      />

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Service Areas', href: '/service-areas' },
              { label: area.county },
            ]}
          />

          <div className="prose prose-neutral max-w-none">
            <p className="font-body text-base leading-relaxed text-ink-muted md:text-lg">
              Beach House Moving brings licensed, insured crews directly to your door across{' '}
              {area.county}. Whether you are in {cityList}, our local teams know the roads,
              neighborhoods, and logistics that make a Panhandle move smoother.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-brand-navy">Cities We Serve</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {area.cities.map((city) => (
                <span
                  key={city}
                  className="rounded-full bg-brand-sand px-4 py-1.5 font-body text-sm font-medium text-brand-navy"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-brand-navy">
              Services Available in {area.county}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {SERVICES.map((service) => {
                const ServiceIcon = serviceIconMap[service.icon as keyof typeof serviceIconMap]
                return (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-3 rounded-brand border border-brand-navy/8 bg-white p-4 shadow-brand transition-shadow hover:shadow-brand-hover"
                    >
                      {ServiceIcon && (
                        <ServiceIcon className="size-5 shrink-0 text-brand-teal" strokeWidth={1.6} />
                      )}
                      <span className="font-body text-sm font-medium text-brand-navy">
                        {service.title}
                      </span>
                      <ArrowRight className="ml-auto size-4 text-brand-teal" aria-hidden />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Ready to move in {area.county}?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base text-white/70">
            Free estimates with no obligation. Call now or request a quote online.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/get-a-quote"
              className="inline-flex h-11 items-center justify-center rounded-brand bg-brand-coral px-8 font-body text-base font-semibold text-white hover:bg-brand-coral-dark"
            >
              Get a Free Quote
            </Link>
            <TrackedPhoneLink
              location="service-area-county-page"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-brand border border-white/30 px-8 font-body text-base font-semibold text-white hover:bg-white/10"
            >
              <Phone className="size-4" aria-hidden />
              Call {BUSINESS.phone.display}
            </TrackedPhoneLink>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
