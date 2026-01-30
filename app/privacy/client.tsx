'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'

const lastUpdated = 'January 25, 2025'

const sections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: `XGrowthOS, LLC ("XGrowthOS," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website xgrowthos.com, use our platform, or engage with our services.

Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access our services.`,
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    content: `We collect information in several ways:

**Personal Information You Provide**
When you register for an account, request a demo, or contact us, we may collect:
• Full name
• Email address
• Company name
• Phone number
• Job title
• Company size and revenue (optional)

**Information Collected Automatically**
When you access our services, we automatically collect:
• IP address
• Browser type and version
• Device information
• Operating system
• Pages visited and time spent
• Referring website
• Click patterns and interactions

**Cookies and Tracking Technologies**
We use cookies, web beacons, and similar technologies to:
• Remember your preferences
• Understand how you use our services
• Improve your experience
• Provide personalized content
• Analyze service performance

You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our services.`,
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Your Information',
    content: `We use the information we collect for various purposes:

**Service Delivery**
• Provide, operate, and maintain our services
• Process transactions and send related information
• Respond to your comments, questions, and requests
• Provide customer service and support

**Communication**
• Send you technical notices, updates, and security alerts
• Provide news about products, services, and events
• Respond to your inquiries and fulfill your requests

**Business Operations**
• Monitor and analyze usage patterns and trends
• Detect, prevent, and address technical issues
• Protect against fraudulent, unauthorized, or illegal activity
• Comply with legal obligations

**Marketing**
• Send promotional communications (with your consent)
• Personalize your experience
• Develop new products and services`,
  },
  {
    id: 'information-sharing',
    title: '4. Information Sharing and Disclosure',
    content: `We do not sell your personal information. We may share your information in the following circumstances:

**Service Providers**
We share information with third-party vendors who perform services on our behalf, including:
• Cloud hosting and infrastructure (e.g., Vercel, Supabase)
• Email service providers
• Analytics providers
• Payment processors (e.g., Stripe)

**Business Transfers**
In connection with any merger, acquisition, or sale of assets, your information may be transferred as a business asset.

**Legal Requirements**
We may disclose your information if required to do so by law or in response to valid requests by public authorities.

**Protection of Rights**
We may disclose information to protect and defend our rights and property, or to protect the safety of our users or others.

**With Your Consent**
We may share your information for other purposes with your explicit consent.`,
  },
  {
    id: 'data-security',
    title: '5. Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information, including:

• Encryption of data in transit (TLS/SSL)
• Encryption of data at rest
• Regular security assessments and audits
• Access controls and authentication requirements
• Employee training on data protection

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.

In the event of a data breach that affects your personal information, we will notify you in accordance with applicable law.`,
  },
  {
    id: 'data-retention',
    title: '6. Data Retention',
    content: `We retain your personal information for as long as necessary to:

• Provide our services to you
• Comply with legal obligations
• Resolve disputes
• Enforce our agreements

When we no longer need to process your personal information, we will either delete or anonymize it. If deletion is not possible (for example, because your information has been stored in backup archives), we will securely store and isolate your information until deletion is possible.

Typical retention periods:
• Account information: Duration of account plus 3 years
• Transaction records: 7 years (for legal compliance)
• Analytics data: 26 months
• Marketing preferences: Until you unsubscribe`,
  },
  {
    id: 'your-rights',
    title: '7. Your Rights',
    content: `Depending on your location, you may have certain rights regarding your personal information:

**Access and Portability**
You have the right to request a copy of the personal information we hold about you in a structured, commonly used format.

**Correction**
You have the right to request correction of inaccurate personal information.

**Deletion**
You have the right to request deletion of your personal information, subject to certain exceptions.

**Restriction**
You have the right to request restriction of processing of your personal information.

**Objection**
You have the right to object to processing of your personal information for direct marketing purposes.

**Withdraw Consent**
Where we rely on consent, you have the right to withdraw that consent at any time.

**CCPA Rights (California Residents)**
If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and how we use it, and the right to opt-out of the sale of personal information.

**GDPR Rights (EU/EEA Residents)**
If you are located in the European Union or European Economic Area, you have rights under the General Data Protection Regulation (GDPR), including all rights listed above.

To exercise any of these rights, please contact us at privacy@xgrowthos.com.`,
  },
  {
    id: 'international-transfers',
    title: '8. International Data Transfers',
    content: `Your information may be transferred to and processed in countries other than your country of residence, including the United States. These countries may have data protection laws that are different from the laws of your country.

When we transfer personal information from the EU/EEA to the United States or other countries, we use appropriate safeguards, such as:
• Standard contractual clauses approved by the European Commission
• Data processing agreements with our service providers
• Compliance with applicable privacy frameworks

By using our services, you consent to the transfer of your information to the United States and other countries as described in this Privacy Policy.`,
  },
  {
    id: 'childrens-privacy',
    title: '9. Children\'s Privacy',
    content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete that information.

If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at privacy@xgrowthos.com.`,
  },
  {
    id: 'third-party',
    title: '10. Third-Party Services',
    content: `Our services may contain links to third-party websites and services that are not owned or controlled by XGrowthOS. We are not responsible for the privacy practices of these third parties.

We encourage you to review the privacy policies of any third-party websites or services that you visit. This Privacy Policy applies only to our services.

Third-party services we use include:
• Supabase (database and authentication)
• Stripe (payment processing)
• Vercel (hosting)
• Google Analytics (analytics)
• n8n (workflow automation)

Each of these services has its own privacy policy governing the use of your information.`,
  },
  {
    id: 'changes',
    title: '11. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.

For material changes, we will provide additional notice, such as:
• Email notification to registered users
• Prominent notice on our website
• In-app notification

Your continued use of our services after the effective date of the revised Privacy Policy constitutes your acceptance of the changes.

We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.`,
  },
  {
    id: 'contact',
    title: '12. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:

**XGrowthOS, LLC**
Email: privacy@xgrowthos.com
General Inquiries: support@xgrowthos.com
Location: Los Angeles, California, United States

**Data Protection Officer**
For GDPR-related inquiries: dpo@xgrowthos.com

We will respond to all legitimate requests within 30 days. If we need more time, we will notify you of the reason and extension period.`,
  },
]

const tableOfContents = sections.map((section) => ({
  id: section.id,
  title: section.title,
}))

export default function PrivacyClient() {
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
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
