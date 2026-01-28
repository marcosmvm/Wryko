import { Bot, User, Clock, CheckCircle } from 'lucide-react'

export interface Responsibility {
  task: string
  description?: string
}

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
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Strategy',
    description: 'We define your ICP, messaging, and value proposition together',
    type: 'human',
    icon: User,
  },
  {
    number: 2,
    title: 'Build',
    description: 'AI generates campaigns, humans review and approve',
    type: 'hybrid',
    icon: Bot,
  },
  {
    number: 3,
    title: 'Launch',
    description: 'Smart automation works 24/7 to optimize and protect deliverability',
    type: 'ai',
    icon: Bot,
  },
  {
    number: 4,
    title: 'Optimize',
    description: 'AI tests continuously, humans guide strategic pivots',
    type: 'hybrid',
    icon: User,
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
