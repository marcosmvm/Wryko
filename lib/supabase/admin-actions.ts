'use server'

import { createClient } from '@/lib/supabase/server'
import type { AdminMetrics, EngineRun, AdminActivity } from '@/lib/types/admin'
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
