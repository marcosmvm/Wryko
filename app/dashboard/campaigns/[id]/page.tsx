'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, ArrowRight, X } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { mockCampaigns } from '@/lib/data/dashboard'
import { cn } from '@/lib/utils'

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const campaign = mockCampaigns.find((c) => c.id === id)

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-2">Campaign not found</h1>
        <Link href="/dashboard/campaigns" className="text-primary hover:underline">
          Back to campaigns
        </Link>
      </div>
    )
  }

  const statusStyles = {
    active: 'text-green-500 bg-green-500/10',
    paused: 'text-yellow-500 bg-yellow-500/10',
    completed: 'text-blue-500 bg-blue-500/10',
    draft: 'text-muted-foreground bg-muted',
  }

  const totalReplies = campaign.positiveReplies + campaign.neutralReplies + campaign.negativeReplies
  const positivePercent = Math.round((campaign.positiveReplies / totalReplies) * 100)
  const neutralPercent = Math.round((campaign.neutralReplies / totalReplies) * 100)
  const negativePercent = Math.round((campaign.negativeReplies / totalReplies) * 100)

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/campaigns"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Campaigns
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{campaign.name}</h1>
          <p className="text-muted-foreground">Started {new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <span className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium capitalize',
          statusStyles[campaign.status]
        )}>
          ● {campaign.status}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Sent" value={campaign.sent.toLocaleString()} index={0} />
        <StatsCard label="Opened" value={`${campaign.opened.toLocaleString()} (${campaign.openRate}%)`} index={1} />
        <StatsCard label="Replied" value={`${campaign.replied.toLocaleString()} (${campaign.replyRate}%)`} index={2} />
        <StatsCard label="Meetings" value={campaign.meetings} index={3} />
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold mb-4">Performance Trend (Last 30 Days)</h3>
          <div className="h-48 flex items-center justify-center bg-muted/30 rounded-lg">
            <p className="text-muted-foreground text-sm">Chart visualization coming soon</p>
          </div>
        </motion.div>

        {/* Reply Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="font-semibold mb-4">Reply Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-500">
                <Check className="w-4 h-4" />
                <span>Positive</span>
              </div>
              <span className="font-medium">{campaign.positiveReplies} ({positivePercent}%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ArrowRight className="w-4 h-4" />
                <span>Neutral</span>
              </div>
              <span className="font-medium">{campaign.neutralReplies} ({neutralPercent}%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-500">
                <X className="w-4 h-4" />
                <span>Negative</span>
              </div>
              <span className="font-medium">{campaign.negativeReplies} ({negativePercent}%)</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Campaign Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h3 className="font-semibold mb-4">Campaign Details</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Daily Send</p>
            <p className="font-medium">{campaign.dailySend} emails</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Domains</p>
            <p className="font-medium">{campaign.domains} domains</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sequences</p>
            <p className="font-medium">{campaign.sequences || 4} steps</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Target</p>
            <p className="font-medium">{campaign.target || 'General'}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
