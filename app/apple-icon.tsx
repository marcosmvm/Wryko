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
          background: 'linear-gradient(135deg, #9333EA, #7C3AED, #6366F1)',
          borderRadius: '40px',
        }}
      >
        <svg
          width="130"
          height="130"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="18" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <circle cx="40" cy="40" r="6" fill="white" />
          <path d="M21 27A18 18 0 0 1 31 18" stroke="white" strokeWidth="7" strokeLinecap="round" />
          <path d="M49 62A18 18 0 0 0 59 53" stroke="white" strokeWidth="7" strokeLinecap="round" />
          <circle cx="63" cy="24" r="4" fill="white" />
          <circle cx="60" cy="32" r="2.6" fill="white" />
          <circle cx="18" cy="56" r="4.4" fill="white" />
          <circle cx="24" cy="63" r="2.8" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
