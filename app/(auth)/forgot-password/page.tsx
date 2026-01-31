import type { Metadata } from 'next'
import { AuthCard } from '@/components/auth/auth-card'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export const metadata: Metadata = {
  title: 'Reset Password | XGrowthOS',
  description: 'Reset your XGrowthOS account password.',
}

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset Password"
      description="Enter your email and we'll send you reset instructions"
    >
      <ForgotPasswordForm />
    </AuthCard>
  )
}
