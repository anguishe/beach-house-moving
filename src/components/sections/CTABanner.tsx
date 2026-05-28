import { Phone } from 'lucide-react'
import { BUSINESS } from '@/lib/content'

export function CTABanner() {
  return (
    <section
      className="bg-brand-coral py-16 md:py-20"
      style={{ backgroundColor: '#E85D3D', padding: '64px 0', textAlign: 'center' }}
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
        <p
          className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-[#2A9D8F]"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          Don&apos;t Stress the Move
        </p>

        <h2
          className="mb-4 font-heading text-4xl font-bold text-white md:text-5xl"
          style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}
        >
          Ready to get moving?
        </h2>

        <p className="mx-auto mb-10 max-w-xl font-body text-lg text-white/80">
          Call us today for a free, no-obligation estimate. Available 7 days a week.
        </p>

        <a
          href={BUSINESS.phone.href}
          className="inline-flex items-center gap-4 rounded-[14px] bg-white px-10 py-6 font-heading text-3xl font-bold text-[#E85D3D] shadow-[0_20px_60px_rgba(27,43,75,0.2)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#F5F0E8] hover:shadow-[0_24px_80px_rgba(27,43,75,0.28)] active:scale-[0.99] md:text-4xl"
          style={{ backgroundColor: '#FFFFFF', color: '#E85D3D', textDecoration: 'none', fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', padding: '24px 40px', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', gap: '16px', boxShadow: '0 20px 60px rgba(27,43,75,0.2)' }}
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E85D3D]">
            <Phone className="h-6 w-6 text-white" strokeWidth={1.5} />
          </div>
          {BUSINESS.phone.display}
        </a>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="font-body text-sm text-white/40">or</span>
          <a
            href="#quote"
            className="font-body text-sm font-medium text-white/70 no-underline transition-colors duration-200 hover:text-white"
          >
            Fill out a quote form →
          </a>
        </div>
      </div>
    </section>
  )
}
