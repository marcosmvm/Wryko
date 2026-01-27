# n8n Environment Variables for XGrowthOS CSM Suite

## Required Environment Variables

Add these environment variables in your n8n instance:
**Settings → Environment Variables** (or via `.env` file for self-hosted)

### Google Sheets Integration

```
XGROWTHOS_MASTER_SHEET_ID=<your-google-sheet-id>
```
- Get this from your Google Sheets URL: `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`

### Google Drive Integration

```
XGROWTHOS_CLIENTS_FOLDER_ID=<your-drive-folder-id>
```
- Create a folder in Google Drive for client folders
- Get the ID from the folder URL: `https://drive.google.com/drive/folders/<FOLDER_ID>`

### Client Portal

```
XGROWTHOS_PORTAL_URL=https://app.xgrowthos.com
```
- Your client-facing portal URL
- Used in email links and webhook responses

### Calendly Integration

```
CALENDLY_USER_URI=https://api.calendly.com/users/<user-uuid>
```
- Get this from your Calendly API dashboard
- Required for meeting tracking in The Informant

---

## Required Credentials in n8n

### 1. Instantly API
- **Name:** `instantlyApi` or `Instantly API`
- **Type:** HTTP Header Auth
- **Header Name:** `Authorization`
- **Header Value:** `Bearer <your-instantly-api-key>`

### 2. Google Sheets OAuth2
- **Name:** `Google Sheets OAuth2`
- **Type:** Google Sheets OAuth2 API
- **Scopes:** `https://www.googleapis.com/auth/spreadsheets`

### 3. Google Drive OAuth2
- **Name:** `Google Drive OAuth2`
- **Type:** Google Drive OAuth2 API
- **Scopes:** `https://www.googleapis.com/auth/drive`

### 4. OpenAI API
- **Name:** `OpenAI API`
- **Type:** OpenAI API
- **API Key:** `<your-openai-api-key>`
- **Model:** GPT-4o recommended

### 5. Slack OAuth2
- **Name:** `Slack OAuth2`
- **Type:** Slack OAuth2 API
- **Scopes:** `chat:write`, `channels:read`, `commands` (for The Keeper)

### 6. Email (SMTP or SendGrid)
- **Name:** `Email SMTP` or `SendGrid API`
- **Type:** SMTP or SendGrid
- **From Address:** Use `@xgrowthos.com` domain

---

## Slack Channels Required

Create these channels in your Slack workspace:

| Channel | Purpose | Used By |
|---------|---------|---------|
| `#client-reports` | Weekly report notifications | The Informant |
| `#alerts-critical` | P1 critical issue alerts | The Judge |
| `#alerts-general` | P2-P4 issue notifications | The Judge |
| `#knowledge-gaps` | Unanswered query alerts | The Keeper |
| `#new-clients` | New client onboarding | The Launcher |
| `#onboarding` | Onboarding progress updates | The Launcher |
| `#client-health` | At-risk client alerts | The Monitor |
| `#leadership` | Weekly health summaries | The Monitor |
| `#client-requests` | Portal request reviews | The Navigator |

---

## Quick Setup Checklist

- [ ] Create Google Sheet with CSM Suite tabs (use `create-csm-sheets-template.js`)
- [ ] Copy Sheet ID to n8n environment variables
- [ ] Create Google Drive client folder
- [ ] Copy Folder ID to n8n environment variables
- [ ] Set up all required credentials in n8n
- [ ] Create Slack channels
- [ ] Configure Slack App with OAuth scopes
- [ ] Import all 6 optimized engine JSON files
- [ ] Test each webhook endpoint
- [ ] Activate workflows

---

## Webhook Endpoints (After Activation)

| Engine | Endpoint | Method |
|--------|----------|--------|
| The Keeper | `/webhook/keeper-query` | POST |
| The Launcher | `/webhook/new-client` | POST |
| The Launcher | `/webhook/asset-submission` | POST |
| The Navigator | `/webhook/client-portal` | POST |
| The Navigator | `/webhook/approve-request` | POST |
| The Navigator | `/webhook/request-status` | GET |
