'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Clock, Users, Target } from '@phosphor-icons/react'
import Link from 'next/link'

export function DemoVideoContent() {
  // Redirect directly to demo booking
  const handleVideoClick = () => {
    window.open('/book-demo', '_blank')
  }

  return (
    <>
      {/* Main Video Thumbnail */}
      <motion.div
        className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10"
        onClick={handleVideoClick}
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
                Click to book a live demo and see all 11 AI engines in action for your business
              </p>
            </motion.div>
          </div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center group-hover:bg-black/30 transition-colors">
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-full p-8 shadow-2xl group-hover:bg-white transition-all mb-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-12 h-12 text-primary ml-1" weight="fill" />
            </motion.div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-semibold text-gray-800">
              Book Live Demo
            </div>
          </div>

          {/* Live Demo badge */}
          <div className="absolute top-6 right-6 bg-green-600 text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-1 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            Book Live Demo
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-xl group-hover:opacity-30 transition-opacity -z-10" />
      </motion.div>
    </>
  )
}