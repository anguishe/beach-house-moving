import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from '@/components/layout/PageHero'
import { PageShell } from '@/components/layout/PageShell'
import { ServiceAreaMap } from '@/components/layout/ServiceAreaMap'
import { ContactForm } from '@/components/forms/ContactForm'
import { FAQSection } from '@/components/sections/FAQSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { BUSINESS, CONTACT_CONTENT, FAQS, PAGE_META } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema, contactPageSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

const contactFaqs = [FAQS[0], FAQS[5], FAQS[2]]

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(PAGE_META.contact)
}

export default async function ContactPage() {
  const origin = await getSiteOrigin()
  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
    origin.origin,
  )

  return (
    <PageShell>
      <JsonLd data={[breadcrumbs, contactPageSchema('/contact', 'Contact Beach House Moving', origin.origin)]} />

      <PageHero
        eyebrow={CONTACT_CONTENT.eyebrow}
        title={CONTACT_CONTENT.headline}
        description={CONTACT_CONTENT.intro}
      />

      <div className="bg-brand-sand px-6 py-6">
        <div className="mx-auto max-w-4xl">
          <p className="font-body text-base leading-relaxed text-ink-muted">
            The fastest way to reach Beach House Moving is a phone call to {BUSINESS.phone.display} — a
            real person answers, day or night. You can also submit a quote request using the form below.
          </p>
        </div>
      </div>

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact' },
            ]}
          />

          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-5">
                <TrackedPhoneLink
                  location="contact-page"
                  className="flex items-center gap-4 rounded-brand-lg border border-brand-teal/25 bg-brand-sand p-5 transition-shadow hover:shadow-brand"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-brand-teal shadow-md">
                    <Phone className="size-5 text-white" strokeWidth={1.6} aria-hidden />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-wide text-ink-light">
                      Call Us
                    </p>
                    <p className="font-heading text-2xl font-bold text-brand-navy">
                      {BUSINESS.phone.display}
                    </p>
                    <p className="font-body text-xs text-ink-light">Tap to call · Available 24/7</p>
                  </div>
                </TrackedPhoneLink>

                <div className="flex items-center gap-3 font-body text-base text-ink-muted">
                  <Mail className="size-5 shrink-0 text-brand-teal" strokeWidth={1.6} aria-hidden />
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="font-medium text-brand-navy hover:text-brand-teal"
                  >
                    {BUSINESS.email}
                  </a>
                </div>

                <div className="flex items-start gap-3 font-body text-base text-ink-muted">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand-teal" strokeWidth={1.6} aria-hidden />
                  <span>{CONTACT_CONTENT.serviceAreaNote}</span>
                </div>

                <div className="flex items-center gap-3 font-body text-base text-ink-muted">
                  <Clock className="size-5 shrink-0 text-brand-teal" strokeWidth={1.6} aria-hidden />
                  <span>{BUSINESS.hours}</span>
                </div>
              </div>

              <div>
                <h2 className="mb-4 font-heading text-xl font-bold text-brand-navy">
                  Service Area
                </h2>
                <ServiceAreaMap />
                <p className="mt-3 font-body text-sm text-ink-light">
                  {BUSINESS.serviceAreaLabel}
                </p>
              </div>
            </div>

            <div className="rounded-brand-lg border border-brand-navy/8 bg-white p-8 shadow-brand-lg">
              <h2 className="font-heading text-xl font-bold text-brand-navy">
                {CONTACT_CONTENT.formHeadline}
              </h2>
              <p className="mt-2 font-body text-sm text-ink-muted">
                {CONTACT_CONTENT.formSubheadline}
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={contactFaqs} />
    </PageShell>
  )
}
