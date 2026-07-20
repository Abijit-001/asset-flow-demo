import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router'
import { ROUTES } from '@/constants'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { loginSchema, type LoginValues } from '@/features/auth/schemas'
import { useLogin } from '@/features/auth/hooks/use-login'
import { DEMO_CREDENTIALS } from '@/features/auth/api/auth-api'

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const { mutate, isPending, error } = useLogin()

  return (
    <>
      <h1 className="text-xl font-semibold">Sign in</h1>
      <p className="text-content-muted mt-1 text-sm">
        Manage your organisation's hardware and licences.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit((values) => mutate(values))}
        className="mt-6 grid gap-4"
      >
        {error && (
          <p
            role="alert"
            className="border-danger/40 text-danger rounded-md border px-3 py-2 text-sm"
          >
            {error.message}
          </p>
        )}

        <TextField
          label="Work email"
          type="email"
          autoComplete="email"
          placeholder="you@assetflow.io"
          error={errors.email?.message}
          {...register('email')}
        />

        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="accent-accent size-4"
              {...register('rememberMe')}
            />
            Keep me signed in
          </label>

          <Link
            to={ROUTES.forgotPassword}
            className="text-accent text-sm hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isPending} className="mt-1 w-full">
          {isPending ? 'Signing in' : 'Sign in'}
        </Button>
      </form>

      {/* Vite strips this branch from production builds, so the demo password
          cannot reach a shipped bundle. */}
      {import.meta.env.DEV && (
        <p className="border-border text-content-muted mt-6 border-t pt-4 font-mono text-xs leading-relaxed">
          Demo accounts
          <br />
          {DEMO_CREDENTIALS.emails.join(' · ')}
          <br />
          Password: {DEMO_CREDENTIALS.password}
        </p>
      )}
    </>
  )
}
