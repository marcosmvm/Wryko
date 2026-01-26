import type { Metadata } from 'next'
import { AuthCard } from '@/components/auth/auth-card'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: 'Get Started | XGrowthOS',
  description: 'Create your XGrowthOS account and start generating qualified B2B leads with AI.',
}

export default function RegisterPage() {
  return (
    <AuthCard
      title="Get Started"
      description="Create your account"
    >
      <RegisterForm />
    </AuthCard>
  )
}
