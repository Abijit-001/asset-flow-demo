import { useId, type InputHTMLAttributes, type Ref } from 'react'
import { cn } from '@/lib/cn'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  /** Hide the label visually but keep it for screen readers (table row selects). */
  hideLabel?: boolean
  ref?: Ref<HTMLInputElement>
}

/**
 * Native input, not a Radix primitive: `accent-color` styles the check to our
 * token, and the browser gives us keyboard handling, indeterminate support and
 * form participation for free. A custom checkbox would be more code and less
 * capable.
 */
export function Checkbox({
  label,
  hideLabel = false,
  className,
  ref,
  ...props
}: CheckboxProps) {
  const id = useId()

  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        ref={ref}
        type="checkbox"
        className={cn('accent-accent size-4 cursor-pointer', className)}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn('cursor-pointer text-sm', hideLabel && 'sr-only')}
      >
        {label}
      </label>
    </div>
  )
}
