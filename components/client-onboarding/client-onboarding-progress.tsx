'use client'

import { motion } from 'framer-motion'
import { Buildings, UsersThree, SlidersHorizontal, RocketLaunch, Check } from '@phosphor-icons/react'

interface ClientOnboardingProgressProps {
  currentStep: number
  totalSteps: number
}

const steps = [
  { label: 'Business', icon: Buildings },
  { label: 'Audience', icon: UsersThree },
  { label: 'Preferences', icon: SlidersHorizontal },
  { label: 'Launch', icon: RocketLaunch },
]

export function ClientOnboardingProgress({ currentStep, totalSteps }: ClientOnboardingProgressProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border mx-10" />

        {/* Progress line filled */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary mx-10"
          initial={{ width: '0%' }}
          animate={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ maxWidth: 'calc(100% - 5rem)' }}
        />

        {steps.slice(0, totalSteps).map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const Icon = step.icon

          return (
            <div key={step.label} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? 'hsl(var(--primary))'
                    : isCurrent
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--card))',
                  borderColor: isCompleted || isCurrent
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--border))',
                }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  isCurrent ? 'glow-pulse' : ''
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" weight="bold" />
                ) : (
                  <Icon
                    className={`w-5 h-5 ${
                      isCurrent ? 'text-white' : 'text-muted-foreground'
                    }`}
                    weight={isCurrent ? 'fill' : 'regular'}
                  />
                )}
              </motion.div>
              <span
                className={`text-xs mt-2 font-medium ${
                  isCurrent
                    ? 'text-primary'
                    : isCompleted
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
