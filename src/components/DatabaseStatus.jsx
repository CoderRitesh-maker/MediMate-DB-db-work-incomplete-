import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Database, RefreshCw, Users, CheckCircle } from 'lucide-react'
import { getAllDoctors, getStatistics } from '../utils/doctorDatabase'

const DatabaseStatus = ({ compact = false }) => {
  const [stats, setStats] = useState({})
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshStats = async () => {
    setIsRefreshing(true)
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newStats = getStatistics()
    const doctors = getAllDoctors()
    
    setStats({
      ...newStats,
      recentlyAdded: doctors.filter(d => {
        const createdDate = new Date(d.createdAt)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
        return createdDate > oneDayAgo
      }).length
    })
    
    setIsRefreshing(false)
  }

  useEffect(() => {
    refreshStats()

    // Listen for database changes
    const handleStorageChange = (e) => {
      if (e.key === 'careconnect_doctors_db') {
        refreshStats()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  if (compact) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>{stats.availableDoctors || 0} doctors available</span>
        <button 
          onClick={refreshStats}
          disabled={isRefreshing}
          className="text-blue-600 hover:text-blue-800"
        >
          <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Database Status</h3>
        </div>
        <button
          onClick={refreshStats}
          disabled={isRefreshing}
          className="text-blue-600 hover:text-blue-800 p-1 rounded"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-green-600" />
          <span>
            <strong>{stats.availableDoctors || 0}</strong> active doctors
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          <span>
            <strong>{stats.specializations || 0}</strong> specializations
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>
            <strong>{stats.recentlyAdded || 0}</strong> added today
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span>
            <strong>{stats.cities || 0}</strong> cities covered
          </span>
        </div>
      </div>

      {stats.lastUpdated && (
        <div className="mt-3 pt-3 border-t text-xs text-gray-500">
          Last updated: {new Date(stats.lastUpdated).toLocaleString()}
        </div>
      )}
    </motion.div>
  )
}

export default DatabaseStatus