'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users, TrendUp, Shield } from '@phosphor-icons/react'
import Image from 'next/image'

export function HumanCentricHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Now Accepting Pilot Applications
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Your Sales Team
              <br />
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Never Sleeps
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              11 AI engines work around the clock to find prospects, craft personalized campaigns, 
              and book qualified meetings—while your human team focuses on closing deals.
            </p>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4 text-green-600" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Built for B2B Teams</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <TrendUp className="w-4 h-4 text-purple-600" />
                <span>$25K+ Deal Focus</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/book-demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply for Pilot
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See How It Works
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Visual with people */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              {/* Mock dashboard with human elements */}
              <div className="space-y-6">
                {/* Header with team */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Your Team + 11 AI Engines
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Working together 24/7
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    {/* Placeholder team avatars */}
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-300">You</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-300">AI</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center border-2 border-white dark:border-gray-800">
                      <span className="text-sm font-medium text-green-600 dark:text-green-300">+9</span>
                    </div>
                  </div>
                </div>

                {/* Activity feed showing human + AI collaboration */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Engine A found 47 new prospects
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Matching your ICP criteria • 2 minutes ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Meeting booked: TechCorp Solutions
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Ready for your sales team • 5 minutes ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Campaign optimization complete
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        +23% open rate improvement • 10 minutes ago
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">247</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Prospects Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">8</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Meetings Booked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">24/7</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Always Working</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-medium text-gray-900 dark:text-white">AI Active</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}