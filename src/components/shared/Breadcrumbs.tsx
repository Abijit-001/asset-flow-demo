import { Link, useMatches } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

interface CrumbHandle {
  crumb: string
}

/** `useMatches` types handle as unknown; narrow rather than cast. */
function hasCrumb(handle: unknown): handle is CrumbHandle {
  return (
    typeof handle === 'object' &&
    handle !== null &&
    'crumb' in handle &&
    typeof (handle as CrumbHandle).crumb === 'string'
  )
}

/**
 * Derived from the route tree, not a hand-maintained path->label map, so a
 * renamed route cannot desync from its label.
 */
export function Breadcrumbs() {
  // flatMap rather than filter+map: the guard narrows inside the branch, so no
  // cast is needed to read `.crumb`.
  const crumbs = useMatches().flatMap((match) =>
    hasCrumb(match.handle)
      ? [{ label: match.handle.crumb, pathname: match.pathname }]
      : [],
  )

  if (crumbs.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <li
              key={crumb.pathname}
              className={cn(
                'flex items-center gap-1.5',
                // Only the current page survives on narrow screens.
                !isLast && 'hidden sm:flex',
              )}
            >
              {index > 0 && (
                <ChevronRight
                  className="text-content-muted size-3.5 shrink-0"
                  aria-hidden
                />
              )}
              {isLast ? (
                <span aria-current="page" className="truncate font-medium">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.pathname}
                  className="text-content-muted hover:text-content truncate"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
