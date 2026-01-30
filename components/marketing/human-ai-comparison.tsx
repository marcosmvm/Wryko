'use client'

import { motion } from 'framer-motion'
import { Bot, User, Check, Shield, ArrowLeftRight } from 'lucide-react'

import { SectionHeading } from './section-heading'
import { aiResponsibilities, humanResponsibilities, trustMessage } from '@/lib/data/human-ai'

interface HumanAIComparisonProps {
  showHeading?: boolean
  className?: string
}

export function HumanAIComparison({ showHeading = true, className }: HumanAIComparisonProps) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            eyebrow="HOW IT WORKS"
            badge="Human + AI"
            title="AI Does the Heavy Lifting. Experts Provide the Strategy."
            highlight="Heavy Lifting"
            subtitle="The perfect balance of automation and human expertise for maximum results."
          />
        )}

        <div className="relative grid md:grid-cols-2 gap-8">
          {/* AI Column */}
          <motion.div
            className="glass-card border-l-4 border-l-primary p-6 md:p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">AI Handles</h3>
                <p className="text-sm text-muted-foreground">
                  {aiResponsibilities.length} autonomous operations &middot; 24/7
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {aiResponsibilities.map((item, index) => (
                <motion.li
                  key={item.task}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">{item.task}</span>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Bridge Element - Desktop only */}
          <motion.div
            className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-xs font-semibold shadow-lg shadow-primary/15">
              <ArrowLeftRight className="w-3 h-3" />
              Working Together
            </div>
          </motion.div>

          {/* Human Column */}
          <motion.div
            className="glass-card border-l-4 border-l-amber-500/50 p-6 md:p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-amber-500/15 flex items-center justify-center">
                <User className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Humans Provide</h3>
                <p className="text-sm text-muted-foreground">
                  {humanResponsibilities.length} strategic functions &middot; Expert-led
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {humanResponsibilities.map((item, index) => (
                <motion.li
                  key={item.task}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">{item.task}</span>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Trust Message */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-card">
            <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              {trustMessage}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
