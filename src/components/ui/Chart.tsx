import type { ReactElement, ReactNode } from 'react'
import { ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/cn'

/**
 * shadcn/ui's chart follows the same shape as this -- ChartContainer wrapping a
 * ResponsiveContainer, plus a styled tooltip -- but its main job is generating
 * `--color-<series>` CSS variables from a config object so Recharts can be
 * themed. We already have semantic CSS vars that flip with `.dark`, and charts
 * pass them straight through (fill="var(--status-available)"), so that layer
 * would be machinery solving a problem this codebase does not have.
 *
 * So: their structure, without the config layer. Unlike Modal and Select, where
 * the intricate Radix wiring was the whole reason to port, the intricate part
 * of a chart is Recharts itself.
 */
export function ChartContainer({
  /** Required: a chart is an image to a screen reader and needs a description. */
  label,
  height = 220,
  className,
  children,
}: {
  label: string
  height?: number
  className?: string
  children: ReactElement
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn('w-full', className)}
      style={{ height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

/** Tooltip body styled to our surface tokens. */
export function ChartTooltipContent({
  active,
  payload,
  formatter,
}: {
  active?: boolean
  payload?: Array<{ name?: string; value?: number; payload?: unknown }>
  formatter?: (name: string, value: number) => ReactNode
}) {
  if (!active || !payload?.length) return null
  const entry = payload[0]
  const name = entry.name ?? ''
  const value = entry.value ?? 0

  return (
    <div className="border-border bg-surface-raised rounded-md border px-2.5 py-1.5 text-xs shadow-md">
      {formatter ? (
        formatter(name, value)
      ) : (
        <>
          <span className="text-content-muted">{name}: </span>
          <span className="font-mono font-medium">{value}</span>
        </>
      )}
    </div>
  )
}
