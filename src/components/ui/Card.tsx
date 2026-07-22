import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps {
  title?: string
  action?: ReactNode
  className?: string
  bodyClassName?: string
  children: ReactNode
}

/**
 * Surface container. The header only renders when there is a title or action,
 * so a plain Card is a bordered box with no wasted vertical space.
 */
export function Card({
  title,
  action,
  className,
  bodyClassName,
  children,
}: CardProps) {
  return (
    <section
      className={cn('border-border bg-surface rounded-md border', className)}
    >
      {(title || action) && (
        <header className="border-border flex items-center gap-3 border-b px-4 py-3">
          {title && <h2 className="text-sm font-semibold">{title}</h2>}
          {action && <div className="ml-auto">{action}</div>}
        </header>
      )}
      <div className={cn('p-4', bodyClassName)}>{children}</div>
    </section>
  )
}
