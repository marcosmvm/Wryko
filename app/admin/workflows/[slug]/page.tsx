'use client'

import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle2, XCircle, Loader2, Play, ExternalLink } from 'lucide-react'
import { getEngineBySlug } from '@/lib/data/engine-details'
import { mockEngineRuns, getEngineRunStatusColor } from '@/lib/data/admin-mock'
import { notFound } from 'next/navigation'

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

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/workflows"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Engines
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{engine.name}</h1>
              <span className="text-xs px-2 py-0.5 bg-muted rounded">
                Engine {engine.letter}
              </span>
            </div>
            <p className="text-muted-foreground">{engine.tagline}</p>
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
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Play className="w-4 h-4" />
            Manual Run
          </button>
          <Link
            href={`/engines/${engine.slug}`}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Public Page
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Runs</p>
          <p className="text-2xl font-bold">{engineRuns.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Success Rate</p>
          <p className="text-2xl font-bold text-green-500">{successRate}%</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Avg Duration</p>
          <p className="text-2xl font-bold">{avgDuration}s</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Failed Runs</p>
          <p className="text-2xl font-bold text-red-500">{failedRuns.length}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Run History */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Run History</h2>
          {engineRuns.length > 0 ? (
            <div className="space-y-3">
              {engineRuns.map((run) => (
                <div
                  key={run.id}
                  className="flex items-start justify-between p-4 bg-muted/50 rounded-lg"
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
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No runs recorded for this engine yet.
            </p>
          )}
        </div>

        {/* Engine Details */}
        <div className="space-y-6">
          {/* Description */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold mb-3">Description</h2>
            <p className="text-sm text-muted-foreground">{engine.heroDescription}</p>
          </div>

          {/* Triggers */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold mb-3">Triggers</h2>
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
          </div>

          {/* Stats from engine */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold mb-3">Performance Stats</h2>
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
          </div>

          {/* Related Engines */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold mb-3">Related Engines</h2>
            <div className="flex flex-wrap gap-2">
              {engine.relatedEngines.map((slug) => {
                const related = getEngineBySlug(slug)
                if (!related) return null
                return (
                  <Link
                    key={slug}
                    href={`/admin/workflows/${slug}`}
                    className="text-xs px-3 py-1.5 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    {related.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
