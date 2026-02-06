import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const engine = searchParams.get('engine'); // e.g., ?engine=A
    const type = searchParams.get('type'); // e.g., ?type=dashboard-update
    
    console.log(`n8n webhook received - Engine: ${engine}, Type: ${type}`, body);

    // Authenticate webhook (optional - add API key validation)
    const authHeader = req.headers.get('authorization');
    const expectedToken = process.env.N8N_WEBHOOK_SECRET;
    
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle different webhook types
    switch (engine) {
      case 'F': // Client Dashboard Updates
        await handleDashboardUpdate(body, supabase);
        break;
        
      case 'H': // Visitor Tracking  
        await handleVisitorTracking(body, supabase);
        break;
        
      case 'I': // Weekly Reports
        await handleWeeklyReport(body, supabase);
        break;
        
      case 'G': // The Hunter - Lead Expansion
        await handleLeadExpansion(body, supabase);
        break;
        
      case 'J': // The Judge - Issue Detection
        await handleIssueDetection(body, supabase);
        break;
        
      case 'M': // The Monitor - Churn Risk
        await handleChurnDetection(body, supabase);
        break;

      default:
        console.log(`Unhandled engine: ${engine}`);
        // Store raw webhook data for debugging
        await supabase
          .from('webhook_logs')
          .insert({
            engine,
            type,
            payload: body,
            processed_at: new Date().toISOString(),
          });
    }

    return NextResponse.json({ success: true, message: `Processed ${engine}${type ? `:${type}` : ''}` });

  } catch (error) {
    console.error('n8n webhook error:', error);
    return NextResponse.json({ 
      error: 'Webhook processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function handleDashboardUpdate(data: any, supabase: any) {
  const { client_id, metrics } = data;
  
  if (!client_id || !metrics) return;

  // Update client dashboard metrics
  await supabase
    .from('client_metrics')
    .upsert({
      client_id,
      ...metrics,
      updated_at: new Date().toISOString(),
    });
}

async function handleVisitorTracking(data: any, supabase: any) {
  const { client_id, visitor_data } = data;
  
  if (!client_id || !visitor_data) return;

  // Store visitor tracking data
  await supabase
    .from('visitor_tracking')
    .insert({
      client_id,
      ...visitor_data,
      tracked_at: new Date().toISOString(),
    });
}

async function handleWeeklyReport(data: any, supabase: any) {
  const { client_id, report_data } = data;
  
  if (!client_id || !report_data) return;

  // Store weekly report
  await supabase
    .from('weekly_reports')
    .insert({
      client_id,
      ...report_data,
      generated_at: new Date().toISOString(),
    });

  // Optionally trigger email notification
  console.log(`Weekly report generated for client ${client_id}`);
}

async function handleLeadExpansion(data: any, supabase: any) {
  const { client_id, expanded_leads } = data;
  
  if (!client_id || !expanded_leads) return;

  // Store expanded leads
  for (const lead of expanded_leads) {
    await supabase
      .from('leads')
      .insert({
        client_id,
        ...lead,
        source: 'engine_g_expansion',
        created_at: new Date().toISOString(),
      });
  }
}

async function handleIssueDetection(data: any, supabase: any) {
  const { client_id, issue } = data;
  
  if (!client_id || !issue) return;

  // Log detected issue
  await supabase
    .from('client_issues')
    .insert({
      client_id,
      issue_type: issue.type,
      severity: issue.severity,
      description: issue.description,
      detected_at: new Date().toISOString(),
      auto_resolved: issue.auto_resolved || false,
    });
}

async function handleChurnDetection(data: any, supabase: any) {
  const { client_id, churn_risk } = data;
  
  if (!client_id || !churn_risk) return;

  // Update churn risk score
  await supabase
    .from('profiles')
    .update({
      churn_risk_score: churn_risk.score,
      churn_risk_factors: churn_risk.factors,
      churn_updated_at: new Date().toISOString(),
    })
    .eq('id', client_id);
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ 
    message: 'n8n webhook endpoint',
    engines: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
    usage: 'POST with ?engine=X&type=Y'
  });
}