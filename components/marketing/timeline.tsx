'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineItem {
  day: string
  title: string
  description: string
  icon?: LucideIcon
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

      <div className="space-y-8 md:space-y-12">
        {items.map((item, index) => {
          const Icon = item.icon
          const isEven = index % 2 === 0

          return (
            <motion.div
              key={item.day}
              className={cn(
                'relative flex items-start gap-6',
                'md:gap-0'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Mobile: Icon on left */}
              <div className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                {Icon ? (
                  <Icon className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                )}
              </div>

              {/* Mobile: Content on right */}
              <div className="md:hidden flex-1">
                <span className="inline-block px-2 py-0.5 text-xs font-semibold text-primary bg-primary/10 rounded mb-2">
                  {item.day}
                </span>
                <h3 className="font-heading font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>

              {/* Desktop: Alternating layout */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-8 w-full items-center">
                {/* Left content (even items) */}
                <div className={cn(
                  'text-right',
                  !isEven && 'opacity-0'
                )}>
                  {isEven && (
                    <>
                      <span className="inline-block px-2 py-0.5 text-xs font-semibold text-primary bg-primary/10 rounded mb-2">
                        {item.day}
                      </span>
                      <h3 className="font-heading font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </>
                  )}
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                  {Icon ? (
                    <Icon className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  )}
                </div>

                {/* Right content (odd items) */}
                <div className={cn(
                  'text-left',
                  isEven && 'opacity-0'
                )}>
                  {!isEven && (
                    <>
                      <span className="inline-block px-2 py-0.5 text-xs font-semibold text-primary bg-primary/10 rounded mb-2">
                        {item.day}
                      </span>
                      <h3 className="font-heading font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
