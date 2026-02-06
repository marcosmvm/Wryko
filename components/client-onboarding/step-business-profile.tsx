'use client'

import { motion } from 'framer-motion'
import { Buildings, Briefcase, Globe, UsersThree } from '@phosphor-icons/react'
import type { BusinessProfileData } from '@/lib/types/client-onboarding'

interface StepBusinessProfileProps {
  data: BusinessProfileData
  onChange: (updates: Partial<BusinessProfileData>) => void
  errors: Partial<Record<keyof BusinessProfileData, string>>
  userName: string
}

const industries = [
  'Technology / SaaS',
  'Financial Services',
  'Healthcare',
  'Manufacturing',
  'Real Estate',
  'Professional Services',
  'E-Commerce / Retail',
  'Education',
  'Media / Advertising',
  'Logistics / Supply Chain',
  'Energy / Utilities',
  'Telecommunications',
  'Construction',
  'Hospitality',
  'Non-Profit',
  'Other',
]

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees',
]

const fieldVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3 },
  }),
}

export function StepBusinessProfile({ data, onChange, errors, userName }: StepBusinessProfileProps) {
  const firstName = userName.split(' ')[0]

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
            <Buildings className="w-7 h-7 text-white" weight="fill" />
          </div>
          <div className="pt-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">
              Step 1
            </span>
            <h2 className="font-heading text-xl font-semibold">
              {firstName ? `Welcome, ${firstName}!` : 'Business Profile'}
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Tell us about your company so we can tailor your experience.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="block text-sm font-medium mb-2">
            Company Name <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Buildings className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={data.companyName}
              onChange={(e) => onChange({ companyName: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                errors.companyName ? 'border-destructive' : 'border-border'
              }`}
              placeholder="Acme Inc."
            />
          </div>
          {errors.companyName && (
            <p className="text-destructive text-xs mt-1">{errors.companyName}</p>
          )}
        </motion.div>

        <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="block text-sm font-medium mb-2">
            Industry <span className="text-destructive">*</span>
          </label>
          <select
            value={data.industry}
            onChange={(e) => onChange({ industry: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none ${
              errors.industry ? 'border-destructive' : 'border-border'
            }`}
          >
            <option value="">Select your industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="text-destructive text-xs mt-1">{errors.industry}</p>
          )}
        </motion.div>

        <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="block text-sm font-medium mb-2">Company Website</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="url"
              value={data.website}
              onChange={(e) => onChange({ website: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="https://acme.com"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium mb-2">Company Size</label>
            <div className="relative">
              <UsersThree className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={data.companySize}
                onChange={(e) => onChange({ companySize: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
              >
                <option value="">Select size</option>
                {companySizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
            <label className="block text-sm font-medium mb-2">Your Role / Title</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={data.roleTitle}
                onChange={(e) => onChange({ roleTitle: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="VP of Sales"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
