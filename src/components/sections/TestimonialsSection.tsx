'use client'

import { motion } from 'framer-motion'
import { Phone, Star } from 'lucide-react'
import { BUSINESS, FLAGS, TESTIMONIALS_PLACEHOLDER } from '@/lib/content'
import { trackPhoneClick } from '@/lib/gtag'

type TestimonialItem = {
  name: string
  text: string
  location: string
  source: string
}

export function TestimonialsSection() {
  if (!FLAGS.SHOW_TESTIMONIALS) {
    return null
  }

  const testimonials = TESTIMONIALS_PLACEHOLDER as readonly TestimonialItem[]

  return (
    <section id="about" className="bg-brand-sand py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
            What Our Customers Say
          </p>
          <h2 className="mb-4 font-heading text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
            The Panhandle Trusts Beach House Moving
          </h2>
          <div className="mx-auto mb-5 h-0.5 w-10 bg-brand-teal" />
          <p className="font-body text-base leading-relaxed text-ink-muted">
            Real reviews from real neighbors.
          </p>
        </div>

        <div className="mb-14 flex items-center justify-center gap-2.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="size-5 fill-brand-gold text-brand-gold"
                strokeWidth={0}
                aria-hidden
              />
            ))}
          </div>
          <span className="font-heading text-xl font-bold text-brand-navy">5.0</span>
          <span className="font-body text-sm text-ink-light">on Google</span>
        </div>

        {/* TODO: Replace TESTIMONIALS_PLACEHOLDER with verified Google/Facebook reviews before launch */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={`${t.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-4 rounded-brand border border-brand-navy/6 bg-white p-6 shadow-brand md:p-7"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="size-4 fill-brand-gold text-brand-gold"
                    strokeWidth={0}
                    aria-hidden
                  />
                ))}
              </div>

              <p className="m-0 flex-1 font-body text-base italic leading-relaxed text-ink-muted">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t border-brand-navy/8 pt-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-teal">
                  <span className="font-body text-base font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="m-0 font-body text-sm font-semibold text-brand-navy">{t.name}</p>
                  <p className="m-0 font-body text-xs text-ink-light">{t.location}</p>
                </div>
                <span className="shrink-0 rounded-sm border border-brand-navy/12 px-2 py-0.5 font-body text-xs text-ink-light">
                  {t.source}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="mb-5 font-body text-base text-ink-muted">
            Join your neighbors across the Florida Panhandle.
          </p>
          <a
            href={BUSINESS.phone.href}
            onClick={() => trackPhoneClick('testimonials-section')}
            className="inline-flex items-center gap-2 rounded-brand bg-brand-coral px-8 py-4 font-body text-base font-semibold text-white no-underline shadow-brand transition-colors duration-200 hover:bg-brand-coral-dark hover:shadow-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
          >
            <Phone className="size-4" strokeWidth={1.8} aria-hidden />
            Call for Your Free Quote
          </a>
        </div>
      </div>
    </section>
  )
}
