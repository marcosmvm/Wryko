'use client'

import { useState } from 'react'
import { Users, Flame, Building2, Globe, Clock, ExternalLink, UserPlus, Eye, Filter, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { mockVisitors, getHighIntentVisitors } from '@/lib/data/dashboard'
import { format, parseISO, formatDistanceToNow } from 'date-fns'

const intentConfig = {
  high: { color: 'text-orange-500', bg: 'bg-orange-500/10', icon: Flame },
  medium: { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Eye },
  low: { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Eye },
}

export default function VisitorsPage() {
  const [intentFilter, setIntentFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const highIntentVisitors = getHighIntentVisitors()
  const totalCompanies = mockVisitors.length
  const pushedToCampaign = mockVisitors.filter(v => v.status === 'pushed_to_campaign').length

  const filteredVisitors = mockVisitors.filter(v => {
    if (intentFilter !== 'all' && v.intentScore !== intentFilter) return false
    if (statusFilter !== 'all' && v.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Visitor Intelligence</h1>
            <Badge variant="info" className="gap-1">
              <Zap className="w-3 h-3" />
              Powered by The Sentinel
            </Badge>
          </div>
          <p className="text-muted-foreground">Identify high-intent website visitors and convert them to leads</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Companies Identified</p>
                <p className="text-3xl font-bold">{totalCompanies}</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">High Intent</p>
                <p className="text-3xl font-bold text-orange-500">{highIntentVisitors.length}</p>
                <p className="text-xs text-muted-foreground">Priority targets</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Contacts Found</p>
                <p className="text-3xl font-bold">
                  {mockVisitors.reduce((sum, v) => sum + (v.contacts?.length || 0), 0)}
                </p>
                <p className="text-xs text-muted-foreground">Decision makers</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Added to Campaign</p>
                <p className="text-3xl font-bold text-emerald-500">{pushedToCampaign}</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter by:</span>
        </div>
        <Select value={intentFilter} onValueChange={setIntentFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Intent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Intent</SelectItem>
            <SelectItem value="high">High Intent</SelectItem>
            <SelectItem value="medium">Medium Intent</SelectItem>
            <SelectItem value="low">Low Intent</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="pushed_to_campaign">In Campaign</SelectItem>
            <SelectItem value="ignored">Ignored</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <Badge variant="outline" className="text-muted-foreground">
          {filteredVisitors.length} {filteredVisitors.length === 1 ? 'company' : 'companies'}
        </Badge>
      </div>

      {/* Visitors List */}
      <div className="space-y-4">
        {filteredVisitors.map((visitor) => {
          const config = intentConfig[visitor.intentScore]
          const IntentIcon = config.icon

          return (
            <Card key={visitor.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Intent Indicator */}
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", config.bg)}>
                    <IntentIcon className={cn("w-6 h-6", config.color)} />
                  </div>

                  {/* Company Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{visitor.companyName}</h3>
                          <Badge variant={
                            visitor.intentScore === 'high' ? 'warning' :
                            visitor.intentScore === 'medium' ? 'info' : 'secondary'
                          } className="capitalize">
                            {visitor.intentScore} Intent
                          </Badge>
                          {visitor.status === 'pushed_to_campaign' && (
                            <Badge variant="success">In Campaign</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            {visitor.companyDomain}
                          </span>
                          {visitor.industry && (
                            <span>{visitor.industry}</span>
                          )}
                          {visitor.companySize && (
                            <span>{visitor.companySize} employees</span>
                          )}
                          {visitor.location && (
                            <span>{visitor.location}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {visitor.status === 'new' && (
                          <Button size="sm" className="gap-1">
                            <UserPlus className="w-4 h-4" />
                            Add to Campaign
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Visit Data */}
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground uppercase">Visits</p>
                        <p className="text-xl font-bold">{visitor.totalVisits}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground uppercase">Time on Site</p>
                        <p className="text-xl font-bold">{visitor.timeOnSite}m</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground uppercase">Pages Viewed</p>
                        <p className="text-xl font-bold">{visitor.pagesViewed.length}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground uppercase">Last Visit</p>
                        <p className="text-sm font-medium">
                          {formatDistanceToNow(parseISO(visitor.lastVisitAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>

                    {/* Intent Signals */}
                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground uppercase mb-2">Intent Signals</p>
                      <div className="flex flex-wrap gap-2">
                        {visitor.intentSignals.map((signal, idx) => (
                          <Badge key={idx} variant="outline" className="font-normal">
                            {signal}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Pages Viewed */}
                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground uppercase mb-2">Pages Viewed</p>
                      <div className="flex flex-wrap gap-2">
                        {visitor.pagesViewed.map((page, idx) => (
                          <Badge key={idx} variant="secondary" className="font-mono text-xs">
                            {page}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contacts */}
                    {visitor.contacts && visitor.contacts.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-muted-foreground uppercase mb-3">Decision Makers Found</p>
                        <div className="grid gap-3 md:grid-cols-2">
                          {visitor.contacts.map((contact, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Users className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-sm text-muted-foreground">{contact.title}</p>
                              </div>
                              {contact.linkedIn && (
                                <Button variant="ghost" size="sm" className="shrink-0">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredVisitors.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold mb-2">No visitors found</h3>
            <p className="text-muted-foreground">Adjust your filters or check back later for new visitors</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
