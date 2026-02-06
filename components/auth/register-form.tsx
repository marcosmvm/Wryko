'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Eye,
  EyeSlash,
  SpinnerGap,
  CheckCircle,
  EnvelopeSimple,
  ShieldCheck,
  UserPlus,
  GearSix,
  RocketLaunch,
  Layout,
} from '@phosphor-icons/react'
import { signUp } from '@/lib/supabase/actions'
import { SocialAuthButtons } from './social-auth-buttons'

const journeySteps = [
  { label: 'Create Account', icon: UserPlus },
  { label: 'Verify Email', icon: EnvelopeSimple },
  { label: 'Complete Setup', icon: GearSix },
  { label: 'Dashboard', icon: Layout },
]

const fieldVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3 },
  }),
}

export function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [submittedEmail, setSubmittedEmail] = useState('')

  useEffect(() => {
    const authError = searchParams.get('error')
    if (authError === 'auth') {
      setError('Social login failed. Please try again or use email/password.')
      window.history.replaceState({}, '', '/register')
    }
  }, [searchParams])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  const handleSubmit = async (formData: FormData) => {
    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy to continue.')
      return
    }

    setIsLoading(true)
    setError(null)

    formData.set('marketingConsent', String(marketingConsent))
    setSubmittedEmail(formData.get('email') as string)

    const result = await signUp(formData)

    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    } else if (result?.success) {
      setSuccess(true)
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    if (resendCooldown > 0 || !submittedEmail) return
    setResendCooldown(60)
    // Re-trigger signup with same email (Supabase resends verification)
  }

  if (success) {
    return (
      <div className="text-center space-y-5">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto"
        >
          <EnvelopeSimple className="w-8 h-8 text-primary" weight="duotone" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="font-heading text-xl font-semibold">Check Your Email</h2>
          <p className="text-muted-foreground text-sm mt-2">
            We&apos;ve sent a verification link to <span className="font-medium text-foreground">{submittedEmail}</span>. Click the link to verify your account and start setting up your campaigns.
          </p>
        </motion.div>

        {/* Journey indicator - step 2 active */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-center gap-1.5 py-3"
        >
          {journeySteps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.label} className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    i === 0
                      ? 'bg-primary text-white'
                      : i === 1
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i === 0 ? <CheckCircle className="w-3.5 h-3.5" weight="bold" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className={`text-xs hidden sm:inline ${i <= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
                {i < journeySteps.length - 1 && (
                  <div className={`w-4 h-px ${i === 0 ? 'bg-primary/30' : 'bg-border'}`} />
                )}
              </div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="space-y-3"
        >
          <p className="text-xs text-muted-foreground">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button
              onClick={handleResendEmail}
              disabled={resendCooldown > 0}
              className="text-primary hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 ? `resend in ${resendCooldown}s` : 'resend it'}
            </button>
          </p>

          <button
            onClick={() => router.push('/login')}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Back to Login
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Journey progress indicator */}
      <div className="flex items-center justify-center gap-1.5 pb-2">
        {journeySteps.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={step.label} className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  i === 0
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className={`text-xs hidden sm:inline ${i === 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {step.label}
              </span>
              {i < journeySteps.length - 1 && (
                <div className="w-4 h-px bg-border mx-0.5" />
              )}
            </div>
          )
        })}
      </div>

      <form action={handleSubmit} className="space-y-4">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
          >
            {error}
          </motion.div>
        )}

        <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            placeholder="John Smith"
          />
        </motion.div>

        <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Work Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            placeholder="you@company.com"
          />
        </motion.div>

        <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            placeholder="Acme Inc."
          />
        </motion.div>

        <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors pr-12"
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeSlash className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Must be at least 8 characters
          </p>
        </motion.div>

        {/* Terms & Privacy + Marketing Consent */}
        <motion.div custom={3.5} variants={fieldVariants} initial="hidden" animate="visible" className="space-y-3 pt-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked)
                if (e.target.checked && error?.includes('Terms')) setError(null)
              }}
              className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary"
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              I agree to the{' '}
              <Link href="/terms" className="text-primary hover:underline" target="_blank">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:underline" target="_blank">
                Privacy Policy
              </Link>
              <span className="text-destructive ml-0.5">*</span>
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary"
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              I&apos;d like to receive product updates and marketing communications from Wryko
            </span>
          </label>
        </motion.div>

        <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <SpinnerGap className="w-5 h-5 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <RocketLaunch className="w-4 h-4" weight="bold" />
                Create Account
              </>
            )}
          </button>
        </motion.div>
      </form>

      <SocialAuthButtons termsAccepted={termsAccepted} />

      {/* Trust signal */}
      <motion.div
        custom={5}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
      >
        <ShieldCheck className="w-3.5 h-3.5" weight="bold" />
        <span>SOC 2 compliant &middot; 256-bit SSL encryption</span>
      </motion.div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
