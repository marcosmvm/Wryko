'use client'

import { motion } from 'framer-motion'
import { Calendar, TrendUp, Clock, ChartBar } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { AnimatedCounter } from './animated-counter'

const iconMap = {
  Calendar,
  TrendUp,
  Clock,
  BarChart3: ChartBar,
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

// Micro-visuals for each stat type
function EngineDots() {
  const colors = [
    'bg-primary', 'bg-secondary', 'bg-amber-500', 'bg-emerald-500',
    'bg-primary/80', 'bg-secondary/80', 'bg-amber-500/80', 'bg-emerald-500/80',
    'bg-primary/60', 'bg-secondary/60', 'bg-amber-500/60',
  ]
  return (
    <div className="flex items-center justify-center gap-1 mt-2">
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className={cn('w-1.5 h-1.5 rounded-full', color)}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
        />
      ))}
    </div>
  )
}

function OnboardingProgress() {
  return (
    <div className="w-full max-w-[100px] mx-auto mt-2">
      <div className="h-1 rounded-full bg-muted/30 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function PulsingActivity() {
  return (
    <div className="flex items-center justify-center mt-2">
      <svg width="80" height="16" viewBox="0 0 80 16" className="text-primary">
        <motion.path
          d="M0 8 L10 8 L15 3 L20 13 L25 5 L30 11 L35 8 L45 8 L50 3 L55 13 L60 5 L65 11 L70 8 L80 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1.5 }}
        />
      </svg>
    </div>
  )
}

function IntegrationIcons() {
  const names = ['In', 'Ap', 'HS', 'SF', 'Sl', 'n8']
  return (
    <div className="flex items-center justify-center gap-1 mt-2">
      {names.map((name, i) => (
        <motion.div
          key={name}
          className="w-4 h-4 rounded-sm bg-muted/30 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
        >
          <span className="text-[6px] font-bold text-muted-foreground/60">{name}</span>
        </motion.div>
      ))}
    </div>
  )
}

const microVisualMap: Record<string, React.FC> = {
  'AI Engines': EngineDots,
  Onboarding: OnboardingProgress,
  Monitoring: PulsingActivity,
  Integrations: IntegrationIcons,
}

export function HeroStatsBar({ stats, className }: HeroStatsBarProps) {
  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.iconName]
        const MicroVisual = microVisualMap[stat.label]
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
              <Icon className="w-5 h-5 text-primary" weight="duotone" />
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
            {MicroVisual && <MicroVisual />}
          </motion.div>
        )
      })}
    </div>
  )
}
