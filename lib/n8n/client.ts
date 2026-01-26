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
