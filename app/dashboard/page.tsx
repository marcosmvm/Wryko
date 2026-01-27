'use client'

import { RefreshCw } from 'lucide-react'
import { MeetingsHero } from '@/components/dashboard/meetings-hero'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { TrendChart } from '@/components/dashboard/trend-chart'
import { RecentMeetings } from '@/components/dashboard/recent-meetings'
import { ActiveCampaigns } from '@/components/dashboard/active-campaigns'
import { HealthScoreCard } from '@/components/dashboard/health-score-card'
import { EngineActivity } from '@/components/dashboard/engine-activity'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">Here&apos;s how your campaigns are performing</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last updated: 2 min ago</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

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
