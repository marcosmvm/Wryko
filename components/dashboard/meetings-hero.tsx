'use client'

import { Calendar, TrendingUp, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { mockMetrics } from '@/lib/data/dashboard'
import { motion } from 'framer-motion'
import { getStaggerDelay } from '@/lib/animations'

export function MeetingsHero() {
  const progressPercent = Math.min((mockMetrics.meetingsThisMonth / mockMetrics.meetingsTarget) * 100, 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Primary Meetings Card */}
      <motion.div
        className="md:col-span-2"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glow-border shadow-lg shadow-primary/20 bg-gradient-to-br from-primary to-secondary text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Meetings Booked</p>
                <p className="text-5xl font-bold font-heading tracking-tight">{mockMetrics.meetingsThisMonth}</p>
                <p className="text-white/80 text-sm mt-2">This month</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Calendar className="w-8 h-8" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/20 backdrop-blur-sm text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+{mockMetrics.meetingsTrend}%</span>
              </div>
              <span className="text-white/80 text-sm">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* This Week */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getStaggerDelay(1)}
        whileHover={{ y: -2 }}
      >
        <Card variant="futuristic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm font-medium">This Week</p>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-success" />
              </div>
            </div>
            <p className="text-4xl font-bold font-heading tracking-tight">{mockMetrics.meetingsThisWeek}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                mockMetrics.vsLastWeek.meetings >= 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              )}>
                {mockMetrics.vsLastWeek.meetings >= 0 ? '+' : ''}{mockMetrics.vsLastWeek.meetings}%
              </span>
              <span className="text-muted-foreground text-sm">vs last week</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress to Target */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getStaggerDelay(2)}
        whileHover={{ y: -2 }}
      >
        <Card variant="futuristic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm font-medium">Monthly Target</p>
              <div className="w-10 h-10 rounded-full bg-metric-indigo/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-metric-indigo" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <p className="text-4xl font-bold font-heading tracking-tight">{mockMetrics.meetingsThisMonth}</p>
              <span className="text-muted-foreground">/ {mockMetrics.meetingsTarget}</span>
            </div>
            <div className="mt-4">
              <Progress value={progressPercent} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {Math.round(progressPercent)}% of target
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
