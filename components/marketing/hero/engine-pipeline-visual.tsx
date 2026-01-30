'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Target, Brain, Zap, Eye, BarChart3, Scale, BookOpen, Rocket, Activity, Compass, Users, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'

const leadGenEngines = [
  { icon: Shield, label: 'The Guardian', desc: 'Compliance & deliverability protection', angle: -60 },
  { icon: Target, label: 'The Architect', desc: 'AI-powered campaign design', angle: -20 },
  { icon: Brain, label: 'The Scientist', desc: 'Continuous A/B test optimization', angle: 20 },
  { icon: Zap, label: 'The Hunter', desc: 'Expands leads from positive replies', angle: 60 },
  { icon: Eye, label: 'The Sentinel', desc: 'Identifies anonymous website visitors', angle: 100 },
]

const csmEngines = [
  { icon: BarChart3, label: 'The Informant', desc: 'Automated weekly performance reports', angle: -75 },
  { icon: Scale, label: 'The Judge', desc: 'Issue detection & auto-healing', angle: -35 },
  { icon: BookOpen, label: 'The Keeper', desc: 'AI knowledge brain for instant answers', angle: 5 },
  { icon: Rocket, label: 'The Launcher', desc: 'Automated client onboarding', angle: 60 },
  { icon: Activity, label: 'The Monitor', desc: 'Churn risk detection & alerts', angle: 100 },
  { icon: Compass, label: 'The Navigator', desc: 'Self-serve client portal', angle: 140 },
]

interface TooltipData {
  label: string
  desc: string
  x: number
  y: number
}

interface EnginePipelineVisualProps {
  className?: string
}

export function EnginePipelineVisual({ className }: EnginePipelineVisualProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  const innerRadius = 120
  const outerRadius = 180

  const handleMouseEnter = (
    label: string,
    desc: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const nodeRect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      label,
      desc,
      x: nodeRect.left - containerRect.left + nodeRect.width / 2,
      y: nodeRect.top - containerRect.top,
    })
  }

  const handleMouseLeave = () => setTooltip(null)

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full max-w-xl mx-auto aspect-square',
        className
      )}
    >
      {/* Outer glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-transparent to-transparent rounded-full" />

      {/* Pulsing rings */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/8"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-primary/15"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-10 rounded-full border border-primary/10"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.div
            className="absolute inset-16 rounded-full border border-primary/8"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </>
      )}

      {/* Input node: Your ICP */}
      <motion.div
        className="absolute top-2 left-2 flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 shadow-lg z-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <Users className="w-4 h-4 text-blue-500" />
        </div>
        <div>
          <div className="text-xs font-semibold text-foreground">Your ICP</div>
          <div className="text-[10px] text-muted-foreground">Targeted leads</div>
        </div>
      </motion.div>

      {/* Output node: Qualified Meetings */}
      <motion.div
        className="absolute bottom-2 right-2 flex items-center gap-2 bg-card border border-primary/30 rounded-xl px-3 py-2 shadow-lg shadow-primary/10 z-10"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Calendar className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="text-xs font-semibold text-primary">Qualified Meetings</div>
          <div className="text-[10px] text-muted-foreground">Booked on your calendar</div>
        </div>
      </motion.div>

      {/* Central hub */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div
          className="w-20 h-20 rounded-2xl shadow-xl shadow-primary/15"
          animate={reducedMotion ? {} : { scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Logo variant="icon" size="xl" />
        </motion.div>
      </motion.div>

      {/* Inner ring: Lead-gen engines */}
      {leadGenEngines.map((engine, index) => {
        const angleRad = (engine.angle * Math.PI) / 180
        const x = Math.cos(angleRad) * innerRadius
        const y = Math.sin(angleRad) * innerRadius
        const EngineIcon = engine.icon

        return (
          <motion.div
            key={engine.label}
            className="absolute w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg z-10 cursor-pointer"
            style={{
              top: `calc(50% - 22px + ${y}px)`,
              left: `calc(50% - 22px + ${x}px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            animate={reducedMotion ? {} : { y: [0, -4, 0] }}
            whileHover={{ scale: 1.1 }}
            onMouseEnter={(e) => handleMouseEnter(engine.label, engine.desc, e)}
            onMouseLeave={handleMouseLeave}
          >
            <EngineIcon className="w-5 h-5 text-primary" />
          </motion.div>
        )
      })}

      {/* Outer ring: CSM engines */}
      {csmEngines.map((engine, index) => {
        const angleRad = (engine.angle * Math.PI) / 180
        const x = Math.cos(angleRad) * outerRadius
        const y = Math.sin(angleRad) * outerRadius
        const EngineIcon = engine.icon

        return (
          <motion.div
            key={engine.label}
            className="absolute w-9 h-9 rounded-lg bg-card/80 border border-primary/15 flex items-center justify-center shadow-md z-10 cursor-pointer"
            style={{
              top: `calc(50% - 18px + ${y}px)`,
              left: `calc(50% - 18px + ${x}px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + index * 0.08, duration: 0.4 }}
            animate={reducedMotion ? {} : { y: [0, -3, 0] }}
            whileHover={{ scale: 1.15 }}
            onMouseEnter={(e) => handleMouseEnter(engine.label, engine.desc, e)}
            onMouseLeave={handleMouseLeave}
          >
            <EngineIcon className="w-4 h-4 text-primary/60" />
          </motion.div>
        )
      })}

      {/* SVG connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Inner ring orbit path */}
        <motion.circle
          cx="50%"
          cy="50%"
          r="20.8%"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3 6"
          className="text-primary/8"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        {/* Outer ring orbit path */}
        <motion.circle
          cx="50%"
          cy="50%"
          r="31.2%"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          className="text-primary/10"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 1.0 }}
        />

        {/* Center to inner ring lines */}
        {leadGenEngines.map((engine, index) => {
          const angleRad = (engine.angle * Math.PI) / 180
          const x2 = 50 + Math.cos(angleRad) * 21
          const y2 = 50 + Math.sin(angleRad) * 21

          return (
            <motion.line
              key={`inner-${engine.label}`}
              x1="50%"
              y1="50%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/20"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            />
          )
        })}

        {/* Outer to inner ring connector lines */}
        {csmEngines.map((engine, index) => {
          const angleRad = (engine.angle * Math.PI) / 180
          const x1 = 50 + Math.cos(angleRad) * 31.2
          const y1 = 50 + Math.sin(angleRad) * 31.2
          const x2 = 50 + Math.cos(angleRad) * 23.5
          const y2 = 50 + Math.sin(angleRad) * 23.5

          return (
            <motion.line
              key={`outer-${engine.label}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2 4"
              className="text-primary/12"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0 + index * 0.08, duration: 0.4 }}
            />
          )
        })}

        {/* Flow line: input to center */}
        <motion.line
          x1="15%"
          y1="15%"
          x2="46%"
          y2="46%"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="text-blue-500/30 animate-dash-flow"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />

        {/* Flow line: center to output */}
        <motion.line
          x1="54%"
          y1="54%"
          x2="82%"
          y2="85%"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="text-primary/30 animate-dash-flow"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.6 }}
        />
      </svg>

      {/* Floating data particles */}
      {!reducedMotion && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`particle-in-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-500/60 z-20"
              style={{ top: '15%', left: '15%' }}
              animate={{
                top: ['15%', '47%'],
                left: ['15%', '47%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.7,
              }}
            />
          ))}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`particle-out-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/60 z-20"
              style={{ top: '53%', left: '53%' }}
              animate={{
                top: ['53%', '85%'],
                left: ['53%', '82%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.7,
              }}
            />
          ))}
        </>
      )}

      {/* Top-level tooltip — rendered above everything */}
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
            <div className="relative -translate-y-full rounded-lg bg-foreground px-3 py-2 text-center shadow-xl max-w-[200px]">
              <div className="text-[11px] font-semibold text-background">{tooltip.label}</div>
              <div className="text-[10px] text-background/70 mt-0.5">{tooltip.desc}</div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
