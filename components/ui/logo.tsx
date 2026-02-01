'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'icon' | 'lockup'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showAdminBadge?: boolean
  className?: string
}

const iconSizes: Record<string, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
}

const textStyles: Record<string, string> = {
  sm: 'text-lg font-semibold',
  md: 'text-xl font-bold',
  lg: 'text-2xl font-bold',
  xl: 'text-3xl font-bold',
}

function LogoMark({ gradientId }: { gradientId: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="6"
          y1="6"
          x2="42"
          y2="42"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      {/* Gradient rounded rectangle background */}
      <rect width="48" height="48" rx="12" fill={`url(#${gradientId})`} />
      {/* Subtle inner glow */}
      <circle cx="24" cy="24" r="15" fill="white" fillOpacity="0.06" />
      {/* Main circular orbit */}
      <circle cx="22.5" cy="22.5" r="10.5" stroke="#E5E7FF" strokeWidth="1.3" strokeOpacity="0.9" fill="none" />
      {/* Tilted elliptical orbit */}
      <ellipse cx="25.5" cy="25.5" rx="11.25" ry="7.5" transform="rotate(-18 25.5 25.5)" stroke="#C4D0FF" strokeWidth="1.1" strokeOpacity="0.9" fill="none" />
      {/* Short arc orbit */}
      <path d="M15 24C15.75 20.25 17.6 17.6 20.25 15.75" stroke="#EEF2FF" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.9" fill="none" />
      {/* Top-right node */}
      <circle cx="33" cy="16.5" r="2.4" fill="white" />
      <circle cx="33" cy="16.5" r="2.4" fill="#A855F7" fillOpacity="0.18" />
      {/* Bottom-left node */}
      <circle cx="15" cy="30" r="2.7" fill="white" />
      <circle cx="15" cy="30" r="2.7" fill="#4F46E5" fillOpacity="0.22" />
      {/* Central node */}
      <circle cx="24" cy="24" r="2.1" fill="white" />
      <circle cx="24" cy="24" r="2.1" fill="#6366F1" fillOpacity="0.35" />
      {/* Tiny accent node */}
      <circle cx="28.5" cy="33" r="1.65" fill="white" fillOpacity="0.9" />
    </svg>
  )
}

export function Logo({
  variant = 'lockup',
  size = 'sm',
  showAdminBadge = false,
  className,
}: LogoProps) {
  const id = useId()
  const gradientId = `wryko-${id.replace(/:/g, '')}`

  if (variant === 'icon') {
    return (
      <div className={cn(iconSizes[size], 'shrink-0', className)}>
        <LogoMark gradientId={gradientId} />
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(iconSizes[size], 'shrink-0')}>
        <LogoMark gradientId={gradientId} />
      </div>
      {showAdminBadge ? (
        <div className="flex flex-col">
          <span className={cn('font-heading leading-tight', textStyles[size])}>
            Wryko
          </span>
          <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded w-fit">
            ADMIN
          </span>
        </div>
      ) : (
        <span className={cn('font-heading', textStyles[size])}>
          Wryko
        </span>
      )}
    </div>
  )
}
