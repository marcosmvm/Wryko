# XGrowthOS Automation Engines - Complete Setup Guide

## Quick Links
- **n8n Instance:** https://marcosmatthews.app.n8n.cloud
- **Workflows Location:** `/Users/marcosmatthews/Desktop/QI/The AI/engines-optimized/`

---

## Step 1: Create Google Sheet Tabs ✅

### Instructions:
1. Open your Google Sheet (create a new one or use existing)
2. Go to **Extensions → Apps Script**
3. Delete any existing code
4. Copy and paste the contents of `create-csm-sheets-template.js`
5. Save the project (Ctrl/Cmd + S)
6. Click the **Run** button (▶️) or select `createCSMSuiteTabs` from dropdown
7. **Authorize** when prompted (Google will ask for Sheets permissions)
8. Wait for completion alert

### Expected Result:
✅ 20 tabs created with green headers:
- Clients, Report_History, Domain_Health, Incident_Log, Health_Check_Log
- Knowledge_Base, SOPs, FAQ, Troubleshooting_Guide, Query_Log, Knowledge_Gaps
- Onboarding_Tracker, Meeting_Log, Support_Tickets, Client_Communications
- Health_Score_History, Intervention_Plans, Weekly_Health_Summary
- Portal_Requests, Client_ICP

### Optional:
Run `addSampleKnowledgeData` to populate starter content in knowledge tables.

---

## Step 2: Add Environment Variables in n8n

### Navigate to:
`https://marcosmatthews.app.n8n.cloud` → **Settings** → **Environment Variables**

### Add These 4 Variables:

| Variable Name | Value | How to Get It |
|--------------|-------|---------------|
| `XGROWTHOS_MASTER_SHEET_ID` | `your-sheet-id-here` | Copy from Google Sheet URL: `docs.google.com/spreadsheets/d/`**THIS_ID**`/edit` |
| `XGROWTHOS_CLIENTS_FOLDER_ID` | `your-folder-id-here` | Copy from Google Drive folder URL |
| `XGROWTHOS_PORTAL_URL` | `https://app.xgrowthos.com` | Your client portal URL |
| `CALENDLY_USER_URI` | `https://api.calendly.com/users/your-uuid` | From Calendly API settings |

### How to Find Your Sheet ID:
```
https://docs.google.com/spreadsheets/d/1AbC123XyZ_example_id_here/edit
                                       ^^^^^^^^^^^^^^^^^^^^^^^^
                                       This is your Sheet ID
```

### How to Find Your Drive Folder ID:
```
https://drive.google.com/drive/folders/1XyZ789_folder_id_here
                                        ^^^^^^^^^^^^^^^^^^^^^
                                        This is your Folder ID
```

---

## Step 3: Configure Credentials in n8n

### Navigate to:
`https://marcosmatthews.app.n8n.cloud` → **Settings** → **Credentials**

### Create These 6 Credentials:

| Credential Name | Type | Configuration |
|----------------|------|---------------|
| **Instantly API** | HTTP Header Auth | Header: `Authorization`, Value: `Bearer YOUR_API_KEY` |
| **Google Sheets OAuth2** | Google Sheets OAuth2 | Complete OAuth flow with your Google account |
| **Google Drive OAuth2** | Google Drive OAuth2 | Complete OAuth flow with your Google account |
| **OpenAI API** | OpenAI API | Add your OpenAI API key |
| **Slack OAuth2** | Slack OAuth2 | Scopes: `chat:write`, `channels:read` |
| **Email SMTP** | SMTP or SendGrid | Configure your sending email address |

### API Keys to Have Ready:
- **Instantly.ai API Key:** Dashboard → Settings → API
- **OpenAI API Key:** platform.openai.com → API Keys
- **Slack App:** api.slack.com → Create New App → OAuth & Permissions

---

## Step 4: Import Workflows

### Navigate to:
`https://marcosmatthews.app.n8n.cloud` → **Workflows**

### Create Folder (Optional but Recommended):
1. Click **New Folder**
2. Name it `XGrowthOS`

### Import Each Workflow:
1. Click **Import**
2. Select **Import from File**
3. Navigate to the files
4. Import each one:

| File Name | Engine Name |
|-----------|-------------|
| `the-informant-optimized.json` | The Informant - Auto Reporting |
| `the-judge-optimized.json` | The Judge - Issue Detection |
| `the-keeper-optimized.json` | The Keeper - Knowledge Brain |
| `the-launcher-optimized.json` | The Launcher - Onboarding |
| `the-monitor-optimized.json` | The Monitor - Churn Detection |
| `the-navigator-optimized.json` | The Navigator - Client Portal |

---

## Step 5: Activate Workflows

### For Each Imported Workflow:

1. **Open** the workflow
2. **Connect Credentials:**
   - Click on any node with a ⚠️ warning
   - Select the appropriate credential from dropdown
   - Common mappings:
     - Google Sheets nodes → `Google Sheets OAuth2`
     - Slack nodes → `Slack OAuth2`
     - HTTP Request (Instantly) → `Instantly API`
     - OpenAI nodes → `OpenAI API`
     - Email Send nodes → `Email SMTP`

3. **Activate:**
   - Toggle the **Active** switch (top right) to ON
   - Workflow should turn green

4. **Test:**
   - For scheduled triggers: Wait for next run or click "Execute Workflow"
   - For webhooks: Copy webhook URL and test with Postman/curl

---

## Step 6: Create Slack Channels

### Create These Channels in Your Slack Workspace:

| Channel | Purpose |
|---------|---------|
| `#client-reports` | Weekly/monthly report notifications |
| `#alerts-critical` | P1 critical alerts (immediate attention) |
| `#alerts-general` | P2-P4 general alerts |
| `#knowledge-gaps` | Questions that couldn't be answered |
| `#new-clients` | New client onboarding notifications |
| `#onboarding` | Onboarding progress updates |
| `#client-health` | At-risk client notifications |
| `#leadership` | Weekly health summaries |
| `#client-requests` | Portal request approvals needed |

### Quick Create (Slack):
1. Click **+** next to "Channels"
2. Select "Create a channel"
3. Name it exactly as shown above
4. Set to Public or Private as needed

---

## Verification Checklist ✅

### After completing all steps, verify:

**Google Sheets:**
- [ ] Sheet has 20 tabs with green headers
- [ ] Clients tab is first
- [ ] Sample knowledge data added (optional)

**n8n Environment Variables:**
- [ ] `XGROWTHOS_MASTER_SHEET_ID` is set
- [ ] `XGROWTHOS_CLIENTS_FOLDER_ID` is set
- [ ] `XGROWTHOS_PORTAL_URL` is set
- [ ] `CALENDLY_USER_URI` is set

**n8n Credentials:**
- [ ] Instantly API - connected
- [ ] Google Sheets OAuth2 - authorized
- [ ] Google Drive OAuth2 - authorized
- [ ] OpenAI API - connected
- [ ] Slack OAuth2 - authorized
- [ ] Email SMTP - configured

**n8n Workflows:**
- [ ] The Informant - imported & active
- [ ] The Judge - imported & active
- [ ] The Keeper - imported & active
- [ ] The Launcher - imported & active
- [ ] The Monitor - imported & active
- [ ] The Navigator - imported & active

**Slack:**
- [ ] All 9 channels created
- [ ] Slack app added to channels

---

## Test Webhooks

### The Keeper (Knowledge Query):
```bash
curl -X POST https://marcosmatthews.app.n8n.cloud/webhook/keeper-query \
  -H "Content-Type: application/json" \
  -d '{"query": "How do I rotate inboxes?"}'
```

### The Launcher (New Client):
```bash
curl -X POST https://marcosmatthews.app.n8n.cloud/webhook/new-client \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Test Company",
    "primary_contact": "John Smith",
    "primary_email": "john@testcompany.com",
    "plan_type": "pilot"
  }'
```

### The Navigator (Portal Request):
```bash
curl -X POST https://marcosmatthews.app.n8n.cloud/webhook/client-portal \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "XG-TEST123",
    "request_type": "pause_campaign",
    "data": {"campaign_id": "camp_123"}
  }'
```

---

## Troubleshooting

### Common Issues:

**"Google Sheets node shows error"**
- Ensure OAuth2 credential is authorized
- Check that Sheet ID in environment variable is correct
- Verify tab names match exactly

**"Slack notification not sending"**
- Check that Slack app has correct scopes
- Verify bot is added to the channel
- Test with a public channel first

**"Workflow not triggering"**
- Ensure workflow is toggled to Active
- For schedules, check the trigger timing
- For webhooks, verify the URL is correct

**"OpenAI error"**
- Check API key is valid
- Verify you have API credits
- Ensure model name is correct (gpt-4o)

---

## Schedule Summary

| Workflow | Trigger Type | Schedule |
|----------|-------------|----------|
| The Informant | Schedule | Sunday 8 PM |
| The Judge | Schedule | Every 4 hours |
| The Keeper | Webhook | On demand |
| The Launcher | Webhook + Schedule | On demand + Every 6 hours (reminders) |
| The Monitor | Schedule | Monday 6 AM |
| The Navigator | Webhook | On demand |

---

## Next Steps After Setup

1. **Add your first test client** via The Launcher webhook
2. **Run The Informant** manually to generate a test report
3. **Query The Keeper** to test knowledge retrieval
4. **Monitor #alerts-critical** for any issues detected by The Judge
5. **Review weekly summary** in #leadership from The Monitor

---

**Setup Complete! 🚀**

Your XGrowthOS automation engines are now ready to help your first CSM handle 20-25 clients instead of 10-12.
