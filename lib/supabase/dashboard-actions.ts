'use server'

import { createClient } from '@/lib/supabase/server'
import type {
  DashboardMetrics,
  WeeklyTrendData,
  Meeting,
  Campaign,
  SequenceEmail,
  ABTest,
  OptimizationRecommendation,
  DomainHealth,
  DomainIssue,
  WebsiteVisitor,
  VisitorContact,
  ClientRequest,
  EngineActivityItem,
  WeeklyReport,
  HealthScore,
  TeamMember,
} from '@/lib/types/dashboard'

// =============================================================================
// CLIENT ID RESOLUTION
// =============================================================================

export async function getMyClientId(): Promise<{ clientId: string | null; error: string | null }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { clientId: null, error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('user_client_map')
    .select('client_id')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  if (error) {
    return { clientId: null, error: error.message }
  }

  if (!data) {
    return { clientId: null, error: 'No client mapping found for this user' }
  }

  return { clientId: data.client_id, error: null }
}

// =============================================================================
// DASHBOARD METRICS
// =============================================================================

export async function getDashboardMetrics(): Promise<{ data: DashboardMetrics | null; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: null, error: clientError || 'No client found' }
  }

  const { data, error } = await supabase
    .from('dashboard_metrics')
    .select('*')
    .eq('client_id', clientId)
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  if (!data) {
    return { data: null, error: null }
  }

  const vsLastWeek = (data.vs_last_week as Record<string, number>) || {}

  return {
    data: {
      meetingsBooked: data.meetings_booked,
      meetingsThisWeek: data.meetings_this_week,
      meetingsThisMonth: data.meetings_this_month,
      meetingsTarget: data.meetings_target,
      meetingsTrend: Number(data.meetings_trend),
      totalSent: data.total_sent,
      totalOpened: data.total_opened,
      openRate: Number(data.open_rate),
      openRateTrend: Number(data.open_rate_trend),
      totalReplied: data.total_replied,
      replyRate: Number(data.reply_rate),
      replyRateTrend: Number(data.reply_rate_trend),
      positiveReplies: data.positive_replies,
      vsLastWeek: {
        meetings: vsLastWeek.meetings || 0,
        replyRate: vsLastWeek.replyRate || 0,
        openRate: vsLastWeek.openRate || 0,
      },
    },
    error: null,
  }
}

// =============================================================================
// WEEKLY TRENDS
// =============================================================================

export async function getWeeklyTrends(): Promise<{ data: WeeklyTrendData[]; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: [], error: clientError || 'No client found' }
  }

  const { data, error } = await supabase
    .from('weekly_trends')
    .select('*')
    .eq('client_id', clientId)
    .order('week', { ascending: true })

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => ({
      week: row.week,
      weekLabel: row.week_label || '',
      meetingsBooked: row.meetings_booked,
      emailsSent: row.emails_sent,
      openRate: Number(row.open_rate),
      replyRate: Number(row.reply_rate),
      positiveReplies: row.positive_replies,
    })),
    error: null,
  }
}

// =============================================================================
// HEALTH SCORE
// =============================================================================

export async function getHealthScore(): Promise<{ data: HealthScore | null; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: null, error: clientError || 'No client found' }
  }

  const { data, error } = await supabase
    .from('health_scores')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  if (!data) {
    return { data: null, error: null }
  }

  return {
    data: {
      overall: data.overall,
      status: data.status as HealthScore['status'],
      domainHealth: data.domain_health,
      replyQuality: data.reply_quality,
      engagementLevel: data.engagement_level,
      meetingConversion: data.meeting_conversion,
      riskSignals: (data.risk_signals as HealthScore['riskSignals']) || [],
      trend: data.trend as HealthScore['trend'],
      lastUpdatedAt: data.last_updated_at,
    },
    error: null,
  }
}

// =============================================================================
// MEETINGS
// =============================================================================

export async function getMeetings(filters?: {
  status?: string
}): Promise<{ data: Meeting[]; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: [], error: clientError || 'No client found' }
  }

  let query = supabase
    .from('meetings')
    .select('*')
    .eq('client_id', clientId)
    .order('scheduled_at', { ascending: false })

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  const { data, error } = await query

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      contactName: row.contact_name,
      contactTitle: row.contact_title || '',
      contactEmail: row.contact_email || undefined,
      companyName: row.company_name,
      companySize: row.company_size || undefined,
      industry: row.industry || undefined,
      scheduledAt: row.scheduled_at,
      status: row.status as Meeting['status'],
      campaignId: row.campaign_id || '',
      campaignName: row.campaign_name || '',
      meetingType: (row.meeting_type || 'discovery') as Meeting['meetingType'],
      notes: row.notes || undefined,
      outcome: row.outcome as Meeting['outcome'] || undefined,
      calendarLink: row.calendar_link || undefined,
    })),
    error: null,
  }
}

export async function getUpcomingMeetings(): Promise<{ data: Meeting[]; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: [], error: clientError || 'No client found' }
  }

  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .eq('client_id', clientId)
    .eq('status', 'scheduled')
    .order('scheduled_at', { ascending: true })

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      contactName: row.contact_name,
      contactTitle: row.contact_title || '',
      contactEmail: row.contact_email || undefined,
      companyName: row.company_name,
      companySize: row.company_size || undefined,
      industry: row.industry || undefined,
      scheduledAt: row.scheduled_at,
      status: 'scheduled' as const,
      campaignId: row.campaign_id || '',
      campaignName: row.campaign_name || '',
      meetingType: (row.meeting_type || 'discovery') as Meeting['meetingType'],
      notes: row.notes || undefined,
      outcome: row.outcome as Meeting['outcome'] || undefined,
      calendarLink: row.calendar_link || undefined,
    })),
    error: null,
  }
}

export async function getMeetingById(meetingId: string): Promise<{ data: Meeting | null; error: string | null }> {
  const supabase = await createClient()

  const { data: meeting, error } = await supabase
    .from('meetings')
    .select('*')
    .eq('id', meetingId)
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  if (!meeting) {
    return { data: null, error: 'Meeting not found' }
  }

  return {
    data: {
      id: meeting.id,
      contactName: meeting.contact_name,
      contactTitle: meeting.contact_title || '',
      contactEmail: meeting.contact_email || undefined,
      companyName: meeting.company_name,
      companySize: meeting.company_size || undefined,
      industry: meeting.industry || undefined,
      scheduledAt: meeting.scheduled_at,
      status: meeting.status as Meeting['status'],
      campaignId: meeting.campaign_id || '',
      campaignName: meeting.campaign_name || '',
      meetingType: (meeting.meeting_type || 'discovery') as Meeting['meetingType'],
      notes: meeting.notes || undefined,
      outcome: meeting.outcome as Meeting['outcome'] || undefined,
      calendarLink: meeting.calendar_link || undefined,
    },
    error: null,
  }
}

// =============================================================================
// CAMPAIGNS
// =============================================================================

export async function getCampaigns(filters?: {
  status?: string
}): Promise<{ data: Campaign[]; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: [], error: clientError || 'No client found' }
  }

  let query = supabase
    .from('campaigns')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  const { data, error } = await query

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      name: row.name,
      status: row.status as Campaign['status'],
      startDate: row.start_date || '',
      target: row.target || '',
      sent: row.sent,
      dailySend: row.daily_send,
      domains: row.domains,
      sequences: row.sequences,
      opened: row.opened,
      openRate: Number(row.open_rate),
      replied: row.replied,
      replyRate: Number(row.reply_rate),
      meetings: row.meetings,
      positiveReplies: row.positive_replies,
      neutralReplies: row.neutral_replies,
      negativeReplies: row.negative_replies,
    })),
    error: null,
  }
}

export async function getCampaignById(campaignId: string): Promise<{ data: Campaign | null; error: string | null }> {
  const supabase = await createClient()

  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', campaignId)
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  if (!campaign) {
    return { data: null, error: 'Campaign not found' }
  }

  // Fetch related data in parallel
  const [sequencesResult, testsResult, recsResult] = await Promise.all([
    supabase
      .from('campaign_sequences')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('email_number', { ascending: true }),
    supabase
      .from('ab_tests')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false }),
    supabase
      .from('optimization_recommendations')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false }),
  ])

  const sequencePerformance: SequenceEmail[] = (sequencesResult.data || []).map(s => ({
    emailNumber: s.email_number,
    subject: s.subject || '',
    sent: s.sent,
    opened: s.opened,
    openRate: Number(s.open_rate),
    replied: s.replied,
    replyRate: Number(s.reply_rate),
  }))

  const activeTests: ABTest[] = (testsResult.data || []).map(t => ({
    id: t.id,
    campaignId: t.campaign_id,
    variable: t.variable as ABTest['variable'],
    variantA: t.variant_a,
    variantB: t.variant_b,
    status: t.status as ABTest['status'],
    startedAt: t.started_at,
    completedAt: t.completed_at || undefined,
    results: t.results as ABTest['results'] || undefined,
  }))

  const optimizationRecommendations: OptimizationRecommendation[] = (recsResult.data || []).map(r => ({
    id: r.id,
    type: r.type as OptimizationRecommendation['type'],
    priority: r.priority as OptimizationRecommendation['priority'],
    title: r.title,
    description: r.description || '',
    expectedImpact: r.expected_impact || '',
    status: r.status as OptimizationRecommendation['status'],
  }))

  return {
    data: {
      id: campaign.id,
      name: campaign.name,
      status: campaign.status as Campaign['status'],
      startDate: campaign.start_date || '',
      target: campaign.target || '',
      sent: campaign.sent,
      dailySend: campaign.daily_send,
      domains: campaign.domains,
      sequences: campaign.sequences,
      opened: campaign.opened,
      openRate: Number(campaign.open_rate),
      replied: campaign.replied,
      replyRate: Number(campaign.reply_rate),
      meetings: campaign.meetings,
      positiveReplies: campaign.positive_replies,
      neutralReplies: campaign.neutral_replies,
      negativeReplies: campaign.negative_replies,
      sequencePerformance: sequencePerformance.length > 0 ? sequencePerformance : undefined,
      activeTests: activeTests.length > 0 ? activeTests : undefined,
      optimizationRecommendations: optimizationRecommendations.length > 0 ? optimizationRecommendations : undefined,
    },
    error: null,
  }
}

// =============================================================================
// DOMAINS
// =============================================================================

export async function getDomains(): Promise<{ data: DomainHealth[]; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: [], error: clientError || 'No client found' }
  }

  const { data: domains, error } = await supabase
    .from('domains')
    .select('*')
    .eq('client_id', clientId)
    .order('domain', { ascending: true })

  if (error) {
    return { data: [], error: error.message }
  }

  if (!domains || domains.length === 0) {
    return { data: [], error: null }
  }

  // Fetch issues for all domains
  const domainIds = domains.map(d => d.id)
  const { data: allIssues } = await supabase
    .from('domain_issues')
    .select('*')
    .in('domain_id', domainIds)
    .order('detected_at', { ascending: false })

  const issuesByDomain = new Map<string, DomainIssue[]>()
  for (const issue of allIssues || []) {
    const list = issuesByDomain.get(issue.domain_id) || []
    list.push({
      id: issue.id,
      severity: issue.severity as DomainIssue['severity'],
      type: issue.type,
      message: issue.message,
      detectedAt: issue.detected_at,
      resolvedAt: issue.resolved_at || undefined,
      autoFixed: issue.auto_fixed,
    })
    issuesByDomain.set(issue.domain_id, list)
  }

  return {
    data: domains.map(d => ({
      id: d.id,
      domain: d.domain,
      status: d.status as DomainHealth['status'],
      healthScore: d.health_score,
      spfStatus: d.spf_status as DomainHealth['spfStatus'],
      dkimStatus: d.dkim_status as DomainHealth['dkimStatus'],
      dmarcStatus: d.dmarc_status as DomainHealth['dmarcStatus'],
      blacklisted: d.blacklisted,
      blacklistDetails: d.blacklist_details || undefined,
      bounceRate: Number(d.bounce_rate),
      deliverabilityRate: Number(d.deliverability_rate),
      spamComplaintRate: Number(d.spam_complaint_rate),
      dailyVolume: d.daily_volume,
      totalSent: d.total_sent,
      lastCheckedAt: d.last_checked_at,
      issues: issuesByDomain.get(d.id) || [],
    })),
    error: null,
  }
}

export async function getDomainById(domainId: string): Promise<{ data: DomainHealth | null; error: string | null }> {
  const supabase = await createClient()

  const { data: domain, error } = await supabase
    .from('domains')
    .select('*')
    .eq('id', domainId)
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  if (!domain) {
    return { data: null, error: 'Domain not found' }
  }

  const { data: issues } = await supabase
    .from('domain_issues')
    .select('*')
    .eq('domain_id', domainId)
    .order('detected_at', { ascending: false })

  const mappedIssues: DomainIssue[] = (issues || []).map(issue => ({
    id: issue.id,
    severity: issue.severity as DomainIssue['severity'],
    type: issue.type,
    message: issue.message,
    detectedAt: issue.detected_at,
    resolvedAt: issue.resolved_at || undefined,
    autoFixed: issue.auto_fixed,
  }))

  return {
    data: {
      id: domain.id,
      domain: domain.domain,
      status: domain.status as DomainHealth['status'],
      healthScore: domain.health_score,
      spfStatus: domain.spf_status as DomainHealth['spfStatus'],
      dkimStatus: domain.dkim_status as DomainHealth['dkimStatus'],
      dmarcStatus: domain.dmarc_status as DomainHealth['dmarcStatus'],
      blacklisted: domain.blacklisted,
      blacklistDetails: domain.blacklist_details || undefined,
      bounceRate: Number(domain.bounce_rate),
      deliverabilityRate: Number(domain.deliverability_rate),
      spamComplaintRate: Number(domain.spam_complaint_rate),
      dailyVolume: domain.daily_volume,
      totalSent: domain.total_sent,
      lastCheckedAt: domain.last_checked_at,
      issues: mappedIssues,
    },
    error: null,
  }
}

// =============================================================================
// WEBSITE VISITORS
// =============================================================================

export async function getVisitors(filters?: {
  intentScore?: string
}): Promise<{ data: WebsiteVisitor[]; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: [], error: clientError || 'No client found' }
  }

  let query = supabase
    .from('website_visitors')
    .select('*')
    .eq('client_id', clientId)
    .order('last_visit_at', { ascending: false })

  if (filters?.intentScore && filters.intentScore !== 'all') {
    query = query.eq('intent_score', filters.intentScore)
  }

  const { data: visitors, error } = await query

  if (error) {
    return { data: [], error: error.message }
  }

  if (!visitors || visitors.length === 0) {
    return { data: [], error: null }
  }

  // Fetch contacts for all visitors
  const visitorIds = visitors.map(v => v.id)
  const { data: allContacts } = await supabase
    .from('visitor_contacts')
    .select('*')
    .in('visitor_id', visitorIds)

  const contactsByVisitor = new Map<string, VisitorContact[]>()
  for (const c of allContacts || []) {
    const list = contactsByVisitor.get(c.visitor_id) || []
    list.push({
      name: c.name,
      title: c.title || '',
      email: c.email || undefined,
      linkedIn: c.linkedin || undefined,
    })
    contactsByVisitor.set(c.visitor_id, list)
  }

  return {
    data: visitors.map(v => ({
      id: v.id,
      companyName: v.company_name,
      companyDomain: v.company_domain || '',
      companySize: v.company_size || undefined,
      industry: v.industry || undefined,
      location: v.location || undefined,
      firstVisitAt: v.first_visit_at || '',
      lastVisitAt: v.last_visit_at || '',
      totalVisits: v.total_visits,
      pagesViewed: v.pages_viewed || [],
      timeOnSite: v.time_on_site,
      intentScore: v.intent_score as WebsiteVisitor['intentScore'],
      intentSignals: v.intent_signals || [],
      contacts: contactsByVisitor.get(v.id),
      status: v.status as WebsiteVisitor['status'],
      campaignId: v.campaign_id || undefined,
    })),
    error: null,
  }
}

// =============================================================================
// CLIENT REQUESTS
// =============================================================================

export async function getRequests(filters?: {
  status?: string
}): Promise<{ data: ClientRequest[]; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: [], error: clientError || 'No client found' }
  }

  let query = supabase
    .from('client_requests')
    .select('*')
    .eq('client_id', clientId)
    .order('submitted_at', { ascending: false })

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  const { data, error } = await query

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      type: row.type as ClientRequest['type'],
      category: row.category as ClientRequest['category'],
      status: row.status as ClientRequest['status'],
      title: row.title,
      description: row.description || '',
      submittedAt: row.submitted_at,
      completedAt: row.completed_at || undefined,
      processingTime: row.processing_time ? Number(row.processing_time) : undefined,
      assignedTo: row.assigned_to || undefined,
      notes: row.notes || undefined,
    })),
    error: null,
  }
}

export async function createRequest(data: {
  type: string
  category: string
  title: string
  description: string
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { success: false, error: clientError || 'No client found' }
  }

  const { error } = await supabase.from('client_requests').insert({
    client_id: clientId,
    type: data.type,
    category: data.category,
    title: data.title,
    description: data.description,
    status: 'pending',
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

// =============================================================================
// ENGINE ACTIVITY
// =============================================================================

export async function getEngineActivity(): Promise<{ data: EngineActivityItem[]; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: [], error: clientError || 'No client found' }
  }

  const { data, error } = await supabase
    .from('engine_activity')
    .select('*')
    .eq('client_id', clientId)
    .order('started_at', { ascending: false })
    .limit(10)

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      engineCode: row.engine_code,
      engineName: row.engine_name,
      status: row.status as EngineActivityItem['status'],
      startedAt: row.started_at,
      completedAt: row.completed_at || undefined,
      summary: row.summary || '',
      details: row.details || undefined,
      impact: row.impact || undefined,
      affectedCampaigns: row.affected_campaigns || undefined,
    })),
    error: null,
  }
}

// =============================================================================
// WEEKLY REPORTS
// =============================================================================

export async function getWeeklyReports(): Promise<{ data: WeeklyReport[]; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: [], error: clientError || 'No client found' }
  }

  const { data, error } = await supabase
    .from('weekly_reports')
    .select('*')
    .eq('client_id', clientId)
    .order('period_end', { ascending: false })

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => {
      const metrics = (row.metrics as Record<string, number>) || {}
      const vsLastWeek = (row.vs_last_week as Record<string, number>) || {}

      return {
        id: row.id,
        periodStart: row.period_start,
        periodEnd: row.period_end,
        generatedAt: row.generated_at,
        metrics: {
          meetingsBooked: metrics.meetingsBooked || 0,
          emailsSent: metrics.emailsSent || 0,
          openRate: metrics.openRate || 0,
          replyRate: metrics.replyRate || 0,
          positiveReplies: metrics.positiveReplies || 0,
        },
        vsLastWeek: {
          meetings: vsLastWeek.meetings || 0,
          replyRate: vsLastWeek.replyRate || 0,
          openRate: vsLastWeek.openRate || 0,
        },
        aiSummary: row.ai_summary || '',
        keyWins: row.key_wins || [],
        recommendations: row.recommendations || [],
        pdfUrl: row.pdf_url || undefined,
      }
    }),
    error: null,
  }
}

export async function getWeeklyReportById(reportId: string): Promise<{ data: WeeklyReport | null; error: string | null }> {
  const supabase = await createClient()

  const { data: row, error } = await supabase
    .from('weekly_reports')
    .select('*')
    .eq('id', reportId)
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  if (!row) {
    return { data: null, error: 'Report not found' }
  }

  const metrics = (row.metrics as Record<string, number>) || {}
  const vsLastWeek = (row.vs_last_week as Record<string, number>) || {}

  return {
    data: {
      id: row.id,
      periodStart: row.period_start,
      periodEnd: row.period_end,
      generatedAt: row.generated_at,
      metrics: {
        meetingsBooked: metrics.meetingsBooked || 0,
        emailsSent: metrics.emailsSent || 0,
        openRate: metrics.openRate || 0,
        replyRate: metrics.replyRate || 0,
        positiveReplies: metrics.positiveReplies || 0,
      },
      vsLastWeek: {
        meetings: vsLastWeek.meetings || 0,
        replyRate: vsLastWeek.replyRate || 0,
        openRate: vsLastWeek.openRate || 0,
      },
      aiSummary: row.ai_summary || '',
      keyWins: row.key_wins || [],
      recommendations: row.recommendations || [],
      pdfUrl: row.pdf_url || undefined,
    },
    error: null,
  }
}

// =============================================================================
// TEAM MEMBERS
// =============================================================================

export async function getTeamMembers(): Promise<{ data: TeamMember[]; error: string | null }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { data: [], error: clientError || 'No client found' }
  }

  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: true })

  if (error) {
    return { data: [], error: error.message }
  }

  return {
    data: (data || []).map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role as TeamMember['role'],
      avatar: row.avatar || undefined,
      status: (row.status || 'active') as TeamMember['status'],
    })),
    error: null,
  }
}

export async function inviteTeamMember(email: string, role: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { clientId, error: clientError } = await getMyClientId()

  if (clientError || !clientId) {
    return { success: false, error: clientError || 'No client found' }
  }

  const { data: existing } = await supabase
    .from('team_members')
    .select('id')
    .eq('client_id', clientId)
    .eq('email', email)
    .limit(1)

  if (existing && existing.length > 0) {
    return { success: false, error: 'This email has already been invited' }
  }

  const { error } = await supabase.from('team_members').insert({
    client_id: clientId,
    name: email.split('@')[0],
    email,
    role,
    status: 'pending',
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function removeTeamMember(memberId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', memberId)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function updateTeamMemberRole(memberId: string, role: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('team_members')
    .update({ role })
    .eq('id', memberId)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
