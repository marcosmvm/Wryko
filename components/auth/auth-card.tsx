'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Logo } from '@/components/ui/logo'

interface AuthCardProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthCard({ children, title, description }: AuthCardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link href="/" className="flex items-center gap-2">
          <Logo variant="lockup" size="md" />
        </Link>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg shadow-black/5 dark:shadow-black/20 glow-border-hover relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary" />
          <div className="text-center mb-6">
            <h1 className="font-heading text-2xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          {children}
        </div>
      </motion.div>

      {/* Back to home */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6"
      >
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </motion.div>
    </div>
  )
}
