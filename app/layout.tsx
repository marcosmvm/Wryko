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
    default: 'Wryko | Outbound That Runs Itself',
    template: '%s | Wryko',
  },
  description:
    '11 AI engines replace your SDR team. From prospecting to booked meetings — fully autonomous, fully compliant. Built for B2B teams closing $25K+ deals.',
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
    title: 'Outbound That Runs Itself',
    description:
      '11 AI engines replace your SDR team. From prospecting to booked meetings — fully autonomous, fully compliant. Built for B2B teams closing $25K+ deals.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outbound That Runs Itself',
    description:
      '11 AI engines replace your SDR team. Prospecting to booked meetings — autonomous, compliant, launched in 14 days.',
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
