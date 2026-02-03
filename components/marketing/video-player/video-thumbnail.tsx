'use client'

import { motion } from 'framer-motion'
import { Play } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface VideoThumbnailProps {
  thumbnailUrl?: string
  title?: string
  duration?: string
  onClick: () => void
  className?: string
}

export function VideoThumbnail({
  thumbnailUrl,
  title = 'Watch Demo',
  duration,
  onClick,
  className,
}: VideoThumbnailProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'group relative w-full aspect-video rounded-2xl overflow-hidden',
        'bg-gradient-to-br from-primary/20 via-primary/10 to-background',
        'border border-primary/20 cursor-pointer',
        'transition-all duration-300',
        'hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10',
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Thumbnail Image or Enhanced Placeholder */}
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0">
          {/* Simulated dashboard UI as background */}
          <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 lg:p-16 opacity-40">
            <div className="w-full max-w-3xl">
              {/* Top bar */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <div className="h-2 w-24 rounded bg-primary/20" />
                <div className="flex-1" />
                <div className="h-2 w-16 rounded bg-muted/40" />
              </div>
              {/* Metric cards row */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                    <div className="h-1.5 w-10 rounded bg-muted/40 mb-2" />
                    <div className="h-4 w-14 rounded bg-primary/15" />
                    <div className="h-1 w-full rounded bg-muted/20 mt-2" />
                  </div>
                ))}
              </div>
              {/* Chart area */}
              <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 mb-3">
                <div className="h-1.5 w-16 rounded bg-muted/40 mb-3" />
                <svg viewBox="0 0 400 80" className="w-full h-auto">
                  <path
                    d="M0 60 L50 55 L100 40 L150 45 L200 30 L250 25 L300 15 L350 20 L400 10"
                    fill="none"
                    stroke="hsl(262, 72%, 54%)"
                    strokeWidth="2"
                    opacity="0.4"
                  />
                  <path
                    d="M0 60 L50 55 L100 40 L150 45 L200 30 L250 25 L300 15 L350 20 L400 10 L400 80 L0 80Z"
                    fill="hsl(262, 72%, 54%)"
                    opacity="0.05"
                  />
                </svg>
              </div>
              {/* Bottom cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                  <div className="h-1.5 w-12 rounded bg-muted/40 mb-2" />
                  <div className="space-y-1.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-1 rounded bg-muted/20" style={{ width: `${80 - i * 15}%` }} />
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                  <div className="h-1.5 w-12 rounded bg-muted/40 mb-2" />
                  <div className="flex items-center justify-center h-10">
                    <svg viewBox="0 0 40 40" className="w-10 h-10">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="hsl(262, 72%, 54%)" strokeWidth="3" opacity="0.2" />
                      <circle cx="20" cy="20" r="16" fill="none" stroke="hsl(262, 72%, 54%)" strokeWidth="3" opacity="0.4" strokeDasharray="80 100" strokeLinecap="round" transform="rotate(-90 20 20)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <motion.div
            className={cn(
              'w-20 h-20 rounded-full',
              'bg-primary/90 backdrop-blur-sm',
              'flex items-center justify-center',
              'shadow-lg shadow-primary/30',
              'group-hover:bg-primary group-hover:scale-110',
              'transition-all duration-300'
            )}
            whileHover={{ scale: 1.1 }}
          >
            <Play className="w-8 h-8 text-primary-foreground ml-1" weight="fill" />
          </motion.div>
          <span className="text-sm font-medium text-foreground/80 bg-background/60 backdrop-blur-sm px-3 py-1 rounded-full">
            See 11 AI Engines in Action
          </span>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
        <div>
          <p className="text-lg font-heading font-semibold text-foreground">
            {title}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Platform walkthrough
          </p>
        </div>
        {duration && (
          <span className="text-xs font-medium text-muted-foreground bg-background/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
            {duration}
          </span>
        )}
      </div>
    </motion.button>
  )
}
