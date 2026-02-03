'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  ShieldCheck,
  Target,
  Brain,
  Lightning,
  Eye,
  ChartBar,
  Scales,
  BookOpen,
  Rocket,
  Pulse,
  Compass,
  Envelope,
  CheckCircle,
  Warning,
  Database,
  Users,
  Globe,
  FileText,
  Clock,
  TrendUp,
  Gear,
  MagnifyingGlass,
  ArrowRight,
} from '@phosphor-icons/react'

type EngineSlug =
  | 'the-guardian'
  | 'the-architect'
  | 'the-scientist'
  | 'the-hunter'
  | 'the-sentinel'
  | 'the-informant'
  | 'the-judge'
  | 'the-keeper'
  | 'the-launcher'
  | 'the-monitor'
  | 'the-navigator'

interface EngineIllustrationProps {
  slug: EngineSlug
  className?: string
}

// Icon configurations for each engine
const illustrationConfigs: Record<EngineSlug, { primary: typeof ShieldCheck; supporting: (typeof ShieldCheck)[] }> = {
  'the-guardian': { primary: ShieldCheck, supporting: [Envelope, CheckCircle, Database, Warning] },
  'the-architect': { primary: Target, supporting: [Brain, FileText, Envelope, Gear] },
  'the-scientist': { primary: Brain, supporting: [TrendUp, CheckCircle, ChartBar, Gear] },
  'the-hunter': { primary: Lightning, supporting: [Users, Globe, Envelope, ArrowRight] },
  'the-sentinel': { primary: Eye, supporting: [Globe, Users, Database, MagnifyingGlass] },
  'the-informant': { primary: ChartBar, supporting: [FileText, Envelope, Clock, TrendUp] },
  'the-judge': { primary: Scales, supporting: [Warning, CheckCircle, Gear, Pulse] },
  'the-keeper': { primary: BookOpen, supporting: [Brain, MagnifyingGlass, FileText, CheckCircle] },
  'the-launcher': { primary: Rocket, supporting: [Clock, Users, Envelope, CheckCircle] },
  'the-monitor': { primary: Pulse, supporting: [Warning, TrendUp, Users, Scales] },
  'the-navigator': { primary: Compass, supporting: [Users, Gear, FileText, CheckCircle] },
}

export function EngineIllustration({ slug, className }: EngineIllustrationProps) {
  const config = illustrationConfigs[slug]
  const PrimaryIcon = config.primary

  return (
    <motion.div
      className={cn(
        'relative w-full aspect-square max-w-md mx-auto',
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background gradient circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />

      {/* Radial glow behind center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.12) 0%, transparent 50%)',
        }}
      />

      {/* Animated rings with gradient borders */}
      <motion.div
        className="absolute inset-4 rounded-full border border-primary/20"
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-primary/15"
        animate={{ scale: [1, 1.03, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute inset-12 rounded-full border border-secondary/10"
        animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Center primary icon with glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative">
          {/* Glow pulse behind icon */}
          <motion.div
            className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/20 blur-xl"
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/25">
            <PrimaryIcon className="w-12 h-12 text-white" weight="duotone" />
          </div>
        </div>
      </motion.div>

      {/* Supporting icons orbiting around */}
      {config.supporting.map((SupportIcon, index) => {
        const angle = (index * 360) / config.supporting.length
        const delay = index * 0.2

        return (
          <motion.div
            key={index}
            className="absolute w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg hover:border-primary/30 transition-colors"
            style={{
              top: `calc(50% - 24px + ${Math.sin((angle * Math.PI) / 180) * 120}px)`,
              left: `calc(50% - 24px + ${Math.cos((angle * Math.PI) / 180) * 120}px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + delay, duration: 0.4 }}
            animate={{
              y: [0, -5, 0],
            }}
            whileHover={{ scale: 1.15, boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' }}
          >
            <SupportIcon className="w-6 h-6 text-primary" weight="duotone" />
          </motion.div>
        )
      })}

      {/* Connection lines with dash animation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {config.supporting.map((_, index) => {
          const angle = (index * 360) / config.supporting.length
          const x2 = 50 + Math.cos((angle * Math.PI) / 180) * 30
          const y2 = 50 + Math.sin((angle * Math.PI) / 180) * 30

          return (
            <motion.line
              key={index}
              x1="50%"
              y1="50%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="text-primary/25"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            />
          )
        })}
      </svg>
    </motion.div>
  )
}
