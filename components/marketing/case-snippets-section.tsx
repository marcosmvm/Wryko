'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChartBar, ChatCircle, TrendUp, Target } from '@phosphor-icons/react'
import Link from 'next/link'

import { SectionHeading } from '@/components/marketing/section-heading'
import { AnimatedCounter } from '@/components/marketing/hero/animated-counter'
import { projectedResults } from '@/lib/data/case-snippets'
import { cn } from '@/lib/utils'

const iconMap = {
  BarChart3: ChartBar,
  MessageSquare: ChatCircle,
  TrendUp,
  Target,
} as const

const accentColors = [
  'from-primary/20 to-primary/5',
  'from-secondary/20 to-secondary/5',
  'from-amber-500/20 to-amber-500/5',
  'from-emerald-500/20 to-emerald-500/5',
]

function parseTarget(target: string): {
  value: number
  suffix: string
  prefix: string
} {
  const num = parseFloat(target.replace(/[^0-9.]/g, ''))
  if (target.includes('%')) {
    return { value: num, suffix: '%+', prefix: '' }
  }
  return { value: num, suffix: '', prefix: '' }
}

function getTargetLabel(target: string): string | null {
  if (target.toLowerCase().includes('day')) {
    return 'Days'
  }
  return null
}

interface CaseSnippetsSectionProps {
  className?: string
}

export function CaseSnippetsSection({ className }: CaseSnippetsSectionProps) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ENGINEERED FOR PERFORMANCE"
          title="What We Engineer For"
          highlight="Engineer For"
          subtitle="Every engine, every campaign, and every optimization is designed to hit these benchmarks — measurably."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {projectedResults.map((result, index) => {
            const Icon =
              iconMap[result.iconName as keyof typeof iconMap] || Target
            const accent = accentColors[index % accentColors.length]
            const parsed = parseTarget(result.target)
            const unitLabel = getTargetLabel(result.target)

            return (
              <motion.div
                key={result.metric}
                className={cn(
                  'glass-card p-6 text-center relative overflow-hidden',
                  'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300'
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                {/* Subtle gradient background */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-b opacity-50',
                    accent
                  )}
                />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" weight="duotone" />
                  </div>

                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl sm:text-5xl font-heading font-bold text-primary">
                      <AnimatedCounter
                        end={parsed.value}
                        suffix={parsed.suffix}
                        prefix={parsed.prefix}
                        duration={2}
                      />
                    </span>
                    {unitLabel && (
                      <span className="text-lg font-heading font-semibold text-primary/70">
                        {unitLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-semibold mt-2 mb-2">
                    {result.metric}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href="/book-demo"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/15"
          >
            See How We Hit These Numbers
            <ArrowRight className="w-5 h-5" weight="bold" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
