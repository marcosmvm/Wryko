'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, ShieldBan, Globe2, ChevronDown, ChevronUp } from 'lucide-react'
import { StepHeader } from './step-header'
import { DomainTagInput } from './domain-tag-input'
import { CountryPicker } from './country-picker'

export interface CampaignPreferencesData {
  blockedDomains: string[]
  blockedCountries: string[]
  defaultNiche: string
  nicheDefinitions: string
}

interface StepCampaignPrefsProps {
  data: CampaignPreferencesData
  onChange: (updates: Partial<CampaignPreferencesData>) => void
  errors: Partial<Record<keyof CampaignPreferencesData, string>>
}

const niches = [
  'General',
  'SaaS',
  'E-commerce',
  'FinTech',
  'HealthTech',
  'EdTech',
  'Real Estate',
  'Professional Services',
  'Manufacturing',
  'Agency',
  'Custom',
]

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
}

export function StepCampaignPrefs({ data, onChange, errors }: StepCampaignPrefsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="space-y-5">
      <StepHeader
        icon={Target}
        supportingIcons={[ShieldBan, Globe2]}
        title="Campaign Preferences"
        subtitle="Configure targeting rules and exclusions for your outreach campaigns."
        stepNumber={4}
      />

      {/* Default Niche */}
      <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
        <label htmlFor="defaultNiche" className="block text-sm font-medium mb-2">
          Default Niche
        </label>
        <select
          id="defaultNiche"
          value={data.defaultNiche}
          onChange={(e) => onChange({ defaultNiche: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
        >
          {niches.map((niche) => (
            <option key={niche} value={niche}>
              {niche}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Blocked Domains */}
      <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-medium mb-2">
          <ShieldBan className="w-4 h-4 inline mr-1.5 text-primary" />
          Blocked Domains
          <span className="text-muted-foreground text-xs ml-1">(optional)</span>
        </label>
        <DomainTagInput
          domains={data.blockedDomains}
          onChange={(domains) => onChange({ blockedDomains: domains })}
          placeholder="competitor.com, partner.com"
          error={errors.blockedDomains}
        />
      </motion.div>

      {/* Blocked Countries */}
      <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
        <label className="block text-sm font-medium mb-2">
          <Globe2 className="w-4 h-4 inline mr-1.5 text-primary" />
          Blocked Countries
          <span className="text-muted-foreground text-xs ml-1">(optional)</span>
        </label>
        <CountryPicker
          selected={data.blockedCountries}
          onChange={(codes) => onChange({ blockedCountries: codes })}
        />
      </motion.div>

      {/* Advanced: Niche Definitions */}
      <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          Advanced Settings
        </button>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3"
          >
            <label htmlFor="nicheDefinitions" className="block text-sm font-medium mb-2">
              Niche Definitions (JSON)
              <span className="text-muted-foreground text-xs ml-1">
                — Custom niche classification rules
              </span>
            </label>
            <textarea
              id="nicheDefinitions"
              value={data.nicheDefinitions}
              onChange={(e) => onChange({ nicheDefinitions: e.target.value })}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none font-mono text-xs ${
                errors.nicheDefinitions ? 'border-destructive' : 'border-border'
              }`}
              placeholder='{"niches": [{"name": "SaaS", "keywords": ["software", "cloud"]}]}'
            />
            {errors.nicheDefinitions && (
              <p className="text-destructive text-xs mt-1">{errors.nicheDefinitions}</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
