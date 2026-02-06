'use client'

import { cn } from '@/lib/utils'

interface BrowserFrameProps {
  url?: string
  children: React.ReactNode
  className?: string
}

export function BrowserFrame({
  url = 'app.wryko.com/dashboard',
  children,
  className,
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden border border-border/60 shadow-2xl shadow-primary/5',
        'bg-card',
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-muted/60 border-b border-border/40">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>

        {/* URL bar */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-background/60 border border-border/30 text-xs text-muted-foreground max-w-sm w-full">
            <svg className="w-3 h-3 flex-shrink-0 text-green-500" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a4 4 0 0 0-4 4v3H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V5a4 4 0 0 0-4-4zm2 7H6V5a2 2 0 1 1 4 0v3z" />
            </svg>
            <span className="truncate">{url}</span>
          </div>
        </div>

        {/* Spacer to balance traffic lights */}
        <div className="w-[52px]" />
      </div>

      {/* Content area */}
      <div className="relative">
        {children}
      </div>
    </div>
  )
}
