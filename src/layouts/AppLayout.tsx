import { Outlet } from 'react-router'
import { APP_NAME } from '@/constants'
import { Sidebar } from '@/components/shared/Sidebar'
import { TopBar } from '@/components/shared/TopBar'

/**
 * Shell for every signed-in page. No max-width on the content column: with a
 * sidebar present, centring wastes the horizontal space the asset tables need.
 */
export function AppLayout() {
  return (
    <div className="flex min-h-dvh">
      {/*
       * First focusable element on the page. Without it, keyboard users tab
       * through the whole sidebar and every top-bar control on every
       * navigation (WCAG 2.4.1 Bypass Blocks).
       */}
      <a
        href="#main"
        className="bg-accent text-accent-content sr-only rounded-md px-3 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        {/* tabIndex -1 so the skip link moves focus, not just the viewport. */}
        <main id="main" tabIndex={-1} className="flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>

        <footer className="border-border text-content-muted border-t px-4 py-4 font-mono text-xs sm:px-6">
          {APP_NAME} — internal tooling
        </footer>
      </div>
    </div>
  )
}
