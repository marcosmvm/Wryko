# XG-DOC-036: Referral Tracking System Specification
## Referral Program Operations

**Document ID:** XG-DOC-036
**Category:** Financial Modeling
**Version:** 1.0
**Last Updated:** January 2026

---

## Executive Summary

This document specifies how referrals are tracked, credited, measured, and reported. It ensures accurate attribution and timely payouts for the XGrowthOS referral program.

---

## Referral Program Overview

### Program Terms (from XG-DOC-020)

| Element | Details |
|---------|---------|
| Credit Amount | $500 per qualified referral |
| Qualification | Referral completes discovery call |
| Credit Application | Applied to next invoice |
| Limit | No monthly limit |
| Expiration | Credits never expire |

---

## Tracking System Architecture

### Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   REFERRER  │────▶│   SYSTEM    │────▶│   CREDIT    │
│   SUBMITS   │     │   TRACKS    │     │   APPLIED   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
  • Referral form    • Attribution       • Invoice credit
  • Email intro      • Status updates    • Notification
  • Direct mention   • History log       • Balance update
```

### Referral Sources

| Source | How to Track | Attribution |
|--------|--------------|-------------|
| Referral Form | Form submission with referrer ID | Automatic |
| Email Introduction | CC'd email to referrals@ | Manual entry |
| Verbal Mention | Prospect mentions in call | Manual entry |
| Referral Link | Unique URL with tracking code | Automatic |

---

## Database Schema

### Referrals Table

| Field | Type | Description |
|-------|------|-------------|
| referral_id | UUID | Primary key |
| referrer_client_id | UUID | FK to clients |
| referred_company | Text | Company name |
| referred_contact | Text | Contact name |
| referred_email | Text | Contact email |
| source | Enum | form/email/verbal/link |
| status | Enum | submitted/contacted/qualified/closed/invalid |
| created_at | Timestamp | Submission date |
| qualified_at | Timestamp | Discovery call date |
| closed_at | Timestamp | Contract signed date |
| credit_amount | Decimal | Credit value |
| credit_applied | Boolean | Credit used |
| credit_applied_invoice | Text | Invoice reference |
| notes | Text | Additional info |

### Referral Credits Table

| Field | Type | Description |
|-------|------|-------------|
| credit_id | UUID | Primary key |
| client_id | UUID | FK to clients |
| referral_id | UUID | FK to referrals |
| amount | Decimal | Credit amount |
| status | Enum | pending/applied/expired |
| earned_date | Timestamp | When qualified |
| applied_date | Timestamp | When used |
| invoice_id | Text | Applied to which invoice |

---

## Referral Statuses

| Status | Definition | Triggers |
|--------|------------|----------|
| **Submitted** | Referral received | Form/email/verbal entry |
| **Contacted** | Outreach initiated | First email sent |
| **Qualified** | Discovery call completed | Call logged |
| **Closed** | Became a client | Contract signed |
| **Invalid** | Did not qualify | Wrong contact, not ICP, etc. |

### Status Workflow

```
Submitted → Contacted → Qualified → Closed
     │           │           │
     └───────────┴───────────┴──→ Invalid
```

---

## Credit Qualification Rules

### Qualified Referral Criteria

| Requirement | Details |
|-------------|---------|
| Valid contact | Real person at real company |
| ICP match | Meets basic targeting criteria |
| Discovery call | Completed, not no-show |
| New prospect | Not already in pipeline |
| No self-referral | Can't refer own company |

### Disqualification Reasons

| Reason | Example |
|--------|---------|
| Invalid contact | Fake email, wrong person |
| Not ICP | Consumer business, too small |
| Already in pipeline | We contacted them first |
| No-show | Scheduled call, didn't attend |
| Self-referral | Employee referring own company |
| Duplicate | Already referred by someone else |

---

## Referral Submission Methods

### Method 1: Referral Form

**URL:** xgrowthos.com/refer

**Form Fields:**
- Referrer name (auto-filled if logged in)
- Referrer company (auto-filled)
- Referred contact name*
- Referred contact email*
- Referred company name*
- Relationship context
- Best way to reach them

**Auto-Actions:**
1. Create referral record (status: submitted)
2. Send confirmation email to referrer
3. Notify team in #referrals Slack channel
4. Add to outreach queue

### Method 2: Email Introduction

**Process:**
1. Client sends intro email CCing referrals@xgrowthos.com
2. System parses email for contact info
3. Manual verification and entry
4. Same workflow as form submission

**Parsing Logic:**
- Extract names from salutation
- Extract emails from headers/body
- Flag for manual review if unclear

### Method 3: Referral Link

**URL Format:** xgrowthos.com/r/{{client_code}}

**How it Works:**
1. Referrer shares unique link
2. Prospect visits and books call
3. Referral automatically attributed
4. Cookie-based tracking (30-day window)

### Method 4: Verbal Mention

**Process:**
1. Prospect mentions referrer during call
2. CSM/Sales logs referral manually
3. Confirm with referrer if ambiguous
4. Credit applied once qualified

---

## Credit Application Process

### When Credit is Earned

| Event | Credit Status |
|-------|---------------|
| Referral submitted | No credit yet |
| Referral contacted | No credit yet |
| Referral completes discovery call | **Credit earned ($500)** |
| Referral becomes client | Bonus consideration (optional) |

### How Credit is Applied

1. **Automatic:** System applies to next invoice
2. **Partial:** If invoice < credit, remainder carries forward
3. **Stacking:** Multiple credits can combine
4. **Notification:** Email sent when credit applied

### Credit Application Email

```
Subject: $500 referral credit applied!

Hi {{client_name}},

Great news! Your referral of {{referred_contact}} at
{{referred_company}} completed their discovery call.

Your $500 credit has been applied to your next invoice
({{invoice_date}}).

Invoice total: ${{original_amount}}
Credit applied: -$500
New total: ${{new_amount}}

Thanks for spreading the word about XGrowthOS!

Current referral credit balance: ${{remaining_balance}}

[View Referral History]

Marcos
```

---

## Reporting & Analytics

### Referrer Dashboard (Client Portal)

| Metric | Description |
|--------|-------------|
| Total Referrals | All-time submissions |
| Qualified Referrals | Completed discovery calls |
| Closed Referrals | Became clients |
| Credits Earned | Total $ earned |
| Credits Applied | Total $ used |
| Credits Available | Current balance |

### Referral History Table

| Date | Referred | Company | Status | Credit |
|------|----------|---------|--------|--------|
| Jan 15 | John Smith | Acme Corp | Qualified | $500 |
| Jan 8 | Jane Doe | TechCo | Contacted | Pending |

### Admin Reporting

**Weekly Report (Auto-generated):**
- New referrals received
- Referrals by source
- Qualification rate
- Top referrers
- Credits earned vs applied
- Pipeline from referrals

**Monthly Metrics:**

| Metric | Calculation | Target |
|--------|-------------|--------|
| Referral rate | Clients who referred / Total clients | >20% |
| Qualification rate | Qualified / Submitted | >50% |
| Conversion rate | Closed / Qualified | >30% |
| Revenue from referrals | Referral client MRR | >15% of total |
| Credits liability | Outstanding credits | Track |

---

## Fraud Prevention

### Red Flags

| Signal | Risk | Action |
|--------|------|--------|
| Same IP for referrer and referred | Self-referral | Manual review |
| Same email domain | Related parties | Verify relationship |
| Multiple submissions same day | Gaming | Rate limit |
| Referral never responds | Fake contact | No credit |
| Pattern of invalid referrals | Bad actor | Warning, then suspend |

### Prevention Measures

1. **Verification:** Confirm referred contact is real
2. **Rate limiting:** Max 5 submissions per day
3. **Quality check:** ICP match before outreach
4. **Audit trail:** Full history of all actions
5. **Manual review:** High-volume referrers

---

## System Integration

### Slack Notifications

**#referrals Channel:**
- New referral received
- Referral qualified
- Referral closed
- Credit applied

**Notification Format:**
```
🎯 New Referral!
From: {{referrer}} at {{referrer_company}}
Referred: {{contact}} at {{company}}
Source: {{source}}
[View Details]
```

### CRM Integration

| Event | CRM Action |
|-------|------------|
| Referral submitted | Create lead with source=referral |
| Referral qualified | Update lead stage |
| Referral closed | Link to referrer account |
| Credit applied | Add note to referrer account |

### Billing Integration

| Event | Billing Action |
|-------|----------------|
| Credit earned | Add credit to client balance |
| Invoice generated | Auto-apply available credits |
| Credit applied | Deduct from balance, log on invoice |

---

## Operational Procedures

### Daily Tasks

1. Review new referral submissions
2. Verify contact validity
3. Initiate outreach to valid referrals
4. Update statuses as needed

### Weekly Tasks

1. Generate referral report
2. Identify top referrers for recognition
3. Review qualification rates
4. Follow up on stale referrals

### Monthly Tasks

1. Audit credit balances
2. Review for fraud patterns
3. Update leaderboard
4. Send referrer appreciation

---

## Referral Leaderboard

### Recognition Tiers

| Tier | Referrals | Recognition |
|------|-----------|-------------|
| Bronze | 1-2 | Thank you email |
| Silver | 3-5 | Public shoutout + swag |
| Gold | 6-10 | Featured testimonial + gift |
| Platinum | 10+ | VIP treatment + exclusive event |

### Leaderboard Display

| Rank | Referrer | Company | Referrals | Credit Earned |
|------|----------|---------|-----------|---------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

---

## Key Takeaways

1. **Track all sources**: Form, email, link, verbal
2. **Credit on qualification**: Discovery call = credit earned
3. **Auto-apply credits**: Seamless billing integration
4. **Prevent fraud**: Verify before crediting
5. **Recognize top referrers**: Build advocacy program
6. **Measure impact**: Referrals should be 15%+ of pipeline

---

*XGrowthOS - Autonomous B2B Lead Generation Platform*
*Document Version 1.0 | January 2026*
