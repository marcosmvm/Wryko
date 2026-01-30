# XG-DOC-042: Lead Generation Engine Specifications (A-H)

**Document Type:** Operations & Technical
**Classification:** Internal / Partner-Shareable
**Version:** 1.0
**Last Updated:** January 2026
**Author:** XGrowthOS Engineering

---

## Executive Summary

The XGrowthOS Lead Generation Suite consists of five interconnected automation engines (A-H, with C, F, G designated for future expansion) designed to automate the entire outbound lead generation process. These engines handle prospect verification, campaign creation, continuous optimization, lead expansion, and website visitor intelligence.

This document provides technical and strategic context for each engine, including its purpose, operational logic, and business impact.

---

## The Five Core Engines at a Glance

| Engine | Name | Primary Function | Trigger Type |
|--------|------|------------------|--------------|
| **A** | The Guardian | Compliance & Deliverability | Webhook (On Lead Upload) + Scheduled |
| **B** | The Architect | AI Campaign Creation | Webhook (On New Campaign) |
| **C** | The Scientist | A/B Testing & Optimization | Scheduled (Mon/Wed) |
| **D** | The Hunter | Lead Expansion from Replies | Webhook (On Positive Reply) |
| **E** | The Sentinel | Website Visitor Intelligence | Webhook (On Visitor ID) |

*Note: Engines F, G, H are reserved for future capabilities (multi-channel, predictive scoring, etc.)*

---

## Engine A: The Guardian
### Compliance & Deliverability Protection

**Purpose:**
Protect client domain reputation and ensure all outbound campaigns meet deliverability best practices and compliance requirements. The Guardian is the first line of defense against bounces, spam complaints, and blacklisting.

**How It Works:**

### Phase 1: Lead Verification
1. Receives lead list via webhook or file upload
2. Validates email format (syntax check)
3. Verifies MX records exist for each domain
4. Checks email deliverability via verification API (NeverBounce/ZeroBounce)
5. Removes catch-all and risky emails
6. Deduplicates against existing campaign lists
7. Returns verified list with quality scores

### Phase 2: DNC & Compliance Check
1. Cross-references leads against client DNC list
2. Checks against global suppression list
3. Validates GDPR/CCPA compliance flags
4. Removes competitor companies
5. Removes existing customers (from CRM sync)
6. Flags leads requiring special handling

### Phase 3: Domain Health Monitoring
1. Checks SPF, DKIM, DMARC records
2. Monitors blacklist status (daily across 50+ lists)
3. Tracks spam complaint rates
4. Monitors bounce rates per domain
5. Tracks sender reputation scores
6. Alerts on threshold violations

**Triggers:**
- Webhook POST to `/guardian-verify` (lead verification)
- Scheduled every 24 hours (domain health check)
- Webhook POST to `/guardian-alert` (external monitoring)

**Verification Thresholds:**

| Check | Pass | Warning | Fail |
|-------|------|---------|------|
| Email Syntax | Valid | - | Invalid |
| MX Record | Exists | - | Missing |
| Deliverability Score | >80% | 60-80% | <60% |
| Catch-All | No | - | Yes (flag) |
| DNC Match | No match | - | Match (remove) |

**Domain Health Thresholds:**

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Bounce Rate | <2% | 2-3% | >3% |
| Spam Complaints | <0.1% | 0.1-0.3% | >0.3% |
| Blacklist Status | Clear | - | Listed |
| SPF/DKIM/DMARC | All pass | 1 missing | 2+ missing |

**Output:**
- Verified lead list (CSV/JSON)
- Verification report with statistics
- Domain health dashboard update
- Alerts to #alerts-critical (if issues detected)
- Incident logged to Incident_Log (if failures)

**Data Sources:**
- NeverBounce / ZeroBounce (email verification)
- MXToolbox API (blacklist monitoring)
- Google Postmaster Tools (sender reputation)
- Client CRM (existing customers)
- Internal DNC database

**Business Impact:**
- **Deliverability:** Maintain 95%+ inbox placement
- **Reputation:** Protect domains from blacklisting
- **Compliance:** Avoid legal issues (GDPR, CAN-SPAM)
- **Efficiency:** Stop wasting sends on bad emails

---

## Engine B: The Architect
### AI-Powered Campaign Creation

**Purpose:**
Transform ICP definitions and targeting criteria into complete, ready-to-launch cold email campaigns. The Architect uses GPT-4 to generate personalized, high-converting email sequences based on proven templates and client-specific value propositions.

**How It Works:**

### Phase 1: Input Analysis
1. Receives campaign request with ICP details
2. Parses target industry, titles, company size
3. Extracts client value proposition and differentiators
4. Identifies key pain points and triggers
5. Selects appropriate campaign archetype

### Phase 2: Template Selection
1. Searches Master Library for similar campaigns
2. Ranks templates by historical performance
3. Selects top 3-5 templates for adaptation
4. Identifies winning elements (subject lines, CTAs, hooks)

### Phase 3: Content Generation
1. Generates 3 subject line variants (A/B testing ready)
2. Creates personalized opening hooks
3. Writes value proposition pitch
4. Crafts soft and hard CTAs
5. Generates 3-5 email sequence
6. Creates follow-up variations

### Phase 4: Quality Assurance
1. Checks spam trigger words
2. Validates personalization variables
3. Ensures mobile-friendly formatting
4. Verifies link functionality
5. Calculates readability score
6. Estimates deliverability impact

**Trigger:** Webhook POST to `/architect-create`

**Input Payload:**
```json
{
  "client_id": "XG-123456",
  "campaign_name": "IT Directors - Q1 2026",
  "icp": {
    "industries": ["IT Services", "Software"],
    "company_size": "50-500",
    "titles": ["IT Director", "CTO", "VP Technology"],
    "geography": "United States"
  },
  "value_proposition": "Reduce IT costs by 30% with managed services",
  "differentiators": ["24/7 support", "No contracts", "SOC 2 certified"],
  "tone": "professional",
  "sequence_length": 4
}
```

**Output:**
- Complete email sequence (JSON)
- Subject line variants
- Personalization variable mapping
- Recommended send schedule
- Campaign configured in Instantly.ai
- Notification to CSM for approval

**Campaign Archetypes:**

| Archetype | Use Case | Sequence Length |
|-----------|----------|-----------------|
| **Problem-Aware** | Prospects know their pain | 3-4 emails |
| **Solution-Aware** | Prospects evaluating options | 4-5 emails |
| **Unaware** | Cold outreach, education needed | 5-6 emails |
| **Re-Engagement** | Previous non-responders | 2-3 emails |
| **Event-Triggered** | Funding, hiring, news | 2-3 emails |

**Personalization Variables:**

| Variable | Source | Example |
|----------|--------|---------|
| `{{first_name}}` | Lead data | "John" |
| `{{company}}` | Lead data | "Acme Corp" |
| `{{title}}` | Lead data | "IT Director" |
| `{{industry}}` | Enrichment | "Financial Services" |
| `{{company_size}}` | Enrichment | "150 employees" |
| `{{recent_news}}` | AI research | "just raised Series B" |
| `{{mutual_connection}}` | LinkedIn | "Sarah mentioned..." |

**Quality Metrics:**

| Metric | Target | Measurement |
|--------|--------|-------------|
| Spam Score | <3 | SpamAssassin |
| Reading Level | 8th grade | Flesch-Kincaid |
| Word Count | 50-100 | Per email |
| CTA Clarity | Clear action | Manual review |

**Business Impact:**
- **Speed:** Campaign creation in minutes, not days
- **Consistency:** Every campaign follows proven frameworks
- **Quality:** AI-optimized copy beats generic templates
- **Scale:** Handle 10x more campaigns without more headcount

---

## Engine C: The Scientist
### A/B Testing & Optimization

**Purpose:**
Continuously improve campaign performance through systematic A/B testing. The Scientist runs experiments on subject lines, email copy, CTAs, and send times, automatically deploying winners and retiring underperformers.

**How It Works:**

### Monday Cycle: Launch Tests
1. Identifies active campaigns eligible for testing
2. Analyzes current performance metrics
3. Generates test hypotheses based on data
4. Creates variant content (subject lines, hooks, CTAs)
5. Configures A/B splits in Instantly.ai
6. Logs tests to Experiments_Log

### Wednesday Cycle: Analyze Results
1. Pulls performance data from Instantly.ai
2. Calculates statistical significance
3. Identifies winners (95% confidence)
4. Deploys winners to remaining audience
5. Generates optimization report
6. Updates Master Library with winning elements

### Continuous: Performance Monitoring
1. Tracks open rates in real-time
2. Monitors reply rates
3. Detects performance degradation
4. Triggers alerts when metrics drop
5. Recommends intervention when needed

**Triggers:**
- Scheduled Monday 6:00 AM (launch tests)
- Scheduled Wednesday 6:00 AM (analyze results)
- Webhook (manual test request)

**Test Types:**

| Element | Variants | Sample Size | Duration |
|---------|----------|-------------|----------|
| Subject Line | 2-4 | 100+ opens | 48 hours |
| Opening Hook | 2 | 50+ opens | 48 hours |
| CTA | 2 | 50+ opens | 72 hours |
| Send Time | 3-4 | 100+ sends | 1 week |
| Sequence Length | 2 | 100+ sends | 2 weeks |

**Statistical Framework:**

| Metric | Minimum Sample | Confidence Level |
|--------|----------------|------------------|
| Open Rate | 100 opens | 95% |
| Reply Rate | 30 replies | 90% |
| Meeting Rate | 10 meetings | 85% |

**Optimization Actions:**

| Condition | Action |
|-----------|--------|
| Winner found (95% conf) | Deploy to full audience |
| No winner (tied) | Extend test or pivot |
| Loser identified | Pause variant immediately |
| Performance degradation | Alert CSM, pause for review |

**Output:**
- Test results logged to Experiments_Log
- Winner deployed to campaign
- Optimization report (weekly)
- Master Library updated with winning elements
- Slack notification to #campaign-optimization

**Performance Benchmarks:**

| Metric | Below Target | On Target | Exceeding |
|--------|--------------|-----------|-----------|
| Open Rate | <30% | 30-45% | >45% |
| Reply Rate | <5% | 5-10% | >10% |
| Positive Reply % | <40% | 40-60% | >60% |

**Business Impact:**
- **Improvement:** 15-25% lift in reply rates over time
- **Data-Driven:** No guesswork in optimization
- **Compounding:** Winning elements feed future campaigns
- **Efficiency:** Automated testing at scale

---

## Engine D: The Hunter
### Lead Expansion from Replies

**Purpose:**
Multiply pipeline opportunities by expanding from every positive reply. When a prospect responds positively, The Hunter identifies similar companies and additional contacts within the responding company, creating a compounding growth effect.

**How It Works:**

### Phase 1: Reply Classification
1. Receives reply webhook from Instantly.ai
2. Analyzes sentiment (positive, neutral, negative, OOO)
3. Classifies intent (interested, meeting request, question, objection)
4. Logs reply to Replies_Log
5. Routes to appropriate workflow

### Phase 2: In-Company Expansion (Positive Replies)
1. Identifies responding company
2. Searches for additional decision-makers (5-10 contacts)
3. Filters by target titles and seniority
4. Deduplicates against existing outreach
5. Creates warm referral campaign

### Phase 3: Lookalike Expansion
1. Analyzes responding company profile
2. Identifies key attributes (industry, size, tech stack, location)
3. Searches for similar companies (10-20 matches)
4. Enriches with decision-maker contacts
5. Validates against ICP criteria
6. Creates lookalike campaign

### Phase 4: Campaign Launch
1. Sends expanded leads through The Guardian (verification)
2. Creates personalized sequences via The Architect
3. Launches campaigns within 24-48 hours
4. Logs expansion to Expansion_Log
5. Notifies CSM of new pipeline

**Trigger:** Webhook POST from Instantly.ai (reply detected)

**Reply Classification:**

| Sentiment | Intent | Action |
|-----------|--------|--------|
| Positive | Meeting request | Forward to client, trigger expansion |
| Positive | Interested | Continue sequence, trigger expansion |
| Positive | Question | Answer and continue sequence |
| Neutral | More info | Continue sequence with info |
| Negative | Objection | Route to CSM for handling |
| Negative | Unsubscribe | Remove from campaign, update DNC |
| Auto | OOO | Reschedule follow-up |

**Expansion Criteria:**

| In-Company Expansion | Lookalike Expansion |
|---------------------|---------------------|
| Same company as responder | Similar industry |
| Different department/title | Similar company size |
| Decision-maker level | Similar geography |
| Not already contacted | Similar tech stack |
| Valid email | Not already contacted |

**Output:**
- Reply logged with classification
- Meeting forwarded to client (if applicable)
- Expansion leads identified
- New campaigns launched
- Expansion metrics tracked
- Notification to #positive-replies

**Expansion Metrics:**

| Metric | Target |
|--------|--------|
| In-Company Contacts | 5-10 per positive reply |
| Lookalike Companies | 10-20 per positive reply |
| Contacts per Lookalike | 2-5 per company |
| Total Expansion | 25-50 leads per positive reply |
| Expansion to Meeting Rate | 5-10% |

**Business Impact:**
- **Compounding Growth:** Every win creates more opportunities
- **Warm Leads:** Referral-based outreach converts 2-3x better
- **Efficiency:** Automated expansion at scale
- **Pipeline Multiplication:** 10 meetings → 250-500 new prospects

---

## Engine E: The Sentinel
### Website Visitor Intelligence

**Purpose:**
Identify anonymous website visitors and convert them into actionable prospects. The Sentinel monitors client websites for B2B traffic, identifies the companies behind the visits, and enriches with decision-maker contacts for targeted outreach.

**How It Works:**

### Phase 1: Visitor Detection
1. Tracking script on client website captures IP addresses
2. Filters out known bots, crawlers, and internal traffic
3. Groups sessions by company identifier
4. Tracks page views, time on site, and content consumed
5. Calculates engagement score

### Phase 2: Company Identification
1. Performs IP-to-company reverse lookup (RB2B/Clearbit)
2. Enriches company data (size, industry, revenue)
3. Matches against ICP criteria
4. Scores fit and intent
5. Prioritizes high-value visitors

### Phase 3: Contact Enrichment
1. Searches for decision-makers at identified companies
2. Filters by target titles and departments
3. Verifies email addresses
4. Creates prospect profiles (8-15 contacts per company)
5. Adds to outreach queue

### Phase 4: Campaign Trigger
1. High-intent visitors → immediate outreach
2. Medium-intent visitors → nurture sequence
3. Low-intent visitors → retargeting list
4. Sends leads through The Guardian
5. Launches campaigns via The Architect

**Trigger:**
- Webhook POST to `/sentinel-process` (visitor identified)
- Scheduled daily (batch processing)

**Visitor Scoring:**

| Signal | Points | Weight |
|--------|--------|--------|
| Visited pricing page | +30 | High intent |
| Viewed 3+ pages | +20 | Engagement |
| Time on site >3 min | +15 | Interest |
| Returned visit | +25 | Consideration |
| Downloaded content | +35 | High intent |
| Visited competitors | +10 | In-market |
| Company matches ICP | +20 | Fit |

**Intent Classification:**

| Score | Classification | Action |
|-------|----------------|--------|
| 80+ | High Intent | Immediate personalized outreach |
| 50-79 | Medium Intent | Targeted campaign within 24h |
| 25-49 | Low Intent | Add to nurture sequence |
| <25 | Minimal | Monitor only |

**Output:**
- Visitor activity logged to Visitors_Log
- Identified companies and contacts
- Intent scores and classifications
- Campaign recommendations
- Leads added to outreach queue
- Weekly visitor report

**Privacy & Compliance:**

| Consideration | Handling |
|---------------|----------|
| GDPR | IP-based identification only, no personal tracking |
| Cookie Consent | Respects opt-outs |
| Data Retention | 90 days maximum |
| Opt-Out | Honor immediately |

**Business Impact:**
- **Hidden Pipeline:** Identify prospects already interested
- **Timing:** Reach out while interest is hot
- **Personalization:** Reference their website behavior
- **Conversion:** Visitor-identified leads convert 3-5x better

---

## System Integration

### Data Flow Between Engines

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      LEAD GENERATION ENGINE FLOW                             │
└─────────────────────────────────────────────────────────────────────────────┘

     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
     │   APOLLO    │     │   CLIENT    │     │   WEBSITE   │
     │  LEAD DATA  │     │   CRM       │     │   TRAFFIC   │
     └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
            │                   │                   │
            ▼                   │                   ▼
     ┌─────────────────────────────────────────────────────┐
     │              ENGINE A: THE GUARDIAN                  │
     │   • Verify emails    • Check DNC    • Domain health  │
     └─────────────────────────┬───────────────────────────┘
                               │
                               ▼
     ┌─────────────────────────────────────────────────────┐
     │              ENGINE B: THE ARCHITECT                 │
     │   • Generate copy    • Create sequences              │
     └─────────────────────────┬───────────────────────────┘
                               │
                               ▼
     ┌─────────────────────────────────────────────────────┐
     │                  INSTANTLY.AI                        │
     │   • Send emails    • Track opens/replies             │
     └─────────────────────────┬───────────────────────────┘
                               │
            ┌──────────────────┼──────────────────┐
            │                  │                  │
            ▼                  ▼                  ▼
     ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
     │   ENGINE C  │    │   ENGINE D  │    │  CALENDLY   │
     │  SCIENTIST  │    │   HUNTER    │    │  MEETING    │
     │   (A/B)     │    │  (Expand)   │    │  BOOKED     │
     └──────┬──────┘    └──────┬──────┘    └─────────────┘
            │                  │
            │                  │
            └────────┬─────────┘
                     │
                     ▼
              LOOP BACK TO GUARDIAN
              (New Expansion Leads)


     ┌─────────────────────────────────────────────────────┐
     │              ENGINE E: THE SENTINEL                  │
     │   Website Visitors → Identification → Guardian       │
     └─────────────────────────────────────────────────────┘
```

---

## Environment Variables

| Variable | Purpose | Engine(s) |
|----------|---------|-----------|
| `INSTANTLY_API_KEY` | Email platform access | A, B, C, D |
| `INSTANTLY_WORKSPACE_ID` | Workspace identifier | A, B, C, D |
| `APOLLO_API_KEY` | Lead data enrichment | A, D, E |
| `NEVERBOUNCE_API_KEY` | Email verification | A |
| `MXTOOLBOX_API_KEY` | Blacklist monitoring | A |
| `OPENAI_API_KEY` | AI content generation | B, D |
| `RB2B_API_KEY` | Visitor identification | E |
| `CLEARBIT_API_KEY` | Company enrichment | E |

---

## Required Credentials

| Credential | Type | Engines |
|------------|------|---------|
| Instantly.ai OAuth2 | OAuth2 | A, B, C, D |
| Apollo.io API | API Key | A, D, E |
| NeverBounce API | API Key | A |
| OpenAI API | API Key | B, D |
| RB2B / Clearbit | API Key | E |
| Slack OAuth2 | OAuth2 | All |
| Google Sheets OAuth2 | OAuth2 | All |

---

## Slack Channels

| Channel | Purpose | Engines |
|---------|---------|---------|
| #lead-verification | Verification reports, issues | A |
| #campaign-launches | New campaigns created | B |
| #campaign-optimization | A/B test results | C |
| #positive-replies | Positive reply notifications | D |
| #lead-expansion | Expansion activity | D |
| #website-visitors | High-intent visitor alerts | E |
| #alerts-critical | Critical issues | All |

---

## Implementation Metrics

### Time Savings Per Engine

| Engine | Manual Time | Automated Time | Savings |
|--------|-------------|----------------|---------|
| A - Guardian | 2-3 hrs/campaign | 5 min | 95% |
| B - Architect | 3-4 hrs/campaign | 10 min | 95% |
| C - Scientist | 2-3 hrs/week | 15 min (review) | 90% |
| D - Hunter | 4-5 hrs/positive reply | 15 min | 95% |
| E - Sentinel | 2-3 hrs/day | 30 min (review) | 85% |

### Performance Impact

| Metric | Before Engines | With Engines | Improvement |
|--------|----------------|--------------|-------------|
| Campaign Launch Time | 5-7 days | 1-2 days | 3-5x faster |
| Reply Rate | 5% (industry avg) | 8%+ | 60%+ higher |
| Leads per Positive Reply | 0 (no expansion) | 25-50 | New capability |
| Website Visitor Capture | 0% | 15-25% | New capability |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial release with 5 core engines |

---

## Related Documents

- [XG-DOC-027](XG-DOC-027-CSM-Suite-Engine-Architecture.md): CSM Suite Engine Architecture
- [XG-DOC-041](XG-DOC-041-System-Architecture.md): System Architecture Diagram
- [XG-DOC-004](XG-DOC-004-Performance-Metrics-Guide.md): Performance Metrics Guide
- [XG-DOC-009](XG-DOC-009-Troubleshooting-Guide.md): Troubleshooting Guide

---

*This document is part of the XGrowthOS operational documentation suite. For questions or updates, contact the Engineering team.*
