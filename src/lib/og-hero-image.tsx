import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { BUSINESS, TRUST_BADGES } from '@/lib/content'

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const
export const OG_IMAGE_ALT = `${BUSINESS.name} — ${BUSINESS.headline}`

async function loadGoogleFont(
  fontFamily: string,
  weight: number,
  style: 'normal' | 'italic' = 'normal'
): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${fontFamily}:ital,wght@${style === 'italic' ? '1' : '0'},${weight}&display=swap`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/533.21 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    }
  ).then((res) => res.text())

  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype|woff)'\)/)
  if (!match?.[1]) {
    throw new Error(`Could not load font: ${fontFamily} ${weight}`)
  }

  return fetch(match[1]).then((res) => res.arrayBuffer())
}

export async function generateOgHeroImage() {
  const [heroBuffer, logoBuffer, playfairBold, playfairItalic, interRegular, interSemiBold] =
    await Promise.all([
      readFile(join(process.cwd(), 'public/images/hero-van.jpg')),
      readFile(join(process.cwd(), 'public/images/logo-light.png')),
      loadGoogleFont('Playfair+Display', 700, 'normal'),
      loadGoogleFont('Playfair+Display', 700, 'italic'),
      loadGoogleFont('Inter', 400, 'normal'),
      loadGoogleFont('Inter', 600, 'normal'),
    ])

  const heroSrc = `data:image/jpeg;base64,${heroBuffer.toString('base64')}`
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#1B2B4B',
        }}
      >
        {/* Hero background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '75% center',
          }}
        />

        {/* Hero gradient overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(27,43,75,0.92) 0%, rgba(27,43,75,0.75) 45%, rgba(27,43,75,0.15) 75%, rgba(27,43,75,0.0) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(27,43,75,0.55) 0%, rgba(27,43,75,0.0) 30%, rgba(27,43,75,0.0) 60%, rgba(27,43,75,0.65) 100%)',
          }}
        />

        {/* Navbar strip */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            padding: '22px 48px',
            backgroundColor: 'rgba(27, 43, 75, 0.15)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" height={34} style={{ height: 34, width: 'auto' }} />
        </div>

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '88px 56px 56px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 620 }}>
            <p
              style={{
                margin: 0,
                marginBottom: 14,
                fontFamily: 'Inter',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#2A9D8F',
              }}
            >
              Walton · Okaloosa · Bay Counties
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}>
              <span
                style={{
                  fontFamily: 'Playfair Display',
                  fontSize: 64,
                  fontWeight: 700,
                  lineHeight: 1.05,
                  color: '#FFFFFF',
                }}
              >
                Your Move,
              </span>
              <span
                style={{
                  fontFamily: 'Playfair Display',
                  fontSize: 64,
                  fontWeight: 700,
                  fontStyle: 'italic',
                  lineHeight: 1.05,
                  color: '#E9C46A',
                }}
              >
                Our Mission.
              </span>
            </div>

            <p
              style={{
                margin: 0,
                marginBottom: 28,
                fontFamily: 'Inter',
                fontSize: 18,
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.82)',
                maxWidth: 520,
              }}
            >
              {BUSINESS.subheadline}
            </p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#E85D3D',
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontSize: 18,
                  fontWeight: 600,
                  padding: '14px 26px',
                  borderRadius: 10,
                  boxShadow: '0 8px 32px rgba(232,93,61,0.4)',
                }}
              >
                {BUSINESS.phone.display}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '2px solid rgba(255,255,255,0.65)',
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  fontFamily: 'Inter',
                  fontSize: 18,
                  fontWeight: 600,
                  padding: '14px 26px',
                  borderRadius: 10,
                }}
              >
                Get a Free Quote
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TRUST_BADGES.slice(0, 3).map((badge) => (
                <div
                  key={badge.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'Inter',
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.88)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 999,
                    padding: '7px 14px',
                  }}
                >
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        { name: 'Playfair Display', data: playfairBold, weight: 700, style: 'normal' },
        { name: 'Playfair Display', data: playfairItalic, weight: 700, style: 'italic' },
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
      ],
    }
  )
}
