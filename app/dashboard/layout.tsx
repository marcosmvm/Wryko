'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { ToastProvider } from '@/components/ui/toast'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
            <Header
              userName="User"
              onMenuClick={() => setSidebarOpen(true)}
            />

            <main className="flex-1 p-4 lg:p-8 relative overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] glow-primary pointer-events-none opacity-20" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="relative"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </ToastProvider>
  )
}
