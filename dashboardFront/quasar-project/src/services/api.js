import { clearSession, getToken } from './auth'

const API_URL = import.meta.env.VITE_API_URL || 'https://dashboardvendaexterna.onrender.com'

export function apiUrl (path) {
  return `${API_URL}${path}`
}

export async function apiFetch (path, options = {}) {
  const headers = new Headers(options.headers || {})
  const token = getToken()

  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(apiUrl(path), { ...options, headers })

  if (response.status === 401 && token) {
    clearSession()
    window.dispatchEvent(new Event('auth-expired'))
  }

  return response
}