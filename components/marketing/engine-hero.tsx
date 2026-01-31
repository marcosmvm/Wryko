'use client'

import { motion } from 'framer-motion'
import { LucideIcon, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface EngineStat {
  value: string
  label: string
  subtext?: string
}

interface EngineHeroProps {
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  suite: 'lead-gen' | 'csm'
  letter: string
  stats: EngineStat[]
  className?: string
}

export function EngineHero({
  name,
  tagline,
  description,
  icon: Icon,
  suite,
  letter,
  stats,
  className,
}: EngineHeroProps) {
  const suiteName = suite === 'lead-gen' ? 'Lead Generation Suite' : 'CSM Automation Suite'
  const suiteColor = suite === 'lead-gen' ? 'text-primary' : 'text-secondary'
  const suiteBg = suite === 'lead-gen' ? 'bg-primary/10 border-primary/20' : 'bg-secondary/10 border-secondary/20'

  return (
    <section className={cn('pt-32 pb-20 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to How It Works</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Suite badge with pulse dot */}
            <span className={cn(
              'inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium rounded-full border',
              suiteBg,
              suiteColor
            )}>
              <span className={cn(
                'w-1.5 h-1.5 rounded-full animate-pulse',
                suite === 'lead-gen' ? 'bg-primary' : 'bg-secondary'
              )} />
              {suiteName}
            </span>

            {/* Engine letter + name */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="label-text">Engine {letter}</span>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                  <span className="gradient-text">{name}</span>
                </h1>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xl text-primary font-medium mb-2">{tagline}</p>

            {/* Gradient underline */}
            <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full mb-6" />

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">{description}</p>

            {/* CTA - gradient primary button */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book-demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/15"
              >
                See It In Action
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-muted transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>

          {/* Right side - Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative bg-card border border-border rounded-xl p-6 text-center overflow-hidden hover:border-primary/30 transition-all"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {/* Gradient top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary/60 to-primary" />
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-foreground font-medium mt-1">{stat.label}</div>
                {stat.subtext && (
                  <div className="text-sm text-muted-foreground mt-1">{stat.subtext}</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
