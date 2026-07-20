import { ROLES, type AuthUser, type Session } from '@/features/auth/types'
import type { LoginValues, ForgotPasswordValues } from '@/features/auth/schemas'

/**
 * Fake authentication. Credentials are checked in the browser, so this is a
 * demo affordance and nothing more -- there is no security boundary here.
 * Replacing this file with real HTTP calls is the whole migration path.
 */
const DEMO_PASSWORD = 'password123'

const DEMO_USERS: readonly AuthUser[] = [
  {
    id: 'u-1',
    name: 'Dana Whitfield',
    email: 'admin@assetflow.io',
    role: ROLES.admin,
  },
  {
    id: 'u-2',
    name: 'Sam Okafor',
    email: 'employee@assetflow.io',
    role: ROLES.employee,
  },
]

export const DEMO_CREDENTIALS = {
  password: DEMO_PASSWORD,
  emails: DEMO_USERS.map((u) => u.email),
} as const

/** Thrown for credential failures so the form can show a field-agnostic error. */
export class InvalidCredentialsError extends Error {
  constructor() {
    super('That email and password combination is not recognised')
    this.name = 'InvalidCredentialsError'
  }
}

const latency = () => new Promise((resolve) => setTimeout(resolve, 600))

export async function login({
  email,
  password,
}: LoginValues): Promise<Session> {
  await latency()

  const user = DEMO_USERS.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
  )
  if (!user || password !== DEMO_PASSWORD) throw new InvalidCredentialsError()

  return { user, token: `fake-token-${user.id}` }
}

export async function requestPasswordReset(
  _values: ForgotPasswordValues,
): Promise<void> {
  await latency()
  // Always resolves: revealing whether an address is registered would leak
  // which employees exist. The UI says the same thing either way.
}
