import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/Chart'

/**
 * Horizontal bars: category names are words, and vertical bars would either
 * truncate them or rotate them 45 degrees. One series, so one colour -- the
 * assigned token, which reads as neutral-informational here and stays clear of
 * the accent.
 */
export function CategoryBar({
  byCategory,
}: {
  byCategory: Record<string, number>
}) {
  const data = Object.entries(byCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const summary = data.map((d) => `${d.name} ${d.value}`).join(', ')

  return (
    <ChartContainer
      label={`Assets by category: ${summary}`}
      height={Math.max(160, data.length * 34)}
    >
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 16, top: 4, bottom: 4 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={96}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: 'var(--content-muted)' }}
        />
        <Tooltip
          cursor={{ fill: 'var(--canvas)' }}
          content={<ChartTooltipContent />}
        />
        <Bar
          dataKey="value"
          fill="var(--status-assigned)"
          radius={[0, 3, 3, 0]}
          barSize={16}
        />
      </BarChart>
    </ChartContainer>
  )
}
