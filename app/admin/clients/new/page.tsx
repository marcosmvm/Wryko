'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import { useToastActions } from '@/components/ui/toast'
import { PLAN_OPTIONS } from '@/lib/constants/admin'
import { createClientRecord } from '@/lib/supabase/client-actions'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface FormErrors {
  companyName?: string
  contactName?: string
  contactEmail?: string
  phone?: string
  plan?: string
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePhone(phone: string): boolean {
  if (!phone) return true // Phone is optional
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

export default function AddClientPage() {
  const router = useRouter()
  const toast = useToastActions()
  const [isLoading, setIsLoading] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    contactEmail: '',
    phone: '',
    plan: 'founding_partner',
    notes: '',
  })

  // Warn user about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'companyName':
        if (!value.trim()) return 'Company name is required'
        if (value.length < 2) return 'Company name must be at least 2 characters'
        break
      case 'contactName':
        if (!value.trim()) return 'Contact name is required'
        if (value.length < 2) return 'Contact name must be at least 2 characters'
        break
      case 'contactEmail':
        if (!value.trim()) return 'Email is required'
        if (!validateEmail(value)) return 'Please enter a valid email address'
        break
      case 'phone':
        if (value && !validatePhone(value)) return 'Please enter a valid phone number'
        break
    }
    return undefined
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) {
        newErrors[key as keyof FormErrors] = error
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setIsDirty(true)

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    const error = validateField(name, value)
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({
      companyName: true,
      contactName: true,
      contactEmail: true,
      phone: true,
      plan: true,
    })

    if (!validateForm()) {
      toast.error('Please fix the errors', 'Some required fields are missing or invalid.')
      return
    }

    setIsLoading(true)

    try {
      const result = await createClientRecord({
        companyName: formData.companyName,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        phone: formData.phone || undefined,
        plan: formData.plan,
        notes: formData.notes || undefined,
      })

      if (!result.success) {
        toast.error('Failed to create client', result.error || 'Please try again.')
        return
      }

      toast.success('Client created', `${formData.companyName} has been added successfully.`)
      setIsDirty(false)
      router.push('/admin/clients')
    } catch {
      toast.error('Failed to create client', 'Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const inputClassName = (fieldName: keyof FormErrors) => {
    const hasError = touched[fieldName] && errors[fieldName]
    return `w-full px-4 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-primary/30 transition-all ${
      hasError
        ? 'border-red-500 focus:ring-red-500/20'
        : 'border-border focus:ring-primary/20'
    }`
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={defaultTransition}
      >
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Clients
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        {...fadeInUp}
        transition={defaultTransition}
      >
        <h1 className="text-2xl font-bold font-heading">Add New Client</h1>
        <p className="text-muted-foreground">
          Create a new client account and start onboarding
        </p>
        <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/40" />
      </motion.div>

      {/* Form */}
      <motion.div
        {...fadeInUp}
        transition={{ ...defaultTransition, delay: 0.1 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={getStaggerDelay(0, 0.2)}
          >
            <Card variant="elevated" className="border-l-4 border-l-primary/20 p-6 space-y-4">
              <legend className="font-semibold font-heading px-1">Company Information</legend>

              <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium">
                  Company Name <span className="text-destructive" aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={touched.companyName && !!errors.companyName}
                  aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                  placeholder="Acme Corp"
                  className={inputClassName('companyName')}
                />
                {touched.companyName && errors.companyName && (
                  <p id="companyName-error" className="flex items-center gap-1 text-xs text-red-500" role="alert">
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="contactName" className="text-sm font-medium">
                    Contact Name <span className="text-destructive" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={touched.contactName && !!errors.contactName}
                    aria-describedby={errors.contactName ? 'contactName-error' : undefined}
                    placeholder="John Smith"
                    className={inputClassName('contactName')}
                  />
                  {touched.contactName && errors.contactName && (
                    <p id="contactName-error" className="flex items-center gap-1 text-xs text-red-500" role="alert">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.contactName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="contactEmail" className="text-sm font-medium">
                    Contact Email <span className="text-destructive" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={touched.contactEmail && !!errors.contactEmail}
                    aria-describedby={errors.contactEmail ? 'contactEmail-error' : undefined}
                    placeholder="john@company.com"
                    className={inputClassName('contactEmail')}
                  />
                  {touched.contactEmail && errors.contactEmail && (
                    <p id="contactEmail-error" className="flex items-center gap-1 text-xs text-red-500" role="alert">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.contactEmail}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={touched.phone && !!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    placeholder="+1 (555) 123-4567"
                    className={inputClassName('phone')}
                  />
                  {touched.phone && errors.phone && (
                    <p id="phone-error" className="flex items-center gap-1 text-xs text-red-500" role="alert">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="plan" className="text-sm font-medium">
                    Plan <span className="text-destructive" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  >
                    {PLAN_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={getStaggerDelay(1, 0.2)}
          >
            <Card variant="elevated" className="border-l-4 border-l-primary/20 p-6 space-y-4">
              <legend className="font-semibold font-heading px-1">Additional Information</legend>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any additional information about this client..."
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none"
                />
              </div>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={getStaggerDelay(2, 0.2)}
            className="flex items-center justify-end gap-3"
          >
            <Button variant="secondary" asChild>
              <Link href="/admin/clients">
                Cancel
              </Link>
            </Button>
            <Button
              variant="elevated"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Creating...
                </>
              ) : (
                'Create Client'
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}
