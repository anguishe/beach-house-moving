import { CTABanner } from '@/components/sections/CTABanner'
import { FAQSection } from '@/components/sections/FAQSection'
import { GalleryStrip } from '@/components/sections/GalleryStrip'
import HeroSection from '@/components/sections/HeroSection'
import { GoogleReviewsCarousel } from '@/components/sections/GoogleReviewsCarousel'
import { OwnerOperatorSection } from '@/components/sections/OwnerOperatorSection'
import { QuoteFormSection } from '@/components/sections/QuoteFormSection'
import { ServiceAreaSection } from '@/components/sections/ServiceAreaSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { TrustSection } from '@/components/sections/TrustSection'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { FAQS, REVIEWS_PAGE_META } from '@/lib/content'
import { fetchGoogleReviews, fetchPlaceSummary } from '@/lib/google-reviews'
import {
  faqPageSchema,
  movingCompanySchema,
  webPageSchema,
  webSiteSchema,
} from '@/lib/structured-data'
import { getSiteOrigin, siteUrl } from '@/lib/site-url'

export const revalidate = 86400

export default async function HomePage() {
  const origin = await getSiteOrigin()
  const [googleReviews, placeSummary] = await Promise.all([
    fetchGoogleReviews(),
    fetchPlaceSummary(),
  ])

  const hasLiveReviews = googleReviews.length > 0
  const totalCount =
    placeSummary?.user_ratings_total ?? REVIEWS_PAGE_META.aggregateRating.reviewCount
  const averageRating =
    placeSummary?.rating ?? REVIEWS_PAGE_META.aggregateRating.ratingValue

  // Single source for the visible FAQ section and the FAQPage schema so they
  // never drift — the schema must mirror exactly what's rendered.
  const homepageFaqs = FAQS

  return (
    <>
      <JsonLd
        data={[
          movingCompanySchema(origin.origin, true),
          webSiteSchema(origin.origin),
          webPageSchema(
            siteUrl,
            'Beach House Moving | Movers in Santa Rosa Beach, FL',
            '2026-06-11',
            'Locally owned moving company serving Walton, Okaloosa, and Bay Counties.',
          ),
          faqPageSchema(homepageFaqs, siteUrl),
        ]}
      />
      <main id="main-content" tabIndex={-1} className="pb-[64px] outline-none md:pb-0">
        <HeroSection />
        <TrustSection />
        <ServicesSection />
        <OwnerOperatorSection />
        <ServiceAreaSection />
        <GalleryStrip />
        {hasLiveReviews ? (
          <GoogleReviewsCarousel
            reviews={googleReviews}
            totalCount={totalCount}
            averageRating={averageRating}
          />
        ) : (
          <TestimonialsSection />
        )}
        <QuoteFormSection />
        <FAQSection faqs={homepageFaqs} />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
