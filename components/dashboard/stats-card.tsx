'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  label: string
  value: string | number
  change?: {
    value: string
    trend: 'up' | 'down'
  }
  index?: number
}

export function StatsCard({ label, value, change, index = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="border border-border rounded-xl p-6"
    >
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-3xl font-bold font-heading text-foreground">{value}</p>
      {change && (
        <div className="mt-2">
          <span className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
            change.trend === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          )}>
            {change.trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{change.value}</span>
          </span>
        </div>
      )}
    </motion.div>
  )
}
