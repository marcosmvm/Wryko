'use client'

import { motion } from 'framer-motion'
import { Clock, Database, ArrowUpRight, Zap } from 'lucide-react'
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
import type { EngineDetail } from '@/lib/data/engine-details'

interface EngineDetailClientProps {
  engine: EngineDetail
}

export default function EngineDetailClient({ engine }: EngineDetailClientProps) {
  return (
    <div className="min-h-screen bg-background">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                badge="Purpose"
                title="What This Engine Does"
                centered={false}
              />
              <p className="text-lg text-muted-foreground leading-relaxed">
                {engine.purpose}
              </p>

              {/* Time Savings Card */}
              {engine.timeSavings && (
                <motion.div
                  className="mt-8 p-6 bg-card border border-border rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-heading font-semibold">Time Savings</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Before</div>
                      <div className="font-semibold text-red-500">{engine.timeSavings.before}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">After</div>
                      <div className="font-semibold text-green-500">{engine.timeSavings.after}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Savings</div>
                      <div className="font-semibold text-primary">{engine.timeSavings.savings}</div>
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
            badge="Process"
            title="How It Works"
            subtitle={`${engine.name} operates through a multi-phase workflow designed for maximum automation and reliability.`}
          />
          <EnginePhasesGrid phases={engine.phases} />
        </div>
      </section>

      {/* Triggers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Triggers"
            title="When It Runs"
            subtitle="Understanding when and how this engine activates"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {engine.triggers.map((trigger, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {trigger.type === 'webhook' ? (
                    <Zap className="w-5 h-5 text-primary" />
                  ) : (
                    <Clock className="w-5 h-5 text-primary" />
                  )}
                </div>
                <h4 className="font-heading font-semibold mb-2 capitalize">
                  {trigger.type === 'webhook' ? 'Webhook Trigger' : 'Scheduled'}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">{trigger.description}</p>
                {trigger.schedule && (
                  <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {trigger.schedule}
                  </span>
                )}
                {trigger.endpoint && (
                  <code className="block mt-2 text-xs bg-muted px-2 py-1 rounded font-mono">
                    {trigger.endpoint}
                  </code>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Thresholds Section (if applicable) */}
      {engine.thresholds && engine.thresholds.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHeading
              badge="Thresholds"
              title="Performance Metrics"
              subtitle="Key thresholds and benchmarks monitored by this engine"
            />
            <EngineMetricsGrid thresholds={engine.thresholds} />
          </div>
        </section>
      )}

      {/* Inputs & Outputs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Data Flow"
            title="Inputs & Outputs"
            subtitle="What goes in and what comes out"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Inputs */}
            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-heading font-semibold text-lg">Inputs</h3>
              </div>
              <ul className="space-y-4">
                {engine.inputs.map((input, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{input.name}</div>
                      <div className="text-sm text-muted-foreground">{input.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Outputs */}
            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="font-heading font-semibold text-lg">Outputs</h3>
              </div>
              <ul className="space-y-4">
                {engine.outputs.map((output, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{output.name}</div>
                      <div className="text-sm text-muted-foreground">{output.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Impact"
            title="Business Impact"
            subtitle="The measurable benefits this engine delivers"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engine.businessImpact.map((impact, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h4 className="font-heading font-semibold text-lg text-primary mb-2">
                  {impact.title}
                </h4>
                <p className="text-sm text-muted-foreground">{impact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources Section (if applicable) */}
      {engine.dataSources && engine.dataSources.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              badge="Integrations"
              title="Data Sources"
              subtitle="External services and APIs powering this engine"
            />
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {engine.dataSources.map((source, index) => (
                <motion.span
                  key={index}
                  className="inline-block px-4 py-2 bg-card border border-border rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
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
              badge="FAQ"
              title="Frequently Asked Questions"
              subtitle={`Common questions about ${engine.name}`}
            />
            <FAQAccordion items={engine.faqs} />
          </div>
        </section>
      )}

      {/* Related Engines Section */}
      {engine.relatedEngines && engine.relatedEngines.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              badge="Related"
              title="Works With"
              subtitle="Other engines that complement this one"
            />
            <RelatedEngines relatedSlugs={engine.relatedEngines} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection
        title={`Ready to Deploy ${engine.name}?`}
        subtitle="See how our autonomous engines can transform your pipeline and client success operations."
        primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
        secondaryCta={{ href: '/how-it-works', label: 'Explore All Engines' }}
      />

      <Footer />
    </div>
  )
}
