'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Play } from '@phosphor-icons/react'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { CTASection } from '@/components/marketing/cta-section'
import { HumanAIComparison } from '@/components/marketing/human-ai-comparison'
import { ComplianceBadges } from '@/components/marketing/compliance-badges'
import { ProcessSteps } from '@/components/marketing/process-steps'
import { HeroBackground } from '@/components/backgrounds'
import { CaseSnippetsSection } from '@/components/marketing/case-snippets-section'
import { ReviewBadges } from '@/components/marketing/review-badges'
import { ProductShowcase } from '@/components/marketing/product-showcase'
import { TeamStrip } from '@/components/marketing/team-strip'

import { AnnouncementBar } from '@/components/marketing/hero/announcement-bar'
import { RotatingText } from '@/components/marketing/hero/rotating-text'
import { EnginePipelineVisual } from '@/components/marketing/hero/engine-pipeline-visual'
import { PartnerLogoMarquee } from '@/components/marketing/partner-logo-marquee'
import { HeroStatsBar } from '@/components/marketing/hero/hero-stats-bar'
import { HeroVideoSection } from '@/components/marketing/hero/hero-video-section'

import { heroStatsEnhanced, heroPainPoints, icpWedge } from '@/lib/data/content'

export default function HomeContent() {
  return (
    <HeroBackground>
      <main className="min-h-screen">
        <Navigation />

        {/* Announcement Bar */}
        <div className="pt-16">
          <AnnouncementBar />
        </div>

        {/* Hero Section */}
        <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Split Layout */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column: Copy */}
              <motion.div
                className="max-w-xl lg:max-w-none"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* ICP Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Built for {icpWedge.primary}
                  </span>
                </motion.div>

                {/* Headline */}
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Stop Trying to{' '}
                  <RotatingText
                    texts={heroPainPoints}
                    className="gradient-text-animated"
                  />
                  <br />
                  <span className="text-foreground">Let 11 AI Engines Do It.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg">
                  Wryko gives your team 11 autonomous AI engines designed to handle
                  every aspect of outbound lead generation — from prospecting to meeting
                  booking. Launched in as little as 14 days.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/book-demo"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/15"
                  >
                    Apply for Your Pilot
                    <ArrowRight className="w-5 h-5" weight="bold" />
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-muted transition-colors"
                  >
                    <Play className="w-4 h-4" weight="fill" />
                    See How It Works
                  </Link>
                </div>

                {/* Micro-trust line */}
                <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" weight="duotone" />
                  No contracts. Performance-aligned pricing. Cancel anytime.
                </p>
              </motion.div>

              {/* Right Column: Engine Pipeline Visual */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <EnginePipelineVisual />
              </motion.div>
            </div>

            {/* Partner Logo Marquee */}
            <PartnerLogoMarquee className="mt-16" />

            {/* Review Badges */}
            <ReviewBadges className="mt-8" />

            {/* Animated Stats */}
            <HeroStatsBar stats={heroStatsEnhanced} className="mt-12" />
          </div>
        </section>

        {/* Demo Video Section */}
        <HeroVideoSection
          title="See Wryko in Action"
          // Add your video URL here when ready:
          // videoUrl="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
        />

        {/* Product Showcase */}
        <ProductShowcase />

        {/* Performance Metrics */}
        <CaseSnippetsSection className="py-20" />

        {/* Tech Line Divider */}
        <div className="tech-line w-full max-w-md mx-auto" />

        {/* Process Steps - How It Works */}
        <ProcessSteps className="py-20" />

        {/* Human + AI Section */}
        <HumanAIComparison className="py-20" />

        {/* Compliance & Trust Section */}
        <ComplianceBadges className="py-20" />

        {/* Team Strip */}
        <TeamStrip />

        {/* CTA Section */}
        <CTASection
          title="Ready to Transform Your Pipeline?"
          highlightText="Transform Your Pipeline"
          subtitle="Apply for a founding partner pilot and let 11 AI engines handle your outbound lead generation."
          primaryCta={{ href: '/book-demo', label: 'Apply for Your Pilot' }}
          secondaryCta={{ href: '/how-it-works', label: 'See How It Works' }}
          showTrustLine
          className="section-alt"
        />

        <Footer />
      </main>
    </HeroBackground>
  )
}
