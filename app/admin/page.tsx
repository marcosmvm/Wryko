'use client'

import { Users, DollarSign, Cog, Calendar, AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { AdminStatsCard } from '@/components/admin/admin-stats-card'
import { EngineRunStatusBadge } from '@/components/admin/status-badge'
import { HealthScore, HealthBreakdown } from '@/components/admin/health-score'
import { NoAtRiskClients, InlineEmptyState } from '@/components/admin/empty-state'
import {
  mockAdminMetrics,
  mockClients,
  mockEngineRuns,
  mockAdminActivity,
  formatMrr,
} from '@/lib/data/admin-mock'
import { HEALTH_THRESHOLDS } from '@/lib/constants/admin'

export default function AdminDashboardPage() {
  const activeClients = mockClients.filter((c) => c.status === 'active')
  const atRiskClients = mockClients.filter(
    (c) => c.healthScore < HEALTH_THRESHOLDS.HEALTHY && c.status === 'active'
  )
  const recentRuns = mockEngineRuns.slice(0, 5)
  const recentActivity = mockAdminActivity.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your XGrowthOS platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatsCard
          label="Active Clients"
          value={mockAdminMetrics.activeClients}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <AdminStatsCard
          label="Monthly MRR"
          value={formatMrr(mockAdminMetrics.totalMrr)}
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
        <AdminStatsCard
          label="Engines Running"
          value={mockAdminMetrics.enginesRunning}
          icon={Cog}
        />
        <AdminStatsCard
          label="Meetings This Week"
          value={mockAdminMetrics.meetingsThisWeek}
          icon={Calendar}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Engine Runs */}
          <section className="bg-card border border-border rounded-xl p-6" aria-labelledby="engine-runs-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="engine-runs-heading" className="font-semibold">Recent Engine Runs</h2>
              <Link
                href="/admin/workflows"
                className="text-sm text-primary hover:underline focus:outline-none focus-visible:underline"
              >
                View all
              </Link>
            </div>
            {recentRuns.length > 0 ? (
              <div className="space-y-3">
                {recentRuns.map((run) => (
                  <div
                    key={run.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                        {run.status === 'running' ? (
                          <Loader2 className="w-4 h-4 text-primary animate-spin" />
                        ) : (
                          <Cog className="w-4 h-4 text-primary" />
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
                  </div>
                ))}
              </div>
            ) : (
              <InlineEmptyState message="No recent engine runs." />
            )}
          </section>

          {/* Recent Activity */}
          <section className="bg-card border border-border rounded-xl p-6" aria-labelledby="activity-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="activity-heading" className="font-semibold">Recent Activity</h2>
              <Link
                href="/admin/activity"
                className="text-sm text-primary hover:underline focus:outline-none focus-visible:underline"
              >
                View all
              </Link>
            </div>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <span className="text-xs font-medium text-primary">
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
                  </div>
                ))}
              </div>
            ) : (
              <InlineEmptyState message="No recent activity." />
            )}
          </section>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Client Health Overview */}
          <section className="bg-card border border-border rounded-xl p-6" aria-labelledby="health-heading">
            <h2 id="health-heading" className="font-semibold mb-4">Client Health</h2>
            <HealthBreakdown clients={mockClients} />
          </section>

          {/* At-Risk Clients */}
          <section className="bg-card border border-border rounded-xl p-6" aria-labelledby="at-risk-heading">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-yellow-500" aria-hidden="true" />
              <h2 id="at-risk-heading" className="font-semibold">At-Risk Clients</h2>
            </div>
            {atRiskClients.length > 0 ? (
              <div className="space-y-3">
                {atRiskClients.map((client) => (
                  <Link
                    key={client.id}
                    href={`/admin/clients/${client.id}`}
                    className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{client.companyName}</p>
                        <p className="text-xs text-muted-foreground">
                          {client.contactName}
                        </p>
                      </div>
                      <HealthScore score={client.healthScore} size="sm" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <NoAtRiskClients />
            )}
          </section>

          {/* Quick Actions */}
          <section className="bg-card border border-border rounded-xl p-6" aria-labelledby="actions-heading">
            <h2 id="actions-heading" className="font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/admin/clients/new"
                className="block w-full px-4 py-2 text-sm font-medium text-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Add New Client
              </Link>
              <Link
                href="/admin/workflows"
                className="block w-full px-4 py-2 text-sm font-medium text-center bg-muted rounded-lg hover:bg-muted/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                View All Engines
              </Link>
              <Link
                href="/admin/clients"
                className="block w-full px-4 py-2 text-sm font-medium text-center bg-muted rounded-lg hover:bg-muted/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Manage Clients
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
