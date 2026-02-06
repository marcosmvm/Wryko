'use client'

import { motion } from 'framer-motion'
import { Calendar, TrendUp, PiggyBank, Lightning } from '@phosphor-icons/react'
import { CalculatorResults as Results } from './industry-data'
import { cn } from '@/lib/utils'

interface CalculatorResultsProps {
  results: Results
  className?: string
}

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value.toFixed(0)}`
}

export function CalculatorResults({ results, className }: CalculatorResultsProps) {
  const stats = [
    {
      icon: Calendar,
      label: 'Projected Meetings',
      value: `${results.projectedMeetings}/mo`,
      subtext: `+${results.additionalMeetings} more than today`,
      highlight: true,
    },
    {
      icon: TrendUp,
      label: 'Annual Revenue Potential',
      value: formatCurrency(results.additionalRevenuePotential),
      subtext: 'From additional meetings',
      highlight: false,
    },
    {
      icon: Lightning,
      label: 'ROI Multiplier',
      value: `${results.roiMultiplier}x`,
      subtext: 'Return on investment',
      highlight: true,
    },
    {
      icon: PiggyBank,
      label: 'vs. Hiring an SDR',
      value: results.costSavingsVsSDR > 0 ? `Save ${formatCurrency(results.costSavingsVsSDR)}` : 'Comparable cost',
      subtext: 'Annual cost comparison',
      highlight: false,
    },
  ]

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Your Projected Results
        </h3>
        <span className="text-xs text-muted-foreground">
          First meeting in ~{results.timeToFirstMeeting}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={`${stat.label}-${results.projectedMeetings}`}
              className={cn(
                'p-4 rounded-xl border transition-all',
                stat.highlight
                  ? 'bg-primary/10 border-primary/20'
                  : 'bg-background/50 border-border'
              )}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center mb-3',
                  stat.highlight ? 'bg-primary/20' : 'bg-muted'
                )}
              >
                <Icon
                  className={cn(
                    'w-4 h-4',
                    stat.highlight ? 'text-primary' : 'text-muted-foreground'
                  )}
                  weight="duotone"
                />
              </div>
              <div
                className={cn(
                  'text-2xl font-heading font-bold',
                  stat.highlight ? 'text-primary' : 'text-foreground'
                )}
              >
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.subtext}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estimated monthly investment</span>
          <span className="font-medium text-foreground">
            {formatCurrency(results.monthlyInvestment)}/mo
          </span>
        </div>
      </div>
    </div>
  )
}
