'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, DollarSign, Cog, Calendar, AlertTriangle, Loader2, ArrowRight, Inbox, ShieldAlert, Rocket, FileText, TrendingDown, Clock, XCircle } from 'lucide-react'
import Link from 'next/link'
import { AdminStatsCard } from '@/components/admin/admin-stats-card'
import { EngineRunStatusBadge } from '@/components/admin/status-badge'
import { HealthScore, HealthBreakdown } from '@/components/admin/health-score'
import { NoAtRiskClients, InlineEmptyState } from '@/components/admin/empty-state'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HEALTH_THRESHOLDS, formatMrr } from '@/lib/constants/admin'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'
import { getClients, type ClientRecord } from '@/lib/supabase/client-actions'
import { getAdminMetrics, getEngineRuns, getAdminActivity, getAdminCsmMetrics } from '@/lib/supabase/admin-actions'
import type { AdminMetrics, EngineRun, AdminActivity, AdminCsmMetrics } from '@/lib/types/admin'

export default function AdminDashboardPage() {
  const [clients, setClients] = useState<ClientRecord[]>([])
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null)
  const [engineRuns, setEngineRuns] = useState<EngineRun[]>([])
  const [activity, setActivity] = useState<AdminActivity[]>([])
  const [csmMetrics, setCsmMetrics] = useState<AdminCsmMetrics | null>(null)
  const [statsLoaded, setStatsLoaded] = useState(false)

  useEffect(() => {
    async function loadData() {
      const [clientsResult, metricsResult, runsResult, activityResult, csmResult] = await Promise.all([
        getClients(),
        getAdminMetrics(),
        getEngineRuns({ limit: 5 }),
        getAdminActivity({ limit: 5 }),
        getAdminCsmMetrics(),
      ])
      if (clientsResult.data) setClients(clientsResult.data)
      if (metricsResult.data) setMetrics(metricsResult.data)
      setEngineRuns(runsResult.data)
      setActivity(activityResult.data)
      if (csmResult.data) setCsmMetrics(csmResult.data)
      setStatsLoaded(true)
    }
    loadData()
  }, [])

  const activeClients = clients.filter((c) => c.status === 'active')
  const atRiskClients = clients.filter(
    (c) => c.health_score < HEALTH_THRESHOLDS.HEALTHY && c.status === 'active'
  )
  const totalMrr = clients.reduce((sum, c) => sum + (Number(c.mrr) || 0), 0)
  const recentRuns = engineRuns
  const recentActivity = activity

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={defaultTransition}
      >
        <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your Wryko platform</p>
        <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full mt-3" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatsCard
          label="Active Clients"
          value={statsLoaded ? activeClients.length : '...'}
          icon={Users}
          variant="primary"
          index={0}
        />
        <AdminStatsCard
          label="Monthly MRR"
          value={statsLoaded ? formatMrr(totalMrr) : '...'}
          icon={DollarSign}
          variant="blue"
          index={1}
        />
        <AdminStatsCard
          label="Engines Running"
          value={statsLoaded && metrics ? metrics.enginesRunning : '...'}
          icon={Cog}
          variant="violet"
          index={2}
        />
        <AdminStatsCard
          label="Meetings This Week"
          value={statsLoaded && metrics ? metrics.meetingsThisWeek : '...'}
          icon={Calendar}
          variant="amber"
          index={3}
        />
      </div>

      {/* CSM Summary */}
      {csmMetrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/requests" className="block">
            <motion.div className="p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-all" whileHover={{ y: -2 }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Inbox className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{csmMetrics.pendingRequests}</p>
                  <p className="text-xs text-muted-foreground">Pending Requests</p>
                </div>
              </div>
            </motion.div>
          </Link>
          <Link href="/admin/issues" className="block">
            <motion.div className="p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-all" whileHover={{ y: -2 }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{csmMetrics.activeIssues}</p>
                  <p className="text-xs text-muted-foreground">Active Issues</p>
                </div>
              </div>
            </motion.div>
          </Link>
          <Link href="/admin/onboarding" className="block">
            <motion.div className="p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-all" whileHover={{ y: -2 }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{csmMetrics.onboardingClients}</p>
                  <p className="text-xs text-muted-foreground">Onboarding</p>
                </div>
              </div>
            </motion.div>
          </Link>
          <Link href="/admin/reports" className="block">
            <motion.div className="p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-all" whileHover={{ y: -2 }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{csmMetrics.reportsThisWeek}</p>
                  <p className="text-xs text-muted-foreground">Reports This Week</p>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      )}

      {/* Proactive Alerts */}
      {csmMetrics && (csmMetrics.decliningClients > 0 || csmMetrics.criticalIssues > 0 || csmMetrics.pendingRequests > 0) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card variant="elevated">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                Proactive Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {csmMetrics.decliningClients > 0 && (
                  <Link href="/admin/health" className="flex items-center gap-3 p-3 bg-warning/5 border border-warning/20 rounded-lg hover:bg-warning/10 transition-colors">
                    <TrendingDown className="w-4 h-4 text-warning flex-shrink-0" />
                    <span className="text-sm"><strong>{csmMetrics.decliningClients}</strong> client(s) with declining health scores</span>
                  </Link>
                )}
                {csmMetrics.criticalIssues > 0 && (
                  <Link href="/admin/issues" className="flex items-center gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg hover:bg-destructive/10 transition-colors">
                    <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <span className="text-sm"><strong>{csmMetrics.criticalIssues}</strong> critical issue(s) need attention</span>
                  </Link>
                )}
                {csmMetrics.pendingRequests > 0 && (
                  <Link href="/admin/requests" className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm"><strong>{csmMetrics.pendingRequests}</strong> pending client request(s)</span>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Engine Runs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getStaggerDelay(0, 0.3)}
          >
            <Card variant="elevated" aria-labelledby="engine-runs-heading">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle id="engine-runs-heading">Recent Engine Runs</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/workflows" className="group">
                    View all
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {recentRuns.length > 0 ? (
                  <div className="space-y-3">
                    {recentRuns.map((run, index) => (
                      <motion.div
                        key={run.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={getStaggerDelay(index, 0.4)}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center" aria-hidden="true">
                            {run.status === 'running' ? (
                              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                            ) : (
                              <Cog className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{run.engineName}</p>
                            <p className="text-xs text-muted-foreground">
                              {run.clientName || 'System-wide'}
                            </p>
                          </div>
                        </div>
                        <EngineRunStatusBadge status={run.status} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <InlineEmptyState message="No recent engine runs." />
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getStaggerDelay(1, 0.3)}
          >
            <Card variant="elevated" aria-labelledby="activity-heading">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle id="activity-heading">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/activity" className="group">
                    View all
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={getStaggerDelay(index, 0.5)}
                        className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-muted ring-2 ring-primary/5 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                          <span className="text-xs font-medium text-muted-foreground">
                            {activity.adminName.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-medium">{activity.adminName}</span>{' '}
                            <span className="text-muted-foreground">{activity.action}</span>{' '}
                            {activity.resourceName && (
                              <span className="font-medium">{activity.resourceName}</span>
                            )}
                          </p>
                          {activity.details && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {activity.details}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <InlineEmptyState message="No recent activity." />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Client Health Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getStaggerDelay(2, 0.3)}
          >
            <Card variant="elevated" aria-labelledby="health-heading">
              <CardHeader className="pb-4">
                <CardTitle id="health-heading">Client Health</CardTitle>
              </CardHeader>
              <CardContent>
                <HealthBreakdown clients={clients.map(c => ({
                    ...c,
                    companyName: c.company_name,
                    contactName: c.contact_name,
                    contactEmail: c.contact_email,
                    healthScore: c.health_score,
                    createdAt: c.created_at,
                  }))} />
              </CardContent>
            </Card>
          </motion.div>

          {/* At-Risk Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getStaggerDelay(3, 0.3)}
          >
            <Card variant="elevated" aria-labelledby="at-risk-heading">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning" aria-hidden="true" />
                  <CardTitle id="at-risk-heading">At-Risk Clients</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {atRiskClients.length > 0 ? (
                  <div className="space-y-3">
                    {atRiskClients.map((client) => (
                      <motion.div
                        key={client.id}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="block p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{client.company_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {client.contact_name}
                              </p>
                            </div>
                            <HealthScore score={client.health_score} size="sm" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <NoAtRiskClients />
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getStaggerDelay(4, 0.3)}
          >
            <Card variant="elevated" aria-labelledby="actions-heading">
              <CardHeader className="pb-4">
                <CardTitle id="actions-heading">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="elevated" className="w-full" asChild>
                    <Link href="/admin/clients/new">
                      Add New Client
                    </Link>
                  </Button>
                  <Button variant="outline-primary" className="w-full" asChild>
                    <Link href="/admin/workflows">
                      View All Engines
                    </Link>
                  </Button>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href="/admin/clients">
                      Manage Clients
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
