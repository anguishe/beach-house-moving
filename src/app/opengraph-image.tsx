// src/app/opengraph-image.tsx
// Split-layout OG image: photo left | navy text panel right.
// No text-on-photo — legible at all preview sizes (iMessage, Facebook, Slack, LinkedIn).
// Node.js runtime (default) — avoids Edge Runtime / Buffer incompatibility.
import { ImageResponse } from 'next/og'
import { BUSINESS } from '@/lib/content'

export const alt = 'Beach House Moving | Movers in Santa Rosa Beach, FL'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// No `export const runtime` — defaults to Node.js, which is correct.

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          backgroundColor: '#1B2B4B',
        }}
      >
        {/* ── LEFT: photo panel (55% = 660px) ── */}
        <div
          style={{
            display: 'flex',
            width: '660px',
            height: '630px',
            flexShrink: 0,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            src="https://beachhousemoving.xyz/images/og-hero.jpg"
            alt=""
            width={1200}
            height={630}
            style={{
              // Pull the image left so the van + logo + palm trees fill the panel
              // Source is 1200x630; we show the left 660px worth
              position: 'absolute',
              top: 0,
              left: 0,
              width: '1200px',
              height: '630px',
              objectFit: 'cover',
              objectPosition: 'left center',
            }}
          />
          {/* Subtle right-edge fade so photo blends into navy panel */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '80px',
              height: '630px',
              background: 'linear-gradient(to right, transparent, #1B2B4B)',
            }}
          />
        </div>

        {/* ── RIGHT: navy text panel (45% = 540px) ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '48px 52px 48px 40px',
            gap: '18px',
            flex: 1,
            backgroundColor: '#1B2B4B',
          }}
        >
          {/* Trust / license badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#2A9D8F',
              color: '#ffffff',
              fontSize: '17px',
              fontWeight: 600,
              padding: '6px 16px',
              borderRadius: '6px',
              letterSpacing: '0.02em',
              width: '45%',
              lineHeight: 1.3,
            }}
          >
            Licensed & Insured · #IM4125
          </div>

          {/* Business name */}
          <div
            style={{
              fontSize: '54px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
            }}
          >
            Beach House Moving
          </div>

          {/* Divider */}
          <div
            style={{
              width: '48px',
              height: '3px',
              backgroundColor: '#E85D3D',
              borderRadius: '2px',
            }}
          />

          {/* Service area */}
          <div
            style={{
              fontSize: '22px',
              color: '#CBD5E0',
              fontWeight: 400,
              lineHeight: 1.45,
            }}
          >
            Walton · Okaloosa · Bay County
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '19px',
              color: '#CBD5E0',
              fontWeight: 400,
              lineHeight: 1.4,
              fontStyle: 'italic',
            }}
          >
            {BUSINESS.tagline}
          </div>

          {/* Domain + phone row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              marginTop: '6px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                color: '#E9C46A',
                fontWeight: 600,
                letterSpacing: '0.02em',
              }}
            >
              beachhousemoving.xyz
            </div>
            <div
              style={{
                fontSize: '17px',
                color: '#718096',
                fontWeight: 400,
              }}
            >
              (850) 842-1962
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
