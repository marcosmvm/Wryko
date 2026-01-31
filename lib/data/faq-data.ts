import { HelpCircle, CreditCard, Plug, Shield, Rocket } from 'lucide-react'
import { pricingFAQs } from './content'

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  id: string
  title: string
  description: string
  icon: typeof HelpCircle
  items: FAQItem[]
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'platform',
    title: 'Platform Questions',
    description: 'How the platform works and what to expect',
    icon: HelpCircle,
    items: [
      {
        question: 'How does XGrowthOS work?',
        answer:
          'XGrowthOS is an autonomous B2B lead generation platform powered by 11 specialized AI engines. We handle everything from prospecting and email copywriting to domain management, compliance, and campaign optimization. Our engines work 24/7 to identify prospects, craft personalized outreach, and book qualified meetings on your calendar.',
      },
      {
        question: 'What makes XGrowthOS different from other lead gen agencies?',
        answer:
          'Traditional agencies rely on manual processes and human SDRs. XGrowthOS uses 11 AI engines that work autonomously around the clock—optimizing campaigns, detecting issues before they impact performance, and expanding your pipeline from every positive reply. We provide enterprise-grade outbound capabilities at a fraction of the cost of hiring in-house SDRs.',
      },
      {
        question: 'What types of companies is XGrowthOS best suited for?',
        answer:
          'XGrowthOS is ideal for B2B companies with deal sizes of $25K or more. We work with SaaS companies, professional services firms, technology providers, healthcare tech, financial services, and manufacturing. If you sell to mid-market or enterprise buyers and need predictable pipeline, we can help.',
      },
      {
        question: 'How many meetings can I expect per month?',
        answer:
          'Meeting volume depends on your industry, ICP, offer, and deal size. Our platform is designed to scale your outbound pipeline through AI-powered optimization, with most campaigns reaching full capacity within 60-90 days of launch.',
      },
      {
        question: 'What is considered a "qualified meeting"?',
        answer:
          'A qualified meeting is a live conversation (call or video) with a decision-maker who matches your Ideal Customer Profile (ICP) and has buying authority. We verify each meeting before invoicing—no-shows or mismatched leads don\'t count toward your bonus.',
      },
      {
        question: 'Do I need to provide my own leads?',
        answer:
          'No. We handle prospecting entirely. Our engines identify companies matching your ICP, find the right decision-makers, verify contact information, and build your target list. You just need to define your ideal customer and we do the rest.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Billing',
    description: 'Retainer, billing, and performance bonuses',
    icon: CreditCard,
    items: pricingFAQs,
  },
  {
    id: 'integrations',
    title: 'Integrations & Technical',
    description: 'CRMs, calendars, and technical setup',
    icon: Plug,
    items: [
      {
        question: 'What CRMs do you integrate with?',
        answer:
          'We integrate with all major CRMs including Salesforce, HubSpot, Pipedrive, Zoho, Close, and Copper. Our integrations sync meetings, lead data, and activity logs automatically. Custom integrations are available for enterprise clients.',
      },
      {
        question: 'How does the CRM integration work?',
        answer:
          'Once connected, we automatically push new leads and meeting data to your CRM. You\'ll see contact information, company details, email engagement history, and meeting notes. Two-way sync ensures your team always has the latest information.',
      },
      {
        question: 'Do I need technical expertise to use XGrowthOS?',
        answer:
          'No technical expertise required. Our team handles all setup, integration, and ongoing maintenance. You\'ll have access to a client portal for real-time reporting, but our engines run autonomously without any input from you.',
      },
      {
        question: 'Can I connect my calendar for meeting booking?',
        answer:
          'Yes, we integrate with Google Calendar, Outlook, and Calendly. When a prospect wants to book a meeting, they\'re routed to your calendar with available time slots. Meetings are automatically added to your schedule with all relevant context.',
      },
      {
        question: 'What data do you need from me to get started?',
        answer:
          'We need your ICP definition (industry, company size, titles), CRM credentials, calendar booking link, and a brief discovery call to understand your value proposition. Our onboarding form walks you through everything—most clients complete it in 15-20 minutes.',
      },
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance & Security',
    description: 'GDPR, CAN-SPAM, and data security',
    icon: Shield,
    items: [
      {
        question: 'How do you ensure GDPR compliance?',
        answer:
          'We maintain full GDPR compliance through legitimate interest basis for B2B outreach, easy one-click unsubscribe in every email, opt-out processing within 24 hours, and data processing agreements available upon request. We only contact business email addresses and respect all privacy preferences.',
      },
      {
        question: 'What about CAN-SPAM compliance?',
        answer:
          'Every email we send includes accurate sender information, a physical mailing address, clear identification as a commercial message, and one-click unsubscribe functionality. We process opt-outs within 24 hours as required by law.',
      },
      {
        question: 'How do you protect my domain reputation?',
        answer:
          'We use dedicated sending domains for each client (no shared IPs), configure SPF, DKIM, and DMARC authentication, run a 14-day warmup process before launching campaigns, and monitor domain health around the clock. Our Guardian engine checks for blacklists every 4 hours.',
      },
      {
        question: 'Do you check Do-Not-Contact (DNC) lists?',
        answer:
          'Yes, we check DNC lists before every send. Our system maintains a master suppression list that includes your opt-outs, industry DNC lists, and any contacts you specifically want excluded. Once someone is on the DNC list, they\'re never contacted again.',
      },
      {
        question: 'How do you handle data security?',
        answer:
          'All data is encrypted in transit and at rest. We use SOC 2 compliant infrastructure, implement role-based access controls, and maintain detailed audit logs. Data is stored in secure US-based data centers with regular backups.',
      },
      {
        question: 'Can you sign a Data Processing Agreement (DPA)?',
        answer:
          'Yes, we provide DPAs for all clients upon request. Our standard DPA covers GDPR requirements including data processing terms, sub-processor lists, and data deletion procedures. Enterprise clients can request custom terms.',
      },
    ],
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Onboarding, timeline, and first steps',
    icon: Rocket,
    items: [
      {
        question: 'How long does it take to get started?',
        answer:
          'Our standard onboarding is 14 days from signed agreement to campaign launch. This includes domain provisioning and warmup, CRM integration, ICP definition, and AI-powered campaign creation.',
      },
      {
        question: 'What does the onboarding process look like?',
        answer:
          'Day 0-3: Welcome, asset collection, and discovery. Day 3-7: Domain setup, CRM integration, and warmup begins. Day 7-12: AI campaign design and your review. Day 12-14: Launch with all 11 engines activated. You\'ll have bi-weekly calls throughout to ensure alignment.',
      },
      {
        question: 'Is there a pilot program or trial period?',
        answer:
          'Every engagement starts with a 90-day pilot at full capacity. This gives enough time for campaigns to ramp, A/B tests to optimize, and results to compound. After the pilot, you\'re on month-to-month with 30 days notice to cancel.',
      },
      {
        question: 'What happens if I\'m not seeing results?',
        answer:
          'Our guarantee: if your reply rate stays below 3% for 30 consecutive days, you can exit with 15 days written notice and receive a pro-rated refund. But more importantly, our Judge and Scientist engines detect issues early and optimize continuously to prevent underperformance.',
      },
      {
        question: 'How do I book a discovery call?',
        answer:
          'Click the "Book Demo" button anywhere on our site. You\'ll complete a brief form with your company info and goals, then select a time that works for you. Our discovery calls are 30 minutes and focused on understanding whether XGrowthOS is the right fit for your business.',
      },
      {
        question: 'What should I prepare before our discovery call?',
        answer:
          'Come prepared with: (1) Your ideal customer profile—who are you selling to?, (2) Your average deal size and sales cycle, (3) Current outbound approach and pain points, (4) Monthly meeting goals. The more specific you can be, the more valuable our conversation.',
      },
    ],
  },
]
