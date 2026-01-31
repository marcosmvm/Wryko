'use client'

import { motion } from 'framer-motion'
import { LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FAQCategory } from '@/lib/data/faq-data'

interface FAQCategoryNavProps {
  categories: FAQCategory[]
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
  className?: string
}

export function FAQCategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: FAQCategoryNavProps) {
  const allItems = [
    { id: null, title: 'All', icon: LayoutGrid, count: categories.reduce((sum, c) => sum + c.items.length, 0) },
    ...categories.map((c) => ({ id: c.id as string | null, title: c.title, icon: c.icon, count: c.items.length })),
  ]

  return (
    <motion.div
      className={cn('flex flex-wrap justify-center gap-2.5', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {allItems.map((item, index) => {
        const Icon = item.icon
        const isActive = activeCategory === item.id

        return (
          <motion.button
            key={item.id ?? 'all'}
            onClick={() => onCategoryChange(item.id)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all',
              isActive
                ? 'bg-primary/10 border-primary/20 text-primary shadow-sm shadow-primary/5'
                : 'bg-card/50 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground'
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{item.title}</span>
            <span className={cn(
              'text-xs rounded-full px-1.5 py-0.5',
              isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
            )}>
              {item.count}
            </span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
