'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { SectionHeading } from '@/components/marketing/section-heading'
import { EngineCard } from '@/components/marketing/engine-card'
import { StatsGrid } from '@/components/marketing/stats-grid'
import { Timeline } from '@/components/marketing/timeline'
import { CTASection } from '@/components/marketing/cta-section'

import { leadGenEngines, csmEngines, onboardingTimeline, performanceStats } from '@/lib/data/engines'

export default function HowItWorksClient() {
  return (
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
              How It Works
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              11 AI Engines Working{' '}
              <span className="gradient-text">Autonomously, 24/7</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Unlike traditional agencies or basic email tools, XGrowthOS deploys specialized
              AI engines that handle every aspect of B2B lead generation—from compliance to
              campaign optimization to client success automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-demo"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
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
          </motion.div>
        </div>
      </section>

      {/* Lead Generation Engines */}
      <section className="py-20 bg-muted/30">
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
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CSM Automation Engines */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="CSM Automation Suite"
            title="6 Engines for Client Success"
            subtitle="Our automation engines enable one success manager to handle 20-25 clients instead of 10-12, while delivering proactive, not reactive, service."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {csmEngines.map((engine, index) => (
              <motion.div
                key={engine.name}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <engine.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-1">{engine.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{engine.tagline}</p>
                <p className="text-muted-foreground text-sm mb-3">{engine.description}</p>
                <div className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded">
                  {engine.timeSaved}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Timeline */}
      <section className="py-20 bg-muted/30">
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

      {/* Performance Metrics */}
      <section className="py-20">
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
        subtitle="Join our founding partners and let 11 AI engines handle your lead generation while you focus on closing deals."
        className="bg-muted/30"
      />

      <Footer />
    </main>
  )
}
