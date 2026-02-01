'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { RefreshCw } from 'lucide-react'
import { MeetingsHero } from '@/components/dashboard/meetings-hero'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { TrendChart } from '@/components/dashboard/trend-chart'
import { RecentMeetings } from '@/components/dashboard/recent-meetings'
import { ActiveCampaigns } from '@/components/dashboard/active-campaigns'
import { HealthScoreCard } from '@/components/dashboard/health-score-card'
import { EngineActivity } from '@/components/dashboard/engine-activity'
import { Button } from '@/components/ui/button'
import { useToastActions } from '@/components/ui/toast'
import { fetchDashboardMetrics } from '@/lib/n8n/client'
import { cn } from '@/lib/utils'

function formatLastUpdated(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'Just now'
  if (diffMins === 1) return '1 min ago'
  if (diffMins < 60) return `${diffMins} min ago`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours === 1) return '1 hour ago'
  return `${diffHours} hours ago`
}

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const toast = useToastActions()

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const result = await fetchDashboardMetrics('current')
      if (result.success) {
        setLastUpdated(new Date())
        toast.success('Dashboard refreshed', 'Data has been updated')
      } else {
        toast.error('Refresh failed', result.error || 'Could not refresh dashboard')
      }
    } catch {
      toast.error('Refresh failed', 'An unexpected error occurred')
    } finally {
      setIsRefreshing(false)
    }
  }, [toast])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, User</h1>
            <p className="text-muted-foreground">Here&apos;s how your campaigns are performing</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-muted-foreground bg-muted border border-border rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                All Systems Operational
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Meetings Hero Section - Primary Focus */}
      <MeetingsHero />

      {/* Secondary Metrics */}
      <MetricCards />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Trend Chart */}
          <TrendChart
            title="12-Week Performance"
            showMeetings={true}
            showReplyRate={true}
          />

          {/* Active Campaigns */}
          <ActiveCampaigns />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Health Score */}
          <HealthScoreCard />

          {/* Recent Meetings */}
          <RecentMeetings />

          {/* Engine Activity */}
          <EngineActivity />
        </div>
      </div>
    </div>
  )
}
