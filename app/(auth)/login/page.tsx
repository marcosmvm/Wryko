'use client'

import { Suspense } from 'react'
import { AuthCard } from '@/components/auth/auth-card'
import { LoginForm } from '@/components/auth/login-form'

function LoginFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-10 bg-muted rounded-lg" />
        <div className="h-10 bg-muted rounded-lg" />
        <div className="h-10 bg-primary/50 rounded-lg" />
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-10 bg-muted rounded-lg" />
        <div className="h-10 bg-muted rounded-lg" />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to your account"
    >
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  )
}
