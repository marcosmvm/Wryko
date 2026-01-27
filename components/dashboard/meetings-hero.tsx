'use client'

import { Calendar, TrendingUp, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { mockMetrics } from '@/lib/data/dashboard'

export function MeetingsHero() {
  const progressPercent = Math.min((mockMetrics.meetingsThisMonth / mockMetrics.meetingsTarget) * 100, 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Primary Meetings Card */}
      <Card className="md:col-span-2 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium mb-1">Meetings Booked</p>
              <p className="text-5xl font-bold tracking-tight">{mockMetrics.meetingsThisMonth}</p>
              <p className="text-emerald-100 text-sm mt-2">This month</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/20 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+{mockMetrics.meetingsTrend}%</span>
            </div>
            <span className="text-emerald-100 text-sm">vs last month</span>
          </div>
        </CardContent>
      </Card>

      {/* This Week */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground text-sm font-medium">This Week</p>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <p className="text-4xl font-bold tracking-tight">{mockMetrics.meetingsThisWeek}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={cn(
              "text-sm font-medium",
              mockMetrics.vsLastWeek.meetings >= 0 ? "text-emerald-500" : "text-red-500"
            )}>
              {mockMetrics.vsLastWeek.meetings >= 0 ? '+' : ''}{mockMetrics.vsLastWeek.meetings}%
            </span>
            <span className="text-muted-foreground text-sm">vs last week</span>
          </div>
        </CardContent>
      </Card>

      {/* Progress to Target */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground text-sm font-medium">Monthly Target</p>
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-4xl font-bold tracking-tight">{mockMetrics.meetingsThisMonth}</p>
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
    </div>
  )
}
