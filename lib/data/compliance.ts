import { Shield, Mail, Globe, Lock, CheckCircle, AlertTriangle, Server, Clock } from 'lucide-react'

export interface ComplianceBadge {
  name: string
  description: string
  icon: typeof Shield
  status: 'active' | 'in-progress'
}

export const complianceBadges: ComplianceBadge[] = [
  {
    name: 'GDPR Compliant',
    description: 'Full compliance with EU data protection regulations',
    icon: Shield,
    status: 'active',
  },
  {
    name: 'CAN-SPAM Compliant',
    description: 'Adherence to US anti-spam legislation',
    icon: Mail,
    status: 'active',
  },
  {
    name: 'CCPA Ready',
    description: 'California Consumer Privacy Act compliance',
    icon: Lock,
    status: 'active',
  },
  {
    name: 'Gmail/Yahoo 2024',
    description: 'Meets new sender requirements effective Feb 2024',
    icon: CheckCircle,
    status: 'active',
  },
]

export interface DeliverabilityFeature {
  title: string
  description: string
  icon: typeof Server
  items: string[]
}

export const deliverabilityFeatures: DeliverabilityFeature[] = [
  {
    title: 'Domain Setup & Management',
    description: 'Enterprise-grade email infrastructure',
    icon: Globe,
    items: [
      'Dedicated sending domains (no shared IPs)',
      'SPF, DKIM, DMARC configuration included',
      '14-day domain warmup process',
      'Ongoing domain reputation monitoring',
    ],
  },
  {
    title: 'Opt-Out Handling',
    description: 'Automated compliance with unsubscribe requests',
    icon: CheckCircle,
    items: [
      'One-click unsubscribe in every email',
      'Automated processing within 24 hours',
      'DNC list checking before every send',
      'Blacklist monitoring and alerts',
    ],
  },
  {
    title: 'Platform TOS Adherence',
    description: 'Staying within email provider guidelines',
    icon: AlertTriangle,
    items: [
      'Gmail sender requirements (Feb 2024)',
      'Yahoo sender requirements',
      'Outlook deliverability guidelines',
      'Send volume throttling within limits',
    ],
  },
  {
    title: 'Legal Compliance',
    description: 'Built with privacy regulations in mind',
    icon: Shield,
    items: [
      'GDPR-compliant data handling',
      'CAN-SPAM Act adherence',
      'CCPA ready',
      'Data processing agreements available',
    ],
  },
]

export const warmupProcess = {
  title: '14-Day Domain Warmup',
  description: 'We gradually increase sending volume to establish domain reputation',
  icon: Clock,
  steps: [
    { day: '1-3', volume: '50-100 emails/day', focus: 'Establishing baseline reputation' },
    { day: '4-7', volume: '200-400 emails/day', focus: 'Building trust signals' },
    { day: '8-11', volume: '600-1000 emails/day', focus: 'Scaling with monitoring' },
    { day: '12-14', volume: 'Full volume', focus: 'Ready for campaign launch' },
  ],
}
