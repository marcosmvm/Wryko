import type { Metadata } from 'next'
import ResourcesClient from './client'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Free guides, templates, and tools for B2B lead generation. Download whitepapers, email templates, and outbound strategy resources.',
}

export default function ResourcesPage() {
  return <ResourcesClient />
}
