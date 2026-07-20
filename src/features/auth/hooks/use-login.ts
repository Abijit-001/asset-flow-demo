import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { ROUTES } from '@/constants'
import { login } from '@/features/auth/api/auth-api'
import { useAuthStore } from '@/features/auth/store/auth-store'
import type { LoginValues } from '@/features/auth/schemas'

export function useLogin() {
  const signIn = useAuthStore((s) => s.signIn)
  const navigate = useNavigate()
  const location = useLocation()

  // Set by ProtectedRoute when it bounced an unauthenticated visit, so sign-in
  // returns them to the page they actually asked for.
  const from = (location.state as { from?: string } | null)?.from

  return useMutation({
    mutationFn: login,
    onSuccess: (session, values: LoginValues) => {
      signIn(session, values.rememberMe)
      toast.success(`Signed in as ${session.user.name}`)
      void navigate(from ?? ROUTES.dashboard, { replace: true })
    },
  })
}
