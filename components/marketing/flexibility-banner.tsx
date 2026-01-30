'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const flexibilityPoints = [
  '90-day pilot with full platform access',
  'Month-to-month after pilot period',
  '30-day notice to cancel anytime',
  'No long-term contracts required',
]

interface FlexibilityBannerProps {
  className?: string
}

export function FlexibilityBanner({ className }: FlexibilityBannerProps) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Flexible Terms
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              No Long-Term Contracts. Ever.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Unlike traditional agencies that lock you in for 6-12 months, we earn your business every month.
              Start with a pilot and stay because you want to, not because you have to.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
              {flexibilityPoints.map((point, index) => (
                <motion.div
                  key={point}
                  className="flex items-center gap-2 text-left"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{point}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Your 90-Day Pilot
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
