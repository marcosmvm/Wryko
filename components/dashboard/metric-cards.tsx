'use client'

import { Mail, MousePointer, MessageSquare, ThumbsUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { mockMetrics } from '@/lib/data/dashboard'

interface MetricCardProps {
  label: string
  value: string | number
  trend?: number
  icon: React.ComponentType<{ className?: string }>
  iconColor?: string
  iconBg?: string
}

function MetricCard({ label, value, trend, icon: Icon, iconColor = 'text-primary', iconBg = 'bg-primary/10' }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {trend !== undefined && (
              <p className={cn(
                "text-xs font-medium",
                trend >= 0 ? "text-emerald-500" : "text-red-500"
              )}>
                {trend >= 0 ? '+' : ''}{trend}%
              </p>
            )}
          </div>
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBg)}>
            <Icon className={cn("w-5 h-5", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MetricCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        label="Emails Sent"
        value={mockMetrics.totalSent.toLocaleString()}
        icon={Mail}
        iconColor="text-blue-500"
        iconBg="bg-blue-500/10"
      />
      <MetricCard
        label="Open Rate"
        value={`${mockMetrics.openRate}%`}
        trend={mockMetrics.openRateTrend}
        icon={MousePointer}
        iconColor="text-amber-500"
        iconBg="bg-amber-500/10"
      />
      <MetricCard
        label="Reply Rate"
        value={`${mockMetrics.replyRate}%`}
        trend={mockMetrics.replyRateTrend}
        icon={MessageSquare}
        iconColor="text-indigo-500"
        iconBg="bg-indigo-500/10"
      />
      <MetricCard
        label="Positive Replies"
        value={mockMetrics.positiveReplies.toLocaleString()}
        icon={ThumbsUp}
        iconColor="text-emerald-500"
        iconBg="bg-emerald-500/10"
      />
    </div>
  )
}
