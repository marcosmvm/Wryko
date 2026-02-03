'use server'

import { createClient } from '@/lib/supabase/server'
import type { AdminMetrics, EngineRun, AdminActivity, AdminHealthOverview, AdminRiskSignal, AdminClientRequest, AdminWeeklyReport, AdminOnboardingClient, AdminIssue, AdminCsmMetrics } from '@/lib/types/admin'
import { HEALTH_THRESHOLDS } from '@/lib/constants/admin'

// =============================================================================
// ADMIN METRICS (aggregated from real tables)
// =============================================================================

export async function getAdminMetrics(): Promise<{ data: AdminMetrics; error: string | null }> {
  const supabase = await createClient()

  // Fetch clients, engine runs, and meetings in parallel
  const [clientsResult, runsResult, meetingsResult] = await Promise.all([
    supabase.from('clients').select('status, mrr, health_score'),
    supabase.from('engine_runs').select('status').eq('status', 'running'),
    supabase
      .from('meetings')
      .select('id')
      .gte('scheduled_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
  ])

  const clients = clientsResult.data || []
  const activeClients = clients.filter(c => c.status === 'active').length
  const totalMrr = clients.reduce((sum, c) => sum + (Number(c.mrr) || 0), 0)
  const enginesRunning = (runsResult.data || []).length
  const meetingsThisWeek = (meetingsResult.data || []).length
  const clientsOnboarding = clients.filter(c => c.status === 'onboarding').length
  const clientsAtRisk = clients.filter(
    c => c.health_score < HEALTH_THRESHOLDS.HEALTHY && c.status === 'active'
  ).length

  return {
    data: {
      activeClients,
      totalMrr,
      enginesRunning,
      meetingsThisWeek,
      clientsOnboarding,
      clientsAtRisk,
    },
    error: clientsResult.error?.message || null,
  }
}

// =============================================================================
// ENGINE RUNS
// =============================================================================

export async function getEngineRuns(filters?: {
  clientId?: string
  limit?: number
}): Promise<{ data: EngineRun[]; error: string | null }> {
  const supabase = await createClient()

  let query = supabase
    .from('engine_runs')
    .select('*')
    .order('started_at', { ascending: false })

  if (filters?.clientId) {
    query = query.eq('client_id', filters.clientId)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      engineSlug: row.engine_slug,
      engineName: row.engine_name,
      clientId: row.client_id || undefined,
      clientName: row.client_name || undefined,
      status: row.status as EngineRun['status'],
      startedAt: row.started_at,
      completedAt: row.completed_at || undefined,
      durationMs: row.duration_ms || undefined,
      inputSummary: row.input_summary || undefined,
      outputSummary: row.output_summary || undefined,
      errorMessage: row.error_message || undefined,
    })),
    error: null,
  }
}

export async function getEngineRunsBySlug(slug: string): Promise<{ data: EngineRun[]; error: string | null }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('engine_runs')
    .select('*')
    .eq('engine_slug', slug)
    .order('started_at', { ascending: false })

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      engineSlug: row.engine_slug,
      engineName: row.engine_name,
      clientId: row.client_id || undefined,
      clientName: row.client_name || undefined,
      status: row.status as EngineRun['status'],
      startedAt: row.started_at,
      completedAt: row.completed_at || undefined,
      durationMs: row.duration_ms || undefined,
      inputSummary: row.input_summary || undefined,
      outputSummary: row.output_summary || undefined,
      errorMessage: row.error_message || undefined,
    })),
    error: null,
  }
}

// =============================================================================
// ADMIN ACTIVITY
// =============================================================================

export async function getAdminActivity(filters?: {
  clientId?: string
  limit?: number
}): Promise<{ data: AdminActivity[]; error: string | null }> {
  const supabase = await createClient()

  let query = supabase
    .from('admin_activity')
    .select('*')
    .order('timestamp', { ascending: false })

  if (filters?.clientId) {
    query = query.eq('resource_id', filters.clientId)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      adminName: row.admin_name,
      action: row.action,
      resourceType: row.resource_type as AdminActivity['resourceType'],
      resourceId: row.resource_id || undefined,
      resourceName: row.resource_name || undefined,
      details: row.details || undefined,
      timestamp: row.timestamp,
    })),
    error: null,
  }
}

// =============================================================================
// CAMPAIGNS (admin-level, all clients)
// =============================================================================

export async function getAdminCampaigns(clientId: string): Promise<{
  data: Array<{
    id: string
    name: string
    status: string
    sent: number
    openRate: number
    replyRate: number
    meetings: number
  }>
  error: string | null
}> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('campaigns')
    .select('id, name, status, sent, open_rate, reply_rate, meetings')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      name: row.name,
      status: row.status,
      sent: row.sent,
      openRate: Number(row.open_rate),
      replyRate: Number(row.reply_rate),
      meetings: row.meetings,
    })),
    error: null,
  }
}

// =============================================================================
// CSM: HEALTH SCORES (Engine M - The Monitor)
// =============================================================================

export async function getAllHealthScores(): Promise<{ data: AdminHealthOverview[]; error: string | null }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('health_scores')
    .select('*, clients!inner(company_name)')
    .order('overall_score', { ascending: true })

  if (error) return { data: [], error: error.message }

  return {
    data: (data || []).map(row => ({
      clientId: row.client_id,
      clientName: row.clients?.company_name || 'Unknown',
      overall: row.overall_score ?? 0,
      status: row.overall_score >= 80 ? 'healthy' : row.overall_score >= 60 ? 'warning' : 'critical' as AdminHealthOverview['status'],
      trend: (row.trend || 'stable') as AdminHealthOverview['trend'],
      riskSignals: Array.isArray(row.risk_signals) ? row.risk_signals.map((s: Record<string, string>) => ({
        signal: s.signal || '',
        severity: (s.severity || 'low') as AdminRiskSignal['severity'],
        description: s.description || '',
      })) : [],
      domainHealth: row.domain_health ?? 0,
      replyQuality: row.reply_quality ?? 0,
      engagementLevel: row.engagement_level ?? 0,
      meetingConversion: row.meeting_conversion ?? 0,
      lastUpdatedAt: row.updated_at || row.created_at,
    })),
    error: null,
  }
}

export async function getClientHealthScore(clientId: string): Promise<{ data: AdminHealthOverview | null; error: string | null }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('health_scores')
    .select('*, clients!inner(company_name)')
    .eq('client_id', clientId)
    .single()

  if (error) return { data: null, error: error.message }
  if (!data) return { data: null, error: null }

  return {
    data: {
      clientId: data.client_id,
      clientName: data.clients?.company_name || 'Unknown',
      overall: data.overall_score ?? 0,
      status: data.overall_score >= 80 ? 'healthy' : data.overall_score >= 60 ? 'warning' : 'critical',
      trend: (data.trend || 'stable') as AdminHealthOverview['trend'],
      riskSignals: Array.isArray(data.risk_signals) ? data.risk_signals.map((s: Record<string, string>) => ({
        signal: s.signal || '',
        severity: (s.severity || 'low') as AdminRiskSignal['severity'],
        description: s.description || '',
      })) : [],
      domainHealth: data.domain_health ?? 0,
      replyQuality: data.reply_quality ?? 0,
      engagementLevel: data.engagement_level ?? 0,
      meetingConversion: data.meeting_conversion ?? 0,
      lastUpdatedAt: data.updated_at || data.created_at,
    },
    error: null,
  }
}

// =============================================================================
// CSM: CLIENT REQUESTS (Engine N - The Navigator)
// =============================================================================

export async function getAllClientRequests(filters?: {
  status?: string
  category?: string
  clientId?: string
}): Promise<{ data: AdminClientRequest[]; error: string | null }> {
  const supabase = await createClient()

  let query = supabase
    .from('client_requests')
    .select('*, clients!inner(company_name)')
    .order('submitted_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.clientId) query = query.eq('client_id', filters.clientId)

  const { data, error } = await query

  if (error) return { data: [], error: error.message }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      clientId: row.client_id,
      clientName: row.clients?.company_name || 'Unknown',
      type: row.type as AdminClientRequest['type'],
      category: row.category as AdminClientRequest['category'],
      status: row.status as AdminClientRequest['status'],
      title: row.title,
      description: row.description || '',
      submittedAt: row.submitted_at,
      completedAt: row.completed_at || undefined,
      processingTime: row.processing_time || undefined,
      assignedTo: row.assigned_to || undefined,
      notes: row.notes || undefined,
    })),
    error: null,
  }
}

export async function getClientRequests(clientId: string): Promise<{ data: AdminClientRequest[]; error: string | null }> {
  return getAllClientRequests({ clientId })
}

export async function updateRequestStatus(
  id: string,
  status: AdminClientRequest['status'],
  notes?: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()

  const updates: Record<string, unknown> = { status }
  if (notes) updates.notes = notes
  if (status === 'completed' || status === 'rejected') {
    updates.completed_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('client_requests')
    .update(updates)
    .eq('id', id)

  return { success: !error, error: error?.message || null }
}

// =============================================================================
// CSM: WEEKLY REPORTS (Engine I - The Informant)
// =============================================================================

export async function getAllWeeklyReports(filters?: {
  clientId?: string
  limit?: number
}): Promise<{ data: AdminWeeklyReport[]; error: string | null }> {
  const supabase = await createClient()

  let query = supabase
    .from('weekly_reports')
    .select('*, clients!inner(company_name)')
    .order('generated_at', { ascending: false })

  if (filters?.clientId) query = query.eq('client_id', filters.clientId)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data, error } = await query

  if (error) return { data: [], error: error.message }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      clientId: row.client_id,
      clientName: row.clients?.company_name || 'Unknown',
      periodStart: row.period_start,
      periodEnd: row.period_end,
      generatedAt: row.generated_at,
      metrics: {
        meetingsBooked: row.meetings_booked ?? 0,
        emailsSent: row.emails_sent ?? 0,
        openRate: row.open_rate ?? 0,
        replyRate: row.reply_rate ?? 0,
        positiveReplies: row.positive_replies ?? 0,
      },
      vsLastWeek: {
        meetings: row.vs_last_week_meetings ?? 0,
        replyRate: row.vs_last_week_reply_rate ?? 0,
        openRate: row.vs_last_week_open_rate ?? 0,
      },
      aiSummary: row.ai_summary || '',
      keyWins: Array.isArray(row.key_wins) ? row.key_wins : [],
      recommendations: Array.isArray(row.recommendations) ? row.recommendations : [],
      pdfUrl: row.pdf_url || undefined,
    })),
    error: null,
  }
}

export async function getClientReports(clientId: string): Promise<{ data: AdminWeeklyReport[]; error: string | null }> {
  return getAllWeeklyReports({ clientId })
}

// =============================================================================
// CSM: ONBOARDING (Engine L - The Launcher)
// =============================================================================

export async function getOnboardingClients(): Promise<{ data: AdminOnboardingClient[]; error: string | null }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('status', 'onboarding')
    .order('onboarding_started_at', { ascending: true })

  if (error) return { data: [], error: error.message }

  return {
    data: (data || []).map(row => {
      const startDate = row.onboarding_started_at ? new Date(row.onboarding_started_at) : new Date(row.created_at)
      const daysIn = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      return {
        id: row.id,
        companyName: row.company_name,
        contactName: row.contact_name,
        contactEmail: row.contact_email,
        plan: row.plan as AdminOnboardingClient['plan'],
        onboardingStartedAt: row.onboarding_started_at || row.created_at,
        daysInOnboarding: daysIn,
      }
    }),
    error: null,
  }
}

export async function activateClient(clientId: string): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('clients')
    .update({ status: 'active', activated_at: new Date().toISOString() })
    .eq('id', clientId)

  return { success: !error, error: error?.message || null }
}

// =============================================================================
// CSM: ISSUES (Engine J - The Judge)
// =============================================================================

export async function getAllIssues(filters?: {
  severity?: string
  clientId?: string
  resolved?: boolean
}): Promise<{ data: AdminIssue[]; error: string | null }> {
  const supabase = await createClient()

  let query = supabase
    .from('domain_issues')
    .select('*, domains!inner(client_id, domain, clients!inner(company_name))')
    .order('detected_at', { ascending: false })

  if (filters?.severity) query = query.eq('severity', filters.severity)
  if (filters?.clientId) query = query.eq('domains.client_id', filters.clientId)
  if (filters?.resolved === true) query = query.not('resolved_at', 'is', null)
  if (filters?.resolved === false) query = query.is('resolved_at', null)

  const { data, error } = await query

  if (error) return { data: [], error: error.message }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      clientId: row.domains?.client_id || '',
      clientName: row.domains?.clients?.company_name || 'Unknown',
      domainId: row.domain_id || undefined,
      domain: row.domains?.domain || undefined,
      severity: (row.severity || 'info') as AdminIssue['severity'],
      type: row.type || 'unknown',
      message: row.message || '',
      detectedAt: row.detected_at,
      resolvedAt: row.resolved_at || undefined,
      autoFixed: row.auto_fixed ?? false,
    })),
    error: null,
  }
}

// =============================================================================
// CSM: AGGREGATED METRICS
// =============================================================================

export async function getAdminCsmMetrics(): Promise<{ data: AdminCsmMetrics; error: string | null }> {
  const supabase = await createClient()

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [requestsRes, issuesRes, onboardingRes, reportsRes, healthRes] = await Promise.all([
    supabase.from('client_requests').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('domain_issues').select('id, severity', { count: 'exact' }).is('resolved_at', null),
    supabase.from('clients').select('id', { count: 'exact', head: true }).eq('status', 'onboarding'),
    supabase.from('weekly_reports').select('id', { count: 'exact', head: true }).gte('generated_at', oneWeekAgo),
    supabase.from('health_scores').select('overall_score, trend'),
  ])

  const issues = issuesRes.data || []
  const healthData = healthRes.data || []

  return {
    data: {
      pendingRequests: requestsRes.count ?? 0,
      activeIssues: issuesRes.count ?? issues.length,
      onboardingClients: onboardingRes.count ?? 0,
      reportsThisWeek: reportsRes.count ?? 0,
      decliningClients: healthData.filter(h => h.trend === 'declining').length,
      criticalIssues: issues.filter(i => i.severity === 'critical').length,
    },
    error: null,
  }
}
