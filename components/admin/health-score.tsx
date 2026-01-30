import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { HEALTH_THRESHOLDS, getHealthColorClass, getHealthBgColorClass, getHealthStatus } from '@/lib/constants/admin'

interface HealthScoreProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  showIcon?: boolean
  className?: string
}

const sizeStyles = {
  sm: 'text-sm px-2 py-0.5',
  md: 'text-sm px-2 py-1',
  lg: 'text-lg px-3 py-1.5',
}

const fontSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
}

export function HealthScore({
  score,
  size = 'md',
  showLabel = false,
  showIcon = false,
  className,
}: HealthScoreProps) {
  const status = getHealthStatus(score)
  const colorClass = getHealthColorClass(score)
  const bgColorClass = getHealthBgColorClass(score)

  const StatusIcon = status === 'healthy'
    ? CheckCircle2
    : status === 'at-risk'
    ? AlertTriangle
    : XCircle

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded font-bold',
        bgColorClass,
        colorClass,
        sizeStyles[size],
        className
      )}
    >
      {showIcon && <StatusIcon className="w-3.5 h-3.5" />}
      <span className={fontSizes[size]}>{score}</span>
      {showLabel && (
        <span className="font-medium text-xs capitalize">
          ({status})
        </span>
      )}
    </div>
  )
}

// Large health display for cards
interface HealthDisplayProps {
  score: number
  label?: string
  trend?: number
  className?: string
}

export function HealthDisplay({
  score,
  label = 'Health Score',
  trend,
  className,
}: HealthDisplayProps) {
  const colorClass = getHealthColorClass(score)
  const status = getHealthStatus(score)

  const TrendIcon = trend && trend > 0
    ? TrendingUp
    : trend && trend < 0
    ? TrendingDown
    : Minus

  return (
    <div className={cn('space-y-1', className)}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className={cn('text-2xl font-bold', colorClass)}>
          {score}
        </span>
        {trend !== undefined && trend !== 0 && (
          <span
            className={cn(
              'flex items-center text-xs',
              trend > 0 ? 'text-success' : 'text-destructive'
            )}
          >
            <TrendIcon className="w-3 h-3 mr-0.5" />
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className={cn('text-xs capitalize', colorClass)}>{status}</p>
    </div>
  )
}

// Health breakdown summary component
interface HealthBreakdownProps {
  clients: Array<{ healthScore: number; status: string }>
  className?: string
}

export function HealthBreakdown({ clients, className }: HealthBreakdownProps) {
  const activeClients = clients.filter((c) => c.status === 'active')

  const healthy = activeClients.filter(
    (c) => c.healthScore >= HEALTH_THRESHOLDS.HEALTHY
  ).length
  const atRisk = activeClients.filter(
    (c) => c.healthScore >= HEALTH_THRESHOLDS.AT_RISK && c.healthScore < HEALTH_THRESHOLDS.HEALTHY
  ).length
  const critical = activeClients.filter(
    (c) => c.healthScore < HEALTH_THRESHOLDS.AT_RISK
  ).length

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span className="text-sm font-medium">Healthy</span>
        </div>
        <span className="text-sm font-bold text-success">{healthy}</span>
      </div>
      <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <span className="text-sm font-medium">At Risk</span>
        </div>
        <span className="text-sm font-bold text-warning">{atRisk}</span>
      </div>
      <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm font-medium">Critical</span>
        </div>
        <span className="text-sm font-bold text-destructive">{critical}</span>
      </div>
    </div>
  )
}
