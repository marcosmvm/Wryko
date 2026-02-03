'use client'

import { motion } from 'framer-motion'
import { Lightning } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface AnnouncementBarProps {
  className?: string
}

export function AnnouncementBar({ className }: AnnouncementBarProps) {
  return (
    <motion.div
      className={cn(
        'w-full py-2.5 px-4 bg-primary/5 border-b border-primary/10',
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <p className="text-sm text-center flex items-center justify-center gap-2">
        <Lightning className="w-4 h-4 text-primary" weight="duotone" />
        <span className="text-muted-foreground">Founding Partner Program</span>
        <span className="font-semibold text-primary">
          Now accepting pilot applications
        </span>
      </p>
    </motion.div>
  )
}
