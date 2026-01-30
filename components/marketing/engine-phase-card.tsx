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
        'relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      {/* Gradient top accent */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary" />

      <div className="p-6">
        {/* Phase header with gradient number badge */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-heading font-bold text-lg shadow-lg shadow-primary/20 flex-shrink-0">
            {phase.number}
          </div>
          <div>
            <h3 className="font-heading font-semibold text-xl">{phase.title}</h3>
          </div>
        </div>

        <p className="text-muted-foreground mb-5 leading-relaxed">{phase.description}</p>

        {/* Steps */}
        <ul className="space-y-3">
          {phase.steps.map((step, stepIndex) => (
            <motion.li
              key={stepIndex}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + stepIndex * 0.05, duration: 0.3 }}
            >
              <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
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
