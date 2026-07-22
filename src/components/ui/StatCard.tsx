import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Skeleton } from '@/components/ui/Skeleton'

interface StatCardProps {
  label: string
  value: number | string
  icon?: LucideIcon
  hint?: string
  isLoading?: boolean
  className?: string
}

/**
 * The value is mono: in an inventory tool, counts and IDs are data, and mono
 * keeps digits aligned when several cards sit in a row.
 */
export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  isLoading = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'border-border bg-surface rounded-md border p-4',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-content-muted size-4" aria-hidden />}
        <span className="text-content-muted text-xs font-medium">{label}</span>
      </div>

      {isLoading ? (
        <Skeleton className="mt-2 h-8 w-20" />
      ) : (
        <p className="mt-2 font-mono text-2xl font-semibold tabular-nums">
          {value}
        </p>
      )}

      {hint && <p className="text-content-muted mt-1 text-xs">{hint}</p>}
    </div>
  )
}
