/**
 * `as const` + derived union rather than a TS enum: erasableSyntaxOnly bans
 * enums. Same pattern as features/auth/types.ts.
 */
export const ASSET_STATUSES = {
  available: 'available',
  assigned: 'assigned',
  maintenance: 'maintenance',
  retired: 'retired',
} as const

export type AssetStatus = (typeof ASSET_STATUSES)[keyof typeof ASSET_STATUSES]

export const ASSET_CATEGORIES = {
  laptops: 'Laptops',
  monitors: 'Monitors',
  phones: 'Phones',
  storage: 'Storage',
  licences: 'Licences',
  accessories: 'Accessories',
} as const

export type AssetCategory =
  (typeof ASSET_CATEGORIES)[keyof typeof ASSET_CATEGORIES]

/** A catalogue entry: a model the organisation buys, not a tracked unit. */
export interface AssetModel {
  model: string
  category: AssetCategory
  unitCost: number
  imageUrl: string | null
  /** Prefix for generated serials, e.g. MBP -> MBP-10420. */
  serialPrefix: string
  /** How many units of this model the organisation owns. */
  units: number
}

/** A tracked unit. This is what the register actually holds. */
export interface Asset {
  id: string
  /** Printed on the physical tag, e.g. AF-0007. */
  tag: string
  serial: string
  model: string
  category: AssetCategory
  status: AssetStatus
  unitCost: number
  imageUrl: string | null
  assignedTo: string | null
  /** ISO date. Null unless status is `assigned`. */
  assignedAt: string | null
  purchasedAt: string
  warrantyExpiresAt: string
}
