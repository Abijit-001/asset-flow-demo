import { createBrowserRouter } from 'react-router'
import { ROUTES } from '@/constants'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { ProtectedRoute, PublicRoute } from '@/routes/guards'
import { NotFoundPage } from '@/routes/NotFoundPage'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'

/**
 * Route tree only -- no data loading here. Guards wrap whole branches rather
 * than individual pages.
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
            Component: () => (
              <div className="text-content-muted font-mono text-sm">
                Dashboard — built in Phase 5.
              </div>
            ),
          },
          { path: '*', Component: NotFoundPage },
        ],
      },
    ],
  },
])
