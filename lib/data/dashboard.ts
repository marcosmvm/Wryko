// Dashboard data types - Enhanced for Professional Client Portal

// =============================================================================
// CORE TYPES
// =============================================================================

export interface DashboardMetrics {
  // Primary metric - MEETINGS (North Star)
  meetingsBooked: number
  meetingsThisWeek: number
  meetingsThisMonth: number
  meetingsTarget: number
  meetingsTrend: number // percentage change vs last period

  // Secondary metrics
  totalSent: number
  totalOpened: number
  openRate: number
  openRateTrend: number
  totalReplied: number
  replyRate: number
  replyRateTrend: number
  positiveReplies: number

  // Comparisons
  vsLastWeek: {
    meetings: number
    replyRate: number
    openRate: number
  }
}

export interface WeeklyTrendData {
  week: string // ISO date for week start
  weekLabel: string // "Week 1", "Jan 6-12"
  meetingsBooked: number
  emailsSent: number
  openRate: number
  replyRate: number
  positiveReplies: number
}

// =============================================================================
// MEETINGS
// =============================================================================

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

// =============================================================================
// CAMPAIGNS
// =============================================================================

export interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed' | 'draft'
  startDate: string
  target: string // ICP description

  // Volume
  sent: number
  dailySend: number
  domains: number
  sequences: number

  // Performance
  opened: number
  openRate: number
  replied: number
  replyRate: number
  meetings: number

  // Reply breakdown
  positiveReplies: number
  neutralReplies: number
  negativeReplies: number

  // Sequence performance
  sequencePerformance?: SequenceEmail[]

  // A/B Tests
  activeTests?: ABTest[]

  // Optimization
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

// =============================================================================
// DOMAIN HEALTH
// =============================================================================

export interface DomainHealth {
  id: string
  domain: string
  status: 'healthy' | 'warning' | 'critical'
  healthScore: number

  // Technical checks
  spfStatus: 'pass' | 'fail' | 'warning'
  dkimStatus: 'pass' | 'fail' | 'warning'
  dmarcStatus: 'pass' | 'fail' | 'warning'

  // Reputation
  blacklisted: boolean
  blacklistDetails?: string[]

  // Performance
  bounceRate: number
  deliverabilityRate: number
  spamComplaintRate: number

  // Volume
  dailyVolume: number
  totalSent: number

  // History
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

// =============================================================================
// WEBSITE VISITORS
// =============================================================================

export interface WebsiteVisitor {
  id: string
  companyName: string
  companyDomain: string
  companySize?: string
  industry?: string
  location?: string

  // Visit data
  firstVisitAt: string
  lastVisitAt: string
  totalVisits: number
  pagesViewed: string[]
  timeOnSite: number // minutes

  // Intent signals
  intentScore: 'high' | 'medium' | 'low'
  intentSignals: string[]

  // Contacts found
  contacts?: VisitorContact[]

  // Status
  status: 'new' | 'pushed_to_campaign' | 'ignored'
  campaignId?: string
}

export interface VisitorContact {
  name: string
  title: string
  email?: string
  linkedIn?: string
}

// =============================================================================
// CLIENT REQUESTS
// =============================================================================

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
  processingTime?: number // in minutes
  assignedTo?: string
  notes?: string
}

// =============================================================================
// ENGINE ACTIVITY
// =============================================================================

export interface EngineActivity {
  id: string
  engineCode: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N'
  engineName: string
  status: 'running' | 'completed' | 'failed' | 'scheduled'
  startedAt: string
  completedAt?: string
  summary: string
  details?: string
  impact?: string
  affectedCampaigns?: string[]
}

// =============================================================================
// WEEKLY REPORTS
// =============================================================================

export interface WeeklyReport {
  id: string
  periodStart: string
  periodEnd: string
  generatedAt: string

  // Metrics
  metrics: {
    meetingsBooked: number
    emailsSent: number
    openRate: number
    replyRate: number
    positiveReplies: number
  }

  // Comparisons
  vsLastWeek: {
    meetings: number // percentage change
    replyRate: number
    openRate: number
  }

  // AI Summary
  aiSummary: string
  keyWins: string[]
  recommendations: string[]

  // PDF URL
  pdfUrl?: string
}

// =============================================================================
// HEALTH SCORE
// =============================================================================

export interface HealthScore {
  overall: number
  status: 'healthy' | 'warning' | 'critical'

  // Component scores
  domainHealth: number
  replyQuality: number
  engagementLevel: number
  meetingConversion: number

  // Risk signals
  riskSignals: RiskSignal[]

  // Trend
  trend: 'improving' | 'stable' | 'declining'
  lastUpdatedAt: string
}

export interface RiskSignal {
  signal: string
  severity: 'high' | 'medium' | 'low'
  description: string
}

// =============================================================================
// ACTIVITY FEED
// =============================================================================

export interface ActivityItem {
  id: string
  type: 'meeting' | 'reply' | 'report' | 'campaign' | 'alert' | 'engine' | 'request'
  icon?: string
  message: string
  timestamp: string
  link?: string
  metadata?: Record<string, unknown>
}

// =============================================================================
// MOCK DATA
// =============================================================================

export const mockMetrics: DashboardMetrics = {
  meetingsBooked: 23,
  meetingsThisWeek: 5,
  meetingsThisMonth: 23,
  meetingsTarget: 30,
  meetingsTrend: 15,
  totalSent: 12450,
  totalOpened: 5268,
  openRate: 42.3,
  openRateTrend: 2.1,
  totalReplied: 1084,
  replyRate: 8.7,
  replyRateTrend: 0.4,
  positiveReplies: 650,
  vsLastWeek: {
    meetings: 25,
    replyRate: 5,
    openRate: 3,
  },
}

export const mockWeeklyTrends: WeeklyTrendData[] = [
  { week: '2025-11-04', weekLabel: 'Nov 4', meetingsBooked: 12, emailsSent: 2100, openRate: 38.2, replyRate: 6.8, positiveReplies: 86 },
  { week: '2025-11-11', weekLabel: 'Nov 11', meetingsBooked: 14, emailsSent: 2300, openRate: 39.1, replyRate: 7.2, positiveReplies: 99 },
  { week: '2025-11-18', weekLabel: 'Nov 18', meetingsBooked: 11, emailsSent: 2200, openRate: 38.8, replyRate: 6.9, positiveReplies: 91 },
  { week: '2025-11-25', weekLabel: 'Nov 25', meetingsBooked: 15, emailsSent: 2400, openRate: 40.2, replyRate: 7.5, positiveReplies: 108 },
  { week: '2025-12-02', weekLabel: 'Dec 2', meetingsBooked: 18, emailsSent: 2600, openRate: 41.0, replyRate: 7.9, positiveReplies: 123 },
  { week: '2025-12-09', weekLabel: 'Dec 9', meetingsBooked: 16, emailsSent: 2500, openRate: 40.5, replyRate: 7.6, positiveReplies: 114 },
  { week: '2025-12-16', weekLabel: 'Dec 16', meetingsBooked: 13, emailsSent: 2000, openRate: 39.8, replyRate: 7.3, positiveReplies: 88 },
  { week: '2025-12-23', weekLabel: 'Dec 23', meetingsBooked: 8, emailsSent: 1500, openRate: 38.5, replyRate: 6.5, positiveReplies: 59 },
  { week: '2025-12-30', weekLabel: 'Dec 30', meetingsBooked: 10, emailsSent: 1800, openRate: 39.2, replyRate: 7.0, positiveReplies: 76 },
  { week: '2026-01-06', weekLabel: 'Jan 6', meetingsBooked: 19, emailsSent: 2800, openRate: 41.5, replyRate: 8.2, positiveReplies: 138 },
  { week: '2026-01-13', weekLabel: 'Jan 13', meetingsBooked: 21, emailsSent: 2900, openRate: 42.0, replyRate: 8.5, positiveReplies: 148 },
  { week: '2026-01-20', weekLabel: 'Jan 20', meetingsBooked: 23, emailsSent: 3100, openRate: 42.3, replyRate: 8.7, positiveReplies: 162 },
]

export const mockMeetings: Meeting[] = [
  {
    id: 'meet-001',
    contactName: 'John Smith',
    contactTitle: 'VP of Sales',
    contactEmail: 'john.smith@acmecorp.com',
    companyName: 'Acme Corporation',
    companySize: '201-500',
    industry: 'Technology',
    scheduledAt: '2026-01-28T10:00:00Z',
    status: 'scheduled',
    campaignId: 'camp-001',
    campaignName: 'Campaign Alpha',
    meetingType: 'discovery',
  },
  {
    id: 'meet-002',
    contactName: 'Jane Doe',
    contactTitle: 'CTO',
    contactEmail: 'jane.doe@techco.io',
    companyName: 'TechCo',
    companySize: '51-200',
    industry: 'SaaS',
    scheduledAt: '2026-01-29T14:00:00Z',
    status: 'scheduled',
    campaignId: 'camp-002',
    campaignName: 'Campaign Beta',
    meetingType: 'demo',
  },
  {
    id: 'meet-003',
    contactName: 'Mike Johnson',
    contactTitle: 'CEO',
    contactEmail: 'mike@bigcorp.com',
    companyName: 'BigCorp',
    companySize: '501-1000',
    industry: 'Enterprise',
    scheduledAt: '2026-01-30T11:00:00Z',
    status: 'scheduled',
    campaignId: 'camp-001',
    campaignName: 'Campaign Alpha',
    meetingType: 'followup',
  },
  {
    id: 'meet-004',
    contactName: 'Sarah Lee',
    contactTitle: 'Director of Marketing',
    companyName: 'Venture AI',
    companySize: '51-200',
    industry: 'AI/ML',
    scheduledAt: '2026-01-25T15:00:00Z',
    status: 'completed',
    campaignId: 'camp-001',
    campaignName: 'Campaign Alpha',
    meetingType: 'discovery',
    outcome: 'opportunity',
  },
  {
    id: 'meet-005',
    contactName: 'Tom Brown',
    contactTitle: 'VP Engineering',
    companyName: 'DataFlow Inc',
    companySize: '201-500',
    industry: 'Data Analytics',
    scheduledAt: '2026-01-24T09:00:00Z',
    status: 'completed',
    campaignId: 'camp-002',
    campaignName: 'Campaign Beta',
    meetingType: 'demo',
    outcome: 'opportunity',
  },
  {
    id: 'meet-006',
    contactName: 'Amy Chen',
    contactTitle: 'CEO',
    companyName: 'CloudNine',
    companySize: '11-50',
    industry: 'Cloud',
    scheduledAt: '2026-01-22T13:00:00Z',
    status: 'no_show',
    campaignId: 'camp-001',
    campaignName: 'Campaign Alpha',
    meetingType: 'discovery',
  },
  {
    id: 'meet-007',
    contactName: 'David Park',
    contactTitle: 'Head of Growth',
    companyName: 'ScaleUp',
    companySize: '51-200',
    industry: 'SaaS',
    scheduledAt: '2026-01-21T16:00:00Z',
    status: 'completed',
    campaignId: 'camp-002',
    campaignName: 'Campaign Beta',
    meetingType: 'discovery',
    outcome: 'pending',
  },
  {
    id: 'meet-008',
    contactName: 'Lisa Wang',
    contactTitle: 'COO',
    companyName: 'Innovate Labs',
    companySize: '201-500',
    industry: 'Technology',
    scheduledAt: '2026-01-20T10:30:00Z',
    status: 'completed',
    campaignId: 'camp-001',
    campaignName: 'Campaign Alpha',
    meetingType: 'demo',
    outcome: 'opportunity',
  },
]

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Campaign Alpha',
    status: 'active',
    sent: 4200,
    opened: 1777,
    openRate: 42.3,
    replied: 387,
    replyRate: 9.2,
    meetings: 12,
    startDate: '2026-01-15',
    dailySend: 150,
    domains: 3,
    positiveReplies: 232,
    neutralReplies: 93,
    negativeReplies: 62,
    target: 'IT Directors at Tech Companies (50-500 employees)',
    sequences: 4,
    sequencePerformance: [
      { emailNumber: 1, subject: 'Quick question about [Company]\'s growth', sent: 4200, opened: 1890, openRate: 45.0, replied: 168, replyRate: 4.0 },
      { emailNumber: 2, subject: 'Following up on my note', sent: 3800, opened: 1444, openRate: 38.0, replied: 114, replyRate: 3.0 },
      { emailNumber: 3, subject: 'One more thought...', sent: 3400, opened: 1088, openRate: 32.0, replied: 68, replyRate: 2.0 },
      { emailNumber: 4, subject: 'Closing the loop', sent: 3000, opened: 840, openRate: 28.0, replied: 37, replyRate: 1.2 },
    ],
    activeTests: [
      {
        id: 'test-001',
        campaignId: 'camp-001',
        variable: 'subject_line',
        variantA: 'Quick question about growth',
        variantB: 'Saw your recent announcement',
        status: 'completed',
        startedAt: '2026-01-15',
        completedAt: '2026-01-22',
        results: {
          variantASent: 1000,
          variantAOpens: 450,
          variantAOpenRate: 45.0,
          variantAReplies: 42,
          variantAReplyRate: 4.2,
          variantBSent: 1000,
          variantBOpens: 380,
          variantBOpenRate: 38.0,
          variantBReplies: 31,
          variantBReplyRate: 3.1,
          winner: 'A',
          confidence: 94,
          lift: 18,
        },
      },
      {
        id: 'test-002',
        campaignId: 'camp-001',
        variable: 'opening_line',
        variantA: 'I noticed [Company] just expanded...',
        variantB: 'Congrats on the recent funding...',
        status: 'running',
        startedAt: '2026-01-23',
      },
    ],
    optimizationRecommendations: [
      {
        id: 'rec-001',
        type: 'subject_line',
        priority: 'high',
        title: 'Refresh subject lines',
        description: 'Open rates have declined 3% over the past week. Consider testing new subject line variations.',
        expectedImpact: '+5-8% open rate',
        status: 'pending',
      },
      {
        id: 'rec-002',
        type: 'timing',
        priority: 'medium',
        title: 'Adjust send time',
        description: 'Data shows higher engagement on Tuesday/Wednesday mornings. Consider shifting send schedule.',
        expectedImpact: '+2-3% reply rate',
        status: 'pending',
      },
    ],
  },
  {
    id: 'camp-002',
    name: 'Campaign Beta',
    status: 'active',
    sent: 3100,
    opened: 1200,
    openRate: 38.7,
    replied: 242,
    replyRate: 7.8,
    meetings: 8,
    startDate: '2026-01-18',
    dailySend: 120,
    domains: 3,
    positiveReplies: 145,
    neutralReplies: 58,
    negativeReplies: 39,
    target: 'SaaS Founders (Series A-B companies)',
    sequences: 3,
    sequencePerformance: [
      { emailNumber: 1, subject: 'Fellow founder here...', sent: 3100, opened: 1271, openRate: 41.0, replied: 124, replyRate: 4.0 },
      { emailNumber: 2, subject: 'Quick follow up', sent: 2800, opened: 980, openRate: 35.0, replied: 78, replyRate: 2.8 },
      { emailNumber: 3, subject: 'Last note from me', sent: 2500, opened: 750, openRate: 30.0, replied: 40, replyRate: 1.6 },
    ],
    activeTests: [
      {
        id: 'test-003',
        campaignId: 'camp-002',
        variable: 'cta',
        variantA: 'Open to a quick call?',
        variantB: 'Worth 15 minutes to explore?',
        status: 'running',
        startedAt: '2026-01-20',
      },
    ],
  },
  {
    id: 'camp-003',
    name: 'Q4 Outreach',
    status: 'paused',
    sent: 8500,
    opened: 3502,
    openRate: 41.2,
    replied: 689,
    replyRate: 8.1,
    meetings: 21,
    startDate: '2025-10-01',
    dailySend: 200,
    domains: 5,
    positiveReplies: 413,
    neutralReplies: 165,
    negativeReplies: 111,
    target: 'Enterprise (1000+ employees)',
    sequences: 5,
  },
  {
    id: 'camp-004',
    name: 'Winter Push',
    status: 'completed',
    sent: 12000,
    opened: 4776,
    openRate: 39.8,
    replied: 900,
    replyRate: 7.5,
    meetings: 28,
    startDate: '2025-12-01',
    dailySend: 300,
    domains: 5,
    positiveReplies: 540,
    neutralReplies: 216,
    negativeReplies: 144,
    target: 'Mid-market (100-500 employees)',
    sequences: 4,
  },
]

export const mockDomains: DomainHealth[] = [
  {
    id: 'dom-001',
    domain: 'send1.clientcompany.com',
    status: 'healthy',
    healthScore: 98,
    spfStatus: 'pass',
    dkimStatus: 'pass',
    dmarcStatus: 'pass',
    blacklisted: false,
    bounceRate: 0.3,
    deliverabilityRate: 99.2,
    spamComplaintRate: 0.01,
    dailyVolume: 150,
    totalSent: 4200,
    lastCheckedAt: '2026-01-27T08:00:00Z',
    issues: [],
  },
  {
    id: 'dom-002',
    domain: 'send2.clientcompany.com',
    status: 'healthy',
    healthScore: 94,
    spfStatus: 'pass',
    dkimStatus: 'pass',
    dmarcStatus: 'pass',
    blacklisted: false,
    bounceRate: 1.1,
    deliverabilityRate: 97.8,
    spamComplaintRate: 0.02,
    dailyVolume: 120,
    totalSent: 3100,
    lastCheckedAt: '2026-01-27T08:00:00Z',
    issues: [
      {
        id: 'issue-001',
        severity: 'warning',
        type: 'bounce_rate',
        message: 'Bounce rate slightly elevated (1.1%)',
        detectedAt: '2026-01-25T10:00:00Z',
        resolvedAt: '2026-01-26T14:00:00Z',
        autoFixed: true,
      },
    ],
  },
  {
    id: 'dom-003',
    domain: 'send3.clientcompany.com',
    status: 'warning',
    healthScore: 78,
    spfStatus: 'pass',
    dkimStatus: 'pass',
    dmarcStatus: 'warning',
    blacklisted: false,
    bounceRate: 2.8,
    deliverabilityRate: 94.2,
    spamComplaintRate: 0.04,
    dailyVolume: 100,
    totalSent: 2500,
    lastCheckedAt: '2026-01-27T08:00:00Z',
    issues: [
      {
        id: 'issue-002',
        severity: 'warning',
        type: 'dmarc',
        message: 'DMARC policy set to none - recommend upgrading to quarantine',
        detectedAt: '2026-01-26T08:00:00Z',
        autoFixed: false,
      },
      {
        id: 'issue-003',
        severity: 'warning',
        type: 'bounce_rate',
        message: 'Bounce rate approaching threshold (2.8%)',
        detectedAt: '2026-01-26T12:00:00Z',
        autoFixed: false,
      },
    ],
  },
]

export const mockVisitors: WebsiteVisitor[] = [
  {
    id: 'vis-001',
    companyName: 'TechVentures Inc',
    companyDomain: 'techventures.io',
    companySize: '51-200',
    industry: 'SaaS',
    location: 'San Francisco, CA',
    firstVisitAt: '2026-01-25T09:00:00Z',
    lastVisitAt: '2026-01-27T14:30:00Z',
    totalVisits: 5,
    pagesViewed: ['/', '/pricing', '/case-studies', '/about', '/how-it-works'],
    timeOnSite: 18,
    intentScore: 'high',
    intentSignals: ['Viewed pricing page', 'Read 2 case studies', 'Multiple visits'],
    contacts: [
      { name: 'Alex Thompson', title: 'CEO', linkedIn: 'linkedin.com/in/alexthompson' },
      { name: 'Maria Garcia', title: 'VP Sales', email: 'maria@techventures.io' },
    ],
    status: 'new',
  },
  {
    id: 'vis-002',
    companyName: 'DataPro Inc',
    companyDomain: 'datapro.com',
    companySize: '201-500',
    industry: 'Data Analytics',
    location: 'New York, NY',
    firstVisitAt: '2026-01-26T11:00:00Z',
    lastVisitAt: '2026-01-27T10:15:00Z',
    totalVisits: 3,
    pagesViewed: ['/', '/how-it-works', '/pricing'],
    timeOnSite: 12,
    intentScore: 'high',
    intentSignals: ['Viewed pricing page', 'Multiple page views', 'Return visitor'],
    contacts: [
      { name: 'James Wilson', title: 'Head of Growth', email: 'jwilson@datapro.com' },
    ],
    status: 'new',
  },
  {
    id: 'vis-003',
    companyName: 'CloudFirst',
    companyDomain: 'cloudfirst.co',
    companySize: '51-200',
    industry: 'Cloud Infrastructure',
    location: 'Austin, TX',
    firstVisitAt: '2026-01-27T08:00:00Z',
    lastVisitAt: '2026-01-27T08:15:00Z',
    totalVisits: 1,
    pagesViewed: ['/', '/about'],
    timeOnSite: 4,
    intentScore: 'medium',
    intentSignals: ['First-time visitor', 'Browsed about page'],
    status: 'new',
  },
  {
    id: 'vis-004',
    companyName: 'ScaleUp Solutions',
    companyDomain: 'scaleup.io',
    companySize: '11-50',
    industry: 'Consulting',
    location: 'Boston, MA',
    firstVisitAt: '2026-01-24T15:00:00Z',
    lastVisitAt: '2026-01-26T09:00:00Z',
    totalVisits: 4,
    pagesViewed: ['/', '/pricing', '/book-demo'],
    timeOnSite: 22,
    intentScore: 'high',
    intentSignals: ['Visited demo page', 'Multiple sessions', 'High time on site'],
    contacts: [
      { name: 'Rachel Kim', title: 'Founder', email: 'rachel@scaleup.io' },
    ],
    status: 'pushed_to_campaign',
    campaignId: 'camp-002',
  },
]

export const mockRequests: ClientRequest[] = [
  {
    id: 'req-001',
    type: 'add_leads',
    category: 'review',
    status: 'pending',
    title: 'Add new lead list',
    description: 'Upload 500 new leads from recent trade show.',
    submittedAt: '2026-01-27T10:00:00Z',
  },
  {
    id: 'req-002',
    type: 'icp_update',
    category: 'instant',
    status: 'completed',
    title: 'Update ICP targeting',
    description: 'Expand to include companies 200-1000 employees.',
    submittedAt: '2026-01-25T14:00:00Z',
    completedAt: '2026-01-25T14:01:00Z',
    processingTime: 1,
  },
  {
    id: 'req-003',
    type: 'campaign_pause',
    category: 'instant',
    status: 'completed',
    title: 'Pause Campaign Beta',
    description: 'Temporarily pause for messaging review.',
    submittedAt: '2026-01-24T09:00:00Z',
    completedAt: '2026-01-24T09:00:30Z',
    processingTime: 0.5,
  },
  {
    id: 'req-004',
    type: 'copy_change',
    category: 'review',
    status: 'completed',
    title: 'Update email copy',
    description: 'Change CTA in email 2 from "book a call" to "schedule a demo".',
    submittedAt: '2026-01-22T11:00:00Z',
    completedAt: '2026-01-22T15:30:00Z',
    processingTime: 270,
    assignedTo: 'CSM Team',
  },
]

export const mockEngineActivity: EngineActivity[] = [
  {
    id: 'eng-001',
    engineCode: 'J',
    engineName: 'The Judge',
    status: 'completed',
    startedAt: '2026-01-27T08:00:00Z',
    completedAt: '2026-01-27T08:05:00Z',
    summary: 'Daily health check completed',
    details: 'All 3 domains healthy. No issues detected.',
    impact: 'System operating normally',
  },
  {
    id: 'eng-002',
    engineCode: 'D',
    engineName: 'The Hunter',
    status: 'completed',
    startedAt: '2026-01-27T06:00:00Z',
    completedAt: '2026-01-27T06:15:00Z',
    summary: '32 new leads identified',
    details: 'Processed 5 positive replies. Found 32 new decision-makers at responding companies.',
    impact: 'New leads added to Campaign Alpha',
    affectedCampaigns: ['camp-001'],
  },
  {
    id: 'eng-003',
    engineCode: 'C',
    engineName: 'The Scientist',
    status: 'running',
    startedAt: '2026-01-27T09:00:00Z',
    summary: 'A/B test in progress',
    details: 'Testing opening line variations in Campaign Alpha. Day 4 of 7.',
    affectedCampaigns: ['camp-001'],
  },
  {
    id: 'eng-004',
    engineCode: 'E',
    engineName: 'The Sentinel',
    status: 'completed',
    startedAt: '2026-01-27T07:00:00Z',
    completedAt: '2026-01-27T07:10:00Z',
    summary: '12 high-intent visitors identified',
    details: 'Identified 47 total companies, 12 flagged as high-intent based on behavior.',
    impact: '8 contacts enriched and ready for outreach',
  },
  {
    id: 'eng-005',
    engineCode: 'I',
    engineName: 'The Informant',
    status: 'scheduled',
    startedAt: '2026-01-26T20:00:00Z',
    summary: 'Weekly report scheduled',
    details: 'Next report will be generated Sunday at 8 PM PT.',
  },
]

export const mockReports: WeeklyReport[] = [
  {
    id: 'rep-001',
    periodStart: '2026-01-19',
    periodEnd: '2026-01-25',
    generatedAt: '2026-01-26T04:00:00Z',
    metrics: {
      meetingsBooked: 23,
      emailsSent: 3200,
      openRate: 42.3,
      replyRate: 8.7,
      positiveReplies: 167,
    },
    vsLastWeek: {
      meetings: 15,
      replyRate: 5,
      openRate: 3,
    },
    aiSummary: 'Exceptional week with 23 meetings booked, up 15% from last week. Campaign Alpha continues to outperform with a 9.2% reply rate. Domain health remains excellent across all sending domains. The Hunter identified 45 new expansion leads from positive replies.',
    keyWins: [
      '23 meetings booked (target: 20)',
      'Reply rate at 8.7% (industry avg: 5.1%)',
      'Campaign Alpha hit 9.2% reply rate',
      '45 new leads from The Hunter expansion',
    ],
    recommendations: [
      'Consider increasing daily send volume on Campaign Alpha',
      'Test new subject lines on Campaign Beta to improve opens',
      'Review send3.clientcompany.com DMARC settings',
    ],
    pdfUrl: '/reports/weekly-2026-01-25.pdf',
  },
  {
    id: 'rep-002',
    periodStart: '2026-01-12',
    periodEnd: '2026-01-18',
    generatedAt: '2026-01-19T04:00:00Z',
    metrics: {
      meetingsBooked: 20,
      emailsSent: 2900,
      openRate: 41.0,
      replyRate: 8.3,
      positiveReplies: 145,
    },
    vsLastWeek: {
      meetings: 5,
      replyRate: 3,
      openRate: 2,
    },
    aiSummary: 'Strong week with 20 meetings booked. Campaign Beta successfully launched and showing early promising results. All domains healthy with deliverability above 97%.',
    keyWins: [
      '20 meetings booked',
      'Campaign Beta launched successfully',
      'All domains showing healthy metrics',
    ],
    recommendations: [
      'Monitor Campaign Beta closely for first 2 weeks',
      'Consider A/B testing subject lines on Campaign Alpha',
    ],
    pdfUrl: '/reports/weekly-2026-01-18.pdf',
  },
  {
    id: 'rep-003',
    periodStart: '2026-01-05',
    periodEnd: '2026-01-11',
    generatedAt: '2026-01-12T04:00:00Z',
    metrics: {
      meetingsBooked: 19,
      emailsSent: 2800,
      openRate: 40.2,
      replyRate: 8.1,
      positiveReplies: 136,
    },
    vsLastWeek: {
      meetings: 35,
      replyRate: 8,
      openRate: 4,
    },
    aiSummary: 'Great start to Q1 with 19 meetings booked. Reply rates trending up week over week. Campaign Alpha driving majority of meetings.',
    keyWins: [
      '19 meetings booked',
      'Reply rate improved to 8.1%',
      'Strong start to new year',
    ],
    recommendations: [
      'Prepare Campaign Beta for launch',
      'Consider expanding ICP targeting',
    ],
    pdfUrl: '/reports/weekly-2026-01-11.pdf',
  },
]

export const mockHealthScore: HealthScore = {
  overall: 87,
  status: 'healthy',
  domainHealth: 95,
  replyQuality: 82,
  engagementLevel: 88,
  meetingConversion: 83,
  riskSignals: [
    {
      signal: 'Domain DMARC',
      severity: 'low',
      description: 'send3.clientcompany.com DMARC policy could be strengthened',
    },
  ],
  trend: 'improving',
  lastUpdatedAt: '2026-01-27T08:00:00Z',
}

export const mockActivity: ActivityItem[] = [
  {
    id: 'act-001',
    type: 'meeting',
    message: 'New meeting booked: John Smith, VP Sales at Acme Corporation',
    timestamp: '2 hours ago',
    link: '/dashboard/meetings',
  },
  {
    id: 'act-002',
    type: 'engine',
    message: 'The Hunter identified 32 new leads from positive replies',
    timestamp: '3 hours ago',
  },
  {
    id: 'act-003',
    type: 'reply',
    message: '3 new positive replies on Campaign Alpha',
    timestamp: '4 hours ago',
    link: '/dashboard/campaigns/camp-001',
  },
  {
    id: 'act-004',
    type: 'engine',
    message: 'The Judge completed daily health check - all systems healthy',
    timestamp: '5 hours ago',
  },
  {
    id: 'act-005',
    type: 'campaign',
    message: 'A/B test on Campaign Alpha completed - Variant A wins (+18% opens)',
    timestamp: '1 day ago',
    link: '/dashboard/campaigns/camp-001',
  },
  {
    id: 'act-006',
    type: 'report',
    message: 'Weekly report generated and delivered',
    timestamp: '2 days ago',
    link: '/dashboard/reports',
  },
  {
    id: 'act-007',
    type: 'request',
    message: 'ICP update request completed',
    timestamp: '2 days ago',
    link: '/dashboard/requests',
  },
]

// Helper functions
export function getMeetingsByStatus(status: Meeting['status']): Meeting[] {
  return mockMeetings.filter(m => m.status === status)
}

export function getUpcomingMeetings(): Meeting[] {
  return mockMeetings.filter(m => m.status === 'scheduled').sort((a, b) =>
    new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  )
}

export function getCampaignById(id: string): Campaign | undefined {
  return mockCampaigns.find(c => c.id === id)
}

export function getActiveCampaigns(): Campaign[] {
  return mockCampaigns.filter(c => c.status === 'active')
}

export function getHighIntentVisitors(): WebsiteVisitor[] {
  return mockVisitors.filter(v => v.intentScore === 'high')
}

export function getPendingRequests(): ClientRequest[] {
  return mockRequests.filter(r => r.status === 'pending' || r.status === 'in_progress')
}
