'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Rocket, Loader2 } from 'lucide-react'
import { OnboardingProgress } from './onboarding-progress'
import { StepCompanyProfile, type CompanyProfileData } from './step-company-profile'
import { StepInstantlySetup, type InstantlySetupData } from './step-instantly-setup'
import { StepCampaignPreferences, type CampaignPreferencesData } from './step-campaign-preferences'
import { StepReviewLaunch } from './step-review-launch'
import { completeOnboarding } from '@/lib/supabase/actions'

const TOTAL_STEPS = 4

interface OnboardingWizardProps {
  userName: string
  userEmail: string
  userCompany: string
}

export function OnboardingWizard({ userName, userEmail, userCompany }: OnboardingWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Step 1
  const [companyProfile, setCompanyProfile] = useState<CompanyProfileData>({
    companyName: userCompany || '',
    industry: '',
    website: '',
    phone: '',
    companySize: '',
  })
  const [companyErrors, setCompanyErrors] = useState<Partial<Record<keyof CompanyProfileData, string>>>({})

  // Step 2
  const [instantlySetup, setInstantlySetup] = useState<InstantlySetupData>({
    hasInstantly: false,
    instantlyApiKey: '',
    campaignsConfigured: false,
  })
  const [instantlyErrors, setInstantlyErrors] = useState<Partial<Record<keyof InstantlySetupData, string>>>({})

  // Step 3
  const [campaignPreferences, setCampaignPreferences] = useState<CampaignPreferencesData>({
    blockedDomains: '',
    blockedCountries: [],
    defaultNiche: 'General',
    nicheDefinitions: '',
    targetIcp: '',
  })
  const [campaignErrors, setCampaignErrors] = useState<Partial<Record<keyof CampaignPreferencesData, string>>>({})

  const validateStep = useCallback((step: number): boolean => {
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
        const errors: Partial<Record<keyof InstantlySetupData, string>> = {}
        if (instantlySetup.hasInstantly && !instantlySetup.instantlyApiKey.trim()) {
          errors.instantlyApiKey = 'API key is required when Instantly is enabled'
        }
        setInstantlyErrors(errors)
        return Object.keys(errors).length === 0
      }
      case 3: {
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
  }, [companyProfile, instantlySetup, campaignPreferences])

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
    }
  }

  const handleBack = () => {
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
        hasInstantly: instantlySetup.hasInstantly,
        instantlyApiKey: instantlySetup.hasInstantly ? instantlySetup.instantlyApiKey : undefined,
        blockedDomains: campaignPreferences.blockedDomains || undefined,
        blockedCountries: campaignPreferences.blockedCountries.length > 0
          ? campaignPreferences.blockedCountries.join(',')
          : undefined,
        defaultNiche: campaignPreferences.defaultNiche,
        nicheDefinitions: campaignPreferences.nicheDefinitions || undefined,
        targetIcp: campaignPreferences.targetIcp || undefined,
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
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0,
    }),
  }

  const direction = 1

  return (
    <div className="w-full max-w-2xl mx-auto">
      <OnboardingProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg shadow-black/5 dark:shadow-black/20 relative overflow-hidden">
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
              <StepCompanyProfile
                data={companyProfile}
                onChange={(updates) => {
                  setCompanyProfile((prev) => ({ ...prev, ...updates }))
                  setCompanyErrors({})
                }}
                errors={companyErrors}
              />
            )}
            {currentStep === 2 && (
              <StepInstantlySetup
                data={instantlySetup}
                onChange={(updates) => {
                  setInstantlySetup((prev) => ({ ...prev, ...updates }))
                  setInstantlyErrors({})
                }}
                errors={instantlyErrors}
              />
            )}
            {currentStep === 3 && (
              <StepCampaignPreferences
                data={campaignPreferences}
                onChange={(updates) => {
                  setCampaignPreferences((prev) => ({ ...prev, ...updates }))
                  setCampaignErrors({})
                }}
                errors={campaignErrors}
              />
            )}
            {currentStep === 4 && (
              <StepReviewLaunch
                companyProfile={companyProfile}
                instantlySetup={instantlySetup}
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
