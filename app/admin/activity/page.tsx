'use client'

import { useState } from 'react'
import { Search, Filter, ChevronDown, User, Users, Cog, Settings, Mail } from 'lucide-react'
import { mockAdminActivity, AdminActivity } from '@/lib/data/admin-mock'

type ResourceFilter = AdminActivity['resourceType'] | 'all'

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [resourceFilter, setResourceFilter] = useState<ResourceFilter>('all')

  const filteredActivity = mockAdminActivity.filter((activity) => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        activity.action.toLowerCase().includes(query) ||
        activity.resourceName?.toLowerCase().includes(query) ||
        activity.details?.toLowerCase().includes(query) ||
        activity.adminName.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    // Apply resource filter
    if (resourceFilter !== 'all' && activity.resourceType !== resourceFilter) {
      return false
    }

    return true
  })

  const getResourceIcon = (resourceType: AdminActivity['resourceType']) => {
    switch (resourceType) {
      case 'client':
        return <Users className="w-4 h-4" />
      case 'engine':
        return <Cog className="w-4 h-4" />
      case 'settings':
        return <Settings className="w-4 h-4" />
      case 'campaign':
        return <Mail className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getResourceColor = (resourceType: AdminActivity['resourceType']) => {
    switch (resourceType) {
      case 'client':
        return 'bg-blue-500/10 text-blue-500'
      case 'engine':
        return 'bg-purple-500/10 text-purple-500'
      case 'settings':
        return 'bg-gray-500/10 text-gray-500'
      case 'campaign':
        return 'bg-green-500/10 text-green-500'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'created':
        return 'text-green-500'
      case 'updated':
        return 'text-blue-500'
      case 'deleted':
        return 'text-red-500'
      case 'paused':
        return 'text-yellow-500'
      case 'triggered':
        return 'text-purple-500'
      default:
        return 'text-muted-foreground'
    }
  }

  // Group activities by date
  const groupedActivities = filteredActivity.reduce((groups, activity) => {
    const date = new Date(activity.timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, AdminActivity[]>)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Activity Log</h1>
        <p className="text-muted-foreground">
          Track all admin actions and changes
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Resource Filter */}
        <div className="relative">
          <select
            value={resourceFilter}
            onChange={(e) => setResourceFilter(e.target.value as ResourceFilter)}
            className="appearance-none pl-4 pr-10 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Resources</option>
            <option value="client">Clients</option>
            <option value="campaign">Campaigns</option>
            <option value="engine">Engines</option>
            <option value="settings">Settings</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Activity Feed */}
      <div className="space-y-6">
        {Object.entries(groupedActivities).map(([date, activities]) => (
          <div key={date}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              {date}
            </h3>
            <div className="bg-card border border-border rounded-xl divide-y divide-border">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary">
                      {activity.adminName.charAt(0)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{activity.adminName}</span>
                      <span className={`${getActionColor(activity.action)}`}>
                        {activity.action}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded ${getResourceColor(activity.resourceType)}`}
                      >
                        {getResourceIcon(activity.resourceType)}
                        {activity.resourceType}
                      </span>
                      {activity.resourceName && (
                        <span className="font-medium">{activity.resourceName}</span>
                      )}
                    </div>
                    {activity.details && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.details}
                      </p>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="text-xs text-muted-foreground flex-shrink-0">
                    {new Date(activity.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredActivity.length === 0 && (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground">No activity found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
