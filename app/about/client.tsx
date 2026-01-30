'use client'

import { motion } from 'framer-motion'
import {
  Lightbulb,
  Shield,
  TrendingUp,
  Eye,
  ArrowRight,
  Users,
  Clock,
  AlertTriangle,
  Bot,
  ShieldCheck,
  Cpu,
  Brain,
  Scale,
  Expand,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { SectionHeading } from '@/components/marketing/section-heading'
import { StatsGrid } from '@/components/marketing/stats-grid'
import { CTASection } from '@/components/marketing/cta-section'
import { ComplianceBadges } from '@/components/marketing/compliance-badges'
import { SubtleBackground } from '@/components/backgrounds'

import { aboutContent, aboutProblem, aboutSolution, heroStats } from '@/lib/data/content'

const valueIcons = {
  Innovation: Lightbulb,
  Trust: Shield,
  Growth: TrendingUp,
  Transparency: Eye,
}

const problemIcons = {
  Users,
  Clock,
  AlertTriangle,
}

const solutionIcons = {
  Bot,
  ShieldCheck,
  TrendingUp,
}

const diffIcons = {
  Cpu,
  ShieldCheck,
  Brain,
  Scale,
  Users,
  Expand,
}

export default function AboutClient() {
  return (
    <SubtleBackground showOrb>
      <main className="min-h-screen">
        <Navigation />

        {/* ─── Section 1: Hero ─── */}
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
                About XGrowthOS
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                The Operating System for{' '}
                <span className="gradient-text">Autonomous Lead Generation</span>
              </h1>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full" />
              </div>

              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                XGrowthOS deploys 11 specialized AI engines to handle every aspect of B2B
                outbound — from compliance to campaign optimization — so your team can focus
                on closing deals, not chasing leads.
              </p>

              {/* Inline proof-point stats */}
              <motion.div
                className="flex flex-wrap justify-center gap-10 sm:gap-16"
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
            </motion.div>
          </div>
        </section>

        {/* ─── Section 2: The Problem ─── */}
        <section className="py-20 section-alt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="THE CHALLENGE"
              title={aboutProblem.heading}
              highlight="Broken"
              subtitle={aboutProblem.subtitle}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutProblem.problems.map((problem, index) => {
                const Icon =
                  problemIcons[problem.iconName as keyof typeof problemIcons] || AlertTriangle
                return (
                  <motion.div
                    key={problem.title}
                    className="bg-card border border-border rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{problem.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {problem.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Section 3: The Solution ─── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="THE SOLUTION"
              badge="XGrowthOS Platform"
              title={aboutSolution.heading}
              highlight="11 Engines"
              subtitle={aboutSolution.subtitle}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutSolution.pillars.map((pillar, index) => {
                const Icon =
                  solutionIcons[pillar.iconName as keyof typeof solutionIcons] || Bot
                return (
                  <motion.div
                    key={pillar.title}
                    className="bg-card border border-border border-l-4 border-l-primary rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{pillar.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Section 4: Platform Stats ─── */}
        <section className="py-20 section-alt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="BY THE NUMBERS"
              title="Built for Scale and Performance"
              highlight="Scale"
              subtitle="Key capabilities of our autonomous lead generation platform."
            />
            <StatsGrid stats={heroStats} columns={4} />
          </div>
        </section>

        {/* ─── Section 5: Why XGrowthOS ─── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Why XGrowthOS?"
              subtitle="What sets us apart from traditional agencies and basic email tools."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutContent.differentiators.map((item, index) => {
                const Icon =
                  diffIcons[item.iconName as keyof typeof diffIcons] || Cpu
                return (
                  <motion.div
                    key={item.title}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Section 6: Values ─── */}
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

        {/* ─── Section 7: Leadership (Compact) ─── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="LEADERSHIP"
              title="Founded by an Operator, Not an Observer"
              highlight="Operator"
              subtitle="XGrowthOS was built by someone who lived the problem every day."
            />

            <motion.div
              className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Headshot */}
                <div className="shrink-0">
                  <Image
                    src="/images/marcos-matthews-headshot.jpg"
                    alt="Marcos Matthews, Founder & CEO of XGrowthOS"
                    width={96}
                    height={96}
                    className="rounded-full border-2 border-primary/20 object-cover w-24 h-24"
                  />
                </div>

                {/* Bio */}
                <div className="text-center sm:text-left flex-1">
                  <h3 className="font-heading text-xl font-bold">
                    {aboutContent.founderBio.name}
                  </h3>
                  <p className="text-primary font-medium text-sm">
                    {aboutContent.founderBio.title}
                  </p>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                    {aboutContent.founderBio.story}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start text-xs text-muted-foreground">
                    <span>{aboutContent.founderBio.location}</span>
                    <span className="hidden sm:inline">·</span>
                    <span>{aboutContent.founderBio.background}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="shrink-0">
                  <Link
                    href="/book-demo"
                    className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline whitespace-nowrap"
                  >
                    Meet Marcos
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Section 8: Compliance ─── */}
        <ComplianceBadges className="py-20" />

        {/* ─── Section 9: CTA ─── */}
        <CTASection
          title="Ready to Automate Your Pipeline?"
          highlightText="Automate Your Pipeline"
          subtitle="Apply for a founding partner pilot and let 11 AI engines handle your outbound lead generation."
          primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
          secondaryCta={{ href: '/how-it-works', label: 'See How It Works' }}
          showTrustLine
          urgencyText="Limited founding partner spots available"
        />

        <Footer />
      </main>
    </SubtleBackground>
  )
}
