import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/layouts/AppLayout'
import { NotFoundPage } from '@/routes/NotFoundPage'
import { ROUTES } from '@/constants'

/**
 * Route tree only -- no data loading here. Feature pages replace the
 * placeholder as each phase lands.
 */
export const router = createBrowserRouter([
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
])
