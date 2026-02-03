'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Rocket,
  Zap,
  Building2,
  Target,
  Database,
  Settings,
  FlaskConical,
  Check,
} from 'lucide-react'
import { StepHeader } from './step-header'
import { AnimatedChecklist, type ChecklistSection } from './animated-checklist'
import { WorkflowTimeline } from './workflow-timeline'
import type { CompanyProfileData } from './step-welcome-company'
import type { InstantlyConnectionData } from './step-instantly-connection'
import type { WorkspaceConfigData } from './step-workspace-config'
import type { CampaignPreferencesData } from './step-campaign-prefs'

interface StepReviewLaunchProps {
  companyProfile: CompanyProfileData
  instantlySetup: InstantlyConnectionData
  workspaceConfig: WorkspaceConfigData
  campaignPreferences: CampaignPreferencesData
  agreedToTerms: boolean
  onToggleTerms: (agreed: boolean) => void
  isSubmitting: boolean
  submitError: string | null
}

export function StepReviewLaunch({
  companyProfile,
  instantlySetup,
  workspaceConfig,
  campaignPreferences,
  agreedToTerms,
  onToggleTerms,
  isSubmitting,
  submitError,
}: StepReviewLaunchProps) {
  const checklistSections = useMemo<ChecklistSection[]>(() => {
    const s = (val: string | boolean | string[] | undefined): 'complete' | 'pending' => {
      if (typeof val === 'boolean') return val ? 'complete' : 'pending'
      if (Array.isArray(val)) return val.length > 0 ? 'complete' : 'pending'
      return val && String(val).trim() ? 'complete' : 'pending'
    }

    return [
      {
        title: 'Instantly.AI Connection',
        icon: Zap,
        items: instantlySetup.hasInstantly
          ? [
              { label: 'API Key generated', status: s(instantlySetup.instantlyApiKey) },
              { label: 'Read access verified', status: s(instantlySetup.readAccessVerified) },
              { label: 'Write access verified', status: s(instantlySetup.writeAccessVerified), detail: 'WF3, WF5' },
              { label: 'Campaigns have sequences configured', status: s(instantlySetup.campaignsConfigured) },
            ]
          : [
              { label: 'Instantly.AI', status: 'pending' as const, detail: 'Will set up later' },
            ],
      },
      {
        title: 'Client Profile',
        icon: Building2,
        items: [
          { label: 'Client Name', status: s(companyProfile.companyName) },
          { label: 'Industry', status: s(companyProfile.industry) },
          { label: 'Workspace Sheet ID', status: s(workspaceConfig.workspaceSheetId), detail: 'WF2, WF3' },
          { label: 'Telegram Chat ID', status: s(workspaceConfig.telegramChatId), detail: 'WF1-3' },
          { label: 'Leads Sheet ID', status: s(workspaceConfig.leadsSheetId), detail: 'WF5' },
        ],
      },
      {
        title: 'Campaign Configuration',
        icon: Target,
        items: [
          { label: 'Default Niche', status: s(campaignPreferences.defaultNiche) },
          { label: 'Blocked Domains', status: s(campaignPreferences.blockedDomains) },
          { label: 'Blocked Countries', status: s(campaignPreferences.blockedCountries) },
          {
            label: 'Niche Definitions',
            status: s(campaignPreferences.nicheDefinitions),
            detail: 'optional',
          },
        ],
      },
      {
        title: 'Workspace Setup',
        icon: Database,
        items: [
          { label: 'Master Library sheet', status: 'auto' as const },
          { label: 'Staged Updates sheet', status: 'auto' as const },
          { label: 'DNC List', status: 'auto' as const },
          { label: 'Scraped Leads sheet', status: 'auto' as const, detail: 'WF5' },
          { label: 'Client Leads sheet', status: 'auto' as const, detail: 'WF5' },
        ],
      },
      {
        title: 'System Credentials',
        icon: Settings,
        items: [
          { label: 'OpenAI (GPT-4o)', status: 'auto' as const, detail: 'WF2, WF5' },
          { label: 'Telegram bot', status: 'auto' as const, detail: 'WF1-3' },
          { label: 'Gmail', status: 'auto' as const, detail: 'All workflows' },
        ],
      },
      {
        title: 'Pre-Launch Testing',
        icon: FlaskConical,
        items: [
          { label: 'Manual webhook trigger', status: 'auto' as const },
          { label: 'Notifications received', status: 'auto' as const },
        ],
      },
    ]
  }, [companyProfile, instantlySetup, workspaceConfig, campaignPreferences])

  return (
    <div className="space-y-5">
      <StepHeader
        icon={Rocket}
        supportingIcons={[Check, Zap]}
        title="Review & Launch"
        subtitle="Review your setup below. Our engines will activate once you launch."
        stepNumber={5}
      />

      {/* Animated Checklist */}
      <AnimatedChecklist sections={checklistSections} />

      {/* Terms Agreement */}
      <motion.label
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card cursor-pointer hover:border-primary/30 transition-colors"
      >
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => onToggleTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        <div>
          <p className="text-sm">
            I agree to the{' '}
            <a href="/terms" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </p>
          <p className="text-muted-foreground text-xs mt-0.5">
            By launching, you authorize Wryko to run automated campaigns on your behalf.
          </p>
        </div>
      </motion.label>

      {/* Error message */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
        >
          {submitError}
        </motion.div>
      )}

      {/* Workflow Schedule Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-primary/20 bg-primary/5 p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="w-5 h-5 text-primary" />
          <h3 className="font-heading text-sm font-semibold">Your Engine G Workflow Schedule</h3>
        </div>
        <WorkflowTimeline />
      </motion.div>
    </div>
  )
}
