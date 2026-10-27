export const API_BASE = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '')

const getToken = () => localStorage.getItem('cc_token')
export const setToken = (t) => localStorage.setItem('cc_token', t)
export const clearToken = () => localStorage.removeItem('cc_token')

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  if (!API_BASE) throw new Error('Backend URL not configured (VITE_BACKEND_URL or VITE_API_URL)')
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`
    throw new Error(msg)
  }
  return data
}

export const api = {
  get: (p) => request(p),
  post: (p, b) => request(p, { method: 'POST', body: b }),
  put: (p, b) => request(p, { method: 'PUT', body: b }),
  patch: (p, b) => request(p, { method: 'PATCH', body: b }),
  del: (p) => request(p, { method: 'DELETE' }),
}
