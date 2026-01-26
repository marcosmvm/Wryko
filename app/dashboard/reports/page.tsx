'use client'

import { motion } from 'framer-motion'
import { Download, Mail, ChevronRight } from 'lucide-react'
import { mockReports } from '@/lib/data/dashboard'

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

export default function ReportsPage() {
  const [latestReport, ...previousReports] = mockReports

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Weekly Reports</h1>
        <p className="text-muted-foreground">AI-generated performance insights delivered every week</p>
      </div>

      {/* Latest Report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded mb-2">
              Latest Report
            </span>
            <h2 className="text-xl font-semibold">
              {formatDateRange(latestReport.periodStart, latestReport.periodEnd)}
            </h2>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Executive Summary</h3>
          <p className="text-sm leading-relaxed">{latestReport.aiSummary}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Emails Sent</p>
            <p className="text-2xl font-bold">{latestReport.metrics.totalSent.toLocaleString()}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Opens</p>
            <p className="text-2xl font-bold">
              {latestReport.metrics.totalOpened.toLocaleString()}{' '}
              <span className="text-sm font-normal text-muted-foreground">
                ({latestReport.metrics.openRate}%)
              </span>
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Replies</p>
            <p className="text-2xl font-bold">
              {latestReport.metrics.totalReplied.toLocaleString()}{' '}
              <span className="text-sm font-normal text-muted-foreground">
                ({latestReport.metrics.replyRate}%)
              </span>
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Meetings Booked</p>
            <p className="text-2xl font-bold">{latestReport.metrics.meetingsBooked}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors">
            <Mail className="w-4 h-4" />
            Email Report
          </button>
        </div>
      </motion.div>

      {/* Previous Reports */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Previous Reports</h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {previousReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors border-b border-border last:border-0"
            >
              <div>
                <p className="font-medium">
                  {formatDateRange(report.periodStart, report.periodEnd)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {report.metrics.meetingsBooked} meetings · {report.metrics.replyRate}% reply rate
                </p>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
