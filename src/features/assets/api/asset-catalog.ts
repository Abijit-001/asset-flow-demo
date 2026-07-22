import { ASSET_CATEGORIES, type AssetModel } from '@/features/assets/types'

/**
 * Models for the categories fakestore cannot supply. Its electronics category
 * is only drives, SSDs and monitors, but the product tracks laptops, phones,
 * licences and accessories too -- and AuthBrandPanel says so on the login page.
 *
 * Costs are round numbers on purpose: this is demo data, and precise-looking
 * prices would imply a source that does not exist.
 */
export const LOCAL_CATALOG: readonly AssetModel[] = [
  {
    model: 'MacBook Pro 16" M3',
    category: ASSET_CATEGORIES.laptops,
    unitCost: 2500,
    imageUrl: null,
    serialPrefix: 'MBP',
    units: 14,
  },
  {
    model: 'ThinkPad X1 Carbon G12',
    category: ASSET_CATEGORIES.laptops,
    unitCost: 1800,
    imageUrl: null,
    serialPrefix: 'TPX',
    units: 11,
  },
  {
    model: 'iPhone 15 Pro',
    category: ASSET_CATEGORIES.phones,
    unitCost: 1100,
    imageUrl: null,
    serialPrefix: 'IPH',
    units: 9,
  },
  {
    model: 'Pixel 8',
    category: ASSET_CATEGORIES.phones,
    unitCost: 700,
    imageUrl: null,
    serialPrefix: 'PIX',
    units: 5,
  },
  {
    model: 'Adobe Creative Cloud (annual)',
    category: ASSET_CATEGORIES.licences,
    unitCost: 600,
    imageUrl: null,
    serialPrefix: 'ADB',
    units: 8,
  },
  {
    model: 'Microsoft 365 Business (annual)',
    category: ASSET_CATEGORIES.licences,
    unitCost: 150,
    imageUrl: null,
    serialPrefix: 'M365',
    units: 12,
  },
  {
    model: 'Logitech MX Keys',
    category: ASSET_CATEGORIES.accessories,
    unitCost: 110,
    imageUrl: null,
    serialPrefix: 'MXK',
    units: 7,
  },
  {
    model: 'Anker 65W USB-C Charger',
    category: ASSET_CATEGORIES.accessories,
    unitCost: 45,
    imageUrl: null,
    serialPrefix: 'ANK',
    units: 6,
  },
]

/** Names to draw assignees from. Employees arrive properly in Phase 7. */
export const PLACEHOLDER_HOLDERS: readonly string[] = [
  'Dana Whitfield',
  'Sam Okafor',
  'Priya Raman',
  'Tom Alvarez',
  'Mei Chen',
  'Jonas Bergstrom',
  'Aisha Bello',
  'Luca Ferrari',
]
