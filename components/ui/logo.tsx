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
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(262, 72%, 54%)" />
          <stop offset="1" stopColor="hsl(224, 76%, 48%)" />
        </linearGradient>
      </defs>
      {/* Gradient rounded rectangle background */}
      <rect width="48" height="48" rx="12" fill={`url(#${gradientId})`} />
      {/* Four radiating arms forming an X — the engine network */}
      <g stroke="white" strokeLinecap="round" strokeWidth="4.5">
        <line x1="19.5" y1="19.5" x2="12" y2="12" />
        <line x1="28.5" y1="19.5" x2="36" y2="12" />
        <line x1="19.5" y1="28.5" x2="12" y2="36" />
        <line x1="28.5" y1="28.5" x2="36" y2="36" />
      </g>
      {/* Central hub node — the AI operating system core */}
      <circle cx="24" cy="24" r="4" fill="white" />
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
  const gradientId = `xg-${id.replace(/:/g, '')}`

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
            XGrowthOS
          </span>
          <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded w-fit">
            ADMIN
          </span>
        </div>
      ) : (
        <span className={cn('font-heading', textStyles[size])}>
          XGrowthOS
        </span>
      )}
    </div>
  )
}
