import type { Metadata } from 'next'
import ContactClient from './client'

export const metadata: Metadata = {
  title: 'Contact Us | Wryko',
  description: 'Get in touch with the Wryko team. We respond to all inquiries within 24 hours.',
  alternates: {
    canonical: 'https://www.wryko.com/contact',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
