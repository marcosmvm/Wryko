'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface StepHeaderProps {
  icon: LucideIcon
  supportingIcons?: LucideIcon[]
  title: string
  subtitle: string
  stepNumber: number
}

export function StepHeader({ icon: Icon, supportingIcons = [], title, subtitle, stepNumber }: StepHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <div className="flex items-start gap-4">
        {/* Animated icon composition */}
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <Icon className="w-7 h-7 text-white" />
          </div>
          {/* Floating supporting icons */}
          {supportingIcons.map((SupportIcon, i) => {
            const positions = [
              { top: -6, right: -8 },
              { bottom: -4, right: -10 },
              { top: -4, left: -8 },
            ]
            const pos = positions[i % positions.length]
            return (
              <motion.div
                key={i}
                className="absolute w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center shadow-sm"
                style={pos}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 2.5 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              >
                <SupportIcon className="w-3.5 h-3.5 text-primary" />
              </motion.div>
            )
          })}
        </div>

        <div className="pt-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">
              Step {stepNumber}
            </span>
          </div>
          <h2 className="font-heading text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground text-sm mt-0.5">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  )
}
