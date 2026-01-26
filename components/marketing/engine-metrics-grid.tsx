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
          {/* Category header */}
          <div className="bg-muted/50 px-6 py-3 border-b border-border">
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
                      Healthy
                    </th>
                  )}
                  {threshold.metrics[0]?.pass !== undefined && (
                    <th className="text-center px-4 py-3 text-sm font-medium text-green-500">
                      Pass
                    </th>
                  )}
                  {threshold.metrics[0]?.warning !== undefined && (
                    <th className="text-center px-4 py-3 text-sm font-medium text-yellow-500">
                      Warning
                    </th>
                  )}
                  {threshold.metrics[0]?.critical !== undefined && (
                    <th className="text-center px-4 py-3 text-sm font-medium text-red-500">
                      Critical
                    </th>
                  )}
                  {threshold.metrics[0]?.fail !== undefined && (
                    <th className="text-center px-4 py-3 text-sm font-medium text-red-500">
                      Fail
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {threshold.metrics.map((metric, metricIndex) => (
                  <motion.tr
                    key={metric.label}
                    className="border-b border-border last:border-0"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: thresholdIndex * 0.1 + metricIndex * 0.05, duration: 0.3 }}
                  >
                    <td className="px-6 py-4 text-sm font-medium">{metric.label}</td>
                    {metric.healthy !== undefined && (
                      <td className="text-center px-4 py-4 text-sm text-green-500">
                        {metric.healthy}
                      </td>
                    )}
                    {metric.pass !== undefined && (
                      <td className="text-center px-4 py-4 text-sm text-green-500">
                        {metric.pass}
                      </td>
                    )}
                    {metric.warning !== undefined && (
                      <td className="text-center px-4 py-4 text-sm text-yellow-500">
                        {metric.warning || '—'}
                      </td>
                    )}
                    {metric.critical !== undefined && (
                      <td className="text-center px-4 py-4 text-sm text-red-500">
                        {metric.critical || '—'}
                      </td>
                    )}
                    {metric.fail !== undefined && (
                      <td className="text-center px-4 py-4 text-sm text-red-500">
                        {metric.fail}
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
