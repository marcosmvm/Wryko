import type { Metadata } from 'next'
import HowItWorksClient from './client'
import { breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    '11 AI engines working 24/7 to identify, engage, and book qualified B2B meetings. Learn how Wryko automates lead generation and client success.',
  alternates: {
    canonical: 'https://www.wryko.com/how-it-works',
  },
}

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'How It Works', path: '/how-it-works' }])
          ),
        }}
      />
      <HowItWorksClient />
    </>
  )
}
