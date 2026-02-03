interface LogoProps {
  className?: string
}

export function SalesforceLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 130 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Cloud shape */}
      <path
        d="M27 10.5c-1.2-2.5-3.8-4.2-6.7-4.2-1.5 0-2.9.5-4 1.2C14.8 5.3 12.5 4 9.8 4 5.8 4 2.5 7 2 10.8 0.8 11.8 0 13.5 0 15.3c0 3 2.4 5.5 5.4 5.5h1.2c1 2.2 3.2 3.7 5.8 3.7 1.6 0 3.1-.6 4.2-1.6 1.1 1 2.6 1.6 4.2 1.6 2.6 0 4.8-1.5 5.8-3.7h1.2c3 0 5.4-2.5 5.4-5.5 0-2.4-1.5-4.4-3.6-5.2-.2-.6-.4-1.1-.6-1.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* "salesforce" text inside cloud */}
      <text
        x="16"
        y="17"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="6.5"
        fill="currentColor"
        textAnchor="middle"
      >
        salesforce
      </text>
      {/* "salesforce" text beside cloud */}
      <text
        x="38"
        y="22"
        fontFamily="system-ui, sans-serif"
        fontWeight="600"
        fontSize="13"
        fill="currentColor"
      >
        salesforce
      </text>
    </svg>
  )
}
