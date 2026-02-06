'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { EnvelopeSimple, SpinnerGap } from '@phosphor-icons/react'
import { createBrowserClient } from '@supabase/ssr'
import { AuthCard } from '@/components/auth/auth-card'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [resendCooldown, setResendCooldown] = useState(0)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkVerification() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data: { user } } = await supabase.auth.getUser()

      if (user?.email_confirmed_at) {
        const onboardingCompleted = user.user_metadata?.onboarding_completed
        router.push(onboardingCompleted ? '/dashboard' : '/onboarding')
        return
      }

      setChecking(false)
    }

    checkVerification()
  }, [router])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  const handleResend = async () => {
    if (resendCooldown > 0) return
    setResendCooldown(60)
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.email) {
      await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      })
    }
  }

  if (checking) {
    return (
      <AuthCard title="Verifying..." description="Checking your account status">
        <div className="flex items-center justify-center py-8">
          <SpinnerGap className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Verify Your Email" description="One more step to get started">
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
          transition={{ delay: 0.2 }}
        >
          <p className="text-muted-foreground text-sm">
            We&apos;ve sent a verification link to your email address. Click the link to verify your account and continue setup.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <p className="text-xs text-muted-foreground">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button
              onClick={handleResend}
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
    </AuthCard>
  )
}
