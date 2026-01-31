import type { Metadata } from 'next'
import TermsClient from './client'

export const metadata: Metadata = {
  title: 'Terms of Service | XGrowthOS',
  description: 'XGrowthOS Terms of Service - The agreement governing your use of our platform.',
}

export default function TermsPage() {
  return <TermsClient />
}
