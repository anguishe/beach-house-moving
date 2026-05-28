'use client'

import { useState, type CSSProperties, type FocusEvent } from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, Loader2, Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { BUSINESS, QUOTE_FORM_MOVE_TYPES } from '@/lib/content'
import { quoteFormSchema, type QuoteFormData } from '@/lib/schema'

const trustItems = [
  'No robots. No hold music. A real person answers.',
  'Available 7 days a week — call anytime.',
  'Free estimates with zero obligation.',
] as const

const quotePhotos = [
  {
    src: '/images/move-inlet-beach.jpg',
    alt: 'Beach House Moving at Inlet Beach, FL',
    span: true,
  },
  {
    src: '/images/fleet-box-truck.jpg',
    alt: 'Beach House Moving box truck',
    span: false,
  },
  {
    src: '/images/team-stairs.jpg',
    alt: 'Beach House Moving team',
    span: false,
  },
] as const

const labelStyle: CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  color: '#1B2B4B',
  fontSize: '13px',
  fontWeight: 600,
  display: 'block',
  marginBottom: '6px',
}

const inputStyle: CSSProperties = {
  width: '100%',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '14px',
  color: '#1B2B4B',
  backgroundColor: '#FAFAFA',
  border: '1.5px solid rgba(27,43,75,0.12)',
  borderRadius: '10px',
  padding: '12px 14px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

const errorTextStyle: CSSProperties = {
  color: '#E53E3E',
  fontSize: '12px',
  marginTop: '4px',
  fontFamily: 'Inter, system-ui, sans-serif',
}

function handleFieldFocus(
  e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) {
  e.currentTarget.style.borderColor = '#2A9D8F'
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(42,157,143,0.12)'
}

function handleFieldBlur(
  e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) {
  e.currentTarget.style.borderColor = 'rgba(27,43,75,0.12)'
  e.currentTarget.style.boxShadow = 'none'
}

export function QuoteFormSection() {
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      moveType: '',
    },
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const fieldProps = (name: keyof QuoteFormData) => {
    const { ref, onChange, onBlur, name: fieldName } = form.register(name)
    return {
      name: fieldName,
      ref,
      onChange,
      onFocus: handleFieldFocus,
      onBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        void onBlur(e)
        handleFieldBlur(e)
      },
    }
  }

  const onSubmit = async (data: QuoteFormData) => {
    setStatus('loading')

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <style>{`
        @keyframes quote-form-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 1024px) {
          .quote-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .quote-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div id="contact" style={{ position: 'relative', top: '-80px' }} aria-hidden="true" />
      <section
        id="quote"
        style={{
          background: 'linear-gradient(to bottom, rgba(245,240,232,0.6), #FFFFFF)',
          padding: '96px 0',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div
            className="quote-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#2A9D8F',
                  fontWeight: 600,
                  fontSize: '12px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Free Estimates · No Obligation
              </p>

              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: '#1B2B4B',
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    lineHeight: 1.1,
                  }}
                >
                  The fastest way
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: '#E85D3D',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    lineHeight: 1.1,
                  }}
                >
                  to get moving?
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: '#1B2B4B',
                    fontWeight: 600,
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    lineHeight: 1.3,
                    marginTop: '8px',
                  }}
                >
                  Just call us.
                </span>
              </div>

              <a
                href={BUSINESS.phone.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '20px 24px',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(42,157,143,0.25)',
                  background: 'linear-gradient(to right, #F5F0E8, #FFFFFF)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: '0 2px 12px rgba(27,43,75,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(42,157,143,0.6)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,43,75,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(42,157,143,0.25)'
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(27,43,75,0.06)'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#2A9D8F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 16px rgba(42,157,143,0.3)',
                  }}
                >
                  <Phone style={{ width: '26px', height: '26px', color: '#FFFFFF' }} strokeWidth={1.6} />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: '#1B2B4B',
                      fontWeight: 700,
                      fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {BUSINESS.phone.display}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: '#718096',
                      fontSize: '13px',
                      margin: '6px 0 0',
                    }}
                  >
                    Tap to call · Available 7 days a week
                  </p>
                </div>
              </a>

              {trustItems.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2
                    style={{
                      width: '17px',
                      height: '17px',
                      color: '#2A9D8F',
                      marginTop: '2px',
                      flexShrink: 0,
                    }}
                    strokeWidth={1.8}
                  />
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: '#4A5568',
                      fontSize: '15px',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginTop: '8px',
                }}
              >
                {quotePhotos.map((photo) => (
                  <div
                    key={photo.src}
                    style={{
                      position: 'relative',
                      gridColumn: photo.span ? '1 / -1' : 'auto',
                      paddingBottom: photo.span ? '52%' : '100%',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      backgroundColor: '#F5F0E8',
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="400px"
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                        padding: '4px',
                      }}
                    />
                  </div>
                ))}
              </div>

              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#718096',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginTop: '4px',
                }}
              >
                Licensed & Insured · {BUSINESS.address.city}, {BUSINESS.address.state}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 8px 40px rgba(27,43,75,0.09)',
                border: '1px solid rgba(27,43,75,0.06)',
              }}
            >
              {status === 'success' ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '32px 0',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle2
                    style={{ width: '64px', height: '64px', color: '#22C55E' }}
                    strokeWidth={1.5}
                  />
                  <h3
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: '#1B2B4B',
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      margin: 0,
                    }}
                  >
                    Request Sent!
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: '#718096',
                      fontSize: '15px',
                      margin: 0,
                    }}
                  >
                    We&apos;ll call you back shortly. Questions in the meantime?
                  </p>
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
                      fontSize: '15px',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(232,93,61,0.3)',
                    }}
                  >
                    <Phone style={{ width: '16px', height: '16px' }} strokeWidth={1.6} />
                    Call {BUSINESS.phone.display}
                  </a>
                </div>
              ) : (
                <>
                  <h3
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: '#1B2B4B',
                      fontWeight: 700,
                      fontSize: '1.4rem',
                      marginBottom: '4px',
                      marginTop: 0,
                    }}
                  >
                    Prefer a form?
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: '#718096',
                      fontSize: '14px',
                      marginBottom: '28px',
                      marginTop: 0,
                    }}
                  >
                    Fill this out and we&apos;ll call you back.
                  </p>

                  {status === 'error' && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '20px',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        border: '1px solid #FECACA',
                        backgroundColor: '#FEF2F2',
                      }}
                    >
                      <AlertCircle
                        style={{
                          width: '16px',
                          height: '16px',
                          color: '#E53E3E',
                          marginTop: '2px',
                          flexShrink: 0,
                        }}
                        strokeWidth={1.6}
                      />
                      <p
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          color: '#991B1B',
                          fontSize: '14px',
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        Something went wrong. Please call us directly at{' '}
                        <a
                          href={BUSINESS.phone.href}
                          style={{ color: '#1B2B4B', fontWeight: 600, textDecoration: 'none' }}
                        >
                          {BUSINESS.phone.display}
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div style={{ marginBottom: '16px' }}>
                      <label htmlFor="fullName" style={labelStyle}>
                        Full Name
                      </label>
                      <input id="fullName" style={inputStyle} {...fieldProps('fullName')} />
                      {form.formState.errors.fullName && (
                        <p style={errorTextStyle}>{form.formState.errors.fullName.message}</p>
                      )}
                    </div>

                    <div
                      className="quote-form-row"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                      }}
                    >
                      <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="phone" style={labelStyle}>
                          Phone
                        </label>
                        <input id="phone" type="tel" style={inputStyle} {...fieldProps('phone')} />
                        {form.formState.errors.phone && (
                          <p style={errorTextStyle}>{form.formState.errors.phone.message}</p>
                        )}
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="email" style={labelStyle}>
                          Email
                        </label>
                        <input id="email" type="email" style={inputStyle} {...fieldProps('email')} />
                        {form.formState.errors.email && (
                          <p style={errorTextStyle}>{form.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div
                      className="quote-form-row"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                      }}
                    >
                      <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="moveType" style={labelStyle}>
                          Move Type
                        </label>
                        <select id="moveType" style={inputStyle} {...fieldProps('moveType')}>
                          <option value="" disabled>
                            Select move type...
                          </option>
                          {QUOTE_FORM_MOVE_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {form.formState.errors.moveType && (
                          <p style={errorTextStyle}>{form.formState.errors.moveType.message}</p>
                        )}
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="moveDate" style={labelStyle}>
                          Move Date
                        </label>
                        <input id="moveDate" type="date" style={inputStyle} {...fieldProps('moveDate')} />
                      </div>
                    </div>

                    <div
                      className="quote-form-row"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                      }}
                    >
                      <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="moveFrom" style={labelStyle}>
                          Moving From
                        </label>
                        <input id="moveFrom" style={inputStyle} {...fieldProps('moveFrom')} />
                        {form.formState.errors.moveFrom && (
                          <p style={errorTextStyle}>{form.formState.errors.moveFrom.message}</p>
                        )}
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="moveTo" style={labelStyle}>
                          Moving To
                        </label>
                        <input id="moveTo" style={inputStyle} {...fieldProps('moveTo')} />
                        {form.formState.errors.moveTo && (
                          <p style={errorTextStyle}>{form.formState.errors.moveTo.message}</p>
                        )}
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label htmlFor="notes" style={labelStyle}>
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        style={{ ...inputStyle, resize: 'none' }}
                        {...fieldProps('notes')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      style={{
                        width: '100%',
                        backgroundColor: status === 'loading' ? '#E85D3D' : '#E85D3D',
                        color: '#FFFFFF',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: 600,
                        fontSize: '15px',
                        padding: '15px',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: status === 'loading' ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        marginTop: '8px',
                        boxShadow: '0 4px 20px rgba(232,93,61,0.3)',
                        transition: 'background-color 0.2s, box-shadow 0.2s',
                        opacity: status === 'loading' ? 0.85 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (status !== 'loading') {
                          e.currentTarget.style.backgroundColor = '#C94828'
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#E85D3D'
                      }}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2
                            style={{
                              width: '16px',
                              height: '16px',
                              animation: 'quote-form-spin 1s linear infinite',
                            }}
                            strokeWidth={1.6}
                          />
                          Sending...
                        </>
                      ) : (
                        'Request My Free Quote →'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
