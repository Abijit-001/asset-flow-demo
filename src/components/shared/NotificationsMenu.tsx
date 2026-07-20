import { Bell, BellOff } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * A Popover, not a DropdownMenu: the contents are read rather than invoked, and
 * real notifications will be links and timestamps, never menu items. A menu
 * role here would announce "menu, 0 items" and wire arrow keys to nothing.
 *
 * Shell only -- there is nothing to notify about until maintenance requests and
 * activity exist (Phases 9 and 10), and inventing entries now would mean
 * deleting them then.
 */
export function NotificationsMenu() {
  return (
    <Popover>
      <PopoverTrigger
        aria-label="Notifications"
        className="text-content-muted hover:text-content hover:bg-canvas grid size-9 shrink-0 place-items-center rounded-md transition-colors"
      >
        <Bell className="size-4.5" aria-hidden />
      </PopoverTrigger>

      <PopoverContent className="w-72" aria-label="Notifications">
        <h2 className="border-border border-b px-3 py-2 text-sm font-medium">
          Notifications
        </h2>
        <EmptyState
          icon={BellOff}
          title="You're all caught up"
          description="Warranty and maintenance alerts will appear here."
        />
      </PopoverContent>
    </Popover>
  )
}
