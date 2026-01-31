'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, X, Minus, Pause, Play, FlaskConical, TrendingUp, AlertCircle, Mail, Calendar, Users, Target, Download, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { getCampaignById } from '@/lib/data/dashboard'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import { useToastActions } from '@/components/ui/toast'
import { campaignWorkflows } from '@/lib/n8n/client'
import { fadeInUp, getStaggerDelay } from '@/lib/animations'

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const [campaignData, setCampaignData] = useState(() => getCampaignById(id))
  const [isPausing, setIsPausing] = useState(false)
  const [isResuming, setIsResuming] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const toast = useToastActions()

  const campaign = campaignData

  const handlePause = useCallback(async () => {
    setIsPausing(true)
    try {
      const result = await campaignWorkflows.pause(id)
      if (result.success) {
        setCampaignData(prev => prev ? { ...prev, status: 'paused' as const } : prev)
        toast.success('Campaign paused', 'The campaign has been paused successfully')
      } else {
        toast.error('Failed to pause', result.error || 'Could not pause campaign')
      }
    } catch {
      toast.error('Failed to pause', 'An unexpected error occurred')
    } finally {
      setIsPausing(false)
    }
  }, [id, toast])

  const handleResume = useCallback(async () => {
    setIsResuming(true)
    try {
      const result = await campaignWorkflows.resume(id)
      if (result.success) {
        setCampaignData(prev => prev ? { ...prev, status: 'active' as const } : prev)
        toast.success('Campaign resumed', 'The campaign is now active')
      } else {
        toast.error('Failed to resume', result.error || 'Could not resume campaign')
      }
    } catch {
      toast.error('Failed to resume', 'An unexpected error occurred')
    } finally {
      setIsResuming(false)
    }
  }, [id, toast])

  const handleExportCSV = useCallback(async () => {
    setIsExporting(true)
    try {
      const result = await campaignWorkflows.exportCSV(id)
      if (result.success && result.data?.downloadUrl) {
        window.open(result.data.downloadUrl, '_blank')
        toast.success('Export ready', 'Your CSV download has started')
      } else {
        toast.error('Export failed', result.error || 'Could not export campaign data')
      }
    } catch {
      toast.error('Export failed', 'An unexpected error occurred')
    } finally {
      setIsExporting(false)
    }
  }, [id, toast])

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

  const totalReplies = campaign.positiveReplies + campaign.neutralReplies + campaign.negativeReplies
  const positivePercent = Math.round((campaign.positiveReplies / totalReplies) * 100)
  const neutralPercent = Math.round((campaign.neutralReplies / totalReplies) * 100)
  const negativePercent = Math.round((campaign.negativeReplies / totalReplies) * 100)

  const statusConfig = {
    active: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: Play },
    paused: { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Pause },
    completed: { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Check },
    draft: { color: 'text-muted-foreground', bg: 'bg-muted', icon: Minus },
  }

  const config = statusConfig[campaign.status]
  const StatusIcon = config.icon

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
      <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold"><span className="gradient-text">{campaign.name}</span></h1>
              <Badge variant={
                campaign.status === 'active' ? 'success' :
                campaign.status === 'paused' ? 'warning' :
                campaign.status === 'completed' ? 'info' : 'secondary'
              } className="capitalize gap-1">
                <StatusIcon className="w-3 h-3" />
                {campaign.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{campaign.target}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Started {format(parseISO(campaign.startDate), 'MMMM d, yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleExportCSV}
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Export CSV
            </Button>
            {campaign.status === 'active' && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={handlePause}
                disabled={isPausing}
              >
                {isPausing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
                Pause
              </Button>
            )}
            {campaign.status === 'paused' && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleResume}
                disabled={isResuming}
              >
                {isResuming ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                Resume
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(0)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{campaign.sent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Emails Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(1)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{campaign.openRate}%</p>
                  <p className="text-xs text-muted-foreground">Open Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(2)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className={cn(
                    "text-2xl font-bold font-heading",
                    campaign.replyRate >= 8 && "text-emerald-500"
                  )}>
                    {campaign.replyRate}%
                  </p>
                  <p className="text-xs text-muted-foreground">Reply Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(3)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading text-primary">{campaign.meetings}</p>
                  <p className="text-xs text-muted-foreground">Meetings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(4)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{positivePercent}%</p>
                  <p className="text-xs text-muted-foreground">Positive</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sequence Performance */}
          {campaign.sequencePerformance && (
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-lg">Sequence Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaign.sequencePerformance.map((email, index) => (
                    <motion.div key={email.emailNumber} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(index)}>
                      <div className="p-4 rounded-lg glass-card">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-medium">Email {email.emailNumber}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-md">{email.subject}</p>
                          </div>
                          <Badge variant="outline">{email.sent.toLocaleString()} sent</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Open Rate</span>
                              <span className="font-medium">{email.openRate}%</span>
                            </div>
                            <Progress value={email.openRate} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Reply Rate</span>
                              <span className="font-medium">{email.replyRate}%</span>
                            </div>
                            <Progress
                              value={email.replyRate * 10}
                              className="h-2"
                              indicatorClassName="bg-indigo-500"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* A/B Tests */}
          {campaign.activeTests && campaign.activeTests.length > 0 && (
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-purple-500" />
                  A/B Tests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaign.activeTests.map((test) => (
                  <div key={test.id} className="p-4 rounded-lg glass-card">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium capitalize">{test.variable.replace('_', ' ')} Test</p>
                          <Badge variant={
                            test.status === 'completed' ? 'success' :
                            test.status === 'running' ? 'info' : 'secondary'
                          } className="capitalize">
                            {test.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Started {format(parseISO(test.startedAt), 'MMM d, yyyy')}
                          {test.completedAt && ` • Completed ${format(parseISO(test.completedAt), 'MMM d, yyyy')}`}
                        </p>
                      </div>
                      {test.results?.winner && (
                        <Badge variant="success" className="gap-1">
                          <Check className="w-3 h-3" />
                          Variant {test.results.winner} Wins
                        </Badge>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Variant A */}
                      <div className={cn(
                        "p-3 rounded-lg border-2",
                        test.results?.winner === 'A' ? "relative overflow-hidden border-emerald-500 glass-premium glow-border" : "border-border"
                      )}>
                        {test.results?.winner === 'A' && (
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-primary to-emerald-500" />
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Variant A</span>
                          {test.results?.winner === 'A' && (
                            <Badge variant="success" className="text-xs">Winner</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{test.variantA}</p>
                        {test.results && (
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Opens</p>
                              <p className="font-bold">{test.results.variantAOpenRate}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Replies</p>
                              <p className="font-bold">{test.results.variantAReplyRate}%</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Variant B */}
                      <div className={cn(
                        "p-3 rounded-lg border-2",
                        test.results?.winner === 'B' ? "relative overflow-hidden border-emerald-500 glass-premium glow-border" : "border-border"
                      )}>
                        {test.results?.winner === 'B' && (
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-primary to-emerald-500" />
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Variant B</span>
                          {test.results?.winner === 'B' && (
                            <Badge variant="success" className="text-xs">Winner</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{test.variantB}</p>
                        {test.results && (
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Opens</p>
                              <p className="font-bold">{test.results.variantBOpenRate}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Replies</p>
                              <p className="font-bold">{test.results.variantBReplyRate}%</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {test.results && (
                      <div className="mt-4 pt-4 border-t flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Confidence: <span className="font-medium text-foreground">{test.results.confidence}%</span>
                          </span>
                          {test.results.lift && (
                            <span className="text-emerald-500">
                              +{test.results.lift}% lift
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {test.results.variantASent + test.results.variantBSent} total sends
                        </span>
                      </div>
                    )}

                    {test.status === 'running' && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                          </span>
                          Test in progress - collecting data
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Reply Breakdown */}
          <Card variant="futuristic">
            <CardHeader>
              <CardTitle className="text-lg">Reply Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex h-5 rounded-full overflow-hidden shadow-sm">
                  <div
                    className="bg-emerald-500 transition-all"
                    style={{ width: `${positivePercent}%` }}
                  />
                  <div
                    className="bg-amber-500 transition-all"
                    style={{ width: `${neutralPercent}%` }}
                  />
                  <div
                    className="bg-red-400 transition-all"
                    style={{ width: `${negativePercent}%` }}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span>Positive</span>
                    </div>
                    <span className="font-medium">{campaign.positiveReplies} ({positivePercent}%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-500">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span>Neutral</span>
                    </div>
                    <span className="font-medium">{campaign.neutralReplies} ({neutralPercent}%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-400">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <span>Negative</span>
                    </div>
                    <span className="font-medium">{campaign.negativeReplies} ({negativePercent}%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Optimization Recommendations */}
          {campaign.optimizationRecommendations && campaign.optimizationRecommendations.length > 0 && (
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {campaign.optimizationRecommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className={cn(
                      "p-3 rounded-lg",
                      rec.priority === 'high' ? "glass-premium border-amber-500/50" :
                      rec.priority === 'medium' ? "border-blue-500/50 bg-blue-500/5 border" :
                      "border-border border"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className={cn(
                        "w-4 h-4 mt-0.5 shrink-0",
                        rec.priority === 'high' ? "text-amber-500" :
                        rec.priority === 'medium' ? "text-blue-500" :
                        "text-muted-foreground"
                      )} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{rec.title}</p>
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                        <Badge variant="success" className="text-xs">
                          Expected: {rec.expectedImpact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Campaign Details */}
          <Card variant="futuristic">
            <CardHeader>
              <CardTitle className="text-lg">Campaign Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Daily Send</span>
                  <span className="font-medium">{campaign.dailySend} emails</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Active Domains</span>
                  <span className="font-medium">{campaign.domains} domains</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Email Sequences</span>
                  <span className="font-medium">{campaign.sequences} steps</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium">{format(parseISO(campaign.startDate), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
