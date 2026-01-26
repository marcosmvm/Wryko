'use client'

import { motion } from 'framer-motion'
import { Mail, FileText, Zap, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

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

const typeColors = {
  reply: 'text-green-500 bg-green-500/10',
  report: 'text-blue-500 bg-blue-500/10',
  campaign: 'text-primary bg-primary/10',
  alert: 'text-yellow-500 bg-yellow-500/10',
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <h3 className="font-semibold mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {items.map((item, index) => {
          const Icon = typeIcons[item.type]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                typeColors[item.type]
              )}>
                <Icon className="w-4 h-4" />
              </div>
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
