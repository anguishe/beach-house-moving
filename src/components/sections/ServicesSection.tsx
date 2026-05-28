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
    <section id="services" style={{ backgroundColor: '#F5F0E8', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#2A9D8F',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            What We Do
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#1B2B4B',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              marginBottom: '16px',
              lineHeight: 1.15,
            }}
          >
            Full-Service Moving, Start to Finish
          </h2>
          <div
            style={{
              width: '40px',
              height: '2px',
              backgroundColor: '#2A9D8F',
              margin: '0 auto 20px',
            }}
          />
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#4A5568',
              fontSize: '17px',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            From the first box packed to the last item placed — we handle every detail so you
            don&apos;t have to.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {SERVICES.map((service, index) => {
            const ServiceIcon = serviceIconMap[service.icon]

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(27,43,75,0.07)',
                  border: '1px solid rgba(27,43,75,0.06)',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  cursor: 'pointer',
                }}
                whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(27,43,75,0.13)' }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '62%',
                    backgroundColor: '#F5F0E8',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={service.image}
                    alt={`Beach House Moving — ${service.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'center center',
                      padding: '8px',
                    }}
                  />
                </div>

                <div style={{ padding: '24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '10px',
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(42,157,143,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {ServiceIcon && (
                        <ServiceIcon
                          style={{ width: '20px', height: '20px', color: '#2A9D8F' }}
                          strokeWidth={1.6}
                        />
                      )}
                    </div>
                    <h3
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        color: '#1B2B4B',
                        fontWeight: 600,
                        fontSize: '1.2rem',
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: '#4A5568',
                      fontSize: '14px',
                      lineHeight: 1.7,
                      margin: '0 0 16px',
                    }}
                  >
                    {service.shortDescription}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#2A9D8F',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    Learn more
                    <ArrowRight style={{ width: '13px', height: '13px' }} strokeWidth={2} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div
          style={{
            backgroundColor: '#1B2B4B',
            borderRadius: '16px',
            padding: '56px 48px',
            textAlign: 'center',
            marginTop: '72px',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#2A9D8F',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Ready When You Are
          </p>
          <h3
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              marginBottom: '28px',
              lineHeight: 1.2,
            }}
          >
            Call us today for a free estimate.
          </h3>
          <a
            href={BUSINESS.phone.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#E85D3D',
              color: '#FFFFFF',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '19px',
              padding: '18px 40px',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(232,93,61,0.35)',
            }}
          >
            <Phone style={{ width: '20px', height: '20px' }} strokeWidth={1.8} />
            {BUSINESS.phone.display}
          </a>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '12px',
              marginTop: '16px',
            }}
          >
            Licensed & Insured · Available 7 Days a Week
          </p>
        </div>
      </div>
    </section>
  )
}
