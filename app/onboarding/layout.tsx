'use client'

import { SubtleBackground } from '@/components/backgrounds'

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SubtleBackground showOrb>
      {children}
    </SubtleBackground>
  )
}
