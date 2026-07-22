import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-accent-content hover:brightness-110',
  ghost: 'text-content-muted hover:text-content hover:bg-canvas',
  outline: 'border-border bg-surface hover:bg-canvas border',
  danger: 'bg-danger text-danger-content hover:brightness-110',
}

// h-9 is the app-wide control height; h-8 is the compact form used in toolbars
// and table rows.
const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      // Explicit: a bare <button> in a form defaults to submit, which fires
      // unintended submissions from icon buttons.
      type="button"
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium transition disabled:pointer-events-none disabled:opacity-60',
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {/* Inline rather than a shared Spinner: the button already conveys busy
          state via aria-busy, so a second announcement would be redundant. */}
      {isLoading && (
        <LoaderCircle className="size-4 animate-spin" aria-hidden />
      )}
      {children}
    </button>
  )
}
