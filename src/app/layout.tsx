import type { Metadata } from 'next'
import { connection } from 'next/server'
import { Playfair_Display, Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { getSiteOrigin } from '@/lib/site-url'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  await connection()
  const metadataBase = await getSiteOrigin()

  return {
    metadataBase,
    title: 'Beach House Moving | Movers in Santa Rosa Beach, FL',
    description:
      'Locally owned & fully licensed movers serving Walton, Okaloosa & Bay Counties. Packing, loading, transportation & storage. Get your free quote — (850) 842-1962.',
    openGraph: {
      title: 'Beach House Moving | Santa Rosa Beach, FL',
      description: "The Florida Panhandle's premier locally owned movers.",
      url: metadataBase.origin,
      type: 'website',
      locale: 'en_US',
      siteName: 'Beach House Moving',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Beach House Moving | Santa Rosa Beach, FL',
      description: "The Florida Panhandle's premier locally owned movers.",
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="pt-0">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
