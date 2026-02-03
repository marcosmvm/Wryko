'use client'

import { motion } from 'framer-motion'
import { Star } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface ReviewPlatform {
  name: string
  rating: number
  reviewCount: number | null
  profileUrl: string
}

const platforms: ReviewPlatform[] = [
  {
    name: 'Clutch',
    rating: 5.0,
    reviewCount: null,
    profileUrl: 'https://clutch.co',
  },
  {
    name: 'G2',
    rating: 5.0,
    reviewCount: null,
    profileUrl: 'https://g2.com',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-3.5 h-3.5',
            i < Math.floor(rating)
              ? 'text-amber-400'
              : 'text-muted-foreground/30'
          )}
          weight="fill"
        />
      ))}
    </div>
  )
}

// Simple SVG logos for Clutch and G2
function ClutchLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 20" className={className} fill="currentColor">
      <text x="0" y="15" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="16">
        clutch
      </text>
    </svg>
  )
}

function G2Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 24" className={className} fill="none">
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
      <text x="6" y="17" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="14" fill="currentColor">
        G2
      </text>
    </svg>
  )
}

const logoMap: Record<string, React.FC<{ className?: string }>> = {
  Clutch: ClutchLogo,
  G2: G2Logo,
}

interface ReviewBadgesProps {
  className?: string
}

export function ReviewBadges({ className }: ReviewBadgesProps) {
  return (
    <motion.div
      className={cn('flex flex-wrap items-center justify-center gap-4', className)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {platforms.map((platform) => {
        const LogoComponent = logoMap[platform.name]
        return (
          <a
            key={platform.name}
            href={platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card flex items-center gap-3 px-5 py-3 hover:border-primary/30 transition-all duration-300"
          >
            {LogoComponent && (
              <LogoComponent className="h-5 w-auto text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
            <div className="flex flex-col">
              <StarRating rating={platform.rating} />
              <span className="text-xs text-muted-foreground mt-0.5">
                {platform.reviewCount
                  ? `${platform.rating}/5 (${platform.reviewCount} reviews)`
                  : 'Newly Listed'}
              </span>
            </div>
          </a>
        )
      })}
    </motion.div>
  )
}
