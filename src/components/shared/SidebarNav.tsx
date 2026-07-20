import { NavLink } from 'react-router'
import { NAV_ITEMS } from '@/constants/navigation'
import { Tooltip } from '@/components/ui/Tooltip'
import { cn } from '@/lib/cn'

/**
 * The nav list itself, shared by the desktop sidebar and the mobile drawer so
 * it is written once. `collapsed` only affects presentation -- the accessible
 * name is present either way.
 */
export function SidebarNav({
  collapsed = false,
  onNavigate,
}: {
  collapsed?: boolean
  onNavigate?: () => void
}) {
  return (
    <nav aria-label="Main" className="grid gap-1 px-3">
      {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
        const link = (
          <NavLink
            key={to}
            to={to}
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'bg-accent/10 text-accent font-medium'
                  : 'text-content-muted hover:bg-canvas hover:text-content',
              )
            }
          >
            <Icon className="size-4.5 shrink-0" aria-hidden />
            {/* Kept in the DOM when collapsed: a tooltip is not an accessible name. */}
            <span className={cn(collapsed && 'sr-only')}>{label}</span>
          </NavLink>
        )

        return collapsed ? (
          <Tooltip key={to} content={label}>
            {link}
          </Tooltip>
        ) : (
          link
        )
      })}
    </nav>
  )
}
