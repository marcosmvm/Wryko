'use client'

import { motion } from 'framer-motion'
import { Clock, Database, ArrowUpRight, ArrowRight, Zap, TrendingUp, Shield, Target, Sparkles, Globe } from 'lucide-react'
import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { SectionHeading } from '@/components/marketing/section-heading'
import { EngineHero } from '@/components/marketing/engine-hero'
import { EnginePhasesGrid } from '@/components/marketing/engine-phase-card'
import { EngineMetricsGrid } from '@/components/marketing/engine-metrics-grid'
import { EngineIllustration } from '@/components/marketing/engine-illustration'
import { RelatedEngines } from '@/components/marketing/related-engines'
import { FAQAccordion } from '@/components/marketing/faq-accordion'
import { CTASection } from '@/components/marketing/cta-section'
import { SubtleBackground } from '@/components/backgrounds'
import { engineDetails } from '@/lib/data/engine-details'

const impactIcons = [TrendingUp, Shield, Target, Sparkles]

interface EngineDetailClientProps {
  slug: string
}

export default function EngineDetailClient({ slug }: EngineDetailClientProps) {
  const engine = engineDetails[slug]

  if (!engine) {
    return null
  }

  return (
    <SubtleBackground showOrb>
      <main className="min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <EngineHero
          name={engine.name}
          tagline={engine.tagline}
          description={engine.heroDescription}
          icon={engine.icon}
          suite={engine.suite}
          letter={engine.letter}
          stats={engine.stats}
        />

        {/* Purpose + Illustration Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 section-alt-2">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SectionHeading
                  eyebrow="PURPOSE"
                  title="What This Engine Does"
                  highlight="Engine"
                  centered={false}
                />
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {engine.purpose}
                </p>

                {/* Time Savings Card - Enhanced */}
                {engine.timeSavings && (
                  <motion.div
                    className="mt-8 relative bg-card border border-border rounded-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {/* Gradient top accent */}
                    <div className="h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary" />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-heading font-semibold">Time Savings</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-red-500/5 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Before</div>
                          <div className="font-heading font-bold text-lg text-red-500">{engine.timeSavings.before}</div>
                        </div>
                        <div className="bg-green-500/5 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">After</div>
                          <div className="font-heading font-bold text-lg text-green-500">{engine.timeSavings.after}</div>
                        </div>
                        <div className="bg-primary/5 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Savings</div>
                          <div className="font-heading font-bold text-lg text-primary">{engine.timeSavings.savings}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Illustration */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <EngineIllustration slug={engine.slug as Parameters<typeof EngineIllustration>[0]['slug']} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="PROCESS"
              title="How It Works"
              highlight="Works"
              subtitle={`${engine.name} operates through a multi-phase workflow designed for maximum automation and reliability.`}
            />
            <EnginePhasesGrid phases={engine.phases} />
          </div>
        </section>

        {/* Triggers Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 section-alt-2">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="AUTOMATION"
              title="When It Runs"
              highlight="Runs"
              subtitle="This engine works autonomously so you don't have to"
            />
            <motion.div
              className="max-w-2xl mx-auto relative bg-card border border-border rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Gradient top accent */}
              <div className="h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary" />
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/15">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg">Fully Automated</h4>
                    <p className="text-sm text-muted-foreground">Runs in the background without manual intervention</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {engine.triggers.map((trigger, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {trigger.type === 'webhook' ? (
                          <Zap className="w-4 h-4 text-primary" />
                        ) : (
                          <Clock className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <span className="text-foreground font-medium">{trigger.description}</span>
                        {trigger.schedule && (
                          <span className="ml-2 inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                            {trigger.schedule}
                          </span>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Thresholds Section (if applicable) */}
        {engine.thresholds && engine.thresholds.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <SectionHeading
                eyebrow="PERFORMANCE"
                title="Performance Metrics"
                highlight="Metrics"
                subtitle="Key thresholds and benchmarks monitored by this engine"
              />
              <EngineMetricsGrid thresholds={engine.thresholds} />
            </div>
          </section>
        )}

        {/* Inputs & Outputs Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 section-alt-2">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="DATA FLOW"
              title="Inputs & Outputs"
              highlight="Outputs"
              subtitle="What goes in and what comes out"
            />
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
              {/* Center flow arrow (desktop only) */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4, type: 'spring' }}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.div>
              </div>

              {/* Inputs */}
              <motion.div
                className="relative bg-card border border-border rounded-xl overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-400" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">Inputs</h3>
                  </div>
                  <ul className="space-y-4">
                    {engine.inputs.map((input, index) => (
                      <motion.li
                        key={index}
                        className="flex gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-500">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium">{input.name}</div>
                          <div className="text-sm text-muted-foreground">{input.description}</div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Outputs */}
              <motion.div
                className="relative bg-card border border-border rounded-xl overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">Outputs</h3>
                  </div>
                  <ul className="space-y-4">
                    {engine.outputs.map((output, index) => (
                      <motion.li
                        key={index}
                        className="flex gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-green-500">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium">{output.name}</div>
                          <div className="text-sm text-muted-foreground">{output.description}</div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Business Impact Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="RESULTS"
              title="Business Impact"
              highlight="Impact"
              subtitle="The measurable benefits this engine delivers"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {engine.businessImpact.map((impact, index) => {
                const ImpactIcon = impactIcons[index % impactIcons.length]
                return (
                  <motion.div
                    key={index}
                    className="relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Gradient top accent */}
                    <div className="h-0.5 bg-gradient-to-r from-primary via-secondary/60 to-primary" />
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <ImpactIcon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-heading font-semibold text-lg text-primary mb-2">
                        {impact.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{impact.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Data Sources Section */}
        {engine.dataSources && engine.dataSources.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 section-alt-2">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                eyebrow="INTEGRATIONS"
                title="Connected Data Sources"
                highlight="Data Sources"
                subtitle="The platforms and services this engine integrates with"
              />
              <motion.div
                className="flex flex-wrap justify-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {engine.dataSources.map((source, index) => (
                  <motion.span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:border-primary/30 transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    {source}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {engine.faqs && engine.faqs.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <SectionHeading
                eyebrow="FAQ"
                title="Frequently Asked Questions"
                highlight="Questions"
                subtitle={`Common questions about ${engine.name}`}
              />
              <FAQAccordion items={engine.faqs} />
            </div>
          </section>
        )}

        {/* Related Engines Section */}
        {engine.relatedEngines && engine.relatedEngines.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 section-alt-2">
            <div className="max-w-7xl mx-auto">
              <SectionHeading
                eyebrow="ECOSYSTEM"
                title="Works With"
                highlight="Works"
                subtitle="Other engines that complement this one"
              />
              <RelatedEngines relatedSlugs={engine.relatedEngines} />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <CTASection
          title={`Ready to Deploy ${engine.name}?`}
          highlightText={engine.name}
          subtitle="See how our autonomous engines can transform your pipeline and client success operations."
          urgencyText="Limited founding partner spots available"
          primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
          secondaryCta={{ href: '/how-it-works', label: 'Explore All Engines' }}
          showTrustLine
        />

        <Footer />
      </main>
    </SubtleBackground>
  )
}
