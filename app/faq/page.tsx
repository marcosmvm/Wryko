import type { Metadata } from 'next'
import FAQClient from './client'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Wryko - B2B lead generation, pricing, integrations, compliance, and getting started.',
}

export default function FAQPage() {
  return <FAQClient />
}
