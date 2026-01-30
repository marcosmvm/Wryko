import type { Metadata } from 'next'
import PricingClient from './client'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, performance-aligned pricing for autonomous B2B lead generation. Starting at $2,000/month with a 90-day pilot program.',
}

export default function PricingPage() {
  return <PricingClient />
}
