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
  success: 'bg-green-500/10 text-green-500',
  warning: 'bg-yellow-500/10 text-yellow-500',
  error: 'bg-red-500/10 text-red-500',
  info: 'bg-blue-500/10 text-blue-500',
  default: 'bg-muted text-muted-foreground',
  // Client status variants
  active: 'bg-green-500/10 text-green-500',
  paused: 'bg-yellow-500/10 text-yellow-500',
  churned: 'bg-red-500/10 text-red-500',
  onboarding: 'bg-blue-500/10 text-blue-500',
  // Engine run status variants
  running: 'bg-blue-500/10 text-blue-500',
  completed: 'bg-green-500/10 text-green-500',
  failed: 'bg-red-500/10 text-red-500',
  queued: 'bg-yellow-500/10 text-yellow-500',
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
