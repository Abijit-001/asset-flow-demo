import { Inbox } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { Avatar } from '@/components/ui/Avatar'
import type { Asset } from '@/features/assets/types'

const dateFormat = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
})

export function RecentAssignments({ assets }: { assets: readonly Asset[] }) {
  if (assets.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="Nothing assigned yet"
        description="Assignments appear here as hardware goes out."
      />
    )
  }

  return (
    <ul className="divide-border divide-y">
      {assets.map((asset) => (
        <li
          key={asset.id}
          className="flex items-center gap-3 py-2.5 first:pt-0"
        >
          {asset.assignedTo && <Avatar name={asset.assignedTo} size="sm" />}
          <div className="min-w-0">
            <p className="truncate text-sm">{asset.model}</p>
            <p className="text-content-muted truncate text-xs">
              {asset.assignedTo}
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="font-mono text-xs">{asset.tag}</p>
            <p className="text-content-muted font-mono text-xs">
              {asset.assignedAt
                ? dateFormat.format(new Date(asset.assignedAt))
                : ''}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
