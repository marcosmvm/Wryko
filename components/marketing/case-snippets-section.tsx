'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { SectionHeading } from '@/components/marketing/section-heading'

interface CaseSnippetsSectionProps {
  className?: string
}

export function CaseSnippetsSection({ className }: CaseSnippetsSectionProps) {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="EARLY ACCESS"
          title="Be Part of Our First Success Stories"
          highlight="First Success Stories"
          subtitle="We are onboarding our founding partners now. Join our pilot program and help shape the future of AI-powered lead generation."
        />

        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-card p-8 border-t-2 border-t-secondary/40">
            <p className="text-muted-foreground mb-6">
              As a new platform, we are building our track record with our inaugural cohort of clients.
              Apply for a pilot to experience Wryko firsthand and receive founding partner pricing.
            </p>
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/15"
            >
              Apply for a Pilot
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
