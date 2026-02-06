'use client'

import { motion } from 'framer-motion'
import { Star, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react'
import Image from 'next/image'

interface TestimonialPerson {
  name: string
  role: string
  company: string
  image: string // Will be placeholder for now
  quote: string
  rating: number
  platform: 'linkedin' | 'twitter' | 'email'
  verified: boolean
}

// Placeholder testimonials with generic but realistic content
const testimonials: TestimonialPerson[] = [
  {
    name: "Sarah Chen",
    role: "VP of Sales", 
    company: "TechFlow Solutions",
    image: "/api/placeholder/64/64", // Placeholder API
    quote: "The autonomous lead generation concept is exactly what our industry needs. Excited to see how this transforms our pipeline.",
    rating: 5,
    platform: "linkedin",
    verified: true
  },
  {
    name: "Michael Rodriguez",
    role: "Founder",
    company: "GrowthLabs",
    image: "/api/placeholder/64/64",
    quote: "Finally, someone building AI that actually understands B2B sales workflows. The 11-engine approach makes complete sense.",
    rating: 5,
    platform: "twitter", 
    verified: true
  },
  {
    name: "Emma Thompson",
    role: "Director of Marketing",
    company: "ScaleUp Inc",
    image: "/api/placeholder/64/64",
    quote: "We've been waiting for a solution like this. The pilot program approach shows they're serious about delivering results.",
    rating: 5,
    platform: "email",
    verified: true
  }
]

export function TestimonialsWithPeople({ className }: { className?: string }) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <LinkedinLogo className="w-4 h-4 text-blue-600" weight="fill" />
      case 'twitter':
        return <TwitterLogo className="w-4 h-4 text-blue-400" weight="fill" />
      default:
        return <Star className="w-4 h-4 text-yellow-500" weight="fill" />
    }
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Early Interest
          </motion.span>
          
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            B2B Leaders Are Taking Notice
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Sales professionals and founders are expressing strong interest in our autonomous approach to lead generation.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400" weight="fill" />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.platform}
                </span>
                {getPlatformIcon(testimonial.platform)}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Person */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    {testimonial.name}
                    {testimonial.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Join other B2B leaders exploring autonomous lead generation
          </p>
          <a
            href="/book-demo"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Apply for Pilot Program
          </a>
        </motion.div>
      </div>
    </section>
  )
}