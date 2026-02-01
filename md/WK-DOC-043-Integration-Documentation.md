# WK-DOC-043: Integration Documentation
## Third-Party Connections & APIs

**Document ID:** WK-DOC-043
**Category:** Technology & Integration
**Version:** 1.0
**Last Updated:** January 2026
**Classification:** INTERNAL

---

## Executive Summary

This document details all third-party integrations used by Wryko, including configuration, authentication, and troubleshooting.

---

## Integration Overview

### Active Integrations

| Service | Category | Purpose | Status |
|---------|----------|---------|--------|
| Instantly.ai | Email | Campaign sending & management | Active |
| Apollo.io | Data | Lead enrichment & prospecting | Active |
| Supabase | Database | Data storage & auth | Active |
| n8n Cloud | Automation | Workflow orchestration | Active |
| OpenAI | AI | Content generation | Active |
| Slack | Communication | Alerts & notifications | Active |
| Calendly | Scheduling | Meeting booking | Active |
| Stripe | Payments | Billing & subscriptions | Active |
| HubSpot | CRM | Client CRM sync | Optional |
| Salesforce | CRM | Client CRM sync | Optional |

---

## Instantly.ai Integration

### Overview

| Attribute | Details |
|-----------|---------|
| Purpose | Cold email sending, campaign management |
| Auth Type | API Key |
| Documentation | https://developer.instantly.ai |

### Configuration

**Environment Variables:**
```bash
INSTANTLY_API_KEY=your_api_key
INSTANTLY_WORKSPACE_ID=your_workspace_id
```

### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/campaign/list` | GET | List all campaigns |
| `/api/v1/campaign/create` | POST | Create new campaign |
| `/api/v1/campaign/status` | POST | Update campaign status |
| `/api/v1/lead/add` | POST | Add leads to campaign |
| `/api/v1/analytics` | GET | Campaign analytics |
| `/api/v1/email/reply` | GET | Get replies |

### Webhook Configuration

**Incoming Webhooks (from Instantly):**

| Event | Webhook URL | Action |
|-------|-------------|--------|
| Reply received | `/webhook/instantly/reply` | Trigger Hunter engine |
| Email bounced | `/webhook/instantly/bounce` | Update lead status |
| Email opened | `/webhook/instantly/open` | Log engagement |

### Rate Limits

| Limit | Value |
|-------|-------|
| API calls | 1000/hour |
| Bulk operations | 10,000 leads/request |

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid API key | Regenerate key in Instantly dashboard |
| 429 Too Many Requests | Rate limit hit | Implement exponential backoff |
| Campaign not sending | Warmup incomplete | Wait for domain warmup |

---

## Apollo.io Integration

### Overview

| Attribute | Details |
|-----------|---------|
| Purpose | Lead data, email finding, enrichment |
| Auth Type | API Key |
| Documentation | https://apolloio.github.io/apollo-api-docs |

### Configuration

```bash
APOLLO_API_KEY=your_api_key
```

### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v1/people/search` | POST | Find contacts |
| `/v1/people/match` | POST | Enrich contact |
| `/v1/organizations/search` | POST | Find companies |
| `/v1/email_addresses/lookup` | POST | Verify email |

### Rate Limits

| Plan | Limit |
|------|-------|
| Basic | 10,000 credits/month |
| Professional | 60,000 credits/month |
| Organization | 120,000 credits/month |

### Credit Usage

| Action | Credits |
|--------|---------|
| Person search | 1/result |
| Email lookup | 1/email |
| Company search | 1/result |
| Enrichment | 1/record |

---

## Supabase Integration

### Overview

| Attribute | Details |
|-----------|---------|
| Purpose | Database, authentication, edge functions |
| Auth Type | JWT + Service Role Key |
| Documentation | https://supabase.com/docs |

### Configuration

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

### Database Tables

| Table | Purpose | RLS |
|-------|---------|-----|
| clients | Client records | Yes |
| campaigns | Campaign data | Yes |
| campaign_metrics | Daily metrics | Yes |
| meetings | Booked meetings | Yes |
| domains | Sending domains | Yes |
| incidents | Issue log | Yes |
| health_scores | Client health | Yes |

### Authentication

**Client Portal:**
- Magic link authentication
- JWT tokens (1 hour expiry)
- Session management via Supabase Auth

**Admin Portal:**
- Email/password authentication
- Role-based access control
- Service role for admin operations

### Edge Functions

| Function | Trigger | Purpose |
|----------|---------|---------|
| `on-meeting-booked` | Calendly webhook | Process new meeting |
| `on-payment-received` | Stripe webhook | Update client status |
| `generate-report` | Cron (weekly) | Create client reports |

---

## n8n Cloud Integration

### Overview

| Attribute | Details |
|-----------|---------|
| Purpose | Workflow automation for all 11 engines |
| Instance | https://marcosmatthews.app.n8n.cloud |
| Auth Type | API Key + Webhook URLs |

### Webhook URLs

| Engine | URL | Method |
|--------|-----|--------|
| Guardian | `/webhook/guardian-verify` | POST |
| Architect | `/webhook/architect-create` | POST |
| Scientist | `/webhook/scientist-analyze` | POST |
| Hunter | `/webhook/hunter-expand` | POST |
| Sentinel | `/webhook/sentinel-process` | POST |
| Informant | `/webhook/informant-report` | POST |
| Judge | `/webhook/judge-monitor` | POST |
| Keeper | `/webhook/keeper-query` | POST |
| Launcher | `/webhook/launcher-init` | POST |
| Monitor | `/webhook/monitor-score` | POST |
| Navigator | `/webhook/navigator-request` | POST |

### Scheduled Workflows

| Workflow | Schedule | Purpose |
|----------|----------|---------|
| The Informant | Sunday 8 PM | Weekly reports |
| The Judge | Every 4 hours | Health monitoring |
| The Scientist | Mon/Wed 6 AM | A/B test analysis |
| The Monitor | Monday 6 AM | Churn risk scoring |

### Credentials Stored

| Credential | Type | Used By |
|------------|------|---------|
| Google Sheets | OAuth2 | All engines |
| Instantly API | Header Auth | Guardian, Scientist |
| OpenAI | API Key | Architect, Keeper, Monitor |
| Slack | OAuth2 | All engines |
| Apollo | API Key | Hunter, Sentinel |

---

## OpenAI Integration

### Overview

| Attribute | Details |
|-----------|---------|
| Purpose | AI content generation, analysis |
| Model | GPT-4o |
| Auth Type | API Key |

### Configuration

```bash
OPENAI_API_KEY=sk-xxx
```

### Use Cases

| Engine | Use Case | Model |
|--------|----------|-------|
| Architect | Campaign copy generation | GPT-4o |
| Informant | Report summaries | GPT-4o |
| Keeper | Knowledge retrieval | GPT-4o |
| Monitor | Intervention playbooks | GPT-4o |
| Hunter | Reply classification | GPT-4o |

### Rate Limits

| Tier | TPM | RPM |
|------|-----|-----|
| Tier 1 | 90K | 500 |
| Tier 2 | 450K | 5,000 |
| Tier 3 | 1M | 5,000 |

### Cost Management

| Model | Input | Output |
|-------|-------|--------|
| GPT-4o | $0.01/1K tokens | $0.03/1K tokens |
| GPT-4o-mini | $0.00015/1K | $0.0006/1K |

**Budget Alert:** Set up billing alerts at 80% of limit.

---

## Slack Integration

### Overview

| Attribute | Details |
|-----------|---------|
| Purpose | Team notifications, alerts, commands |
| Auth Type | OAuth2 Bot Token |

### Configuration

```bash
SLACK_BOT_TOKEN=xoxb-xxx
SLACK_SIGNING_SECRET=xxx
```

### Channels

| Channel | Purpose | Engines |
|---------|---------|---------|
| #alerts-critical | P1 issues | Judge, Monitor |
| #alerts-general | P2-P4 issues | Judge |
| #client-reports | Report delivery | Informant |
| #new-clients | Onboarding | Launcher |
| #positive-replies | Win notifications | Hunter |
| #referrals | Referral tracking | Navigator |

### Slash Commands

| Command | Action |
|---------|--------|
| `/ask [question]` | Query The Keeper |
| `/client [id]` | Get client status |
| `/health` | System health check |

---

## Calendly Integration

### Overview

| Attribute | Details |
|-----------|---------|
| Purpose | Meeting booking, scheduling |
| Auth Type | OAuth2 / API Key |

### Configuration

```bash
CALENDLY_API_KEY=xxx
CALENDLY_WEBHOOK_SECRET=xxx
```

### Webhook Events

| Event | Action |
|-------|--------|
| `invitee.created` | New meeting booked → Create meeting record |
| `invitee.canceled` | Meeting cancelled → Update status |

### Integration Flow

```
Prospect books → Calendly webhook → Supabase →
CRM sync → Slack notification → The Hunter (expansion)
```

---

## Stripe Integration

### Overview

| Attribute | Details |
|-----------|---------|
| Purpose | Billing, subscriptions, invoicing |
| Auth Type | Secret Key |

### Configuration

```bash
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

### Products

| Product | Price ID | Amount |
|---------|----------|--------|
| Onboarding (FP) | price_fp_onboard | $2,500 |
| Monthly Retainer (FP) | price_fp_monthly | $2,000/mo |
| Meeting Bonus | price_meeting | $250/each |
| Onboarding (Official) | price_official_onboard | $5,000 |
| Monthly Retainer (Official) | price_official_monthly | $4,000/mo |

### Webhook Events

| Event | Action |
|-------|--------|
| `invoice.paid` | Mark invoice paid, update client |
| `invoice.payment_failed` | Alert team, notify client |
| `customer.subscription.deleted` | Mark client churned |

---

## CRM Integrations

### HubSpot

**Configuration:**
```bash
HUBSPOT_API_KEY=xxx
# or OAuth2
HUBSPOT_ACCESS_TOKEN=xxx
```

**Sync Points:**
- Meeting booked → Create/update contact
- Positive reply → Create contact + deal
- Meeting completed → Update deal stage

### Salesforce

**Configuration:**
```bash
SALESFORCE_CLIENT_ID=xxx
SALESFORCE_CLIENT_SECRET=xxx
SALESFORCE_REFRESH_TOKEN=xxx
```

**Sync Points:**
- Same as HubSpot
- Custom object mapping available

---

## Troubleshooting

### Common Issues

| Issue | Service | Solution |
|-------|---------|----------|
| Webhook not firing | n8n | Check workflow is active |
| Auth failed | Any | Refresh credentials |
| Rate limited | Apollo/Instantly | Add delays, check usage |
| Data not syncing | CRM | Check field mapping |
| Emails not sending | Instantly | Check domain health |

### Health Checks

| Service | Check URL | Expected |
|---------|-----------|----------|
| Supabase | `/health` | 200 OK |
| n8n | `/healthz` | 200 OK |
| Instantly API | `/api/v1/status` | 200 OK |

### Monitoring

All integrations monitored via:
- The Judge (4-hour checks)
- Slack alerts for failures
- Error logging in Supabase

---

## Security Best Practices

1. **Rotate keys quarterly** for all services
2. **Use environment variables** - never hardcode
3. **Principle of least privilege** - minimal scopes
4. **Audit access** - review who has credentials
5. **Monitor usage** - set up billing alerts
6. **Secure webhooks** - validate signatures

---

*Wryko - Autonomous B2B Lead Generation Platform*
*Document Version 1.0 | January 2026*
