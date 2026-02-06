'use client'

import { type ComponentType, useState } from 'react'
import { motion } from 'framer-motion'
import { BrowserFrame } from './browser-frame'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'
import {
  DashboardHomeMockup,
  DashboardCampaignsMockup,
  DashboardAnalyticsMockup,
} from './dashboard-mockups'

interface DashboardView {
  label: string
  url: string
  Component: ComponentType
}

const dashboardViews: DashboardView[] = [
  {
    label: 'Dashboard',
    url: 'app.wryko.com/dashboard',
    Component: DashboardHomeMockup,
  },
  {
    label: 'Campaigns',
    url: 'app.wryko.com/dashboard/campaigns',
    Component: DashboardCampaignsMockup,
  },
  {
    label: 'Analytics',
    url: 'app.wryko.com/dashboard/analytics',
    Component: DashboardAnalyticsMockup,
  },
]

interface ProductShowcaseProps {
  className?: string
}

export function ProductShowcase({ className }: ProductShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeView = dashboardViews[activeIndex]
  const ActiveComponent = activeView.Component

  return (
    <section className={cn('py-20 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="THE PLATFORM"
          title="Your Real-Time Command Center"
          highlight="Command Center"
          subtitle="Monitor every engine, every campaign, and every metric from a single dashboard designed for clarity."
        />

        {/* Main browser frame */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BrowserFrame url={activeView.url}>
            <ActiveComponent />
          </BrowserFrame>
        </motion.div>

        {/* Tab selector */}
        {dashboardViews.length > 1 && (
          <motion.div
            className="flex items-center justify-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {dashboardViews.map((view, index) => (
              <button
                key={view.label}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  index === activeIndex
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                {view.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
