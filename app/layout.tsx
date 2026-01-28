import type { Metadata } from 'next'
import { Sora, Figtree } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'XGrowthOS - 25-40 Qualified B2B Meetings Per Month',
    template: '%s | XGrowthOS',
  },
  description:
    'We book 25-40 qualified sales meetings per month for B2B companies with $25K+ contracts. Proven results: $2.1M pipeline in 90 days. See if you qualify.',
  keywords: [
    'B2B meeting booking service',
    'qualified sales meetings',
    'outbound lead generation',
    'sales meeting scheduling',
    'B2B appointment setting',
    'enterprise lead generation',
  ],
  authors: [{ name: 'Marcos Matthews' }],
  creator: 'XGrowthOS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://xgrowthos.com',
    siteName: 'XGrowthOS',
    title: 'XGrowthOS - 25-40 Qualified B2B Meetings Per Month',
    description:
      'We book 25-40 qualified sales meetings per month for B2B companies with $25K+ contracts. Proven results: $2.1M pipeline in 90 days.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'XGrowthOS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XGrowthOS - 25-40 Qualified B2B Meetings Per Month',
    description:
      'We book 25-40 qualified sales meetings per month for B2B companies with $25K+ contracts. See if you qualify.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${figtree.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
