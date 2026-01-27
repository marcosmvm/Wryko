'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Loader2, CheckCircle2, XCircle, Clock, Filter } from 'lucide-react'
import { engineDetails, getEnginesBySuite } from '@/lib/data/engine-details'
import { mockEngineRuns, getEngineRunStatusColor } from '@/lib/data/admin-mock'

type SuiteFilter = 'all' | 'lead-gen' | 'csm'

export default function WorkflowsPage() {
  const [suiteFilter, setSuiteFilter] = useState<SuiteFilter>('all')

  const allEngines = Object.values(engineDetails)
  const filteredEngines =
    suiteFilter === 'all'
      ? allEngines
      : allEngines.filter((e) => e.suite === suiteFilter)

  // Get engine status from recent runs
  const getEngineStatus = (slug: string) => {
    const runs = mockEngineRuns.filter((r) => r.engineSlug === slug)
    if (runs.length === 0) return { status: 'idle', lastRun: null, runsToday: 0 }

    const latestRun = runs[0]
    const today = new Date().toDateString()
    const runsToday = runs.filter(
      (r) => new Date(r.startedAt).toDateString() === today
    ).length

    return {
      status: latestRun.status === 'running' ? 'running' : latestRun.status === 'failed' ? 'error' : 'healthy',
      lastRun: latestRun.startedAt,
      runsToday,
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case 'healthy':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500/10 text-blue-500'
      case 'healthy':
        return 'bg-green-500/10 text-green-500'
      case 'error':
        return 'bg-red-500/10 text-red-500'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  // Count engines by status
  const runningCount = allEngines.filter((e) => getEngineStatus(e.slug).status === 'running').length
  const healthyCount = allEngines.filter((e) => getEngineStatus(e.slug).status === 'healthy').length
  const errorCount = allEngines.filter((e) => getEngineStatus(e.slug).status === 'error').length

  // Count engines by suite (dynamic)
  const leadGenCount = allEngines.filter((e) => e.suite === 'lead-gen').length
  const csmCount = allEngines.filter((e) => e.suite === 'csm').length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">AI Engines</h1>
        <p className="text-muted-foreground">
          Monitor and manage the 11 XGrowthOS automation engines
        </p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Engines</p>
          <p className="text-2xl font-bold">{allEngines.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
            <p className="text-sm text-muted-foreground">Running</p>
          </div>
          <p className="text-2xl font-bold text-blue-500">{runningCount}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <p className="text-sm text-muted-foreground">Healthy</p>
          </div>
          <p className="text-2xl font-bold text-green-500">{healthyCount}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-muted-foreground">Errors</p>
          </div>
          <p className="text-2xl font-bold text-red-500">{errorCount}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2" role="group" aria-label="Filter engines by suite">
        <Filter className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
        <div className="flex gap-2">
          <button
            onClick={() => setSuiteFilter('all')}
            aria-pressed={suiteFilter === 'all'}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              suiteFilter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            All Engines
          </button>
          <button
            onClick={() => setSuiteFilter('lead-gen')}
            aria-pressed={suiteFilter === 'lead-gen'}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              suiteFilter === 'lead-gen'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Lead Generation ({leadGenCount})
          </button>
          <button
            onClick={() => setSuiteFilter('csm')}
            aria-pressed={suiteFilter === 'csm'}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              suiteFilter === 'csm'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            CSM Suite ({csmCount})
          </button>
        </div>
      </div>

      {/* Engines Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEngines.map((engine) => {
          const engineStatus = getEngineStatus(engine.slug)
          const Icon = engine.icon

          return (
            <Link
              key={engine.slug}
              href={`/admin/workflows/${engine.slug}`}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{engine.name}</h3>
                    <span className="text-xs text-muted-foreground uppercase">
                      Engine {engine.letter}
                    </span>
                  </div>
                </div>
                {getStatusIcon(engineStatus.status)}
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {engine.tagline}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(engineStatus.status)}`}
                  >
                    {engineStatus.status === 'idle' ? 'No runs' : engineStatus.status}
                  </span>
                </div>
                <div className="text-right">
                  {engineStatus.lastRun ? (
                    <p className="text-xs text-muted-foreground">
                      Last run:{' '}
                      {new Date(engineStatus.lastRun).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Never run</p>
                  )}
                  {engineStatus.runsToday > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {engineStatus.runsToday} runs today
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    engine.suite === 'lead-gen'
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'bg-purple-500/10 text-purple-500'
                  }`}
                >
                  {engine.suite === 'lead-gen' ? 'Lead Generation' : 'CSM Suite'}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
