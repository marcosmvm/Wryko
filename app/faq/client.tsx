'use client'

import { motion } from 'framer-motion'
import { MessageCircleQuestion } from 'lucide-react'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { CTASection } from '@/components/marketing/cta-section'
import { FAQCategorySection } from '@/components/marketing/faq-category-section'
import { SubtleBackground } from '@/components/backgrounds'

import { faqCategories } from '@/lib/data/faq-data'

export default function FAQClient() {
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
                FAQ
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Frequently Asked{' '}
                <span className="gradient-text">Questions</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Everything you need to know about XGrowthOS, from how our platform
                works to pricing, integrations, and getting started.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {[
                { value: '11', label: 'AI Engines' },
                { value: '14 Days', label: 'Onboarding' },
                { value: '24/7', label: 'Autonomous' },
                { value: '90 Days', label: 'Pilot Period' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 text-center rounded-xl"
                >
                  <div className="text-2xl font-heading font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, index) => (
              <FAQCategorySection
                key={category.id}
                title={category.title}
                icon={category.icon}
                items={category.items}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="glass-premium rounded-2xl p-8 md:p-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircleQuestion className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Can&apos;t find what you&apos;re looking for? Book a discovery call
                and we&apos;ll answer all your questions personally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/book-demo"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Book a Discovery Call
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Ready to Get Started?"
          subtitle="Book a discovery call to see how XGrowthOS can transform your pipeline."
          primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
          className="py-20"
        />

        <Footer />
      </main>
    </SubtleBackground>
  )
}
