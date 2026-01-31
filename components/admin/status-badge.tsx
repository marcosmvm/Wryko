import { cn } from '@/lib/utils'
import { CheckCircle2, Clock, XCircle, Loader2, Pause, UserPlus, UserMinus } from 'lucide-react'

type BadgeVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'default'
  | 'active'
  | 'paused'
  | 'churned'
  | 'onboarding'
  | 'running'
  | 'completed'
  | 'failed'
  | 'queued'

type BadgeSize = 'sm' | 'md'

interface StatusBadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  size?: BadgeSize
  showIcon?: boolean
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-destructive/10 text-destructive',
  info: 'bg-info/10 text-info',
  default: 'bg-muted text-muted-foreground',
  // Client status variants
  active: 'bg-success/10 text-success',
  paused: 'bg-warning/10 text-warning',
  churned: 'bg-destructive/10 text-destructive',
  onboarding: 'bg-info/10 text-info',
  // Engine run status variants
  running: 'bg-info/10 text-info',
  completed: 'bg-success/10 text-success',
  failed: 'bg-destructive/10 text-destructive',
  queued: 'bg-warning/10 text-warning',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-2 py-1',
}

const variantIcons: Partial<Record<BadgeVariant, React.ElementType>> = {
  success: CheckCircle2,
  active: CheckCircle2,
  completed: CheckCircle2,
  warning: Clock,
  paused: Pause,
  queued: Clock,
  error: XCircle,
  failed: XCircle,
  churned: UserMinus,
  info: Loader2,
  running: Loader2,
  onboarding: UserPlus,
}

export function StatusBadge({
  variant,
  children,
  size = 'md',
  showIcon = false,
  className,
}: StatusBadgeProps) {
  const Icon = variantIcons[variant]
  const isAnimated = variant === 'running' || variant === 'info'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium capitalize',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {showIcon && Icon && (
        <Icon className={cn('w-3 h-3', isAnimated && 'animate-spin')} />
      )}
      {children}
    </span>
  )
}

// Convenience components for common use cases
export function ClientStatusBadge({
  status,
  showIcon = false,
}: {
  status: 'active' | 'paused' | 'churned' | 'onboarding'
  showIcon?: boolean
}) {
  return (
    <StatusBadge variant={status} showIcon={showIcon}>
      {status}
    </StatusBadge>
  )
}

export function EngineRunStatusBadge({
  status,
  showIcon = false,
}: {
  status: 'running' | 'completed' | 'failed' | 'queued'
  showIcon?: boolean
}) {
  return (
    <StatusBadge variant={status} showIcon={showIcon}>
      {status}
    </StatusBadge>
  )
}
