'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { StatusBadge } from '@/components/ui/status-badge'
import { getStaggerDelay } from '@/lib/animations'

interface CampaignCardProps {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed' | 'draft'
  sent: number
  replyRate: number
  index?: number
}

export function CampaignCard({ id, name, status, sent, replyRate, index = 0 }: CampaignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={getStaggerDelay(index)}
    >
      <Link
        href={`/dashboard/campaigns/${id}`}
        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
      >
        <div className="flex items-center gap-3">
          <StatusBadge variant={status} size="sm">
            {status}
          </StatusBadge>
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
