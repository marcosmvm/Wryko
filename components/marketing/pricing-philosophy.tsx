'use client'

import { motion } from 'framer-motion'
import { Handshake, Eye, Calendar } from 'lucide-react'

import { SectionHeading } from './section-heading'

const principles = [
  {
    icon: Handshake,
    title: 'Aligned Incentives',
    description:
      'Our per-meeting bonus structure means we are financially invested in your pipeline growth. We only succeed when you succeed.',
  },
  {
    icon: Eye,
    title: 'Transparent Value',
    description:
      'A clear base retainer for full platform access, plus a performance bonus for every qualified meeting we deliver. No hidden costs.',
  },
  {
    icon: Calendar,
    title: 'Risk-Free Pilot',
    description:
      'Start with a 90-day pilot at full capacity. If results fall short, exit with pro-rated refund. Month-to-month after that.',
  },
]

interface PricingPhilosophyProps {
  showHeading?: boolean
  className?: string
}

export function PricingPhilosophy({ showHeading = true, className }: PricingPhilosophyProps) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            badge="Our Approach"
            title="Why Performance-Based Pricing?"
            subtitle="We structured our pricing to ensure our success is directly tied to yours."
          />
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className="bg-card border border-border rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <principle.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{principle.title}</h3>
              <p className="text-muted-foreground">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
