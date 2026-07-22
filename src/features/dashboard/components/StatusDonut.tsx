import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/Chart'
import { ASSET_STATUSES, type AssetStatus } from '@/features/assets/types'

/**
 * Colours are our own CSS variables, passed straight to Recharts. They are
 * already redefined under `.dark`, so the chart follows the theme with no
 * config layer -- and no series can collide with the accent, which is reserved
 * for brand and primary actions.
 */
const SLICES: Array<{ status: AssetStatus; label: string; fill: string }> = [
  {
    status: ASSET_STATUSES.available,
    label: 'Available',
    fill: 'var(--status-available)',
  },
  {
    status: ASSET_STATUSES.assigned,
    label: 'Assigned',
    fill: 'var(--status-assigned)',
  },
  {
    status: ASSET_STATUSES.maintenance,
    label: 'Maintenance',
    fill: 'var(--status-maintenance)',
  },
  {
    status: ASSET_STATUSES.retired,
    label: 'Retired',
    fill: 'var(--status-retired)',
  },
]

export function StatusDonut({
  byStatus,
}: {
  byStatus: Partial<Record<AssetStatus, number>>
}) {
  const data = SLICES.map((slice) => ({
    name: slice.label,
    value: byStatus[slice.status] ?? 0,
    fill: slice.fill,
  })).filter((slice) => slice.value > 0)

  const total = data.reduce((sum, slice) => sum + slice.value, 0)

  const summary = data.map((slice) => `${slice.name} ${slice.value}`).join(', ')

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <ChartContainer
        label={`Assets by status: ${summary}`}
        height={180}
        className="sm:w-1/2"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={48}
            outerRadius={72}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((slice) => (
              <Cell key={slice.name} fill={slice.fill} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ChartContainer>

      {/* The legend carries the numbers, so the donut is never the only place a
          value appears. */}
      <ul className="grid gap-2 sm:w-1/2">
        {data.map((slice) => (
          <li key={slice.name} className="flex items-center gap-2 text-sm">
            <span
              aria-hidden
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: slice.fill }}
            />
            <span className="text-content-muted">{slice.name}</span>
            <span className="ml-auto font-mono font-medium tabular-nums">
              {slice.value}
            </span>
            <span className="text-content-muted w-10 text-right font-mono text-xs tabular-nums">
              {total > 0 ? Math.round((slice.value / total) * 100) : 0}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
