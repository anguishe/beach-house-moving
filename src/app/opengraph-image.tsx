// Branded OG image — 1200×630 — hero photo + text overlay
// Edge Function target size: <200 KB (well under Vercel Hobby 1 MB limit)

import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt =
  'Beach House Moving — Licensed & Insured Movers on the Florida Panhandle'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadArrayBuffer(url: string | URL): Promise<ArrayBuffer> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load asset: ${response.status}`)
  }
  return response.arrayBuffer()
}

export default async function OgImage() {
  const [playfairBold, interRegular, interSemiBold] = await Promise.all([
    loadArrayBuffer(new URL('./fonts/playfair-bold-latin.woff2', import.meta.url)),
    loadArrayBuffer(new URL('./fonts/inter-regular-latin.woff2', import.meta.url)),
    loadArrayBuffer(new URL('./fonts/inter-semibold-latin.woff2', import.meta.url)),
  ])

  let heroSrc: string | null = null
  try {
    const heroBuffer = await loadArrayBuffer(
      new URL('../../public/images/og-hero.jpg', import.meta.url)
    )
    const base64 = Buffer.from(heroBuffer).toString('base64')
    heroSrc = `data:image/jpeg;base64,${base64}`
  } catch {
    // Silent — gradient fallback handles unavailable image
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: '"Inter", system-ui, sans-serif',
        }}
      >
        {heroSrc ? (
          <img
            alt=""
            src={heroSrc}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#1B2B4B',
            }}
          />
        )}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(27,43,75,0.88) 0%, rgba(27,43,75,0.88) 52%, rgba(27,43,75,0.20) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 52,
            width: 680,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 64,
            paddingRight: 40,
            gap: 0,
          }}
        >
          <div style={{ display: 'flex', marginBottom: 18 }}>
            <span
              style={{
                background: '#2A9D8F',
                color: '#FFFFFF',
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                padding: '7px 18px',
                borderRadius: 100,
              }}
            >
              Florida Panhandle · Licensed &amp; Insured
            </span>
          </div>

          <div
            style={{
              color: '#FFFFFF',
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.0,
              fontFamily: '"Playfair Display", Georgia, serif',
              marginBottom: 14,
            }}
          >
            Beach House Moving
          </div>

          <div
            style={{
              color: '#E9C46A',
              fontSize: 32,
              fontWeight: 400,
              fontStyle: 'italic',
              fontFamily: '"Playfair Display", Georgia, serif',
              marginBottom: 20,
            }}
          >
            Your Move, Our Mission.
          </div>

          <div
            style={{
              color: '#CBD5E0',
              fontSize: 19,
              fontWeight: 400,
              letterSpacing: '0.04em',
              marginBottom: 24,
            }}
          >
            Walton · Okaloosa · Bay Counties
          </div>

          <div style={{ display: 'flex' }}>
            <span
              style={{
                background: '#E85D3D',
                color: '#FFFFFF',
                fontSize: 22,
                fontWeight: 600,
                padding: '11px 30px',
                borderRadius: 100,
              }}
            >
              (850) 842-1962 · Free Quote
            </span>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 52,
            background: 'rgba(27,43,75,0.93)',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 64,
          }}
        >
          <span
            style={{
              color: '#CBD5E0',
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: '0.03em',
            }}
          >
            FL Mover Reg. #IM4125 · beachhousemoving.xyz · Open 24 Hours
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Playfair Display',
          data: playfairBold,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Inter',
          data: interRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  )
}
