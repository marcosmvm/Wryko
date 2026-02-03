'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Inbox,
  Clock,
  PlayCircle,
  CheckCircle2,
  Search,
  ChevronDown,
  Loader2,
  MessageSquare,
  X,
  ArrowRight,
} from 'lucide-react'
import { AdminStatsCard } from '@/components/admin/admin-stats-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'
import { getAllClientRequests, updateRequestStatus } from '@/lib/supabase/admin-actions'
import { adminCsmWorkflows } from '@/lib/n8n/client'
import type { AdminClientRequest } from '@/lib/types/admin'

type StatusFilter = 'all' | AdminClientRequest['status']
type CategoryFilter = 'all' | AdminClientRequest['category']

export default function RequestsQueuePage() {
  const [requests, setRequests] = useState<AdminClientRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [notesModal, setNotesModal] = useState<{ id: string; action: string } | null>(null)
  const [noteText, setNoteText] = useState('')

  useEffect(() => {
    async function loadData() {
      const result = await getAllClientRequests()
      if (result.data) setRequests(result.data)
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

  const totalRequests = requests.length
  const pendingCount = requests.filter((r) => r.status === 'pending').length
  const inProgressCount = requests.filter((r) => r.status === 'in_progress').length
  const completedToday = requests.filter((r) => {
    if (r.status !== 'completed' || !r.completedAt) return false
    const today = new Date().toDateString()
    return new Date(r.completedAt).toDateString() === today
  }).length

  const filteredRequests = requests.filter((r) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        r.clientName.toLowerCase().includes(query) ||
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }
    if (statusFilter !== 'all' && r.status !== statusFilter) return false
    if (categoryFilter !== 'all' && r.category !== categoryFilter) return false
    return true
  })

  const getCategoryBadge = (category: AdminClientRequest['category']) => {
    switch (category) {
      case 'instant':
        return (
          <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
            Instant
          </span>
        )
      case 'review':
        return (
          <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 font-medium">
            Review
          </span>
        )
      case 'complex':
        return (
          <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-500 font-medium">
            Complex
          </span>
        )
    }
  }

  const getStatusBadge = (status: AdminClientRequest['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 font-medium">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        )
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 font-medium">
            <PlayCircle className="w-3 h-3" />
            In Progress
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 font-medium">
            <X className="w-3 h-3" />
            Rejected
          </span>
        )
    }
  }

  const formatRequestType = (type: AdminClientRequest['type']) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  }

  async function handleStatusUpdate(id: string, newStatus: AdminClientRequest['status'], notes?: string) {
    setProcessingId(id)
    try {
      const result = await updateRequestStatus(id, newStatus, notes)
      if (result.success) {
        setRequests((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status: newStatus,
                  notes: notes || r.notes,
                  completedAt: newStatus === 'completed' || newStatus === 'rejected' ? new Date().toISOString() : r.completedAt,
                }
              : r
          )
        )
        // Also trigger n8n workflow for processing
        await adminCsmWorkflows.processRequest(id, newStatus, notes)
      }
    } finally {
      setProcessingId(null)
      setNotesModal(null)
      setNoteText('')
    }
  }

  function openNotesModal(id: string, action: string) {
    setNotesModal({ id, action })
    setNoteText('')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={defaultTransition}
      >
        <h1 className="text-2xl font-heading font-bold">Requests Queue</h1>
        <p className="text-muted-foreground">
          Engine N (The Navigator) -- Manage client self-serve requests
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full mt-3" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatsCard
          label="Total Requests"
          value={totalRequests}
          icon={Inbox}
          variant="primary"
          index={0}
        />
        <AdminStatsCard
          label="Pending"
          value={pendingCount}
          icon={Clock}
          variant="amber"
          index={1}
        />
        <AdminStatsCard
          label="In Progress"
          value={inProgressCount}
          icon={PlayCircle}
          variant="blue"
          index={2}
        />
        <AdminStatsCard
          label="Completed Today"
          value={completedToday}
          icon={CheckCircle2}
          variant="violet"
          index={3}
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
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
            className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          >
            <option value="all">All Categories</option>
            <option value="instant">Instant</option>
            <option value="review">Review</option>
            <option value="complex">Complex</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </motion.div>

      {/* Requests Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getStaggerDelay(2, 0.3)}
      >
        <Card variant="elevated">
          <CardContent className="p-0">
            {filteredRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Submitted</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredRequests.map((request, index) => (
                      <motion.tr
                        key={request.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={getStaggerDelay(index, 0.4)}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <span className="font-medium text-sm">{request.clientName}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-muted-foreground">{formatRequestType(request.type)}</span>
                        </td>
                        <td className="px-4 py-4">{getCategoryBadge(request.category)}</td>
                        <td className="px-4 py-4">{getStatusBadge(request.status)}</td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="text-sm font-medium">{request.title}</p>
                            {request.notes && (
                              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                {request.notes}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs text-muted-foreground">
                            {new Date(request.submittedAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {request.status === 'pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={processingId === request.id}
                                onClick={() => handleStatusUpdate(request.id, 'in_progress')}
                              >
                                {processingId === request.id ? (
                                  <Loader2 className="w-3 h-3 animate-spin mr-1" />
                                ) : (
                                  <ArrowRight className="w-3 h-3 mr-1" />
                                )}
                                Start
                              </Button>
                            )}
                            {(request.status === 'pending' || request.status === 'in_progress') && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-950"
                                  disabled={processingId === request.id}
                                  onClick={() => openNotesModal(request.id, 'completed')}
                                >
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Complete
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950"
                                  disabled={processingId === request.id}
                                  onClick={() => openNotesModal(request.id, 'rejected')}
                                >
                                  <X className="w-3 h-3 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No requests found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Notes Modal */}
      {notesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4 shadow-xl"
          >
            <h3 className="text-lg font-heading font-bold mb-2">
              {notesModal.action === 'completed' ? 'Complete Request' : 'Reject Request'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add optional notes for this action.
            </p>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add notes (optional)..."
              className="w-full p-3 bg-muted/30 border border-border rounded-lg text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => setNotesModal(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={processingId === notesModal.id}
                onClick={() =>
                  handleStatusUpdate(
                    notesModal.id,
                    notesModal.action as AdminClientRequest['status'],
                    noteText || undefined
                  )
                }
              >
                {processingId === notesModal.id ? (
                  <Loader2 className="w-3 h-3 animate-spin mr-1" />
                ) : null}
                Confirm
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
