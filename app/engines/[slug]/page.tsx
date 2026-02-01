import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EngineDetailClient from './client'
import { engineDetails, getAllEngineSlugs } from '@/lib/data/engine-details'

// Generate static params for all 11 engines
export async function generateStaticParams() {
  return getAllEngineSlugs().map((slug) => ({ slug }))
}

// Dynamic metadata based on engine
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const engine = engineDetails[slug]

  if (!engine) {
    return { title: 'Engine Not Found | Wryko' }
  }

  return {
    title: `${engine.name} - ${engine.tagline} | Wryko`,
    description: engine.heroDescription,
    openGraph: {
      title: `${engine.name} - ${engine.tagline}`,
      description: engine.heroDescription,
      type: 'website',
    },
  }
}

export default async function EngineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Check if engine exists (for metadata generation we already import engineDetails)
  if (!engineDetails[slug]) {
    notFound()
  }

  // Pass only the slug - client component will import the data
  return <EngineDetailClient slug={slug} />
}
