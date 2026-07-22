import { createBrowserRouter } from 'react-router'
import { ROUTES } from '@/constants'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { ProtectedRoute, PublicRoute } from '@/routes/guards'
import { NotFoundPage } from '@/routes/NotFoundPage'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'
import { DashboardPage } from '@/features/dashboard/DashboardPage'

/**
 * Route tree only -- no data loading here. Guards wrap whole branches rather
 * than individual pages.
 *
 * `handle.crumb` is read by Breadcrumbs via useMatches(), so a route's label
 * lives with the route and cannot desync from its path.
 */
export const router = createBrowserRouter([
  {
    Component: PublicRoute,
    children: [
      {
        Component: AuthLayout,
        children: [
          { path: ROUTES.login, Component: LoginForm },
          { path: ROUTES.forgotPassword, Component: ForgotPasswordForm },
        ],
      },
    ],
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        path: ROUTES.dashboard,
        Component: AppLayout,
        children: [
          {
            index: true,
            handle: { crumb: 'Dashboard' },
            Component: DashboardPage,
          },
        ],
      },
    ],
  },
  /*
   * Top level, outside both guards. Previously this was a splat child of
   * AppLayout, which meant a signed-out visitor to a mistyped URL was bounced
   * to the login form instead of being told the page does not exist.
   */
  { path: '*', Component: NotFoundPage },
])
