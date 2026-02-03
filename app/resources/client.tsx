'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, FileText, Mail, Table } from 'lucide-react'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { CTASection } from '@/components/marketing/cta-section'
import { ResourceCard } from '@/components/marketing/resource-card'
import { SubtleBackground } from '@/components/backgrounds'

import {
  resources,
  resourceCategories,
  ResourceCategory,
} from '@/lib/data/resources-data'
import { cn } from '@/lib/utils'

export default function ResourcesClient() {
  const [selectedCategory, setSelectedCategory] = useState<
    ResourceCategory | 'all'
  >('all')

  const filteredResources =
    selectedCategory === 'all'
      ? resources
      : resources.filter((r) => r.category === selectedCategory)

  // Sort to show featured first
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

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
                Resources
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Free Tools & <span className="gradient-text">Resources</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Guides, templates, and tools to help you master B2B outbound.
                Download for free—no email required.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {resourceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Resource Stats */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {[
                { icon: BookOpen, value: '5+', label: 'Guides & Whitepapers' },
                { icon: Mail, value: '15+', label: 'Email Templates' },
                { icon: Table, value: '3', label: 'Calculators & Tools' },
                { icon: FileText, value: '2', label: 'Case Studies' },
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="glass-card p-4 text-center rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-xl font-heading font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {sortedResources.map((resource, index) => (
                <ResourceCard
                  key={resource.id}
                  id={resource.id}
                  title={resource.title}
                  description={resource.description}
                  icon={resource.icon}
                  downloadUrl={resource.downloadUrl}
                  fileType={resource.fileType}
                  fileSize={resource.fileSize}
                  featured={resource.featured}
                  index={index}
                />
              ))}
            </motion.div>

            {sortedResources.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-muted-foreground">
                  No resources found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="glass-premium rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                    Get New Resources First
                  </h2>
                  <p className="text-muted-foreground">
                    Subscribe to our newsletter and be the first to know when we
                    release new guides, templates, and tools.
                  </p>
                </div>
                <div>
                  <form className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-2">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Ready to Put These Resources to Work?"
          subtitle="Book a discovery call to see how Wryko applies these strategies at scale."
          primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
          className="py-20"
        />

        <Footer />
      </main>
    </SubtleBackground>
  )
}
