'use client'

import type React from 'react'
import { motion } from 'framer-motion'
import { Clock, DollarSign, Heart, ShieldCheck } from 'lucide-react'
import { TRUST_BADGES } from '@/lib/content'

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Heart,
  DollarSign,
  Clock,
}

export function TrustSection() {
  return (
    <>
      <section
        style={{
          backgroundColor: '#1B2B4B',
          paddingTop: '56px',
          paddingBottom: '80px',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 32px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '40px',
            }}
            className="md:grid-cols-4"
          >
            {TRUST_BADGES.map((badge, index) => {
              const IconComponent = iconMap[badge.icon as keyof typeof iconMap]
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(42, 157, 143, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {IconComponent && (
                      <IconComponent
                        style={{ width: '24px', height: '24px', color: '#2A9D8F' }}
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '1.125rem',
                      lineHeight: '1.3',
                      margin: 0,
                    }}
                  >
                    {badge.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: 'rgba(255, 255, 255, 0.55)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      maxWidth: '160px',
                      margin: 0,
                    }}
                  >
                    {badge.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-teal/25 to-transparent" />
    </>
  )
}
