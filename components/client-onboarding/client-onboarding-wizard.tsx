'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, RocketLaunch, SpinnerGap } from '@phosphor-icons/react'
import { ClientOnboardingProgress } from './client-onboarding-progress'
import { StepBusinessProfile } from './step-business-profile'
import { StepTargetAudience } from './step-target-audience'
import { StepCampaignPreferences } from './step-campaign-preferences'
import { StepReviewStart } from './step-review-start'
import { completeClientOnboarding, saveOnboardingProgress } from '@/lib/supabase/actions'
import type { BusinessProfileData, TargetAudienceData, CampaignPrefsData } from '@/lib/types/client-onboarding'

const TOTAL_STEPS = 4

interface ClientOnboardingWizardProps {
  userName: string
  userEmail: string
  userCompany: string
  initialStep?: number
  initialData?: Record<string, unknown> | null
}

export function ClientOnboardingWizard({
  userName,
  userEmail,
  userCompany,
  initialStep = 1,
  initialData,
}: ClientOnboardingWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Step 1: Business Profile
  const [businessProfile, setBusinessProfile] = useState<BusinessProfileData>({
    companyName: (initialData?.companyName as string) || userCompany || '',
    industry: (initialData?.industry as string) || '',
    website: (initialData?.website as string) || '',
    companySize: (initialData?.companySize as string) || '',
    roleTitle: (initialData?.roleTitle as string) || '',
  })
  const [businessErrors, setBusinessErrors] = useState<Partial<Record<keyof BusinessProfileData, string>>>({})

  // Step 2: Target Audience
  const [targetAudience, setTargetAudience] = useState<TargetAudienceData>({
    idealCustomerProfile: (initialData?.idealCustomerProfile as string) || '',
    targetIndustries: (initialData?.targetIndustries as string[]) || [],
    targetCompanySize: (initialData?.targetCompanySize as string) || '',
    targetGeographies: (initialData?.targetGeographies as string[]) || [],
    primaryGoal: (initialData?.primaryGoal as TargetAudienceData['primaryGoal']) || '',
  })
  const [audienceErrors, setAudienceErrors] = useState<Partial<Record<keyof TargetAudienceData, string>>>({})

  // Step 3: Campaign Preferences
  const [campaignPrefs, setCampaignPrefs] = useState<CampaignPrefsData>({
    monthlyLeadTarget: (initialData?.monthlyLeadTarget as string) || '',
    communicationStyle: (initialData?.communicationStyle as CampaignPrefsData['communicationStyle']) || '',
    excludedDomains: (initialData?.excludedDomains as string[]) || [],
    existingTools: (initialData?.existingTools as string[]) || [],
    calendarLink: (initialData?.calendarLink as string) || '',
  })
  const [campaignErrors, setCampaignErrors] = useState<Partial<Record<keyof CampaignPrefsData, string>>>({})

  const validateStep = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 1: {
          const errors: Partial<Record<keyof BusinessProfileData, string>> = {}
          if (!businessProfile.companyName.trim()) {
            errors.companyName = 'Company name is required'
          }
          if (!businessProfile.industry) {
            errors.industry = 'Please select your industry'
          }
          setBusinessErrors(errors)
          return Object.keys(errors).length === 0
        }
        case 2: {
          const errors: Partial<Record<keyof TargetAudienceData, string>> = {}
          if (!targetAudience.primaryGoal) {
            errors.primaryGoal = 'Please select a primary goal'
          }
          setAudienceErrors(errors)
          return Object.keys(errors).length === 0
        }
        case 3: {
          setCampaignErrors({})
          return true
        }
        default:
          return true
      }
    },
    [businessProfile, targetAudience]
  )

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      setDirection(1)
      const nextStep = Math.min(currentStep + 1, TOTAL_STEPS)
      setCurrentStep(nextStep)

      // Save progress in background
      saveOnboardingProgress(nextStep, {
        ...businessProfile,
        ...targetAudience,
        ...campaignPrefs,
      }).catch(() => {})
    }
  }

  const handleBack = () => {
    setDirection(-1)
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleGoToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1)
    setCurrentStep(step)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await completeClientOnboarding({
        companyName: businessProfile.companyName,
        industry: businessProfile.industry,
        website: businessProfile.website || undefined,
        companySize: businessProfile.companySize || undefined,
        roleTitle: businessProfile.roleTitle || undefined,
        idealCustomerProfile: targetAudience.idealCustomerProfile || undefined,
        targetIndustries: targetAudience.targetIndustries.length > 0 ? targetAudience.targetIndustries : undefined,
        targetCompanySize: targetAudience.targetCompanySize || undefined,
        targetGeographies: targetAudience.targetGeographies.length > 0 ? targetAudience.targetGeographies : undefined,
        primaryGoal: targetAudience.primaryGoal || undefined,
        monthlyLeadTarget: campaignPrefs.monthlyLeadTarget || undefined,
        communicationStyle: campaignPrefs.communicationStyle || undefined,
        excludedDomains: campaignPrefs.excludedDomains.length > 0 ? campaignPrefs.excludedDomains : undefined,
        existingTools: campaignPrefs.existingTools.length > 0 ? campaignPrefs.existingTools : undefined,
        calendarLink: campaignPrefs.calendarLink || undefined,
      })

      if (result.error) {
        setSubmitError(result.error)
        setIsSubmitting(false)
      } else {
        // Small delay to let the animation finish
        setTimeout(() => {
          router.push('/dashboard')
        }, 3500)
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
      <ClientOnboardingProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />

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
              <StepBusinessProfile
                data={businessProfile}
                onChange={(updates) => {
                  setBusinessProfile((prev) => ({ ...prev, ...updates }))
                  setBusinessErrors({})
                }}
                errors={businessErrors}
                userName={userName}
              />
            )}
            {currentStep === 2 && (
              <StepTargetAudience
                data={targetAudience}
                onChange={(updates) => {
                  setTargetAudience((prev) => ({ ...prev, ...updates }))
                  setAudienceErrors({})
                }}
                errors={audienceErrors}
              />
            )}
            {currentStep === 3 && (
              <StepCampaignPreferences
                data={campaignPrefs}
                onChange={(updates) => {
                  setCampaignPrefs((prev) => ({ ...prev, ...updates }))
                  setCampaignErrors({})
                }}
                errors={campaignErrors}
              />
            )}
            {currentStep === 4 && (
              <StepReviewStart
                businessProfile={businessProfile}
                targetAudience={targetAudience}
                campaignPrefs={campaignPrefs}
                isSubmitting={isSubmitting}
                submitError={submitError}
                onGoToStep={handleGoToStep}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {!isSubmitting && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <SpinnerGap className="w-4 h-4 animate-spin" />
                    Launching...
                  </>
                ) : (
                  <>
                    <RocketLaunch className="w-4 h-4" weight="bold" />
                    Launch My Campaigns
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Step count */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        Step {currentStep} of {TOTAL_STEPS}
      </p>
    </div>
  )
}
