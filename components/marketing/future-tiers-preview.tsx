'use client'

import { motion } from 'framer-motion'

import { SectionHeading } from './section-heading'
import { PricingCard } from './pricing-card'

interface FutureTier {
  name: string
  badge: string
  retainer: number | string
  onboarding: number | string
  meetingBonus: number | string
  domains: string
  emails: string
  support: string
  featured: boolean
  ctaLabel: string
  ctaHref: string
  available: boolean
}

interface FutureTiersPreviewProps {
  tiers: FutureTier[]
  className?: string
}

export function FutureTiersPreview({ tiers, className }: FutureTiersPreviewProps) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="On the Horizon"
          title="Future Growth Tiers"
          subtitle="After the pilot phase, additional tiers will be available for teams ready to scale further."
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, index) => (
            <PricingCard
              key={tier.name}
              {...tier}
              index={index}
            />
          ))}
        </div>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Pricing shown is projected and may be adjusted before launch.
          Pilot partners retain their locked-in founding pricing regardless of future tier changes.
        </motion.p>
      </div>
    </section>
  )
}
