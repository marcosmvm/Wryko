import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ResourcePageClient from './client'
import { resources } from '@/lib/data/resources-data'
import { resourceContent } from '@/lib/data/resource-content'

export async function generateStaticParams() {
  return resources.map((r) => ({
    slug: r.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const resource = resources.find((r) => r.id === slug)

  if (!resource) {
    return {
      title: 'Resource Not Found | Wryko Resources',
    }
  }

  return {
    title: `${resource.title} | Wryko Resources`,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      type: 'article',
    },
    alternates: {
      canonical: `https://www.wryko.com/resources/${slug}`,
    },
  }
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const resource = resources.find((r) => r.id === slug)

  if (!resource || !resourceContent[slug]) {
    notFound()
  }

  return <ResourcePageClient slug={slug} />
}
