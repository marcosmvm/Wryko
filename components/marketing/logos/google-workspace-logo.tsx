interface LogoProps {
  className?: string
}

export function GoogleWorkspaceLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 160 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* 4 dots in diamond/cross pattern with Google brand colors */}
      <circle cx="10" cy="7" r="3.2" fill="#4285F4" />   {/* Blue - top */}
      <circle cx="17" cy="14" r="3.2" fill="#EA4335" />   {/* Red - right */}
      <circle cx="10" cy="21" r="3.2" fill="#34A853" />   {/* Green - bottom */}
      <circle cx="3" cy="14" r="3.2" fill="#FBBC04" />    {/* Yellow - left */}
      {/* "Google Workspace" text */}
      <text
        x="26"
        y="18.5"
        fontFamily="system-ui, sans-serif"
        fontWeight="500"
        fontSize="11.5"
        fill="currentColor"
      >
        Google Workspace
      </text>
    </svg>
  )
}
