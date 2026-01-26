'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, Mail, Phone, MessageCircle } from 'lucide-react'

const actions = [
  {
    label: 'View Reports',
    href: '/dashboard/reports',
    icon: FileText,
  },
  {
    label: 'Campaign Stats',
    href: '/dashboard/campaigns',
    icon: Mail,
  },
  {
    label: 'Book Strategy Call',
    href: '/book-demo',
    icon: Phone,
  },
  {
    label: 'Contact Support',
    href: '/contact',
    icon: MessageCircle,
  },
]

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <h3 className="font-semibold mb-4">Quick Actions</h3>

      <div className="space-y-2">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
          >
            <Link
              href={action.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
