import type { Metadata } from 'next'
import Image from 'next/image'
import { Star } from 'lucide-react'

import { PageShell } from '@/components/layout/PageShell'
import { GoogleReviewsGrid } from '@/components/sections/GoogleReviewsGrid'
import { ReviewsGrid } from '@/components/sections/ReviewsGrid'
import { WrittenReviewsSection } from '@/components/sections/WrittenReviewsSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { IMAGES, REVIEWS_PAGE, REVIEWS_PAGE_META } from '@/lib/content'
import { fetchGoogleReviews, fetchPlaceSummary } from '@/lib/google-reviews'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema, reviewsAggregateRatingSchema, reviewsWithTextSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: REVIEWS_PAGE_META.title,
    description: REVIEWS_PAGE_META.description,
    path: REVIEWS_PAGE_META.path,
  })
}

function HeroStars() {
  return (
    <div className="flex justify-center gap-0.5" aria-label="5 out of 5 stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="size-6 fill-brand-gold text-brand-gold md:size-7"
          strokeWidth={0}
          aria-hidden
        />
      ))}
    </div>
  )
}

export default async function ReviewsPage() {
  const origin = await getSiteOrigin()
  const [googleReviews, placeSummary] = await Promise.all([
    fetchGoogleReviews(),
    fetchPlaceSummary(),
  ])

  const reviewCount =
    placeSummary?.user_ratings_total ?? REVIEWS_PAGE_META.aggregateRating.reviewCount
  const ratingValue = placeSummary?.rating ?? REVIEWS_PAGE_META.aggregateRating.ratingValue
  const ratingSummary = `${reviewCount} Reviews · ${ratingValue.toFixed(1)} Average`

  const reviewSchemas = reviewsWithTextSchema()
  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Reviews', path: '/reviews' },
    ],
    origin.origin,
  )

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbs,
          reviewsAggregateRatingSchema({
            ratingValue,
            reviewCount,
          }),
          ...reviewSchemas,
        ]}
      />

      <section className="relative min-h-88 overflow-hidden md:min-h-104">
        <Image
          src={IMAGES.fleet.src}
          alt={IMAGES.fleet.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/80" aria-hidden />
        <div className="relative flex min-h-88 flex-col items-center justify-center px-4 py-28 text-center md:min-h-104 md:py-32">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-widest text-brand-teal">
            {REVIEWS_PAGE.hero.eyebrow}
          </p>
          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
            {REVIEWS_PAGE.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/80 md:text-lg">
            {REVIEWS_PAGE.hero.subtext}
          </p>
          <div className="mt-6">
            <HeroStars />
          </div>
          <p className="mt-3 font-body text-sm text-white/70">{ratingSummary}</p>
        </div>
      </section>

      {googleReviews.length > 0 ? (
        <GoogleReviewsGrid reviews={googleReviews} intro={REVIEWS_PAGE.reviewsSection.intro} />
      ) : (
        <>
          <section className="bg-brand-sand px-4 pt-16 md:px-8 md:pt-24">
            <p className="mx-auto max-w-3xl text-center font-body text-base leading-relaxed text-ink-muted">
              {REVIEWS_PAGE.reviewsSection.intro}
            </p>
          </section>
          <ReviewsGrid />
        </>
      )}

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-brand-navy md:text-3xl">
            {REVIEWS_PAGE.whyReviewsMatter.heading}
          </h2>
          <div className="space-y-6">
            {REVIEWS_PAGE.whyReviewsMatter.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="font-body text-base leading-relaxed text-ink-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <WrittenReviewsSection />

      <div className="relative h-100 w-full overflow-hidden">
        <Image
          src={REVIEWS_PAGE.trustImage.src}
          alt={REVIEWS_PAGE.trustImage.alt}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <section className="bg-brand-navy py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-widest text-brand-teal">
            {REVIEWS_PAGE.cta.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
            {REVIEWS_PAGE.cta.title}
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-white/80 md:text-lg">
            {REVIEWS_PAGE.cta.body}
          </p>
          <a
            href={REVIEWS_PAGE_META.googleReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-brand bg-brand-coral px-8 py-4 font-body text-base font-semibold text-white no-underline transition-colors duration-200 hover:bg-brand-coral-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
          >
            {REVIEWS_PAGE.cta.buttonLabel}
          </a>
          <p className="mt-6 font-body text-sm text-white/50">{REVIEWS_PAGE.cta.footerLine}</p>
        </div>
      </section>
    </PageShell>
  )
}
