'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, User, ArrowLeft, Calendar } from '@phosphor-icons/react'
import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'

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
  featured: boolean
}

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" weight="bold" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" weight="bold" />
                {post.publishedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" weight="bold" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground">{post.excerpt}</p>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border/50">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" weight="duotone" />
              </div>
              <div>
                <p className="text-sm font-medium">{post.author}</p>
                <p className="text-xs text-muted-foreground">Wryko</p>
              </div>
            </div>
          </motion.header>

          {/* Content */}
          <motion.div
            className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-semibold prose-a:text-primary prose-strong:text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/^- (.+)$/gm, '<li>$1</li>')
                .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
                .replace(/\n{2,}/g, '</p><p>')
                .replace(/^(.+)$/gm, (match) => {
                  if (
                    match.startsWith('<h') ||
                    match.startsWith('<ul') ||
                    match.startsWith('<li') ||
                    match.startsWith('</') ||
                    match.trim() === ''
                  )
                    return match
                  return `<p>${match}</p>`
                }),
            }}
          />

          {/* Footer CTA */}
          <motion.div
            className="mt-16 pt-10 border-t border-border/50 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-heading font-semibold mb-3">
              Ready to automate your outbound?
            </h3>
            <p className="text-muted-foreground mb-6">
              See how Wryko&apos;s 11 AI engines can transform your lead generation.
            </p>
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              Book a Demo
            </Link>
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
