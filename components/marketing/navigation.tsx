'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'

const navLinks = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo variant="lockup" size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg font-medium border border-border hover:bg-muted hover:border-primary/30 transition-all"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all shadow-sm shadow-primary/10"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="mx-2 mt-2 px-4 py-2 rounded-lg font-medium border border-border hover:bg-muted hover:border-primary/30 transition-all text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="mx-2 mt-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all shadow-sm shadow-primary/10 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
