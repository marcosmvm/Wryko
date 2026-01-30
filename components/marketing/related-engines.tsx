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
        const suiteColor = engine.suite === 'lead-gen'
          ? 'text-primary bg-primary/10 border-primary/20'
          : 'text-secondary bg-secondary/10 border-secondary/20'

        return (
          <motion.div
            key={engine.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
          >
            <Link
              href={`/engines/${engine.slug}`}
              className="group block relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Gradient top border on hover */}
              <div className="h-0.5 bg-gradient-to-r from-primary via-secondary/60 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary transition-all">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', suiteColor)}>
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
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
