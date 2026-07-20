import { Outlet } from 'react-router'
import { AuthBrandPanel } from '@/components/shared/AuthBrandPanel'
import { BrandMark } from '@/components/shared/BrandMark'
import { ThemeToggle } from '@/components/shared/ThemeToggle'

/**
 * Shell for signed-out pages: sign in, forgot password.
 *
 * Split at lg and above -- brand panel left, form right. Below lg the panel is
 * dropped entirely (not stacked) and a compact header carries the wordmark, so
 * the mark is never announced twice.
 */
export function AuthLayout() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <AuthBrandPanel />

      <div className="flex flex-col">
        <header className="flex items-center p-4 lg:justify-end lg:p-6">
          <span className="lg:hidden">
            <BrandMark />
          </span>
          <div className="ml-auto lg:ml-0">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex flex-1 justify-center px-4 pb-16 sm:items-center sm:pb-24 lg:pb-32">
          {/* Card framing on mobile, where there is no panel to give structure. */}
          <div className="border-border bg-surface w-full max-w-sm rounded-lg border p-6 sm:p-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
