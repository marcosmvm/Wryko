'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Shield } from 'lucide-react'
import Link from 'next/link'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { HeroBackground } from '@/components/backgrounds'
import { SectionHeading } from '@/components/marketing/section-heading'
import { EngineCard } from '@/components/marketing/engine-card'
import { StatsGrid } from '@/components/marketing/stats-grid'
import { Timeline } from '@/components/marketing/timeline'
import { CTASection } from '@/components/marketing/cta-section'
import { ProcessFlow } from '@/components/marketing/process-flow'
import { HumanAIComparison } from '@/components/marketing/human-ai-comparison'
import { ComplianceDeepDive } from '@/components/marketing/compliance-deep-dive'

import { RotatingText } from '@/components/marketing/hero/rotating-text'
import { TrustLogosStrip } from '@/components/marketing/hero/trust-logos-strip'
import { HeroStatsBar } from '@/components/marketing/hero/hero-stats-bar'
import { CaseProofBadge } from '@/components/marketing/case-proof-badge'

import { leadGenEngines, csmEngines, onboardingTimeline, performanceStats, howItWorksRotatingText } from '@/lib/data/engines'
import { heroStatsEnhanced } from '@/lib/data/content'
import { heroCaseHighlight } from '@/lib/data/case-snippets'

export default function HowItWorksClient() {
  return (
    <HeroBackground>
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
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                Unlike traditional agencies or basic email tools, XGrowthOS deploys specialized
                AI engines with human strategic oversight—handling every aspect of B2B lead generation
                from compliance to campaign optimization.
              </p>
              <div className="mb-8">
                <CaseProofBadge snippet={heroCaseHighlight} />
              </div>
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
        <ProcessFlow className="py-20 section-alt" />

        {/* Performance Preview Stats */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.p
              className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              What These Engines Deliver
            </motion.p>
            <HeroStatsBar stats={heroStatsEnhanced} />
          </div>
        </section>

        {/* Lead Generation Engines */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Lead Generation Suite"
              title="5 Engines for Pipeline Growth"
              subtitle="These engines work together to identify, engage, and convert your ideal prospects into qualified meetings."
            />

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
        <section className="py-20 section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="CSM Automation Suite"
              title="6 Engines for Client Success"
              subtitle="Our automation engines enable one success manager to handle 20-25 clients instead of 10-12, while delivering proactive, not reactive, service."
            />

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
        <section className="py-20 section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="14-Day Onboarding"
              title="From Signup to First Meetings"
              subtitle="Our streamlined onboarding process gets you up and running quickly, with first replies typically within 48-72 hours of launch."
            />

            <div className="max-w-4xl mx-auto">
              <Timeline items={onboardingTimeline} />
            </div>
          </div>
        </section>

        {/* Compliance & Deliverability */}
        <ComplianceDeepDive className="py-20" />

        {/* Performance Metrics */}
        <section className="py-20 section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Results That Matter"
              title="Performance That Beats Industry Averages"
              subtitle="Our AI engines consistently outperform industry benchmarks across all key metrics."
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
                href="/case-studies"
                className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
              >
                See client case studies
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Ready to Transform Your Pipeline?"
          highlightText="Transform Your Pipeline"
          subtitle="Join our founding partners and let 11 AI engines handle your lead generation while you focus on closing deals."
          urgencyText="Only 15 Founding Partner spots remaining for Q1 2026"
          primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
          secondaryCta={{ href: '/case-studies', label: 'See Client Results' }}
          showTrustLine
          className="section-alt"
        />

        <Footer />
      </main>
    </HeroBackground>
  )
}
