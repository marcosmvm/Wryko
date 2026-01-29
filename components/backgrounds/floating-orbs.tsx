'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingOrbsProps {
  count?: number
  opacity?: number
  blur?: number
}

const orbConfigs = [
  { x: '15%', y: '20%', size: 300, duration: 25, xOffset: 40, yOffset: -30, color: '262 83% 58%' }, // violet
  { x: '85%', y: '15%', size: 250, duration: 30, xOffset: -30, yOffset: 40, color: '45 93% 47%' }, // amber accent
  { x: '75%', y: '75%', size: 280, duration: 22, xOffset: 35, yOffset: 25, color: '270 70% 55%' }, // purple
  { x: '10%', y: '70%', size: 220, duration: 28, xOffset: -25, yOffset: -35, color: '262 83% 68%' }, // light violet
]

export function FloatingOrbs({ count = 4, opacity = 0.12, blur = 100 }: FloatingOrbsProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const orbs = orbConfigs.slice(0, count)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, hsl(${orb.color} / ${opacity}) 0%, hsl(${orb.color} / ${opacity * 0.5}) 40%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            filter: `blur(${blur}px)`,
          }}
          animate={
            !prefersReducedMotion
              ? {
                  x: [0, orb.xOffset, 0, -orb.xOffset * 0.5, 0],
                  y: [0, orb.yOffset, -orb.yOffset * 0.5, orb.yOffset * 0.7, 0],
                }
              : {}
          }
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
