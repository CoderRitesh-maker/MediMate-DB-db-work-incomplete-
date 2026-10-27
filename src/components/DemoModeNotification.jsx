import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const DemoModeNotification = ({ onClose }) => {
  const { isDemoMode } = useAuth()

  if (!isDemoMode) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-3 z-50 shadow-lg"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div className="text-sm">
            <span className="font-semibold">Demo Mode Active</span> - 
            You can login with any email/password. Set up Firebase for full functionality.
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

export default DemoModeNotification