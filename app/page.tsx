'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { StatsGrid } from '@/components/marketing/stats-grid'
import { CTASection } from '@/components/marketing/cta-section'
import { ChannelGrid } from '@/components/marketing/channel-grid'
import { HumanAIComparison } from '@/components/marketing/human-ai-comparison'
import { ComplianceBadges } from '@/components/marketing/compliance-badges'
import { HeroBackground } from '@/components/backgrounds'
import { CaseProofBadge } from '@/components/marketing/case-proof-badge'
import { CaseSnippetsSection } from '@/components/marketing/case-snippets-section'

import { heroStats, icpWedge } from '@/lib/data/content'
import { heroCaseHighlight } from '@/lib/data/case-snippets'

export default function HomePage() {
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
              {/* ICP Badge */}
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
                For {icpWedge.primary}
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                We Book{' '}
                <span className="gradient-text">25-40 Qualified Meetings</span>
                {' '}Per Month
              </h1>
              <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
                Outbound that actually works. We find your ideal buyers, book conversations
                with decision-makers, and fill your calendar while you focus on closing.
              </p>

              {/* Case Proof Badge */}
              <div className="mb-8">
                <CaseProofBadge snippet={heroCaseHighlight} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book-demo"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
                >
                  See If You Qualify
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-muted transition-colors"
                >
                  View Client Results
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="mt-20">
              <StatsGrid stats={heroStats} columns={4} />
            </div>
          </div>
        </section>

        {/* Case Snippets Section - Social Proof */}
        <CaseSnippetsSection className="py-20" />

        {/* Supported Channels Section */}
        <ChannelGrid className="py-20 bg-muted/30" />

        {/* Human + AI Section */}
        <HumanAIComparison className="py-20 bg-muted/30" />

        {/* Compliance & Trust Section */}
        <ComplianceBadges className="py-20" />

        {/* CTA Section */}
        <CTASection
          title="Ready to Fill Your Calendar?"
          subtitle="Join 50+ B2B companies booking 25-40 qualified meetings per month. See if you qualify."
          primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
          className="bg-muted/30"
        />

        <Footer />
      </main>
    </HeroBackground>
  )
}
