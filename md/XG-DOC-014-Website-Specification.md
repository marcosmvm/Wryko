# XG-DOC-014: Website Specification
## XGrowthOS.com Technical & Content Requirements

**Document ID:** XG-DOC-014
**Category:** Marketing
**Version:** 2.0
**Last Updated:** January 2026

---

## 1. Overview

### 1.1 Purpose
The XGrowthOS website serves as the primary marketing and client acquisition platform, showcasing autonomous B2B lead generation capabilities and converting visitors to discovery calls.

### 1.2 Target Audience
- B2B companies with ACV $15,000+
- VP/Director of Sales & Marketing
- Founders and CEOs of growth-stage companies
- Industries: SaaS, Professional Services, IT/MSP, FinTech

### 1.3 Primary Goals
1. Educate visitors on autonomous lead generation
2. Differentiate from traditional agencies
3. Generate qualified discovery call bookings
4. Build trust through social proof and transparency

---

## 2. Technical Stack

### 2.1 Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 14+ | React framework with App Router |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Component library |
| Framer Motion | Animations |

### 2.2 Backend & Services
| Service | Purpose |
|---------|---------|
| Vercel | Hosting & deployment |
| Supabase | Authentication & database |
| Stripe | Payment processing |
| n8n Cloud | Workflow automation |
| Calendly | Meeting scheduling |

### 2.3 Analytics & Tracking
| Tool | Purpose |
|------|---------|
| Google Analytics 4 | Traffic analytics |
| Google Tag Manager | Tag management |
| Hotjar | Heatmaps & recordings |
| The Sentinel | Visitor identification |

---

## 3. Brand Guidelines

### 3.1 Color Palette

**Light Mode:**
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #059669 | CTAs, links, accents |
| Primary Hover | #047857 | Button hover states |
| Background | #FFFFFF | Page background |
| Surface | #F9FAFB | Card backgrounds |
| Text Primary | #111827 | Headlines |
| Text Secondary | #4B5563 | Body text |
| Border | #E5E7EB | Dividers, borders |

**Dark Mode:**
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #22C55E | CTAs, links, accents |
| Primary Hover | #16A34A | Button hover states |
| Background | #0A0A0A | Page background |
| Surface | #171717 | Card backgrounds |
| Text Primary | #F9FAFB | Headlines |
| Text Secondary | #A1A1AA | Body text |
| Border | #27272A | Dividers, borders |

### 3.2 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 Headlines | Sora | Bold (700) | 48-64px |
| H2 Headlines | Sora | SemiBold (600) | 36-48px |
| H3 Headlines | Sora | SemiBold (600) | 24-30px |
| Body (Light) | Figtree | Regular (400) | 16-18px |
| Body (Dark) | Sora | Regular (400) | 16-18px |
| Buttons | Figtree | SemiBold (600) | 14-16px |

### 3.3 Design Principles
- Clean, professional aesthetic
- High contrast for readability
- Generous whitespace
- Subtle animations on scroll
- Mobile-first responsive design
- Full dark/light mode support

---

## 4. Site Structure

### 4.1 Public Pages

```
/                       # Homepage
/how-it-works           # Platform explanation
/pricing                # Pricing tiers
/about                  # Company & founder
/case-studies           # Client success stories
/blog                   # Content marketing
/contact                # Contact form
/book-demo              # Calendly embed
/privacy                # Privacy policy
/terms                  # Terms of service
```

### 4.2 Client Portal (Authenticated)

```
/dashboard              # Overview metrics
/dashboard/campaigns    # Campaign management
/dashboard/analytics    # Performance analytics
/dashboard/compliance   # Guardian status
/dashboard/reports      # Weekly reports
/dashboard/settings     # Account settings
```

### 4.3 Authentication

```
/login                  # Client login
/register               # New client registration
/forgot-password        # Password reset
/verify-email           # Email verification
```

---

## 5. Page Specifications

### 5.1 Homepage

**Hero Section:**
- Headline: "Autonomous B2B Lead Generation That Books Meetings While You Sleep"
- Subheadline: Brief value proposition
- Primary CTA: "Book Your Discovery Call"
- Secondary CTA: "See How It Works"
- Hero visual: AI engine visualization or demo screenshot

**Problem/Solution Section:**
- Traditional agency pain points
- XGrowthOS solution benefits
- Comparison table

**Five AI Engines Section:**
- The Guardian - Compliance
- The Architect - Campaign Design
- The Scientist - Optimization
- The Hunter - Lead Expansion
- The Sentinel - Visitor Intelligence

**Social Proof Section:**
- Client logos (anonymized if needed)
- Key metrics achieved
- Testimonial quotes

**How It Works Section:**
- 4-step process visualization
- Timeline expectations

**CTA Section:**
- "Ready to Transform Your Pipeline?"
- Book demo button
- "Questions? Let's chat" link

**Footer:**
- Navigation links
- Contact info
- Social links
- Legal links

### 5.2 How It Works Page

**Content Sections:**
1. Overview of autonomous system
2. Each AI engine explained (expandable)
3. Onboarding process timeline
4. What to expect (realistic expectations)
5. FAQ section
6. CTA to book demo

### 5.3 Pricing Page

**Pricing Tiers:**

| Feature | Founding Partner | Official Client | Enterprise |
|---------|------------------|-----------------|------------|
| Onboarding Fee | $2,500 | $5,000 | $10,000 |
| Monthly Retainer | $2,000 | $4,000 | $7,500 |
| Per Meeting Bonus | $250 | $350 | $500 |
| Sending Domains | 3 | 5 | 10+ |
| Monthly Capacity | 4,500 | 7,500 | 15,000+ |
| Support | Bi-weekly calls | Weekly calls | Dedicated SM |

**Notes:**
- "Founding Partner pricing is invite-only"
- Money-back guarantee explanation
- FAQ about pricing
- CTA to book call

### 5.4 About Page

**Content:**
- Marcos Matthews bio and photo
- Company mission and vision
- "Why I built XGrowthOS" story
- Team/advisors (if applicable)
- Contact information

### 5.5 Case Studies Page

**Template per Case Study:**
- Client industry/type (anonymized if needed)
- Challenge faced
- Solution implemented
- Results achieved (metrics)
- Timeline
- Quote from client

---

## 6. SEO Requirements

### 6.1 Technical SEO

- [ ] Server-side rendering (Next.js)
- [ ] Semantic HTML structure
- [ ] XML sitemap generation
- [ ] Robots.txt configuration
- [ ] Canonical URLs
- [ ] Schema markup (Organization, LocalBusiness, FAQPage)
- [ ] Open Graph tags
- [ ] Twitter Card tags

### 6.2 Page Speed Targets

| Metric | Target |
|--------|--------|
| LCP | <2.5s |
| FID | <100ms |
| CLS | <0.1 |
| Performance Score | >90 |

### 6.3 Target Keywords

**Primary:**
- B2B lead generation
- Cold email automation
- AI lead generation
- Automated prospecting
- Meeting booking service

**Secondary:**
- Cold email agency
- B2B email marketing
- Sales automation
- Lead generation service
- Outbound sales automation

---

## 7. Integration Requirements

### 7.1 Forms

All forms should:
- Validate client-side
- Submit to n8n webhook
- Show success/error states
- Track conversions in GA4

### 7.2 Calendly Integration

- Embedded scheduling widget
- Automatic CRM sync
- Confirmation email trigger
- Pre-meeting reminder automation

### 7.3 The Sentinel Integration

- Visitor identification script
- Company identification
- Intent scoring
- CRM lead creation

### 7.4 Live Chat (Optional)

- Intercom or similar
- Bot for initial qualification
- Human handoff for qualified
- Operating hours: 9 AM - 5 PM PT

---

## 8. Legal Pages

### 8.1 Privacy Policy

Required disclosures:
- Data collected
- How data is used
- Third-party sharing
- Cookie usage
- User rights (GDPR, CCPA)
- Contact information

### 8.2 Terms of Service

Required sections:
- Service description
- User responsibilities
- Intellectual property
- Limitation of liability
- Governing law
- Dispute resolution

### 8.3 Cookie Consent

- Cookie banner on first visit
- Category explanations
- Accept/Reject options
- Preference saving
- EU compliance

---

## 9. Performance Requirements

### 9.1 Availability
- 99.9% uptime target
- Vercel edge network
- Automatic failover

### 9.2 Security
- HTTPS only
- Security headers
- CSP policy
- Rate limiting on forms
- Bot protection (Cloudflare)

### 9.3 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatible
- Sufficient color contrast
- Alt text for images

---

## 10. Launch Checklist

- [ ] All pages content complete
- [ ] Responsive design tested
- [ ] Dark mode tested
- [ ] Forms tested and connected
- [ ] Analytics configured
- [ ] SEO meta tags set
- [ ] Legal pages reviewed
- [ ] Cookie consent working
- [ ] SSL certificate active
- [ ] DNS configured
- [ ] Performance tested
- [ ] Accessibility audit passed
- [ ] Cross-browser testing complete

---

*XGrowthOS - Autonomous B2B Lead Generation Platform*
*Document Version 2.0 | January 2026*
