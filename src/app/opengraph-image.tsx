import { ImageResponse } from 'next/og'

import { BUSINESS } from '@/lib/content'

export const alt = `${BUSINESS.name} — Licensed movers serving Walton, Okaloosa & Bay Counties`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const playfairBold = await fetch(
    'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQ.ttf',
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1B2B4B',
          padding: '64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px',
          }}
        >
          <p
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: 'Playfair Display',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {BUSINESS.name}
          </p>

          <div
            style={{
              width: 120,
              height: 4,
              backgroundColor: '#E85D3D',
              borderRadius: 2,
            }}
          />

          <p
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: '#E85D3D',
              fontFamily: 'sans-serif',
              margin: 0,
            }}
          >
            {BUSINESS.phone.display}
          </p>

          <p
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'sans-serif',
              margin: 0,
            }}
          >
            {`Licensed & Insured #${BUSINESS.registration.number}`}
          </p>

          <p
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.65)',
              fontFamily: 'sans-serif',
              margin: 0,
              letterSpacing: '0.04em',
            }}
          >
            Walton · Okaloosa · Bay
          </p>
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
      ],
    },
  )
}
