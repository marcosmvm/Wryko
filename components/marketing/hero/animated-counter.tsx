'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (!isInView) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setDisplayValue(end.toFixed(decimals))
      return
    }

    const controls = animate(count, end, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(latest.toFixed(decimals))
      },
    })

    return controls.stop
  }, [isInView, end, duration, decimals, count])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}
