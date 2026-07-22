import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Search, SearchX } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchInput } from '@/components/ui/SearchInput'
import { APP_NAME } from '@/constants'

/**
 * Shell only -- there is no data to search until Phase 6. The input is real and
 * the empty state is honest about it, so wiring results in later does not
 * change this markup.
 */
export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Search"
        className="text-content-muted hover:text-content hover:bg-canvas border-border flex h-9 items-center gap-2 rounded-md px-2 transition-colors sm:w-56 sm:border sm:px-3"
      >
        <Search className="size-4.5 shrink-0" aria-hidden />
        <span className="hidden text-sm sm:inline">Search</span>
        <kbd className="text-content-muted ml-auto hidden font-mono text-[0.625rem] sm:inline">
          ⌘K
        </kbd>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Dialog.Content className="border-border bg-surface fixed top-[15vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-lg border shadow-xl">
          <Dialog.Title className="sr-only">Search {APP_NAME}</Dialog.Title>

          <SearchInput
            autoFocus
            value={query}
            onValueChange={setQuery}
            label="Search assets, employees and licences"
            placeholder="Search assets, employees and licences"
            className="border-border h-12 border-b px-4"
          />

          <EmptyState
            icon={SearchX}
            title="Nothing to search yet"
            description="Assets become searchable once the register is built."
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
