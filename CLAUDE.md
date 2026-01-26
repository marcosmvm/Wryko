# XGrowthOS - Claude Code Project Guide

## Project Overview

XGrowthOS is an autonomous B2B lead generation platform powered by 11 AI engines. This repository contains:
1. **Landing Website** - Marketing site for client acquisition
2. **Client Portal** - Dashboard for clients to monitor campaigns
3. **Admin Portal** - Internal management interface
4. **n8n Workflow Integrations** - Backend automation engines

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT WORKFLOW                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐        │
│   │  Claude Code │───▶│    GitHub    │───▶│   Vercel     │        │
│   │  (Local Dev) │    │ (Version Ctrl)│    │ (Deployment) │        │
│   └──────────────┘    └──────────────┘    └──────────────┘        │
│          │                                       │                  │
│          ▼                                       ▼                  │
│   ┌──────────────┐                      ┌──────────────┐          │
│   │  n8n Cloud   │◀────────────────────▶│  Live App    │          │
│   │  (Workflows) │     Webhooks/API     │  (Public)    │          │
│   └──────────────┘                      └──────────────┘          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 14+ (App Router) | React framework with SSR |
| Styling | Tailwind CSS + shadcn/ui | Component library |
| Animation | Framer Motion | Smooth transitions |
| Auth | Supabase Auth | User authentication |
| Database | Supabase (PostgreSQL) | Data persistence |
| Payments | Stripe | Subscription billing |
| Workflows | n8n Cloud | Backend automation |
| Hosting | Vercel | Edge deployment |

## Core Workflow: n8n to Web App

### Phase 1: Workflow Optimization
Before building the frontend, ensure the n8n workflow:
1. **Has proper webhook trigger** - Accepts JSON payload from frontend
2. **Returns structured JSON** - Response format the frontend can parse
3. **Handles errors gracefully** - Returns error status with messages
4. **Supports required data types** - Files (base64), images, text, etc.

### Phase 2: Local Development
1. Create frontend components that call n8n webhooks
2. Test data flow: Frontend → n8n → Processing → Response → Display
3. Handle loading states, errors, and success responses

### Phase 3: Deploy
1. Push changes to GitHub
2. Vercel auto-deploys from main branch
3. Update n8n webhooks if needed for production URLs

## Project Structure

```
XGrowthOS/
├── CLAUDE.md                # This file
├── .env.local              # Local environment variables (not committed)
├── .env.example            # Template for environment variables
├── app/                    # Next.js App Router pages
│   ├── (marketing)/        # Public marketing pages
│   │   ├── page.tsx        # Homepage
│   │   ├── how-it-works/
│   │   ├── pricing/
│   │   ├── about/
│   │   └── contact/
│   ├── (auth)/             # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── dashboard/          # Client portal (protected)
│   │   ├── page.tsx        # Dashboard home
│   │   ├── campaigns/
│   │   ├── analytics/
│   │   └── settings/
│   └── admin/              # Admin portal (protected)
│       ├── clients/
│       ├── workflows/
│       └── settings/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── marketing/          # Landing page components
│   ├── dashboard/          # Client dashboard components
│   └── admin/              # Admin portal components
├── lib/
│   ├── supabase/           # Supabase client & helpers
│   ├── n8n/                # n8n webhook integrations
│   ├── stripe/             # Stripe utilities
│   └── utils/              # General utilities
├── engines/                # n8n workflow JSON exports
├── md/                     # Business documentation
└── docs/                   # Technical documentation
```

## n8n Engines Reference

### Lead Generation Engines (A-H)
| Engine | Name | Workflow Purpose |
|--------|------|------------------|
| A | Campaign Optimizer | Optimizes email campaigns based on performance |
| B | Self-Learning | Continuous improvement from engagement data |
| C | DNC Checker | Do-not-contact compliance validation |
| D | Domain Health | Monitors sender domain reputation |
| E | Lead Deduplication | Prevents duplicate outreach |
| F | Client Dashboards | Updates real-time metrics |
| G | The Hunter | Expands leads from positive replies |
| H | The Sentinel | Identifies anonymous website visitors |

### CSM Automation Suite (I-N)
| Engine | Name | Workflow Purpose |
|--------|------|------------------|
| I | The Informant | Automated weekly reports |
| J | The Judge | Issue detection & auto-healing |
| K | The Keeper | AI knowledge brain |
| L | The Launcher | Automated onboarding |
| M | The Monitor | Churn risk detection |
| N | The Navigator | Self-serve client portal |

## API Integration Patterns

### Calling n8n from Frontend
```typescript
// lib/n8n/client.ts
const N8N_WEBHOOK_BASE = process.env.N8N_WEBHOOK_URL;

export async function callWorkflow(
  workflowId: string,
  data: Record<string, any>
) {
  const response = await fetch(`${N8N_WEBHOOK_BASE}/${workflowId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}
```

### File Upload to n8n
```typescript
// For images/files, convert to base64
const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};
```

### Displaying n8n Responses
```typescript
// Handle various response types
interface N8NResponse {
  success: boolean;
  data?: {
    type: 'text' | 'video' | 'image' | 'table';
    content: string | object;
  };
  error?: string;
}
```

## Environment Variables

Required environment variables (see `.env.example`):

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# n8n
N8N_WEBHOOK_URL=https://marcosmatthews.app.n8n.cloud/webhook
N8N_API_KEY=your_n8n_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# External Services
APOLLO_API_KEY=your_apollo_key
INSTANTLY_API_KEY=your_instantly_key
```

## Design System

### Colors (from brand guidelines)
```css
/* Light Mode */
--primary: #059669;
--background: #FFFFFF;
--surface: #F9FAFB;
--text-primary: #111827;
--text-secondary: #4B5563;

/* Dark Mode */
--primary: #22C55E;
--background: #0A0A0A;
--surface: #171717;
--text-primary: #F9FAFB;
--text-secondary: #A1A1AA;
```

### Typography
- Headlines: Sora (Bold/SemiBold)
- Body: Figtree (Regular)
- Code: JetBrains Mono

## MCP Server Access

This project uses the following MCP servers:

### n8n MCP Server
- **URL**: https://marcosmatthews.app.n8n.cloud/mcp-server/http
- **Purpose**: Read/create/edit n8n workflows, understand nodes and configurations

### GitHub MCP
- **Purpose**: Push changes, manage branches, create PRs

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Git Workflow

1. **Feature branches**: Create from `main` for new features
2. **Commit messages**: Use conventional commits (feat:, fix:, docs:)
3. **Pull requests**: Required for merging to main
4. **Auto-deploy**: Vercel deploys on push to main

## Key Integrations

| Service | Purpose | Integration Point |
|---------|---------|-------------------|
| Calendly | Meeting booking | Embedded widget on /book-demo |
| Stripe | Payments | Checkout & customer portal |
| Supabase | Auth & DB | Client/Admin authentication |
| n8n | Workflows | Webhook APIs for all engines |
| Google Analytics | Tracking | GA4 events |

## Security Notes

- Never commit `.env.local` or any files with secrets
- All API keys should be rotated if exposed
- Use environment variables for all credentials
- Stripe webhooks must verify signatures
- Supabase RLS policies must be configured

## Support

For questions about this project:
- **Documentation**: See `/md` folder for business docs
- **Workflows**: See `/engines` for n8n workflow exports
- **Technical**: Check inline code comments

---

*XGrowthOS - Autonomous B2B Lead Generation Platform*
