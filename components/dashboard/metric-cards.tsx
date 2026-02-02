'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, MousePointer, MessageSquare, ThumbsUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { IconWrapper } from '@/components/ui/icon-wrapper'
import { cn } from '@/lib/utils'
import type { DashboardMetrics } from '@/lib/types/dashboard'
import { getStaggerDelay } from '@/lib/animations'

interface MetricCardProps {
  label: string
  value: string | number
  trend?: number
  icon: React.ComponentType<{ className?: string }>
  variant?: 'primary' | 'blue' | 'amber' | 'indigo' | 'violet'
  index?: number
  href?: string
}

const gradientMap: Record<string, string> = {
  blue: 'from-metric-blue to-metric-blue/50',
  amber: 'from-metric-amber to-metric-amber/50',
  indigo: 'from-metric-indigo to-metric-indigo/50',
  violet: 'from-metric-violet to-metric-violet/50',
  primary: 'from-primary to-primary/50',
}

function MetricCard({ label, value, trend, icon, variant = 'primary', index = 0, href }: MetricCardProps) {
  const card = (
    <Card className={cn("relative overflow-hidden", href && "hover:bg-muted/50 transition-colors cursor-pointer")}>
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
  )

  if (href) {
    return <Link href={href} className="block">{card}</Link>
  }

  return <div>{card}</div>
}

export function MetricCards({ metrics }: { metrics: DashboardMetrics | null }) {
  if (!metrics) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map(i => (
          <Card key={i} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="label-text">--</p>
                <p className="text-2xl font-heading font-bold tracking-tight">0</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        label="Emails Sent"
        value={metrics.totalSent.toLocaleString()}
        icon={Mail}
        variant="blue"
        index={0}
        href="/dashboard/campaigns"
      />
      <MetricCard
        label="Open Rate"
        value={`${metrics.openRate}%`}
        trend={metrics.openRateTrend}
        icon={MousePointer}
        variant="amber"
        index={1}
        href="/dashboard/campaigns"
      />
      <MetricCard
        label="Reply Rate"
        value={`${metrics.replyRate}%`}
        trend={metrics.replyRateTrend}
        icon={MessageSquare}
        variant="indigo"
        index={2}
        href="/dashboard/campaigns"
      />
      <MetricCard
        label="Positive Replies"
        value={metrics.positiveReplies.toLocaleString()}
        icon={ThumbsUp}
        variant="violet"
        index={3}
        href="/dashboard/campaigns"
      />
    </div>
  )
}
