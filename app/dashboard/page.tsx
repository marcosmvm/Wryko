'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { RefreshCw, Loader2 } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { WelcomeLoader } from '@/components/dashboard/welcome-loader'
import { updateUserProfile } from '@/lib/supabase/actions'
import { MeetingsHero } from '@/components/dashboard/meetings-hero'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { TrendChart } from '@/components/dashboard/trend-chart'
import { RecentMeetings } from '@/components/dashboard/recent-meetings'
import { ActiveCampaigns } from '@/components/dashboard/active-campaigns'
import { HealthScoreCard } from '@/components/dashboard/health-score-card'
import { EngineActivity } from '@/components/dashboard/engine-activity'
import { Button } from '@/components/ui/button'
import { useToastActions } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import {
  getDashboardMetrics,
  getWeeklyTrends,
  getHealthScore,
  getMeetings,
  getCampaigns,
  getEngineActivity,
} from '@/lib/supabase/dashboard-actions'
import type {
  DashboardMetrics,
  WeeklyTrendData,
  HealthScore,
  Meeting,
  Campaign,
  EngineActivityItem,
} from '@/lib/types/dashboard'

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
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null)
  const [welcomeComplete, setWelcomeComplete] = useState(false)
  const toast = useToastActions()

  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [trends, setTrends] = useState<WeeklyTrendData[]>([])
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null)
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [engineActivities, setEngineActivities] = useState<EngineActivityItem[]>([])

  const loadData = useCallback(async () => {
    try {
      const [metricsResult, trendsResult, healthResult, meetingsResult, campaignsResult, engineResult] =
        await Promise.all([
          getDashboardMetrics(),
          getWeeklyTrends(),
          getHealthScore(),
          getMeetings(),
          getCampaigns({ status: 'active' }),
          getEngineActivity(),
        ])

      if (metricsResult.data) setMetrics(metricsResult.data)
      setTrends(trendsResult.data ?? [])
      if (healthResult.data) setHealthScore(healthResult.data)
      setMeetings(meetingsResult.data ?? [])
      setCampaigns(campaignsResult.data ?? [])
      setEngineActivities(engineResult.data ?? [])
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    async function checkFirstVisit() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data: { user } } = await supabase.auth.getUser()
      setIsFirstVisit(!user?.user_metadata?.first_dashboard_visit)
    }
    checkFirstVisit()
  }, [])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await loadData()
      toast.success('Dashboard refreshed', 'Data has been updated')
    } catch {
      toast.error('Refresh failed', 'An unexpected error occurred')
    } finally {
      setIsRefreshing(false)
    }
  }, [loadData, toast])

  if (loading && isFirstVisit && !welcomeComplete) {
    return (
      <WelcomeLoader
        onComplete={() => {
          setWelcomeComplete(true)
          updateUserProfile({ first_dashboard_visit: true }).catch(() => {})
        }}
      />
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

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
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
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
      <MeetingsHero metrics={metrics} />

      {/* Secondary Metrics */}
      <MetricCards metrics={metrics} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Trend Chart */}
          <TrendChart
            title="12-Week Performance"
            showMeetings={true}
            showReplyRate={true}
            data={trends}
          />

          {/* Active Campaigns */}
          <ActiveCampaigns campaigns={campaigns} />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Health Score */}
          <HealthScoreCard healthScore={healthScore} />

          {/* Recent Meetings */}
          <RecentMeetings meetings={meetings} />

          {/* Engine Activity */}
          <EngineActivity activities={engineActivities} />
        </div>
      </div>
    </div>
  )
}
