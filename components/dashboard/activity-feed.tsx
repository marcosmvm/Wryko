'use client'

import { motion } from 'framer-motion'
import { Mail, FileText, Zap, AlertCircle } from 'lucide-react'
import { IconWrapper } from '@/components/ui/icon-wrapper'
import { fadeInUp, getStaggerDelay } from '@/lib/animations'

interface ActivityItem {
  id: string
  type: 'reply' | 'report' | 'campaign' | 'alert'
  message: string
  timestamp: string
}

interface ActivityFeedProps {
  items: ActivityItem[]
}

const typeIcons = {
  reply: Mail,
  report: FileText,
  campaign: Zap,
  alert: AlertCircle,
}

const typeVariants = {
  reply: 'success',
  report: 'info',
  campaign: 'primary',
  alert: 'warning',
} as const

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <motion.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass-premium glow-border-hover rounded-xl p-6"
    >
      <h3 className="heading-xs mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {items.map((item, index) => {
          const Icon = typeIcons[item.type]
          const variant = typeVariants[item.type]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={getStaggerDelay(index, 0.5)}
              className="flex items-start gap-3"
            >
              <IconWrapper icon={Icon} size="round" variant={variant} />
              <div className="flex-1 min-w-0">
                <p className="text-sm">{item.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.timestamp}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
