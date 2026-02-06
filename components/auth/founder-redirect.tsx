'use client'

import { Crown } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

export function FounderRedirect() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center mb-8">
          <Logo variant="lockup" size="md" />
        </div>
        
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Crown className="h-6 w-6 text-yellow-600 animate-pulse" />
            <h1 className="text-lg font-bold text-gray-900">Founder Access</h1>
          </div>
          
          <p className="text-gray-700 mb-4">
            Welcome back, Marcos! Bypassing onboarding...
          </p>
          
          <div className="text-sm text-gray-600">
            You have founder-level access and don't need to complete onboarding.
            Redirecting you to the dashboard.
          </div>
        </div>

        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  )
}