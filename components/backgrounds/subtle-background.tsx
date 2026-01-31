'use client'

import { GradientMesh } from './gradient-mesh'
import { GridPattern } from './grid-pattern'

interface SubtleBackgroundProps {
  children: React.ReactNode
  showOrb?: boolean
}

export function SubtleBackground({ children, showOrb = false }: SubtleBackgroundProps) {
  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base background */}
        <div className="absolute inset-0 bg-background" />

        {/* Static gradient mesh with low intensity */}
        <GradientMesh intensity="low" animated={false} />

        {/* Very subtle grid */}
        <GridPattern type="dots" spacing={40} opacity={0.03} />

        {/* Optional: Single static orb for hero area */}
        {showOrb && (
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
