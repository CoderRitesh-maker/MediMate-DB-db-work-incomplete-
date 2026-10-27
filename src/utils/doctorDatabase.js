// 🏥 CareConnect Doctor Database Management
// Utilities for managing doctor data in local JSON database

import doctorsData from '../data/doctorsDatabase.json'
import { API_BASE } from '../services/api'

class DoctorDatabase {
  constructor() {
    // Load data from localStorage first, fallback to JSON file
    this.loadData()
  }

  // Load data from localStorage or fallback to JSON
  loadData() {
    try {
      const savedData = localStorage.getItem('careconnect_doctors_db')
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        this.doctors = parsedData.doctors || []
        this.metadata = parsedData.metadata || {}
        console.log('🔄 Loaded doctors from localStorage:', this.doctors.length)
      } else {
        // First time load from JSON file
        this.doctors = doctorsData.doctors || []
        this.metadata = doctorsData.metadata || {}
        this.saveData() // Save to localStorage for future use
        console.log('📁 Loaded doctors from JSON file:', this.doctors.length)
      }
    } catch (error) {
      console.error('❌ Error loading doctor data:', error)
      // Fallback to JSON file
      this.doctors = doctorsData.doctors || []
      this.metadata = doctorsData.metadata || {}
    }
  }

  // Save data to localStorage
  saveData() {
    try {
      const dataToSave = {
        doctors: this.doctors,
        metadata: this.metadata
      }
      localStorage.setItem('careconnect_doctors_db', JSON.stringify(dataToSave))
      console.log('💾 Saved doctors to localStorage:', this.doctors.length)
    } catch (error) {
      console.error('❌ Error saving doctor data:', error)
    }
  }

  // Get all doctors
  getAllDoctors() {
    return this.doctors.filter(doctor => doctor.isAvailable)
  }

  // Get doctor by ID
  getDoctorById(id) {
    return this.doctors.find(doctor => doctor.id === id)
  }

  // Search doctors by various criteria
  searchDoctors(filters = {}) {
    let filteredDoctors = this.doctors.filter(doctor => doctor.isAvailable)

    if (filters.specialization) {
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.specialization.toLowerCase().includes(filters.specialization.toLowerCase())
      )
    }

    if (filters.city) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.location.city.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    if (filters.name) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(filters.name.toLowerCase())
      )
    }

    if (filters.maxFee) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.consultationFee <= filters.maxFee
      )
    }

    if (filters.minRating) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.rating >= filters.minRating
      )
    }

    if (filters.day) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.availability.days.includes(filters.day)
      )
    }

    if (filters.language) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.languages.some(lang => 
          lang.toLowerCase().includes(filters.language.toLowerCase())
        )
      )
    }

    return filteredDoctors
  }

  // Get unique specializations
  getSpecializations() {
    const specializations = [...new Set(this.doctors.map(doctor => doctor.specialization))]
    return specializations.sort()
  }

  // Get unique cities
  getCities() {
    const cities = [...new Set(this.doctors.map(doctor => doctor.location.city))]
    return cities.sort()
  }

  // Get doctors by specialization
  getDoctorsBySpecialization(specialization) {
    return this.doctors.filter(doctor => 
      doctor.specialization.toLowerCase() === specialization.toLowerCase() && 
      doctor.isAvailable
    )
  }

  // Get featured doctors (highest rated)
  getFeaturedDoctors(limit = 6) {
    return this.doctors
      .filter(doctor => doctor.isAvailable)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  // Get available time slots for a doctor on a specific day
  getAvailableTimeSlots(doctorId, day) {
    const doctor = this.getDoctorById(doctorId)
    if (!doctor || !doctor.availability.days.includes(day)) {
      return []
    }
    return doctor.availability.timeSlots
  }

  // Check if doctor is available on a specific day and time
  isDoctorAvailable(doctorId, day, timeSlot) {
    const doctor = this.getDoctorById(doctorId)
    if (!doctor) return false
    
    return doctor.availability.days.includes(day) && 
           doctor.availability.timeSlots.includes(timeSlot)
  }

  // Get statistics
  getStatistics() {
    const totalDoctors = this.doctors.length
    const availableDoctors = this.doctors.filter(doctor => doctor.isAvailable).length
    const averageRating = this.doctors.reduce((sum, doctor) => sum + doctor.rating, 0) / totalDoctors
    const specializations = this.getSpecializations()
    const cities = this.getCities()

    return {
      totalDoctors,
      availableDoctors,
      averageRating: parseFloat(averageRating.toFixed(2)),
      specializations: specializations.length,
      cities: cities.length,
      specializationsList: specializations,
      citiesList: cities
    }
  }

  // Add new doctor (for admin functionality)
  addDoctor(doctorData) {
    const newId = `dr${String(this.doctors.length + 1).padStart(3, '0')}`
    const newDoctor = {
      id: newId,
      ...doctorData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isAvailable: true
    }
    
    this.doctors.push(newDoctor)
    this.updateMetadata()
    this.saveData() // Save to localStorage
    console.log('✅ Added new doctor:', newDoctor.name)
    return newDoctor
  }

  // Update doctor
  updateDoctor(id, updates) {
    const doctorIndex = this.doctors.findIndex(doctor => doctor.id === id)
    if (doctorIndex === -1) return null

    this.doctors[doctorIndex] = {
      ...this.doctors[doctorIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.updateMetadata()
    this.saveData() // Save to localStorage
    console.log('📝 Updated doctor:', this.doctors[doctorIndex].name)
    return this.doctors[doctorIndex]
  }

  // Delete doctor (soft delete - mark as unavailable)
  deleteDoctor(id) {
    const doctorIndex = this.doctors.findIndex(doctor => doctor.id === id)
    if (doctorIndex === -1) return false

    const doctorName = this.doctors[doctorIndex].name
    this.doctors[doctorIndex].isAvailable = false
    this.doctors[doctorIndex].updatedAt = new Date().toISOString()
    this.updateMetadata()
    this.saveData() // Save to localStorage
    console.log('🗑️ Deleted doctor:', doctorName)
    return true
  }

  // Update metadata
  updateMetadata() {
    this.metadata = {
      totalDoctors: this.doctors.length,
      availableDoctors: this.doctors.filter(d => d.isAvailable).length,
      lastUpdated: new Date().toISOString(),
      version: this.metadata.version || '1.0.0'
    }
  }

  // Reset database to original JSON data (for demo/testing)
  resetDatabase() {
    this.doctors = doctorsData.doctors || []
    this.metadata = doctorsData.metadata || {}
    this.saveData()
    console.log('🔄 Database reset to original data')
    return this.doctors
  }

  // Clear all localStorage data
  clearStoredData() {
    localStorage.removeItem('careconnect_doctors_db')
    console.log('🧹 Cleared stored doctor data')
  }

  // Export data (for backup)
  exportData() {
    return {
      doctors: this.doctors,
      metadata: this.metadata
    }
  }
}

// Sync from backend (if available) and persist into localStorage so search page reflects updates
export async function syncDoctorsFromBackend() {
  try {
    if (!API_BASE) return false
    const res = await fetch(`${API_BASE}/api/doctors`)
    const json = await res.json()
    if (!json?.data) return false
    const mapped = json.data.map(d => ({
      id: String(d.id),
      name: d.name,
      specialization: d.speciality || d.specialization || 'General',
      qualification: d.qualification || '',
      experience: d.experience || '',
      rating: Number(d.rating || 0),
      reviewsCount: Number(d.reviewsCount || 0),
      consultationFee: Number(d.consultationFee || 0),
      location: {
        city: d.city || '',
        state: d.state || '',
        address: d.address || '',
        hospital: d.hospital || '',
      },
      // Provide sensible defaults when backend doesn't send availability
      availability: {
        days: d.availabilityDays || ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        timeSlots: d.timeSlots || ['10:00 AM','11:00 AM','2:00 PM','4:00 PM']
      },
      languages: d.languages || ['English'],
      image: d.image || '',
      isAvailable: true,
      createdAt: d.createdAt || new Date().toISOString(),
      updatedAt: d.updatedAt || new Date().toISOString(),
    }))
    const dataToSave = { doctors: mapped, metadata: { lastUpdated: new Date().toISOString() } }
    localStorage.setItem('careconnect_doctors_db', JSON.stringify(dataToSave))
    // refresh current singleton
    doctorDB.loadData()
    return true
  } catch (e) {
    console.warn('Failed to sync doctors from backend:', e)
    return false
  }
}

// Create singleton instance
const doctorDB = new DoctorDatabase()

// Export both the class and instance
export { DoctorDatabase }
export default doctorDB

// Helper functions for common operations
export const searchDoctors = (filters) => doctorDB.searchDoctors(filters)
export const getDoctorById = (id) => doctorDB.getDoctorById(id)
export const getAllDoctors = () => doctorDB.getAllDoctors()
export const getSpecializations = () => doctorDB.getSpecializations()
export const getCities = () => doctorDB.getCities()
export const getFeaturedDoctors = (limit) => doctorDB.getFeaturedDoctors(limit)
export const getDoctorsBySpecialization = (spec) => doctorDB.getDoctorsBySpecialization(spec)
export const getAvailableTimeSlots = (doctorId, day) => doctorDB.getAvailableTimeSlots(doctorId, day)
export const isDoctorAvailable = (doctorId, day, timeSlot) => doctorDB.isDoctorAvailable(doctorId, day, timeSlot)
export const getStatistics = () => doctorDB.getStatistics()
export const resetDatabase = () => doctorDB.resetDatabase()
export const clearStoredData = () => doctorDB.clearStoredData()
export { API_BASE }
