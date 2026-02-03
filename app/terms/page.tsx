import type { Metadata } from 'next'
import TermsClient from './client'

export const metadata: Metadata = {
  title: 'Terms of Service | Wryko',
  description: 'Wryko Terms of Service - The agreement governing your use of our platform.',
  alternates: {
    canonical: 'https://www.wryko.com/terms',
  },
}

export default function TermsPage() {
  return <TermsClient />
}
