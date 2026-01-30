'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { FAQAccordion } from './faq-accordion'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategorySectionProps {
  title: string
  icon: LucideIcon
  items: FAQItem[]
  className?: string
  index?: number
}

export function FAQCategorySection({
  title,
  icon: Icon,
  items,
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
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-semibold text-foreground">
          {title}
        </h2>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <FAQAccordion items={items} />
      </div>
    </motion.div>
  )
}
