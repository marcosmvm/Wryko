// Admin portal mock data types and data

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

// Mock clients data
export const mockClients: AdminClient[] = [
  {
    id: 'client-001',
    clientId: 'XG-001234',
    companyName: 'TechFlow Solutions',
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah@techflow.io',
    phone: '+1 (555) 123-4567',
    plan: 'scale',
    status: 'active',
    mrr: 2500,
    healthScore: 92,
    onboardingStartedAt: '2025-11-01',
    activatedAt: '2025-11-15',
    createdAt: '2025-11-01',
  },
  {
    id: 'client-002',
    clientId: 'XG-001235',
    companyName: 'DataDrive Inc',
    contactName: 'Michael Chen',
    contactEmail: 'mchen@datadrive.com',
    phone: '+1 (555) 234-5678',
    plan: 'enterprise',
    status: 'active',
    mrr: 5000,
    healthScore: 88,
    onboardingStartedAt: '2025-10-15',
    activatedAt: '2025-10-29',
    createdAt: '2025-10-15',
  },
  {
    id: 'client-003',
    clientId: 'XG-001236',
    companyName: 'CloudNine Systems',
    contactName: 'Emily Rodriguez',
    contactEmail: 'emily@cloudnine.io',
    plan: 'founding_partner',
    status: 'onboarding',
    mrr: 1500,
    healthScore: 100,
    onboardingStartedAt: '2026-01-20',
    createdAt: '2026-01-20',
  },
  {
    id: 'client-004',
    clientId: 'XG-001237',
    companyName: 'Velocity AI',
    contactName: 'James Wilson',
    contactEmail: 'jwilson@velocityai.com',
    phone: '+1 (555) 345-6789',
    plan: 'scale',
    status: 'active',
    mrr: 2500,
    healthScore: 65,
    onboardingStartedAt: '2025-09-01',
    activatedAt: '2025-09-15',
    createdAt: '2025-09-01',
  },
  {
    id: 'client-005',
    clientId: 'XG-001238',
    companyName: 'NextGen Software',
    contactName: 'Amanda Lee',
    contactEmail: 'amanda@nextgen.dev',
    plan: 'founding_partner',
    status: 'paused',
    mrr: 0,
    healthScore: 45,
    onboardingStartedAt: '2025-08-01',
    activatedAt: '2025-08-15',
    createdAt: '2025-08-01',
  },
  {
    id: 'client-006',
    clientId: 'XG-001239',
    companyName: 'Quantum Labs',
    contactName: 'David Park',
    contactEmail: 'dpark@quantumlabs.io',
    phone: '+1 (555) 456-7890',
    plan: 'enterprise',
    status: 'active',
    mrr: 5000,
    healthScore: 95,
    onboardingStartedAt: '2025-12-01',
    activatedAt: '2025-12-15',
    createdAt: '2025-12-01',
  },
  {
    id: 'client-007',
    clientId: 'XG-001240',
    companyName: 'Pinnacle Tech',
    contactName: 'Lisa Thompson',
    contactEmail: 'lisa@pinnacletech.com',
    plan: 'scale',
    status: 'active',
    mrr: 2500,
    healthScore: 78,
    onboardingStartedAt: '2025-11-15',
    activatedAt: '2025-11-29',
    createdAt: '2025-11-15',
  },
  {
    id: 'client-008',
    clientId: 'XG-001241',
    companyName: 'Synergy Solutions',
    contactName: 'Robert Martinez',
    contactEmail: 'rmartinez@synergy.io',
    plan: 'founding_partner',
    status: 'churned',
    mrr: 0,
    healthScore: 0,
    onboardingStartedAt: '2025-06-01',
    activatedAt: '2025-06-15',
    createdAt: '2025-06-01',
  },
]

// Mock admin metrics
export const mockAdminMetrics: AdminMetrics = {
  activeClients: 5,
  totalMrr: 17500,
  enginesRunning: 3,
  meetingsThisWeek: 12,
  clientsOnboarding: 1,
  clientsAtRisk: 2,
}

// Mock engine runs
export const mockEngineRuns: EngineRun[] = [
  {
    id: 'run-001',
    engineSlug: 'the-guardian',
    engineName: 'The Guardian',
    clientId: 'client-001',
    clientName: 'TechFlow Solutions',
    status: 'completed',
    startedAt: '2026-01-26T14:30:00Z',
    completedAt: '2026-01-26T14:32:15Z',
    durationMs: 135000,
    inputSummary: '450 leads to verify',
    outputSummary: '412 verified, 38 rejected',
  },
  {
    id: 'run-002',
    engineSlug: 'the-architect',
    engineName: 'The Architect',
    clientId: 'client-002',
    clientName: 'DataDrive Inc',
    status: 'running',
    startedAt: '2026-01-26T15:00:00Z',
    inputSummary: 'Creating campaign for SaaS ICP',
  },
  {
    id: 'run-003',
    engineSlug: 'the-informant',
    engineName: 'The Informant',
    status: 'completed',
    startedAt: '2026-01-26T08:00:00Z',
    completedAt: '2026-01-26T08:15:00Z',
    durationMs: 900000,
    inputSummary: 'Weekly reports for all clients',
    outputSummary: '5 reports generated and sent',
  },
  {
    id: 'run-004',
    engineSlug: 'the-hunter',
    engineName: 'The Hunter',
    clientId: 'client-006',
    clientName: 'Quantum Labs',
    status: 'completed',
    startedAt: '2026-01-26T12:45:00Z',
    completedAt: '2026-01-26T12:48:30Z',
    durationMs: 210000,
    inputSummary: 'Positive reply from prospect',
    outputSummary: '32 lookalike leads found',
  },
  {
    id: 'run-005',
    engineSlug: 'the-judge',
    engineName: 'The Judge',
    status: 'running',
    startedAt: '2026-01-26T15:05:00Z',
    inputSummary: 'Health check cycle',
  },
  {
    id: 'run-006',
    engineSlug: 'the-scientist',
    engineName: 'The Scientist',
    clientId: 'client-004',
    clientName: 'Velocity AI',
    status: 'failed',
    startedAt: '2026-01-26T10:00:00Z',
    completedAt: '2026-01-26T10:02:00Z',
    durationMs: 120000,
    inputSummary: 'A/B test analysis',
    errorMessage: 'Insufficient data for statistical significance',
  },
  {
    id: 'run-007',
    engineSlug: 'the-sentinel',
    engineName: 'The Sentinel',
    clientId: 'client-001',
    clientName: 'TechFlow Solutions',
    status: 'queued',
    startedAt: '2026-01-26T15:30:00Z',
    inputSummary: 'Daily visitor batch processing',
  },
]

// Mock admin activity
export const mockAdminActivity: AdminActivity[] = [
  {
    id: 'act-001',
    adminName: 'Admin User',
    action: 'created',
    resourceType: 'client',
    resourceId: 'client-003',
    resourceName: 'CloudNine Systems',
    details: 'New client onboarding started',
    timestamp: '2026-01-26T14:00:00Z',
  },
  {
    id: 'act-002',
    adminName: 'Admin User',
    action: 'updated',
    resourceType: 'client',
    resourceId: 'client-004',
    resourceName: 'Velocity AI',
    details: 'Marked as at-risk due to low health score',
    timestamp: '2026-01-26T12:30:00Z',
  },
  {
    id: 'act-003',
    adminName: 'Admin User',
    action: 'paused',
    resourceType: 'campaign',
    resourceId: 'camp-005',
    resourceName: 'NextGen Q1 Push',
    details: 'Campaign paused per client request',
    timestamp: '2026-01-26T11:00:00Z',
  },
  {
    id: 'act-004',
    adminName: 'Admin User',
    action: 'triggered',
    resourceType: 'engine',
    resourceId: 'the-guardian',
    resourceName: 'The Guardian',
    details: 'Manual lead verification run',
    timestamp: '2026-01-26T10:15:00Z',
  },
  {
    id: 'act-005',
    adminName: 'Admin User',
    action: 'updated',
    resourceType: 'settings',
    details: 'Updated notification preferences',
    timestamp: '2026-01-26T09:00:00Z',
  },
  {
    id: 'act-006',
    adminName: 'Admin User',
    action: 'created',
    resourceType: 'campaign',
    resourceId: 'camp-006',
    resourceName: 'DataDrive Enterprise Push',
    details: 'New campaign created for DataDrive Inc',
    timestamp: '2026-01-25T16:00:00Z',
  },
]

// Helper functions
export function getClientById(id: string): AdminClient | undefined {
  return mockClients.find((c) => c.id === id)
}

export function getClientsByStatus(status: AdminClient['status']): AdminClient[] {
  return mockClients.filter((c) => c.status === status)
}

export function getClientsAtRisk(): AdminClient[] {
  return mockClients.filter((c) => c.healthScore < 70 && c.status === 'active')
}

export function getEngineRunsByEngine(engineSlug: string): EngineRun[] {
  return mockEngineRuns.filter((r) => r.engineSlug === engineSlug)
}

export function getRecentEngineRuns(limit: number = 10): EngineRun[] {
  return [...mockEngineRuns]
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, limit)
}

export function formatMrr(mrr: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(mrr)
}

export function getHealthColor(score: number): string {
  if (score >= 80) return 'text-green-500'
  if (score >= 50) return 'text-yellow-500'
  return 'text-red-500'
}

export function getHealthBgColor(score: number): string {
  if (score >= 80) return 'bg-green-500/10'
  if (score >= 50) return 'bg-yellow-500/10'
  return 'bg-red-500/10'
}

export function getStatusColor(status: AdminClient['status']): string {
  switch (status) {
    case 'active':
      return 'bg-green-500/10 text-green-500'
    case 'onboarding':
      return 'bg-blue-500/10 text-blue-500'
    case 'paused':
      return 'bg-yellow-500/10 text-yellow-500'
    case 'churned':
      return 'bg-red-500/10 text-red-500'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export function getEngineRunStatusColor(status: EngineRun['status']): string {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-500'
    case 'running':
      return 'bg-blue-500/10 text-blue-500'
    case 'queued':
      return 'bg-yellow-500/10 text-yellow-500'
    case 'failed':
      return 'bg-red-500/10 text-red-500'
    default:
      return 'bg-muted text-muted-foreground'
  }
}
