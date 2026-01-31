import type { Metadata } from 'next'
import BlogClient from './client'

export const metadata: Metadata = {
  title: 'Blog | XGrowthOS',
  description: 'Insights on B2B lead generation, AI automation, and sales development from the XGrowthOS team.',
}

export default function BlogPage() {
  return <BlogClient />
}
