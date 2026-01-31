'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface EngineMetric {
  label: string
  healthy?: string
  warning?: string
  critical?: string
  pass?: string
  fail?: string
}

interface EngineThreshold {
  category: string
  metrics: EngineMetric[]
}

interface EngineMetricsGridProps {
  thresholds: EngineThreshold[]
  className?: string
}

export function EngineMetricsGrid({ thresholds, className }: EngineMetricsGridProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {thresholds.map((threshold, thresholdIndex) => (
        <motion.div
          key={threshold.category}
          className="bg-card border border-border rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: thresholdIndex * 0.1, duration: 0.5 }}
        >
          {/* Gradient top accent */}
          <div className="h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary" />

          {/* Category header */}
          <div className="bg-muted/50 px-6 py-4 border-b border-border">
            <h4 className="font-heading font-semibold">{threshold.category}</h4>
          </div>

          {/* Metrics table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
                    Metric
                  </th>
                  {threshold.metrics[0]?.healthy !== undefined && (
                    <th className="text-center px-4 py-3 text-sm font-medium text-green-500">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Healthy
                      </span>
                    </th>
                  )}
                  {threshold.metrics[0]?.pass !== undefined && (
                    <th className="text-center px-4 py-3 text-sm font-medium text-green-500">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Pass
                      </span>
                    </th>
                  )}
                  {threshold.metrics[0]?.warning !== undefined && (
                    <th className="text-center px-4 py-3 text-sm font-medium text-yellow-500">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-yellow-500" />
                        Warning
                      </span>
                    </th>
                  )}
                  {threshold.metrics[0]?.critical !== undefined && (
                    <th className="text-center px-4 py-3 text-sm font-medium text-red-500">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        Critical
                      </span>
                    </th>
                  )}
                  {threshold.metrics[0]?.fail !== undefined && (
                    <th className="text-center px-4 py-3 text-sm font-medium text-red-500">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        Fail
                      </span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {threshold.metrics.map((metric, metricIndex) => (
                  <motion.tr
                    key={metric.label}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: thresholdIndex * 0.1 + metricIndex * 0.05, duration: 0.3 }}
                  >
                    <td className="px-6 py-4 text-sm font-medium">{metric.label}</td>
                    {metric.healthy !== undefined && (
                      <td className="text-center px-4 py-4">
                        <span className="inline-block text-sm font-medium text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                          {metric.healthy}
                        </span>
                      </td>
                    )}
                    {metric.pass !== undefined && (
                      <td className="text-center px-4 py-4">
                        <span className="inline-block text-sm font-medium text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                          {metric.pass}
                        </span>
                      </td>
                    )}
                    {metric.warning !== undefined && (
                      <td className="text-center px-4 py-4">
                        <span className="inline-block text-sm font-medium text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full">
                          {metric.warning || '—'}
                        </span>
                      </td>
                    )}
                    {metric.critical !== undefined && (
                      <td className="text-center px-4 py-4">
                        <span className="inline-block text-sm font-medium text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
                          {metric.critical || '—'}
                        </span>
                      </td>
                    )}
                    {metric.fail !== undefined && (
                      <td className="text-center px-4 py-4">
                        <span className="inline-block text-sm font-medium text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
                          {metric.fail}
                        </span>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
