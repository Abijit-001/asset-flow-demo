import { apiClient } from '@/lib/axios'
import { fakeStoreProductsSchema } from '@/features/assets/schemas'
import {
  ASSET_CATEGORIES,
  ASSET_STATUSES,
  type Asset,
  type AssetCategory,
  type AssetModel,
  type AssetStatus,
} from '@/features/assets/types'
import {
  LOCAL_CATALOG,
  PLACEHOLDER_HOLDERS,
} from '@/features/assets/api/asset-catalog'

const DAY_MS = 86_400_000
const WARRANTY_YEARS_IN_DAYS = 1095

/**
 * fakestore titles are prose ("SanDisk SSD PLUS 1TB Internal SSD - SATA III"),
 * so the category comes from the words rather than from their `category` field,
 * which is just "electronics" for all six.
 */
function categoriseModel(title: string): AssetCategory {
  const lower = title.toLowerCase()
  if (lower.includes('monitor') || lower.includes('inches')) {
    return ASSET_CATEGORIES.monitors
  }
  return ASSET_CATEGORIES.storage
}

/** First letters of the first three words, so serials look model-specific. */
function serialPrefixFor(title: string): string {
  return title
    .split(/\s+/)
    .slice(0, 3)
    .map((word) => word[0])
    .join('')
    .replace(/[^A-Za-z]/g, '')
    .toUpperCase()
    .padEnd(3, 'X')
}

/**
 * Unit counts are derived from the model's position, not random: a register
 * that changes shape on every reload is impossible to screenshot or test.
 */
function unitsFor(index: number): number {
  return 4 + ((index * 3) % 7)
}

/**
 * Status spread across a fixed cycle of ten: 40% available, 40% assigned,
 * 10% maintenance, 10% retired. Deterministic, and close enough to a real
 * register to make the donut worth looking at.
 */
function statusFor(index: number): AssetStatus {
  const slot = index % 10
  if (slot < 4) return ASSET_STATUSES.available
  if (slot < 8) return ASSET_STATUSES.assigned
  if (slot === 8) return ASSET_STATUSES.maintenance
  return ASSET_STATUSES.retired
}

/**
 * Expands catalogue models into tracked units.
 *
 * `now` is injectable so tests can pin the clock -- purchase dates are relative
 * to today, which is what makes the warranty panel meaningful, and would
 * otherwise make assertions drift.
 */
export function expandCatalog(
  catalog: readonly AssetModel[],
  now: number = Date.now(),
): Asset[] {
  const assets: Asset[] = []
  let index = 0

  for (const model of catalog) {
    for (let unit = 0; unit < model.units; unit += 1) {
      const status = statusFor(index)
      const isAssigned = status === ASSET_STATUSES.assigned

      // Spread purchases across the last four years. The stride is coprime-ish
      // with the window so units of one model do not all land on one date.
      const purchasedDaysAgo = (index * 23) % 1460
      const purchasedAt = new Date(now - purchasedDaysAgo * DAY_MS)
      const warrantyExpiresAt = new Date(
        purchasedAt.getTime() + WARRANTY_YEARS_IN_DAYS * DAY_MS,
      )

      assets.push({
        id: `asset-${index + 1}`,
        tag: `AF-${String(index + 1).padStart(4, '0')}`,
        serial: `${model.serialPrefix}-${10_000 + ((index * 37) % 90_000)}`,
        model: model.model,
        category: model.category,
        status,
        unitCost: model.unitCost,
        imageUrl: model.imageUrl,
        assignedTo: isAssigned
          ? PLACEHOLDER_HOLDERS[index % PLACEHOLDER_HOLDERS.length]
          : null,
        assignedAt: isAssigned
          ? new Date(now - ((index * 11) % 120) * DAY_MS).toISOString()
          : null,
        purchasedAt: purchasedAt.toISOString(),
        warrantyExpiresAt: warrantyExpiresAt.toISOString(),
      })

      index += 1
    }
  }

  return assets
}

/**
 * Fetches the hardware catalogue and expands it into the register.
 *
 * No offline fallback on purpose: if fakestore is down the query fails and the
 * dashboard shows its error state. Falling back to local data would hide a real
 * outage and leave the error path untested.
 */
export async function fetchAssets(): Promise<Asset[]> {
  const response = await apiClient.get(
    `${import.meta.env.VITE_ASSETS_API_URL}/products/category/electronics`,
  )

  // Throws on shape change rather than letting undefined travel inward.
  const products = fakeStoreProductsSchema.parse(response.data)

  const remoteModels: AssetModel[] = products.map((product, i) => ({
    model: product.title,
    category: categoriseModel(product.title),
    unitCost: Math.round(product.price),
    imageUrl: product.image,
    serialPrefix: serialPrefixFor(product.title),
    units: unitsFor(i),
  }))

  return expandCatalog([...remoteModels, ...LOCAL_CATALOG])
}
