# XG-DOC-009: Troubleshooting Guide
## XGrowthOS Diagnostic & Resolution Procedures

**Document ID:** XG-DOC-009
**Category:** Internal Support
**Version:** 2.0
**Last Updated:** January 2026
**Classification:** INTERNAL USE ONLY

---

## 1. Deliverability Issues

### 1.1 Low Inbox Placement (<90%)

**Symptoms:**
- Open rates suddenly drop
- Replies stop coming
- Test emails going to spam

**Diagnostic Steps:**
1. Check domain health score in Guardian dashboard
2. Verify SPF/DKIM/DMARC with MXToolbox
3. Check Postmaster Tools (Google) for spam rate
4. Check SNDS (Microsoft) for reputation
5. Run blacklist check across all major lists

**Common Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| SPF fail | Update DNS record, check include limits (<10) |
| DKIM fail | Regenerate DKIM key, verify DNS propagation |
| DMARC fail | Check alignment, update policy |
| Blacklisted | Request removal, investigate root cause |
| High spam rate | Pause campaigns, review content |
| Volume spike | Reduce daily send volume |

**Resolution Timeline:**
- SPF/DKIM/DMARC: 24-48 hours (DNS propagation)
- Blacklist removal: 24-72 hours
- Reputation recovery: 2-4 weeks

### 1.2 High Bounce Rate (>2%)

**Symptoms:**
- Bounce rate spikes suddenly
- Specific domain/campaign affected
- ISP rejection notices

**Diagnostic Steps:**
1. Review bounce codes (hard vs. soft)
2. Check list source and age
3. Verify email validation was run
4. Check for domain-specific issues

**Common Causes & Solutions:**

| Bounce Type | Cause | Solution |
|-------------|-------|----------|
| Hard (5xx) | Invalid email | Remove from list, improve validation |
| Soft (4xx) | Mailbox full | Retry later, remove after 3 fails |
| Block | IP/domain blocked | Investigate reputation, warm new IP |
| DNS | Domain doesn't exist | Remove, flag data source |

**Resolution Timeline:**
- List cleaning: Immediate
- Data source review: 24-48 hours
- New domain warmup: 2-4 weeks

### 1.3 Spam Complaints (>0.1%)

**Symptoms:**
- Postmaster Tools shows rising spam rate
- Feedback loop reports increasing
- Gmail warning notifications

**Diagnostic Steps:**
1. Check Postmaster Tools for exact rate
2. Review recent email content
3. Check send frequency
4. Review unsubscribe process
5. Check list source

**Immediate Actions:**
1. PAUSE all campaigns immediately
2. Notify Marcos and client
3. Identify offending campaign
4. Review complaint details

**Root Cause Analysis:**
- Content too salesy?
- List purchased or scraped?
- Send frequency too high?
- Unsubscribe not working?
- Targeting mismatch?

**Resolution:**
1. Address root cause
2. Reduce volume by 50%
3. Improve list hygiene
4. Adjust content/targeting
5. Resume gradually

---

## 2. Performance Issues

### 2.1 Low Open Rates (<20%)

**Symptoms:**
- Opens below 20%
- Consistent across multiple sends
- Other metrics (clicks, replies) proportionally low

**Diagnostic Steps:**
1. Check deliverability first (see 1.1)
2. Analyze subject line performance
3. Review send times
4. Check from name/address

**Common Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Poor subject lines | A/B test new approaches, use hooks |
| Wrong send time | Test different times, match recipient timezone |
| From name unclear | Use personal name, company name |
| Landing in spam | Address deliverability issues |
| List fatigue | Reduce frequency, refresh list |

**Optimization Tactics:**
1. Test timeline hooks (10%+ reply rate)
2. Use personalization in subject
3. Keep subject under 50 characters
4. Test lowercase vs. title case
5. A/B test aggressively

### 2.2 Low Reply Rates (<3%)

**Symptoms:**
- Opens are good, replies are low
- Campaign running for 30+ days
- Optimization hasn't improved results

**Diagnostic Steps:**
1. Verify ICP match (are we reaching right people?)
2. Analyze reply sentiment of existing replies
3. Review email copy
4. Check CTA clarity
5. Review sequence length and timing

**Common Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Wrong ICP | Re-qualify targeting criteria |
| Weak value prop | Clarify/strengthen messaging |
| Unclear CTA | Single, clear call-to-action |
| Too long | Shorten to 50-100 words |
| No personalization | Add first name, company, relevance |
| Wrong timing | Test different sequence timing |

**Advanced Diagnostics:**
1. Compare to industry benchmarks
2. Review competitor messaging
3. Survey non-responders (small sample)
4. Test completely different angle

### 2.3 High Negative Response Rate (>40%)

**Symptoms:**
- Getting replies, but mostly negative
- "Not interested," "Remove me" responses
- Angry or hostile replies

**Diagnostic Steps:**
1. Categorize negative replies
2. Look for patterns
3. Review targeting accuracy
4. Assess message-market fit

**Common Causes:**

| Response Type | Likely Cause |
|---------------|--------------|
| "Wrong person" | Bad targeting/titles |
| "Not relevant" | ICP mismatch |
| "Already have solution" | Market saturation |
| "Don't email me" | Poor list quality |
| "This is spam" | Compliance issue |

**Solutions:**
1. Tighten ICP criteria
2. Improve personalization
3. Add relevance triggers
4. Test different verticals
5. Review list sources

---

## 3. Technical Issues

### 3.1 CRM Sync Failures

**Symptoms:**
- Leads not appearing in CRM
- Duplicate leads created
- Field mapping errors

**Diagnostic Steps:**
1. Check API connection status
2. Review error logs
3. Verify field mappings
4. Test with sample lead

**Common Fixes:**

| Issue | Solution |
|-------|----------|
| Auth failure | Refresh API token |
| Rate limited | Reduce sync frequency |
| Field mismatch | Update mapping configuration |
| Duplicate | Adjust deduplication rules |
| Missing data | Check required fields |

### 3.2 Webhook Failures

**Symptoms:**
- Automations not triggering
- Data not flowing
- N8N workflow errors

**Diagnostic Steps:**
1. Check N8N execution logs
2. Verify webhook URL
3. Test webhook endpoint
4. Review payload format

**Common Fixes:**

| Issue | Solution |
|-------|----------|
| 401/403 | Check authentication |
| 500 error | Review N8N workflow logic |
| Timeout | Increase timeout, optimize workflow |
| Malformed | Fix JSON payload structure |

### 3.3 Dashboard Issues

**Symptoms:**
- Dashboard not loading
- Data not updating
- Charts showing incorrect data

**Diagnostic Steps:**
1. Check user authentication
2. Verify data sync status
3. Clear browser cache
4. Check for deployment issues

---

## 4. Domain Health Recovery

### 4.1 Blacklist Removal Process

**Step 1: Identify Listings**
- Run check: mxtoolbox.com/blacklists.aspx
- Document which lists
- Note severity (major vs. minor)

**Step 2: Investigate Cause**
- Review recent send activity
- Check for complaints
- Identify compromised account (if any)

**Step 3: Request Removal**

| Blacklist | Removal Process |
|-----------|-----------------|
| Spamhaus | Submit request at spamhaus.org |
| Barracuda | Request at barracudacentral.org |
| SpamCop | Usually auto-expires |
| SORBS | Submit at sorbs.net |
| CBL | Usually auto-expires, or submit |

**Step 4: Prevent Recurrence**
- Address root cause
- Improve list hygiene
- Adjust sending practices
- Monitor more closely

### 4.2 Domain Warmup Recovery

**If Warmup Stalled or Reset:**

1. Reduce daily volume to 10-20 emails
2. Send only to most engaged segments
3. Focus on opens and replies
4. Gradually increase over 2-4 weeks
5. Monitor reputation daily

**Warmup Schedule:**

| Week | Daily Volume | Target |
|------|--------------|--------|
| 1 | 10-20 | Engagement focus |
| 2 | 20-30 | Expand cautiously |
| 3 | 30-40 | Monitor reputation |
| 4 | 40-50 | Full production |

---

## 5. Emergency Procedures

### 5.1 Domain Blacklisted (P1)

**Immediate (0-1 hour):**
1. STOP all sends from affected domain
2. Notify Marcos immediately
3. Notify client within 30 minutes
4. Shift traffic to backup domains
5. Begin investigation

**Short-term (1-24 hours):**
1. Submit removal requests
2. Identify root cause
3. Prepare client communication
4. Document incident

**Recovery (24-72 hours):**
1. Confirm delisting
2. Resume at reduced volume
3. Monitor closely
4. Post-mortem review

### 5.2 Spam Rate Spike (P1)

**Immediate (0-1 hour):**
1. PAUSE all campaigns
2. Check Postmaster Tools
3. Identify offending campaign
4. Notify Marcos and client

**Investigation (1-4 hours):**
1. Review recent sends
2. Analyze complaint sources
3. Check for anomalies
4. Review content

**Recovery (4-48 hours):**
1. Address root cause
2. Resume at 25% volume
3. Gradually scale up
4. Monitor for 2 weeks

---

## 6. Gmail AI Filter Considerations (2025)

**Key Insight:** Gmail's 2025 AI filters now prioritize content relevance over sender reputation alone.

**Implications:**
1. Generic, templated emails more likely to be filtered
2. Personalization more important than ever
3. Engagement signals heavily weighted
4. Content quality matters more

**Optimization for AI Filters:**
- Use natural, conversational language
- Avoid obvious template patterns
- Include specific, relevant details
- Focus on value, not sales pitch
- Personalize beyond just first name
- Reference specific company/role context

---

## 7. Escalation Quick Reference

| Issue | Severity | First Responder | Escalation |
|-------|----------|-----------------|------------|
| Blacklist | P1 | SM | Marcos (immediate) |
| Spam >0.1% | P1 | SM | Marcos (immediate) |
| Deliverability <90% | P2 | SM | Marcos (if 4h) |
| Reply Rate <3% (30d) | P2 | SM | Strategy call |
| CRM sync down | P2 | SM | Tech review |
| Client complaint | P2 | SM | Marcos (immediate) |
| Dashboard issue | P3 | SM | Tech queue |
| Feature request | P4 | SM | Backlog |

---

*INTERNAL DOCUMENT - DO NOT SHARE WITH CLIENTS*
*Document Version 2.0 | January 2026*
