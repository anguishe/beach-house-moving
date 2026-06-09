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
import { faqSchema, movingCompanySchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

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

  return (
    <>
      <JsonLd data={[movingCompanySchema(origin.origin, true), faqSchema(FAQS)]} />
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
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
