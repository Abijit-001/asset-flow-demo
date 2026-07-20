import { create } from 'zustand'
import { STORAGE_KEYS } from '@/constants'
import type { Session } from '@/features/auth/types'

/**
 * "Remember me" picks the storage, not a flag: localStorage survives a browser
 * restart, sessionStorage dies with the tab. Reads check both so either kind of
 * session is restored on load.
 */
function readSession(): Session | null {
  // Runs at module scope, so it must survive being imported outside a browser.
  if (typeof localStorage === 'undefined') return null

  const raw =
    localStorage.getItem(STORAGE_KEYS.session) ??
    sessionStorage.getItem(STORAGE_KEYS.session)
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
  const store = rememberMe ? localStorage : sessionStorage
  store.setItem(STORAGE_KEYS.session, JSON.stringify(session))
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session)
  sessionStorage.removeItem(STORAGE_KEYS.session)
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
