'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, getStaggerDelay } from '@/lib/animations'
import {
  Pause, Play, FileText, Calendar, PenLine, Upload, CheckCircle, Clock,
  AlertCircle, Zap, Plus, Loader2, Send, FileUp, MessageSquare, User, Hash
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
  ConfirmDialog,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { getRequests } from '@/lib/supabase/dashboard-actions'
import type { ClientRequest } from '@/lib/types/dashboard'
import { format, parseISO, formatDistanceToNow } from 'date-fns'
import { useToastActions } from '@/components/ui/toast'
import { requestWorkflows, prepareFileUpload } from '@/lib/n8n/client'

type QuickActionConfirmType = 'destructive' | 'confirm' | 'input' | 'file'

interface QuickAction {
  id: string
  label: string
  icon: typeof Pause
  type: 'instant' | 'review'
  confirmType: QuickActionConfirmType
  confirmMessage?: string
  inputLabel?: string
  inputPlaceholder?: string
  color: string
}

const quickActions: QuickAction[] = [
  {
    id: 'pause',
    label: 'Pause Campaign',
    icon: Pause,
    type: 'instant',
    confirmType: 'destructive',
    confirmMessage: 'This will pause all active campaigns. No new emails will be sent until you resume.',
    color: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20',
  },
  {
    id: 'resume',
    label: 'Resume Campaign',
    icon: Play,
    type: 'instant',
    confirmType: 'confirm',
    confirmMessage: 'This will resume all paused campaigns. Email sending will restart.',
    color: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
  },
  {
    id: 'icp',
    label: 'Update ICP',
    icon: PenLine,
    type: 'instant',
    confirmType: 'input',
    inputLabel: 'Describe your ICP changes',
    inputPlaceholder: 'e.g., Target companies with 50-200 employees in the SaaS industry...',
    color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
  },
  {
    id: 'report',
    label: 'Download Report',
    icon: FileText,
    type: 'instant',
    confirmType: 'confirm',
    confirmMessage: 'Your latest weekly report will be generated and downloaded.',
    color: 'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20',
  },
  {
    id: 'calendar',
    label: 'Update Calendar',
    icon: Calendar,
    type: 'instant',
    confirmType: 'confirm',
    confirmMessage: 'This will sync your latest calendar availability with the booking system.',
    color: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20',
  },
  {
    id: 'leads',
    label: 'Upload Leads',
    icon: Upload,
    type: 'review',
    confirmType: 'file',
    inputLabel: 'Upload your leads file (CSV)',
    color: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
  },
]

const statusConfig = {
  pending: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Pending' },
  in_progress: { icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'In Progress' },
  completed: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Completed' },
  rejected: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Rejected' },
}

const typeLabels: Record<string, string> = {
  icp_update: 'ICP Update',
  campaign_pause: 'Pause Campaign',
  campaign_resume: 'Resume Campaign',
  add_leads: 'Add Leads',
  domain_request: 'Domain Request',
  copy_change: 'Copy Change',
  schedule_call: 'Schedule Call',
  report_download: 'Report Download',
  calendar_update: 'Calendar Update',
  other: 'Other',
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<ClientRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToastActions()

  // Request Detail Dialog
  const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Quick Action Confirm Dialog (for destructive/confirm types)
  const [confirmAction, setConfirmAction] = useState<QuickAction | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  // Quick Action Input Dialog (for input/file types)
  const [inputAction, setInputAction] = useState<QuickAction | null>(null)
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false)
  const [actionInputText, setActionInputText] = useState('')
  const [actionFile, setActionFile] = useState<File | null>(null)

  // New Request Form Dialog
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false)
  const [newRequestType, setNewRequestType] = useState<string>('other')
  const [newRequestTitle, setNewRequestTitle] = useState('')
  const [newRequestDescription, setNewRequestDescription] = useState('')

  useEffect(() => {
    async function load() {
      const result = await getRequests()
      setRequests(result.data)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Execute a quick action (called after confirmation)
  const executeQuickAction = async (
    actionId: string,
    actionLabel: string,
    metadata?: Record<string, unknown>
  ) => {
    setActiveAction(actionId)
    try {
      const result = await requestWorkflows.quickAction(actionId, metadata)
      if (result.success) {
        toast.success(`${actionLabel} initiated`, 'Your request is being processed')
        const refreshed = await getRequests()
        setRequests(refreshed.data)
      } else {
        toast.error('Action failed', result.error || `Could not perform ${actionLabel}`)
      }
    } catch {
      toast.error('Action failed', 'An unexpected error occurred')
    } finally {
      setActiveAction(null)
    }
  }

  // Route quick action click to appropriate dialog
  const handleQuickActionClick = (action: QuickAction) => {
    if (action.confirmType === 'destructive' || action.confirmType === 'confirm') {
      setConfirmAction(action)
      setIsConfirmOpen(true)
    } else if (action.confirmType === 'input' || action.confirmType === 'file') {
      setInputAction(action)
      setActionInputText('')
      setActionFile(null)
      setIsInputDialogOpen(true)
    }
  }

  // Handle confirm dialog action
  const handleConfirmAction = async () => {
    if (!confirmAction) return
    await executeQuickAction(confirmAction.id, confirmAction.label)
  }

  // Handle input/file dialog submit
  const handleInputActionSubmit = async () => {
    if (!inputAction) return

    let metadata: Record<string, unknown> = {}

    if (inputAction.confirmType === 'input') {
      metadata = { description: actionInputText }
    } else if (inputAction.confirmType === 'file' && actionFile) {
      const fileData = await prepareFileUpload(actionFile)
      metadata = { file: fileData }
    }

    setIsInputDialogOpen(false)
    await executeQuickAction(inputAction.id, inputAction.label, metadata)
    setActionInputText('')
    setActionFile(null)
  }

  // Open new request form dialog
  const openNewRequestDialog = () => {
    setNewRequestType('other')
    setNewRequestTitle('')
    setNewRequestDescription('')
    setIsNewRequestOpen(true)
  }

  // Submit new request from form dialog
  const handleNewRequestSubmit = async () => {
    if (!newRequestTitle.trim()) {
      toast.warning('Title required', 'Please enter a title for your request')
      return
    }
    setIsSubmitting(true)
    try {
      const result = await requestWorkflows.submit({
        type: newRequestType,
        title: newRequestTitle.trim(),
        description: newRequestDescription.trim() || 'Custom request submitted via portal',
      })
      if (result.success) {
        toast.success('Request submitted', 'Your request has been added to the queue')
        setIsNewRequestOpen(false)
        const refreshed = await getRequests()
        setRequests(refreshed.data)
      } else {
        toast.error('Submission failed', result.error || 'Could not submit request')
      }
    } catch {
      toast.error('Submission failed', 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Open request detail dialog
  const handleRequestClick = (request: ClientRequest) => {
    setSelectedRequest(request)
    setIsDetailOpen(true)
  }

  const pendingRequests = requests.filter(r => r.status === 'pending')
  const completedRequests = requests.filter(r => r.status === 'completed')
  const avgProcessingTime = completedRequests.length > 0
    ? completedRequests.reduce((sum, r) => sum + (r.processingTime || 0), 0) / completedRequests.length
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Self-Serve Requests</h1>
            <p className="text-muted-foreground">Submit requests and track their status</p>
          </div>
          <Button
            className="gap-2"
            onClick={openNewRequestDialog}
          >
            <Plus className="w-4 h-4" />
            New Request
          </Button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <Card variant="futuristic">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-muted-foreground" />
            Quick Actions
            <Badge variant="outline" className="font-normal ml-2">Instant</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action) => (
              <motion.div key={action.id} whileHover={{ y: -3, scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
                <button
                  onClick={() => handleQuickActionClick(action)}
                  disabled={activeAction === action.id}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border border-border transition-all disabled:opacity-50 relative overflow-hidden w-full",
                    action.color
                  )}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary/60 to-primary opacity-50" />
                  {activeAction === action.id ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    <action.icon className="w-8 h-8" />
                  )}
                  <span className="text-sm font-medium font-heading text-center">{action.label}</span>
                  {action.type === 'review' && (
                    <Badge variant="outline" className="text-[10px]">Review Required</Badge>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(0)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Pending</p>
              <p className="text-3xl font-bold font-heading">{pendingRequests.length}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(1)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Completed This Month</p>
              <p className="text-3xl font-bold font-heading">{completedRequests.length}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(2)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Avg Processing Time</p>
              <p className="text-3xl font-bold font-heading">
                {avgProcessingTime < 1 ? '<1' : Math.round(avgProcessingTime)}
                <span className="text-lg font-normal text-muted-foreground">min</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(3)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Instant Actions</p>
              <p className="text-3xl font-bold font-heading text-emerald-500">
                {completedRequests.filter(r => r.category === 'instant').length}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card variant="futuristic">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Pending Requests ({pendingRequests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRequests.map((request, index) => {
                const config = statusConfig[request.status]
                const StatusIcon = config.icon

                return (
                  <motion.div key={request.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(index)}>
                    <div
                      onClick={() => handleRequestClick(request)}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border border-l-[3px] border-l-amber-500 cursor-pointer hover:bg-muted/50 hover:border-primary/30 transition-all group"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleRequestClick(request) } }}
                    >
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", config.bg)}>
                        <StatusIcon className={cn("w-5 h-5", config.color)} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium group-hover:text-primary transition-colors">{request.title}</p>
                          <Badge variant="outline" className="text-xs">
                            {typeLabels[request.type]}
                          </Badge>
                          <Badge variant={request.category === 'instant' ? 'success' : 'secondary'} className="text-xs">
                            {request.category === 'instant' ? 'Instant' : 'Review Required'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{request.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(parseISO(request.submittedAt), { addSuffix: true })}
                        </p>
                        <p className="text-xs text-muted-foreground/0 group-hover:text-muted-foreground/60 transition-colors mt-1">
                          Click to view
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Request History */}
      <Card variant="futuristic">
        <CardHeader>
          <CardTitle className="text-lg">Request History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Request</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Processing Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => {
                const config = statusConfig[request.status]
                const StatusIcon = config.icon

                return (
                  <TableRow
                    key={request.id}
                    className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleRequestClick(request)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleRequestClick(request) } }}
                  >
                    <TableCell className="font-medium">
                      {format(parseISO(request.submittedAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{request.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{typeLabels[request.type]}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={request.category === 'instant' ? 'success' : 'secondary'} className="capitalize">
                        {request.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", config.bg)}>
                          <StatusIcon className={cn("w-3 h-3", config.color)} />
                        </div>
                        <span className="text-sm">{config.label}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {request.processingTime !== undefined ? (
                        <span className="text-sm">
                          {request.processingTime < 1 ? '<1' : Math.round(request.processingTime)} min
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ─── Request Detail Dialog ─── */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen} className="max-w-lg">
        <DialogClose onClose={() => setIsDetailOpen(false)} />
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
          {selectedRequest && (
            <DialogDescription>
              Submitted {formatDistanceToNow(parseISO(selectedRequest.submittedAt), { addSuffix: true })}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogContent>
          {selectedRequest && (() => {
            const config = statusConfig[selectedRequest.status]
            const StatusIcon = config.icon
            return (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Title</p>
                  <p className="font-semibold text-lg">{selectedRequest.title}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{typeLabels[selectedRequest.type]}</Badge>
                  <Badge variant={selectedRequest.category === 'instant' ? 'success' : 'secondary'} className="capitalize">
                    {selectedRequest.category}
                  </Badge>
                  <Badge className={cn(config.bg, config.color, 'gap-1')}>
                    <StatusIcon className="w-3 h-3" />
                    {config.label}
                  </Badge>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Description</p>
                  <p className="text-sm text-foreground leading-relaxed">{selectedRequest.description || 'No description provided'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      Request ID
                    </p>
                    <p className="text-sm font-mono">{selectedRequest.id.slice(0, 8)}...</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Submitted</p>
                    <p className="text-sm">{format(parseISO(selectedRequest.submittedAt), 'MMM d, yyyy h:mm a')}</p>
                  </div>
                  {selectedRequest.completedAt && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Completed</p>
                      <p className="text-sm">{format(parseISO(selectedRequest.completedAt), 'MMM d, yyyy h:mm a')}</p>
                    </div>
                  )}
                  {selectedRequest.processingTime !== undefined && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Processing Time</p>
                      <p className="text-sm">
                        {selectedRequest.processingTime < 1 ? '<1' : Math.round(selectedRequest.processingTime)} min
                      </p>
                    </div>
                  )}
                  {selectedRequest.assignedTo && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Assigned To
                      </p>
                      <p className="text-sm">{selectedRequest.assignedTo}</p>
                    </div>
                  )}
                </div>

                {selectedRequest.notes && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      Notes
                    </p>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">{selectedRequest.notes}</p>
                  </div>
                )}
              </div>
            )
          })()}
        </DialogContent>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsDetailOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {/* ─── Quick Action Confirm Dialog ─── */}
      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={(open) => {
          setIsConfirmOpen(open)
          if (!open) setConfirmAction(null)
        }}
        title={confirmAction?.label || ''}
        description={confirmAction?.confirmMessage || 'Are you sure you want to proceed?'}
        confirmLabel={confirmAction?.label || 'Confirm'}
        variant={confirmAction?.confirmType === 'destructive' ? 'warning' : 'default'}
        onConfirm={handleConfirmAction}
        isLoading={activeAction === confirmAction?.id}
      />

      {/* ─── Quick Action Input Dialog ─── */}
      <Dialog
        open={isInputDialogOpen}
        onOpenChange={(open) => {
          setIsInputDialogOpen(open)
          if (!open) {
            setInputAction(null)
            setActionInputText('')
            setActionFile(null)
          }
        }}
      >
        <DialogClose onClose={() => setIsInputDialogOpen(false)} />
        <DialogHeader>
          <DialogTitle>{inputAction?.label || ''}</DialogTitle>
          <DialogDescription>
            {inputAction?.inputLabel || 'Provide additional information'}
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          {inputAction?.confirmType === 'input' && (
            <div>
              <label className="text-sm font-medium mb-2 block">Details</label>
              <textarea
                value={actionInputText}
                onChange={(e) => setActionInputText(e.target.value)}
                placeholder={inputAction.inputPlaceholder || 'Enter details...'}
                rows={4}
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none"
              />
            </div>
          )}
          {inputAction?.confirmType === 'file' && (
            <div>
              <label className="text-sm font-medium mb-2 block">Upload File</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <FileUp className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-3">Drag and drop or click to select a CSV file</p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => setActionFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
                {actionFile && (
                  <p className="text-sm text-emerald-500 mt-2">
                    Selected: {actionFile.name}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsInputDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleInputActionSubmit}
            disabled={
              activeAction === inputAction?.id ||
              (inputAction?.confirmType === 'input' && !actionInputText.trim()) ||
              (inputAction?.confirmType === 'file' && !actionFile)
            }
          >
            {activeAction === inputAction?.id ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Submit
          </Button>
        </DialogFooter>
      </Dialog>

      {/* ─── New Request Form Dialog ─── */}
      <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
        <DialogClose onClose={() => setIsNewRequestOpen(false)} />
        <DialogHeader>
          <DialogTitle>New Request</DialogTitle>
          <DialogDescription>Submit a custom request to the Wryko team</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Request Type</label>
              <Select value={newRequestType} onValueChange={setNewRequestType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="icp_update">ICP Update</SelectItem>
                  <SelectItem value="campaign_pause">Pause Campaign</SelectItem>
                  <SelectItem value="campaign_resume">Resume Campaign</SelectItem>
                  <SelectItem value="add_leads">Add Leads</SelectItem>
                  <SelectItem value="domain_request">Domain Request</SelectItem>
                  <SelectItem value="copy_change">Copy Change</SelectItem>
                  <SelectItem value="schedule_call">Schedule Call</SelectItem>
                  <SelectItem value="report_download">Report Download</SelectItem>
                  <SelectItem value="calendar_update">Calendar Update</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input
                value={newRequestTitle}
                onChange={(e) => setNewRequestTitle(e.target.value)}
                placeholder="Brief summary of your request"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <textarea
                value={newRequestDescription}
                onChange={(e) => setNewRequestDescription(e.target.value)}
                placeholder="Provide details about what you need..."
                rows={4}
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none"
              />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsNewRequestOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleNewRequestSubmit}
            disabled={isSubmitting || !newRequestTitle.trim()}
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Submit Request
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
