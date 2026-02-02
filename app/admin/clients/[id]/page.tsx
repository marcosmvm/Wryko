'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, Calendar, Building2, CreditCard, Activity, Pencil, Pause, Play, Loader2, HeartPulse, TrendingUp, TrendingDown, Minus, Inbox, FileText, AlertTriangle } from 'lucide-react'
import { formatMrr, getEngineRunStatusColor } from '@/lib/constants/admin'
import { getEngineRuns, getAdminActivity, getAdminCampaigns, getClientHealthScore, getClientRequests, getClientReports } from '@/lib/supabase/admin-actions'
import type { EngineRun, AdminActivity, AdminHealthOverview, AdminClientRequest, AdminWeeklyReport } from '@/lib/types/admin'
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
  const [healthData, setHealthData] = useState<AdminHealthOverview | null>(null)
  const [clientRequests, setClientRequests] = useState<AdminClientRequest[]>([])
  const [clientReports, setClientReports] = useState<AdminWeeklyReport[]>([])

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
      const [clientResult, runsResult, activityResult, campaignsResult, healthResult, requestsResult, reportsResult] = await Promise.all([
        getClientByIdFromDb(resolvedParams.id),
        getEngineRuns({ clientId: resolvedParams.id }),
        getAdminActivity({ clientId: resolvedParams.id }),
        getAdminCampaigns(resolvedParams.id),
        getClientHealthScore(resolvedParams.id),
        getClientRequests(resolvedParams.id),
        getClientReports(resolvedParams.id),
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
      if (healthResult.data) setHealthData(healthResult.data)
      setClientRequests(requestsResult.data)
      setClientReports(reportsResult.data)
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

            {/* Health Breakdown */}
            {healthData && (
              <motion.div
                initial={fadeInUp.initial}
                animate={fadeInUp.animate}
                transition={getStaggerDelay(6)}
              >
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HeartPulse className="w-4 h-4 text-primary" aria-hidden="true" />
                          <h2 className="font-heading font-semibold">Health Breakdown</h2>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {healthData.trend === 'improving' && <TrendingUp className="w-4 h-4 text-success" />}
                          {healthData.trend === 'declining' && <TrendingDown className="w-4 h-4 text-destructive" />}
                          {healthData.trend === 'stable' && <Minus className="w-4 h-4 text-muted-foreground" />}
                          <span className={`text-xs font-medium capitalize ${
                            healthData.trend === 'improving' ? 'text-success' :
                            healthData.trend === 'declining' ? 'text-destructive' :
                            'text-muted-foreground'
                          }`}>
                            {healthData.trend}
                          </span>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Overall Score */}
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm font-medium">Overall Score</span>
                        <span className={`text-2xl font-bold font-heading ${
                          healthData.overall >= 80 ? 'text-success' :
                          healthData.overall >= 60 ? 'text-warning' :
                          'text-destructive'
                        }`}>
                          {healthData.overall}
                        </span>
                      </div>

                      {/* Component Breakdown */}
                      <div className="space-y-3">
                        {[
                          { label: 'Domain Health', value: healthData.domainHealth },
                          { label: 'Reply Quality', value: healthData.replyQuality },
                          { label: 'Engagement Level', value: healthData.engagementLevel },
                          { label: 'Meeting Conversion', value: healthData.meetingConversion },
                        ].map((component) => (
                          <div key={component.label} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{component.label}</span>
                              <span className="text-xs font-medium">{component.value}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${component.value}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className={`h-full rounded-full ${
                                  component.value >= 80 ? 'bg-success' :
                                  component.value >= 60 ? 'bg-warning' :
                                  'bg-destructive'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Risk Signals */}
                      {healthData.riskSignals.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-border">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Risk Signals</p>
                          {healthData.riskSignals.map((signal, index) => (
                            <div
                              key={index}
                              className={`flex items-start gap-2 p-2 rounded-lg text-xs ${
                                signal.severity === 'high' ? 'bg-destructive/5 text-destructive' :
                                signal.severity === 'medium' ? 'bg-warning/5 text-warning' :
                                'bg-muted/50 text-muted-foreground'
                              }`}
                            >
                              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-medium">{signal.signal}</p>
                                <p className="opacity-80">{signal.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground">
                        Last updated: {new Date(healthData.lastUpdatedAt).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Client Requests */}
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={getStaggerDelay(7)}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-primary" aria-hidden="true" />
                      <h2 className="font-heading font-semibold">Client Requests</h2>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {clientRequests.length > 0 ? (
                    <div className="space-y-3">
                      {clientRequests.slice(0, 5).map((request, index) => (
                        <motion.div
                          key={request.id}
                          initial={fadeInUp.initial}
                          animate={fadeInUp.animate}
                          transition={getStaggerDelay(index, 0.4)}
                          className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{request.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground capitalize">
                                {request.type.replace('_', ' ')}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(request.submittedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ml-2 flex-shrink-0 ${
                            request.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                            request.status === 'in_progress' ? 'bg-blue-500/10 text-blue-500' :
                            request.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                            'bg-red-500/10 text-red-500'
                          }`}>
                            {request.status.replace('_', ' ')}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <InlineEmptyState message="No requests from this client yet." />
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Reports */}
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={getStaggerDelay(8)}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
                      <h2 className="font-heading font-semibold">Weekly Reports</h2>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {clientReports.length > 0 ? (
                    <div className="space-y-3">
                      {clientReports.slice(0, 3).map((report, index) => (
                        <motion.div
                          key={report.id}
                          initial={fadeInUp.initial}
                          animate={fadeInUp.animate}
                          transition={getStaggerDelay(index, 0.4)}
                          className="p-3 bg-muted/50 rounded-lg space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-muted-foreground">
                              {new Date(report.periodStart).toLocaleDateString()} - {new Date(report.periodEnd).toLocaleDateString()}
                            </p>
                            {report.pdfUrl && (
                              <a
                                href={report.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline"
                              >
                                View PDF
                              </a>
                            )}
                          </div>

                          {/* Metrics Row */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-center p-1.5 bg-background rounded">
                              <p className="text-sm font-bold font-heading">{report.metrics.meetingsBooked}</p>
                              <div className="flex items-center justify-center gap-0.5">
                                <p className="text-[10px] text-muted-foreground">Meetings</p>
                                {report.vsLastWeek.meetings !== 0 && (
                                  report.vsLastWeek.meetings > 0
                                    ? <TrendingUp className="w-2.5 h-2.5 text-success" />
                                    : <TrendingDown className="w-2.5 h-2.5 text-destructive" />
                                )}
                              </div>
                            </div>
                            <div className="text-center p-1.5 bg-background rounded">
                              <p className="text-sm font-bold font-heading">{report.metrics.openRate}%</p>
                              <div className="flex items-center justify-center gap-0.5">
                                <p className="text-[10px] text-muted-foreground">Open Rate</p>
                                {report.vsLastWeek.openRate !== 0 && (
                                  report.vsLastWeek.openRate > 0
                                    ? <TrendingUp className="w-2.5 h-2.5 text-success" />
                                    : <TrendingDown className="w-2.5 h-2.5 text-destructive" />
                                )}
                              </div>
                            </div>
                            <div className="text-center p-1.5 bg-background rounded">
                              <p className="text-sm font-bold font-heading">{report.metrics.replyRate}%</p>
                              <div className="flex items-center justify-center gap-0.5">
                                <p className="text-[10px] text-muted-foreground">Reply Rate</p>
                                {report.vsLastWeek.replyRate !== 0 && (
                                  report.vsLastWeek.replyRate > 0
                                    ? <TrendingUp className="w-2.5 h-2.5 text-success" />
                                    : <TrendingDown className="w-2.5 h-2.5 text-destructive" />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* AI Summary Preview */}
                          {report.aiSummary && (
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {report.aiSummary}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <InlineEmptyState message="No reports generated yet." />
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
