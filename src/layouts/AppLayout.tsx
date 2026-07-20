import { Outlet } from 'react-router'
import { LogOut } from 'lucide-react'
import { APP_NAME } from '@/constants'
import { BrandMark } from '@/components/shared/BrandMark'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { useLogout } from '@/features/auth/hooks/use-logout'

/**
 * Shell for every signed-in page. Still thin -- the sidebar, breadcrumbs and
 * top navigation land in Phase 3.
 */
export function AppLayout() {
  const { user } = useAuth()
  const logout = useLogout()

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-border bg-surface sticky top-0 z-10 border-b">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
          <BrandMark />

          <div className="ml-auto flex items-center gap-1">
            {user && (
              <span className="text-content-muted mr-2 hidden text-sm sm:inline">
                {user.name}
                <span className="font-mono text-[0.625rem] tracking-widest uppercase">
                  {' · '}
                  {user.role}
                </span>
              </span>
            )}
            <ThemeToggle />
            <Button variant="ghost" onClick={logout} className="px-2">
              <LogOut className="size-4" aria-hidden />
              <span className="sr-only sm:not-sr-only">Sign out</span>
            </Button>
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
