import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const iconWrapperVariants = cva(
  'flex items-center justify-center shrink-0',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 rounded-lg',
        md: 'w-10 h-10 rounded-lg',
        lg: 'w-12 h-12 rounded-lg',
        xl: 'w-14 h-14 rounded-xl',
        round: 'w-8 h-8 rounded-full',
        'round-md': 'w-10 h-10 rounded-full',
        'round-lg': 'w-12 h-12 rounded-full',
      },
      variant: {
        primary: 'bg-primary/10',
        'primary-muted': 'bg-primary-soft',
        success: 'bg-success/10',
        warning: 'bg-warning/10',
        info: 'bg-info/10',
        destructive: 'bg-destructive/10',
        muted: 'bg-muted',
        blue: 'bg-metric-blue/10',
        amber: 'bg-metric-amber/10',
        indigo: 'bg-metric-indigo/10',
        violet: 'bg-metric-violet/10',
        secondary: 'bg-secondary/10',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
)

const iconSizeMap: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
  round: 'w-4 h-4',
  'round-md': 'w-5 h-5',
  'round-lg': 'w-6 h-6',
}

const iconColorMap: Record<string, string> = {
  primary: 'text-primary',
  'primary-muted': 'text-primary-muted',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
  destructive: 'text-destructive',
  muted: 'text-muted-foreground',
  blue: 'text-metric-blue',
  amber: 'text-metric-amber',
  indigo: 'text-metric-indigo',
  violet: 'text-metric-violet',
  secondary: 'text-secondary',
}

interface IconWrapperProps extends VariantProps<typeof iconWrapperVariants> {
  icon: React.ComponentType<{ className?: string }>
  className?: string
  iconClassName?: string
}

export function IconWrapper({
  icon: Icon,
  size,
  variant,
  className,
  iconClassName,
}: IconWrapperProps) {
  const resolvedSize = size || 'md'
  const resolvedVariant = variant || 'primary'

  return (
    <div className={cn(iconWrapperVariants({ size, variant }), className)}>
      <Icon
        className={cn(
          iconSizeMap[resolvedSize],
          iconColorMap[resolvedVariant],
          iconClassName
        )}
      />
    </div>
  )
}

export { iconWrapperVariants, iconSizeMap, iconColorMap }
