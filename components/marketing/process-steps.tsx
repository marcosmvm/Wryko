'use client'

import { motion } from 'framer-motion'
import { Bot, User, Clock, Check } from 'lucide-react'
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
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  human: {
    ring: 'bg-amber-500/15 border-amber-500/30',
    number: 'text-amber-600',
    badge: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    label: 'Expert-Led',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
  },
  hybrid: {
    ring: 'bg-gradient-to-br from-primary/15 to-amber-500/15 border-primary/20',
    number: 'gradient-text',
    badge: 'bg-primary/10 text-primary border-primary/20',
    label: 'Human + AI',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
}

export function ProcessSteps({ className }: ProcessStepsProps) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="THE PROCESS"
          title="Four Steps. 14 Days. Pipeline Built."
          highlight="Pipeline Built."
          subtitle="A structured process that takes you from signed agreement to qualified meetings on your calendar."
        />

        {/* Desktop: Horizontal Card Timeline */}
        <div className="hidden md:block">
          {/* Timeline Connector with Step Dots */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-0.5 -translate-y-1/2">
              <div className="w-full h-full bg-gradient-to-r from-amber-500/30 via-primary/40 to-primary/30 rounded-full" />
            </div>
            <div className="grid grid-cols-4">
              {processSteps.map((step, index) => {
                const style = typeStyles[step.type]
                return (
                  <motion.div
                    key={`dot-${step.number}`}
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, duration: 0.3 }}
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-full border-2 flex items-center justify-center bg-background shadow-md',
                      style.ring
                    )}>
                      <span className={cn('text-sm font-bold font-heading', style.number)}>
                        {step.number}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Step Cards Grid */}
          <div className="grid grid-cols-4 gap-6">
            {processSteps.map((step, index) => {
              const style = typeStyles[step.type]
              const StepIcon = step.icon
              return (
                <motion.div
                  key={step.number}
                  className="glass-premium rounded-xl p-6 glow-border-hover relative transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  {/* Day Range Badge */}
                  <span className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border mb-4',
                    style.badge
                  )}>
                    <Clock className="w-3 h-3" />
                    {step.dayRange}
                  </span>

                  {/* Icon Container */}
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
                    style.iconBg
                  )}>
                    <StepIcon className={cn('w-7 h-7', style.iconColor)} />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                  {/* Deliverables */}
                  <ul className="space-y-2">
                    {step.deliverables.map((deliverable, dIndex) => (
                      <motion.li
                        key={dIndex}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + dIndex * 0.05 + 0.3, duration: 0.3 }}
                      >
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground">{deliverable}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Type Badge at bottom */}
                  <div className="mt-4 pt-3 border-t border-border/50">
                    <span className={cn(
                      'inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border',
                      style.badge
                    )}>
                      {step.type === 'ai' && <Bot className="w-3 h-3" />}
                      {step.type === 'human' && <User className="w-3 h-3" />}
                      {step.type === 'hybrid' && (
                        <>
                          <User className="w-3 h-3" />
                          <span>+</span>
                          <Bot className="w-3 h-3" />
                        </>
                      )}
                      {style.label}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: Vertical Card Timeline */}
        <div className="md:hidden space-y-6">
          {processSteps.map((step, index) => {
            const style = typeStyles[step.type]
            const StepIcon = step.icon
            return (
              <motion.div
                key={step.number}
                className="relative flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {/* Left: Number Circle + Vertical Line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={cn(
                    'w-10 h-10 rounded-full border-2 flex items-center justify-center bg-background z-10',
                    style.ring
                  )}>
                    <span className={cn('text-sm font-bold font-heading', style.number)}>
                      {step.number}
                    </span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-primary/30 to-border/30" />
                  )}
                </div>

                {/* Right: Card */}
                <div className="flex-1 glass-premium rounded-xl p-5 mb-2">
                  {/* Header: Day Badge + Type Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full border',
                      style.badge
                    )}>
                      <Clock className="w-3 h-3" />
                      {step.dayRange}
                    </span>
                    <span className={cn(
                      'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border',
                      style.badge
                    )}>
                      {step.type === 'ai' && <Bot className="w-3 h-3" />}
                      {step.type === 'human' && <User className="w-3 h-3" />}
                      {step.type === 'hybrid' && (
                        <>
                          <User className="w-3 h-3" />
                          <span>+</span>
                          <Bot className="w-3 h-3" />
                        </>
                      )}
                      {style.label}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      style.iconBg
                    )}>
                      <StepIcon className={cn('w-5 h-5', style.iconColor)} />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">{step.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

                  {/* Deliverables */}
                  <ul className="space-y-1.5">
                    {step.deliverables.map((deliverable, dIndex) => (
                      <li key={dIndex} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
