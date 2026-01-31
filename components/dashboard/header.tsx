'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, ChevronDown, ChevronRight, User, Settings, LogOut } from 'lucide-react'
import { signOut } from '@/lib/supabase/actions'
import { fadeIn } from '@/lib/animations'

interface HeaderProps {
  userName?: string
  onMenuClick: () => void
}

const routeLabels: Record<string, string> = {
  dashboard: 'Overview',
  campaigns: 'Campaigns',
  meetings: 'Meetings',
  reports: 'Reports',
  'domain-health': 'Domain Health',
  visitors: 'Visitors',
  requests: 'Requests',
  settings: 'Settings',
}

export function Header({ userName = 'User', onMenuClick }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut()
  }

  // Build breadcrumbs from pathname
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    const isLast = index === segments.length - 1
    return { href, label, isLast }
  })

  return (
    <header className="h-16 border-b border-border/50 glass-premium sticky top-0 z-30">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Breadcrumb navigation */}
        <motion.nav
          {...fadeIn}
          transition={{ duration: 0.3 }}
          className="hidden lg:flex items-center gap-1.5 text-sm"
        >
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              )}
              {crumb.isLast ? (
                <span className="font-medium text-foreground">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </motion.nav>

        {/* Spacer for mobile */}
        <div className="lg:hidden flex-1" />

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200"
          >
            <div className="bg-gradient-to-br from-primary to-secondary p-[2px] rounded-full">
              <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
            </div>
            <span className="hidden sm:block text-sm font-medium">{userName}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 glass-premium glow-border rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary/60 to-primary" />
                <div className="p-2 pt-3">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-destructive/5 transition-colors text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
