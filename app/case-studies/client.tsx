'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Rocket } from 'lucide-react'
import Link from 'next/link'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { CTASection } from '@/components/marketing/cta-section'

export default function CaseStudiesClient() {
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
              Coming Soon
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Our First{' '}
              <span className="gradient-text">Success Stories</span>{' '}
              Are Being Written
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We are currently onboarding our founding partner cohort. Case studies
              with verified results will be published as our first clients complete
              their pilot programs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pilot Program CTA */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-4">
              Be Part of Our First Cohort
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              As a founding partner, you will get our lowest pricing locked in for life,
              direct access to our team, and the opportunity to shape the platform
              as we grow together.
            </p>
            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/15"
            >
              Apply for Your Pilot
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold mb-8">
            What Our Platform Offers
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-2">11 AI Engines</h3>
              <p className="text-sm text-muted-foreground">
                Autonomous lead generation, compliance monitoring, and campaign optimization.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-2">14-Day Onboarding</h3>
              <p className="text-sm text-muted-foreground">
                From signed agreement to live campaigns in two weeks.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-2">Performance-Aligned</h3>
              <p className="text-sm text-muted-foreground">
                Pay-per-meeting model that aligns our incentives with your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Get Started?"
        subtitle="Book a discovery call to discuss your goals and see if XGrowthOS is the right fit."
        primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
        secondaryCta={{ href: '/pricing', label: 'View Pricing' }}
      />

      <Footer />
    </main>
  )
}
