import * as Primitive from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

export const TooltipProvider = Primitive.Provider

interface TooltipProps {
  content: ReactNode
  side?: Primitive.TooltipContentProps['side']
  children: ReactNode
}

/**
 * A tooltip is never an accessible name -- it is not announced reliably and
 * never appears for touch users. Anything using this for an icon-only control
 * still needs its own sr-only label or aria-label.
 */
export function Tooltip({ content, side = 'right', children }: TooltipProps) {
  return (
    <Primitive.Root>
      <Primitive.Trigger asChild>{children}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content
          side={side}
          sideOffset={8}
          className="border-border bg-surface-raised text-content z-50 rounded-md border px-2 py-1 text-xs shadow-md"
        >
          {content}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  )
}
