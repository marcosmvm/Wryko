'use client'

import { motion } from 'framer-motion'
import { DemoVideoContent } from '@/components/marketing/demo-video-content'
import { cn } from '@/lib/utils'

interface HeroVideoSectionProps {
  className?: string
  videoUrl?: string
  thumbnailUrl?: string
  title?: string
}

export function HeroVideoSection({
  className,
  title = 'See Wryko in Action',
}: HeroVideoSectionProps) {
  return (
    <motion.section
      className={cn('py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            🎬 Platform Demo
          </motion.span>
          <motion.h2
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Watch how our 11 autonomous AI engines work together to transform your sales pipeline from prospect discovery to booked meetings — completely on autopilot.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <DemoVideoContent />
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <p className="text-sm text-muted-foreground mb-4">
            Join 500+ B2B teams already scaling with Wryko
          </p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded">
              ✓ SOC 2 Compliant
            </div>
            <div className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
              ✓ GDPR Ready
            </div>
            <div className="text-xs font-medium bg-purple-50 text-purple-700 px-2 py-1 rounded">
              ✓ CAN-SPAM Compliant
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
