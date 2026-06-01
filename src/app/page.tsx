import { CTABanner } from '@/components/sections/CTABanner'
import { FAQSection } from '@/components/sections/FAQSection'
import { GalleryStrip } from '@/components/sections/GalleryStrip'
import HeroSection from '@/components/sections/HeroSection'
import { QuoteFormSection } from '@/components/sections/QuoteFormSection'
import { ServiceAreaSection } from '@/components/sections/ServiceAreaSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { TrustSection } from '@/components/sections/TrustSection'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <main id="main-content" tabIndex={-1} className="pb-[64px] outline-none md:pb-0">
        <HeroSection />
        <TrustSection />
        <ServicesSection />
        <ServiceAreaSection />
        <GalleryStrip />
        <TestimonialsSection />
        <QuoteFormSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
