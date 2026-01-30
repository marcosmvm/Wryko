'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'

const lastUpdated = 'January 25, 2025'
const effectiveDate = 'January 25, 2025'

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `By accessing or using the XGrowthOS platform, website, or any services provided by XGrowthOS, LLC ("XGrowthOS," "we," "our," or "us"), you ("Client," "you," or "your") agree to be bound by these Terms of Service ("Terms").

If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms. If you do not have such authority, or if you do not agree with these Terms, you may not access or use our services.

These Terms constitute a legally binding agreement between you and XGrowthOS. Please read them carefully before using our services.`,
  },
  {
    id: 'services',
    title: '2. Description of Services',
    content: `XGrowthOS provides an autonomous B2B lead generation platform powered by artificial intelligence. Our services include:

**Core Platform Features**
• AI-powered lead identification and qualification
• Automated email outreach campaigns
• Multi-channel prospecting automation
• Campaign performance analytics and reporting
• Client dashboard for real-time monitoring

**AI Engine Suite**
Our platform is powered by 11 specialized AI engines designed to optimize every aspect of B2B lead generation:
• Campaign optimization and A/B testing
• Self-learning algorithms for continuous improvement
• Compliance and deliverability monitoring
• Lead deduplication and data enrichment
• Automated client success management

**Service Delivery**
• Managed campaign setup and optimization
• Ongoing campaign monitoring and adjustments
• Weekly performance reports
• Dedicated client support

The specific features and capabilities available to you depend on your subscription plan and any custom agreements.`,
  },
  {
    id: 'registration',
    title: '3. Account Registration',
    content: `**Account Creation**
To access certain features of our services, you must create an account. When creating an account, you agree to:
• Provide accurate, current, and complete information
• Maintain and promptly update your account information
• Keep your password secure and confidential
• Notify us immediately of any unauthorized access
• Accept responsibility for all activities under your account

**Eligibility**
You must be at least 18 years old and have the legal capacity to enter into binding contracts. Our services are intended for business use only and are not available to consumers for personal, family, or household purposes.

**Account Security**
You are responsible for maintaining the confidentiality of your account credentials. XGrowthOS will not be liable for any loss or damage arising from your failure to protect your account information.`,
  },
  {
    id: 'payment',
    title: '4. Subscription and Payment Terms',
    content: `**Pricing Structure**
XGrowthOS operates on a subscription model with the following components:
• Monthly retainer fee (billed in advance)
• Performance-based bonuses (billed in arrears)
• One-time setup fees (where applicable)

Current pricing is available on our website and may be updated from time to time with 30 days' notice.

**Billing and Payment**
• All fees are quoted and payable in US Dollars (USD)
• Monthly subscriptions are billed on the same date each month
• Payment is due upon receipt of invoice
• We accept major credit cards and ACH/wire transfers
• Late payments may incur interest at 1.5% per month

**Performance Bonuses**
Performance bonuses are calculated based on qualified meetings booked, as defined in your service agreement. Meetings must meet agreed-upon qualification criteria to count toward bonus calculations.

**Refund Policy**
• Setup fees are non-refundable once work has commenced
• Monthly retainers are non-refundable for the current billing period
• Performance bonuses are non-refundable once meetings are delivered
• Pro-rata refunds may be available for annual subscriptions upon early termination

**Price Changes**
We reserve the right to change our pricing with 30 days' written notice. Price changes will not affect your current billing cycle.`,
  },
  {
    id: 'responsibilities',
    title: '5. User Responsibilities',
    content: `**Acceptable Use**
You agree to use our services only for lawful purposes and in accordance with these Terms. You must:
• Comply with all applicable laws and regulations
• Provide accurate information about your target audience
• Review and approve campaign content before launch
• Respond promptly to requests for information or approval
• Maintain valid contact information

**Prohibited Activities**
You agree NOT to:
• Use our services to send spam or unsolicited communications
• Violate CAN-SPAM, GDPR, CCPA, or other applicable regulations
• Misrepresent your identity or your company
• Target individuals who have opted out or are on do-not-contact lists
• Use our services for illegal, fraudulent, or deceptive purposes
• Attempt to reverse-engineer our AI algorithms or proprietary systems
• Share account access with unauthorized parties
• Interfere with or disrupt our services or infrastructure

**Client Content**
You retain ownership of any content you provide to us ("Client Content"). By providing Client Content, you grant XGrowthOS a non-exclusive, worldwide license to use, reproduce, and modify such content solely for the purpose of providing our services.

You represent and warrant that:
• You own or have the right to use all Client Content
• Client Content does not infringe any third-party rights
• Client Content complies with all applicable laws`,
  },
  {
    id: 'intellectual-property',
    title: '6. Intellectual Property',
    content: `**XGrowthOS Property**
The XGrowthOS platform, including all software, algorithms, AI models, methodologies, documentation, and related intellectual property, is and shall remain the exclusive property of XGrowthOS.

These Terms do not grant you any right, title, or interest in:
• Our proprietary AI engines and algorithms
• Our software, source code, or technical infrastructure
• Our trademarks, logos, or brand assets
• Our methodologies, processes, or trade secrets

**License Grant**
Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to access and use our services for your internal business purposes during the term of your subscription.

**Feedback**
If you provide suggestions, feedback, or ideas about our services, you grant us a perpetual, irrevocable, royalty-free license to use such feedback for any purpose without compensation or attribution.

**Data and Insights**
We may use aggregated, anonymized data derived from our services to improve our platform, develop new features, and create benchmarks. Such data will not identify you or your company.`,
  },
  {
    id: 'data-processing',
    title: '7. Data Processing and Privacy',
    content: `**Data Controller**
For the purposes of lead generation campaigns, you are the data controller and XGrowthOS acts as a data processor on your behalf.

**Data Processing Agreement**
By using our services, you agree to our Data Processing Agreement, which is incorporated into these Terms by reference. The DPA governs how we process personal data on your behalf.

**Privacy Policy**
Our Privacy Policy describes how we collect, use, and protect your personal information when you use our services. By using our services, you agree to our Privacy Policy.

**Compliance Responsibilities**
You are responsible for:
• Ensuring your use of our services complies with applicable data protection laws
• Obtaining any necessary consents for outreach campaigns
• Maintaining appropriate records of consent and opt-outs
• Responding to data subject requests regarding your campaigns

We are responsible for:
• Processing data only as instructed by you
• Implementing appropriate security measures
• Assisting with data subject requests where applicable
• Notifying you of any data breaches affecting your data`,
  },
  {
    id: 'service-level',
    title: '8. Service Level and Availability',
    content: `**Service Availability**
We strive to maintain high availability of our services. While we do not guarantee 100% uptime, we target 99.9% availability measured on a monthly basis.

**Scheduled Maintenance**
We may perform scheduled maintenance that temporarily affects service availability. We will provide at least 48 hours' notice for planned maintenance windows, except in emergencies.

**Support**
We provide support during business hours (9 AM - 6 PM Pacific Time, Monday through Friday, excluding US holidays). Emergency support for critical issues is available 24/7.

**Performance Expectations**
Campaign performance depends on many factors, including:
• Quality of your target audience
• Competitiveness of your market
• Your value proposition and messaging
• Email deliverability factors
• Market conditions and timing

We do not guarantee specific performance outcomes. Past results are not indicative of future performance.`,
  },
  {
    id: 'liability',
    title: '9. Limitation of Liability',
    content: `**Disclaimer of Warranties**
OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

We do not warrant that:
• Our services will meet your specific requirements
• Our services will be uninterrupted, timely, or error-free
• Results obtained from our services will be accurate or reliable
• Any errors will be corrected

**Limitation of Liability**
TO THE MAXIMUM EXTENT PERMITTED BY LAW, XGROWTHOS SHALL NOT BE LIABLE FOR:
• Any indirect, incidental, special, consequential, or punitive damages
• Loss of profits, revenue, data, or business opportunities
• Damages arising from your use or inability to use our services
• Damages arising from any unauthorized access to your data

**Cap on Liability**
OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR OUR SERVICES SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU TO XGROWTHOS IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.

**Exceptions**
The limitations in this section do not apply to:
• Liability that cannot be excluded by law
• Your breach of Section 5 (User Responsibilities)
• Your indemnification obligations`,
  },
  {
    id: 'indemnification',
    title: '10. Indemnification',
    content: `**Your Indemnification Obligations**
You agree to indemnify, defend, and hold harmless XGrowthOS, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from:

• Your use of our services
• Your violation of these Terms
• Your violation of any applicable law or regulation
• Your Client Content
• Your infringement of any third-party rights
• Any claims by recipients of your outreach campaigns

**Indemnification Procedure**
We will promptly notify you of any claim subject to indemnification. You shall have the right to control the defense of any such claim, provided that we may participate in the defense at our own expense. You shall not settle any claim without our prior written consent.`,
  },
  {
    id: 'termination',
    title: '11. Termination',
    content: `**Pilot Period**
New clients begin with a 90-day pilot period. During the pilot period:
• Either party may terminate with 30 days' written notice
• You remain responsible for fees incurred through the termination date

**Ongoing Service**
After the pilot period, service continues on a month-to-month basis:
• Either party may terminate with 30 days' written notice
• Annual subscriptions require 60 days' notice for non-renewal

**Termination for Cause**
Either party may terminate immediately upon written notice if:
• The other party materially breaches these Terms and fails to cure within 30 days
• The other party becomes insolvent or files for bankruptcy
• The other party engages in illegal activities

**Effect of Termination**
Upon termination:
• Your access to our services will be suspended
• You must pay all outstanding fees
• We will provide a final report of campaign performance
• Your data will be retained for 30 days, then deleted
• Provisions that should survive termination will remain in effect`,
  },
  {
    id: 'disputes',
    title: '12. Dispute Resolution',
    content: `**Informal Resolution**
Before initiating any formal dispute resolution, you agree to contact us to attempt to resolve the dispute informally. Most disputes can be resolved quickly and to your satisfaction through direct communication.

**Binding Arbitration**
If we cannot resolve a dispute informally, any controversy or claim arising out of or relating to these Terms or our services shall be settled by binding arbitration administered by JAMS under its Comprehensive Arbitration Rules.

• Arbitration shall be conducted in Los Angeles County, California
• The arbitrator's decision shall be final and binding
• Judgment on the award may be entered in any court of competent jurisdiction

**Class Action Waiver**
YOU AND XGROWTHOS AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.

**Exceptions**
Notwithstanding the above:
• Either party may seek injunctive relief in any court of competent jurisdiction
• Either party may bring claims in small claims court if eligible`,
  },
  {
    id: 'governing-law',
    title: '13. Governing Law',
    content: `These Terms and any dispute arising from or relating to these Terms or our services shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.

Any legal action or proceeding not subject to arbitration shall be brought exclusively in the state or federal courts located in Los Angeles County, California. You consent to the personal jurisdiction of such courts.`,
  },
  {
    id: 'modifications',
    title: '14. Modifications to Terms',
    content: `We reserve the right to modify these Terms at any time. We will provide notice of material changes by:
• Posting the updated Terms on our website
• Sending an email to your registered email address
• Displaying a notice in your account dashboard

Changes will become effective:
• 30 days after notice for material changes
• Immediately for non-material changes or changes required by law

Your continued use of our services after the effective date constitutes acceptance of the modified Terms. If you do not agree to the modified Terms, you must stop using our services and terminate your account.

We encourage you to review these Terms periodically.`,
  },
  {
    id: 'contact',
    title: '15. Contact Information',
    content: `If you have any questions about these Terms or our services, please contact us:

**XGrowthOS, LLC**
Email: legal@xgrowthos.com
General Inquiries: support@xgrowthos.com
Location: Los Angeles, California, United States

**For Legal Notices**
Legal notices should be sent to:
legal@xgrowthos.com

Or by mail to:
XGrowthOS, LLC
Attn: Legal Department
Los Angeles, CA

We will respond to all inquiries within a reasonable timeframe.`,
  },
]

const tableOfContents = sections.map((section) => ({
  id: section.id,
  title: section.title,
}))

export default function TermsClient() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Terms of Service
            </h1>
            <div className="text-muted-foreground space-y-1">
              <p>Last updated: {lastUpdated}</p>
              <p>Effective date: {effectiveDate}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[250px_1fr] gap-12">
            {/* Table of Contents - Sticky Sidebar */}
            <motion.aside
              className="hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="sticky top-24">
                <h2 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                  Table of Contents
                </h2>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 border-l-2 border-transparent hover:border-primary pl-3"
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className={index > 0 ? 'mt-12 pt-8 border-t border-border' : ''}
                  >
                    <h2 className="font-heading text-xl font-bold mb-4">
                      {section.title}
                    </h2>
                    <div className="text-muted-foreground space-y-4 whitespace-pre-line">
                      {section.content.split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="leading-relaxed">
                          {paragraph.split('\n').map((line, lIndex) => (
                            <span key={lIndex}>
                              {line.startsWith('**') && line.endsWith('**') ? (
                                <strong className="text-foreground font-semibold block mt-4 mb-2">
                                  {line.replace(/\*\*/g, '')}
                                </strong>
                              ) : line.startsWith('•') ? (
                                <span className="block ml-4">{line}</span>
                              ) : line === line.toUpperCase() && line.length > 20 ? (
                                <span className="text-foreground font-medium">{line}</span>
                              ) : (
                                line
                              )}
                              {lIndex < paragraph.split('\n').length - 1 && !line.startsWith('•') && <br />}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
