import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { api, setToken, clearToken, API_BASE } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)
const [isDemoMode, setIsDemoMode] = useState(!auth && !API_BASE)

  // Demo mode functions
  const createDemoUser = (email, userData) => {
    const demoUser = {
      uid: 'demo-' + Date.now(),
      email: email,
      displayName: userData.fullName,
      emailVerified: true
    }
    
    const demoProfile = {
      uid: demoUser.uid,
      email: email,
      fullName: userData.fullName,
      phone: userData.phone || 'Demo Phone',
      dateOfBirth: userData.dateOfBirth || '1990-01-01',
      gender: userData.gender || 'Not specified',
      address: userData.address || 'Demo Address',
      emergencyContact: userData.emergencyContact || 'Demo Contact',
      createdAt: new Date().toISOString(),
      role: 'patient'
    }
    
    return { user: demoUser, profile: demoProfile }
  }

// Register user
const register = async (email, password, userData) => {
  // Backend mode
  if (API_BASE) {
    const res = await api.post('/api/auth/register', {
      name: userData.fullName,
      email,
      password,
      phone: userData.phone,
    })
    setToken(res.token)
    const user = res.user
    setCurrentUser({ uid: String(user.id), email: user.email, displayName: user.name })
    setUserProfile({ uid: String(user.id), email: user.email, fullName: user.name, phone: user.phone, createdAt: user.createdAt })
    return { user: res.user }
  }
  if (isDemoMode) {
      // Demo mode registration
      const { user, profile } = createDemoUser(email, userData)
      setCurrentUser(user)
      setUserProfile(profile)
      
      // Store in localStorage for persistence
      localStorage.setItem('demoUser', JSON.stringify(user))
      localStorage.setItem('demoProfile', JSON.stringify(profile))
      
      return { user }
    }
    
    if (!auth || !db) {
      throw new Error('Firebase not initialized. Please configure your Firebase settings.')
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update display name
    await updateProfile(user, {
      displayName: userData.fullName
    })

    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      fullName: userData.fullName,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      address: userData.address,
      emergencyContact: userData.emergencyContact,
      createdAt: new Date().toISOString(),
      role: 'patient'
    })

    return userCredential
  }

// Login user
const login = async (email, password) => {
  if (API_BASE) {
    const res = await api.post('/api/auth/login', { email, password })
    setToken(res.token)
    const user = res.user
    setCurrentUser({ uid: String(user.id), email: user.email, displayName: user.name })
    setUserProfile({ uid: String(user.id), email: user.email, fullName: user.name, phone: user.phone, createdAt: user.createdAt })
    return { user: res.user }
  }
  if (isDemoMode) {
      // Demo mode login - accept any email/password
      const demoUser = {
        uid: 'demo-user-' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        emailVerified: true
      }
      
      const demoProfile = {
        uid: demoUser.uid,
        email: email,
        fullName: email.split('@')[0],
        phone: '+1-555-DEMO',
        dateOfBirth: '1990-01-01',
        gender: 'Not specified',
        address: 'Demo Address, Demo City',
        emergencyContact: 'Demo Emergency Contact',
        createdAt: new Date().toISOString(),
        role: 'patient'
      }
      
      setCurrentUser(demoUser)
      setUserProfile(demoProfile)
      
      // Store in localStorage for persistence
      localStorage.setItem('demoUser', JSON.stringify(demoUser))
      localStorage.setItem('demoProfile', JSON.stringify(demoProfile))
      
      return { user: demoUser }
    }
    
    if (!auth) {
      throw new Error('Firebase not initialized. Please configure your Firebase settings.')
    }
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Google sign in
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    
    // Check if user profile exists
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    if (!userDoc.exists()) {
      // Create basic profile for Google users
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        fullName: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: new Date().toISOString(),
        role: 'patient'
      })
    }
    
    return result
  }

  // Logout user
const logout = () => {
  if (API_BASE) {
    clearToken()
    setCurrentUser(null)
    setUserProfile(null)
    return Promise.resolve()
  }
  if (isDemoMode) {
      setCurrentUser(null)
      setUserProfile(null)
      localStorage.removeItem('demoUser')
      localStorage.removeItem('demoProfile')
      return Promise.resolve()
    }
    
    return signOut(auth)
  }

  // Get user profile
const getUserProfile = async (uid) => {
  if (API_BASE) {
    const res = await api.get('/api/users/profile')
    return { uid: String(res.data.id), email: res.data.email, fullName: res.data.name, phone: res.data.phone, createdAt: res.data.createdAt }
  }
  const userDoc = await getDoc(doc(db, 'users', uid))
  return userDoc.exists() ? userDoc.data() : null
}

  // Update user profile
  const updateUserProfile = async (uid, updates) => {
    await setDoc(doc(db, 'users', uid), updates, { merge: true })
    setUserProfile(prev => ({ ...prev, ...updates }))
  }

  useEffect(() => {
// Check if Backend or Firebase auth is available
if (API_BASE) {
  // try restore from token by fetching profile
  const token = localStorage.getItem('cc_token')
  if (token) {
    getUserProfile('self')
      .then((profile) => {
        setCurrentUser({ uid: profile.uid, email: profile.email, displayName: profile.fullName })
        setUserProfile(profile)
      })
      .catch(() => {
        clearToken()
      })
  }
  setLoading(false)
  return
}
if (!auth) {
  console.warn('🔥 Firebase Auth not initialized. Running in DEMO MODE.')
      console.warn('📝 To enable full authentication, set up your Firebase credentials in .env file')
      
      // Try to restore demo user from localStorage
      const savedDemoUser = localStorage.getItem('demoUser')
      const savedDemoProfile = localStorage.getItem('demoProfile')
      
      if (savedDemoUser && savedDemoProfile) {
        setCurrentUser(JSON.parse(savedDemoUser))
        setUserProfile(JSON.parse(savedDemoProfile))
      }
      
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      
      if (user && db) {
        try {
          // Fetch user profile
          const profile = await getUserProfile(user.uid)
          setUserProfile(profile)
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      } else {
        setUserProfile(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userProfile,
    isDemoMode,
    register,
    login,
    signInWithGoogle,
    logout,
    getUserProfile,
    updateUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}