'use client'

import { useFounderUpgrade } from '@/lib/auth/use-founder'

// This component automatically upgrades founder accounts
export function FounderUpgrade() {
  useFounderUpgrade()
  return null // Invisible component
}