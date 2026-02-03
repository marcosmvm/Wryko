# WK-DOC-048: Cohort Analysis Framework
## Client Performance Analysis by Cohort

**Document ID:** WK-DOC-048
**Category:** Metrics & Analytics
**Version:** 1.0
**Last Updated:** January 2026
**Classification:** INTERNAL

---

## Executive Summary

This framework provides a structured approach to analyzing client performance by cohort, enabling identification of patterns, prediction of outcomes, and optimization of client success strategies.

---

## What is Cohort Analysis?

Cohort analysis groups clients by a shared characteristic (usually sign-up month) and tracks their behavior over time. This reveals:

- **Retention patterns:** How long do clients stay?
- **Performance trends:** Are newer cohorts doing better?
- **Revenue trajectories:** How does revenue evolve?
- **Churn timing:** When do clients typically leave?

---

## Cohort Definitions

### Primary Cohort: Sign-Up Month

Clients grouped by the month they signed the contract.

| Cohort ID | Sign-Up Period | Example |
|-----------|----------------|---------|
| 2026-01 | Jan 1-31, 2026 | First 5 clients |
| 2026-02 | Feb 1-28, 2026 | Next batch |
| 2026-Q1 | Jan-Mar 2026 | Quarterly view |

### Secondary Cohorts

| Cohort Type | Definition | Use Case |
|-------------|------------|----------|
| **Client Type** | Founding Partner vs. Official | Pricing analysis |
| **Industry** | SaaS, Services, etc. | Vertical performance |
| **Company Size** | SMB, Mid-market | Fit analysis |
| **Lead Source** | Referral, Outbound, Inbound | Acquisition quality |
| **ACV** | <$25K, $25-50K, $50K+ | Revenue analysis |

---

## Key Metrics by Cohort

### Retention Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **M1 Retention** | % active after 1 month | >95% |
| **M3 Retention** | % active after 3 months | >85% |
| **M6 Retention** | % active after 6 months | >75% |
| **M12 Retention** | % active after 12 months | >60% |

### Revenue Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **MRR at Start** | Average MRR at sign-up | $4,000+ |
| **MRR at M3** | Average MRR after 3 months | $4,500+ |
| **MRR at M6** | Average MRR after 6 months | $5,000+ |
| **LTV Actual** | Cumulative revenue per client | >$36,000 |

### Performance Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Reply Rate (avg)** | Mean reply rate | >8% |
| **Meetings/Month** | Average meetings | >8 |
| **Time to First Meeting** | Days from launch | <21 |
| **NPS** | Net Promoter Score | >50 |

---

## Cohort Analysis Template

### Monthly Cohort Table

| Cohort | Clients | M0 | M1 | M2 | M3 | M6 | M12 |
|--------|---------|----|----|----|----|----|----|
| 2026-01 | 5 | 100% | % | % | % | % | % |
| 2026-02 | 7 | 100% | % | % | % | | |
| 2026-03 | 10 | 100% | % | % | | | |

### Revenue Cohort Table

| Cohort | Start MRR | M3 MRR | M6 MRR | M12 MRR | LTV |
|--------|-----------|--------|--------|---------|-----|
| 2026-01 | $20K | | | | |
| 2026-02 | $28K | | | | |
| 2026-03 | $40K | | | | |

### Performance Cohort Table

| Cohort | Avg Reply Rate | Avg Meetings/Mo | Avg NPS | Churn Rate |
|--------|----------------|-----------------|---------|------------|
| 2026-01 | % | | | % |
| 2026-02 | % | | | % |

---

## Analysis Procedures

### Monthly Cohort Review (1st Monday)

**Step 1: Update Data**
1. Pull active client count by cohort
2. Calculate retention rates
3. Pull revenue by cohort
4. Pull performance metrics

**Step 2: Calculate Changes**
1. Compare to previous month
2. Identify cohorts with declining metrics
3. Flag anomalies

**Step 3: Generate Insights**
1. Which cohorts are outperforming?
2. Which cohorts are underperforming?
3. What patterns emerge?

**Step 4: Document & Act**
1. Update cohort dashboard
2. Identify action items
3. Assign follow-ups

### Quarterly Deep Dive

**Analysis Areas:**

1. **Retention Curve Analysis**
   - Plot retention curves by cohort
   - Identify "danger zones" (months where churn spikes)
   - Compare to industry benchmarks

2. **Revenue Trajectory**
   - Track MRR growth/decline by cohort
   - Calculate actual vs. expected LTV
   - Identify expansion opportunities

3. **Performance Correlation**
   - Correlate reply rates with retention
   - Correlate time-to-first-meeting with NPS
   - Identify leading indicators

4. **Cohort Comparison**
   - Best vs. worst performing cohorts
   - What's different about high performers?
   - What can we replicate?

---

## Cohort Quality Indicators

### Healthy Cohort Signs

| Signal | Threshold | Interpretation |
|--------|-----------|----------------|
| M1 retention >95% | Green | Good onboarding |
| Reply rate >7% | Green | Good ICP/messaging |
| Meetings/mo >8 | Green | Strong execution |
| NPS >50 | Green | Happy clients |
| Expansion >10% | Green | Growing accounts |

### Warning Signs

| Signal | Threshold | Action |
|--------|-----------|--------|
| M1 retention <90% | Red | Audit onboarding |
| Reply rate <5% | Yellow | Review targeting |
| Meetings/mo <5 | Yellow | Optimization sprint |
| NPS <30 | Red | Client interviews |
| High early churn | Red | ICP review |

---

## Churn Analysis by Cohort

### Churn Timing Analysis

| When | Typical Cause | Prevention |
|------|---------------|------------|
| Month 1 | Bad fit, poor onboarding | Better qualification |
| Month 2-3 | Poor results | Faster optimization |
| Month 4-6 | Budget/priority change | Prove ROI early |
| Month 7-12 | Competing priorities | Maintain engagement |
| >12 months | Maturity, in-house | Expansion, stickiness |

### Churn Reason Tracking

| Reason | % of Churn | Preventable? |
|--------|------------|--------------|
| Results below expectation | % | Yes |
| Budget constraints | % | Partially |
| Went in-house | % | No |
| Business closed/changed | % | No |
| Service issues | % | Yes |
| Competitive loss | % | Yes |

---

## Predictive Cohort Modeling

### Expected Retention Curve

Based on historical data, model expected retention:

```
Month 1: 97%
Month 2: 93%
Month 3: 88%
Month 4: 84%
Month 5: 80%
Month 6: 76%
...
Month 12: 60%
```

### Variance Analysis

Compare actual cohort performance to expected:

| Cohort | M3 Expected | M3 Actual | Variance |
|--------|-------------|-----------|----------|
| 2026-01 | 88% | 90% | +2% |
| 2026-02 | 88% | 82% | -6% (investigate) |

### Leading Indicators

Track these early to predict cohort success:

| Indicator | Measured | Predicts |
|-----------|----------|----------|
| Time to complete onboarding | Week 1-2 | M3 retention |
| First meeting timing | Week 2-4 | M6 retention |
| Week 4 reply rate | Week 4 | LTV |
| First NPS score | Month 1 | Long-term retention |

---

## Reporting Templates

### Monthly Cohort Report

```
COHORT PERFORMANCE - [MONTH YEAR]

EXECUTIVE SUMMARY
- [Key insight 1]
- [Key insight 2]
- [Action item]

RETENTION BY COHORT
[Table: Cohort retention at each month]

TOP PERFORMING COHORT
- Cohort: [ID]
- Key characteristics: [What's different]
- Learnings: [What to replicate]

CONCERNING COHORT
- Cohort: [ID]
- Issue: [What's happening]
- Action: [What we're doing]

NEXT MONTH FORECAST
- Expected churn: [X clients]
- At-risk clients: [List]
```

### Quarterly Cohort Deep Dive

```
QUARTERLY COHORT ANALYSIS - Q[X] [YEAR]

1. OVERALL RETENTION TRENDS
   [Retention curve chart by cohort]
   [Analysis of trends]

2. REVENUE ANALYSIS
   [LTV by cohort]
   [Expansion vs. contraction]

3. PERFORMANCE PATTERNS
   [Correlation analysis]
   [Success factors]

4. CHURN ANALYSIS
   [Reasons, timing, patterns]
   [Prevention strategies]

5. RECOMMENDATIONS
   [ICP adjustments]
   [Process improvements]
   [Focus areas]
```

---

## Tools & Automation

### Data Sources

| Data | Source | Frequency |
|------|--------|-----------|
| Client status | Supabase | Real-time |
| Revenue | Stripe | Daily |
| Campaign metrics | Instantly | Daily |
| NPS | Survey tool | Monthly |

### Automated Tracking

The Monitor engine calculates some cohort metrics automatically:
- Health scores by cohort
- Churn risk by cohort
- Performance trends

### Dashboard Elements

| Chart | Type | Purpose |
|-------|------|---------|
| Retention curve | Line | Visualize decay |
| Cohort comparison | Bar | Compare cohorts |
| Revenue waterfall | Waterfall | Show MRR changes |
| Churn breakdown | Pie | Reason analysis |

---

## Key Takeaways

1. **Track from Day 1:** Start cohort tracking with first client
2. **Monthly discipline:** Update cohort data every month
3. **Look for patterns:** Similar cohorts should perform similarly
4. **Act on variance:** Investigate when cohorts diverge
5. **Improve over time:** Newer cohorts should outperform older
6. **Use for forecasting:** Cohort data predicts future revenue

---

*Wryko - Autonomous B2B Lead Generation Platform*
*Document Version 1.0 | January 2026*
