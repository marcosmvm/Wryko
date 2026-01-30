'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Shield, TrendingUp, Eye, ArrowRight, Quote } from 'lucide-react'
import Link from 'next/link'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { SectionHeading } from '@/components/marketing/section-heading'
import { StatsGrid } from '@/components/marketing/stats-grid'
import { CTASection } from '@/components/marketing/cta-section'
import { ComplianceBadges } from '@/components/marketing/compliance-badges'
import { SubtleBackground } from '@/components/backgrounds'

import { aboutContent, heroStats } from '@/lib/data/content'

const valueIcons = {
  Innovation: Lightbulb,
  Trust: Shield,
  Growth: TrendingUp,
  Transparency: Eye,
}

export default function AboutClient() {
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
              About Us
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Reimagining{' '}
              <span className="gradient-text">B2B Lead Generation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We believe every B2B company deserves access to enterprise-grade lead
              generation—powered by AI that works 24/7, not expensive headcount.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 section-alt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                {aboutContent.mission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="font-heading text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                {aboutContent.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl flex items-center justify-center border border-primary/20">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-heading font-bold text-primary">MM</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Photo coming soon</p>
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="font-heading text-3xl font-bold mb-2">
                {aboutContent.founderBio.name}
              </h2>
              <p className="text-primary font-medium mb-1">
                {aboutContent.founderBio.title}
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {aboutContent.founderBio.location} • {aboutContent.founderBio.background}
              </p>

              <div className="space-y-4 text-muted-foreground">
                <p>{aboutContent.founderBio.story}</p>

                <div className="bg-muted/50 border-l-4 border-primary rounded-r-lg p-4 mt-6">
                  <Quote className="w-6 h-6 text-primary mb-2" />
                  <p className="italic">{aboutContent.founderBio.commitment}</p>
                </div>
              </div>

              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:underline"
              >
                Schedule a call with Marcos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 section-alt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we build and every client relationship we nurture."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutContent.values.map((value, index) => {
              const Icon = valueIcons[value.name as keyof typeof valueIcons] || Lightbulb
              return (
                <motion.div
                  key={value.name}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{value.name}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why XGrowthOS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why XGrowthOS?"
            subtitle="What sets us apart from traditional agencies and basic email tools."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutContent.differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="py-20 section-alt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Platform at a Glance"
            subtitle="Key capabilities of our AI engine platform."
          />

          <StatsGrid stats={heroStats} columns={4} />
        </div>
      </section>

      {/* Trust & Compliance */}
      <ComplianceBadges className="py-20" />

      {/* CTA Section */}
      <CTASection
        title="Join the Future of B2B Lead Generation"
        subtitle="Become a Founding Partner and get lifetime access to our lowest pricing as we build the platform together."
        primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
        secondaryCta={{ href: '/contact', label: 'Get in Touch' }}
      />

        <Footer />
      </main>
    </SubtleBackground>
  )
}
