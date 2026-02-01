'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Rocket,
  Check,
  TrendingUp,
  Target,
  Brain,
  Shield,
  BarChart3,
  Settings,
  Briefcase,
  Landmark,
  Megaphone,
  Factory,
  Monitor,
  Lock,
  Star,
  MessageSquare,
  Users,
  Clock,
  Search,
  ClipboardCheck,
} from 'lucide-react'
import Link from 'next/link'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { SectionHeading } from '@/components/marketing/section-heading'
import { StatsGrid } from '@/components/marketing/stats-grid'
import { CTASection } from '@/components/marketing/cta-section'
import { ComplianceBadges } from '@/components/marketing/compliance-badges'
import { FAQAccordion } from '@/components/marketing/faq-accordion'
import { SubtleBackground } from '@/components/backgrounds'

import { heroStats } from '@/lib/data/content'
import {
  projectedResults,
  methodologySteps,
  industryScenarios,
  foundingBenefits,
  caseStudyFAQs,
  pageHeroStats,
} from '@/lib/data/case-snippets'

const resultIcons = { BarChart3, MessageSquare, TrendingUp, Target }
const methodIcons = { Search, Settings, Brain, BarChart3 }
const scenarioIcons = { Monitor, Shield, Briefcase, Landmark, Megaphone, Factory }
const benefitIcons = { Lock, Users, Star, Clock, MessageSquare, TrendingUp }

const verificationItems = [
  'Every meeting verified against your ICP criteria',
  'Weekly performance dashboards shared in real time',
  'Results published only with client written consent',
  'Independent metrics — not self-reported',
  'Open Rate, Reply Rate, and Meeting data tracked per campaign',
  '90-day pilot provides statistically significant sample size',
]

export default function CaseStudiesClient() {
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
                Founding Partner Results
              </span>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Real Results Are{' '}
                <span className="gradient-text">Being Written</span>{' '}
                Right Now
              </h1>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full" />
              </div>

              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Our founding partner cohort is live and running. As pilot programs complete,
                verified case studies with real metrics will be published here. In the meantime,
                here is what our platform is engineered to deliver.
              </p>

              <motion.div
                className="flex flex-wrap justify-center gap-10 sm:gap-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {pageHeroStats.map((item) => (
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

        {/* ─── Section 2: Projected Results ─── */}
        <section className="py-20 section-alt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="PROJECTED OUTCOMES"
              title="What Pilot Clients Can Expect"
              highlight="Expect"
              subtitle="These are the performance targets our 11 AI engines are optimized to achieve for every client engagement."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projectedResults.map((result, index) => {
                const Icon =
                  resultIcons[result.iconName as keyof typeof resultIcons] || BarChart3
                return (
                  <motion.div
                    key={result.metric}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="h-1 bg-gradient-to-r from-primary/60 to-secondary/40" />
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{result.metric}</p>
                      <p className="text-2xl font-heading font-bold text-primary mb-3">
                        {result.target}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Methodology ─── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="OUR METHODOLOGY"
              badge="Proven Process"
              title="Engineered for Measurable Results"
              highlight="Measurable Results"
              subtitle="Every engagement follows our four-phase methodology — designed to deliver pipeline velocity from day one."
            />

            {/* Desktop timeline connector */}
            <div className="hidden lg:block relative mb-8">
              <div className="absolute top-4 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
              <div className="grid grid-cols-4 gap-6">
                {methodologySteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, duration: 0.3 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                      {step.number}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodologySteps.map((step, index) => {
                const Icon =
                  methodIcons[step.iconName as keyof typeof methodIcons] || Settings
                return (
                  <motion.div
                    key={step.number}
                    className="bg-card border border-border rounded-xl p-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="lg:hidden text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
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

        {/* ─── Section 5: Industry Scenarios ─── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="USE CASES"
              title="How Wryko Works Across Industries"
              highlight="Across Industries"
              subtitle="Our platform adapts to your industry, ICP, and sales motion. Here is how we approach different verticals."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industryScenarios.map((scenario, index) => {
                const Icon =
                  scenarioIcons[scenario.iconName as keyof typeof scenarioIcons] || Briefcase
                return (
                  <motion.div
                    key={scenario.industry}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg">{scenario.industry}</h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-primary mb-1">
                          Ideal Client
                        </p>
                        <p className="text-sm text-muted-foreground">{scenario.idealClient}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-primary mb-1">
                          Our Approach
                        </p>
                        <p className="text-sm text-muted-foreground">{scenario.approach}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-primary mb-1">
                          Expected Outcome
                        </p>
                        <p className="text-sm text-muted-foreground">{scenario.expectedOutcome}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Section 6: Founding Partner Benefits ─── */}
        <section className="py-20 section-alt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="FOUNDING PARTNERS"
              badge="Limited Spots"
              title="Be Among Our First Success Stories"
              highlight="First Success Stories"
              subtitle="Founding partners receive exclusive benefits designed to maximize your success and our partnership."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {foundingBenefits.map((benefit, index) => {
                const Icon =
                  benefitIcons[benefit.iconName as keyof typeof benefitIcons] || Star
                return (
                  <motion.div
                    key={benefit.title}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                    <div className="px-6 py-3 border-t border-border/50 bg-muted/30">
                      <p className="text-sm font-semibold text-primary">{benefit.highlight}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Founding Partner CTA Card */}
            <motion.div
              className="max-w-3xl mx-auto bg-gradient-to-br from-primary/8 via-primary/3 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">
                Join the Founding Cohort
              </h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                A limited number of founding partner spots remain. Lock in your rate,
                shape the platform, and become one of our first published success stories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book-demo"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/15"
                >
                  Apply for Your Pilot
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
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Limited founding partner spots available
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── Section 7: Transparency / Verification ─── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="TRANSPARENCY"
              title="How We Verify and Publish Results"
              highlight="Verify"
              subtitle="We hold ourselves to the highest standard of accuracy. Every metric we publish will be independently verified."
            />

            <motion.div
              className="max-w-3xl mx-auto glass-card border-l-4 border-l-primary p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg">Our Verification Commitments</h3>
              </div>

              <ul className="space-y-4">
                {verificationItems.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 + 0.3, duration: 0.3 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ─── Section 8: Compliance ─── */}
        <ComplianceBadges className="py-20 section-alt-2" />

        {/* ─── Section 9: FAQ ─── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Common Questions"
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about our case studies and founding partner program."
            />

            <div className="max-w-3xl mx-auto">
              <FAQAccordion items={caseStudyFAQs} />
            </div>
          </div>
        </section>

        {/* ─── Section 10: CTA ─── */}
        <CTASection
          title="Ready to Write the Next Success Story?"
          highlightText="Next Success Story"
          subtitle="Apply for a founding partner pilot and let 11 AI engines build your pipeline while we build your case study."
          primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
          secondaryCta={{ href: '/pricing', label: 'View Pricing' }}
          showTrustLine
          urgencyText="Limited founding partner spots available"
        />

        <Footer />
      </main>
    </SubtleBackground>
  )
}
