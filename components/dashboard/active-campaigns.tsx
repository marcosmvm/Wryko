'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MessageSquare, Calendar, FlaskConical } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { Campaign } from '@/lib/types/dashboard'

export function ActiveCampaigns({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <Card variant="futuristic">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Active Campaigns</CardTitle>
        <Link
          href="/dashboard/campaigns"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {campaigns.map((campaign) => {
          const hasActiveTests = campaign.activeTests?.some(t => t.status === 'running')
          const totalReplies = campaign.positiveReplies + campaign.neutralReplies + campaign.negativeReplies
          const positivePercent = totalReplies > 0 ? (campaign.positiveReplies / totalReplies) * 100 : 0

          return (
            <div key={campaign.id}>
              <Link
                href={`/dashboard/campaigns/${campaign.id}`}
                className="block p-4 rounded-lg border border-border hover:bg-muted/50 group transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{campaign.name}</h3>
                      {hasActiveTests && (
                        <Badge variant="info" className="text-[10px] gap-1">
                          <FlaskConical className="w-3 h-3" />
                          A/B Test
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{campaign.target}</p>
                  </div>
                  <Badge variant="success" className="shrink-0">Active</Badge>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-3">
                  <MetricItem
                    icon={Mail}
                    value={campaign.sent.toLocaleString()}
                    label="Sent"
                  />
                  <MetricItem
                    icon={MessageSquare}
                    value={`${campaign.replyRate}%`}
                    label="Reply"
                    highlight={campaign.replyRate >= 8}
                  />
                  <MetricItem
                    icon={Calendar}
                    value={campaign.meetings.toString()}
                    label="Meetings"
                    highlight
                  />
                  <MetricItem
                    value={`${Math.round(positivePercent)}%`}
                    label="Positive"
                  />
                </div>

                {/* Reply Breakdown Bar */}
                <div className="space-y-1">
                  <div className="flex h-2 rounded-full overflow-hidden bg-muted shadow-inner">
                    <div
                      className="bg-success"
                      style={{ width: `${positivePercent}%` }}
                    />
                    <div
                      className="bg-warning"
                      style={{ width: `${totalReplies > 0 ? (campaign.neutralReplies / totalReplies) * 100 : 0}%` }}
                    />
                    <div
                      className="bg-destructive/70"
                      style={{ width: `${totalReplies > 0 ? (campaign.negativeReplies / totalReplies) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{campaign.positiveReplies} positive</span>
                    <span>{campaign.neutralReplies} neutral</span>
                    <span>{campaign.negativeReplies} negative</span>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}

        {campaigns.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No active campaigns</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function MetricItem({
  icon: Icon,
  value,
  label,
  highlight
}: {
  icon?: React.ComponentType<{ className?: string }>
  value: string
  label: string
  highlight?: boolean
}) {
  return (
    <div className="text-center">
      <div className={cn(
        "text-lg font-heading font-bold",
        highlight && "text-foreground"
      )}>
        {value}
      </div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}
