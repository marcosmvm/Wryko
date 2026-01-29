'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CTASectionProps {
  title: string
  highlightText?: string
  subtitle?: string
  urgencyText?: string
  primaryCta?: {
    href: string
    label: string
  }
  secondaryCta?: {
    href: string
    label: string
  }
  showTrustLine?: boolean
  className?: string
}

export function CTASection({
  title,
  highlightText,
  subtitle,
  urgencyText,
  primaryCta = { href: '/book-demo', label: 'Book Your Discovery Call' },
  secondaryCta,
  showTrustLine = false,
  className,
}: CTASectionProps) {
  const renderTitle = () => {
    if (!highlightText) return title
    const index = title.indexOf(highlightText)
    if (index === -1) return title
    const before = title.slice(0, index)
    const after = title.slice(index + highlightText.length)
    return (
      <>
        {before}
        <span className="gradient-text">{highlightText}</span>
        {after}
      </>
    )
  }

  return (
    <section className={cn('py-20 relative overflow-hidden', className)}>
      {/* Radial gradient background - Enhanced violet glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-radial from-violet-500/12 via-purple-500/5 to-transparent opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {renderTitle()}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg mb-4 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* Urgency Line */}
          {urgencyText && (
            <motion.p
              className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {urgencyText}
            </motion.p>
          )}

          {!urgencyText && subtitle && <div className="mb-8" />}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-violet-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/25"
            >
              {primaryCta.label}
              <ArrowRight className="w-5 h-5" />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-muted transition-colors"
              >
                <Play className="w-4 h-4" />
                {secondaryCta.label}
              </Link>
            )}
          </div>

          {/* Trust Line */}
          {showTrustLine && (
            <motion.p
              className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Shield className="w-4 h-4 text-primary flex-shrink-0" />
              No contracts. Performance-aligned pricing. Cancel anytime.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
