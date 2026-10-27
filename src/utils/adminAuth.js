// Admin Authentication Utilities

export const ADMIN_SESSION_KEY = 'isAdminAuthenticated'
export const ADMIN_LOGIN_TIME_KEY = 'adminLoginTime'
export const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Demo credentials - In production, use secure authentication
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
}

/**
 * Check if admin is currently authenticated
 * @returns {boolean} - True if authenticated and session is valid
 */
export const isAdminAuthenticated = () => {
  const isAuth = localStorage.getItem(ADMIN_SESSION_KEY)
  const loginTime = localStorage.getItem(ADMIN_LOGIN_TIME_KEY)
  
  if (isAuth === 'true' && loginTime) {
    const timeElapsed = Date.now() - parseInt(loginTime)
    return timeElapsed < SESSION_DURATION
  }
  
  return false
}

/**
 * Set admin authentication session
 */
export const setAdminSession = () => {
  localStorage.setItem(ADMIN_SESSION_KEY, 'true')
  localStorage.setItem(ADMIN_LOGIN_TIME_KEY, Date.now().toString())
}

/**
 * Clear admin authentication session
 */
export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_SESSION_KEY)
  localStorage.removeItem(ADMIN_LOGIN_TIME_KEY)
}

/**
 * Get remaining session time in milliseconds
 * @returns {number} - Remaining time in milliseconds, 0 if expired
 */
export const getRemainingSessionTime = () => {
  if (!isAdminAuthenticated()) return 0
  
  const loginTime = localStorage.getItem(ADMIN_LOGIN_TIME_KEY)
  if (!loginTime) return 0
  
  const timeElapsed = Date.now() - parseInt(loginTime)
  return Math.max(0, SESSION_DURATION - timeElapsed)
}

/**
 * Format remaining session time for display
 * @returns {string} - Formatted time string
 */
export const formatRemainingTime = () => {
  const remaining = getRemainingSessionTime()
  if (remaining === 0) return 'Session expired'
  
  const hours = Math.floor(remaining / (60 * 60 * 1000))
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000))
  
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`
  } else {
    return `${minutes}m remaining`
  }
}

/**
 * Validate admin credentials
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean} - True if credentials are valid
 */
export const validateCredentials = (username, password) => {
  return username === ADMIN_CREDENTIALS.username && 
         password === ADMIN_CREDENTIALS.password
}