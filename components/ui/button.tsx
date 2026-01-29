import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
        secondary:
          'bg-muted text-foreground hover:bg-muted/80 active:scale-[0.98]',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Corporate variants
        gradient: 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 active:scale-[0.98] shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/20 transition-shadow',
        success: 'bg-success text-success-foreground hover:bg-success/90 active:scale-[0.98]',
        // Solid alternatives to gradient (timeless, non-trendy)
        solid: 'bg-primary-button text-white hover:bg-primary-button-hover active:scale-[0.98] shadow-sm',
        elevated: 'bg-primary-button text-white hover:bg-primary-button-hover active:scale-[0.98] shadow-md shadow-primary/20',
        'outline-primary': 'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 active:scale-[0.98]',
        // Muted variant for dashboard contexts
        'muted-primary': 'bg-primary-soft text-primary-soft-foreground hover:bg-primary-soft/80 active:scale-[0.98]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 rounded-lg px-8 text-base',
        xl: 'h-14 rounded-lg px-10 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
