# XG-DOC-027: CSM Suite Engine Architecture

**Document Type:** Operations & Technical  
**Classification:** Internal / Partner-Shareable  
**Version:** 1.0  
**Last Updated:** January 24, 2026  
**Author:** XGrowthOS Engineering

---

## Executive Summary

The XGrowthOS CSM Suite consists of six interconnected automation engines designed to fundamentally transform client success operations. These engines replace manual, reactive workflows with automated, proactive systems—enabling a single Client Success Manager to effectively manage 20-25 accounts instead of the industry standard of 8-12.

This document provides technical and strategic context for each engine, including its purpose, operational logic, and business impact.

---

## The Six Engines at a Glance

| Engine | Name | Primary Function | Trigger Type |
|--------|------|------------------|--------------|
| **I** | The Informant | Automated Performance Reporting | Scheduled (Weekly) |
| **J** | The Judge | Issue Detection & Auto-Healing | Scheduled (Every 4 Hours) |
| **K** | The Keeper | AI-Powered Knowledge Retrieval | Webhook (On-Demand) |
| **L** | The Launcher | Automated Client Onboarding | Webhook + Scheduled |
| **M** | The Monitor | Churn Risk Detection & Intervention | Scheduled (Weekly) |
| **N** | The Navigator | Self-Serve Client Portal | Webhook (On-Demand) |

---

## Engine I: The Informant
### Automated Performance Reporting

**Purpose:**  
Eliminate the 30-45 minutes per client per week spent manually compiling performance data into reports. The Informant automatically generates executive-ready summaries with AI-powered insights.

**How It Works:**
1. Pulls campaign metrics from Instantly.ai (sends, opens, replies, bounces)
2. Retrieves meeting data from Calendly
3. Fetches inbox health status and deliverability scores
4. Aggregates data per client with week-over-week trend analysis
5. Generates AI-powered executive summary via GPT-4o
6. Formats branded HTML email with metrics dashboard
7. Delivers to client and logs to Report_History

**Trigger:** Every Sunday at 8:00 PM (Weekly)  
**Monthly Variant:** First of each month for extended trend analysis

**Data Sources:**
- Instantly.ai API (campaign analytics)
- Calendly API (meetings booked)
- Google Sheets (client roster, historical data)
- Internal health monitoring

**Output:**
- Branded HTML email to client
- Slack notification to #client-reports
- Historical record in Report_History sheet

**Business Impact:**
- **Time Saved:** 30-45 min/client/week → 0 min (fully automated)
- **Client Value:** Proactive transparency builds trust
- **Team Value:** Eliminates repetitive reporting work

---

## Engine J: The Judge
### Issue Detection & Auto-Healing

**Purpose:**  
Transform operations from reactive firefighting to proactive resolution. The Judge continuously monitors infrastructure health and automatically resolves common issues before clients notice them.

**How It Works:**
1. Fetches all inbox statuses from Instantly.ai
2. Retrieves campaign performance metrics
3. Checks domain health records (SPF, DKIM, DMARC, blacklists)
4. Analyzes data against defined thresholds
5. Detects anomalies and assigns severity (P1-P4)
6. Executes auto-fix actions where possible
7. Logs incidents and alerts appropriate channels

**Trigger:** Every 4 hours

**Monitoring Thresholds:**
| Metric | Warning | Critical |
|--------|---------|----------|
| Deliverability | < 95% | < 90% |
| Bounce Rate | > 2% | > 3% |
| Reply Rate Drop | > 15% WoW | > 25% WoW |
| Inbox Flagged | Any | — |
| Domain Blacklisted | Any | — |

**Auto-Fix Actions:**
- Rotate flagged inbox to backup
- Pause campaign on critical bounce rate
- Disable and replace compromised domain
- Flag for manual review (complex issues)

**Output:**
- Incident logged to Incident_Log sheet
- Critical alerts to #alerts-critical (with @channel)
- General alerts to #alerts-general
- Proactive client notification (when issues are resolved)

**Business Impact:**
- **Prevention:** Catch problems in hours, not days
- **Client Experience:** "We detected and fixed this" vs "Sorry it broke"
- **Reputation:** Demonstrates operational excellence

---

## Engine K: The Keeper
### AI-Powered Knowledge Brain

**Purpose:**  
Centralize institutional knowledge and provide instant answers to operational questions. The Keeper eliminates knowledge silos and reduces dependency on any single team member.

**How It Works:**
1. Receives query via webhook or Slack command
2. Parses and classifies query type (process, troubleshooting, metrics, client-specific)
3. Searches across all knowledge sources with relevance scoring
4. Retrieves top matching entries from:
   - Knowledge_Base (general articles)
   - SOPs (step-by-step procedures)
   - FAQ (common questions)
   - Troubleshooting_Guide (issue resolution)
5. Generates contextual answer via GPT-4o with citations
6. Returns response with confidence level
7. Logs query and detects knowledge gaps

**Trigger:** Webhook POST to `/keeper-query` or Slack `/ask` command

**Knowledge Sources:**
- Knowledge_Base: General operational knowledge
- SOPs: Step-by-step procedures
- FAQ: Frequently asked questions
- Troubleshooting_Guide: Issue diagnosis and resolution

**Confidence Levels:**
- **High:** Multiple relevant sources, exact match
- **Medium:** Partial match, related content
- **Low:** No strong matches → triggers knowledge gap alert

**Output:**
- JSON response with answer, confidence, sources
- Query logged to Query_Log
- Low-confidence queries flagged to Knowledge_Gaps
- Alert to #knowledge-gaps for documentation improvement

**Business Impact:**
- **Training:** New hires get instant answers
- **Consistency:** Same answer every time
- **Independence:** Team doesn't need to interrupt each other
- **Scalability:** Knowledge lives in the system, not in people

---

## Engine L: The Launcher
### Automated Client Onboarding

**Purpose:**  
Transform chaotic, manual onboarding into a streamlined, automated process. The Launcher guides clients through each phase while automatically provisioning accounts and sending reminders.

**How It Works:**

**Phase 1: Initialization**
1. Receives new client data via webhook
2. Generates unique client ID (XG-XXXXXX)
3. Creates records in Clients and Onboarding_Tracker sheets
4. Creates Google Drive folder for client assets
5. Sends branded welcome email with timeline and checklist
6. Notifies team on #new-clients

**Phase 2: Asset Collection**
- Tracks 5 required assets: ICP document, target list, company info, calendar link, logo
- Validates submissions automatically
- Sends escalating reminders at 24hr (friendly), 48hr (urgent), 72hr (final)

**Phase 3-7: Provisioning & Launch**
- Domain setup and warmup initiation
- CRM integration configuration
- Campaign design and copy creation
- Review cycle with client
- Launch execution

**Triggers:**
- Webhook POST to `/new-client` (initialization)
- Scheduled every 6 hours (reminder checks)
- Webhook POST to `/asset-submission` (validation)

**Onboarding Timeline:**
| Phase | Days | Auto-Actions |
|-------|------|--------------|
| Welcome | 0-1 | Email, folder creation, tracking |
| Assets | 1-3 | Reminders, validation |
| Domains | 3-5 | Provisioning requests |
| CRM | 5-7 | Integration setup |
| Campaign | 7-10 | Copy generation |
| Review | 10-12 | Client approval workflow |
| Launch | 12-14 | Activation, monitoring |

**Output:**
- Welcome email to client
- Client folder in Google Drive
- Records in Clients and Onboarding_Tracker
- Slack notifications for team visibility
- Automatic reminders until completion

**Business Impact:**
- **Time Saved:** 5-6 hours → 1-2 hours per onboarding
- **Consistency:** Every client gets the same professional experience
- **Speed:** Faster time-to-launch through automation
- **Visibility:** Real-time progress tracking

---

## Engine M: The Monitor
### Churn Risk Detection & Intervention

**Purpose:**  
Protect revenue through early warning detection. The Monitor analyzes behavioral and performance signals to identify at-risk accounts before they churn, enabling proactive intervention.

**How It Works:**
1. Retrieves all active clients
2. Pulls performance history, meeting logs, support tickets, communications
3. Calculates weighted risk signals for each account
4. Computes overall health score (0-100)
5. Classifies risk level (Healthy, At Risk, Critical)
6. Generates AI-powered intervention playbooks for at-risk accounts
7. Alerts appropriate channels based on severity
8. Produces weekly portfolio health summary

**Trigger:** Every Monday at 6:00 AM

**Risk Signal Weights:**
| Signal | Weight | High Risk Threshold |
|--------|--------|---------------------|
| Missed Calls | 25% | ≥50% no-show rate |
| Low Reply Rates | 20% | <1% or 50% drop |
| Negative Sentiment | 20% | ≥3 negative communications |
| Low Engagement | 15% | No portal login 14+ days |
| Support Spikes | 10% | ≥5 tickets in 2 weeks |
| Renewal Approaching | 10% | ≤30 days to renewal |

**Health Score Classification:**
- **Healthy (80-100):** No action needed
- **At Risk (50-79):** Proactive outreach recommended
- **Critical (<50):** Immediate intervention required

**Intervention Playbook (AI-Generated):**
- Immediate action (within 24 hours)
- Short-term plan (this week)
- Follow-up strategy (2 weeks)
- CSM talking points

**Output:**
- Health scores logged to Health_Score_History
- Intervention plans logged to Intervention_Plans
- Critical alerts to #alerts-critical
- At-risk alerts to #client-health
- Weekly summary to #leadership with ARR at risk

**Business Impact:**
- **Revenue Protection:** Early intervention saves accounts
- **Proactive Management:** Address issues before clients complain
- **Portfolio Visibility:** Leadership sees health at a glance
- **Data-Driven Decisions:** Prioritize time based on risk

---

## Engine N: The Navigator
### Self-Serve Client Portal

**Purpose:**  
Reduce administrative overhead by enabling clients to handle routine requests themselves. The Navigator provides a structured interface for common actions while routing complex requests for review.

**How It Works:**

**Request Categories:**
| Category | Examples | Processing |
|----------|----------|------------|
| **Instant** | Update ICP, pause campaign, download report | Auto-executed |
| **Review** | Upload leads, request copy change, schedule call | Requires approval |
| **Complex** | Add domain, major strategy change | Multi-step workflow |

**Instant Actions (Auto-Processed):**
- Update ICP or targeting criteria
- Update calendar booking link
- Pause or resume campaign
- Download latest performance report

**Review Actions (Approval Required):**
- Upload new lead list
- Request domain addition
- Request copy/messaging change
- Schedule strategy call

**Workflow:**
1. Client submits request via portal
2. System validates client access
3. Request logged to Portal_Requests
4. Routes based on category:
   - Instant → Execute immediately → Confirm to client
   - Review → Notify CSM on Slack → Await approval → Execute → Confirm
5. Status updates throughout process

**Triggers:**
- Webhook POST to `/client-portal` (submit request)
- Webhook POST to `/approve-request` (CSM approval)
- Webhook GET to `/request-status/:id` (status check)

**Output:**
- Request logged with full audit trail
- Slack notification to #client-requests (for review items)
- Confirmation email to client
- Status updates throughout lifecycle

**Business Impact:**
- **Time Saved:** Eliminates email ping-pong for simple requests
- **Client Satisfaction:** Faster turnaround, 24/7 availability
- **Focus Protection:** CSM time preserved for strategic work
- **Audit Trail:** Full visibility into all requests and actions

---

## System Architecture

### Data Flow
```
┌─────────────────────────────────────────────────────────────────┐
│                     GOOGLE SHEETS (Master Database)              │
│  ┌──────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────────┐ │
│  │ Clients  │ │ Report_History│ │ Incident_Log │ │ Knowledge_  │ │
│  └──────────┘ └──────────────┘ └──────────────┘ │    Base     │ │
│  ┌──────────┐ ┌──────────────┐ ┌──────────────┐ └─────────────┘ │
│  │Onboarding│ │Health_Score_ │ │Portal_       │ │ + 13 more   │ │
│  │ Tracker  │ │   History    │ │ Requests     │ │    tabs     │ │
│  └──────────┘ └──────────────┘ └──────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────┴─────────────────────────────────┐
│                         n8n WORKFLOW ENGINE                    │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────────┐  │
│  │    I      │ │    J      │ │    K      │ │      L        │  │
│  │ Informant │ │   Judge   │ │  Keeper   │ │   Launcher    │  │
│  └───────────┘ └───────────┘ └───────────┘ └───────────────┘  │
│  ┌───────────┐ ┌───────────┐                                   │
│  │    M      │ │    N      │                                   │
│  │  Monitor  │ │ Navigator │                                   │
│  └───────────┘ └───────────┘                                   │
└───────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Instantly.ai │      │    Slack     │      │   OpenAI     │
│   (Email)    │      │  (Alerts)    │      │  (GPT-4o)    │
└──────────────┘      └──────────────┘      └──────────────┘
```

### Environment Variables
| Variable | Purpose |
|----------|---------|
| `XGROWTHOS_MASTER_SHEET_ID` | Google Sheets document ID |
| `XGROWTHOS_CLIENTS_FOLDER_ID` | Google Drive folder for client files |
| `XGROWTHOS_PORTAL_URL` | Client portal base URL |
| `CALENDLY_USER_URI` | Calendly user identifier |

### Required Credentials
| Credential | Type | Used By |
|------------|------|---------|
| Google Sheets OAuth2 | OAuth2 | All engines |
| Google Drive OAuth2 | OAuth2 | L (Launcher) |
| Instantly API | HTTP Header Auth | I, J |
| OpenAI API | API Key | I, K, M |
| Slack OAuth2 | OAuth2 | All engines |
| Email SMTP | SMTP | I, L, N |

### Slack Channels
| Channel | Purpose | Engines |
|---------|---------|---------|
| #client-reports | Report delivery confirmations | I |
| #alerts-critical | P1 issues requiring immediate attention | J, M |
| #alerts-general | P2-P4 issues for awareness | J |
| #knowledge-gaps | Questions without confident answers | K |
| #new-clients | New client onboarding started | L |
| #onboarding | Onboarding progress updates | L |
| #client-health | At-risk account alerts | M |
| #leadership | Weekly portfolio summaries | M |
| #client-requests | Portal requests needing approval | N |

---

## Implementation Metrics

### Time Savings Per Engine
| Engine | Manual Time | Automated Time | Savings |
|--------|-------------|----------------|---------|
| I - Informant | 30-45 min/client/week | 0 | 100% |
| J - Judge | 2-3 hrs/day (firefighting) | 15 min/day (review) | 85% |
| K - Keeper | 15-30 min per question | <1 min | 95% |
| L - Launcher | 5-6 hrs/client | 1-2 hrs/client | 70% |
| M - Monitor | Not done (reactive) | Automated | N/A |
| N - Navigator | 10-15 min per request | 1-2 min | 85% |

### Capacity Impact
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Clients per CSM | 10-12 | 20-25 | 2x+ |
| Response time (issues) | Hours/Days | Minutes | 10x+ |
| Onboarding time | 5-6 hours | 1-2 hours | 3x |
| Knowledge retrieval | 15-30 min | <1 min | 15x+ |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 24, 2026 | Initial release with 6 core engines |

---

## Related Documents

- XG-DOC-008: Internal Process Documentation
- XG-DOC-009: Troubleshooting Guide
- XG-DOC-004: Performance Metrics Guide
- XG-DOC-005: Weekly Client Report Template

---

*This document is part of the XGrowthOS operational documentation suite. For questions or updates, contact the Engineering team.*
