interface LogoProps {
  className?: string
}

export function N8nLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 70 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Two connected node circles */}
      <circle cx="7" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="14" r="2" />
      <line x1="12" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="2" />
      <circle cx="21" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="21" cy="14" r="2" />
      {/* "n8n" text */}
      <text
        x="32"
        y="20"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="15"
        fill="currentColor"
      >
        n8n
      </text>
    </svg>
  )
}
