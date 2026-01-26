'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EngineCardProps {
  icon: LucideIcon
  name: string
  tagline: string
  description: string
  index?: number
  variant?: 'default' | 'featured'
}

export function EngineCard({
  icon: Icon,
  name,
  tagline,
  description,
  index = 0,
  variant = 'default',
}: EngineCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-xl p-6 transition-colors',
        variant === 'default' && 'bg-card border border-border hover:border-primary/50',
        variant === 'featured' && 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-heading font-semibold text-lg mb-1">{name}</h3>
      <p className="text-sm text-primary font-medium mb-2">{tagline}</p>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  )
}
