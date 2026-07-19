import { Outlet } from 'react-router'
import { APP_NAME } from '@/constants'
import { ThemeToggle } from '@/components/shared/ThemeToggle'

/**
 * Shell for every authenticated page. Deliberately thin in Phase 1 -- the
 * sidebar, breadcrumbs and top navigation land in Phase 3.
 */
export function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-border bg-surface sticky top-0 z-10 border-b">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
          <span className="font-display text-[0.9375rem] font-bold tracking-tight uppercase">
            {APP_NAME}
          </span>
          <span className="text-content-muted font-mono text-[0.6875rem] tracking-widest uppercase">
            IT Assets
          </span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-border text-content-muted border-t py-4 text-center font-mono text-xs">
        {APP_NAME} — internal tooling
      </footer>
    </div>
  )
}
