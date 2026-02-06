# 📧 Wryko Email Infrastructure Setup

## Required Email Addresses (@wryko.com)

### Core Operational Emails
- **support@wryko.com** - Customer support inquiries
- **billing@wryko.com** - Billing and payment issues  
- **urgent@wryko.com** - Escalated/urgent matters
- **csm@wryko.com** - Customer Success Manager communications

### Business & Legal Emails
- **legal@wryko.com** - Legal documents and contracts
- **compliance@wryko.com** - Compliance and regulatory matters
- **security@wryko.com** - Security-related communications
- **privacy@wryko.com** - Privacy policy and GDPR inquiries

### Marketing & Sales
- **hello@wryko.com** - General inquiries (main contact)
- **sales@wryko.com** - Sales inquiries and demos
- **partnerships@wryko.com** - Partnership opportunities
- **media@wryko.com** - Press and media inquiries

### Technical Operations  
- **admin@wryko.com** - Administrative system notifications
- **no-reply@wryko.com** - Automated system emails
- **alerts@wryko.com** - System alerts and monitoring

## DNS Configuration Required

### MX Records (Email Routing)
```dns
wryko.com. MX 1 aspmx.l.google.com.
wryko.com. MX 5 alt1.aspmx.l.google.com.
wryko.com. MX 5 alt2.aspmx.l.google.com.
wryko.com. MX 10 alt3.aspmx.l.google.com.
wryko.com. MX 10 alt4.aspmx.l.google.com.
```

### SPF Record (Sender Authentication)
```dns
wryko.com. TXT "v=spf1 include:_spf.google.com ~all"
```

### DKIM Record (Google Workspace)
```dns
google._domainkey.wryko.com. TXT "v=DKIM1; k=rsa; p=[DKIM_PUBLIC_KEY]"
```

### DMARC Record (Email Security)
```dns
_dmarc.wryko.com. TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@wryko.com; ruf=mailto:dmarc@wryko.com; fo=1"
```

## Implementation Steps

### Step 1: Purchase Google Workspace
1. Go to workspace.google.com
2. Choose Business Standard plan
3. Set up with wryko.com domain
4. Configure admin console

### Step 2: Create Email Aliases
```bash
# Set up all aliases to forward to appropriate recipients
support@wryko.com → marcos@wryko.com
billing@wryko.com → marcos@wryko.com  
urgent@wryko.com → marcos@wryko.com
csm@wryko.com → marcos@wryko.com
legal@wryko.com → marcos@wryko.com
hello@wryko.com → marcos@wryko.com
```

### Step 3: Update Website Contact Forms
- Contact page forms
- Footer email links
- Privacy policy contacts
- Terms of service contacts

### Step 4: Set Up Auto-Responders
Create professional auto-responders for:
- support@wryko.com
- billing@wryko.com
- legal@wryko.com

## Email Templates

### Support Auto-Responder
```
Subject: We've received your support request

Hi there,

Thanks for reaching out to Wryko support! 

We've received your message and will get back to you within 24 hours during business days (Monday-Friday, 9 AM - 6 PM PST).

For urgent matters, please email urgent@wryko.com.

Best regards,
The Wryko Team
```

### Legal Auto-Responder  
```
Subject: Legal inquiry received

Thank you for your legal inquiry.

We've received your message and will have our legal team review it. Please expect a response within 2-3 business days.

For immediate legal matters, please call +1 (555) XXX-XXXX.

Best regards,
Wryko Legal Department
```

## Cost Estimate
- Google Workspace Business Standard: $12/user/month
- 15 users (emails) = $180/month
- Additional security features: $50/month
- **Total: ~$230/month**

## Security Configuration
- Enable 2FA for all admin accounts
- Set up email retention policies
- Configure DLP (Data Loss Prevention)
- Enable audit logging
- Set up email encryption for sensitive communications

This professional email infrastructure will support all operational needs and provide a foundation for scaling customer communications.