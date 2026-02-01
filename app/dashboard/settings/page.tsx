'use client'

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Loader2,
  User,
  Bell,
  Calendar,
  Users,
  Puzzle,
  CreditCard,
  Plus,
  ExternalLink,
  Shield,
  Mail,
  Building,
  Phone,
  Globe,
  Trash2,
  CheckCircle2,
  Copy
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useToastActions } from '@/components/ui/toast'
import { settingsWorkflows } from '@/lib/n8n/client'

// Mock data for team members
const teamMembers = [
  { id: '1', name: 'John Smith', email: 'john@company.com', role: 'Admin', avatar: 'JS', status: 'active' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Member', avatar: 'SJ', status: 'active' },
  { id: '3', name: 'Mike Chen', email: 'mike@company.com', role: 'Member', avatar: 'MC', status: 'pending' },
]

// Mock data for integrations
const integrations = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Sync leads and opportunities',
    icon: '☁️',
    connected: true,
    lastSync: '2 hours ago'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM and marketing automation',
    icon: '🔶',
    connected: false,
    lastSync: null
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications in your workspace',
    icon: '💬',
    connected: true,
    lastSync: 'Real-time'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect with 5000+ apps',
    icon: '⚡',
    connected: false,
    lastSync: null
  },
]

// Mock data for billing
const billingHistory = [
  { id: '1', date: 'Jan 1, 2026', amount: '$2,000.00', status: 'paid', invoice: 'INV-2026-001' },
  { id: '2', date: 'Dec 1, 2025', amount: '$2,000.00', status: 'paid', invoice: 'INV-2025-012' },
  { id: '3', date: 'Nov 1, 2025', amount: '$2,000.00', status: 'paid', invoice: 'INV-2025-011' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileLoading, setProfileLoading] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteLoading, setInviteLoading] = useState(false)
  const [removingMember, setRemovingMember] = useState<string | null>(null)
  const [regeneratingKey, setRegeneratingKey] = useState(false)
  const [apiKey, setApiKey] = useState('xg_live_••••••••••••••••')
  const toast = useToastActions()
  const formRef = useRef<HTMLFormElement>(null)

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    weeklyReports: true,
    campaignAlerts: true,
    meetingBooked: true,
    dailyDigest: false,
    domainAlerts: true,
    optimizationTips: true,
  })

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileLoading(true)
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const result = await settingsWorkflows.updateProfile({
        name: formData.get('name') as string,
        company: formData.get('company') as string,
        phone: formData.get('phone') as string,
        website: formData.get('website') as string,
      })
      if (result.success) {
        toast.success('Profile updated', 'Your profile has been saved')
      } else {
        toast.error('Update failed', result.error || 'Could not save profile')
      }
    } catch {
      toast.error('Update failed', 'An unexpected error occurred')
    } finally {
      setProfileLoading(false)
    }
  }

  const handleNotificationChange = useCallback(async (key: keyof typeof notifications, checked: boolean) => {
    const newNotifications = { ...notifications, [key]: checked }
    setNotifications(newNotifications)
    try {
      const result = await settingsWorkflows.updateNotificationPrefs(newNotifications)
      if (result.success) {
        toast.success('Preferences saved', 'Notification settings updated')
      } else {
        toast.error('Save failed', result.error || 'Could not update preferences')
        setNotifications({ ...notifications })
      }
    } catch {
      toast.error('Save failed', 'An unexpected error occurred')
      setNotifications({ ...notifications })
    }
  }, [notifications, toast])

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail) return
    setInviteLoading(true)
    try {
      const result = await settingsWorkflows.inviteTeamMember(inviteEmail, 'Member')
      if (result.success) {
        toast.success('Invitation sent', `${inviteEmail} has been invited`)
        setInviteEmail('')
      } else {
        toast.error('Invite failed', result.error || 'Could not send invitation')
      }
    } catch {
      toast.error('Invite failed', 'An unexpected error occurred')
    } finally {
      setInviteLoading(false)
    }
  }

  const handleRemoveMember = useCallback(async (memberId: string, memberName: string) => {
    setRemovingMember(memberId)
    try {
      const result = await settingsWorkflows.removeTeamMember(memberId)
      if (result.success) {
        toast.success('Member removed', `${memberName} has been removed from the team`)
      } else {
        toast.error('Remove failed', result.error || 'Could not remove member')
      }
    } catch {
      toast.error('Remove failed', 'An unexpected error occurred')
    } finally {
      setRemovingMember(null)
    }
  }, [toast])

  const handleRegenerateApiKey = useCallback(async () => {
    setRegeneratingKey(true)
    try {
      const result = await settingsWorkflows.regenerateApiKey()
      if (result.success && result.data?.apiKey) {
        setApiKey(result.data.apiKey)
        toast.success('API key regenerated', 'Your new API key is ready')
      } else {
        toast.error('Regeneration failed', result.error || 'Could not regenerate API key')
      }
    } catch {
      toast.error('Regeneration failed', 'An unexpected error occurred')
    } finally {
      setRegeneratingKey(false)
    }
  }, [toast])

  const handleCopyApiKey = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(apiKey)
      toast.success('Copied', 'API key copied to clipboard')
    } catch {
      toast.error('Copy failed', 'Could not copy to clipboard')
    }
  }, [apiKey, toast])

  const handleConnectIntegration = useCallback((integrationName: string) => {
    toast.info('Coming soon', `${integrationName} integration will be available soon`)
  }, [toast])

  const handleManageSubscription = useCallback(() => {
    window.open('https://billing.stripe.com/p/login/test', '_blank')
    toast.info('Opening Stripe', 'Redirecting to billing portal')
  }, [toast])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account, team, and integrations</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="border border-border p-1.5">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-2">
            <Calendar className="w-4 h-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <Users className="w-4 h-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Puzzle className="w-4 h-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal and company details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSave} className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold text-foreground">
                      JS
                    </div>
                    <div>
                      <button type="button" className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors">
                        Change Avatar
                      </button>
                      <p className="text-xs text-muted-foreground mt-2">JPG, PNG. Max 2MB</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        defaultValue="John Smith"
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        defaultValue="john@company.com"
                        disabled
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        <Building className="w-4 h-4 inline mr-2" />
                        Company
                      </label>
                      <input
                        id="company"
                        type="text"
                        defaultValue="Acme Corporation"
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="website" className="block text-sm font-medium mb-2">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Website
                      </label>
                      <input
                        id="website"
                        type="url"
                        defaultValue="https://acme.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {profileLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      Save Changes
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
                <CardDescription>Manage your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                  <button className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors">
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Choose what updates you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">Weekly Performance Reports</p>
                      <p className="text-sm text-muted-foreground">AI-generated insights delivered every Monday</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">Meeting Booked Alerts</p>
                      <p className="text-sm text-muted-foreground">Instant notification when a prospect books a meeting</p>
                    </div>
                    <Switch
                      checked={notifications.meetingBooked}
                      onCheckedChange={(checked) => handleNotificationChange('meetingBooked', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">Campaign Alerts</p>
                      <p className="text-sm text-muted-foreground">Important updates about campaign performance</p>
                    </div>
                    <Switch
                      checked={notifications.campaignAlerts}
                      onCheckedChange={(checked) => handleNotificationChange('campaignAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">Domain Health Alerts</p>
                      <p className="text-sm text-muted-foreground">Warnings about deliverability issues</p>
                    </div>
                    <Switch
                      checked={notifications.domainAlerts}
                      onCheckedChange={(checked) => handleNotificationChange('domainAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">Optimization Recommendations</p>
                      <p className="text-sm text-muted-foreground">AI suggestions to improve campaign performance</p>
                    </div>
                    <Switch
                      checked={notifications.optimizationTips}
                      onCheckedChange={(checked) => handleNotificationChange('optimizationTips', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">Daily Digest</p>
                      <p className="text-sm text-muted-foreground">Summary of all activity from the previous day</p>
                    </div>
                    <Switch
                      checked={notifications.dailyDigest}
                      onCheckedChange={(checked) => handleNotificationChange('dailyDigest', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle>Calendar Integration</CardTitle>
                <CardDescription>Connect your calendar for seamless meeting scheduling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-xl">
                        📅
                      </div>
                      <div>
                        <p className="font-medium">Google Calendar</p>
                        <p className="text-xs text-muted-foreground">Sync with Google Workspace</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleConnectIntegration('Google Calendar')}
                      className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      Connect
                    </button>
                  </div>
                  <div className="p-4 border border-border rounded-lg transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center text-xl">
                        📆
                      </div>
                      <div>
                        <p className="font-medium">Microsoft Outlook</p>
                        <p className="text-xs text-muted-foreground">Sync with Microsoft 365</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleConnectIntegration('Microsoft Outlook')}
                      className="w-full px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                    >
                      Connect
                    </button>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-medium mb-4">Calendly Settings</h3>
                  <div className="p-4 border border-border border-l-[3px] border-l-emerald-500 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Calendly Connected</p>
                          <p className="text-sm text-muted-foreground">calendly.com/john-smith</p>
                        </div>
                      </div>
                      <button
                        onClick={() => window.open('https://calendly.com', '_blank')}
                        className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-medium mb-4">Meeting Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Default Meeting Duration</label>
                      <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option>15 minutes</option>
                        <option selected>30 minutes</option>
                        <option>45 minutes</option>
                        <option>60 minutes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Buffer Between Meetings</label>
                      <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option>No buffer</option>
                        <option selected>15 minutes</option>
                        <option>30 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="futuristic">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Manage who has access to your dashboard</CardDescription>
                  </div>
                  <Badge variant="secondary">{teamMembers.length} members</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Invite Form */}
                <form onSubmit={handleInvite} className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="submit"
                    disabled={inviteLoading}
                    className="px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {inviteLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    Invite
                  </button>
                </form>

                {/* Team Members List */}
                <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-foreground">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{member.name}</p>
                            {member.status === 'pending' && (
                              <Badge variant="warning">Pending</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                          <option selected={member.role === 'Admin'}>Admin</option>
                          <option selected={member.role === 'Member'}>Member</option>
                          <option>Viewer</option>
                        </select>
                        <button
                          onClick={() => handleRemoveMember(member.id, member.name)}
                          disabled={removingMember === member.id}
                          className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-destructive disabled:opacity-50"
                        >
                          {removingMember === member.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle>Connected Apps</CardTitle>
                <CardDescription>Integrate XGrowthOS with your existing tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {integrations.map((integration) => (
                    <div
                      key={integration.id}
                      className={cn(
                        "p-4 border border-border rounded-lg transition-colors",
                        integration.connected
                          ? ""
                          : "hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-xl">
                            {integration.icon}
                          </div>
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            <p className="text-xs text-muted-foreground">{integration.description}</p>
                          </div>
                        </div>
                      </div>
                      {integration.connected ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-emerald-600">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Connected</span>
                            {integration.lastSync && (
                              <span className="text-muted-foreground">· {integration.lastSync}</span>
                            )}
                          </div>
                          <button
                            onClick={() => handleConnectIntegration(integration.name)}
                            className="px-3 py-1.5 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                          >
                            Manage
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleConnectIntegration(integration.name)}
                          className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* API Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>Use our API to build custom integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border border-borderrounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium">API Key</p>
                    <button
                      onClick={handleRegenerateApiKey}
                      disabled={regeneratingKey}
                      className="text-sm text-primary hover:underline disabled:opacity-50 flex items-center gap-1"
                    >
                      {regeneratingKey && <Loader2 className="w-3 h-3 animate-spin" />}
                      Regenerate
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-mono">
                      {apiKey}
                    </code>
                    <button
                      onClick={handleCopyApiKey}
                      className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
                >
                  View API Documentation
                  <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your subscription details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-xl border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge className="mb-2">Active</Badge>
                      <h3 className="text-2xl font-bold">Founding Partner</h3>
                      <p className="text-muted-foreground">Full access to all features</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold font-heading">$2,000</p>
                      <p className="text-sm text-muted-foreground">per month</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Next billing date</p>
                      <p className="font-medium">February 1, 2026</p>
                    </div>
                    <button
                      onClick={handleManageSubscription}
                      className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                    >
                      Manage Subscription
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Your default payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold shadow-md">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/27</p>
                    </div>
                  </div>
                  <button
                    onClick={handleManageSubscription}
                    className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    Update
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Billing History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="futuristic">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Download past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
                  {billingHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{item.invoice}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">{item.amount}</p>
                          <Badge variant="success" className="text-xs">Paid</Badge>
                        </div>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
