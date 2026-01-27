'use client'

import { useState } from 'react'
import { Bell, Shield, User, Loader2, Key, Smartphone, Clock } from 'lucide-react'
import { SwitchField } from '@/components/ui/switch'
import { useToastActions } from '@/components/ui/toast'

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
      <div>
        <h1 className="text-2xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">
          Configure your admin portal preferences
        </p>
      </div>

      {/* Profile Section */}
      <section className="bg-card border border-border rounded-xl p-6" aria-labelledby="profile-heading">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 id="profile-heading" className="font-semibold">Admin Profile</h2>
            <p className="text-sm text-muted-foreground">Your admin account details</p>
          </div>
        </div>

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
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="bg-card border border-border rounded-xl p-6" aria-labelledby="notifications-heading">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 id="notifications-heading" className="font-semibold">Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Manage your notification preferences
            </p>
          </div>
        </div>

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
      </section>

      {/* Security Section */}
      <section className="bg-card border border-border rounded-xl p-6" aria-labelledby="security-heading">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 id="security-heading" className="font-semibold">Security</h2>
            <p className="text-sm text-muted-foreground">
              Manage your security settings
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleChangePassword}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left bg-muted rounded-lg hover:bg-muted/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Key className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="font-medium">Change Password</p>
              <p className="text-xs text-muted-foreground">Update your account password</p>
            </div>
          </button>
          <button
            onClick={handleEnable2FA}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left bg-muted rounded-lg hover:bg-muted/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Smartphone className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
            </div>
          </button>
          <button
            onClick={handleViewLoginHistory}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left bg-muted rounded-lg hover:bg-muted/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Clock className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="font-medium">Login History</p>
              <p className="text-xs text-muted-foreground">View recent sign-in activity</p>
            </div>
          </button>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex items-center justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>
    </div>
  )
}
