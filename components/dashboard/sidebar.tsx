'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Calendar,
  Mail,
  FileText,
  Shield,
  Users,
  MessageSquare,
  Settings,
  X,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { IconWrapper } from '@/components/ui/icon-wrapper'
import { Logo } from '@/components/ui/logo'
import { springTransition } from '@/lib/animations'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number | string
  badgeVariant?: 'default' | 'success' | 'warning' | 'info'
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/meetings', label: 'Meetings', icon: Calendar, badge: 3, badgeVariant: 'success' },
  { href: '/dashboard/campaigns', label: 'Campaigns', icon: Mail },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/domain-health', label: 'Domain Health', icon: Shield },
  { href: '/dashboard/visitors', label: 'Visitors', icon: Users, badge: 12, badgeVariant: 'info' },
  { href: '/dashboard/requests', label: 'Requests', icon: MessageSquare },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 glass-premium border-r border-border/50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border/50">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Logo variant="lockup" size="sm" />
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href))

              return (
                <motion.div
                  key={item.href}
                  whileHover={{ x: 2 }}
                  transition={springTransition}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary/10 text-primary border-l-[3px] border-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-primary/5 border-l-[3px] border-transparent'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </div>
                    {item.badge && (
                      <Badge
                        variant={item.badgeVariant || 'default'}
                        className="text-[10px] px-1.5 min-w-[1.25rem] justify-center"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Health Score Summary */}
          <div className="p-4 border-t border-border/50">
            <div className="relative overflow-hidden flex items-center gap-3 p-3 rounded-lg glass-card">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary/60 to-primary" />
              <IconWrapper icon={TrendingUp} size="md" variant="success" />
              <div>
                <p className="text-sm font-medium text-success">Health Score</p>
                <p className="text-xl font-bold gradient-text">87</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border/50">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to website
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
