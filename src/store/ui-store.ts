import { create } from 'zustand'
import { STORAGE_KEYS } from '@/constants'
import { safeStorage } from '@/lib/storage'

interface UiState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

export const useUiStore = create<UiState>((set, get) => ({
  sidebarCollapsed:
    safeStorage('local')?.getItem(STORAGE_KEYS.sidebar) === 'true',
  toggleSidebar: () => {
    const next = !get().sidebarCollapsed
    safeStorage('local')?.setItem(STORAGE_KEYS.sidebar, String(next))
    set({ sidebarCollapsed: next })
  },
}))
