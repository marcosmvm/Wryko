'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Crown, Users, BarChart3, Globe } from 'lucide-react'
import { isFounder } from '@/lib/auth/founder'
import { createBrowserClient } from '@supabase/ssr'

interface PortalOption {
  name: string
  href: string
  icon: any
  description: string
}

const PORTALS: PortalOption[] = [
  {
    name: 'Marketing Site',
    href: '/',
    icon: Globe,
    description: 'Public website and landing pages'
  },
  {
    name: 'Client Portal',
    href: '/dashboard',
    icon: BarChart3,
    description: 'Client dashboard and campaigns'
  },
  {
    name: 'Admin Portal',
    href: '/admin',
    icon: Users,
    description: 'Admin controls and client management'
  }
]

export function FounderPortalSwitcher() {
  const [isVisible, setIsVisible] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    async function checkFounderStatus() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data: { user } } = await supabase.auth.getUser()
      
      if (user && isFounder(user.email)) {
        setIsVisible(true)
        setUserEmail(user.email)
      }
    }

    checkFounderStatus()
  }, [])

  if (!isVisible) return null

  const currentPortal = PORTALS.find(portal => {
    if (portal.href === '/') {
      return pathname === '/' || (!pathname.startsWith('/dashboard') && !pathname.startsWith('/admin'))
    }
    return pathname.startsWith(portal.href)
  })

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-[280px]">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Founder Access
          </span>
        </div>
        
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          {userEmail}
        </div>

        <div className="space-y-2">
          {PORTALS.map((portal) => {
            const Icon = portal.icon
            const isCurrent = currentPortal?.href === portal.href
            
            return (
              <Link
                key={portal.href}
                href={portal.href}
                className={`flex items-start gap-3 p-2 rounded-md transition-colors ${
                  isCurrent
                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className={`h-4 w-4 mt-0.5 ${
                  isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`} />
                <div>
                  <div className={`text-sm font-medium ${
                    isCurrent ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {portal.name}
                    {isCurrent && (
                      <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {portal.description}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            🔑 You have unrestricted access to all portals
          </div>
        </div>
      </div>
    </div>
  )
}