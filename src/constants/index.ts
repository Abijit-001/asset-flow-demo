export const APP_NAME = 'AssetFlow'

/** Serial printed on the wordmark's asset tag. */
export const BRAND_SERIAL = 'AF-0001'

export const STORAGE_KEYS = {
  /** Also read by the inline no-flash script in index.html. */
  theme: 'assetflow:theme',
  session: 'assetflow:session',
  sidebar: 'assetflow:sidebar-collapsed',
} as const

export const ROUTES = {
  dashboard: '/',
  login: '/login',
  forgotPassword: '/forgot-password',
} as const
