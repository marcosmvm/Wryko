'use client'

import { motion } from 'framer-motion'
import { LucideIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface EngineCardProps {
  icon: LucideIcon
  name: string
  tagline: string
  description: string
  slug?: string
  index?: number
  variant?: 'default' | 'featured'
  showLearnMore?: boolean
}

export function EngineCard({
  icon: Icon,
  name,
  tagline,
  description,
  slug,
  index = 0,
  variant = 'default',
  showLearnMore = true,
}: EngineCardProps) {
  const content = (
    <>
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-heading font-semibold text-lg mb-1">{name}</h3>
      <p className="text-sm text-primary font-medium mb-2">{tagline}</p>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      {slug && showLearnMore && (
        <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
          Learn more
          <ArrowRight className="w-4 h-4" />
        </span>
      )}
    </>
  )

  const cardClasses = cn(
    'rounded-xl p-6 transition-all glow-border-hover',
    variant === 'default' && 'bg-card border border-border hover:border-primary/50',
    variant === 'featured' && 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20',
    slug && 'cursor-pointer hover:shadow-lg group'
  )

  if (slug) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <Link href={`/engines/${slug}`} className={cn('block', cardClasses)}>
          {content}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {content}
    </motion.div>
  )
}
