'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Building2,
  User,
  Clock,
  Mail,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Briefcase,
  FileText,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getMeetingById } from '@/lib/supabase/dashboard-actions'
import type { Meeting } from '@/lib/types/dashboard'
import { format, parseISO } from 'date-fns'
import { fadeInUp, getStaggerDelay } from '@/lib/animations'

const statusConfig = {
  scheduled: { icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Scheduled' },
  completed: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Completed' },
  no_show: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'No Show' },
  rescheduled: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Rescheduled' },
  cancelled: { icon: AlertCircle, color: 'text-gray-500', bg: 'bg-gray-500/10', label: 'Cancelled' },
}

const outcomeConfig = {
  opportunity: { variant: 'success' as const, label: 'Opportunity' },
  not_qualified: { variant: 'secondary' as const, label: 'Not Qualified' },
  pending: { variant: 'warning' as const, label: 'Pending' },
}

export default function MeetingDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const [meeting, setMeeting] = useState<Meeting | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const result = await getMeetingById(id)
      setMeeting(result.data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!meeting) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-2">Meeting not found</h1>
        <Link href="/dashboard/meetings" className="text-primary hover:underline">
          Back to Meetings
        </Link>
      </div>
    )
  }

  const config = statusConfig[meeting.status]
  const StatusIcon = config.icon
  const outcome = meeting.outcome ? outcomeConfig[meeting.outcome] : null

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/meetings"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Meetings
      </Link>

      {/* Header */}
      <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{meeting.contactName}</h1>
              <Badge variant={
                meeting.status === 'completed' ? 'success' :
                meeting.status === 'scheduled' ? 'info' :
                meeting.status === 'no_show' ? 'destructive' :
                meeting.status === 'rescheduled' ? 'warning' : 'secondary'
              } className="capitalize gap-1">
                <StatusIcon className="w-3 h-3" />
                {config.label}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {meeting.meetingType}
              </Badge>
            </div>
            <p className="text-muted-foreground">{meeting.contactTitle}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {format(parseISO(meeting.scheduledAt), 'EEEE, MMMM d, yyyy \'at\' h:mm a')}
            </p>
          </div>
          {meeting.calendarLink && (
            <Button asChild variant="outline" className="gap-2">
              <a href={meeting.calendarLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Open Calendar
              </a>
            </Button>
          )}
        </div>
      </motion.div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(0)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold">{meeting.companyName}</p>
                  <p className="text-xs text-muted-foreground">
                    {meeting.companySize ? `${meeting.companySize} employees` : 'Company'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(1)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="font-semibold">{meeting.industry || 'Not specified'}</p>
                  <p className="text-xs text-muted-foreground">Industry</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(2)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-semibold capitalize">{meeting.meetingType}</p>
                  <p className="text-xs text-muted-foreground">Meeting Type</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(3)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  {outcome ? (
                    <Badge variant={outcome.variant} className="capitalize">
                      {outcome.label}
                    </Badge>
                  ) : (
                    <p className="font-semibold text-muted-foreground">Pending</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Outcome</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Two Column Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(4)}>
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{meeting.contactName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Title</span>
                    <span className="font-medium">{meeting.contactTitle}</span>
                  </div>
                  {meeting.contactEmail && (
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Email</span>
                      <a
                        href={`mailto:${meeting.contactEmail}`}
                        className="font-medium text-primary hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {meeting.contactEmail}
                      </a>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Company</span>
                    <span className="font-medium">{meeting.companyName}</span>
                  </div>
                  {meeting.companySize && (
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Company Size</span>
                      <span className="font-medium">{meeting.companySize}</span>
                    </div>
                  )}
                  {meeting.industry && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Industry</span>
                      <span className="font-medium">{meeting.industry}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Meeting Notes */}
          {meeting.notes && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(5)}>
              <Card variant="futuristic">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    Meeting Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {meeting.notes}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Meeting Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(4)}>
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-lg">Meeting Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Status</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${config.bg} flex items-center justify-center`}>
                        <StatusIcon className={`w-3 h-3 ${config.color}`} />
                      </div>
                      <span className="font-medium">{config.label}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Date & Time</span>
                    <span className="font-medium">
                      {format(parseISO(meeting.scheduledAt), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Type</span>
                    <Badge variant="outline" className="capitalize">{meeting.meetingType}</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Outcome</span>
                    {outcome ? (
                      <Badge variant={outcome.variant} className="capitalize">
                        {outcome.label}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Source</span>
                    {meeting.campaignId ? (
                      <Link
                        href={`/dashboard/campaigns/${meeting.campaignId}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {meeting.campaignName}
                      </Link>
                    ) : (
                      <span className="font-medium">{meeting.campaignName || '-'}</span>
                    )}
                  </div>
                  {meeting.calendarLink && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Calendar</span>
                      <a
                        href={meeting.calendarLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline flex items-center gap-1"
                      >
                        Open Link
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
