'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EnginePhase {
  number: number
  title: string
  description: string
  steps: string[]
}

interface EnginePhaseCardProps {
  phase: EnginePhase
  index: number
  className?: string
}

export function EnginePhaseCard({ phase, index, className }: EnginePhaseCardProps) {
  return (
    <motion.div
      className={cn(
        'relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Phase number badge */}
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-lg shadow-lg">
        {phase.number}
      </div>

      {/* Content */}
      <div className="pt-4">
        <h3 className="font-heading font-semibold text-xl mb-2">{phase.title}</h3>
        <p className="text-muted-foreground mb-4">{phase.description}</p>

        {/* Steps */}
        <ul className="space-y-2">
          {phase.steps.map((step, stepIndex) => (
            <motion.li
              key={stepIndex}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + stepIndex * 0.05, duration: 0.3 }}
            >
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{step}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

interface EnginePhasesGridProps {
  phases: EnginePhase[]
  className?: string
}

export function EnginePhasesGrid({ phases, className }: EnginePhasesGridProps) {
  return (
    <div className={cn('grid md:grid-cols-2 gap-8', className)}>
      {phases.map((phase, index) => (
        <EnginePhaseCard key={phase.number} phase={phase} index={index} />
      ))}
    </div>
  )
}
