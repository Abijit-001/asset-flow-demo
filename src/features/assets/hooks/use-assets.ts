import { useQuery } from '@tanstack/react-query'
import { fetchAssets } from '@/features/assets/api/assets-api'

export const assetsQueryKey = ['assets'] as const

/**
 * The single source of asset data. Every dashboard panel derives from this one
 * query rather than fetching its own slice, so there is one loading state and
 * one error state for the whole page.
 */
export function useAssets() {
  return useQuery({
    queryKey: assetsQueryKey,
    queryFn: fetchAssets,
  })
}
