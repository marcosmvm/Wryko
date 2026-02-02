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
