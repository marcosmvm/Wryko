'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoPlayerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  videoUrl?: string
  title?: string
}

function getEmbedUrl(url: string): string {
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  )
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
  }

  // Return original if no match (direct video URL)
  return url
}

export function VideoPlayer({
  open,
  onOpenChange,
  videoUrl,
  title = 'Demo Video',
}: VideoPlayerProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onOpenChange])

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleClose = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Video container */}
          <motion.div
            ref={dialogRef}
            className="fixed inset-4 md:inset-8 lg:inset-16 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full max-w-5xl">
              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Close video"
                className={cn(
                  'absolute -top-12 right-0 p-2',
                  'text-white/70 hover:text-white',
                  'transition-colors rounded-lg',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                )}
              >
                <X className="w-6 h-6" aria-hidden="true" />
                <span className="sr-only">Close</span>
              </button>

              {/* Video frame */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  // Placeholder when no video URL is provided
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-background">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                        Demo Video Coming Soon
                      </h3>
                      <p className="text-muted-foreground max-w-sm">
                        We&apos;re preparing an in-depth walkthrough of the XGrowthOS platform.
                        Check back soon!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
