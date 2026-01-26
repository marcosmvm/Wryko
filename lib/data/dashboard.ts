// Dashboard data types

export interface DashboardMetrics {
  totalSent: number
  totalOpened: number
  openRate: number
  totalReplied: number
  replyRate: number
  meetingsBooked: number
  positiveReplies: number
}

export interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed' | 'draft'
  sent: number
  opened: number
  openRate: number
  replied: number
  replyRate: number
  meetings: number
  startDate: string
  dailySend: number
  domains: number
  positiveReplies: number
  neutralReplies: number
  negativeReplies: number
  target?: string
  sequences?: number
}

export interface WeeklyReport {
  id: string
  periodStart: string
  periodEnd: string
  metrics: DashboardMetrics
  aiSummary: string
  generatedAt: string
}

export interface HealthScore {
  overall: number
  status: 'healthy' | 'warning' | 'critical'
  domainHealth: number
  replyQuality: number
}

export interface ActivityItem {
  id: string
  type: 'reply' | 'report' | 'campaign' | 'alert'
  message: string
  timestamp: string
  link?: string
}

// Mock data for development

export const mockMetrics: DashboardMetrics = {
  totalSent: 12450,
  totalOpened: 5268,
  openRate: 42.3,
  totalReplied: 1084,
  replyRate: 8.7,
  meetingsBooked: 23,
  positiveReplies: 650,
}

export const mockHealthScore: HealthScore = {
  overall: 87,
  status: 'healthy',
  domainHealth: 95,
  replyQuality: 82,
}

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
    target: 'Tech companies',
    sequences: 4,
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
    target: 'SaaS companies',
    sequences: 3,
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
    target: 'Enterprise',
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
    target: 'Mid-market',
    sequences: 4,
  },
]

export const mockActivity: ActivityItem[] = [
  {
    id: 'act-001',
    type: 'reply',
    message: '3 new positive replies on Campaign Alpha',
    timestamp: '2 hours ago',
    link: '/dashboard/campaigns/camp-001',
  },
  {
    id: 'act-002',
    type: 'report',
    message: 'Weekly report generated',
    timestamp: '5 hours ago',
    link: '/dashboard/reports',
  },
  {
    id: 'act-003',
    type: 'campaign',
    message: 'Campaign Beta launched',
    timestamp: 'Yesterday',
    link: '/dashboard/campaigns/camp-002',
  },
  {
    id: 'act-004',
    type: 'reply',
    message: '5 meetings booked this week',
    timestamp: '2 days ago',
  },
  {
    id: 'act-005',
    type: 'alert',
    message: 'Domain health check completed',
    timestamp: '3 days ago',
  },
]

export const mockReports: WeeklyReport[] = [
  {
    id: 'rep-001',
    periodStart: '2026-01-19',
    periodEnd: '2026-01-25',
    metrics: {
      totalSent: 3200,
      totalOpened: 1344,
      openRate: 42,
      totalReplied: 278,
      replyRate: 8.7,
      meetingsBooked: 23,
      positiveReplies: 167,
    },
    aiSummary: 'Strong week with 23 meetings booked, up 15% from last week. Reply rates continue to exceed industry benchmarks at 8.7%. Domain health remains excellent at 95%.',
    generatedAt: '2026-01-26T20:00:00Z',
  },
  {
    id: 'rep-002',
    periodStart: '2026-01-12',
    periodEnd: '2026-01-18',
    metrics: {
      totalSent: 2900,
      totalOpened: 1218,
      openRate: 42,
      totalReplied: 238,
      replyRate: 8.2,
      meetingsBooked: 21,
      positiveReplies: 143,
    },
    aiSummary: 'Solid performance this week with 21 meetings booked. Open rates remained steady at 42%. Campaign Alpha showing strong engagement.',
    generatedAt: '2026-01-19T20:00:00Z',
  },
  {
    id: 'rep-003',
    periodStart: '2026-01-05',
    periodEnd: '2026-01-11',
    metrics: {
      totalSent: 2800,
      totalOpened: 1148,
      openRate: 41,
      totalReplied: 221,
      replyRate: 7.9,
      meetingsBooked: 19,
      positiveReplies: 133,
    },
    aiSummary: 'Good start to the year with 19 meetings booked. Reply rates at 7.9% show room for optimization. Recommend A/B testing subject lines.',
    generatedAt: '2026-01-12T20:00:00Z',
  },
]
