'use client'

import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Clock } from 'lucide-react'
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
          title="Real Results, Real Companies"
          subtitle="See exactly what we've delivered for B2B companies like yours."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {caseSnippets.map((snippet, index) => (
            <motion.div
              key={snippet.company}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded">
                  {snippet.industry}
                </span>
                <span className="text-xs text-muted-foreground">{snippet.acv} ACV</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-semibold">{snippet.meetingsBooked} meetings/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{snippet.revenueClosed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{snippet.timeWindow}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{snippet.highlight}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/case-studies"
            className="text-primary font-medium hover:underline inline-flex items-center gap-1"
          >
            See all case studies with full details
          </Link>
        </div>
      </div>
    </section>
  )
}
