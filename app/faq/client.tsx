'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircleQuestion,
  Shield,
  ArrowRight,
  Cpu,
  Clock,
  Activity,
  Search,
} from 'lucide-react'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { CTASection } from '@/components/marketing/cta-section'
import { SectionHeading } from '@/components/marketing/section-heading'
import { FAQCategorySection } from '@/components/marketing/faq-category-section'
import { FAQSearch } from '@/components/marketing/faq-search'
import { FAQCategoryNav } from '@/components/marketing/faq-category-nav'
import { SubtleBackground } from '@/components/backgrounds'

import { faqCategories } from '@/lib/data/faq-data'

const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.items.length, 0)

const stats = [
  { value: '11', label: 'AI Engines', subtext: 'Working autonomously', icon: Cpu },
  { value: '14 Days', label: 'Onboarding', subtext: 'Signup to launch', icon: Clock },
  { value: '24/7', label: 'Autonomous', subtext: 'Always running', icon: Activity },
  { value: '90 Days', label: 'Pilot Period', subtext: 'Risk-free trial', icon: Shield },
]

export default function FAQClient() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredCategories = useMemo(() => {
    let categories = faqCategories

    if (activeCategory) {
      categories = categories.filter((c) => c.id === activeCategory)
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      categories = categories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.question.toLowerCase().includes(term) ||
              item.answer.toLowerCase().includes(term)
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    }

    return categories
  }, [searchTerm, activeCategory])

  const totalResults = filteredCategories.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  )

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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Help Center
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Frequently Asked{' '}
                <span className="gradient-text">Questions</span>
              </h1>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full" />
              </div>
              <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
                Everything you need to know about XGrowthOS, from how our
                platform works to pricing, integrations, and getting started.
              </p>
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                {totalQuestions} answers across {faqCategories.length} categories.
                Updated regularly.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search & Category Navigation */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <FAQSearch
              value={searchTerm}
              onChange={setSearchTerm}
              resultCount={totalResults}
              totalCount={totalQuestions}
            />
            <FAQCategoryNav
              categories={faqCategories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </section>

        {/* Quick Stats */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-card p-5 text-center rounded-xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl font-heading font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mt-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.subtext}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20 section-alt-2">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Knowledge Base"
              title="Browse by Category"
              highlight="Category"
              subtitle="Find answers organized by topic."
            />

            {filteredCategories.length === 0 ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">
                  No matching questions found
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try a different search term or{' '}
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setActiveCategory(null)
                    }}
                    className="text-primary hover:underline"
                  >
                    clear filters
                  </button>
                </p>
              </motion.div>
            ) : (
              <div className="space-y-12">
                {filteredCategories.map((category, index) => (
                  <FAQCategorySection
                    key={category.id}
                    title={category.title}
                    description={category.description}
                    icon={category.icon}
                    items={category.items}
                    searchTerm={searchTerm}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-gradient-to-br from-primary/8 via-primary/3 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12 text-center hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircleQuestion className="w-8 h-8 text-primary" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Still Have <span className="gradient-text">Questions</span>?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Can&apos;t find what you&apos;re looking for? Book a discovery
                call and we&apos;ll answer all your questions personally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/book-demo"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/15"
                >
                  Book a Discovery Call
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-muted transition-colors"
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
          highlightText="Get Started"
          subtitle="Book a discovery call to see how XGrowthOS can transform your pipeline."
          primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
          secondaryCta={{ href: '/how-it-works', label: 'See How It Works' }}
          showTrustLine
          urgencyText="Limited founding partner spots available"
          className="section-alt-2"
        />

        <Footer />
      </main>
    </SubtleBackground>
  )
}
