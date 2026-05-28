'use client'

import { motion } from 'framer-motion'
import { Phone, Star } from 'lucide-react'
import { BUSINESS, TESTIMONIALS_PLACEHOLDER } from '@/lib/content'

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-brand-sand py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-4 text-center">
          <p
            className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-[#2A9D8F]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            What Our Customers Say
          </p>
          <h2
            className="font-heading text-3xl font-bold text-brand-navy md:text-4xl"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#1B2B4B',
              fontWeight: 700,
            }}
          >
            The Panhandle Trusts Beach House Moving
          </h2>
          <div className="mx-auto my-4 h-[2px] w-10 rounded-full bg-[#2A9D8F]" />
          <p className="font-body text-lg text-ink-muted">Real reviews from real neighbors.</p>
        </div>

        <div className="mb-12 mt-6 flex items-center justify-center gap-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" strokeWidth={1.5} />
            ))}
          </div>
          <span className="font-heading text-xl font-bold text-brand-navy">5.0</span>
          <span className="font-body text-sm text-ink-muted">on Google</span>
        </div>

        {/* TODO: Replace TESTIMONIALS_PLACEHOLDER with verified Google/Facebook reviews before launch */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS_PLACEHOLDER.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col gap-4 rounded-brand bg-white p-6 shadow-brand">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" strokeWidth={1.5} />
                  ))}
                </div>

                <p
                  className="flex-1 font-body text-base italic leading-relaxed text-ink-muted"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    color: '#4A5568',
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-2">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-teal">
                    <span className="font-body text-sm font-semibold text-white">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p
                      className="font-body text-sm font-semibold text-brand-navy"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        color: '#1B2B4B',
                        fontWeight: 600,
                      }}
                    >
                      {testimonial.name}
                    </p>
                    <p className="font-body text-xs text-ink-light">{testimonial.location}</p>
                  </div>
                  <span className="ml-auto rounded border border-gray-200 px-2 py-0.5 font-body text-xs text-ink-light">
                    {testimonial.source}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-5 font-body text-base text-ink-muted">
            Join your neighbors across the Florida Panhandle.
          </p>
          <a
            href={BUSINESS.phone.href}
            className="inline-flex items-center gap-2.5 rounded-[12px] bg-[#E85D3D] px-8 py-4 font-body font-semibold text-white shadow-brand transition-all duration-200 hover:scale-[1.02] hover:bg-[#C94828] hover:shadow-[0_12px_40px_rgba(232,93,61,0.3)]"
          >
            <Phone className="h-4 w-4 text-white" strokeWidth={1.5} />
            Call for Your Free Quote
          </a>
        </div>
      </div>
    </section>
  )
}
