import { ImageResponse } from 'next/og'

export const alt = 'Wryko - Outbound That Runs Itself'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OGImage() {
  const soraFontData = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/sora@latest/latin-700-normal.woff'
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#090B11',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '400px',
            background:
              'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.15), rgba(99, 102, 241, 0.05) 50%, transparent 80%)',
            display: 'flex',
          }}
        />

        {/* Top gradient accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #9333EA, #7C3AED, #6366F1)',
            display: 'flex',
          }}
        />

        {/* Logo mark - using white for Satori SVG compatibility */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          style={{ marginBottom: '32px' }}
        >
          <circle
            cx="40"
            cy="40"
            r="18"
            stroke="#9333EA"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="40" cy="40" r="6" fill="#7C3AED" />
          <path
            d="M21 27A18 18 0 0 1 31 18"
            stroke="#9333EA"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M49 62A18 18 0 0 0 59 53"
            stroke="#6366F1"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="63" cy="24" r="4" fill="#9333EA" />
          <circle cx="60" cy="32" r="2.6" fill="#7C3AED" />
          <circle cx="18" cy="56" r="4.4" fill="#6366F1" />
          <circle cx="24" cy="63" r="2.8" fill="#7C3AED" />
        </svg>

        {/* Title */}
        <div
          style={{
            fontSize: '64px',
            fontFamily: 'Sora',
            fontWeight: 700,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '16px',
            display: 'flex',
          }}
        >
          Outbound That Runs Itself
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            fontFamily: 'Sora',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.45)',
            textAlign: 'center',
            letterSpacing: '0.05em',
            display: 'flex',
          }}
        >
          {'11 AI Engines \u00B7 Autonomous B2B Lead Generation'}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '18px',
            fontFamily: 'Sora',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.3)',
            letterSpacing: '0.1em',
            display: 'flex',
          }}
        >
          wryko.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Sora',
          data: soraFontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
