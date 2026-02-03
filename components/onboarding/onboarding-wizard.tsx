'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Rocket, Loader2 } from 'lucide-react'
import { OnboardingProgress } from './onboarding-progress'
import { StepWelcomeCompany, type CompanyProfileData } from './step-welcome-company'
import { StepInstantlyConnection, type InstantlyConnectionData } from './step-instantly-connection'
import { StepWorkspaceConfig, type WorkspaceConfigData } from './step-workspace-config'
import { StepCampaignPrefs, type CampaignPreferencesData } from './step-campaign-prefs'
import { StepReviewLaunch } from './step-review-launch'
import { completeOnboarding } from '@/lib/supabase/actions'

const TOTAL_STEPS = 5

interface OnboardingWizardProps {
  userName: string
  userEmail: string
  userCompany: string
}

export function OnboardingWizard({ userName, userEmail, userCompany }: OnboardingWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Step 1: Company Profile
  const [companyProfile, setCompanyProfile] = useState<CompanyProfileData>({
    companyName: userCompany || '',
    industry: '',
    website: '',
    phone: '',
    companySize: '',
    targetIcp: '',
  })
  const [companyErrors, setCompanyErrors] = useState<Partial<Record<keyof CompanyProfileData, string>>>({})

  // Step 2: Instantly Connection
  const [instantlySetup, setInstantlySetup] = useState<InstantlyConnectionData>({
    hasInstantly: false,
    instantlyApiKey: '',
    readAccessVerified: false,
    writeAccessVerified: false,
    campaignsConfigured: false,
  })
  const [instantlyErrors, setInstantlyErrors] = useState<Partial<Record<keyof InstantlyConnectionData, string>>>({})

  // Step 3: Workspace Configuration
  const [workspaceConfig, setWorkspaceConfig] = useState<WorkspaceConfigData>({
    workspaceSheetId: '',
    telegramChatId: '',
    leadsSheetId: '',
  })
  const [workspaceErrors, setWorkspaceErrors] = useState<Partial<Record<keyof WorkspaceConfigData, string>>>({})

  // Step 4: Campaign Preferences
  const [campaignPreferences, setCampaignPreferences] = useState<CampaignPreferencesData>({
    blockedDomains: [],
    blockedCountries: [],
    defaultNiche: 'General',
    nicheDefinitions: '',
  })
  const [campaignErrors, setCampaignErrors] = useState<Partial<Record<keyof CampaignPreferencesData, string>>>({})

  const validateStep = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 1: {
          const errors: Partial<Record<keyof CompanyProfileData, string>> = {}
          if (!companyProfile.companyName.trim()) {
            errors.companyName = 'Company name is required'
          }
          if (!companyProfile.industry) {
            errors.industry = 'Please select your industry'
          }
          setCompanyErrors(errors)
          return Object.keys(errors).length === 0
        }
        case 2: {
          const errors: Partial<Record<keyof InstantlyConnectionData, string>> = {}
          if (instantlySetup.hasInstantly && !instantlySetup.instantlyApiKey.trim()) {
            errors.instantlyApiKey = 'API key is required when Instantly is enabled'
          }
          setInstantlyErrors(errors)
          return Object.keys(errors).length === 0
        }
        case 3: {
          setWorkspaceErrors({})
          return true
        }
        case 4: {
          const errors: Partial<Record<keyof CampaignPreferencesData, string>> = {}
          if (campaignPreferences.nicheDefinitions) {
            try {
              JSON.parse(campaignPreferences.nicheDefinitions)
            } catch {
              errors.nicheDefinitions = 'Must be valid JSON'
            }
          }
          setCampaignErrors(errors)
          return Object.keys(errors).length === 0
        }
        default:
          return true
      }
    },
    [companyProfile, instantlySetup, campaignPreferences]
  )

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setDirection(1)
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
    }
  }

  const handleBack = () => {
    setDirection(-1)
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      setSubmitError('Please agree to the Terms of Service and Privacy Policy to continue.')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await completeOnboarding({
        companyName: companyProfile.companyName,
        contactName: userName,
        contactEmail: userEmail,
        industry: companyProfile.industry,
        website: companyProfile.website || undefined,
        phone: companyProfile.phone || undefined,
        companySize: companyProfile.companySize || undefined,
        targetIcp: companyProfile.targetIcp || undefined,
        hasInstantly: instantlySetup.hasInstantly,
        instantlyApiKey: instantlySetup.hasInstantly ? instantlySetup.instantlyApiKey : undefined,
        readAccessVerified: instantlySetup.readAccessVerified,
        writeAccessVerified: instantlySetup.writeAccessVerified,
        workspaceSheetId: workspaceConfig.workspaceSheetId || undefined,
        telegramChatId: workspaceConfig.telegramChatId || undefined,
        leadsSheetId: workspaceConfig.leadsSheetId || undefined,
        blockedDomains: campaignPreferences.blockedDomains.length > 0
          ? campaignPreferences.blockedDomains.join(', ')
          : undefined,
        blockedCountries: campaignPreferences.blockedCountries.length > 0
          ? campaignPreferences.blockedCountries.join(',')
          : undefined,
        defaultNiche: campaignPreferences.defaultNiche,
        nicheDefinitions: campaignPreferences.nicheDefinitions || undefined,
      })

      if (result.error) {
        setSubmitError(result.error)
        setIsSubmitting(false)
      } else {
        router.push('/dashboard')
      }
    } catch {
      setSubmitError('An unexpected error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
    }),
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <OnboardingProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <div className="glass-premium rounded-2xl p-6 sm:p-8 shadow-lg shadow-black/5 dark:shadow-black/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            {currentStep === 1 && (
              <StepWelcomeCompany
                data={companyProfile}
                onChange={(updates) => {
                  setCompanyProfile((prev) => ({ ...prev, ...updates }))
                  setCompanyErrors({})
                }}
                errors={companyErrors}
                userName={userName}
              />
            )}
            {currentStep === 2 && (
              <StepInstantlyConnection
                data={instantlySetup}
                onChange={(updates) => {
                  setInstantlySetup((prev) => ({ ...prev, ...updates }))
                  setInstantlyErrors({})
                }}
                errors={instantlyErrors}
              />
            )}
            {currentStep === 3 && (
              <StepWorkspaceConfig
                data={workspaceConfig}
                onChange={(updates) => {
                  setWorkspaceConfig((prev) => ({ ...prev, ...updates }))
                  setWorkspaceErrors({})
                }}
                errors={workspaceErrors}
              />
            )}
            {currentStep === 4 && (
              <StepCampaignPrefs
                data={campaignPreferences}
                onChange={(updates) => {
                  setCampaignPreferences((prev) => ({ ...prev, ...updates }))
                  setCampaignErrors({})
                }}
                errors={campaignErrors}
              />
            )}
            {currentStep === 5 && (
              <StepReviewLaunch
                companyProfile={companyProfile}
                instantlySetup={instantlySetup}
                workspaceConfig={workspaceConfig}
                campaignPreferences={campaignPreferences}
                agreedToTerms={agreedToTerms}
                onToggleTerms={setAgreedToTerms}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-lg hover:opacity-90 transition-opacity"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !agreedToTerms}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Launching...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  Launch My Campaigns
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Step count */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        Step {currentStep} of {TOTAL_STEPS}
      </p>
    </div>
  )
}
