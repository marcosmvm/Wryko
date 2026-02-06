'use client'

import { motion } from 'framer-motion'
import { Sliders, ChatText, CalendarBlank, X } from '@phosphor-icons/react'
import { DomainTagInput } from '@/components/onboarding/domain-tag-input'
import type { CampaignPrefsData } from '@/lib/types/client-onboarding'

interface StepCampaignPreferencesProps {
  data: CampaignPrefsData
  onChange: (updates: Partial<CampaignPrefsData>) => void
  errors: Partial<Record<keyof CampaignPrefsData, string>>
}

const leadTargets = [
  { value: '50', label: '50 leads/month', description: 'Getting started' },
  { value: '100', label: '100 leads/month', description: 'Steady growth' },
  { value: '250', label: '250 leads/month', description: 'Scaling up' },
  { value: '500', label: '500 leads/month', description: 'High volume' },
  { value: '1000+', label: '1,000+ leads/month', description: 'Enterprise scale' },
]

const communicationStyles = [
  {
    value: 'professional',
    label: 'Professional',
    description: 'Formal and polished. Best for enterprise and regulated industries.',
  },
  {
    value: 'conversational',
    label: 'Conversational',
    description: 'Warm and approachable. Best for building rapport with mid-market.',
  },
  {
    value: 'direct',
    label: 'Direct',
    description: 'Concise and to the point. Best for busy executives and founders.',
  },
] as const

const crmTools = [
  'HubSpot',
  'Salesforce',
  'Pipedrive',
  'Zoho CRM',
  'Monday.com',
  'Close',
  'None',
]

const fieldVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3 },
  }),
}

export function StepCampaignPreferences({ data, onChange, errors }: StepCampaignPreferencesProps) {
  const toggleTool = (tool: string) => {
    if (tool === 'None') {
      onChange({ existingTools: data.existingTools.includes('None') ? [] : ['None'] })
      return
    }
    const filtered = data.existingTools.filter((t) => t !== 'None')
    if (filtered.includes(tool)) {
      onChange({ existingTools: filtered.filter((t) => t !== tool) })
    } else {
      onChange({ existingTools: [...filtered, tool] })
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
            <Sliders className="w-7 h-7 text-white" weight="fill" />
          </div>
          <div className="pt-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">
              Step 3
            </span>
            <h2 className="font-heading text-xl font-semibold">Campaign Preferences</h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Configure how you want your outreach campaigns to run.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-5">
        <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="block text-sm font-medium mb-3">Monthly Lead Volume</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {leadTargets.map((target) => (
              <button
                key={target.value}
                type="button"
                onClick={() => onChange({ monthlyLeadTarget: target.value })}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  data.monthlyLeadTarget === target.value
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border hover:border-primary/30 bg-background'
                }`}
              >
                <span className="text-sm font-medium block">{target.label}</span>
                <span className="text-xs text-muted-foreground">{target.description}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="flex items-center gap-2 text-sm font-medium mb-3">
            <ChatText className="w-4 h-4 text-primary" />
            Communication Style
          </label>
          <div className="space-y-2">
            {communicationStyles.map((style) => (
              <button
                key={style.value}
                type="button"
                onClick={() => onChange({ communicationStyle: style.value })}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  data.communicationStyle === style.value
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border hover:border-primary/30 bg-background'
                }`}
              >
                <span className="text-sm font-medium">{style.label}</span>
                <span className="text-xs text-muted-foreground block mt-0.5">
                  {style.description}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="block text-sm font-medium mb-2">
            Domains to Exclude from Outreach
          </label>
          <DomainTagInput
            domains={data.excludedDomains}
            onChange={(domains) => onChange({ excludedDomains: domains })}
            placeholder="competitor.com"
          />
        </motion.div>

        <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="block text-sm font-medium mb-3">Existing CRM / Tools</label>
          <div className="flex flex-wrap gap-2">
            {crmTools.map((tool) => {
              const isSelected = data.existingTools.includes(tool)
              return (
                <button
                  key={tool}
                  type="button"
                  onClick={() => toggleTool(tool)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-card border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {tool}
                  {isSelected && tool !== 'None' && <X className="w-3 h-3" />}
                </button>
              )
            })}
          </div>
        </motion.div>

        <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <CalendarBlank className="w-4 h-4 text-primary" />
            Calendar Link for Meetings
          </label>
          <input
            type="url"
            value={data.calendarLink}
            onChange={(e) => onChange({ calendarLink: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            placeholder="https://calendly.com/your-link"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Optional. Prospects who reply positively can be directed here.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
