# WK-DOC-021: Service Level Agreement
## Wryko Performance Commitments

**Document ID:** WK-DOC-021
**Category:** Legal
**Version:** 2.0
**Last Updated:** January 2026

---

# SERVICE LEVEL AGREEMENT (SLA)

This Service Level Agreement ("SLA") is incorporated by reference into the Pilot Service Agreement between Wryko ("Provider") and Client.

---

## 1. Service Availability

### 1.1 Platform Uptime

| Component | Target Uptime | Measurement |
|-----------|---------------|-------------|
| Client Dashboard | 99.5% | Monthly |
| Campaign Delivery | 99.9% | Monthly |
| CRM Integration | 99.0% | Monthly |
| Reporting Systems | 99.0% | Monthly |

**Calculation:** Uptime % = ((Total Minutes - Downtime Minutes) / Total Minutes) × 100

**Exclusions from Downtime:**
- Scheduled maintenance (with 24-hour notice)
- Third-party service outages (CRM, ESP, etc.)
- Force majeure events
- Client-caused issues

### 1.2 Scheduled Maintenance

- **Window:** Sundays, 2:00 AM - 6:00 AM Pacific Time
- **Notice:** 24 hours minimum for planned maintenance
- **Duration:** Maximum 4 hours per maintenance window
- **Frequency:** No more than once per week

---

## 2. Support Response Times

### 2.1 Priority Definitions

| Priority | Definition | Examples |
|----------|------------|----------|
| **P1 - Critical** | Service completely down or major data loss | Domain blacklisted, 0% deliverability, all sends failing |
| **P2 - High** | Significant degradation of service | Reply rate <3% for 14+ days, CRM sync down, high bounces |
| **P3 - Medium** | Minor issue with workaround available | Copy approval delayed, dashboard slow, minor sync issues |
| **P4 - Low** | Question or enhancement request | Feature request, reporting question, general inquiry |

### 2.2 Response Time Targets

| Priority | First Response | Status Update | Resolution Target |
|----------|----------------|---------------|-------------------|
| P1 | 1 hour | Every 1 hour | 4 hours |
| P2 | 4 hours | Every 4 hours | 24 hours |
| P3 | 24 hours | Every 24 hours | 72 hours |
| P4 | 48 hours | As needed | 5 business days |

**Business Hours:** Monday - Friday, 9:00 AM - 5:00 PM Pacific Time

**After Hours:** P1 issues receive 24/7 support. P2-P4 issues addressed next business day.

### 2.3 Communication Channels

| Channel | Response Time | Best For |
|---------|---------------|----------|
| Slack/Telegram | Real-time (business hours) | Urgent issues, quick questions |
| Email | Within 4 hours (business hours) | Non-urgent, documentation |
| Scheduled Calls | Bi-weekly | Strategy, reviews, complex discussions |
| Emergency Line | 1 hour (24/7) | P1 critical issues only |

---

## 3. Performance Guarantees

### 3.1 Key Performance Indicators

| Metric | Guarantee | Measurement Period | Ramp Period |
|--------|-----------|-------------------|-------------|
| Reply Rate | ≥3% | 30-day rolling | First 30 days exempt |
| Deliverability | ≥95% | 30-day rolling | First 14 days exempt |
| Bounce Rate | ≤3% | 30-day rolling | First 14 days exempt |
| Spam Complaint Rate | ≤0.1% | 30-day rolling | None |

### 3.2 Measurement Methodology

**Reply Rate:**
- Formula: (Total Replies / Total Emails Sent) × 100
- Includes all replies (positive, neutral, negative)
- Excludes out-of-office auto-replies

**Deliverability:**
- Formula: (Emails Delivered / Total Emails Sent) × 100
- "Delivered" = Not bounced
- Measured via sending platform data

**Bounce Rate:**
- Formula: (Bounced Emails / Total Emails Sent) × 100
- Includes hard and soft bounces

**Spam Complaint Rate:**
- Formula: (Spam Complaints / Total Emails Sent) × 100
- Measured via feedback loops and Postmaster Tools

### 3.3 Excluded Factors

Performance guarantees do not apply when issues are caused by:
- Client-provided data quality issues
- Client-requested changes that negatively impact performance
- Market conditions beyond Provider's control
- Client delays in approvals (>48 hours)
- Third-party service failures
- Seasonal/industry fluctuations

---

## 4. Service Credits

### 4.1 Credit Schedule

| Breach | Credit Amount |
|--------|---------------|
| P1 response time exceeded by 1+ hours | 5% of monthly retainer |
| P1 resolution time exceeded by 4+ hours | 10% of monthly retainer |
| Platform uptime below 99.5% | 5% of monthly retainer |
| Reply rate <3% for 30+ consecutive days | 10% of monthly retainer |

### 4.2 Credit Limits

- Maximum monthly credits: 25% of monthly retainer
- Credits applied to next invoice
- Credits are non-transferable and non-cashable
- Credits do not apply to meeting bonuses

### 4.3 Credit Request Process

1. Client submits credit request within 30 days of incident
2. Request includes incident details and supporting evidence
3. Provider reviews and responds within 5 business days
4. Approved credits applied to next invoice

---

## 5. Escalation Procedures

### 5.1 Escalation Path

**Level 1: Success Manager**
- First point of contact
- Handles P3/P4 issues
- Escalates P1/P2 within 1 hour

**Level 2: Operations Lead**
- Handles escalated P2 issues
- Coordinates technical resources
- Escalates P1 to Level 3 immediately

**Level 3: Founder (Marcos Matthews)**
- All P1 issues notified immediately
- Final escalation point
- Direct client communication for critical issues

### 5.2 Escalation Triggers

| Trigger | Action |
|---------|--------|
| P1 not resolved in 4 hours | Auto-escalate to Level 3 |
| P2 not resolved in 24 hours | Auto-escalate to Level 2 |
| Client requests escalation | Immediate escalation |
| Repeat issue (3+ occurrences) | Root cause analysis + escalation |

---

## 6. Reporting & Automation

### 6.1 Automated Reporting (The Informant - Engine I)

| Report | Frequency | Delivery | Contents |
|--------|-----------|----------|----------|
| Weekly Performance Report | Sundays 8 PM PT | Auto-generated, emailed | AI-generated insights, all metrics, trends |
| Monthly Summary | 1st of month | Auto-generated, emailed | Extended trend analysis, recommendations |
| Incident Report | As needed | Auto-generated on P1/P2 | Post-mortems within 24 hours |
| Quarterly Review | Quarterly | Scheduled call | Full analysis, strategy review |

**Report Delivery SLA:**
- Weekly reports: Delivered by 8:30 PM PT every Sunday
- If automated delivery fails, manual delivery within 24 hours

### 6.2 Proactive Monitoring (The Judge - Engine J)

**Automated Monitoring:**
- Infrastructure health checked every 4 hours
- Anomaly detection running continuously
- Auto-healing for common issues

| Check | Frequency | Auto-Fix Capability |
|-------|-----------|---------------------|
| Inbox Status | Every 4 hours | Yes - auto-rotate |
| Bounce Rate | Every 4 hours | Yes - auto-pause campaign |
| Domain Health | Every 4 hours | Yes - disable compromised |
| Blacklist Check | Every 4 hours | Alert only |

**Proactive Notification SLA:**
- Issues detected: Client notified within 1 hour
- Issues auto-fixed: Client notified same day with resolution summary

### 6.3 Client Portal (The Navigator - Engine N)

**Portal Availability:** 99.5% uptime target

| Request Type | Processing SLA |
|--------------|----------------|
| Instant (ICP update, pause, download) | <5 minutes |
| Review (lead upload, copy change) | 4 business hours |
| Complex (domain addition, strategy change) | 24 business hours |

### 6.4 Real-Time Access

Clients have 24/7 access to:
- Real-time dashboard metrics
- Campaign performance data
- Lead activity feed
- Reply notifications
- **Self-serve portal (The Navigator)**
- **Historical report archive**

---

## 7. Client Responsibilities

To enable SLA fulfillment, Client agrees to:

| Responsibility | Timeline |
|----------------|----------|
| Complete Discovery Questionnaire | Within 48 hours of kickoff |
| Provide CRM access | Before launch |
| Approve campaign copy | Within 2 business days |
| Respond to escalations | Within 4 hours for P1/P2 |
| Provide feedback on lead quality | Weekly |
| Attend scheduled sync calls | As scheduled |
| Maintain accurate CRM data | Ongoing |

**Impact of Non-Compliance:** Failure to meet Client responsibilities may void or reduce applicable service credits and performance guarantees.

---

## 8. Performance Improvement

### 8.1 If Performance Falls Below Guarantees

**Day 1-7:**
- Issue identified and documented
- Root cause analysis initiated
- Client notified
- Remediation plan developed

**Day 8-14:**
- Remediation plan implemented
- Increased monitoring
- Daily client updates

**Day 15-30:**
- Continue remediation
- Assess improvement
- Adjust strategy if needed

**Day 30+:**
- If not resolved, client may invoke termination rights per Agreement Section 4.4

### 8.2 Continuous Improvement

Provider commits to:
- Bi-weekly A/B testing cycles
- Regular platform updates
- Proactive optimization recommendations
- Industry best practice implementation

---

## 8.5 CSM Automation Suite Commitments

### Automation Engine SLAs

| Engine | Service | Target | Measurement |
|--------|---------|--------|-------------|
| **The Informant** | Weekly report delivery | 99% on-time | Sunday 8 PM PT |
| **The Judge** | Issue detection response | <4 hours | From issue occurrence |
| **The Judge** | Auto-fix execution | <15 minutes | For supported issues |
| **The Navigator** | Instant request processing | <5 minutes | For instant-type requests |
| **The Navigator** | Portal availability | 99.5% uptime | Monthly |
| **The Monitor** | Health score calculation | Weekly | Monday 6 AM PT |

### Automation Failure Credits

| Failure | Credit |
|---------|--------|
| Weekly report not delivered within 24 hours | 2% of monthly retainer |
| Portal unavailable >4 hours | 5% of monthly retainer |
| Critical issue not auto-detected (where detectable) | 5% of monthly retainer |

### Automation Exclusions

Automation SLAs do not apply when:
- Third-party API providers experience outages
- Client-side configuration prevents automation
- Force majeure events occur

---

## 9. Amendments

This SLA may be updated by Provider with 30 days written notice. Clients may terminate within 30 days of notice if changes materially reduce service levels.

---

## 10. Definitions

**Business Day:** Monday through Friday, excluding US federal holidays

**Business Hours:** 9:00 AM - 5:00 PM Pacific Time

**Downtime:** Period when core service functionality is unavailable

**First Response:** Initial acknowledgment of issue receipt

**Resolution:** Issue is resolved or acceptable workaround provided

---

*This SLA is effective as of the Pilot Service Agreement effective date.*

*Wryko - Autonomous B2B Lead Generation Platform*
*Document Version 3.0 | January 2026 | Updated with CSM Automation Suite SLAs*
