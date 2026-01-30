import { FileText, Table, BookOpen, Mail, BarChart3, Users } from 'lucide-react'

export type ResourceCategory = 'guide' | 'case-study' | 'template' | 'tool'

export interface Resource {
  id: string
  title: string
  description: string
  category: ResourceCategory
  icon: typeof FileText
  downloadUrl: string
  fileType: 'PDF' | 'XLSX' | 'DOC'
  fileSize: string
  featured?: boolean
}

export const resources: Resource[] = [
  {
    id: 'ultimate-guide-b2b-outbound',
    title: 'The Ultimate Guide to B2B Outbound in 2026',
    description:
      'Comprehensive guide covering AI-powered prospecting, email deliverability best practices, and campaign optimization strategies that drive results.',
    category: 'guide',
    icon: BookOpen,
    downloadUrl: '/downloads/ultimate-guide-b2b-outbound.pdf',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    featured: true,
  },
  {
    id: 'roi-calculator-spreadsheet',
    title: 'ROI Calculator Spreadsheet',
    description:
      'Estimate potential outcomes for outbound lead generation. Input your deal size, close rate, and current pipeline to model different scenarios.',
    category: 'tool',
    icon: Table,
    downloadUrl: '/downloads/roi-calculator.xlsx',
    fileType: 'XLSX',
    fileSize: '156 KB',
  },
  {
    id: 'cold-email-template-pack',
    title: 'High-Converting Cold Email Templates',
    description:
      '15 proven cold email templates across different industries and use cases. Includes subject lines, body copy, and follow-up sequences.',
    category: 'template',
    icon: Mail,
    downloadUrl: '/downloads/cold-email-templates.pdf',
    fileType: 'PDF',
    fileSize: '890 KB',
    featured: true,
  },
  {
    id: 'icp-definition-worksheet',
    title: 'ICP Definition Worksheet',
    description:
      'Step-by-step worksheet to define your Ideal Customer Profile. Covers firmographics, technographics, buying signals, and pain points.',
    category: 'template',
    icon: Users,
    downloadUrl: '/downloads/icp-worksheet.pdf',
    fileType: 'PDF',
    fileSize: '420 KB',
  },
  {
    id: 'email-deliverability-checklist',
    title: 'Email Deliverability Checklist',
    description:
      'Technical checklist for maximizing inbox placement. Covers SPF, DKIM, DMARC, warmup processes, and ongoing monitoring.',
    category: 'guide',
    icon: FileText,
    downloadUrl: '/downloads/deliverability-checklist.pdf',
    fileType: 'PDF',
    fileSize: '680 KB',
  },
  {
    id: 'subject-line-swipe-file',
    title: 'Subject Line Swipe File',
    description:
      '50+ high-performing subject lines organized by approach: curiosity, value prop, personalization, and social proof.',
    category: 'template',
    icon: Mail,
    downloadUrl: '/downloads/subject-line-swipe-file.pdf',
    fileType: 'PDF',
    fileSize: '340 KB',
  },
  {
    id: 'outbound-metrics-tracker',
    title: 'Outbound Metrics Tracker',
    description:
      'Excel template to track and analyze your outbound campaign performance. Includes formulas for conversion rates, pipeline velocity, and ROI.',
    category: 'tool',
    icon: Table,
    downloadUrl: '/downloads/outbound-metrics-tracker.xlsx',
    fileType: 'XLSX',
    fileSize: '245 KB',
  },
  {
    id: 'follow-up-sequence-guide',
    title: 'The Perfect Follow-Up Sequence',
    description:
      'Data-backed guide to follow-up timing, messaging, and cadence. Learn when to persist and when to move on.',
    category: 'guide',
    icon: BookOpen,
    downloadUrl: '/downloads/follow-up-sequence-guide.pdf',
    fileType: 'PDF',
    fileSize: '1.1 MB',
  },
]

export interface ResourceCategoryOption {
  id: ResourceCategory | 'all'
  label: string
}

export const resourceCategories: ResourceCategoryOption[] = [
  { id: 'all', label: 'All Resources' },
  { id: 'guide', label: 'Guides & Whitepapers' },
  { id: 'template', label: 'Email Templates' },
  { id: 'tool', label: 'Tools & Calculators' },
]
