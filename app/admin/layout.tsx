'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'
import { ToastProvider } from '@/components/ui/toast'
import { ErrorBoundary } from '@/components/admin/error-boundary'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
            <AdminHeader
              userName="Admin"
              onMenuClick={() => setSidebarOpen(true)}
            />

            <main className="flex-1 p-4 lg:p-6">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>
          </div>
        </div>
      </div>
    </ToastProvider>
  )
}
