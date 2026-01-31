'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HealthScoreProps {
  score: number
  status: 'healthy' | 'warning' | 'critical'
  details?: {
    label: string
    value: string | number
  }[]
}

export function HealthScore({ score, status, details }: HealthScoreProps) {
  const statusColors = {
    healthy: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    critical: 'text-destructive bg-destructive/10',
  }

  const statusLabels = {
    healthy: 'Healthy',
    warning: 'Needs Attention',
    critical: 'Critical',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <h3 className="font-semibold mb-4">Health Score</h3>

      <div className="flex items-center justify-center mb-4">
        <div className={cn(
          'w-24 h-24 rounded-full flex flex-col items-center justify-center',
          statusColors[status]
        )}>
          <span className="text-3xl font-bold">{score}</span>
          <span className="text-xs uppercase font-medium">{statusLabels[status]}</span>
        </div>
      </div>

      {details && details.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-border">
          {details.map((detail, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{detail.label}</span>
              <span className="font-medium">{detail.value}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
