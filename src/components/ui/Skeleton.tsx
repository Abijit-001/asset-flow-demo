import { cn } from '@/lib/cn'

/**
 * Placeholder block. aria-hidden because a screen reader should hear the
 * loading state from the region's aria-busy, not from a row of empty boxes.
 * The global prefers-reduced-motion rule in index.css stops the pulse.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('bg-canvas animate-pulse rounded-sm', className)}
    />
  )
}
