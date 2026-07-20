import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { MobileNav } from '@/components/shared/MobileNav'
import { NotificationsMenu } from '@/components/shared/NotificationsMenu'
import { ProfileMenu } from '@/components/shared/ProfileMenu'
import { SearchDialog } from '@/components/shared/SearchDialog'
import { ThemeToggle } from '@/components/shared/ThemeToggle'

export function TopBar() {
  return (
    <header className="border-border bg-surface sticky top-0 z-30 border-b">
      <div className="flex h-14 items-center gap-2 px-4 sm:px-6">
        <MobileNav />
        <Breadcrumbs />

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <SearchDialog />
          <NotificationsMenu />
          <ThemeToggle />
          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}
