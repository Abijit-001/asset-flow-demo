import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/constants'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { requestPasswordReset } from '@/features/auth/api/auth-api'
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from '@/features/auth/schemas'

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: requestPasswordReset,
  })

  if (isSuccess) {
    return (
      <>
        <h1 className="text-xl font-semibold">Check your inbox</h1>
        <p className="text-content-muted mt-2 text-sm">
          If that address belongs to an AssetFlow account, a reset link is on
          its way. The link expires in 30 minutes.
        </p>
        <BackToSignIn />
      </>
    )
  }

  return (
    <>
      <h1 className="text-xl font-semibold">Reset your password</h1>
      <p className="text-content-muted mt-1 text-sm">
        Enter your work email and we'll send a reset link.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit((values) => mutate(values))}
        className="mt-6 grid gap-4"
      >
        <TextField
          label="Work email"
          type="email"
          autoComplete="email"
          placeholder="you@assetflow.io"
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" isLoading={isPending} className="w-full">
          {isPending ? 'Sending link' : 'Send reset link'}
        </Button>
      </form>

      <BackToSignIn />
    </>
  )
}

function BackToSignIn() {
  return (
    <Link
      to={ROUTES.login}
      className="text-content-muted hover:text-content mt-6 inline-flex items-center gap-1.5 text-sm"
    >
      <ArrowLeft className="size-4" aria-hidden />
      Back to sign in
    </Link>
  )
}
