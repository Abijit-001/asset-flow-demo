import * as Primitive from '@radix-ui/react-popover'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

/**
 * For panels whose contents are read, not commanded -- notifications, filters,
 * detail popovers. Use DropdownMenu only when every child is genuinely a
 * command, since that renders role="menu" and expects menuitem children.
 */
export const Popover = Primitive.Root
export const PopoverTrigger = Primitive.Trigger

export function PopoverContent({
  className,
  align = 'end',
  sideOffset = 6,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'border-border bg-surface-raised z-50 rounded-md border shadow-lg',
          className,
        )}
        {...props}
      />
    </Primitive.Portal>
  )
}
