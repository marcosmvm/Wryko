export interface CaseSnippet {
  company: string
  industry: string
  acv: string
  timeWindow: string
  meetingsBooked: number
  revenueClosed: string
  highlight: string
  testimonialSnippet?: string
}

// Case studies will be added once we have verified client results
export const caseSnippets: CaseSnippet[] = []

export const heroCaseHighlight = null

// ─── Case Studies Page Data ───

export const pageHeroStats = [
  { stat: '11', label: 'AI Engines at Work' },
  { stat: '90-Day', label: 'Pilot Duration' },
  { stat: '$2K/mo', label: 'Founding Rate' },
]

// ─── Projected Results ───

export interface ProjectedResult {
  iconName: string
  metric: string
  target: string
  description: string
}

export const projectedResults: ProjectedResult[] = [
  {
    iconName: 'BarChart3',
    metric: 'Open Rate',
    target: '40%+',
    description:
      'Our AI-driven subject line optimization and domain health monitoring are designed to push open rates well above industry averages.',
  },
  {
    iconName: 'MessageSquare',
    metric: 'Reply Rate',
    target: '8%+',
    description:
      'Hyper-personalized messaging powered by continuous A/B testing targets reply rates that outperform manual outbound campaigns.',
  },
  {
    iconName: 'TrendUp',
    metric: 'Positive Replies',
    target: '60%+',
    description:
      'Smart audience segmentation and ICP refinement aim to ensure the majority of replies indicate genuine interest.',
  },
  {
    iconName: 'Target',
    metric: 'Time to Pipeline',
    target: '30 Days',
    description:
      'From campaign launch to qualified meetings on your calendar — our goal is pipeline velocity within the first month.',
  },
]

// ─── Methodology Steps ───

export interface MethodologyStep {
  number: string
  iconName: string
  title: string
  description: string
  deliverables: string[]
}

export const methodologySteps: MethodologyStep[] = [
  {
    number: '01',
    iconName: 'Search',
    title: 'Deep Discovery',
    description:
      'We map your ideal customer profile, value propositions, and competitive landscape to build a precision-targeted outreach strategy.',
    deliverables: [
      'ICP documentation',
      'Value proposition framework',
      'Competitor messaging analysis',
    ],
  },
  {
    number: '02',
    iconName: 'Settings',
    title: 'Infrastructure Build',
    description:
      'Dedicated sending domains, email warmup, CRM integration, and compliance configuration — everything needed for a clean launch.',
    deliverables: [
      'Dedicated domains & warmup',
      'CRM integration setup',
      'Compliance & DNC configuration',
    ],
  },
  {
    number: '03',
    iconName: 'Brain',
    title: 'AI-Powered Execution',
    description:
      'All 11 engines activate simultaneously — generating leads, optimizing campaigns, monitoring domain health, and booking meetings.',
    deliverables: [
      '11 engines running autonomously',
      'Continuous A/B testing',
      'Real-time domain monitoring',
    ],
  },
  {
    number: '04',
    iconName: 'BarChart3',
    title: 'Measure & Optimize',
    description:
      'Weekly performance reports, strategy adjustments based on real data, and pipeline reviews to ensure continuous improvement.',
    deliverables: [
      'Weekly performance dashboards',
      'Strategy optimization reviews',
      'Pipeline health assessments',
    ],
  },
]

// ─── Industry Scenarios ───

export interface IndustryScenario {
  industry: string
  iconName: string
  idealClient: string
  approach: string
  expectedOutcome: string
}

export const industryScenarios: IndustryScenario[] = [
  {
    industry: 'SaaS & Software',
    iconName: 'Monitor',
    idealClient: 'B2B SaaS companies with $50K–$500K ACV targeting mid-market and enterprise buyers.',
    approach:
      'Multi-channel sequences targeting technical decision-makers and economic buyers with use-case-specific messaging.',
    expectedOutcome:
      'Targeted outreach to qualified CTOs, VPs of Engineering, and IT Directors within your ICP.',
  },
  {
    industry: 'IT Services & MSPs',
    iconName: 'Shield',
    idealClient: 'Managed service providers and IT consultancies selling to SMB and mid-market.',
    approach:
      'Pain-point-driven campaigns focused on security, uptime, and compliance — the triggers that drive IT services decisions.',
    expectedOutcome:
      'Consistent pipeline of IT leaders actively evaluating new managed service partnerships.',
  },
  {
    industry: 'Professional Services',
    iconName: 'Briefcase',
    idealClient: 'Consulting firms, legal, and accounting practices targeting B2B clients.',
    approach:
      'Thought-leadership-infused outreach positioning your firm as the trusted advisor for specific business challenges.',
    expectedOutcome:
      'Meetings with CFOs, COOs, and GCs who match your ideal engagement profile.',
  },
  {
    industry: 'Financial Services',
    iconName: 'Landmark',
    idealClient: 'FinTech platforms, wealth management, and B2B financial product companies.',
    approach:
      'Compliance-first campaigns with regulatory-aware messaging and targeted firmographic segmentation.',
    expectedOutcome:
      'Engaged conversations with financial decision-makers in highly regulated environments.',
  },
  {
    industry: 'Marketing & Agencies',
    iconName: 'Megaphone',
    idealClient: 'Agencies and marketing platforms selling to brands and marketing teams.',
    approach:
      'ROI-driven outreach demonstrating measurable outcomes — the language marketing buyers respond to.',
    expectedOutcome:
      'Qualified pipeline of CMOs and marketing directors actively evaluating agency partnerships.',
  },
  {
    industry: 'Manufacturing & Industrial',
    iconName: 'Factory',
    idealClient: 'Industrial suppliers, equipment manufacturers, and logistics companies.',
    approach:
      'Industry-specific campaigns targeting procurement, operations, and plant management with technical value propositions.',
    expectedOutcome:
      'Direct access to operations leaders and procurement teams in your target verticals.',
  },
]

// ─── Founding Partner Benefits ───

export interface FoundingBenefit {
  iconName: string
  title: string
  description: string
  highlight: string
}

export const foundingBenefits: FoundingBenefit[] = [
  {
    iconName: 'Lock',
    title: 'Locked-In Pricing',
    description:
      'Your founding rate stays the same as long as you remain a client — even as our standard pricing increases.',
    highlight: '$2,000/mo locked for life',
  },
  {
    iconName: 'Users',
    title: 'Direct Founder Access',
    description:
      'Work directly with our founding team. No account managers, no layers — direct access to the people building the platform.',
    highlight: 'Direct Slack channel',
  },
  {
    iconName: 'Star',
    title: 'Shape the Roadmap',
    description:
      'Your feedback directly influences product development. Founding partners have a voice in which features and engines we build next.',
    highlight: 'Priority feature requests',
  },
  {
    iconName: 'Clock',
    title: 'Priority Onboarding',
    description:
      'Founding partners receive dedicated onboarding with a 14-day launch guarantee — from signed agreement to live campaigns.',
    highlight: '14-day launch guarantee',
  },
  {
    iconName: 'MessageSquare',
    title: 'Dedicated Communication',
    description:
      'A private communication channel with your dedicated team for real-time updates, questions, and strategy discussions.',
    highlight: 'Real-time collaboration',
  },
  {
    iconName: 'TrendUp',
    title: 'First Published Results',
    description:
      'As a founding partner, your success story will be among the first we publish — with your approval and on your terms.',
    highlight: 'Featured case study',
  },
]

// ─── Case Study FAQs ───

export const caseStudyFAQs = [
  {
    question: 'When will verified case studies be published?',
    answer:
      'Our founding partner cohort is currently in their 90-day pilot programs. We expect to publish our first verified case studies as pilots complete and results are validated. All metrics will be independently verified before publication.',
  },
  {
    question: 'How are meetings and results verified?',
    answer:
      'Every meeting booked through Wryko is verified against your ICP criteria. We track open rates, reply rates, positive reply percentages, and meetings booked per campaign. All data flows through our real-time dashboards, giving you full visibility into performance.',
  },
  {
    question: 'What metrics will case studies include?',
    answer:
      'Published case studies will include campaign open rates, reply rates, positive reply percentages, total meetings booked, pipeline value generated, and time-to-first-meeting. All results will be contextualized by industry, ACV, and target audience.',
  },
  {
    question: 'Can I be featured as a case study?',
    answer:
      'Founding partners will be offered the opportunity to be featured in our first published case studies. Participation is entirely optional and requires your written consent. We will never publish your data without explicit approval.',
  },
  {
    question: 'What industries are your first clients in?',
    answer:
      'Our founding cohort spans B2B SaaS, IT services, professional services, and financial services. Wryko is designed to work across any B2B industry with a defined ideal customer profile and average contract values above $10K.',
  },
  {
    question: 'What happens if the pilot does not meet targets?',
    answer:
      'Our pricing is performance-aligned, meaning we share in the risk. If campaign targets are not met during your pilot, we work with you to optimize strategy and adjust approach — at no additional cost. There are no long-term contracts.',
  },
]
