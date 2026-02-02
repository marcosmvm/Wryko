'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, getStaggerDelay } from '@/lib/animations'
import { Search, ChevronRight, Mail, MessageSquare, Calendar, FlaskConical, TrendingUp, Filter, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { getCampaigns } from '@/lib/supabase/dashboard-actions'
import type { Campaign } from '@/lib/types/dashboard'

type StatusFilter = 'all' | 'active' | 'paused' | 'completed' | 'draft'

export default function CampaignsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const result = await getCampaigns()
      setCampaigns(result.data)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalMeetings = campaigns.reduce((sum, c) => sum + c.meetings, 0)
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length
  const avgReplyRate = (campaigns.reduce((sum, c) => sum + c.replyRate, 0) / campaigns.length).toFixed(1)

  const statusConfig = {
    active: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Active' },
    paused: { color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Paused' },
    completed: { color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Completed' },
    draft: { color: 'text-muted-foreground', bg: 'bg-muted', label: 'Draft' },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
        <p className="text-muted-foreground">Manage and monitor your lead generation campaigns</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Campaigns</p>
                <p className="text-3xl font-heading font-bold">{activeCampaigns}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Meetings</p>
                <p className="text-3xl font-heading font-bold">{totalMeetings}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Reply Rate</p>
                <p className="text-3xl font-heading font-bold">{avgReplyRate}%</p>
                <p className="text-xs text-muted-foreground">Industry: 5.1%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">A/B Tests Running</p>
                <p className="text-3xl font-heading font-bold">
                  {campaigns.reduce((sum, c) => sum + (c.activeTests?.filter(t => t.status === 'running').length || 0), 0)}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="border border-border p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:shadow-md focus:shadow-primary/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => {
          const config = statusConfig[campaign.status]
          const hasActiveTests = campaign.activeTests?.some(t => t.status === 'running')
          const hasRecommendations = campaign.optimizationRecommendations?.some(r => r.status === 'pending')
          const totalReplies = campaign.positiveReplies + campaign.neutralReplies + campaign.negativeReplies
          const positivePercent = totalReplies > 0 ? (campaign.positiveReplies / totalReplies) * 100 : 0

          return (
            <div key={campaign.id}>
              <Link
                href={`/dashboard/campaigns/${campaign.id}`}
                className="block"
              >
                <Card className="group hover:bg-muted/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Campaign Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{campaign.name}</h3>
                          <Badge variant={
                            campaign.status === 'active' ? 'success' :
                            campaign.status === 'paused' ? 'warning' :
                            campaign.status === 'completed' ? 'info' : 'secondary'
                          } className="capitalize">
                            {campaign.status}
                          </Badge>
                          {hasActiveTests && (
                            <Badge variant="outline" className="gap-1">
                              <FlaskConical className="w-3 h-3" />
                              A/B Test
                            </Badge>
                          )}
                          {hasRecommendations && (
                            <Badge variant="outline" className="gap-1 text-amber-500 border-amber-500/30">
                              <TrendingUp className="w-3 h-3" />
                              Optimization
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{campaign.target}</p>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-5 gap-6">
                          <div>
                            <p className="text-2xl font-heading font-bold">{campaign.sent.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground uppercase">Sent</p>
                          </div>
                          <div>
                            <p className="text-2xl font-heading font-bold">{campaign.openRate}%</p>
                            <p className="text-xs text-muted-foreground uppercase">Opens</p>
                          </div>
                          <div>
                            <p className={cn(
                              "text-2xl font-heading font-bold",
                              campaign.replyRate >= 8 && "text-foreground"
                            )}>
                              {campaign.replyRate}%
                            </p>
                            <p className="text-xs text-muted-foreground uppercase">Replies</p>
                          </div>
                          <div>
                            <p className="text-2xl font-heading font-bold">{campaign.meetings}</p>
                            <p className="text-xs text-muted-foreground uppercase">Meetings</p>
                          </div>
                          <div>
                            <p className="text-2xl font-heading font-bold">{Math.round(positivePercent)}%</p>
                            <p className="text-xs text-muted-foreground uppercase">Positive</p>
                          </div>
                        </div>

                        {/* Reply Breakdown Bar */}
                        <div className="mt-4 space-y-1">
                          <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                            <div
                              className="bg-emerald-500 transition-all"
                              style={{ width: `${positivePercent}%` }}
                            />
                            <div
                              className="bg-amber-500 transition-all"
                              style={{ width: `${totalReplies > 0 ? (campaign.neutralReplies / totalReplies) * 100 : 0}%` }}
                            />
                            <div
                              className="bg-red-400 transition-all"
                              style={{ width: `${totalReplies > 0 ? (campaign.negativeReplies / totalReplies) * 100 : 0}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{campaign.positiveReplies} positive</span>
                            <span>{campaign.neutralReplies} neutral</span>
                            <span>{campaign.negativeReplies} negative</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Arrow */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted group-hover:bg-muted/80 transition-colors shrink-0">
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )
        })}
      </div>

      {filteredCampaigns.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Mail className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold mb-2">No campaigns found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter</p>
          </CardContent>
        </Card>
      )}

      <p className="text-sm text-muted-foreground">
        Showing {filteredCampaigns.length} of {campaigns.length} campaigns
      </p>
    </div>
  )
}
