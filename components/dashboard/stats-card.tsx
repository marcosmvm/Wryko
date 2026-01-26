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
      className="bg-card border border-border rounded-xl p-6"
    >
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-3xl font-bold text-primary">{value}</p>
      {change && (
        <div className={cn(
          'flex items-center gap-1 mt-2 text-sm',
          change.trend === 'up' ? 'text-green-500' : 'text-red-500'
        )}>
          {change.trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{change.value}</span>
        </div>
      )}
    </motion.div>
  )
}
