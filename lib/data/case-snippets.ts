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

export const caseSnippets: CaseSnippet[] = [
  {
    company: 'TechFlow Solutions',
    industry: 'SaaS / Marketing Tech',
    acv: '$45K',
    timeWindow: '90 days',
    meetingsBooked: 35,
    revenueClosed: '$420K closed, $2.1M pipeline',
    highlight: '35 meetings/month for a $45K ACV SaaS - $2.1M pipeline in 90 days',
    testimonialSnippet: 'Went from 5 to 35+ qualified conversations monthly',
  },
  {
    company: 'CloudSecure Pro',
    industry: 'Cybersecurity',
    acv: '$80K',
    timeWindow: '6 months',
    meetingsBooked: 28,
    revenueClosed: '$640K closed',
    highlight: '28 qualified meetings/month for enterprise cybersecurity - 62% CAC reduction',
  },
  {
    company: 'DataBridge Analytics',
    industry: 'Data & Analytics',
    acv: '$120K',
    timeWindow: '6 months',
    meetingsBooked: 21,
    revenueClosed: '$1.2M closed',
    highlight: 'Broke into Fortune 1000 - 127 enterprise leads, 180% larger deals',
  },
]

export const heroCaseHighlight = {
  stat: '35+ meetings/month',
  context: '$45K ACV SaaS company',
  result: '$2.1M pipeline in 90 days',
  source: 'TechFlow Solutions',
}
