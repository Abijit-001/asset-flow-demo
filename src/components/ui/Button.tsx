import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'ghost'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-accent-content hover:brightness-110',
  ghost: 'text-content-muted hover:text-content hover:bg-canvas',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  isLoading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
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
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-60',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {isLoading && (
        <LoaderCircle className="size-4 animate-spin" aria-hidden />
      )}
      {children}
    </button>
  )
}
