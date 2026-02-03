import type { Metadata } from 'next'
import AboutClient from './client'
import { breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Wryko deploys 11 autonomous AI engines to handle every aspect of B2B outbound lead generation. Learn about our platform, our approach, and our team.',
  alternates: {
    canonical: 'https://www.wryko.com/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'About', path: '/about' }])
          ),
        }}
      />
      <AboutClient />
    </>
  )
}
