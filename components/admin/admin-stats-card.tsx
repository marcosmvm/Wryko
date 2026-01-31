'use client'

import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { IconWrapper } from '@/components/ui/icon-wrapper'
import { getStaggerDelay } from '@/lib/animations'

const gradientAccents: Record<string, string> = {
  primary: 'from-primary to-primary/50',
  blue: 'from-metric-blue to-metric-blue/50',
  amber: 'from-metric-amber to-metric-amber/50',
  indigo: 'from-metric-indigo to-metric-indigo/50',
  violet: 'from-metric-violet to-metric-violet/50',
}

interface AdminStatsCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  variant?: 'primary' | 'blue' | 'amber' | 'indigo' | 'violet'
  trend?: {
    value: number
    isPositive: boolean
  }
  index?: number
  className?: string
}

export function AdminStatsCard({
  label,
  value,
  icon,
  variant = 'primary',
  trend,
  index = 0,
  className,
}: AdminStatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={getStaggerDelay(index)}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card variant="interactive" className={cn('overflow-hidden', className)}>
        <div className={cn('h-1 w-full bg-gradient-to-r', gradientAccents[variant])} />
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="label-text">{label}</p>
              <p className="text-2xl font-heading font-bold mt-1">{value}</p>
              {trend && (
                <p
                  className={cn(
                    'text-sm mt-1',
                    trend.isPositive ? 'text-success' : 'text-destructive'
                  )}
                >
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% from last week
                </p>
              )}
            </div>
            <IconWrapper icon={icon} size="md" variant={variant} />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
