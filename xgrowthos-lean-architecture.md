# XGrowthOS Lean v1 Architecture
## The Minimum System for 0-15 Clients

---

## 📊 n8n Folder Structure

```
📁 XGrowthOS/
│
├── 📁 CSM_Operations (ALREADY BUILT ✅)
│   ├── J - Judge (Issue Detection)
│   ├── M - Monitor (Churn Risk Detector)
│   ├── I - Informant (Auto Reporting)
│   ├── L - Launcher (Automated Onboarding)
│   ├── K - Keeper (AI Knowledge Brain)
│   └── N - Navigator (Self-Serve Portal)
│
├── 📁 Sales_Growth (BUILD NOW)
│   ├── P - Prospector (Lead Ingestion)
│   ├── F - Follower (Campaign Monitoring)
│   └── B - Booker (Meeting Coordination)
│
└── 📁 Automation_Infrastructure (BUILD NOW)
    ├── W - Watchdog (Workflow Health)
    └── E - Emergency (Error Recovery)
```

**Total: 11 Workflows**
- 6 CSM (built)
- 3 Sales Growth (to build)
- 2 Infrastructure (to build)

---

## 🎯 SALES GROWTH ENGINES

---

### **P - The Prospector (Lead Ingestion & Validation)**

**XGrowthOS Role:**
Entry point for all sales opportunities. Captures leads from multiple sources, validates email addresses, prevents duplicates, and feeds qualified prospects into the sales pipeline.

**Why XGrowthOS Needs This:**
- You can't manually check every lead that comes in
- Bad email data wastes campaign sends to Instantly.ai
- Duplicate leads skew your reporting
- Multiple lead sources (forms, LinkedIn, referrals) need one central inbox

**What It Does:**
1. **Lead Capture** - Receives leads from:
   - Contact form webhook (your website)
   - Manual CSV upload webhook
   - LinkedIn scraper exports (if running)
   - Referral form submissions

2. **Validation** - Checks:
   - Email syntax is correct
   - Email is not a throwaway domain (optional.ai, mailinator.com, etc.)
   - Domain has valid MX records (email can actually receive)

3. **Deduplication** - Queries "Leads_Master" sheet:
   - If email exists → Update last_seen_date (don't create duplicate)
   - If new → Create new record

4. **Tagging** - Assigns:
   - Source: (form, csv, linkedin, referral)
   - ICP_Match: (yes/no based on company size, industry)
   - Status: (new, contacted, qualified, disqualified)

5. **Output** - Appends to "Leads_Master" sheet with:
   - Email, name, company, industry, source, date_added, status

**Data Flow:**
```
Webhook (lead data)
    ↓
Validation (email check)
    ↓
Deduplication (exists?)
    ↓
ICP Scoring (fit check)
    ↓
Append to Leads_Master sheet
    ↓
Slack notification: "New lead: john@acme.com (Form source)"
```

**Who Uses This Daily:**
- Sales Growth Lead: Monitors incoming leads, starts outreach sequences
- You: Spot-checks lead quality, feeds good leads to Instantly campaigns

**Success Metrics:**
- Leads ingested per day
- Validation pass rate (% of leads with valid emails)
- Duplicate detection rate (how many duplicates caught?)
- Time from lead capture → first email sent

---

### **F - The Follower (Campaign Health Monitoring)**

**XGrowthOS Role:**
Daily health monitor for your Instantly.ai outbound campaigns. Alerts you when campaigns are underperforming or generating positive engagement.

**Why XGrowthOS Needs This:**
- You're running 3-5 campaigns in Instantly simultaneously
- You can't manually log into Instantly every day to check metrics
- If a campaign's reply rate drops, you need to know immediately (not in a weekly review)
- High-engagement leads should get fast-tracked to meeting booking (not wait for next check)

**What It Does:**
1. **Daily Fetch** - Retrieves from Instantly.ai API:
   - All active campaigns
   - Emails sent, opens, clicks, replies for each
   - Bounce rate, unsubscribe rate
   - List of leads who replied (extract these for follow-up)

2. **Performance Scoring** - Calculates:
   - Reply rate = replies / emails sent (target: 3-8%)
   - Open rate = opens / emails delivered (target: 20-35%)
   - If reply rate < 2% for 2 consecutive days → Flag as "underperforming"

3. **Alert Logic:**
   - Reply rate dropping → Slack alert: "Campaign X reply rate at 1.2% (down from 3%)"
   - New replies detected → Slack alert: "5 new replies in Campaign X, see sheet"
   - High engagement (5+ opens/clicks) → Priority tag for follow-up

4. **Logging** - Appends daily snapshot to "Campaign_Performance" sheet:
   - Date, campaign_name, emails_sent, replies, open_rate, reply_rate, status

5. **Lead Extraction** - For each lead who replied:
   - Marks as "replied" in Leads_Master sheet
   - Flags for immediate follow-up/meeting booking
   - Removes from active sequences (so they don't get duplicate emails)

**Data Flow:**
```
Daily Schedule (8am)
    ↓
Fetch from Instantly.ai API
    ↓
Calculate reply/open rates
    ↓
Compare to thresholds
    ↓
Log to Campaign_Performance sheet
    ↓
Extract & tag replied leads
    ↓
Slack summary: "5 campaigns running. X performing well, Y needs review"
```

**Who Uses This Daily:**
- You: Check Slack alert each morning, review underperforming campaigns
- Sales Growth Lead: Sees which leads replied, prioritizes follow-up

**Success Metrics:**
- Campaign reply rate by campaign
- Total replies per day
- Detection latency (time from reply received → Slack alert)
- Underperforming campaigns caught early

---

### **B - The Booker (Meeting Scheduling Automation)**

**XGrowthOS Role:**
Removes friction from the "reply → meeting" handoff. When a lead shows interest, automatically offers meeting times without manual back-and-forth.

**Why XGrowthOS Needs This:**
- Momentum dies if you respond 24 hours late
- Coordinating calendar times wastes 3-5 emails per meeting
- You want to move qualified leads into discovery calls FAST
- A 24-hour delay can mean the prospect loses interest

**What It Does:**
1. **Trigger Detection** - Activates when:
   - Lead marked "replied" in Leads_Master sheet (via Follower)
   - Lead manually tagged with "booking_ready" by Sales Growth Lead
   - Lead has booked intent (specific keywords in email: "interest", "learn more", "demo", "time", "when")

2. **Availability Check** - Queries your Google Calendar:
   - Looks at next 14 days
   - Filters for available slots (default: Mon-Thu 2-5pm, Fri 10am-12pm)
   - Excludes slots <30 min after previous meeting (buffer time)
   - Selects 3 best times

3. **Email Generation** - Sends personalized proposal:
   - Template: "Hi [FirstName], great to hear from you! I'd love to learn more about [company]. Here are 3 times I have available: [Time1], [Time2], [Time3]. Which works best for you?"
   - Includes Zoom link or calendar invite
   - Sent via Gmail API (from your email, so it looks personal)

4. **Response Monitoring** - After email sent:
   - Parses inbound reply for time confirmation
   - If "yes" or time selected → Create calendar event + send Zoom invite
   - If "no" or silence for 48h → Trigger follow-up with new times
   - Update "Meetings_Booked" sheet: date, lead_email, prospect_name, meeting_time, status

5. **Calendar Sync** - Prevents double-booking:
   - Before proposing times, checks if you manually added events
   - Regenerates available slots in real-time

**Data Flow:**
```
Lead marked "replied" in sheet
    ↓
Check availability in Google Calendar
    ↓
Generate 3 best time slots
    ↓
Compose & send meeting proposal email
    ↓
Parse prospect's response
    ↓
If confirmed → Create calendar event + log to Meetings_Booked sheet
If no response in 48h → Send follow-up with new times
```

**Who Uses This Daily:**
- Automation: Mostly hands-off (you don't touch this)
- You: Check Slack when meeting booked, prep for call

**Success Metrics:**
- Meeting booking rate (% of qualified leads → booked meetings)
- Time from reply → meeting booked (target: <24h)
- No-show rate
- Calendar utilization (% of proposed times accepted)

---

## 🔧 AUTOMATION INFRASTRUCTURE ENGINES

---

### **W - The Watchdog (Simple Workflow Health Monitoring)**

**XGrowthOS Role:**
One daily Slack message telling you: "All good" or "X workflow failed, check n8n." That's it.

**Why XGrowthOS Needs This:**
- You can't log into n8n 10 times a day to check if workflows ran
- A workflow failing silently = data doesn't get updated = clients don't get reports = revenue breaks
- You need to know about problems within 24 hours, not "whenever you happen to check"
- As your hire scales this, they need visibility into health immediately

**What It Does:**
1. **Daily Health Check** - Every morning at 8am:
   - Queries n8n API for all workflow executions in last 24 hours
   - Counts: Total runs, successful runs, failed runs
   - Identifies which specific workflows failed (if any)

2. **Health Scoring:**
   - Success rate = successful runs / total runs
   - Green: >95% success rate (all good)
   - Yellow: 85-95% success rate (warning, something's off)
   - Red: <85% success rate (critical, needs immediate attention)

3. **Daily Report** - Sends Slack message to #alerts:
   ```
   ✅ XGrowthOS Health Report (Jan 26, 2026)
   
   Overall Status: HEALTHY (97% success rate)
   
   Workflows Run: 24
   Successful: 23
   Failed: 1
   
   ⚠️ Issue:
   - M - Monitor: 1 failure at 3:45am (Check credentials)
   
   All other workflows: ✅ Running normally
   ```

4. **Failed Workflow Details** - If any workflow fails:
   - Lists which one
   - Shows error message (first 200 characters)
   - Links to n8n execution log for debugging

**Data Flow:**
```
Daily Schedule (8am)
    ↓
Query n8n API for last 24h executions
    ↓
Calculate success rate
    ↓
Identify failed workflows
    ↓
Format Slack message
    ↓
Send to #alerts channel
```

**Who Uses This Daily:**
- You: Read Slack alert each morning, decide if urgent action needed
- Sales Growth Lead: Sees if their workflows (Prospector, Follower, Booker) are healthy

**Success Metrics:**
- System uptime (% of days reported as "healthy")
- Detection speed (always <24h, which is fine at this stage)
- False alarm rate (should be zero)

---

### **E - The Emergency (Basic Error Handling & Recovery)**

**XGrowthOS Role:**
When a workflow fails, it tries again automatically. If it fails 3 times, it sends you an alert instead of silently dying.

**Why XGrowthOS Needs This:**
- API rate limits are temporary (try again in 60 seconds, probably succeeds)
- Network hiccups happen (Instantly.ai API timeout, just retry)
- If every failure kills the whole workflow, you'll miss leads/reports/meetings
- You want 80% of failures fixed automatically, only see the real problems

**What It Does:**
1. **Error Trigger** - Added to ALL production workflows:
   - When any node fails, it fires the Error Trigger instead of stopping
   - Passes error context: workflow name, node name, error message, input data

2. **Retry Logic** - For each error:
   - Identify error type:
     - **Transient** (429 rate limit, 502/503 server errors, timeouts) → Retry
     - **Data error** (bad email format, missing field) → Skip this record, continue
     - **Auth error** (expired token, bad credentials) → Alert you immediately
   - If **transient**:
     - Retry 1: Wait 2 seconds, try again
     - Retry 2: Wait 5 seconds, try again
     - Retry 3: Wait 10 seconds, try again
     - If all fail → Alert you

3. **Smart Alerting** - Only alert on real problems:
   - Don't alert for: "One lead's email is invalid, skipped it"
   - DO alert for: "Instantly.ai API unreachable for 30 min"
   - DO alert for: "Google Sheets auth expired"
   - DO alert for: "Same error 3 times in 1 hour"

4. **Error Logging** - Appends to "Error_Log" sheet:
   - Timestamp, workflow_name, error_type, retry_count, final_status
   - Use this to spot patterns: "Every Saturday at 2am, Monitor workflow fails" → Investigate

**Data Flow:**
```
Workflow node fails
    ↓
Error Trigger fires
    ↓
Classify error (transient? auth? data?)
    ↓
If transient → Retry 3x with backoff
If auth → Alert immediately
If data → Skip record, continue batch
    ↓
Log to Error_Log sheet
    ↓
Slack alert (only if manual action needed)
```

**Who Uses This Daily:**
- Automation: Runs silently (you don't touch this)
- You: Only see alerts for real problems (not noise)
- Sales Growth Lead: Workflows stay healthy automatically

**Success Metrics:**
- Auto-recovery rate (% of errors fixed by retry, not requiring manual action)
- Alert accuracy (every alert requires actual investigation)
- Mean time to recovery (MTTR) - how fast does the workflow get back on track?

---

## 📋 Implementation Checklist

### **Week 1-2: Build Sales Growth**
- [ ] **P - Prospector**
  - [ ] Create webhook endpoint for lead form
  - [ ] Add email validation (syntax check)
  - [ ] Add deduplication logic
  - [ ] Test with 5 sample leads
  - [ ] Verify "Leads_Master" sheet updated correctly

- [ ] **F - Follower**
  - [ ] Set up Instantly.ai API credentials in n8n
  - [ ] Create daily schedule trigger (8am)
  - [ ] Fetch campaigns from Instantly API
  - [ ] Calculate reply rates
  - [ ] Log to "Campaign_Performance" sheet
  - [ ] Extract replied leads, tag in Leads_Master
  - [ ] Test with a live Instantly campaign

- [ ] **B - Booker**
  - [ ] Set up Google Calendar API in n8n
  - [ ] Create trigger for leads marked "replied"
  - [ ] Query calendar availability
  - [ ] Generate 3-time proposal email
  - [ ] Send via Gmail API
  - [ ] Parse response & create calendar event
  - [ ] Test end-to-end with dummy prospect reply

### **Week 3: Build Infrastructure**
- [ ] **W - Watchdog**
  - [ ] Set up n8n API connection
  - [ ] Create daily 8am schedule trigger
  - [ ] Fetch last 24h executions for all workflows
  - [ ] Calculate success rates
  - [ ] Format Slack message
  - [ ] Test with manual trigger first
  - [ ] Enable daily schedule

- [ ] **E - Emergency**
  - [ ] Add Error Trigger node to all existing workflows
  - [ ] Create error classification logic (transient/auth/data)
  - [ ] Implement retry logic with exponential backoff
  - [ ] Create "Error_Log" sheet
  - [ ] Set up Slack alerts for critical errors
  - [ ] Test by manually triggering an error in a dev workflow

### **Week 4: Validation & Documentation**
- [ ] **End-to-End Test**
  - [ ] Add test lead via form → Prospector captures
  - [ ] Verify in "Leads_Master" sheet
  - [ ] Tag as "replied" (simulate reply)
  - [ ] Booker generates meeting proposal
  - [ ] Simulate acceptance
  - [ ] Verify calendar event created + "Meetings_Booked" logged

- [ ] **Documentation**
  - [ ] 1-page runbook for each workflow (purpose, how to restart, common errors)
  - [ ] Screenshot of n8n folder structure
  - [ ] Google Sheets schema document (what each column means)
  - [ ] Slack channel list (#alerts, #sales, #support)

- [ ] **Monitoring Setup**
  - [ ] Join #alerts channel, set notification to "All messages"
  - [ ] Add Watchdog report to your daily routine
  - [ ] Test Error alerting by breaking a non-critical workflow

---

## 📊 Google Sheets Schema (Minimum)

### **Leads_Master** (Core lead database)
```
| Email | Name | Company | Industry | Source | Status | ICP_Match | Date_Added | Last_Seen |
| john@acme.com | John Smith | Acme Corp | Tech | form | contacted | yes | 2026-01-26 | 2026-01-26 |
```

### **Campaign_Performance** (Daily campaign tracking)
```
| Date | Campaign_Name | Emails_Sent | Opens | Clicks | Replies | Open_Rate | Reply_Rate |
| 2026-01-26 | AI Tools - Tech CEOs | 250 | 65 | 12 | 8 | 26% | 3.2% |
```

### **Meetings_Booked** (Sales pipeline)
```
| Lead_Email | Lead_Name | Company | Meeting_Date | Meeting_Time | Status | Zoom_Link |
| john@acme.com | John Smith | Acme Corp | 2026-02-01 | 2pm | confirmed | https://zoom.us/... |
```

### **Error_Log** (Troubleshooting & monitoring)
```
| Timestamp | Workflow_Name | Error_Type | Error_Message | Retry_Count | Final_Status |
| 2026-01-26 10:45 | F - Follower | transient | 429 Rate Limited | 3 (success) | recovered |
```

---

## 🚀 Success Criteria (0-15 Clients)

**When to say "Lean v1 is working":**

✅ Leads flowing in automatically (0 manual data entry)
✅ Campaign health visible daily (never miss an alert)
✅ Qualified leads booked as meetings in <24h
✅ Silent failures caught within 24 hours
✅ Can hand this system to a Sales Growth Lead with 2 hours of training

**When to add complexity (15+ clients):**
- Leads per day exceeds 50+ → Add Scorer
- Manual CRM updates become painful → Add simple Closer
- Errors becoming frequent → Upgrade Watchdog to hourly
- Infrastructure costs climbing → Add cost tracking

---

## 🎓 Training Your First Hire (Sales Growth Lead)

Day 1:
- Show them n8n folder (explain: Prospector, Follower, Booker exist for them)
- Show them Google Sheets (Leads_Master, Campaign_Performance, Meetings_Booked)
- Show them Slack alerts (#alerts channel)
- Show them Instantly.ai dashboard

Day 2:
- Walk through one lead's journey: form → Prospector → Follower monitors → Booker books meeting
- Practice: Pull up 3 test leads, manually verify workflow outputs
- Practice: Check if Follower's daily summary makes sense
- Ask: "If a lead replies but Booker doesn't send proposal, where would you check?"

By Day 3:
- They should be able to interpret a workflow failure from Slack alert
- They should know where to find a lead's history in the sheet
- They should understand: Prospector gets leads, Follower monitors, Booker schedules

That's it. Simple.

---

## ⏱️ Build Timeline

| Phase | Week | What | Who | Output |
|-------|------|------|-----|--------|
| **Sales Growth** | 1-2 | P, F, B engines | You | Leads flowing → Meetings booked |
| **Infrastructure** | 3 | W, E engines | You | Daily health reports + error recovery |
| **Validation** | 4 | End-to-end test + docs | You | Runbooks ready for hire |
| **Go Live** | Week 5+ | Run the system | You | Focus on sales, system runs itself |

---

## Final Note

This is **lean, not minimal.**

Every engine solves a real problem:
- **Prospector** = No manual lead entry
- **Follower** = Campaign visibility (so you optimize, not guess)
- **Booker** = Fast scheduling (momentum matters)
- **Watchdog** = Know when things break
- **Emergency** = 80% of failures auto-fix

You do NOT need:
- Lead scoring engine (simple tags are enough)
- Complex CRM sync (Google Sheet is fine)
- Forensic logging (n8n logs are enough)
- Cost optimization (you're not at that scale)
- Synthetic monitoring (too early)

Build this → Get to 15 clients → THEN decide what hurts enough to automate.

Good luck. You've got this. 💪
