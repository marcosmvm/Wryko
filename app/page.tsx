import type { Metadata } from 'next'
import HomeContent from './_components/home-content'
import { breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Wryko | Outbound That Runs Itself',
  description:
    '11 AI engines replace your SDR team. From prospecting to booked meetings — fully autonomous, fully compliant. Built for B2B teams closing $25K+ deals.',
  alternates: {
    canonical: 'https://www.wryko.com',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([])
          ),
        }}
      />
      <HomeContent />
    </>
  )
}
