import { useId, type TextareaHTMLAttributes, type Ref } from 'react'
import { cn } from '@/lib/cn'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  ref?: Ref<HTMLTextAreaElement>
}

/** Same label/error contract as TextField, so the two behave identically. */
export function Textarea({
  label,
  error,
  className,
  ref,
  ...props
}: TextareaProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        ref={ref}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'bg-surface border-border focus-visible:border-accent resize-y rounded-md border px-3 py-2 text-sm transition-colors',
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
