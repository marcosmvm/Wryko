'use client'

import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'

interface FAQSearchProps {
  value: string
  onChange: (value: string) => void
  resultCount: number
  totalCount: number
  className?: string
}

export function FAQSearch({
  value,
  onChange,
  resultCount,
  totalCount,
  className,
}: FAQSearchProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="glass-card rounded-xl p-1.5">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Search ${totalCount} questions...`}
            className="w-full bg-transparent pl-12 pr-12 py-3.5 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute right-4 w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
      {value.trim() && (
        <motion.p
          className="text-xs text-muted-foreground mt-2 ml-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {resultCount} {resultCount === 1 ? 'question' : 'questions'} found
        </motion.p>
      )}
    </motion.div>
  )
}
