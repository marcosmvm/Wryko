import type { Metadata } from 'next'
import AboutClient from './client'

export const metadata: Metadata = {
  title: 'About',
  description:
    'XGrowthOS deploys 11 autonomous AI engines to handle every aspect of B2B outbound lead generation. Learn about our platform, our approach, and our team.',
}

export default function AboutPage() {
  return <AboutClient />
}
