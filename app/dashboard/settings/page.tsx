'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  Copy,
  AlertTriangle,
  Info,
  Lock,
  Upload
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useToastActions } from '@/components/ui/toast'
import { settingsWorkflows } from '@/lib/n8n/client'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { changePassword, getCurrentUser } from '@/lib/supabase/actions'

// Mock data for team members
const teamMembers = [
  { id: '1', name: 'John Smith', email: 'john@company.com', role: 'Admin', avatar: 'JS', status: 'active' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Member', avatar: 'SJ', status: 'active' },
  { id: '3', name: 'Mike Chen', email: 'mike@company.com', role: 'Member', avatar: 'MC', status: 'pending' },
]

// Integrations - all marked as not configured (requires OAuth setup)
const integrations = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Sync leads and opportunities',
    icon: '☁️',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM and marketing automation',
    icon: '🔶',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications in your workspace',
    icon: '💬',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect with 5000+ apps',
    icon: '⚡',
  },
]

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [profileLoading, setProfileLoading] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteLoading, setInviteLoading] = useState(false)
  const [removingMember, setRemovingMember] = useState<string | null>(null)
  const [updatingRole, setUpdatingRole] = useState<string | null>(null)
  const [regeneratingKey, setRegeneratingKey] = useState(false)
  const [apiKey, setApiKey] = useState('xg_live_••••••••••••••••')
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [userInitials, setUserInitials] = useState('--')
  const [meetingDuration, setMeetingDuration] = useState('30')
  const [meetingBuffer, setMeetingBuffer] = useState('15')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToastActions()
  const formRef = useRef<HTMLFormElement>(null)

  // Load user profile on mount
  useEffect(() => {
    async function loadUser() {
      try {
        const result = await getCurrentUser()
        if (result.success && result.user) {
          const name = result.user.full_name || ''
          const initials = name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || '--'
          setUserInitials(initials)

          // Pre-fill form if we have a ref
          if (formRef.current) {
            const nameInput = formRef.current.querySelector<HTMLInputElement>('[name="name"]')
            const companyInput = formRef.current.querySelector<HTMLInputElement>('[name="company"]')
            const phoneInput = formRef.current.querySelector<HTMLInputElement>('[name="phone"]')
            const websiteInput = formRef.current.querySelector<HTMLInputElement>('[name="website"]')
            if (nameInput) nameInput.value = result.user.full_name || ''
            if (companyInput) companyInput.value = result.user.company || ''
            if (phoneInput) phoneInput.value = result.user.phone || ''
            if (websiteInput) websiteInput.value = result.user.website || ''
          }

          // Load notification prefs
          if (result.user.notification_prefs && typeof result.user.notification_prefs === 'object') {
            setNotifications(prev => ({ ...prev, ...result.user!.notification_prefs as Record<string, boolean> }))
          }
        }
      } catch {
        // Profile load failed silently - form will use defaults
      }
    }
    loadUser()
  }, [])

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

  const handleRoleChange = useCallback(async (memberId: string, newRole: string) => {
    setUpdatingRole(memberId)
    try {
      const result = await settingsWorkflows.updateMemberRole(memberId, newRole)
      if (result.success) {
        toast.success('Role updated', `Member role changed to ${newRole}`)
      } else {
        toast.error('Update failed', result.error || 'Could not update role')
      }
    } catch {
      toast.error('Update failed', 'An unexpected error occurred')
    } finally {
      setUpdatingRole(null)
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

  const handlePasswordChange = useCallback(async () => {
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
  }, [newPassword, confirmPasswordValue, toast])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file', 'Please select a JPG or PNG image')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File too large', 'Maximum file size is 2MB')
      return
    }

    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result as string
      setAvatarPreview(base64)
      try {
        const result = await settingsWorkflows.updateProfile({ avatar: base64 })
        if (result.success) {
          toast.success('Avatar updated', 'Your profile picture has been saved')
        } else {
          toast.error('Upload failed', result.error || 'Could not save avatar')
          setAvatarPreview(null)
        }
      } catch {
        toast.error('Upload failed', 'An unexpected error occurred')
        setAvatarPreview(null)
      }
    }
    reader.readAsDataURL(file)
  }, [toast])

  const stripePortalUrl = typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL
    : undefined

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
                <form ref={formRef} onSubmit={handleProfileSave} className="space-y-6">
                  <div className="flex items-center gap-6">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold text-foreground">
                        {userInitials}
                      </div>
                    )}
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                      <button
                        type="button"
                        onClick={handleAvatarClick}
                        className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors inline-flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
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
                        name="name"
                        type="text"
                        defaultValue=""
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
                        defaultValue=""
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
                        name="company"
                        type="text"
                        defaultValue=""
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
                        name="phone"
                        type="tel"
                        defaultValue=""
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
                        name="website"
                        type="url"
                        defaultValue=""
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
                    <p className="text-sm text-muted-foreground">Change your account password</p>
                  </div>
                  <button
                    onClick={() => setShowPasswordDialog(true)}
                    className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    Change Password
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Requires admin configuration</p>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Lock className="w-3 h-3" />
                    Contact Admin
                  </Badge>
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
                  <div className="p-4 border border-border rounded-lg bg-muted/30">
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
                      disabled
                      className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-lg font-medium cursor-not-allowed text-sm"
                    >
                      Setup Required — Contact Admin
                    </button>
                  </div>
                  <div className="p-4 border border-border rounded-lg bg-muted/30">
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
                      disabled
                      className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-lg font-medium cursor-not-allowed text-sm"
                    >
                      Setup Required — Contact Admin
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
                      <select
                        value={meetingDuration}
                        onChange={(e) => {
                          setMeetingDuration(e.target.value)
                          toast.success('Preference saved', `Meeting duration set to ${e.target.value} minutes`)
                        }}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Buffer Between Meetings</label>
                      <select
                        value={meetingBuffer}
                        onChange={(e) => {
                          setMeetingBuffer(e.target.value)
                          toast.success('Preference saved', `Buffer set to ${e.target.value === '0' ? 'none' : e.target.value + ' minutes'}`)
                        }}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="0">No buffer</option>
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
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
                        <select
                          defaultValue={member.role}
                          disabled={updatingRole === member.id}
                          onChange={(e) => handleRoleChange(member.id, e.target.value)}
                          className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Member">Member</option>
                          <option value="Viewer">Viewer</option>
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
                <CardDescription>Integrate Wryko with your existing tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {integrations.map((integration) => (
                    <div
                      key={integration.id}
                      className="p-4 border border-border rounded-lg bg-muted/30"
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Not configured</span>
                        </div>
                        <button
                          disabled
                          className="px-3 py-1.5 text-sm font-medium bg-muted text-muted-foreground rounded-lg cursor-not-allowed"
                        >
                          Setup Required
                        </button>
                      </div>
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
                <div className="p-4 border border-border rounded-lg">
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
                <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  API documentation is being prepared and will be available soon.
                </p>
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
                <CardTitle>Billing</CardTitle>
                <CardDescription>Manage your subscription and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 text-center border border-dashed border-border rounded-xl">
                  <CreditCard className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="font-semibold mb-2">Billing Not Configured</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                    Payment processing has not been set up yet. Contact your account manager to configure billing for your subscription.
                  </p>
                  {stripePortalUrl ? (
                    <button
                      onClick={() => window.open(stripePortalUrl, '_blank')}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Billing Portal
                    </button>
                  ) : (
                    <Badge variant="secondary" className="gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Stripe portal URL not configured
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

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
              <label htmlFor="new-password" className="text-sm font-medium">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setPasswordError('') }}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm Password
              </label>
              <input
                id="confirm-password"
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
