'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { VideoThumbnail, VideoPlayer } from '@/components/marketing/video-player'
import { cn } from '@/lib/utils'

interface HeroVideoSectionProps {
  className?: string
  videoUrl?: string
  thumbnailUrl?: string
  title?: string
}

export function HeroVideoSection({
  className,
  videoUrl,
  thumbnailUrl,
  title = 'See XGrowthOS in Action',
}: HeroVideoSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <motion.section
      className={cn('py-16 px-4 sm:px-6 lg:px-8', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <motion.span
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Platform Demo
          </motion.span>
          <motion.h2
            className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Watch a quick walkthrough of how our 11 AI engines work together
            to deliver qualified meetings on autopilot.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <VideoThumbnail
            thumbnailUrl={thumbnailUrl}
            title="Watch the XGrowthOS Demo"
            onClick={() => setIsVideoOpen(true)}
          />
        </motion.div>
      </div>

      <VideoPlayer
        open={isVideoOpen}
        onOpenChange={setIsVideoOpen}
        videoUrl={videoUrl}
        title={title}
      />
    </motion.section>
  )
}
