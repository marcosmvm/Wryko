'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, Calendar, Building2, CreditCard, Activity, Pencil, Pause, Play, Loader2 } from 'lucide-react'
import { formatMrr, getEngineRunStatusColor } from '@/lib/constants/admin'
import { getEngineRuns, getAdminActivity, getAdminCampaigns } from '@/lib/supabase/admin-actions'
import type { EngineRun, AdminActivity } from '@/lib/types/admin'
import {
  getClientById as getClientByIdFromDb,
  updateClientRecord,
  pauseClient as pauseClientAction,
  reactivateClient as reactivateClientAction,
  type ClientRecord,
} from '@/lib/supabase/client-actions'
import { notFound } from 'next/navigation'
import { StatusBadge, ClientStatusBadge, EngineRunStatusBadge } from '@/components/admin/status-badge'
import { HealthScore } from '@/components/admin/health-score'
import { InlineEmptyState } from '@/components/admin/empty-state'
import { ConfirmDialog, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { useToastActions } from '@/components/ui/toast'
import { PLAN_OPTIONS } from '@/lib/constants/admin'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconWrapper } from '@/components/ui/icon-wrapper'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const toast = useToastActions()

  const [client, setClient] = useState<ClientRecord | null>(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPauseDialogOpen, setIsPauseDialogOpen] = useState(false)
  const [isReactivateDialogOpen, setIsReactivateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [clientRuns, setClientRuns] = useState<EngineRun[]>([])
  const [clientActivity, setClientActivity] = useState<AdminActivity[]>([])
  const [clientCampaigns, setClientCampaigns] = useState<Array<{ id: string; name: string; status: string; sent: number; openRate: number; replyRate: number; meetings: number }>>([])

  const [editForm, setEditForm] = useState({
    companyName: '',
    contactName: '',
    contactEmail: '',
    phone: '',
    plan: 'founding_partner',
  })

  // Fetch client and related data from Supabase
  useEffect(() => {
    async function loadClient() {
      const [clientResult, runsResult, activityResult, campaignsResult] = await Promise.all([
        getClientByIdFromDb(resolvedParams.id),
        getEngineRuns({ clientId: resolvedParams.id }),
        getAdminActivity({ clientId: resolvedParams.id }),
        getAdminCampaigns(resolvedParams.id),
      ])
      if (clientResult.data) {
        setClient(clientResult.data)
        setEditForm({
          companyName: clientResult.data.company_name,
          contactName: clientResult.data.contact_name,
          contactEmail: clientResult.data.contact_email,
          phone: clientResult.data.phone || '',
          plan: clientResult.data.plan,
        })
      }
      setClientRuns(runsResult.data)
      setClientActivity(activityResult.data)
      setClientCampaigns(campaignsResult.data)
      setPageLoading(false)
    }
    loadClient()
  }, [resolvedParams.id])

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!client) {
    notFound()
  }

  const handleEditSave = async () => {
    setIsLoading(true)
    try {
      const result = await updateClientRecord(client.id, {
        company_name: editForm.companyName,
        contact_name: editForm.contactName,
        contact_email: editForm.contactEmail,
        phone: editForm.phone || undefined,
        plan: editForm.plan,
      })
      if (result.success) {
        setClient(prev => prev ? {
          ...prev,
          company_name: editForm.companyName,
          contact_name: editForm.contactName,
          contact_email: editForm.contactEmail,
          phone: editForm.phone || null,
          plan: editForm.plan,
        } : prev)
        toast.success('Client updated', `${editForm.companyName} has been updated.`)
        setIsEditDialogOpen(false)
      } else {
        toast.error('Failed to update', result.error || 'Please try again.')
      }
    } catch {
      toast.error('Failed to update', 'Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePause = async () => {
    setIsLoading(true)
    try {
      const result = await pauseClientAction(client.id)
      if (result.success) {
        setClient(prev => prev ? { ...prev, status: 'paused' } : prev)
        toast.success('Client paused', `${client.company_name} has been paused.`)
        setIsPauseDialogOpen(false)
      } else {
        toast.error('Failed to pause', result.error || 'Please try again.')
      }
    } catch {
      toast.error('Failed to pause', 'Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReactivate = async () => {
    setIsLoading(true)
    try {
      const result = await reactivateClientAction(client.id)
      if (result.success) {
        setClient(prev => prev ? { ...prev, status: 'active' } : prev)
        toast.success('Client reactivated', `${client.company_name} has been reactivated.`)
        setIsReactivateDialogOpen(false)
      } else {
        toast.error('Failed to reactivate', result.error || 'Please try again.')
      }
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
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={defaultTransition}
        >
          <Link
            href="/admin/clients"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Clients
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          {...fadeInUp}
          transition={defaultTransition}
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold font-heading">{client.company_name}</h1>
              <ClientStatusBadge status={client.status as 'active' | 'onboarding' | 'paused' | 'churned'} />
            </div>
            <p className="text-muted-foreground mt-1">{client.id}</p>
            <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/40" />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Pencil className="w-4 h-4 mr-2" aria-hidden="true" />
              Edit Client
            </Button>
            {client.status === 'active' && (
              <Button
                variant="destructive"
                size="sm"
                className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/20 hover:text-yellow-500"
                onClick={() => setIsPauseDialogOpen(true)}
              >
                <Pause className="w-4 h-4 mr-2" aria-hidden="true" />
                Pause
              </Button>
            )}
            {client.status === 'paused' && (
              <Button
                variant="success"
                size="sm"
                onClick={() => setIsReactivateDialogOpen(true)}
              >
                <Play className="w-4 h-4 mr-2" aria-hidden="true" />
                Reactivate
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={getStaggerDelay(0)}
          >
            <Card variant="interactive" className="overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-success to-success/50" />
              <div className="p-4">
                <p className="text-sm text-muted-foreground">Health Score</p>
                <HealthScore score={client.health_score} size="lg" className="mt-1" />
              </div>
            </Card>
          </motion.div>
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={getStaggerDelay(1)}
          >
            <Card variant="interactive" className="overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-metric-blue to-metric-blue/50" />
              <div className="p-4">
                <p className="text-sm text-muted-foreground">Monthly MRR</p>
                <p className="text-2xl font-bold font-heading">{formatMrr(client.mrr)}</p>
              </div>
            </Card>
          </motion.div>
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={getStaggerDelay(2)}
          >
            <Card variant="interactive" className="overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-metric-violet to-metric-violet/50" />
              <div className="p-4">
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="text-2xl font-bold font-heading capitalize">
                  {client.plan.replace('_', ' ')}
                </p>
              </div>
            </Card>
          </motion.div>
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={getStaggerDelay(3)}
          >
            <Card variant="interactive" className="overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-metric-amber to-metric-amber/50" />
              <div className="p-4">
                <p className="text-sm text-muted-foreground">Client Since</p>
                <p className="text-2xl font-bold font-heading">
                  {new Date(client.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaigns */}
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={getStaggerDelay(4)}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>
                    <h2 className="font-heading font-semibold">Active Campaigns</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {clientCampaigns.length > 0 ? (
                    <div className="space-y-3">
                      {clientCampaigns.slice(0, 3).map((campaign, index) => (
                        <motion.div
                          key={campaign.id}
                          initial={fadeInUp.initial}
                          animate={fadeInUp.animate}
                          transition={getStaggerDelay(index, 0.3)}
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
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <InlineEmptyState message="No campaigns for this client yet." />
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Engine Runs */}
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={getStaggerDelay(5)}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>
                    <h2 className="font-heading font-semibold">Recent Engine Runs</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {clientRuns.length > 0 ? (
                    <div className="space-y-3">
                      {clientRuns.map((run, index) => (
                        <motion.div
                          key={run.id}
                          initial={fadeInUp.initial}
                          animate={fadeInUp.animate}
                          transition={getStaggerDelay(index, 0.4)}
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
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <InlineEmptyState message="No engine runs for this client yet." />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={getStaggerDelay(4, 0.1)}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>
                    <h2 className="font-heading font-semibold">Contact Information</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <IconWrapper icon={Building2} size="sm" variant="primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Company</p>
                        <p className="text-sm font-medium">{client.company_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <IconWrapper icon={Mail} size="sm" variant="primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <a
                          href={`mailto:${client.contact_email}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {client.contact_email}
                        </a>
                      </div>
                    </div>
                    {client.phone && (
                      <div className="flex items-center gap-3">
                        <IconWrapper icon={Phone} size="sm" variant="primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <p className="text-sm font-medium">{client.phone}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <IconWrapper icon={CreditCard} size="sm" variant="primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Plan</p>
                        <p className="text-sm font-medium capitalize">
                          {client.plan.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <IconWrapper icon={Calendar} size="sm" variant="primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Member Since</p>
                        <p className="text-sm font-medium">
                          {new Date(client.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity */}
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={getStaggerDelay(5, 0.1)}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                      <h2 className="font-heading font-semibold">Recent Activity</h2>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {clientActivity.length > 0 ? (
                    <div className="space-y-3">
                      {clientActivity.slice(0, 5).map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={fadeInUp.initial}
                          animate={fadeInUp.animate}
                          transition={getStaggerDelay(index, 0.5)}
                          className="p-2 border-l-2 border-primary/40 pl-3 hover:border-primary/70 transition-colors"
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
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <InlineEmptyState message="No activity recorded yet." />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogDescription>
            Update client information for {client.company_name}
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
        description={`Are you sure you want to pause ${client.company_name}? All active campaigns will be paused and no new leads will be generated.`}
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
        description={`Are you sure you want to reactivate ${client.company_name}? All paused campaigns will resume.`}
        confirmLabel="Reactivate"
        variant="default"
        onConfirm={handleReactivate}
        isLoading={isLoading}
      />
    </>
  )
}
