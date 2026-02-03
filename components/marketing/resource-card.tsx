'use client'

import { motion } from 'framer-motion'
import { ArrowRight, type Icon } from '@phosphor-icons/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ResourceCardProps {
  id: string
  title: string
  description: string
  icon: Icon
  downloadUrl: string
  fileType: 'PDF' | 'XLSX' | 'DOC'
  fileSize: string
  featured?: boolean
  index?: number
}

const fileTypeBadgeStyles = {
  PDF: 'bg-red-500/10 text-red-500',
  XLSX: 'bg-green-500/10 text-green-500',
  DOC: 'bg-blue-500/10 text-blue-500',
}

export function ResourceCard({
  id,
  title,
  description,
  icon: Icon,
  downloadUrl,
  fileType,
  fileSize,
  featured = false,
  index = 0,
}: ResourceCardProps) {
  return (
    <motion.div
      className={cn(
        'group relative flex flex-col h-full',
        'rounded-xl border transition-all duration-300',
        'hover:shadow-lg hover:shadow-primary/5',
        featured
          ? 'glass-premium border-primary/20 hover:border-primary/40'
          : 'glass-card hover:border-primary/30'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-3 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
            Popular
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
              featured ? 'bg-primary/20' : 'bg-muted'
            )}
          >
            <Icon
              className={cn(
                'w-6 h-6',
                featured ? 'text-primary' : 'text-muted-foreground'
              )}
              weight="duotone"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={cn(
                  'px-2 py-0.5 text-xs font-medium rounded',
                  fileTypeBadgeStyles[fileType]
                )}
              >
                {fileType}
              </span>
              <span className="text-xs text-muted-foreground">{fileSize}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground flex-1 mb-6">{description}</p>

        {/* View Resource button */}
        <Link
          href={`/resources/${id}`}
          className={cn(
            'flex items-center justify-center gap-2 w-full',
            'px-4 py-3 rounded-lg font-medium text-sm',
            'transition-all duration-200',
            featured
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground'
          )}
        >
          View Resource
          <ArrowRight className="w-4 h-4" weight="bold" />
        </Link>
      </div>
    </motion.div>
  )
}
