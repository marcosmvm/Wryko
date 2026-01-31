'use client'

import { use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, CheckCircle2, XCircle, Loader2, Play, ExternalLink } from 'lucide-react'
import { getEngineBySlug } from '@/lib/data/engine-details'
import { mockEngineRuns, getEngineRunStatusColor } from '@/lib/data/admin-mock'
import { notFound } from 'next/navigation'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconWrapper } from '@/components/ui/icon-wrapper'

export default function EngineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = use(params)
  const engine = getEngineBySlug(resolvedParams.slug)

  if (!engine) {
    notFound()
  }

  const Icon = engine.icon
  const engineRuns = mockEngineRuns.filter((r) => r.engineSlug === engine.slug)

  // Calculate stats
  const completedRuns = engineRuns.filter((r) => r.status === 'completed')
  const failedRuns = engineRuns.filter((r) => r.status === 'failed')
  const successRate =
    completedRuns.length + failedRuns.length > 0
      ? Math.round(
          (completedRuns.length / (completedRuns.length + failedRuns.length)) * 100
        )
      : 100

  const avgDuration =
    completedRuns.length > 0
      ? Math.round(
          completedRuns.reduce((sum, r) => sum + (r.durationMs || 0), 0) /
            completedRuns.length /
            1000
        )
      : 0

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'queued':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const statsData = [
    {
      label: 'Total Runs',
      value: engineRuns.length,
      gradient: 'from-primary to-primary/50',
      textClass: '',
    },
    {
      label: 'Success Rate',
      value: `${successRate}%`,
      gradient: 'from-success to-success/50',
      textClass: 'text-success',
    },
    {
      label: 'Avg Duration',
      value: `${avgDuration}s`,
      gradient: 'from-info to-info/50',
      textClass: '',
    },
    {
      label: 'Failed Runs',
      value: failedRuns.length,
      gradient: 'from-destructive to-destructive/50',
      textClass: 'text-destructive',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={defaultTransition}
      >
        <Link
          href="/admin/workflows"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Engines
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        {...fadeInUp}
        transition={defaultTransition}
        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
      >
        <div className="flex items-start gap-4">
          <IconWrapper icon={Icon} size="xl" variant="primary" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-bold">{engine.name}</h1>
              <span className="text-xs px-2 py-0.5 bg-muted rounded">
                Engine {engine.letter}
              </span>
            </div>
            <p className="text-muted-foreground">{engine.tagline}</p>
            <div className="mt-1 h-0.5 w-16 bg-gradient-to-r from-primary to-primary/0 rounded-full" />
            <span
              className={`inline-block mt-2 text-xs px-2 py-0.5 rounded ${
                engine.suite === 'lead-gen'
                  ? 'bg-blue-500/10 text-blue-500'
                  : 'bg-purple-500/10 text-purple-500'
              }`}
            >
              {engine.suite === 'lead-gen' ? 'Lead Generation' : 'CSM Suite'}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="elevated">
            <Play className="w-4 h-4 mr-2" />
            Manual Run
          </Button>
          <Button variant="outline-primary" asChild>
            <Link href={`/engines/${engine.slug}`}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Public Page
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getStaggerDelay(index, 0.2)}
          >
            <Card variant="interactive" className="overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${stat.gradient}`} />
              <div className="p-4">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.textClass}`}>{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Run History */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getStaggerDelay(0, 0.4)}
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>
                <h2 className="font-heading text-lg font-semibold">Run History</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {engineRuns.length > 0 ? (
                <div className="space-y-3">
                  {engineRuns.map((run, index) => (
                    <motion.div
                      key={run.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={getStaggerDelay(index, 0.5)}
                      className="flex items-start justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/50 transition-colors cursor-default"
                    >
                      <div className="flex items-start gap-3">
                        {getStatusIcon(run.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full capitalize ${getEngineRunStatusColor(run.status)}`}
                            >
                              {run.status}
                            </span>
                            {run.clientName && (
                              <span className="text-xs text-muted-foreground">
                                {run.clientName}
                              </span>
                            )}
                          </div>
                          {run.inputSummary && (
                            <p className="text-sm mt-1">{run.inputSummary}</p>
                          )}
                          {run.outputSummary && (
                            <p className="text-sm text-green-500 mt-0.5">
                              {run.outputSummary}
                            </p>
                          )}
                          {run.errorMessage && (
                            <p className="text-sm text-red-500 mt-0.5">
                              {run.errorMessage}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <p>{new Date(run.startedAt).toLocaleString()}</p>
                        {run.durationMs && (
                          <p className="mt-1">
                            Duration: {Math.round(run.durationMs / 1000)}s
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No runs recorded for this engine yet.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Engine Details */}
        <div className="space-y-6">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getStaggerDelay(0, 0.5)}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>
                  <h2 className="font-heading text-lg font-semibold">Description</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{engine.heroDescription}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Triggers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getStaggerDelay(1, 0.5)}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>
                  <h2 className="font-heading text-lg font-semibold">Triggers</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {engine.triggers.map((trigger, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            trigger.type === 'webhook'
                              ? 'bg-blue-500/10 text-blue-500'
                              : 'bg-purple-500/10 text-purple-500'
                          }`}
                        >
                          {trigger.type}
                        </span>
                        {trigger.schedule && (
                          <span className="text-xs text-muted-foreground">
                            {trigger.schedule}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {trigger.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats from engine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getStaggerDelay(2, 0.5)}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>
                  <h2 className="font-heading text-lg font-semibold">Performance Stats</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {engine.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                      <span className="text-sm font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Related Engines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getStaggerDelay(3, 0.5)}
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>
                  <h2 className="font-heading text-lg font-semibold">Related Engines</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {engine.relatedEngines.map((slug) => {
                    const related = getEngineBySlug(slug)
                    if (!related) return null
                    return (
                      <Button key={slug} variant="secondary" size="sm" asChild>
                        <Link href={`/admin/workflows/${slug}`}>
                          {related.name}
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
