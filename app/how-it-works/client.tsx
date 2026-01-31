'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Shield } from 'lucide-react'
import Link from 'next/link'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { SubtleBackground } from '@/components/backgrounds'
import { SectionHeading } from '@/components/marketing/section-heading'
import { EngineCard } from '@/components/marketing/engine-card'
import { StatsGrid } from '@/components/marketing/stats-grid'
import { Timeline } from '@/components/marketing/timeline'
import { CTASection } from '@/components/marketing/cta-section'
import { ProcessSteps } from '@/components/marketing/process-steps'
import { HumanAIComparison } from '@/components/marketing/human-ai-comparison'
import { ComplianceDeepDive } from '@/components/marketing/compliance-deep-dive'

import { RotatingText } from '@/components/marketing/hero/rotating-text'
import { TrustLogosStrip } from '@/components/marketing/hero/trust-logos-strip'
import { HeroStatsBar } from '@/components/marketing/hero/hero-stats-bar'

import { leadGenEngines, csmEngines, onboardingTimeline, performanceStats, howItWorksRotatingText } from '@/lib/data/engines'
import { heroStatsEnhanced } from '@/lib/data/content'

export default function HowItWorksClient() {
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
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                How It Works
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                11 AI Engines{' '}
                <RotatingText
                  texts={howItWorksRotatingText}
                  className="gradient-text-animated"
                />
                <br />
                <span className="text-foreground">Autonomously, 24/7</span>
              </h1>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full" />
              </div>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Unlike traditional agencies or basic email tools, XGrowthOS deploys specialized
                AI engines with human strategic oversight—handling every aspect of B2B lead generation
                from compliance to campaign optimization.
              </p>
              <motion.div
                className="flex flex-wrap justify-center gap-10 sm:gap-16 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {[
                  { stat: '11', label: 'AI Engines' },
                  { stat: '24/7', label: 'Autonomous Operation' },
                  { stat: '14-Day', label: 'Launch Timeline' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-3xl sm:text-4xl font-heading font-bold text-primary">
                      {item.stat}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
                  </div>
                ))}
              </motion.div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book-demo"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/15"
                >
                  Book Your Discovery Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-muted transition-colors"
                >
                  View Pricing
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                No contracts. Performance-aligned pricing. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Trust Logos Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <TrustLogosStrip />
        </div>

        {/* Process Flow */}
        <ProcessSteps className="py-20 section-alt-2" />

        {/* Performance Preview Stats */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="BY THE NUMBERS"
              title="What These Engines Deliver"
              highlight="Deliver"
              subtitle="Platform capabilities at a glance."
            />
            <HeroStatsBar stats={heroStatsEnhanced} />
          </div>
        </section>

        {/* Lead Generation Engines */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="LEAD GENERATION"
              badge="Lead Generation Suite"
              title="5 Engines for Pipeline Growth"
              highlight="Pipeline Growth"
              subtitle="These engines work together to identify, engage, and convert your ideal prospects into qualified meetings."
            />

            <motion.div
              className="mb-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-xl px-6 py-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Engines A–E</span>{' '}
                handle prospecting, compliance, optimization, expansion, and visitor intelligence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadGenEngines.map((engine, index) => (
                <EngineCard
                  key={engine.name}
                  icon={engine.icon}
                  name={engine.name}
                  tagline={engine.tagline}
                  description={engine.description}
                  slug={engine.slug}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CSM Automation Engines */}
        <section className="py-20 section-alt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="CLIENT SUCCESS"
              badge="CSM Automation Suite"
              title="6 Engines for Client Success"
              highlight="Client Success"
              subtitle="Our automation engines enable one success manager to handle 20-25 clients instead of 10-12, while delivering proactive, not reactive, service."
            />

            <motion.div
              className="mb-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-xl px-6 py-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Engines F–K</span>{' '}
                automate reporting, issue detection, knowledge management, onboarding, churn prevention, and self-serve support.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {csmEngines.map((engine, index) => (
                <EngineCard
                  key={engine.name}
                  icon={engine.icon}
                  name={engine.name}
                  tagline={engine.tagline}
                  description={engine.description}
                  slug={engine.slug}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Human + AI Comparison */}
        <HumanAIComparison className="py-20" />

        {/* Onboarding Timeline */}
        <section className="py-20 section-alt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="ONBOARDING"
              badge="14-Day Onboarding"
              title="From Signup to First Meetings"
              highlight="First Meetings"
              subtitle="Our streamlined onboarding process gets you up and running quickly."
            />

            <div className="max-w-4xl mx-auto">
              <Timeline items={onboardingTimeline} />
            </div>
          </div>
        </section>

        {/* Compliance & Deliverability */}
        <ComplianceDeepDive className="py-20" />

        {/* Performance Metrics */}
        <section className="py-20 section-alt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="PERFORMANCE"
              badge="Performance Targets"
              title="What Our Engines Optimize Toward"
              highlight="Optimize Toward"
              subtitle="Our AI engines are designed to continuously optimize toward these performance targets."
            />

            <StatsGrid stats={performanceStats} columns={4} />

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                href="/book-demo"
                className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
              >
                Apply for a pilot to see these engines in action
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Ready to Transform Your Pipeline?"
          highlightText="Transform Your Pipeline"
          subtitle="Become a founding partner and let 11 AI engines handle your lead generation while you focus on closing deals."
          primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
          secondaryCta={{ href: '/pricing', label: 'View Pricing' }}
          showTrustLine
          urgencyText="Limited founding partner spots available"
          className="section-alt-2"
        />

        <Footer />
      </main>
    </SubtleBackground>
  )
}
