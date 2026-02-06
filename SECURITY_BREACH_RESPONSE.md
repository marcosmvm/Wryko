# 🚨 SECURITY BREACH RESPONSE CHECKLIST

## IMMEDIATE ACTIONS (NEXT 30 MINUTES)

### Step 1: Revoke All Exposed Credentials
- [ ] Stripe: Delete `sk_live_51N1qXH...` and generate new
- [ ] Apollo: Revoke `8hVIIxZPFZcJIB5CnwXfEsA` and generate new  
- [ ] Google Cloud: Revoke service account and create new
- [ ] Supabase: Regenerate both anon_key and service_role_key
- [ ] Instantly: Revoke and regenerate API key
- [ ] OpenRouter: Delete and create new API key
- [ ] N8N: Revoke credentials and create new
- [ ] Google Drive: Revoke OAuth credentials if exposed
- [ ] Vercel: Check for exposed tokens and regenerate

### Step 2: Secure Environment Variables
```bash
# Update .env.local with NEW credentials only
STRIPE_SECRET_KEY=sk_live_NEW_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=NEW_SERVICE_KEY_HERE  
APOLLO_API_KEY=NEW_APOLLO_KEY_HERE
GOOGLE_CLOUD_API_KEY=NEW_GCP_KEY_HERE
INSTANTLY_API_KEY=NEW_INSTANTLY_KEY_HERE
OPENROUTER_API_KEY=NEW_OPENROUTER_KEY_HERE
N8N_API_KEY=NEW_N8N_KEY_HERE
```

### Step 3: Check for Unauthorized Access
- [ ] Stripe: Check recent transactions and API calls
- [ ] Supabase: Review recent database queries and auth logs
- [ ] Apollo: Check API usage and data exports
- [ ] Google Cloud: Review activity logs and resource usage
- [ ] N8N: Check workflow execution logs
- [ ] All platforms: Look for suspicious activity

### Step 4: Update Production Systems
- [ ] Update Vercel environment variables
- [ ] Update N8N credentials  
- [ ] Update any CI/CD pipelines
- [ ] Update local development environment
- [ ] Test all integrations with new keys

### Step 5: Audit Damage
- [ ] Check Stripe for unauthorized charges
- [ ] Review Supabase for data access/exports
- [ ] Check Apollo for data downloads
- [ ] Verify no unauthorized workflow runs in N8N
- [ ] Monitor for unusual API traffic

## PREVENTION MEASURES

### 1. Environment Security
```bash
# Add to .gitignore
.env.local
.env.production
.env.development
*.key
credentials.json
```

### 2. Screen Sharing Safety
- Never share screen with sensitive files open
- Use separate terminal for credentials
- Enable screen recording warnings
- Use credential management tools (1Password, etc.)

### 3. Code Security  
- Use environment variables only
- Never commit credentials to git
- Use credential scanning tools
- Regular security audits

## INCIDENT TIMELINE
- **Discovery:** [CURRENT_TIME]  
- **Credential Revocation:** [TIME]
- **New Credentials Generated:** [TIME]
- **Systems Updated:** [TIME]  
- **Damage Assessment Complete:** [TIME]

## POST-INCIDENT ACTIONS
- [ ] Implement credential rotation policy
- [ ] Set up monitoring for exposed credentials
- [ ] Team security training
- [ ] Update security procedures
- [ ] Document lessons learned

**PRIORITY: Complete credential revocation within 30 minutes of discovery**