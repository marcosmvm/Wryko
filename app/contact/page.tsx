import type { Metadata } from 'next'
import ContactClient from './client'

export const metadata: Metadata = {
  title: 'Contact Us | XGrowthOS',
  description: 'Get in touch with the XGrowthOS team. We respond to all inquiries within 24 hours.',
}

export default function ContactPage() {
  return <ContactClient />
}
