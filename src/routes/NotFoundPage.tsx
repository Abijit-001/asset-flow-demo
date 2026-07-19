import { Link } from 'react-router'
import { ROUTES } from '@/constants'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-content-muted font-mono text-xs tracking-widest uppercase">
        Error 404
      </p>
      <h1 className="mt-3 text-2xl font-semibold">This page does not exist</h1>
      <p className="text-content-muted mt-2 text-sm">
        The link may be out of date, or the record was removed.
      </p>
      <Link
        to={ROUTES.dashboard}
        className="bg-accent text-accent-content mt-6 inline-block rounded-md px-4 py-2 text-sm font-medium"
      >
        Go to dashboard
      </Link>
    </div>
  )
}
