'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  Pause,
  AlertTriangle,
  Circle,
  type LucideIcon,
} from 'lucide-react'

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-medium',
  {
    variants: {
      variant: {
        // Semantic statuses
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        error: 'bg-destructive/10 text-destructive',
        info: 'bg-info/10 text-info',
        neutral: 'bg-muted text-muted-foreground',
        // Application-specific statuses
        active: 'bg-success/10 text-success',
        paused: 'bg-warning/10 text-warning',
        completed: 'bg-success/10 text-success',
        failed: 'bg-destructive/10 text-destructive',
        running: 'bg-info/10 text-info',
        queued: 'bg-muted text-muted-foreground',
        draft: 'bg-muted text-muted-foreground',
        pending: 'bg-warning/10 text-warning',
        healthy: 'bg-success/10 text-success',
        degraded: 'bg-warning/10 text-warning',
        critical: 'bg-destructive/10 text-destructive',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-2.5 py-1',
        lg: 'text-sm px-3 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
)

const statusIconMap: Record<string, LucideIcon> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Circle,
  neutral: Circle,
  active: CheckCircle2,
  paused: Pause,
  completed: CheckCircle2,
  failed: XCircle,
  running: Loader2,
  queued: Clock,
  draft: Circle,
  pending: Clock,
  healthy: CheckCircle2,
  degraded: AlertTriangle,
  critical: XCircle,
}

const iconSizeMap = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
}

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode
  showIcon?: boolean
  icon?: LucideIcon
  className?: string
}

export function StatusBadge({
  children,
  variant,
  size,
  showIcon = true,
  icon,
  className,
}: StatusBadgeProps) {
  const resolvedVariant = variant || 'neutral'
  const resolvedSize = size || 'md'
  const Icon = icon || statusIconMap[resolvedVariant]
  const isSpinning = resolvedVariant === 'running'

  return (
    <span className={cn(statusBadgeVariants({ variant, size }), className)}>
      {showIcon && Icon && (
        <Icon
          className={cn(
            iconSizeMap[resolvedSize],
            isSpinning && 'animate-spin'
          )}
        />
      )}
      {children}
    </span>
  )
}

export { statusBadgeVariants }
