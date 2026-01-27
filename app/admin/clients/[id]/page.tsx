'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Phone, Calendar, Building2, CreditCard, Activity, Pencil, Pause, Play, Loader2 } from 'lucide-react'
import {
  getClientById,
  mockEngineRuns,
  mockAdminActivity,
  formatMrr,
  getEngineRunStatusColor,
} from '@/lib/data/admin-mock'
import { mockCampaigns } from '@/lib/data/dashboard'
import { notFound } from 'next/navigation'
import { StatusBadge, ClientStatusBadge, EngineRunStatusBadge } from '@/components/admin/status-badge'
import { HealthScore } from '@/components/admin/health-score'
import { InlineEmptyState } from '@/components/admin/empty-state'
import { ConfirmDialog, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { useToastActions } from '@/components/ui/toast'
import { PLAN_OPTIONS } from '@/lib/constants/admin'

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const toast = useToastActions()
  const client = getClientById(resolvedParams.id)

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPauseDialogOpen, setIsPauseDialogOpen] = useState(false)
  const [isReactivateDialogOpen, setIsReactivateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [editForm, setEditForm] = useState({
    companyName: client?.companyName || '',
    contactName: client?.contactName || '',
    contactEmail: client?.contactEmail || '',
    phone: client?.phone || '',
    plan: client?.plan || 'founding_partner',
  })

  if (!client) {
    notFound()
  }

  // Get client-specific data
  const clientRuns = mockEngineRuns.filter((r) => r.clientId === client.id)
  const clientActivity = mockAdminActivity.filter(
    (a) => a.resourceId === client.id || a.resourceName === client.companyName
  )

  const handleEditSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Client updated', `${editForm.companyName} has been updated.`)
      setIsEditDialogOpen(false)
    } catch {
      toast.error('Failed to update', 'Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePause = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Client paused', `${client.companyName} has been paused.`)
      setIsPauseDialogOpen(false)
    } catch {
      toast.error('Failed to pause', 'Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReactivate = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Client reactivated', `${client.companyName} has been reactivated.`)
      setIsReactivateDialogOpen(false)
    } catch {
      toast.error('Failed to reactivate', 'Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Clients
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{client.companyName}</h1>
              <ClientStatusBadge status={client.status} />
            </div>
            <p className="text-muted-foreground">{client.clientId}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditDialogOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-muted rounded-lg hover:bg-muted/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Pencil className="w-4 h-4" aria-hidden="true" />
              Edit Client
            </button>
            {client.status === 'active' && (
              <button
                onClick={() => setIsPauseDialogOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-yellow-500 bg-yellow-500/10 rounded-lg hover:bg-yellow-500/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
              >
                <Pause className="w-4 h-4" aria-hidden="true" />
                Pause
              </button>
            )}
            {client.status === 'paused' && (
              <button
                onClick={() => setIsReactivateDialogOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-500 bg-green-500/10 rounded-lg hover:bg-green-500/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <Play className="w-4 h-4" aria-hidden="true" />
                Reactivate
              </button>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Health Score</p>
            <HealthScore score={client.healthScore} size="lg" className="mt-1" />
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Monthly MRR</p>
            <p className="text-2xl font-bold">{formatMrr(client.mrr)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="text-2xl font-bold capitalize">
              {client.plan.replace('_', ' ')}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Client Since</p>
            <p className="text-2xl font-bold">
              {new Date(client.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaigns */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold mb-4">Active Campaigns</h2>
              {mockCampaigns.length > 0 ? (
                <div className="space-y-3">
                  {mockCampaigns.slice(0, 3).map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{campaign.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {campaign.sent.toLocaleString()} sent &middot;{' '}
                          {campaign.openRate}% open rate &middot;{' '}
                          {campaign.replyRate}% reply rate
                        </p>
                      </div>
                      <StatusBadge
                        variant={campaign.status === 'active' ? 'active' : campaign.status === 'paused' ? 'paused' : 'default'}
                      >
                        {campaign.status}
                      </StatusBadge>
                    </div>
                  ))}
                </div>
              ) : (
                <InlineEmptyState message="No campaigns for this client yet." />
              )}
            </div>

            {/* Engine Runs */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold mb-4">Recent Engine Runs</h2>
              {clientRuns.length > 0 ? (
                <div className="space-y-3">
                  {clientRuns.map((run) => (
                    <div
                      key={run.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{run.engineName}</p>
                        <p className="text-xs text-muted-foreground">
                          {run.inputSummary}
                        </p>
                      </div>
                      <div className="text-right">
                        <EngineRunStatusBadge status={run.status} />
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(run.startedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <InlineEmptyState message="No engine runs for this client yet." />
              )}
            </div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Company</p>
                    <p className="text-sm font-medium">{client.companyName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${client.contactEmail}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {client.contactEmail}
                    </a>
                  </div>
                </div>
                {client.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">{client.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <CreditCard className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <p className="text-sm font-medium capitalize">
                      {client.plan.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="text-sm font-medium">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <h2 className="font-semibold">Recent Activity</h2>
              </div>
              {clientActivity.length > 0 ? (
                <div className="space-y-3">
                  {clientActivity.slice(0, 5).map((activity) => (
                    <div
                      key={activity.id}
                      className="p-2 border-l-2 border-primary/30 pl-3"
                    >
                      <p className="text-sm">
                        {activity.action} {activity.resourceType}
                      </p>
                      {activity.details && (
                        <p className="text-xs text-muted-foreground">
                          {activity.details}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <InlineEmptyState message="No activity recorded yet." />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogDescription>
            Update client information for {client.companyName}
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="edit-companyName" className="text-sm font-medium">
                Company Name
              </label>
              <input
                type="text"
                id="edit-companyName"
                value={editForm.companyName}
                onChange={(e) => setEditForm((prev) => ({ ...prev, companyName: e.target.value }))}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-contactName" className="text-sm font-medium">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="edit-contactName"
                  value={editForm.contactName}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, contactName: e.target.value }))}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-contactEmail" className="text-sm font-medium">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="edit-contactEmail"
                  value={editForm.contactEmail}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, contactEmail: e.target.value }))}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-phone" className="text-sm font-medium">
                  Phone
                </label>
                <input
                  type="tel"
                  id="edit-phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-plan" className="text-sm font-medium">
                  Plan
                </label>
                <select
                  id="edit-plan"
                  value={editForm.plan}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, plan: e.target.value as any }))}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {PLAN_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <button
            onClick={() => setIsEditDialogOpen(false)}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium bg-muted rounded-lg hover:bg-muted/80 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSave}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            Save Changes
          </button>
        </DialogFooter>
      </Dialog>

      {/* Pause Confirmation Dialog */}
      <ConfirmDialog
        open={isPauseDialogOpen}
        onOpenChange={setIsPauseDialogOpen}
        title="Pause Client"
        description={`Are you sure you want to pause ${client.companyName}? All active campaigns will be paused and no new leads will be generated.`}
        confirmLabel="Pause Client"
        variant="warning"
        onConfirm={handlePause}
        isLoading={isLoading}
      />

      {/* Reactivate Confirmation Dialog */}
      <ConfirmDialog
        open={isReactivateDialogOpen}
        onOpenChange={setIsReactivateDialogOpen}
        title="Reactivate Client"
        description={`Are you sure you want to reactivate ${client.companyName}? All paused campaigns will resume.`}
        confirmLabel="Reactivate"
        variant="default"
        onConfirm={handleReactivate}
        isLoading={isLoading}
      />
    </>
  )
}
