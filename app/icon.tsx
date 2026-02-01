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
          background: 'transparent',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A855F7" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="18" stroke="url(#g)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="40" cy="40" r="6" fill="url(#g)" />
          <path d="M21 27A18 18 0 0 1 31 18" stroke="url(#g)" strokeWidth="7" strokeLinecap="round" />
          <path d="M49 62A18 18 0 0 0 59 53" stroke="url(#g)" strokeWidth="7" strokeLinecap="round" />
          <circle cx="63" cy="24" r="4" fill="url(#g)" />
          <circle cx="18" cy="56" r="4.4" fill="url(#g)" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
