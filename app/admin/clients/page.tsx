'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Plus, Filter, ChevronDown } from 'lucide-react'
import {
  mockClients,
  formatMrr,
  getStatusColor,
  getHealthColor,
  getHealthBgColor,
  AdminClient,
} from '@/lib/data/admin-mock'

type SortField = 'companyName' | 'healthScore' | 'mrr' | 'createdAt'
type SortDirection = 'asc' | 'desc'

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminClient['status'] | 'all'>('all')
  const [sortField, setSortField] = useState<SortField>('companyName')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const filteredClients = useMemo(() => {
    let clients = [...mockClients]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      clients = clients.filter(
        (c) =>
          c.companyName.toLowerCase().includes(query) ||
          c.contactName.toLowerCase().includes(query) ||
          c.contactEmail.toLowerCase().includes(query) ||
          c.clientId.toLowerCase().includes(query)
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      clients = clients.filter((c) => c.status === statusFilter)
    }

    // Apply sorting
    clients.sort((a, b) => {
      let comparison = 0
      switch (sortField) {
        case 'companyName':
          comparison = a.companyName.localeCompare(b.companyName)
          break
        case 'healthScore':
          comparison = a.healthScore - b.healthScore
          break
        case 'mrr':
          comparison = a.mrr - b.mrr
          break
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return clients
  }, [searchQuery, statusFilter, sortField, sortDirection])

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-muted-foreground">
            Manage your {mockClients.length} clients
          </p>
        </div>
        <Link
          href="/admin/clients/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AdminClient['status'] | 'all')}
            className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="onboarding">Onboarding</option>
            <option value="paused">Paused</option>
            <option value="churned">Churned</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th
                  className="text-left px-4 py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('companyName')}
                >
                  Company <SortIndicator field="companyName" />
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
                  className="text-left px-4 py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('healthScore')}
                >
                  Health <SortIndicator field="healthScore" />
                </th>
                <th
                  className="text-left px-4 py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
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
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium">{client.companyName}</p>
                      <p className="text-xs text-muted-foreground">{client.clientId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm">{client.contactName}</p>
                      <p className="text-xs text-muted-foreground">{client.contactEmail}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm capitalize">
                      {client.plan.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(client.status)}`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-sm font-bold px-2 py-1 rounded ${getHealthBgColor(client.healthScore)} ${getHealthColor(client.healthScore)}`}
                    >
                      {client.healthScore}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium">
                      {formatMrr(client.mrr)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No clients found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
