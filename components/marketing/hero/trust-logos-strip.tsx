'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Lightning, Clock } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface TrustLogosStripProps {
  className?: string
}

export function TrustLogosStrip({ className }: TrustLogosStripProps) {
  return (
    <motion.div
      className={cn('border-t border-border/50 pt-8', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-4">
        Built for growth-focused B2B teams
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" weight="duotone" />
          GDPR & CAN-SPAM Compliant
        </span>
        <span className="flex items-center gap-2">
          <Lightning className="w-4 h-4 text-primary" weight="duotone" />
          11 AI Engines
        </span>
        <span className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" weight="duotone" />
          14-Day Onboarding
        </span>
      </div>
    </motion.div>
  )
}
