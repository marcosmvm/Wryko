import type { Metadata } from 'next'
import { AuthCard } from '@/components/auth/auth-card'
import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export const metadata: Metadata = {
  title: 'Set New Password | Wryko',
  description: 'Set a new password for your Wryko account.',
}

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Set New Password"
      description="Enter your new password below"
    >
      <ResetPasswordForm />
    </AuthCard>
  )
}
