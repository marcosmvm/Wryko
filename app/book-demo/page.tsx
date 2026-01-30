import type { Metadata } from 'next'
import BookDemoClient from './client'

export const metadata: Metadata = {
  title: 'Book a Demo | XGrowthOS',
  description: 'Schedule a discovery call with XGrowthOS to learn how our 11 AI engines can transform your B2B lead generation.',
}

export default function BookDemoPage() {
  return <BookDemoClient />
}
