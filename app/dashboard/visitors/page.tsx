'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, getStaggerDelay } from '@/lib/animations'
import { Users, Flame, Building2, Globe, Clock, ExternalLink, UserPlus, Eye, EyeOff, Mail, Filter, Zap, Loader2 } from 'lucide-react'
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
import { getVisitors } from '@/lib/supabase/dashboard-actions'
import type { WebsiteVisitor } from '@/lib/types/dashboard'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { useToastActions } from '@/components/ui/toast'
import { visitorWorkflows } from '@/lib/n8n/client'

const intentConfig = {
  high: { color: 'text-orange-500', bg: 'bg-orange-500/10', icon: Flame },
  medium: { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Eye },
  low: { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Eye },
}

export default function VisitorsPage() {
  const [intentFilter, setIntentFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [visitors, setVisitors] = useState<WebsiteVisitor[]>([])
  const [loading, setLoading] = useState(true)
  const [addingToCampaign, setAddingToCampaign] = useState<string | null>(null)
  const [ignoringVisitor, setIgnoringVisitor] = useState<string | null>(null)
  const toast = useToastActions()

  const handleAddToCampaign = useCallback(async (visitorId: string, companyName: string) => {
    setAddingToCampaign(visitorId)
    try {
      const result = await visitorWorkflows.addToCampaign(visitorId, 'default')
      if (result.success) {
        const campaignId = (result.data as { campaignId?: string })?.campaignId
        setVisitors(prev =>
          prev.map(v =>
            v.id === visitorId ? { ...v, status: 'pushed_to_campaign' as const, campaignId: campaignId || v.campaignId } : v
          )
        )
        toast.success('Added to campaign', `${companyName} has been added to your campaign`)
      } else {
        toast.error('Failed to add', result.error || 'Could not add visitor to campaign')
      }
    } catch {
      toast.error('Failed to add', 'An unexpected error occurred')
    } finally {
      setAddingToCampaign(null)
    }
  }, [toast])

  const handleIgnoreVisitor = useCallback(async (visitorId: string, companyName: string) => {
    setIgnoringVisitor(visitorId)
    try {
      const result = await visitorWorkflows.ignore(visitorId)
      if (result.success) {
        setVisitors(prev =>
          prev.map(v =>
            v.id === visitorId ? { ...v, status: 'ignored' as const } : v
          )
        )
        toast.success('Visitor ignored', `${companyName} has been ignored`)
      } else {
        toast.error('Failed to ignore', result.error || 'Could not ignore visitor')
      }
    } catch {
      toast.error('Failed to ignore', 'An unexpected error occurred')
    } finally {
      setIgnoringVisitor(null)
    }
  }, [toast])

  useEffect(() => {
    async function load() {
      const result = await getVisitors()
      setVisitors(result.data)
      setLoading(false)
    }
    load()
  }, [])

  const handleOpenLinkedIn = useCallback((linkedInUrl: string) => {
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer')
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const highIntentVisitors = visitors.filter(v => v.intentScore === 'high')
  const totalCompanies = visitors.length
  const pushedToCampaign = visitors.filter(v => v.status === 'pushed_to_campaign').length

  const filteredVisitors = visitors.filter(v => {
    if (intentFilter !== 'all' && v.intentScore !== intentFilter) return false
    if (statusFilter !== 'all' && v.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Visitor Intelligence</h1>
              <Badge variant="info" className="gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-info animate-pulse" />
                <Zap className="w-3 h-3" />
                Powered by The Sentinel
              </Badge>
            </div>
            <p className="text-muted-foreground">Identify high-intent website visitors and convert them to leads</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(0)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Companies Identified</p>
                  <p className="text-3xl font-bold font-heading">{totalCompanies}</p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(1)} whileHover={{ y: -2 }}>
          <Card variant="futuristic" className="">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">High Intent</p>
                  <p className="text-3xl font-bold font-heading text-orange-500">{highIntentVisitors.length}</p>
                  <p className="text-xs text-muted-foreground">Priority targets</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-500" />
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
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Contacts Found</p>
                  <p className="text-3xl font-bold font-heading">
                    {visitors.reduce((sum, v) => sum + (v.contacts?.length || 0), 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Decision makers</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-500" />
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
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Added to Campaign</p>
                  <p className="text-3xl font-bold font-heading text-emerald-500">{pushedToCampaign}</p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="border border-border p-4 rounded-xl">
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
      </div>

      {/* Visitors List */}
      <div className="space-y-4">
        {filteredVisitors.map((visitor, index) => {
          const config = intentConfig[visitor.intentScore]
          const IntentIcon = config.icon

          return (
            <motion.div key={visitor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(index)} whileHover={{ y: -2 }}>
              <Card variant="futuristic" className={cn("group", visitor.intentScore === 'high' && "")}>
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
                            {visitor.status === 'ignored' && (
                              <Badge variant="secondary">Ignored</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <a
                              href={visitor.companyDomain.startsWith('http') ? visitor.companyDomain : `https://${visitor.companyDomain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-foreground transition-colors"
                            >
                              <Globe className="w-4 h-4" />
                              {visitor.companyDomain}
                            </a>
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
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => handleIgnoreVisitor(visitor.id, visitor.companyName)}
                                disabled={ignoringVisitor === visitor.id || addingToCampaign === visitor.id}
                              >
                                {ignoringVisitor === visitor.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <EyeOff className="w-4 h-4" />
                                )}
                                Ignore
                              </Button>
                              <Button
                                size="sm"
                                className="gap-1"
                                onClick={() => handleAddToCampaign(visitor.id, visitor.companyName)}
                                disabled={addingToCampaign === visitor.id || ignoringVisitor === visitor.id}
                              >
                                {addingToCampaign === visitor.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <UserPlus className="w-4 h-4" />
                                )}
                                Add to Campaign
                              </Button>
                            </>
                          )}
                          {visitor.status === 'pushed_to_campaign' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              asChild
                            >
                              <Link href={
                                visitor.campaignId
                                  ? `/dashboard/campaigns/${visitor.campaignId}`
                                  : '/dashboard/campaigns'
                              }>
                                <ExternalLink className="w-4 h-4" />
                                View Campaign
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Visit Data */}
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground uppercase">Visits</p>
                          <p className="text-xl font-bold font-heading">{visitor.totalVisits}</p>
                        </div>
                        <div className="p-3 rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground uppercase">Time on Site</p>
                          <p className="text-xl font-bold font-heading">{visitor.timeOnSite}m</p>
                        </div>
                        <div className="p-3 rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground uppercase">Pages Viewed</p>
                          <p className="text-xl font-bold font-heading">{visitor.pagesViewed.length}</p>
                        </div>
                        <div className="p-3 rounded-lg border border-border">
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
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-xs text-muted-foreground uppercase mb-3">Decision Makers Found</p>
                          <div className="grid gap-3 md:grid-cols-2">
                            {visitor.contacts.map((contact, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                  <Users className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium">{contact.name}</p>
                                  <p className="text-sm text-muted-foreground">{contact.title}</p>
                                  {contact.email && (
                                    <a
                                      href={`mailto:${contact.email}`}
                                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mt-0.5"
                                    >
                                      <Mail className="w-3 h-3" />
                                      {contact.email}
                                    </a>
                                  )}
                                </div>
                                {contact.linkedIn && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="shrink-0"
                                    onClick={() => handleOpenLinkedIn(contact.linkedIn!)}
                                  >
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
            </motion.div>
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
