'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, XCircle, RefreshCw, Mail, Loader2, Globe, Lock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { getDomainById } from '@/lib/supabase/dashboard-actions'
import type { DomainHealth } from '@/lib/types/dashboard'
import { format, parseISO } from 'date-fns'
import { useToastActions } from '@/components/ui/toast'
import { domainWorkflows } from '@/lib/n8n/client'
import { fadeInUp, getStaggerDelay } from '@/lib/animations'

const statusConfig = {
  healthy: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Healthy', variant: 'success' as const },
  warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Warning', variant: 'warning' as const },
  critical: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Critical', variant: 'destructive' as const },
}

const authStatusConfig = {
  pass: { icon: CheckCircle, color: 'text-emerald-500', label: 'Configured & Valid' },
  warning: { icon: AlertTriangle, color: 'text-amber-500', label: 'Misconfigured' },
  fail: { icon: XCircle, color: 'text-red-500', label: 'Not Configured' },
}

export default function DomainDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const [domainData, setDomainData] = useState<DomainHealth | null>(null)
  const [loading, setLoading] = useState(true)
  const [isChecking, setIsChecking] = useState(false)
  const toast = useToastActions()

  useEffect(() => {
    async function load() {
      const result = await getDomainById(id)
      setDomainData(result.data)
      setLoading(false)
    }
    load()
  }, [id])

  const handleRunHealthCheck = useCallback(async () => {
    setIsChecking(true)
    try {
      const result = await domainWorkflows.runHealthCheck('current')
      if (result.success) {
        toast.success('Health check complete', 'Domain health data has been updated')
        const refreshed = await getDomainById(id)
        setDomainData(refreshed.data)
      } else {
        toast.error('Health check failed', result.error || 'Could not run health check')
      }
    } catch {
      toast.error('Health check failed', 'An unexpected error occurred')
    } finally {
      setIsChecking(false)
    }
  }, [id, toast])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!domainData) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-2">Domain not found</h1>
        <Link href="/dashboard/domain-health" className="text-primary hover:underline">
          Back to Domain Health
        </Link>
      </div>
    )
  }

  const domain = domainData
  const config = statusConfig[domain.status]
  const StatusIcon = config.icon
  const unresolvedIssues = domain.issues.filter(i => !i.resolvedAt)

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/domain-health"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Domain Health
      </Link>

      {/* Header */}
      <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-6 h-6 text-muted-foreground" />
              <h1 className="text-2xl font-bold">{domain.domain}</h1>
              <Badge variant={config.variant} className="gap-1">
                <StatusIcon className="w-3 h-3" />
                {config.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Last checked {format(parseISO(domain.lastCheckedAt), 'MMMM d, yyyy h:mm a')}
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleRunHealthCheck}
            disabled={isChecking}
          >
            {isChecking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Run Health Check
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(0)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.bg)}>
                  <Shield className={cn("w-5 h-5", config.color)} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{domain.healthScore}</p>
                  <p className="text-xs text-muted-foreground">Health Score</p>
                </div>
              </div>
              <Progress
                value={domain.healthScore}
                className="h-1.5 mt-3"
                indicatorClassName={
                  domain.healthScore >= 90 ? 'bg-emerald-500' :
                  domain.healthScore >= 70 ? 'bg-amber-500' : 'bg-red-500'
                }
              />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(1)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{domain.deliverabilityRate}%</p>
                  <p className="text-xs text-muted-foreground">Deliverability</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(2)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  domain.bounceRate > 2 ? "bg-red-500/10" : "bg-emerald-500/10"
                )}>
                  <AlertTriangle className={cn(
                    "w-5 h-5",
                    domain.bounceRate > 2 ? "text-red-500" : "text-emerald-500"
                  )} />
                </div>
                <div>
                  <p className={cn(
                    "text-2xl font-bold font-heading",
                    domain.bounceRate > 2 && "text-red-500"
                  )}>{domain.bounceRate}%</p>
                  <p className="text-xs text-muted-foreground">Bounce Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(3)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{domain.spamComplaintRate}%</p>
                  <p className="text-xs text-muted-foreground">Spam Complaints</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(4)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-heading">{domain.totalSent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Authentication Status */}
          <Card variant="futuristic">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Email Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {([
                  { key: 'spfStatus' as const, label: 'SPF (Sender Policy Framework)', description: 'Authorizes which mail servers can send emails for your domain' },
                  { key: 'dkimStatus' as const, label: 'DKIM (DomainKeys Identified Mail)', description: 'Adds a digital signature to verify email authenticity' },
                  { key: 'dmarcStatus' as const, label: 'DMARC (Domain-based Message Authentication)', description: 'Tells receiving servers how to handle unauthenticated emails' },
                ] as const).map((auth, index) => {
                  const authConfig = authStatusConfig[domain[auth.key]]
                  const AuthIcon = authConfig.icon
                  return (
                    <motion.div
                      key={auth.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={getStaggerDelay(index)}
                    >
                      <div className={cn(
                        "p-4 rounded-lg border border-border border-l-[3px]",
                        domain[auth.key] === 'pass' ? "border-l-emerald-500" :
                        domain[auth.key] === 'warning' ? "border-l-amber-500" : "border-l-red-500"
                      )}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center mt-0.5",
                              domain[auth.key] === 'pass' ? "bg-emerald-500/10" :
                              domain[auth.key] === 'warning' ? "bg-amber-500/10" : "bg-red-500/10"
                            )}>
                              <AuthIcon className={cn("w-4 h-4", authConfig.color)} />
                            </div>
                            <div>
                              <p className="font-medium">{auth.label}</p>
                              <p className="text-sm text-muted-foreground mt-0.5">{auth.description}</p>
                            </div>
                          </div>
                          <Badge variant={
                            domain[auth.key] === 'pass' ? 'success' :
                            domain[auth.key] === 'warning' ? 'warning' : 'destructive'
                          } className="text-xs uppercase shrink-0">
                            {domain[auth.key]}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Issues */}
          {domain.issues.length > 0 && (
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Issues
                  {unresolvedIssues.length > 0 && (
                    <Badge variant="warning" className="text-xs">
                      {unresolvedIssues.length} unresolved
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {domain.issues.map((issue, index) => (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={getStaggerDelay(index)}
                    >
                      <div
                        className={cn(
                          "p-4 rounded-lg border border-border border-l-[3px]",
                          issue.severity === 'critical' ? "border-l-red-500" :
                          issue.severity === 'warning' ? "border-l-amber-500" : "border-l-blue-500",
                          issue.resolvedAt ? "opacity-60" : ""
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center mt-0.5",
                              issue.severity === 'critical' ? "bg-red-500/10" :
                              issue.severity === 'warning' ? "bg-amber-500/10" : "bg-blue-500/10"
                            )}>
                              <AlertTriangle className={cn(
                                "w-4 h-4",
                                issue.severity === 'critical' ? "text-red-500" :
                                issue.severity === 'warning' ? "text-amber-500" : "text-blue-500"
                              )} />
                            </div>
                            <div>
                              <p className="font-medium">{issue.message}</p>
                              <p className="text-sm text-muted-foreground">
                                {format(parseISO(issue.detectedAt), 'MMM d, h:mm a')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {issue.autoFixed && (
                              <Badge variant="outline" className="text-xs">Auto-fixed</Badge>
                            )}
                            {issue.resolvedAt ? (
                              <Badge variant="success" className="text-xs">Resolved</Badge>
                            ) : (
                              <Badge variant={issue.severity === 'critical' ? 'destructive' : 'warning'} className="text-xs">
                                {issue.severity === 'critical' ? 'Critical' : 'Needs Attention'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Domain Details */}
          <Card variant="futuristic">
            <CardHeader>
              <CardTitle className="text-lg">Domain Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Status</span>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", config.bg)}>
                      <StatusIcon className={cn("w-3 h-3", config.color)} />
                    </div>
                    <span className="font-medium">{config.label}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Blacklisted</span>
                  <span className={cn("font-medium", domain.blacklisted ? "text-red-500" : "text-emerald-500")}>
                    {domain.blacklisted ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Daily Volume</span>
                  <span className="font-medium">{domain.dailyVolume.toLocaleString()} emails</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Total Sent</span>
                  <span className="font-medium">{domain.totalSent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Last Checked</span>
                  <span className="font-medium">{format(parseISO(domain.lastCheckedAt), 'MMM d, h:mm a')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blacklist Details */}
          {domain.blacklisted && domain.blacklistDetails && domain.blacklistDetails.length > 0 && (
            <Card variant="futuristic" className="border-red-500/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-red-500">
                  <XCircle className="w-5 h-5" />
                  Blacklist Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {domain.blacklistDetails.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-red-500/5 border border-red-500/20">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
