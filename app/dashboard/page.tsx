'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { HealthScore } from '@/components/dashboard/health-score'
import { CampaignCard } from '@/components/dashboard/campaign-card'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { QuickActions } from '@/components/dashboard/quick-actions'

import {
  mockMetrics,
  mockHealthScore,
  mockCampaigns,
  mockActivity,
} from '@/lib/data/dashboard'

const statsData = [
  {
    label: 'Emails Sent',
    value: mockMetrics.totalSent.toLocaleString(),
    change: { value: '+8%', trend: 'up' as const },
  },
  {
    label: 'Open Rate',
    value: `${mockMetrics.openRate}%`,
    change: { value: '+2.1%', trend: 'up' as const },
  },
  {
    label: 'Reply Rate',
    value: `${mockMetrics.replyRate}%`,
    change: { value: '+0.4%', trend: 'up' as const },
  },
  {
    label: 'Meetings Booked',
    value: mockMetrics.meetingsBooked,
    change: { value: '+5', trend: 'up' as const },
  },
]

export default function DashboardPage() {
  const activeCampaigns = mockCampaigns.filter((c) => c.status === 'active')

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <StatsCard key={stat.label} {...stat} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Campaigns */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Active Campaigns</h3>
              <Link
                href="/dashboard/campaigns"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {activeCampaigns.map((campaign, index) => (
                <CampaignCard
                  key={campaign.id}
                  id={campaign.id}
                  name={campaign.name}
                  status={campaign.status}
                  sent={campaign.sent}
                  replyRate={campaign.replyRate}
                  index={index}
                />
              ))}
              {activeCampaigns.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-4">
                  No active campaigns
                </p>
              )}
            </div>
          </div>

          {/* Activity Feed */}
          <ActivityFeed items={mockActivity} />
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Health Score */}
          <HealthScore
            score={mockHealthScore.overall}
            status={mockHealthScore.status}
            details={[
              { label: 'Domain health', value: `${mockHealthScore.domainHealth}%` },
              { label: 'Reply quality', value: `${mockHealthScore.replyQuality}%` },
            ]}
          />

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
