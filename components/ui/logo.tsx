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

const wordmarkHeights: Record<string, string> = {
  sm: 'h-5',
  md: 'h-6',
  lg: 'h-8',
  xl: 'h-10',
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
          <stop stopColor="#A855F7" />
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

function WordMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 81 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-auto', className)}
      aria-label="Wryko"
    >
      <g fill="currentColor">
        {/* W */}
        <path d="M0 4C0 2.895.895 2 2 2h2l3 14L10 2h2c1.105 0 2 .895 2 2v18h-2.2V9.4L9 22H5L2.2 9.4V22H0V4Z" />
        {/* r */}
        <path d="M19 8c0-1.105.895-2 2-2h2v3.2C23.6 7.6 25 6 27.8 6c3.1 0 5.2 2.1 5.2 5.6V22h-2.9v-9.9c0-2.2-1.2-3.4-2.9-3.4-2 0-3.5 1.4-3.5 4V22h-2.7c-1.105 0-2-.895-2-2V8Z" />
        {/* y */}
        <path d="M39 6h2.9l3.3 8.4L48.5 6h2.9l-5.5 13.2c-1 2.4-2.5 3.5-4.5 3.5-1 0-1.7-.2-2.4-.5V20c.5.2 1.1.3 1.7.3 1 0 1.7-.5 2.1-1.5L39 9.4V6Z" />
        {/* k */}
        <path d="M56 2h2.9v9.3L64 6h3.5l-5.3 5.1L67.7 22h-3.4l-3.8-7.9-1.6 1.6V22H56V2Z" />
        {/* o */}
        <path d="M73.5 6C78 6 81 9.2 81 14s-3 8-7.5 8S66 18.8 66 14s3-8 7.5-8Zm0 2.7c-2.3 0-3.9 1.7-3.9 5.3s1.6 5.3 3.9 5.3 3.9-1.7 3.9-5.3-1.6-5.3-3.9-5.3Z" />
      </g>
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
          <WordMark className={wordmarkHeights[size]} />
          <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded w-fit">
            ADMIN
          </span>
        </div>
      ) : (
        <WordMark className={wordmarkHeights[size]} />
      )}
    </div>
  )
}
