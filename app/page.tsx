'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Target, Brain, Eye, Zap, ChevronRight } from 'lucide-react'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { StatsGrid } from '@/components/marketing/stats-grid'
import { CTASection } from '@/components/marketing/cta-section'

import { heroStats } from '@/lib/data/content'

const engines = [
  {
    icon: Shield,
    name: 'The Guardian',
    slug: 'the-guardian',
    description: 'Protects deliverability, ensures compliance, monitors domain health',
  },
  {
    icon: Target,
    name: 'The Architect',
    slug: 'the-architect',
    description: 'Designs AI-powered campaigns with personalized sequences',
  },
  {
    icon: Brain,
    name: 'The Scientist',
    slug: 'the-scientist',
    description: 'Runs continuous A/B tests, optimizes for maximum reply rates',
  },
  {
    icon: Zap,
    name: 'The Hunter',
    slug: 'the-hunter',
    description: 'Expands leads from every positive reply (25-50 new prospects)',
  },
  {
    icon: Eye,
    name: 'The Sentinel',
    slug: 'the-sentinel',
    description: 'Identifies anonymous website visitors (8-15 contacts each)',
  },
]

export default function HomePage() {
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
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Autonomous B2B Lead Generation That{' '}
              <span className="gradient-text">Books Meetings While You Sleep</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              11 AI engines working 24/7 to identify, engage, and book qualified meetings
              with your ideal customers. No more manual prospecting.
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
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-muted transition-colors"
              >
                See How It Works
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="mt-20">
            <StatsGrid stats={heroStats} columns={4} />
          </div>
        </div>
      </section>

      {/* AI Engines Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Five AI Engines Working For You
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each engine handles a critical part of your lead generation pipeline,
              working autonomously 24/7.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engines.map((engine, index) => (
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/engines/${engine.slug}`}
                  className="block bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <engine.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{engine.name}</h3>
                  <p className="text-muted-foreground mb-3">{engine.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* CSM Suite Card */}
            <motion.div
              className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3 className="font-heading font-semibold text-lg mb-2">+ 6 CSM Automation Engines</h3>
              <p className="text-muted-foreground mb-4">
                Automated reporting, issue detection, onboarding, and client portal access.
              </p>
              <Link href="/how-it-works" className="text-primary font-medium inline-flex items-center gap-1 hover:underline">
                Learn more <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Pipeline?"
        subtitle="Join our founding partners and let AI handle your lead generation while you focus on closing deals."
        primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
      />

      <Footer />
    </main>
  )
}
