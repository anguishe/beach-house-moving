import type { Metadata } from 'next'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from '@/components/layout/PageHero'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { BUSINESS } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

const PRIVACY_SECTIONS = [
  {
    heading: 'What we collect',
    body: "When you request a quote — by form, phone, text, or email — we collect what you give us: your name, phone number, email address, and the details of your move (addresses or cities, dates, home size, and notes). That's it. We don't ask for more than the job requires.",
  },
  {
    heading: 'How we use it',
    body: 'We use your information to quote your move, schedule it, confirm details in writing, and follow up about the job. After a completed move we may send one request for an honest review. We do not sell, rent, or trade your information to anyone, ever.',
  },
  {
    heading: 'Analytics and cookies',
    body: 'Like most websites, this site uses analytics to understand which pages help people — Google Tag Manager and Google Analytics, plus Ahrefs analytics. These tools use cookies to count visits and page views; they don\'t give us your identity. Our reviews section may load review content via Google\'s Places service. You can block cookies in your browser and this site keeps working.',
  },
  {
    heading: 'How long we keep it',
    body: 'Quote and job records are kept as long as Florida business and insurance requirements need them. If you\'d like the contact information you submitted deleted, ask — see below.',
  },
  {
    heading: 'Your choices',
    body: 'You can ask us at any time what information we hold about you, ask us to correct it, or ask us to delete it where the law allows. One email or call does it.',
  },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Privacy Policy | Beach House Moving',
    description:
      'How Beach House Moving collects, uses, and protects the information you share when requesting a quote.',
    path: '/privacy-policy',
  })
}

export default async function PrivacyPolicyPage() {
  const origin = await getSiteOrigin()
  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
    ],
    origin.origin,
  )

  return (
    <PageShell>
      <JsonLd data={[breadcrumbs]} />

      <PageHero
        title="Privacy Policy"
        description="Beach House Moving keeps this simple, because that's how we run the company."
      />

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy' },
            ]}
          />

          <p className="mt-6 font-body text-sm font-medium text-brand-teal">
            Effective: June 2026 · Last updated: June 2026
          </p>

          <div className="prose-spacing mt-10 space-y-8">
            {PRIVACY_SECTIONS.map((section) => (
              <div key={section.heading}>
                <h2 className="mb-4 font-heading text-2xl font-bold text-brand-navy">
                  {section.heading}
                </h2>
                <p className="font-body text-base leading-relaxed text-ink-muted">
                  {section.body}
                </p>
              </div>
            ))}

            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold text-brand-navy">Contact</h2>
              <p className="font-body text-base leading-relaxed text-ink-muted">
                {BUSINESS.name} · {BUSINESS.address.city}, {BUSINESS.address.state} ·{' '}
                <TrackedPhoneLink location="privacy-policy" className="text-brand-navy underline decoration-brand-navy/30 underline-offset-2 transition-colors hover:text-brand-teal hover:decoration-brand-teal">
                  {BUSINESS.phone.display}
                </TrackedPhoneLink>{' '}
                ·{' '}
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-brand-navy underline decoration-brand-navy/30 underline-offset-2 transition-colors hover:text-brand-teal hover:decoration-brand-teal"
                >
                  {BUSINESS.email}
                </a>{' '}
                · FL Mover Registration #{BUSINESS.registration.number}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
