import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { BrandMark } from '@/components/shared/BrandMark'
import { SidebarNav } from '@/components/shared/SidebarNav'
import { useUiStore } from '@/store/ui-store'
import { cn } from '@/lib/cn'

/** Desktop rail. Hidden below md, where MobileNav takes over. */
export function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed)
  const toggleSidebar = useUiStore((s) => s.toggleSidebar)
  const Icon = collapsed ? PanelLeftOpen : PanelLeftClose

  return (
    <aside
      className={cn(
        // self-start matters: a stretched flex item fills the row and has no
        // room to stick, so sticky silently does nothing without it.
        'border-border bg-surface sticky top-0 hidden h-dvh shrink-0 flex-col self-start border-r transition-[width] md:flex',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      <div
        className={cn(
          'flex h-14 items-center px-4',
          collapsed && 'justify-center px-0',
        )}
      >
        {collapsed ? (
          <span className="bg-accent text-accent-content grid size-8 place-items-center rounded-sm">
            <span className="font-display text-sm font-bold">A</span>
            <span className="sr-only">AssetFlow</span>
          </span>
        ) : (
          <BrandMark />
        )}
      </div>

      {/* Scrolls on its own once the nav outgrows the viewport. */}
      <div className="flex-1 overflow-y-auto py-2">
        <SidebarNav collapsed={collapsed} />
      </div>

      <div className={cn('p-3', collapsed && 'flex justify-center p-2')}>
        <button
          type="button"
          onClick={toggleSidebar}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="text-content-muted hover:bg-canvas hover:text-content flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors"
        >
          <Icon className="size-4.5 shrink-0" aria-hidden />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
