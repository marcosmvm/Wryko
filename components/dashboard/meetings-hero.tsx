'use client'

import Link from 'next/link'
import { Calendar, TrendingUp, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { DashboardMetrics } from '@/lib/types/dashboard'
import { motion } from 'framer-motion'
import { getStaggerDelay } from '@/lib/animations'

export function MeetingsHero({ metrics }: { metrics: DashboardMetrics | null }) {
  if (!metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Card className="bg-primary text-white border-0">
            <CardContent className="p-6">
              <p className="text-white/80 text-sm">Meetings Booked</p>
              <p className="text-5xl font-bold font-heading tracking-tight">0</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const progressPercent = Math.min((metrics.meetingsThisMonth / metrics.meetingsTarget) * 100, 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Primary Meetings Card */}
      <motion.div
        className="md:col-span-2"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/dashboard/meetings" className="block">
          <Card className="bg-primary text-white border-0 hover:opacity-90 transition-opacity cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Meetings Booked</p>
                  <p className="text-5xl font-bold font-heading tracking-tight">{metrics.meetingsThisMonth}</p>
                  <p className="text-white/80 text-sm mt-2">This month</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Calendar className="w-8 h-8" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/20 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{metrics.meetingsTrend}%</span>
                </div>
                <span className="text-white/80 text-sm">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* This Week */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getStaggerDelay(1)}
        whileHover={{ y: -2 }}
      >
        <Link href="/dashboard/meetings" className="block">
          <Card variant="futuristic" className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-medium">This Week</p>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              <p className="text-4xl font-bold font-heading tracking-tight">{metrics.meetingsThisWeek}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                  metrics.vsLastWeek.meetings >= 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                )}>
                  {metrics.vsLastWeek.meetings >= 0 ? '+' : ''}{metrics.vsLastWeek.meetings}%
                </span>
                <span className="text-muted-foreground text-sm">vs last week</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Progress to Target */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getStaggerDelay(2)}
        whileHover={{ y: -2 }}
      >
        <Link href="/dashboard/meetings" className="block">
          <Card variant="futuristic" className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-medium">Monthly Target</p>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Target className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <p className="text-4xl font-bold font-heading tracking-tight">{metrics.meetingsThisMonth}</p>
                <span className="text-muted-foreground">/ {metrics.meetingsTarget}</span>
              </div>
              <div className="mt-4">
                <Progress value={progressPercent} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  {Math.round(progressPercent)}% of target
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    </div>
  )
}
