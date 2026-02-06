interface LogoProps {
  className?: string
}

export function ApolloLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 100 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Orbit circle motif */}
      <circle cx="10" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="14" r="2" />
      {/* Orbit ring */}
      <ellipse cx="10" cy="14" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(-30 10 14)" />
      {/* "Apollo.io" text */}
      <text
        x="24"
        y="20"
        fontFamily="system-ui, sans-serif"
        fontWeight="600"
        fontSize="14"
        fill="currentColor"
      >
        Apollo.io
      </text>
    </svg>
  )
}
