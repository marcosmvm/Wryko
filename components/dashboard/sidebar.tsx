'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
          'fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
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
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 border-l-2',
                      isActive
                        ? 'text-foreground border-l-primary font-semibold'
                        : 'text-muted-foreground hover:text-foreground border-l-transparent'
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
                </div>
              )
            })}
          </nav>

          {/* Health Score Summary */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <IconWrapper icon={TrendingUp} size="md" variant="muted" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                <p className="text-xl font-bold text-foreground">87</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
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
