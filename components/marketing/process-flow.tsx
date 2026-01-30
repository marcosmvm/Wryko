'use client'

import { motion } from 'framer-motion'
import { User, Bot, ArrowRight } from 'lucide-react'

import { SectionHeading } from './section-heading'
import { processSteps } from '@/lib/data/human-ai'
import { cn } from '@/lib/utils'

interface ProcessFlowProps {
  showHeading?: boolean
  className?: string
}

export function ProcessFlow({ showHeading = true, className }: ProcessFlowProps) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            badge="Our Process"
            title="From Strategy to Meetings in 14 Days"
            subtitle="A proven process that combines human expertise with AI execution."
          />
        )}

        {/* Desktop Flow */}
        <div className="hidden md:block">
          <div className="flex items-start justify-between gap-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="flex items-start flex-1">
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <div className="bg-card border border-border rounded-xl p-6 relative">
                    {/* Step Number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>

                    {/* Type Badge */}
                    <div className="mb-4 flex justify-end">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full',
                          step.type === 'human' && 'bg-blue-500/10 text-blue-600',
                          step.type === 'ai' && 'bg-primary/10 text-primary',
                          step.type === 'hybrid' && 'bg-secondary/10 text-secondary'
                        )}
                      >
                        {step.type === 'human' && <User className="w-3 h-3" />}
                        {step.type === 'ai' && <Bot className="w-3 h-3" />}
                        {step.type === 'hybrid' && (
                          <>
                            <User className="w-3 h-3" />
                            <span>+</span>
                            <Bot className="w-3 h-3" />
                          </>
                        )}
                        {step.type === 'human' && 'Human-Led'}
                        {step.type === 'ai' && 'AI-Powered'}
                        {step.type === 'hybrid' && 'Collaborative'}
                      </span>
                    </div>

                    <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>

                {/* Arrow between steps */}
                {index < processSteps.length - 1 && (
                  <div className="flex items-center justify-center w-8 mt-12 flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="md:hidden space-y-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="bg-card border border-border rounded-xl p-6 relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {/* Type Badge */}
                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full flex-shrink-0',
                    step.type === 'human' && 'bg-blue-500/10 text-blue-600',
                    step.type === 'ai' && 'bg-primary/10 text-primary',
                    step.type === 'hybrid' && 'bg-secondary/10 text-secondary'
                  )}
                >
                  {step.type === 'human' && <User className="w-3 h-3" />}
                  {step.type === 'ai' && <Bot className="w-3 h-3" />}
                  {step.type === 'hybrid' && (
                    <>
                      <User className="w-3 h-3" />
                      <Bot className="w-3 h-3" />
                    </>
                  )}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-6 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-600">
              <User className="w-3 h-3" />
            </span>
            <span className="text-muted-foreground">Human-Led</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
              <Bot className="w-3 h-3" />
            </span>
            <span className="text-muted-foreground">AI-Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full bg-secondary/10 text-secondary">
              <User className="w-3 h-3" />
              <Bot className="w-3 h-3" />
            </span>
            <span className="text-muted-foreground">Collaborative</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
