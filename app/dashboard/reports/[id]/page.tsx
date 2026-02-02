'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Download,
  Mail,
  Star,
  CheckCircle2,
  Lightbulb,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Target,
  Users,
  FileText,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getWeeklyReportById } from '@/lib/supabase/dashboard-actions'
import type { WeeklyReport } from '@/lib/types/dashboard'
import { useToastActions } from '@/components/ui/toast'
import { reportWorkflows } from '@/lib/n8n/client'
import { fadeInUp, getStaggerDelay } from '@/lib/animations'

function formatDateRange(start: string, end: string) {
  const startDate = new Date(start)
  const endDate = new Date(end)

  const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' })
  const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' })

  if (startMonth === endMonth) {
    return `${startMonth} ${startDate.getDate()}-${endDate.getDate()}, ${endDate.getFullYear()}`
  }
  return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}`
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function TrendIndicator({ value, suffix = '%' }: { value: number; suffix?: string }) {
  if (value > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-emerald-500 text-xs font-medium">
        <TrendingUp className="w-3 h-3" />
        +{value}{suffix}
      </span>
    )
  }
  if (value < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-red-500 text-xs font-medium">
        <TrendingDown className="w-3 h-3" />
        {value}{suffix}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-muted-foreground text-xs font-medium">
      <Minus className="w-3 h-3" />
      0{suffix}
    </span>
  )
}

function getWinLink(win: string): string | null {
  if (/meeting/i.test(win)) return '/dashboard/meetings'
  if (/campaign/i.test(win)) return '/dashboard/campaigns'
  return null
}

export default function ReportDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const [report, setReport] = useState<WeeklyReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloadingReport, setDownloadingReport] = useState(false)
  const [sharingReport, setSharingReport] = useState(false)
  const toast = useToastActions()

  useEffect(() => {
    async function load() {
      const result = await getWeeklyReportById(id)
      setReport(result.data)
      setLoading(false)
    }
    load()
  }, [id])

  const handleDownloadReport = useCallback(async () => {
    setDownloadingReport(true)
    try {
      const result = await reportWorkflows.download(id)
      if (result.success && result.data?.downloadUrl) {
        window.open(result.data.downloadUrl, '_blank')
        toast.success('Download started', 'Your report PDF is downloading')
      } else {
        toast.error('Download failed', result.error || 'Could not download report')
      }
    } catch {
      toast.error('Download failed', 'An unexpected error occurred')
    } finally {
      setDownloadingReport(false)
    }
  }, [id, toast])

  const handleShareReport = useCallback(async () => {
    setSharingReport(true)
    try {
      const result = await reportWorkflows.share(id, 'team')
      if (result.success) {
        toast.success('Report shared', 'The report has been sent to your team')
      } else {
        toast.error('Share failed', result.error || 'Could not share report')
      }
    } catch {
      toast.error('Share failed', 'An unexpected error occurred')
    } finally {
      setSharingReport(false)
    }
  }, [id, toast])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!report) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-2">Report not found</h1>
        <Link href="/dashboard/reports" className="text-primary hover:underline">
          Back to reports
        </Link>
      </div>
    )
  }

  const metricCards = [
    {
      label: 'Emails Sent',
      value: report.metrics.emailsSent.toLocaleString(),
      trend: report.vsLastWeek.openRate,
      trendSuffix: '',
      subtitle: 'vs last week',
      href: '/dashboard/campaigns',
      icon: Mail,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/10',
    },
    {
      label: 'Open Rate',
      value: `${report.metrics.openRate}%`,
      trend: report.vsLastWeek.openRate,
      trendSuffix: '%',
      subtitle: 'Industry avg: 18%',
      href: '/dashboard/campaigns',
      icon: Target,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-500/10',
    },
    {
      label: 'Reply Rate',
      value: `${report.metrics.replyRate}%`,
      trend: report.vsLastWeek.replyRate,
      trendSuffix: '%',
      subtitle: 'Industry avg: 5.1%',
      href: '/dashboard/campaigns',
      icon: Users,
      iconColor: 'text-indigo-500',
      iconBg: 'bg-indigo-500/10',
    },
    {
      label: 'Meetings Booked',
      value: report.metrics.meetingsBooked.toString(),
      trend: report.vsLastWeek.meetings,
      trendSuffix: '',
      subtitle: 'Target: 4/week',
      href: '/dashboard/meetings',
      icon: Calendar,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-500/10',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/reports"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Reports
      </Link>

      {/* Header */}
      <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <Badge className="mb-2">Weekly Report</Badge>
            <h1 className="text-2xl font-bold">
              Week of {formatDateRange(report.periodStart, report.periodEnd)}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Generated on {formatDate(report.generatedAt)}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadReport}
              disabled={downloadingReport}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {downloadingReport ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Download PDF
            </button>
            <button
              onClick={handleShareReport}
              disabled={sharingReport}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors disabled:opacity-50"
            >
              {sharingReport ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
              Share
            </button>
          </div>
        </div>
      </motion.div>

      {/* Clickable Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={getStaggerDelay(index)}
              whileHover={{ y: -2 }}
            >
              <Link href={metric.href}>
                <Card variant="futuristic" className="hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${metric.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${metric.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm text-muted-foreground">{metric.label}</p>
                          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-2xl font-bold font-heading">{metric.value}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                          <TrendIndicator value={metric.trend} suffix={metric.trendSuffix} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Executive Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(4)}>
            <Card variant="futuristic">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Star className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">AI Executive Summary</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {report.aiSummary}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Wins */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(5)}>
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Key Wins This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.keyWins.map((win, index) => {
                    const href = getWinLink(win)
                    const content = (
                      <li className="flex items-start gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className={href ? 'hover:underline text-primary' : ''}>
                          {win}
                        </span>
                        {href && (
                          <ExternalLink className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                        )}
                      </li>
                    )

                    return href ? (
                      <Link key={index} href={href}>{content}</Link>
                    ) : (
                      <div key={index}>{content}</div>
                    )
                  })}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(6)}>
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 text-xs font-medium">
                        {index + 1}
                      </span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Week-over-Week Changes */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(4)}>
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Week-over-Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Meetings</span>
                    <TrendIndicator value={report.vsLastWeek.meetings} suffix="" />
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Reply Rate</span>
                    <TrendIndicator value={report.vsLastWeek.replyRate} suffix="%" />
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Open Rate</span>
                    <TrendIndicator value={report.vsLastWeek.openRate} suffix="%" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Report Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(5)}>
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-lg">Report Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Period</span>
                    <span className="font-medium text-sm">{formatDateRange(report.periodStart, report.periodEnd)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Generated</span>
                    <span className="font-medium text-sm">{formatDate(report.generatedAt)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Positive Replies</span>
                    <span className="font-medium text-sm">{report.metrics.positiveReplies}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">PDF Available</span>
                    <Badge variant={report.pdfUrl ? 'success' : 'secondary'}>
                      {report.pdfUrl ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(6)}>
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="/dashboard/campaigns"
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="font-medium text-sm">View Campaigns</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/dashboard/meetings"
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="font-medium text-sm">View Meetings</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/dashboard/domain-health"
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-indigo-500" />
                    </div>
                    <span className="font-medium text-sm">Domain Health</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
