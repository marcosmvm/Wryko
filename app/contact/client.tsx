'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Clock,
  MessageSquare,
  Shield,
  CheckCircle,
  Loader2,
  AlertCircle,
  ArrowRight,
  Send,
  Headphones,
} from 'lucide-react'

import { Navigation } from '@/components/marketing/navigation'
import { Footer } from '@/components/marketing/footer'
import { SubtleBackground } from '@/components/backgrounds'
import { workflows } from '@/lib/n8n/client'

const contactBenefits = [
  {
    icon: Clock,
    title: '24-Hour Response Time',
    description: 'Every inquiry receives a personal reply within one business day',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Real people, not chatbots. Get answers from our team directly',
  },
  {
    icon: MessageSquare,
    title: 'Any Question Welcome',
    description: 'Platform, pricing, partnerships, or technical — we cover it all',
  },
  {
    icon: Shield,
    title: 'No Sales Pressure',
    description: 'Genuine conversation to help you make the right decision',
  },
]

export default function ContactClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await workflows.submitContact({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        message: formData.message,
      })

      if (result.success) {
        setIsSuccess(true)
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        setError(result.error || 'Failed to send message. Please try again.')
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Contact Us
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Let&apos;s Start a{' '}
                <span className="gradient-text">Conversation</span>
              </h1>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary rounded-full" />
              </div>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Have questions about Wryko? Our team is here to help.
                Send us a message and we&apos;ll respond within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
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
                  <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-lg shadow-black/5 dark:shadow-black/20 glow-border">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold mb-2">Message Received!</h2>
                    <p className="text-muted-foreground mb-4">
                      Thank you for reaching out. We&apos;ll get back to you within
                      24 hours with a personal response.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Check your email for a confirmation from our team.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-lg shadow-black/5 dark:shadow-black/20 glow-border-hover relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary/60 to-primary" />
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="font-heading text-2xl font-bold">Send Us a Message</h2>
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
                          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                            Name <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-muted/50 border border-border/80 rounded-lg text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                            Email <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-muted/50 border border-border/80 rounded-lg text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                          Company <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-muted/50 border border-border/80 rounded-lg text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          placeholder="Your company"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Message <span className="text-destructive">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-muted/50 border border-border/80 rounded-lg text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/15 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      <p className="text-xs text-muted-foreground text-center mt-3">
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

              {/* Right Column: Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-8"
              >
                <div>
                  <span className="label-text mb-3 block">Get in Touch</span>
                  <h2 className="font-heading text-2xl font-bold mb-4">How We Can Help</h2>
                  <p className="text-muted-foreground">
                    Whether you have questions about our platform, pricing, or want to
                    explore how Wryko can drive your growth — our team is ready
                    to help.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactBenefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-sm transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                        <benefit.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Contact details + Trust Strip */}
                <div className="bg-card/50 border border-border/50 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">support@wryko.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Send className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">Los Angeles, California</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/50">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    No Contracts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    24hr Response
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    14-Day Setup
                  </span>
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
