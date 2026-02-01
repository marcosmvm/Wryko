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
  metadataBase: new URL('https://www.wryko.com'),
  title: {
    default: 'Wryko - AI-Powered B2B Lead Generation Platform',
    template: '%s | Wryko',
  },
  description:
    'Wryko is an autonomous B2B lead generation platform powered by 11 AI engines. Designed for companies with $25K+ deals who want scalable, compliant outbound.',
  keywords: [
    'B2B lead generation platform',
    'AI-powered outbound',
    'outbound lead generation',
    'sales meeting scheduling',
    'B2B appointment setting',
    'enterprise lead generation',
  ],
  authors: [{ name: 'Marcos Matthews' }],
  creator: 'Wryko',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.wryko.com',
    siteName: 'Wryko',
    title: 'Wryko - AI-Powered B2B Lead Generation Platform',
    description:
      'Autonomous B2B lead generation powered by 11 AI engines. Designed for companies with $25K+ deals who want scalable, compliant outbound.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wryko',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wryko - AI-Powered B2B Lead Generation Platform',
    description:
      'Autonomous B2B lead generation powered by 11 AI engines. Designed for companies with $25K+ deals.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
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
