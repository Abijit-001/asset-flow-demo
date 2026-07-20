import axios from 'axios'

/**
 * The only configured Axios instance in the app. Features import this rather
 * than axios directly, so base URL, auth and error shape are set in one place.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
