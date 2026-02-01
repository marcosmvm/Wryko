'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, getStaggerDelay } from '@/lib/animations'
import { Shield, CheckCircle, AlertTriangle, XCircle, RefreshCw, Mail, ArrowUp, ArrowDown, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { mockDomains } from '@/lib/data/dashboard'
import { format, parseISO } from 'date-fns'
import { useToastActions } from '@/components/ui/toast'
import { domainWorkflows } from '@/lib/n8n/client'

const statusConfig = {
  healthy: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Healthy' },
  warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Warning' },
  critical: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Critical' },
}

const authStatusConfig = {
  pass: { icon: CheckCircle, color: 'text-emerald-500' },
  warning: { icon: AlertTriangle, color: 'text-amber-500' },
  fail: { icon: XCircle, color: 'text-red-500' },
}

export default function DomainHealthPage() {
  const [isChecking, setIsChecking] = useState(false)
  const toast = useToastActions()

  const handleRunHealthCheck = useCallback(async () => {
    setIsChecking(true)
    try {
      const result = await domainWorkflows.runHealthCheck('current')
      if (result.success) {
        toast.success('Health check complete', 'Domain health data has been updated')
      } else {
        toast.error('Health check failed', result.error || 'Could not run health check')
      }
    } catch {
      toast.error('Health check failed', 'An unexpected error occurred')
    } finally {
      setIsChecking(false)
    }
  }, [toast])

  const healthyDomains = mockDomains.filter(d => d.status === 'healthy').length
  const warningDomains = mockDomains.filter(d => d.status === 'warning').length
  const criticalDomains = mockDomains.filter(d => d.status === 'critical').length

  const avgDeliverability = mockDomains.reduce((sum, d) => sum + d.deliverabilityRate, 0) / mockDomains.length
  const avgBounceRate = mockDomains.reduce((sum, d) => sum + d.bounceRate, 0) / mockDomains.length
  const totalSent = mockDomains.reduce((sum, d) => sum + d.totalSent, 0)

  const allIssues = mockDomains.flatMap(d => d.issues.map(i => ({ ...i, domain: d.domain })))
  const unresolvedIssues = allIssues.filter(i => !i.resolvedAt)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Domain Health</h1>
            <p className="text-muted-foreground">Monitor your sending infrastructure and deliverability</p>
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

      {/* Overall Status Banner */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Card variant="futuristic" className={cn(
          "border-2 relative overflow-hidden",
          criticalDomains > 0 ? "border-red-500/50 bg-red-500/5" :
          warningDomains > 0 ? "border-amber-500/50 bg-amber-500/5" :
          "border-emerald-500/50 bg-emerald-500/5"
        )}>
          <div className={cn(
            "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r",
            criticalDomains > 0 ? "from-red-500 via-red-400 to-red-500" :
            warningDomains > 0 ? "from-amber-500 via-amber-400 to-amber-500" :
            "from-emerald-500 via-primary to-emerald-500"
          )} />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center",
                criticalDomains > 0 ? "bg-red-500/20" :
                warningDomains > 0 ? "bg-amber-500/20" :
                "bg-emerald-500/20"
              )}>
                <Shield className={cn(
                  "w-7 h-7",
                  criticalDomains > 0 ? "text-red-500" :
                  warningDomains > 0 ? "text-amber-500" :
                  "text-emerald-500"
                )} />
              </div>
              <div className="flex-1">
                <h2 className={cn(
                  "text-xl font-bold",
                  criticalDomains > 0 ? "text-red-600 dark:text-red-400" :
                  warningDomains > 0 ? "text-amber-600 dark:text-amber-400" :
                  "text-emerald-600 dark:text-emerald-400"
                )}>
                  {criticalDomains > 0 ? "Critical Issues Detected" :
                   warningDomains > 0 ? "Attention Required" :
                   "All Systems Healthy"}
                </h2>
                <p className="text-muted-foreground">
                  {healthyDomains} healthy, {warningDomains} warning, {criticalDomains} critical
                </p>
              </div>
              {unresolvedIssues.length > 0 && (
                <Badge variant={criticalDomains > 0 ? "destructive" : "warning"}>
                  {unresolvedIssues.length} unresolved {unresolvedIssues.length === 1 ? 'issue' : 'issues'}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(0)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Active Domains</p>
              <p className="text-3xl font-bold font-heading">{mockDomains.length}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(1)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Avg Deliverability</p>
              <p className="text-3xl font-bold font-heading">{avgDeliverability.toFixed(1)}%</p>
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                <ArrowUp className="w-3 h-3" /> Above 95% target
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(2)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Avg Bounce Rate</p>
              <p className="text-3xl font-bold font-heading">{avgBounceRate.toFixed(1)}%</p>
              <p className={cn(
                "text-xs flex items-center gap-1",
                avgBounceRate <= 2 ? "text-emerald-500" : "text-amber-500"
              )}>
                {avgBounceRate <= 2 ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />}
                Target: &lt;2%
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={getStaggerDelay(3)} whileHover={{ y: -2 }}>
          <Card variant="futuristic">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Sent</p>
              <p className="text-3xl font-bold font-heading">{totalSent.toLocaleString()}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Domains Table */}
      <Card variant="futuristic">
        <CardHeader>
          <CardTitle className="text-lg">Sending Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Deliverability</TableHead>
                <TableHead>Bounce Rate</TableHead>
                <TableHead>SPF</TableHead>
                <TableHead>DKIM</TableHead>
                <TableHead>DMARC</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDomains.map((domain) => {
                const config = statusConfig[domain.status]
                const StatusIcon = config.icon

                return (
                  <TableRow key={domain.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {domain.domain}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16">
                          <Progress
                            value={domain.healthScore}
                            className="h-2"
                            indicatorClassName={
                              domain.healthScore >= 90 ? 'bg-emerald-500' :
                              domain.healthScore >= 70 ? 'bg-amber-500' : 'bg-red-500'
                            }
                          />
                        </div>
                        <span className="text-sm font-medium">{domain.healthScore}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{domain.deliverabilityRate}%</TableCell>
                    <TableCell className={cn(
                      "font-medium",
                      domain.bounceRate > 2 ? "text-red-500" :
                      domain.bounceRate > 1 ? "text-amber-500" : ""
                    )}>
                      {domain.bounceRate}%
                    </TableCell>
                    <TableCell>
                      <AuthStatus status={domain.spfStatus} />
                    </TableCell>
                    <TableCell>
                      <AuthStatus status={domain.dkimStatus} />
                    </TableCell>
                    <TableCell>
                      <AuthStatus status={domain.dmarcStatus} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${config.bg} flex items-center justify-center`}>
                          <StatusIcon className={`w-3 h-3 ${config.color}`} />
                        </div>
                        <span className="text-sm">{config.label}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Issues Section */}
      {allIssues.length > 0 && (
        <Card variant="futuristic">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Recent Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allIssues.map((issue, index) => (
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
                            {issue.domain} • {format(parseISO(issue.detectedAt), 'MMM d, h:mm a')}
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
  )
}

function AuthStatus({ status }: { status: 'pass' | 'warning' | 'fail' }) {
  const config = authStatusConfig[status]
  const Icon = config.icon

  return (
    <div className="flex items-center gap-1">
      <Icon className={cn("w-4 h-4", config.color)} />
      <span className="text-xs uppercase">{status}</span>
    </div>
  )
}
