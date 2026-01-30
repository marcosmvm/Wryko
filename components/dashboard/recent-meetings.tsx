'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Building2, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getUpcomingMeetings, mockMeetings } from '@/lib/data/dashboard'
import { format, parseISO, isToday, isTomorrow } from 'date-fns'

function formatMeetingDate(dateStr: string): string {
  const date = parseISO(dateStr)
  if (isToday(date)) {
    return `Today, ${format(date, 'h:mm a')}`
  }
  if (isTomorrow(date)) {
    return `Tomorrow, ${format(date, 'h:mm a')}`
  }
  return format(date, 'MMM d, h:mm a')
}

export function RecentMeetings() {
  const upcomingMeetings = getUpcomingMeetings().slice(0, 4)
  const recentCompleted = mockMeetings
    .filter(m => m.status === 'completed')
    .slice(0, 2)

  return (
    <Card variant="futuristic">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Meetings</CardTitle>
        <Link
          href="/dashboard/meetings"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upcoming Section */}
        {upcomingMeetings.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Upcoming ({upcomingMeetings.length})
            </p>
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-start gap-3 p-3 rounded-lg glass-card glow-border-hover transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{meeting.contactName}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Building2 className="w-3 h-3" />
                      <span className="truncate">{meeting.companyName}</span>
                    </div>
                    <p className="text-xs text-primary font-medium mt-1">
                      {formatMeetingDate(meeting.scheduledAt)}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-[10px]">
                    {meeting.meetingType}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recently Completed */}
        {recentCompleted.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Recently Completed
            </p>
            <div className="space-y-2">
              {recentCompleted.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{meeting.contactName}</p>
                      <p className="text-xs text-muted-foreground">{meeting.companyName}</p>
                    </div>
                  </div>
                  {meeting.outcome && (
                    <Badge
                      variant={meeting.outcome === 'opportunity' ? 'success' : 'secondary'}
                      className="text-[10px]"
                    >
                      {meeting.outcome}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
