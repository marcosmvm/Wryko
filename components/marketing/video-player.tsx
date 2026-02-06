'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface VideoThumbnailProps {
  thumbnailUrl?: string
  title: string
  onClick: () => void
  className?: string
}

export function VideoThumbnail({
  thumbnailUrl,
  title,
  onClick,
  className,
}: VideoThumbnailProps) {
  return (
    <div
      className={cn(
        'relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900',
        className
      )}
      onClick={onClick}
    >
      {/* Background/Thumbnail */}
      <div className="aspect-video relative">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">🚀</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Wryko Platform Demo
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto px-4">
                See how 11 AI engines automate your entire lead generation pipeline
              </p>
            </div>
          </div>
        )}
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-lg group-hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-8 h-8 text-primary ml-1" weight="fill" />
          </motion.div>
        </div>

        {/* Duration badge */}
        <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
          3:42
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary opacity-30 blur-lg group-hover:opacity-50 transition-opacity -z-10" />
    </div>
  )
}

interface VideoPlayerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  videoUrl?: string
  title: string
}

export function VideoPlayer({
  open,
  onOpenChange,
  videoUrl,
  title,
}: VideoPlayerProps) {
  if (!open) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => onOpenChange(false)}
    >
      <motion.div
        className="relative max-w-6xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          onClick={() => onOpenChange(false)}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video container */}
        <div className="aspect-video">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="text-8xl">🎬</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Demo Video Coming Soon
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    We're putting together an amazing demo to showcase all 11 AI engines in action.
                  </p>
                </div>
                <button
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  onClick={() => onOpenChange(false)}
                >
                  Book a Live Demo Instead
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}