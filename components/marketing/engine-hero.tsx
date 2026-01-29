'use client'

import { motion } from 'framer-motion'
import { LucideIcon, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
            {/* Suite badge */}
            <span className={cn('inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10', suiteColor)}>
              {suiteName}
            </span>

            {/* Engine letter + name */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground font-medium">Engine {letter}</span>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">{name}</h1>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xl text-primary font-medium mb-4">{tagline}</p>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">{description}</p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/book-demo">See It In Action</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
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
                className="bg-card border border-border rounded-xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
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
