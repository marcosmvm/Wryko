// Admin portal constants

// Health score thresholds
export const HEALTH_THRESHOLDS = {
  HEALTHY: 80,
  AT_RISK: 50,
} as const

// Client status options
export const CLIENT_STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'paused', label: 'Paused' },
  { value: 'churned', label: 'Churned' },
] as const

export type ClientStatus = 'active' | 'onboarding' | 'paused' | 'churned'

// Plan options
export const PLAN_OPTIONS = [
  { value: 'founding_partner', label: 'Founding Partner' },
  { value: 'scale', label: 'Scale' },
  { value: 'enterprise', label: 'Enterprise' },
] as const

export type PlanType = 'founding_partner' | 'scale' | 'enterprise'

// Engine run status
export const ENGINE_RUN_STATUS = {
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  QUEUED: 'queued',
} as const

export type EngineRunStatus = 'running' | 'completed' | 'failed' | 'queued'

// Activity resource types
export const RESOURCE_TYPES = {
  CLIENT: 'client',
  ENGINE: 'engine',
  SETTINGS: 'settings',
  CAMPAIGN: 'campaign',
} as const

export type ResourceType = 'client' | 'engine' | 'settings' | 'campaign'

// Color mappings for consistent styling
export const STATUS_COLORS: Record<ClientStatus, string> = {
  active: 'bg-green-500/10 text-green-500',
  onboarding: 'bg-blue-500/10 text-blue-500',
  paused: 'bg-yellow-500/10 text-yellow-500',
  churned: 'bg-red-500/10 text-red-500',
}

export const ENGINE_STATUS_COLORS: Record<EngineRunStatus, string> = {
  running: 'bg-blue-500/10 text-blue-500',
  completed: 'bg-green-500/10 text-green-500',
  failed: 'bg-red-500/10 text-red-500',
  queued: 'bg-yellow-500/10 text-yellow-500',
}

export const RESOURCE_COLORS: Record<ResourceType, string> = {
  client: 'bg-blue-500/10 text-blue-500',
  engine: 'bg-purple-500/10 text-purple-500',
  settings: 'bg-gray-500/10 text-gray-500',
  campaign: 'bg-green-500/10 text-green-500',
}

// Helper function to get health color based on score
export function getHealthColorClass(score: number): string {
  if (score >= HEALTH_THRESHOLDS.HEALTHY) return 'text-success'
  if (score >= HEALTH_THRESHOLDS.AT_RISK) return 'text-warning'
  return 'text-destructive'
}

export function getHealthBgColorClass(score: number): string {
  if (score >= HEALTH_THRESHOLDS.HEALTHY) return 'bg-success/10'
  if (score >= HEALTH_THRESHOLDS.AT_RISK) return 'bg-warning/10'
  return 'bg-destructive/10'
}

// Get health status label
export function getHealthStatus(score: number): 'healthy' | 'at-risk' | 'critical' {
  if (score >= HEALTH_THRESHOLDS.HEALTHY) return 'healthy'
  if (score >= HEALTH_THRESHOLDS.AT_RISK) return 'at-risk'
  return 'critical'
}
