'use client'

import { motion } from 'framer-motion'
import { Check, Shield, Calendar } from 'lucide-react'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { SectionHeading } from '@/components/marketing/section-heading'
import { FAQAccordion } from '@/components/marketing/faq-accordion'
import { CTASection } from '@/components/marketing/cta-section'
import { PricingPhilosophy } from '@/components/marketing/pricing-philosophy'
import { PilotPricingHero } from '@/components/marketing/pilot-pricing-hero'
import { FutureTiersPreview } from '@/components/marketing/future-tiers-preview'
import { SubtleBackground } from '@/components/backgrounds'

import { pilotTier, futureTiers, includedFeatures, guarantee } from '@/lib/data/pricing'
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
              subtitle="Every pilot partner gets full access to our complete platform. No hidden fees, no feature limitations."
            />

            <motion.div
              className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {includedFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-start gap-3 bg-card/50 border border-border/50 rounded-lg px-4 py-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.3 }}
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Guarantee + Flexibility Section (merged) */}
        <section className="py-20 section-alt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-3xl mx-auto bg-gradient-to-br from-primary/8 via-primary/3 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold mb-2">{guarantee.title}</h2>
                  <p className="text-muted-foreground">{guarantee.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-6 mb-8">
                {guarantee.terms.map((term, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{term}</span>
                  </div>
                ))}
              </div>

              {/* Flexibility section */}
              <div className="pt-6 border-t border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-heading text-lg font-semibold">No Long-Term Contracts. Ever.</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Unlike traditional agencies that lock you in for 6-12 months, we earn your business every month.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {guarantee.flexibility.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Future Pricing Tiers */}
        <FutureTiersPreview tiers={futureTiers} className="py-20" />

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
