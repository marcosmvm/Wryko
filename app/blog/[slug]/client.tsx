'use client'

import { motion } from 'framer-motion'
import { Clock, User, ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { CTASection } from '@/components/marketing/cta-section'

interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publishedAt: string
  readTime: string
  featured?: boolean
}

const categories: Record<string, string> = {
  'ai-automation': 'AI & Automation',
  'lead-generation': 'Lead Generation',
  'sales-tips': 'Sales Tips',
  'industry-news': 'Industry News',
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  return (
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
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category */}
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-4">
              {categories[post.category] || post.category}
            </span>

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-8 border-b border-border">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
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
            {post.content.split('\n\n').map((paragraph, index) => {
              // Handle headings
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="font-heading text-2xl font-bold mt-10 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="font-heading text-xl font-semibold mt-8 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              }

              // Handle bullet lists
              if (paragraph.includes('\n- ')) {
                const lines = paragraph.split('\n')
                const intro = lines[0]
                const items = lines.slice(1).filter(line => line.startsWith('- '))

                return (
                  <div key={index}>
                    {intro && <p className="text-muted-foreground leading-relaxed mb-3">{intro}</p>}
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  </div>
                )
              }

              // Handle bold text patterns
              if (paragraph.includes('**')) {
                const parts = paragraph.split(/(\*\*[^*]+\*\*)/)
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="text-foreground font-semibold">{part.replace(/\*\*/g, '')}</strong>
                      }
                      return part
                    })}
                  </p>
                )
              }

              // Regular paragraphs
              if (paragraph.trim()) {
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                )
              }

              return null
            })}
          </motion.article>

          {/* Author Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 p-6 bg-muted/30 border border-border rounded-xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-primary">MM</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{post.author}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Founder & CEO at XGrowthOS. Building the future of autonomous B2B lead generation.
                </p>
                <Link
                  href="/about"
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Learn more about the author →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Lead Generation?"
        subtitle="See how XGrowthOS can help you generate qualified B2B meetings on autopilot."
        primaryCta={{ href: '/book-demo', label: 'Book Your Discovery Call' }}
      />

      <Footer />
    </main>
  )
}
