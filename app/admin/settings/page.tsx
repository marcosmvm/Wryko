'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Shield, User, Loader2, Key, Smartphone, Clock } from 'lucide-react'
import { SwitchField } from '@/components/ui/switch'
import { useToastActions } from '@/components/ui/toast'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconWrapper } from '@/components/ui/icon-wrapper'

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const toast = useToastActions()

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@xgrowthos.com',
  })

  const [notifications, setNotifications] = useState({
    newClients: true,
    engineErrors: true,
    dailyDigest: true,
    weeklyReport: true,
    criticalAlerts: true,
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Settings saved', 'Your preferences have been updated.')
    } catch {
      toast.error('Failed to save', 'Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = () => {
    toast.info('Coming soon', 'Password change functionality is not yet available.')
  }

  const handleEnable2FA = () => {
    toast.info('Coming soon', 'Two-factor authentication is not yet available.')
  }

  const handleViewLoginHistory = () => {
    toast.info('Coming soon', 'Login history is not yet available.')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <motion.div
        {...fadeInUp}
        transition={defaultTransition}
      >
        <h1 className="text-2xl font-bold font-heading">Admin Settings</h1>
        <p className="text-muted-foreground">
          Configure your admin portal preferences
        </p>
        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/40" />
      </motion.div>

      {/* Profile Section */}
      <motion.div
        {...fadeInUp}
        transition={getStaggerDelay(0)}
      >
        <section aria-labelledby="profile-heading">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center gap-3">
                <IconWrapper icon={User} variant="primary" aria-hidden="true" />
                <div>
                  <CardTitle>
                    <span id="profile-heading">Admin Profile</span>
                  </CardTitle>
                  <CardDescription>Your admin account details</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="admin-name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="admin-name"
                      value={profile.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="admin-email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="admin-email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </motion.div>

      {/* Notifications Section */}
      <motion.div
        {...fadeInUp}
        transition={getStaggerDelay(1)}
      >
        <section aria-labelledby="notifications-heading">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center gap-3">
                <IconWrapper icon={Bell} variant="blue" aria-hidden="true" />
                <div>
                  <CardTitle>
                    <span id="notifications-heading">Notifications</span>
                  </CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-1 divide-y divide-border">
                <SwitchField
                  label="New Client Alerts"
                  description="Get notified when a new client signs up"
                  checked={notifications.newClients}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, newClients: checked }))
                  }
                />

                <SwitchField
                  label="Engine Error Alerts"
                  description="Get notified when an engine fails"
                  checked={notifications.engineErrors}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, engineErrors: checked }))
                  }
                />

                <SwitchField
                  label="Critical Alerts"
                  description="Get notified for critical system alerts"
                  checked={notifications.criticalAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, criticalAlerts: checked }))
                  }
                />

                <SwitchField
                  label="Daily Digest"
                  description="Receive a daily summary of platform activity"
                  checked={notifications.dailyDigest}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, dailyDigest: checked }))
                  }
                />

                <SwitchField
                  label="Weekly Report"
                  description="Receive a weekly performance report"
                  checked={notifications.weeklyReport}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({ ...prev, weeklyReport: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </section>
      </motion.div>

      {/* Security Section */}
      <motion.div
        {...fadeInUp}
        transition={getStaggerDelay(2)}
      >
        <section aria-labelledby="security-heading">
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center gap-3">
                <IconWrapper icon={Shield} variant="violet" aria-hidden="true" />
                <div>
                  <CardTitle>
                    <span id="security-heading">Security</span>
                  </CardTitle>
                  <CardDescription>Manage your security settings</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Button
                    variant="outline-primary"
                    className="w-full justify-start h-auto py-3"
                    onClick={handleChangePassword}
                  >
                    <Key className="w-4 h-4 mr-3 shrink-0" aria-hidden="true" />
                    <div className="text-left">
                      <p className="font-medium">Change Password</p>
                      <p className="text-xs text-muted-foreground font-normal">Update your account password</p>
                      <p className="text-xs text-muted-foreground/70 font-normal mt-0.5">Last changed: 30 days ago</p>
                    </div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Button
                    variant="outline-primary"
                    className="w-full justify-start h-auto py-3"
                    onClick={handleEnable2FA}
                  >
                    <Smartphone className="w-4 h-4 mr-3 shrink-0" aria-hidden="true" />
                    <div className="text-left">
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground font-normal">Add an extra layer of security</p>
                      <span className="inline-block mt-1 text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-warning/10 text-warning">
                        Status: Not enabled
                      </span>
                    </div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Button
                    variant="outline-primary"
                    className="w-full justify-start h-auto py-3"
                    onClick={handleViewLoginHistory}
                  >
                    <Clock className="w-4 h-4 mr-3 shrink-0" aria-hidden="true" />
                    <div className="text-left">
                      <p className="font-medium">Login History</p>
                      <p className="text-xs text-muted-foreground font-normal">View recent sign-in activity</p>
                      <p className="text-xs text-muted-foreground/70 font-normal mt-0.5">Last login: Jan 30, 2026 at 9:15 AM</p>
                    </div>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </section>
      </motion.div>

      {/* Save Button */}
      <motion.div
        {...fadeInUp}
        transition={getStaggerDelay(3)}
        className="flex items-center justify-end"
      >
        <Button
          variant="elevated"
          size="lg"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </Button>
      </motion.div>
    </div>
  )
}
