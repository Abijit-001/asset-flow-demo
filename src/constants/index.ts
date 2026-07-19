export const APP_NAME = 'AssetFlow'

export const STORAGE_KEYS = {
  /** Also read by the inline no-flash script in index.html. */
  theme: 'assetflow:theme',
} as const

export const ROUTES = {
  dashboard: '/',
  assets: '/assets',
  employees: '/employees',
} as const
