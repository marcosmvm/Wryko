import type { Metadata } from 'next'
import BlogClient from './client'

export const metadata: Metadata = {
  title: 'Blog | Wryko',
  description: 'Insights on B2B lead generation, AI automation, and sales development from the Wryko team.',
  alternates: {
    canonical: 'https://www.wryko.com/blog',
  },
}

export default function BlogPage() {
  return <BlogClient />
}
