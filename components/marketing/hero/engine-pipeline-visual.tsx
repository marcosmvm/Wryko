'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Target, Brain, Zap, Eye, Users, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const engines = [
  { icon: Shield, label: 'Guardian', angle: -60 },
  { icon: Target, label: 'Architect', angle: -20 },
  { icon: Brain, label: 'Scientist', angle: 20 },
  { icon: Zap, label: 'Hunter', angle: 60 },
  { icon: Eye, label: 'Sentinel', angle: 100 },
]

interface EnginePipelineVisualProps {
  className?: string
}

export function EnginePipelineVisual({ className }: EnginePipelineVisualProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  const radius = 130

  return (
    <div
      className={cn(
        'relative w-full max-w-lg mx-auto aspect-square',
        className
      )}
    >
      {/* Outer glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-transparent to-transparent rounded-full" />

      {/* Pulsing rings */}
      {!reducedMotion && (
        <>
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
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/15"
          animate={reducedMotion ? {} : { scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-white font-heading font-bold text-lg">XG</span>
        </motion.div>
      </motion.div>

      {/* Engine nodes */}
      {engines.map((engine, index) => {
        const angleRad = (engine.angle * Math.PI) / 180
        const x = Math.cos(angleRad) * radius
        const y = Math.sin(angleRad) * radius
        const EngineIcon = engine.icon

        return (
          <motion.div
            key={engine.label}
            className="absolute w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg z-10"
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
          >
            <EngineIcon className="w-5 h-5 text-primary" />
          </motion.div>
        )
      })}

      {/* SVG connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {engines.map((engine, index) => {
          const angleRad = (engine.angle * Math.PI) / 180
          const x2 = 50 + Math.cos(angleRad) * 26
          const y2 = 50 + Math.sin(angleRad) * 26

          return (
            <motion.line
              key={engine.label}
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
    </div>
  )
}
