'use client'

import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

import { SectionHeading } from './section-heading'
import { processSteps } from '@/lib/data/human-ai'

interface ProcessStepsProps {
  className?: string
}

const typeStyles = {
  ai: {
    ring: 'bg-primary/15 border-primary/30',
    number: 'text-primary',
    badge: 'bg-primary/10 text-primary border-primary/20',
    label: 'AI-Powered',
  },
  human: {
    ring: 'bg-amber-500/15 border-amber-500/30',
    number: 'text-amber-600',
    badge: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    label: 'Expert-Led',
  },
  hybrid: {
    ring: 'bg-gradient-to-br from-primary/15 to-amber-500/15 border-primary/20',
    number: 'gradient-text',
    badge: 'bg-primary/10 text-primary border-primary/20',
    label: 'Human + AI',
  },
}

export function ProcessSteps({ className }: ProcessStepsProps) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="THE PROCESS"
          title="From Strategy to Pipeline in 14 Days"
          highlight="14 Days"
          subtitle="A proven four-step process that gets you from signed agreement to qualified meetings on your calendar."
        />

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber-500/30 via-primary/50 to-primary/30" />

            <div className="grid grid-cols-4 gap-6">
              {processSteps.map((step, index) => {
                const style = typeStyles[step.type]
                return (
                  <motion.div
                    key={step.number}
                    className="relative flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                  >
                    {/* Step Circle */}
                    <div className={cn(
                      'w-24 h-24 rounded-full border-2 flex items-center justify-center mb-4 relative z-10 bg-background',
                      style.ring
                    )}>
                      <div className="text-center">
                        <span className={cn('text-2xl font-bold', style.number)}>
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <span className={cn(
                      'inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border mb-3',
                      style.badge
                    )}>
                      {step.type === 'ai' && <Bot className="w-3 h-3" />}
                      {step.type === 'human' && <User className="w-3 h-3" />}
                      {step.type === 'hybrid' && (
                        <>
                          <Bot className="w-3 h-3" />
                          <span>+</span>
                          <User className="w-3 h-3" />
                        </>
                      )}
                      {style.label}
                    </span>

                    <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-6">
          {processSteps.map((step, index) => {
            const style = typeStyles[step.type]
            return (
              <motion.div
                key={step.number}
                className="relative flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {/* Left: Number + Line */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                    style.ring
                  )}>
                    <span className={cn('text-lg font-bold', style.number)}>
                      {step.number}
                    </span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-primary/30 to-transparent" />
                  )}
                </div>

                {/* Right: Content */}
                <div className="pb-6">
                  <span className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border mb-2',
                    style.badge
                  )}>
                    {style.label}
                  </span>
                  <h3 className="font-heading font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
