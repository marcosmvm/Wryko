import { cn } from '@/lib/utils'
import { LucideIcon, Inbox, Search, Users, Cog, Activity, FileText } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-medium text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">
          {description}
        </p>
      )}
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  )
}

// Pre-configured empty states for common scenarios
export function NoClientsFound() {
  return (
    <EmptyState
      icon={Users}
      title="No clients found"
      description="No clients match your current filters. Try adjusting your search criteria."
    />
  )
}

export function NoSearchResults() {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description="We couldn't find anything matching your search. Try different keywords."
    />
  )
}

export function NoActivityFound() {
  return (
    <EmptyState
      icon={Activity}
      title="No activity found"
      description="No activity matches your criteria."
    />
  )
}

export function NoEngineRuns() {
  return (
    <EmptyState
      icon={Cog}
      title="No engine runs yet"
      description="This engine hasn't been run yet. Trigger a manual run to get started."
    />
  )
}

export function NoCampaigns() {
  return (
    <EmptyState
      icon={FileText}
      title="No campaigns"
      description="No campaigns have been created for this client yet."
    />
  )
}

export function NoAtRiskClients() {
  return (
    <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg text-center">
      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
        All clients are healthy
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        No clients currently at risk
      </p>
    </div>
  )
}

// Inline empty state for smaller sections
interface InlineEmptyStateProps {
  message: string
  className?: string
}

export function InlineEmptyState({ message, className }: InlineEmptyStateProps) {
  return (
    <p className={cn('text-sm text-muted-foreground py-4 text-center', className)}>
      {message}
    </p>
  )
}
