'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Stat {
  value: string
  label: string
  subtext?: string
}

interface StatsGridProps {
  stats: Stat[]
  columns?: 2 | 3 | 4
  className?: string
}

export function StatsGrid({ stats, columns = 4, className }: StatsGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  return (
    <motion.div
      className={cn('grid gap-8', gridCols[columns], className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <div className="text-3xl sm:text-4xl font-heading font-bold text-primary">
            {stat.value}
          </div>
          <div className="text-foreground font-medium mt-1">{stat.label}</div>
          {stat.subtext && (
            <div className="text-sm text-muted-foreground mt-1">{stat.subtext}</div>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
