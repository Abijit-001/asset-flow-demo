/**
 * Single place that reads import.meta.env, so a missing variable fails here at
 * startup rather than as a confusing 404 deep inside a feature.
 */
function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

export const env = {
  apiBaseUrl: required('VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL),
} as const
