'use client'

import { motion } from 'framer-motion'
import { Check, Shield } from 'lucide-react'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { SectionHeading } from '@/components/marketing/section-heading'
import { PricingCard } from '@/components/marketing/pricing-card'
import { FAQAccordion } from '@/components/marketing/faq-accordion'
import { CTASection } from '@/components/marketing/cta-section'
import { PricingPhilosophy } from '@/components/marketing/pricing-philosophy'
import { ChannelGrid } from '@/components/marketing/channel-grid'
import { FlexibilityBanner } from '@/components/marketing/flexibility-banner'
import { SubtleBackground } from '@/components/backgrounds'

import { pricingTiers, includedFeatures, guarantee } from '@/lib/data/pricing'
import { pricingFAQs } from '@/lib/data/content'
import { ROICalculator } from '@/components/marketing/roi-calculator'

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
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
                Pricing
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Simple, Performance-Aligned{' '}
                <span className="gradient-text">Pricing</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We succeed when you succeed. Our per-meeting bonus model ensures
                our incentives are fully aligned with your growth goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Philosophy */}
        <PricingPhilosophy className="pb-20" />

        {/* Pricing Cards */}
        <section className="py-20 section-violet-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Choose Your Tier"
              title="Plans for Every Growth Stage"
              subtitle="All tiers include our full 11-engine platform. The difference is scale and support level."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <PricingCard
                  key={tier.name}
                  {...tier}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Supported Channels */}
        <ChannelGrid
          className="py-20"
          showFeatures={false}
        />

        {/* What's Included */}
        <section className="py-20 section-violet-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Everything You Need to Scale"
              subtitle="All tiers include access to our complete platform. No hidden fees, no feature limitations."
            />

            <motion.div
              className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {includedFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Flexibility Banner */}
        <FlexibilityBanner className="py-20" />

        {/* Guarantee Section */}
        <section className="py-20 section-violet-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12"
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

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {guarantee.terms.map((term, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{term}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Calculate Your ROI"
              title="See Your Potential Return"
              subtitle="Estimate your results with XGrowthOS based on your industry and deal size."
            />
            <div className="max-w-4xl mx-auto">
              <ROICalculator />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 section-violet-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about pricing, payments, and getting started."
            />

            <div className="max-w-3xl mx-auto">
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
          className="section-violet-alt"
        />

        <Footer />
      </main>
    </SubtleBackground>
  )
}
