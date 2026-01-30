/**
 * n8n Workflow Client
 *
 * This module provides utilities for calling n8n webhooks from the frontend.
 * Use this to trigger workflows and receive responses.
 */

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

interface N8NResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

interface WorkflowOptions {
  timeout?: number
  headers?: Record<string, string>
}

/**
 * Call an n8n webhook workflow
 * @param webhookPath - The webhook path/ID (e.g., 'contact-form', 'lead-capture')
 * @param payload - Data to send to the workflow
 * @param options - Additional options like timeout and headers
 */
export async function callWorkflow<T = unknown>(
  webhookPath: string,
  payload: Record<string, unknown>,
  options: WorkflowOptions = {}
): Promise<N8NResponse<T>> {
  const { timeout = 30000, headers = {} } = options

  if (!N8N_WEBHOOK_URL) {
    console.error('N8N_WEBHOOK_URL is not configured')
    return {
      success: false,
      error: 'Workflow service is not configured',
    }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(`${N8N_WEBHOOK_URL}/${webhookPath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      return {
        success: false,
        error: `Workflow error: ${response.status} - ${errorText}`,
      }
    }

    const data = await response.json()
    return {
      success: true,
      data: data as T,
    }
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timed out',
        }
      }
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Convert a File to base64 string for sending to n8n
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

/**
 * Prepare file upload payload for n8n
 */
export async function prepareFileUpload(
  file: File
): Promise<{ filename: string; mimeType: string; data: string }> {
  const base64 = await fileToBase64(file)
  return {
    filename: file.name,
    mimeType: file.type,
    data: base64,
  }
}

// Pre-configured workflow calls for common operations
export const workflows = {
  /**
   * Submit contact form
   */
  submitContact: (data: {
    name: string
    email: string
    company?: string
    message: string
  }) => callWorkflow('contact-form', data),

  /**
   * Capture lead from website
   */
  captureLead: (data: {
    email: string
    source: string
    metadata?: Record<string, unknown>
  }) => callWorkflow('lead-capture', data),

  /**
   * Request demo booking
   */
  requestDemo: (data: {
    name: string
    email: string
    company: string
    phone?: string
    employees?: string
    revenue?: string
  }) => callWorkflow('demo-request', data),
}

// ============================================
// Client Portal Dashboard Workflows
// ============================================

/**
 * Fetch dashboard metrics (Engine F: Client Dashboards)
 */
export const fetchDashboardMetrics = (clientId: string) =>
  callWorkflow('dashboard-metrics', { clientId })

/**
 * Campaign Management (Engine A: Campaign Optimizer)
 */
export const campaignWorkflows = {
  pause: (campaignId: string) =>
    callWorkflow('campaign-pause', { campaignId }),

  resume: (campaignId: string) =>
    callWorkflow('campaign-resume', { campaignId }),

  exportCSV: (campaignId: string) =>
    callWorkflow<{ downloadUrl: string }>('campaign-export', { campaignId }),
}

/**
 * Meetings export
 */
export const meetingsWorkflows = {
  exportCSV: (clientId: string, filters?: { status?: string; dateRange?: string }) =>
    callWorkflow<{ downloadUrl: string }>('meetings-export', { clientId, ...filters }),
}

/**
 * Visitor Management (Engine H: The Sentinel)
 */
export const visitorWorkflows = {
  addToCampaign: (visitorId: string, campaignId: string) =>
    callWorkflow('visitor-add-to-campaign', { visitorId, campaignId }),

  ignore: (visitorId: string) =>
    callWorkflow('visitor-ignore', { visitorId }),
}

/**
 * Domain Health Check (Engine D: Domain Health)
 */
export const domainWorkflows = {
  runHealthCheck: (clientId: string) =>
    callWorkflow('domain-health-check', { clientId }),
}

/**
 * Reports (Engine I: The Informant)
 */
export const reportWorkflows = {
  download: (reportId: string) =>
    callWorkflow<{ downloadUrl: string }>('report-download', { reportId }),

  share: (reportId: string, email: string) =>
    callWorkflow('report-share', { reportId, email }),
}

/**
 * Self-Serve Requests (Engine N: The Navigator)
 */
export const requestWorkflows = {
  submit: (data: {
    type: string
    title: string
    description: string
    metadata?: Record<string, unknown>
  }) => callWorkflow('request-submit', data),

  quickAction: (actionType: string, metadata?: Record<string, unknown>) =>
    callWorkflow('quick-action', { actionType, ...metadata }),
}

/**
 * Settings & Profile Management
 */
export const settingsWorkflows = {
  updateProfile: (data: {
    name?: string
    company?: string
    phone?: string
    website?: string
    avatar?: string
  }) => callWorkflow('profile-update', data),

  updateNotificationPrefs: (prefs: {
    weeklyReports?: boolean
    campaignAlerts?: boolean
    meetingBooked?: boolean
    dailyDigest?: boolean
    domainAlerts?: boolean
    optimizationTips?: boolean
  }) => callWorkflow('notification-prefs-update', prefs),

  inviteTeamMember: (email: string, role: string) =>
    callWorkflow('team-invite', { email, role }),

  removeTeamMember: (memberId: string) =>
    callWorkflow('team-remove', { memberId }),

  updateMemberRole: (memberId: string, role: string) =>
    callWorkflow('team-role-update', { memberId, role }),

  regenerateApiKey: () =>
    callWorkflow<{ apiKey: string }>('api-key-regenerate', {}),
}
