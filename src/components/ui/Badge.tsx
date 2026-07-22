import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Tinted background with a full-strength foreground, so a badge reads as a
 * label rather than a button. No tone uses the accent -- the accent belongs to
 * brand and primary actions, and a status that resembles it is a bug.
 */
const TONES = {
  available: 'bg-available/12 text-available',
  assigned: 'bg-assigned/12 text-assigned',
  maintenance: 'bg-maintenance/12 text-maintenance',
  retired: 'bg-retired/12 text-retired',
  danger: 'bg-danger/12 text-danger',
  neutral: 'bg-canvas text-content-muted',
} as const

export type BadgeTone = keyof typeof TONES

export function Badge({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: BadgeTone
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
