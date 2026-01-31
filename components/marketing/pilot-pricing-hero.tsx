'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

import { SectionHeading } from './section-heading'

interface PilotTier {
  name: string
  badge: string
  tagline: string
  retainer: number
  onboarding: number
  meetingBonus: number
  domains: string
  emails: string
  support: string
  ctaLabel: string
  ctaHref: string
  highlights: string[]
}

interface PilotPricingHeroProps {
  tier: PilotTier
  className?: string
}

export function PilotPricingHero({ tier, className }: PilotPricingHeroProps) {
  return (
    <section className={cn('py-20', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Limited Availability"
          title="Your Pilot Program Investment"
          subtitle="Start with a 90-day pilot at full capacity. All 11 AI engines. Founding partner pricing locked for life."
        />

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Card */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/40 shadow-xl">
            {/* Gradient top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-primary/3 to-transparent pointer-events-none" />

            <div className="relative p-8 md:p-12">
              {/* Badge and name */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-white bg-primary rounded-full w-fit">
                  <Sparkles className="w-3.5 h-3.5" />
                  {tier.badge}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold">{tier.name}</h3>
              </div>

              <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
                {tier.tagline}
              </p>

              {/* Two-column layout */}
              <div className="grid md:grid-cols-2 gap-10 md:gap-12 mb-10">
                {/* Left: Pricing breakdown */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                    Investment
                  </h4>

                  <div className="space-y-6">
                    {/* Monthly retainer */}
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-5xl font-heading font-bold gradient-text">
                          ${tier.retainer.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground text-lg">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Monthly retainer</p>
                    </div>

                    {/* Onboarding */}
                    <div className="flex items-baseline gap-3 pb-4 border-b border-border/50">
                      <span className="text-2xl font-heading font-bold">
                        ${tier.onboarding.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">one-time onboarding</span>
                    </div>

                    {/* Per meeting */}
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-heading font-bold">
                        ${tier.meetingBonus.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">per qualified meeting</span>
                    </div>
                  </div>

                  {/* Platform specs */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-card/80 border border-border/50 rounded-lg px-4 py-3">
                      <p className="text-2xl font-heading font-bold">{tier.domains}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Sending Domains</p>
                    </div>
                    <div className="bg-card/80 border border-border/50 rounded-lg px-4 py-3">
                      <p className="text-2xl font-heading font-bold">{tier.emails}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Emails / Month</p>
                    </div>
                  </div>
                </div>

                {/* Right: Highlights */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                    Pilot Partner Benefits
                  </h4>
                  <div className="space-y-4">
                    {tier.highlights.map((highlight, index) => (
                      <motion.div
                        key={highlight}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-[15px] leading-relaxed">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Support callout */}
                  <div className="mt-8 bg-primary/5 border border-primary/15 rounded-lg px-5 py-4">
                    <p className="text-sm font-medium">
                      <span className="text-primary">{tier.support}</span>{' '}
                      <span className="text-muted-foreground">strategy calls included</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6 border-t border-border/50">
                <Link
                  href={tier.ctaHref}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/15"
                >
                  {tier.ctaLabel}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-sm text-muted-foreground mt-3">
                  No commitment required. Start with a discovery call.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
