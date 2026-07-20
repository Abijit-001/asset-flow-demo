import { Navigate, Outlet, useLocation } from 'react-router'
import { ROUTES } from '@/constants'
import { useAuth } from '@/features/auth/hooks/use-auth'

/**
 * Pathless layout routes, so the decision lives in one place and a new page
 * cannot forget to check. Role gating is deliberately absent: no admin-only
 * screen exists yet, and it lands with the first one that does.
 */
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.login}
        state={{ from: location.pathname + location.search }}
        replace
      />
    )
  }
  return <Outlet />
}

export function PublicRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? (
    <Navigate to={ROUTES.dashboard} replace />
  ) : (
    <Outlet />
  )
}
