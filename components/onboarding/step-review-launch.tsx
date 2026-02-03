'use client'

import { motion } from 'framer-motion'
import {
  Building2,
  Zap,
  Target,
  Globe2,
  ShieldBan,
  Check,
  Rocket,
  Loader2,
} from 'lucide-react'
import type { CompanyProfileData } from './step-company-profile'
import type { InstantlySetupData } from './step-instantly-setup'
import type { CampaignPreferencesData } from './step-campaign-preferences'

interface StepReviewLaunchProps {
  companyProfile: CompanyProfileData
  instantlySetup: InstantlySetupData
  campaignPreferences: CampaignPreferencesData
  agreedToTerms: boolean
  onToggleTerms: (agreed: boolean) => void
  isSubmitting: boolean
  submitError: string | null
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="flex justify-between items-start py-2">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-sm font-medium text-right max-w-[60%]">{value}</span>
    </div>
  )
}

function SummarySection({
  icon: Icon,
  title,
  children,
  delay,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-heading text-sm font-semibold">{title}</h3>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </motion.div>
  )
}

export function StepReviewLaunch({
  companyProfile,
  instantlySetup,
  campaignPreferences,
  agreedToTerms,
  onToggleTerms,
  isSubmitting,
  submitError,
}: StepReviewLaunchProps) {
  return (
    <div className="space-y-5">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold mb-1">Review & Launch</h2>
        <p className="text-muted-foreground text-sm">
          Review your details below. Once you launch, our engines will start building your campaigns.
        </p>
      </div>

      {/* Company Profile Summary */}
      <SummarySection icon={Building2} title="Company Profile" delay={0}>
        <SummaryRow label="Company" value={companyProfile.companyName} />
        <SummaryRow label="Industry" value={companyProfile.industry} />
        <SummaryRow label="Website" value={companyProfile.website} />
        <SummaryRow label="Phone" value={companyProfile.phone} />
        <SummaryRow label="Size" value={companyProfile.companySize} />
      </SummarySection>

      {/* Instantly.AI Summary */}
      <SummarySection icon={Zap} title="Instantly.AI" delay={0.1}>
        <SummaryRow
          label="Connected"
          value={instantlySetup.hasInstantly ? 'Yes' : 'No (will set up later)'}
        />
        {instantlySetup.hasInstantly && (
          <>
            <SummaryRow
              label="API Key"
              value={
                instantlySetup.instantlyApiKey
                  ? `${instantlySetup.instantlyApiKey.slice(0, 8)}...`
                  : 'Not provided'
              }
            />
            <SummaryRow
              label="Campaigns Ready"
              value={instantlySetup.campaignsConfigured ? 'Yes' : 'No'}
            />
          </>
        )}
      </SummarySection>

      {/* Campaign Preferences Summary */}
      <SummarySection icon={Target} title="Campaign Preferences" delay={0.2}>
        <SummaryRow label="Niche" value={campaignPreferences.defaultNiche} />
        {campaignPreferences.targetIcp && (
          <SummaryRow label="Target ICP" value={campaignPreferences.targetIcp} />
        )}
        {campaignPreferences.blockedDomains && (
          <div className="py-2">
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <ShieldBan className="w-3.5 h-3.5" /> Blocked Domains
            </span>
            <p className="text-sm font-mono mt-1 text-foreground/80">
              {campaignPreferences.blockedDomains}
            </p>
          </div>
        )}
        {campaignPreferences.blockedCountries.length > 0 && (
          <div className="py-2">
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" /> Blocked Countries
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {campaignPreferences.blockedCountries.map((code) => (
                <span
                  key={code}
                  className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>
        )}
      </SummarySection>

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
            <a href="/terms" className="text-primary hover:underline" target="_blank">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary hover:underline" target="_blank">
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

      {/* What happens next */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-primary/20 bg-primary/5 p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Rocket className="w-5 h-5 text-primary" />
          <h3 className="font-heading text-sm font-semibold">What happens next?</h3>
        </div>
        <ul className="space-y-2">
          {[
            'Our AI engines begin analyzing your market and building lead lists',
            'Campaign sequences are configured based on your preferences',
            'Your dedicated dashboard activates with real-time metrics',
            'A CSM will reach out within 24 hours to finalize setup',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
