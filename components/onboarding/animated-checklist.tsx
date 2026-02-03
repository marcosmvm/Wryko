'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ChecklistItem {
  label: string
  status: 'complete' | 'pending' | 'auto'
  detail?: string
}

export interface ChecklistSection {
  title: string
  icon: LucideIcon
  items: ChecklistItem[]
}

interface AnimatedChecklistProps {
  sections: ChecklistSection[]
}

const statusConfig = {
  complete: {
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    label: 'Ready',
  },
  pending: {
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    label: 'Pending',
  },
  auto: {
    icon: Sparkles,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    label: "We'll handle this",
  },
}

export function AnimatedChecklist({ sections }: AnimatedChecklistProps) {
  const allItems = sections.flatMap((s) => s.items)
  const completedCount = allItems.filter((i) => i.status === 'complete' || i.status === 'auto').length
  const totalCount = allItems.length
  const percentage = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="space-y-4">
      {/* Progress summary */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
          {completedCount}/{totalCount} ready
        </span>
      </div>

      {/* Sections */}
      {sections.map((section, sIndex) => {
        const SectionIcon = section.icon
        return (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIndex * 0.1, duration: 0.3 }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            {/* Section header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border bg-muted/30">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <SectionIcon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm font-semibold">{section.title}</span>
              <span className="ml-auto text-[10px] font-medium text-muted-foreground">
                {section.items.filter((i) => i.status === 'complete' || i.status === 'auto').length}/
                {section.items.length}
              </span>
            </div>

            {/* Items */}
            <div className="divide-y divide-border">
              {section.items.map((item, iIndex) => {
                const cfg = statusConfig[item.status]
                const StatusIcon = cfg.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sIndex * 0.1 + iIndex * 0.05, duration: 0.25 }}
                    className="flex items-center gap-3 px-4 py-2.5"
                  >
                    <div className={`w-6 h-6 rounded-full ${cfg.bg} flex items-center justify-center shrink-0`}>
                      <StatusIcon className={`w-3.5 h-3.5 ${cfg.color}`} />
                    </div>
                    <span
                      className={`text-sm flex-1 ${
                        item.status === 'complete'
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.detail && (
                      <span className="text-[10px] text-muted-foreground font-mono">{item.detail}</span>
                    )}
                    <span className={`text-[10px] font-medium ${cfg.color}`}>{cfg.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
