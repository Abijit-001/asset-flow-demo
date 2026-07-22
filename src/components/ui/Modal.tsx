import type { ReactNode } from 'react'
import * as Primitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Ported from shadcn/ui's `dialog`, with their token classes translated to ours
 * (bg-background -> bg-canvas, bg-popover -> bg-surface, text-muted-foreground
 * -> text-content-muted) and their ring-* focus classes dropped, since the
 * global :focus-visible rule in index.css already handles focus.
 *
 * Their structure is kept because it is the part worth borrowing: Radix Dialog
 * gives focus trap, focus return, Esc, scroll lock and correct aria-modal
 * wiring, and shadcn's composition exposes it cleanly.
 *
 * `cva` was dropped -- Record<Variant, string> + cn is this codebase's pattern
 * and needs no extra dependency.
 */

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  /** Omit to render a visually hidden description; Radix warns without one. */
  description?: string
  footer?: ReactNode
  className?: string
  children?: ReactNode
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  footer,
  className,
  children,
}: ModalProps) {
  return (
    <Primitive.Root open={open} onOpenChange={onOpenChange}>
      <Primitive.Portal>
        <Primitive.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Primitive.Content
          className={cn(
            'border-border bg-surface fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border shadow-xl',
            className,
          )}
        >
          <div className="border-border flex items-start gap-4 border-b px-4 py-3">
            <div className="min-w-0">
              <Primitive.Title className="text-sm font-semibold">
                {title}
              </Primitive.Title>
              {description ? (
                <Primitive.Description className="text-content-muted mt-1 text-xs">
                  {description}
                </Primitive.Description>
              ) : (
                <Primitive.Description className="sr-only">
                  {title}
                </Primitive.Description>
              )}
            </div>
            <Primitive.Close
              aria-label="Close"
              className="text-content-muted hover:text-content ml-auto grid size-7 shrink-0 cursor-pointer place-items-center rounded-md"
            >
              <X className="size-4" aria-hidden />
            </Primitive.Close>
          </div>

          {children && <div className="px-4 py-4">{children}</div>}

          {footer && (
            <div className="border-border flex justify-end gap-2 border-t px-4 py-3">
              {footer}
            </div>
          )}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  )
}
