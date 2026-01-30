# XG-DOC-041: System Architecture Diagram
## XGrowthOS Complete Data Flow & Infrastructure

**Document ID:** XG-DOC-041
**Category:** Technology & Integration
**Version:** 1.0
**Last Updated:** January 2026
**Classification:** INTERNAL

---

## Executive Summary

This document provides a comprehensive view of the XGrowthOS technical architecture, showing how all components—from prospect data to booked meetings—flow through the system. It covers the 11 AI engines, third-party integrations, and data storage infrastructure.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           XGROWTHOS ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │   CLIENT    │    │  PROSPECT   │    │   MEETING   │    │   REVENUE   │  │
│  │   PORTAL    │    │    DATA     │    │   BOOKED    │    │  GENERATED  │  │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘    └─────────────┘  │
│         │                  │                  │                             │
│         ▼                  ▼                  ▼                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    n8n CLOUD (WORKFLOW ENGINE)                        │  │
│  │  ┌────────────────────────┐    ┌─────────────────────────────────┐   │  │
│  │  │   LEAD GEN ENGINES     │    │      CSM AUTOMATION SUITE       │   │  │
│  │  │  A: Guardian           │    │      I: Informant               │   │  │
│  │  │  B: Architect          │    │      J: Judge                   │   │  │
│  │  │  C: Scientist          │    │      K: Keeper                  │   │  │
│  │  │  D: Hunter             │    │      L: Launcher                │   │  │
│  │  │  E: Sentinel           │    │      M: Monitor                 │   │  │
│  │  └────────────────────────┘    │      N: Navigator               │   │  │
│  │                                 └─────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│         │                  │                  │                             │
│         ▼                  ▼                  ▼                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                    │
│  │ Instantly.ai│    │  Supabase   │    │   Slack     │                    │
│  │  (Email)    │    │ (Database)  │    │  (Alerts)   │                    │
│  └─────────────┘    └─────────────┘    └─────────────┘                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Complete Data Flow

### End-to-End Journey: Prospect to Meeting

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        PROSPECT → MEETING DATA FLOW                          │
└──────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │   APOLLO    │ ──► Lead Data (Name, Email, Company, Title)
    │  /ZOOMINFO  │
    └──────┬──────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │  ENGINE A: THE GUARDIAN                                         │
    │  ┌───────────────────────────────────────────────────────────┐  │
    │  │ • Email verification (MX, syntax, deliverability)         │  │
    │  │ • DNC list checking                                       │  │
    │  │ • Domain health validation                                │  │
    │  │ • Compliance screening (GDPR/CCPA)                        │  │
    │  └───────────────────────────────────────────────────────────┘  │
    │  OUTPUT: Verified leads → Instantly.ai                          │
    └──────┬──────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │  ENGINE B: THE ARCHITECT                                        │
    │  ┌───────────────────────────────────────────────────────────┐  │
    │  │ • AI campaign copy generation (GPT-4)                     │  │
    │  │ • Personalization variables                               │  │
    │  │ • Sequence design (3-5 emails)                            │  │
    │  │ • Subject line variants                                   │  │
    │  └───────────────────────────────────────────────────────────┘  │
    │  OUTPUT: Campaign configured in Instantly.ai                    │
    └──────┬──────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │  INSTANTLY.AI                                                   │
    │  ┌───────────────────────────────────────────────────────────┐  │
    │  │ • Email sending via warmed domains                        │  │
    │  │ • Inbox rotation                                          │  │
    │  │ • Reply detection                                         │  │
    │  │ • Campaign analytics                                      │  │
    │  └───────────────────────────────────────────────────────────┘  │
    │  OUTPUT: Emails sent, opens/replies tracked                     │
    └──────┬──────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │  ENGINE C: THE SCIENTIST                                        │
    │  ┌───────────────────────────────────────────────────────────┐  │
    │  │ • A/B test analysis (Mon/Wed cycles)                      │  │
    │  │ • Subject line performance                                │  │
    │  │ • Open rate optimization                                  │  │
    │  │ • Reply rate tracking                                     │  │
    │  │ • Winner selection & deployment                           │  │
    │  └───────────────────────────────────────────────────────────┘  │
    │  OUTPUT: Optimized campaigns, performance data                  │
    └──────┬──────────────────────────────────────────────────────────┘
           │
           ├───────────────────────────────────────┐
           │                                       │
           ▼ (Positive Reply)                      ▼ (Meeting Booked)
    ┌────────────────────────┐              ┌────────────────────────┐
    │  ENGINE D: THE HUNTER  │              │      CALENDLY          │
    │  ┌──────────────────┐  │              │  ┌──────────────────┐  │
    │  │ • Analyze reply  │  │              │  │ • Meeting booked │  │
    │  │ • Find lookalikes│  │              │  │ • Details captured│  │
    │  │ • Expand in-co.  │  │              │  │ • CRM notification│  │
    │  │ • Launch new camp│  │              │  └──────────────────┘  │
    │  └──────────────────┘  │              └───────────┬────────────┘
    │  OUTPUT: 25-50 new     │                          │
    │  prospects identified  │                          ▼
    └────────────────────────┘              ┌────────────────────────┐
           │                                │   CLIENT CRM           │
           │                                │  (HubSpot/Salesforce)  │
           └─────────► LOOP BACK            │  ┌──────────────────┐  │
                       TO GUARDIAN          │  │ • Lead created   │  │
                                            │  │ • Meeting logged │  │
                                            │  │ • Deal tracked   │  │
                                            │  └──────────────────┘  │
                                            └────────────────────────┘
```

---

## Website Visitor Intelligence Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        ENGINE E: THE SENTINEL                                 │
└──────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │  CLIENT     │ ──► Tracking pixel/script installed
    │  WEBSITE    │
    └──────┬──────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │  VISITOR IDENTIFICATION SERVICE                                 │
    │  (RB2B / Clearbit Reveal / Similar)                            │
    │  ┌───────────────────────────────────────────────────────────┐  │
    │  │ • IP-to-Company reverse lookup                            │  │
    │  │ • Company firmographics                                   │  │
    │  │ • Page visit tracking                                     │  │
    │  │ • Intent signals                                          │  │
    │  └───────────────────────────────────────────────────────────┘  │
    └──────┬──────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │  THE SENTINEL (n8n Workflow)                                    │
    │  ┌───────────────────────────────────────────────────────────┐  │
    │  │ • ICP match scoring                                       │  │
    │  │ • Contact enrichment (Apollo/ZoomInfo)                    │  │
    │  │ • Find 8-15 decision-makers per company                   │  │
    │  │ • Dedupe against existing prospects                       │  │
    │  └───────────────────────────────────────────────────────────┘  │
    │  OUTPUT: High-intent prospects identified                       │
    └──────┬──────────────────────────────────────────────────────────┘
           │
           ▼
    ┌─────────────┐
    │  GUARDIAN   │ ──► Verification & Campaign Assignment
    └─────────────┘
```

---

## CSM Automation Suite Data Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         CSM AUTOMATION SUITE                                  │
└──────────────────────────────────────────────────────────────────────────────┘

                    ┌──────────────────┐
                    │    TRIGGERS      │
                    └────────┬─────────┘
                             │
    ┌────────────────────────┼────────────────────────┐
    │                        │                        │
    ▼ (Scheduled)            ▼ (Webhook)              ▼ (Scheduled)
┌─────────────┐       ┌─────────────┐         ┌─────────────┐
│  INFORMANT  │       │   KEEPER    │         │   JUDGE     │
│  (Weekly)   │       │ (On-Demand) │         │ (4 Hours)   │
└──────┬──────┘       └──────┬──────┘         └──────┬──────┘
       │                     │                       │
       ▼                     ▼                       ▼
┌─────────────┐       ┌─────────────┐         ┌─────────────┐
│  Weekly     │       │  Instant    │         │  Issue      │
│  Reports    │       │  Answers    │         │  Detection  │
│  → Clients  │       │  → Team     │         │  → Alerts   │
└─────────────┘       └─────────────┘         └─────────────┘

    ▼ (Webhook)            ▼ (Scheduled)           ▼ (Webhook)
┌─────────────┐       ┌─────────────┐         ┌─────────────┐
│  LAUNCHER   │       │   MONITOR   │         │  NAVIGATOR  │
│ (New Client)│       │  (Weekly)   │         │ (On-Demand) │
└──────┬──────┘       └──────┬──────┘         └──────┬──────┘
       │                     │                       │
       ▼                     ▼                       ▼
┌─────────────┐       ┌─────────────┐         ┌─────────────┐
│  Automated  │       │  Churn Risk │         │  Self-Serve │
│  Onboarding │       │  Detection  │         │  Requests   │
│  → Clients  │       │  → CSM      │         │  → Actions  │
└─────────────┘       └─────────────┘         └─────────────┘
```

---

## Technology Stack Detail

### Application Layer

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           APPLICATION LAYER                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                     NEXT.JS 14+ APPLICATION                         │   │
│   │  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────┐   │   │
│   │  │   MARKETING   │  │    CLIENT     │  │        ADMIN          │   │   │
│   │  │    WEBSITE    │  │    PORTAL     │  │       PORTAL          │   │   │
│   │  │               │  │               │  │                       │   │   │
│   │  │ • Homepage    │  │ • Dashboard   │  │ • Client management   │   │   │
│   │  │ • Pricing     │  │ • Campaigns   │  │ • Workflow control    │   │   │
│   │  │ • How It Works│  │ • Analytics   │  │ • Performance view    │   │   │
│   │  │ • Contact     │  │ • Settings    │  │ • System health       │   │   │
│   │  └───────────────┘  └───────────────┘  └───────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         UI COMPONENTS                                │   │
│   │  • shadcn/ui (component library)                                    │   │
│   │  • Tailwind CSS (styling)                                           │   │
│   │  • Framer Motion (animations)                                       │   │
│   │  • Recharts (data visualization)                                    │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Backend Services

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND SERVICES                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        SUPABASE                                      │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐   │   │
│   │  │  POSTGRESQL  │  │     AUTH     │  │      EDGE FUNCTIONS      │   │   │
│   │  │  (Database)  │  │   (Users)    │  │    (Serverless APIs)     │   │   │
│   │  │              │  │              │  │                          │   │   │
│   │  │ • Clients    │  │ • Client auth│  │ • Webhook handlers       │   │   │
│   │  │ • Campaigns  │  │ • Admin auth │  │ • n8n callbacks          │   │   │
│   │  │ • Metrics    │  │ • Sessions   │  │ • Stripe webhooks        │   │   │
│   │  │ • Leads      │  │ • JWT tokens │  │                          │   │   │
│   │  └──────────────┘  └──────────────┘  └──────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        n8n CLOUD                                     │   │
│   │  ┌──────────────────────────────────────────────────────────────┐   │   │
│   │  │  WORKFLOW ORCHESTRATION                                       │   │   │
│   │  │  • 11 AI engine workflows                                     │   │   │
│   │  │  • Scheduled triggers (cron)                                  │   │   │
│   │  │  • Webhook triggers                                           │   │   │
│   │  │  • Error handling & retries                                   │   │   │
│   │  │  • Workflow versioning                                        │   │   │
│   │  └──────────────────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Third-Party Integrations

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         THIRD-PARTY INTEGRATIONS                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌───────────────────────────────────────────────────────────────────────┐ │
│   │                    EMAIL INFRASTRUCTURE                                │ │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│   │  │ Instantly.ai│  │   Domain    │  │   Mailgun   │  │   AWS SES   │  │ │
│   │  │ (Primary)   │  │  Registrars │  │  (Backup)   │  │  (Transact) │  │ │
│   │  │             │  │             │  │             │  │             │  │ │
│   │  │ • Campaigns │  │ • GoDaddy   │  │ • Alerts    │  │ • Welcome   │  │ │
│   │  │ • Warmup    │  │ • Namecheap │  │ • Reports   │  │ • Receipts  │  │ │
│   │  │ • Analytics │  │ • Cloudflare│  │             │  │             │  │ │
│   │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│   └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│   ┌───────────────────────────────────────────────────────────────────────┐ │
│   │                    DATA & ENRICHMENT                                   │ │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│   │  │  Apollo.io  │  │  ZoomInfo   │  │   Clearbit  │  │    RB2B     │  │ │
│   │  │             │  │ (Optional)  │  │  (Enrich)   │  │ (Visitors)  │  │ │
│   │  │             │  │             │  │             │  │             │  │ │
│   │  │ • Lead data │  │ • Enterprise│  │ • Company   │  │ • Website   │  │ │
│   │  │ • Email find│  │ • Accuracy  │  │   data      │  │   visitors  │  │ │
│   │  │ • Company   │  │             │  │             │  │             │  │ │
│   │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│   └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│   ┌───────────────────────────────────────────────────────────────────────┐ │
│   │                    SCHEDULING & CRM                                    │ │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│   │  │  Calendly   │  │  HubSpot    │  │ Salesforce  │  │  Pipedrive  │  │ │
│   │  │             │  │  (Primary)  │  │ (Enterprise)│  │  (SMB)      │  │ │
│   │  │             │  │             │  │             │  │             │  │ │
│   │  │ • Booking   │  │ • Leads     │  │ • Leads     │  │ • Leads     │  │ │
│   │  │ • Calendar  │  │ • Deals     │  │ • Deals     │  │ • Deals     │  │ │
│   │  │ • Reminders │  │ • Contacts  │  │ • Contacts  │  │ • Contacts  │  │ │
│   │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│   └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│   ┌───────────────────────────────────────────────────────────────────────┐ │
│   │                    AI & COMMUNICATION                                  │ │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │ │
│   │  │   OpenAI    │  │    Slack    │  │  Telegram   │  │    Stripe   │  │ │
│   │  │  (GPT-4)    │  │  (Primary)  │  │ (Optional)  │  │  (Billing)  │  │ │
│   │  │             │  │             │  │             │  │             │  │ │
│   │  │ • Copy gen  │  │ • Alerts    │  │ • Alerts    │  │ • Subs      │  │ │
│   │  │ • Analysis  │  │ • Commands  │  │ • Reports   │  │ • Invoicing │  │ │
│   │  │ • Reports   │  │ • Reports   │  │             │  │ • Webhooks  │  │ │
│   │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │ │
│   └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Database Schema (Supabase)

### Core Tables

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           DATABASE SCHEMA                                     │
└──────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  CLIENTS                                                                     │
│  ├─ id (uuid, PK)                                                           │
│  ├─ client_id (text, unique) - XG-XXXXXX                                    │
│  ├─ company_name (text)                                                     │
│  ├─ contact_name (text)                                                     │
│  ├─ contact_email (text)                                                    │
│  ├─ plan_type (enum: founding_partner, official)                            │
│  ├─ status (enum: onboarding, active, paused, churned)                      │
│  ├─ start_date (date)                                                       │
│  ├─ renewal_date (date)                                                     │
│  ├─ instantly_workspace_id (text)                                           │
│  ├─ crm_type (enum: hubspot, salesforce, pipedrive, none)                   │
│  ├─ crm_integration_id (text)                                               │
│  ├─ calendly_link (text)                                                    │
│  ├─ slack_channel_id (text)                                                 │
│  ├─ created_at (timestamp)                                                  │
│  └─ updated_at (timestamp)                                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  CAMPAIGNS                                                                   │
│  ├─ id (uuid, PK)                                                           │
│  ├─ client_id (uuid, FK → clients)                                          │
│  ├─ campaign_name (text)                                                    │
│  ├─ instantly_campaign_id (text)                                            │
│  ├─ status (enum: draft, warming, active, paused, completed)                │
│  ├─ icp_description (text)                                                  │
│  ├─ target_industries (text[])                                              │
│  ├─ target_titles (text[])                                                  │
│  ├─ sequence_count (int)                                                    │
│  ├─ leads_count (int)                                                       │
│  ├─ created_at (timestamp)                                                  │
│  └─ updated_at (timestamp)                                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  CAMPAIGN_METRICS (Daily Snapshots)                                          │
│  ├─ id (uuid, PK)                                                           │
│  ├─ campaign_id (uuid, FK → campaigns)                                      │
│  ├─ date (date)                                                             │
│  ├─ emails_sent (int)                                                       │
│  ├─ opens (int)                                                             │
│  ├─ replies (int)                                                           │
│  ├─ bounces (int)                                                           │
│  ├─ positive_replies (int)                                                  │
│  ├─ meetings_booked (int)                                                   │
│  ├─ open_rate (decimal)                                                     │
│  ├─ reply_rate (decimal)                                                    │
│  └─ created_at (timestamp)                                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  MEETINGS                                                                    │
│  ├─ id (uuid, PK)                                                           │
│  ├─ client_id (uuid, FK → clients)                                          │
│  ├─ campaign_id (uuid, FK → campaigns)                                      │
│  ├─ prospect_email (text)                                                   │
│  ├─ prospect_name (text)                                                    │
│  ├─ prospect_company (text)                                                 │
│  ├─ prospect_title (text)                                                   │
│  ├─ meeting_datetime (timestamp)                                            │
│  ├─ calendly_event_id (text)                                                │
│  ├─ status (enum: scheduled, completed, no_show, cancelled)                 │
│  ├─ qualified (boolean)                                                     │
│  ├─ bonus_invoiced (boolean)                                                │
│  └─ created_at (timestamp)                                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  DOMAINS                                                                     │
│  ├─ id (uuid, PK)                                                           │
│  ├─ client_id (uuid, FK → clients)                                          │
│  ├─ domain_name (text)                                                      │
│  ├─ status (enum: warming, active, flagged, retired)                        │
│  ├─ spf_status (boolean)                                                    │
│  ├─ dkim_status (boolean)                                                   │
│  ├─ dmarc_status (boolean)                                                  │
│  ├─ warmup_start_date (date)                                                │
│  ├─ warmup_complete_date (date)                                             │
│  ├─ last_health_check (timestamp)                                           │
│  └─ blacklist_status (boolean)                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  INCIDENTS                                                                   │
│  ├─ id (uuid, PK)                                                           │
│  ├─ client_id (uuid, FK → clients)                                          │
│  ├─ severity (enum: P1, P2, P3, P4)                                         │
│  ├─ type (text)                                                             │
│  ├─ description (text)                                                      │
│  ├─ auto_resolved (boolean)                                                 │
│  ├─ resolution (text)                                                       │
│  ├─ detected_at (timestamp)                                                 │
│  └─ resolved_at (timestamp)                                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  HEALTH_SCORES                                                               │
│  ├─ id (uuid, PK)                                                           │
│  ├─ client_id (uuid, FK → clients)                                          │
│  ├─ score (int, 0-100)                                                      │
│  ├─ risk_level (enum: healthy, at_risk, critical)                           │
│  ├─ signals (jsonb)                                                         │
│  ├─ intervention_plan (text)                                                │
│  └─ calculated_at (timestamp)                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints (n8n Webhooks)

### Lead Generation APIs

| Endpoint | Method | Purpose | Trigger |
|----------|--------|---------|---------|
| `/guardian-verify` | POST | Verify lead list | On upload |
| `/architect-create` | POST | Generate campaign | On request |
| `/scientist-analyze` | POST | A/B test analysis | Scheduled |
| `/hunter-expand` | POST | Expand from reply | On positive reply |
| `/sentinel-process` | POST | Process visitor | On identification |

### CSM Suite APIs

| Endpoint | Method | Purpose | Trigger |
|----------|--------|---------|---------|
| `/informant-report` | POST | Generate report | Weekly (Sunday 8PM) |
| `/judge-monitor` | POST | Health check | Every 4 hours |
| `/keeper-query` | POST | Knowledge lookup | On-demand |
| `/launcher-init` | POST | Start onboarding | On new client |
| `/monitor-score` | POST | Calculate health | Weekly (Monday 6AM) |
| `/navigator-request` | POST | Portal request | On-demand |

### Integration Webhooks

| Endpoint | Method | Purpose | Source |
|----------|--------|---------|--------|
| `/calendly-event` | POST | Meeting booked | Calendly |
| `/instantly-reply` | POST | Reply detected | Instantly.ai |
| `/stripe-webhook` | POST | Payment event | Stripe |
| `/hubspot-contact` | POST | CRM sync | HubSpot |

---

## Environment Configuration

### Required Environment Variables

```bash
# Application
NEXT_PUBLIC_APP_URL=https://xgrowthos.com
NODE_ENV=production

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# n8n
N8N_WEBHOOK_URL=https://marcosmatthews.app.n8n.cloud/webhook
N8N_API_KEY=n8n_api_xxx

# Instantly.ai
INSTANTLY_API_KEY=xxx
INSTANTLY_WORKSPACE_ID=xxx

# Apollo.io
APOLLO_API_KEY=xxx

# OpenAI
OPENAI_API_KEY=sk-xxx

# Calendly
CALENDLY_API_KEY=xxx
CALENDLY_WEBHOOK_SECRET=xxx

# Slack
SLACK_BOT_TOKEN=xoxb-xxx
SLACK_SIGNING_SECRET=xxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# Email
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=xxx
SMTP_PASS=xxx
```

---

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         DEPLOYMENT ARCHITECTURE                               │
└──────────────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────────────────────┐
                    │           CLOUDFLARE DNS            │
                    │         (xgrowthos.com)             │
                    └─────────────────┬───────────────────┘
                                      │
                    ┌─────────────────┴───────────────────┐
                    │            VERCEL EDGE              │
                    │    (Next.js Application Hosting)    │
                    │                                     │
                    │  ┌─────────────────────────────┐   │
                    │  │ • SSR/SSG pages             │   │
                    │  │ • API routes                │   │
                    │  │ • Edge middleware           │   │
                    │  │ • Image optimization        │   │
                    │  └─────────────────────────────┘   │
                    └─────────────────┬───────────────────┘
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           │                          │                          │
           ▼                          ▼                          ▼
    ┌─────────────┐            ┌─────────────┐           ┌─────────────┐
    │  SUPABASE   │            │  n8n CLOUD  │           │   STRIPE    │
    │  (AWS)      │            │  (Hetzner)  │           │             │
    │             │            │             │           │             │
    │ • Database  │            │ • Workflows │           │ • Payments  │
    │ • Auth      │            │ • Crons     │           │ • Billing   │
    │ • Storage   │            │ • Webhooks  │           │             │
    └─────────────┘            └─────────────┘           └─────────────┘
```

---

## Security Architecture

### Authentication Flow

```
┌────────────┐         ┌────────────┐         ┌────────────┐
│   CLIENT   │         │   VERCEL   │         │  SUPABASE  │
│  BROWSER   │         │  (Next.js) │         │   (Auth)   │
└──────┬─────┘         └──────┬─────┘         └──────┬─────┘
       │                      │                      │
       │  1. Login Request    │                      │
       │─────────────────────>│                      │
       │                      │  2. Auth Request     │
       │                      │─────────────────────>│
       │                      │                      │
       │                      │  3. JWT Token        │
       │                      │<─────────────────────│
       │                      │                      │
       │  4. Set Cookie       │                      │
       │<─────────────────────│                      │
       │                      │                      │
       │  5. Authenticated    │                      │
       │      Requests        │  6. Validate JWT     │
       │─────────────────────>│─────────────────────>│
       │                      │                      │
```

### Data Access Control

| Layer | Protection |
|-------|------------|
| **Network** | Cloudflare WAF, DDoS protection |
| **Application** | Supabase Auth, JWT validation |
| **Database** | Row Level Security (RLS) policies |
| **API** | API key authentication, rate limiting |
| **Secrets** | Environment variables, never exposed client-side |

---

## Monitoring & Observability

### Key Metrics

| System | Metrics Tracked |
|--------|-----------------|
| **Vercel** | Request latency, error rates, build times |
| **Supabase** | Query performance, connection pool, storage |
| **n8n** | Workflow executions, success/failure rates |
| **Instantly** | Deliverability, bounces, complaints |

### Alert Channels

| Severity | Channel | Response Time |
|----------|---------|---------------|
| P1 (Critical) | #alerts-critical + SMS | 15 minutes |
| P2 (High) | #alerts-critical | 1 hour |
| P3 (Medium) | #alerts-general | 4 hours |
| P4 (Low) | #alerts-general | Next business day |

---

## Related Documents

- [XG-DOC-027](XG-DOC-027-CSM-Suite-Engine-Architecture.md): CSM Suite Engine Architecture
- [XG-DOC-042](XG-DOC-042-Lead-Gen-Engine-Specs.md): Lead Generation Engine Specs (A-H)
- [XG-DOC-043](XG-DOC-043-Integration-Documentation.md): Integration Documentation
- [XG-DOC-014](XG-DOC-014-Website-Specification.md): Website Specification

---

*XGrowthOS - Autonomous B2B Lead Generation Platform*
*Document Version 1.0 | January 2026*
