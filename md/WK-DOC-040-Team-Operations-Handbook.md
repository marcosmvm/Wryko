# WK-DOC-040: Team Operations Handbook
## Day-to-Day Team Processes

**Document ID:** WK-DOC-040
**Category:** Team & Operations
**Version:** 1.0
**Last Updated:** January 2026
**Classification:** INTERNAL

---

## Executive Summary

This handbook covers day-to-day team operations, including communication norms, meeting cadences, tools, and workflows for the Wryko team.

---

## Communication

### Channels & Usage

| Channel | Use For | Response Time |
|---------|---------|---------------|
| **Slack #general** | Announcements, team updates | Read within 4 hours |
| **Slack #sales** | Sales team coordination, wins | 2 hours |
| **Slack #clients** | Client-specific discussions | 2 hours |
| **Slack #alerts-critical** | Urgent system/client issues | 15 minutes |
| **Slack #alerts-general** | Non-urgent notifications | 4 hours |
| **Slack DM** | Quick questions, 1:1 | 2 hours |
| **Email** | External, formal internal | Same business day |
| **Phone/Video** | Urgent, complex discussions | As needed |
| **Loom** | Async demos, explanations | Within 24 hours |

### Communication Norms

**Do:**
- Use threads in Slack to keep channels clean
- @mention specific people when action needed
- Set status when unavailable
- Over-communicate on client issues
- Document decisions in writing

**Don't:**
- Use @channel unless truly urgent
- Let messages sit unread for days
- Have long conversations in DMs that should be in channels
- Send Slack messages expecting immediate response after hours

### Working Hours

| Element | Standard |
|---------|----------|
| Core hours | 10 AM - 4 PM local time |
| Flexibility | Work when you work best |
| Availability | Responsive during core hours |
| After hours | Emergency only |
| Weekends | Off unless urgent |

---

## Meeting Cadence

### Team Meetings

| Meeting | Frequency | Duration | Attendees | Purpose |
|---------|-----------|----------|-----------|---------|
| All-Hands | Weekly (Monday) | 30 min | Everyone | Alignment, updates |
| Sales Standup | Daily | 15 min | Sales team | Pipeline review |
| Client Review | Weekly (Wed) | 30 min | CSM + Leadership | Health check |
| 1:1s | Weekly | 30 min | Manager + direct | Development |
| Monthly Review | Monthly (1st Mon) | 60 min | Everyone | Deep dive, planning |

### Meeting Rules

1. **Start on time:** Don't wait for latecomers
2. **Agenda required:** No agenda, no meeting
3. **Notes captured:** Document decisions and action items
4. **Camera on:** For team cohesion (exceptions OK)
5. **Async first:** If it can be a Loom, make it a Loom

### Meeting Templates

**All-Hands Agenda:**
```
1. Wins & Celebrations (5 min)
2. Key Metrics Review (5 min)
3. Updates by Function (10 min)
4. Blockers & Needs (5 min)
5. Announcements (5 min)
```

**1:1 Agenda:**
```
1. How are you? (Personal check-in)
2. What's going well?
3. What's challenging?
4. What do you need from me?
5. Development/growth discussion
```

---

## Daily Operations

### Morning Routine

| Time | Activity | Owner |
|------|----------|-------|
| 9:00 | Check Slack alerts overnight | Everyone |
| 9:15 | Review client health dashboard | CSM |
| 9:30 | Check sales pipeline | AE |
| 10:00 | Sales standup (if applicable) | Sales team |

### Key Daily Checks

**CSM Daily:**
- [ ] Review overnight alerts from The Judge
- [ ] Check client portal for requests
- [ ] Review campaign metrics for anomalies
- [ ] Respond to client Slack/emails
- [ ] Update CRM with call notes

**Sales Daily:**
- [ ] Check inbox for prospect replies
- [ ] Review pipeline, update stages
- [ ] Send follow-ups
- [ ] Log calls and activities
- [ ] Prepare for scheduled calls

### End of Day

- Update CRM/systems with day's activity
- Flag anything urgent for tomorrow
- Set Slack status if out tomorrow
- Quick Slack update to team if needed

---

## Tools & Access

### Core Tools

| Tool | Purpose | Admin |
|------|---------|-------|
| Slack | Team communication | Founder |
| Google Workspace | Email, docs, calendar | Founder |
| Supabase | Database, client portal | Founder |
| n8n | Workflow automation | Founder |
| Instantly.ai | Email campaigns | Founder |
| Apollo.io | Lead data | Founder |
| Calendly | Scheduling | Individual |
| Stripe | Billing | Founder |
| Notion | Documentation | Founder |

### Access Levels

| Role | Full Access | Limited Access | No Access |
|------|-------------|----------------|-----------|
| Founder | All | - | - |
| CSM | Client data, campaigns, support | Billing (view) | Admin settings |
| AE | CRM, proposals, pipeline | Client data (own) | Billing, admin |
| Support | Support tools, FAQ | Campaign view | Billing, admin |

### New Hire Tool Setup

| Day | Tools to Set Up |
|-----|-----------------|
| Day 1 | Google Workspace, Slack, Notion |
| Day 1 | Calendly, calendar access |
| Day 2 | CRM access, training |
| Day 3 | Supabase (if needed), Instantly (if needed) |
| Week 1 | All role-specific tools |

---

## Workflows

### Client Onboarding Workflow

```
New Client Signed
       │
       ▼
┌─────────────────┐
│ The Launcher    │──▶ Auto: Welcome email, folder creation
│ (Automation)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CSM: Kickoff    │──▶ Day 1-2: Schedule and conduct kickoff call
│ Call            │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CSM + Ops:      │──▶ Days 3-7: Domain setup, CRM integration
│ Setup           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Architect +     │──▶ Days 7-10: Generate and review copy
│ CSM: Copy       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CSM: Launch     │──▶ Days 12-14: Approve and launch
│                 │
└─────────────────┘
```

### Support Request Workflow

```
Request Received (Slack/Email/Portal)
       │
       ▼
┌─────────────────┐     ┌─────────────────┐
│ Navigator Auto- │ Yes │ Auto-Response   │
│ Handle?         │────▶│ + Log           │
└────────┬────────┘     └─────────────────┘
         │ No
         ▼
┌─────────────────┐
│ CSM Triage      │──▶ Categorize, prioritize
│                 │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│ Quick │ │ Complex│
│ Fix   │ │ Issue  │
└───┬───┘ └───┬───┘
    │         │
    ▼         ▼
┌───────┐ ┌───────┐
│Respond│ │Escalate│
│& Log  │ │& Track │
└───────┘ └───────┘
```

### Issue Escalation Workflow

```
Issue Detected (by Judge or Human)
       │
       ▼
┌─────────────────┐
│ Severity?       │
└────────┬────────┘
         │
    ┌────┼────┬────────┐
    ▼    ▼    ▼        ▼
   P1   P2   P3       P4
    │    │    │        │
    ▼    ▼    ▼        ▼
  15m   1h   4h      24h
  SLA  SLA  SLA      SLA
    │    │    │        │
    ▼    ▼    ▼        ▼
Founder CSM  CSM    Queue
+ CSM
```

---

## Documentation Standards

### Where to Document

| Content Type | Location |
|--------------|----------|
| SOPs & Processes | Notion / md folder |
| Client notes | CRM |
| Meeting notes | Google Docs |
| Technical docs | md folder |
| Quick references | Notion |

### Documentation Format

**SOP Template:**
```
# [Process Name]

## Purpose
Why this process exists

## When to Use
Triggers for this process

## Steps
1. Step one
2. Step two
3. Step three

## Common Issues
- Issue and resolution

## Owner
Who maintains this SOP
```

### Keeping Docs Current

- Review SOPs quarterly
- Update immediately when process changes
- Owner responsible for accuracy
- Flag outdated docs in Slack

---

## Performance Management

### Metrics by Role

**CSM:**
| Metric | Target | Frequency |
|--------|--------|-----------|
| Client retention | >90% | Monthly |
| NPS | >50 | Quarterly |
| Response time | <4 hours | Ongoing |
| Expansion rate | >10% | Quarterly |

**AE:**
| Metric | Target | Frequency |
|--------|--------|-----------|
| New clients | 5+/month | Monthly |
| Win rate | >25% | Monthly |
| Discovery calls | 20+/month | Monthly |
| Pipeline coverage | 3x quota | Ongoing |

### Feedback Cadence

| Type | Frequency | Format |
|------|-----------|--------|
| 1:1 feedback | Weekly | Verbal |
| Formal review | Quarterly | Written + meeting |
| Peer feedback | Quarterly | 360 format |
| Annual review | Yearly | Comprehensive |

---

## Remote Work Guidelines

### Home Office Setup

**Provided:**
- Laptop
- Monitor (if requested)
- Headset
- Software licenses

**Required:**
- Reliable internet
- Quiet workspace for calls
- Professional background (or virtual)

### Staying Connected

- Camera on for team calls
- Regular Slack presence during core hours
- Loom for async updates
- Monthly virtual team event

### Time Off

| Type | Process |
|------|---------|
| PTO | Request 2+ weeks ahead, Slack + calendar |
| Sick | Slack message morning of, no questions |
| Emergency | Text/call founder, update Slack ASAP |

---

## Security & Compliance

### Password Policy

- Unique passwords for each tool
- Password manager required (1Password/LastPass)
- 2FA on all critical tools
- Never share credentials in Slack

### Data Handling

- Client data stays in approved tools
- No client data on personal devices
- Screen share carefully on calls
- Report any data concerns immediately

### Laptop Security

- Full disk encryption enabled
- Auto-lock after 5 minutes
- Report lost/stolen immediately
- Keep OS and apps updated

---

## Key Takeaways

1. **Over-communicate:** Better to share too much than too little
2. **Document everything:** If it's not written, it didn't happen
3. **Async first:** Don't schedule meetings for things that can be Loom/Slack
4. **Own your work:** Take initiative, don't wait to be told
5. **Help each other:** Team success > individual success
6. **Protect focus:** Use DND when needed, batch communications

---

*Wryko - Autonomous B2B Lead Generation Platform*
*Document Version 1.0 | January 2026*
