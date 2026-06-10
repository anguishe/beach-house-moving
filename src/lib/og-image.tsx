import { ImageResponse } from 'next/og'

import { BUSINESS, LICENSE_DISPLAY } from '@/lib/content'

const OG_BACKGROUND = `${BUSINESS.website}/images/move-miramar-beach.jpg`
const OG_LOGO = `${BUSINESS.website}/images/logo-dark.png`

type OgImageOptions = {
  width: number
  height: number
  layout: 'landscape' | 'square'
}

export function createOgImageResponse({ width, height, layout }: OgImageOptions) {
  const isSquare = layout === 'square'
  const padding = isSquare ? 48 : 60

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isSquare ? 'center' : 'flex-start',
          justifyContent: isSquare ? 'center' : 'flex-end',
          backgroundImage: `url(${OG_BACKGROUND})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          padding,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isSquare
              ? 'linear-gradient(180deg, rgba(27,43,75,0.55) 0%, rgba(27,43,75,0.85) 100%)'
              : 'linear-gradient(135deg, rgba(27,43,75,0.75) 0%, rgba(27,43,75,0.3) 60%, transparent 100%)',
          }}
        />
        {isSquare ? (
          // eslint-disable-next-line @next/next/no-img-element -- Satori/ImageResponse requires native img
          <img
            src={OG_LOGO}
            alt=""
            width={280}
            height={182}
            style={{ zIndex: 1, marginBottom: 32 }}
          />
        ) : null}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            zIndex: 1,
            textAlign: isSquare ? 'center' : 'left',
            alignItems: isSquare ? 'center' : 'flex-start',
          }}
        >
          <div
            style={{
              fontSize: isSquare ? 52 : 64,
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.1,
            }}
          >
            {BUSINESS.name}
          </div>
          <div
            style={{
              fontSize: isSquare ? 28 : 32,
              color: '#2A9D8F',
              fontWeight: 600,
            }}
          >
            Movers on the Emerald Coast
          </div>
          <div
            style={{
              fontSize: isSquare ? 24 : 28,
              color: '#CBD5E0',
              marginTop: 8,
            }}
          >
            {BUSINESS.phone.display} · {LICENSE_DISPLAY.footerRegistration}
          </div>
        </div>
      </div>
    ),
    { width, height },
  )
}
