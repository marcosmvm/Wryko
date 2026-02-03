# WK-DOC-034: Unit Economics Model
## Wryko Financial Analysis

**Document ID:** WK-DOC-034
**Category:** Financial Modeling
**Version:** 1.0
**Last Updated:** January 2026
**Classification:** INTERNAL

---

## Executive Summary

This document provides a detailed analysis of Wryko unit economics, including customer lifetime value (LTV), customer acquisition cost (CAC), margins, break-even analysis, and stress testing. These metrics inform pricing decisions, hiring plans, and growth strategy.

---

## Revenue Model Overview

### Revenue Streams

| Stream | Amount | Type | When |
|--------|--------|------|------|
| **Onboarding Fee** | $2,500 (Founding) / $5,000 (Official) | One-time | Day 0 |
| **Monthly Retainer** | $2,000 (Founding) / $4,000 (Official) | Recurring | Monthly |
| **Meeting Bonus** | $250 (Founding) / $350 (Official) | Performance | Per qualified meeting |

### Revenue Per Client Scenarios

**Scenario A: Conservative (8 meetings/month)**

| Component | Founding Partner | Official Client |
|-----------|------------------|-----------------|
| Onboarding | $2,500 | $5,000 |
| Monthly Retainer | $2,000 | $4,000 |
| Meeting Bonus (8 × $250/$350) | $2,000 | $2,800 |
| **Monthly Recurring** | **$4,000** | **$6,800** |
| **Annual Revenue** | **$50,500** | **$86,600** |

**Scenario B: Target (10 meetings/month)**

| Component | Founding Partner | Official Client |
|-----------|------------------|-----------------|
| Onboarding | $2,500 | $5,000 |
| Monthly Retainer | $2,000 | $4,000 |
| Meeting Bonus (10 × $250/$350) | $2,500 | $3,500 |
| **Monthly Recurring** | **$4,500** | **$7,500** |
| **Annual Revenue** | **$56,500** | **$95,000** |

**Scenario C: Outperform (15 meetings/month)**

| Component | Founding Partner | Official Client |
|-----------|------------------|-----------------|
| Onboarding | $2,500 | $5,000 |
| Monthly Retainer | $2,000 | $4,000 |
| Meeting Bonus (15 × $250/$350) | $3,750 | $5,250 |
| **Monthly Recurring** | **$5,750** | **$9,250** |
| **Annual Revenue** | **$71,500** | **$116,000** |

---

## Cost Structure

### Direct Costs (Cost of Goods Sold)

| Cost Item | Monthly Cost | Per Client | Notes |
|-----------|--------------|------------|-------|
| **Instantly.ai** | $97-497 | ~$50-100 | Email sending (shared across clients) |
| **Apollo.io** | $99-399 | ~$25-50 | Lead data |
| **n8n Cloud** | $50+ | ~$20-40 | Automation credits |
| **Domain Costs** | ~$30 | $30 | 3 domains per client × $10/year |
| **Email Warmup** | Variable | ~$50 | First 30 days only |
| **OpenAI API** | Variable | ~$20-50 | AI-generated content |
| **Total Variable** | - | **$175-320** | Per client per month |

**Average Direct Cost:** $250/client/month

### Fixed Overhead

| Cost Item | Monthly | Annual | Notes |
|-----------|---------|--------|-------|
| **Supabase** | $25-300 | $300-3,600 | Database + auth |
| **Vercel** | $20-100 | $240-1,200 | Hosting |
| **Software Tools** | $200-500 | $2,400-6,000 | CRM, analytics, etc. |
| **Virtual Office** | $50-150 | $600-1,800 | Business address |
| **Legal/Accounting** | $300-500 | $3,600-6,000 | Professional services |
| **Insurance** | $200-400 | $2,400-4,800 | E&O, general liability |
| **Total Fixed** | **$800-1,950** | **$9,600-23,400** | |

**Average Fixed Overhead:** $1,200/month ($14,400/year)

### Labor Costs (Current: Founder-Led)

| Role | Status | Monthly Cost | Notes |
|------|--------|--------------|-------|
| Founder/CEO | Active | $0 (initially) | Equity-only during bootstrapping |
| Success Manager | Future hire | $5,000-7,000 | At 10+ clients |
| Sales AE | Future hire | $6,000-10,000 | At 20+ clients |

---

## Gross Margin Analysis

### Per Client Margin

**Founding Partner (10 meetings/month scenario):**

| Item | Amount |
|------|--------|
| Monthly Revenue | $4,500 |
| Direct Costs | $250 |
| **Gross Profit** | **$4,250** |
| **Gross Margin** | **94.4%** |

**Official Client (10 meetings/month scenario):**

| Item | Amount |
|------|--------|
| Monthly Revenue | $7,500 |
| Direct Costs | $250 |
| **Gross Profit** | **$7,250** |
| **Gross Margin** | **96.7%** |

### Blended Margin Analysis

| Scenario | Founding Partners | Official Clients | Blended Gross Margin |
|----------|-------------------|------------------|---------------------|
| Early Stage (80/20) | 80% | 20% | 94.8% |
| Growth Stage (50/50) | 50% | 50% | 95.5% |
| Scale Stage (20/80) | 20% | 80% | 96.3% |

---

## Customer Acquisition Cost (CAC)

### CAC Components

| Cost Category | Description | Estimated Cost |
|---------------|-------------|----------------|
| **Sales Time** | Founder hours × imputed cost ($100/hr) | ~20 hrs = $2,000 |
| **Marketing/Outreach** | Tools, ads, content | ~$500 |
| **Lead Data** | Apollo credits consumed | ~$100 |
| **Sales Collateral** | Proposals, demos | ~$100 |
| **Discovery Calls** | Time investment | ~$300 |
| **Total CAC** | | **~$3,000** |

### CAC by Channel

| Channel | Conversion Rate | Cost per Closed Deal | Efficiency |
|---------|-----------------|---------------------|------------|
| **Warm Network** | 30-40% | $1,000-1,500 | Best |
| **Referrals** | 25-35% | $1,500-2,000 | Great |
| **Cold Email** | 2-5% | $3,000-4,000 | Good |
| **LinkedIn** | 3-7% | $2,500-3,500 | Good |
| **Inbound (Future)** | 10-20% | $2,000-3,000 | Great |

**Blended CAC Target:** $3,000-5,000

---

## Lifetime Value (LTV)

### LTV Calculation

**Formula:** LTV = (ARPU × Gross Margin × Average Lifespan)

**Assumptions:**
- ARPU (Avg Revenue Per User): $4,500/month (Founding), $7,500/month (Official)
- Gross Margin: 95%
- Monthly Churn: 5% (annual: ~45%) - conservative for early stage
- Average Lifespan: 20 months (1/0.05)

**Founding Partner LTV:**
```
LTV = $4,500 × 0.95 × 20 = $85,500
```

**Official Client LTV:**
```
LTV = $7,500 × 0.95 × 20 = $142,500
```

### LTV with Improved Retention

| Monthly Churn | Avg Lifespan | FP LTV | Official LTV |
|---------------|--------------|--------|--------------|
| 10% | 10 months | $42,750 | $71,250 |
| 5% | 20 months | $85,500 | $142,500 |
| 3% | 33 months | $140,963 | $234,938 |
| 2% | 50 months | $213,750 | $356,250 |

**Target:** <5% monthly churn

---

## LTV:CAC Ratio

### Current State (Conservative)

| Metric | Founding Partner | Official Client |
|--------|------------------|-----------------|
| LTV | $85,500 | $142,500 |
| CAC | $4,000 | $5,000 |
| **LTV:CAC** | **21.4:1** | **28.5:1** |

### Industry Benchmarks

| LTV:CAC Ratio | Interpretation |
|---------------|----------------|
| <1:1 | Losing money on every customer |
| 1-3:1 | Unsustainable, needs improvement |
| 3-5:1 | Healthy SaaS business |
| 5-10:1 | Excellent, invest in growth |
| >10:1 | May be under-investing in acquisition |

**Wryko Assessment:** Excellent LTV:CAC, room to increase CAC for faster growth

---

## Payback Period

### CAC Payback Calculation

**Formula:** Payback = CAC / (Monthly Gross Profit)

**Founding Partner:**
```
Payback = $4,000 / $4,250 = 0.94 months
```

**Official Client:**
```
Payback = $5,000 / $7,250 = 0.69 months
```

### Payback Analysis

| Scenario | Payback Period | Assessment |
|----------|----------------|------------|
| <1 month | Excellent - very capital efficient |
| 1-3 months | Great - fast recovery |
| 3-6 months | Good - standard SaaS |
| 6-12 months | Acceptable - plan for working capital |
| >12 months | Concerning - optimize CAC or pricing |

**Wryko:** Sub-1 month payback is exceptional

---

## Break-Even Analysis

### Monthly Break-Even

**Fixed Costs:** $1,200/month

**Contribution Margin per Client:**
- Founding: $4,500 revenue - $250 COGS = $4,250
- Official: $7,500 revenue - $250 COGS = $7,250

**Break-Even Clients:**
```
Founding: $1,200 / $4,250 = 0.28 clients
Official: $1,200 / $7,250 = 0.17 clients
```

**Reality:** 1 client covers all fixed costs with margin

### With Future Hires

| Scenario | Fixed Costs | Break-Even (FP) | Break-Even (Official) |
|----------|-------------|-----------------|----------------------|
| Founder Only | $1,200/mo | <1 client | <1 client |
| +1 Success Manager | $7,200/mo | 1.7 clients | 1.0 client |
| +1 Sales AE | $15,200/mo | 3.6 clients | 2.1 clients |
| Full Team (4) | $30,000/mo | 7.1 clients | 4.1 clients |

---

## Scenario Analysis

### Best Case Scenario

**Assumptions:**
- 15 clients by Month 6
- 50% Founding, 50% Official
- 12 meetings/month average
- 2% monthly churn

| Metric | Value |
|--------|-------|
| Monthly Revenue | $93,750 |
| Annual Revenue | $1.125M |
| Gross Margin | 95% |
| Net Margin | 75%+ |
| Team Size | 3-4 people |

### Base Case Scenario

**Assumptions:**
- 10 clients by Month 6
- 70% Founding, 30% Official
- 10 meetings/month average
- 5% monthly churn

| Metric | Value |
|--------|-------|
| Monthly Revenue | $54,000 |
| Annual Revenue | $648K |
| Gross Margin | 95% |
| Net Margin | 60%+ |
| Team Size | 2 people |

### Worst Case Scenario

**Assumptions:**
- 5 clients by Month 6
- 100% Founding (no Official yet)
- 8 meetings/month average
- 8% monthly churn

| Metric | Value |
|--------|-------|
| Monthly Revenue | $20,000 |
| Annual Revenue | $240K |
| Gross Margin | 94% |
| Net Margin | 40%+ |
| Team Size | 1 person (founder) |

---

## Stress Testing

### What If: 40% Client Churn?

| Metric | Impact |
|--------|--------|
| Average Lifespan | 2.5 months |
| LTV (Founding) | $10,688 |
| LTV:CAC | 2.7:1 |
| Assessment | Borderline - must improve retention |

**Mitigation:** CSM Automation Suite (The Monitor) for early churn detection

### What If: Meeting Bonuses Eat Margin?

| Meetings/Month | Revenue (FP) | Direct Costs | Gross Margin |
|----------------|--------------|--------------|--------------|
| 5 | $3,250 | $250 | 92.3% |
| 10 | $4,500 | $250 | 94.4% |
| 15 | $5,750 | $250 | 95.7% |
| 20 | $7,000 | $250 | 96.4% |

**Assessment:** More meetings = higher margin (meeting bonus has zero marginal cost)

### What If: CAC Doubles ($8,000)?

| Metric | Current CAC ($4K) | 2x CAC ($8K) |
|--------|-------------------|--------------|
| LTV:CAC | 21:1 | 10.5:1 |
| Payback | <1 month | ~2 months |
| Assessment | Still healthy | Still acceptable |

---

## Cohort Analysis Framework

### Monthly Cohort Tracking

Track for each cohort:
1. **Month 0:** Clients acquired, total onboarding revenue
2. **Months 1-3:** Retention rate, average meetings, MRR
3. **Months 4-6:** Expansion (if any), continued retention
4. **Month 12:** Cumulative revenue, total meetings, survival rate

### Cohort Template

| Cohort | Clients | M0 Rev | M1 Ret | M3 Ret | M6 Ret | M12 Ret | LTV Actual |
|--------|---------|--------|--------|--------|--------|---------|------------|
| Jan 26 | | | | | | | |
| Feb 26 | | | | | | | |
| Mar 26 | | | | | | | |

### Cohort Quality Indicators

| Signal | Good | Warning | Action |
|--------|------|---------|--------|
| M1 Retention | >95% | <90% | Improve onboarding |
| M3 Retention | >85% | <75% | Check campaign quality |
| Meetings/Month | >8 | <5 | Optimize campaigns |
| NPS | >50 | <30 | Interview clients |

---

## Pricing Power Analysis

### Price Sensitivity Testing

| Price Point | Expected Conversion | Revenue/Client | Revenue at 100 leads |
|-------------|---------------------|----------------|---------------------|
| $1,500/mo (25% discount) | 35% higher | $3,000 | $105,000 |
| $2,000/mo (current FP) | Baseline | $4,000 | $80,000 |
| $2,500/mo (+25%) | 15% lower | $4,600 | $78,200 |
| $3,000/mo (+50%) | 30% lower | $5,100 | $71,400 |

**Insight:** Current FP pricing may be optimal; room to increase Official pricing

### Expansion Revenue Opportunities

| Opportunity | Additional Revenue | Feasibility |
|-------------|-------------------|-------------|
| Additional domains | $500-1,000/mo | Medium |
| LinkedIn automation | $1,000-2,000/mo | Future |
| Phone verification | $500-1,000/mo | Future |
| Enterprise tier | $10,000+/mo | Future |

---

## Key Metrics Dashboard

### Metrics to Track Monthly

| Metric | Target | Formula |
|--------|--------|---------|
| **MRR** | Growing 15%+ MoM | Sum of all monthly recurring |
| **Gross Margin** | >90% | (Revenue - COGS) / Revenue |
| **CAC** | <$5,000 | Total S&M / New Clients |
| **LTV** | >$80,000 | ARPU × Margin × Lifespan |
| **LTV:CAC** | >15:1 | LTV / CAC |
| **Payback** | <2 months | CAC / Monthly Gross Profit |
| **Churn Rate** | <5% monthly | Churned / Starting Clients |
| **Net Revenue Retention** | >100% | (Starting MRR + Expansion - Churn) / Starting MRR |

### Financial Health Scorecard

| Metric | Red | Yellow | Green |
|--------|-----|--------|-------|
| Gross Margin | <70% | 70-85% | >85% |
| LTV:CAC | <3:1 | 3-10:1 | >10:1 |
| Payback | >12 mo | 6-12 mo | <6 mo |
| Monthly Churn | >10% | 5-10% | <5% |
| Net Revenue Retention | <80% | 80-100% | >100% |

---

## Key Takeaways

1. **Exceptional unit economics:** LTV:CAC >20:1, sub-1 month payback
2. **High gross margins:** 94-97% due to low variable costs
3. **Low break-even:** 1 client covers all fixed costs
4. **Retention is critical:** 5% churn = good business; 10%+ = trouble
5. **Room for CAC investment:** Can afford $8K+ CAC and still be healthy
6. **Meeting bonuses are margin-accretive:** More meetings = higher margin
7. **Founding Partner pricing is sustainable:** Even at 60% off, margins are strong

---

## Recommendations

1. **Maintain current pricing** - Unit economics are excellent
2. **Invest in retention** - CSM Automation Suite is the right focus
3. **Increase CAC budget gradually** - Room to spend on faster growth
4. **Track cohorts religiously** - Early warning for problems
5. **Plan hiring around margins** - Can add CSM at 10 clients profitably
6. **Consider expansion revenue** - High margins support upsells

---

*Wryko - Autonomous B2B Lead Generation Platform*
*Document Version 1.0 | January 2026*
