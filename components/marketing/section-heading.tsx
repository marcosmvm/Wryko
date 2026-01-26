'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  badge?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
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
      {badge && (
        <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
        {title}
      </h2>
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
