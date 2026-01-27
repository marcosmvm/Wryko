'use client'

import Link from 'next/link'
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { mockHealthScore } from '@/lib/data/dashboard'

export function HealthScoreCard() {
  const { overall, status, domainHealth, replyQuality, engagementLevel, meetingConversion, trend, riskSignals } = mockHealthScore

  const TrendIcon = trend === 'improving' ? TrendingUp : trend === 'declining' ? TrendingDown : Minus
  const trendColor = trend === 'improving' ? 'text-emerald-500' : trend === 'declining' ? 'text-red-500' : 'text-muted-foreground'

  const statusColors = {
    healthy: 'text-emerald-500 bg-emerald-500/10',
    warning: 'text-amber-500 bg-amber-500/10',
    critical: 'text-red-500 bg-red-500/10',
  }

  const scoreColor = status === 'healthy' ? 'stroke-emerald-500' : status === 'warning' ? 'stroke-amber-500' : 'stroke-red-500'

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Health Score</CardTitle>
        <Link
          href="/dashboard/domain-health"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Details <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {/* Main Score */}
        <div className="flex items-center justify-center py-4">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-muted/20"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                className={scoreColor}
                strokeDasharray={`${(overall / 100) * 352} 352`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">{overall}</span>
              <span className={cn("text-xs font-medium uppercase", statusColors[status].split(' ')[0])}>
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Trend */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <TrendIcon className={cn("w-4 h-4", trendColor)} />
          <span className={cn("text-sm font-medium capitalize", trendColor)}>{trend}</span>
        </div>

        {/* Component Scores */}
        <div className="space-y-3">
          <ScoreRow label="Domain Health" value={domainHealth} />
          <ScoreRow label="Reply Quality" value={replyQuality} />
          <ScoreRow label="Engagement" value={engagementLevel} />
          <ScoreRow label="Meeting Rate" value={meetingConversion} />
        </div>

        {/* Risk Signals */}
        {riskSignals.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Attention Items
            </p>
            {riskSignals.map((signal, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-start gap-2 p-2 rounded-lg text-sm",
                  signal.severity === 'high' ? 'bg-red-500/10' :
                  signal.severity === 'medium' ? 'bg-amber-500/10' : 'bg-blue-500/10'
                )}
              >
                <AlertTriangle className={cn(
                  "w-4 h-4 mt-0.5 shrink-0",
                  signal.severity === 'high' ? 'text-red-500' :
                  signal.severity === 'medium' ? 'text-amber-500' : 'text-blue-500'
                )} />
                <div>
                  <p className="font-medium">{signal.signal}</p>
                  <p className="text-xs text-muted-foreground">{signal.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {riskSignals.length === 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                All systems operating normally
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  const color = value >= 90 ? 'bg-emerald-500' : value >= 70 ? 'bg-amber-500' : 'bg-red-500'

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" indicatorClassName={color} />
    </div>
  )
}
