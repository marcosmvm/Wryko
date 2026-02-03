import type { Metadata } from 'next'
import PricingClient from './client'
import { breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Pilot Program Pricing',
  description:
    'Join the Wryko pilot program. Lock in founding partner pricing with full access to 11 autonomous AI engines for B2B lead generation. 90-day pilot, no long-term contracts.',
  alternates: {
    canonical: 'https://www.wryko.com/pricing',
  },
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'Pricing', path: '/pricing' }])
          ),
        }}
      />
      <PricingClient />
    </>
  )
}
