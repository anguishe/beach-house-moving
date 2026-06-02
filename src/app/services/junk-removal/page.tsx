import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Box, HardHat, Sofa, Trash2, WashingMachine } from 'lucide-react'

import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from '@/components/layout/PageHero'
import { PageShell } from '@/components/layout/PageShell'
import { FAQSection } from '@/components/sections/FAQSection'
import { ServiceCTA } from '@/components/sections/ServiceCTA'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  FAQS,
  JUNK_REMOVAL_PAGE,
  SERVICES,
} from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { SERVICE_IMAGE_MAP } from '@/lib/service-images'
import { breadcrumbSchema, junkRemovalServiceSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

const haulIconMap = {
  Trash2,
  Sofa,
  WashingMachine,
  Box,
  HardHat,
} as const

function getJunkRemovalService() {
  const found = SERVICES.find((s) => s.slug === 'junk-removal')
  if (!found) {
    throw new Error('Junk removal service missing from SERVICES in content.ts')
  }
  return found
}

const junkRemovalFaqs = JUNK_REMOVAL_PAGE.faqIndices.map((i) => FAQS[i])

export async function generateMetadata(): Promise<Metadata> {
  const service = getJunkRemovalService()
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: '/services/junk-removal',
  })
}

export default async function JunkRemovalPage() {
  const service = getJunkRemovalService()
  const origin = await getSiteOrigin()
  const serviceImage = SERVICE_IMAGE_MAP['junk-removal']

  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.title, path: '/services/junk-removal' },
    ],
    origin.origin,
  )

  return (
    <PageShell>
      <JsonLd data={[breadcrumbs, junkRemovalServiceSchema(service.fullDescription)]} />

      <PageHero
        title={service.title}
        description={service.shortDescription}
        image={serviceImage}
        priority
      />

      <section className="bg-brand-sand px-4 pb-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/get-a-quote"
            className="inline-flex h-11 items-center justify-center rounded-brand bg-brand-coral px-8 font-body text-base font-semibold text-white hover:bg-brand-coral-dark"
          >
            {JUNK_REMOVAL_PAGE.heroCtaLabel}
          </Link>
        </div>
      </section>

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
            {service.fullDescription}
          </p>

          <div className="mt-12">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
              {JUNK_REMOVAL_PAGE.whatWeHaul.eyebrow}
            </p>
            <h2 className="font-heading text-2xl font-bold text-brand-navy md:text-3xl">
              {JUNK_REMOVAL_PAGE.whatWeHaul.headline}
            </h2>
            <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-ink-muted">
              {JUNK_REMOVAL_PAGE.whatWeHaul.intro}
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {JUNK_REMOVAL_PAGE.haulItems.map((item) => {
                const Icon = haulIconMap[item.icon]
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-3 rounded-brand-lg border border-brand-navy/8 bg-white p-4 shadow-brand"
                  >
                    <Icon
                      className="mt-0.5 size-5 shrink-0 text-brand-teal"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                    <span className="font-body text-base text-ink-muted">{item.label}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-brand-sand px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-coral">
            {JUNK_REMOVAL_PAGE.howItWorks.eyebrow}
          </p>
          <h2 className="font-heading text-2xl font-bold text-brand-navy md:text-3xl">
            {JUNK_REMOVAL_PAGE.howItWorks.headline}
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {JUNK_REMOVAL_PAGE.howItWorks.steps.map((step, index) => (
              <li key={step.title} className="relative">
                <span
                  className="mb-4 flex size-10 items-center justify-center rounded-full bg-brand-navy font-heading text-lg font-bold text-white"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <h3 className="font-heading text-lg font-semibold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted md:text-base">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQSection faqs={junkRemovalFaqs} />
      <ServiceCTA serviceTitle={service.title} />
    </PageShell>
  )
}
