'use client'

import { cn } from '@/lib/utils'
import { GridPattern } from './grid-pattern'

type SectionVariant =
  | 'demo'
  | 'proof'
  | 'channels'
  | 'process'
  | 'roi'
  | 'comparison'
  | 'compliance'
  | 'cta'

interface SectionBackgroundProps {
  children: React.ReactNode
  variant: SectionVariant
  className?: string
  fadeEdges?: 'top' | 'bottom' | 'both' | 'none'
}

function VariantLayers({ variant }: { variant: SectionVariant }) {
  switch (variant) {
    case 'demo':
      return (
        <>
          {/* Base tint */}
          <div
            className="absolute inset-0"
            style={{ background: 'hsl(224 76% 48% / 0.08)' }}
          />
          {/* Center glow behind video */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 60%, hsl(224 76% 48% / 0.20), transparent)',
            }}
          />
        </>
      )

    case 'proof':
      return (
        <>
          {/* Base tint */}
          <div
            className="absolute inset-0"
            style={{ background: 'hsl(45 93% 60% / 0.07)' }}
          />
          <GridPattern type="dots" spacing={40} opacity={0.08} />
          {/* Amber glow upper-right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle 300px at 85% 20%, hsl(45 93% 47% / 0.18), transparent)',
            }}
          />
        </>
      )

    case 'channels':
      return (
        <>
          {/* Base tint */}
          <div
            className="absolute inset-0"
            style={{ background: 'hsl(262 50% 60% / 0.06)' }}
          />
          <GridPattern type="circuit" spacing={50} opacity={0.08} />
          {/* Violet glow lower-left */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle 350px at 15% 80%, hsl(262 72% 54% / 0.18), transparent)',
            }}
          />
          {/* Blue glow upper-right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle 300px at 85% 15%, hsl(224 76% 48% / 0.15), transparent)',
            }}
          />
        </>
      )

    case 'process':
      return (
        <>
          {/* Base tint */}
          <div
            className="absolute inset-0"
            style={{ background: 'hsl(262 40% 60% / 0.05)' }}
          />
          <GridPattern type="lines" spacing={35} opacity={0.07} />
          {/* Horizontal gradient: amber → violet → blue */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, hsl(45 93% 47% / 0.15) 0%, hsl(262 72% 54% / 0.20) 40%, hsl(224 76% 48% / 0.15) 100%)',
            }}
          />
        </>
      )

    case 'roi':
      return (
        <>
          {/* Base tint */}
          <div
            className="absolute inset-0"
            style={{ background: 'hsl(45 80% 55% / 0.07)' }}
          />
          <GridPattern type="dots" spacing={25} opacity={0.07} />
          {/* Gold center glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 60% at 50% 50%, hsl(45 93% 47% / 0.22), transparent)',
            }}
          />
          {/* Violet outer ring */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 80% at 50% 50%, hsl(262 72% 54% / 0.12), transparent)',
            }}
          />
        </>
      )

    case 'comparison':
      return (
        <>
          {/* Violet left half (AI side) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, hsl(262 72% 54% / 0.15) 0%, transparent 55%)',
            }}
          />
          {/* Amber right half (Human side) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(270deg, hsl(45 93% 47% / 0.15) 0%, transparent 55%)',
            }}
          />
        </>
      )

    case 'compliance':
      return (
        <>
          {/* Base tint */}
          <div
            className="absolute inset-0"
            style={{ background: 'hsl(224 60% 55% / 0.06)' }}
          />
          <GridPattern type="lines" spacing={30} opacity={0.07} />
          {/* Blue center glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, hsl(224 76% 48% / 0.16), transparent 70%)',
            }}
          />
          {/* Green accent at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle 200px at 50% 80%, hsl(142 76% 36% / 0.14), transparent)',
            }}
          />
        </>
      )

    case 'cta':
      return (
        <>
          {/* Base tint */}
          <div
            className="absolute inset-0"
            style={{ background: 'hsl(262 60% 55% / 0.08)' }}
          />
          <GridPattern type="circuit" spacing={60} opacity={0.07} />
          {/* Violet convergence glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 40%, hsl(262 72% 54% / 0.22), transparent 60%)',
            }}
          />
        </>
      )
  }
}

export function SectionBackground({
  children,
  variant,
  className,
  fadeEdges = 'none',
}: SectionBackgroundProps) {
  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'absolute inset-0 overflow-hidden pointer-events-none -z-[1]',
          fadeEdges === 'top' && 'section-fade-top',
          fadeEdges === 'bottom' && 'section-fade-bottom',
          fadeEdges === 'both' && 'section-fade-both'
        )}
      >
        <VariantLayers variant={variant} />
      </div>
      {children}
    </div>
  )
}
