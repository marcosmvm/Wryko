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
    default: 'XGrowthOS - AI-Powered B2B Lead Generation Platform',
    template: '%s | XGrowthOS',
  },
  description:
    'XGrowthOS is an autonomous B2B lead generation platform powered by 11 AI engines. Designed for companies with $25K+ deals who want scalable, compliant outbound.',
  keywords: [
    'B2B lead generation platform',
    'AI-powered outbound',
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
    title: 'XGrowthOS - AI-Powered B2B Lead Generation Platform',
    description:
      'Autonomous B2B lead generation powered by 11 AI engines. Designed for companies with $25K+ deals who want scalable, compliant outbound.',
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
    title: 'XGrowthOS - AI-Powered B2B Lead Generation Platform',
    description:
      'Autonomous B2B lead generation powered by 11 AI engines. Designed for companies with $25K+ deals.',
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
