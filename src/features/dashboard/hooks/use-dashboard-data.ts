import { useMemo } from 'react'
import { useAssets } from '@/features/assets/hooks/use-assets'
import {
  ASSET_STATUSES,
  type Asset,
  type AssetStatus,
} from '@/features/assets/types'

const DAY_MS = 86_400_000
export const WARRANTY_WINDOW_DAYS = 90

/** Units whose warranty lapses within the window, soonest first. */
export function warrantyExpiringWithin(
  assets: readonly Asset[],
  days: number,
  now: number = Date.now(),
): Asset[] {
  const cutoff = now + days * DAY_MS
  return assets
    .filter((asset) => {
      const expiry = new Date(asset.warrantyExpiresAt).getTime()
      // Already-lapsed warranties belong to a different problem; this panel is
      // about what to act on next.
      return expiry >= now && expiry <= cutoff
    })
    .sort(
      (a, b) =>
        new Date(a.warrantyExpiresAt).getTime() -
        new Date(b.warrantyExpiresAt).getTime(),
    )
}

/** Partial, not Record: buckets with no members are absent, not zero. */
export function countBy<K extends string>(
  assets: readonly Asset[],
  key: (asset: Asset) => K,
): Partial<Record<K, number>> {
  const counts: Partial<Record<K, number>> = {}
  for (const asset of assets) {
    const bucket = key(asset)
    counts[bucket] = (counts[bucket] ?? 0) + 1
  }
  return counts
}

/** Most recently assigned units first. */
export function recentlyAssigned(
  assets: readonly Asset[],
  limit: number,
): Asset[] {
  return assets
    .filter((asset) => asset.assignedAt !== null)
    .sort(
      (a, b) =>
        new Date(b.assignedAt as string).getTime() -
        new Date(a.assignedAt as string).getTime(),
    )
    .slice(0, limit)
}

/**
 * Everything the dashboard renders, derived from the one assets query. No panel
 * fetches on its own.
 */
export function useDashboardData() {
  const { data, isPending, isError, refetch } = useAssets()

  const derived = useMemo(() => {
    const assets = data ?? []
    const byStatus = countBy<AssetStatus>(assets, (a) => a.status)

    return {
      assets,
      total: assets.length,
      available: byStatus[ASSET_STATUSES.available] ?? 0,
      assigned: byStatus[ASSET_STATUSES.assigned] ?? 0,
      maintenance: byStatus[ASSET_STATUSES.maintenance] ?? 0,
      byStatus,
      byCategory: countBy(assets, (a) => a.category),
      recent: recentlyAssigned(assets, 5),
      expiring: warrantyExpiringWithin(assets, WARRANTY_WINDOW_DAYS).slice(
        0,
        5,
      ),
    }
  }, [data])

  return { ...derived, isPending, isError, refetch }
}
