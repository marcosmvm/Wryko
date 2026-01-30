import { Bot, User, Clock, CheckCircle } from 'lucide-react'
import { Shield, Brain, Search, BarChart3, Settings, AlertTriangle } from 'lucide-react'
import { Target, Wrench, Rocket, TrendingUp } from 'lucide-react'

export interface Responsibility {
  task: string
  description?: string
}

export interface CollaborationRow {
  area: string
  icon: typeof Shield
  ai: { task: string; detail: string }
  human: { task: string; detail: string }
}

export const collaborationRows: CollaborationRow[] = [
  {
    area: 'Deliverability',
    icon: Shield,
    ai: { task: 'Domain health monitoring', detail: 'Checks blacklists, spam scores & reputation every 4 hours' },
    human: { task: 'Escalation handling', detail: 'Human intervention when critical issues arise' },
  },
  {
    area: 'Campaign Copy',
    icon: Brain,
    ai: { task: 'A/B testing & optimization', detail: 'Automatic variant testing on subject lines, copy & timing' },
    human: { task: 'Copy review & approval', detail: 'Every campaign reviewed by your CSM before launch' },
  },
  {
    area: 'Targeting',
    icon: Search,
    ai: { task: 'Lead dedup & DNC checking', detail: 'Real-time verification before every email send' },
    human: { task: 'ICP & strategy definition', detail: 'Expert guidance on who to target and positioning' },
  },
  {
    area: 'Performance',
    icon: BarChart3,
    ai: { task: 'Automated weekly reports', detail: 'Reports generated and delivered automatically' },
    human: { task: 'Strategic pivots', detail: 'Adjusting strategy based on market response' },
  },
  {
    area: 'Execution',
    icon: Settings,
    ai: { task: 'Campaign pacing & throttling', detail: 'Smart send scheduling to maximize deliverability' },
    human: { task: 'Value proposition refinement', detail: 'Crafting messaging that resonates with your market' },
  },
  {
    area: 'Ongoing Success',
    icon: AlertTriangle,
    ai: { task: 'Blacklist & health monitoring', detail: 'Instant alerts if any sending domain is flagged' },
    human: { task: 'Dedicated CSM support', detail: 'Ongoing optimization and success management' },
  },
]

export const aiResponsibilities: Responsibility[] = [
  {
    task: 'Domain health monitoring',
    description: 'Continuous checks every 4 hours for blacklists, spam scores, and reputation',
  },
  {
    task: 'A/B testing execution',
    description: 'Automatic variant testing on subject lines, copy, and send times',
  },
  {
    task: 'Lead deduplication & DNC checking',
    description: 'Real-time verification before every email send',
  },
  {
    task: 'Automated reporting',
    description: 'Weekly performance reports generated and delivered automatically',
  },
  {
    task: 'Campaign pacing & throttling',
    description: 'Smart send scheduling to maximize deliverability',
  },
  {
    task: 'Blacklist monitoring',
    description: 'Instant alerts if any sending domain is flagged',
  },
]

export const humanResponsibilities: Responsibility[] = [
  {
    task: 'ICP definition & targeting strategy',
    description: 'Expert guidance on who to target and how to position',
  },
  {
    task: 'Value proposition refinement',
    description: 'Crafting messaging that resonates with your market',
  },
  {
    task: 'Campaign copy review & approval',
    description: 'Every campaign reviewed by your CSM before launch',
  },
  {
    task: 'Strategic pivots based on feedback',
    description: 'Adjusting strategy based on market response',
  },
  {
    task: 'Client success management',
    description: 'Dedicated CSM for ongoing support and optimization',
  },
  {
    task: 'Escalation handling',
    description: 'Human intervention for complex situations',
  },
]

export const trustMessage = 'Your dedicated success manager reviews every campaign before launch and monitors performance weekly.'

export interface ProcessStep {
  number: number
  title: string
  description: string
  type: 'human' | 'ai' | 'hybrid'
  icon: typeof Bot | typeof User
  dayRange: string
  deliverables: string[]
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Strategy',
    description: 'We define your ICP, messaging, and value proposition together.',
    type: 'human',
    icon: Target,
    dayRange: 'Day 1-3',
    deliverables: [
      'Ideal Customer Profile (ICP) defined',
      'Value proposition and messaging finalized',
      'Target account list built',
    ],
  },
  {
    number: 2,
    title: 'Build',
    description: 'AI generates campaigns while humans review and approve every touchpoint.',
    type: 'hybrid',
    icon: Wrench,
    dayRange: 'Day 4-7',
    deliverables: [
      'Multi-step email sequences created',
      'Sending domains warmed and verified',
      'Campaign copy reviewed and approved',
    ],
  },
  {
    number: 3,
    title: 'Launch',
    description: 'Smart automation works around the clock to reach and engage prospects.',
    type: 'ai',
    icon: Rocket,
    dayRange: 'Day 8-10',
    deliverables: [
      'Campaigns go live with smart throttling',
      'Deliverability monitoring activated',
      'Real-time engagement tracking enabled',
    ],
  },
  {
    number: 4,
    title: 'Optimize',
    description: 'AI tests continuously while your strategist guides pivots for peak performance.',
    type: 'hybrid',
    icon: TrendingUp,
    dayRange: 'Day 11-14',
    deliverables: [
      'A/B tests running on subject lines and copy',
      'Performance-based adjustments deployed',
      'First qualified meetings on your calendar',
    ],
  },
]

export interface EngineOversight {
  engineName: string
  aiDoes: string[]
  humanReviews: string[]
  frequency: string
}

export const engineOversightData: EngineOversight[] = [
  {
    engineName: 'The Guardian',
    aiDoes: ['Domain health checks every 4 hours', 'Blacklist monitoring', 'Spam score tracking'],
    humanReviews: ['Weekly health summary review', 'Escalation on critical issues'],
    frequency: '24/7 AI, Weekly human review',
  },
  {
    engineName: 'The Architect',
    aiDoes: ['Campaign copy generation', 'Sequence design', 'Personalization at scale'],
    humanReviews: ['Approval before every launch', 'Messaging alignment check'],
    frequency: 'Per campaign',
  },
  {
    engineName: 'The Scientist',
    aiDoes: ['A/B test execution', 'Variant selection', 'Performance analysis'],
    humanReviews: ['Bi-weekly performance review', 'Strategic recommendations'],
    frequency: 'Continuous AI, Bi-weekly human',
  },
  {
    engineName: 'The Hunter',
    aiDoes: ['Lead expansion from replies', 'Prospect enrichment', 'Company mapping'],
    humanReviews: ['Quality spot checks', 'ICP alignment validation'],
    frequency: 'Per positive reply',
  },
  {
    engineName: 'The Sentinel',
    aiDoes: ['Website visitor identification', 'Contact enrichment', 'Intent scoring'],
    humanReviews: ['Weekly visitor review', 'Priority lead selection'],
    frequency: 'Real-time AI, Weekly human',
  },
]
