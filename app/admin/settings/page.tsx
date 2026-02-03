'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Shield, User, Loader2, Key, Smartphone, Clock, AlertTriangle, Lock, Info } from 'lucide-react'
import { SwitchField } from '@/components/ui/switch'
import { useToastActions } from '@/components/ui/toast'
import { fadeInUp, defaultTransition, getStaggerDelay } from '@/lib/animations'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconWrapper } from '@/components/ui/icon-wrapper'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { getCurrentUser, changePassword, updateUserProfile } from '@/lib/supabase/actions'

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const toast = useToastActions()

  const [profile, setProfile] = useState({
    name: '',
    email: '',
  })

  const [notifications, setNotifications] = useState({
    newClients: true,
    engineErrors: true,
    dailyDigest: true,
    weeklyReport: true,
    criticalAlerts: true,
  })

  // Load real user profile on mount
  useEffect(() => {
    async function loadUser() {
      try {
        const result = await getCurrentUser()
        if (result.success && result.user) {
          setProfile({
            name: result.user.full_name || '',
            email: result.user.email || '',
          })
          // Load notification prefs if stored
          if (result.user.notification_prefs && typeof result.user.notification_prefs === 'object') {
            const prefs = result.user.notification_prefs as Record<string, boolean>
            setNotifications(prev => ({
              newClients: prefs.newClients ?? prev.newClients,
              engineErrors: prefs.engineErrors ?? prev.engineErrors,
              dailyDigest: prefs.dailyDigest ?? prev.dailyDigest,
              weeklyReport: prefs.weeklyReport ?? prev.weeklyReport,
              criticalAlerts: prefs.criticalAlerts ?? prev.criticalAlerts,
            }))
          }
        }
      } catch {
        // Silent failure - defaults will be used
      } finally {
        setProfileLoading(false)
      }
    }
    loadUser()
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const result = await updateUserProfile({
        full_name: profile.name,
        notification_prefs: notifications,
      })
      if (result.success) {
        toast.success('Settings saved', 'Your preferences have been updated.')
      } else {
        toast.error('Failed to save', result.error || 'Please try again.')
      }
    } catch {
      toast.error('Failed to save', 'Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    setPasswordError('')
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }
    if (newPassword !== confirmPasswordValue) {
      setPasswordError('Passwords do not match')
      return
    }
    setPasswordLoading(true)
    try {
      const result = await changePassword(newPassword, confirmPasswordValue)
      if (result.success) {
        toast.success('Password updated', 'Your password has been changed')
        setShowPasswordDialog(false)
        setNewPassword('')
        setConfirmPasswordValue('')
      } else {
        setPasswordError(result.error || 'Could not update password')
      }
    } catch {
      setPasswordError('An unexpected error occurred')
    } finally {
      setPasswordLoading(false)
    }
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
              {profileLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
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
                        disabled
                        className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-sm text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              )}
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
                    onClick={() => setShowPasswordDialog(true)}
                  >
                    <Key className="w-4 h-4 mr-3 shrink-0" aria-hidden="true" />
                    <div className="text-left">
                      <p className="font-medium">Change Password</p>
                      <p className="text-xs text-muted-foreground font-normal">Update your account password</p>
                    </div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <div className="w-full flex items-center justify-between px-4 py-3 border border-border rounded-lg bg-muted/30">
                    <div className="flex items-center">
                      <Smartphone className="w-4 h-4 mr-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <div className="text-left">
                        <p className="font-medium text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">Requires additional server configuration</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <Lock className="w-3 h-3" />
                      Not Available
                    </Badge>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <div className="w-full flex items-center justify-between px-4 py-3 border border-border rounded-lg bg-muted/30">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <div className="text-left">
                        <p className="font-medium text-sm">Login History</p>
                        <p className="text-xs text-muted-foreground">Sign-in activity tracking</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <Info className="w-3 h-3" />
                      Not Available
                    </Badge>
                  </div>
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

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your new password below. Must be at least 8 characters.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="admin-new-password" className="text-sm font-medium">
                New Password
              </label>
              <input
                id="admin-new-password"
                type="password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setPasswordError('') }}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="admin-confirm-password" className="text-sm font-medium">
                Confirm Password
              </label>
              <input
                id="admin-confirm-password"
                type="password"
                value={confirmPasswordValue}
                onChange={(e) => { setConfirmPasswordValue(e.target.value); setPasswordError('') }}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Confirm new password"
              />
            </div>
            {passwordError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {passwordError}
              </p>
            )}
          </div>
        </DialogContent>
        <DialogFooter>
          <button
            onClick={() => { setShowPasswordDialog(false); setNewPassword(''); setConfirmPasswordValue(''); setPasswordError('') }}
            disabled={passwordLoading}
            className="px-4 py-2 text-sm font-medium bg-muted rounded-lg hover:bg-muted/80 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePasswordChange}
            disabled={passwordLoading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {passwordLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Update Password
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
