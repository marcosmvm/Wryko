'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RocketLaunch,
  Buildings,
  Crosshair,
  Sliders,
  PencilSimple,
  Check,
  SpinnerGap,
  Robot,
  ChartLineUp,
  ShieldCheck,
  EnvelopeSimple,
} from '@phosphor-icons/react'
import type { BusinessProfileData, TargetAudienceData, CampaignPrefsData } from '@/lib/types/client-onboarding'

interface StepReviewStartProps {
  businessProfile: BusinessProfileData
  targetAudience: TargetAudienceData
  campaignPrefs: CampaignPrefsData
  isSubmitting: boolean
  submitError: string | null
  onGoToStep: (step: number) => void
}

const setupSteps = [
  { label: 'Configuring AI engines for your industry', icon: Robot },
  { label: 'Setting up campaign tracking', icon: ChartLineUp },
  { label: 'Activating compliance monitoring', icon: ShieldCheck },
  { label: 'Preparing your outreach sequences', icon: EnvelopeSimple },
]

function SummarySection({
  icon: Icon,
  title,
  items,
  stepNumber,
  onEdit,
}: {
  icon: typeof Buildings
  title: string
  items: { label: string; value: string }[]
  stepNumber: number
  onEdit: () => void
}) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" weight="fill" />
          </div>
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
        >
          <PencilSimple className="w-3.5 h-3.5" />
          Edit
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-4 text-sm">
            <span className="text-muted-foreground shrink-0">{item.label}</span>
            <span className="font-medium text-right">{item.value || '---'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StepReviewStart({
  businessProfile,
  targetAudience,
  campaignPrefs,
  isSubmitting,
  submitError,
  onGoToStep,
}: StepReviewStartProps) {
  const [animatedSteps, setAnimatedSteps] = useState<number[]>([])

  useEffect(() => {
    if (!isSubmitting) {
      setAnimatedSteps([])
      return
    }

    setupSteps.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedSteps((prev) => [...prev, index])
      }, (index + 1) * 800)
    })
  }, [isSubmitting])

  const goalLabels: Record<string, string> = {
    meetings: 'Book Qualified Meetings',
    leads: 'Generate Leads',
    brand_awareness: 'Brand Awareness',
    pipeline_growth: 'Pipeline Growth',
  }

  const styleLabels: Record<string, string> = {
    professional: 'Professional',
    conversational: 'Conversational',
    direct: 'Direct',
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
            <RocketLaunch className="w-7 h-7 text-white" weight="fill" />
          </div>
          <div className="pt-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">
              Step 4
            </span>
            <h2 className="font-heading text-xl font-semibold">Review & Launch</h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Review your setup details. Everything looks good? Let&apos;s launch your campaigns.
            </p>
          </div>
        </div>
      </motion.div>

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-4"
        >
          {submitError}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.div
            key="submitting"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-8"
          >
            <div className="text-center mb-6">
              <SpinnerGap className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
              <p className="text-sm font-medium">Setting up your workspace...</p>
            </div>
            <div className="space-y-3 max-w-sm mx-auto">
              {setupSteps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = animatedSteps.includes(index)
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" weight="bold" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {step.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="review"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <SummarySection
              icon={Buildings}
              title="Business Profile"
              stepNumber={1}
              onEdit={() => onGoToStep(1)}
              items={[
                { label: 'Company', value: businessProfile.companyName },
                { label: 'Industry', value: businessProfile.industry },
                { label: 'Website', value: businessProfile.website },
                { label: 'Size', value: businessProfile.companySize },
                { label: 'Role', value: businessProfile.roleTitle },
              ]}
            />

            <SummarySection
              icon={Crosshair}
              title="Target Audience"
              stepNumber={2}
              onEdit={() => onGoToStep(2)}
              items={[
                { label: 'ICP', value: targetAudience.idealCustomerProfile ? (targetAudience.idealCustomerProfile.length > 60 ? targetAudience.idealCustomerProfile.slice(0, 60) + '...' : targetAudience.idealCustomerProfile) : '' },
                { label: 'Industries', value: targetAudience.targetIndustries.join(', ') },
                { label: 'Company Size', value: targetAudience.targetCompanySize },
                { label: 'Geographies', value: targetAudience.targetGeographies.join(', ') },
                { label: 'Primary Goal', value: goalLabels[targetAudience.primaryGoal] || '' },
              ]}
            />

            <SummarySection
              icon={Sliders}
              title="Campaign Preferences"
              stepNumber={3}
              onEdit={() => onGoToStep(3)}
              items={[
                { label: 'Monthly Volume', value: campaignPrefs.monthlyLeadTarget ? `${campaignPrefs.monthlyLeadTarget} leads` : '' },
                { label: 'Style', value: styleLabels[campaignPrefs.communicationStyle] || '' },
                { label: 'Excluded Domains', value: campaignPrefs.excludedDomains.length > 0 ? `${campaignPrefs.excludedDomains.length} domains` : 'None' },
                { label: 'CRM', value: campaignPrefs.existingTools.join(', ') || 'None selected' },
                { label: 'Calendar', value: campaignPrefs.calendarLink || 'Not set' },
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
