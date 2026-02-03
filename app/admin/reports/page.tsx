'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Search,
  Loader2,
  RefreshCw,
  Mail,
  Star,
  Lightbulb,
  BarChart3,
} from 'lucide-react'
import { AdminStatsCard } from '@/components/admin/admin-stats-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'
import { getAllWeeklyReports } from '@/lib/supabase/admin-actions'
import { adminCsmWorkflows } from '@/lib/n8n/client'
import type { AdminWeeklyReport } from '@/lib/types/admin'

export default function ReportsHubPage() {
  const [reports, setReports] = useState<AdminWeeklyReport[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedReport, setExpandedReport] = useState<string | null>(null)
  const [regeneratingClient, setRegeneratingClient] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      const result = await getAllWeeklyReports()
      if (result.data) setReports(result.data)
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Compute stats
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const reportsThisWeek = reports.filter(
    (r) => new Date(r.generatedAt) >= oneWeekAgo
  ).length
  const uniqueClients = new Set(reports.map((r) => r.clientId)).size
  const avgMeetings =
    reports.length > 0
      ? Math.round(
          reports.reduce((sum, r) => sum + r.metrics.meetingsBooked, 0) / reports.length
        )
      : 0

  const filteredReports = reports.filter((r) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!r.clientName.toLowerCase().includes(query) && !r.aiSummary.toLowerCase().includes(query))
        return false
    }
    return true
  })

  const getTrendIndicator = (value: number) => {
    if (value > 0) {
      return (
        <span className="inline-flex items-center gap-0.5 text-xs text-emerald-500">
          <TrendingUp className="w-3 h-3" />
          +{value}%
        </span>
      )
    }
    if (value < 0) {
      return (
        <span className="inline-flex items-center gap-0.5 text-xs text-red-500">
          <TrendingDown className="w-3 h-3" />
          {value}%
        </span>
      )
    }
    return <span className="text-xs text-muted-foreground">--</span>
  }

  async function handleRegenerateReport(clientId: string) {
    setRegeneratingClient(clientId)
    try {
      await adminCsmWorkflows.regenerateReport(clientId)
    } finally {
      setRegeneratingClient(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={defaultTransition}
      >
        <h1 className="text-2xl font-heading font-bold">Reports Hub</h1>
        <p className="text-muted-foreground">
          Engine I (The Informant) -- Automated weekly client reports
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full mt-3" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <AdminStatsCard
          label="Reports This Week"
          value={reportsThisWeek}
          icon={FileText}
          variant="primary"
          index={0}
        />
        <AdminStatsCard
          label="Clients with Reports"
          value={uniqueClients}
          icon={Users}
          variant="blue"
          index={1}
        />
        <AdminStatsCard
          label="Avg Meetings Booked"
          value={avgMeetings}
          icon={Calendar}
          variant="amber"
          index={2}
        />
      </div>

      {/* Search */}
      <motion.div
        {...fadeInUp}
        transition={getStaggerDelay(1)}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search reports by client or summary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
      </motion.div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length > 0 ? (
          filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={getStaggerDelay(index, 0.3)}
            >
              <Card variant="elevated" className="overflow-hidden">
                {/* Report Header */}
                <div
                  className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() =>
                    setExpandedReport(expandedReport === report.id ? null : report.id)
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{report.clientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(report.periodStart).toLocaleDateString()} -{' '}
                          {new Date(report.periodEnd).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Quick Metrics */}
                      <div className="hidden sm:flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Meetings</p>
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-bold">{report.metrics.meetingsBooked}</p>
                            {getTrendIndicator(report.vsLastWeek.meetings)}
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Open Rate</p>
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-bold">{report.metrics.openRate}%</p>
                            {getTrendIndicator(report.vsLastWeek.openRate)}
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Reply Rate</p>
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-bold">{report.metrics.replyRate}%</p>
                            {getTrendIndicator(report.vsLastWeek.replyRate)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={regeneratingClient === report.clientId}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRegenerateReport(report.clientId)
                          }}
                        >
                          {regeneratingClient === report.clientId ? (
                            <Loader2 className="w-3 h-3 animate-spin mr-1" />
                          ) : (
                            <RefreshCw className="w-3 h-3 mr-1" />
                          )}
                          Regenerate
                        </Button>
                        {expandedReport === report.id ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedReport === report.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border p-4 space-y-4">
                        {/* Full Metrics */}
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                          <div className="bg-muted/30 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground">Meetings Booked</p>
                            <div className="flex items-center gap-2">
                              <p className="text-lg font-bold">{report.metrics.meetingsBooked}</p>
                              {getTrendIndicator(report.vsLastWeek.meetings)}
                            </div>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground">Emails Sent</p>
                            <p className="text-lg font-bold">{report.metrics.emailsSent.toLocaleString()}</p>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground">Open Rate</p>
                            <div className="flex items-center gap-2">
                              <p className="text-lg font-bold">{report.metrics.openRate}%</p>
                              {getTrendIndicator(report.vsLastWeek.openRate)}
                            </div>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground">Reply Rate</p>
                            <div className="flex items-center gap-2">
                              <p className="text-lg font-bold">{report.metrics.replyRate}%</p>
                              {getTrendIndicator(report.vsLastWeek.replyRate)}
                            </div>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground">Positive Replies</p>
                            <p className="text-lg font-bold">{report.metrics.positiveReplies}</p>
                          </div>
                        </div>

                        {/* AI Summary */}
                        {report.aiSummary && (
                          <div className="bg-muted/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <BarChart3 className="w-4 h-4 text-primary" />
                              <p className="text-sm font-medium">AI Summary</p>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {report.aiSummary}
                            </p>
                          </div>
                        )}

                        {/* Key Wins and Recommendations */}
                        <div className="grid lg:grid-cols-2 gap-4">
                          {report.keyWins.length > 0 && (
                            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Star className="w-4 h-4 text-emerald-500" />
                                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Key Wins</p>
                              </div>
                              <ul className="space-y-2">
                                {report.keyWins.map((win, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                    {win}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {report.recommendations.length > 0 && (
                            <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="w-4 h-4 text-blue-500" />
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Recommendations</p>
                              </div>
                              <ul className="space-y-2">
                                {report.recommendations.map((rec, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2">
                          <p className="text-xs text-muted-foreground">
                            Generated {new Date(report.generatedAt).toLocaleString()}
                          </p>
                          {report.pdfUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={report.pdfUrl} target="_blank" rel="noopener noreferrer">
                                <FileText className="w-3 h-3 mr-1" />
                                Download PDF
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card variant="elevated" className="p-8 text-center">
            <p className="text-muted-foreground">No reports found matching your criteria.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
