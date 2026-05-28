import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { quoteFormSchema } from '@/lib/schema'

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
    }

    if (!process.env.RESEND_FROM_EMAIL || !process.env.RESEND_TO_EMAIL) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const data = quoteFormSchema.parse(body)

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      subject: `New Quote Request — ${data.fullName}`,
      html: `
        <h2>New Quote Request — Beach House Moving</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td><strong>Name</strong></td><td>${data.fullName}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Move Type</strong></td><td>${data.moveType}</td></tr>
          <tr><td><strong>Move Date</strong></td><td>${data.moveDate ?? 'Not specified'}</td></tr>
          <tr><td><strong>Moving From</strong></td><td>${data.moveFrom}</td></tr>
          <tr><td><strong>Moving To</strong></td><td>${data.moveTo}</td></tr>
          <tr><td><strong>Notes</strong></td><td>${data.notes ?? 'None'}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Quote form error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
