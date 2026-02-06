'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Logo } from '@/components/ui/logo'
import { ClientOnboardingWizard } from '@/components/client-onboarding/client-onboarding-wizard'
import { createBrowserClient } from '@supabase/ssr'

export default function OnboardingPage() {
  const [user, setUser] = useState<{
    name: string
    email: string
    company: string
    onboardingStep: number
    onboardingPartialData: Record<string, unknown> | null
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({
          name: user.user_metadata?.full_name || '',
          email: user.email || '',
          company: user.user_metadata?.company || '',
          onboardingStep: user.user_metadata?.onboarding_step || 0,
          onboardingPartialData: user.user_metadata?.onboarding_partial_data || null,
        })
      }
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <div className="flex justify-center mb-8">
            <Logo variant="lockup" size="md" />
          </div>
          <div className="bg-card border border-border rounded-2xl p-8 animate-pulse">
            <div className="h-6 bg-muted rounded w-48 mb-4" />
            <div className="h-4 bg-muted rounded w-64 mb-8" />
            <div className="space-y-4">
              <div className="h-12 bg-muted rounded-lg" />
              <div className="h-12 bg-muted rounded-lg" />
              <div className="h-12 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 sm:py-12">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Link href="/" className="flex items-center gap-2">
          <Logo variant="lockup" size="md" />
        </Link>
      </motion.div>

      {/* Welcome message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-8"
      >
        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
          Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
          Let&apos;s set up your account in a few steps. This helps our AI engines build the perfect outreach strategy for your business.
        </p>
      </motion.div>

      {/* Wizard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-2xl"
      >
        <ClientOnboardingWizard
          userName={user?.name || ''}
          userEmail={user?.email || ''}
          userCompany={user?.company || ''}
          initialStep={user?.onboardingStep && user.onboardingStep > 0 ? user.onboardingStep : 1}
          initialData={user?.onboardingPartialData}
        />
      </motion.div>

      {/* Back to home */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8"
      >
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back to home
        </Link>
      </motion.div>
    </div>
  )
}
