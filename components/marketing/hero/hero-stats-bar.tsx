'use client'

import { motion } from 'framer-motion'
import { Calendar, TrendingUp, Clock, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedCounter } from './animated-counter'

const iconMap = {
  Calendar,
  TrendingUp,
  Clock,
  BarChart3,
} as const

interface HeroStat {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  subtext: string
  iconName: keyof typeof iconMap
}

interface HeroStatsBarProps {
  stats: HeroStat[]
  className?: string
}

export function HeroStatsBar({ stats, className }: HeroStatsBarProps) {
  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.iconName]
        return (
          <motion.div
            key={stat.label}
            className="glass-card p-6 text-center hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl sm:text-4xl font-heading font-bold text-primary">
              <AnimatedCounter
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                duration={2}
              />
            </div>
            <div className="text-sm font-medium text-foreground mt-1">
              {stat.label}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {stat.subtext}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
