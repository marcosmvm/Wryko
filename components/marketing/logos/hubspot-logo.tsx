interface LogoProps {
  className?: string
}

export function HubSpotLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 110 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Sprocket gear */}
      <g transform="translate(12, 14)">
        {/* Center hub */}
        <circle cx="0" cy="0" r="3" />
        {/* Outer ring */}
        <circle cx="0" cy="0" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* 6 spokes */}
        <line x1="0" y1="-4" x2="0" y2="-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="3.5" y1="-2" x2="7.8" y2="-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="3.5" y1="2" x2="7.8" y2="4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="4" x2="0" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="-3.5" y1="2" x2="-7.8" y2="4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="-3.5" y1="-2" x2="-7.8" y2="-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Spoke end circles */}
        <circle cx="0" cy="-10" r="1.8" />
        <circle cx="8.7" cy="-5" r="1.8" />
        <circle cx="8.7" cy="5" r="1.8" />
        <circle cx="0" cy="10" r="1.8" />
        <circle cx="-8.7" cy="5" r="1.8" />
        <circle cx="-8.7" cy="-5" r="1.8" />
      </g>
      {/* "HubSpot" text */}
      <text
        x="28"
        y="20"
        fontFamily="system-ui, sans-serif"
        fontWeight="600"
        fontSize="14"
        fill="currentColor"
      >
        HubSpot
      </text>
    </svg>
  )
}
