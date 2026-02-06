'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Clock, Users, Target, Zap, BarChart } from '@phosphor-icons/react'
import Link from 'next/link'

export function DemoVideoContent() {
  const [showModal, setShowModal] = useState(false)

  const features = [
    {
      icon: Target,
      title: 'AI Prospecting',
      description: 'Engine A finds your perfect leads automatically'
    },
    {
      icon: Zap,
      title: 'Smart Campaigns',
      description: 'Engine B personalizes outreach at scale'
    },
    {
      icon: BarChart,
      title: 'Live Analytics',
      description: 'Engine F tracks performance in real-time'
    },
    {
      icon: Users,
      title: 'Meeting Booking',
      description: 'Engine N converts replies to calendar bookings'
    }
  ]

  return (
    <>
      {/* Main Video Thumbnail */}
      <motion.div
        className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10"
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Video Thumbnail Content */}
        <div className="aspect-video relative">
          {/* Background with Wryko branding */}
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col items-center justify-center text-white p-8">
            {/* Logo area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-6"
            >
              <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                Wryko
              </div>
              <h3 className="text-2xl font-semibold text-blue-100">
                11 AI Engines in Action
              </h3>
              <p className="text-lg text-blue-200 max-w-md mx-auto leading-relaxed">
                Watch how autonomous lead generation transforms your sales pipeline from prospect to booking
              </p>
            </motion.div>

            {/* Feature highlights */}
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-2xl w-full">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <feature.icon className="w-5 h-5 text-blue-300" />
                  <div>
                    <div className="font-medium text-blue-100">{feature.title}</div>
                    <div className="text-blue-300 text-xs">{feature.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-full p-8 shadow-2xl group-hover:bg-white transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-12 h-12 text-primary ml-1" weight="fill" />
            </motion.div>
          </div>

          {/* Duration badge */}
          <div className="absolute top-6 right-6 bg-black/70 text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Coming Soon
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-xl group-hover:opacity-30 transition-opacity -z-10" />
      </motion.div>

      {/* Modal for demo video */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            {/* Demo coming soon content */}
            <div className="p-12 text-center space-y-8">
              <div className="text-7xl">🎬</div>
              
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Professional Demo Video Coming Soon
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  We're creating an in-depth walkthrough showcasing all 11 AI engines working together to transform your lead generation pipeline.
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 max-w-lg mx-auto">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  What you'll see in the demo:
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 text-left">
                  <li>• Live prospecting with Engine A & B</li>
                  <li>• Personalized campaigns in real-time</li>
                  <li>• Compliance & domain health monitoring</li>
                  <li>• Analytics dashboard with live metrics</li>
                  <li>• Automated meeting booking flow</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book-demo"
                  className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Book Live Demo Instead
                </Link>
                <button
                  className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Notify Me When Ready
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}