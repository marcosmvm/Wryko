'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Download, Building2, User, Clock, CheckCircle, XCircle, AlertCircle, Filter, Loader2 } from 'lucide-react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockMeetings, getUpcomingMeetings } from '@/lib/data/dashboard'
import { format, parseISO, isToday, isTomorrow } from 'date-fns'
import { useToastActions } from '@/components/ui/toast'
import { meetingsWorkflows } from '@/lib/n8n/client'
import { fadeInUp, getStaggerDelay } from '@/lib/animations'

function formatMeetingDate(dateStr: string): string {
  const date = parseISO(dateStr)
  if (isToday(date)) {
    return `Today, ${format(date, 'h:mm a')}`
  }
  if (isTomorrow(date)) {
    return `Tomorrow, ${format(date, 'h:mm a')}`
  }
  return format(date, 'MMM d, yyyy h:mm a')
}

const statusConfig = {
  scheduled: { icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Scheduled' },
  completed: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Completed' },
  no_show: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'No Show' },
  rescheduled: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Rescheduled' },
  cancelled: { icon: AlertCircle, color: 'text-gray-500', bg: 'bg-gray-500/10', label: 'Cancelled' },
}

export default function MeetingsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isExporting, setIsExporting] = useState(false)
  const toast = useToastActions()

  const handleExportCSV = useCallback(async () => {
    setIsExporting(true)
    try {
      const result = await meetingsWorkflows.exportCSV('current', { status: statusFilter })
      if (result.success && result.data?.downloadUrl) {
        window.open(result.data.downloadUrl, '_blank')
        toast.success('Export ready', 'Your CSV download has started')
      } else {
        toast.error('Export failed', result.error || 'Could not export meetings data')
      }
    } catch {
      toast.error('Export failed', 'An unexpected error occurred')
    } finally {
      setIsExporting(false)
    }
  }, [statusFilter, toast])

  const upcomingMeetings = getUpcomingMeetings()
  const pastMeetings = mockMeetings.filter(m => m.status !== 'scheduled')

  const filteredPastMeetings = statusFilter === 'all'
    ? pastMeetings
    : pastMeetings.filter(m => m.status === statusFilter)

  const totalMeetings = mockMeetings.length
  const completedMeetings = mockMeetings.filter(m => m.status === 'completed').length
  const noShowMeetings = mockMeetings.filter(m => m.status === 'no_show').length
  const showRate = totalMeetings > 0 ? Math.round((completedMeetings / (completedMeetings + noShowMeetings)) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeInUp} transition={{ duration: 0.5 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground">Track all your booked meetings and their outcomes</p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleExportCSV}
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          Export CSV
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(0)} whileHover={{ y: -2 }}>
          <Card variant="futuristic" className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary/60 to-primary" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Upcoming</p>
                  <p className="text-3xl font-bold font-heading text-primary-muted">{upcomingMeetings.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(1)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">This Month</p>
                  <p className="text-3xl font-bold font-heading">{totalMeetings}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(2)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Show Rate</p>
                  <p className="text-3xl font-bold font-heading">{showRate}%</p>
                  <p className="text-xs text-muted-foreground">Industry avg: 70%</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(3)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Top Source</p>
                  <p className="text-xl font-bold font-heading">Campaign Alpha</p>
                  <p className="text-xs text-muted-foreground">5 meetings</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-indigo-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Meetings */}
      {upcomingMeetings.length > 0 && (
        <Card variant="futuristic">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              Upcoming Meetings ({upcomingMeetings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingMeetings.map((meeting, index) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={getStaggerDelay(index)}
                  whileHover={{ y: -3 }}
                >
                  <div
                    className="p-4 rounded-xl border border-border transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{meeting.contactName}</p>
                        <p className="text-sm text-muted-foreground">{meeting.contactTitle}</p>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {meeting.meetingType}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Building2 className="w-4 h-4" />
                      <span>{meeting.companyName}</span>
                      {meeting.companySize && (
                        <span className="text-xs">({meeting.companySize})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <Clock className="w-4 h-4" />
                      <span>{formatMeetingDate(meeting.scheduledAt)}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">via {meeting.campaignName}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Past Meetings Table */}
      <Card variant="futuristic">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Meeting History</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPastMeetings.map((meeting) => {
                const config = statusConfig[meeting.status]
                const StatusIcon = config.icon

                return (
                  <TableRow key={meeting.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      {format(parseISO(meeting.scheduledAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{meeting.contactName}</p>
                        <p className="text-xs text-muted-foreground">{meeting.contactTitle}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        {meeting.companyName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {meeting.meetingType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${config.bg} flex items-center justify-center`}>
                          <StatusIcon className={`w-3 h-3 ${config.color}`} />
                        </div>
                        <span className="text-sm">{config.label}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {meeting.outcome ? (
                        <Badge
                          variant={meeting.outcome === 'opportunity' ? 'success' : meeting.outcome === 'pending' ? 'warning' : 'secondary'}
                          className="capitalize"
                        >
                          {meeting.outcome.replace('_', ' ')}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {meeting.campaignName}
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
