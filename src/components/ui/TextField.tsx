import { useId, type InputHTMLAttributes, type Ref } from 'react'
import { cn } from '@/lib/cn'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * Owns its own label/error wiring so no caller can ship an unlabelled input or
 * an error the screen reader never announces.
 */
export function TextField({
  label,
  error,
  className,
  ref,
  ...props
}: TextFieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'bg-surface border-border focus-visible:border-accent rounded-md border px-3 py-2 text-sm transition-colors',
          error && 'border-danger',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-danger text-xs">
          {error}
        </p>
      )}
    </div>
  )
}
