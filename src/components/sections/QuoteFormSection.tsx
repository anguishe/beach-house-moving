'use client'

import { useState } from 'react'
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
  { src: '/images/move-inlet-beach.jpg', alt: 'Beach House Moving at Inlet Beach, FL' },
  { src: '/images/fleet-box-truck.jpg', alt: 'Beach House Moving box truck with lift gate' },
  { src: '/images/team-stairs.jpg', alt: 'Beach House Moving team carrying items' },
  { src: '/images/move-miramar-beach.jpg', alt: 'Beach House Moving at Miramar Beach, FL' },
] as const

const labelClassName =
  'font-body text-[#1B2B4B] text-sm font-medium mb-1.5 block'
const inputClassName =
  'w-full bg-white border border-gray-200 focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/15 rounded-[10px] px-4 py-3 text-[#1B2B4B] font-body text-sm outline-none transition-all duration-200 placeholder:text-gray-300'
const selectClassName =
  'w-full bg-white border border-gray-200 focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/15 rounded-[10px] px-4 py-3 text-[#1B2B4B] font-body text-sm outline-none transition-all duration-200 cursor-pointer appearance-none'
const textareaClassName =
  'w-full bg-white border border-gray-200 focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/15 rounded-[10px] px-4 py-3 text-[#1B2B4B] font-body text-sm outline-none transition-all duration-200 resize-none placeholder:text-gray-300'

export function QuoteFormSection() {
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      moveType: '',
    },
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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
      <div id="contact" className="relative -top-20" aria-hidden="true" />
      <section
        id="quote"
        className="bg-gradient-to-b from-[#F5F0E8]/60 to-white py-16 md:py-24"
      >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <p
              className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-[#2A9D8F]"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Free Estimates · No Obligation
            </p>

            <h2
              className="font-heading font-bold leading-tight text-[#1B2B4B]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              <span
                className="block text-3xl md:text-4xl"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: '#1B2B4B',
                  fontWeight: 700,
                  display: 'block',
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                }}
              >
                The fastest way
              </span>
              <span
                className="block text-3xl italic text-[#E85D3D] md:text-4xl"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: '#E85D3D',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  display: 'block',
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                }}
              >
                to get moving?
              </span>
            </h2>
            <h3
              className="mt-1 font-heading text-2xl font-semibold text-[#1B2B4B] md:text-3xl"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                color: '#1B2B4B',
                fontWeight: 600,
                fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
              }}
            >
              Just call us.
            </h3>

            <a
              href={BUSINESS.phone.href}
              className="group my-6 flex items-center gap-5 rounded-[14px] border border-[#2A9D8F]/25 bg-gradient-to-r from-[#F5F0E8] to-white p-5 font-body text-inherit no-underline transition-all duration-200 hover:border-[#2A9D8F]/60 hover:shadow-[0_8px_32px_rgba(27,43,75,0.1)]"
            >
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#2A9D8F] shadow-[0_4px_16px_rgba(42,157,143,0.3)] transition-transform duration-200 group-hover:scale-105">
                <Phone className="h-7 w-7 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-heading text-3xl font-bold leading-none text-[#1B2B4B] transition-colors duration-200 group-hover:text-[#E85D3D] md:text-4xl">
                  {BUSINESS.phone.display}
                </p>
                <p className="mt-1.5 font-body text-sm text-[#718096]">
                  Tap to call · Available 7 days a week
                </p>
              </div>
            </a>

            {trustItems.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-teal"
                  strokeWidth={1.5}
                />
                <p className="font-body text-sm text-ink-muted">{item}</p>
              </div>
            ))}

            <div className="mt-6 grid grid-cols-2 gap-3">
              {quotePhotos.map((photo, i) => (
                <div
                  key={photo.src}
                  className={`relative overflow-hidden rounded-[10px] ${
                    i === 0 ? 'col-span-2 aspect-[16/7]' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-center font-body text-xs text-[#718096]">
              Licensed & Insured · {BUSINESS.address.city}, {BUSINESS.address.state}
            </p>
          </div>

          <div className="rounded-[16px] border border-gray-100 bg-white p-6 shadow-[0_8px_40px_rgba(27,43,75,0.1)] md:p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" strokeWidth={1.5} />
                <h3
                  className="font-heading text-2xl font-bold text-brand-navy"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  Request Sent!
                </h3>
                <p className="font-body text-base text-ink-muted">
                  We&apos;ll call you back shortly. Questions in the meantime?
                </p>
                <a
                  href={BUSINESS.phone.href}
                  className="inline-flex items-center gap-2.5 rounded-[12px] bg-[#E85D3D] px-8 py-4 font-body font-semibold text-white transition-all duration-200 hover:bg-[#C94828] hover:shadow-[0_8px_32px_rgba(232,93,61,0.3)]"
                >
                  <Phone className="h-4 w-4 text-white" strokeWidth={1.5} />
                  Call {BUSINESS.phone.display}
                </a>
              </div>
            ) : (
              <>
                <h3
                  className="mb-1 font-heading text-xl font-semibold text-brand-navy"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  Prefer a form?
                </h3>
                <p className="mb-6 font-body text-sm text-ink-muted">
                  Fill this out and we&apos;ll call you back.
                </p>

                {status === 'error' && (
                  <div className="mb-4 flex items-start gap-3 rounded-brand border border-red-200 bg-red-50 p-4">
                    <AlertCircle
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500"
                      strokeWidth={1.5}
                    />
                    <p className="font-body text-sm text-red-700">
                      Something went wrong. Please call us directly at{' '}
                      <a
                        href={BUSINESS.phone.href}
                        className="font-body font-semibold text-[#1B2B4B] no-underline transition-colors hover:text-[#E85D3D]"
                      >
                        {BUSINESS.phone.display}
                      </a>
                      .
                    </p>
                  </div>
                )}

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className={labelClassName}>
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      className={inputClassName}
                      {...form.register('fullName')}
                    />
                    {form.formState.errors.fullName && (
                      <p className="font-body text-xs text-red-500">
                        {form.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className={labelClassName}>
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className={inputClassName}
                        {...form.register('phone')}
                      />
                      {form.formState.errors.phone && (
                        <p className="font-body text-xs text-red-500">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className={labelClassName}>
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={inputClassName}
                        {...form.register('email')}
                      />
                      {form.formState.errors.email && (
                        <p className="font-body text-xs text-red-500">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="moveType" className={labelClassName}>
                        Move Type
                      </label>
                      <select
                        id="moveType"
                        className={selectClassName}
                        {...form.register('moveType')}
                      >
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
                        <p className="font-body text-xs text-red-500">
                          {form.formState.errors.moveType.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="moveDate" className={labelClassName}>
                        Move Date
                      </label>
                      <input
                        id="moveDate"
                        type="date"
                        className={inputClassName}
                        {...form.register('moveDate')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="moveFrom" className={labelClassName}>
                        Moving From
                      </label>
                      <input
                        id="moveFrom"
                        className={inputClassName}
                        {...form.register('moveFrom')}
                      />
                      {form.formState.errors.moveFrom && (
                        <p className="font-body text-xs text-red-500">
                          {form.formState.errors.moveFrom.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="moveTo" className={labelClassName}>
                        Moving To
                      </label>
                      <input
                        id="moveTo"
                        className={inputClassName}
                        {...form.register('moveTo')}
                      />
                      {form.formState.errors.moveTo && (
                        <p className="font-body text-xs text-red-500">
                          {form.formState.errors.moveTo.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="notes" className={labelClassName}>
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      className={textareaClassName}
                      {...form.register('notes')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#E85D3D] py-4 font-body text-base font-semibold tracking-wide text-white transition-all duration-200 hover:scale-[1.01] hover:bg-[#C94828] hover:shadow-[0_8px_32px_rgba(232,93,61,0.3)] active:scale-[0.99] disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" strokeWidth={1.5} />
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
