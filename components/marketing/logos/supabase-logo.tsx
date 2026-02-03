interface LogoProps {
  className?: string
}

export function SupabaseLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 120 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Supabase diamond/shield with lightning bolt */}
      <g transform="translate(12, 14)">
        {/* Shield/diamond shape */}
        <path
          d="M0-11L8 0L0 11L-8 0Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Lightning bolt inside */}
        <path
          d="M-1-6L-3 1h3L-1 6l5-8h-3L3-6h-4z"
          fillRule="evenodd"
        />
      </g>
      {/* "Supabase" text */}
      <text
        x="26"
        y="20"
        fontFamily="system-ui, sans-serif"
        fontWeight="600"
        fontSize="13"
        fill="currentColor"
      >
        Supabase
      </text>
    </svg>
  )
}
