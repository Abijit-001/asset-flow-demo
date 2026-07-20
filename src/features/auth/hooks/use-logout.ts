import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/constants'
import { useAuthStore } from '@/features/auth/store/auth-store'

export function useLogout() {
  const signOut = useAuthStore((s) => s.signOut)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return () => {
    signOut()
    // Cached data belongs to the account that fetched it; the next sign-in must
    // not inherit it.
    queryClient.clear()
    void navigate(ROUTES.login, { replace: true })
  }
}
