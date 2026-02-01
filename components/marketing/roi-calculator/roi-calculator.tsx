'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CalculatorForm } from './calculator-form'
import { CalculatorResults } from './calculator-results'
import { calculateROI, CalculatorInputs } from './industry-data'

interface ROICalculatorProps {
  className?: string
  variant?: 'default' | 'compact'
}

export function ROICalculator({ className, variant = 'default' }: ROICalculatorProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    salesReps: 3,
    averageDealSize: 50000,
    currentMeetings: 5,
    industry: 'saas',
  })

  const results = useMemo(() => calculateROI(inputs), [inputs])

  if (variant === 'compact') {
    return (
      <motion.div
        className={cn('glass-premium rounded-2xl p-6', className)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              ROI Calculator
            </h3>
            <p className="text-xs text-muted-foreground">
              See your potential results
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <CalculatorForm inputs={inputs} onChange={setInputs} />
          <div className="border-t border-border pt-6">
            <CalculatorResults results={results} />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn('glass-premium rounded-2xl p-8', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">
            ROI Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            See how Wryko can transform your pipeline
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <CalculatorForm inputs={inputs} onChange={setInputs} />
        <div className="lg:border-l lg:border-border lg:pl-8">
          <CalculatorResults results={results} />
        </div>
      </div>
    </motion.div>
  )
}
