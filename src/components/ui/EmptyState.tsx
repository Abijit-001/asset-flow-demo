import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  className?: string
}

/** An empty screen is an invitation to act, not an apology. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('px-4 py-10 text-center', className)}>
      <Icon className="text-content-muted mx-auto size-6" aria-hidden />
      <p className="mt-3 text-sm font-medium">{title}</p>
      {description && (
        <p className="text-content-muted mt-1 text-xs">{description}</p>
      )}
    </div>
  )
}
