import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MapPin, Home, Package, Shield, Phone, ArrowRight } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { BUSINESS, FAQS, NEIGHBORHOODS, SERVICE_AREAS, SERVICES, TRUST_BADGES } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { getSiteOrigin } from '@/lib/site-url'

type PageProps = {
  params: Promise<{ county: string; neighborhood: string }>
}

export function generateStaticParams() {
  const params: { county: string; neighborhood: string }[] = []
  for (const nb of NEIGHBORHOODS) {
    const area = SERVICE_AREAS.find((sa) => sa.county === nb.county)
    if (area) {
      params.push({ county: area.slug, neighborhood: nb.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { neighborhood: nbSlug } = await params
  const nb = NEIGHBORHOODS.find((n) => n.slug === nbSlug)
  if (!nb) return {}

  const area = SERVICE_AREAS.find((sa) => sa.county === nb.county)
  if (!area) return {}

  return buildMetadata({
    title: nb.metaTitle,
    description: nb.metaDescription,
    path: `/service-areas/${area.slug}/${nb.slug}`,
  })
}

const LUXURY_GATED = new Set(['alys-beach', 'rosemary-beach', 'watercolor', 'watersound', 'sandestin', 'bluewater-bay'])
const CONDO_HIGHRISE = new Set(['miramar-beach', 'panama-city-beach', 'destin'])
const MILITARY = new Set(['fort-walton-beach', 'niceville', 'shalimar', 'crestview', 'bluewater-bay'])

function getServiceSlugs(nbSlug: string): string[] {
  if (LUXURY_GATED.has(nbSlug)) {
    return ['residential-moving', 'packing-unpacking', 'local-moving', 'storage']
  }
  if (CONDO_HIGHRISE.has(nbSlug)) {
    return ['residential-moving', 'delivery', 'local-moving', 'storage']
  }
  if (MILITARY.has(nbSlug)) {
    return ['residential-moving', 'local-moving', 'packing-unpacking', 'storage']
  }
  return ['residential-moving', 'local-moving', 'packing-unpacking', 'delivery']
}

function getOwnerClosing(intro: string): string {
  if (intro.includes('gated') || intro.includes('gate')) {
    return 'which means gate access is handled, parking is planned, and no time is wasted figuring it out the morning of your move.'
  }
  if (intro.includes('elevator') || intro.includes('high-rise') || intro.includes('condo')) {
    return 'which means elevator reservations are coordinated, loading zones are confirmed, and the building\'s rules are handled before we arrive.'
  }
  if (intro.includes('military') || intro.includes('PCS')) {
    return 'which means we understand your timeline, the base housing requirements, and the pressure of a move that can\'t slip.'
  }
  return 'which means you get four people who care about this community and your belongings as much as you do.'
}

const serviceIconMap = {
  Home,
  MapPin,
  Package,
  PackageCheck: Package,
  Truck: Shield,
  Warehouse: Shield,
  Trash2: Shield,
} as const

export default async function NeighborhoodPage({ params }: PageProps) {
  const { county: countySlug, neighborhood: nbSlug } = await params

  const nb = NEIGHBORHOODS.find((n) => n.slug === nbSlug)
  if (!nb) notFound()

  const area = SERVICE_AREAS.find((sa) => sa.county === nb.county)
  if (!area || area.slug !== countySlug) notFound()

  const origin = await getSiteOrigin()
  const base = origin.origin

  const nbIndex = NEIGHBORHOODS.findIndex((n) => n.slug === nb.slug)
  const altFaq = nbIndex % 2 === 0 ? FAQS[1] : FAQS[13]

  const serviceSlugs = getServiceSlugs(nb.slug)
  const featuredServices = serviceSlugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is (typeof SERVICES)[number] => s !== undefined)

  const ownerClosing = getOwnerClosing(nb.intro)

  const pageUrl = `${base}/service-areas/${area.slug}/${nb.slug}`

  const directFaq = {
    question: `Does Beach House Moving serve ${nb.name}?`,
    answer: `Yes — Beach House Moving serves ${nb.name} and surrounding ${nb.county}. We are locally owned, owner-operated, and licensed under Florida Mover Reg. #${BUSINESS.registration.number}. Call ${BUSINESS.phone.display} for a free quote.`,
  }

  const localFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: directFaq.question,
        acceptedAnswer: { '@type': 'Answer', text: directFaq.answer },
      },
      {
        '@type': 'Question',
        name: altFaq.q,
        acceptedAnswer: { '@type': 'Answer', text: altFaq.a },
      },
    ],
  }

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['MovingCompany', 'LocalBusiness'],
    '@id': `${pageUrl}#business`,
    name: BUSINESS.name,
    url: base,
    telephone: BUSINESS.phone.e164,
    areaServed: [`${nb.name}, FL`, `${nb.county}, FL`],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    branchOf: { '@id': `${base}/#business` },
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Moving Services in ${nb.name}`,
    provider: { '@id': `${pageUrl}#business` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${base}/service-areas` },
      { '@type': 'ListItem', position: 3, name: area.county, item: `${base}/service-areas/${area.slug}` },
      { '@type': 'ListItem', position: 4, name: nb.name, item: pageUrl },
    ],
  }

  return (
    <PageShell>
      <JsonLd data={[businessSchema, serviceSchema, breadcrumbSchema, localFaqSchema]} />

      {/* Direct-answer paragraph — AEO */}
      <div className="bg-brand-sand px-6 py-6">
        <div className="mx-auto max-w-4xl">
          <p className="font-body text-base leading-relaxed text-ink-muted">
            Yes — Beach House Moving serves {nb.name}, FL. We are a locally owned, owner-operated moving
            company offering residential moving, packing, and delivery in {nb.name} and the surrounding{' '}
            {nb.county} area. Licensed (FL Mover Reg. #{BUSINESS.registration.number}), insured, and
            available {BUSINESS.hours}.
          </p>
        </div>
      </div>

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Service Areas', href: '/service-areas' },
              { label: area.county, href: `/service-areas/${area.slug}` },
              { label: nb.name },
            ]}
          />

          <h1 className="mt-6 font-heading text-4xl font-bold text-brand-navy md:text-5xl">
            Movers in {nb.name}, FL
          </h1>

          {/* Local intro */}
          <div className="mt-10">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
              Your Neighborhood, Our Home Turf
            </p>
            <div className="relative aspect-[16/7] overflow-hidden rounded-brand-lg">
              <Image
                src={nb.image}
                alt={`Beach House Moving serving ${nb.name}, FL`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
            <p className="mt-6 font-body text-lg leading-relaxed text-ink-muted">{nb.intro}</p>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-muted">
              When you hire Beach House Moving, you get the owners on the job —{' '}
              {ownerClosing}
            </p>
          </div>

          {/* Landmarks callout */}
          <div className="mt-8 rounded-brand-lg border border-brand-teal/20 bg-brand-teal/5 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <MapPin className="size-4 shrink-0 text-brand-teal" strokeWidth={1.8} aria-hidden />
              <span className="font-body text-sm font-semibold text-brand-teal">Familiar territory:</span>
              {nb.landmarks.map((landmark, i) => (
                <span
                  key={landmark}
                  className="rounded-full bg-brand-teal/10 px-3 py-1 font-body text-xs font-medium text-brand-navy"
                >
                  {landmark}{i < nb.landmarks.length - 1 ? '' : ''}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-brand-navy">
              Moving Services in {nb.name}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {featuredServices.map((service) => {
                const Icon = serviceIconMap[service.icon as keyof typeof serviceIconMap] ?? Home
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex items-start gap-4 rounded-brand border border-brand-navy/8 bg-white p-5 shadow-brand transition-shadow hover:shadow-brand-hover"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-teal/10">
                      <Icon className="size-5 text-brand-teal" strokeWidth={1.6} aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading text-base font-semibold text-brand-navy">
                        {service.title}
                      </h3>
                      <p className="mt-1 font-body text-sm leading-relaxed text-ink-muted">
                        {service.shortDescription}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 font-body text-xs font-semibold text-brand-teal">
                        Learn more
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-12">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-2 rounded-brand bg-brand-sand p-4 text-center"
                >
                  <p className="font-heading text-sm font-semibold text-brand-navy">{badge.label}</p>
                  <p className="font-body text-xs leading-relaxed text-ink-muted">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Local FAQ */}
          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-brand-navy">
              Common Questions About Moving in {nb.name}
            </h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-brand border border-brand-navy/8 bg-white p-6 shadow-brand">
                <h3 className="font-heading text-base font-semibold text-brand-navy">
                  {directFaq.question}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                  {directFaq.answer}
                </p>
              </div>
              <div className="rounded-brand border border-brand-navy/8 bg-white p-6 shadow-brand">
                <h3 className="font-heading text-base font-semibold text-brand-navy">
                  {altFaq.q}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                  {altFaq.a}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-coral px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Ready to Move in {nb.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base text-white/85">
            {BUSINESS.promise}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <TrackedPhoneLink
              location={`neighborhood-${nb.slug}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-brand bg-white px-8 font-body text-base font-semibold text-brand-coral shadow-brand transition-colors hover:bg-white/90"
            >
              <Phone className="size-4" aria-hidden />
              {BUSINESS.phone.display}
            </TrackedPhoneLink>
            <Link
              href="/get-a-quote"
              className="inline-flex h-12 items-center justify-center rounded-brand border-2 border-white px-8 font-body text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
