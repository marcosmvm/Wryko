interface LogoProps {
  className?: string
}

export function InstantlyLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 120 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Lightning bolt icon */}
      <path d="M8 2L3 16h6L5 26l14-16h-7L16 2H8z" />
      {/* "instantly" text */}
      <text
        x="24"
        y="20"
        fontFamily="system-ui, sans-serif"
        fontWeight="600"
        fontSize="14"
        fill="currentColor"
      >
        instantly
      </text>
    </svg>
  )
}
