import axios from 'axios'
import { env } from '@/lib/env'

/**
 * The only configured Axios instance in the app. Features import this rather
 * than axios directly, so base URL, auth and error shape are set in one place.
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
})
