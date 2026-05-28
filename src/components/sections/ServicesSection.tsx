'use client'

import type React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Home,
  MapPin,
  Package,
  PackageCheck,
  Phone,
  Truck,
  Warehouse,
} from 'lucide-react'
import { BUSINESS, SERVICES } from '@/lib/content'

const serviceIconMap: Record<string, React.ElementType> = {
  Package,
  Home,
  MapPin,
  Truck,
  Warehouse,
  PackageCheck,
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-brand-sand py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center md:mb-16">
          <p
            className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-[#2A9D8F]"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#2A9D8F',
              fontWeight: 600,
              letterSpacing: '0.2em',
              fontSize: '12px',
              textTransform: 'uppercase',
            }}
          >
            What We Do
          </p>
          <h2
            className="font-heading text-3xl font-bold text-brand-navy md:text-4xl"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#1B2B4B',
              fontWeight: 700,
            }}
          >
            Full-Service Moving, Start to Finish
          </h2>
          <div className="mx-auto my-4 h-[2px] w-10 rounded-full bg-[#2A9D8F]" />
          <p
            className="mx-auto max-w-2xl font-body text-lg text-ink-muted"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#4A5568' }}
          >
            From the first box packed to the last item placed — we handle every detail so you
            don&apos;t have to.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const ServiceIcon = serviceIconMap[service.icon]

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="group overflow-hidden rounded-brand bg-white shadow-brand transition-all duration-300 hover:shadow-brand-hover">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F0E8]">
                    <Image
                      src={service.image}
                      fill
                      style={{ objectFit: 'contain', objectPosition: 'center center', padding: '8px' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt={`Beach House Moving — ${service.title}`}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[8px] bg-[#2A9D8F]/10">
                        {ServiceIcon && (
                          <ServiceIcon className="h-5 w-5 text-[#2A9D8F]" strokeWidth={1.5} />
                        )}
                      </div>
                      <h3
                        className="font-heading text-xl font-semibold text-brand-navy"
                        style={{
                          fontFamily: '"Playfair Display", Georgia, serif',
                          color: '#1B2B4B',
                          fontWeight: 600,
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <p
                      className="font-body text-sm leading-relaxed text-ink-muted"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#4A5568' }}
                    >
                      {service.shortDescription}
                    </p>

                    <p className="mt-auto flex items-center gap-1.5 pt-2 font-body text-sm font-medium text-[#2A9D8F] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 text-[#2A9D8F]" strokeWidth={1.5} />
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div
          className="mt-16 rounded-brand bg-brand-navy px-6 py-12 text-center md:px-12"
          style={{ backgroundColor: '#1B2B4B', borderRadius: '12px', padding: '48px 48px', textAlign: 'center', marginTop: '64px' }}
        >
          <p
            className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-[#2A9D8F]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Ready When You Are
          </p>
          <h3
            className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', marginBottom: '24px' }}
          >
            Call us today for a free estimate.
          </h3>
          <a
            href={BUSINESS.phone.href}
            className="inline-flex items-center gap-3 rounded-[12px] bg-[#E85D3D] px-10 py-5 font-body text-xl font-semibold text-white shadow-[0_12px_48px_rgba(27,43,75,0.18)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#C94828] active:scale-[0.98]"
            style={{ backgroundColor: '#E85D3D', color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: '20px', padding: '20px 40px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 12px 48px rgba(27,43,75,0.18)' }}
          >
            <Phone className="h-5 w-5 text-white" strokeWidth={1.5} />
            {BUSINESS.phone.display}
          </a>
          <p className="mt-4 font-body text-xs text-white/35">
            Licensed & Insured · Available 7 Days a Week
          </p>
        </div>
      </div>
    </section>
  )
}
