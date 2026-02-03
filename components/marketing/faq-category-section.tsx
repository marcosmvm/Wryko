'use client'

import { motion } from 'framer-motion'
import { type Icon } from '@phosphor-icons/react'
import { FAQAccordion } from './faq-accordion'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategorySectionProps {
  title: string
  description?: string
  icon: Icon
  items: FAQItem[]
  searchTerm?: string
  className?: string
  index?: number
}

export function FAQCategorySection({
  title,
  description,
  icon: Icon,
  items,
  searchTerm,
  className,
  index = 0,
}: FAQCategorySectionProps) {
  return (
    <motion.div
      className={cn('space-y-6', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-primary" weight="duotone" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              {title}
            </h2>
            <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5 shrink-0">
              {items.length} questions
            </span>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>

      <div className="glass-card rounded-xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="p-6">
          <FAQAccordion items={items} searchTerm={searchTerm} />
        </div>
      </div>
    </motion.div>
  )
}
