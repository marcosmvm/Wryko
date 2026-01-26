import {
  Shield,
  Target,
  Brain,
  Zap,
  Eye,
  BarChart3,
  Scale,
  BookOpen,
  Rocket,
  Activity,
  Compass,
} from 'lucide-react'

export const leadGenEngines = [
  {
    icon: Shield,
    name: 'The Guardian',
    tagline: 'Compliance & Deliverability',
    description:
      'Protects your sender reputation with real-time domain health monitoring, DNC verification, blacklist checking, and automatic compliance with Gmail/Yahoo 2024-2025 requirements.',
  },
  {
    icon: Target,
    name: 'The Architect',
    tagline: 'AI Campaign Design',
    description:
      'Designs personalized email sequences using AI-powered copywriting. Creates subject lines, body copy, and follow-ups tailored to your ICP and value proposition.',
  },
  {
    icon: Brain,
    name: 'The Scientist',
    tagline: 'Continuous Optimization',
    description:
      'Runs A/B tests every Monday and Wednesday, automatically promoting winning variants. Analyzes open rates, reply rates, and meeting conversions to maximize performance.',
  },
  {
    icon: Zap,
    name: 'The Hunter',
    tagline: 'Lead Expansion',
    description:
      'Expands your pipeline from every positive reply. Identifies 25-50 lookalike companies and colleagues, automatically launching targeted campaigns within 24 hours.',
  },
  {
    icon: Eye,
    name: 'The Sentinel',
    tagline: 'Website Visitor Intelligence',
    description:
      'Identifies anonymous website visitors and reveals company details. Finds 8-15 relevant contacts at each identified company and adds them to your outreach pipeline.',
  },
]

export const csmEngines = [
  {
    icon: BarChart3,
    name: 'The Informant',
    tagline: 'Automated Reporting',
    description:
      'Generates and sends branded weekly performance reports every Sunday at 8 PM. Includes AI-generated executive summaries, trend analysis, and deliverability health status.',
    timeSaved: '30-45 min/client/week → 0 min',
  },
  {
    icon: Scale,
    name: 'The Judge',
    tagline: 'Issue Detection & Auto-Healing',
    description:
      'Monitors infrastructure health every 4 hours. Automatically detects and fixes issues like inbox problems, campaign stalls, and domain reputation drops before they impact performance.',
    timeSaved: '2-3 hrs/day firefighting → 15 min/day review',
  },
  {
    icon: BookOpen,
    name: 'The Keeper',
    tagline: 'AI Knowledge Brain',
    description:
      'Instant answers to operational questions from your knowledge base. Provides confidence-scored responses 24/7 with automatic escalation when answers aren\'t found.',
    timeSaved: '15-30 min per question → <1 min',
  },
  {
    icon: Rocket,
    name: 'The Launcher',
    tagline: 'Automated Onboarding',
    description:
      'Streamlines 14-day client onboarding with automated asset collection, escalating reminders (24/48/72 hour), and automatic provisioning of domains and integrations.',
    timeSaved: '5-6 hours → 1-2 hours per onboarding',
  },
  {
    icon: Activity,
    name: 'The Monitor',
    tagline: 'Churn Risk Detection',
    description:
      'Analyzes client health weekly with multi-signal risk scoring. Generates AI-powered intervention playbooks for at-risk accounts and surfaces trends for leadership.',
    timeSaved: 'Proactive vs. reactive retention',
  },
  {
    icon: Compass,
    name: 'The Navigator',
    tagline: 'Self-Serve Client Portal',
    description:
      'Empowers clients with 24/7 self-service: update ICP, pause campaigns, download reports. Complex requests are queued for review with automatic status tracking.',
    timeSaved: '10-15 min per request → 1-2 min',
  },
]

export const onboardingTimeline = [
  {
    day: 'Day 0-1',
    title: 'Welcome & Asset Collection',
    description: 'Automated welcome email, Google Drive folder creation, and asset collection form sent to client.',
  },
  {
    day: 'Day 1-3',
    title: 'Assets & Reminders',
    description: 'Client submits discovery questionnaire, CRM credentials, and calendar booking link. Escalating reminders if needed.',
  },
  {
    day: 'Day 3-5',
    title: 'Domain Provisioning',
    description: 'Dedicated sending domains configured with SPF, DKIM, and DMARC. Domain warmup begins.',
  },
  {
    day: 'Day 5-7',
    title: 'CRM Integration',
    description: 'Salesforce, HubSpot, or other CRM connected. Lead routing and notification rules configured.',
  },
  {
    day: 'Day 7-10',
    title: 'Campaign Design',
    description: 'AI-powered copywriting generates email sequences. A/B test variants created for subject lines and body copy.',
  },
  {
    day: 'Day 10-12',
    title: 'Client Review',
    description: 'Campaign copy and targeting reviewed. Final adjustments made based on client feedback.',
  },
  {
    day: 'Day 12-14',
    title: 'Launch',
    description: 'Campaigns activated. All 11 AI engines begin autonomous operation. First replies typically within 48-72 hours.',
  },
]

export const performanceStats = [
  {
    value: '40%+',
    label: 'Open Rate',
    subtext: 'vs. 27.7% industry avg',
  },
  {
    value: '8%+',
    label: 'Reply Rate',
    subtext: 'vs. 5.1% industry avg',
  },
  {
    value: '60%+',
    label: 'Positive Replies',
    subtext: 'vs. 42% industry avg',
  },
  {
    value: '2%+',
    label: 'Meeting Conversion',
    subtext: 'vs. 1% industry avg',
  },
]
