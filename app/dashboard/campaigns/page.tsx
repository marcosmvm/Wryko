'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockCampaigns } from '@/lib/data/dashboard'

type StatusFilter = 'all' | 'active' | 'paused' | 'completed'

export default function CampaignsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusStyles = {
    active: 'text-green-500',
    paused: 'text-yellow-500',
    completed: 'text-blue-500',
    draft: 'text-muted-foreground',
  }

  const statusIcons = {
    active: '●',
    paused: '○',
    completed: '✓',
    draft: '◌',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <p className="text-muted-foreground">Manage and monitor your lead generation campaigns</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Campaign Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Sent</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Opens</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Replies</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCampaigns.map((campaign, index) => (
                <motion.tr
                  key={campaign.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn('flex items-center gap-2', statusStyles[campaign.status])}>
                      <span>{statusIcons[campaign.status]}</span>
                      <span className="capitalize">{campaign.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">{campaign.sent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">{campaign.openRate}%</td>
                  <td className="px-6 py-4 text-right">{campaign.replyRate}%</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="p-2 hover:bg-muted rounded-lg transition-colors inline-flex"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No campaigns found
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filteredCampaigns.length} of {mockCampaigns.length} campaigns
      </p>
    </div>
  )
}
