import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

import { contactFormSchema } from '@/lib/schema'
import { BUSINESS, EMAIL } from '@/lib/content'

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const data = contactFormSchema.parse(body)

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? EMAIL.quotesFrom,
      to: process.env.RESEND_TO_EMAIL ?? BUSINESS.email,
      subject: `Contact Form — ${data.fullName}`,
      html: `
        <h2>New Contact Message — ${BUSINESS.name}</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Name</strong></td><td>${data.fullName}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Message</strong></td><td>${data.message}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
