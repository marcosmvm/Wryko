'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CampaignCardProps {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed' | 'draft'
  sent: number
  replyRate: number
  index?: number
}

export function CampaignCard({ id, name, status, sent, replyRate, index = 0 }: CampaignCardProps) {
  const statusStyles = {
    active: 'text-green-500',
    paused: 'text-yellow-500',
    completed: 'text-blue-500',
    draft: 'text-muted-foreground',
  }

  const statusIcons = {
    active: '●',
    paused: '○',
    completed: '✓',
    draft: '◌',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        href={`/dashboard/campaigns/${id}`}
        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
      >
        <div className="flex items-center gap-3">
          <span className={cn('text-lg', statusStyles[status])}>
            {statusIcons[status]}
          </span>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">
              {sent.toLocaleString()} sent · {replyRate}% reply rate
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </Link>
    </motion.div>
  )
}
