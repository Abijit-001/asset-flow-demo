import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

/**
 * Errors say what happened and what to do next. They do not apologise, and they
 * are never vague -- "Something went wrong" with no action is a dead end.
 */
export function ErrorState({
  title = 'That did not load',
  description = 'The request failed. Check your connection and try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div role="alert" className={cn('px-4 py-10 text-center', className)}>
      <TriangleAlert className="text-danger mx-auto size-6" aria-hidden />
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="text-content-muted mt-1 text-xs">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
          Try again
        </Button>
      )}
    </div>
  )
}
