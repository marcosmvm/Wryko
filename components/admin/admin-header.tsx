'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, ChevronDown, User, Settings, LogOut, Shield } from 'lucide-react'
import { signOut } from '@/lib/supabase/actions'

interface AdminHeaderProps {
  userName?: string
  onMenuClick: () => void
}

export function AdminHeader({ userName = 'Admin', onMenuClick }: AdminHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleSignOut = async () => {
    await signOut()
  }

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dropdownOpen) {
        setDropdownOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [dropdownOpen])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-expanded="false"
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Page title */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
            <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-primary">Admin Portal</span>
          </div>
        </div>

        {/* Spacer for mobile */}
        <div className="lg:hidden flex-1" />

        {/* User menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            ref={buttonRef}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            aria-label={`User menu for ${userName}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" aria-hidden="true" />
            </div>
            <span className="hidden sm:block text-sm font-medium">{userName}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <div className="p-2">
                <Link
                  href="/admin/settings"
                  onClick={() => setDropdownOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors focus:outline-none focus-visible:bg-muted"
                >
                  <Settings className="w-4 h-4" aria-hidden="true" />
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  role="menuitem"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-destructive focus:outline-none focus-visible:bg-muted"
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
