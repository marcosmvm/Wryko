'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HeartPulse,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Loader2,
  Activity,
  BarChart3,
} from 'lucide-react'
import { AdminStatsCard } from '@/components/admin/admin-stats-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'
import { getAllHealthScores } from '@/lib/supabase/admin-actions'
import { adminCsmWorkflows } from '@/lib/n8n/client'
import type { AdminHealthOverview } from '@/lib/types/admin'

type StatusFilter = 'all' | 'healthy' | 'warning' | 'critical'
type TrendFilter = 'all' | 'improving' | 'stable' | 'declining'

export default function HealthCommandCenterPage() {
  const [healthScores, setHealthScores] = useState<AdminHealthOverview[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [trendFilter, setTrendFilter] = useState<TrendFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [runningChurn, setRunningChurn] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      const result = await getAllHealthScores()
      if (result.data) setHealthScores(result.data)
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

  const totalClients = healthScores.length
  const healthyCount = healthScores.filter((h) => h.status === 'healthy').length
  const atRiskCount = healthScores.filter((h) => h.status === 'warning').length
  const criticalCount = healthScores.filter((h) => h.status === 'critical').length
  const avgScore =
    totalClients > 0
      ? Math.round(healthScores.reduce((sum, h) => sum + h.overall, 0) / totalClients)
      : 0

  const filteredScores = healthScores.filter((h) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!h.clientName.toLowerCase().includes(query)) return false
    }
    if (statusFilter !== 'all' && h.status !== statusFilter) return false
    if (trendFilter !== 'all' && h.trend !== trendFilter) return false
    return true
  })

  const getStatusBadge = (status: AdminHealthOverview['status']) => {
    switch (status) {
      case 'healthy':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
            <ShieldCheck className="w-3 h-3" />
            Healthy
          </span>
        )
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 font-medium">
            <AlertTriangle className="w-3 h-3" />
            At Risk
          </span>
        )
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 font-medium">
            <AlertOctagon className="w-3 h-3" />
            Critical
          </span>
        )
    }
  }

  const getTrendIcon = (trend: AdminHealthOverview['trend']) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />
      case 'stable':
        return <Minus className="w-4 h-4 text-muted-foreground" />
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-500" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500'
    if (score >= 60) return 'text-amber-500'
    return 'text-red-500'
  }

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500'
    if (score >= 60) return 'bg-amber-500'
    return 'bg-red-500'
  }

  async function handleRunChurnAnalysis(clientId: string) {
    setRunningChurn(clientId)
    try {
      await adminCsmWorkflows.runChurnAnalysis(clientId)
    } finally {
      setRunningChurn(null)
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
        <h1 className="text-2xl font-heading font-bold">Health Command Center</h1>
        <p className="text-muted-foreground">
          Engine M (The Monitor) + Engine J (The Judge) -- Client health tracking and churn prevention
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full mt-3" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <AdminStatsCard
          label="Total Clients"
          value={totalClients}
          icon={HeartPulse}
          variant="primary"
          index={0}
        />
        <AdminStatsCard
          label="Healthy"
          value={healthyCount}
          icon={ShieldCheck}
          variant="blue"
          index={1}
        />
        <AdminStatsCard
          label="At Risk"
          value={atRiskCount}
          icon={AlertTriangle}
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
        <AdminStatsCard
          label="Avg Health Score"
          value={avgScore}
          icon={BarChart3}
          variant="indigo"
          index={4}
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
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="healthy">Healthy</option>
            <option value="warning">At Risk</option>
            <option value="critical">Critical</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={trendFilter}
            onChange={(e) => setTrendFilter(e.target.value as TrendFilter)}
            className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          >
            <option value="all">All Trends</option>
            <option value="improving">Improving</option>
            <option value="stable">Stable</option>
            <option value="declining">Declining</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </motion.div>

      {/* Health Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getStaggerDelay(2, 0.3)}
      >
        <Card variant="elevated">
          <CardContent className="p-0">
            {filteredScores.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Health Score</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Trend</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk Signals</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Updated</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredScores.map((score, index) => (
                      <motion.tbody
                        key={score.clientId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={getStaggerDelay(index, 0.4)}
                      >
                        <tr
                          className="hover:bg-muted/30 transition-colors cursor-pointer"
                          onClick={() =>
                            setExpandedRow(
                              expandedRow === score.clientId ? null : score.clientId
                            )
                          }
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              {expandedRow === score.clientId ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              )}
                              <span className="font-medium text-sm">{score.clientName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <span className={`text-sm font-bold ${getScoreColor(score.overall)}`}>
                                {score.overall}
                              </span>
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${getScoreBarColor(score.overall)}`}
                                  style={{ width: `${score.overall}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5">
                              {getTrendIcon(score.trend)}
                              <span className="text-xs text-muted-foreground capitalize">{score.trend}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">{getStatusBadge(score.status)}</td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-muted-foreground">
                              {score.riskSignals.length} signal{score.riskSignals.length !== 1 ? 's' : ''}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-xs text-muted-foreground">
                              {new Date(score.lastUpdatedAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={runningChurn === score.clientId}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRunChurnAnalysis(score.clientId)
                              }}
                            >
                              {runningChurn === score.clientId ? (
                                <Loader2 className="w-3 h-3 animate-spin mr-1" />
                              ) : (
                                <Activity className="w-3 h-3 mr-1" />
                              )}
                              Run Churn Analysis
                            </Button>
                          </td>
                        </tr>
                        {/* Expanded Row - Risk Signals */}
                        <AnimatePresence>
                          {expandedRow === score.clientId && (
                            <tr>
                              <td colSpan={7} className="px-4 py-0">
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="py-4 pl-8 space-y-4">
                                    {/* Sub-scores */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                      <div className="bg-muted/30 rounded-lg p-3">
                                        <p className="text-xs text-muted-foreground">Domain Health</p>
                                        <p className={`text-lg font-bold ${getScoreColor(score.domainHealth)}`}>{score.domainHealth}</p>
                                      </div>
                                      <div className="bg-muted/30 rounded-lg p-3">
                                        <p className="text-xs text-muted-foreground">Reply Quality</p>
                                        <p className={`text-lg font-bold ${getScoreColor(score.replyQuality)}`}>{score.replyQuality}</p>
                                      </div>
                                      <div className="bg-muted/30 rounded-lg p-3">
                                        <p className="text-xs text-muted-foreground">Engagement</p>
                                        <p className={`text-lg font-bold ${getScoreColor(score.engagementLevel)}`}>{score.engagementLevel}</p>
                                      </div>
                                      <div className="bg-muted/30 rounded-lg p-3">
                                        <p className="text-xs text-muted-foreground">Meeting Conv.</p>
                                        <p className={`text-lg font-bold ${getScoreColor(score.meetingConversion)}`}>{score.meetingConversion}</p>
                                      </div>
                                    </div>
                                    {/* Risk Signals */}
                                    {score.riskSignals.length > 0 ? (
                                      <div className="space-y-2">
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk Signals</p>
                                        {score.riskSignals.map((signal, idx) => (
                                          <div
                                            key={idx}
                                            className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg"
                                          >
                                            <span
                                              className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium ${
                                                signal.severity === 'high'
                                                  ? 'bg-red-500/10 text-red-500'
                                                  : signal.severity === 'medium'
                                                  ? 'bg-amber-500/10 text-amber-500'
                                                  : 'bg-blue-500/10 text-blue-500'
                                              }`}
                                            >
                                              {signal.severity}
                                            </span>
                                            <div>
                                              <p className="text-sm font-medium">{signal.signal}</p>
                                              <p className="text-xs text-muted-foreground">{signal.description}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground">No risk signals detected.</p>
                                    )}
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </motion.tbody>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No health scores found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
