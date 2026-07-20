/**
 * `as const` object rather than a TS `enum`: the tsconfig sets
 * `erasableSyntaxOnly`, which bans enums. Same call sites, no runtime shim.
 */
export const ROLES = {
  admin: 'admin',
  employee: 'employee',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export interface AuthUser {
  id: string
  name: string
  email: string
  role: Role
}

export interface Session {
  user: AuthUser
  /** Fake token. A real backend replaces this with a signed JWT. */
  token: string
}
