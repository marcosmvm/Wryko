/**
 * Server-safe metadata for use in Next.js server components (page.tsx files).
 *
 * The main data files (engine-details.ts, faq-data.ts, resources-data.ts)
 * import Phosphor React icon components which call createContext at module init.
 * This breaks in server-only contexts like generateStaticParams/generateMetadata.
 *
 * This file provides the same text data without any React component imports.
 * Keep it in sync when adding new engines, FAQ categories, or resources.
 */

// ─── Engine metadata ───────────────────────────────────────────────

export interface EngineMetaEntry {
  slug: string
  name: string
  tagline: string
  heroDescription: string
}

export const engineMeta: Record<string, EngineMetaEntry> = {
  'the-guardian': {
    slug: 'the-guardian',
    name: 'The Guardian',
    tagline: 'Compliance & Deliverability Protection',
    heroDescription:
      'Protect your sender reputation with real-time domain health monitoring, DNC verification, blacklist checking, and automatic compliance with Gmail/Yahoo 2024-2025 requirements.',
  },
  'the-architect': {
    slug: 'the-architect',
    name: 'The Architect',
    tagline: 'AI Campaign Design',
    heroDescription:
      'Design personalized email sequences using AI-powered copywriting. Creates subject lines, body copy, and follow-ups tailored to your ICP and value proposition.',
  },
  'the-scientist': {
    slug: 'the-scientist',
    name: 'The Scientist',
    tagline: 'Continuous Optimization',
    heroDescription:
      'Run A/B tests every Monday and Wednesday, automatically promoting winning variants. Analyzes open rates, reply rates, and meeting conversions to maximize performance.',
  },
  'the-hunter': {
    slug: 'the-hunter',
    name: 'The Hunter',
    tagline: 'Lead Expansion',
    heroDescription:
      'Expand your pipeline from every positive reply. When a prospect responds positively, The Hunter maps their organization and identifies similar companies to target.',
  },
  'the-sentinel': {
    slug: 'the-sentinel',
    name: 'The Sentinel',
    tagline: 'Website Visitor Intelligence',
    heroDescription:
      'Identify anonymous website visitors using reverse-IP lookup and behavioral analysis. Enriches visitor data and triggers targeted outreach sequences.',
  },
  'the-informant': {
    slug: 'the-informant',
    name: 'The Informant',
    tagline: 'Automated Reporting',
    heroDescription:
      'Generate comprehensive weekly performance reports automatically. Delivers data-driven insights on campaign performance, deliverability health, and pipeline metrics.',
  },
  'the-judge': {
    slug: 'the-judge',
    name: 'The Judge',
    tagline: 'Issue Detection & Auto-Healing',
    heroDescription:
      'Detect and resolve campaign issues before they impact performance. Monitors for anomalies, spam complaints, bounce spikes, and automatically applies corrective actions.',
  },
  'the-keeper': {
    slug: 'the-keeper',
    name: 'The Keeper',
    tagline: 'AI Knowledge Brain',
    heroDescription:
      'Your always-available AI knowledge base that answers client questions instantly. Trained on your campaigns, metrics, and best practices for immediate support.',
  },
  'the-launcher': {
    slug: 'the-launcher',
    name: 'The Launcher',
    tagline: 'Automated Onboarding',
    heroDescription:
      'Automate the entire client onboarding process from signed agreement to campaign launch. Handles domain provisioning, CRM integration, and campaign setup.',
  },
  'the-monitor': {
    slug: 'the-monitor',
    name: 'The Monitor',
    tagline: 'Churn Risk Detection',
    heroDescription:
      'Detect early warning signs of client dissatisfaction using engagement and performance data. Triggers proactive outreach before issues escalate.',
  },
  'the-navigator': {
    slug: 'the-navigator',
    name: 'The Navigator',
    tagline: 'Self-Serve Client Portal',
    heroDescription:
      'Enable clients to manage their campaigns, view reports, and submit requests through an intuitive self-serve portal powered by AI assistance.',
  },
}

export const getAllEngineSlugsServer = (): string[] => Object.keys(engineMeta)

// ─── FAQ metadata ──────────────────────────────────────────────────

export interface FAQItemServer {
  question: string
  answer: string
}

export interface FAQCategoryServer {
  id: string
  title: string
  items: FAQItemServer[]
}

// Import pricing FAQs inline to avoid pulling in any icon-containing modules
const pricingFAQItems: FAQItemServer[] = [
  {
    question: "What's included in the monthly retainer?",
    answer:
      "Your monthly retainer covers all 11 AI engines, dedicated sending domains, daily monitoring and optimization, bi-weekly strategy calls, automated reporting, 24/7 client portal access, Slack/Telegram support, and CRM integration. The only additional cost is the per-meeting performance bonus.",
  },
  {
    question: 'How does the per-meeting bonus work?',
    answer:
      "You only pay the meeting bonus when we deliver a qualified meeting—defined as a live conversation with a decision-maker who matches your ICP and has buying authority. We verify each meeting before invoicing. This performance-based model means our incentives are fully aligned with yours.",
  },
  {
    question: 'Are there any long-term contracts?',
    answer:
      "Every engagement starts with a 90-day pilot at full capacity. After the pilot period, you're on a month-to-month basis with 30 days written notice to cancel. We believe in earning your business every month, not locking you in.",
  },
  {
    question: 'What if I need to scale up or change tiers?',
    answer:
      "You can upgrade at any time. Scaling up typically involves adding more sending domains and increasing volume. Our team handles all the technical changes. Downgrades take effect at the next billing cycle.",
  },
  {
    question: "What's the ROI I can expect?",
    answer:
      "ROI depends on your deal size and close rate. A typical scenario: at $50K ACV and 20% close rate, 10 meetings/month = $100K in pipeline. Against a $2K-$4K retainer, that's a 10-25x ROI. Our ROI calculator on the pricing page can model your specific scenario.",
  },
  {
    question: 'Do you offer a money-back guarantee?',
    answer:
      "We offer a performance guarantee: if your average reply rate stays below 3% for 30 consecutive days during the pilot, you can exit with 15 days written notice and receive a pro-rated refund for the unused portion of that month's retainer.",
  },
]

export const faqCategoriesServer: FAQCategoryServer[] = [
  {
    id: 'platform',
    title: 'Platform Questions',
    items: [
      { question: 'How does Wryko work?', answer: 'Wryko is an autonomous B2B lead generation platform powered by 11 specialized AI engines. We handle everything from prospecting and email copywriting to domain management, compliance, and campaign optimization. Our engines work 24/7 to identify prospects, craft personalized outreach, and book qualified meetings on your calendar.' },
      { question: 'What makes Wryko different from other lead gen agencies?', answer: 'Traditional agencies rely on manual processes and human SDRs. Wryko uses 11 AI engines that work autonomously around the clock—optimizing campaigns, detecting issues before they impact performance, and expanding your pipeline from every positive reply. We provide enterprise-grade outbound capabilities at a fraction of the cost of hiring in-house SDRs.' },
      { question: 'What types of companies is Wryko best suited for?', answer: 'Wryko is ideal for B2B companies with deal sizes of $25K or more. We work with SaaS companies, professional services firms, technology providers, healthcare tech, financial services, and manufacturing. If you sell to mid-market or enterprise buyers and need predictable pipeline, we can help.' },
      { question: 'How many meetings can I expect per month?', answer: 'Meeting volume depends on your industry, ICP, offer, and deal size. Our platform is designed to scale your outbound pipeline through AI-powered optimization, with most campaigns reaching full capacity within 60-90 days of launch.' },
      { question: 'What is considered a "qualified meeting"?', answer: "A qualified meeting is a live conversation (call or video) with a decision-maker who matches your Ideal Customer Profile (ICP) and has buying authority. We verify each meeting before invoicing—no-shows or mismatched leads don't count toward your bonus." },
      { question: 'Do I need to provide my own leads?', answer: 'No. We handle prospecting entirely. Our engines identify companies matching your ICP, find the right decision-makers, verify contact information, and build your target list. You just need to define your ideal customer and we do the rest.' },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Billing',
    items: pricingFAQItems,
  },
  {
    id: 'integrations',
    title: 'Integrations & Technical',
    items: [
      { question: 'What CRMs do you integrate with?', answer: 'We integrate with all major CRMs including Salesforce, HubSpot, Pipedrive, Zoho, Close, and Copper. Our integrations sync meetings, lead data, and activity logs automatically. Custom integrations are available for enterprise clients.' },
      { question: 'How does the CRM integration work?', answer: "Once connected, we automatically push new leads and meeting data to your CRM. You'll see contact information, company details, email engagement history, and meeting notes. Two-way sync ensures your team always has the latest information." },
      { question: 'Do I need technical expertise to use Wryko?', answer: "No technical expertise required. Our team handles all setup, integration, and ongoing maintenance. You'll have access to a client portal for real-time reporting, but our engines run autonomously without any input from you." },
      { question: 'Can I connect my calendar for meeting booking?', answer: "Yes, we integrate with Google Calendar, Outlook, and Calendly. When a prospect wants to book a meeting, they're routed to your calendar with available time slots. Meetings are automatically added to your schedule with all relevant context." },
      { question: 'What data do you need from me to get started?', answer: 'We need your ICP definition (industry, company size, titles), CRM credentials, calendar booking link, and a brief discovery call to understand your value proposition. Our onboarding form walks you through everything—most clients complete it in 15-20 minutes.' },
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance & Security',
    items: [
      { question: 'How do you ensure GDPR compliance?', answer: 'We maintain full GDPR compliance through legitimate interest basis for B2B outreach, easy one-click unsubscribe in every email, opt-out processing within 24 hours, and data processing agreements available upon request. We only contact business email addresses and respect all privacy preferences.' },
      { question: 'What about CAN-SPAM compliance?', answer: 'Every email we send includes accurate sender information, a physical mailing address, clear identification as a commercial message, and one-click unsubscribe functionality. We process opt-outs within 24 hours as required by law.' },
      { question: 'How do you protect my domain reputation?', answer: 'We use dedicated sending domains for each client (no shared IPs), configure SPF, DKIM, and DMARC authentication, run a 14-day warmup process before launching campaigns, and monitor domain health around the clock. Our Guardian engine checks for blacklists every 4 hours.' },
      { question: 'Do you check Do-Not-Contact (DNC) lists?', answer: "Yes, we check DNC lists before every send. Our system maintains a master suppression list that includes your opt-outs, industry DNC lists, and any contacts you specifically want excluded. Once someone is on the DNC list, they're never contacted again." },
      { question: 'How do you handle data security?', answer: 'All data is encrypted in transit and at rest. We use SOC 2 compliant infrastructure, implement role-based access controls, and maintain detailed audit logs. Data is stored in secure US-based data centers with regular backups.' },
      { question: 'Can you sign a Data Processing Agreement (DPA)?', answer: 'Yes, we provide DPAs for all clients upon request. Our standard DPA covers GDPR requirements including data processing terms, sub-processor lists, and data deletion procedures. Enterprise clients can request custom terms.' },
    ],
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      { question: 'How long does it take to get started?', answer: 'Our standard onboarding is 14 days from signed agreement to campaign launch. This includes domain provisioning and warmup, CRM integration, ICP definition, and AI-powered campaign creation.' },
      { question: 'What does the onboarding process look like?', answer: "Day 0-3: Welcome, asset collection, and discovery. Day 3-7: Domain setup, CRM integration, and warmup begins. Day 7-12: AI campaign design and your review. Day 12-14: Launch with all 11 engines activated. You'll have bi-weekly calls throughout to ensure alignment." },
      { question: 'Is there a pilot program or trial period?', answer: "Every engagement starts with a 90-day pilot at full capacity. This gives enough time for campaigns to ramp, A/B tests to optimize, and results to compound. After the pilot, you're on month-to-month with 30 days notice to cancel." },
      { question: "What happens if I'm not seeing results?", answer: 'Our guarantee: if your reply rate stays below 3% for 30 consecutive days, you can exit with 15 days written notice and receive a pro-rated refund. But more importantly, our Judge and Scientist engines detect issues early and optimize continuously to prevent underperformance.' },
      { question: 'How do I book a discovery call?', answer: "Click the \"Book Demo\" button anywhere on our site. You'll complete a brief form with your company info and goals, then select a time that works for you. Our discovery calls are 30 minutes and focused on understanding whether Wryko is the right fit for your business." },
      { question: 'What should I prepare before our discovery call?', answer: 'Come prepared with: (1) Your ideal customer profile—who are you selling to?, (2) Your average deal size and sales cycle, (3) Current outbound approach and pain points, (4) Monthly meeting goals. The more specific you can be, the more valuable our conversation.' },
    ],
  },
]

// ─── Resource metadata ─────────────────────────────────────────────

export interface ResourceMetaEntry {
  id: string
  title: string
  description: string
}

export const resourceMeta: ResourceMetaEntry[] = [
  { id: 'ultimate-guide-b2b-outbound', title: 'The Ultimate Guide to B2B Outbound in 2026', description: 'Comprehensive guide covering AI-powered prospecting, email deliverability best practices, and campaign optimization strategies that drive results.' },
  { id: 'roi-calculator-spreadsheet', title: 'ROI Calculator Spreadsheet', description: 'Estimate potential outcomes for outbound lead generation. Input your deal size, close rate, and current pipeline to model different scenarios.' },
  { id: 'cold-email-template-pack', title: 'High-Converting Cold Email Templates', description: '15 proven cold email templates across different industries and use cases. Includes subject lines, body copy, and follow-up sequences.' },
  { id: 'icp-definition-worksheet', title: 'ICP Definition Worksheet', description: 'Step-by-step worksheet to define your Ideal Customer Profile. Covers firmographics, technographics, buying signals, and pain points.' },
  { id: 'email-deliverability-checklist', title: 'Email Deliverability Checklist', description: 'Technical checklist for maximizing inbox placement. Covers SPF, DKIM, DMARC, warmup processes, and ongoing monitoring.' },
  { id: 'subject-line-swipe-file', title: 'Subject Line Swipe File', description: '50+ high-performing subject lines organized by approach: curiosity, value prop, personalization, and social proof.' },
  { id: 'outbound-metrics-tracker', title: 'Outbound Metrics Tracker', description: 'Excel template to track and analyze your outbound campaign performance. Includes formulas for conversion rates, pipeline velocity, and ROI.' },
  { id: 'follow-up-sequence-guide', title: 'The Perfect Follow-Up Sequence', description: 'Data-backed guide to follow-up timing, messaging, and cadence. Learn when to persist and when to move on.' },
]
