import type { Metadata } from 'next'
import PrivacyClient from './client'

export const metadata: Metadata = {
  title: 'Privacy Policy | Wryko',
  description: 'Wryko Privacy Policy - Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://www.wryko.com/privacy',
  },
}

export default function PrivacyPage() {
  return <PrivacyClient />
}
