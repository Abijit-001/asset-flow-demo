import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  className?: string
}

/**
 * Prev/next with a position readout. No numbered page buttons: they need
 * ellipsis logic and window calculation, and nothing in this app has enough
 * pages to need direct jumps. Add them when a screen proves otherwise.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
}: PaginationProps) {
  if (pageCount <= 1) return null

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-end gap-3', className)}
    >
      <p aria-live="polite" className="text-content-muted font-mono text-xs">
        Page {page} of {pageCount}
      </p>
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" aria-hidden />
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" aria-hidden />
      </Button>
    </nav>
  )
}
