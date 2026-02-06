import type { MetadataRoute } from 'next'

// Slugs are inlined to avoid importing data files that contain Phosphor
// React icons (which require createContext, unavailable in route handlers).
const engineSlugs = [
  'the-guardian', 'the-architect', 'the-scientist', 'the-hunter',
  'the-sentinel', 'the-informant', 'the-judge', 'the-keeper',
  'the-launcher', 'the-monitor', 'the-navigator',
]

const resourceSlugs = [
  'ultimate-guide-b2b-outbound', 'roi-calculator-spreadsheet',
  'cold-email-template-pack', 'icp-definition-worksheet',
  'email-deliverability-checklist', 'subject-line-swipe-file',
  'outbound-metrics-tracker', 'follow-up-sequence-guide',
]

const BASE_URL = 'https://www.wryko.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/book-demo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Engine pages
  const enginePages: MetadataRoute.Sitemap = engineSlugs.map((slug) => ({
    url: `${BASE_URL}/engines/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Resource pages
  const resourcePages: MetadataRoute.Sitemap = resourceSlugs.map((slug) => ({
    url: `${BASE_URL}/resources/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Blog posts — slugs defined inline in app/blog/[slug]/page.tsx.
  // If posts are added there, update this list to match.
  const blogSlugs = [
    'future-of-b2b-lead-generation',
    'cold-email-best-practices-2025',
    'scaling-outbound-without-sdrs',
    'email-deliverability-guide',
  ]
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...enginePages, ...resourcePages, ...blogPages]
}
