import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
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
          borderRadius: '8px',
        }}
      >
        {/* Simplified X mark for favicon size */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="3" y1="3" x2="7.5" y2="7.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <line x1="19" y1="3" x2="14.5" y2="7.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <line x1="3" y1="19" x2="7.5" y2="14.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <line x1="19" y1="19" x2="14.5" y2="14.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <circle cx="11" cy="11" r="2.5" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
