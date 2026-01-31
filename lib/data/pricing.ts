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

// Pilot-phase primary offering
export const pilotTier = {
  name: 'Pilot Program',
  badge: 'Now Accepting Applications',
  tagline: 'Be among the first to experience autonomous B2B lead generation',
  retainer: 2000,
  onboarding: 2500,
  meetingBonus: 250,
  domains: '3',
  emails: '4,500',
  support: 'Bi-weekly',
  featured: true,
  ctaLabel: 'Apply for the Pilot',
  ctaHref: '/book-demo',
  highlights: [
    'Founding partner pricing locked for life',
    'Direct access to the founding team',
    'Shape the product roadmap with your feedback',
    'Full 11-engine platform from day one',
    'Priority onboarding within 14 days',
    'Dedicated Slack/Telegram channel',
  ],
}

// Post-pilot tiers shown as projected future pricing
export const futureTiers = [
  {
    name: 'Growth',
    badge: 'Post-Pilot',
    retainer: 4000,
    onboarding: 5000,
    meetingBonus: 350,
    domains: '5',
    emails: '7,500',
    support: 'Weekly',
    featured: false,
    ctaLabel: 'Join Waitlist',
    ctaHref: '/book-demo',
    available: false,
  },
  {
    name: 'Enterprise',
    badge: 'Post-Pilot',
    retainer: 7500,
    onboarding: 'Custom',
    meetingBonus: 500,
    domains: '10+',
    emails: '15,000+',
    support: 'Dedicated CSM',
    featured: false,
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact',
    available: false,
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

import { Bot, Shield, BarChart3, Headphones, Rocket, Settings, ThumbsUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface FeatureCategory {
  icon: LucideIcon
  title: string
  features: string[]
}

export const featureCategories: FeatureCategory[] = [
  {
    icon: Bot,
    title: 'AI Engine Suite',
    features: [
      'All 11 AI engines (5 lead gen + 6 CSM)',
      'Proactive issue detection & auto-healing',
      'Daily monitoring & optimization',
    ],
  },
  {
    icon: Shield,
    title: 'Infrastructure',
    features: [
      'Dedicated sending domains (no sharing)',
      'GDPR & CCPA compliance built-in',
      'CRM integration (Salesforce, HubSpot, etc.)',
    ],
  },
  {
    icon: BarChart3,
    title: 'Reporting & Analytics',
    features: [
      'Automated weekly performance reports',
      '24/7 self-serve client portal',
    ],
  },
  {
    icon: Headphones,
    title: 'Support',
    features: [
      'Bi-weekly+ strategy calls',
      'Real-time Slack/Telegram support',
    ],
  },
]

export interface PilotPhase {
  icon: LucideIcon
  name: string
  dayRange: string
  description: string
}

export const guarantee = {
  title: '90-Day Pilot Program',
  description:
    'Start with a 90-day pilot at full capacity. If your reply rate stays below 3% for 30 consecutive days, you can exit with 15 days notice and receive a pro-rated refund of your unused retainer.',
  terms: [
    'Full access to all 11 engines during pilot',
    'Month-to-month after 90-day pilot',
    '30-day written notice to cancel anytime',
    'Keep all leads and data if you leave',
  ],
  phases: [
    {
      icon: Rocket,
      name: 'Launch',
      dayRange: 'Days 1–14',
      description: 'Full onboarding, domain setup, and campaign deployment',
    },
    {
      icon: Settings,
      name: 'Optimize',
      dayRange: 'Days 15–60',
      description: 'AI engines learn, adapt, and scale your pipeline',
    },
    {
      icon: ThumbsUp,
      name: 'Decide',
      dayRange: 'Days 61–90',
      description: 'Review results and choose to continue month-to-month',
    },
  ] as PilotPhase[],
}
