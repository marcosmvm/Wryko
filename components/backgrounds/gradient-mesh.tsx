'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GradientMeshProps {
  intensity?: 'high' | 'medium' | 'low'
  animated?: boolean
}

const intensityMap = {
  high: { opacity: 0.25, scale: 1.2 },
  medium: { opacity: 0.15, scale: 1 },
  low: { opacity: 0.08, scale: 0.9 },
}

const blobs = [
  { x: '10%', y: '20%', size: 600, delay: 0, color: '262 83% 58%' }, // violet-500
  { x: '80%', y: '10%', size: 500, delay: 2, color: '262 83% 68%' }, // primary (lighter)
  { x: '70%', y: '70%', size: 550, delay: 4, color: '270 70% 50%' }, // purple-600
  { x: '20%', y: '80%', size: 450, delay: 6, color: '280 65% 55%' }, // purple-500
]

export function GradientMesh({ intensity = 'medium', animated = true }: GradientMeshProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const { opacity, scale } = intensityMap[intensity]

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const shouldAnimate = animated && !prefersReducedMotion

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size * scale,
            height: blob.size * scale,
            background: `radial-gradient(circle, hsl(${blob.color} / ${opacity}) 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(60px)',
          }}
          initial={false}
          animate={
            shouldAnimate
              ? {
                  x: [0, 30, -20, 10, 0],
                  y: [0, -20, 30, -10, 0],
                  scale: [1, 1.1, 0.95, 1.05, 1],
                }
              : {}
          }
          transition={
            shouldAnimate
              ? {
                  duration: 20 + index * 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: blob.delay,
                }
              : {}
          }
        />
      ))}
    </div>
  )
}
