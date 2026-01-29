'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoThumbnailProps {
  thumbnailUrl?: string
  title?: string
  onClick: () => void
  className?: string
}

export function VideoThumbnail({
  thumbnailUrl,
  title = 'Watch Demo',
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
      {/* Thumbnail Image or Placeholder */}
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Placeholder gradient pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
          </div>
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
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
          <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
        </motion.div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-lg font-heading font-semibold text-foreground">
          {title}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Click to watch the demo
        </p>
      </div>
    </motion.button>
  )
}
