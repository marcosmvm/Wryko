import type { Metadata } from 'next'
import CaseStudiesClient from './client'

export const metadata: Metadata = {
  title: 'Case Studies | Wryko',
  description: 'Case studies from Wryko founding partners coming soon. Apply for a pilot to experience AI-powered B2B lead generation.',
}

export default function CaseStudiesPage() {
  return <CaseStudiesClient />
}
