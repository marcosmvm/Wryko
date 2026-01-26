'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { engineDetails, type EngineDetail } from '@/lib/data/engine-details'

interface RelatedEnginesProps {
  relatedSlugs: string[]
  className?: string
}

export function RelatedEngines({ relatedSlugs, className }: RelatedEnginesProps) {
  const relatedEngines = relatedSlugs
    .map((slug) => engineDetails[slug])
    .filter((engine): engine is EngineDetail => engine !== undefined)

  if (relatedEngines.length === 0) return null

  return (
    <div className={cn('grid md:grid-cols-3 gap-6', className)}>
      {relatedEngines.map((engine, index) => {
        const Icon = engine.icon
        const suiteBadge = engine.suite === 'lead-gen' ? 'Lead Gen' : 'CSM'

        return (
          <motion.div
            key={engine.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link
              href={`/engines/${engine.slug}`}
              className="group block bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {suiteBadge}
                </span>
              </div>

              <h4 className="font-heading font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                {engine.name}
              </h4>
              <p className="text-sm text-primary font-medium mb-2">{engine.tagline}</p>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {engine.heroDescription}
              </p>

              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
