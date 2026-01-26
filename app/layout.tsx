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
    default: 'XGrowthOS - Autonomous B2B Lead Generation',
    template: '%s | XGrowthOS',
  },
  description:
    'Book qualified B2B meetings while you sleep. XGrowthOS is an autonomous lead generation platform powered by 11 AI engines that work 24/7 to identify, engage, and book meetings with your ideal customers.',
  keywords: [
    'B2B lead generation',
    'cold email automation',
    'AI lead generation',
    'automated prospecting',
    'meeting booking service',
    'sales automation',
  ],
  authors: [{ name: 'Marcos Matthews' }],
  creator: 'XGrowthOS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://xgrowthos.com',
    siteName: 'XGrowthOS',
    title: 'XGrowthOS - Autonomous B2B Lead Generation',
    description:
      'Book qualified B2B meetings while you sleep. Powered by 11 AI engines.',
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
    title: 'XGrowthOS - Autonomous B2B Lead Generation',
    description:
      'Book qualified B2B meetings while you sleep. Powered by 11 AI engines.',
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
