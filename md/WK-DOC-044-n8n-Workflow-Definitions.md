# WK-DOC-044: n8n Workflow Definitions
## Automation Workflow Specifications

**Document ID:** WK-DOC-044
**Category:** Technology
**Version:** 1.0
**Last Updated:** January 2026
**Classification:** INTERNAL

---

## Executive Summary

This document provides detailed specifications for all 11 Wryko n8n workflows, including triggers, node configurations, and error handling.

---

## Workflow Overview

### Instance Details

| Attribute | Value |
|-----------|-------|
| Platform | n8n Cloud |
| URL | https://marcosmatthews.app.n8n.cloud |
| Plan | Pro (or higher) |
| Timezone | America/Los_Angeles |

### All Workflows

| ID | Engine | Trigger | Schedule |
|----|--------|---------|----------|
| WF-001 | Guardian - Verify | Webhook | On demand |
| WF-002 | Guardian - Health | Schedule | Daily 6 AM |
| WF-003 | Architect | Webhook | On demand |
| WF-004 | Scientist | Schedule | Mon/Wed 6 AM |
| WF-005 | Hunter | Webhook | On reply |
| WF-006 | Sentinel | Webhook | On visitor |
| WF-007 | Informant | Schedule | Sunday 8 PM |
| WF-008 | Judge | Schedule | Every 4 hours |
| WF-009 | Keeper | Webhook | On demand |
| WF-010 | Launcher | Webhook + Schedule | On new client |
| WF-011 | Monitor | Schedule | Monday 6 AM |
| WF-012 | Navigator | Webhook | On demand |

---

## WF-001: Guardian - Lead Verification

### Purpose
Verify email lists before campaign launch.

### Trigger
```
Type: Webhook
Method: POST
Path: /guardian-verify
Authentication: Header Auth
```

### Input Schema
```json
{
  "client_id": "string",
  "leads": [
    {
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "company": "string",
      "title": "string"
    }
  ]
}
```

### Workflow Nodes

```
[Webhook] → [Split Leads] → [Verify Email] → [Check DNC] →
[Merge Results] → [Update Database] → [Send Response]
```

| Node | Type | Configuration |
|------|------|---------------|
| Webhook | Trigger | POST /guardian-verify |
| Split Leads | SplitInBatches | Batch size: 100 |
| Verify Email | HTTP Request | NeverBounce API |
| Check DNC | Google Sheets | DNC_List tab |
| Merge Results | Merge | Wait for all |
| Update Database | Supabase | Insert verified leads |
| Send Response | Respond to Webhook | Return results |

### Output Schema
```json
{
  "success": true,
  "total": 1000,
  "verified": 850,
  "invalid": 100,
  "dnc": 50,
  "leads": [...]
}
```

### Error Handling
- NeverBounce rate limit → Retry with delay
- API failure → Log error, alert Slack, return partial

---

## WF-002: Guardian - Domain Health

### Purpose
Monitor sending domain health daily.

### Trigger
```
Type: Schedule
Cron: 0 6 * * *
Timezone: America/Los_Angeles
```

### Workflow Nodes

```
[Schedule] → [Get Active Domains] → [For Each Domain] →
[Check SPF] → [Check DKIM] → [Check Blacklists] →
[Calculate Score] → [Update Database] → [Alert if Issues]
```

| Node | Type | Purpose |
|------|------|---------|
| Get Active Domains | Supabase | Query domains table |
| Check SPF | HTTP Request | DNS lookup |
| Check DKIM | HTTP Request | DNS lookup |
| Check Blacklists | HTTP Request | MXToolbox API |
| Calculate Score | Code | Compute health score |
| Update Database | Supabase | Update domain status |
| Alert if Issues | Slack | Post to #alerts-critical |

### Alert Conditions
- Any blacklist = P1 alert
- SPF/DKIM missing = P2 alert
- Health score <70 = P3 alert

---

## WF-003: Architect - Campaign Creation

### Purpose
Generate AI-powered campaign copy.

### Trigger
```
Type: Webhook
Method: POST
Path: /architect-create
```

### Input Schema
```json
{
  "client_id": "string",
  "campaign_name": "string",
  "icp": {
    "industries": ["string"],
    "titles": ["string"],
    "company_size": "string"
  },
  "value_proposition": "string",
  "tone": "string",
  "sequence_length": 4
}
```

### Workflow Nodes

```
[Webhook] → [Get Client Data] → [Get Templates] →
[Generate with GPT-4] → [Quality Check] →
[Create in Instantly] → [Update Database] → [Notify CSM]
```

| Node | Type | Configuration |
|------|------|---------------|
| Get Client Data | Supabase | Client preferences |
| Get Templates | Google Sheets | Master Library |
| Generate with GPT-4 | OpenAI | GPT-4o, custom prompt |
| Quality Check | Code | Spam score, length, etc. |
| Create in Instantly | HTTP Request | Instantly API |
| Update Database | Supabase | Log campaign |
| Notify CSM | Slack | #campaign-launches |

### GPT-4 Prompt Template
```
You are a cold email copywriter. Create a {{sequence_length}}-email
sequence for:

Target: {{icp.titles}} at {{icp.industries}} companies
Value prop: {{value_proposition}}
Tone: {{tone}}

Requirements:
- Each email under 100 words
- Clear CTA in each email
- Personalization variables: {{first_name}}, {{company}}
- 3 subject line variants for email 1

Return JSON format with subject_lines[], emails[]
```

---

## WF-004: Scientist - A/B Testing

### Purpose
Analyze A/B tests and deploy winners.

### Trigger
```
Type: Schedule
Cron: 0 6 * * 1,3  (Monday and Wednesday)
```

### Workflow Nodes

```
[Schedule] → [Get Active Tests] → [For Each Test] →
[Pull Analytics] → [Calculate Significance] →
[Determine Winner] → [Deploy Winner] → [Log Results] → [Report]
```

| Node | Type | Purpose |
|------|------|---------|
| Get Active Tests | Google Sheets | Experiments_Log |
| Pull Analytics | HTTP Request | Instantly API |
| Calculate Significance | Code | Statistical analysis |
| Determine Winner | IF | >95% confidence |
| Deploy Winner | HTTP Request | Update Instantly |
| Log Results | Google Sheets | Update Experiments_Log |
| Report | Slack | #campaign-optimization |

### Statistical Logic
```javascript
// Chi-squared test for significance
function isSignificant(variantA, variantB) {
  // Minimum sample: 100 per variant
  if (variantA.sends < 100 || variantB.sends < 100) {
    return { significant: false, reason: 'insufficient_sample' };
  }

  // Calculate chi-squared
  // Return if >95% confidence
}
```

---

## WF-005: Hunter - Lead Expansion

### Purpose
Expand leads from positive replies.

### Trigger
```
Type: Webhook
Method: POST
Path: /hunter-expand
Source: Instantly reply webhook
```

### Input Schema
```json
{
  "reply_id": "string",
  "email": "string",
  "company": "string",
  "sentiment": "positive|neutral|negative"
}
```

### Workflow Nodes

```
[Webhook] → [Classify Reply] → [IF Positive] →
[Get Company Data] → [Find Similar Companies] →
[Find Contacts] → [Dedupe] → [Queue for Guardian] → [Log]
```

| Node | Type | Purpose |
|------|------|---------|
| Classify Reply | OpenAI | Sentiment analysis |
| IF Positive | IF | Route based on sentiment |
| Get Company Data | HTTP Request | Apollo company lookup |
| Find Similar Companies | HTTP Request | Apollo search |
| Find Contacts | HTTP Request | Apollo contacts |
| Dedupe | Code | Check against existing |
| Queue for Guardian | Webhook | Trigger verification |
| Log | Supabase | Expansion_Log table |

### Expansion Rules
- In-company: Find 5-10 additional contacts
- Lookalikes: Find 10-20 similar companies
- 2-5 contacts per lookalike company
- Target total: 25-50 new leads per positive reply

---

## WF-006: Sentinel - Visitor Processing

### Purpose
Process identified website visitors.

### Trigger
```
Type: Webhook
Method: POST
Path: /sentinel-process
Source: RB2B/Clearbit webhook
```

### Workflow Nodes

```
[Webhook] → [Enrich Company] → [Score Intent] →
[IF High Intent] → [Find Contacts] → [Check ICP Match] →
[Queue for Campaign] → [Log] → [Alert]
```

| Node | Type | Purpose |
|------|------|---------|
| Enrich Company | HTTP Request | Clearbit API |
| Score Intent | Code | Calculate intent score |
| IF High Intent | IF | Score >60 |
| Find Contacts | HTTP Request | Apollo API |
| Check ICP Match | Code | Match against ICP |
| Queue for Campaign | Supabase | Add to outreach queue |
| Log | Supabase | Visitors_Log |
| Alert | Slack | #website-visitors |

---

## WF-007: Informant - Weekly Reports

### Purpose
Generate and send weekly client reports.

### Trigger
```
Type: Schedule
Cron: 0 20 * * 0  (Sunday 8 PM)
```

### Workflow Nodes

```
[Schedule] → [Get Active Clients] → [For Each Client] →
[Pull Instantly Metrics] → [Pull Calendly Data] →
[Calculate Trends] → [Generate AI Summary] →
[Create HTML Email] → [Send Email] → [Log] → [Notify]
```

| Node | Type | Configuration |
|------|------|---------------|
| Get Active Clients | Supabase | status = 'active' |
| Pull Instantly Metrics | HTTP Request | Instantly analytics |
| Pull Calendly Data | HTTP Request | Calendly API |
| Calculate Trends | Code | Week-over-week |
| Generate AI Summary | OpenAI | Executive summary |
| Create HTML Email | HTML Template | Branded template |
| Send Email | Email | SMTP or service |
| Log | Google Sheets | Report_History |
| Notify | Slack | #client-reports |

---

## WF-008: Judge - Health Monitoring

### Purpose
Continuous system and campaign health checks.

### Trigger
```
Type: Schedule
Cron: 0 */4 * * *  (Every 4 hours)
```

### Workflow Nodes

```
[Schedule] → [Get All Inboxes] → [Check Each Inbox] →
[Get Campaign Metrics] → [Check Thresholds] →
[Identify Issues] → [Auto-Fix if Possible] →
[Log Incidents] → [Alert Team]
```

### Auto-Fix Actions
```javascript
const autoFixes = {
  'inbox_flagged': async () => {
    // Rotate to backup inbox
    // Pause affected campaigns
  },
  'high_bounce': async () => {
    // Pause campaign
    // Alert for list review
  },
  'domain_blacklisted': async () => {
    // Disable domain
    // Switch to backup
  }
};
```

---

## WF-009: Keeper - Knowledge Query

### Purpose
Answer questions from knowledge base.

### Trigger
```
Type: Webhook
Method: POST
Path: /keeper-query
```

### Input Schema
```json
{
  "query": "string",
  "source": "slack|portal|api",
  "user": "string"
}
```

### Workflow Nodes

```
[Webhook] → [Classify Query] → [Search Knowledge Base] →
[Rank Results] → [Generate Answer with GPT-4] →
[Return Response] → [Log Query]
```

### Knowledge Sources
- Knowledge_Base (general)
- SOPs (procedures)
- FAQ (common questions)
- Troubleshooting_Guide

---

## WF-010: Launcher - Onboarding

### Purpose
Automate client onboarding process.

### Triggers
```
Type: Webhook (initialization)
Path: /launcher-init

Type: Schedule (reminders)
Cron: 0 */6 * * *  (Every 6 hours)
```

### Workflow Nodes (Initialization)
```
[Webhook] → [Generate Client ID] → [Create Records] →
[Create Drive Folder] → [Send Welcome Email] →
[Notify Team] → [Start Tracking]
```

### Workflow Nodes (Reminders)
```
[Schedule] → [Get Pending Assets] → [For Each Client] →
[Check Overdue] → [Send Appropriate Reminder] → [Log]
```

---

## WF-011: Monitor - Churn Risk

### Purpose
Weekly churn risk scoring.

### Trigger
```
Type: Schedule
Cron: 0 6 * * 1  (Monday 6 AM)
```

### Workflow Nodes

```
[Schedule] → [Get Active Clients] → [For Each Client] →
[Pull All Signals] → [Calculate Risk Score] →
[Classify Risk Level] → [Generate Playbook (if at risk)] →
[Update Database] → [Alert Team] → [Weekly Summary]
```

### Risk Signal Weights
```javascript
const weights = {
  missed_calls: 0.25,
  low_reply_rate: 0.20,
  negative_sentiment: 0.20,
  low_engagement: 0.15,
  support_spikes: 0.10,
  renewal_approaching: 0.10
};
```

---

## WF-012: Navigator - Portal Requests

### Purpose
Handle self-serve client requests.

### Trigger
```
Type: Webhook
Method: POST
Path: /navigator-request
```

### Workflow Nodes

```
[Webhook] → [Validate Client] → [Categorize Request] →
[IF Instant] → [Execute Immediately] → [Confirm]
[IF Review] → [Notify CSM] → [Await Approval] → [Execute]
```

### Request Categories
- Instant: ICP update, pause campaign, download report
- Review: Add leads, change copy, add domain

---

## Error Handling Standards

### Retry Policy

| Error Type | Retries | Delay |
|------------|---------|-------|
| API timeout | 3 | Exponential (1s, 2s, 4s) |
| Rate limit | 5 | Wait for reset |
| Auth failure | 0 | Alert immediately |
| Server error | 3 | Fixed 30s |

### Alerting

| Severity | Channel | Notification |
|----------|---------|--------------|
| Critical | #alerts-critical | @channel |
| Warning | #alerts-general | Standard |
| Info | #alerts-general | No ping |

### Logging

All workflows log to:
- Supabase: Workflow_Logs table
- n8n: Execution history
- Slack: Relevant channel

---

## Deployment Process

### Workflow Updates

1. Export workflow JSON from dev
2. Review changes
3. Import to production
4. Test with sample data
5. Monitor first executions

### Version Control

- Export workflows weekly to `/engines` folder
- Name format: `WF-XXX-EngineName-v1.0.json`
- Document changes in commit message

---

*Wryko - Autonomous B2B Lead Generation Platform*
*Document Version 1.0 | January 2026*
