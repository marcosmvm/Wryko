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
  const g = `url(#${gradientId})`
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="10"
          y1="10"
          x2="70"
          y2="70"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9333EA" />
          <stop offset="0.5" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      {/* Outer circle orbit */}
      <circle cx="40" cy="40" r="18" stroke={g} strokeWidth="5" strokeLinecap="round" />
      {/* Central dot */}
      <circle cx="40" cy="40" r="6" fill={g} />
      {/* Upper-left arc */}
      <path d="M21 27A18 18 0 0 1 31 18" stroke={g} strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* Lower-right arc */}
      <path d="M49 62A18 18 0 0 0 59 53" stroke={g} strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* Floating dots */}
      <circle cx="63" cy="24" r="4" fill={g} />
      <circle cx="60" cy="32" r="2.6" fill={g} />
      <circle cx="18" cy="56" r="4.4" fill={g} />
      <circle cx="24" cy="63" r="2.8" fill={g} />
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
        <span className={cn('font-heading bg-gradient-to-r from-[#9333EA] via-[#7C3AED] to-[#6366F1] bg-clip-text text-transparent', textStyles[size])}>
          Wryko
        </span>
      )}
    </div>
  )
}
