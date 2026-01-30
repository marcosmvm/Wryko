export const pricingTiers = [
  {
    name: 'Founding Partner',
    badge: 'Invite Only',
    retainer: 2000,
    onboarding: 2500,
    meetingBonus: 250,
    domains: '3',
    emails: '4,500',
    support: 'Bi-weekly',
    featured: true,
    ctaLabel: 'Apply Now',
    ctaHref: '/book-demo',
  },
  {
    name: 'Official Client',
    badge: 'Most Popular',
    retainer: 4000,
    onboarding: 5000,
    meetingBonus: 350,
    domains: '5',
    emails: '7,500',
    support: 'Weekly',
    featured: false,
    ctaLabel: 'Get Started',
    ctaHref: '/book-demo',
  },
  {
    name: 'Enterprise',
    badge: 'White Glove',
    retainer: 7500,
    onboarding: 'Custom',
    meetingBonus: 500,
    domains: '10+',
    emails: '15,000+',
    support: 'Dedicated CSM',
    featured: false,
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact',
  },
]

export const includedFeatures = [
  'All 11 AI engines (5 lead gen + 6 CSM)',
  'Dedicated sending domains (no sharing)',
  'Bi-weekly+ strategy calls',
  'Automated weekly performance reports',
  '24/7 self-serve client portal',
  'Proactive issue detection & auto-healing',
  'Real-time Slack/Telegram support',
  'CRM integration (Salesforce, HubSpot, etc.)',
  'Daily monitoring & optimization',
  'GDPR & CCPA compliance built-in',
]

export const guarantee = {
  title: '90-Day Pilot Program',
  description:
    'Start with a 90-day pilot at full capacity. If your reply rate stays below 3% for 30 consecutive days, you can exit with 15 days notice and receive a pro-rated refund of your unused retainer. We are committed to earning your business.',
  terms: [
    'Full access to all 11 engines during pilot',
    'Month-to-month after 90-day pilot',
    '30-day written notice to cancel anytime',
    'Keep all leads and data if you leave',
  ],
}
