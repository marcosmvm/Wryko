import { LucideIcon } from 'lucide-react'
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

// Type definitions
export interface EnginePhase {
  number: number
  title: string
  description: string
  steps: string[]
}

export interface EngineMetric {
  label: string
  healthy?: string
  warning?: string
  critical?: string
  pass?: string
  fail?: string
}

export interface EngineThreshold {
  category: string
  metrics: EngineMetric[]
}

export interface EngineStat {
  value: string
  label: string
  subtext?: string
}

export interface EngineInput {
  name: string
  description: string
}

export interface EngineOutput {
  name: string
  description: string
}

export interface EngineFAQ {
  question: string
  answer: string
}

export interface EngineTrigger {
  type: 'webhook' | 'scheduled' | 'both'
  description: string
  schedule?: string
  endpoint?: string
}

export interface EngineDetail {
  slug: string
  name: string
  tagline: string
  letter: string
  icon: LucideIcon
  suite: 'lead-gen' | 'csm'
  heroDescription: string
  purpose: string
  phases: EnginePhase[]
  triggers: EngineTrigger[]
  thresholds?: EngineThreshold[]
  inputs: EngineInput[]
  outputs: EngineOutput[]
  businessImpact: { title: string; description: string }[]
  stats: EngineStat[]
  timeSavings?: { before: string; after: string; savings: string }
  dataSources?: string[]
  faqs: EngineFAQ[]
  relatedEngines: string[]
}

export const engineDetails: Record<string, EngineDetail> = {
  'the-guardian': {
    slug: 'the-guardian',
    name: 'The Guardian',
    tagline: 'Compliance & Deliverability Protection',
    letter: 'A',
    icon: Shield,
    suite: 'lead-gen',
    heroDescription:
      'Protect your sender reputation with real-time domain health monitoring, DNC verification, blacklist checking, and automatic compliance with Gmail/Yahoo 2024-2025 requirements.',
    purpose:
      'Protect client domain reputation and ensure all outbound campaigns meet deliverability best practices and compliance requirements. The Guardian is the first line of defense against bounces, spam complaints, and blacklisting.',
    phases: [
      {
        number: 1,
        title: 'Lead Verification',
        description: 'Validate and verify every email address before sending',
        steps: [
          'Receives lead list via webhook or file upload',
          'Validates email format (syntax check)',
          'Verifies MX records exist for each domain',
          'Checks email deliverability via verification API (NeverBounce/ZeroBounce)',
          'Removes catch-all and risky emails',
          'Deduplicates against existing campaign lists',
          'Returns verified list with quality scores',
        ],
      },
      {
        number: 2,
        title: 'DNC & Compliance Check',
        description: 'Ensure compliance with regulations and client preferences',
        steps: [
          'Cross-references leads against client DNC list',
          'Checks against global suppression list',
          'Validates GDPR/CCPA compliance flags',
          'Removes competitor companies',
          'Removes existing customers (from CRM sync)',
          'Flags leads requiring special handling',
        ],
      },
      {
        number: 3,
        title: 'Domain Health Monitoring',
        description: 'Continuous monitoring of sender reputation',
        steps: [
          'Checks SPF, DKIM, DMARC records',
          'Monitors blacklist status (daily across 50+ lists)',
          'Tracks spam complaint rates',
          'Monitors bounce rates per domain',
          'Tracks sender reputation scores',
          'Alerts on threshold violations',
        ],
      },
    ],
    triggers: [
      {
        type: 'webhook',
        description: 'Automatically verifies every new lead before it enters a live campaign',
        endpoint: 'Authenticated verification API',
      },
      {
        type: 'scheduled',
        description: 'Proactive domain reputation monitoring—catch issues before they impact deliverability',
        schedule: 'Continuous daily checks',
      },
    ],
    thresholds: [
      {
        category: 'Email Verification',
        metrics: [
          { label: 'Email Syntax', pass: 'Valid', fail: 'Invalid' },
          { label: 'MX Record', pass: 'Exists', fail: 'Missing' },
          { label: 'Deliverability Score', healthy: '>80%', warning: '60-80%', critical: '<60%' },
          { label: 'Catch-All Detection', pass: 'No', fail: 'Yes (flagged)' },
        ],
      },
      {
        category: 'Domain Health',
        metrics: [
          { label: 'Bounce Rate', healthy: '<2%', warning: '2-3%', critical: '>3%' },
          { label: 'Spam Complaints', healthy: '<0.1%', warning: '0.1-0.3%', critical: '>0.3%' },
          { label: 'Blacklist Status', healthy: 'Clear', critical: 'Listed' },
          { label: 'SPF/DKIM/DMARC', healthy: 'All pass', warning: '1 missing', critical: '2+ missing' },
        ],
      },
    ],
    inputs: [
      { name: 'Lead List', description: 'CSV or JSON file with prospect email addresses' },
      { name: 'Client DNC List', description: 'Do-not-contact list from client CRM' },
      { name: 'Domain Configuration', description: 'Sending domains to monitor' },
    ],
    outputs: [
      { name: 'Verified Lead List', description: 'Cleaned CSV/JSON with quality scores' },
      { name: 'Verification Report', description: 'Statistics on verification results' },
      { name: 'Domain Health Dashboard', description: 'Real-time reputation metrics' },
      { name: 'Critical Alerts', description: 'Slack notifications for issues' },
    ],
    businessImpact: [
      { title: 'Deliverability', description: 'Maintain 95%+ inbox placement rate' },
      { title: 'Reputation', description: 'Protect domains from blacklisting' },
      { title: 'Compliance', description: 'Avoid legal issues with GDPR, CAN-SPAM' },
      { title: 'Efficiency', description: 'Stop wasting sends on invalid emails' },
    ],
    stats: [
      { value: '95%+', label: 'Inbox Placement', subtext: 'vs. 80% unverified' },
      { value: '<2%', label: 'Bounce Rate', subtext: 'Below critical threshold' },
      { value: '50+', label: 'Blacklists Monitored', subtext: 'Daily checks' },
      { value: '95%', label: 'Time Saved', subtext: '2-3 hrs → 5 min' },
    ],
    timeSavings: { before: '2-3 hours per campaign', after: '5 minutes', savings: '95%' },
    dataSources: [
      'NeverBounce / ZeroBounce (email verification)',
      'MXToolbox API (blacklist monitoring)',
      'Google Postmaster Tools (sender reputation)',
      'Client CRM (existing customers)',
      'Internal DNC database',
    ],
    faqs: [
      {
        question: 'How often does The Guardian check domain health?',
        answer:
          'Domain health is monitored every 24 hours, with immediate alerts triggered if any domain is flagged on a blacklist or experiences deliverability issues.',
      },
      {
        question: 'What email verification services does The Guardian use?',
        answer:
          'The Guardian integrates with NeverBounce and ZeroBounce for comprehensive email verification, including syntax validation, MX record checks, and deliverability scoring.',
      },
      {
        question: 'How does DNC compliance work?',
        answer:
          'Every lead is cross-referenced against your client DNC list, global suppression lists, and your existing customer database from CRM sync. Matches are automatically removed before any outreach.',
      },
    ],
    relatedEngines: ['the-architect', 'the-scientist', 'the-judge'],
  },

  'the-architect': {
    slug: 'the-architect',
    name: 'The Architect',
    tagline: 'AI-Powered Campaign Creation',
    letter: 'B',
    icon: Target,
    suite: 'lead-gen',
    heroDescription:
      'Transform ICP definitions into complete, ready-to-launch cold email campaigns using GPT-4 powered copywriting tailored to your value proposition.',
    purpose:
      'Transform ICP definitions and targeting criteria into complete, ready-to-launch cold email campaigns. The Architect uses GPT-4 to generate personalized, high-converting email sequences based on proven templates and client-specific value propositions.',
    phases: [
      {
        number: 1,
        title: 'Input Analysis',
        description: 'Parse and understand campaign requirements',
        steps: [
          'Receives campaign request with ICP details',
          'Parses target industry, titles, company size',
          'Extracts client value proposition and differentiators',
          'Identifies key pain points and triggers',
          'Selects appropriate campaign archetype',
        ],
      },
      {
        number: 2,
        title: 'Template Selection',
        description: 'Find the best-performing templates to adapt',
        steps: [
          'Searches Master Library for similar campaigns',
          'Ranks templates by historical performance',
          'Selects top 3-5 templates for adaptation',
          'Identifies winning elements (subject lines, CTAs, hooks)',
        ],
      },
      {
        number: 3,
        title: 'Content Generation',
        description: 'AI-powered copywriting for personalized sequences',
        steps: [
          'Generates 3 subject line variants (A/B testing ready)',
          'Creates personalized opening hooks',
          'Writes value proposition pitch',
          'Crafts soft and hard CTAs',
          'Generates 3-5 email sequence',
          'Creates follow-up variations',
        ],
      },
      {
        number: 4,
        title: 'Quality Assurance',
        description: 'Validate and optimize before launch',
        steps: [
          'Checks spam trigger words',
          'Validates personalization variables',
          'Ensures mobile-friendly formatting',
          'Verifies link functionality',
          'Calculates readability score',
          'Estimates deliverability impact',
        ],
      },
    ],
    triggers: [
      {
        type: 'webhook',
        description: 'Instantly generates AI-powered campaigns when you are ready to launch',
        endpoint: 'Authenticated campaign API',
      },
    ],
    thresholds: [
      {
        category: 'Quality Metrics',
        metrics: [
          { label: 'Spam Score', healthy: '<3', warning: '3-5', critical: '>5' },
          { label: 'Reading Level', healthy: '8th grade', warning: '10th grade', critical: 'College+' },
          { label: 'Word Count', healthy: '50-100', warning: '100-150', critical: '>150' },
          { label: 'CTA Clarity', healthy: 'Clear action', warning: 'Vague', critical: 'Missing' },
        ],
      },
    ],
    inputs: [
      { name: 'ICP Definition', description: 'Industries, company size, target titles, geography' },
      { name: 'Value Proposition', description: 'Key benefits and differentiators' },
      { name: 'Campaign Goals', description: 'Desired tone, sequence length, archetype' },
    ],
    outputs: [
      { name: 'Email Sequence', description: 'Complete 3-5 email sequence in JSON format' },
      { name: 'Subject Line Variants', description: '3 A/B testing ready options' },
      { name: 'Personalization Map', description: 'Variable mapping for customization' },
      { name: 'Campaign in Instantly.ai', description: 'Ready-to-launch configuration' },
    ],
    businessImpact: [
      { title: 'Speed', description: 'Campaign creation in minutes, not days' },
      { title: 'Consistency', description: 'Every campaign follows proven frameworks' },
      { title: 'Quality', description: 'AI-optimized copy beats generic templates' },
      { title: 'Scale', description: 'Handle 10x more campaigns without more headcount' },
    ],
    stats: [
      { value: '10 min', label: 'Campaign Creation', subtext: 'vs. 3-4 hours manual' },
      { value: '3-5', label: 'Email Sequences', subtext: 'Per campaign' },
      { value: '95%', label: 'Time Saved', subtext: '3-4 hrs → 10 min' },
      { value: '5', label: 'Campaign Archetypes', subtext: 'Problem, Solution, Unaware, Re-engage, Event' },
    ],
    timeSavings: { before: '3-4 hours per campaign', after: '10 minutes', savings: '95%' },
    dataSources: [
      'OpenAI GPT-4 (content generation)',
      'Master Template Library (proven sequences)',
      'Historical Performance Data (winning elements)',
    ],
    faqs: [
      {
        question: 'What campaign archetypes does The Architect support?',
        answer:
          'The Architect supports 5 archetypes: Problem-Aware (3-4 emails), Solution-Aware (4-5 emails), Unaware (5-6 emails), Re-Engagement (2-3 emails), and Event-Triggered (2-3 emails).',
      },
      {
        question: 'How does personalization work?',
        answer:
          'The Architect uses variables like {{first_name}}, {{company}}, {{title}}, {{industry}}, {{company_size}}, {{recent_news}}, and {{mutual_connection}} that are automatically populated from lead data.',
      },
      {
        question: 'Does the AI-generated copy need human review?',
        answer:
          'Yes, all generated campaigns are sent to the CSM for approval before launch. The Architect handles the heavy lifting, but human oversight ensures brand alignment.',
      },
    ],
    relatedEngines: ['the-guardian', 'the-scientist', 'the-hunter'],
  },

  'the-scientist': {
    slug: 'the-scientist',
    name: 'The Scientist',
    tagline: 'A/B Testing & Continuous Optimization',
    letter: 'C',
    icon: Brain,
    suite: 'lead-gen',
    heroDescription:
      'Continuously improve campaign performance through systematic A/B testing. Automatically deploy winners and retire underperformers with 95% statistical confidence.',
    purpose:
      'Continuously improve campaign performance through systematic A/B testing. The Scientist runs experiments on subject lines, email copy, CTAs, and send times, automatically deploying winners and retiring underperformers.',
    phases: [
      {
        number: 1,
        title: 'Monday Cycle: Launch Tests',
        description: 'Identify opportunities and launch new experiments',
        steps: [
          'Identifies active campaigns eligible for testing',
          'Analyzes current performance metrics',
          'Generates test hypotheses based on data',
          'Creates variant content (subject lines, hooks, CTAs)',
          'Configures A/B splits in Instantly.ai',
          'Logs tests to Experiments_Log',
        ],
      },
      {
        number: 2,
        title: 'Wednesday Cycle: Analyze Results',
        description: 'Evaluate tests and deploy winners',
        steps: [
          'Pulls performance data from Instantly.ai',
          'Calculates statistical significance',
          'Identifies winners (95% confidence)',
          'Deploys winners to remaining audience',
          'Generates optimization report',
          'Updates Master Library with winning elements',
        ],
      },
      {
        number: 3,
        title: 'Continuous Monitoring',
        description: 'Real-time performance tracking and alerts',
        steps: [
          'Tracks open rates in real-time',
          'Monitors reply rates',
          'Detects performance degradation',
          'Triggers alerts when metrics drop',
          'Recommends intervention when needed',
        ],
      },
    ],
    triggers: [
      {
        type: 'scheduled',
        description: 'Identifies optimization opportunities and launches new experiments automatically',
        schedule: 'Weekly (every Monday morning)',
      },
      {
        type: 'scheduled',
        description: 'Evaluates results and deploys winning variants with statistical confidence',
        schedule: 'Mid-week analysis cycle',
      },
    ],
    thresholds: [
      {
        category: 'Performance Benchmarks',
        metrics: [
          { label: 'Open Rate', healthy: '>45%', warning: '30-45%', critical: '<30%' },
          { label: 'Reply Rate', healthy: '>10%', warning: '5-10%', critical: '<5%' },
          { label: 'Positive Reply %', healthy: '>60%', warning: '40-60%', critical: '<40%' },
        ],
      },
      {
        category: 'Statistical Requirements',
        metrics: [
          { label: 'Open Rate Test', healthy: '100+ opens', warning: '50-100 opens', critical: '<50 opens' },
          { label: 'Reply Rate Test', healthy: '30+ replies', warning: '15-30 replies', critical: '<15 replies' },
          { label: 'Meeting Rate Test', healthy: '10+ meetings', warning: '5-10 meetings', critical: '<5 meetings' },
        ],
      },
    ],
    inputs: [
      { name: 'Active Campaigns', description: 'Campaigns with sufficient volume for testing' },
      { name: 'Performance Data', description: 'Historical open, reply, and meeting rates' },
      { name: 'Test Hypotheses', description: 'Elements to test based on data analysis' },
    ],
    outputs: [
      { name: 'Test Results', description: 'Logged to Experiments_Log with full analysis' },
      { name: 'Deployed Winners', description: 'Winning variants pushed to full audience' },
      { name: 'Optimization Report', description: 'Weekly summary of all experiments' },
      { name: 'Master Library Updates', description: 'Winning elements added to templates' },
    ],
    businessImpact: [
      { title: 'Improvement', description: '15-25% lift in reply rates over time' },
      { title: 'Data-Driven', description: 'No guesswork in optimization decisions' },
      { title: 'Compounding', description: 'Winning elements feed future campaigns' },
      { title: 'Efficiency', description: 'Automated testing at massive scale' },
    ],
    stats: [
      { value: '15-25%', label: 'Reply Rate Lift', subtext: 'Over time with testing' },
      { value: '95%', label: 'Confidence Level', subtext: 'Statistical significance' },
      { value: '2x/week', label: 'Test Cycles', subtext: 'Monday launch, Wednesday analyze' },
      { value: '90%', label: 'Time Saved', subtext: '2-3 hrs → 15 min review' },
    ],
    timeSavings: { before: '2-3 hours per week', after: '15 minutes review', savings: '90%' },
    dataSources: [
      'Instantly.ai API (campaign analytics)',
      'Experiments Log (historical tests)',
      'Master Library (winning elements)',
    ],
    faqs: [
      {
        question: 'How long does each A/B test run?',
        answer:
          'Test duration varies by type: Subject lines and opening hooks need 48 hours, CTAs need 72 hours, send time tests run for 1 week, and sequence length tests run for 2 weeks.',
      },
      {
        question: 'What happens if no clear winner emerges?',
        answer:
          'If results are statistically tied, The Scientist extends the test for more data or pivots to test different elements. No inconclusive tests are forced to a decision.',
      },
      {
        question: 'How many variants can be tested at once?',
        answer:
          'Subject lines can test 2-4 variants, while other elements (hooks, CTAs) typically test 2 variants at a time to ensure statistical validity.',
      },
    ],
    relatedEngines: ['the-architect', 'the-guardian', 'the-hunter'],
  },

  'the-hunter': {
    slug: 'the-hunter',
    name: 'The Hunter',
    tagline: 'Lead Expansion from Positive Replies',
    letter: 'D',
    icon: Zap,
    suite: 'lead-gen',
    heroDescription:
      'Multiply pipeline opportunities from every positive reply. Automatically identify 25-50 lookalike prospects and launch targeted campaigns within 24 hours.',
    purpose:
      'Multiply pipeline opportunities by expanding from every positive reply. When a prospect responds positively, The Hunter identifies similar companies and additional contacts within the responding company, creating a compounding growth effect.',
    phases: [
      {
        number: 1,
        title: 'Reply Classification',
        description: 'Analyze and categorize incoming replies',
        steps: [
          'Receives reply webhook from Instantly.ai',
          'Analyzes sentiment (positive, neutral, negative, OOO)',
          'Classifies intent (interested, meeting request, question, objection)',
          'Logs reply to Replies_Log',
          'Routes to appropriate workflow',
        ],
      },
      {
        number: 2,
        title: 'In-Company Expansion',
        description: 'Find more decision-makers at responding companies',
        steps: [
          'Identifies responding company',
          'Searches for additional decision-makers (5-10 contacts)',
          'Filters by target titles and seniority',
          'Deduplicates against existing outreach',
          'Creates warm referral campaign',
        ],
      },
      {
        number: 3,
        title: 'Lookalike Expansion',
        description: 'Find similar companies to expand reach',
        steps: [
          'Analyzes responding company profile',
          'Identifies key attributes (industry, size, tech stack, location)',
          'Searches for similar companies (10-20 matches)',
          'Enriches with decision-maker contacts',
          'Validates against ICP criteria',
          'Creates lookalike campaign',
        ],
      },
      {
        number: 4,
        title: 'Campaign Launch',
        description: 'Automated pipeline expansion',
        steps: [
          'Sends expanded leads through The Guardian (verification)',
          'Creates personalized sequences via The Architect',
          'Launches campaigns within 24-48 hours',
          'Logs expansion to Expansion_Log',
          'Notifies CSM of new pipeline',
        ],
      },
    ],
    triggers: [
      {
        type: 'webhook',
        description: 'Triggers instantly when a positive reply is detected—expanding your pipeline in real time',
        endpoint: 'Authenticated reply webhook',
      },
    ],
    thresholds: [
      {
        category: 'Expansion Metrics',
        metrics: [
          { label: 'In-Company Contacts', healthy: '5-10 per reply', warning: '3-5', critical: '<3' },
          { label: 'Lookalike Companies', healthy: '10-20 per reply', warning: '5-10', critical: '<5' },
          { label: 'Expansion to Meeting Rate', healthy: '>10%', warning: '5-10%', critical: '<5%' },
        ],
      },
    ],
    inputs: [
      { name: 'Positive Reply', description: 'Webhook notification from email platform' },
      { name: 'Company Profile', description: 'Enriched data about responding company' },
      { name: 'ICP Criteria', description: 'Target parameters for lookalike matching' },
    ],
    outputs: [
      { name: 'Reply Classification', description: 'Sentiment and intent logged' },
      { name: 'Expansion Leads', description: '25-50 new prospects per positive reply' },
      { name: 'New Campaigns', description: 'Auto-launched within 24-48 hours' },
      { name: 'Slack Notifications', description: 'Alerts to #positive-replies channel' },
    ],
    businessImpact: [
      { title: 'Compounding Growth', description: 'Every win creates more opportunities' },
      { title: 'Warm Leads', description: 'Referral-based outreach converts 2-3x better' },
      { title: 'Efficiency', description: 'Automated expansion at massive scale' },
      { title: 'Pipeline Multiplication', description: '10 meetings → 250-500 new prospects' },
    ],
    stats: [
      { value: '25-50', label: 'Leads per Reply', subtext: 'Automatic expansion' },
      { value: '24 hrs', label: 'Time to Launch', subtext: 'New campaigns' },
      { value: '2-3x', label: 'Better Conversion', subtext: 'Warm vs. cold leads' },
      { value: '95%', label: 'Time Saved', subtext: '4-5 hrs → 15 min' },
    ],
    timeSavings: { before: '4-5 hours per positive reply', after: '15 minutes', savings: '95%' },
    dataSources: [
      'Instantly.ai (reply detection)',
      'Apollo.io (company enrichment)',
      'LinkedIn Sales Navigator (contact data)',
    ],
    faqs: [
      {
        question: 'How does reply sentiment analysis work?',
        answer:
          'The Hunter uses AI to classify replies as positive (interested, meeting request), neutral (more info needed), negative (objection, unsubscribe), or auto-response (OOO). Only positive replies trigger expansion.',
      },
      {
        question: 'What makes a "lookalike" company?',
        answer:
          'Lookalike companies share similar attributes: same industry, similar company size, matching geography, and comparable tech stack. All matches are validated against your ICP criteria.',
      },
      {
        question: 'Does expansion ever stop?',
        answer:
          'Expansion is bounded by ICP criteria and deduplication. Leads already in your pipeline or on DNC lists are automatically excluded to prevent over-saturation.',
      },
    ],
    relatedEngines: ['the-guardian', 'the-architect', 'the-sentinel'],
  },

  'the-sentinel': {
    slug: 'the-sentinel',
    name: 'The Sentinel',
    tagline: 'Website Visitor Intelligence',
    letter: 'E',
    icon: Eye,
    suite: 'lead-gen',
    heroDescription:
      'Identify anonymous website visitors and convert them into actionable prospects. Reveal company details and find 8-15 decision-makers per identified company.',
    purpose:
      'Identify anonymous website visitors and convert them into actionable prospects. The Sentinel monitors client websites for B2B traffic, identifies the companies behind the visits, and enriches with decision-maker contacts for targeted outreach.',
    phases: [
      {
        number: 1,
        title: 'Visitor Detection',
        description: 'Capture and filter website traffic',
        steps: [
          'Tracking script captures IP addresses',
          'Filters out known bots, crawlers, and internal traffic',
          'Groups sessions by company identifier',
          'Tracks page views, time on site, and content consumed',
          'Calculates engagement score',
        ],
      },
      {
        number: 2,
        title: 'Company Identification',
        description: 'Reveal companies behind anonymous visits',
        steps: [
          'Performs IP-to-company reverse lookup (RB2B/Clearbit)',
          'Enriches company data (size, industry, revenue)',
          'Matches against ICP criteria',
          'Scores fit and intent',
          'Prioritizes high-value visitors',
        ],
      },
      {
        number: 3,
        title: 'Contact Enrichment',
        description: 'Find decision-makers at identified companies',
        steps: [
          'Searches for decision-makers at identified companies',
          'Filters by target titles and departments',
          'Verifies email addresses',
          'Creates prospect profiles (8-15 contacts per company)',
          'Adds to outreach queue',
        ],
      },
      {
        number: 4,
        title: 'Campaign Trigger',
        description: 'Route to appropriate outreach based on intent',
        steps: [
          'High-intent visitors → immediate personalized outreach',
          'Medium-intent visitors → targeted campaign within 24h',
          'Low-intent visitors → nurture sequence',
          'Sends leads through The Guardian for verification',
          'Launches campaigns via The Architect',
        ],
      },
    ],
    triggers: [
      {
        type: 'webhook',
        description: 'Captures and enriches high-intent website visitors the moment they are identified',
        endpoint: 'Authenticated visitor API',
      },
      {
        type: 'scheduled',
        description: 'Consolidates and prioritizes visitor data for targeted outreach',
        schedule: 'Daily batch processing',
      },
    ],
    thresholds: [
      {
        category: 'Intent Scoring',
        metrics: [
          { label: 'Pricing Page Visit', healthy: '+30 points' },
          { label: '3+ Pages Viewed', healthy: '+20 points' },
          { label: 'Time on Site >3 min', healthy: '+15 points' },
          { label: 'Return Visit', healthy: '+25 points' },
          { label: 'Content Download', healthy: '+35 points' },
        ],
      },
      {
        category: 'Intent Classification',
        metrics: [
          { label: 'High Intent (80+)', healthy: 'Immediate outreach' },
          { label: 'Medium Intent (50-79)', warning: 'Campaign within 24h' },
          { label: 'Low Intent (25-49)', warning: 'Nurture sequence' },
          { label: 'Minimal (<25)', critical: 'Monitor only' },
        ],
      },
    ],
    inputs: [
      { name: 'Website Traffic', description: 'IP addresses and session data' },
      { name: 'ICP Criteria', description: 'Target company attributes' },
      { name: 'Target Titles', description: 'Decision-maker roles to find' },
    ],
    outputs: [
      { name: 'Visitor Activity Log', description: 'Full session data per company' },
      { name: 'Identified Companies', description: 'Company profiles with enrichment' },
      { name: 'Decision-Maker Contacts', description: '8-15 contacts per company' },
      { name: 'Intent Scores', description: 'Prioritized outreach queue' },
    ],
    businessImpact: [
      { title: 'Hidden Pipeline', description: 'Identify prospects already interested' },
      { title: 'Perfect Timing', description: 'Reach out while interest is hot' },
      { title: 'Personalization', description: 'Reference their website behavior' },
      { title: 'Conversion', description: 'Visitor-identified leads convert 3-5x better' },
    ],
    stats: [
      { value: '8-15', label: 'Contacts per Company', subtext: 'Decision-makers found' },
      { value: '3-5x', label: 'Better Conversion', subtext: 'vs. cold outreach' },
      { value: '15-25%', label: 'Visitor Capture', subtext: 'Of B2B traffic' },
      { value: '85%', label: 'Time Saved', subtext: '2-3 hrs → 30 min review' },
    ],
    timeSavings: { before: '2-3 hours per day', after: '30 minutes review', savings: '85%' },
    dataSources: [
      'RB2B / Clearbit (IP to company)',
      'Apollo.io (contact enrichment)',
      'Google Analytics (traffic data)',
    ],
    faqs: [
      {
        question: 'How does visitor identification work without cookies?',
        answer:
          'The Sentinel uses IP-based identification, mapping business IP addresses to company profiles. This is GDPR-compliant and doesn\'t require personal cookie consent.',
      },
      {
        question: 'What percentage of visitors can be identified?',
        answer:
          'Typically 15-25% of B2B website traffic can be identified to a company level. Consumer traffic and VPN users cannot be identified.',
      },
      {
        question: 'How is privacy handled?',
        answer:
          'The Sentinel only identifies companies, not individuals. All data processing respects GDPR requirements, with 90-day retention limits and immediate opt-out honoring.',
      },
    ],
    relatedEngines: ['the-guardian', 'the-hunter', 'the-architect'],
  },

  'the-informant': {
    slug: 'the-informant',
    name: 'The Informant',
    tagline: 'Automated Performance Reporting',
    letter: 'I',
    icon: BarChart3,
    suite: 'csm',
    heroDescription:
      'Eliminate manual reporting with AI-powered executive summaries. Branded weekly reports delivered every Sunday at 8 PM with trend analysis and actionable insights.',
    purpose:
      'Eliminate the 30-45 minutes per client per week spent manually compiling performance data into reports. The Informant automatically generates executive-ready summaries with AI-powered insights.',
    phases: [
      {
        number: 1,
        title: 'Data Collection',
        description: 'Aggregate metrics from all sources',
        steps: [
          'Pulls campaign metrics from Instantly.ai (sends, opens, replies, bounces)',
          'Retrieves meeting data from Calendly',
          'Fetches inbox health status and deliverability scores',
        ],
      },
      {
        number: 2,
        title: 'Analysis',
        description: 'Process and analyze performance data',
        steps: [
          'Aggregates data per client',
          'Calculates week-over-week trend analysis',
          'Identifies notable changes and anomalies',
        ],
      },
      {
        number: 3,
        title: 'Report Generation',
        description: 'Create executive-ready summary',
        steps: [
          'Generates AI-powered executive summary via GPT-4o',
          'Formats branded HTML email with metrics dashboard',
          'Includes trend visualizations and highlights',
        ],
      },
      {
        number: 4,
        title: 'Delivery',
        description: 'Send and log reports',
        steps: [
          'Delivers report to client email',
          'Sends Slack notification to #client-reports',
          'Logs to Report_History for tracking',
        ],
      },
    ],
    triggers: [
      {
        type: 'scheduled',
        description: 'Delivers polished, AI-summarized performance reports directly to clients',
        schedule: 'Weekly (Sunday evenings)',
      },
      {
        type: 'scheduled',
        description: 'Provides comprehensive monthly trend analysis and strategic insights',
        schedule: 'Monthly (beginning of each month)',
      },
    ],
    inputs: [
      { name: 'Campaign Data', description: 'Sends, opens, replies, bounces from Instantly.ai' },
      { name: 'Meeting Data', description: 'Bookings and completions from Calendly' },
      { name: 'Health Metrics', description: 'Inbox and domain status' },
    ],
    outputs: [
      { name: 'Branded Report Email', description: 'HTML email with full metrics dashboard' },
      { name: 'Executive Summary', description: 'AI-generated insights and recommendations' },
      { name: 'Report History', description: 'Logged for trend analysis' },
    ],
    businessImpact: [
      { title: 'Time Saved', description: '30-45 min/client/week reduced to zero' },
      { title: 'Client Value', description: 'Proactive transparency builds trust' },
      { title: 'Consistency', description: 'Every client gets the same professional report' },
      { title: 'Team Value', description: 'Eliminates repetitive reporting work' },
    ],
    stats: [
      { value: '0 min', label: 'Time Required', subtext: 'Fully automated' },
      { value: '8 PM', label: 'Sunday Delivery', subtext: 'Consistent timing' },
      { value: '100%', label: 'Time Saved', subtext: '30-45 min → 0' },
      { value: 'GPT-4o', label: 'AI Summaries', subtext: 'Executive insights' },
    ],
    timeSavings: { before: '30-45 min/client/week', after: '0 minutes', savings: '100%' },
    dataSources: [
      'Instantly.ai API (campaign analytics)',
      'Calendly API (meetings booked)',
      'Google Sheets (client roster, historical data)',
      'Internal health monitoring',
    ],
    faqs: [
      {
        question: 'Can report timing be customized per client?',
        answer:
          'Currently all reports are sent Sunday at 8 PM for consistency. Custom timing can be configured for enterprise clients with special requirements.',
      },
      {
        question: 'What metrics are included in the report?',
        answer:
          'Reports include sends, opens, replies, bounce rates, meeting bookings, week-over-week trends, deliverability health, and AI-generated executive summary with recommendations.',
      },
      {
        question: 'How is the executive summary generated?',
        answer:
          'GPT-4o analyzes all metrics, identifies trends, and writes a concise summary highlighting wins, areas for attention, and recommendations for the coming week.',
      },
    ],
    relatedEngines: ['the-judge', 'the-monitor', 'the-navigator'],
  },

  'the-judge': {
    slug: 'the-judge',
    name: 'The Judge',
    tagline: 'Issue Detection & Auto-Healing',
    letter: 'J',
    icon: Scale,
    suite: 'csm',
    heroDescription:
      'Transform operations from reactive firefighting to proactive resolution. Automatically detect and fix infrastructure issues before clients notice them.',
    purpose:
      'Transform operations from reactive firefighting to proactive resolution. The Judge continuously monitors infrastructure health and automatically resolves common issues before clients notice them.',
    phases: [
      {
        number: 1,
        title: 'Health Check',
        description: 'Comprehensive infrastructure monitoring',
        steps: [
          'Fetches all inbox statuses from Instantly.ai',
          'Retrieves campaign performance metrics',
          'Checks domain health records (SPF, DKIM, DMARC, blacklists)',
        ],
      },
      {
        number: 2,
        title: 'Anomaly Detection',
        description: 'Compare against thresholds and identify issues',
        steps: [
          'Analyzes data against defined thresholds',
          'Detects anomalies and patterns',
          'Assigns severity level (P1-P4)',
        ],
      },
      {
        number: 3,
        title: 'Auto-Resolution',
        description: 'Automatically fix known issues',
        steps: [
          'Rotate flagged inbox to backup',
          'Pause campaign on critical bounce rate',
          'Disable and replace compromised domain',
          'Flag complex issues for manual review',
        ],
      },
      {
        number: 4,
        title: 'Alerting',
        description: 'Notify appropriate channels',
        steps: [
          'Log incidents to Incident_Log',
          'Critical alerts to #alerts-critical with @channel',
          'General alerts to #alerts-general',
          'Proactive client notification when issues resolved',
        ],
      },
    ],
    triggers: [
      {
        type: 'scheduled',
        description: 'Continuously monitors infrastructure health and auto-resolves issues before clients notice',
        schedule: 'Multiple times daily',
      },
    ],
    thresholds: [
      {
        category: 'Monitoring Thresholds',
        metrics: [
          { label: 'Deliverability', healthy: '>95%', warning: '<95%', critical: '<90%' },
          { label: 'Bounce Rate', healthy: '<2%', warning: '>2%', critical: '>3%' },
          { label: 'Reply Rate Drop', healthy: 'Stable', warning: '>15% WoW', critical: '>25% WoW' },
          { label: 'Inbox Status', healthy: 'Active', critical: 'Flagged' },
          { label: 'Domain Blacklist', healthy: 'Clear', critical: 'Listed' },
        ],
      },
    ],
    inputs: [
      { name: 'Inbox Status', description: 'Health of all sending inboxes' },
      { name: 'Campaign Metrics', description: 'Performance data per campaign' },
      { name: 'Domain Records', description: 'SPF, DKIM, DMARC, blacklist status' },
    ],
    outputs: [
      { name: 'Incident Log', description: 'Full incident record with severity' },
      { name: 'Auto-Fix Actions', description: 'Automated remediation taken' },
      { name: 'Slack Alerts', description: 'Team notifications by severity' },
      { name: 'Client Notifications', description: 'Proactive communication on fixes' },
    ],
    businessImpact: [
      { title: 'Prevention', description: 'Catch problems in hours, not days' },
      { title: 'Client Experience', description: '"We detected and fixed this" vs "Sorry it broke"' },
      { title: 'Reputation', description: 'Demonstrates operational excellence' },
      { title: 'Efficiency', description: 'Reduce firefighting from hours to minutes' },
    ],
    stats: [
      { value: '4 hrs', label: 'Check Frequency', subtext: '6 times per day' },
      { value: '85%', label: 'Time Saved', subtext: '2-3 hrs → 15 min review' },
      { value: 'P1-P4', label: 'Severity Levels', subtext: 'Prioritized response' },
      { value: 'Auto', label: 'Issue Resolution', subtext: 'Common fixes automated' },
    ],
    timeSavings: { before: '2-3 hours/day firefighting', after: '15 min/day review', savings: '85%' },
    dataSources: [
      'Instantly.ai API (inbox/campaign status)',
      'MXToolbox (blacklist monitoring)',
      'Google Postmaster (reputation)',
    ],
    faqs: [
      {
        question: 'What issues can The Judge auto-fix?',
        answer:
          'The Judge can automatically rotate flagged inboxes to backups, pause campaigns with critical bounce rates, and disable/replace compromised domains. Complex issues are flagged for human review.',
      },
      {
        question: 'How are severity levels assigned?',
        answer:
          'P1 (Critical): Immediate action required, impacts deliverability. P2 (High): Significant issue, fix within hours. P3 (Medium): Monitor closely. P4 (Low): Informational.',
      },
      {
        question: 'Do clients get notified of issues?',
        answer:
          'Clients receive proactive notifications when issues are detected AND resolved, demonstrating operational excellence rather than hiding problems.',
      },
    ],
    relatedEngines: ['the-guardian', 'the-informant', 'the-monitor'],
  },

  'the-keeper': {
    slug: 'the-keeper',
    name: 'The Keeper',
    tagline: 'AI-Powered Knowledge Brain',
    letter: 'K',
    icon: BookOpen,
    suite: 'csm',
    heroDescription:
      'Instant answers to operational questions from your centralized knowledge base. Confidence-scored responses with automatic escalation when answers aren\'t found.',
    purpose:
      'Centralize institutional knowledge and provide instant answers to operational questions. The Keeper eliminates knowledge silos and reduces dependency on any single team member.',
    phases: [
      {
        number: 1,
        title: 'Query Reception',
        description: 'Receive and classify incoming questions',
        steps: [
          'Receives query via webhook or Slack command',
          'Parses and classifies query type',
          'Categories: process, troubleshooting, metrics, client-specific',
        ],
      },
      {
        number: 2,
        title: 'Knowledge Search',
        description: 'Search across all knowledge sources',
        steps: [
          'Searches across all knowledge sources with relevance scoring',
          'Knowledge_Base (general articles)',
          'SOPs (step-by-step procedures)',
          'FAQ (common questions)',
          'Troubleshooting_Guide (issue resolution)',
        ],
      },
      {
        number: 3,
        title: 'Answer Generation',
        description: 'Create contextual response with AI',
        steps: [
          'Retrieves top matching entries',
          'Generates contextual answer via GPT-4o with citations',
          'Assigns confidence level (High, Medium, Low)',
        ],
      },
      {
        number: 4,
        title: 'Response & Learning',
        description: 'Deliver answer and identify gaps',
        steps: [
          'Returns response with confidence and sources',
          'Logs query to Query_Log',
          'Low-confidence queries flagged to Knowledge_Gaps',
          'Alerts #knowledge-gaps for documentation improvement',
        ],
      },
    ],
    triggers: [
      {
        type: 'webhook',
        description: 'Provides instant, AI-powered answers to operational questions',
        endpoint: 'Authenticated knowledge API',
      },
      {
        type: 'webhook',
        description: 'Enables seamless knowledge access directly from Slack',
        endpoint: 'Slack integration endpoint',
      },
    ],
    thresholds: [
      {
        category: 'Confidence Levels',
        metrics: [
          { label: 'High Confidence', healthy: 'Multiple sources, exact match' },
          { label: 'Medium Confidence', warning: 'Partial match, related content' },
          { label: 'Low Confidence', critical: 'No strong matches → escalate' },
        ],
      },
    ],
    inputs: [
      { name: 'User Query', description: 'Question in natural language' },
      { name: 'Query Context', description: 'Client, topic, or category hints' },
    ],
    outputs: [
      { name: 'Answer', description: 'AI-generated response with citations' },
      { name: 'Confidence Score', description: 'High, Medium, or Low' },
      { name: 'Source References', description: 'Links to knowledge base articles' },
      { name: 'Knowledge Gap Alert', description: 'For low-confidence queries' },
    ],
    businessImpact: [
      { title: 'Training', description: 'New hires get instant answers' },
      { title: 'Consistency', description: 'Same answer every time' },
      { title: 'Independence', description: 'Team doesn\'t need to interrupt each other' },
      { title: 'Scalability', description: 'Knowledge lives in the system, not in people' },
    ],
    stats: [
      { value: '<1 min', label: 'Response Time', subtext: 'Instant answers' },
      { value: '95%', label: 'Time Saved', subtext: '15-30 min → <1 min' },
      { value: '24/7', label: 'Availability', subtext: 'Always online' },
      { value: 'Auto', label: 'Gap Detection', subtext: 'Improves over time' },
    ],
    timeSavings: { before: '15-30 min per question', after: '<1 minute', savings: '95%' },
    dataSources: [
      'Knowledge Base (general articles)',
      'SOPs (step-by-step procedures)',
      'FAQ (common questions)',
      'Troubleshooting Guide (issue resolution)',
    ],
    faqs: [
      {
        question: 'How does The Keeper learn and improve?',
        answer:
          'Low-confidence queries are flagged to #knowledge-gaps, prompting team members to add missing documentation. The knowledge base continuously expands based on real questions.',
      },
      {
        question: 'Can The Keeper answer client-specific questions?',
        answer:
          'Yes, when context includes a client ID, The Keeper can pull from client-specific documentation and historical data to provide tailored answers.',
      },
      {
        question: 'What happens when an answer isn\'t found?',
        answer:
          'Low-confidence queries trigger automatic escalation. The question is logged to Knowledge_Gaps and posted to Slack for human follow-up.',
      },
    ],
    relatedEngines: ['the-navigator', 'the-launcher', 'the-judge'],
  },

  'the-launcher': {
    slug: 'the-launcher',
    name: 'The Launcher',
    tagline: 'Automated Client Onboarding',
    letter: 'L',
    icon: Rocket,
    suite: 'csm',
    heroDescription:
      'Transform chaotic onboarding into a streamlined 14-day automated process. Welcome emails, asset collection, escalating reminders, and automatic provisioning.',
    purpose:
      'Transform chaotic, manual onboarding into a streamlined, automated process. The Launcher guides clients through each phase while automatically provisioning accounts and sending reminders.',
    phases: [
      {
        number: 1,
        title: 'Initialization (Day 0-1)',
        description: 'Welcome new client and set up tracking',
        steps: [
          'Receives new client data via webhook',
          'Generates unique client ID (XG-XXXXXX)',
          'Creates records in Clients and Onboarding_Tracker',
          'Creates Google Drive folder for client assets',
          'Sends branded welcome email with timeline and checklist',
          'Notifies team on #new-clients',
        ],
      },
      {
        number: 2,
        title: 'Asset Collection (Day 1-3)',
        description: 'Gather required materials from client',
        steps: [
          'Tracks 5 required assets: ICP document, target list, company info, calendar link, logo',
          'Validates submissions automatically',
          'Sends escalating reminders at 24hr (friendly), 48hr (urgent), 72hr (final)',
        ],
      },
      {
        number: 3,
        title: 'Domain Provisioning (Day 3-5)',
        description: 'Set up sending infrastructure',
        steps: [
          'Requests domain provisioning',
          'Configures SPF, DKIM, DMARC records',
          'Initiates domain warmup process',
        ],
      },
      {
        number: 4,
        title: 'Integration & Launch (Day 5-14)',
        description: 'Configure integrations and go live',
        steps: [
          'CRM integration configuration (Day 5-7)',
          'Campaign design and copy creation (Day 7-10)',
          'Client review cycle (Day 10-12)',
          'Campaign activation (Day 12-14)',
        ],
      },
    ],
    triggers: [
      {
        type: 'webhook',
        description: 'Kicks off the automated onboarding journey the moment a client signs',
        endpoint: 'Authenticated onboarding API',
      },
      {
        type: 'scheduled',
        description: 'Sends escalating reminders to keep onboarding on track',
        schedule: 'Throughout the day (multiple check-ins)',
      },
      {
        type: 'webhook',
        description: 'Validates client-submitted assets and advances the onboarding workflow',
        endpoint: 'Authenticated asset API',
      },
    ],
    inputs: [
      { name: 'Client Data', description: 'Company info, contact details, plan type' },
      { name: 'Client Assets', description: 'ICP, target list, logo, calendar link' },
      { name: 'Integration Credentials', description: 'CRM and calendar access' },
    ],
    outputs: [
      { name: 'Welcome Email', description: 'Branded onboarding start communication' },
      { name: 'Google Drive Folder', description: 'Organized client asset storage' },
      { name: 'Onboarding Tracker', description: 'Phase-by-phase progress record' },
      { name: 'Automated Reminders', description: 'Escalating nudges for pending items' },
    ],
    businessImpact: [
      { title: 'Time Saved', description: '5-6 hours reduced to 1-2 hours per client' },
      { title: 'Consistency', description: 'Every client gets the same professional experience' },
      { title: 'Speed', description: 'Faster time-to-launch through automation' },
      { title: 'Visibility', description: 'Real-time progress tracking for all stakeholders' },
    ],
    stats: [
      { value: '14 days', label: 'Onboarding Timeline', subtext: 'Structured process' },
      { value: '70%', label: 'Time Saved', subtext: '5-6 hrs → 1-2 hrs' },
      { value: '5', label: 'Required Assets', subtext: 'Auto-tracked' },
      { value: '3', label: 'Reminder Levels', subtext: 'Friendly → Urgent → Final' },
    ],
    timeSavings: { before: '5-6 hours per client', after: '1-2 hours', savings: '70%' },
    dataSources: [
      'Google Sheets (Clients & Onboarding Tracker)',
      'Google Drive (client folders)',
      'Email SMTP (welcome, reminders)',
    ],
    faqs: [
      {
        question: 'What are the 5 required assets from clients?',
        answer:
          'ICP document (ideal customer profile), target lead list, company information sheet, calendar booking link (Calendly/HubSpot), and company logo for branded materials.',
      },
      {
        question: 'How do escalating reminders work?',
        answer:
          '24 hours: friendly reminder. 48 hours: urgent reminder highlighting deadline. 72 hours: final notice with escalation to CSM for personal follow-up.',
      },
      {
        question: 'Can onboarding timeline be customized?',
        answer:
          'Yes, enterprise clients may have extended timelines. The Launcher adapts reminder schedules and phase durations based on contract terms.',
      },
    ],
    relatedEngines: ['the-navigator', 'the-keeper', 'the-informant'],
  },

  'the-monitor': {
    slug: 'the-monitor',
    name: 'The Monitor',
    tagline: 'Churn Risk Detection & Intervention',
    letter: 'M',
    icon: Activity,
    suite: 'csm',
    heroDescription:
      'Protect revenue through early warning detection. Analyze behavioral and performance signals to identify at-risk accounts before they churn.',
    purpose:
      'Protect revenue through early warning detection. The Monitor analyzes behavioral and performance signals to identify at-risk accounts before they churn, enabling proactive intervention.',
    phases: [
      {
        number: 1,
        title: 'Data Collection',
        description: 'Gather signals from all touchpoints',
        steps: [
          'Retrieves all active clients',
          'Pulls performance history from campaigns',
          'Gathers meeting logs and completion rates',
          'Collects support ticket data',
          'Analyzes communication sentiment',
        ],
      },
      {
        number: 2,
        title: 'Risk Analysis',
        description: 'Calculate weighted health scores',
        steps: [
          'Calculates weighted risk signals for each account',
          'Missed calls: 25% weight',
          'Low reply rates: 20% weight',
          'Negative sentiment: 20% weight',
          'Low engagement: 15% weight',
          'Support spikes: 10% weight',
          'Renewal approaching: 10% weight',
        ],
      },
      {
        number: 3,
        title: 'Classification',
        description: 'Categorize accounts by health',
        steps: [
          'Computes overall health score (0-100)',
          'Healthy (80-100): No action needed',
          'At Risk (50-79): Proactive outreach recommended',
          'Critical (<50): Immediate intervention required',
        ],
      },
      {
        number: 4,
        title: 'Intervention',
        description: 'Generate action plans and alerts',
        steps: [
          'Generates AI-powered intervention playbooks',
          'Immediate action (within 24 hours)',
          'Short-term plan (this week)',
          'Follow-up strategy (2 weeks)',
          'CSM talking points for conversations',
        ],
      },
    ],
    triggers: [
      {
        type: 'scheduled',
        description: 'Analyzes account health and generates AI-powered intervention playbooks for at-risk clients',
        schedule: 'Weekly (every Monday morning)',
      },
    ],
    thresholds: [
      {
        category: 'Risk Signal Weights',
        metrics: [
          { label: 'Missed Calls (≥50% no-show)', healthy: '25% weight' },
          { label: 'Low Reply Rates (<1% or 50% drop)', healthy: '20% weight' },
          { label: 'Negative Sentiment (≥3 communications)', healthy: '20% weight' },
          { label: 'Low Engagement (no login 14+ days)', healthy: '15% weight' },
          { label: 'Support Spikes (≥5 tickets/2 weeks)', healthy: '10% weight' },
          { label: 'Renewal ≤30 days', healthy: '10% weight' },
        ],
      },
      {
        category: 'Health Classification',
        metrics: [
          { label: 'Healthy', healthy: '80-100 score' },
          { label: 'At Risk', warning: '50-79 score' },
          { label: 'Critical', critical: '<50 score' },
        ],
      },
    ],
    inputs: [
      { name: 'Performance Data', description: 'Campaign metrics history' },
      { name: 'Meeting Logs', description: 'Scheduled vs. completed meetings' },
      { name: 'Support Tickets', description: 'Volume and sentiment' },
      { name: 'Communication Data', description: 'Email and call sentiment' },
    ],
    outputs: [
      { name: 'Health Scores', description: 'Per-account score logged to history' },
      { name: 'Intervention Plans', description: 'AI-generated action playbooks' },
      { name: 'Critical Alerts', description: 'Slack to #alerts-critical' },
      { name: 'Portfolio Summary', description: 'Weekly leadership report with ARR at risk' },
    ],
    businessImpact: [
      { title: 'Revenue Protection', description: 'Early intervention saves accounts' },
      { title: 'Proactive Management', description: 'Address issues before clients complain' },
      { title: 'Portfolio Visibility', description: 'Leadership sees health at a glance' },
      { title: 'Data-Driven Decisions', description: 'Prioritize time based on risk' },
    ],
    stats: [
      { value: '6 AM', label: 'Monday Analysis', subtext: 'Weekly health check' },
      { value: '6', label: 'Risk Signals', subtext: 'Multi-factor scoring' },
      { value: 'AI', label: 'Intervention Plans', subtext: 'Personalized playbooks' },
      { value: 'ARR', label: 'Risk Tracking', subtext: 'Revenue at stake' },
    ],
    timeSavings: { before: 'Reactive (not done)', after: 'Automated weekly', savings: 'N/A - new capability' },
    dataSources: [
      'Campaign performance (Instantly.ai)',
      'Meeting data (Calendly)',
      'Support tickets (internal)',
      'Communication logs (email, Slack)',
    ],
    faqs: [
      {
        question: 'How are health scores calculated?',
        answer:
          'Health scores are weighted averages of 6 signals: missed calls (25%), low reply rates (20%), negative sentiment (20%), low engagement (15%), support spikes (10%), and renewal proximity (10%).',
      },
      {
        question: 'What triggers a Critical classification?',
        answer:
          'Any account with a health score below 50 is classified as Critical, typically indicating multiple concerning signals like high no-show rates combined with negative communications.',
      },
      {
        question: 'How do intervention playbooks work?',
        answer:
          'AI generates personalized action plans with: immediate steps (24 hours), short-term plan (this week), follow-up strategy (2 weeks), and CSM talking points for client conversations.',
      },
    ],
    relatedEngines: ['the-informant', 'the-judge', 'the-navigator'],
  },

  'the-navigator': {
    slug: 'the-navigator',
    name: 'The Navigator',
    tagline: 'Self-Serve Client Portal',
    letter: 'N',
    icon: Compass,
    suite: 'csm',
    heroDescription:
      'Reduce administrative overhead with 24/7 client self-service. Update ICP, pause campaigns, download reports—complex requests queued for review with status tracking.',
    purpose:
      'Reduce administrative overhead by enabling clients to handle routine requests themselves. The Navigator provides a structured interface for common actions while routing complex requests for review.',
    phases: [
      {
        number: 1,
        title: 'Request Submission',
        description: 'Client initiates action via portal',
        steps: [
          'Client submits request via portal interface',
          'System validates client access and permissions',
          'Request logged to Portal_Requests with timestamp',
        ],
      },
      {
        number: 2,
        title: 'Request Classification',
        description: 'Route based on request type',
        steps: [
          'Instant: Update ICP, pause campaign, download report',
          'Review: Upload leads, request copy change, schedule call',
          'Complex: Add domain, major strategy changes',
        ],
      },
      {
        number: 3,
        title: 'Processing',
        description: 'Execute or queue for approval',
        steps: [
          'Instant requests → Execute immediately → Confirm to client',
          'Review requests → Notify CSM on Slack → Await approval',
          'Complex requests → Multi-step workflow with tracking',
        ],
      },
      {
        number: 4,
        title: 'Completion',
        description: 'Confirm and log',
        steps: [
          'Execute approved actions',
          'Send confirmation email to client',
          'Update status in Portal_Requests',
          'Full audit trail maintained',
        ],
      },
    ],
    triggers: [
      {
        type: 'webhook',
        description: 'Empowers clients to submit requests 24/7 through the self-serve portal',
        endpoint: 'Authenticated portal API',
      },
      {
        type: 'webhook',
        description: 'Routes complex requests to CSMs for fast, informed approval',
        endpoint: 'Internal approval workflow',
      },
      {
        type: 'webhook',
        description: 'Provides real-time status updates so clients always know where things stand',
        endpoint: 'Status tracking endpoint',
      },
    ],
    thresholds: [
      {
        category: 'Request Types',
        metrics: [
          { label: 'Instant Actions', healthy: 'Auto-executed immediately' },
          { label: 'Review Actions', warning: 'Requires CSM approval' },
          { label: 'Complex Actions', warning: 'Multi-step workflow' },
        ],
      },
    ],
    inputs: [
      { name: 'Client Request', description: 'Action requested via portal' },
      { name: 'Request Details', description: 'Specific parameters for the action' },
      { name: 'CSM Approval', description: 'For review and complex requests' },
    ],
    outputs: [
      { name: 'Action Execution', description: 'Request fulfilled or queued' },
      { name: 'Confirmation Email', description: 'Status update to client' },
      { name: 'Slack Notification', description: 'CSM alert for review items' },
      { name: 'Audit Trail', description: 'Full history in Portal_Requests' },
    ],
    businessImpact: [
      { title: 'Time Saved', description: 'Eliminate email ping-pong for simple requests' },
      { title: 'Client Satisfaction', description: 'Faster turnaround, 24/7 availability' },
      { title: 'Focus Protection', description: 'CSM time preserved for strategic work' },
      { title: 'Audit Trail', description: 'Full visibility into all requests and actions' },
    ],
    stats: [
      { value: '24/7', label: 'Availability', subtext: 'Self-service anytime' },
      { value: '85%', label: 'Time Saved', subtext: '10-15 min → 1-2 min' },
      { value: '3', label: 'Request Types', subtext: 'Instant, Review, Complex' },
      { value: 'Auto', label: 'Status Tracking', subtext: 'Real-time updates' },
    ],
    timeSavings: { before: '10-15 min per request', after: '1-2 minutes', savings: '85%' },
    dataSources: [
      'Portal Requests (request tracking)',
      'Slack (CSM notifications)',
      'Email SMTP (client confirmations)',
    ],
    faqs: [
      {
        question: 'What actions can clients do instantly?',
        answer:
          'Instant actions include: updating ICP or targeting criteria, changing calendar booking link, pausing or resuming campaigns, and downloading the latest performance report.',
      },
      {
        question: 'What requires CSM approval?',
        answer:
          'Review actions include: uploading new lead lists, requesting domain additions, requesting copy/messaging changes, and scheduling strategy calls.',
      },
      {
        question: 'How are complex requests handled?',
        answer:
          'Complex requests like adding domains or major strategy changes trigger multi-step workflows with automatic status updates at each stage and estimated completion times.',
      },
    ],
    relatedEngines: ['the-launcher', 'the-keeper', 'the-monitor'],
  },
}

// Helper to get all engine slugs
export const getAllEngineSlugs = (): string[] => Object.keys(engineDetails)

// Helper to get engines by suite
export const getEnginesBySuite = (suite: 'lead-gen' | 'csm'): EngineDetail[] =>
  Object.values(engineDetails).filter((engine) => engine.suite === suite)

// Helper to get engine by slug
export const getEngineBySlug = (slug: string): EngineDetail | undefined => engineDetails[slug]
