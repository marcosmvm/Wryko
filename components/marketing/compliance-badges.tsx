'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

import { SectionHeading } from './section-heading'
import { complianceBadges } from '@/lib/data/compliance'
import { cn } from '@/lib/utils'

interface ComplianceBadgesProps {
  showHeading?: boolean
  variant?: 'full' | 'compact'
  className?: string
}

export function ComplianceBadges({
  showHeading = true,
  variant = 'full',
  className,
}: ComplianceBadgesProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap justify-center gap-4', className)}>
        {complianceBadges.map((badge, index) => (
          <motion.div
            key={badge.name}
            className="flex items-center gap-2 px-4 py-2 glass-card rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <badge.icon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{badge.name}</span>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            eyebrow="TRUST & COMPLIANCE"
            badge="Trust & Compliance"
            title="Built with Compliance in Mind"
            highlight="Compliance"
            subtitle="We take data protection and email compliance seriously so you can focus on growth."
          />
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceBadges.map((badge, index) => (
            <motion.div
              key={badge.name}
              className="glass-card p-6 text-center hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="relative w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <badge.icon className="w-7 h-7 text-primary" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
              </div>
              <h3 className="font-heading font-semibold mb-2">{badge.name}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-card">
            <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Enterprise-grade security. Dedicated sending domains. No shared infrastructure.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/how-it-works#compliance"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Learn more about our compliance practices
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
