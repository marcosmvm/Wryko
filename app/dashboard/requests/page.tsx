'use client'

import { useState } from 'react'
import { MessageSquare, Pause, Play, FileText, Calendar, PenLine, Upload, CheckCircle, Clock, AlertCircle, Zap, Plus } from 'lucide-react'
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
import { cn } from '@/lib/utils'
import { mockRequests, getPendingRequests } from '@/lib/data/dashboard'
import { format, parseISO, formatDistanceToNow } from 'date-fns'

const quickActions = [
  {
    id: 'pause',
    label: 'Pause Campaign',
    icon: Pause,
    type: 'instant',
    color: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20',
  },
  {
    id: 'resume',
    label: 'Resume Campaign',
    icon: Play,
    type: 'instant',
    color: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
  },
  {
    id: 'icp',
    label: 'Update ICP',
    icon: PenLine,
    type: 'instant',
    color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
  },
  {
    id: 'report',
    label: 'Download Report',
    icon: FileText,
    type: 'instant',
    color: 'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20',
  },
  {
    id: 'calendar',
    label: 'Update Calendar',
    icon: Calendar,
    type: 'instant',
    color: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20',
  },
  {
    id: 'leads',
    label: 'Upload Leads',
    icon: Upload,
    type: 'review',
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
  const pendingRequests = getPendingRequests()
  const completedRequests = mockRequests.filter(r => r.status === 'completed')
  const avgProcessingTime = completedRequests.reduce((sum, r) => sum + (r.processingTime || 0), 0) / completedRequests.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Self-Serve Requests</h1>
          <p className="text-muted-foreground">Submit requests and track their status</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Request
        </Button>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Quick Actions
            <Badge variant="outline" className="font-normal ml-2">Instant</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl transition-colors",
                  action.color
                )}
              >
                <action.icon className="w-6 h-6" />
                <span className="text-sm font-medium text-center">{action.label}</span>
                {action.type === 'review' && (
                  <Badge variant="outline" className="text-[10px]">Review Required</Badge>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Pending</p>
            <p className="text-3xl font-bold">{pendingRequests.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Completed This Month</p>
            <p className="text-3xl font-bold">{completedRequests.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Avg Processing Time</p>
            <p className="text-3xl font-bold">
              {avgProcessingTime < 1 ? '<1' : Math.round(avgProcessingTime)}
              <span className="text-lg font-normal text-muted-foreground">min</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Instant Actions</p>
            <p className="text-3xl font-bold text-emerald-500">
              {completedRequests.filter(r => r.category === 'instant').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Pending Requests ({pendingRequests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRequests.map((request) => {
                const config = statusConfig[request.status]
                const StatusIcon = config.icon

                return (
                  <div
                    key={request.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-amber-500/5 border-amber-500/20"
                  >
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", config.bg)}>
                      <StatusIcon className={cn("w-5 h-5", config.color)} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{request.title}</p>
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
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Request History */}
      <Card>
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
              {mockRequests.map((request) => {
                const config = statusConfig[request.status]
                const StatusIcon = config.icon

                return (
                  <TableRow key={request.id}>
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
    </div>
  )
}
