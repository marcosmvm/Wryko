'use client'

import { motion } from 'framer-motion'
import { Check, Shield, Clock } from 'lucide-react'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { SectionHeading } from '@/components/marketing/section-heading'
import { FAQAccordion } from '@/components/marketing/faq-accordion'
import { CTASection } from '@/components/marketing/cta-section'
import { PricingPhilosophy } from '@/components/marketing/pricing-philosophy'
import { PilotPricingHero } from '@/components/marketing/pilot-pricing-hero'

import { SubtleBackground } from '@/components/backgrounds'

import { pilotTier, featureCategories, guarantee } from '@/lib/data/pricing'
import { pricingFAQs } from '@/lib/data/content'

export default function PricingClient() {
  return (
    <SubtleBackground showOrb>
      <main className="min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Pilot Program
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Join Our{' '}
                <span className="gradient-text">Pilot Program</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
                We are onboarding a select cohort of founding partners to validate the
                power of 11 autonomous AI engines. Lock in the lowest pricing and
                help shape the future of B2B lead generation.
              </p>
              <p className="text-sm font-medium text-primary">
                Performance-aligned pricing. We succeed when you succeed.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Philosophy */}
        <PricingPhilosophy className="pb-20" />

        {/* Pilot Program Pricing */}
        <PilotPricingHero tier={pilotTier} className="section-alt-2" />

        {/* What's Included */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Platform Included"
              title="Everything You Need to Scale"
              highlight="Scale"
              subtitle="Every pilot partner gets full access to our complete platform. No hidden fees, no feature limitations."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featureCategories.map((category, index) => {
                const CategoryIcon = category.icon
                return (
                  <motion.div
                    key={category.title}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="relative w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <CategoryIcon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-4">{category.title}</h3>
                    <ul className="space-y-2.5">
                      {category.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>

            {/* Trust banner */}
            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/50 border border-border/50 rounded-full">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Full platform access from day one. No feature gates. No tier limitations.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 90-Day Pilot Program */}
        <section className="py-20 section-alt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Risk-Free"
              title="90-Day Pilot Program"
              highlight="Pilot Program"
              subtitle="A structured journey from onboarding to qualified meetings on your calendar."
            />

            {/* Desktop: Horizontal Timeline */}
            <div className="hidden md:block max-w-4xl mx-auto mb-16">
              {/* Timeline Connector with Step Dots */}
              <div className="relative mb-8">
                <div className="absolute top-1/2 left-[16.67%] right-[16.67%] h-0.5 -translate-y-1/2">
                  <div className="w-full h-full bg-gradient-to-r from-primary/40 via-primary/30 to-primary/40 rounded-full" />
                </div>
                <div className="grid grid-cols-3">
                  {guarantee.phases.map((phase, index) => (
                    <motion.div
                      key={`dot-${phase.name}`}
                      className="flex justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.2, duration: 0.3 }}
                    >
                      <div className="w-10 h-10 rounded-full border-2 bg-primary/15 border-primary/30 flex items-center justify-center shadow-md">
                        <span className="text-sm font-bold font-heading text-primary">
                          {index + 1}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Phase Cards Grid */}
              <div className="grid grid-cols-3 gap-6">
                {guarantee.phases.map((phase, index) => {
                  const PhaseIcon = phase.icon
                  return (
                    <motion.div
                      key={phase.name}
                      className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -4 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                    >
                      {/* Day Range Badge */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border bg-primary/10 text-primary border-primary/20 mb-4">
                        <Clock className="w-3 h-3" />
                        {phase.dayRange}
                      </span>

                      {/* Icon Container */}
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <PhaseIcon className="w-7 h-7 text-primary" />
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-semibold text-lg mb-2">{phase.name}</h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Mobile: Vertical Timeline */}
            <div className="md:hidden space-y-6 mb-16">
              {guarantee.phases.map((phase, index) => {
                const PhaseIcon = phase.icon
                return (
                  <motion.div
                    key={phase.name}
                    className="relative flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    {/* Left: Number Circle + Vertical Line */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-10 h-10 rounded-full border-2 bg-primary/15 border-primary/30 flex items-center justify-center z-10">
                        <span className="text-sm font-bold font-heading text-primary">
                          {index + 1}
                        </span>
                      </div>
                      {index < guarantee.phases.length - 1 && (
                        <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-primary/30 to-border/30" />
                      )}
                    </div>

                    {/* Right: Card */}
                    <div className="flex-1 bg-card border border-border rounded-xl p-5 mb-2">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full border bg-primary/10 text-primary border-primary/20">
                          <Clock className="w-3 h-3" />
                          {phase.dayRange}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <PhaseIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg">{phase.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Guarantee Card */}
            <motion.div
              className="max-w-3xl mx-auto bg-gradient-to-br from-primary/8 via-primary/3 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-7 h-7 text-primary" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">Our Guarantee</h3>
                  <p className="text-muted-foreground">{guarantee.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {guarantee.terms.map((term, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-primary" />
                    </div>
                    <span className="text-sm">{term}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 section-alt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Common Questions"
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about the pilot program, pricing, and getting started."
            />

            <div className="max-w-3xl mx-auto bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8">
              <FAQAccordion items={pricingFAQs} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Ready to Get Started?"
          subtitle="Book a discovery call to discuss your goals and see if XGrowthOS is the right fit for your team."
          primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
          secondaryCta={{ href: '/contact', label: 'Contact Sales' }}
          showTrustLine
          urgencyText="Limited pilot partner spots available"
          className="section-alt-2"
        />

        <Footer />
      </main>
    </SubtleBackground>
  )
}
