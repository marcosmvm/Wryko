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
          background: 'linear-gradient(135deg, #A855F7, #6366F1)',
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
          <circle cx="24" cy="24" r="15" fill="white" fillOpacity="0.06" />
          <circle cx="22.5" cy="22.5" r="10.5" stroke="#E5E7FF" strokeWidth="1.3" strokeOpacity="0.9" />
          <ellipse cx="25.5" cy="25.5" rx="11.25" ry="7.5" transform="rotate(-18 25.5 25.5)" stroke="#C4D0FF" strokeWidth="1.1" strokeOpacity="0.9" />
          <path d="M15 24C15.75 20.25 17.6 17.6 20.25 15.75" stroke="#EEF2FF" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.9" />
          <circle cx="33" cy="16.5" r="2.4" fill="white" />
          <circle cx="33" cy="16.5" r="2.4" fill="#A855F7" fillOpacity="0.18" />
          <circle cx="15" cy="30" r="2.7" fill="white" />
          <circle cx="15" cy="30" r="2.7" fill="#4F46E5" fillOpacity="0.22" />
          <circle cx="24" cy="24" r="2.1" fill="white" />
          <circle cx="24" cy="24" r="2.1" fill="#6366F1" fillOpacity="0.35" />
          <circle cx="28.5" cy="33" r="1.65" fill="white" fillOpacity="0.9" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
