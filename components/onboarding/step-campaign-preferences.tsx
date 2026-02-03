'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Globe2, ShieldBan, ChevronDown, ChevronUp } from 'lucide-react'

export interface CampaignPreferencesData {
  blockedDomains: string
  blockedCountries: string[]
  defaultNiche: string
  nicheDefinitions: string
  targetIcp: string
}

interface StepCampaignPreferencesProps {
  data: CampaignPreferencesData
  onChange: (data: Partial<CampaignPreferencesData>) => void
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

const countryOptions = [
  { code: 'US', label: 'United States' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'CA', label: 'Canada' },
  { code: 'AU', label: 'Australia' },
  { code: 'DE', label: 'Germany' },
  { code: 'FR', label: 'France' },
  { code: 'IN', label: 'India' },
  { code: 'BR', label: 'Brazil' },
  { code: 'CN', label: 'China' },
  { code: 'RU', label: 'Russia' },
  { code: 'JP', label: 'Japan' },
  { code: 'KR', label: 'South Korea' },
  { code: 'MX', label: 'Mexico' },
  { code: 'NG', label: 'Nigeria' },
  { code: 'ZA', label: 'South Africa' },
]

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
}

export function StepCampaignPreferences({ data, onChange, errors }: StepCampaignPreferencesProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const toggleCountry = (code: string) => {
    const current = data.blockedCountries
    if (current.includes(code)) {
      onChange({ blockedCountries: current.filter((c) => c !== code) })
    } else {
      onChange({ blockedCountries: [...current, code] })
    }
  }

  return (
    <div className="space-y-5">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold mb-1">Campaign Preferences</h2>
        <p className="text-muted-foreground text-sm">
          Configure targeting rules and exclusions for your outreach campaigns.
        </p>
      </div>

      {/* Target ICP */}
      <motion.div
        custom={0}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <label htmlFor="targetIcp" className="block text-sm font-medium mb-2">
          <Target className="w-4 h-4 inline mr-1.5 text-primary" />
          Ideal Customer Profile
          <span className="text-muted-foreground text-xs ml-1">(optional)</span>
        </label>
        <textarea
          id="targetIcp"
          value={data.targetIcp}
          onChange={(e) => onChange({ targetIcp: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
          placeholder="Describe your ideal customer: e.g., B2B SaaS companies with 50-500 employees in North America, VP of Sales or CRO title..."
        />
      </motion.div>

      {/* Default Niche */}
      <motion.div
        custom={1}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
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
      <motion.div
        custom={2}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <label htmlFor="blockedDomains" className="block text-sm font-medium mb-2">
          <ShieldBan className="w-4 h-4 inline mr-1.5 text-primary" />
          Blocked Domains
          <span className="text-muted-foreground text-xs ml-1">(optional)</span>
        </label>
        <textarea
          id="blockedDomains"
          value={data.blockedDomains}
          onChange={(e) => onChange({ blockedDomains: e.target.value })}
          rows={2}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none font-mono text-sm"
          placeholder="competitor.com, partner.com, existing-client.com"
        />
        <p className="text-muted-foreground text-xs mt-1">
          Comma-separated list of domains to exclude from outreach.
        </p>
      </motion.div>

      {/* Blocked Countries */}
      <motion.div
        custom={3}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <label className="block text-sm font-medium mb-2">
          <Globe2 className="w-4 h-4 inline mr-1.5 text-primary" />
          Blocked Countries
          <span className="text-muted-foreground text-xs ml-1">(optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {countryOptions.map((country) => {
            const isSelected = data.blockedCountries.includes(country.code)
            return (
              <button
                key={country.code}
                type="button"
                onClick={() => toggleCountry(country.code)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-destructive/10 border-destructive/30 text-destructive'
                    : 'bg-card border-border text-muted-foreground hover:border-primary/30'
                }`}
              >
                {country.code} - {country.label}
              </button>
            )
          })}
        </div>
        {data.blockedCountries.length > 0 && (
          <p className="text-muted-foreground text-xs mt-1.5">
            {data.blockedCountries.length} {data.blockedCountries.length === 1 ? 'country' : 'countries'} blocked
          </p>
        )}
      </motion.div>

      {/* Advanced: Niche Definitions */}
      <motion.div
        custom={4}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
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
            </label>
            <textarea
              id="nicheDefinitions"
              value={data.nicheDefinitions}
              onChange={(e) => onChange({ nicheDefinitions: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none font-mono text-xs"
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
