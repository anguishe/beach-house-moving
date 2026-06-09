import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from '@/components/layout/PageHero'
import { PageShell } from '@/components/layout/PageShell'
import { ServiceAreaMap } from '@/components/layout/ServiceAreaMap'
import { JsonLd } from '@/components/seo/JsonLd'
import { BUSINESS, NEIGHBORHOODS, PAGE_META, SERVICE_AREAS, SERVICE_AREAS_HUB } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema, serviceAreasItemListSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(PAGE_META.serviceAreas)
}

export default async function ServiceAreasPage() {
  const origin = await getSiteOrigin()
  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Service Areas', path: '/service-areas' },
    ],
    origin.origin,
  )

  return (
    <PageShell>
      <JsonLd data={[breadcrumbs, serviceAreasItemListSchema(origin.origin)]} />

      <PageHero
        eyebrow={SERVICE_AREAS_HUB.eyebrow}
        title={SERVICE_AREAS_HUB.headline}
        description={SERVICE_AREAS_HUB.intro}
      />

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Service Areas' },
            ]}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {SERVICE_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group overflow-hidden rounded-brand-lg border border-brand-navy/6 bg-white shadow-brand transition-shadow hover:shadow-brand-hover"
              >
                <div className="relative aspect-[16/10] bg-brand-navy">
                  <Image
                    src={area.image}
                    alt={`Beach House Moving serving ${area.county}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-contain"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-brand-teal px-3 py-1 font-body text-xs font-bold uppercase tracking-wide text-white">
                    {area.county}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="font-heading text-xl font-bold text-brand-navy">
                    {area.county}
                  </h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                    {area.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {area.cities.slice(0, 4).map((city) => (
                      <span
                        key={city}
                        className="rounded-full bg-brand-sand px-2.5 py-0.5 font-body text-xs font-medium text-brand-navy"
                      >
                        {city}
                      </span>
                    ))}
                    {area.cities.length > 4 && (
                      <span className="rounded-full bg-brand-sand px-2.5 py-0.5 font-body text-xs font-medium text-ink-light">
                        +{area.cities.length - 4} more
                      </span>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-semibold text-brand-teal">
                    View county details
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center font-heading text-2xl font-bold text-brand-navy">
              {SERVICE_AREAS_HUB.mapHeadline}
            </h2>
            <ServiceAreaMap />
            <p className="mt-4 text-center font-body text-sm text-ink-light">
              {BUSINESS.serviceAreaLabel}
            </p>
          </div>

          <div className="mt-16 rounded-brand-lg bg-brand-sand px-8 py-12 text-center">
            <h2 className="font-heading text-2xl font-bold text-brand-navy">
              Not sure if we serve your area?
            </h2>
            <p className="mx-auto mt-3 max-w-md font-body text-base text-ink-muted">
              Give us a call — if we can get there, we will.
            </p>
            <TrackedPhoneLink
              location="service-areas-page"
              className="mt-6 inline-flex items-center gap-2 rounded-brand bg-brand-navy px-8 py-3.5 font-body text-base font-semibold text-white shadow-brand transition-colors hover:bg-brand-navy/90"
            >
              <Phone className="size-4" aria-hidden />
              Call {BUSINESS.phone.display}
            </TrackedPhoneLink>
          </div>

          {/* Neighborhood index — crawlable link to every neighborhood page */}
          <div className="mt-16">
            <h2 className="mb-8 font-heading text-2xl font-bold text-brand-navy">
              All Communities We Serve
            </h2>
            {SERVICE_AREAS.map((area) => {
              const areaNeighborhoods = NEIGHBORHOODS.filter((nb) => nb.county === area.county)
              if (areaNeighborhoods.length === 0) return null
              return (
                <div key={area.slug} className="mb-8">
                  <h3 className="mb-3 font-heading text-lg font-semibold text-brand-navy">
                    {area.county}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {areaNeighborhoods.map((nb) => (
                      <Link
                        key={nb.slug}
                        href={`/service-areas/${area.slug}/${nb.slug}`}
                        className="rounded-full bg-brand-sand px-4 py-1.5 font-body text-sm font-medium text-brand-navy transition-colors hover:bg-brand-teal hover:text-white"
                      >
                        {nb.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
