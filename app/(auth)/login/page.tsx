import type { Metadata } from 'next'
import { AuthCard } from '@/components/auth/auth-card'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Login | XGrowthOS',
  description: 'Sign in to your XGrowthOS account to manage your B2B lead generation campaigns.',
}

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to your account"
    >
      <LoginForm />
    </AuthCard>
  )
}
