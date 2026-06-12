import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'

import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from '@/components/layout/PageHero'
import { PageShell } from '@/components/layout/PageShell'
import { FAQSection } from '@/components/sections/FAQSection'
import { ServiceCTA } from '@/components/sections/ServiceCTA'
import { TrustStrip } from '@/components/TrustStrip'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  FAQS,
  SERVICE_FAQ_INDICES,
  SERVICE_INCLUDES,
  SERVICES,
} from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { SERVICE_DETAILS, SERVICE_RELATED } from '@/lib/service-details'
import { SERVICE_IMAGE_MAP, SERVICE_SECONDARY_IMAGE_MAP } from '@/lib/service-images'
import { breadcrumbSchema, faqPageSchema, serviceSchema, webPageSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SERVICES.filter((service) => service.slug !== 'junk-removal').map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) notFound()

  const origin = await getSiteOrigin()
  const serviceImage = SERVICE_IMAGE_MAP[service.slug]
  const secondaryImage = SERVICE_SECONDARY_IMAGE_MAP[service.slug]
  const includes = SERVICE_INCLUDES[service.slug]
  const details = SERVICE_DETAILS[service.slug]
  const fullDescription = details.fullDescription
  const heroTitle = details.heroTitle ?? service.title
  const sections = details.sections
  const faqIndices = SERVICE_FAQ_INDICES[service.slug]
  const serviceFaqs = details.faqs ?? faqIndices.map((i) => FAQS[i])
  const relatedServices = (SERVICE_RELATED[service.slug] ?? [])
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is (typeof SERVICES)[number] => s !== undefined)

  const canonicalUrl = `${origin.origin}/services/${service.slug}`
  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.title, path: `/services/${service.slug}` },
    ],
    origin.origin,
  )

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbs,
          serviceSchema(service, fullDescription, origin.origin),
          webPageSchema(canonicalUrl, service.metaTitle, '2026-06-11', service.metaDescription),
          faqPageSchema(serviceFaqs, canonicalUrl),
        ]}
      />

      <PageHero
        title={heroTitle}
        description={fullDescription}
        image={serviceImage}
        priority
      />

      <TrustStrip />

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.title },
            ]}
          />

          {serviceImage && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-brand-lg bg-brand-sand md:hidden">
              <Image
                src={serviceImage.src}
                alt={serviceImage.alt}
                fill
                loading="lazy"
                sizes="100vw"
                className="object-contain p-2"
              />
            </div>
          )}

          <p className="font-body text-base leading-relaxed text-ink-muted md:text-lg">
            {fullDescription}
          </p>

          {sections?.map((section) => (
            <div key={section.heading} className="mt-12">
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                {section.heading}
              </h2>
              {section.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="mt-4 font-body text-base leading-relaxed text-ink-muted md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-brand-navy">
              What&apos;s Included
            </h2>
            <ul className="mt-6 space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-brand-teal"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                  <span className="font-body text-base text-ink-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {secondaryImage && (
            <figure className="mt-12 overflow-hidden rounded-brand-lg shadow-brand">
              <Image
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                width={1350}
                height={1800}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 896px"
                className="h-auto w-full object-cover"
              />
            </figure>
          )}
        </div>
      </section>

      {relatedServices.length > 0 ? (
        <section className="px-6 pb-12 md:pb-16">
          <div className="mx-auto max-w-4xl">
            <p className="font-body text-sm font-semibold text-brand-navy">
              Also worth knowing about:
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className="font-body text-sm font-medium text-brand-teal underline-offset-4 hover:text-brand-teal-dark hover:underline"
                >
                  {related.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ServiceCTA serviceTitle={service.title} />
      <FAQSection faqs={serviceFaqs} />
    </PageShell>
  )
}
