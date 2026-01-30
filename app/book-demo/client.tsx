'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  TrendingUp,
  Shield,
  User,
  CheckCircle,
  Loader2,
  AlertCircle,
  CalendarDays
} from 'lucide-react'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { SubtleBackground } from '@/components/backgrounds'
import { workflows } from '@/lib/n8n/client'

const benefits = [
  {
    icon: Clock,
    title: '30-Minute Discovery Call',
    description: 'Quick, focused conversation to understand your needs',
  },
  {
    icon: TrendingUp,
    title: 'Custom ROI Projection',
    description: 'See potential results based on your specific situation',
  },
  {
    icon: Shield,
    title: 'No Obligation',
    description: 'Just an informative conversation, no pressure',
  },
  {
    icon: User,
    title: 'Talk to the Founder',
    description: 'Speak directly with Marcos, not a sales rep',
  },
]

const employeeOptions = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1,000 employees' },
  { value: '1000+', label: '1,000+ employees' },
]

const revenueOptions = [
  { value: '<1M', label: 'Less than $1M' },
  { value: '1-5M', label: '$1M - $5M' },
  { value: '5-20M', label: '$5M - $20M' },
  { value: '20-100M', label: '$20M - $100M' },
  { value: '100M+', label: '$100M+' },
]

export default function BookDemoClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    revenue: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await workflows.requestDemo({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone || undefined,
        employees: formData.employees || undefined,
        revenue: formData.revenue || undefined,
      })

      if (result.success) {
        setIsSuccess(true)
        setFormData({ name: '', email: '', company: '', phone: '', employees: '', revenue: '' })
      } else {
        setError(result.error || 'Failed to submit request. Please try again.')
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <SubtleBackground showOrb>
      <main className="min-h-screen">
        <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Book a Demo
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              See XGrowthOS{' '}
              <span className="gradient-text">In Action</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule a 30-minute discovery call to see how 11 AI engines can
              handle your outbound lead generation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isSuccess ? (
                <div className="bg-card border border-border rounded-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold mb-2">Request Received!</h2>
                  <p className="text-muted-foreground mb-4">
                    Thank you for your interest in XGrowthOS. We&apos;ll reach out within
                    24 hours to schedule your discovery call.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check your email for confirmation and next steps.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CalendarDays className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold">Request Your Demo</h2>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Work Email <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                          Company <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          placeholder="Company name"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="employees" className="block text-sm font-medium mb-2">
                          Company Size <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <select
                          id="employees"
                          name="employees"
                          value={formData.employees}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        >
                          <option value="">Select size</option>
                          {employeeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="revenue" className="block text-sm font-medium mb-2">
                          Annual Revenue <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <select
                          id="revenue"
                          name="revenue"
                          value={formData.revenue}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                        >
                          <option value="">Select range</option>
                          {revenueOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Request Demo'
                      )}
                    </button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By submitting this form, you agree to our{' '}
                      <a href="/privacy" className="underline hover:text-foreground">
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href="/terms" className="underline hover:text-foreground">
                        Terms of Service
                      </a>
                      .
                    </p>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-2xl font-bold mb-4">What to Expect</h2>
                <p className="text-muted-foreground">
                  During your discovery call, we&apos;ll explore your current lead generation
                  challenges and show you exactly how XGrowthOS can help you achieve your
                  growth goals.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Signal */}
              <div className="bg-muted/50 border border-border rounded-xl p-6">
                <p className="text-muted-foreground text-sm italic mb-4">
                  &ldquo;XGrowthOS transformed our outbound strategy. We went from struggling
                  to book 5 meetings a month to consistently landing 20+ qualified
                  conversations.&rdquo;
                </p>
                <p className="font-medium text-sm">
                  — Director of Sales, SaaS Company
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

        <Footer />
      </main>
    </SubtleBackground>
  )
}
