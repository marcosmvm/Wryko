/**
 * XGrowthOS CSM Suite - Google Sheets Template Creator
 *
 * This script creates all required tabs and columns for the CSM Suite engines (I-N).
 * Run this in Google Apps Script (Extensions > Apps Script) on your master sheet.
 *
 * Required Environment Variables (set in n8n):
 * - XGROWTHOS_MASTER_SHEET_ID: The Google Sheets document ID
 * - XGROWTHOS_CLIENTS_FOLDER_ID: Google Drive folder ID for client folders
 * - XGROWTHOS_PORTAL_URL: Your client portal URL (e.g., https://app.xgrowthos.com)
 * - CALENDLY_USER_URI: Your Calendly user URI
 */

function createCSMSuiteTabs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Define all tabs with their columns
  const tabs = {
    // ==================== CORE TABS ====================
    'Clients': [
      'client_id', 'company_name', 'primary_contact', 'primary_email',
      'plan_type', 'contract_value', 'status', 'created_at', 'estimated_launch',
      'onboarding_progress', 'last_portal_login', 'renewal_date', 'calendar_link',
      'last_week_reply_rate', 'csm_assigned', 'notes'
    ],

    // ==================== REPORTING (Engine I) ====================
    'Report_History': [
      'client_id', 'client_name', 'report_date', 'report_type',
      'emails_sent', 'open_rate', 'reply_rate', 'meetings_booked',
      'bounce_rate', 'inbox_health_pct', 'ai_summary'
    ],

    // ==================== ISSUE DETECTION (Engine J) ====================
    'Domain_Health': [
      'domain', 'client_id', 'spf_status', 'dkim_status', 'dmarc_status',
      'blacklist_status', 'blacklist_sources', 'last_checked', 'health_score'
    ],
    'Incident_Log': [
      'incident_id', 'timestamp', 'client_id', 'source', 'type',
      'severity', 'auto_action', 'status', 'details', 'resolved_at', 'resolved_by'
    ],
    'Health_Check_Log': [
      'timestamp', 'status', 'issues_found', 'critical_issues',
      'actions_taken', 'execution_time_ms'
    ],

    // ==================== KNOWLEDGE BRAIN (Engine K) ====================
    'Knowledge_Base': [
      'id', 'title', 'content', 'category', 'keywords',
      'created_at', 'updated_at', 'author'
    ],
    'SOPs': [
      'id', 'title', 'description', 'steps', 'category',
      'created_at', 'updated_at', 'version'
    ],
    'FAQ': [
      'id', 'question', 'answer', 'category', 'created_at', 'updated_at'
    ],
    'Troubleshooting_Guide': [
      'id', 'issue', 'symptoms', 'solution', 'category',
      'severity', 'created_at', 'updated_at'
    ],
    'Query_Log': [
      'timestamp', 'query', 'confidence', 'sources_used',
      'results_count', 'user_id', 'source'
    ],
    'Knowledge_Gaps': [
      'timestamp', 'query', 'user_id', 'status',
      'assigned_to', 'resolved_at', 'resolution'
    ],

    // ==================== ONBOARDING (Engine L) ====================
    'Onboarding_Tracker': [
      'client_id', 'company_name', 'phase_welcome', 'phase_assets',
      'phase_domains', 'phase_crm', 'phase_campaign', 'phase_review',
      'phase_launch', 'overall_progress', 'current_phase', 'created_at',
      'welcome_completed_at', 'assets_completed_at', 'domains_completed_at',
      'crm_completed_at', 'campaign_completed_at', 'review_completed_at',
      'launch_completed_at', 'reminders_sent', 'last_reminder'
    ],

    // ==================== CHURN PREVENTION (Engine M) ====================
    'Meeting_Log': [
      'meeting_id', 'client_id', 'scheduled_date', 'status',
      'meeting_type', 'attendees', 'notes', 'next_steps'
    ],
    'Support_Tickets': [
      'ticket_id', 'client_id', 'created_at', 'subject',
      'priority', 'status', 'assigned_to', 'resolved_at', 'resolution'
    ],
    'Client_Communications': [
      'id', 'client_id', 'date', 'channel', 'direction',
      'subject', 'message', 'sentiment'
    ],
    'Health_Score_History': [
      'client_id', 'company_name', 'health_score', 'risk_level',
      'status', 'primary_risk_factor', 'primary_risk_details', 'assessed_at'
    ],
    'Intervention_Plans': [
      'client_id', 'company_name', 'health_score', 'risk_level',
      'primary_risk', 'intervention_plan', 'created_at', 'status',
      'assigned_to', 'completed_at', 'outcome'
    ],
    'Weekly_Health_Summary': [
      'assessed_at', 'total_clients', 'healthy_count', 'at_risk_count',
      'critical_count', 'avg_health_score', 'total_arr_at_risk'
    ],

    // ==================== CLIENT PORTAL (Engine N) ====================
    'Portal_Requests': [
      'request_id', 'client_id', 'request_type', 'category',
      'data', 'submitted_by', 'submitted_at', 'status', 'priority',
      'reviewed_by', 'review_notes', 'completed_at'
    ],
    'Client_ICP': [
      'client_id', 'icp_data', 'created_at', 'updated_at'
    ]
  };

  // Create each tab
  for (const [tabName, columns] of Object.entries(tabs)) {
    let sheet = ss.getSheetByName(tabName);

    if (!sheet) {
      // Create new sheet
      sheet = ss.insertSheet(tabName);
      Logger.log(`Created tab: ${tabName}`);
    } else {
      Logger.log(`Tab already exists: ${tabName}`);
    }

    // Set header row
    const headerRange = sheet.getRange(1, 1, 1, columns.length);
    headerRange.setValues([columns]);

    // Format header row
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#059669');
    headerRange.setFontColor('#FFFFFF');

    // Freeze header row
    sheet.setFrozenRows(1);

    // Auto-resize columns
    for (let i = 1; i <= columns.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }

  // Clean up default Sheet1 if it exists and is empty
  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && sheet1.getLastRow() === 0) {
    ss.deleteSheet(sheet1);
    Logger.log('Deleted empty Sheet1');
  }

  Logger.log('CSM Suite template creation complete!');
  Logger.log(`Created ${Object.keys(tabs).length} tabs.`);

  return {
    success: true,
    tabsCreated: Object.keys(tabs).length,
    tabs: Object.keys(tabs)
  };
}

/**
 * Add sample data to Knowledge_Base, SOPs, FAQ, and Troubleshooting_Guide
 * Run this after creating the tabs to have some starter content
 */
function addSampleKnowledgeData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const now = new Date().toISOString();

  // Sample Knowledge Base entries
  const kbSheet = ss.getSheetByName('Knowledge_Base');
  if (kbSheet && kbSheet.getLastRow() === 1) {
    const kbData = [
      ['KB-001', 'Reply Rate Benchmarks', 'Industry standard reply rates for B2B cold email: 3-5.1% average. XGrowthOS targets: >8% (Green), 5-8% (Yellow), <3% (Red)', 'Metrics', 'reply rate, benchmark, kpi', now, now, 'System'],
      ['KB-002', 'Open Rate Benchmarks', 'Industry standard open rates: 27.7% average. XGrowthOS targets: >40% (Green), 30-40% (Yellow), <20% (Red)', 'Metrics', 'open rate, benchmark, kpi', now, now, 'System'],
      ['KB-003', 'Domain Warmup Timeline', 'New domains require 14-21 days of warmup before full sending volume. Start at 10-20 emails/day and gradually increase.', 'Technical', 'domain, warmup, deliverability', now, now, 'System']
    ];
    kbSheet.getRange(2, 1, kbData.length, kbData[0].length).setValues(kbData);
    Logger.log('Added sample Knowledge Base entries');
  }

  // Sample SOPs
  const sopSheet = ss.getSheetByName('SOPs');
  if (sopSheet && sopSheet.getLastRow() === 1) {
    const sopData = [
      ['SOP-001', 'Inbox Rotation', 'Process for rotating flagged inboxes', '1. Pause campaigns using flagged inbox\n2. Remove inbox from active campaigns\n3. Add replacement inbox\n4. Restart warmup on replacement\n5. Resume campaigns\n6. Document in Incident_Log', 'Technical', now, now, '1.0'],
      ['SOP-002', 'New Client Onboarding', 'Steps for onboarding new clients', '1. Create client record in Sheets\n2. Create Drive folder\n3. Send welcome email\n4. Collect assets (ICP, targets, calendar)\n5. Provision domains\n6. Design campaigns\n7. Review and launch', 'Operations', now, now, '1.0']
    ];
    sopSheet.getRange(2, 1, sopData.length, sopData[0].length).setValues(sopData);
    Logger.log('Added sample SOPs');
  }

  // Sample FAQs
  const faqSheet = ss.getSheetByName('FAQ');
  if (faqSheet && faqSheet.getLastRow() === 1) {
    const faqData = [
      ['FAQ-001', 'What is a good reply rate?', 'For B2B cold email, 3-5% is industry average. XGrowthOS aims for >8% reply rate, which is considered excellent performance.', 'Metrics', now, now],
      ['FAQ-002', 'How long does domain warmup take?', 'Domain warmup typically takes 14-21 days. During this time, sending volume gradually increases from 10-20 emails/day to full capacity.', 'Technical', now, now],
      ['FAQ-003', 'What causes high bounce rates?', 'High bounce rates (>3%) are usually caused by: outdated email lists, invalid email formats, or domain reputation issues. Always verify lists before uploading.', 'Troubleshooting', now, now]
    ];
    faqSheet.getRange(2, 1, faqData.length, faqData[0].length).setValues(faqData);
    Logger.log('Added sample FAQs');
  }

  // Sample Troubleshooting Guide
  const tsSheet = ss.getSheetByName('Troubleshooting_Guide');
  if (tsSheet && tsSheet.getLastRow() === 1) {
    const tsData = [
      ['TS-001', 'High Bounce Rate', 'Bounce rate exceeds 3%, emails returning as undeliverable', '1. Pause affected campaigns immediately\n2. Review lead list quality\n3. Check if using catch-all domains\n4. Verify email validation was run\n5. Remove invalid emails and resume', 'Deliverability', 'P1', now, now],
      ['TS-002', 'Low Open Rates', 'Open rate below 20%, significantly below target', '1. Check subject line length (40-60 chars ideal)\n2. Review sender name and from address\n3. Check inbox placement via warmup tool\n4. A/B test new subject lines\n5. Verify send times match prospect timezone', 'Performance', 'P2', now, now],
      ['TS-003', 'Inbox Flagged', 'Email inbox marked as flagged in Instantly', '1. Immediately pause all campaigns using this inbox\n2. Check for spam complaints\n3. Review recent sending patterns\n4. Start warmup on replacement inbox\n5. Document incident and notify client if needed', 'Technical', 'P1', now, now]
    ];
    tsSheet.getRange(2, 1, tsData.length, tsData[0].length).setValues(tsData);
    Logger.log('Added sample Troubleshooting Guide entries');
  }

  Logger.log('Sample knowledge data added successfully!');
}

/**
 * Menu item to run from Google Sheets UI
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('XGrowthOS Setup')
    .addItem('Create CSM Suite Tabs', 'createCSMSuiteTabs')
    .addItem('Add Sample Knowledge Data', 'addSampleKnowledgeData')
    .addToUi();
}
