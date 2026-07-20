import { create } from 'zustand'
import { STORAGE_KEYS } from '@/constants'
import { safeStorage } from '@/lib/storage'
import type { Session } from '@/features/auth/types'

/**
 * "Remember me" picks the storage, not a flag: localStorage survives a browser
 * restart, sessionStorage dies with the tab. Reads check both so either kind of
 * session is restored on load.
 */
function readSession(): Session | null {
  const raw =
    safeStorage('local')?.getItem(STORAGE_KEYS.session) ??
    safeStorage('session')?.getItem(STORAGE_KEYS.session)
  if (!raw) return null

  try {
    return JSON.parse(raw) as Session
  } catch {
    // Corrupt or hand-edited entry: drop it rather than trapping the user on a
    // crashing boot.
    clearSession()
    return null
  }
}

function writeSession(session: Session, rememberMe: boolean) {
  clearSession()
  safeStorage(rememberMe ? 'local' : 'session')?.setItem(
    STORAGE_KEYS.session,
    JSON.stringify(session),
  )
}

function clearSession() {
  safeStorage('local')?.removeItem(STORAGE_KEYS.session)
  safeStorage('session')?.removeItem(STORAGE_KEYS.session)
}

interface AuthState {
  session: Session | null
  signIn: (session: Session, rememberMe: boolean) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: readSession(),
  signIn: (session, rememberMe) => {
    writeSession(session, rememberMe)
    set({ session })
  },
  signOut: () => {
    clearSession()
    set({ session: null })
  },
}))
