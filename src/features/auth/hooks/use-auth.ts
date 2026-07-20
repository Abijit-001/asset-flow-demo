import { useAuthStore } from '@/features/auth/store/auth-store'
import { ROLES } from '@/features/auth/types'

/**
 * Read-side view of the session. Components use this instead of touching the
 * store directly, so the shape of `Session` stays an auth-internal detail.
 */
export function useAuth() {
  const session = useAuthStore((s) => s.session)

  return {
    user: session?.user ?? null,
    isAuthenticated: session !== null,
    isAdmin: session?.user.role === ROLES.admin,
  }
}
