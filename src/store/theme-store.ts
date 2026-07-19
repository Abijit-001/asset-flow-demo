import { create } from 'zustand'
import { STORAGE_KEYS } from '@/constants'

export type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  localStorage.setItem(STORAGE_KEYS.theme, theme)
}

/**
 * The DOM class is the source of truth on load -- index.html has already set it
 * from localStorage before React mounts, so there is nothing to sync on start.
 */
export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  toggleTheme: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    set({ theme: next })
  },
}))
