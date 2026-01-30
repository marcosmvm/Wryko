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
  available?: boolean
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
  available = true,
}: PricingCardProps) {
  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price
    return `$${price.toLocaleString()}`
  }

  return (
    <motion.div
      className={cn(
        'rounded-2xl p-8 flex flex-col relative',
        available
          ? featured
            ? 'bg-gradient-to-b from-primary/10 via-primary/5 to-transparent border-2 border-primary shadow-lg glow-border glow-pulse'
            : 'bg-card border border-border glow-border-hover'
          : 'bg-card/50 border border-border/50 opacity-60'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: available ? 1 : 0.6, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Unavailable overlay label */}
      {!available && (
        <div className="absolute top-4 right-4">
          <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border border-dashed border-muted-foreground/40 rounded-full">
            Coming Soon
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        {badge && (
          <span
            className={cn(
              'inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3',
              !available
                ? 'bg-muted/50 text-muted-foreground border border-dashed border-muted-foreground/30'
                : featured
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
          <span className={cn(
            'text-4xl font-heading font-bold',
            !available && 'text-muted-foreground'
          )}>
            {formatPrice(retainer)}
          </span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <div className="text-sm text-muted-foreground mt-2 space-y-1">
          <p>{formatPrice(onboarding)} one-time onboarding</p>
          <p>{formatPrice(meetingBonus)} per qualified meeting</p>
        </div>
      </div>

      {/* Features */}
      <div className="flex-1 space-y-3 mb-8">
        <Feature muted={!available}>{domains} sending domains</Feature>
        <Feature muted={!available}>{emails} emails/month</Feature>
        <Feature muted={!available}>{support} strategy calls</Feature>
        <Feature muted={!available}>All 11 AI engines</Feature>
        <Feature muted={!available}>24/7 client portal</Feature>
        <Feature muted={!available}>Automated weekly reports</Feature>
        <Feature muted={!available}>CRM integration</Feature>
      </div>

      {/* CTA */}
      {available ? (
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
      ) : (
        <div className="block w-full py-3 px-4 rounded-lg text-center text-sm text-muted-foreground border border-dashed border-border cursor-default">
          Available After Pilot
        </div>
      )}
    </motion.div>
  )
}

function Feature({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <Check className={cn('w-5 h-5 flex-shrink-0 mt-0.5', muted ? 'text-muted-foreground/50' : 'text-primary')} />
      <span className={cn('text-sm', muted && 'text-muted-foreground')}>{children}</span>
    </div>
  )
}
