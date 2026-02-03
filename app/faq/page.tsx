import type { Metadata } from 'next'
import FAQClient from './client'
import { faqCategoriesServer } from '@/lib/data/server-metadata'
import { faqPageSchema, breadcrumbSchema } from '@/lib/seo/schemas'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Wryko - B2B lead generation, pricing, integrations, compliance, and getting started.',
  alternates: {
    canonical: 'https://www.wryko.com/faq',
  },
}

export default function FAQPage() {
  const allQuestions = faqCategoriesServer.flatMap((cat) => cat.items)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(allQuestions)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'FAQ', path: '/faq' }])
          ),
        }}
      />
      <FAQClient />
    </>
  )
}
