'use client'

import { useState, useCallback, type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { Crosshair, X, Target, UsersThree, GlobeHemisphereWest } from '@phosphor-icons/react'
import { CountryPicker } from '@/components/onboarding/country-picker'
import type { TargetAudienceData } from '@/lib/types/client-onboarding'

interface StepTargetAudienceProps {
  data: TargetAudienceData
  onChange: (updates: Partial<TargetAudienceData>) => void
  errors: Partial<Record<keyof TargetAudienceData, string>>
}

const targetCompanySizes = [
  'Startups (1-10)',
  'Small Business (11-50)',
  'Mid-Market (51-200)',
  'Enterprise (201-1000)',
  'Large Enterprise (1000+)',
  'Any Size',
]

const goals = [
  { value: 'meetings', label: 'Book Qualified Meetings', description: 'Get face time with decision makers' },
  { value: 'leads', label: 'Generate Leads', description: 'Build a pipeline of interested prospects' },
  { value: 'brand_awareness', label: 'Brand Awareness', description: 'Get your name in front of key buyers' },
  { value: 'pipeline_growth', label: 'Pipeline Growth', description: 'Increase overall sales pipeline value' },
] as const

const fieldVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3 },
  }),
}

export function StepTargetAudience({ data, onChange, errors }: StepTargetAudienceProps) {
  const [industryInput, setIndustryInput] = useState('')

  const addIndustry = useCallback(
    (raw: string) => {
      const value = raw.trim()
      if (!value) return
      if (!data.targetIndustries.includes(value)) {
        onChange({ targetIndustries: [...data.targetIndustries, value] })
      }
      setIndustryInput('')
    },
    [data.targetIndustries, onChange]
  )

  const removeIndustry = (industry: string) => {
    onChange({ targetIndustries: data.targetIndustries.filter((i) => i !== industry) })
  }

  const handleIndustryKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (industryInput.trim()) addIndustry(industryInput)
    }
    if (e.key === 'Backspace' && !industryInput && data.targetIndustries.length > 0) {
      onChange({ targetIndustries: data.targetIndustries.slice(0, -1) })
    }
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
            <Crosshair className="w-7 h-7 text-white" weight="fill" />
          </div>
          <div className="pt-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">
              Step 2
            </span>
            <h2 className="font-heading text-xl font-semibold">Target Audience</h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Define who you want to reach. Our AI engines will use this to find the right prospects.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="block text-sm font-medium mb-2">
            Ideal Customer Profile
          </label>
          <textarea
            value={data.idealCustomerProfile}
            onChange={(e) => onChange({ idealCustomerProfile: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
            placeholder="e.g., B2B SaaS companies with 50-500 employees, Series A-C funded, headquartered in North America..."
          />
          <p className="text-xs text-muted-foreground mt-1">
            Describe your ideal customer in detail. The more specific, the better our targeting.
          </p>
        </motion.div>

        <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Target className="w-4 h-4 text-primary" />
            Target Industries
          </label>
          <div className="flex flex-wrap items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-background transition-colors min-h-[46px] focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary">
            {data.targetIndustries.map((industry) => (
              <span
                key={industry}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-sm font-medium text-primary"
              >
                {industry}
                <button
                  type="button"
                  onClick={() => removeIndustry(industry)}
                  className="text-primary/60 hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={industryInput}
              onChange={(e) => setIndustryInput(e.target.value)}
              onKeyDown={handleIndustryKeyDown}
              onBlur={() => { if (industryInput.trim()) addIndustry(industryInput) }}
              placeholder={data.targetIndustries.length === 0 ? 'Type and press Enter...' : ''}
              className="flex-1 min-w-[140px] bg-transparent outline-none text-sm placeholder:text-muted-foreground/50"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Press Enter or comma to add. e.g., SaaS, FinTech, Healthcare
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <UsersThree className="w-4 h-4 text-primary" />
              Target Company Size
            </label>
            <select
              value={data.targetCompanySize}
              onChange={(e) => onChange({ targetCompanySize: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
            >
              <option value="">Select size range</option>
              {targetCompanySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <GlobeHemisphereWest className="w-4 h-4 text-primary" />
            Target Geographies
          </label>
          <CountryPicker
            selected={data.targetGeographies}
            onChange={(codes) => onChange({ targetGeographies: codes })}
          />
        </motion.div>

        <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="block text-sm font-medium mb-3">
            Primary Goal <span className="text-destructive">*</span>
          </label>
          {errors.primaryGoal && (
            <p className="text-destructive text-xs mb-2">{errors.primaryGoal}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {goals.map((goal) => (
              <button
                key={goal.value}
                type="button"
                onClick={() => onChange({ primaryGoal: goal.value })}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  data.primaryGoal === goal.value
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border hover:border-primary/30 bg-background'
                }`}
              >
                <span className="text-sm font-medium block">{goal.label}</span>
                <span className="text-xs text-muted-foreground mt-0.5 block">
                  {goal.description}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
