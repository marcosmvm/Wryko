'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Robot, User, ShieldCheck } from '@phosphor-icons/react'

import { SectionHeading } from './section-heading'
import { collaborationRows, trustMessage } from '@/lib/data/human-ai'

interface TooltipData {
  text: string
  subtext: string
  x: number
  y: number
  theme: 'ai' | 'human' | 'area'
}

const themeStyles = {
  ai: {
    bg: 'bg-primary',
    text: 'text-white',
    sub: 'text-white/70',
    arrow: 'border-t-primary',
  },
  human: {
    bg: 'bg-amber-500',
    text: 'text-white',
    sub: 'text-white/70',
    arrow: 'border-t-amber-500',
  },
  area: {
    bg: 'bg-foreground',
    text: 'text-background',
    sub: 'text-background/70',
    arrow: 'border-t-foreground',
  },
}

interface HumanAIComparisonProps {
  showHeading?: boolean
  className?: string
}

export function HumanAIComparison({ showHeading = true, className }: HumanAIComparisonProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const showTooltip = (
    text: string,
    subtext: string,
    theme: TooltipData['theme'],
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (!sectionRef.current) return
    const sectionRect = sectionRef.current.getBoundingClientRect()
    const targetRect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      text,
      subtext,
      x: targetRect.left - sectionRect.left + targetRect.width / 2,
      y: targetRect.top - sectionRect.top,
      theme,
    })
  }

  const hideTooltip = () => setTooltip(null)

  return (
    <section className={className}>
      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            eyebrow="HOW IT WORKS"
            badge="Human + AI"
            title="AI Does the Heavy Lifting. Experts Provide the Strategy."
            highlight="Heavy Lifting"
            subtitle="The perfect balance of automation and human expertise for maximum results."
          />
        )}

        {/* Column headers */}
        <div className="hidden md:grid md:grid-cols-[1fr,40px,1fr] gap-4 mb-6 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Robot className="w-4 h-4 text-primary" weight="duotone" />
            </div>
            <span className="text-sm font-semibold text-foreground">AI Handles &middot; 24/7</span>
          </div>
          <div />
          <div className="flex items-center gap-2 justify-end">
            <span className="text-sm font-semibold text-foreground">Experts Provide</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <User className="w-4 h-4 text-amber-600" weight="duotone" />
            </div>
          </div>
        </div>

        {/* Collaboration rows */}
        <div className="space-y-3">
          {collaborationRows.map((row, index) => {
            const AreaIcon = row.icon
            return (
              <motion.div
                key={row.area}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                {/* Desktop: paired row */}
                <div className="hidden md:grid md:grid-cols-[1fr,40px,1fr] gap-4 items-center">
                  {/* AI side */}
                  <div
                    className="glass-card p-4 border-l-2 border-l-primary cursor-pointer transition-colors hover:border-l-primary/80 hover:bg-primary/[0.03]"
                    onMouseEnter={(e) => showTooltip(row.ai.task, row.ai.detail, 'ai', e)}
                    onMouseLeave={hideTooltip}
                  >
                    <p className="font-medium text-sm">{row.ai.task}</p>
                    <p className="text-xs text-muted-foreground mt-1">{row.ai.detail}</p>
                  </div>

                  {/* Center connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-primary/30 hover:scale-110"
                      onMouseEnter={(e) => showTooltip(row.area, `${row.ai.task} + ${row.human.task}`, 'area', e)}
                      onMouseLeave={hideTooltip}
                    >
                      <AreaIcon className="w-4 h-4 text-muted-foreground" weight="duotone" />
                    </div>
                  </div>

                  {/* Human side */}
                  <div
                    className="glass-card p-4 border-r-2 border-r-amber-500/50 cursor-pointer transition-colors hover:border-r-amber-500/80 hover:bg-amber-500/[0.03]"
                    onMouseEnter={(e) => showTooltip(row.human.task, row.human.detail, 'human', e)}
                    onMouseLeave={hideTooltip}
                  >
                    <p className="font-medium text-sm text-right">{row.human.task}</p>
                    <p className="text-xs text-muted-foreground mt-1 text-right">{row.human.detail}</p>
                  </div>
                </div>

                {/* Mobile: stacked card */}
                <div className="md:hidden glass-card p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AreaIcon className="w-4 h-4 text-muted-foreground" weight="duotone" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{row.area}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Robot className="w-3 h-3 text-primary" weight="duotone" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{row.ai.task}</p>
                      <p className="text-xs text-muted-foreground">{row.ai.detail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3 h-3 text-amber-600" weight="duotone" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{row.human.task}</p>
                      <p className="text-xs text-muted-foreground">{row.human.detail}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Trust Message */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-card">
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" weight="duotone" />
            <p className="text-sm text-muted-foreground">
              {trustMessage}
            </p>
          </div>
        </motion.div>

        {/* Top-level themed tooltip */}
        <AnimatePresence>
          {tooltip && (
            <motion.div
              className="absolute pointer-events-none z-[100]"
              style={{
                top: tooltip.y - 8,
                left: tooltip.x,
              }}
              initial={{ opacity: 0, y: 4, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 4, x: '-50%' }}
              transition={{ duration: 0.15 }}
            >
              <div className={`relative -translate-y-full rounded-lg px-3.5 py-2 text-center shadow-xl max-w-[220px] ${themeStyles[tooltip.theme].bg}`}>
                <div className={`text-[11px] font-semibold ${themeStyles[tooltip.theme].text}`}>{tooltip.text}</div>
                <div className={`text-[10px] mt-0.5 ${themeStyles[tooltip.theme].sub}`}>{tooltip.subtext}</div>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${themeStyles[tooltip.theme].arrow}`} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
