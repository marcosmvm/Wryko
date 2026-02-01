# WK-DOC-045: API Documentation
## Wryko Internal API Reference

**Document ID:** WK-DOC-045
**Category:** Technology
**Version:** 1.0
**Last Updated:** January 2026
**Classification:** INTERNAL

---

## Overview

### Base URLs

| Environment | URL |
|-------------|-----|
| Production | https://api.wryko.com |
| n8n Webhooks | https://marcosmatthews.app.n8n.cloud/webhook |
| Supabase | https://[project].supabase.co |

### Authentication

| Method | Use Case | Header |
|--------|----------|--------|
| API Key | Server-to-server | `X-API-Key: {key}` |
| JWT | Client portal | `Authorization: Bearer {token}` |
| Webhook Secret | Inbound webhooks | `X-Webhook-Secret: {secret}` |

### Response Format

All responses return JSON:

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": {
    "request_id": "uuid",
    "timestamp": "ISO8601"
  }
}
```

Error response:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": { ... }
  }
}
```

---

## Engine APIs

### Guardian - Verify Leads

**Endpoint:** `POST /webhook/guardian-verify`

**Purpose:** Verify email list before campaign launch

**Request:**
```json
{
  "client_id": "XG-123456",
  "campaign_id": "camp_abc123",
  "leads": [
    {
      "email": "john@example.com",
      "first_name": "John",
      "last_name": "Smith",
      "company": "Acme Corp",
      "title": "VP Sales"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 100,
    "verified": 85,
    "invalid": 10,
    "dnc": 5,
    "results": [
      {
        "email": "john@example.com",
        "status": "valid",
        "deliverability_score": 95
      }
    ]
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid input
- `429` - Rate limited
- `500` - Server error

---

### Architect - Create Campaign

**Endpoint:** `POST /webhook/architect-create`

**Purpose:** Generate AI-powered campaign copy

**Request:**
```json
{
  "client_id": "XG-123456",
  "campaign_name": "IT Directors Q1",
  "icp": {
    "industries": ["IT Services", "Software"],
    "titles": ["IT Director", "CTO"],
    "company_size": "50-500"
  },
  "value_proposition": "Reduce IT costs by 30%",
  "tone": "professional",
  "sequence_length": 4
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "campaign_id": "camp_xyz789",
    "subject_lines": [
      "{{company}} + IT costs",
      "Quick question about {{company}}'s IT",
      "Saw you're hiring at {{company}}"
    ],
    "emails": [
      {
        "step": 1,
        "subject": "{{company}} + IT costs",
        "body": "Hi {{first_name}},\n\n...",
        "delay_days": 0
      }
    ],
    "instantly_campaign_id": "inst_abc"
  }
}
```

---

### Scientist - Get Test Results

**Endpoint:** `GET /webhook/scientist-results`

**Purpose:** Retrieve A/B test results

**Request:**
```
GET /webhook/scientist-results?campaign_id=camp_abc123
```

**Response:**
```json
{
  "success": true,
  "data": {
    "campaign_id": "camp_abc123",
    "tests": [
      {
        "test_id": "test_001",
        "element": "subject_line",
        "variant_a": {
          "content": "Quick question",
          "sends": 500,
          "opens": 210,
          "open_rate": 0.42
        },
        "variant_b": {
          "content": "{{company}} + growth",
          "sends": 500,
          "opens": 245,
          "open_rate": 0.49
        },
        "winner": "B",
        "confidence": 0.97,
        "status": "completed"
      }
    ]
  }
}
```

---

### Hunter - Trigger Expansion

**Endpoint:** `POST /webhook/hunter-expand`

**Purpose:** Trigger lead expansion from positive reply

**Request:**
```json
{
  "reply_id": "reply_abc123",
  "campaign_id": "camp_xyz",
  "prospect": {
    "email": "responder@company.com",
    "company": "Acme Corp",
    "domain": "acme.com"
  },
  "sentiment": "positive",
  "reply_text": "Sounds interesting, let's schedule a call..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "expansion_id": "exp_abc123",
    "in_company_leads": 8,
    "lookalike_companies": 15,
    "total_new_leads": 45,
    "status": "queued_for_verification"
  }
}
```

---

### Sentinel - Process Visitor

**Endpoint:** `POST /webhook/sentinel-process`

**Purpose:** Process identified website visitor

**Request:**
```json
{
  "client_id": "XG-123456",
  "visitor": {
    "ip": "192.168.1.1",
    "company": "TechCo",
    "domain": "techco.com",
    "pages_viewed": ["/pricing", "/how-it-works"],
    "time_on_site": 180,
    "referrer": "google.com"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "visitor_id": "vis_abc123",
    "company": {
      "name": "TechCo",
      "industry": "Software",
      "size": "100-250",
      "icp_match_score": 85
    },
    "intent_score": 75,
    "classification": "high_intent",
    "contacts_found": 12,
    "action": "queue_for_outreach"
  }
}
```

---

### Keeper - Query Knowledge

**Endpoint:** `POST /webhook/keeper-query`

**Purpose:** Query knowledge base

**Request:**
```json
{
  "query": "How do I pause a campaign?",
  "source": "portal",
  "client_id": "XG-123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "answer": "To pause a campaign, go to the Campaigns section in your portal, click on the campaign, and toggle the status to 'Paused'. The campaign will stop sending immediately.",
    "confidence": 0.95,
    "sources": [
      {
        "document": "FAQ",
        "section": "Campaign Management",
        "relevance": 0.98
      }
    ],
    "follow_up_questions": [
      "How do I resume a paused campaign?",
      "Will pausing affect my metrics?"
    ]
  }
}
```

---

### Navigator - Submit Request

**Endpoint:** `POST /webhook/navigator-request`

**Purpose:** Handle client self-serve requests

**Request:**
```json
{
  "client_id": "XG-123456",
  "request_type": "update_icp",
  "data": {
    "add_industries": ["Healthcare Tech"],
    "remove_titles": ["Manager"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "request_id": "req_abc123",
    "type": "update_icp",
    "category": "instant",
    "status": "completed",
    "message": "ICP updated successfully. Changes will apply to new campaigns."
  }
}
```

---

## Client Portal API

### Get Dashboard Data

**Endpoint:** `GET /api/v1/dashboard`

**Headers:** `Authorization: Bearer {jwt_token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "metrics": {
      "meetings_this_month": 12,
      "reply_rate": 0.085,
      "open_rate": 0.42,
      "emails_sent": 1250
    },
    "trends": {
      "meetings": [
        {"week": "2026-01-06", "count": 3},
        {"week": "2026-01-13", "count": 4}
      ]
    },
    "campaigns": [
      {
        "id": "camp_abc",
        "name": "IT Directors Q1",
        "status": "active",
        "sent": 500,
        "open_rate": 0.45,
        "reply_rate": 0.09
      }
    ],
    "recent_meetings": [
      {
        "date": "2026-01-15",
        "contact": "John Smith",
        "company": "Acme Corp"
      }
    ]
  }
}
```

---

### Get Campaign Details

**Endpoint:** `GET /api/v1/campaigns/{campaign_id}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "camp_abc",
    "name": "IT Directors Q1",
    "status": "active",
    "created_at": "2026-01-01T00:00:00Z",
    "metrics": {
      "total_sent": 2500,
      "opens": 1050,
      "replies": 200,
      "positive_replies": 120,
      "meetings": 15
    },
    "sequence": [
      {
        "step": 1,
        "sent": 2500,
        "opens": 1050,
        "replies": 150
      }
    ],
    "ab_tests": [
      {
        "element": "subject_line",
        "status": "completed",
        "winner": "Variant B"
      }
    ]
  }
}
```

---

### List Meetings

**Endpoint:** `GET /api/v1/meetings`

**Query Parameters:**
- `start_date` - ISO date
- `end_date` - ISO date
- `status` - scheduled|completed|no_show
- `limit` - default 50
- `offset` - pagination

**Response:**
```json
{
  "success": true,
  "data": {
    "meetings": [
      {
        "id": "mtg_abc123",
        "date": "2026-01-20T14:00:00Z",
        "prospect": {
          "name": "John Smith",
          "title": "VP Sales",
          "company": "Acme Corp",
          "email": "john@acme.com"
        },
        "campaign": "IT Directors Q1",
        "status": "scheduled",
        "calendly_link": "https://..."
      }
    ],
    "total": 45,
    "limit": 50,
    "offset": 0
  }
}
```

---

## Webhook Events (Outbound)

### Meeting Booked

Sent when Calendly webhook fires.

**Payload:**
```json
{
  "event": "meeting.booked",
  "timestamp": "2026-01-15T14:30:00Z",
  "data": {
    "meeting_id": "mtg_abc123",
    "client_id": "XG-123456",
    "prospect": {
      "email": "prospect@company.com",
      "name": "Jane Doe",
      "company": "TechCo"
    },
    "meeting_time": "2026-01-20T15:00:00Z",
    "campaign_id": "camp_xyz"
  }
}
```

### Reply Received

Sent when Instantly detects reply.

**Payload:**
```json
{
  "event": "reply.received",
  "timestamp": "2026-01-15T10:00:00Z",
  "data": {
    "reply_id": "reply_abc",
    "client_id": "XG-123456",
    "campaign_id": "camp_xyz",
    "prospect_email": "prospect@company.com",
    "sentiment": "positive",
    "needs_attention": true
  }
}
```

### Health Alert

Sent by The Judge.

**Payload:**
```json
{
  "event": "health.alert",
  "timestamp": "2026-01-15T08:00:00Z",
  "data": {
    "alert_id": "alert_abc",
    "severity": "P2",
    "type": "domain_health",
    "client_id": "XG-123456",
    "message": "Domain xyz.com bounce rate elevated (2.5%)",
    "auto_action_taken": "Campaign paused"
  }
}
```

---

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| Guardian verify | 10 requests | per minute |
| Architect create | 5 requests | per minute |
| Portal API | 100 requests | per minute |
| Webhooks | 1000 requests | per hour |

### Rate Limit Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests",
    "retry_after": 60
  }
}
```

---

## Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| `AUTH_INVALID` | Invalid API key or token | Check credentials |
| `AUTH_EXPIRED` | Token expired | Refresh token |
| `NOT_FOUND` | Resource not found | Check ID |
| `VALIDATION_ERROR` | Invalid input | Check request body |
| `RATE_LIMITED` | Too many requests | Wait and retry |
| `SERVER_ERROR` | Internal error | Contact support |
| `SERVICE_UNAVAILABLE` | Dependency down | Retry later |

---

## SDKs & Examples

### JavaScript/TypeScript

```typescript
import { Wryko } from '@wryko/sdk';

const client = new Wryko({
  apiKey: process.env.WRYKO_API_KEY
});

// Verify leads
const result = await client.guardian.verify({
  clientId: 'XG-123456',
  leads: [...]
});

// Create campaign
const campaign = await client.architect.create({
  clientId: 'XG-123456',
  campaignName: 'IT Directors',
  icp: {...}
});
```

### cURL Examples

```bash
# Verify leads
curl -X POST https://marcosmatthews.app.n8n.cloud/webhook/guardian-verify \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your_api_key" \
  -d '{"client_id": "XG-123456", "leads": [...]}'

# Query knowledge base
curl -X POST https://marcosmatthews.app.n8n.cloud/webhook/keeper-query \
  -H "Content-Type: application/json" \
  -d '{"query": "How do I pause a campaign?"}'
```

---

*Wryko - Autonomous B2B Lead Generation Platform*
*Document Version 1.0 | January 2026*
