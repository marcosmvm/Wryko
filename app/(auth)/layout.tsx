'use client'

import { SubtleBackground } from '@/components/backgrounds'

export default function AuthLayout({
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
