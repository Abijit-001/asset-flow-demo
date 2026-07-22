import { ShieldCheck } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import type { Asset } from '@/features/assets/types'
import { WARRANTY_WINDOW_DAYS } from '@/features/dashboard/hooks/use-dashboard-data'

const DAY_MS = 86_400_000

function daysUntil(iso: string, now: number): number {
  return Math.ceil((new Date(iso).getTime() - now) / DAY_MS)
}

export function UpcomingWarranty({ assets }: { assets: readonly Asset[] }) {
  const now = Date.now()

  if (assets.length === 0) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="No warranties lapsing soon"
        description={`Nothing expires in the next ${WARRANTY_WINDOW_DAYS} days.`}
      />
    )
  }

  return (
    <ul className="divide-border divide-y">
      {assets.map((asset) => {
        const days = daysUntil(asset.warrantyExpiresAt, now)
        return (
          <li
            key={asset.id}
            className="flex items-center gap-3 py-2.5 first:pt-0"
          >
            <div className="min-w-0">
              <p className="truncate text-sm">{asset.model}</p>
              <p className="text-content-muted font-mono text-xs">
                {asset.tag}
              </p>
            </div>
            {/* Under a fortnight is the point where this needs action. */}
            <Badge
              tone={days <= 14 ? 'danger' : 'maintenance'}
              className="ml-auto"
            >
              {days} days
            </Badge>
          </li>
        )
      })}
    </ul>
  )
}
