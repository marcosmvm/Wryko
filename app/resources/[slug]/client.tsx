'use client'

import { motion } from 'framer-motion'
import { Clock, ArrowLeft, Calendar, BookOpen, Mail, Table, FileText } from 'lucide-react'
import Link from 'next/link'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { CTASection } from '@/components/marketing/cta-section'
import { ResourceCard } from '@/components/marketing/resource-card'
import { SubtleBackground } from '@/components/backgrounds'

import { resources } from '@/lib/data/resources-data'
import { resourceContent } from '@/lib/data/resource-content'

const categoryLabels: Record<string, string> = {
  guide: 'Guide',
  template: 'Template',
  tool: 'Tool',
  'case-study': 'Case Study',
}

const categoryIcons: Record<string, typeof FileText> = {
  guide: BookOpen,
  template: Mail,
  tool: Table,
  'case-study': FileText,
}

export default function ResourcePageClient({ slug }: { slug: string }) {
  const resource = resources.find((r) => r.id === slug)!
  const content = resourceContent[slug]

  const CategoryIcon = categoryIcons[resource.category] || FileText

  // Get related resources: same category first, then featured, exclude current
  const relatedResources = resources
    .filter((r) => r.id !== slug)
    .sort((a, b) => {
      if (a.category === resource.category && b.category !== resource.category)
        return -1
      if (a.category !== resource.category && b.category === resource.category)
        return 1
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
    .slice(0, 3)

  return (
    <SubtleBackground showOrb>
      <main className="min-h-screen">
        <Navigation />

        {/* Header */}
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Link */}
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Resources
              </Link>

              {/* Category */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                  <CategoryIcon className="w-3.5 h-3.5" />
                  {categoryLabels[resource.category] || resource.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                {resource.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-6">
                {resource.description}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-8 border-b border-border">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {content.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Updated {content.lastUpdated}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="prose prose-neutral dark:prose-invert max-w-none"
            >
              {content.content.split('\n\n').map((paragraph, index) => {
                // Handle headings
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2
                      key={index}
                      className="font-heading text-2xl font-bold mt-10 mb-4"
                    >
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3
                      key={index}
                      className="font-heading text-xl font-semibold mt-8 mb-3"
                    >
                      {paragraph.replace('### ', '')}
                    </h3>
                  )
                }

                // Handle bullet lists
                if (paragraph.includes('\n- ')) {
                  const lines = paragraph.split('\n')
                  const intro = lines[0]
                  const items = lines
                    .slice(1)
                    .filter((line) => line.startsWith('- '))

                  return (
                    <div key={index}>
                      {intro && (
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          {intro}
                        </p>
                      )}
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {items.map((item, i) => {
                          const text = item.replace('- ', '')
                          // Handle bold within list items
                          if (text.includes('**')) {
                            const parts = text.split(/(\*\*[^*]+\*\*)/)
                            return (
                              <li key={i}>
                                {parts.map((part, j) => {
                                  if (
                                    part.startsWith('**') &&
                                    part.endsWith('**')
                                  ) {
                                    return (
                                      <strong
                                        key={j}
                                        className="text-foreground font-semibold"
                                      >
                                        {part.replace(/\*\*/g, '')}
                                      </strong>
                                    )
                                  }
                                  return part
                                })}
                              </li>
                            )
                          }
                          return <li key={i}>{text}</li>
                        })}
                      </ul>
                    </div>
                  )
                }

                // Handle standalone bullet lists (lines starting with -)
                if (paragraph.startsWith('- ')) {
                  const items = paragraph
                    .split('\n')
                    .filter((line) => line.startsWith('- '))
                  return (
                    <ul
                      key={index}
                      className="list-disc list-inside space-y-2 text-muted-foreground"
                    >
                      {items.map((item, i) => {
                        const text = item.replace('- ', '')
                        if (text.includes('**')) {
                          const parts = text.split(/(\*\*[^*]+\*\*)/)
                          return (
                            <li key={i}>
                              {parts.map((part, j) => {
                                if (
                                  part.startsWith('**') &&
                                  part.endsWith('**')
                                ) {
                                  return (
                                    <strong
                                      key={j}
                                      className="text-foreground font-semibold"
                                    >
                                      {part.replace(/\*\*/g, '')}
                                    </strong>
                                  )
                                }
                                return part
                              })}
                            </li>
                          )
                        }
                        return <li key={i}>{text}</li>
                      })}
                    </ul>
                  )
                }

                // Handle bold text patterns
                if (paragraph.includes('**')) {
                  const parts = paragraph.split(/(\*\*[^*]+\*\*)/)
                  return (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed mb-4"
                    >
                      {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return (
                            <strong
                              key={i}
                              className="text-foreground font-semibold"
                            >
                              {part.replace(/\*\*/g, '')}
                            </strong>
                          )
                        }
                        return part
                      })}
                    </p>
                  )
                }

                // Regular paragraphs
                if (paragraph.trim()) {
                  return (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  )
                }

                return null
              })}
            </motion.article>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-10">
                More Resources
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedResources.map((r, index) => (
                  <ResourceCard
                    key={r.id}
                    id={r.id}
                    title={r.title}
                    description={r.description}
                    icon={r.icon}
                    downloadUrl={r.downloadUrl}
                    fileType={r.fileType}
                    fileSize={r.fileSize}
                    featured={r.featured}
                    index={index}
                  />
                ))}
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
