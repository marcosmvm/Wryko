# WK-DOC-008: Internal Process Documentation
## Wryko Standard Operating Procedures

**Document ID:** WK-DOC-008
**Category:** Internal Operations
**Version:** 2.0
**Last Updated:** January 2026
**Classification:** INTERNAL USE ONLY

---

## 1. Client Onboarding SOP

### Phase 1: Pre-Onboarding (Day 0)

**Trigger:** Signed agreement received

**Checklist:**
- [ ] Agreement countersigned and filed
- [ ] Client added to CRM (HubSpot)
- [ ] Onboarding fee confirmed
- [ ] Welcome email sent (Template #1)
- [ ] Discovery questionnaire attached
- [ ] Slack/Telegram channel created
- [ ] Success Manager assigned
- [ ] Kickoff call scheduling link sent

### Phase 2: Discovery (Days 1-3)

**Trigger:** Questionnaire received

**Checklist:**
- [ ] Questionnaire reviewed for completeness
- [ ] ICP validated (check ACV >$15K)
- [ ] CRM access confirmed
- [ ] Customer exclusion list imported
- [ ] Competitor exclusion list imported
- [ ] Calendar booking link tested
- [ ] 60-minute kickoff call completed
- [ ] Notes documented in CRM

### Phase 3: Technical Setup (Days 4-7)

**Checklist:**
- [ ] Sending domains identified/purchased
- [ ] DNS records configured (SPF, DKIM, DMARC)
- [ ] Domains added to Instantly
- [ ] Domain warmup initiated
- [ ] Dashboard account created
- [ ] CRM integration tested
- [ ] Lead delivery workflow configured
- [ ] Notification webhooks set up

### Phase 4: Campaign Development (Days 6-10)

**Checklist:**
- [ ] The Architect generates initial sequences
- [ ] Campaign copy drafted
- [ ] Subject lines created (5 variants)
- [ ] Personalization tokens configured
- [ ] Copy sent for client approval
- [ ] Revisions made (if needed)
- [ ] Final approval received
- [ ] Campaigns staged in Instantly

### Phase 5: Launch (Days 11-14)

**Checklist:**
- [ ] Guardian pre-launch compliance check
- [ ] Domain warmup at >70%
- [ ] Test emails sent internally
- [ ] Deliverability verified
- [ ] Campaigns activated
- [ ] Daily monitoring enabled
- [ ] First weekly report scheduled
- [ ] Launch confirmation sent to client

---

## 2. Daily Monitoring Routine

> **Note:** With the CSM Automation Suite, most monitoring is now automated by **The Judge** (Engine J), which runs every 4 hours. Manual monitoring is reduced to exception review.

### Morning Check (9 AM PT)

**Duration:** 5-10 minutes per client (reduced from 15-30 minutes due to automation)

**Automated by The Judge:**
- ✅ Overnight deliverability metrics (auto-monitored)
- ✅ Bounce rate monitoring (auto-alerts if >1%)
- ✅ Spam complaint tracking (auto-alerts if >0.05%)
- ✅ Domain health scores (auto-monitored)
- ✅ Blacklist status (auto-monitored)

**Manual Review:**
- [ ] Review The Judge's overnight alerts (Slack #alerts-critical, #alerts-general)
- [ ] Review new replies and categorize
- [ ] Forward positive replies to The Hunter
- [ ] Respond to urgent client messages
- [ ] Acknowledge any P1/P2 alerts

### Afternoon Review (2 PM PT)

**Automated by The Judge:**
- ✅ Domain health monitoring (continuous)
- ✅ Campaign performance anomaly detection

**Manual Checklist:**
- [ ] Check meeting booking notifications
- [ ] Verify CRM lead delivery
- [ ] Review any The Judge alerts from midday run
- [ ] Update campaign notes
- [ ] Prepare for next-day sends

### End of Day (5 PM PT)

**Checklist:**
- [ ] Review The Judge's 5 PM alert summary
- [ ] Final reply check
- [ ] Escalate any unresolved issues
- [ ] Update client notes
- [ ] Tomorrow's priorities identified

---

## 3. Gmail/Yahoo 2024-2025 Compliance Checklist

**Required for all bulk senders (>5,000 emails/day):**

### Authentication
- [ ] SPF record published and passing
- [ ] DKIM signing enabled and passing
- [ ] DMARC policy published (p=quarantine or p=reject)
- [ ] DMARC alignment verified

### Unsubscribe Requirements
- [ ] One-click unsubscribe header present
- [ ] Unsubscribe link in email body
- [ ] Unsubscribe requests honored within 2 days

### Spam Rate Management
- [ ] Spam complaint rate below 0.1%
- [ ] Postmaster Tools monitored (Google)
- [ ] SNDS monitored (Microsoft)
- [ ] Alerts configured for threshold breaches

### Technical
- [ ] PTR records configured
- [ ] Sending IP matches domain
- [ ] No open relays
- [ ] TLS encryption enabled

---

## 4. Weekly Optimization Cycle (The Scientist)

### Monday Optimization (9 AM PT)

**Duration:** 2-3 hours

**Process:**
1. Pull week's performance data
2. Identify underperforming campaigns (Reply Rate <5%)
3. Analyze patterns:
   - Subject line performance
   - Opening line performance
   - Send time analysis
   - Sequence step drop-off
4. Design A/B tests for underperformers
5. Stage optimizations
6. Document hypotheses

### Wednesday Optimization (9 AM PT)

**Duration:** 2-3 hours

**Process:**
1. Review Monday test results
2. Declare winners (95% confidence)
3. Roll out winning variations
4. Archive losing variations
5. Add winners to Master Library
6. Plan next week's tests
7. Update campaign notes

---

## 5. Escalation Matrix

### Priority Definitions

| Priority | Description | Examples |
|----------|-------------|----------|
| P1 - Critical | Service down, major impact | Domain blacklisted, 0% deliverability |
| P2 - High | Significant degradation | Reply rate <3%, high bounces |
| P3 - Medium | Minor issue, workaround exists | Copy approval delayed, minor CRM sync |
| P4 - Low | Question, enhancement request | Feature request, reporting question |

### Response Times

| Priority | First Response | Resolution | Escalation Path |
|----------|----------------|------------|-----------------|
| P1 | 1 hour | 4 hours | SM → Marcos (immediate) |
| P2 | 4 hours | 24 hours | SM → Marcos (if unresolved 4h) |
| P3 | 24 hours | 72 hours | SM handles |
| P4 | 48 hours | 5 days | SM handles |

### Escalation Procedure

**P1 Critical:**
1. Acknowledge issue immediately
2. Notify client within 30 minutes
3. All hands on deck
4. Marcos notified immediately
5. Status updates every hour
6. Post-mortem within 24 hours

**P2 High:**
1. Acknowledge within 1 hour
2. Notify client within 2 hours
3. Escalate to Marcos if unresolved in 4 hours
4. Status updates every 4 hours
5. Root cause analysis within 48 hours

---

## 6. Campaign Launch Checklist

### Pre-Launch (T-24 hours)

**Technical:**
- [ ] Domain warmup >70% complete
- [ ] SPF/DKIM/DMARC all passing
- [ ] No blacklist detections
- [ ] Test email delivered to inbox

**Content:**
- [ ] Copy approved by client
- [ ] Personalization tokens tested
- [ ] Links verified (no broken links)
- [ ] Unsubscribe working
- [ ] Calendar link tested

**Targeting:**
- [ ] Lead list uploaded
- [ ] Exclusions applied (customers, competitors)
- [ ] DNC check completed (Guardian)
- [ ] ICP filters verified

### Launch Day (T-0)

- [ ] Final Guardian compliance check
- [ ] Volume settings confirmed (50/day/domain)
- [ ] Send time set correctly
- [ ] Campaign activated
- [ ] Monitoring dashboard open
- [ ] Client notified

### Post-Launch (T+24 hours)

- [ ] First batch deliverability checked
- [ ] Bounce rate acceptable (<2%)
- [ ] No spam complaints
- [ ] First opens recorded
- [ ] Any issues addressed

---

## 7. Quality Assurance Checklist

### Copy Review

- [ ] No spam trigger words (free, guarantee, act now)
- [ ] Personalization tokens render correctly
- [ ] Company name spelled correctly
- [ ] Value proposition clear
- [ ] CTA clear and single-focused
- [ ] Length appropriate (50-150 words)
- [ ] Tone matches brand guidelines
- [ ] Grammar and spelling checked

### Technical Review

- [ ] From name matches domain
- [ ] Reply-to address correct
- [ ] Plain text version included
- [ ] HTML renders correctly
- [ ] Images have alt text (if any)
- [ ] Links trackable

### Compliance Review

- [ ] Sender identity clear
- [ ] Physical address included
- [ ] Unsubscribe option present
- [ ] No misleading subject lines
- [ ] GDPR-compliant (if EU)
- [ ] CCPA-compliant (if CA)

---

## 8. The Hunter: Lead Expansion Process

### Trigger: Positive Reply Received

**Process:**

1. **Identify Signal** (Automated)
   - Positive reply detected
   - Sentiment analysis confirms interest
   - Forward to Hunter queue

2. **Company Expansion** (T+1 hour)
   - Find 5-10 colleagues at same company
   - Match ICP criteria
   - Check against DNC/customer lists
   - Queue for targeted outreach

3. **Lookalike Expansion** (T+2 hours)
   - Identify company characteristics
   - Find 10-20 similar companies
   - Source decision makers
   - Queue for prospecting campaign

4. **Quality Check** (T+4 hours)
   - Verify email validity
   - Check ICP match score
   - Approve for campaign

5. **Outreach** (T+24 hours)
   - Add to expansion campaign
   - Reference original engagement
   - Monitor for responses

---

## 9. The Sentinel: Visitor Intelligence Process

### Setup Requirements

- Client website tracking pixel installed
- IP-to-company mapping enabled
- CRM integration configured
- Alert thresholds set

### Daily Process

1. **Morning Scan** (8 AM PT)
   - Review overnight visitors
   - Filter high-intent pages
   - Score by visit depth/duration

2. **Company Identification**
   - Match IP to company
   - Verify B2B (exclude ISPs, residential)
   - Check against current customer list

3. **Contact Discovery**
   - Find decision makers at company
   - Match to client's ICP titles
   - Source email addresses

4. **Lead Delivery**
   - Push to CRM as "Website Visitor" source
   - Include intent score
   - Include pages visited
   - Alert client if high-intent

5. **Campaign Trigger**
   - Queue high-intent visitors for immediate outreach
   - Reference website visit in messaging
   - Personalize based on pages viewed

---

## 10. Offboarding Process

### Phase 1: Notification (Days 0-7)

- [ ] Termination notice received
- [ ] Confirm final date
- [ ] Schedule wrap-up call
- [ ] Notify internal team
- [ ] Stop new campaign development

### Phase 2: Transition (Days 8-21)

- [ ] Pause all active campaigns
- [ ] Complete in-flight sequences
- [ ] Generate final performance report
- [ ] Export all lead data (CSV)
- [ ] Document campaign learnings

### Phase 3: Handoff (Days 22-28)

- [ ] Deliver data package to client
- [ ] Transfer domain DNS (if applicable)
- [ ] Remove CRM access
- [ ] Final invoice generated
- [ ] Exit interview conducted

### Phase 4: Post-Termination (Days 29-90)

- [ ] Data retention per DPA (90 days)
- [ ] Delete data after retention period
- [ ] Update internal DNC with client contacts
- [ ] Archive client folder
- [ ] Send feedback request (30 days post)

---

## 11. CSM Automation Suite Processes

### Engine I: The Informant - Automated Reporting

**Trigger:** Every Sunday at 8:00 PM PT (automated)

**Process (Fully Automated):**
1. Pull campaign metrics from Instantly.ai
2. Retrieve meeting data from Calendly
3. Fetch inbox health and deliverability scores
4. Calculate week-over-week trends
5. Generate AI executive summary via GPT-4o
6. Format branded HTML email
7. Deliver to client
8. Log to Report_History sheet
9. Notify team on #client-reports

**Manual Override:** For ad-hoc reports, trigger `/informant-report` webhook with client_id

---

### Engine J: The Judge - Issue Detection

**Trigger:** Every 4 hours (automated)

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
- Disable compromised domain
- Flag for manual review (complex issues)

**Alert Channels:**
- P1 Critical: #alerts-critical (with @channel)
- P2-P4: #alerts-general

---

### Engine K: The Keeper - Knowledge Brain

**Trigger:** Webhook POST to `/keeper-query` or Slack `/ask` command

**Usage:**
- Internal team can query for operational procedures
- Searches Knowledge_Base, SOPs, FAQ, Troubleshooting_Guide
- Returns AI-generated answer with confidence level

**Knowledge Gap Process:**
1. Low-confidence queries logged to Knowledge_Gaps sheet
2. Alert posted to #knowledge-gaps
3. Team reviews and adds missing documentation
4. Keeper re-trained on new content

---

### Engine L: The Launcher - Automated Onboarding

**Trigger:** Webhook POST to `/new-client`

**Automated Actions:**
1. Generate unique client ID (XG-XXXXXX)
2. Create records in Clients, Onboarding_Tracker
3. Create Google Drive folder
4. Send branded welcome email
5. Notify team on #new-clients

**Asset Collection Reminders (Automated):**
| Timing | Type | Action |
|--------|------|--------|
| 24 hours | Friendly | First reminder email |
| 48 hours | Urgent | Second reminder + Slack alert |
| 72 hours | Final | Final notice + CSM escalation |

**Manual Touchpoints:**
- Kickoff call (scheduled, human-led)
- Copy approval review
- Final launch authorization

---

### Engine M: The Monitor - Churn Detection

**Trigger:** Every Monday at 6:00 AM PT (automated)

**Risk Signal Weights:**
| Signal | Weight | High Risk Threshold |
|--------|--------|---------------------|
| Missed Calls | 25% | ≥50% no-show rate |
| Low Reply Rates | 20% | <1% or 50% drop |
| Negative Sentiment | 20% | ≥3 negative communications |
| Low Engagement | 15% | No portal login 14+ days |
| Support Spikes | 10% | ≥5 tickets in 2 weeks |
| Renewal Approaching | 10% | ≤30 days to renewal |

**Health Score Classifications:**
- Healthy (80-100): No action needed
- At Risk (50-79): Proactive outreach recommended
- Critical (<50): Immediate intervention required

**Alert Channels:**
- Critical: #alerts-critical + direct CSM notification
- At Risk: #client-health
- Weekly summary: #leadership

---

### Engine N: The Navigator - Client Portal

**Webhooks:**
- Submit: POST `/client-portal`
- Approve: POST `/approve-request`
- Status: GET `/request-status/:id`

**Request Categories:**

| Category | Examples | Processing |
|----------|----------|------------|
| **Instant** | Update ICP, pause campaign, download report | Auto-executed |
| **Review** | Upload leads, request copy change, schedule call | CSM approval required |
| **Complex** | Add domain, major strategy change | Multi-step workflow |

**Alert Channel:** #client-requests (for Review items)

---

*INTERNAL DOCUMENT - DO NOT SHARE WITH CLIENTS*
*Document Version 3.0 | January 2026 | Updated with CSM Automation Suite*
