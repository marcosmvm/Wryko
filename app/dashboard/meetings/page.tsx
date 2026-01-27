'use client'

import { useState } from 'react'
import { Calendar, Download, Building2, User, Clock, CheckCircle, XCircle, AlertCircle, Filter } from 'lucide-react'
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground">Track all your booked meetings and their outcomes</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Upcoming</p>
                <p className="text-3xl font-bold text-primary">{upcomingMeetings.length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">This Month</p>
                <p className="text-3xl font-bold">{totalMeetings}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Show Rate</p>
                <p className="text-3xl font-bold">{showRate}%</p>
                <p className="text-xs text-muted-foreground">Industry avg: 70%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Top Source</p>
                <p className="text-xl font-bold">Campaign Alpha</p>
                <p className="text-xs text-muted-foreground">5 meetings</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-indigo-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      {upcomingMeetings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Meetings ({upcomingMeetings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-4 rounded-xl border bg-gradient-to-br from-primary/5 to-primary/0 hover:from-primary/10 transition-colors"
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
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Past Meetings Table */}
      <Card>
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
                  <TableRow key={meeting.id}>
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
