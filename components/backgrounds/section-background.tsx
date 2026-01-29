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
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 60%, hsl(224 76% 48% / 0.06), transparent)',
          }}
        />
      )

    case 'proof':
      return (
        <>
          <GridPattern type="dots" spacing={40} opacity={0.03} />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle 300px at 85% 20%, hsl(45 93% 47% / 0.05), transparent)',
            }}
          />
        </>
      )

    case 'channels':
      return (
        <>
          <GridPattern type="circuit" spacing={50} opacity={0.03} />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle 350px at 15% 80%, hsl(262 72% 54% / 0.05), transparent)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle 300px at 85% 15%, hsl(224 76% 48% / 0.04), transparent)',
            }}
          />
        </>
      )

    case 'process':
      return (
        <>
          <GridPattern type="lines" spacing={35} opacity={0.025} />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, hsl(45 93% 47% / 0.04) 0%, hsl(262 72% 54% / 0.06) 40%, hsl(224 76% 48% / 0.04) 100%)',
            }}
          />
        </>
      )

    case 'roi':
      return (
        <>
          <GridPattern type="dots" spacing={25} opacity={0.02} />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 60% at 50% 50%, hsl(45 93% 47% / 0.07), transparent)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 80% at 50% 50%, hsl(262 72% 54% / 0.03), transparent)',
            }}
          />
        </>
      )

    case 'comparison':
      return (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, hsl(262 72% 54% / 0.04) 0%, transparent 55%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(270deg, hsl(45 93% 47% / 0.04) 0%, transparent 55%)',
            }}
          />
        </>
      )

    case 'compliance':
      return (
        <>
          <GridPattern type="lines" spacing={30} opacity={0.025} />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, hsl(224 76% 48% / 0.04), transparent 70%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle 200px at 50% 80%, hsl(142 76% 36% / 0.04), transparent)',
            }}
          />
        </>
      )

    case 'cta':
      return (
        <>
          <GridPattern type="circuit" spacing={60} opacity={0.02} />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 40%, hsl(262 72% 54% / 0.06), transparent 60%)',
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
