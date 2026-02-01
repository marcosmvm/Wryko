# WK-DOC-046: Dashboard Specifications
## Client Portal & Admin Dashboard Design

**Document ID:** WK-DOC-046
**Category:** Technology
**Version:** 1.0
**Last Updated:** January 2026

---

## Executive Summary

This document specifies the requirements for the Wryko client portal and admin dashboard, including layouts, metrics, and functionality.

---

## Client Portal Dashboard

### Overview

**Purpose:** Self-serve portal for clients to view performance, manage settings, and access resources.

**URL:** app.wryko.com/dashboard

**Access:** Client email authentication (magic link)

---

### Dashboard Home

#### Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Wryko                          [Client Name ▼]      [Settings] [Help]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Welcome back, [First Name]!                   📅 Last updated: [Date/Time] │
│                                                                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌────────────┐│
│  │  MEETINGS THIS  │ │   REPLY RATE    │ │   OPEN RATE     │ │  EMAILS   ││
│  │     MONTH       │ │                 │ │                 │ │   SENT    ││
│  │                 │ │                 │ │                 │ │           ││
│  │      12         │ │     8.5%        │ │     42%         │ │   1,250   ││
│  │   ↑ 3 vs last   │ │   ↑ 1.2% vs avg │ │   ↑ 5% vs avg   │ │  this mo  ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘ └────────────┘│
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  PERFORMANCE TREND (Last 12 Weeks)                                    │ │
│  │                                                                        │ │
│  │  [Line chart: Reply Rate, Open Rate, Meetings over time]              │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌──────────────────────────────────┐ ┌─────────────────────────────────┐  │
│  │  RECENT MEETINGS                 │ │  CAMPAIGN STATUS                │  │
│  │  ─────────────────────────────── │ │  ──────────────────────────────│  │
│  │  John Smith, Acme Corp      1/15 │ │  IT Directors - Active    ✓   │  │
│  │  Jane Doe, TechCo           1/12 │ │  VP Sales - Active        ✓   │  │
│  │  Mike Johnson, BigCorp      1/10 │ │  CMO Campaign - Paused    ⏸   │  │
│  │  [View All Meetings]             │ │  [View Campaigns]              │  │
│  └──────────────────────────────────┘ └─────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Metrics Definitions

| Metric | Calculation | Display |
|--------|-------------|---------|
| Meetings This Month | Count of qualified meetings | Large number + comparison |
| Reply Rate | (Replies / Emails Sent) × 100 | Percentage + vs target |
| Open Rate | (Opens / Emails Delivered) × 100 | Percentage + vs target |
| Emails Sent | Total emails sent this month | Count |

---

### Campaign View

#### Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Campaigns                                                [+ New Request]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ Campaign          │ Status  │ Sent    │ Opens  │ Replies │ Meetings   │ │
│  ├───────────────────┼─────────┼─────────┼────────┼─────────┼────────────│ │
│  │ IT Directors Q1   │ Active  │ 2,500   │ 42%    │ 8.2%    │ 8          │ │
│  │ VP Sales Outreach │ Active  │ 1,800   │ 38%    │ 7.5%    │ 5          │ │
│  │ CMO Campaign      │ Paused  │ 500     │ 35%    │ 5.1%    │ 1          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  [Click on campaign for details]                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Campaign Detail View

- Campaign overview stats
- Sequence breakdown (Email 1, 2, 3... performance)
- Recent replies (sanitized)
- A/B test results
- Optimization history

---

### Meetings View

#### Layout

| Column | Data |
|--------|------|
| Date | Meeting date/time |
| Contact | Name + title |
| Company | Company name |
| Campaign | Source campaign |
| Status | Scheduled/Completed/No-show |

**Filters:** Date range, status, campaign

**Export:** CSV download

---

### Reports View

- Access to weekly automated reports
- Monthly summary reports
- Historical report archive
- PDF download option

---

### Settings View

| Section | Options |
|---------|---------|
| Profile | Name, email, notification preferences |
| Team | Add/remove team members |
| Integrations | CRM connection status |
| Billing | Invoice history, payment methods |
| Calendar | Update booking link |

---

## Admin Dashboard

### Overview

**Purpose:** Internal management of all clients, campaigns, and system health.

**URL:** admin.wryko.com

**Access:** Admin authentication (email + password)

---

### Admin Home

#### Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Wryko Admin                                     [Marcos] [Settings]    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  ACTIVE     │ │  MRR        │ │  MEETINGS   │ │  HEALTH     │           │
│  │  CLIENTS    │ │             │ │  THIS MONTH │ │  ALERTS     │           │
│  │    34       │ │  $153K      │ │    127      │ │    2        │           │
│  │  +3 this mo │ │  +12% MoM   │ │  Target: 150│ │  [View]     │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  CLIENTS REQUIRING ATTENTION                                          │ │
│  │  ──────────────────────────────────────────────────────────────────── │ │
│  │  🔴 Acme Corp - Reply rate 2.1% (14 days)              [View]         │ │
│  │  🟡 TechCo - Missed last 2 calls                       [View]         │ │
│  │  🟡 BigCorp - Domain health warning                    [View]         │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌──────────────────────────────────┐ ┌─────────────────────────────────┐  │
│  │  PIPELINE                        │ │  RECENT ACTIVITY                │  │
│  │  ─────────────────────────────── │ │  ──────────────────────────────│  │
│  │  Discovery calls: 8              │ │  Meeting booked - Acme (1h ago)│  │
│  │  Proposals out: 5                │ │  Reply received - TechCo       │  │
│  │  Expected close: $45K            │ │  Report sent - All clients     │  │
│  └──────────────────────────────────┘ └─────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Client Management

#### Client List View

| Column | Data |
|--------|------|
| Client | Company name |
| Type | Founding Partner / Official |
| Status | Active / Onboarding / Paused |
| MRR | Monthly recurring revenue |
| Health | Score (0-100) |
| Last Contact | Days since last touch |

**Actions:** View, Edit, Pause, Message

#### Client Detail View

| Section | Content |
|---------|---------|
| Overview | Company info, contacts, plan details |
| Campaigns | All campaigns + performance |
| Meetings | Meeting history |
| Billing | Invoices, payments |
| Health | Score, signals, history |
| Notes | Internal notes, call logs |
| Activity | Full activity timeline |

---

### Campaign Management

#### All Campaigns View

| Column | Data |
|--------|------|
| Campaign | Name |
| Client | Client company |
| Status | Active/Paused/Draft |
| Sent | Email count |
| Reply Rate | Percentage |
| Meetings | Count |

**Filters:** Client, status, date range, performance

---

### System Health

#### Engine Status

| Engine | Last Run | Status | Issues |
|--------|----------|--------|--------|
| Guardian | 1h ago | ✓ Healthy | 0 |
| Architect | 3h ago | ✓ Healthy | 0 |
| Scientist | Mon 6 AM | ✓ Healthy | 0 |
| Hunter | 30m ago | ✓ Healthy | 0 |
| Sentinel | 2h ago | ⚠ Warning | 1 |
| Informant | Sun 8 PM | ✓ Healthy | 0 |
| Judge | 2h ago | ✓ Healthy | 0 |

#### Domain Health

| Domain | Status | Issues |
|--------|--------|--------|
| send1.client.com | ✓ Healthy | None |
| send2.client.com | ⚠ Warning | Bounce rate 2.5% |
| send3.client.com | ✓ Healthy | None |

---

### Reporting

#### Available Reports

| Report | Frequency | Contents |
|--------|-----------|----------|
| Weekly Summary | Weekly | All clients, key metrics |
| Client Health | Weekly | At-risk clients, interventions |
| Financial | Monthly | Revenue, churn, projections |
| Campaign Performance | Monthly | All campaigns, benchmarks |

---

## Technical Specifications

### Client Portal

| Requirement | Specification |
|-------------|---------------|
| Framework | Next.js 14+ (App Router) |
| Authentication | Supabase Auth (magic link) |
| State | React Query + Zustand |
| Charts | Recharts |
| UI | shadcn/ui + Tailwind |
| Mobile | Responsive (mobile-friendly) |

### Admin Dashboard

| Requirement | Specification |
|-------------|---------------|
| Framework | Next.js 14+ (App Router) |
| Authentication | Supabase Auth (email/password) |
| Authorization | Role-based (admin, viewer) |
| Real-time | Supabase Realtime subscriptions |
| Charts | Recharts |

### Data Refresh

| Data Type | Refresh Rate |
|-----------|--------------|
| Metrics | 5 minutes |
| Health scores | Hourly |
| Meetings | Real-time |
| Reports | On generation |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | Full support |
| Screen readers | ARIA labels |
| Color contrast | WCAG AA |
| Focus indicators | Visible focus |

---

## Performance

| Metric | Target |
|--------|--------|
| First Contentful Paint | <1.5s |
| Time to Interactive | <3s |
| Lighthouse Score | >90 |

---

*Wryko - Autonomous B2B Lead Generation Platform*
*Document Version 1.0 | January 2026*
