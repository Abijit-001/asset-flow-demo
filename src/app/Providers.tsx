import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { queryClient } from '@/lib/query-client'
import { TooltipProvider } from '@/components/ui/Tooltip'

/**
 * Every app-wide provider, in one place. Theme is not a provider: the store
 * writes a class onto <html>, so no component needs to subscribe to re-render.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--surface-raised)',
            color: 'var(--content)',
            border: '1px solid var(--border)',
            fontSize: '0.875rem',
          },
        }}
      />
    </QueryClientProvider>
  )
}
