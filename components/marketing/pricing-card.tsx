'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  name: string
  badge?: string
  retainer: number | string
  onboarding: number | string
  meetingBonus: number | string
  domains: string
  emails: string
  support: string
  featured?: boolean
  ctaLabel?: string
  ctaHref?: string
  index?: number
}

export function PricingCard({
  name,
  badge,
  retainer,
  onboarding,
  meetingBonus,
  domains,
  emails,
  support,
  featured = false,
  ctaLabel = 'Get Started',
  ctaHref = '/book-demo',
  index = 0,
}: PricingCardProps) {
  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price
    return `$${price.toLocaleString()}`
  }

  return (
    <motion.div
      className={cn(
        'rounded-2xl p-8 flex flex-col',
        featured
          ? 'bg-gradient-to-b from-primary/10 via-primary/5 to-transparent border-2 border-primary shadow-lg'
          : 'bg-card border border-border'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-6">
        {badge && (
          <span
            className={cn(
              'inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3',
              featured
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {badge}
          </span>
        )}
        <h3 className="font-heading text-xl font-bold">{name}</h3>
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-heading font-bold">{formatPrice(retainer)}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <div className="text-sm text-muted-foreground mt-2 space-y-1">
          <p>{formatPrice(onboarding)} one-time onboarding</p>
          <p>{formatPrice(meetingBonus)} per qualified meeting</p>
        </div>
      </div>

      {/* Features */}
      <div className="flex-1 space-y-3 mb-8">
        <Feature>{domains} sending domains</Feature>
        <Feature>{emails} emails/month</Feature>
        <Feature>{support} strategy calls</Feature>
        <Feature>All 11 AI engines</Feature>
        <Feature>24/7 client portal</Feature>
        <Feature>Automated weekly reports</Feature>
        <Feature>CRM integration</Feature>
      </div>

      {/* CTA */}
      <Link
        href={ctaHref}
        className={cn(
          'block w-full py-3 px-4 rounded-lg font-semibold text-center transition-colors',
          featured
            ? 'bg-primary text-white hover:bg-primary/90'
            : 'border border-border hover:bg-muted'
        )}
      >
        {ctaLabel}
      </Link>
    </motion.div>
  )
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <span className="text-sm">{children}</span>
    </div>
  )
}
