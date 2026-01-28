'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!highlight) return title
    const index = title.indexOf(highlight)
    if (index === -1) return title
    const before = title.slice(0, index)
    const after = title.slice(index + highlight.length)
    return (
      <>
        {before}
        <span className="gradient-text">{highlight}</span>
        {after}
      </>
    )
  }

  return (
    <motion.div
      className={cn(
        'mb-12',
        centered && 'text-center',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && (
        <span className="label-text mb-3 block">
          {eyebrow}
        </span>
      )}
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {badge}
        </span>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
        {renderTitle()}
      </h2>
      {centered && (
        <div className="flex justify-center mb-4">
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-emerald-400 rounded-full" />
        </div>
      )}
      {subtitle && (
        <p className={cn(
          'text-muted-foreground text-lg',
          centered && 'max-w-2xl mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
