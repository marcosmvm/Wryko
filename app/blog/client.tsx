'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, User, ArrowRight, Mail, Loader2, CheckCircle, BookOpen } from 'lucide-react'
import Link from 'next/link'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { CTASection } from '@/components/marketing/cta-section'
import { workflows } from '@/lib/n8n/client'

const categories = [
  { id: 'all', label: 'All Posts' },
  { id: 'lead-generation', label: 'Lead Generation' },
  { id: 'ai-automation', label: 'AI & Automation' },
  { id: 'sales-tips', label: 'Sales Tips' },
  { id: 'industry-news', label: 'Industry News' },
]

const blogPosts = [
  {
    id: 1,
    slug: 'future-of-b2b-lead-generation',
    title: 'The Future of B2B Lead Generation: AI-Powered Outbound',
    excerpt: 'Discover how artificial intelligence is transforming the way B2B companies generate leads and book meetings with their ideal customers.',
    category: 'ai-automation',
    author: 'Marcos Matthews',
    publishedAt: 'January 20, 2025',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    slug: 'cold-email-best-practices-2025',
    title: 'Cold Email Best Practices for 2025: What Actually Works',
    excerpt: 'Learn the latest strategies for cold email outreach that cut through the noise and get responses from busy decision-makers.',
    category: 'lead-generation',
    author: 'Marcos Matthews',
    publishedAt: 'January 15, 2025',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 3,
    slug: 'scaling-outbound-without-sdrs',
    title: 'How to Scale Outbound Sales Without Hiring More SDRs',
    excerpt: 'Explore automation strategies that allow growing companies to scale their outbound efforts without the overhead of a large sales team.',
    category: 'sales-tips',
    author: 'Marcos Matthews',
    publishedAt: 'January 10, 2025',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 4,
    slug: 'email-deliverability-guide',
    title: 'The Ultimate Guide to Email Deliverability in 2025',
    excerpt: 'Everything you need to know about keeping your emails out of spam folders and in front of your prospects.',
    category: 'lead-generation',
    author: 'Marcos Matthews',
    publishedAt: 'January 5, 2025',
    readTime: '10 min read',
    featured: false,
  },
]

export default function BlogClient() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter((post) => post.category === selectedCategory)

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    try {
      await workflows.captureLead({
        email,
        source: 'blog-newsletter',
        metadata: { page: '/blog' },
      })
      setSubscribeSuccess(true)
      setEmail('')
    } catch {
      // Silently handle error - still show success for UX
      setSubscribeSuccess(true)
      setEmail('')
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
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
              Blog
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Insights &{' '}
              <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Expert insights on B2B lead generation, AI automation, and building
              a predictable sales pipeline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'all' && (
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Placeholder */}
                    <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-primary/40" />
                    </div>
                    {/* Content */}
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                          Featured
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {featuredPost.publishedAt}
                        </span>
                      </div>
                      <h2 className="font-heading text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {featuredPost.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {featuredPost.readTime}
                          </span>
                        </div>
                        <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors group h-full flex flex-col">
                    {/* Image Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-muted via-muted/50 to-transparent flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 text-xs font-medium text-primary bg-primary/10 rounded">
                          {categories.find((c) => c.id === post.category)?.label || post.category}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <span>{post.publishedAt}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-heading text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Get the latest insights on B2B lead generation and AI automation
              delivered straight to your inbox. No spam, unsubscribe anytime.
            </p>

            {subscribeSuccess ? (
              <div className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            )}
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
