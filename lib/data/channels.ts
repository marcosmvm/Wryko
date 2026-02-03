import { Envelope, LinkedinLogo, Phone, ChatCircle } from '@phosphor-icons/react'

export type ChannelStatus = 'active' | 'coming-soon' | 'roadmap' | 'enterprise-only'

export interface Channel {
  name: string
  status: ChannelStatus
  description: string
  icon: typeof Envelope
  features: string[]
  statusLabel?: string
}

export const channels: Channel[] = [
  {
    name: 'Email',
    status: 'active',
    description: 'AI-powered cold email sequences with deep personalization and continuous optimization.',
    icon: Envelope,
    features: [
      'Personalized sequences at scale',
      'A/B testing on every campaign',
      'Smart send-time optimization',
      'Automated follow-ups',
    ],
  },
  {
    name: 'LinkedIn',
    status: 'coming-soon',
    description: 'Automated connection requests, profile visits, and messaging sequences.',
    icon: LinkedinLogo,
    features: [
      'Connection request automation',
      'Profile engagement tracking',
      'InMail sequences',
      'Multi-touch campaigns',
    ],
    statusLabel: 'Coming Soon',
  },
  {
    name: 'SMS',
    status: 'roadmap',
    description: 'Follow-up sequences for highly engaged prospects.',
    icon: ChatCircle,
    features: [
      'Warm lead follow-ups',
      'Meeting reminders',
      'Quick response handling',
    ],
    statusLabel: 'On Roadmap',
  },
  {
    name: 'Phone',
    status: 'roadmap',
    description: 'Warm calling integration for qualified prospects.',
    icon: Phone,
    features: [
      'Warm lead prioritization',
      'Call scheduling',
      'CRM integration',
    ],
    statusLabel: 'On Roadmap',
  },
]

export const activeChannels = channels.filter((c) => c.status === 'active')
export const upcomingChannels = channels.filter((c) => c.status !== 'active')
