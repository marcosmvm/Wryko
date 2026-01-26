import type { Metadata } from 'next'
import AboutClient from './client'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Marcos Matthews and learn about the XGrowthOS mission to democratize enterprise-grade B2B lead generation through AI.',
}

export default function AboutPage() {
  return <AboutClient />
}
