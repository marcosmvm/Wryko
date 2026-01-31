import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
          borderRadius: '40px',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="white" strokeLinecap="round" strokeWidth="4.5">
            <line x1="19.5" y1="19.5" x2="12" y2="12" />
            <line x1="28.5" y1="19.5" x2="36" y2="12" />
            <line x1="19.5" y1="28.5" x2="12" y2="36" />
            <line x1="28.5" y1="28.5" x2="36" y2="36" />
          </g>
          <circle cx="24" cy="24" r="4" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
