'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { BUSINESS } from '@/lib/content'
import { contactFormSchema, type ContactFormData } from '@/lib/schema'

export function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
        return
      }

      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle2 className="size-14 text-green-500" strokeWidth={1.5} aria-hidden />
        <h3 className="font-heading text-xl font-bold text-brand-navy">Message Sent</h3>
        <p className="font-body text-sm text-ink-muted">
          We&apos;ll get back to you shortly. Need a faster response? Call{' '}
          <a href={BUSINESS.phone.href} className="font-semibold text-brand-navy">
            {BUSINESS.phone.display}
          </a>
          .
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setStatus('idle')}
          className="mt-2"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-brand border border-red-200 bg-red-50 p-4"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" aria-hidden />
          <p className="font-body text-sm text-red-800">
            Something went wrong. Please call us at{' '}
            <a href={BUSINESS.phone.href} className="font-semibold text-brand-navy">
              {BUSINESS.phone.display}
            </a>
            .
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="contact-fullName">Full Name</Label>
        <Input
          id="contact-fullName"
          {...form.register('fullName')}
          aria-invalid={!!form.formState.errors.fullName}
        />
        {form.formState.errors.fullName && (
          <p className="font-body text-xs text-red-600">{form.formState.errors.fullName.message}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input
            id="contact-phone"
            type="tel"
            {...form.register('phone')}
            aria-invalid={!!form.formState.errors.phone}
          />
          {form.formState.errors.phone && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            {...form.register('email')}
            aria-invalid={!!form.formState.errors.email}
          />
          {form.formState.errors.email && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={5}
          {...form.register('message')}
          aria-invalid={!!form.formState.errors.message}
        />
        {form.formState.errors.message && (
          <p className="font-body text-xs text-red-600">{form.formState.errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={status === 'loading'}
        className="h-11 w-full bg-brand-coral font-semibold hover:bg-brand-coral-dark"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  )
}
