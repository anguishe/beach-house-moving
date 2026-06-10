// Next.js file-based OG image — auto-injects <meta og:image> via Metadata API.
// Node.js runtime (no edge export) so Buffer and fs are available if needed.
import { ImageResponse } from 'next/og'

export const alt = 'Beach House Moving | Movers in Santa Rosa Beach, FL'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          backgroundColor: '#1B2B4B',
        }}
      >
        {/* Background photo — landscape crop of branded van at beachfront property */}
        <img
          src="https://beachhousemoving.xyz/images/og-hero.jpg"
          alt=""
          width={1200}
          height={630}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {/* Gradient overlay — dark on left so text reads cleanly */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(105deg, rgba(27,43,75,0.88) 0%, rgba(27,43,75,0.55) 55%, rgba(27,43,75,0.20) 100%)',
          }}
        />
        {/* Content block — bottom-left */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '52px 68px',
            gap: '14px',
            height: '100%',
          }}
        >
          {/* License / trust badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#2A9D8F',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 600,
              padding: '6px 18px',
              borderRadius: '6px',
              letterSpacing: '0.03em',
              width: 'fit-content',
            }}
          >
            Licensed & Insured · FL Mover Reg. #IM4125
          </div>
          {/* Business name */}
          <div
            style={{
              fontSize: '68px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
            }}
          >
            Beach House Moving
          </div>
          {/* Service area line */}
          <div
            style={{
              fontSize: '26px',
              color: '#CBD5E0',
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Walton · Okaloosa · Bay County · Emerald Coast, FL
          </div>
          {/* Domain anchor */}
          <div
            style={{
              fontSize: '20px',
              color: '#E9C46A',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            beachhousemoving.xyz
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
