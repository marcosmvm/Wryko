'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Clock, ArrowRight, Quote } from 'lucide-react'
import Link from 'next/link'

import { SectionHeading } from '@/components/marketing/section-heading'
import { caseSnippets } from '@/lib/data/case-snippets'

interface CaseSnippetsSectionProps {
  className?: string
}

export function CaseSnippetsSection({ className }: CaseSnippetsSectionProps) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="SOCIAL PROOF"
          title="Real Results, Real Companies"
          highlight="Real Results"
          subtitle="See exactly what we've delivered for B2B companies like yours."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {caseSnippets.map((snippet, index) => (
            <motion.div
              key={snippet.company}
              className="glass-card p-6 border-t-2 border-t-secondary/40 hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/5 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Hero Stat */}
              <div className="mb-4">
                <span className="text-3xl font-bold gradient-text">
                  {snippet.meetingsBooked}
                </span>
                <span className="text-sm text-muted-foreground ml-2">meetings/month</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {snippet.industry}
                </span>
                <span className="text-xs text-muted-foreground">{snippet.acv} ACV</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium text-sm">{snippet.revenueClosed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{snippet.timeWindow}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{snippet.highlight}</p>

              {snippet.testimonialSnippet && (
                <div className="pt-3 border-t border-border/50">
                  <div className="flex items-start gap-2">
                    <Quote className="w-3 h-3 text-primary/50 flex-shrink-0 mt-1" />
                    <p className="text-xs italic text-muted-foreground">
                      &ldquo;{snippet.testimonialSnippet}&rdquo;
                    </p>
                  </div>
                  <p className="text-xs text-primary font-medium mt-1 ml-5">&mdash; {snippet.company}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            See all case studies with full details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
