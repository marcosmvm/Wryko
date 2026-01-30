import type { Metadata } from 'next'
import CaseStudiesClient from './client'

export const metadata: Metadata = {
  title: 'Case Studies | XGrowthOS',
  description: 'Case studies from XGrowthOS founding partners coming soon. Apply for a pilot to experience AI-powered B2B lead generation.',
}

export default function CaseStudiesPage() {
  return <CaseStudiesClient />
}
