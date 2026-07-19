import { LoaderCircle } from 'lucide-react'

/** Full-page fallback while a route or its data is loading. */
export function PageLoader() {
  return (
    <div role="status" className="grid min-h-[60vh] place-items-center">
      <LoaderCircle className="text-accent size-6 animate-spin" aria-hidden />
      <span className="sr-only">Loading</span>
    </div>
  )
}
