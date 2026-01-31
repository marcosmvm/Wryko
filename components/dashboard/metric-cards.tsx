'use client'

import { motion } from 'framer-motion'
import { Mail, MousePointer, MessageSquare, ThumbsUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { IconWrapper } from '@/components/ui/icon-wrapper'
import { cn } from '@/lib/utils'
import { mockMetrics } from '@/lib/data/dashboard'
import { getStaggerDelay } from '@/lib/animations'

interface MetricCardProps {
  label: string
  value: string | number
  trend?: number
  icon: React.ComponentType<{ className?: string }>
  variant?: 'primary' | 'blue' | 'amber' | 'indigo' | 'violet'
  index?: number
}

const gradientMap: Record<string, string> = {
  blue: 'from-metric-blue to-metric-blue/50',
  amber: 'from-metric-amber to-metric-amber/50',
  indigo: 'from-metric-indigo to-metric-indigo/50',
  violet: 'from-metric-violet to-metric-violet/50',
  primary: 'from-primary to-primary/50',
}

function MetricCard({ label, value, trend, icon, variant = 'primary', index = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={getStaggerDelay(index)}
      whileHover={{ y: -2 }}
    >
      <Card variant="futuristic" className="relative overflow-hidden">
        <div className={cn(
          "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r",
          gradientMap[variant] || gradientMap.primary
        )} />
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="label-text">{label}</p>
              <p className="text-2xl font-heading font-bold tracking-tight">{value}</p>
              {trend !== undefined && (
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                  trend >= 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                )}>
                  {trend >= 0 ? '+' : ''}{trend}%
                </span>
              )}
            </div>
            <IconWrapper icon={icon} size="md" variant={variant} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function MetricCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        label="Emails Sent"
        value={mockMetrics.totalSent.toLocaleString()}
        icon={Mail}
        variant="blue"
        index={0}
      />
      <MetricCard
        label="Open Rate"
        value={`${mockMetrics.openRate}%`}
        trend={mockMetrics.openRateTrend}
        icon={MousePointer}
        variant="amber"
        index={1}
      />
      <MetricCard
        label="Reply Rate"
        value={`${mockMetrics.replyRate}%`}
        trend={mockMetrics.replyRateTrend}
        icon={MessageSquare}
        variant="indigo"
        index={2}
      />
      <MetricCard
        label="Positive Replies"
        value={mockMetrics.positiveReplies.toLocaleString()}
        icon={ThumbsUp}
        variant="violet"
        index={3}
      />
    </div>
  )
}
