'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  Shield,
  Search,
  ChevronDown,
  Loader2,
  ScanSearch,
  Wrench,
  Zap,
  Globe,
} from 'lucide-react'
import { AdminStatsCard } from '@/components/admin/admin-stats-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'
import { getAllIssues } from '@/lib/supabase/admin-actions'
import { adminCsmWorkflows } from '@/lib/n8n/client'
import type { AdminIssue } from '@/lib/types/admin'

type SeverityFilter = 'all' | AdminIssue['severity']
type ResolvedFilter = 'all' | 'active' | 'resolved'

export default function IssuesResolutionPage() {
  const [issues, setIssues] = useState<AdminIssue[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all')
  const [resolvedFilter, setResolvedFilter] = useState<ResolvedFilter>('active')
  const [resolvingId, setResolvingId] = useState<string | null>(null)
  const [runningIssueScan, setRunningIssueScan] = useState(false)

  useEffect(() => {
    async function loadData() {
      const result = await getAllIssues()
      if (result.data) setIssues(result.data)
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

  const activeIssues = issues.filter((i) => !i.resolvedAt)
  const resolvedIssues = issues.filter((i) => i.resolvedAt)
  const autoResolved = issues.filter((i) => i.autoFixed).length
  const manualNeeded = activeIssues.filter((i) => !i.autoFixed).length
  const criticalCount = activeIssues.filter((i) => i.severity === 'critical').length

  const filteredIssues = issues.filter((i) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        i.clientName.toLowerCase().includes(query) ||
        i.message.toLowerCase().includes(query) ||
        i.type.toLowerCase().includes(query) ||
        (i.domain && i.domain.toLowerCase().includes(query))
      if (!matchesSearch) return false
    }
    if (severityFilter !== 'all' && i.severity !== severityFilter) return false
    if (resolvedFilter === 'active' && i.resolvedAt) return false
    if (resolvedFilter === 'resolved' && !i.resolvedAt) return false
    return true
  })

  const getSeverityBadge = (severity: AdminIssue['severity']) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 font-medium">
            <AlertOctagon className="w-3 h-3" />
            Critical
          </span>
        )
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 font-medium">
            <AlertTriangle className="w-3 h-3" />
            Warning
          </span>
        )
      case 'info':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 font-medium">
            <Info className="w-3 h-3" />
            Info
          </span>
        )
    }
  }

  async function handleResolveIssue(issueId: string) {
    setResolvingId(issueId)
    try {
      const result = await adminCsmWorkflows.resolveIssue(issueId)
      if (result.success) {
        setIssues((prev) =>
          prev.map((i) =>
            i.id === issueId
              ? { ...i, resolvedAt: new Date().toISOString() }
              : i
          )
        )
      }
    } finally {
      setResolvingId(null)
    }
  }

  async function handleRunIssueScan() {
    setRunningIssueScan(true)
    try {
      await adminCsmWorkflows.runIssueScan('all')
      // Reload issues after scan
      const result = await getAllIssues()
      if (result.data) setIssues(result.data)
    } finally {
      setRunningIssueScan(false)
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
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold">Issues & Resolution</h1>
            <p className="text-muted-foreground">
              Engine J (The Judge) -- Detect, triage, and resolve domain and delivery issues
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full mt-3" />
          </div>
          <Button
            variant="outline"
            disabled={runningIssueScan}
            onClick={handleRunIssueScan}
          >
            {runningIssueScan ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <ScanSearch className="w-4 h-4 mr-2" />
            )}
            Run Issue Scan
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatsCard
          label="Active Issues"
          value={activeIssues.length}
          icon={AlertTriangle}
          variant="primary"
          index={0}
        />
        <AdminStatsCard
          label="Auto-Resolved"
          value={autoResolved}
          icon={Zap}
          variant="blue"
          index={1}
        />
        <AdminStatsCard
          label="Manual Needed"
          value={manualNeeded}
          icon={Wrench}
          variant="amber"
          index={2}
        />
        <AdminStatsCard
          label="Critical"
          value={criticalCount}
          icon={AlertOctagon}
          variant="violet"
          index={3}
        />
      </div>

      {/* Filters */}
      <motion.div
        {...fadeInUp}
        transition={getStaggerDelay(1)}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search issues by client, domain, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as SeverityFilter)}
            className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={resolvedFilter}
            onChange={(e) => setResolvedFilter(e.target.value as ResolvedFilter)}
            className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          >
            <option value="all">All Issues</option>
            <option value="active">Active Only</option>
            <option value="resolved">Resolved Only</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </motion.div>

      {/* Issues Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getStaggerDelay(2, 0.3)}
      >
        <Card variant="elevated">
          <CardContent className="p-0">
            {filteredIssues.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Severity</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Domain</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Detected</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Auto-Fixed</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredIssues.map((issue, index) => (
                      <motion.tr
                        key={issue.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={getStaggerDelay(index, 0.4)}
                        className={`hover:bg-muted/30 transition-colors ${
                          issue.resolvedAt ? 'opacity-60' : ''
                        }`}
                      >
                        <td className="px-4 py-4">
                          <span className="font-medium text-sm">{issue.clientName}</span>
                        </td>
                        <td className="px-4 py-4">{getSeverityBadge(issue.severity)}</td>
                        <td className="px-4 py-4">
                          {issue.domain ? (
                            <div className="flex items-center gap-1.5">
                              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{issue.domain}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">--</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-muted-foreground capitalize">
                            {issue.type.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm max-w-xs truncate" title={issue.message}>
                            {issue.message}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs text-muted-foreground">
                            {new Date(issue.detectedAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {issue.autoFixed ? (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-500">
                              <Zap className="w-3 h-3" />
                              Auto
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">Manual</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right">
                          {!issue.resolvedAt ? (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={resolvingId === issue.id}
                              onClick={() => handleResolveIssue(issue.id)}
                            >
                              {resolvingId === issue.id ? (
                                <Loader2 className="w-3 h-3 animate-spin mr-1" />
                              ) : (
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                              )}
                              Mark Resolved
                            </Button>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-500">
                              <Shield className="w-3 h-3" />
                              Resolved
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Shield className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  {searchQuery || severityFilter !== 'all' || resolvedFilter !== 'all'
                    ? 'No issues found matching your filters.'
                    : 'No issues detected. All systems healthy!'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
