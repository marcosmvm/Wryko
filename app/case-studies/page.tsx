import type { Metadata } from 'next'
import CaseStudiesClient from './client'

export const metadata: Metadata = {
  title: 'Case Studies | Wryko',
  description: 'Case studies from Wryko founding partners coming soon. Apply for a pilot to experience AI-powered B2B lead generation.',
  alternates: {
    canonical: 'https://www.wryko.com/case-studies',
  },
}

export default function CaseStudiesPage() {
  return <CaseStudiesClient />
}
