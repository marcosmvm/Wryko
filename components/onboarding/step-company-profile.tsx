'use client'

import { motion } from 'framer-motion'
import { Building2, Globe, Phone, Users } from 'lucide-react'

export interface CompanyProfileData {
  companyName: string
  industry: string
  website: string
  phone: string
  companySize: string
}

interface StepCompanyProfileProps {
  data: CompanyProfileData
  onChange: (data: Partial<CompanyProfileData>) => void
  errors: Partial<Record<keyof CompanyProfileData, string>>
}

const industries = [
  'SaaS / Software',
  'IT Services',
  'Marketing / Advertising',
  'Financial Services',
  'Healthcare',
  'Manufacturing',
  'Real Estate',
  'E-commerce',
  'Consulting',
  'Education',
  'Recruiting / Staffing',
  'Legal',
  'Logistics',
  'Telecommunications',
  'Other',
]

const companySizes = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '500+', label: '500+ employees' },
]

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
}

export function StepCompanyProfile({ data, onChange, errors }: StepCompanyProfileProps) {
  return (
    <div className="space-y-5">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold mb-1">Company Profile</h2>
        <p className="text-muted-foreground text-sm">
          Tell us about your business so we can tailor your campaigns.
        </p>
      </div>

      <motion.div
        custom={0}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <label htmlFor="companyName" className="block text-sm font-medium mb-2">
          <Building2 className="w-4 h-4 inline mr-1.5 text-primary" />
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          value={data.companyName}
          onChange={(e) => onChange({ companyName: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
          placeholder="Acme Inc."
        />
        {errors.companyName && (
          <p className="text-destructive text-xs mt-1">{errors.companyName}</p>
        )}
      </motion.div>

      <motion.div
        custom={1}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <label htmlFor="industry" className="block text-sm font-medium mb-2">
          Industry <span className="text-destructive">*</span>
        </label>
        <select
          id="industry"
          value={data.industry}
          onChange={(e) => onChange({ industry: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
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

      <motion.div
        custom={2}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <label htmlFor="website" className="block text-sm font-medium mb-2">
          <Globe className="w-4 h-4 inline mr-1.5 text-primary" />
          Website
          <span className="text-muted-foreground text-xs ml-1">(optional)</span>
        </label>
        <input
          id="website"
          type="url"
          value={data.website}
          onChange={(e) => onChange({ website: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
          placeholder="https://yourcompany.com"
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          custom={3}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            <Phone className="w-4 h-4 inline mr-1.5 text-primary" />
            Phone
            <span className="text-muted-foreground text-xs ml-1">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </motion.div>

        <motion.div
          custom={4}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
        >
          <label htmlFor="companySize" className="block text-sm font-medium mb-2">
            <Users className="w-4 h-4 inline mr-1.5 text-primary" />
            Company Size
            <span className="text-muted-foreground text-xs ml-1">(optional)</span>
          </label>
          <select
            id="companySize"
            value={data.companySize}
            onChange={(e) => onChange({ companySize: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
          >
            <option value="">Select size</option>
            {companySizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </motion.div>
      </div>
    </div>
  )
}
