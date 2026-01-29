import type { Metadata } from 'next'
import ResourcesClient from './client'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Free guides, templates, and tools for B2B lead generation. Download whitepapers, email templates, ROI calculators, and case studies.',
}

export default function ResourcesPage() {
  return <ResourcesClient />
}
