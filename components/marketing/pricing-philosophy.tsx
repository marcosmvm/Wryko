'use client'

import { motion } from 'framer-motion'
import { Handshake, Eye, Calendar } from 'lucide-react'

import { SectionHeading } from './section-heading'

const principles = [
  {
    icon: Handshake,
    number: '01',
    title: 'Aligned Incentives',
    description:
      'Our per-meeting bonus structure means we are financially invested in your pipeline growth. We only succeed when you succeed.',
    stat: '$250/meeting bonus',
  },
  {
    icon: Eye,
    number: '02',
    title: 'Transparent Value',
    description:
      'A clear base retainer for full platform access, plus a performance bonus for every qualified meeting we deliver. No hidden costs.',
    stat: 'Zero hidden fees',
  },
  {
    icon: Calendar,
    number: '03',
    title: 'Risk-Free Pilot',
    description:
      'Start with a 90-day pilot at full capacity. If results fall short, exit with pro-rated refund. Month-to-month after that.',
    stat: 'Pro-rated refund guarantee',
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
            highlight="Performance-Based"
            subtitle="We structured our pricing to ensure our success is directly tied to yours."
          />
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className="bg-card border border-border rounded-xl overflow-hidden text-center hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Gradient top strip */}
              <div className="h-1 bg-gradient-to-r from-primary/60 to-secondary/40" />

              <div className="p-6">
                {/* Numbered badge */}
                <span className="inline-block text-xs font-bold text-primary/50 tracking-widest mb-3">
                  {principle.number}
                </span>

                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <principle.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{principle.title}</h3>
                <p className="text-muted-foreground mb-4">{principle.description}</p>

                {/* Supporting stat */}
                <div className="pt-4 border-t border-border/50">
                  <span className="text-sm font-semibold text-primary">{principle.stat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
