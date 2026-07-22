import * as Primitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Ported from shadcn/ui's `select`, with their token classes translated to ours
 * and their ring-* focus classes dropped (the global :focus-visible rule covers
 * focus).
 *
 * This is the component most worth borrowing: Radix Select needs a portal,
 * scroll-up/scroll-down buttons, an item indicator, popper positioning and
 * trigger-width matching, and hand-rolling that is where custom selects break.
 */

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  options: readonly SelectOption[]
  /** Required: a select without an accessible name is unusable by screen reader. */
  label: string
  placeholder?: string
  className?: string
}

export function Select({
  value,
  onValueChange,
  options,
  label,
  placeholder = 'Select…',
  className,
}: SelectProps) {
  return (
    <Primitive.Root value={value} onValueChange={onValueChange}>
      <Primitive.Trigger
        aria-label={label}
        className={cn(
          'border-border bg-surface flex h-9 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm',
          'data-[placeholder]:text-content-muted',
          className,
        )}
      >
        <Primitive.Value placeholder={placeholder} />
        <Primitive.Icon asChild>
          <ChevronDown
            className="text-content-muted ml-auto size-4"
            aria-hidden
          />
        </Primitive.Icon>
      </Primitive.Trigger>

      <Primitive.Portal>
        <Primitive.Content
          position="popper"
          sideOffset={6}
          className="border-border bg-surface-raised z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border shadow-lg"
        >
          <Primitive.ScrollUpButton className="text-content-muted flex justify-center py-1">
            <ChevronUp className="size-4" aria-hidden />
          </Primitive.ScrollUpButton>

          <Primitive.Viewport className="max-h-60 p-1">
            {options.map((option) => (
              <Primitive.Item
                key={option.value}
                value={option.value}
                className="data-highlighted:bg-canvas flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none"
              >
                <Primitive.ItemIndicator>
                  <Check className="text-accent size-3.5" aria-hidden />
                </Primitive.ItemIndicator>
                <Primitive.ItemText>{option.label}</Primitive.ItemText>
              </Primitive.Item>
            ))}
          </Primitive.Viewport>

          <Primitive.ScrollDownButton className="text-content-muted flex justify-center py-1">
            <ChevronDown className="size-4" aria-hidden />
          </Primitive.ScrollDownButton>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  )
}
