import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/theme-store'

/**
 * Phase 1 home for the toggle; Phase 3 moves it into the top navigation.
 */
export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const Icon = theme === 'dark' ? Sun : Moon

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      }
      className="text-content-muted hover:text-content hover:bg-canvas grid size-9 place-items-center rounded-md transition-colors"
    >
      <Icon className="size-4.5" aria-hidden />
    </button>
  )
}
