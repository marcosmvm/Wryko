'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { mockHealthScore } from '@/lib/data/dashboard'

export function HealthScoreCard() {
  const { overall, status, domainHealth, replyQuality, engagementLevel, meetingConversion, trend, riskSignals } = mockHealthScore

  const TrendIcon = trend === 'improving' ? TrendingUp : trend === 'declining' ? TrendingDown : Minus
  const trendColor = trend === 'improving' ? 'text-success' : trend === 'declining' ? 'text-destructive' : 'text-muted-foreground'

  const statusColors = {
    healthy: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    critical: 'text-destructive bg-destructive/10',
  }

  const scoreColor = status === 'healthy' ? 'stroke-success' : status === 'warning' ? 'stroke-warning' : 'stroke-destructive'

  return (
    <Card variant="futuristic">
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
          <motion.div className="relative" animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
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
              <span className="text-4xl font-heading font-bold gradient-text">{overall}</span>
              <span className={cn("text-xs font-medium uppercase", statusColors[status].split(' ')[0])}>
                {status}
              </span>
            </div>
          </motion.div>
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
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="label-text mb-2">
              Attention Items
            </p>
            <div className="space-y-2">
              {riskSignals.map((signal, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-start gap-2 p-2.5 rounded-lg glass-card text-sm",
                    signal.severity === 'high' ? 'border-l-[3px] border-l-destructive' :
                    signal.severity === 'medium' ? 'border-l-[3px] border-l-warning' : 'border-l-[3px] border-l-info'
                  )}
                >
                  <AlertTriangle className={cn(
                    "w-4 h-4 mt-0.5 shrink-0",
                    signal.severity === 'high' ? 'text-destructive' :
                    signal.severity === 'medium' ? 'text-warning' : 'text-info'
                  )} />
                  <div>
                    <p className="font-medium">{signal.signal}</p>
                    <p className="text-xs text-muted-foreground">{signal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {riskSignals.length === 0 && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 p-2 rounded-lg glass-card glow-border text-sm">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-success font-medium">
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
  const color = value >= 90 ? 'bg-success' : value >= 70 ? 'bg-warning' : 'bg-destructive'

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-heading font-medium">{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" indicatorClassName={color} />
    </div>
  )
}
