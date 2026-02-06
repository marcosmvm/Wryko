'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GearSix,
  Brain,
  MagnifyingGlass,
  ChartLineUp,
  RocketLaunch,
  Check,
} from '@phosphor-icons/react'
import { Logo } from '@/components/ui/logo'

interface WelcomeLoaderProps {
  onComplete: () => void
}

const loadingStages = [
  { message: 'Setting up your workspace...', icon: GearSix, duration: 1500 },
  { message: 'Configuring AI engines...', icon: Brain, duration: 2000 },
  { message: 'Analyzing your target market...', icon: MagnifyingGlass, duration: 1800 },
  { message: 'Preparing your dashboard...', icon: ChartLineUp, duration: 1200 },
  { message: 'Almost ready...', icon: RocketLaunch, duration: 800 },
]

export function WelcomeLoader({ onComplete }: WelcomeLoaderProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const [completedStages, setCompletedStages] = useState<number[]>([])
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let elapsed = 0

    loadingStages.forEach((stage, index) => {
      // Start each stage
      setTimeout(() => {
        setCurrentStage(index)
      }, elapsed)

      elapsed += stage.duration

      // Complete each stage
      setTimeout(() => {
        setCompletedStages((prev) => [...prev, index])
      }, elapsed)
    })

    // Final completion
    setTimeout(() => {
      setIsComplete(true)
      setTimeout(onComplete, 600)
    }, elapsed + 400)
  }, [onComplete])

  const progress = Math.round(
    ((completedStages.length) / loadingStages.length) * 100
  )

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="w-full max-w-md mx-auto px-6 text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <Logo variant="lockup" size="md" />
            </motion.div>

            {/* Circular progress */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative w-28 h-28 mx-auto mb-8"
            >
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="6"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={Math.PI * 100}
                  initial={{ strokeDashoffset: Math.PI * 100 }}
                  animate={{
                    strokeDashoffset: Math.PI * 100 * (1 - progress / 100),
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary, var(--primary)))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-heading font-bold">{progress}%</span>
              </div>
            </motion.div>

            {/* Current stage message */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                {loadingStages[currentStage] && (
                  <div className="flex items-center justify-center gap-2">
                    {(() => {
                      const Icon = loadingStages[currentStage].icon
                      return <Icon className="w-5 h-5 text-primary animate-pulse" weight="duotone" />
                    })()}
                    <span className="text-sm font-medium text-foreground">
                      {loadingStages[currentStage].message}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Stage timeline */}
            <div className="space-y-3">
              {loadingStages.map((stage, index) => {
                const Icon = stage.icon
                const isCompleted = completedStages.includes(index)
                const isCurrent = currentStage === index && !isCompleted

                return (
                  <motion.div
                    key={stage.message}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-primary text-white'
                          : isCurrent
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" weight="bold" />
                      ) : (
                        <Icon className={`w-4 h-4 ${isCurrent ? 'animate-pulse' : ''}`} />
                      )}
                    </div>
                    <span
                      className={`text-sm text-left ${
                        isCompleted
                          ? 'text-foreground'
                          : isCurrent
                            ? 'text-foreground font-medium'
                            : 'text-muted-foreground'
                      }`}
                    >
                      {stage.message}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
