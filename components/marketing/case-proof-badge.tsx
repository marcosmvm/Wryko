'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface CaseProofBadgeProps {
  snippet: {
    stat: string
    context: string
    result: string
    source: string
  }
}

export function CaseProofBadge({ snippet }: CaseProofBadgeProps) {
  return (
    <motion.div
      className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-muted/50 border border-border rounded-full text-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <span className="font-semibold text-primary">{snippet.stat}</span>
      <span className="text-muted-foreground">for {snippet.context}</span>
      <span className="hidden sm:inline text-muted-foreground">-</span>
      <span className="font-medium">{snippet.result}</span>
      <Link
        href="/case-studies"
        className="text-primary hover:underline inline-flex items-center gap-1"
      >
        {snippet.source}
        <ArrowUpRight className="w-3 h-3" />
      </Link>
    </motion.div>
  )
}
