// Admin portal types

export interface AdminClient {
  id: string
  clientId: string
  companyName: string
  contactName: string
  contactEmail: string
  phone?: string
  plan: 'founding_partner' | 'scale' | 'enterprise'
  status: 'onboarding' | 'active' | 'paused' | 'churned'
  mrr: number
  healthScore: number
  onboardingStartedAt?: string
  activatedAt?: string
  createdAt: string
}

export interface AdminMetrics {
  activeClients: number
  totalMrr: number
  enginesRunning: number
  meetingsThisWeek: number
  clientsOnboarding: number
  clientsAtRisk: number
}

export interface EngineRun {
  id: string
  engineSlug: string
  engineName: string
  clientId?: string
  clientName?: string
  status: 'running' | 'completed' | 'failed' | 'queued'
  startedAt: string
  completedAt?: string
  durationMs?: number
  inputSummary?: string
  outputSummary?: string
  errorMessage?: string
}

export interface AdminActivity {
  id: string
  adminName: string
  action: string
  resourceType: 'client' | 'engine' | 'settings' | 'campaign'
  resourceId?: string
  resourceName?: string
  details?: string
  timestamp: string
}

// =============================================================================
// CSM Engine Types (Engines I-N)
// =============================================================================

export interface AdminRiskSignal {
  signal: string
  severity: 'high' | 'medium' | 'low'
  description: string
}

export interface AdminHealthOverview {
  clientId: string
  clientName: string
  overall: number
  status: 'healthy' | 'warning' | 'critical'
  trend: 'improving' | 'stable' | 'declining'
  riskSignals: AdminRiskSignal[]
  domainHealth: number
  replyQuality: number
  engagementLevel: number
  meetingConversion: number
  lastUpdatedAt: string
}

export interface AdminClientRequest {
  id: string
  clientId: string
  clientName: string
  type: 'icp_update' | 'campaign_pause' | 'campaign_resume' | 'add_leads' | 'domain_request' | 'copy_change' | 'schedule_call' | 'report_download' | 'calendar_update' | 'other'
  category: 'instant' | 'review' | 'complex'
  status: 'pending' | 'in_progress' | 'completed' | 'rejected'
  title: string
  description: string
  submittedAt: string
  completedAt?: string
  processingTime?: number
  assignedTo?: string
  notes?: string
}

export interface AdminWeeklyReport {
  id: string
  clientId: string
  clientName: string
  periodStart: string
  periodEnd: string
  generatedAt: string
  metrics: {
    meetingsBooked: number
    emailsSent: number
    openRate: number
    replyRate: number
    positiveReplies: number
  }
  vsLastWeek: {
    meetings: number
    replyRate: number
    openRate: number
  }
  aiSummary: string
  keyWins: string[]
  recommendations: string[]
  pdfUrl?: string
}

export interface AdminOnboardingClient {
  id: string
  companyName: string
  contactName: string
  contactEmail: string
  plan: 'founding_partner' | 'scale' | 'enterprise'
  onboardingStartedAt: string
  daysInOnboarding: number
}

export interface AdminIssue {
  id: string
  clientId: string
  clientName: string
  domainId?: string
  domain?: string
  severity: 'critical' | 'warning' | 'info'
  type: string
  message: string
  detectedAt: string
  resolvedAt?: string
  autoFixed: boolean
}

export interface AdminCsmMetrics {
  pendingRequests: number
  activeIssues: number
  onboardingClients: number
  reportsThisWeek: number
  decliningClients: number
  criticalIssues: number
}
