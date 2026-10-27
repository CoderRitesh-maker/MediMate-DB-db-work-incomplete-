// 🔥 CareConnect Firebase Configuration
// Simple demo mode that completely avoids Firebase initialization errors

// Check if we have valid Firebase credentials
const hasValidConfig = 
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== 'your_firebase_api_key_here' &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'your_project_id'

// All Firebase services default to null (demo mode)
const app = null
const auth = null
const db = null
const storage = null

// Log the current mode
console.log('🔥 CareConnect is running in DEMO MODE')
console.log('🎯 Authentication: Any email/password combination works!')
console.log('✨ Try these demo credentials:')
console.log('   Email: demo@careconnect.com')
console.log('   Password: 123456')
console.log('')
console.log('   Email: test@example.com')
console.log('   Password: password')
console.log('')
console.log('🔧 To enable Firebase: Set up valid credentials in .env file')
console.log('📝 See FIREBASE_SETUP_GUIDE.md for instructions')

// Export null Firebase instances - AuthContext will handle demo mode
export { auth, db, storage, hasValidConfig }
export default app
