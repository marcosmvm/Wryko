'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import {
  Download,
  Mail,
  ChevronRight,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  Lightbulb,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  Search,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { mockReports } from '@/lib/data/dashboard'
import { useToastActions } from '@/components/ui/toast'
import { reportWorkflows } from '@/lib/n8n/client'

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

export default function ReportsPage() {
  const [filter, setFilter] = useState<'all' | 'recent'>('all')
  const [search, setSearch] = useState('')
  const [downloadingReport, setDownloadingReport] = useState<string | null>(null)
  const [sharingReport, setSharingReport] = useState<string | null>(null)
  const toast = useToastActions()
  const [latestReport, ...previousReports] = mockReports

  const handleDownloadReport = useCallback(async (reportId: string) => {
    setDownloadingReport(reportId)
    try {
      const result = await reportWorkflows.download(reportId)
      if (result.success && result.data?.downloadUrl) {
        window.open(result.data.downloadUrl, '_blank')
        toast.success('Download started', 'Your report PDF is downloading')
      } else {
        toast.error('Download failed', result.error || 'Could not download report')
      }
    } catch {
      toast.error('Download failed', 'An unexpected error occurred')
    } finally {
      setDownloadingReport(null)
    }
  }, [toast])

  const handleShareReport = useCallback(async (reportId: string) => {
    setSharingReport(reportId)
    try {
      const result = await reportWorkflows.share(reportId, 'team')
      if (result.success) {
        toast.success('Report shared', 'The report has been sent to your team')
      } else {
        toast.error('Share failed', result.error || 'Could not share report')
      }
    } catch {
      toast.error('Share failed', 'An unexpected error occurred')
    } finally {
      setSharingReport(null)
    }
  }, [toast])

  const filteredReports = previousReports.filter(report => {
    if (filter === 'recent') {
      const reportDate = new Date(report.periodEnd)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return reportDate >= thirtyDaysAgo
    }
    return true
  })

  // Calculate week-over-week changes (mock data)
  const weekOverWeek = {
    sent: 12,
    openRate: 2.3,
    replyRate: 0.8,
    meetings: 1
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Weekly Reports</h1>
            <p className="text-muted-foreground">AI-generated performance insights delivered every Monday</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Next report: Monday, Feb 3</span>
          </div>
        </div>
      </motion.div>

      {/* Latest Report - Featured */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <Badge className="mb-2">Latest Report</Badge>
                <h2 className="text-xl font-semibold">
                  Week of {formatDateRange(latestReport.periodStart, latestReport.periodEnd)}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Generated on {formatDate(latestReport.generatedAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadReport(latestReport.id)}
                  disabled={downloadingReport === latestReport.id}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {downloadingReport === latestReport.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Download PDF
                </button>
                <button
                  onClick={() => handleShareReport(latestReport.id)}
                  disabled={sharingReport === latestReport.id}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors disabled:opacity-50"
                >
                  {sharingReport === latestReport.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                  Share
                </button>
              </div>
            </div>

            {/* AI Executive Summary */}
            <div className="border border-border rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Star className="w-4 h-4 text-muted-foreground" />
                </div>
                <h3 className="font-semibold">AI Executive Summary</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {latestReport.aiSummary}
              </p>
            </div>

            {/* Key Metrics with WoW */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-muted-foreground">Emails Sent</p>
                  <TrendIndicator value={weekOverWeek.sent} suffix="" />
                </div>
                <p className="text-2xl font-bold font-heading">{latestReport.metrics.emailsSent.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">vs last week</p>
              </div>
              <div className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-muted-foreground">Open Rate</p>
                  <TrendIndicator value={weekOverWeek.openRate} />
                </div>
                <p className="text-2xl font-bold font-heading">{latestReport.metrics.openRate}%</p>
                <p className="text-xs text-muted-foreground">Industry avg: 18%</p>
              </div>
              <div className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-muted-foreground">Reply Rate</p>
                  <TrendIndicator value={weekOverWeek.replyRate} />
                </div>
                <p className="text-2xl font-bold font-heading">{latestReport.metrics.replyRate}%</p>
                <p className="text-xs text-muted-foreground">Industry avg: 5.1%</p>
              </div>
              <div className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-muted-foreground">Meetings Booked</p>
                  <TrendIndicator value={weekOverWeek.meetings} suffix="" />
                </div>
                <p className="text-2xl font-bold font-heading">{latestReport.metrics.meetingsBooked}</p>
                <p className="text-xs text-muted-foreground">Target: 4/week</p>
              </div>
            </div>

            {/* Key Wins & Recommendations */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Key Wins */}
              <div className="border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-semibold">Key Wins This Week</h3>
                </div>
                <ul className="space-y-3">
                  {latestReport.keyWins.map((win, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 text-xs font-medium">
                        {index + 1}
                      </span>
                      <span>{win}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold">AI Recommendations</h3>
                </div>
                <ul className="space-y-3">
                  {latestReport.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 text-xs font-medium">
                        {index + 1}
                      </span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Report Archive */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold">Report Archive</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[200px] pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Select value={filter} onValueChange={(v) => setFilter(v as 'all' | 'recent')}>
              <SelectTrigger className="w-[140px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="recent">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card variant="futuristic">
          <CardContent className="p-0">
            {filteredReports.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Week of {formatDateRange(report.periodStart, report.periodEnd)}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{report.metrics.meetingsBooked} meetings</span>
                          <span>{report.metrics.replyRate}% reply rate</span>
                          <span>{report.metrics.emailsSent.toLocaleString()} sent</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadReport(report.id)}
                        disabled={downloadingReport === report.id}
                        className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
                        title="Download PDF"
                      >
                        {downloadingReport === report.id ? (
                          <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                        ) : (
                          <Download className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      <button
                        onClick={() => handleShareReport(report.id)}
                        disabled={sharingReport === report.id}
                        className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
                        title="Share Report"
                      >
                        {sharingReport === report.id ? (
                          <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                        ) : (
                          <Mail className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-semibold mb-2">No reports found</h3>
                <p className="text-muted-foreground text-sm">Try adjusting your search or filter</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Report Schedule Info */}
      <Card variant="futuristic">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Weekly Report Schedule</h3>
              <p className="text-sm text-muted-foreground">
                Reports are automatically generated every Monday at 9:00 AM and sent to your email.
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/dashboard/settings?tab=notifications'}
              className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
            >
              Manage Preferences
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
