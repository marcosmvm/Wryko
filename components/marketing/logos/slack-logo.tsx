interface LogoProps {
  className?: string
}

export function SlackLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 90 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Slack hash/octothorpe made of 4 rounded bars */}
      <g transform="translate(12, 14)">
        {/* Vertical bars */}
        <rect x="-5" y="-8" width="3" height="16" rx="1.5" />
        <rect x="2" y="-8" width="3" height="16" rx="1.5" />
        {/* Horizontal bars */}
        <rect x="-8" y="-5" width="16" height="3" rx="1.5" />
        <rect x="-8" y="2" width="16" height="3" rx="1.5" />
        {/* Corner dots */}
        <rect x="-8" y="-8" width="3" height="3" rx="1.5" />
        <rect x="5" y="-8" width="3" height="3" rx="1.5" />
        <rect x="-8" y="5" width="3" height="3" rx="1.5" />
        <rect x="5" y="5" width="3" height="3" rx="1.5" />
      </g>
      {/* "Slack" text */}
      <text
        x="28"
        y="20"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="14"
        fill="currentColor"
      >
        Slack
      </text>
    </svg>
  )
}
