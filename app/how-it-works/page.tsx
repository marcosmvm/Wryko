import type { Metadata } from 'next'
import HowItWorksClient from './client'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    '11 AI engines working 24/7 to identify, engage, and book qualified B2B meetings. Learn how XGrowthOS automates lead generation and client success.',
}

export default function HowItWorksPage() {
  return <HowItWorksClient />
}
