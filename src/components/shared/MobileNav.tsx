import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'
import { BrandMark } from '@/components/shared/BrandMark'
import { SidebarNav } from '@/components/shared/SidebarNav'

/**
 * Drawer nav below md. Radix Dialog handles the focus trap, focus restore on
 * close, Esc, and scroll lock -- the parts that are easy to get wrong.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open navigation"
        className="text-content-muted hover:text-content hover:bg-canvas grid size-9 shrink-0 place-items-center rounded-md transition-colors md:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Dialog.Content className="border-border bg-surface fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r">
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>

          <div className="flex h-14 items-center justify-between px-4">
            <BrandMark />
            <Dialog.Close
              aria-label="Close navigation"
              className="text-content-muted hover:text-content grid size-8 place-items-center rounded-md"
            >
              <X className="size-4.5" aria-hidden />
            </Dialog.Close>
          </div>

          <div className="py-2">
            {/* Closing on navigate: the route changes underneath an open drawer. */}
            <SidebarNav onNavigate={() => setOpen(false)} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
