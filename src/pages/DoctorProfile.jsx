import React from 'react'
import { motion } from 'framer-motion'

const DoctorProfile = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Doctor Profile</h1>
          <p className="text-gray-600">Coming Soon - Detailed doctor profiles with reviews and booking calendar</p>
        </div>
      </div>
    </motion.div>
  )
}

export default DoctorProfile