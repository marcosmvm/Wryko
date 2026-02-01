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
          background: 'linear-gradient(135deg, #A855F7, #6366F1)',
          borderRadius: '8px',
        }}
      >
        {/* Simplified orbit mark for favicon size */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="6" stroke="#E5E7FF" strokeWidth="1.2" strokeOpacity="0.9" />
          <circle cx="11" cy="11" r="1.8" fill="white" />
          <circle cx="16" cy="6" r="2" fill="white" fillOpacity="0.9" />
          <circle cx="5" cy="15" r="2.2" fill="white" fillOpacity="0.9" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
