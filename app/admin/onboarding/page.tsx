'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Rocket,
  Clock,
  AlertTriangle,
  Users,
  Mail,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Search,
  ChevronDown,
} from 'lucide-react'
import { AdminStatsCard } from '@/components/admin/admin-stats-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'
import { getOnboardingClients, activateClient } from '@/lib/supabase/admin-actions'
import { adminCsmWorkflows } from '@/lib/n8n/client'
import type { AdminOnboardingClient } from '@/lib/types/admin'

const STUCK_THRESHOLD_DAYS = 14

type SortOption = 'days_desc' | 'days_asc' | 'name_asc'

export default function OnboardingPipelinePage() {
  const [clients, setClients] = useState<AdminOnboardingClient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('days_desc')
  const [activatingId, setActivatingId] = useState<string | null>(null)
  const [advancingId, setAdvancingId] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      const result = await getOnboardingClients()
      if (result.data) setClients(result.data)
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const totalOnboarding = clients.length
  const avgDays =
    clients.length > 0
      ? Math.round(clients.reduce((sum, c) => sum + c.daysInOnboarding, 0) / clients.length)
      : 0
  const stuckCount = clients.filter((c) => c.daysInOnboarding > STUCK_THRESHOLD_DAYS).length

  const filteredClients = clients
    .filter((c) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          c.companyName.toLowerCase().includes(query) ||
          c.contactName.toLowerCase().includes(query) ||
          c.contactEmail.toLowerCase().includes(query)
        )
      }
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'days_desc':
          return b.daysInOnboarding - a.daysInOnboarding
        case 'days_asc':
          return a.daysInOnboarding - b.daysInOnboarding
        case 'name_asc':
          return a.companyName.localeCompare(b.companyName)
        default:
          return 0
      }
    })

  const getPlanBadge = (plan: AdminOnboardingClient['plan']) => {
    switch (plan) {
      case 'founding_partner':
        return (
          <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
            Founding Partner
          </span>
        )
      case 'scale':
        return (
          <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
            Scale
          </span>
        )
      case 'enterprise':
        return (
          <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium">
            Enterprise
          </span>
        )
    }
  }

  const getProgressPercent = (days: number) => {
    // Approximate progress: onboarding takes ~14 days ideally
    const progress = Math.min(Math.round((days / STUCK_THRESHOLD_DAYS) * 100), 100)
    return progress
  }

  const getProgressColor = (days: number) => {
    if (days <= 7) return 'bg-emerald-500'
    if (days <= STUCK_THRESHOLD_DAYS) return 'bg-blue-500'
    return 'bg-amber-500'
  }

  async function handleActivateClient(clientId: string) {
    setActivatingId(clientId)
    try {
      const result = await activateClient(clientId)
      if (result.success) {
        setClients((prev) => prev.filter((c) => c.id !== clientId))
      }
    } finally {
      setActivatingId(null)
    }
  }

  async function handleAdvanceStep(clientId: string) {
    setAdvancingId(clientId)
    try {
      await adminCsmWorkflows.advanceOnboarding(clientId, 'next')
    } finally {
      setAdvancingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={defaultTransition}
      >
        <h1 className="text-2xl font-heading font-bold">Onboarding Pipeline</h1>
        <p className="text-muted-foreground">
          Engine L (The Launcher) -- Manage client onboarding progress
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full mt-3" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <AdminStatsCard
          label="Total Onboarding"
          value={totalOnboarding}
          icon={Users}
          variant="primary"
          index={0}
        />
        <AdminStatsCard
          label="Avg Days"
          value={avgDays}
          icon={Clock}
          variant="blue"
          index={1}
        />
        <AdminStatsCard
          label={`Stuck (>${STUCK_THRESHOLD_DAYS} days)`}
          value={stuckCount}
          icon={AlertTriangle}
          variant="amber"
          index={2}
        />
      </div>

      {/* Filters */}
      <motion.div
        {...fadeInUp}
        transition={getStaggerDelay(1)}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by company or contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          >
            <option value="days_desc">Longest First</option>
            <option value="days_asc">Newest First</option>
            <option value="name_asc">Name A-Z</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </motion.div>

      {/* Onboarding Cards Grid */}
      {filteredClients.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client, index) => {
            const isStuck = client.daysInOnboarding > STUCK_THRESHOLD_DAYS
            const progress = getProgressPercent(client.daysInOnboarding)

            return (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={getStaggerDelay(index, 0.3)}
              >
                <Card
                  variant="elevated"
                  className={`overflow-hidden transition-all ${
                    isStuck ? 'ring-2 ring-amber-500/30 border-amber-500/20' : ''
                  }`}
                >
                  <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm">{client.companyName}</h3>
                          {isStuck && (
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{client.contactName}</p>
                      </div>
                      {getPlanBadge(client.plan)}
                    </div>

                    {/* Contact */}
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{client.contactEmail}</span>
                    </div>

                    {/* Days in Onboarding */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Days in onboarding</span>
                      <span
                        className={`text-sm font-bold ${
                          isStuck ? 'text-amber-500' : 'text-foreground'
                        }`}
                      >
                        {client.daysInOnboarding} days
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
                      <div
                        className={`h-full rounded-full transition-all ${getProgressColor(
                          client.daysInOnboarding
                        )}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Started Date */}
                    <p className="text-xs text-muted-foreground mb-4">
                      Started {new Date(client.onboardingStartedAt).toLocaleDateString()}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        disabled={advancingId === client.id}
                        onClick={() => handleAdvanceStep(client.id)}
                      >
                        {advancingId === client.id ? (
                          <Loader2 className="w-3 h-3 animate-spin mr-1" />
                        ) : (
                          <ArrowRight className="w-3 h-3 mr-1" />
                        )}
                        Advance Step
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        disabled={activatingId === client.id}
                        onClick={() => handleActivateClient(client.id)}
                      >
                        {activatingId === client.id ? (
                          <Loader2 className="w-3 h-3 animate-spin mr-1" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        )}
                        Activate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <Card variant="elevated" className="p-8 text-center">
          <Rocket className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            {searchQuery
              ? 'No onboarding clients match your search.'
              : 'No clients currently onboarding. All caught up!'}
          </p>
        </Card>
      )}
    </div>
  )
}
