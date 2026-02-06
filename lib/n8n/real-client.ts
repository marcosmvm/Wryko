'use client';

const N8N_WEBHOOK_BASE = 'https://marcosmatthews.app.n8n.cloud/webhook';
const N8N_API_KEY = process.env.NEXT_PUBLIC_N8N_API_KEY;

export interface N8NResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  emailsSent: number;
  openRate: number;
  replyRate: number;
  qualifiedLeads: number;
  revenue: number;
  campaigns: number;
  lastUpdated: string;
}

export interface VisitorData {
  anonymous_visitors: number;
  identified_leads: number;
  page_views: number;
  session_duration: number;
  bounce_rate: number;
  top_pages: Array<{ page: string; views: number }>;
  traffic_sources: Array<{ source: string; visitors: number }>;
}

export interface WeeklyReport {
  period: string;
  metrics: DashboardMetrics;
  highlights: string[];
  recommendations: string[];
  trends: {
    leads: 'up' | 'down' | 'stable';
    engagement: 'up' | 'down' | 'stable';
    revenue: 'up' | 'down' | 'stable';
  };
}

// Dashboard Metrics - Engine F
export async function getDashboardMetrics(clientId: string): Promise<DashboardMetrics> {
  try {
    const response = await fetch(`${N8N_WEBHOOK_BASE}/engine-f-dashboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(N8N_API_KEY && { 'Authorization': `Bearer ${N8N_API_KEY}` })
      },
      body: JSON.stringify({
        client_id: clientId,
        action: 'get_metrics',
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return data.metrics;
    } else {
      throw new Error(data.error || 'Unknown error from n8n');
    }
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    // Return mock data as fallback
    return {
      totalLeads: 1234,
      emailsSent: 4567,
      openRate: 34.5,
      replyRate: 12.8,
      qualifiedLeads: 89,
      revenue: 45600,
      campaigns: 12,
      lastUpdated: new Date().toISOString()
    };
  }
}

// Visitor Tracking - Engine H  
export async function getVisitorData(clientId: string): Promise<VisitorData> {
  try {
    const response = await fetch(`${N8N_WEBHOOK_BASE}/engine-h-visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(N8N_API_KEY && { 'Authorization': `Bearer ${N8N_API_KEY}` })
      },
      body: JSON.stringify({
        client_id: clientId,
        action: 'get_visitors',
        timeframe: '7d',
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return data.visitor_data;
    } else {
      throw new Error(data.error || 'Unknown error from n8n');
    }
  } catch (error) {
    console.error('Error fetching visitor data:', error);
    // Return mock data as fallback
    return {
      anonymous_visitors: 2456,
      identified_leads: 123,
      page_views: 8901,
      session_duration: 145,
      bounce_rate: 45.2,
      top_pages: [
        { page: '/', views: 1234 },
        { page: '/pricing', views: 890 },
        { page: '/about', views: 567 }
      ],
      traffic_sources: [
        { source: 'Organic', visitors: 1200 },
        { source: 'Direct', visitors: 800 },
        { source: 'Social', visitors: 456 }
      ]
    };
  }
}

// Weekly Reports - Engine I
export async function getWeeklyReport(clientId: string): Promise<WeeklyReport> {
  try {
    const response = await fetch(`${N8N_WEBHOOK_BASE}/engine-i-reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(N8N_API_KEY && { 'Authorization': `Bearer ${N8N_API_KEY}` })
      },
      body: JSON.stringify({
        client_id: clientId,
        action: 'generate_report',
        period: 'weekly',
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return data.report;
    } else {
      throw new Error(data.error || 'Unknown error from n8n');
    }
  } catch (error) {
    console.error('Error fetching weekly report:', error);
    
    // Return mock data as fallback
    const metrics = await getDashboardMetrics(clientId);
    return {
      period: 'Jan 30 - Feb 6, 2026',
      metrics,
      highlights: [
        'Lead generation increased by 23% this week',
        'Email open rates improved to 34.5%',
        'Qualified 89 new leads for your sales team'
      ],
      recommendations: [
        'Consider expanding successful campaigns',
        'Test new email subject lines',
        'Follow up with warm leads from last week'
      ],
      trends: {
        leads: 'up',
        engagement: 'up', 
        revenue: 'stable'
      }
    };
  }
}

// Generic n8n workflow caller
export async function callN8NWorkflow(
  engine: string,
  action: string,
  data: Record<string, any>
): Promise<N8NResponse> {
  try {
    const response = await fetch(`${N8N_WEBHOOK_BASE}/engine-${engine.toLowerCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(N8N_API_KEY && { 'Authorization': `Bearer ${N8N_API_KEY}` })
      },
      body: JSON.stringify({
        action,
        ...data,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error calling n8n engine ${engine}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Batch call multiple engines
export async function batchCallEngines(
  calls: Array<{ engine: string; action: string; data: Record<string, any> }>
): Promise<Record<string, N8NResponse>> {
  const results: Record<string, N8NResponse> = {};
  
  await Promise.allSettled(
    calls.map(async (call) => {
      const result = await callN8NWorkflow(call.engine, call.action, call.data);
      results[call.engine] = result;
    })
  );
  
  return results;
}