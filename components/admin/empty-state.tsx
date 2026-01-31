import { cn } from '@/lib/utils'
import { LucideIcon, Inbox, Search, Users, Cog, Activity, FileText } from 'lucide-react'
import Link from 'next/link'
import { IconWrapper } from '@/components/ui/icon-wrapper'
import { Button } from '@/components/ui/button'

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
      <IconWrapper icon={Icon} size="lg" variant="muted" className="mb-4" />
      <h3 className="heading-xs mb-1">{title}</h3>
      {description && (
        <p className="body-sm max-w-sm mb-4">
          {description}
        </p>
      )}
      {action && (
        action.href ? (
          <Button asChild>
            <Link href={action.href}>
              {action.label}
            </Link>
          </Button>
        ) : (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
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
    <div className="p-4 bg-success/5 border border-success/20 rounded-lg text-center">
      <p className="text-sm text-success font-medium">
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
    <p className={cn('body-sm py-4 text-center', className)}>
      {message}
    </p>
  )
}
