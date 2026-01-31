'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { engineDetails } from '@/lib/data/engine-details'
import { mockEngineRuns } from '@/lib/data/admin-mock'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconWrapper } from '@/components/ui/icon-wrapper'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'

type SuiteFilter = 'all' | 'lead-gen' | 'csm'

export default function WorkflowsPage() {
  const [suiteFilter, setSuiteFilter] = useState<SuiteFilter>('all')

  const allEngines = Object.values(engineDetails)
  const filteredEngines =
    suiteFilter === 'all'
      ? allEngines
      : allEngines.filter((e) => e.suite === suiteFilter)

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
        return <Loader2 className="w-4 h-4 text-info animate-spin" />
      case 'healthy':
        return <CheckCircle2 className="w-4 h-4 text-success" />
      case 'error':
        return <XCircle className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-info/10 text-info'
      case 'healthy':
        return 'bg-success/10 text-success'
      case 'error':
        return 'bg-destructive/10 text-destructive'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const runningCount = allEngines.filter((e) => getEngineStatus(e.slug).status === 'running').length
  const healthyCount = allEngines.filter((e) => getEngineStatus(e.slug).status === 'healthy').length
  const errorCount = allEngines.filter((e) => getEngineStatus(e.slug).status === 'error').length
  const leadGenCount = allEngines.filter((e) => e.suite === 'lead-gen').length
  const csmCount = allEngines.filter((e) => e.suite === 'csm').length

  const statusCards = [
    { label: 'Total Engines', value: allEngines.length, gradient: 'from-primary to-primary/50' },
    { label: 'Running', value: runningCount, icon: <Loader2 className="w-4 h-4 text-info animate-spin" />, gradient: 'from-info to-info/50', color: 'text-info' },
    { label: 'Healthy', value: healthyCount, icon: <CheckCircle2 className="w-4 h-4 text-success" />, gradient: 'from-success to-success/50', color: 'text-success' },
    { label: 'Errors', value: errorCount, icon: <XCircle className="w-4 h-4 text-destructive" />, gradient: 'from-destructive to-destructive/50', color: 'text-destructive' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={defaultTransition}
      >
        <h1 className="text-2xl font-heading font-bold">AI Engines</h1>
        <p className="text-muted-foreground">
          Monitor and manage the 11 XGrowthOS automation engines
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full mt-3" />
      </motion.div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getStaggerDelay(index)}
          >
            <Card variant="interactive" className="overflow-hidden">
              <div className={`h-1 w-full bg-gradient-to-r ${card.gradient}`} />
              <div className="p-4">
                <div className="flex items-center gap-2">
                  {card.icon}
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                </div>
                <p className={`text-2xl font-heading font-bold ${card.color || ''}`}>{card.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getStaggerDelay(0, 0.3)}
        className="flex items-center gap-2"
        role="group"
        aria-label="Filter engines by suite"
      >
        <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
          {[
            { value: 'all' as SuiteFilter, label: 'All Engines' },
            { value: 'lead-gen' as SuiteFilter, label: `Lead Generation (${leadGenCount})` },
            { value: 'csm' as SuiteFilter, label: `CSM Suite (${csmCount})` },
          ].map((filter) => (
            <Button
              key={filter.value}
              variant={suiteFilter === filter.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSuiteFilter(filter.value)}
              aria-pressed={suiteFilter === filter.value}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Engines Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEngines.map((engine, index) => {
          const engineStatus = getEngineStatus(engine.slug)
          const Icon = engine.icon

          return (
            <motion.div
              key={engine.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={getStaggerDelay(index, 0.3)}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link href={`/admin/workflows/${engine.slug}`}>
                <Card variant="interactive" className="p-6 glow-border-hover h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <IconWrapper icon={Icon} size="md" variant="primary" />
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
                      className={`text-xs px-2 py-0.5 rounded ring-1 ${
                        engine.suite === 'lead-gen'
                          ? 'bg-info/10 text-info ring-info/20'
                          : 'bg-metric-violet/10 text-metric-violet ring-metric-violet/20'
                      }`}
                    >
                      {engine.suite === 'lead-gen' ? 'Lead Generation' : 'CSM Suite'}
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
