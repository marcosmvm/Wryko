'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Plus, ChevronDown, ArrowRight, Loader2 } from 'lucide-react'
import {
  formatMrr,
  getStatusColor,
  getHealthColor,
  getHealthBgColor,
} from '@/lib/data/admin-mock'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'
import { getClients, type ClientRecord } from '@/lib/supabase/client-actions'

type SortField = 'company_name' | 'health_score' | 'mrr' | 'created_at'
type SortDirection = 'asc' | 'desc'
type ClientStatus = 'active' | 'onboarding' | 'paused' | 'churned'

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all')
  const [sortField, setSortField] = useState<SortField>('company_name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  useEffect(() => {
    async function loadClients() {
      const result = await getClients()
      if (result.data) {
        setClients(result.data)
      }
      setLoading(false)
    }
    loadClients()
  }, [])

  const filteredClients = useMemo(() => {
    let filtered = [...clients]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.company_name.toLowerCase().includes(query) ||
          c.contact_name.toLowerCase().includes(query) ||
          c.contact_email.toLowerCase().includes(query) ||
          c.id.toLowerCase().includes(query)
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((c) => c.status === statusFilter)
    }

    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortField) {
        case 'company_name':
          comparison = a.company_name.localeCompare(b.company_name)
          break
        case 'health_score':
          comparison = a.health_score - b.health_score
          break
        case 'mrr':
          comparison = Number(a.mrr) - Number(b.mrr)
          break
        case 'created_at':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          break
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [clients, searchQuery, statusFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={defaultTransition}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-heading font-bold">Clients</h1>
          <p className="text-muted-foreground">
            Manage your {clients.length} client{clients.length !== 1 ? 's' : ''}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full mt-3" />
        </div>
        <Button variant="elevated" asChild>
          <Link href="/admin/clients/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Link>
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getStaggerDelay(0, 0.2)}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ClientStatus | 'all')}
            className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="onboarding">Onboarding</option>
            <option value="paused">Paused</option>
            <option value="churned">Churned</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </motion.div>

      {/* Client Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getStaggerDelay(1, 0.2)}
      >
        <Card variant="elevated" className="overflow-hidden">
          {loading ? (
            <div className="p-8 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gradient-to-r from-muted/50 to-muted/30">
                    <th
                      className="text-left px-4 py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      onClick={() => handleSort('company_name')}
                    >
                      Company <SortIndicator field="company_name" />
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                      Contact
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                      Plan
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th
                      className="text-left px-4 py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      onClick={() => handleSort('health_score')}
                    >
                      Health <SortIndicator field="health_score" />
                    </th>
                    <th
                      className="text-left px-4 py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      onClick={() => handleSort('mrr')}
                    >
                      MRR <SortIndicator field="mrr" />
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client, index) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={getStaggerDelay(index, 0.3)}
                      className="border-b border-border last:border-0 hover:bg-primary/[0.02] transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium">{client.company_name}</p>
                          <p className="text-xs text-muted-foreground">{client.id.slice(0, 8)}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm">{client.contact_name}</p>
                          <p className="text-xs text-muted-foreground">{client.contact_email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm capitalize">
                          {client.plan.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(client.status as any)}`}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-sm font-bold px-2 py-1 rounded ${getHealthBgColor(client.health_score)} ${getHealthColor(client.health_score)}`}
                        >
                          {client.health_score}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-medium">
                          {formatMrr(Number(client.mrr))}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/clients/${client.id}`} className="group">
                            View
                            <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredClients.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              {clients.length === 0
                ? 'No clients yet. Add your first client to get started.'
                : 'No clients found matching your criteria.'}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  )
}
