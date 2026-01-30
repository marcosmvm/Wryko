'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

import { SectionHeading } from './section-heading'
import { deliverabilityFeatures, warmupProcess } from '@/lib/data/compliance'

interface ComplianceDeepDiveProps {
  showHeading?: boolean
  className?: string
}

export function ComplianceDeepDive({ showHeading = true, className }: ComplianceDeepDiveProps) {
  return (
    <section className={className} id="compliance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            badge="Compliance & Deliverability"
            title="Built-In Protection for Your Campaigns"
            subtitle="We handle the technical complexity so you can focus on growth."
          />
        )}

        {/* Deliverability Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {deliverabilityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>

              <ul className="space-y-2 ml-14">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Warmup Process */}
        <motion.div
          className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/20 flex items-center justify-center">
              <warmupProcess.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">{warmupProcess.title}</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">{warmupProcess.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {warmupProcess.steps.map((step, index) => (
              <motion.div
                key={step.day}
                className="bg-card/50 border border-border rounded-lg p-4 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <div className="text-xs text-muted-foreground mb-1">Day {step.day}</div>
                <div className="font-semibold text-primary mb-1">{step.volume}</div>
                <div className="text-xs text-muted-foreground">{step.focus}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
