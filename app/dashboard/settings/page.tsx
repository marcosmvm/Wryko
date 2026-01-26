'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function SettingsPage() {
  const [profileLoading, setProfileLoading] = useState(false)
  const [notificationLoading, setNotificationLoading] = useState(false)

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setProfileLoading(false)
  }

  const handleNotificationSave = async () => {
    setNotificationLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setNotificationLoading(false)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h2 className="font-semibold mb-4">Profile</h2>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue="John Smith"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue="john@company.com"
              disabled
              className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-muted-foreground cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Company
            </label>
            <input
              id="company"
              type="text"
              defaultValue="Acme Corporation"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={profileLoading}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {profileLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </form>
      </motion.div>

      {/* Notifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h2 className="font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-border text-primary focus:ring-primary"
            />
            <div>
              <p className="font-medium text-sm">Weekly report emails</p>
              <p className="text-xs text-muted-foreground">Receive weekly performance reports</p>
            </div>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-border text-primary focus:ring-primary"
            />
            <div>
              <p className="font-medium text-sm">Campaign alerts</p>
              <p className="text-xs text-muted-foreground">Get notified about important campaign updates</p>
            </div>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="rounded border-border text-primary focus:ring-primary"
            />
            <div>
              <p className="font-medium text-sm">Daily digest</p>
              <p className="text-xs text-muted-foreground">Daily summary of all activity</p>
            </div>
          </label>
        </div>
        <button
          onClick={handleNotificationSave}
          disabled={notificationLoading}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {notificationLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Preferences
        </button>
      </motion.div>

      {/* Security Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h2 className="font-semibold mb-4">Security</h2>
        <button className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors">
          Change Password
        </button>
      </motion.div>

      {/* Subscription Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h2 className="font-semibold mb-4">Subscription</h2>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Current Plan</p>
          <p className="font-medium">Founding Partner ($2,000/mo)</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Next Billing Date</p>
          <p className="font-medium">February 1, 2026</p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
        >
          Manage Billing →
        </a>
      </motion.div>
    </div>
  )
}
