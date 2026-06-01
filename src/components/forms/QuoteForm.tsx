'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { BUSINESS, QUOTE_FORM_MOVE_TYPES } from '@/lib/content'
import { trackQuoteLead, trackPhoneClick } from '@/lib/gtag'
import { quoteFormSchema, type QuoteFormData } from '@/lib/schema'

export function QuoteForm() {
  const router = useRouter()
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: { moveType: '' },
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const onSubmit = async (data: QuoteFormData) => {
    setStatus('loading')

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        trackQuoteLead()
        router.push('/thank-you')
        return
      }

      setStatus('error')
    } catch {
      setStatus('error')
    }
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
            Something went wrong. Please call us directly at{' '}
            <a
              href={BUSINESS.phone.href}
              onClick={() => trackPhoneClick('quote-form')}
              className="font-semibold text-brand-navy"
            >
              {BUSINESS.phone.display}
            </a>
            .
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" {...form.register('fullName')} aria-invalid={!!form.formState.errors.fullName} />
        {form.formState.errors.fullName && (
          <p className="font-body text-xs text-red-600">{form.formState.errors.fullName.message}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" {...form.register('phone')} aria-invalid={!!form.formState.errors.phone} />
          {form.formState.errors.phone && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register('email')} aria-invalid={!!form.formState.errors.email} />
          {form.formState.errors.email && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="moveType">Move Type</Label>
          <Controller
            name="moveType"
            control={form.control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) field.onChange(value)
                }}
              >
                <SelectTrigger id="moveType" className="w-full" aria-invalid={!!form.formState.errors.moveType}>
                  <SelectValue placeholder="Select move type..." />
                </SelectTrigger>
                <SelectContent>
                  {QUOTE_FORM_MOVE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.moveType && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.moveType.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="moveDate">Move Date</Label>
          <Input id="moveDate" type="date" {...form.register('moveDate')} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="moveFrom">Moving From</Label>
          <Input id="moveFrom" {...form.register('moveFrom')} aria-invalid={!!form.formState.errors.moveFrom} />
          {form.formState.errors.moveFrom && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.moveFrom.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="moveTo">Moving To</Label>
          <Input id="moveTo" {...form.register('moveTo')} aria-invalid={!!form.formState.errors.moveTo} />
          {form.formState.errors.moveTo && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.moveTo.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea id="notes" rows={4} {...form.register('notes')} />
      </div>

      <Button
        type="submit"
        disabled={status === 'loading'}
        className="h-11 w-full bg-brand-coral text-base font-semibold hover:bg-brand-coral-dark"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending...
          </>
        ) : (
          'Request My Free Quote'
        )}
      </Button>
    </form>
  )
}
