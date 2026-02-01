import type { Metadata } from 'next'
import PricingClient from './client'

export const metadata: Metadata = {
  title: 'Pilot Program Pricing',
  description:
    'Join the Wryko pilot program. Lock in founding partner pricing with full access to 11 autonomous AI engines for B2B lead generation. 90-day pilot, no long-term contracts.',
}

export default function PricingPage() {
  return <PricingClient />
}
