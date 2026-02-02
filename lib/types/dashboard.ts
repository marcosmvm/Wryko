// Dashboard data types for Client Portal

export interface DashboardMetrics {
  meetingsBooked: number
  meetingsThisWeek: number
  meetingsThisMonth: number
  meetingsTarget: number
  meetingsTrend: number

  totalSent: number
  totalOpened: number
  openRate: number
  openRateTrend: number
  totalReplied: number
  replyRate: number
  replyRateTrend: number
  positiveReplies: number

  vsLastWeek: {
    meetings: number
    replyRate: number
    openRate: number
  }
}

export interface WeeklyTrendData {
  week: string
  weekLabel: string
  meetingsBooked: number
  emailsSent: number
  openRate: number
  replyRate: number
  positiveReplies: number
}

export interface Meeting {
  id: string
  contactName: string
  contactTitle: string
  contactEmail?: string
  companyName: string
  companySize?: string
  industry?: string
  scheduledAt: string
  status: 'scheduled' | 'completed' | 'no_show' | 'rescheduled' | 'cancelled'
  campaignId: string
  campaignName: string
  meetingType: 'discovery' | 'demo' | 'followup'
  notes?: string
  outcome?: 'opportunity' | 'not_qualified' | 'pending'
  calendarLink?: string
}

export interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed' | 'draft'
  startDate: string
  target: string

  sent: number
  dailySend: number
  domains: number
  sequences: number

  opened: number
  openRate: number
  replied: number
  replyRate: number
  meetings: number

  positiveReplies: number
  neutralReplies: number
  negativeReplies: number

  sequencePerformance?: SequenceEmail[]
  activeTests?: ABTest[]
  optimizationRecommendations?: OptimizationRecommendation[]
}

export interface SequenceEmail {
  emailNumber: number
  subject: string
  sent: number
  opened: number
  openRate: number
  replied: number
  replyRate: number
}

export interface ABTest {
  id: string
  campaignId: string
  variable: 'subject_line' | 'opening_line' | 'cta' | 'send_time'
  variantA: string
  variantB: string
  status: 'running' | 'completed' | 'paused'
  startedAt: string
  completedAt?: string
  results?: {
    variantASent: number
    variantAOpens: number
    variantAOpenRate: number
    variantAReplies: number
    variantAReplyRate: number
    variantBSent: number
    variantBOpens: number
    variantBOpenRate: number
    variantBReplies: number
    variantBReplyRate: number
    winner?: 'A' | 'B' | 'tie'
    confidence: number
    lift?: number
  }
}

export interface OptimizationRecommendation {
  id: string
  type: 'subject_line' | 'copy' | 'targeting' | 'timing' | 'volume'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  expectedImpact: string
  status: 'pending' | 'approved' | 'implemented' | 'rejected'
}

export interface DomainHealth {
  id: string
  domain: string
  status: 'healthy' | 'warning' | 'critical'
  healthScore: number

  spfStatus: 'pass' | 'fail' | 'warning'
  dkimStatus: 'pass' | 'fail' | 'warning'
  dmarcStatus: 'pass' | 'fail' | 'warning'

  blacklisted: boolean
  blacklistDetails?: string[]

  bounceRate: number
  deliverabilityRate: number
  spamComplaintRate: number

  dailyVolume: number
  totalSent: number

  lastCheckedAt: string
  issues: DomainIssue[]
}

export interface DomainIssue {
  id: string
  severity: 'critical' | 'warning' | 'info'
  type: string
  message: string
  detectedAt: string
  resolvedAt?: string
  autoFixed: boolean
}

export interface WebsiteVisitor {
  id: string
  companyName: string
  companyDomain: string
  companySize?: string
  industry?: string
  location?: string

  firstVisitAt: string
  lastVisitAt: string
  totalVisits: number
  pagesViewed: string[]
  timeOnSite: number

  intentScore: 'high' | 'medium' | 'low'
  intentSignals: string[]

  contacts?: VisitorContact[]

  status: 'new' | 'pushed_to_campaign' | 'ignored'
  campaignId?: string
}

export interface VisitorContact {
  name: string
  title: string
  email?: string
  linkedIn?: string
}

export interface ClientRequest {
  id: string
  type: 'icp_update' | 'campaign_pause' | 'campaign_resume' | 'add_leads' |
        'domain_request' | 'copy_change' | 'schedule_call' | 'report_download' |
        'calendar_update' | 'other'
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

export interface EngineActivityItem {
  id: string
  engineCode: string
  engineName: string
  status: 'running' | 'completed' | 'failed' | 'scheduled'
  startedAt: string
  completedAt?: string
  summary: string
  details?: string
  impact?: string
  affectedCampaigns?: string[]
}

export interface WeeklyReport {
  id: string
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

export interface HealthScore {
  overall: number
  status: 'healthy' | 'warning' | 'critical'

  domainHealth: number
  replyQuality: number
  engagementLevel: number
  meetingConversion: number

  riskSignals: RiskSignal[]

  trend: 'improving' | 'stable' | 'declining'
  lastUpdatedAt: string
}

export interface RiskSignal {
  signal: string
  severity: 'high' | 'medium' | 'low'
  description: string
}

export interface ActivityItem {
  id: string
  type: 'meeting' | 'reply' | 'report' | 'campaign' | 'alert' | 'engine' | 'request'
  icon?: string
  message: string
  timestamp: string
  link?: string
  metadata?: Record<string, unknown>
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Member' | 'Viewer'
  avatar?: string
  status: 'active' | 'pending' | 'inactive'
}
